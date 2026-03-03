"use client";

import { useEffect, useRef, useCallback } from "react";

// --- Types ---
interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
  speed: number;
  color: string;
  lineWidth: number;
}

// --- Colors (match globals.css @theme) ---
const NAVY = "#0c1b3a";
const NAVY_LIGHT = "#1a2f5a";
const OCEAN = "#00C8E9";

// --- Performance tuning ---
const MAX_RIPPLES = 50;
const MOUSE_THROTTLE_MS = 60;
const AMBIENT_SPAWN_MS = 500;
const MAX_DPR = 2;

// --- Ripple params ---
const MOUSE_MAX_RADIUS = 180;
const MOUSE_OPACITY = 0.5;
const MOUSE_SPEED = 2.0;
const MOUSE_LINE_W = 2.5;

const AMBIENT_MAX_RADIUS = 120;
const AMBIENT_OPACITY = 0.2;
const AMBIENT_SPEED = 0.8;
const AMBIENT_LINE_W = 1.5;

// --- Wave line params ---
const WAVE_COUNT = 6;
const WAVE_AMP = 8;
const WAVE_FREQ = 0.008;
const WAVE_SPEED = 0.5;
const WAVE_OPACITY = 0.06;

// --- Helpers ---
function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

function drawStaticGradient(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const grad = ctx.createLinearGradient(0, 0, w * 0.3, h);
  grad.addColorStop(0, "#0e1f42");
  grad.addColorStop(0.5, NAVY);
  grad.addColorStop(1, "#060e1f");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);
}

export function WaterCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const ripplesRef = useRef<Ripple[]>([]);
  const animRef = useRef<number>(0);
  const timeRef = useRef<number>(0);
  const lastAmbientRef = useRef<number>(0);
  const sizeRef = useRef({ w: 0, h: 0 });

  const addRipple = useCallback((x: number, y: number, isMouse: boolean) => {
    if (ripplesRef.current.length >= MAX_RIPPLES) {
      ripplesRef.current.shift();
    }
    ripplesRef.current.push({
      x,
      y,
      radius: isMouse ? 2 : 0,
      maxRadius: isMouse
        ? MOUSE_MAX_RADIUS + Math.random() * 30
        : AMBIENT_MAX_RADIUS + Math.random() * 40,
      opacity: isMouse ? MOUSE_OPACITY : AMBIENT_OPACITY,
      speed: isMouse
        ? MOUSE_SPEED + Math.random() * 0.4
        : AMBIENT_SPEED + Math.random() * 0.3,
      color: isMouse ? OCEAN : NAVY_LIGHT,
      lineWidth: isMouse ? MOUSE_LINE_W : AMBIENT_LINE_W,
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Reduced motion check
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reducedMotion = motionQuery.matches;

    // DPR-aware canvas sizing
    const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);

    const resize = () => {
      const rect = container.getBoundingClientRect();
      sizeRef.current = { w: rect.width, h: rect.height };
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (reducedMotion) {
        drawStaticGradient(ctx, rect.width, rect.height);
      }
    };

    const observer = new ResizeObserver(resize);
    observer.observe(container);
    resize();

    // --- Animation loop ---
    const animate = () => {
      if (reducedMotion) return;

      const { w, h } = sizeRef.current;
      if (w === 0 || h === 0) {
        animRef.current = requestAnimationFrame(animate);
        return;
      }

      // A) Navy gradient background
      drawStaticGradient(ctx, w, h);

      // B) Ambient sine wave lines
      for (let i = 0; i < WAVE_COUNT; i++) {
        const baseY = (h / (WAVE_COUNT + 1)) * (i + 1);
        ctx.beginPath();
        for (let px = 0; px < w; px += 3) {
          const wy =
            baseY +
            Math.sin((px + timeRef.current * WAVE_SPEED + i * 200) * WAVE_FREQ) * WAVE_AMP +
            Math.sin((px + timeRef.current * WAVE_SPEED * 0.7 + i * 500) * WAVE_FREQ * 1.5) *
              (WAVE_AMP * 0.4);
          if (px === 0) ctx.moveTo(px, wy);
          else ctx.lineTo(px, wy);
        }
        ctx.strokeStyle = `rgba(255,255,255,${WAVE_OPACITY})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // C) Update & draw ripples
      const alive: Ripple[] = [];
      for (const r of ripplesRef.current) {
        r.radius += r.speed;
        const progress = r.radius / r.maxRadius;
        const curOpacity = r.opacity * (1 - progress) * (1 - progress);

        if (r.radius < r.maxRadius && curOpacity > 0.003) {
          // Primary ring
          ctx.beginPath();
          ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
          ctx.strokeStyle = hexToRgba(r.color, curOpacity);
          ctx.lineWidth = r.lineWidth;
          ctx.stroke();

          // Glow ring
          ctx.beginPath();
          ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
          ctx.strokeStyle = hexToRgba(r.color, curOpacity * 0.25);
          ctx.lineWidth = r.lineWidth * 4;
          ctx.stroke();

          alive.push(r);
        }
      }
      ripplesRef.current = alive;

      // D) Spawn ambient ripples
      const now = performance.now();
      if (now - lastAmbientRef.current > AMBIENT_SPAWN_MS) {
        addRipple(Math.random() * w, Math.random() * h, false);
        lastAmbientRef.current = now;
      }

      timeRef.current += 1;
      animRef.current = requestAnimationFrame(animate);
    };

    // --- Event handlers ---
    let lastMouseTime = 0;
    const handleMouse = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastMouseTime < MOUSE_THROTTLE_MS) return;
      lastMouseTime = now;
      const rect = canvas.getBoundingClientRect();
      addRipple(e.clientX - rect.left, e.clientY - rect.top, true);
    };

    let lastTouchTime = 0;
    const handleTouch = (e: TouchEvent) => {
      const now = performance.now();
      if (now - lastTouchTime < MOUSE_THROTTLE_MS) return;
      lastTouchTime = now;
      const touch = e.touches[0];
      if (!touch) return;
      const rect = canvas.getBoundingClientRect();
      addRipple(touch.clientX - rect.left, touch.clientY - rect.top, true);
    };

    canvas.addEventListener("mousemove", handleMouse);
    canvas.addEventListener("touchmove", handleTouch, { passive: true });
    canvas.addEventListener("touchstart", handleTouch, { passive: true });

    // --- Reduced motion listener ---
    const handleMotionChange = (e: MediaQueryListEvent) => {
      reducedMotion = e.matches;
      if (e.matches) {
        cancelAnimationFrame(animRef.current);
        drawStaticGradient(ctx, sizeRef.current.w, sizeRef.current.h);
      } else {
        lastAmbientRef.current = performance.now();
        animate();
      }
    };
    motionQuery.addEventListener("change", handleMotionChange);

    // --- Start ---
    if (reducedMotion) {
      drawStaticGradient(ctx, sizeRef.current.w, sizeRef.current.h);
    } else {
      lastAmbientRef.current = performance.now();
      animate();
    }

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(animRef.current);
      observer.disconnect();
      canvas.removeEventListener("mousemove", handleMouse);
      canvas.removeEventListener("touchmove", handleTouch);
      canvas.removeEventListener("touchstart", handleTouch);
      motionQuery.removeEventListener("change", handleMotionChange);
    };
  }, [addRipple]);

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
