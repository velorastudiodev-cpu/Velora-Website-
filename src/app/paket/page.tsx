import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { EditorialReveal } from "@/components/motion/EditorialReveal";
import { ScopeMatrixExplorer } from "@/components/packages/ScopeMatrixExplorer";
import { COMPARISON_ROWS, PACKAGE_DIRECTIONS } from "@/data/packages";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Paket Kerja & Konfigurasi Ruang Lingkup",
  description:
    "Bandingkan tiga arah paket kerja Velora Studio (Website Bisnis, Aplikasi Web + CMS, dan Sistem Bisnis) serta susun modul kebutuhan Anda sebelum konsultasi.",
};

export default function PaketPage() {
  return (
    <>
      <section className="studio-grid-dark border-b border-white/10 py-18 text-[#f7f6fb] md:py-24">
        <div className="editorial-container grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
          <div className="space-y-4 lg:col-span-8">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-[#7fa3ff]">
              PAKET &amp; RUANG LINGKUP / 03
            </p>
            <h1 className="font-display text-4xl font-bold leading-[1.08] text-white sm:text-5xl">
              Mulai dari arah kebutuhan, lalu kita kunci scope yang jujur.
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-[#b9b5ce] sm:text-lg">
              Ketiga paket di bawah memberi bahasa awal yang jelas untuk berdiskusi. Estimasi
              biaya dan jadwal disusun tertulis setelah kami memahami konteks proyek Anda—tanpa
              angka karangan atau janji tersembunyi.
            </p>
          </div>

          <div className="rounded-xl border border-white/12 bg-[#141325] p-5 text-xs leading-relaxed text-[#b1adc7] lg:col-span-4">
            Pilih salah satu paket untuk langsung mengisi form brief, atau gunakan konfigurator
            modul di bagian bawah halaman ini.
          </div>
        </div>
      </section>

      {/* Three Package Cards */}
      <section className="border-b border-[#e2dfec] bg-[#faf9fc] py-16 md:py-24">
        <div className="editorial-container space-y-16">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {PACKAGE_DIRECTIONS.map((pkg, idx) => (
              <EditorialReveal
                key={pkg.id}
                delay={idx * 0.06}
                className={cn(
                  "flex flex-col justify-between rounded-2xl border p-6 sm:p-8",
                  pkg.recommended
                    ? "border-[#4638d2] bg-[#151324] text-[#f7f6fb] shadow-lg"
                    : "border-[#dad6e8] bg-white text-[#151324]"
                )}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={cn(
                        "font-mono text-xs uppercase tracking-wider",
                        pkg.recommended ? "text-[#7fa3ff]" : "text-[#4638d2]"
                      )}
                    >
                      {pkg.index} / {pkg.eyebrow}
                    </span>
                    {pkg.recommended && (
                      <span className="rounded bg-[#4638d2] px-2.5 py-0.5 font-mono text-[10px] font-semibold text-white">
                        PALING SERING DIPILIH
                      </span>
                    )}
                  </div>

                  <h2 className="font-display text-2xl font-bold">{pkg.name}</h2>

                  <p
                    className={cn(
                      "rounded-lg border px-3 py-2 font-mono text-xs",
                      pkg.recommended
                        ? "border-white/12 bg-white/5 text-[#d6d3e8]"
                        : "border-[#e2dfec] bg-[#faf9fc] text-[#433f59]"
                    )}
                  >
                    {pkg.priceStatusLabel}
                  </p>

                  <p
                    className={cn(
                      "text-sm leading-relaxed",
                      pkg.recommended ? "text-[#c6c2db]" : "text-[#433f59]"
                    )}
                  >
                    {pkg.summary}
                  </p>

                  <div className="space-y-2 border-t border-current/10 pt-4">
                    <p className="font-mono text-[11px] uppercase tracking-wider opacity-75">
                      CAKUPAN INTI
                    </p>
                    <ul className="space-y-2 text-xs sm:text-sm">
                      {pkg.coreDeliverables.map((item) => (
                        <li key={item} className="flex items-start gap-2.5">
                          <Check
                            className={cn(
                              "mt-0.5 h-4 w-4 shrink-0",
                              pkg.recommended ? "text-[#7fa3ff]" : "text-[#4638d2]"
                            )}
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-1.5 border-t border-current/10 pt-4 text-xs opacity-80">
                    <p className="font-mono text-[10px] uppercase tracking-wider">
                      UMUMNYA TERPISAH
                    </p>
                    <ul className="list-disc space-y-1 pl-4">
                      {pkg.typicalExclusions.map((ex) => (
                        <li key={ex}>{ex}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-4">
                  <Link
                    href={`/mulai-proyek?paket=${pkg.id}&layanan=${pkg.serviceType}`}
                    className={cn(
                      "inline-flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold transition-colors",
                      pkg.recommended
                        ? "bg-[#4638d2] text-white hover:bg-[#5446e6]"
                        : "bg-[#151324] text-white hover:bg-[#4638d2]"
                    )}
                  >
                    <span>Minta Estimasi Scope</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </EditorialReveal>
            ))}
          </div>

          {/* Mobile-Friendly Comparison Matrix */}
          <EditorialReveal className="space-y-6">
            <div className="space-y-2">
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-[#4638d2]">
                PERBANDINGAN LANGSUNG
              </p>
              <h2 className="font-display text-2xl font-bold text-[#151324] sm:text-3xl">
                Memilih titik awal yang sesuai dengan ritme kerja Anda.
              </h2>
            </div>

            <div className="divide-y divide-[#e2dfec] overflow-hidden rounded-2xl border border-[#dad6e8] bg-white">
              {COMPARISON_ROWS.map((row) => (
                <div
                  key={row.aspect}
                  className="grid grid-cols-1 gap-4 p-5 md:grid-cols-12 md:items-center md:p-6"
                >
                  <div className="font-display text-sm font-bold text-[#151324] md:col-span-3">
                    {row.aspect}
                  </div>
                  <div className="grid grid-cols-1 gap-3 text-xs sm:grid-cols-3 sm:text-sm md:col-span-9">
                    <div className="rounded-lg border border-[#e2dfec] bg-[#faf9fc] p-3">
                      <span className="block font-mono text-[10px] text-[#686380]">
                        01 WEBSITE BISNIS
                      </span>
                      <span className="mt-1 block text-[#151324]">{row.website}</span>
                    </div>
                    <div className="rounded-lg border border-[#4638d2]/30 bg-[#ebe7f8]/45 p-3">
                      <span className="block font-mono text-[10px] text-[#4638d2]">
                        02 APLIKASI / CMS
                      </span>
                      <span className="mt-1 block text-[#151324]">{row.aplikasi}</span>
                    </div>
                    <div className="rounded-lg border border-[#e2dfec] bg-[#faf9fc] p-3">
                      <span className="block font-mono text-[10px] text-[#686380]">
                        03 SISTEM BISNIS
                      </span>
                      <span className="mt-1 block text-[#151324]">{row.sistem}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </EditorialReveal>

          {/* Interactive Scope Configurator */}
          <ScopeMatrixExplorer />
        </div>
      </section>
    </>
  );
}
