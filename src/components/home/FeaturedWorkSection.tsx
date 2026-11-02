"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { CLIENT_PROJECTS, type VeloraProject } from "@/data/projects";

const SHORT_COPY: Record<string, string> = {
  "ikbar-barbershop": "Website profil dan akses layanan barbershop.",
  "dzikri-mount-guide": "Informasi pendakian dan alur booking yang mudah.",
  "ikbar-cms-dashboard": "Kelola konten dan operasional dari satu tempat.",
};
const STICK_TOP = 96;
const STICK_STEP = 18;

// Blueprint order: website, mountain guide, then the admin dashboard.
const ORDER = ["ikbar-barbershop", "dzikri-mount-guide", "ikbar-cms-dashboard"];
const PROJECTS = ORDER.map((slug) => CLIENT_PROJECTS.find((p) => p.slug === slug)).filter(
  (p): p is VeloraProject => Boolean(p)
);

function hostOf(url: string | null) {
  return url ? url.replace(/^https?:\/\//, "").replace(/\/$/, "") : "velora.studio";
}

function BrowserFrame({ project }: { project: VeloraProject }) {
  const tall = project.pageScroll;
  return (
    <div className="relative overflow-hidden rounded-[18px] border border-[#1b1530]/10 bg-[#141026] shadow-[0_30px_60px_-30px_rgba(40,25,90,0.55)]">
      <div className="flex h-8 items-center gap-3 border-b border-white/8 bg-[#1b1633] px-3.5">
        <span className="flex gap-1.5">
          <i className="h-2.5 w-2.5 rounded-full bg-[#ff6b6b]" />
          <i className="h-2.5 w-2.5 rounded-full bg-[#ffc94d]" />
          <i className="h-2.5 w-2.5 rounded-full bg-[#54d38a]" />
        </span>
        <span className="mx-auto max-w-[60%] truncate rounded-full bg-white/8 px-3 py-0.5 font-mono text-[10px] text-white/55">
          {hostOf(project.liveUrl)}
        </span>
        {project.slug === "ikbar-cms-dashboard" && (
          <span className="rounded-full bg-[#b9a8ff]/20 px-2 py-0.5 text-[9px] font-semibold text-[#d9d0ff]">Data demo</span>
        )}
      </div>
      <div className="group/screen relative aspect-[16/10] overflow-hidden">
        {tall ? (
          // Full-page capture that slowly scrolls on hover, so the whole site can be previewed in place.
          <Image
            src={tall}
            alt={`Tampilan halaman ${project.title}`}
            width={1080}
            height={4800}
            sizes="(max-width: 1024px) 92vw, 760px"
            className="absolute inset-x-0 top-0 h-auto w-full transition-transform duration-[9000ms] ease-in-out group-hover/screen:translate-y-[calc(-100%+min(47vw,470px))]"
          />
        ) : (
          <Image
            src={project.coverDesktop}
            alt={`Tampilan ${project.title}`}
            fill
            sizes="(max-width: 1024px) 92vw, 760px"
            className="object-cover object-top"
          />
        )}
      </div>
    </div>
  );
}

function PhoneFrame({ project }: { project: VeloraProject }) {
  const src = project.mobileGallery[0];
  if (!src) return null;
  return (
    <motion.div
      initial={{ y: 70, opacity: 0, rotate: 4 }}
      whileInView={{ y: 0, opacity: 1, rotate: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1.1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="absolute -right-2 bottom-[-6%] w-[23%] min-w-[96px] rounded-[26px] border-[5px] border-[#16122a] bg-[#16122a] shadow-[0_30px_50px_-20px_rgba(20,10,60,0.6)] sm:right-[-3%] md:rounded-[30px]"
    >
      <div className="relative aspect-[9/19.5] overflow-hidden rounded-[21px] md:rounded-[25px]">
        <Image src={src} alt={`Tampilan seluler ${project.title}`} fill sizes="200px" className="object-cover object-top" />
        <span className="absolute top-1.5 left-1/2 h-[5%] w-[34%] -translate-x-1/2 rounded-full bg-[#16122a]" />
      </div>
    </motion.div>
  );
}

function ProjectCard({
  project,
  index,
  range,
  scrollY,
}: {
  project: VeloraProject;
  index: number;
  range: [number, number] | null;
  scrollY: MotionValue<number>;
}) {
  // While the next card slides over this one, shrink and dim it (stacked deck effect).
  const [from, to] = range ?? [0, 1];
  const active = range !== null;
  const scale = useTransform(scrollY, [from, to], [1, active ? 0.92 : 1]);
  const dim = useTransform(scrollY, [from, to], [0, active ? 0.3 : 0]);

  return (
    <article
      data-karya-card
      className="md:sticky md:h-[min(560px,78vh)]"
      style={{ top: STICK_TOP + index * STICK_STEP }}
    >
      <motion.div
        style={{ scale }}
        className="relative grid origin-top grid-cols-1 gap-8 overflow-hidden rounded-[32px] border border-white bg-[linear-gradient(135deg,#ffffff_0%,#fbfaff_55%,#f4f0ff_100%)] p-6 shadow-[0_40px_80px_-50px_rgba(50,30,110,0.45)] md:h-full md:grid-cols-[minmax(220px,0.8fr)_2.2fr] md:p-8 lg:gap-10"
      >
        <div aria-hidden="true" className="pointer-events-none absolute -top-24 -left-24 h-64 w-64 rounded-full bg-[#d9cfff]/50 blur-3xl" />
        <div className="relative flex flex-col justify-center">
          <p className="flex items-center gap-3 font-mono text-xs text-[#6b6488]">
            0{index + 1}
            <span className="h-px w-8 bg-[#b9b2d1]" />
          </p>
          <h3 className="mt-4 font-display text-[clamp(1.6rem,2.6vw,2.15rem)] leading-[1.05] font-bold tracking-tight text-[#151324]">
            {project.slug === "ikbar-barbershop" ? "DINASTI" : project.title}
          </h3>
          <p className="mt-3 max-w-[260px] text-[15px] leading-relaxed text-[#4c4766]">
            {SHORT_COPY[project.slug] ?? project.subtitle}
          </p>
          <p className="mt-4 flex flex-wrap gap-1.5">
            {project.stack.slice(0, 3).map((s) => (
              <span key={s} className="rounded-full border border-[#e3def2] bg-[#f6f3ff] px-2.5 py-1 text-[11px] text-[#5a5378]">
                {s}
              </span>
            ))}
          </p>
          <Link
            href={`/karya/${project.slug}`}
            className="group mt-7 inline-flex w-fit items-center gap-2 border-b border-[#4638d2]/30 pb-1 text-[15px] font-semibold text-[#4638d2] transition-colors hover:border-[#4638d2]"
          >
            Lihat proyek
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="relative flex items-center pr-[8%] pb-6 [perspective:1600px] md:pb-0">
          <motion.div
            initial={{ rotateX: 14, y: 40, opacity: 0 }}
            whileInView={{ rotateX: 0, y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="w-full origin-bottom"
          >
            <BrowserFrame project={project} />
          </motion.div>
          <PhoneFrame project={project} />
        </div>

        <motion.div aria-hidden="true" style={{ opacity: dim }} className="pointer-events-none absolute inset-0 bg-[#1b1530]" />
      </motion.div>
    </article>
  );
}

/** Natural (un-stuck) page offsets of each card; sticky cards report their pinned position instead. */
function measure(list: HTMLElement) {
  const cards = Array.from(list.querySelectorAll<HTMLElement>("[data-karya-card]"));
  const gap = parseFloat(getComputedStyle(list).rowGap) || 0;
  let acc = list.getBoundingClientRect().top + window.scrollY;
  return cards.map((c) => {
    const t = acc;
    acc += c.offsetHeight + gap;
    return t;
  });
}

export function FeaturedWorkSection() {
  const listRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const [ranges, setRanges] = useState<Array<[number, number] | null>>(PROJECTS.map(() => null));

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const update = () => {
      if (!window.matchMedia("(min-width: 768px)").matches) {
        setRanges(PROJECTS.map(() => null));
        return;
      }
      const stuck = measure(list).map((t, i) => t - (STICK_TOP + i * STICK_STEP));
      setRanges(stuck.map((s, i) => (i < stuck.length - 1 ? [s, stuck[i + 1]] : null)));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(list);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  const go = (dir: 1 | -1) => {
    const list = listRef.current;
    if (!list) return;
    const stuck = measure(list).map((t, i) => t - (STICK_TOP + i * STICK_STEP));
    let current = -1;
    stuck.forEach((s, i) => {
      if (s - 40 <= window.scrollY) current = i;
    });
    const next = Math.min(stuck.length - 1, Math.max(0, current + dir));
    window.scrollTo({ top: stuck[next], behavior: "smooth" });
  };

  return (
    <section id="karya" className="relative scroll-mt-24 bg-[#f8f6f3] pt-10 pb-24 md:pt-16 md:pb-32">
      <div className="editorial-container">
        <div className="flex flex-col gap-6 md:flex-row md:items-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif-display shrink-0 text-[clamp(2.6rem,5.4vw,4.4rem)] leading-none text-[#151324]"
          >
            Karya pilihan
          </motion.h2>
          <motion.span
            aria-hidden="true"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="hidden h-px flex-1 origin-left bg-gradient-to-r from-[#b9b2d1] to-transparent md:block"
          />
          <p className="max-w-[260px] text-[15px] leading-relaxed text-[#4c4766]">
            Website dan sistem yang membantu bisnis berjalan.
          </p>
          <div className="flex gap-2.5 md:ml-6">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Proyek sebelumnya"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-[#d7d1e8] bg-white text-[#151324] transition-all hover:-translate-x-0.5 hover:border-[#4638d2] hover:text-[#4638d2]"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Proyek berikutnya"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-[#d7d1e8] bg-white text-[#151324] transition-all hover:translate-x-0.5 hover:border-[#4638d2] hover:text-[#4638d2]"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div ref={listRef} className="mt-10 flex flex-col gap-6 md:mt-14 md:gap-[12vh]">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} range={ranges[i]} scrollY={scrollY} />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/karya"
            className="group inline-flex items-center gap-2 rounded-full border border-[#d7d1e8] bg-white px-6 py-3 text-sm font-semibold text-[#151324] transition-colors hover:border-[#4638d2] hover:text-[#4638d2]"
          >
            Semua karya & eksplorasi
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
