"use client";

import { useRouter } from "next/navigation";
import { Check, LogOut, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { LEAD_STATUS_OPTIONS, type LeadStatus } from "@/lib/validations";

export type LeadRecord = {
  id: string;
  reference_code: string;
  name: string;
  business_name: string | null;
  email: string;
  whatsapp: string | null;
  service_type: string;
  selected_package: string | null;
  selected_addons: string[];
  budget_range: string | null;
  target_date: string | null;
  reference_url: string | null;
  brief: string;
  additional_context: string | null;
  status: LeadStatus;
  internal_notes: string | null;
  created_at: string;
};

export function AdminLeadConsole({ initialLeads }: { initialLeads: LeadRecord[] }) {
  const router = useRouter();
  const [leads, setLeads] = useState<LeadRecord[]>(initialLeads);
  const [statusFilter, setStatusFilter] = useState<"all" | LeadStatus>("all");
  const [query, setQuery] = useState("");
  const [savingId, setSavingId] = useState<string | null>(null);
  const [savedToastId, setSavedToastId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return leads.filter((lead) => {
      const matchStatus = statusFilter === "all" || lead.status === statusFilter;
      const matchQuery =
        !q ||
        lead.name.toLowerCase().includes(q) ||
        lead.email.toLowerCase().includes(q) ||
        (lead.business_name || "").toLowerCase().includes(q) ||
        lead.reference_code.toLowerCase().includes(q);
      return matchStatus && matchQuery;
    });
  }, [leads, statusFilter, query]);

  const handleSave = async (lead: LeadRecord) => {
    setSavingId(lead.id);
    try {
      const res = await fetch("/api/admin/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: lead.id,
          status: lead.status,
          internal_notes: lead.internal_notes,
        }),
      });
      if (res.ok) {
        setSavedToastId(lead.id);
        setTimeout(() => setSavedToastId(null), 2000);
      }
    } finally {
      setSavingId(null);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#dad6e8] bg-white p-5">
        <div className="flex flex-1 flex-wrap items-center gap-3">
          <div className="relative min-w-[220px] flex-1">
            <Search className="pointer-events-none absolute top-3 left-3 h-4 w-4 text-[#686380]" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari nama, email, bisnis, atau kode VLR..."
              className="w-full rounded-lg border border-[#cbc6dc] bg-[#faf9fc] py-2 pr-3 pl-9 text-sm text-[#151324]"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as "all" | LeadStatus)}
            aria-label="Filter status brief"
            className="rounded-lg border border-[#cbc6dc] bg-[#faf9fc] px-3 py-2 text-sm text-[#151324]"
          >
            <option value="all">Semua Status ({leads.length})</option>
            {LEAD_STATUS_OPTIONS.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="inline-flex items-center gap-1.5 rounded-lg border border-[#cbc6dc] px-3.5 py-2 text-xs font-semibold text-[#151324] hover:border-[#151324]"
        >
          <LogOut className="h-3.5 w-3.5" />
          <span>Keluar Sesi</span>
        </button>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-[#dad6e8] bg-white p-10 text-center text-sm text-[#433f59]">
          Belum ada data brief yang cocok dengan filter saat ini.
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((lead) => (
            <article
              key={lead.id}
              className="space-y-4 rounded-2xl border border-[#dad6e8] bg-white p-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-3 border-b border-[#e2dfec] pb-4">
                <div>
                  <span className="font-mono text-xs font-semibold text-[#4638d2]">
                    {lead.reference_code}
                  </span>
                  <h2 className="font-display text-lg font-bold text-[#151324]">
                    {lead.name}{" "}
                    {lead.business_name ? `· ${lead.business_name}` : ""}
                  </h2>
                  <p className="text-xs text-[#686380]">
                    {lead.email}
                    {lead.whatsapp ? ` · WA: ${lead.whatsapp}` : ""} ·{" "}
                    {new Date(lead.created_at).toLocaleString("id-ID")}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={lead.status}
                    onChange={(e) => {
                      const nextStatus = e.target.value as LeadStatus;
                      setLeads((prev) =>
                        prev.map((item) =>
                          item.id === lead.id ? { ...item, status: nextStatus } : item
                        )
                      );
                    }}
                    className="rounded-lg border border-[#cbc6dc] bg-[#faf9fc] px-3 py-1.5 font-mono text-xs text-[#151324]"
                  >
                    {LEAD_STATUS_OPTIONS.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>

                  <button
                    type="button"
                    disabled={savingId === lead.id}
                    onClick={() => handleSave(lead)}
                    className="inline-flex items-center gap-1 rounded-lg bg-[#4638d2] px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-[#3a2db8] disabled:opacity-60"
                  >
                    {savedToastId === lead.id ? (
                      <>
                        <Check className="h-3.5 w-3.5" />
                        <span>Tersimpan</span>
                      </>
                    ) : (
                      <span>Simpan</span>
                    )}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 text-xs text-[#433f59] md:grid-cols-3">
                <div>
                  <strong className="text-[#151324]">Layanan / Paket:</strong>{" "}
                  {lead.service_type} {lead.selected_package ? `(${lead.selected_package})` : ""}
                </div>
                <div>
                  <strong className="text-[#151324]">Budget:</strong>{" "}
                  {lead.budget_range || "Belum ditentukan"}
                </div>
                <div>
                  <strong className="text-[#151324]">Target Waktu:</strong>{" "}
                  {lead.target_date || "-"}
                </div>
              </div>

              <div className="rounded-xl border border-[#e2dfec] bg-[#faf9fc] p-4 text-sm leading-relaxed text-[#151324]">
                {lead.brief}
              </div>

              <div className="space-y-1.5">
                <label className="block font-mono text-[11px] uppercase tracking-wider text-[#686380]">
                  Catatan Internal Pengelola (Privat)
                </label>
                <textarea
                  rows={2}
                  value={lead.internal_notes || ""}
                  onChange={(e) => {
                    const val = e.target.value;
                    setLeads((prev) =>
                      prev.map((item) =>
                        item.id === lead.id ? { ...item, internal_notes: val } : item
                      )
                    );
                  }}
                  placeholder="Tulis catatan tindak lanjut..."
                  className="w-full rounded-lg border border-[#cbc6dc] bg-[#faf9fc] px-3 py-2 text-xs text-[#151324]"
                />
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
