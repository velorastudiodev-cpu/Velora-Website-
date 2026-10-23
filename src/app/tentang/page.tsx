import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { EditorialReveal } from "@/components/motion/EditorialReveal";

export const metadata: Metadata = {
  title: "Tentang Velora Studio",
  description:
    "Profil Velora Studio: studio solusi digital dan pengembangan perangkat lunak independen yang berfokus pada kejelasan bisnis, desain berarah, dan sistem yang mudah dirawat.",
};

const STUDIO_STANDARDS = [
  {
    code: "01",
    title: "Bahasa yang dipahami pemilik usaha",
    detail:
      "Kami menjelaskan dampak dan alur pemakaian terlebih dahulu sebelum masuk ke istilah arsitektur teknis.",
  },
  {
    code: "02",
    title: "Fondasi kode yang siap dirawat",
    detail:
      "Bukan sekadar terlihat rapi di hari peluncuran, tetapi disusun modular agar mudah dikembangkan saat kebutuhan tumbuh.",
  },
  {
    code: "03",
    title: "Kejujuran tanpa klaim karangan",
    detail:
      "Kami transparan membedakan proyek klien nyata dan eksplorasi konsep, serta tidak mengarang angka metrik atau testimoni fiktif.",
  },
  {
    code: "04",
    title: "Ruang evolusi bertahap",
    detail:
      "Mulai dari ruang lingkup paling esensial tanpa memaksakan sistem besar sebelum pola kerja lapangan benar-benar tervalidasi.",
  },
] as const;

export default function TentangPage() {
  return (
    <>
      <section className="studio-grid-dark border-b border-white/10 py-18 text-[#f7f6fb] md:py-24">
        <div className="editorial-container grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
          <div className="space-y-4 lg:col-span-8">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-[#7fa3ff]">
              TENTANG VELORA / 05
            </p>
            <h1 className="font-display text-4xl font-bold leading-[1.08] text-white sm:text-5xl">
              Studio independen untuk kebutuhan digital yang tidak selesai hanya dengan template.
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-[#b9b5ce] sm:text-lg">
              Velora Studio adalah studio solusi digital dan rekayasa perangkat lunak yang
              dijalankan langsung oleh founder—cukup dekat untuk memahami konteks usaha Anda
              secara utuh, dan cukup disiplin untuk menjaga kualitas eksekusi teknis.
            </p>
          </div>
          <div className="rounded-xl border border-white/12 bg-[#141325] p-5 text-xs leading-relaxed text-[#b1adc7] lg:col-span-4">
            Anda berkomunikasi langsung dengan perancang dan pengembang sistem, bukan dilempar
            melewati berlapis perantara yang memutus konteks masalah.
          </div>
        </div>
      </section>

      <section className="bg-[#faf9fc] py-16 md:py-24">
        <div className="editorial-container space-y-16">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="space-y-4 lg:col-span-5">
              <p className="font-mono text-xs uppercase tracking-wider text-[#4638d2]">
                CARA KAMI MELIHAT PEKERJAAN
              </p>
              <h2 className="font-display text-2xl font-bold text-[#151324] sm:text-3xl">
                Website bukan sekadar brosur, dan aplikasi bukan kumpulan layar pasif.
              </h2>
            </div>

            <div className="space-y-4 text-sm leading-relaxed text-[#433f59] sm:text-base lg:col-span-7">
              <p>
                Banyak bisnis sudah memiliki media sosial aktif, namun tetap kehilangan calon
                pelanggan karena informasi layanan tercecer, cara reservasi membingungkan, atau
                tim internal habis waktu menyalin data berulang kali.
              </p>
              <p>
                Di titik itulah Velora bekerja: merapikan bagaimana penawaran Anda dipahami
                publik di layar depan, sekaligus membangun alat pengelolaan mandiri yang ringan
                di belakang layar bila dibutuhkan.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {STUDIO_STANDARDS.map((item, idx) => (
              <EditorialReveal
                key={item.code}
                delay={idx * 0.05}
                className="rounded-2xl border border-[#dad6e8] bg-white p-6 sm:p-7"
              >
                <span className="font-mono text-xs font-semibold text-[#4638d2]">
                  PRINSIP {item.code}
                </span>
                <h3 className="mt-2 font-display text-xl font-bold text-[#151324]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#433f59]">{item.detail}</p>
              </EditorialReveal>
            ))}
          </div>

          <EditorialReveal className="flex flex-col justify-between gap-6 rounded-2xl border border-[#151324]/15 bg-[#151324] p-7 text-white sm:flex-row sm:items-center sm:p-9">
            <div className="max-w-xl space-y-2">
              <p className="font-mono text-xs uppercase tracking-wider text-[#7fa3ff]">
                ARAH JANGKA PANJANG
              </p>
              <h2 className="font-display text-2xl font-bold">
                Berangkat dari layanan development yang nyata, bertumbuh bersama masalah lapangan.
              </h2>
              <p className="text-sm text-[#c6c2db]">
                Mari bicarakan apa yang sedang ingin Anda rapikan di bisnis Anda saat ini.
              </p>
            </div>
            <Link
              href="/mulai-proyek"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-[#4638d2] px-5 py-3 text-sm font-semibold text-white hover:bg-[#5446e6]"
            >
              <span>Mulai Diskusi</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </EditorialReveal>
        </div>
      </section>
    </>
  );
}
