import { z } from "zod";

export const SERVICE_TYPE_OPTIONS = [
  { value: "website", label: "Website Bisnis / Landing Page" },
  { value: "cms", label: "Website + Self-Service CMS Mandiri" },
  { value: "aplikasi", label: "Aplikasi Web / Dashboard Internal" },
  { value: "sistem", label: "Sistem Bisnis / Booking & Operasional" },
  { value: "maintenance", label: "Pengembangan Lanjutan / Audit Sistem" },
  { value: "lainnya", label: "Belum Yakin — Mari Petakan Bersama" },
] as const;

export const BUDGET_OPTIONS = [
  "Belum ditentukan (diskusikan scope dahulu)",
  "Di bawah Rp 5 juta (Landing page / kebutuhan fokus)",
  "Rp 5 juta – Rp 15 juta (Website bisnis + CMS / alur booking)",
  "Rp 15 juta – Rp 35 juta (Aplikasi web / dashboard operasional)",
  "Di atas Rp 35 juta (Sistem bisnis multi-peran / kustom penuh)",
] as const;

export const LEAD_STATUS_OPTIONS = [
  "new",
  "reviewed",
  "contacted",
  "proposal_sent",
  "won",
  "lost",
  "archived",
] as const;

export type LeadStatus = (typeof LEAD_STATUS_OPTIONS)[number];

export const ProjectBriefSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Mohon isi nama lengkap Anda (minimal 2 karakter).")
    .max(120, "Nama terlalu panjang."),
  email: z
    .string()
    .trim()
    .email("Mohon masukkan alamat email yang valid agar kami dapat membalas brief Anda.")
    .max(180),
  businessName: z
    .string()
    .trim()
    .max(140, "Nama bisnis maksimal 140 karakter.")
    .optional()
    .or(z.literal("")),
  whatsapp: z
    .string()
    .trim()
    .max(32, "Nomor WhatsApp terlalu panjang.")
    .refine(
      (val) => !val || /^[+\d\s()-]{8,28}$/.test(val),
      "Masukkan nomor WhatsApp yang valid (contoh: 0812xxxx atau +62812xxxx)."
    )
    .optional()
    .or(z.literal("")),
  serviceType: z.enum(["website", "cms", "aplikasi", "sistem", "maintenance", "lainnya"], {
    errorMap: () => ({ message: "Pilih jenis kebutuhan utama terlebih dahulu." }),
  }),
  selectedPackage: z.string().trim().max(80).optional().or(z.literal("")),
  selectedAddons: z.array(z.string().trim().max(80)).max(10).optional().default([]),
  budgetRange: z.string().trim().max(120).optional().or(z.literal("")),
  targetDate: z.string().trim().max(100).optional().or(z.literal("")),
  referenceUrl: z
    .string()
    .trim()
    .max(300)
    .refine(
      (val) => !val || /^https?:\/\/[^\s/$.?#].[^\s]*$/i.test(val),
      "Gunakan format URL lengkap diawali https:// atau http://"
    )
    .optional()
    .or(z.literal("")),
  brief: z
    .string()
    .trim()
    .min(20, "Ceritakan masalah atau tujuan proyek minimal 20 karakter agar konteksnya jelas.")
    .max(4000, "Ringkasan brief maksimal 4000 karakter."),
  additionalContext: z
    .string()
    .trim()
    .max(2000, "Konteks tambahan maksimal 2000 karakter.")
    .optional()
    .or(z.literal("")),
  privacyConsent: z.literal(true, {
    errorMap: () => ({
      message: "Anda perlu menyetujui kebijakan penggunaan data brief sebelum mengirim.",
    }),
  }),
  // Honeypot anti-bot field (must stay empty)
  companyWebsiteTrap: z.string().max(200).optional().or(z.literal("")),
});

export type ProjectBriefInput = z.infer<typeof ProjectBriefSchema>;

export const AdminLeadUpdateSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(LEAD_STATUS_OPTIONS),
  internal_notes: z.string().trim().max(2000).optional().nullable(),
});
