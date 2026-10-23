"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  CheckCircle2,
  Clock,
  RotateCcw,
  Sliders,
  Workflow,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/cn";

const ACCENT_PRESETS = {
  violet: { label: "Velora Violet", hex: "#4638d2", pillBg: "rgba(70, 56, 210, 0.16)" },
  emerald: { label: "Forest Emerald", hex: "#0f766e", pillBg: "rgba(15, 118, 110, 0.18)" },
  amber: { label: "Warm Terracotta", hex: "#b45309", pillBg: "rgba(180, 83, 9, 0.18)" },
} as const;

type SandboxTab = "cms" | "ops";
type QueueStatus = "menunggu" | "dikonfirmasi" | "selesai";

type QueueItem = {
  id: string;
  customer: string;
  service: string;
  slot: string;
  status: QueueStatus;
};

const INITIAL_QUEUE: QueueItem[] = [
  {
    id: "REQ-01",
    customer: "Dimas Saputra",
    service: "Paket Konsultasi & Pemetaan",
    slot: "10:00 WIB",
    status: "menunggu",
  },
  {
    id: "REQ-02",
    customer: "Ayu Lestari",
    service: "Reservasi Layanan Prioritas",
    slot: "13:30 WIB",
    status: "dikonfirmasi",
  },
  {
    id: "REQ-03",
    customer: "Raka Pratama",
    service: "Sesi Reguler Sore",
    slot: "16:00 WIB",
    status: "selesai",
  },
];

const NEXT_STATUS: Record<QueueStatus, QueueStatus> = {
  menunggu: "dikonfirmasi",
  dikonfirmasi: "selesai",
  selesai: "menunggu",
};

const STATUS_BADGE: Record<QueueStatus, { label: string; classes: string }> = {
  menunggu: {
    label: "Menunggu",
    classes: "border-amber-400/35 bg-amber-400/12 text-amber-300",
  },
  dikonfirmasi: {
    label: "Dikonfirmasi",
    classes: "border-[#7fa3ff]/35 bg-[#7fa3ff]/12 text-[#7fa3ff]",
  },
  selesai: {
    label: "Selesai",
    classes: "border-emerald-400/35 bg-emerald-400/12 text-emerald-300",
  },
};

export function LiveSystemSandbox() {
  const [tab, setTab] = useState<SandboxTab>("cms");

  // Mode 1: Custom CMS State
  const [brandName, setBrandName] = useState("Roemah Seduh Nusantara");
  const [promoHeadline, setPromoHeadline] = useState(
    "Batch sangrai minggu ini sudah dibuka untuk pemesanan kafe & rumah."
  );
  const [featuredPrice, setFeaturedPrice] = useState("Rp 95.000 / 250g");
  const [accentKey, setAccentKey] = useState<keyof typeof ACCENT_PRESETS>("violet");
  const [bookingActive, setBookingActive] = useState(true);

  // Mode 2: Operational Workflow State
  const [queue, setQueue] = useState<QueueItem[]>(INITIAL_QUEUE);

  const resetCms = () => {
    setBrandName("Roemah Seduh Nusantara");
    setPromoHeadline(
      "Batch sangrai minggu ini sudah dibuka untuk pemesanan kafe & rumah."
    );
    setFeaturedPrice("Rp 95.000 / 250g");
    setAccentKey("violet");
    setBookingActive(true);
  };

  const cycleQueueStatus = (id: string) => {
    setQueue((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: NEXT_STATUS[item.status] } : item
      )
    );
  };

  const activeAccent = ACCENT_PRESETS[accentKey];
  const waitingCount = queue.filter((q) => q.status === "menunggu").length;
  const confirmedCount = queue.filter((q) => q.status === "dikonfirmasi").length;
  const doneCount = queue.filter((q) => q.status === "selesai").length;

  return (
    <section
      id="simulasi"
      className="studio-grid-dark border-b border-white/10 py-20 text-[#f7f6fb] md:py-28"
    >
      <div className="editorial-container">
        <div className="flex flex-col justify-between gap-6 border-b border-white/10 pb-10 lg:flex-row lg:items-end">
          <div className="max-w-2xl space-y-3">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-[#7fa3ff]">
              03 / SIMULASI INTERAKTIF LANGSUNG
            </p>
            <h2 className="font-display text-3xl font-bold leading-[1.1] text-white sm:text-4xl">
              Rasakan bagaimana sistem buatan Velora bekerja di belakang layar.
            </h2>
            <p className="text-sm leading-relaxed text-[#b9b5ce] sm:text-base">
              Coba ubah konten di panel kiri atau klik status antrean di bawah. Seperti inilah
              kemudahan yang didapatkan klien kami setelah website atau sistem diserahterimakan.
            </p>
          </div>

          {/* Mode Switcher */}
          <div
            role="tablist"
            aria-label="Pilih mode simulasi interaktif"
            className="inline-flex self-start rounded-xl border border-white/14 bg-[#141325] p-1"
          >
            <button
              type="button"
              role="tab"
              aria-selected={tab === "cms"}
              onClick={() => setTab("cms")}
              className={cn(
                "relative inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs font-semibold transition-colors sm:text-sm",
                tab === "cms" ? "text-white" : "text-[#a4a0bc] hover:text-white"
              )}
            >
              {tab === "cms" && (
                <motion.span
                  layoutId="sandbox-mode-pill"
                  className="absolute inset-0 rounded-lg bg-[#4638d2]"
                  transition={{ type: "spring", stiffness: 360, damping: 30 }}
                />
              )}
              <Sliders className="relative z-10 h-4 w-4" />
              <span className="relative z-10">Custom CMS Mandiri</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={tab === "ops"}
              onClick={() => setTab("ops")}
              className={cn(
                "relative inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs font-semibold transition-colors sm:text-sm",
                tab === "ops" ? "text-white" : "text-[#a4a0bc] hover:text-white"
              )}
            >
              {tab === "ops" && (
                <motion.span
                  layoutId="sandbox-mode-pill"
                  className="absolute inset-0 rounded-lg bg-[#4638d2]"
                  transition={{ type: "spring", stiffness: 360, damping: 30 }}
                />
              )}
              <Workflow className="relative z-10 h-4 w-4" />
              <span className="relative z-10">Alur Operasional</span>
            </button>
          </div>
        </div>

        <div className="mt-10">
          <AnimatePresence mode="wait">
            {tab === "cms" ? (
              <motion.div
                key="sandbox-cms"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 gap-6 lg:grid-cols-12"
              >
                {/* CMS Controller Left */}
                <div className="space-y-4 rounded-2xl border border-white/12 bg-[#141325] p-5 sm:p-6 lg:col-span-5">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3.5">
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-wider text-[#7fa3ff]">
                        SIMULASI PANEL ADMIN KLIEN
                      </p>
                      <h3 className="font-display text-base font-bold text-white">
                        Editor Konten Harian
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={resetCms}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-white/14 px-2.5 py-1.5 text-xs font-medium text-[#b1adc7] transition-colors hover:border-white/30 hover:text-white"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                      <span>Reset</span>
                    </button>
                  </div>

                  <div className="space-y-3.5 text-xs sm:text-sm">
                    <label className="block space-y-1.5">
                      <span className="font-medium text-[#d6d3e8]">Nama Usaha / Brand</span>
                      <input
                        type="text"
                        value={brandName}
                        maxLength={48}
                        onChange={(e) => setBrandName(e.target.value)}
                        className="w-full rounded-lg border border-white/14 bg-[#0d0c18] px-3.5 py-2.5 text-sm text-white placeholder-[#686380]"
                      />
                    </label>

                    <label className="block space-y-1.5">
                      <span className="font-medium text-[#d6d3e8]">Pengumuman / Headline Utama</span>
                      <textarea
                        rows={2}
                        value={promoHeadline}
                        maxLength={140}
                        onChange={(e) => setPromoHeadline(e.target.value)}
                        className="w-full resize-none rounded-lg border border-white/14 bg-[#0d0c18] px-3.5 py-2.5 text-sm text-white placeholder-[#686380]"
                      />
                    </label>

                    <label className="block space-y-1.5">
                      <span className="font-medium text-[#d6d3e8]">Harga Paket / Produk Unggulan</span>
                      <input
                        type="text"
                        value={featuredPrice}
                        maxLength={36}
                        onChange={(e) => setFeaturedPrice(e.target.value)}
                        className="w-full rounded-lg border border-white/14 bg-[#0d0c18] px-3.5 py-2.5 text-sm text-white"
                      />
                    </label>

                    <fieldset className="space-y-2">
                      <legend className="font-medium text-[#d6d3e8]">Tema Aksen Brand</legend>
                      <div className="grid grid-cols-3 gap-2">
                        {(
                          Object.entries(ACCENT_PRESETS) as Array<
                            [keyof typeof ACCENT_PRESETS, (typeof ACCENT_PRESETS)["violet"]]
                          >
                        ).map(([key, preset]) => {
                          const selected = accentKey === key;
                          return (
                            <button
                              key={key}
                              type="button"
                              onClick={() => setAccentKey(key)}
                              aria-pressed={selected}
                              className={cn(
                                "flex items-center justify-center gap-1.5 rounded-lg border px-2.5 py-2 text-xs font-medium transition-colors",
                                selected
                                  ? "border-white/45 bg-white/10 text-white"
                                  : "border-white/12 bg-[#0d0c18] text-[#b1adc7] hover:text-white"
                              )}
                            >
                              <span
                                className="h-2.5 w-2.5 rounded-full"
                                style={{ backgroundColor: preset.hex }}
                              />
                              <span className="truncate">{preset.label.split(" ")[1]}</span>
                              {selected && <Check className="h-3 w-3 shrink-0" />}
                            </button>
                          );
                        })}
                      </div>
                    </fieldset>

                    <div className="flex items-center justify-between rounded-xl border border-white/10 bg-[#0d0c18] px-3.5 py-3">
                      <div>
                        <p className="text-xs font-semibold text-white">Status Slot Pemesanan</p>
                        <p className="text-xs text-[#9c97b5]">
                          Tampilkan tombol order langsung di halaman depan
                        </p>
                      </div>
                      <button
                        type="button"
                        role="switch"
                        aria-checked={bookingActive}
                        aria-label="Aktifkan slot pemesanan"
                        onClick={() => setBookingActive((v) => !v)}
                        className={cn(
                          "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors",
                          bookingActive ? "bg-emerald-500" : "bg-white/20"
                        )}
                      >
                        <span
                          className={cn(
                            "inline-block h-4 w-4 rounded-full bg-white transition-transform",
                            bookingActive ? "translate-x-6" : "translate-x-1"
                          )}
                        />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Live Website Preview Right */}
                <div className="flex flex-col justify-between rounded-2xl border border-white/14 bg-[#faf9fc] p-5 text-[#151324] sm:p-7 lg:col-span-7">
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#e2dfec] pb-4">
                      <span className="font-mono text-[11px] uppercase tracking-wider text-[#686380]">
                        PRATINJAU LANGSUNG WEBSITE PELANGGAN (DEMO)
                      </span>
                      <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-emerald-700">
                        <span className="h-2 w-2 rounded-full bg-emerald-600" />
                        Sinkron seketika
                      </span>
                    </div>

                    {/* Simulated Client Site Shell */}
                    <div className="mt-5 rounded-xl border border-[#dad6e8] bg-white p-5 shadow-xs sm:p-6">
                      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#ece9f4] pb-4">
                        <span
                          className="font-display text-base font-bold tracking-tight sm:text-lg"
                          style={{ color: activeAccent.hex }}
                        >
                          {brandName.trim() || "Nama Brand Anda"}
                        </span>
                        <div className="flex items-center gap-3 text-xs font-medium text-[#686380]">
                          <span>Katalog</span>
                          <span>Lokasi</span>
                          {bookingActive ? (
                            <span
                              className="rounded-md px-2.5 py-1 font-semibold text-white"
                              style={{ backgroundColor: activeAccent.hex }}
                            >
                              Pesan Sekarang
                            </span>
                          ) : (
                            <span className="rounded-md bg-[#f2f0f7] px-2.5 py-1 text-[#686380]">
                              Kuota Penuh
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="mt-6 space-y-4">
                        <span
                          className="inline-block rounded-full px-3 py-1 font-mono text-[11px] font-semibold"
                          style={{
                            backgroundColor: activeAccent.pillBg,
                            color: activeAccent.hex,
                          }}
                        >
                          PEMBARUAN HARI INI
                        </span>

                        <motion.h4
                          key={promoHeadline}
                          initial={{ opacity: 0.7 }}
                          animate={{ opacity: 1 }}
                          className="font-display text-xl font-bold leading-snug text-[#151324] sm:text-2xl"
                        >
                          {promoHeadline.trim() || "Tulis pengumuman utama usaha Anda di panel kiri."}
                        </motion.h4>

                        <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-[#e2dfec] bg-[#faf9fc] p-3.5">
                          <div>
                            <p className="text-xs text-[#686380]">Penawaran Unggulan</p>
                            <p className="font-display text-base font-bold text-[#151324]">
                              {featuredPrice.trim() || "Hubungi untuk harga"}
                            </p>
                          </div>
                          <span className="font-mono text-xs text-[#433f59]">
                            {bookingActive
                              ? "✓ Menerima reservasi online"
                              : "⏸ Reservasi ditutup sementara"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col justify-between gap-3 border-t border-[#e2dfec] pt-4 sm:flex-row sm:items-center">
                    <p className="text-xs text-[#433f59]">
                      Ingin memiliki panel pengelola mandiri seperti simulasi ini?
                    </p>
                    <Link
                      href="/mulai-proyek?layanan=cms&paket=aplikasi-web"
                      className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-lg bg-[#151324] px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#4638d2]"
                    >
                      <span>Diskusikan Website + CMS</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="sandbox-ops"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="rounded-2xl border border-white/14 bg-[#141325] p-5 sm:p-7"
              >
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                  <div className="space-y-4 lg:col-span-4">
                    <p className="font-mono text-[11px] uppercase tracking-wider text-[#7fa3ff]">
                      SIMULASI WORKFLOW OPERASIONAL
                    </p>
                    <h3 className="font-display text-xl font-bold text-white">
                      Klik status antrean untuk memperbarui tahapan kerja.
                    </h3>
                    <p className="text-sm leading-relaxed text-[#b9b5ce]">
                      Saat sistem dibuat mengikuti proses lapangan, setiap staf tahu mana permintaan
                      yang baru masuk, sudah dikonfirmasi, atau telah tuntas—tanpa menumpuk chat.
                    </p>

                    <div className="grid grid-cols-3 gap-2.5 pt-2">
                      <div className="rounded-xl border border-white/10 bg-[#0d0c18] p-3">
                        <span className="font-mono text-[10px] text-amber-300">MENUNGGU</span>
                        <p className="mt-1 font-display text-2xl font-bold text-white">
                          0{waitingCount}
                        </p>
                      </div>
                      <div className="rounded-xl border border-white/10 bg-[#0d0c18] p-3">
                        <span className="font-mono text-[10px] text-[#7fa3ff]">KONFIRMASI</span>
                        <p className="mt-1 font-display text-2xl font-bold text-white">
                          0{confirmedCount}
                        </p>
                      </div>
                      <div className="rounded-xl border border-white/10 bg-[#0d0c18] p-3">
                        <span className="font-mono text-[10px] text-emerald-300">SELESAI</span>
                        <p className="mt-1 font-display text-2xl font-bold text-white">
                          0{doneCount}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 lg:col-span-8">
                    {queue.map((item) => {
                      const badge = STATUS_BADGE[item.status];
                      return (
                        <div
                          key={item.id}
                          className="flex flex-col justify-between gap-3 rounded-xl border border-white/10 bg-[#0d0c18] p-4 sm:flex-row sm:items-center"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2.5">
                              <span className="font-mono text-xs text-[#7fa3ff]">{item.id}</span>
                              <span className="font-semibold text-white">{item.customer}</span>
                            </div>
                            <p className="text-xs text-[#b1adc7]">
                              {item.service} ·{" "}
                              <span className="inline-flex items-center gap-1 font-mono">
                                <Clock className="h-3 w-3" /> {item.slot}
                              </span>
                            </p>
                          </div>

                          <div className="flex items-center gap-2.5">
                            <span
                              className={cn(
                                "inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 font-mono text-xs",
                                badge.classes
                              )}
                            >
                              <CheckCircle2 className="h-3.5 w-3.5" />
                              {badge.label}
                            </span>
                            <button
                              type="button"
                              onClick={() => cycleQueueStatus(item.id)}
                              className="rounded-lg border border-white/16 bg-white/6 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:border-white/35 hover:bg-[#4638d2]"
                            >
                              Majukan Status →
                            </button>
                          </div>
                        </div>
                      );
                    })}

                    <div className="flex flex-col justify-between gap-3 pt-3 sm:flex-row sm:items-center">
                      <p className="text-xs text-[#9c97b5]">
                        Simulasi demonstratif di browser. Pada proyek nyata, status tersimpan aman
                        di database PostgreSQL sesuai hak akses peran.
                      </p>
                      <Link
                        href="/mulai-proyek?layanan=sistem&paket=sistem-bisnis"
                        className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-lg bg-[#4638d2] px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#5446e6]"
                      >
                        <span>Rancang Sistem Operasional</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
