# Velora Studio

Static public website foundation built from the supplied PRD and logo references.

## Local preview

```bash
node build.mjs
python3 -m http.server 4173 --directory dist
```

Open `http://localhost:4173/`.

## Routes

`/`, `/layanan/`, `/layanan/website-bisnis/`, `/layanan/aplikasi-web/`, `/layanan/sistem-bisnis/`, `/karya/`, `/karya/ritme-operasi/`, `/karya/katalog-bumi-rasa/`, `/karya/arus-kas/`, `/proses/`, `/tentang/`, `/mulai-proyek/`, and `/privasi/`.

## Lead backend blocker

The public form posts to `/api/leads`. This build intentionally does not fake persistence because no database, email provider, or auth credentials were supplied. Configure a server endpoint using `.env.example` and `schema.sql`; keep secrets server-side and add protected admin access before enabling it in production.
