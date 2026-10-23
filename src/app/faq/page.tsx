import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FaqInteractiveList } from "@/components/faq/FaqInteractiveList";

export const metadata: Metadata = {
  title: "Pertanyaan yang Sering Dibahas (FAQ)",
  description:
    "Jawaban transparan seputar layanan Velora Studio, cara kerja, estimasi paket, Custom CMS mandiri, dan proses serah terima proyek.",
};

export default function FaqPage() {
  return (
    <>
      <section className="studio-grid-dark border-b border-white/10 py-18 text-[#f7f6fb] md:py-24">
        <div className="editorial-container grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
          <div className="space-y-4 lg:col-span-8">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-[#7fa3ff]">
              PERTANYAAN UMUM / 06
            </p>
            <h1 className="font-display text-4xl font-bold leading-[1.08] text-white sm:text-5xl">
              Hal-hal penting sebelum kita memulai proyek.
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-[#b9b5ce] sm:text-lg">
              Jawaban berikut membantu menyamakan ekspektasi awal. Detail ruang lingkup tetap
              disesuaikan dengan konteks dan kebutuhan nyata usaha Anda.
            </p>
          </div>
          <p className="rounded-xl border border-white/12 bg-[#141325] p-5 text-xs leading-relaxed text-[#b1adc7] lg:col-span-4">
            Kami tidak menampilkan chatbot otomatis atau percakapan simulasi di halaman ini.
            Untuk memulai diskusi nyata, kirimkan konteks Anda lewat formulir Mulai Proyek.
          </p>
        </div>
      </section>

      <section className="bg-[#faf9fc] py-16 md:py-24">
        <div className="editorial-container grid grid-cols-1 gap-12 lg:grid-cols-12">
          <aside className="space-y-4 lg:col-span-4">
            <div className="rounded-2xl border border-[#dad6e8] bg-white p-6">
              <p className="font-mono text-xs uppercase tracking-wider text-[#4638d2]">
                PERTANYAAN KHUSUS?
              </p>
              <h2 className="mt-2 font-display text-xl font-bold text-[#151324]">
                Konteks bisnis Anda mungkin unik.
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[#433f59]">
                Tuliskan situasi yang sedang dihadapi pada form brief singkat. Kami akan
                mempelajarinya dan memberi rekomendasi jalur yang paling efisien.
              </p>
              <Link
                href="/mulai-proyek"
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#4638d2] px-4 py-3 text-xs font-semibold text-white hover:bg-[#3a2db8]"
              >
                <span>Buka Form Mulai Proyek</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </aside>

          <div className="lg:col-span-8">
            <FaqInteractiveList />
          </div>
        </div>
      </section>
    </>
  );
}
