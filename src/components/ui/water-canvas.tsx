"use client";

import { useEffect, useRef, useCallback } from "react";

// ─── Colors (match globals.css @theme) ─────────────────────────────────────
const NAVY = "#0c1b3a";
const OCEAN_R = 0, OCEAN_G = 200, OCEAN_B = 233;     // #00C8E9
const NAVY_LT_R = 26, NAVY_LT_G = 47, NAVY_LT_B = 90; // #1a2f5a

// ─── Performance ───────────────────────────────────────────────────────────
const MAX_DPR = 2;
const MOUSE_THROTTLE_MS = 20;

// ─── Flow blobs (large soft background shapes) ────────────────────────────
const BLOB_COUNT = 6;

// ─── Cursor trail particles ───────────────────────────────────────────────
const MAX_PARTICLES = 120;
const PARTICLE_EMIT_RATE = 3; // per mouse event
const PARTICLE_BASE_LIFE = 120; // frames

// ─── Ambient floating particles ───────────────────────────────────────────
const AMBIENT_COUNT = 35;

// ─── Wave lines ───────────────────────────────────────────────────────────
const WAVE_COUNT = 5;

// ─── Types ─────────────────────────────────────────────────────────────────
interface FlowBlob {
  x: number;
  y: number;
  radius: number;
  phase: number;
  phaseSpeed: number;
  driftX: number;
  driftY: number;
  opacity: number;
  isOcean: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  life: number;
  maxLife: number;
}

interface AmbientDot {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseOpacity: number;
  phase: number;
}

interface MouseState {
  x: number;
  y: number;
  prevX: number;
  prevY: number;
  active: boolean;
}

// ─── Simple value noise for organic motion ─────────────────────────────────
function hash(x: number, y: number): number {
  const n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return n - Math.floor(n);
}

function smoothNoise(x: number, y: number): number {
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  const fx = x - ix;
  const fy = y - iy;
  const sx = fx * fx * (3 - 2 * fx);
  const sy = fy * fy * (3 - 2 * fy);
  return (
    hash(ix, iy) * (1 - sx) * (1 - sy) +
    hash(ix + 1, iy) * sx * (1 - sy) +
    hash(ix, iy + 1) * (1 - sx) * sy +
    hash(ix + 1, iy + 1) * sx * sy
  );
}

function fbm(x: number, y: number): number {
  return (
    smoothNoise(x, y) * 0.5 +
    smoothNoise(x * 2, y * 2) * 0.3 +
    smoothNoise(x * 4, y * 4) * 0.2
  );
}

// ─── Background gradient ───────────────────────────────────────────────────
function drawBackground(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const grad = ctx.createLinearGradient(0, 0, w * 0.3, h);
  grad.addColorStop(0, "#0e1f42");
  grad.addColorStop(0.5, NAVY);
  grad.addColorStop(1, "#060e1f");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);
}

// ─── Component ─────────────────────────────────────────────────────────────
export function WaterCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>(0);
  const timeRef = useRef<number>(0);
  const sizeRef = useRef({ w: 0, h: 0 });
  const blobsRef = useRef<FlowBlob[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const ambientRef = useRef<AmbientDot[]>([]);
  const mouseRef = useRef<MouseState>({ x: 0, y: 0, prevX: 0, prevY: 0, active: false });

  // ─── Emit cursor-trail particles ────────────────────────────────────────
  const emitParticles = useCallback((mx: number, my: number, pvx: number, pvy: number) => {
    const speed = Math.sqrt(pvx * pvx + pvy * pvy);
    const count = Math.min(PARTICLE_EMIT_RATE, Math.ceil(speed * 0.3));
    for (let i = 0; i < count; i++) {
      if (particlesRef.current.length >= MAX_PARTICLES) {
        particlesRef.current.shift();
      }
      const angle = Math.atan2(pvy, pvx) + (Math.random() - 0.5) * 2.5;
      const v = 0.3 + Math.random() * 1.2;
      const life = PARTICLE_BASE_LIFE + Math.random() * 60;
      particlesRef.current.push({
        x: mx + (Math.random() - 0.5) * 20,
        y: my + (Math.random() - 0.5) * 20,
        vx: Math.cos(angle) * v - pvx * 0.05,
        vy: Math.sin(angle) * v - pvy * 0.05,
        size: 1.5 + Math.random() * 3,
        opacity: 0.4 + Math.random() * 0.4,
        life,
        maxLife: life,
      });
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Reduced motion
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reducedMotion = motionQuery.matches;

    const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);

    // ─── Resize ───────────────────────────────────────────────────────────
    const resize = () => {
      const rect = container.getBoundingClientRect();
      sizeRef.current = { w: rect.width, h: rect.height };
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (reducedMotion) drawBackground(ctx, rect.width, rect.height);
    };
    const observer = new ResizeObserver(resize);
    observer.observe(container);
    resize();

    // ─── Initialize flow blobs ────────────────────────────────────────────
    const { w: iw, h: ih } = sizeRef.current;
    blobsRef.current = [];
    for (let i = 0; i < BLOB_COUNT; i++) {
      blobsRef.current.push({
        x: Math.random() * (iw || 1200),
        y: Math.random() * (ih || 600),
        radius: 100 + Math.random() * 200,
        phase: Math.random() * Math.PI * 2,
        phaseSpeed: 0.003 + Math.random() * 0.005,
        driftX: (Math.random() - 0.5) * 0.3,
        driftY: (Math.random() - 0.5) * 0.2,
        opacity: 0.025 + Math.random() * 0.035,
        isOcean: i < 2, // first 2 are ocean-cyan, rest are navy-light
      });
    }

    // ─── Initialize ambient dots ──────────────────────────────────────────
    ambientRef.current = [];
    for (let i = 0; i < AMBIENT_COUNT; i++) {
      ambientRef.current.push({
        x: Math.random() * (iw || 1200),
        y: Math.random() * (ih || 600),
        vx: (Math.random() - 0.5) * 0.15,
        vy: -0.05 - Math.random() * 0.15, // drift upward like bubbles
        size: 1 + Math.random() * 2.5,
        baseOpacity: 0.08 + Math.random() * 0.15,
        phase: Math.random() * Math.PI * 2,
      });
    }

    // ─── Animation loop ───────────────────────────────────────────────────
    const animate = () => {
      if (reducedMotion) return;
      const { w, h } = sizeRef.current;
      if (w === 0 || h === 0) {
        animRef.current = requestAnimationFrame(animate);
        return;
      }

      const t = timeRef.current;

      // A) Background
      drawBackground(ctx, w, h);

      // B) Flow blobs — large soft radial gradients drifting organically
      for (const blob of blobsRef.current) {
        blob.phase += blob.phaseSpeed;
        const noiseVal = fbm(blob.x * 0.002 + t * 0.001, blob.y * 0.002);
        blob.x += blob.driftX + Math.sin(blob.phase) * 0.5 + (noiseVal - 0.5) * 0.4;
        blob.y += blob.driftY + Math.cos(blob.phase * 0.7) * 0.3;

        // Wrap around edges
        if (blob.x < -blob.radius) blob.x = w + blob.radius;
        if (blob.x > w + blob.radius) blob.x = -blob.radius;
        if (blob.y < -blob.radius) blob.y = h + blob.radius;
        if (blob.y > h + blob.radius) blob.y = -blob.radius;

        // Cursor influence: blobs gently pushed away from cursor
        if (mouseRef.current.active) {
          const dx = blob.x - mouseRef.current.x;
          const dy = blob.y - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 300) {
            const force = (1 - dist / 300) * 0.4;
            blob.x += (dx / dist) * force;
            blob.y += (dy / dist) * force;
          }
        }

        const pulsing = blob.radius + Math.sin(blob.phase * 1.5) * 20;
        const r = blob.isOcean ? OCEAN_R : NAVY_LT_R;
        const g = blob.isOcean ? OCEAN_G : NAVY_LT_G;
        const b = blob.isOcean ? OCEAN_B : NAVY_LT_B;

        const grad = ctx.createRadialGradient(blob.x, blob.y, 0, blob.x, blob.y, pulsing);
        grad.addColorStop(0, `rgba(${r},${g},${b},${blob.opacity})`);
        grad.addColorStop(0.6, `rgba(${r},${g},${b},${blob.opacity * 0.4})`);
        grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
        ctx.fillStyle = grad;
        ctx.fillRect(blob.x - pulsing, blob.y - pulsing, pulsing * 2, pulsing * 2);
      }

      // C) Ambient floating dots — gentle drifting
      for (const dot of ambientRef.current) {
        dot.phase += 0.01;
        dot.x += dot.vx + Math.sin(dot.phase + dot.y * 0.01) * 0.1;
        dot.y += dot.vy;

        // Wrap
        if (dot.y < -10) { dot.y = h + 10; dot.x = Math.random() * w; }
        if (dot.x < -10) dot.x = w + 10;
        if (dot.x > w + 10) dot.x = -10;

        // Cursor influence: dots flow away
        if (mouseRef.current.active) {
          const dx = dot.x - mouseRef.current.x;
          const dy = dot.y - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            const force = (1 - dist / 150) * 0.8;
            dot.x += (dx / dist) * force;
            dot.y += (dy / dist) * force;
          }
        }

        const flicker = dot.baseOpacity * (0.7 + 0.3 * Math.sin(dot.phase * 2));
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${OCEAN_R},${OCEAN_G},${OCEAN_B},${flicker})`;
        ctx.fill();

        // Soft glow around dot
        if (dot.size > 1.5) {
          const glow = ctx.createRadialGradient(dot.x, dot.y, 0, dot.x, dot.y, dot.size * 4);
          glow.addColorStop(0, `rgba(${OCEAN_R},${OCEAN_G},${OCEAN_B},${flicker * 0.3})`);
          glow.addColorStop(1, `rgba(${OCEAN_R},${OCEAN_G},${OCEAN_B},0)`);
          ctx.fillStyle = glow;
          ctx.fillRect(dot.x - dot.size * 4, dot.y - dot.size * 4, dot.size * 8, dot.size * 8);
        }
      }

      // D) Flowing wave lines — organic sine-based
      for (let i = 0; i < WAVE_COUNT; i++) {
        const baseY = (h / (WAVE_COUNT + 1)) * (i + 1);
        ctx.beginPath();
        for (let px = 0; px < w; px += 3) {
          const n = fbm((px + t * 0.4 + i * 300) * 0.003, (baseY + t * 0.1) * 0.005);
          const wy =
            baseY +
            Math.sin((px + t * 0.5 + i * 200) * 0.006) * 10 +
            (n - 0.5) * 16;
          if (px === 0) ctx.moveTo(px, wy);
          else ctx.lineTo(px, wy);
        }
        ctx.strokeStyle = `rgba(255,255,255,0.04)`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // E) Cursor-trail particles — water droplets following mouse
      const alive: Particle[] = [];
      for (const p of particlesRef.current) {
        p.life -= 1;
        if (p.life <= 0) continue;

        const progress = 1 - p.life / p.maxLife;
        // Organic drift
        p.vx += (Math.random() - 0.5) * 0.04;
        p.vy += (Math.random() - 0.5) * 0.04 - 0.01; // slight upward drift
        p.vx *= 0.985;
        p.vy *= 0.985;
        p.x += p.vx;
        p.y += p.vy;

        // Fade: quick fade in, slow fade out
        const fadeIn = Math.min(progress * 8, 1);
        const fadeOut = 1 - progress * progress;
        const alpha = p.opacity * fadeIn * fadeOut;
        const size = p.size * (1 + progress * 0.5);

        if (alpha < 0.005) continue;

        // Draw glowing particle
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, size * 3);
        glow.addColorStop(0, `rgba(${OCEAN_R},${OCEAN_G},${OCEAN_B},${alpha})`);
        glow.addColorStop(0.4, `rgba(${OCEAN_R},${OCEAN_G},${OCEAN_B},${alpha * 0.4})`);
        glow.addColorStop(1, `rgba(${OCEAN_R},${OCEAN_G},${OCEAN_B},0)`);
        ctx.fillStyle = glow;
        ctx.fillRect(p.x - size * 3, p.y - size * 3, size * 6, size * 6);

        // Core bright dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, size * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${OCEAN_R},${OCEAN_G},${OCEAN_B},${alpha * 1.2})`;
        ctx.fill();

        alive.push(p);
      }
      particlesRef.current = alive;

      // F) Cursor glow — soft light around mouse position
      if (mouseRef.current.active) {
        const mx = mouseRef.current.x;
        const my = mouseRef.current.y;
        const cursorGlow = ctx.createRadialGradient(mx, my, 0, mx, my, 120);
        cursorGlow.addColorStop(0, `rgba(${OCEAN_R},${OCEAN_G},${OCEAN_B},0.06)`);
        cursorGlow.addColorStop(0.5, `rgba(${OCEAN_R},${OCEAN_G},${OCEAN_B},0.02)`);
        cursorGlow.addColorStop(1, `rgba(${OCEAN_R},${OCEAN_G},${OCEAN_B},0)`);
        ctx.fillStyle = cursorGlow;
        ctx.fillRect(mx - 120, my - 120, 240, 240);
      }

      timeRef.current += 1;
      animRef.current = requestAnimationFrame(animate);
    };

    // ─── Mouse / touch handlers ───────────────────────────────────────────
    let lastMouseTime = 0;
    const handleMouse = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastMouseTime < MOUSE_THROTTLE_MS) return;
      lastMouseTime = now;
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      const prevX = mouseRef.current.x;
      const prevY = mouseRef.current.y;
      mouseRef.current = { x: mx, y: my, prevX, prevY, active: true };
      emitParticles(mx, my, mx - prevX, my - prevY);
    };

    let lastTouchTime = 0;
    const handleTouch = (e: TouchEvent) => {
      const now = performance.now();
      if (now - lastTouchTime < MOUSE_THROTTLE_MS) return;
      lastTouchTime = now;
      const touch = e.touches[0];
      if (!touch) return;
      const rect = canvas.getBoundingClientRect();
      const mx = touch.clientX - rect.left;
      const my = touch.clientY - rect.top;
      const prevX = mouseRef.current.x;
      const prevY = mouseRef.current.y;
      mouseRef.current = { x: mx, y: my, prevX, prevY, active: true };
      emitParticles(mx, my, mx - prevX, my - prevY);
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    // Listen on parent section so events fire even over text overlay
    const section = container.parentElement;
    const eventTarget = section ?? canvas;
    eventTarget.addEventListener("mousemove", handleMouse);
    eventTarget.addEventListener("mouseleave", handleMouseLeave);
    eventTarget.addEventListener("touchmove", handleTouch, { passive: true } as AddEventListenerOptions);
    eventTarget.addEventListener("touchstart", handleTouch, { passive: true } as AddEventListenerOptions);

    // ─── Reduced motion ───────────────────────────────────────────────────
    const handleMotionChange = (e: MediaQueryListEvent) => {
      reducedMotion = e.matches;
      if (e.matches) {
        cancelAnimationFrame(animRef.current);
        drawBackground(ctx, sizeRef.current.w, sizeRef.current.h);
      } else {
        animate();
      }
    };
    motionQuery.addEventListener("change", handleMotionChange);

    // ─── Start ────────────────────────────────────────────────────────────
    if (reducedMotion) {
      drawBackground(ctx, sizeRef.current.w, sizeRef.current.h);
    } else {
      animate();
    }

    // ─── Cleanup ──────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(animRef.current);
      observer.disconnect();
      eventTarget.removeEventListener("mousemove", handleMouse);
      eventTarget.removeEventListener("mouseleave", handleMouseLeave);
      eventTarget.removeEventListener("touchmove", handleTouch);
      eventTarget.removeEventListener("touchstart", handleTouch);
      motionQuery.removeEventListener("change", handleMotionChange);
    };
  }, [emitParticles]);

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
