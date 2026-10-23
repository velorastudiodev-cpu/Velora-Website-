import type { Metadata } from "next";
import { ProjectBriefForm } from "@/components/inquiry/ProjectBriefForm";
import { isLeadStorageConfigured } from "@/lib/supabase-server";

export const metadata: Metadata = {
  title: "Mulai Proyek & Kirim Brief",
  description:
    "Ceritakan kebutuhan website, Custom CMS, aplikasi web, atau sistem operasional bisnis Anda kepada Velora Studio.",
};

type PageProps = {
  searchParams: Promise<{
    layanan?: string;
    paket?: string;
    modul?: string;
  }>;
};

export default async function MulaiProyekPage({ searchParams }: PageProps) {
  const query = await searchParams;
  const initialService = typeof query.layanan === "string" ? query.layanan : "";
  const initialPackage = typeof query.paket === "string" ? query.paket : "";
  const initialAddons =
    typeof query.modul === "string" && query.modul.trim().length > 0
      ? query.modul.split(",").map((s) => s.trim())
      : [];

  const storageConfigured = isLeadStorageConfigured();

  return (
    <>
      <section className="studio-grid-dark border-b border-white/10 py-16 text-[#f7f6fb] md:py-22">
        <div className="editorial-container grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
          <div className="space-y-4 lg:col-span-8">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-[#7fa3ff]">
              MULAI PROYEK / BRIEF AWAL
            </p>
            <h1 className="font-display text-4xl font-bold leading-[1.08] text-white sm:text-5xl">
              Ceritakan apa yang ingin dibuat lebih jelas.
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-[#b9b5ce] sm:text-lg">
              Brief singkat sudah sangat membantu. Kami akan meninjau konteks bisnis Anda
              terlebih dahulu sebelum membahas ruang lingkup, tahapan kerja, dan estimasi.
            </p>
          </div>

          <div className="rounded-xl border border-white/12 bg-[#141325] p-5 text-xs leading-relaxed text-[#b1adc7] lg:col-span-4">
            Pengiriman brief ini bukan kontrak pembelian otomatis. Kami memprioritaskan diskusi
            yang terarah dan bebas tekanan.
          </div>
        </div>
      </section>

      <section className="bg-[#faf9fc] py-16 md:py-24">
        <div className="editorial-container grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
          <aside className="space-y-5 lg:col-span-4">
            <div className="space-y-4 rounded-2xl border border-[#dad6e8] bg-white p-6">
              <p className="font-mono text-xs uppercase tracking-wider text-[#4638d2]">
                APA YANG TERJADI SETELAH INI?
              </p>
              <ol className="space-y-3 text-xs leading-relaxed text-[#433f59] sm:text-sm">
                <li>
                  <strong className="text-[#151324]">1. Tinjauan Konteks:</strong> Kami membaca
                  tujuan, masalah utama, dan referensi yang Anda bagikan.
                </li>
                <li>
                  <strong className="text-[#151324]">2. Diskusi Klarifikasi:</strong> Kami
                  menghubungi Anda untuk memastikan tidak ada salah asumsi soal kebutuhan.
                </li>
                <li>
                  <strong className="text-[#151324]">3. Usulan Scope &amp; Estimasi:</strong>{" "}
                  Anda menerima rincian deliverable, tahapan, dan estimasi yang transparan.
                </li>
              </ol>
            </div>
          </aside>

          <div className="lg:col-span-8">
            <ProjectBriefForm
              initialService={initialService}
              initialPackage={initialPackage}
              initialAddons={initialAddons}
              storageConfiguredOnServer={storageConfigured}
            />
          </div>
        </div>
      </section>
    </>
  );
}
