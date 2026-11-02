"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Menu } from "lucide-react";
import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

function Words({ text, delay, className }: { text: string; delay: number; className?: string }) {
  return (
    <span className={className}>
      {text.split(" ").map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: "105%", rotate: 4, filter: "blur(10px)" }}
            animate={{ y: "0%", rotate: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.1, delay: delay + i * 0.09, ease: EASE }}
          >
            {word}
            {" "}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/** Floating glass tablet showing a miniature of the Velora site. Tilts toward the pointer. */
function GlassTablet() {
  const rx = useSpring(8, { stiffness: 90, damping: 16 });
  const ry = useSpring(14, { stiffness: 90, damping: 16 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      ry.set(14 + x * 18);
      rx.set(8 - y * 14);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [rx, ry]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 80, rotateZ: -6 }}
      animate={{ opacity: 1, y: 0, rotateZ: -3 }}
      transition={{ duration: 1.4, delay: 0.9, ease: EASE }}
      className="pointer-events-none absolute bottom-[13%] left-[3.5%] z-10 hidden w-[min(25vw,340px)] [perspective:1100px] lg:block"
      aria-hidden="true"
    >
      <motion.div style={{ rotateX: rx, rotateY: ry }} className="velora-float [transform-style:preserve-3d]">
        <div className="relative rounded-[26px] border border-white/35 bg-white/10 p-2.5 shadow-[0_40px_80px_-30px_rgba(20,10,60,0.75),inset_0_1px_0_rgba(255,255,255,0.5)] backdrop-blur-md">
          <div className="relative overflow-hidden rounded-[18px] bg-[linear-gradient(150deg,#1d1838_0%,#0f0c20_60%,#241a46_100%)] px-5 pt-4 pb-5 text-white">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Image src="/brand/velora-symbol-isolated.png" alt="" width={16} height={16} className="h-4 w-4" />
                <span className="font-display text-[9px] font-bold tracking-[0.2em]">VELORA</span>
              </span>
              <span className="flex items-center gap-3 text-[8px] text-white/70">
                <span>Karya</span>
                <span>Layanan</span>
                <span>Studio</span>
                <Menu className="h-3 w-3" />
              </span>
            </div>
            <div className="mt-6 grid grid-cols-[1.15fr_1fr] items-center gap-3">
              <div>
                <p className="font-display text-[19px] leading-[1.1] font-semibold tracking-tight">
                  Ide yang membentuk masa depan.
                </p>
                <p className="mt-2 text-[8px] leading-relaxed text-white/60">
                  Desain yang bermakna dan teknologi yang dapat diandalkan.
                </p>
                <span className="mt-3 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#b9a8ff] text-[#1d1838]">
                  <ArrowRight className="h-3 w-3" />
                </span>
              </div>
              <div className="relative flex h-[110px] items-center justify-center [perspective:400px]">
                <div className="velora-cube relative h-14 w-14 [transform-style:preserve-3d]">
                  {["rotateY(0deg)", "rotateY(90deg)", "rotateY(180deg)", "rotateY(-90deg)", "rotateX(90deg)", "rotateX(-90deg)"].map((t) => (
                    <span
                      key={t}
                      className="absolute inset-0 border border-white/40 bg-[linear-gradient(135deg,rgba(201,187,255,0.55),rgba(255,182,214,0.18))]"
                      style={{ transform: `${t} translateZ(28px)` }}
                    />
                  ))}
                </div>
                <span className="absolute right-0 bottom-0 rounded-md border border-white/15 bg-white/10 px-1.5 py-1 text-[6.5px] leading-tight text-white/75 backdrop-blur">
                  Strategi
                  <br />
                  Desain
                  <br />
                  Teknologi
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [sceneReady, setSceneReady] = useState(false);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", "38%"]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let dispose: (() => void) | undefined;
    let cancelled = false;
    import("./hero-scene")
      .then(({ mountHeroScene }) => {
        if (cancelled) return;
        dispose = mountHeroScene(canvas, { reducedMotion: !!reduced, onReady: () => setSceneReady(true) });
      })
      .catch(() => {
        // WebGL unavailable: the CSS dusk gradient underneath stays as the backdrop.
      });
    return () => {
      cancelled = true;
      dispose?.();
    };
  }, [reduced]);

  // Magnetic CTA
  const ctaX = useSpring(0, { stiffness: 220, damping: 18 });
  const ctaY = useSpring(0, { stiffness: 220, damping: 18 });
  const onCtaMove = (e: ReactPointerEvent<HTMLAnchorElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    ctaX.set((e.clientX - (r.left + r.width / 2)) * 0.25);
    ctaY.set((e.clientY - (r.top + r.height / 2)) * 0.35);
  };

  return (
    <section
      ref={sectionRef}
      className="relative -mt-[76px] h-[100svh] min-h-[620px] max-h-[980px] overflow-hidden bg-[linear-gradient(180deg,#221a4d_0%,#6a4c9c_38%,#e9a3bf_62%,#f6c7b4_70%,#2a2146_72%,#150f28_100%)] text-white"
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className={`absolute inset-0 h-full w-full transition-opacity duration-[1600ms] ${sceneReady ? "opacity-100" : "opacity-0"}`}
      />
      {/* soft top shade so the header and headline stay legible over bright sky */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#120d2c]/55 to-transparent" />

      <motion.div
        style={{ y: copyY, opacity: copyOpacity }}
        className="relative z-20 mx-auto flex max-w-4xl flex-col items-center px-5 pt-[clamp(120px,17vh,170px)] text-center"
      >
        <h1 className="font-hero text-[clamp(2.75rem,7.6vw,6.4rem)] leading-[0.94] font-extrabold tracking-[-0.038em] drop-shadow-[0_6px_30px_rgba(40,20,90,0.35)]">
          <Words text="Dari sketsa," delay={0.15} className="block" />
          <Words text="sampai server." delay={0.4} className="velora-shimmer-text block" />
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.85, ease: EASE }}
          className="mt-5 max-w-md text-[15px] leading-relaxed text-white [text-shadow:0_1px_14px_rgba(45,22,95,0.7)] sm:text-[17px]"
        >
          Website, dashboard, dan aplikasi yang dirancang untuk bisnis Anda.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 1.05, ease: EASE }}
          className="mt-7"
        >
          <motion.span style={{ x: ctaX, y: ctaY }} className="inline-block">
            <Link
              href="#karya"
              onPointerMove={onCtaMove}
              onPointerLeave={() => {
                ctaX.set(0);
                ctaY.set(0);
              }}
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-white/50 bg-white/85 py-3 pr-4 pl-6 text-sm font-semibold text-[#2a1f5c] shadow-[0_18px_40px_-14px_rgba(40,20,100,0.6)] backdrop-blur-md transition-colors hover:bg-white"
            >
              <span className="velora-sheen absolute inset-0" aria-hidden="true" />
              <span className="relative">Lihat karya</span>
              <span className="relative flex h-7 w-7 items-center justify-center rounded-full bg-[#2a1f5c] text-white transition-transform duration-300 group-hover:translate-x-0.5 group-hover:rotate-[-35deg]">
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          </motion.span>
        </motion.div>
      </motion.div>

      <GlassTablet />

      {/* organic edge into the paper section below */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
        className="absolute inset-x-0 -bottom-px z-20 h-[46px] w-full text-[#f8f6f3] sm:h-[72px]"
      >
        <path fill="currentColor" d="M0 52 C 240 92 420 18 720 40 C 1010 62 1180 8 1440 30 L1440 90 L0 90 Z" />
      </svg>
    </section>
  );
}
