"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";

export const ENGINEERING_STEPS = [
  {
    index: "01",
    phase: "Discovery & Pemetaan Konteks",
    summary:
      "Kita mulai dari memahami tujuan usaha, profil pengguna, batasan operasional, dan apa yang selama ini menghambat pekerjaan—agar ruang lingkup punya dasar nyata.",
    outputs: ["Ringkasan masalah & prioritas", "Batas ruang lingkup (scope) jujur", "Struktur halaman / alur sistem"],
  },
  {
    index: "02",
    phase: "Arsitektur Informasi & Desain UI/UX",
    summary:
      "Menyusun urutan pesan, tata letak layar, serta arah visual khas brand sebelum kode diperbanyak. Setiap tombol dan bagian halaman harus punya alasan jelas.",
    outputs: ["Hierarki konten & copy utama", "Desain antarmuka Desktop & Mobile", "Model data (bila memakai CMS/sistem)"],
  },
  {
    index: "03",
    phase: "Development & Pengujian Bertahap",
    summary:
      "Implementasi frontend dan backend dilakukan secara terukur dengan tautan preview yang bisa Anda tinjau langsung—termasuk uji responsivitas, validasi form, dan keamanan.",
    outputs: ["Tautan staging untuk review", "Validasi input & proteksi rute", "QA lintas ukuran layar"],
  },
  {
    index: "04",
    phase: "Peluncuran, Handover & Opsi Dukungan",
    summary:
      "Sistem dirilis ke domain produksi disertai dokumentasi pemakaian yang ringkas. Kebutuhan pemeliharaan atau pengembangan tahap berikutnya dibicarakan terbuka sesuai pola pemakaian.",
    outputs: ["Deployment produksi siap pakai", "Dokumentasi serah terima pengelola", "Diskusi opsi dukungan pasca-rilis"],
  },
] as const;

export function ProcessScrollSection({ compact = false }: { compact?: boolean }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 75%", "end 65%"],
  });

  const smoothScale = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div ref={containerRef} className="relative pl-6 sm:pl-10">
      {/* Architectural Vertical Track */}
      <div
        aria-hidden="true"
        className="absolute top-2 bottom-2 left-1.5 w-[2px] bg-white/12 sm:left-2.5"
      />
      {!prefersReduced && (
        <motion.div
          aria-hidden="true"
          style={{ scaleY: smoothScale }}
          className="absolute top-2 bottom-2 left-1.5 w-[2px] origin-top bg-[#7fa3ff] sm:left-2.5"
        />
      )}

      <div className="space-y-8 sm:space-y-10">
        {ENGINEERING_STEPS.map((step) => (
          <div
            key={step.index}
            className="relative rounded-2xl border border-white/12 bg-[#141325] p-5 sm:p-7"
          >
            <span
              aria-hidden="true"
              className="absolute top-7 -left-[23px] h-3 w-3 rounded-full border-2 border-[#7fa3ff] bg-[#0d0c18] sm:-left-[35px]"
            />
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
              <div className="space-y-2.5 md:max-w-xl">
                <span className="font-mono text-xs tracking-[0.14em] text-[#7fa3ff]">
                  TAHAP {step.index} / 04
                </span>
                <h3 className="font-display text-xl font-bold text-white sm:text-2xl">
                  {step.phase}
                </h3>
                <p className="text-sm leading-relaxed text-[#b9b5ce] sm:text-base">
                  {step.summary}
                </p>
              </div>

              {!compact && (
                <div className="shrink-0 space-y-1.5 rounded-xl border border-white/10 bg-[#0d0c18] p-4 md:w-64">
                  <p className="font-mono text-[10px] uppercase tracking-wider text-[#8e8aa8]">
                    LUARAN TAHAP INI
                  </p>
                  <ul className="space-y-1.5 text-xs text-[#d6d3e8]">
                    {step.outputs.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#7fa3ff]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
