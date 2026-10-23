"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

const NAV_ITEMS = [
  { href: "/karya", label: "Karya" },
  { href: "/layanan", label: "Layanan" },
  { href: "/paket", label: "Paket" },
  { href: "/proses", label: "Proses" },
  { href: "/tentang", label: "Tentang" },
  { href: "/faq", label: "FAQ" },
] as const;

export function SiteHeader() {
  const pathname = usePathname() || "/";
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Lock body scroll & Escape listener when mobile drawer open
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

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0d0c18]/92 text-[#f7f6fb] backdrop-blur-md">
      <div className="editorial-container flex h-[72px] items-center justify-between gap-4">
        {/* Official Brand Identity — Always placed on dark header so white left facet & violet right facet stay razor-sharp */}
        <Link
          href="/"
          aria-label="Velora Studio — Beranda"
          className="group inline-flex items-center gap-3 py-1.5"
        >
          <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/12 bg-[#141325] transition-colors group-hover:border-[#7fa3ff]/50">
            <Image
              src="/brand/velora-symbol-isolated.png"
              alt=""
              width={26}
              height={26}
              priority
              className="h-[26px] w-[26px] object-contain"
            />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-[15px] font-bold tracking-[0.14em] text-white">
              VELORA
            </span>
            <span className="mt-1 font-mono text-[10px] tracking-[0.18em] text-[#b1adc7]">
              STUDIO
            </span>
          </span>
        </Link>

        {/* Desktop Architectural Navigation */}
        <nav aria-label="Navigasi utama" className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative px-3.5 py-2 text-sm font-medium transition-colors",
                  active ? "text-white" : "text-[#b1adc7] hover:text-white"
                )}
              >
                {item.label}
                {active && (
                  <motion.span
                    layoutId="velora-nav-indicator"
                    className="absolute inset-x-3 -bottom-[17px] h-[2px] bg-[#7fa3ff]"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Primary Action */}
        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/mulai-proyek"
            className={cn(
              "group inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all",
              pathname === "/mulai-proyek"
                ? "bg-white text-[#0d0c18]"
                : "bg-[#4638d2] text-white hover:bg-[#5344e6]"
            )}
          >
            <span>Diskusikan Proyek</span>
            <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Mobile Menu Trigger */}
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-expanded={mobileOpen}
          aria-controls="velora-mobile-drawer"
          aria-label={mobileOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/14 bg-[#141325] text-white transition-colors hover:border-white/30 lg:hidden"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
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
              className="fixed inset-0 top-[72px] z-40 bg-black/65 backdrop-blur-xs lg:hidden"
            />
            <motion.nav
              key="drawer"
              id="velora-mobile-drawer"
              aria-label="Navigasi seluler"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-x-0 top-[72px] z-50 border-b border-white/12 bg-[#0d0c18] px-5 pt-4 pb-6 shadow-2xl lg:hidden"
            >
              <div className="mx-auto flex max-w-lg flex-col divide-y divide-white/8">
                {NAV_ITEMS.map((item, idx) => {
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex items-center justify-between py-3.5 text-base font-medium transition-colors",
                        active ? "text-[#7fa3ff]" : "text-[#f7f6fb] hover:text-white"
                      )}
                    >
                      <span className="inline-flex items-center gap-3">
                        <span className="font-mono text-xs text-[#686380]">
                          0{idx + 1}
                        </span>
                        <span>{item.label}</span>
                      </span>
                      <ArrowUpRight className="h-4 w-4 opacity-60" />
                    </Link>
                  );
                })}
              </div>

              <div className="mx-auto mt-5 max-w-lg">
                <Link
                  href="/mulai-proyek"
                  onClick={() => setMobileOpen(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#4638d2] px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#5344e6]"
                >
                  <span>Diskusikan Proyek</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
