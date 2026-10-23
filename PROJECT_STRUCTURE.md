# Velora Studio v2.0 — Project Structure

```text
Velora-Website-/
├── public/
│   ├── brand/
│   │   ├── velora-symbol-isolated.png
│   │   └── velora-symbol-original.png
│   ├── projects/               # Crisp local Desktop & Mobile screenshots (Ikbar, Ikbar CMS, Dzikri)
│   ├── pwa/
│   │   ├── icon-192.png
│   │   └── icon-512.png
│   └── sw.js                   # Clean PWA service worker
├── qa/
│   └── verify-responsive.mjs   # Multi-viewport Playwright verification & screenshot suite
├── src/
│   ├── app/
│   │   ├── globals.css         # Architectural Editorial tokens & Tailwind v4 setup
│   │   ├── layout.tsx          # Fonts, SEO metadata, MotionProvider, Header, Footer, PWA banner
│   │   ├── manifest.ts         # Installable Web App Manifest
│   │   ├── robots.ts           # Search engine crawl directives
│   │   ├── sitemap.ts          # Dynamic XML sitemap across all routes & slugs
│   │   ├── not-found.tsx       # Editorial 404 screen
│   │   ├── page.tsx            # Homepage (Hero Workbench, Principles, Client Showcases, Sandbox, Concepts, Services, Process, CTA)
│   │   ├── karya/
│   │   │   ├── page.tsx        # Filterable Portfolio Gallery (Client Work + Studio Explorations)
│   │   │   └── [slug]/page.tsx # Deep Case Study & Concept Architecture Breakdown
│   │   ├── layanan/
│   │   │   ├── page.tsx        # 3-Pillar Engineering Services Overview
│   │   │   └── [slug]/page.tsx # Service Detail (Website Bisnis, Aplikasi Web, Sistem Bisnis)
│   │   ├── paket/page.tsx      # Configurable Packages + Interactive Scope Explorer
│   │   ├── proses/page.tsx     # Scroll-Linked 4-Stage Engineering Process
│   │   ├── tentang/page.tsx    # Founder-Led Studio Philosophy & Standards
│   │   ├── faq/page.tsx        # Searchable/Filterable Accessible Accordion FAQ
│   │   ├── mulai-proyek/page.tsx # Validated Project Brief Flow + Prefill + Honest Persistence
│   │   ├── privasi/page.tsx    # Transparent Inquiry Data & Privacy Policy
│   │   ├── admin/
│   │   │   ├── login/page.tsx  # Server-Protected Admin Authentication
│   │   │   └── page.tsx        # Protected Lead Inbox & Status Console
│   │   └── api/
│   │       ├── leads/route.ts  # Zod Validation + Honeypot + Rate Limit + Supabase Persistence
│   │       └── admin/
│   │           ├── login/route.ts
│   │           ├── logout/route.ts
│   │           └── leads/route.ts
│   ├── components/
│   │   ├── motion/
│   │   │   ├── MotionProvider.tsx
│   │   │   └── EditorialReveal.tsx
│   │   ├── layout/
│   │   │   ├── SiteHeader.tsx
│   │   │   ├── SiteFooter.tsx
│   │   │   └── PwaInstallBanner.tsx
│   │   ├── home/
│   │   │   ├── HeroArchitectural.tsx
│   │   │   └── ProcessScrollSection.tsx
│   │   ├── showcase/
│   │   │   ├── ClientShowcaseSection.tsx
│   │   │   ├── KaryaFilterGallery.tsx
│   │   │   └── ProjectInspectorModal.tsx
│   │   ├── sandbox/
│   │   │   └── LiveSystemSandbox.tsx
│   │   ├── packages/
│   │   │   └── ScopeMatrixExplorer.tsx
│   │   ├── faq/
│   │   │   └── FaqInteractiveList.tsx
│   │   ├── inquiry/
│   │   │   └── ProjectBriefForm.tsx
│   │   └── admin/
│   │       └── AdminLeadConsole.tsx
│   ├── data/
│   │   ├── projects.ts
│   │   ├── services.ts
│   │   ├── packages.ts
│   │   └── faqs.ts
│   └── lib/
│       ├── cn.ts
│       ├── contact.ts
│       ├── validations.ts
│       ├── supabase-server.ts
│       └── admin-auth.ts
└── schema.sql
```
