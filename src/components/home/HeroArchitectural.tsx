"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Globe,
  LayoutDashboard,
  Sliders,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/cn";

type BlueprintKey = "cms" | "workflow" | "catalog";

const WORKBENCH_MODES: Array<{
  key: BlueprintKey;
  code: string;
  tabLabel: string;
  badge: string;
  headline: string;
  context: string;
  liveProofLabel: string;
  liveProofHref: string;
  rows: Array<{ title: string; meta: string; status: string; accent: string }>;
}> = [
  {
    key: "cms",
    code: "01",
    tabLabel: "Website + CMS",
    badge: "ARSITEKTUR DUA SISI · PUBLIK & PENGELOLA",
    headline: "Ubah layanan, harga, dan foto sendiri tanpa menunggu programmer.",
    context:
      "Halaman depan cepat untuk pelanggan, terhubung ke panel admin privat bagi pemilik usaha.",
    liveProofLabel: "Lihat studi kasus nyata: Ikbar Barbershop + CMS",
    liveProofHref: "/karya/ikbar-barbershop",
    rows: [
      {
        title: "Halaman Publik Pelanggan",
        meta: "Responsif mobile · SEO terstruktur",
        status: "Live",
        accent: "text-emerald-400 border-emerald-400/25 bg-emerald-400/10",
      },
      {
        title: "Panel Custom CMS Pemilik",
        meta: "Google OAuth · Edit layanan & galeri",
        status: "Tersinkron",
        accent: "text-[#7fa3ff] border-[#7fa3ff]/30 bg-[#7fa3ff]/10",
      },
      {
        title: "Jalur Reservasi Pelanggan",
        meta: "Arah tindakan jelas tanpa kebingungan",
        status: "Aktif",
        accent: "text-white/90 border-white/15 bg-white/6",
      },
    ],
  },
  {
    key: "workflow",
    code: "02",
    tabLabel: "Aplikasi Kerja",
    badge: "RUANG KERJA INTERNAL · DATA TERPUSAT",
    headline: "Rapikan antrean pekerjaan yang selama ini tercecer di chat dan spreadsheet.",
    context:
      "Dirancang mengikuti urutan kerja tim Anda di lapangan—bukan memaksakan fitur rumit yang jarang disentuh.",
    liveProofLabel: "Pelajari eksplorasi: Ritme Operasi",
    liveProofHref: "/karya/ritme-operasi",
    rows: [
      {
        title: "Permintaan Masuk #VR-108",
        meta: "Validasi form otomatis · Tanpa salin ulang",
        status: "Ditinjau",
        accent: "text-amber-300 border-amber-300/25 bg-amber-300/10",
      },
      {
        title: "Jadwal & Penugasan Tim",
        meta: "Status tanggung jawab terlihat jelas",
        status: " Terjadwal",
        accent: "text-[#7fa3ff] border-[#7fa3ff]/30 bg-[#7fa3ff]/10",
      },
      {
        title: "Rekap Operasional Mingguan",
        meta: "Ringkasan keputusan siap tinjau pemilik",
        status: "Terverifikasi",
        accent: "text-emerald-400 border-emerald-400/25 bg-emerald-400/10",
      },
    ],
  },
  {
    key: "catalog",
    code: "03",
    tabLabel: "Katalog & Rute",
    badge: "PRESENTASI LAYANAN · KONVERSI TERARAH",
    headline: "Bantu calon pelanggan memahami pilihan paket sebelum mereka bertanya.",
    context:
      "Menyusun perbandingan paket, dokumentasi asli, dan jawaban FAQ dalam satu alur baca yang meyakinkan.",
    liveProofLabel: "Lihat studi kasus nyata: Dzikri Mount Guide",
    liveProofHref: "/karya/dzikri-mount-guide",
    rows: [
      {
        title: "Struktur Paket & Cakupan",
        meta: "Mudah dibandingkan di layar ponsel",
        status: "Transparan",
        accent: "text-emerald-400 border-emerald-400/25 bg-emerald-400/10",
      },
      {
        title: "Galeri Dokumentasi Berfilter",
        meta: "Bukti lapangan asli, bukan gambar stok",
        status: "Terindeks",
        accent: "text-[#7fa3ff] border-[#7fa3ff]/30 bg-[#7fa3ff]/10",
      },
      {
        title: "Eskalasi Diskusi & Booking",
        meta: "Konteks pilihan langsung terbawa",
        status: "Siap",
        accent: "text-white/90 border-white/15 bg-white/6",
      },
    ],
  },
];

export function HeroArchitectural() {
  const [activeKey, setActiveKey] = useState<BlueprintKey>("cms");
  const activeMode =
    WORKBENCH_MODES.find((item) => item.key === activeKey) ?? WORKBENCH_MODES[0];

  return (
    <section className="studio-grid-dark relative border-b border-white/10 text-[#f7f6fb]">
      <div className="editorial-container py-16 sm:py-20 lg:py-26">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Left Editorial Column */}
          <div className="space-y-7 lg:col-span-7 lg:pr-4">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2.5 rounded-full border border-white/14 bg-[#141325] px-3.5 py-1.5"
            >
              <span className="h-2 w-2 rounded-full bg-[#7fa3ff]" />
              <span className="font-mono text-xs tracking-[0.12em] text-[#d6d3e8]">
                VELORA STUDIO · DIGITAL SOLUTIONS
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.52, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-[clamp(2.25rem,5vw,4.35rem)] font-bold leading-[1.04] tracking-[-0.035em] text-white"
            >
              Website dan sistem digital untuk bisnis yang ingin bergerak lebih jauh.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.52, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-2xl text-base leading-relaxed text-[#b9b5ce] sm:text-lg"
            >
              Kami menerjemahkan kebutuhan komersial dan operasional menjadi produk digital
              yang jernih—mulai dari website bisnis yang meyakinkan, panel CMS mandiri,
              hingga aplikasi web yang merapikan cara kerja tim Anda sehari-hari.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap items-center gap-3.5 pt-1"
            >
              <Link
                href="/mulai-proyek"
                className="group inline-flex min-h-[48px] items-center gap-2.5 rounded-lg bg-[#4638d2] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-[#5446e6]"
              >
                <span>Diskusikan Proyek</span>
                <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

              <Link
                href="/karya"
                className="group inline-flex min-h-[48px] items-center gap-2 rounded-lg border border-white/18 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-white/35 hover:bg-white/[0.07]"
              >
                <span>Lihat Karya Nyata</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </motion.div>

            {/* Studio Commitments Line */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.55, delay: 0.26 }}
              className="grid grid-cols-1 gap-3 border-t border-white/10 pt-6 text-xs text-[#b1adc7] sm:grid-cols-3"
            >
              <div className="flex items-start gap-2">
                <Globe className="mt-0.5 h-4 w-4 shrink-0 text-[#7fa3ff]" />
                <span>Desain orisinal sesuai karakter usaha, bukan template generik.</span>
              </div>
              <div className="flex items-start gap-2">
                <Sliders className="mt-0.5 h-4 w-4 shrink-0 text-[#7fa3ff]" />
                <span>Opsi CMS mandiri agar konten mudah diperbarui sendiri.</span>
              </div>
              <div className="flex items-start gap-2">
                <LayoutDashboard className="mt-0.5 h-4 w-4 shrink-0 text-[#7fa3ff]" />
                <span>Ruang lingkup jujur, diuji rapi di mobile maupun desktop.</span>
              </div>
            </motion.div>
          </div>

          {/* Right Interactive Architectural Workbench */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.58, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5"
          >
            <div className="overflow-hidden rounded-xl border border-white/14 bg-[#141325] shadow-2xl">
              {/* Top Window Bar */}
              <div className="flex items-center justify-between border-b border-white/10 bg-[#0d0c18]/80 px-4 py-3">
                <div className="flex items-center gap-2">
                  <Image
                    src="/brand/velora-symbol-isolated.png"
                    alt=""
                    width={18}
                    height={18}
                    className="h-[18px] w-[18px] object-contain"
                  />
                  <span className="font-mono text-xs tracking-wider text-[#d6d3e8]">
                    VELORA / SYSTEM BLUEPRINT
                  </span>
                </div>
                <span className="font-mono text-[11px] text-[#8e8aa8]">PILIH BENTUK SOLUSI</span>
              </div>

              {/* Interactive Blueprint Switcher Tabs */}
              <div
                role="tablist"
                aria-label="Contoh pendekatan solusi Velora"
                className="grid grid-cols-3 gap-1 border-b border-white/10 bg-[#0d0c18]/45 p-1.5"
              >
                {WORKBENCH_MODES.map((mode) => {
                  const selected = mode.key === activeKey;
                  return (
                    <button
                      key={mode.key}
                      type="button"
                      role="tab"
                      aria-selected={selected}
                      onClick={() => setActiveKey(mode.key)}
                      className={cn(
                        "relative rounded-lg px-2.5 py-2 text-center text-xs font-medium transition-colors",
                        selected ? "text-white" : "text-[#a4a0bc] hover:text-white"
                      )}
                    >
                      {selected && (
                        <motion.span
                          layoutId="hero-workbench-pill"
                          className="absolute inset-0 rounded-lg border border-[#7fa3ff]/35 bg-[#4638d2]/55"
                          transition={{ type: "spring", stiffness: 360, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10 block truncate">
                        <span className="mr-1 font-mono text-[10px] opacity-75">{mode.code}</span>
                        {mode.tabLabel}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Animated Blueprint Body */}
              <div className="p-5 sm:p-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeMode.key}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                    className="space-y-4"
                  >
                    <div className="space-y-2">
                      <p className="font-mono text-[11px] tracking-wider text-[#7fa3ff]">
                        {activeMode.badge}
                      </p>
                      <h2 className="font-display text-lg font-semibold leading-snug text-white sm:text-xl">
                        {activeMode.headline}
                      </h2>
                      <p className="text-xs leading-relaxed text-[#b1adc7] sm:text-sm">
                        {activeMode.context}
                      </p>
                    </div>

                    <div className="space-y-2 pt-1">
                      {activeMode.rows.map((row) => (
                        <div
                          key={row.title}
                          className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-[#0d0c18]/75 px-3.5 py-2.5"
                        >
                          <div className="min-w-0">
                            <p className="truncate text-xs font-semibold text-white sm:text-sm">
                              {row.title}
                            </p>
                            <p className="truncate text-xs text-[#9c97b5]">{row.meta}</p>
                          </div>
                          <span
                            className={cn(
                              "inline-flex shrink-0 items-center gap-1 rounded border px-2 py-0.5 font-mono text-[11px]",
                              row.accent
                            )}
                          >
                            <CheckCircle2 className="h-3 w-3" />
                            {row.status}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between border-t border-white/10 pt-3.5">
                      <Link
                        href={activeMode.liveProofHref}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#7fa3ff] transition-colors hover:text-white"
                      >
                        <span>{activeMode.liveProofLabel}</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </Link>
                      <span className="font-mono text-[11px] text-[#7c7796]">
                        {activeMode.code} / 03
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
