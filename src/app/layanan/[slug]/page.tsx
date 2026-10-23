import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { getProjectBySlug } from "@/data/projects";
import { getServiceBySlug, VELORA_SERVICES } from "@/data/services";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return VELORA_SERVICES.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: "Layanan Tidak Ditemukan" };

  return {
    title: service.title,
    description: service.summary,
  };
}

export default async function LayananDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const relatedProject = getProjectBySlug(service.relatedProjectSlug);

  return (
    <>
      <section className="studio-grid-dark border-b border-white/10 py-18 text-[#f7f6fb] md:py-24">
        <div className="editorial-container space-y-6">
          <Link
            href="/layanan"
            className="inline-flex items-center gap-2 font-mono text-xs text-[#b1adc7] hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>SEMUA LAYANAN</span>
          </Link>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
            <div className="space-y-4 lg:col-span-8">
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-[#7fa3ff]">
                LAYANAN {service.index} · {service.shortTitle}
              </p>
              <h1 className="font-display text-4xl font-bold leading-[1.08] text-white sm:text-5xl">
                {service.title}
              </h1>
              <p className="max-w-2xl text-base leading-relaxed text-[#c6c2db] sm:text-lg">
                {service.tagline}
              </p>
            </div>

            <div className="lg:col-span-4 lg:flex lg:justify-end">
              <Link
                href={`/mulai-proyek?layanan=${service.prefillServiceType}`}
                className="inline-flex items-center gap-2 rounded-lg bg-[#4638d2] px-6 py-3.5 text-sm font-semibold text-white hover:bg-[#5446e6]"
              >
                <span>Mulai Brief untuk Layanan Ini</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#faf9fc] py-16 md:py-24">
        <div className="editorial-container grid grid-cols-1 gap-12 lg:grid-cols-12">
          <aside className="space-y-6 lg:col-span-4">
            <div className="rounded-2xl border border-[#dad6e8] bg-white p-6">
              <p className="font-mono text-xs uppercase tracking-wider text-[#4638d2]">
                CATATAN RUANG LINGKUP
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[#433f59]">
                {service.cmsAndSystemNote}
              </p>
            </div>

            {relatedProject && (
              <Link
                href={`/karya/${relatedProject.slug}`}
                className="block rounded-2xl border border-[#dad6e8] bg-white p-6 transition-colors hover:border-[#4638d2]"
              >
                <p className="font-mono text-[11px] uppercase tracking-wider text-[#686380]">
                  CONTOH RELEVAN ({relatedProject.tierBadge})
                </p>
                <h2 className="mt-2 font-display text-xl font-bold text-[#151324]">
                  {relatedProject.title}
                </h2>
                <p className="mt-1.5 text-xs leading-relaxed text-[#433f59]">
                  {relatedProject.summary}
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[#4638d2]">
                  Pelajari proyek <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            )}
          </aside>

          <div className="space-y-10 lg:col-span-8">
            <div className="space-y-4">
              <h2 className="font-display text-2xl font-bold text-[#151324]">
                Tepat untuk Siapa
              </h2>
              <ul className="space-y-2.5">
                {service.idealFor.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-3 rounded-xl border border-[#e2dfec] bg-white p-4 text-sm text-[#151324]"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#4638d2]" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4 border-t border-[#e2dfec] pt-8">
              <h2 className="font-display text-2xl font-bold text-[#151324]">
                Masalah yang Kami Bantu Uraikan
              </h2>
              <ul className="space-y-2.5">
                {service.problemsSolved.map((problem, idx) => (
                  <li
                    key={problem}
                    className="flex items-start gap-3.5 rounded-xl border border-[#e2dfec] bg-white p-4 text-sm text-[#433f59]"
                  >
                    <span className="font-mono text-xs font-semibold text-[#4638d2]">
                      0{idx + 1}
                    </span>
                    <span>{problem}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4 border-t border-[#e2dfec] pt-8">
              <h2 className="font-display text-2xl font-bold text-[#151324]">
                Bentuk Deliverable yang Dapat Disepakati
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {service.deliverables.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-xl border border-[#dad6e8] bg-white p-5"
                  >
                    <h3 className="font-display text-base font-bold text-[#151324]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-[#433f59] sm:text-sm">
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
