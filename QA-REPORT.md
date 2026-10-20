# Velora Studio QA report

Date: 2026-10-20 UTC

## Browser verification

Playwright Chromium was run against the local static preview at `http://127.0.0.1:4173`.

- Routes checked: 13 public routes.
- Viewports checked: 360, 390, 768, 1024, and 1440 px.
- Horizontal overflow: none at all checked widths.
- Browser console/page errors: none on the homepage checks.
- Mobile menu: opens with `aria-expanded="true"`, closes on navigation, and preserves a visible CTA route.
- Portfolio filter: category filter hides unrelated work and keeps matching work visible.
- Inquiry form: required fields and `aria-invalid` errors appear; incomplete submissions are blocked.
- Inquiry fallback: when `/api/leads` is unavailable, the UI states that nothing is considered sent and does not claim persistence.
- Screenshots: `qa/home-1440.png`, `qa/form-1440.png`, `qa/mobile-390.png`.

The local preview used the browser binary downloaded for this QA run. The published Site is static and does not yet include a lead API, database, email provider, or protected admin console because no credentials were configured.
