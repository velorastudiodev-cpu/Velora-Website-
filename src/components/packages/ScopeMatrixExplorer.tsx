"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { useMemo, useState } from "react";
import {
  CONFIGURABLE_ADDONS,
  PACKAGE_DIRECTIONS,
  type PackageDirection,
} from "@/data/packages";
import { cn } from "@/lib/cn";

export function ScopeMatrixExplorer() {
  const [selectedPkgId, setSelectedPkgId] =
    useState<PackageDirection["id"]>("aplikasi-web");
  const [selectedAddons, setSelectedAddons] = useState<string[]>(["self-service-cms"]);

  const activePackage =
    PACKAGE_DIRECTIONS.find((p) => p.id === selectedPkgId) ?? PACKAGE_DIRECTIONS[1];

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const prefillHref = useMemo(() => {
    const params = new URLSearchParams();
    params.set("paket", activePackage.id);
    params.set("layanan", activePackage.serviceType);
    if (selectedAddons.length > 0) {
      params.set("modul", selectedAddons.join(","));
    }
    return `/mulai-proyek?${params.toString()}`;
  }, [activePackage, selectedAddons]);

  return (
    <div className="rounded-2xl border border-white/12 bg-[#141325] p-6 text-[#f7f6fb] sm:p-8">
      <div className="max-w-2xl space-y-2">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-[#7fa3ff]">
          KONFIGURATOR RUANG LINGKUP AWAL
        </p>
        <h3 className="font-display text-2xl font-bold text-white sm:text-3xl">
          Susun kombinasi kebutuhan sebelum mengirim brief.
        </h3>
        <p className="text-sm leading-relaxed text-[#b9b5ce]">
          Pilih arah paket dan modul pendukung yang relevan. Pilihan Anda akan otomatis
          mengisi formulir diskusi proyek tanpa mengunci komitmen biaya di muka.
        </p>
      </div>

      {/* Step 1: Select Base Direction */}
      <div className="mt-7 space-y-3">
        <p className="font-mono text-xs text-[#b1adc7]">
          1. PILIH ARAH UTAMA PROYEK
        </p>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {PACKAGE_DIRECTIONS.map((pkg) => {
            const active = pkg.id === selectedPkgId;
            return (
              <button
                key={pkg.id}
                type="button"
                onClick={() => setSelectedPkgId(pkg.id)}
                aria-pressed={active}
                className={cn(
                  "relative rounded-xl border p-4 text-left transition-colors",
                  active
                    ? "border-[#7fa3ff] bg-[#4638d2]/30 text-white"
                    : "border-white/12 bg-[#0d0c18] text-[#b9b5ce] hover:border-white/30"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-[#7fa3ff]">{pkg.index}</span>
                  {active && (
                    <motion.span
                      layoutId="pkg-explorer-check"
                      className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#7fa3ff] text-[#0d0c18]"
                    >
                      <Check className="h-3 w-3" />
                    </motion.span>
                  )}
                </div>
                <p className="mt-2 font-display text-base font-bold text-white">{pkg.name}</p>
                <p className="mt-1 text-xs leading-relaxed text-[#b1adc7]">{pkg.eyebrow}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 2: Select Optional Modules */}
      <div className="mt-7 space-y-3">
        <p className="font-mono text-xs text-[#b1adc7]">
          2. TANDAI MODUL TAMBAHAN YANG INGIN DIDISKUSIKAN (OPSIONAL)
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CONFIGURABLE_ADDONS.map((addon) => {
            const checked = selectedAddons.includes(addon.id);
            return (
              <button
                key={addon.id}
                type="button"
                onClick={() => toggleAddon(addon.id)}
                aria-pressed={checked}
                className={cn(
                  "flex flex-col justify-between rounded-xl border p-4 text-left transition-colors",
                  checked
                    ? "border-emerald-400/45 bg-emerald-400/10 text-white"
                    : "border-white/10 bg-[#0d0c18] text-[#b9b5ce] hover:border-white/25"
                )}
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#7fa3ff]">
                      {addon.category}
                    </span>
                    <span
                      className={cn(
                        "inline-flex h-4 w-4 items-center justify-center rounded border",
                        checked
                          ? "border-emerald-400 bg-emerald-400 text-[#0d0c18]"
                          : "border-white/25"
                      )}
                    >
                      {checked && <Check className="h-3 w-3" />}
                    </span>
                  </div>
                  <p className="mt-2 text-sm font-semibold text-white">{addon.label}</p>
                  <p className="mt-1 text-xs leading-relaxed text-[#b1adc7]">
                    {addon.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Summary Action Bar */}
      <div className="mt-8 flex flex-col justify-between gap-4 rounded-xl border border-white/12 bg-[#0d0c18] p-5 sm:flex-row sm:items-center">
        <div className="space-y-1">
          <p className="font-mono text-xs text-[#7fa3ff]">RINGKASAN KONTEKS BRIEF</p>
          <p className="text-sm font-semibold text-white">
            {activePackage.name}
            {selectedAddons.length > 0
              ? ` + ${selectedAddons.length} modul tambahan dipilih`
              : " (tanpa modul tambahan)"}
          </p>
          <p className="text-xs text-[#9c97b5]">
            Estimasi biaya &amp; jadwal disusun transparan setelah kami mempelajari brief Anda.
          </p>
        </div>

        <Link
          href={prefillHref}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-[#4638d2] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#5446e6]"
        >
          <span>Bawa ke Form Diskusi Proyek</span>
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
