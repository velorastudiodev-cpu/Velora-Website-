"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Layers, Monitor, PenTool } from "lucide-react";
import { VELORA_SERVICES } from "@/data/services";

const ICONS = { "website-bisnis": Monitor, "aplikasi-web": PenTool, "sistem-bisnis": Layers } as const;
const EASE = [0.22, 1, 0.36, 1] as const;

export function ServicesSection() {
  return (
    <section className="relative overflow-hidden bg-[#f8f6f3] pb-24 md:pb-32">
      <div className="editorial-container">
        <div className="grid grid-cols-1 gap-6 border-t border-[#e4dfee] pt-16 md:grid-cols-[1.6fr_1fr] md:items-end md:pt-20">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.32em] text-[#6b6488]">LAYANAN KAMI</p>
            <motion.h2
              initial="hidden"
              whileInView="shown"
              viewport={{ once: true, amount: 0.5 }}
              className="font-serif-display mt-3 text-[clamp(2.4rem,5vw,4.2rem)] leading-[1.02] text-[#151324]"
            >
              {["Solusi digital", "untuk pertumbuhan Anda."].map((line, i) => (
                <span key={line} className="block overflow-hidden pb-[0.08em]">
                  <motion.span
                    className="block"
                    variants={{ hidden: { y: "110%" }, shown: { y: "0%" } }}
                    transition={{ duration: 1, delay: i * 0.12, ease: EASE }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </motion.h2>
          </div>
          <p className="max-w-xs text-[15px] leading-relaxed text-[#4c4766] md:justify-self-end">
            Dari ide hingga implementasi, kami hadir di setiap langkah.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 divide-y divide-[#e4dfee] md:grid-cols-3 md:divide-x md:divide-y-0">
          {VELORA_SERVICES.map((service, i) => {
            const Icon = ICONS[service.slug];
            return (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.9, delay: i * 0.12, ease: EASE }}
              >
                <Link
                  href={`/layanan/${service.slug}`}
                  className="group relative flex h-full gap-5 py-8 md:px-7 md:py-2 md:first:pl-0"
                >
                  <span className="velora-numeral font-serif-display text-[5.2rem] leading-[0.8] transition-transform duration-500 group-hover:-translate-y-1">
                    {service.index}
                  </span>
                  <span className="flex flex-1 flex-col">
                    <span className="flex items-start justify-between gap-3">
                      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#efeaff] text-[#4638d2] transition-all duration-500 group-hover:rotate-[-8deg] group-hover:bg-[#4638d2] group-hover:text-white">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d7d1e8] text-[#151324] transition-all duration-500 group-hover:-rotate-45 group-hover:border-[#4638d2] group-hover:bg-[#4638d2] group-hover:text-white">
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </span>
                    <span className="mt-4 text-[17px] font-bold text-[#151324]">{service.shortTitle}</span>
                    <span className="mt-1.5 text-sm leading-relaxed text-[#5a5378]">{service.tagline}</span>
                    <span
                      aria-hidden="true"
                      className="mt-5 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-[#4638d2] to-[#f0a6cf] transition-transform duration-700 group-hover:scale-x-100"
                    />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
