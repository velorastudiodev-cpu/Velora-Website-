"use client";

import Link from "next/link";
import {
  AlertTriangle,
  Check,
  CheckCircle2,
  ClipboardCopy,
  Loader2,
  Send,
} from "lucide-react";
import { useState } from "react";
import { CONFIGURABLE_ADDONS, PACKAGE_DIRECTIONS } from "@/data/packages";
import { getOfficialContacts } from "@/lib/contact";
import {
  BUDGET_OPTIONS,
  ProjectBriefSchema,
  SERVICE_TYPE_OPTIONS,
} from "@/lib/validations";
import { cn } from "@/lib/cn";

type BriefFormProps = {
  initialService?: string;
  initialPackage?: string;
  initialAddons?: string[];
  storageConfiguredOnServer: boolean;
};

type FieldErrors = Partial<Record<string, string>>;

export function ProjectBriefForm({
  initialService = "",
  initialPackage = "",
  initialAddons = [],
  storageConfiguredOnServer,
}: BriefFormProps) {
  const validInitialService = SERVICE_TYPE_OPTIONS.some((o) => o.value === initialService)
    ? (initialService as (typeof SERVICE_TYPE_OPTIONS)[number]["value"])
    : "";

  const validInitialPackage = PACKAGE_DIRECTIONS.some((p) => p.id === initialPackage)
    ? initialPackage
    : "";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [serviceType, setServiceType] = useState<string>(validInitialService);
  const [selectedPackage, setSelectedPackage] = useState<string>(validInitialPackage);
  const [selectedAddons, setSelectedAddons] = useState<string[]>(
    initialAddons.filter((id) => CONFIGURABLE_ADDONS.some((a) => a.id === id))
  );
  const [budgetRange, setBudgetRange] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [referenceUrl, setReferenceUrl] = useState("");
  const [brief, setBrief] = useState("");
  const [additionalContext, setAdditionalContext] = useState("");
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [companyWebsiteTrap, setCompanyWebsiteTrap] = useState("");

  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [resultState, setResultState] = useState<
    | { status: "idle" }
    | { status: "persisted"; referenceCode: string }
    | { status: "unconfigured"; message: string; formattedBrief: string }
    | { status: "error"; message: string; formattedBrief: string }
  >({ status: "idle" });
  const [copied, setCopied] = useState(false);

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const buildReadableBrief = () => {
    const pkgLabel =
      PACKAGE_DIRECTIONS.find((p) => p.id === selectedPackage)?.name ||
      "Belum dipilih / diskusikan";
    const serviceLabel =
      SERVICE_TYPE_OPTIONS.find((s) => s.value === serviceType)?.label || serviceType;
    const addonLabels = selectedAddons
      .map((id) => CONFIGURABLE_ADDONS.find((a) => a.id === id)?.label || id)
      .join(", ");

    return [
      "=== PROJECT BRIEF — VELORA STUDIO ===",
      `Nama: ${name.trim()}`,
      `Email: ${email.trim()}`,
      businessName.trim() ? `Bisnis/Organisasi: ${businessName.trim()}` : null,
      whatsapp.trim() ? `WhatsApp: ${whatsapp.trim()}` : null,
      `Kebutuhan Utama: ${serviceLabel}`,
      `Arah Paket: ${pkgLabel}`,
      addonLabels ? `Modul Tambahan: ${addonLabels}` : null,
      budgetRange ? `Kisaran Budget: ${budgetRange}` : null,
      targetDate.trim() ? `Target Waktu: ${targetDate.trim()}` : null,
      referenceUrl.trim() ? `URL Referensi: ${referenceUrl.trim()}` : null,
      "",
      "Ringkasan Kebutuhan / Masalah:",
      brief.trim(),
      additionalContext.trim() ? `\nKonteks Tambahan:\n${additionalContext.trim()}` : null,
    ]
      .filter(Boolean)
      .join("\n");
  };

  const handleCopyBrief = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Ignore clipboard failures in restricted environments
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;

    const payload = {
      name,
      email,
      businessName,
      whatsapp,
      serviceType,
      selectedPackage,
      selectedAddons,
      budgetRange,
      targetDate,
      referenceUrl,
      brief,
      additionalContext,
      privacyConsent,
      companyWebsiteTrap,
    };

    const parsed = ProjectBriefSchema.safeParse(payload);
    if (!parsed.success) {
      const nextErrors: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0] || "form");
        if (!nextErrors[key]) {
          nextErrors[key] = issue.message;
        }
      }
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    setSubmitting(true);
    setResultState({ status: "idle" });

    const formatted = buildReadableBrief();

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && data?.persisted && data?.referenceCode) {
        setResultState({
          status: "persisted",
          referenceCode: String(data.referenceCode),
        });
      } else if (response.status === 503 || data?.code === "STORAGE_NOT_CONFIGURED") {
        setResultState({
          status: "unconfigured",
          message:
            data?.message ||
            "Penyimpanan database server belum dihubungkan pada deployment ini, sehingga brief belum tercatat ke sistem.",
          formattedBrief: formatted,
        });
      } else {
        setResultState({
          status: "error",
          message:
            data?.message ||
            "Terjadi kendala saat menyimpan brief ke server. Input Anda tetap aman di halaman ini.",
          formattedBrief: formatted,
        });
      }
    } catch {
      setResultState({
        status: "error",
        message:
          "Tidak dapat terhubung ke endpoint server saat ini. Input Anda tidak hilang dan dapat disalin di bawah.",
        formattedBrief: formatted,
      });
    } finally {
      setSubmitting(false);
    }
  };

  const contacts = getOfficialContacts(buildReadableBrief());
  const prefilledPkgObj = PACKAGE_DIRECTIONS.find((p) => p.id === selectedPackage);

  if (resultState.status === "persisted") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="space-y-5 rounded-2xl border border-emerald-600/30 bg-white p-7 shadow-xs sm:p-9"
      >
        <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <div className="space-y-2">
          <p className="font-mono text-xs uppercase tracking-wider text-emerald-700">
            BRIEF TERSIMPAN · KODE REFERENSI {resultState.referenceCode}
          </p>
          <h2 className="font-display text-2xl font-bold text-[#151324] sm:text-3xl">
            Terima kasih, {name}. Brief proyek Anda sudah masuk.
          </h2>
          <p className="text-sm leading-relaxed text-[#433f59] sm:text-base">
            Kami akan mempelajari konteks kebutuhan Anda terlebih dahulu sebelum menghubungi{" "}
            <strong className="font-semibold text-[#151324]">{email}</strong> untuk membahas
            ruang lingkup, arah solusi, dan estimasi yang masuk akal.
          </p>
        </div>

        <div className="rounded-xl border border-[#e2dfec] bg-[#faf9fc] p-4 font-mono text-xs text-[#433f59]">
          Simpan kode referensi Anda: <strong className="text-[#151324]">{resultState.referenceCode}</strong>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-6 rounded-2xl border border-[#dad6e8] bg-white p-6 shadow-xs sm:p-8"
    >
      {/* Storage transparency banner if DB env not configured yet */}
      {!storageConfiguredOnServer && (
        <div className="rounded-xl border border-[#cbc6dc] bg-[#faf9fc] p-4 text-xs leading-relaxed text-[#433f59]">
          <strong className="font-semibold text-[#151324]">Catatan transparansi: </strong>
          Formulir ini memvalidasi seluruh brief Anda secara penuh. Apabila database server
          belum diaktifkan pada environment ini, sistem tidak akan mengklaim pengiriman palsu dan
          akan menyiapkan ringkasan brief rapi yang bisa Anda salin dalam satu klik.
        </div>
      )}

      {/* Visible Prefill Context Note */}
      {prefilledPkgObj && (
        <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-[#4638d2]/30 bg-[#ebe7f8]/60 px-4 py-3 text-xs text-[#312578]">
          <span>
            Arah paket terpilih: <strong>{prefilledPkgObj.name}</strong>
          </span>
          <button
            type="button"
            onClick={() => setSelectedPackage("")}
            className="font-semibold underline hover:text-[#151324]"
          >
            Ubah / kosongkan
          </button>
        </div>
      )}

      {/* Honeypot Trap */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="companyWebsiteTrap">
          Jangan isi kolom ini
          <input
            id="companyWebsiteTrap"
            name="companyWebsiteTrap"
            tabIndex={-1}
            autoComplete="off"
            value={companyWebsiteTrap}
            onChange={(e) => setCompanyWebsiteTrap(e.target.value)}
          />
        </label>
      </div>

      {/* Contact Identity Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label htmlFor="brief-name" className="block text-xs font-semibold text-[#151324]">
            Nama lengkap <span className="text-[#4638d2]">*</span>
          </label>
          <input
            id="brief-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "err-name" : undefined}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Contoh: Hendra Wijaya"
            className={cn(
              "w-full rounded-lg border bg-[#faf9fc] px-3.5 py-2.5 text-sm text-[#151324] placeholder-[#8e8aa8]",
              errors.name ? "border-red-600" : "border-[#cbc6dc]"
            )}
          />
          {errors.name && (
            <p id="err-name" role="alert" className="text-xs font-medium text-red-600">
              {errors.name}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="brief-email" className="block text-xs font-semibold text-[#151324]">
            Alamat email aktif <span className="text-[#4638d2]">*</span>
          </label>
          <input
            id="brief-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "err-email" : undefined}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="nama@perusahaan.com"
            className={cn(
              "w-full rounded-lg border bg-[#faf9fc] px-3.5 py-2.5 text-sm text-[#151324] placeholder-[#8e8aa8]",
              errors.email ? "border-red-600" : "border-[#cbc6dc]"
            )}
          />
          {errors.email && (
            <p id="err-email" role="alert" className="text-xs font-medium text-red-600">
              {errors.email}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="brief-business"
            className="block text-xs font-semibold text-[#151324]"
          >
            Nama usaha / organisasi (opsional)
          </label>
          <input
            id="brief-business"
            name="businessName"
            type="text"
            autoComplete="organization"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            placeholder="Contoh: Kopi Lembah / Studio Kreatif"
            className="w-full rounded-lg border border-[#cbc6dc] bg-[#faf9fc] px-3.5 py-2.5 text-sm text-[#151324] placeholder-[#8e8aa8]"
          />
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="brief-whatsapp"
            className="block text-xs font-semibold text-[#151324]"
          >
            Nomor WhatsApp (opsional)
          </label>
          <input
            id="brief-whatsapp"
            name="whatsapp"
            type="tel"
            autoComplete="tel"
            aria-invalid={Boolean(errors.whatsapp)}
            aria-describedby={errors.whatsapp ? "err-whatsapp" : undefined}
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            placeholder="0812xxxxxxxx"
            className={cn(
              "w-full rounded-lg border bg-[#faf9fc] px-3.5 py-2.5 text-sm text-[#151324] placeholder-[#8e8aa8]",
              errors.whatsapp ? "border-red-600" : "border-[#cbc6dc]"
            )}
          />
          {errors.whatsapp && (
            <p id="err-whatsapp" role="alert" className="text-xs font-medium text-red-600">
              {errors.whatsapp}
            </p>
          )}
        </div>
      </div>

      {/* Scope Selection Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label
            htmlFor="brief-service"
            className="block text-xs font-semibold text-[#151324]"
          >
            Kebutuhan utama <span className="text-[#4638d2]">*</span>
          </label>
          <select
            id="brief-service"
            name="serviceType"
            required
            aria-invalid={Boolean(errors.serviceType)}
            aria-describedby={errors.serviceType ? "err-service" : undefined}
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
            className={cn(
              "w-full rounded-lg border bg-[#faf9fc] px-3.5 py-2.5 text-sm text-[#151324]",
              errors.serviceType ? "border-red-600" : "border-[#cbc6dc]"
            )}
          >
            <option value="">Pilih kategori kebutuhan</option>
            {SERVICE_TYPE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {errors.serviceType && (
            <p id="err-service" role="alert" className="text-xs font-medium text-red-600">
              {errors.serviceType}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="brief-package"
            className="block text-xs font-semibold text-[#151324]"
          >
            Arah paket yang dipertimbangkan
          </label>
          <select
            id="brief-package"
            name="selectedPackage"
            value={selectedPackage}
            onChange={(e) => setSelectedPackage(e.target.value)}
            className="w-full rounded-lg border border-[#cbc6dc] bg-[#faf9fc] px-3.5 py-2.5 text-sm text-[#151324]"
          >
            <option value="">Belum yakin — mari diskusikan</option>
            {PACKAGE_DIRECTIONS.map((pkg) => (
              <option key={pkg.id} value={pkg.id}>
                {pkg.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="brief-budget"
            className="block text-xs font-semibold text-[#151324]"
          >
            Gambaran rentang investasi (opsional)
          </label>
          <select
            id="brief-budget"
            name="budgetRange"
            value={budgetRange}
            onChange={(e) => setBudgetRange(e.target.value)}
            className="w-full rounded-lg border border-[#cbc6dc] bg-[#faf9fc] px-3.5 py-2.5 text-sm text-[#151324]"
          >
            <option value="">Pilih bila sudah ada bayangan</option>
            {BUDGET_OPTIONS.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="brief-target-date"
            className="block text-xs font-semibold text-[#151324]"
          >
            Target waktu rilis (opsional)
          </label>
          <input
            id="brief-target-date"
            name="targetDate"
            type="text"
            value={targetDate}
            onChange={(e) => setTargetDate(e.target.value)}
            placeholder="Contoh: Bulan depan / Kuartal ini"
            className="w-full rounded-lg border border-[#cbc6dc] bg-[#faf9fc] px-3.5 py-2.5 text-sm text-[#151324] placeholder-[#8e8aa8]"
          />
        </div>
      </div>

      {/* Optional Addon Pills */}
      <fieldset className="space-y-2">
        <legend className="text-xs font-semibold text-[#151324]">
          Modul fungsional yang menarik untuk dibahas (opsional)
        </legend>
        <div className="flex flex-wrap gap-2">
          {CONFIGURABLE_ADDONS.map((addon) => {
            const active = selectedAddons.includes(addon.id);
            return (
              <button
                key={addon.id}
                type="button"
                aria-pressed={active}
                onClick={() => toggleAddon(addon.id)}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors",
                  active
                    ? "border-[#4638d2] bg-[#ebe7f8] text-[#312578]"
                    : "border-[#dad6e8] bg-[#faf9fc] text-[#433f59] hover:border-[#151324]"
                )}
              >
                {active && <Check className="h-3 w-3" />}
                <span>{addon.label}</span>
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* Reference URL */}
      <div className="space-y-1.5">
        <label htmlFor="brief-ref-url" className="block text-xs font-semibold text-[#151324]">
          Tautan website lama atau referensi yang disukai (opsional)
        </label>
        <input
          id="brief-ref-url"
          name="referenceUrl"
          type="url"
          inputMode="url"
          aria-invalid={Boolean(errors.referenceUrl)}
          aria-describedby={errors.referenceUrl ? "err-ref-url" : undefined}
          value={referenceUrl}
          onChange={(e) => setReferenceUrl(e.target.value)}
          placeholder="https://contoh-referensi.com"
          className={cn(
            "w-full rounded-lg border bg-[#faf9fc] px-3.5 py-2.5 text-sm text-[#151324] placeholder-[#8e8aa8]",
            errors.referenceUrl ? "border-red-600" : "border-[#cbc6dc]"
          )}
        />
        {errors.referenceUrl && (
          <p id="err-ref-url" role="alert" className="text-xs font-medium text-red-600">
            {errors.referenceUrl}
          </p>
        )}
      </div>

      {/* Main Brief */}
      <div className="space-y-1.5">
        <label htmlFor="brief-body" className="block text-xs font-semibold text-[#151324]">
          Ceritakan masalah atau kebutuhan yang ingin diselesaikan{" "}
          <span className="text-[#4638d2]">*</span>
        </label>
        <textarea
          id="brief-body"
          name="brief"
          rows={5}
          required
          aria-invalid={Boolean(errors.brief)}
          aria-describedby={errors.brief ? "err-brief" : undefined}
          value={brief}
          onChange={(e) => setBrief(e.target.value)}
          placeholder="Apa aktivitas utama bisnis Anda? Bagian mana yang ingin diperjelas atau dirapikan lewat website/sistem ini?"
          className={cn(
            "w-full rounded-lg border bg-[#faf9fc] px-3.5 py-2.5 text-sm leading-relaxed text-[#151324] placeholder-[#8e8aa8]",
            errors.brief ? "border-red-600" : "border-[#cbc6dc]"
          )}
        />
        {errors.brief && (
          <p id="err-brief" role="alert" className="text-xs font-medium text-red-600">
            {errors.brief}
          </p>
        )}
      </div>

      {/* Additional Context */}
      <div className="space-y-1.5">
        <label htmlFor="brief-context" className="block text-xs font-semibold text-[#151324]">
          Catatan atau batasan tambahan (opsional)
        </label>
        <textarea
          id="brief-context"
          name="additionalContext"
          rows={3}
          value={additionalContext}
          onChange={(e) => setAdditionalContext(e.target.value)}
          placeholder="Contoh: sudah punya domain sendiri, butuh halaman bisa diedit staf admin, dsb."
          className="w-full rounded-lg border border-[#cbc6dc] bg-[#faf9fc] px-3.5 py-2.5 text-sm leading-relaxed text-[#151324] placeholder-[#8e8aa8]"
        />
      </div>

      {/* Privacy Acknowledgement */}
      <div className="space-y-1.5 rounded-xl border border-[#e2dfec] bg-[#faf9fc] p-4">
        <label className="flex cursor-pointer items-start gap-3 text-xs leading-relaxed text-[#433f59]">
          <input
            type="checkbox"
            checked={privacyConsent}
            onChange={(e) => setPrivacyConsent(e.target.checked)}
            aria-invalid={Boolean(errors.privacyConsent)}
            className="mt-0.5 h-4 w-4 rounded border-[#cbc6dc] accent-[#4638d2]"
          />
          <span>
            Saya menyetujui bahwa informasi di atas digunakan oleh Velora Studio semata-mata
            untuk meninjau kebutuhan proyek dan menghubungi saya kembali sesuai{" "}
            <Link href="/privasi" className="font-semibold text-[#4638d2] underline">
              Kebijakan Privasi
            </Link>
            . <span className="text-[#4638d2]">*</span>
          </span>
        </label>
        {errors.privacyConsent && (
          <p role="alert" className="pl-7 text-xs font-medium text-red-600">
            {errors.privacyConsent}
          </p>
        )}
      </div>

      {/* Honest Fallback / Error Status Panel */}
      {(resultState.status === "unconfigured" || resultState.status === "error") && (
        <div
          role="alert"
          aria-live="assertive"
          className="space-y-3 rounded-xl border border-amber-500/45 bg-amber-50/80 p-4 text-xs text-[#151324]"
        >
          <div className="flex items-start gap-2.5">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" />
            <div className="space-y-1">
              <p className="font-semibold text-amber-950">
                Brief belum tersimpan ke database server
              </p>
              <p className="leading-relaxed text-amber-900">{resultState.message}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 pt-1">
            <button
              type="button"
              onClick={() => handleCopyBrief(resultState.formattedBrief)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#151324] px-3.5 py-2 text-xs font-semibold text-white hover:bg-[#4638d2]"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  <span>Ringkasan Brief Disalin</span>
                </>
              ) : (
                <>
                  <ClipboardCopy className="h-3.5 w-3.5" />
                  <span>Salin Ringkasan Brief Terformat</span>
                </>
              )}
            </button>

            {contacts.email && (
              <a
                href={`mailto:${contacts.email}?subject=${encodeURIComponent(
                  `Project Brief — ${name}`
                )}&body=${encodeURIComponent(resultState.formattedBrief)}`}
                className="inline-flex items-center gap-1.5 rounded-lg border border-[#151324]/25 bg-white px-3.5 py-2 text-xs font-semibold text-[#151324]"
              >
                <span>Kirim via Email Resmi</span>
              </a>
            )}

            {contacts.whatsappHref && (
              <a
                href={contacts.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-[#151324]/25 bg-white px-3.5 py-2 text-xs font-semibold text-[#151324]"
              >
                <span>Teruskan ke WhatsApp Resmi</span>
              </a>
            )}
          </div>
        </div>
      )}

      {/* Submit Button */}
      <div className="flex flex-col justify-between gap-3 border-t border-[#e2dfec] pt-5 sm:flex-row sm:items-center">
        <p className="text-xs text-[#686380]">
          Hindari menyertakan kata sandi atau informasi rahasia finansial di dalam form awal.
        </p>
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex min-h-[48px] shrink-0 items-center justify-center gap-2 rounded-lg bg-[#4638d2] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#3a2db8] disabled:opacity-60"
        >
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Memproses Brief...</span>
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              <span>Kirim Brief Proyek</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
