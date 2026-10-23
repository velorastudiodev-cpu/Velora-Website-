"use client";

import { Lock, ShieldAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode }),
      });

      const data = await res.json().catch(() => ({}));
      if (res.ok && data?.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        setError(
          data?.message || "Akses ditolak. Periksa kredensial atau konfigurasi environment."
        );
      }
    } catch {
      setError("Gagal menghubungi server otentikasi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-[#faf9fc] py-20 md:py-28">
      <div className="editorial-container max-w-md">
        <div className="space-y-6 rounded-2xl border border-[#dad6e8] bg-white p-7 shadow-xs sm:p-8">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#151324] text-white">
            <Lock className="h-5 w-5" />
          </div>

          <div className="space-y-1.5">
            <p className="font-mono text-xs uppercase tracking-wider text-[#4638d2]">
              AREA INTERNAL TERPROTEKSI
            </p>
            <h1 className="font-display text-2xl font-bold text-[#151324]">
              Masuk Pengelola Velora
            </h1>
            <p className="text-xs leading-relaxed text-[#433f59]">
              Hanya untuk operator resmi Velora Studio. Tidak tersedia pendaftaran akun publik.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label
                htmlFor="admin-passcode"
                className="block text-xs font-semibold text-[#151324]"
              >
                Kunci Akses Pengelola
              </label>
              <input
                id="admin-passcode"
                type="password"
                required
                autoComplete="current-password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full rounded-lg border border-[#cbc6dc] bg-[#faf9fc] px-3.5 py-2.5 text-sm text-[#151324]"
              />
            </div>

            {error && (
              <div
                role="alert"
                className="flex items-start gap-2 rounded-lg border border-amber-500/40 bg-amber-50 p-3 text-xs text-amber-950"
              >
                <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-[#151324] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#4638d2] disabled:opacity-60"
            >
              {loading ? "Memverifikasi..." : "Masuk ke Konsol Brief"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
