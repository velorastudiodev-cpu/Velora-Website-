import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

export default function NotFound() {
  return (
    <section className="studio-grid-dark border-b border-white/10 py-28 text-[#f7f6fb]">
      <div className="editorial-container max-w-3xl space-y-6">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-[#7fa3ff]">
          404 · HALAMAN TIDAK DITEMUKAN
        </p>
        <h1 className="font-display text-4xl font-bold leading-tight text-white sm:text-5xl">
          Alamat yang Anda tuju belum tersedia atau telah berpindah.
        </h1>
        <p className="max-w-xl text-base leading-relaxed text-[#b9b5ce]">
          Silakan kembali ke beranda Velora Studio atau langsung jelaskan kebutuhan digital
          usaha Anda melalui halaman Mulai Proyek.
        </p>
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg bg-[#4638d2] px-5 py-3 text-sm font-semibold text-white hover:bg-[#5446e6]"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Kembali ke Beranda</span>
          </Link>
          <Link
            href="/mulai-proyek"
            className="inline-flex items-center gap-2 rounded-lg border border-white/18 px-5 py-3 text-sm font-semibold text-white hover:border-white/35"
          >
            <span>Diskusikan Proyek</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
