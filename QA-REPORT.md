# Velora Studio v2.0 — QA & Responsive Verification Report

Date: 2026-10-23

## Automated Playwright Multi-Viewport & E2E Suite (`qa/verify-responsive.mjs`)

Playwright Chromium was executed against the Next.js 15 production server (`next build` -> `next start`).

- **Routes verified (16)**: `/`, `/karya`, `/karya/ikbar-barbershop`, `/karya/ikbar-cms-dashboard`, `/karya/dzikri-mount-guide`, `/karya/ritme-operasi`, `/layanan`, `/layanan/website-bisnis`, `/paket`, `/proses`, `/tentang`, `/faq`, `/mulai-proyek`, `/privasi`, `/admin/login`, `/admin`.
- **Viewports verified (5)**: `360px`, `390px`, `768px`, `1024px`, `1440px`.
- **Total viewport visits**: **80** (`16 routes × 5 widths`).
- **Horizontal overflow (`scrollWidth > innerWidth`)**: **0 failures**.
- **Browser console errors**: **0**.
- **Uncaught runtime page errors**: **0**.
- **TypeScript (`npm run typecheck`)**: **0 errors**.
- **Production build (`npm run build`)**: **29/29 routes compiled cleanly**.

## End-to-End Interactive Checks Verified

1. **Mobile Navigation Drawer (`390px`)**: Opens with `aria-expanded="true"`, switches accessible label (`Buka` -> `Tutup menu navigasi`), renders high-contrast drawer links without horizontal overflow, and navigates cleanly to `/karya`.
2. **Hero Architectural Workbench (`1440px`)**: Switches smoothly across Website Bisnis, Aplikasi Kerja, and Sistem Kustom tabs with `framer-motion` spring layout indicators (`MotionConfig reducedMotion="user"` enabled).
3. **Client Project Inspector Modal (`1440px`)**: Opens dialog with crisp live production screenshots, toggles between `Desktop` (`16:10`) and `Mobile` (`9:19`) device frames, supports multi-screen pagination, and closes cleanly on `Escape`.
4. **Live CMS & Operational Workflow Sandbox (`1440px`)**: Real-time brand/headline/CTA/accent/stock updates reflect immediately in the preview frame; Operational Workflow tab advances request statuses deterministically with audit history logs.
5. **Portfolio Taxonomy Filter (`/karya`)**: Separates real live client deployments (`Proyek Klien · Production Live`) from internal studio architectural explorations (`Eksplorasi Konsep Internal`) with zero fake client claims.
6. **Package Scope Explorer -> Project Brief Form (`/paket` -> `/mulai-proyek`)**: Carries selected tier query parameters (`?paket=...&layanan=...`) into the brief form, enforces Zod + `aria-invalid` validation on empty submit, and honestly reports database persistence status (offering one-click formatted brief copy when `SUPABASE_SERVICE_ROLE_KEY` is not yet configured, never faking a stored submission).

## PWA & Android Installability

- `/manifest.webmanifest` served via Next.js Metadata API (`src/app/manifest.ts`) with standalone display, `#0d0c18` background/theme color, `192x192` & `512x512` PNG icons, and `/mulai-proyek` shortcut.
- `/sw.js` network-first safe service worker registered cleanly via `PwaInstallBanner.tsx`.
