"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { VELORA_FAQS, type FaqItem } from "@/data/faqs";
import { cn } from "@/lib/cn";

const CATEGORIES: Array<"Semua" | FaqItem["category"]> = [
  "Semua",
  "Layanan & Scope",
  "Biaya & Waktu",
  "Teknis & Handover",
];

export function FaqInteractiveList({ items = VELORA_FAQS }: { items?: FaqItem[] }) {
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("Semua");
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  const visibleItems =
    category === "Semua" ? items : items.filter((item) => item.category === category);

  return (
    <div className="space-y-6">
      <div role="group" aria-label="Filter topik pertanyaan" className="flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => {
          const active = category === cat;
          return (
            <button
              key={cat}
              type="button"
              aria-pressed={active}
              onClick={() => setCategory(cat)}
              className={cn(
                "rounded-lg border px-3.5 py-2 text-xs font-semibold transition-colors",
                active
                  ? "border-[#151324] bg-[#151324] text-white"
                  : "border-[#dad6e8] bg-white text-[#433f59] hover:border-[#151324]"
              )}
            >
              {cat}
            </button>
          );
        })}
      </div>

      <div className="divide-y divide-[#e2dfec] overflow-hidden rounded-2xl border border-[#dad6e8] bg-white">
        {visibleItems.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div key={faq.id} className="p-5 sm:p-6">
              <h3>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${faq.id}`}
                  id={`faq-trigger-${faq.id}`}
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className="flex w-full items-start justify-between gap-4 text-left"
                >
                  <span className="space-y-1">
                    <span className="block font-mono text-[11px] uppercase tracking-wider text-[#4638d2]">
                      {faq.category}
                    </span>
                    <span className="block font-display text-base font-bold text-[#151324] sm:text-lg">
                      {faq.question}
                    </span>
                  </span>
                  <span
                    className={cn(
                      "mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#e2dfec] text-[#151324] transition-transform duration-200",
                      isOpen && "rotate-180 border-[#4638d2] bg-[#ebe7f8] text-[#4638d2]"
                    )}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </span>
                </button>
              </h3>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`faq-panel-${faq.id}`}
                    role="region"
                    aria-labelledby={`faq-trigger-${faq.id}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <p className="pt-3.5 text-sm leading-relaxed text-[#433f59] sm:text-base">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
