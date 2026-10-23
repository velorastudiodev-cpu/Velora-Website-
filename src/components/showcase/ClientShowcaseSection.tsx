"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ExternalLink, Eye, Link2 } from "lucide-react";
import { useState } from "react";
import { CLIENT_PROJECTS, type VeloraProject } from "@/data/projects";
import { EditorialReveal } from "@/components/motion/EditorialReveal";
import { ProjectInspectorModal } from "@/components/showcase/ProjectInspectorModal";

export function ClientShowcaseSection() {
  const [inspected, setInspected] = useState<VeloraProject | null>(null);

  const ikbarWeb = CLIENT_PROJECTS[0];
  const ikbarCms = CLIENT_PROJECTS[1];
  const dzikriWeb = CLIENT_PROJECTS[2];

  return (
    <section className="border-b border-[#e2dfec] bg-[#faf9fc] py-20 md:py-28">
      <div className="editorial-container">
        {/* Editorial Header */}
        <EditorialReveal className="flex flex-col justify-between gap-6 border-b border-[#e2dfec] pb-10 lg:flex-row lg:items-end">
          <div className="max-w-2xl space-y-3">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-[#4638d2]">
              02 / KARYA KLIEN TERVERIFIKASI
            </p>
            <h2 className="font-display text-3xl font-bold leading-[1.1] text-[#151324] sm:text-4xl">
              Sistem dan website nyata yang sudah bekerja di produksi.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-[#433f59] sm:text-base">
            Bukan sekadar mockup presentasi. Klik pratinjau untuk menguji tampilan Desktop dan
            Mobile, atau pelajari bagaimana tiap proyek dirancang.
          </p>
        </EditorialReveal>

        {/* Asymmetric Editorial Composition: Paired Ecosystem + Independent Showcase */}
        <div className="mt-12 space-y-8">
          {/* Featured Paired Ecosystem: Ikbar Barbershop + Ikbar CMS Dashboard */}
          <EditorialReveal className="overflow-hidden rounded-2xl border border-[#dad6e8] bg-white shadow-xs">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Left Screenshot Frame */}
              <div className="relative border-b border-[#e2dfec] bg-[#0d0c18] p-4 sm:p-6 lg:col-span-7 lg:border-r lg:border-b-0">
                <div className="mb-3 flex items-center justify-between text-xs text-[#b1adc7]">
                  <span className="font-mono tracking-wider text-[#7fa3ff]">
                    EKOSISTEM KLIEN · WEBSITE + CUSTOM CMS
                  </span>
                  <span className="font-mono text-[11px]">01 &amp; 02</span>
                </div>

                <button
                  type="button"
                  onClick={() => setInspected(ikbarWeb)}
                  aria-label="Buka inspeksi tampilan Ikbar Barbershop"
                  className="group relative block aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/12 bg-[#141325] text-left"
                >
                  <Image
                    src={ikbarWeb.coverDesktop}
                    alt="Tampilan produksi Ikbar Barbershop"
                    fill
                    sizes="(max-width: 1024px) 95vw, 720px"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                  <span className="absolute right-3 bottom-3 inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-[#0d0c18]/90 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-xs transition-colors group-hover:bg-[#4638d2]">
                    <Eye className="h-3.5 w-3.5" />
                    <span>Inspeksi Desktop &amp; Mobile</span>
                  </span>
                </button>

                {/* Connected CMS Strip */}
                <div className="mt-4 flex flex-col justify-between gap-3 rounded-xl border border-white/12 bg-[#141325] p-3.5 sm:flex-row sm:items-center">
                  <div className="flex items-center gap-3">
                    <div className="relative h-12 w-20 shrink-0 overflow-hidden rounded border border-white/14 bg-[#0d0c18]">
                      <Image
                        src={ikbarCms.coverDesktop}
                        alt="Panel Admin Ikbar CMS"
                        fill
                        sizes="80px"
                        className="object-cover object-center"
                      />
                    </div>
                    <div>
                      <p className="inline-flex items-center gap-1.5 font-mono text-[11px] text-[#7fa3ff]">
                        <Link2 className="h-3 w-3" /> PANEL PENGELOLA TERHUBUNG
                      </p>
                      <p className="text-xs font-semibold text-white sm:text-sm">
                        {ikbarCms.title} — Kendali mandiri via Google Auth
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setInspected(ikbarCms)}
                    className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-lg border border-white/16 bg-white/6 px-3 py-2 text-xs font-semibold text-white transition-colors hover:border-white/35 hover:bg-white/12"
                  >
                    <span>Lihat CMS</span>
                    <Eye className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* Right Narrative Column */}
              <div className="flex flex-col justify-between p-6 sm:p-8 lg:col-span-5">
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-md bg-[#ebe7f8] px-2.5 py-1 font-mono text-[11px] font-medium text-[#312578]">
                      KLIEN · BARBERSHOP &amp; BOOKING
                    </span>
                    <span className="font-mono text-xs text-[#686380]">Kuningan, Jawa Barat</span>
                  </div>

                  <h3 className="font-display text-2xl font-bold text-[#151324] sm:text-3xl">
                    Ikbar Barbershop &amp; Autonomous CMS
                  </h3>

                  <p className="text-sm leading-relaxed text-[#433f59]">
                    {ikbarWeb.summary} Didampingi dashboard privat sehingga pemilik dapat
                    memperbarui layanan dan galeri potongan tanpa bergantung pada developer.
                  </p>

                  <div className="space-y-2.5 border-t border-[#e2dfec] pt-4 text-xs text-[#433f59]">
                    <div>
                      <strong className="font-semibold text-[#151324]">Masalah awal: </strong>
                      {ikbarWeb.challenge}
                    </div>
                    <div>
                      <strong className="font-semibold text-[#151324]">Arsitektur solusi: </strong>
                      Website pelanggan cepat + panel CMS khusus pemilik dengan akses terbatas.
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {ikbarWeb.stack.map((tag) => (
                      <span
                        key={tag}
                        className="rounded border border-[#e2dfec] bg-[#faf9fc] px-2.5 py-1 font-mono text-[11px] text-[#433f59]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-7 flex flex-wrap items-center gap-2.5 border-t border-[#e2dfec] pt-5">
                  <Link
                    href={`/karya/${ikbarWeb.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-[#151324] px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#4638d2]"
                  >
                    <span>Studi Kasus Lengkap</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                  {ikbarWeb.liveUrl && (
                    <a
                      href={ikbarWeb.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-[#cbc6dc] px-3.5 py-2.5 text-xs font-semibold text-[#151324] transition-colors hover:border-[#151324]"
                    >
                      <span>Kunjungi Situs</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </EditorialReveal>

          {/* Second Production Case: Dzikri Mount Guide + Link to All Work */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <EditorialReveal className="overflow-hidden rounded-2xl border border-[#dad6e8] bg-white shadow-xs lg:col-span-8">
              <div className="grid grid-cols-1 md:grid-cols-12">
                <div className="bg-[#0d0c18] p-4 sm:p-5 md:col-span-6">
                  <button
                    type="button"
                    onClick={() => setInspected(dzikriWeb)}
                    aria-label="Buka inspeksi tampilan Dzikri Mount Guide"
                    className="group relative block aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/12 bg-[#141325]"
                  >
                    <Image
                      src={dzikriWeb.coverDesktop}
                      alt="Tampilan produksi Dzikri Mount Guide"
                      fill
                      sizes="(max-width: 768px) 95vw, 480px"
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                    <span className="absolute right-2.5 bottom-2.5 inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-[#0d0c18]/90 px-2.5 py-1 text-xs font-semibold text-white transition-colors group-hover:bg-[#4638d2]">
                      <Eye className="h-3.5 w-3.5" />
                      <span>Preview</span>
                    </span>
                  </button>
                </div>

                <div className="flex flex-col justify-between p-6 md:col-span-6">
                  <div className="space-y-3">
                    <span className="inline-block rounded-md bg-[#ebe7f8] px-2.5 py-1 font-mono text-[11px] font-medium text-[#312578]">
                      03 · KLIEN · KATALOG LAYANAN WISATA
                    </span>
                    <h3 className="font-display text-xl font-bold text-[#151324] sm:text-2xl">
                      {dzikriWeb.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[#433f59]">{dzikriWeb.summary}</p>
                  </div>

                  <div className="mt-5 flex flex-wrap items-center gap-2.5 border-t border-[#e2dfec] pt-4">
                    <Link
                      href={`/karya/${dzikriWeb.slug}`}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-[#151324] px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#4638d2]"
                    >
                      <span>Detail Proyek</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                    {dzikriWeb.liveUrl && (
                      <a
                        href={dzikriWeb.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg border border-[#cbc6dc] px-3 py-2 text-xs font-semibold text-[#151324] hover:border-[#151324]"
                      >
                        <span>Live Web</span>
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </EditorialReveal>

            {/* Studio Transparency & Full Archive Card */}
            <EditorialReveal
              delay={0.08}
              className="flex flex-col justify-between rounded-2xl border border-[#dad6e8] bg-[#f2f0f7] p-6 sm:p-7 lg:col-span-4"
            >
              <div className="space-y-3">
                <p className="font-mono text-xs uppercase tracking-wider text-[#4638d2]">
                  STANDAR TRANSPARANSI
                </p>
                <h3 className="font-display text-xl font-bold text-[#151324]">
                  Karya klien dan eksplorasi konsep dipisahkan secara jujur.
                </h3>
                <p className="text-sm leading-relaxed text-[#433f59]">
                  Selain proyek klien produksi di samping, kami juga menyusun prototipe sistem
                  internal untuk menguji pola alur kerja baru—tanpa mengklaim hasil fiktif.
                </p>
              </div>

              <div className="mt-6 pt-4">
                <Link
                  href="/karya"
                  className="group inline-flex w-full items-center justify-between rounded-xl border border-[#151324]/15 bg-white px-4 py-3 text-sm font-semibold text-[#151324] transition-colors hover:border-[#4638d2] hover:text-[#4638d2]"
                >
                  <span>Jelajahi Semua 6 Karya &amp; Konsep</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </EditorialReveal>
          </div>
        </div>
      </div>

      <ProjectInspectorModal project={inspected} onClose={() => setInspected(null)} />
    </section>
  );
}
