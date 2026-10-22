# Velora Studio QA report

Date: 2026-10-22 UTC

## Browser verification

Playwright Chromium was run against the local static preview at `http://127.0.0.1:4173` after the revised PRD implementation.

- Routes checked: 15 public routes, including `/paket/` and `/faq/`, plus the Mahakarya client work section and detail modal.
- Viewports checked: 360, 390, 768, 1024, and 1440 px.
- Page visits checked: 75 (15 routes × 5 widths).
- Horizontal overflow: none at all checked widths.
- Browser console/page errors: none during route checks.
- Mobile menu: opens with `aria-expanded="true"`, closes on navigation, and preserves the CTA route.
- Portfolio filter: category filter hides unrelated work and keeps matching work visible.
- Package prefill: `/mulai-proyek/?paket=aplikasi-web` selects the package and shows a visible context note.
- FAQ: native disclosure opens and exposes the answer content.
- Inquiry form: required fields and `aria-invalid` errors appear; incomplete submissions are blocked.
- Inquiry fallback: when `/api/leads` is unavailable, the UI states that nothing is considered sent and does not claim persistence.
- Screenshots reviewed: `qa/revised-form-390.png` and `qa/revised-paket-1440.png` (captured from the local preview; below-fold reveal sections were also checked after scrolling).

The local preview used the browser binary downloaded for this QA run. The published Site is static and does not yet include a lead API, database, email provider, or protected admin console because no credentials were configured.

## Android installability

- Manifest: `/manifest.webmanifest` returns 200 and declares standalone display, theme/background colors, 192 px and 512 px icons, and a `Mulai proyek` shortcut.
- Icons: `/assets/pwa/icon-192.png` and `/assets/pwa/icon-512.png` return 200 as PNG files.
- Service worker: `/sw.js` returns 200 and registers successfully in Chromium on the local preview.
- No browser page errors occurred during the PWA check.

## Android installability

- Manifest: `/manifest.webmanifest` returns 200 and declares standalone display, theme/background colors, 192 px and 512 px icons, and a `Mulai proyek` shortcut.
- Icons: `/assets/pwa/icon-192.png` and `/assets/pwa/icon-512.png` return 200 as PNG files.
- Service worker: `/sw.js` returns 200 and registers successfully in Chromium on the local preview.
- The optional `Pasang aplikasi` action uses the browser install prompt when Android Chrome exposes it; the browser menu remains available as a fallback.
- No browser page errors occurred during the PWA check.
