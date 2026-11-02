"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

const NAV_ITEMS = [
  { href: "/karya", label: "Karya", primary: true },
  { href: "/layanan", label: "Layanan", primary: true },
  { href: "/paket", label: "Paket", primary: false },
  { href: "/proses", label: "Proses", primary: true },
  { href: "/tentang", label: "Studio", primary: true },
  { href: "/faq", label: "FAQ", primary: false },
] as const;

export function SiteHeader() {
  const pathname = usePathname() || "/";
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileOpen]);

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));
  // Over the home hero the bar is clear; everywhere else (or once scrolled) it turns to dark glass.
  const solid = pathname !== "/" || scrolled || mobileOpen;
  const highlight = hovered ?? NAV_ITEMS.find((i) => i.primary && isActive(i.href))?.href ?? null;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 text-white transition-[background-color,box-shadow,backdrop-filter] duration-500",
        solid
          ? "bg-[#120d2a]/92 shadow-[0_10px_40px_-20px_rgba(10,5,30,0.8)] backdrop-blur-xl"
          : "bg-transparent"
      )}
    >
      <div className="editorial-container flex h-[76px] items-center justify-between gap-4">
        <Link href="/" aria-label="Velora Studio — Beranda" className="group inline-flex items-center gap-2.5 py-1.5">
          <Image
            src="/brand/velora-symbol-isolated.png"
            alt=""
            width={40}
            height={40}
            priority
            className="h-9 w-9 object-contain transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-105"
          />
          <span className="flex flex-col leading-none">
            <span className="font-display text-[17px] font-bold tracking-[0.16em]">VELORA</span>
            <span className="mt-1 text-[9px] font-medium tracking-[0.42em] text-white/70">STUDIO</span>
          </span>
        </Link>

        <nav
          aria-label="Navigasi utama"
          onPointerLeave={() => setHovered(null)}
          className="absolute left-1/2 hidden -translate-x-1/2 items-center rounded-full border border-white/20 bg-white/[0.08] p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] backdrop-blur-md lg:flex"
        >
          {NAV_ITEMS.filter((i) => i.primary).map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                onPointerEnter={() => setHovered(item.href)}
                className="relative rounded-full px-5 py-2 text-sm font-medium text-white/85 transition-colors hover:text-white"
              >
                {highlight === item.href && (
                  <motion.span
                    layoutId="velora-nav-pill"
                    className="absolute inset-0 rounded-full bg-white/16 shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                <span className="relative">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <Link
          href="/mulai-proyek"
          className="group hidden items-center gap-2.5 rounded-full bg-[#ece6ff] py-2.5 pr-3.5 pl-5 text-sm font-semibold text-[#221a4d] shadow-[0_10px_30px_-12px_rgba(185,168,255,0.9)] transition-all hover:bg-white lg:inline-flex"
        >
          <span>Mulai proyek</span>
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>

        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-expanded={mobileOpen}
          aria-controls="velora-mobile-drawer"
          aria-label={mobileOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20 lg:hidden"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 top-[76px] z-40 bg-[#0f0b22]/60 backdrop-blur-sm lg:hidden"
            />
            <motion.nav
              key="drawer"
              id="velora-mobile-drawer"
              aria-label="Navigasi seluler"
              initial={{ opacity: 0, y: -16, clipPath: "inset(0 0 100% 0 round 28px)" }}
              animate={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0 round 28px)" }}
              exit={{ opacity: 0, y: -12, clipPath: "inset(0 0 100% 0 round 28px)" }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-x-3 top-[80px] z-50 rounded-[28px] border border-white/12 bg-[#140f2c]/95 px-5 pt-3 pb-5 shadow-2xl backdrop-blur-xl lg:hidden"
            >
              <div className="flex flex-col divide-y divide-white/8">
                {NAV_ITEMS.map((item, idx) => {
                  const active = isActive(item.href);
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -14 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.06 + idx * 0.04, duration: 0.3 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "flex items-center justify-between py-3.5 text-base font-medium transition-colors",
                          active ? "text-[#c9bbff]" : "text-white/90 hover:text-white"
                        )}
                      >
                        <span className="inline-flex items-center gap-3">
                          <span className="font-mono text-xs text-white/40">0{idx + 1}</span>
                          <span>{item.label}</span>
                        </span>
                        <ArrowUpRight className="h-4 w-4 opacity-60" />
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
              <Link
                href="/mulai-proyek"
                onClick={() => setMobileOpen(false)}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#ece6ff] px-5 py-3.5 text-sm font-semibold text-[#221a4d]"
              >
                <span>Mulai proyek</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
