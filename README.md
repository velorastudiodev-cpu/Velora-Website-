# Velora Studio

Static public website foundation built from the supplied revised PRD, mindmap, and logo references. The revised package is preserved in `VELORA_STUDIO_PRD_REVISI.md` and `assets/revised/`; the supplied ZIP was used as input and is not recreated as an output artifact.

## Local preview

```bash
node build.mjs
python3 -m http.server 4173 --directory dist
```

Open `http://localhost:4173/`.

## Public routes

`/`, `/layanan/`, `/layanan/website-bisnis/`, `/layanan/aplikasi-web/`, `/layanan/sistem-bisnis/`, `/karya/`, `/karya/ritme-operasi/`, `/karya/katalog-bumi-rasa/`, `/karya/arus-kas/`, `/proses/`, `/tentang/`, `/paket/`, `/mulai-proyek/`, `/faq/`, and `/privasi/`.

The package page uses consultation/estimate CTAs because approved public prices were not supplied. Package CTAs prefill the inquiry form using `?paket=website-bisnis`, `?paket=aplikasi-web`, or `?paket=sistem-bisnis`. FAQ is public and uses native accessible `details` disclosures; there is no fake chat history.

## Lead backend blocker

The public form posts to `/api/leads`. This build intentionally does not fake persistence because no database, email provider, or auth credentials were supplied. Configure a server endpoint using `.env.example` and `schema.sql`; keep secrets server-side and add protected admin access before enabling it in production. The schema includes leads plus the Phase 4 projects, packages, and FAQs tables for a future authenticated console.

## Design and QA artifacts

- `DESIGN-DECISIONS.md` records the editorial direction and revised feature decisions.
- `IMPLEMENTATION-REPORT.md` records implementation and limitations.
- `QA-REPORT.md` records browser checks and screenshots under `qa/`.
- `README-ASSETS.md` and `README-ASSETS-REVISI.md` document source assets.

## Install on Android

The published site is a Progressive Web App. Open the production URL in Chrome on Android, wait for the page to load, then choose **Install app** or **Add to Home screen** from the browser menu. The app opens in standalone mode with the Velora icon; its “Mulai proyek” shortcut opens the inquiry form. A basic service worker caches the shell and visited pages for repeat visits. A signed APK is not generated because Android signing credentials and a native wrapper were not part of the supplied project.
