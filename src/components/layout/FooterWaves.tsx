"use client";

import { useEffect, useRef } from "react";

/** Flowing silk-light lines behind the footer call to action (canvas 2D, paused offscreen). */
export function FooterWaves() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = false;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      const lines = 26;
      for (let i = 0; i < lines; i++) {
        const k = i / lines;
        const grad = ctx.createLinearGradient(0, 0, w, 0);
        grad.addColorStop(0, "rgba(120,90,255,0)");
        grad.addColorStop(0.35, `rgba(160,130,255,${0.1 + k * 0.22})`);
        grad.addColorStop(0.7, `rgba(255,170,220,${0.08 + k * 0.18})`);
        grad.addColorStop(1, "rgba(255,160,215,0)");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        for (let x = -10; x <= w + 10; x += 10) {
          const y =
            h * 0.62 +
            Math.sin(x * 0.0032 + t * 0.35 + k * 2.4) * h * 0.2 +
            Math.sin(x * 0.0081 - t * 0.22 + k * 4.0) * h * 0.07 * (1 - k) +
            (k - 0.5) * h * 0.22;
          if (x === -10) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      ctx.globalCompositeOperation = "source-over";
    };

    const loop = (ms: number) => {
      raf = 0;
      if (!visible) return;
      draw(ms / 1000);
      raf = requestAnimationFrame(loop);
    };

    resize();
    draw(4);
    const ro = new ResizeObserver(() => {
      resize();
      draw(4);
    });
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !reduced && !raf) raf = requestAnimationFrame(loop);
    });
    io.observe(canvas);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="absolute inset-0 h-full w-full" />;
}
