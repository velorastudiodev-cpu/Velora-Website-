import { redirect } from "next/navigation";
import { AdminLeadConsole, type LeadRecord } from "@/components/admin/AdminLeadConsole";
import { isAdminAuthConfigured, isServerAdminAuthenticated } from "@/lib/admin-auth";
import { getServerSupabaseClient } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";

export default async function AdminInboxPage() {
  if (!isAdminAuthConfigured()) {
    return (
      <section className="bg-[#faf9fc] py-20">
        <div className="editorial-container max-w-2xl">
          <div className="space-y-3 rounded-2xl border border-[#dad6e8] bg-white p-8">
            <p className="font-mono text-xs uppercase tracking-wider text-[#4638d2]">
              RUTE DIKUNCI SECARA AMAN
            </p>
            <h1 className="font-display text-2xl font-bold text-[#151324]">
              Konsol Pengelola Belum Diaktifkan di Server
            </h1>
            <p className="text-sm leading-relaxed text-[#433f59]">
              Sesuai standar keamanan Velora Studio, halaman ini tidak dapat diakses sebelum
              variabel server <code>ADMIN_PASSCODE</code> (min. 8 karakter) dan{" "}
              <code>ADMIN_SESSION_SECRET</code> (min. 16 karakter) ditetapkan pada environment
              produksi.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const authenticated = await isServerAdminAuthenticated();
  if (!authenticated) {
    redirect("/admin/login");
  }

  const supabase = getServerSupabaseClient();
  let leads: LeadRecord[] = [];
  let dbMissing = false;

  if (!supabase) {
    dbMissing = true;
  } else {
    const { data } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(100);
    leads = (data as LeadRecord[] | null) ?? [];
  }

  return (
    <section className="bg-[#faf9fc] py-14 md:py-20">
      <div className="editorial-container space-y-8">
        <div>
          <p className="font-mono text-xs uppercase tracking-wider text-[#4638d2]">
            VELORA INTERNAL CONSOLE
          </p>
          <h1 className="mt-1 font-display text-3xl font-bold text-[#151324]">
            Kotak Masuk Brief Proyek
          </h1>
        </div>

        {dbMissing ? (
          <div className="rounded-2xl border border-amber-500/40 bg-amber-50 p-6 text-sm text-amber-950">
            Variabel <code>SUPABASE_URL</code> dan <code>SUPABASE_SERVICE_ROLE_KEY</code> belum
            dikonfigurasi. Jalankan <code>schema.sql</code> di Supabase dan tambahkan kredensial
            server untuk mulai membaca daftar brief masuk.
          </div>
        ) : (
          <AdminLeadConsole initialLeads={leads} />
        )}
      </div>
    </section>
  );
}
