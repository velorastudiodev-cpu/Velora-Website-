"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Monitor,
  Smartphone,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import type { VeloraProject } from "@/data/projects";
import { cn } from "@/lib/cn";

type ProjectInspectorModalProps = {
  project: VeloraProject | null;
  onClose: () => void;
};

export function ProjectInspectorModal({ project, onClose }: ProjectInspectorModalProps) {
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    setDevice("desktop");
    setSlideIndex(0);
  }, [project?.id]);

  const slides =
    project == null
      ? []
      : device === "desktop"
        ? project.desktopGallery
        : project.mobileGallery.length > 0
          ? project.mobileGallery
          : project.desktopGallery;

  useEffect(() => {
    if (!project) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && slides.length > 1) {
        setSlideIndex((i) => (i + 1) % slides.length);
      }
      if (e.key === "ArrowLeft" && slides.length > 1) {
        setSlideIndex((i) => (i - 1 + slides.length) % slides.length);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [project, onClose, slides.length]);

  const switchDevice = (next: "desktop" | "mobile") => {
    setDevice(next);
    setSlideIndex(0);
  };

  return (
    <AnimatePresence>
      {project && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="inspector-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
        >
          <motion.div
            key="inspector-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#080711]/82 backdrop-blur-sm"
          />

          <motion.div
            key="inspector-dialog"
            initial={{ opacity: 0, scale: 0.97, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 12 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-white/14 bg-[#121122] text-[#f7f6fb] shadow-2xl"
          >
            {/* Modal Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-[#0d0c18] px-4 py-3.5 sm:px-6">
              <div className="min-w-0">
                <p className="font-mono text-[11px] uppercase tracking-wider text-[#7fa3ff]">
                  {project.tierBadge}
                </p>
                <h2
                  id="inspector-modal-title"
                  className="truncate font-display text-base font-bold text-white sm:text-lg"
                >
                  {project.title}
                </h2>
              </div>

              <div className="flex items-center gap-2">
                {/* Desktop / Mobile Switcher */}
                <div
                  role="group"
                  aria-label="Mode perangkat preview"
                  className="inline-flex rounded-lg border border-white/12 bg-[#17152b] p-0.5"
                >
                  <button
                    type="button"
                    onClick={() => switchDevice("desktop")}
                    aria-pressed={device === "desktop"}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors",
                      device === "desktop"
                        ? "bg-[#4638d2] text-white"
                        : "text-[#b1adc7] hover:text-white"
                    )}
                  >
                    <Monitor className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">Desktop</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => switchDevice("mobile")}
                    aria-pressed={device === "mobile"}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors",
                      device === "mobile"
                        ? "bg-[#4638d2] text-white"
                        : "text-[#b1adc7] hover:text-white"
                    )}
                  >
                    <Smartphone className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">Mobile</span>
                  </button>
                </div>

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-white/16 bg-white/6 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:border-white/35 hover:bg-white/12"
                  >
                    <span>Buka Live</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}

                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Tutup jendela pratinjau"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/12 text-[#b1adc7] transition-colors hover:border-white/30 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Viewport Stage */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              <div className="flex flex-col items-center justify-center rounded-xl border border-white/10 bg-[#090812] p-3 sm:p-5">
                <motion.div
                  layout
                  transition={{ type: "spring", stiffness: 280, damping: 30 }}
                  className={cn(
                    "relative overflow-hidden border border-white/14 bg-[#141325] shadow-2xl",
                    device === "desktop"
                      ? "aspect-[16/10] w-full max-w-4xl rounded-lg"
                      : "aspect-[9/19.5] w-full max-w-[300px] rounded-[24px]"
                  )}
                >
                  {slides[slideIndex] && (
                    <Image
                      key={`${device}-${slides[slideIndex]}`}
                      src={slides[slideIndex]}
                      alt={`Tangkapan layar ${project.title} (${device})`}
                      fill
                      sizes={device === "desktop" ? "(max-width: 1024px) 95vw, 900px" : "300px"}
                      className="object-cover object-top"
                    />
                  )}
                </motion.div>

                {slides.length > 1 && (
                  <div className="mt-4 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        setSlideIndex((i) => (i - 1 + slides.length) % slides.length)
                      }
                      aria-label="Tangkapan layar sebelumnya"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/14 bg-[#141325] text-white hover:border-white/35"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <span className="font-mono text-xs text-[#b1adc7]">
                      Layar {slideIndex + 1} / {slides.length}
                    </span>
                    <button
                      type="button"
                      onClick={() => setSlideIndex((i) => (i + 1) % slides.length)}
                      aria-label="Tangkapan layar berikutnya"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/14 bg-[#141325] text-white hover:border-white/35"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Project Context Footer inside Modal */}
              <div className="mt-5 grid grid-cols-1 gap-4 rounded-xl border border-white/10 bg-[#17152b]/70 p-4 sm:grid-cols-12 sm:items-center">
                <div className="space-y-1.5 sm:col-span-8">
                  <p className="text-xs leading-relaxed text-[#d6d3e8] sm:text-sm">
                    {project.summary}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded border border-white/10 bg-[#0d0c18] px-2 py-0.5 font-mono text-[11px] text-[#b1adc7]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex sm:col-span-4 sm:justify-end">
                  <Link
                    href={`/karya/${project.slug}`}
                    onClick={onClose}
                    className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-[#4638d2] px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#5446e6] sm:w-auto"
                  >
                    <span>Bedah Studi Kasus</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
