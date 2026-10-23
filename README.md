# Velora Studio v2.0 — Digital Solutions & Software Development

Platform editorial dan konsultasi proyek Velora Studio berbasis **Next.js 15 App Router, React 19, TypeScript, Tailwind CSS v4, Framer Motion, Zod, dan Supabase PostgreSQL**.

## Fitur Utama

- **Ritme Desain Editorial Anti-AI-Slop**: Komposisi arsitektural Dark/Light menggunakan identitas faset resmi Velora (`velora-symbol-isolated.png`), tipografi `Space Grotesk` + `Plus Jakarta Sans` + `JetBrains Mono`, dan koreografi Framer Motion yang menghormati `prefers-reduced-motion`.
- **Pemisahan Jujur Portofolio (`/karya` & `/karya/[slug]`)**:
  - **Proyek Klien Terverifikasi**: *Ikbar Barbershop*, *Ikbar CMS Dashboard*, dan *Dzikri Mount Guide* lengkap dengan jendela inspeksi perangkat Desktop/Mobile serta tautan live.
  - **Eksplorasi & Prototipe Internal**: *Ritme Operasi*, *Katalog Bumi Rasa*, dan *Arus Kas* berlabel transparan tanpa klaim metrik fiktif.
- **Interactive Live CMS & Workflow Sandbox (`/#simulasi`)**: Simulasi interaktif bagi pengunjung untuk merasakan langsung kemudahan Custom CMS mandiri dan pelacakan status operasional.
- **Paket & Konfigurator Scope (`/paket` → `/mulai-proyek`)**: Eksplorasi arah paket dan modul fungsional yang otomatis melakukan *prefill* pada form brief.
- **Backend Brief Tervalidasi (`POST /api/leads`) & Protected Admin (`/admin`)**: Validasi Zod di browser & server, honeypot anti-spam, pembatas laju IP, penyimpanan ke Supabase PostgreSQL (`schema.sql`), serta status jujur bila variabel database belum diatur.

## Menjalankan Secara Lokal

```bash
npm install
npm run dev
```

Pemeriksaan tipe dan build produksi:

```bash
npm run typecheck
npm run build
npm run start
```

## Konfigurasi Environment Produksi (`.env`)

Salin `.env.example` dan isi variabel berikut pada environment Vercel / server:

- `SUPABASE_URL` & `SUPABASE_SERVICE_ROLE_KEY`: Mengaktifkan penyimpanan brief ke tabel `public.leads` (jalankan `schema.sql` terlebih dahulu di Supabase SQL Editor).
- `ADMIN_PASSCODE` (min. 8 karakter) & `ADMIN_SESSION_SECRET` (min. 16 karakter): Membuka konsol pengelola terproteksi di `/admin`.
- `NEXT_PUBLIC_VELORA_EMAIL` & `NEXT_PUBLIC_VELORA_WHATSAPP` *(opsional)*: Menampilkan kanal kontak langsung resmi (sistem secara otomatis menolak nomor placeholder/dummy).
