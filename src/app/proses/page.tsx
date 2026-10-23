import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ProcessScrollSection } from "@/components/home/ProcessScrollSection";

export const metadata: Metadata = {
  title: "Proses Kerja Rekayasa & Desain",
  description:
    "Empat tahap kerja Velora Studio: Discovery, Arsitektur & Desain, Development Bertahap, serta Peluncuran & Serah Terima.",
};

export default function ProsesPage() {
  return (
    <>
      <section className="studio-grid-dark border-b border-white/10 py-18 text-[#f7f6fb] md:py-24">
        <div className="editorial-container space-y-12">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
            <div className="space-y-4 lg:col-span-8">
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-[#7fa3ff]">
                PROSES KERJA / 04
              </p>
              <h1 className="font-display text-4xl font-bold leading-[1.08] text-white sm:text-5xl">
                Pekerjaan yang rapi dimulai dari pertanyaan yang tepat.
              </h1>
              <p className="max-w-2xl text-base leading-relaxed text-[#b9b5ce] sm:text-lg">
                Empat tahapan kerja untuk mengubah kebutuhan yang tadinya masih abstrak menjadi
                keputusan desain dan sistem digital yang dapat Anda tinjau secara terbuka.
              </p>
            </div>
            <p className="rounded-xl border border-white/12 bg-[#141325] p-5 text-xs leading-relaxed text-[#b1adc7] lg:col-span-4">
              Kami tidak menetapkan durasi sembarangan sebelum ruang lingkup dipahami bersama.
              Setiap tahap memiliki luaran jelas agar tidak ada kejutan di akhir proyek.
            </p>
          </div>

          <ProcessScrollSection />
        </div>
      </section>

      <section className="bg-[#faf9fc] py-16 md:py-20">
        <div className="editorial-container flex flex-col justify-between gap-6 rounded-2xl border border-[#dad6e8] bg-white p-7 sm:flex-row sm:items-center sm:p-9">
          <div className="space-y-1.5">
            <p className="font-mono text-xs uppercase tracking-wider text-[#4638d2]">
              TAHAP PERTAMA
            </p>
            <h2 className="font-display text-2xl font-bold text-[#151324]">
              Siap memulai dari sesi Discovery singkat?
            </h2>
            <p className="text-sm text-[#433f59]">
              Kirimkan ringkasan masalah atau rencana Anda—tidak perlu dokumen teknis rumit.
            </p>
          </div>
          <Link
            href="/mulai-proyek"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-[#4638d2] px-5 py-3 text-sm font-semibold text-white hover:bg-[#3a2db8]"
          >
            <span>Kirim Brief Proyek</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
