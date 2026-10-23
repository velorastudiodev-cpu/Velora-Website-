import { NextResponse } from "next/server";
import { isServerAdminAuthenticated } from "@/lib/admin-auth";
import { getServerSupabaseClient } from "@/lib/supabase-server";
import { AdminLeadUpdateSchema } from "@/lib/validations";

export async function PATCH(request: Request) {
  const authorized = await isServerAdminAuthenticated();
  if (!authorized) {
    return NextResponse.json({ ok: false, message: "Tidak diizinkan." }, { status: 401 });
  }

  const supabase = getServerSupabaseClient();
  if (!supabase) {
    return NextResponse.json(
      { ok: false, message: "Database belum terkonfigurasi." },
      { status: 503 }
    );
  }

  const raw = await request.json().catch(() => null);
  const parsed = AdminLeadUpdateSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, message: "Data pembaruan tidak valid." }, { status: 422 });
  }

  const { error } = await supabase
    .from("leads")
    .update({
      status: parsed.data.status,
      internal_notes: parsed.data.internal_notes ?? null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", parsed.data.id);

  if (error) {
    return NextResponse.json(
      { ok: false, message: "Gagal memperbarui data brief." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
