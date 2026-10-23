"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ExternalLink, Eye } from "lucide-react";
import { useMemo, useState } from "react";
import {
  VELORA_PROJECTS,
  type ProjectCategory,
  type ProjectTier,
  type VeloraProject,
} from "@/data/projects";
import { ConceptDiagramPreview } from "@/components/showcase/ConceptDiagramPreview";
import { ProjectInspectorModal } from "@/components/showcase/ProjectInspectorModal";
import { cn } from "@/lib/cn";

type TierFilter = "all" | ProjectTier;
type CategoryFilter = "all" | ProjectCategory;

const TIER_FILTERS: Array<{ value: TierFilter; label: string }> = [
  { value: "all", label: "Semua Karya (6)" },
  { value: "client", label: "Proyek Klien Nyata (3)" },
  { value: "concept", label: "Eksplorasi & Konsep (3)" },
];

const CATEGORY_FILTERS: Array<{ value: CategoryFilter; label: string }> = [
  { value: "all", label: "Semua Kategori" },
  { value: "website", label: "Website Bisnis" },
  { value: "aplikasi", label: "Aplikasi Web / CMS" },
  { value: "sistem", label: "Sistem Bisnis" },
];

export function KaryaFilterGallery() {
  const [tierFilter, setTierFilter] = useState<TierFilter>("all");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all");
  const [inspected, setInspected] = useState<VeloraProject | null>(null);

  const filtered = useMemo(() => {
    return VELORA_PROJECTS.filter((project) => {
      const matchTier = tierFilter === "all" || project.tier === tierFilter;
      const matchCategory =
        categoryFilter === "all" || project.category === categoryFilter;
      return matchTier && matchCategory;
    });
  }, [tierFilter, categoryFilter]);

  const resetFilters = () => {
    setTierFilter("all");
    setCategoryFilter("all");
  };

  return (
    <div className="space-y-8">
      {/* Dual Filter Bar */}
      <div className="flex flex-col justify-between gap-4 rounded-2xl border border-[#dad6e8] bg-white p-4 sm:p-5 lg:flex-row lg:items-center">
        {/* Tier Switcher */}
        <div
          role="group"
          aria-label="Filter berdasarkan jenis portofolio"
          className="flex flex-wrap gap-1.5"
        >
          {TIER_FILTERS.map((item) => {
            const active = tierFilter === item.value;
            return (
              <button
                key={item.value}
                type="button"
                aria-pressed={active}
                onClick={() => setTierFilter(item.value)}
                className={cn(
                  "relative rounded-lg px-3.5 py-2 text-xs font-semibold transition-colors sm:text-sm",
                  active ? "text-white" : "text-[#433f59] hover:text-[#151324]"
                )}
              >
                {active && (
                  <motion.span
                    layoutId="karya-tier-pill"
                    className="absolute inset-0 rounded-lg bg-[#151324]"
                    transition={{ type: "spring", stiffness: 360, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Category Switcher */}
        <div
          role="group"
          aria-label="Filter berdasarkan kategori solusi"
          className="flex flex-wrap gap-1.5 border-t border-[#e2dfec] pt-3 lg:border-t-0 lg:pt-0"
        >
          {CATEGORY_FILTERS.map((cat) => {
            const active = categoryFilter === cat.value;
            return (
              <button
                key={cat.value}
                type="button"
                aria-pressed={active}
                onClick={() => setCategoryFilter(cat.value)}
                className={cn(
                  "rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors",
                  active
                    ? "border-[#4638d2] bg-[#ebe7f8] text-[#312578]"
                    : "border-[#e2dfec] bg-[#faf9fc] text-[#433f59] hover:border-[#151324]"
                )}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Filtered Grid */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-[#dad6e8] bg-white p-10 text-center">
          <p className="font-display text-lg font-bold text-[#151324]">
            Belum ada entri untuk kombinasi filter tersebut.
          </p>
          <p className="mt-1 text-sm text-[#433f59]">
            Coba tampilkan kembali seluruh kategori karya Velora Studio.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="mt-4 rounded-lg bg-[#4638d2] px-4 py-2 text-xs font-semibold text-white hover:bg-[#3a2db8]"
          >
            Reset Filter
          </button>
        </div>
      ) : (
        <motion.div layout className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.article
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.24 }}
                className="flex flex-col justify-between overflow-hidden rounded-2xl border border-[#dad6e8] bg-white shadow-xs"
              >
                {/* Visual Top */}
                <div className="border-b border-[#e2dfec] bg-[#0d0c18] p-4">
                  <div className="mb-2.5 flex items-center justify-between gap-2">
                    <span
                      className={cn(
                        "rounded px-2.5 py-0.5 font-mono text-[11px] font-medium",
                        project.tier === "client"
                          ? "bg-emerald-400/15 text-emerald-300"
                          : "bg-white/10 text-[#d6d3e8]"
                      )}
                    >
                      {project.tierBadge}
                    </span>
                    <span className="font-mono text-xs text-[#8e8aa8]">{project.index}</span>
                  </div>

                  {project.tier === "client" ? (
                    <button
                      type="button"
                      onClick={() => setInspected(project)}
                      aria-label={`Inspeksi layar ${project.title}`}
                      className="group relative block aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/12 bg-[#141325]"
                    >
                      <Image
                        src={project.coverDesktop}
                        alt={`Screenshot ${project.title}`}
                        fill
                        sizes="(max-width: 768px) 95vw, 560px"
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                      <span className="absolute right-2.5 bottom-2.5 inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-[#0d0c18]/90 px-3 py-1.5 text-xs font-semibold text-white transition-colors group-hover:bg-[#4638d2]">
                        <Eye className="h-3.5 w-3.5" />
                        <span>Inspeksi Layar</span>
                      </span>
                    </button>
                  ) : (
                    <ConceptDiagramPreview slug={project.slug} />
                  )}
                </div>

                {/* Body */}
                <div className="flex flex-1 flex-col justify-between p-6">
                  <div className="space-y-3">
                    <p className="font-mono text-xs uppercase tracking-wider text-[#4638d2]">
                      {project.categoryLabel}
                    </p>
                    <h2 className="font-display text-2xl font-bold text-[#151324]">
                      {project.title}
                    </h2>
                    <p className="text-sm leading-relaxed text-[#433f59]">{project.summary}</p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded border border-[#e2dfec] bg-[#faf9fc] px-2 py-0.5 font-mono text-[11px] text-[#433f59]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center justify-between gap-2 border-t border-[#e2dfec] pt-4">
                    <Link
                      href={`/karya/${project.slug}`}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-[#151324] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#4638d2]"
                    >
                      <span>{project.tier === "client" ? "Baca Studi Kasus" : "Baca Konsep"}</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg border border-[#cbc6dc] px-3 py-2 text-xs font-semibold text-[#151324] hover:border-[#151324]"
                      >
                        <span>Buka Live</span>
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      <ProjectInspectorModal project={inspected} onClose={() => setInspected(null)} />
    </div>
  );
}
