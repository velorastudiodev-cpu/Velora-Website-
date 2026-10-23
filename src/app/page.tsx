import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { HeroArchitectural } from "@/components/home/HeroArchitectural";
import { ProcessScrollSection } from "@/components/home/ProcessScrollSection";
import { EditorialReveal } from "@/components/motion/EditorialReveal";
import { LiveSystemSandbox } from "@/components/sandbox/LiveSystemSandbox";
import { ClientShowcaseSection } from "@/components/showcase/ClientShowcaseSection";
import { ConceptDiagramPreview } from "@/components/showcase/ConceptDiagramPreview";
import { CONCEPT_PROJECTS } from "@/data/projects";
import { VELORA_SERVICES } from "@/data/services";

const PRINCIPLES = [
  {
    code: "01 / 04",
    title: "Berangkat dari kebutuhan",
    body: "Kami memetakan masalah bisnis dan alur pengguna sebelum memilih tumpukan fitur.",
  },
  {
    code: "02 / 04",
    title: "Desain yang punya tujuan",
    body: "Setiap struktur halaman dan tombol dirancang untuk memperjelas keputusan pengunjung.",
  },
  {
    code: "03 / 04",
    title: "Development terukur",
    body: "Kode bersih, validasi server jelas, serta diuji menyeluruh di layar mobile dan desktop.",
  },
  {
    code: "04 / 04",
    title: "Kemandirian pasca-rilis",
    body: "Serah terima rapi disertai dokumentasi dan opsi CMS agar Anda memegang kendali.",
  },
] as const;

export default function HomePage() {
  return (
    <>
      {/* 01. Architectural Hero + Interactive Workbench */}
      <HeroArchitectural />

      {/* Working Principles Strip */}
      <section className="border-b border-[#e2dfec] bg-white">
        <div className="editorial-container py-12 md:py-14">
          <div className="grid grid-cols-1 divide-y divide-[#e2dfec] sm:grid-cols-2 sm:divide-y-0 sm:gap-8 lg:grid-cols-4 lg:divide-x lg:gap-0">
            {PRINCIPLES.map((item, idx) => (
              <EditorialReveal
                key={item.code}
                delay={idx * 0.05}
                className="py-5 first:pt-0 last:pb-0 sm:py-0 lg:px-6 lg:first:pl-0 lg:last:pr-0"
              >
                <p className="font-mono text-xs tracking-wider text-[#4638d2]">{item.code}</p>
                <h2 className="mt-2 font-display text-lg font-bold text-[#151324]">
                  {item.title}
                </h2>
                <p className="mt-1.5 text-sm leading-relaxed text-[#433f59]">{item.body}</p>
              </EditorialReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 02. Verified Real Client Showcases (Ikbar Barbershop + CMS + Dzikri Mount Guide) */}
      <ClientShowcaseSection />

      {/* 03. Interactive Live CMS & Workflow Sandbox */}
      <LiveSystemSandbox />

      {/* 04. Principal Services — Editorial Index Rows */}
      <section className="border-b border-[#dad6e8] bg-[#ebe7f8]/55 py-20 md:py-28">
        <div className="editorial-container">
          <EditorialReveal className="flex flex-col justify-between gap-6 border-b border-[#cbc6dc] pb-10 lg:flex-row lg:items-end">
            <div className="max-w-2xl space-y-3">
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-[#4638d2]">
                04 / LAYANAN UTAMA
              </p>
              <h2 className="font-display text-3xl font-bold leading-[1.1] text-[#151324] sm:text-4xl">
                Mulai dari kebutuhan, pilih bentuk solusi yang paling masuk akal.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-[#433f59] sm:text-base">
              Satu usaha mungkin cukup dengan website terarah. Usaha lain butuh panel pengelola
              atau sistem operasional yang menyatukan alur tim.
            </p>
          </EditorialReveal>

          <div className="divide-y divide-[#cbc6dc]">
            {VELORA_SERVICES.map((service, idx) => (
              <EditorialReveal key={service.slug} delay={idx * 0.05}>
                <Link
                  href={`/layanan/${service.slug}`}
                  className="group grid grid-cols-1 gap-4 py-8 transition-colors md:grid-cols-12 md:items-center"
                >
                  <div className="flex items-baseline gap-4 md:col-span-5">
                    <span className="font-mono text-xs font-semibold text-[#4638d2]">
                      {service.index}
                    </span>
                    <h3 className="font-display text-2xl font-bold text-[#151324] transition-colors group-hover:text-[#4638d2] sm:text-3xl">
                      {service.shortTitle}
                    </h3>
                  </div>

                  <p className="text-sm leading-relaxed text-[#433f59] sm:text-base md:col-span-6">
                    {service.summary}
                  </p>

                  <div className="flex md:col-span-1 md:justify-end">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#cbc6dc] bg-white text-[#151324] transition-all group-hover:border-[#4638d2] group-hover:bg-[#4638d2] group-hover:text-white">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              </EditorialReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 05. Studio Explorations & Concept Prototypes (Explicitly Labeled) */}
      <section className="border-b border-[#e2dfec] bg-[#faf9fc] py-20 md:py-28">
        <div className="editorial-container">
          <EditorialReveal className="flex flex-col justify-between gap-6 border-b border-[#e2dfec] pb-10 lg:flex-row lg:items-end">
            <div className="max-w-2xl space-y-3">
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-[#4638d2]">
                05 / EKSPLORASI SISTEM INTERNAL
              </p>
              <h2 className="font-display text-3xl font-bold leading-[1.1] text-[#151324] sm:text-4xl">
                Konsep arsitektur yang menguji pola kerja bisnis sehari-hari.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-[#433f59]">
              Ketiga item berikut adalah eksplorasi internal Velora Studio (bukan klaim proyek
              klien) untuk memperlihatkan cara kami membedah masalah operasional.
            </p>
          </EditorialReveal>

          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {CONCEPT_PROJECTS.map((concept, idx) => (
              <EditorialReveal key={concept.id} delay={idx * 0.06}>
                <Link
                  href={`/karya/${concept.slug}`}
                  className="group flex h-full flex-col justify-between rounded-2xl border border-[#dad6e8] bg-white p-5 transition-colors hover:border-[#4638d2]"
                >
                  <div>
                    <ConceptDiagramPreview slug={concept.slug} />
                    <div className="mt-5 space-y-2">
                      <p className="font-mono text-[11px] uppercase tracking-wider text-[#4638d2]">
                        {concept.tierBadge}
                      </p>
                      <h3 className="font-display text-xl font-bold text-[#151324] group-hover:text-[#4638d2]">
                        {concept.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-[#433f59]">{concept.summary}</p>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-[#e2dfec] pt-4 text-xs font-semibold text-[#151324] group-hover:text-[#4638d2]">
                    <span>Pelajari Keputusan Desain</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </Link>
              </EditorialReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 06. Scroll-Linked Engineering Process */}
      <section className="studio-grid-dark border-b border-white/10 py-20 text-[#f7f6fb] md:py-28">
        <div className="editorial-container">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <EditorialReveal className="space-y-4 lg:col-span-4">
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-[#7fa3ff]">
                06 / CARA KERJA
              </p>
              <h2 className="font-display text-3xl font-bold leading-[1.1] text-white sm:text-4xl">
                Jelas sejak awal, terukur di setiap tahap.
              </h2>
              <p className="text-sm leading-relaxed text-[#b9b5ce] sm:text-base">
                Proyek digital yang sehat tidak lahir dari tebakan. Kami menyamakan konteks,
                merancang struktur, lalu membangun dengan ritme yang bisa Anda tinjau.
              </p>
              <div className="pt-2">
                <Link
                  href="/proses"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#7fa3ff] hover:text-white"
                >
                  <span>Baca alur kerja selengkapnya</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </EditorialReveal>

            <div className="lg:col-span-8">
              <ProcessScrollSection compact />
            </div>
          </div>
        </div>
      </section>

      {/* 07. Editorial Studio Stance + Final Focused Conversion */}
      <section className="bg-[#faf9fc] py-20 md:py-28">
        <div className="editorial-container space-y-16">
          <EditorialReveal className="grid grid-cols-1 gap-8 border-b border-[#e2dfec] pb-14 lg:grid-cols-12 lg:items-center">
            <div className="space-y-2 lg:col-span-4">
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-[#4638d2]">
                PENDEKATAN VELORA
              </p>
              <h2 className="font-display text-2xl font-bold text-[#151324] sm:text-3xl">
                Teknologi mengikuti masalah yang ingin diselesaikan.
              </h2>
            </div>
            <blockquote className="font-display text-xl font-semibold leading-snug text-[#151324] sm:text-2xl lg:col-span-8">
              “Solusi perangkat lunak yang baik terasa masuk akal bagi orang yang menggunakannya
              setiap hari—tanpa jargon berlebihan dan tanpa kerumitan yang tidak perlu.”
            </blockquote>
          </EditorialReveal>

          <EditorialReveal className="flex flex-col justify-between gap-8 rounded-2xl border border-[#151324]/15 bg-[#151324] p-7 text-white sm:p-10 lg:flex-row lg:items-center">
            <div className="max-w-2xl space-y-3">
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-[#7fa3ff]">
                LANGKAH BERIKUTNYA
              </p>
              <h2 className="font-display text-2xl font-bold leading-tight sm:text-4xl">
                Punya kebutuhan digital yang ingin dibereskan?
              </h2>
              <p className="text-sm leading-relaxed text-[#c6c2db] sm:text-base">
                Ceritakan konteks bisnis Anda dalam brief singkat. Kami akan meninjau kebutuhan
                tersebut dan membalas dengan arah ruang lingkup yang jujur.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/mulai-proyek"
                className="inline-flex min-h-[48px] items-center gap-2 rounded-lg bg-[#4638d2] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#5446e6]"
              >
                <span>Diskusikan Proyek</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                href="/paket"
                className="inline-flex min-h-[48px] items-center gap-2 rounded-lg border border-white/20 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-white/45"
              >
                <span>Bandingkan Arah Paket</span>
              </Link>
            </div>
          </EditorialReveal>
        </div>
      </section>
    </>
  );
}
