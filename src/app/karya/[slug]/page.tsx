import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, ExternalLink, Link2 } from "lucide-react";
import { ConceptDiagramPreview } from "@/components/showcase/ConceptDiagramPreview";
import { getProjectBySlug, VELORA_PROJECTS } from "@/data/projects";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return VELORA_PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Karya Tidak Ditemukan" };

  return {
    title: `${project.title} (${project.tier === "client" ? "Studi Kasus Klien" : "Konsep"})`,
    description: project.summary,
  };
}

export default async function KaryaDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const pairedProject = project.pairedSlug ? getProjectBySlug(project.pairedSlug) : undefined;

  return (
    <>
      {/* Header */}
      <section className="studio-grid-dark border-b border-white/10 py-16 text-[#f7f6fb] md:py-24">
        <div className="editorial-container space-y-6">
          <Link
            href="/karya"
            className="inline-flex items-center gap-2 font-mono text-xs text-[#b1adc7] transition-colors hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>KEMBALI KE GALERI KARYA</span>
          </Link>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
            <div className="space-y-4 lg:col-span-8">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="rounded bg-[#4638d2]/45 px-3 py-1 font-mono text-xs text-white">
                  {project.tierBadge}
                </span>
                <span className="font-mono text-xs text-[#7fa3ff]">{project.categoryLabel}</span>
              </div>

              <h1 className="font-display text-4xl font-bold leading-[1.08] text-white sm:text-5xl">
                {project.title}
              </h1>
              <p className="max-w-2xl text-base leading-relaxed text-[#c6c2db] sm:text-lg">
                {project.subtitle}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 lg:col-span-4 lg:justify-end">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#4638d2] px-5 py-3 text-sm font-semibold text-white hover:bg-[#5446e6]"
                >
                  <span>Buka Versi Live</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
              <Link
                href={`/mulai-proyek?layanan=${project.category}`}
                className="inline-flex items-center gap-2 rounded-lg border border-white/18 px-4 py-3 text-sm font-semibold text-white hover:border-white/40"
              >
                <span>Diskusikan Solusi Serupa</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Showcase Stage */}
      <section className="border-b border-[#e2dfec] bg-[#f2f0f7] py-12 md:py-16">
        <div className="editorial-container">
          {project.tier === "client" ? (
            <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
              <div className="space-y-4 lg:col-span-8">
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-[#cbc6dc] bg-[#0d0c18] shadow-md">
                  <Image
                    src={project.desktopGallery[0] || project.coverDesktop}
                    alt={`Tampilan desktop ${project.title}`}
                    fill
                    priority
                    sizes="(max-width: 1024px) 95vw, 820px"
                    className="object-cover object-top"
                  />
                </div>
                {project.desktopGallery[1] && (
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-[#cbc6dc] bg-[#0d0c18] shadow-xs">
                    <Image
                      src={project.desktopGallery[1]}
                      alt={`Bagian lanjutan ${project.title}`}
                      fill
                      sizes="(max-width: 1024px) 95vw, 820px"
                      className="object-cover object-top"
                    />
                  </div>
                )}
              </div>

              {project.mobileGallery[0] && (
                <div className="rounded-2xl border border-[#dad6e8] bg-white p-5 lg:col-span-4">
                  <p className="mb-3 font-mono text-xs uppercase tracking-wider text-[#686380]">
                    TAMPILAN LAYAR SELULER (390PX)
                  </p>
                  <div className="relative mx-auto aspect-[9/19.5] w-full max-w-[270px] overflow-hidden rounded-[22px] border border-[#151324]/15 bg-[#0d0c18] shadow-md">
                    <Image
                      src={project.mobileGallery[0]}
                      alt={`Tampilan mobile ${project.title}`}
                      fill
                      sizes="270px"
                      className="object-cover object-top"
                    />
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="mx-auto max-w-3xl">
              <ConceptDiagramPreview slug={project.slug} />
            </div>
          )}
        </div>
      </section>

      {/* Case Study Breakdown */}
      <section className="bg-[#faf9fc] py-16 md:py-24">
        <div className="editorial-container grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Sidebar Metadata */}
          <aside className="space-y-6 lg:col-span-4">
            <div className="space-y-4 rounded-2xl border border-[#dad6e8] bg-white p-6">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-wider text-[#686380]">
                  STATUS ENTITAS
                </p>
                <p className="mt-1 text-sm font-semibold text-[#151324]">
                  {project.clientName ? `Klien: ${project.clientName}` : "Eksplorasi Internal Studio"}
                </p>
              </div>

              <div className="border-t border-[#e2dfec] pt-4">
                <p className="font-mono text-[11px] uppercase tracking-wider text-[#686380]">
                  TUMPUKAN TEKNOLOGI &amp; FOKUS
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded border border-[#e2dfec] bg-[#faf9fc] px-2.5 py-1 font-mono text-xs text-[#433f59]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="border-t border-[#e2dfec] pt-4">
                <p className="font-mono text-[11px] uppercase tracking-wider text-[#686380]">
                  CATATAN TRANSPARANSI
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-[#433f59]">
                  {project.honestScopeNote}
                </p>
              </div>
            </div>

            {pairedProject && (
              <Link
                href={`/karya/${pairedProject.slug}`}
                className="block rounded-2xl border border-[#4638d2]/30 bg-[#ebe7f8]/65 p-5 transition-colors hover:border-[#4638d2]"
              >
                <p className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-[#4638d2]">
                  <Link2 className="h-3.5 w-3.5" /> ARSITEKTUR PASANGAN
                </p>
                <p className="mt-1.5 font-display text-lg font-bold text-[#151324]">
                  {pairedProject.title}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-[#433f59]">
                  {project.pairedLabel} — pelajari bagaimana kedua bagian ini saling terhubung.
                </p>
              </Link>
            )}
          </aside>

          {/* Main Narrative */}
          <div className="space-y-10 lg:col-span-8">
            <div className="space-y-3">
              <h2 className="font-display text-2xl font-bold text-[#151324]">
                Konteks &amp; Tantangan Awal
              </h2>
              <p className="text-base leading-relaxed text-[#433f59]">{project.challenge}</p>
            </div>

            <div className="space-y-3 border-t border-[#e2dfec] pt-8">
              <h2 className="font-display text-2xl font-bold text-[#151324]">
                Pendekatan Arsitektur Velora
              </h2>
              <p className="text-base leading-relaxed text-[#433f59]">{project.approach}</p>

              <ul className="mt-4 space-y-3 pt-2">
                {project.architectureDecisions.map((decision, idx) => (
                  <li
                    key={decision}
                    className="flex items-start gap-3.5 rounded-xl border border-[#dad6e8] bg-white p-4 text-sm leading-relaxed text-[#151324]"
                  >
                    <span className="font-mono text-xs font-semibold text-[#4638d2]">
                      0{idx + 1}
                    </span>
                    <span>{decision}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4 border-t border-[#e2dfec] pt-8">
              <h2 className="font-display text-2xl font-bold text-[#151324]">
                Urutan Pengerjaan
              </h2>
              <ol className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {project.workflowSteps.map((step, idx) => (
                  <li
                    key={step}
                    className="rounded-xl border border-[#e2dfec] bg-white p-4 text-sm text-[#433f59]"
                  >
                    <span className="block font-mono text-xs font-semibold text-[#4638d2]">
                      TAHAP 0{idx + 1}
                    </span>
                    <span className="mt-1 block font-medium text-[#151324]">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
