import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { EditorialReveal } from "@/components/motion/EditorialReveal";
import { VELORA_SERVICES } from "@/data/services";

export const metadata: Metadata = {
  title: "Layanan Website, Aplikasi Web & Sistem Bisnis",
  description:
    "Layanan Velora Studio mencakup pengembangan Website Bisnis, Aplikasi Web & Self-Service CMS, serta Sistem Operasional Bisnis yang dirancang sesuai kebutuhan nyata.",
};

export default function LayananIndexPage() {
  return (
    <>
      <section className="studio-grid-dark border-b border-white/10 py-18 text-[#f7f6fb] md:py-24">
        <div className="editorial-container grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
          <div className="space-y-4 lg:col-span-8">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-[#7fa3ff]">
              LAYANAN / 02
            </p>
            <h1 className="font-display text-4xl font-bold leading-[1.08] text-white sm:text-5xl">
              Bentuk solusi mengikuti masalah yang perlu dibereskan.
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-[#b9b5ce] sm:text-lg">
              Tidak setiap bisnis membutuhkan platform raksasa sejak hari pertama. Kami membantu
              memilih ketelitian teknis yang paling tepat untuk tahap pertumbuhan usaha Anda.
            </p>
          </div>
          <p className="rounded-xl border border-white/12 bg-[#141325] p-5 text-xs leading-relaxed text-[#b1adc7] lg:col-span-4">
            Setiap kategori layanan di bawah menjelaskan untuk siapa solusi dirancang, masalah
            apa yang diselesaikan, dan bentuk deliverable yang dapat disepakati saat discovery.
          </p>
        </div>
      </section>

      <section className="bg-[#faf9fc] py-16 md:py-24">
        <div className="editorial-container space-y-8">
          {VELORA_SERVICES.map((service, idx) => (
            <EditorialReveal
              key={service.slug}
              delay={idx * 0.05}
              className="rounded-2xl border border-[#dad6e8] bg-white p-6 shadow-xs sm:p-9"
            >
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                <div className="space-y-3 lg:col-span-5">
                  <span className="font-mono text-xs font-semibold text-[#4638d2]">
                    PILAR {service.index}
                  </span>
                  <h2 className="font-display text-2xl font-bold text-[#151324] sm:text-3xl">
                    {service.title}
                  </h2>
                  <p className="text-sm leading-relaxed text-[#433f59] sm:text-base">
                    {service.summary}
                  </p>
                  <div className="flex flex-wrap gap-2.5 pt-3">
                    <Link
                      href={`/layanan/${service.slug}`}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-[#151324] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#4638d2]"
                    >
                      <span>Pelajari Ruang Lingkup</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                    <Link
                      href={`/mulai-proyek?layanan=${service.prefillServiceType}`}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-[#cbc6dc] px-4 py-2.5 text-xs font-semibold text-[#151324] hover:border-[#151324]"
                    >
                      <span>Diskusikan Kebutuhan Ini</span>
                    </Link>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-7">
                  {service.deliverables.map((item) => (
                    <div
                      key={item.title}
                      className="rounded-xl border border-[#e2dfec] bg-[#faf9fc] p-4"
                    >
                      <h3 className="font-display text-sm font-bold text-[#151324]">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 text-xs leading-relaxed text-[#433f59]">
                        {item.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </EditorialReveal>
          ))}
        </div>
      </section>
    </>
  );
}
