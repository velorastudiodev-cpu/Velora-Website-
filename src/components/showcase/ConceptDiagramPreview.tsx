import { CheckCircle2, Clock3, FileSpreadsheet, Layers, SlidersHorizontal } from "lucide-react";

type ConceptDiagramProps = {
  slug: string;
};

/**
 * Purpose-built architectural interface blueprints for internal studio explorations
 * (replaces generic tilted colored rectangles with legible UI compositions).
 */
export function ConceptDiagramPreview({ slug }: ConceptDiagramProps) {
  if (slug === "ritme-operasi") {
    return (
      <div
        aria-hidden="true"
        className="flex h-full min-h-[210px] flex-col justify-between rounded-lg border border-white/10 bg-[#0d0c18] p-4 text-[#f7f6fb]"
      >
        <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
          <span className="font-mono text-[11px] tracking-wider text-[#7fa3ff]">
            KONSEP · RITME OPERASI
          </span>
          <span className="rounded bg-white/8 px-2 py-0.5 font-mono text-[10px] text-[#b1adc7]">
            3 STATUS AKTIF
          </span>
        </div>
        <div className="my-3 space-y-2">
          {[
            { label: "Jadwal produksi batch #14", state: "Aktif", dot: "bg-emerald-400" },
            { label: "Konfirmasi bahan vendor", state: "Menunggu", dot: "bg-amber-400" },
            { label: "Serah terima pesanan ritel", state: "Siap", dot: "bg-[#7fa3ff]" },
          ].map((row) => (
            <div
              key={row.label}
              className="flex items-center justify-between rounded border border-white/8 bg-[#141325] px-3 py-2 text-xs"
            >
              <span className="truncate pr-2 text-[#e8e6f2]">{row.label}</span>
              <span className="inline-flex shrink-0 items-center gap-1.5 font-mono text-[11px] text-[#b1adc7]">
                <span className={`h-1.5 w-1.5 rounded-full ${row.dot}`} />
                {row.state}
              </span>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between font-mono text-[11px] text-[#8e8aa8]">
          <span className="inline-flex items-center gap-1">
            <Clock3 className="h-3 w-3" /> Visibilitas lintas peran
          </span>
          <span>Eksplorasi Internal</span>
        </div>
      </div>
    );
  }

  if (slug === "katalog-bumi-rasa") {
    return (
      <div
        aria-hidden="true"
        className="flex h-full min-h-[210px] flex-col justify-between rounded-lg border border-[#dad6e8] bg-[#faf9fc] p-4 text-[#151324]"
      >
        <div className="flex items-center justify-between border-b border-[#e2dfec] pb-2.5">
          <span className="font-mono text-[11px] tracking-wider text-[#4638d2]">
            KONSEP · KATALOG EDITORIAL
          </span>
          <SlidersHorizontal className="h-3.5 w-3.5 text-[#686380]" />
        </div>
        <div className="my-3 grid grid-cols-12 gap-2.5">
          <div className="col-span-5 flex flex-col justify-between rounded border border-[#e2dfec] bg-[#ebe7f8]/70 p-3">
            <span className="font-mono text-[10px] text-[#4638d2]">SERI PANEN 02</span>
            <p className="mt-3 font-display text-sm font-semibold leading-snug">
              Roast Single Origin &amp; Rempah
            </p>
          </div>
          <div className="col-span-7 space-y-1.5">
            {[
              ["Kemasan Ritel", "250g · Siap seduh"],
              ["Suplai Kafe / B2B", "1kg – 5kg · Jadwal rutin"],
              ["Asal Bahan", "Catatan kebun & profil rasa"],
            ].map(([k, v]) => (
              <div
                key={k}
                className="rounded border border-[#e2dfec] bg-white px-2.5 py-1.5 text-xs"
              >
                <div className="font-medium text-[#151324]">{k}</div>
                <div className="text-[11px] text-[#686380]">{v}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between font-mono text-[11px] text-[#686380]">
          <span className="inline-flex items-center gap-1">
            <Layers className="h-3 w-3" /> Struktur B2C &amp; Grosir
          </span>
          <span>Eksplorasi Internal</span>
        </div>
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className="flex h-full min-h-[210px] flex-col justify-between rounded-lg border border-[#3a2db8]/30 bg-[#181533] p-4 text-[#f7f6fb]"
    >
      <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
        <span className="font-mono text-[11px] tracking-wider text-[#7fa3ff]">
          DEMO · REKONSILIASI KAS HARIAN
        </span>
        <FileSpreadsheet className="h-3.5 w-3.5 text-[#b1adc7]" />
      </div>
      <div className="my-3 space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded border border-white/10 bg-white/5 p-2.5">
            <span className="font-mono text-[10px] text-[#b1adc7]">MASUK TERVERIFIKASI</span>
            <p className="mt-1 font-mono text-sm font-semibold text-white">12 Transaksi</p>
          </div>
          <div className="rounded border border-white/10 bg-white/5 p-2.5">
            <span className="font-mono text-[10px] text-[#b1adc7]">MENUNGGU NOTA</span>
            <p className="mt-1 font-mono text-sm font-semibold text-amber-300">2 Catatan</p>
          </div>
        </div>
        <div className="flex items-center justify-between rounded border border-white/10 bg-[#0d0c18]/70 px-3 py-2 text-xs">
          <span className="text-[#e8e6f2]">Status tutup buku shift sore</span>
          <span className="inline-flex items-center gap-1 font-mono text-[11px] text-emerald-300">
            <CheckCircle2 className="h-3 w-3" /> Siap tinjau
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between font-mono text-[11px] text-[#b1adc7]">
        <span>Ergonomi input cepat</span>
        <span>Demo Internal</span>
      </div>
    </div>
  );
}
