import crypto from "node:crypto";
import { NextResponse } from "next/server";
import { getServerSupabaseClient } from "@/lib/supabase-server";
import { ProjectBriefSchema } from "@/lib/validations";

// Lightweight server-side rate limit map (per runtime instance)
const ipWindowMap = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 6;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = ipWindowMap.get(ip);
  if (!entry || entry.resetAt < now) {
    ipWindowMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_REQUESTS_PER_WINDOW;
}

function generateReferenceCode(): string {
  const year = new Date().getFullYear();
  const token = crypto.randomBytes(3).toString("hex").toUpperCase();
  return `VLR-${year}-${token}`;
}

export async function POST(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for") || "local";
  const clientIp = forwarded.split(",")[0]?.trim() || "local";

  if (isRateLimited(clientIp)) {
    return NextResponse.json(
      {
        ok: false,
        persisted: false,
        code: "RATE_LIMITED",
        message: "Terlalu banyak percobaan pengiriman dalam waktu singkat. Silakan tunggu beberapa menit.",
      },
      { status: 429 }
    );
  }

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json(
      {
        ok: false,
        persisted: false,
        code: "INVALID_JSON",
        message: "Format data permintaan tidak valid.",
      },
      { status: 400 }
    );
  }

  const parsed = ProjectBriefSchema.safeParse(rawBody);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        persisted: false,
        code: "VALIDATION_FAILED",
        message: parsed.error.issues[0]?.message || "Mohon periksa kembali isian formulir Anda.",
      },
      { status: 422 }
    );
  }

  const data = parsed.data;

  // Honeypot check: reject silently without persisting bot spam
  if (data.companyWebsiteTrap && data.companyWebsiteTrap.trim().length > 0) {
    return NextResponse.json(
      {
        ok: false,
        persisted: false,
        code: "SPAM_BLOCKED",
        message: "Permintaan tidak dapat diproses.",
      },
      { status: 400 }
    );
  }

  const supabase = getServerSupabaseClient();
  if (!supabase) {
    // PRD Section 6.4 & 10: Never fake success when database credentials are unavailable.
    return NextResponse.json(
      {
        ok: false,
        persisted: false,
        code: "STORAGE_NOT_CONFIGURED",
        message:
          "Variabel server SUPABASE_URL dan SUPABASE_SERVICE_ROLE_KEY belum dikonfigurasi pada environment ini. Silakan salin ringkasan brief terformat di bawah agar konteks Anda tidak hilang.",
      },
      { status: 503 }
    );
  }

  const referenceCode = generateReferenceCode();

  const { error } = await supabase.from("leads").insert({
    reference_code: referenceCode,
    name: data.name,
    business_name: data.businessName || null,
    email: data.email,
    whatsapp: data.whatsapp || null,
    service_type: data.serviceType,
    selected_package: data.selectedPackage || null,
    selected_addons: data.selectedAddons ?? [],
    budget_range: data.budgetRange || null,
    target_date: data.targetDate || null,
    reference_url: data.referenceUrl || null,
    brief: data.brief,
    additional_context: data.additionalContext || null,
    privacy_consent_at: new Date().toISOString(),
    status: "new",
    source: "web_mulai_proyek",
  });

  if (error) {
    console.error("[velora:leads] Persistence error code:", error.code);
    return NextResponse.json(
      {
        ok: false,
        persisted: false,
        code: "DATABASE_ERROR",
        message:
          "Penyimpanan ke database belum berhasil diselesaikan. Anda dapat mencoba kembali atau menyalin ringkasan brief di bawah.",
      },
      { status: 500 }
    );
  }

  return NextResponse.json(
    {
      ok: true,
      persisted: true,
      referenceCode,
    },
    { status: 201 }
  );
}
