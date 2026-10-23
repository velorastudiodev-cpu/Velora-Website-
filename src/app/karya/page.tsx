import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { EditorialReveal } from "@/components/motion/EditorialReveal";
import { KaryaFilterGallery } from "@/components/showcase/KaryaFilterGallery";

export const metadata: Metadata = {
  title: "Galeri Karya & Eksplorasi Sistem",
  description:
    "Kumpulan proyek klien terverifikasi (Ikbar Barbershop, Ikbar CMS Dashboard, Dzikri Mount Guide) serta eksplorasi konsep sistem bisnis Velora Studio.",
};

export default function KaryaPage() {
  return (
    <>
      <section className="studio-grid-dark border-b border-white/10 py-18 text-[#f7f6fb] md:py-24">
        <div className="editorial-container grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
          <div className="space-y-4 lg:col-span-8">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-[#7fa3ff]">
              KARYA &amp; PROTOTIPE / 01
            </p>
            <h1 className="font-display text-4xl font-bold leading-[1.08] text-white sm:text-5xl">
              Bukti kerja produksi dan eksplorasi arsitektur kami.
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-[#b9b5ce] sm:text-lg">
              Kami membedakan secara tegas antara proyek klien nyata yang sudah rilis publik
              dengan prototipe eksplorasi internal—agar Anda menilai kualitas kerja kami dari
              konteks yang jujur.
            </p>
          </div>

          <div className="rounded-xl border border-white/12 bg-[#141325] p-5 text-xs leading-relaxed text-[#b1adc7] lg:col-span-4">
            <strong className="block font-mono text-[11px] uppercase tracking-wider text-white">
              KETERANGAN LABEL
            </strong>
            <span className="mt-1.5 block">
              Proyek berlabel <strong className="text-emerald-300">Proyek Klien</strong> memiliki
              tautan live aktif. Item berlabel <strong className="text-white">Konsep / Demo</strong>{" "}
              adalah studi desain internal tanpa klaim hasil bisnis fiktif.
            </span>
          </div>
        </div>
      </section>

      <section className="bg-[#faf9fc] py-16 md:py-24">
        <div className="editorial-container">
          <KaryaFilterGallery />

          <EditorialReveal className="mt-16 flex flex-col justify-between gap-6 rounded-2xl border border-[#dad6e8] bg-white p-7 sm:flex-row sm:items-center sm:p-9">
            <div className="space-y-1.5">
              <p className="font-mono text-xs uppercase tracking-wider text-[#4638d2]">
                DISKUSI KEBUTUHAN
              </p>
              <h2 className="font-display text-2xl font-bold text-[#151324]">
                Melihat pola masalah yang mirip dengan bisnis Anda?
              </h2>
              <p className="text-sm text-[#433f59]">
                Mari petakan apakah usaha Anda membutuhkan website bisnis, CMS mandiri, atau
                alur operasional khusus.
              </p>
            </div>
            <Link
              href="/mulai-proyek"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-[#4638d2] px-5 py-3 text-sm font-semibold text-white hover:bg-[#3a2db8]"
            >
              <span>Mulai Proyek</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </EditorialReveal>
        </div>
      </section>
    </>
  );
}
