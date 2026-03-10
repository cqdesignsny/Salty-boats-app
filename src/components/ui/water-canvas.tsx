"use client";

import { useEffect, useRef } from "react";

/*
 * Water-surface ripple simulation
 * ────────────────────────────────
 * Uses a classic heightmap wave-propagation algorithm:
 *   next[i] = avg(4 neighbors) − previous[i],  then × damping
 *
 * Rendered to a low-res offscreen canvas with per-pixel surface-normal
 * lighting, then scaled up with bilinear interpolation for a smooth,
 * continuous water-surface look.  No particles, no dots — just water.
 */

// ─── Simulation ──────────────────────────────────────────────────────────────
const SIM_SCALE = 3; // CSS px per sim cell (lower = finer, slower)
const DAMPING = 0.97; // wave decay (closer to 1 = longer-lived ripples)
const DROP_RATE = 0.25; // ambient drops per frame (probability)
const DROP_STR = 35; // ambient drop strength
const DROP_RAD = 3; // ambient drop radius (sim cells)
const CURSOR_STR = 100; // cursor ripple strength
const CURSOR_RAD = 5; // cursor ripple radius
const MAX_DPR = 1.5; // cap device pixel ratio for perf
const MOUSE_THROTTLE = 16; // ms between mouse samples

// ─── Palette (navy → ocean) ─────────────────────────────────────────────────
//  base:     #0c1b3a (12,27,58)   flat water
//  highlight:#1a3a6a (26,58,106)  lit face
//  specular: #3caade (60,170,222) bright glint
//  shadow:   #060e24 (6,14,36)    trough
const BASE = [12, 27, 58] as const;
const HI = [26, 58, 106] as const;
const SPEC = [60, 170, 222] as const;
const DARK = [6, 14, 36] as const;

// ─── Component ───────────────────────────────────────────────────────────────
export function WaterCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    // Reduced-motion guard
    const mqReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reduced = mqReduced.matches;

    const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);

    // State
    let W = 0,
      H = 0,
      sW = 0,
      sH = 0;
    let bufA: Float32Array, bufB: Float32Array;
    let offCvs: HTMLCanvasElement,
      offCtx: CanvasRenderingContext2D;
    let img: ImageData,
      pxArr: Uint8ClampedArray;
    let frame = 0,
      raf = 0;

    // Mouse
    let mouseX = -1,
      mouseY = -1,
      mouseActive = false,
      prevSimX = -1,
      prevSimY = -1;

    // ── Init simulation buffers ──────────────────────────────────────────
    function initSim() {
      sW = Math.max(4, Math.ceil(W / SIM_SCALE));
      sH = Math.max(4, Math.ceil(H / SIM_SCALE));
      const n = sW * sH;
      bufA = new Float32Array(n);
      bufB = new Float32Array(n);

      offCvs = document.createElement("canvas");
      offCvs.width = sW;
      offCvs.height = sH;
      offCtx = offCvs.getContext("2d", { alpha: false })!;
      img = offCtx.createImageData(sW, sH);
      pxArr = img.data;
      // pre-fill alpha channel
      for (let i = 3; i < pxArr.length; i += 4) pxArr[i] = 255;
    }

    // ── Resize handler ───────────────────────────────────────────────────
    function resize() {
      const r = container!.getBoundingClientRect();
      W = r.width;
      H = r.height;
      canvas!.width = W * dpr;
      canvas!.height = H * dpr;
      canvas!.style.width = `${W}px`;
      canvas!.style.height = `${H}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      initSim();
    }

    // ── Add a circular ripple at (cx,cy) in sim coords ───────────────────
    function addDrop(cx: number, cy: number, rad: number, str: number) {
      const r2 = rad * rad;
      const rCeil = Math.ceil(rad);
      for (let dy = -rCeil; dy <= rCeil; dy++) {
        const py = Math.round(cy + dy);
        if (py < 1 || py >= sH - 1) continue;
        const row = py * sW;
        for (let dx = -rCeil; dx <= rCeil; dx++) {
          const d2 = dx * dx + dy * dy;
          if (d2 >= r2) continue;
          const px2 = Math.round(cx + dx);
          if (px2 < 1 || px2 >= sW - 1) continue;
          // smooth cosine falloff for natural ripple shape
          const t = Math.sqrt(d2) / rad;
          const f = 0.5 * (1 + Math.cos(Math.PI * t));
          bufA[row + px2] += str * f;
        }
      }
    }

    // ── Propagate one simulation step ────────────────────────────────────
    function propagate() {
      for (let y = 1; y < sH - 1; y++) {
        const row = y * sW;
        for (let x = 1; x < sW - 1; x++) {
          const i = row + x;
          bufB[i] =
            ((bufA[i - 1] + bufA[i + 1] + bufA[i - sW] + bufA[i + sW]) * 0.5 -
              bufB[i]) *
            DAMPING;
        }
      }
      // swap buffers (no allocation)
      const tmp = bufA;
      bufA = bufB;
      bufB = tmp;
    }

    // ── Render heightmap → pixels with surface-normal lighting ───────────
    function render() {
      for (let y = 0; y < sH; y++) {
        const row = y * sW;
        // subtle vertical gradient (lighter top, darker bottom)
        const vt = y / sH;
        const bgR = BASE[0] + (1 - vt) * 3;
        const bgG = BASE[1] + (1 - vt) * 5;
        const bgB = BASE[2] + (1 - vt) * 8;

        for (let x = 0; x < sW; x++) {
          const i = row + x;
          const pi = i * 4;

          // height gradient → pseudo surface normal
          const left = x > 0 ? bufA[i - 1] : 0;
          const right = x < sW - 1 ? bufA[i + 1] : 0;
          const up = y > 0 ? bufA[i - sW] : 0;
          const down = y < sH - 1 ? bufA[i + sW] : 0;

          const gx = (left - right) * 0.5;
          const gy = (up - down) * 0.5;

          // directional light from top-left
          const light = gx * 0.6 + gy * 0.8;
          // specular glint on steep slopes
          const spec = light * light * 0.0008;

          let cr: number, cg: number, cb: number;

          if (light > 0) {
            // lit face → blend toward highlight, add specular
            const t = Math.min(light / 20, 1);
            const s = Math.min(spec, 1);
            cr = bgR + (HI[0] - bgR) * t + (SPEC[0] - HI[0]) * s;
            cg = bgG + (HI[1] - bgG) * t + (SPEC[1] - HI[1]) * s;
            cb = bgB + (HI[2] - bgB) * t + (SPEC[2] - HI[2]) * s;
          } else {
            // shadow face → darken toward deep navy
            const t = Math.min(-light / 25, 1);
            cr = bgR + (DARK[0] - bgR) * t;
            cg = bgG + (DARK[1] - bgG) * t;
            cb = bgB + (DARK[2] - bgB) * t;
          }

          // clamp
          pxArr[pi] = cr < 0 ? 0 : cr > 255 ? 255 : cr;
          pxArr[pi + 1] = cg < 0 ? 0 : cg > 255 ? 255 : cg;
          pxArr[pi + 2] = cb < 0 ? 0 : cb > 255 ? 255 : cb;
        }
      }

      offCtx.putImageData(img, 0, 0);

      // scale up to main canvas with smooth interpolation
      ctx!.imageSmoothingEnabled = true;
      ctx!.imageSmoothingQuality = "high";
      ctx!.drawImage(offCvs, 0, 0, W, H);
    }

    // ── Animation loop ───────────────────────────────────────────────────
    function tick() {
      if (reduced) return;
      if (!W || !sW) {
        raf = requestAnimationFrame(tick);
        return;
      }

      frame++;

      // ambient drops — random "rain" for constant water motion
      if (Math.random() < DROP_RATE) {
        addDrop(
          2 + Math.random() * (sW - 4),
          2 + Math.random() * (sH - 4),
          DROP_RAD + Math.random() * 2,
          DROP_STR * (0.5 + Math.random())
        );
      }

      // gentle wind swell — occasional low-energy ripples
      if (frame % 10 === 0) {
        addDrop(
          3 + Math.random() * (sW - 6),
          3 + Math.random() * (sH - 6),
          2,
          12 + Math.random() * 8
        );
      }

      // cursor interaction — drops along mouse path
      if (mouseActive && mouseX >= 0) {
        const sx = (mouseX / W) * sW;
        const sy = (mouseY / H) * sH;
        if (prevSimX >= 0) {
          const dx = sx - prevSimX;
          const dy = sy - prevSimY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > 0.3) {
            // main drop at cursor
            addDrop(
              sx,
              sy,
              CURSOR_RAD,
              CURSOR_STR * Math.min(dist * 0.35, 1.2)
            );
            // interpolated drops for smooth trail on fast swipes
            if (dist > 2) {
              const steps = Math.min(Math.floor(dist / 2), 5);
              for (let s = 1; s < steps; s++) {
                const t = s / steps;
                addDrop(
                  prevSimX + dx * t,
                  prevSimY + dy * t,
                  CURSOR_RAD * 0.7,
                  CURSOR_STR * 0.5
                );
              }
            }
          }
        }
        prevSimX = sx;
        prevSimY = sy;
      }

      propagate();
      render();

      raf = requestAnimationFrame(tick);
    }

    // ── Setup ────────────────────────────────────────────────────────────
    const obs = new ResizeObserver(resize);
    obs.observe(container);
    resize();

    // Seed initial ripples so animation starts with existing water motion
    if (!reduced && sW > 0) {
      for (let i = 0; i < 15; i++) {
        addDrop(
          3 + Math.random() * (sW - 6),
          3 + Math.random() * (sH - 6),
          2 + Math.random() * 3,
          20 + Math.random() * 25
        );
      }
      // warm up: run propagation cycles to spread initial ripples
      for (let i = 0; i < 30; i++) propagate();
    }

    // ── Event wiring ─────────────────────────────────────────────────────
    let lastMoveT = 0;
    const onMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastMoveT < MOUSE_THROTTLE) return;
      lastMoveT = now;
      const rect = canvas!.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      mouseActive = true;
    };

    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      const rect = canvas!.getBoundingClientRect();
      mouseX = t.clientX - rect.left;
      mouseY = t.clientY - rect.top;
      mouseActive = true;
    };

    const onLeave = () => {
      mouseActive = false;
      prevSimX = -1;
      prevSimY = -1;
    };

    // Listen on parent section so events fire even over text overlay
    const section = container.parentElement;
    const eventTarget = section ?? canvas;
    eventTarget.addEventListener("mousemove", onMouseMove);
    eventTarget.addEventListener("mouseleave", onLeave);
    eventTarget.addEventListener("touchmove", onTouchMove, {
      passive: true,
    } as AddEventListenerOptions);
    eventTarget.addEventListener("touchstart", onTouchMove, {
      passive: true,
    } as AddEventListenerOptions);

    // Reduced-motion toggle
    const onMotionChange = (e: MediaQueryListEvent) => {
      reduced = e.matches;
      if (e.matches) {
        cancelAnimationFrame(raf);
        ctx!.fillStyle = "#0c1b3a";
        ctx!.fillRect(0, 0, W, H);
      } else {
        tick();
      }
    };
    mqReduced.addEventListener("change", onMotionChange);

    // Start
    if (reduced) {
      ctx.fillStyle = "#0c1b3a";
      ctx.fillRect(0, 0, W, H);
    } else {
      tick();
    }

    // ── Cleanup ──────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(raf);
      obs.disconnect();
      eventTarget.removeEventListener("mousemove", onMouseMove);
      eventTarget.removeEventListener("mouseleave", onLeave);
      eventTarget.removeEventListener("touchmove", onTouchMove);
      eventTarget.removeEventListener("touchstart", onTouchMove);
      mqReduced.removeEventListener("change", onMotionChange);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0"
      aria-hidden="true"
      role="presentation"
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}
