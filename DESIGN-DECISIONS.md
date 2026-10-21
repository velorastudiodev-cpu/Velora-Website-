# Velora Studio design decisions

- The supplied dark-background logo is opaque. A working copy removes only near-neutral dark pixels; the original remains untouched in `src/assets/velora-symbol-original.png`. The revised checkerboard and wordmark references are preserved under `assets/revised/` and are not rendered as production backgrounds.
- The design uses editorial dark/light rhythm, asymmetry, deliberate whitespace, and varied structures. It avoids generic gradient blobs, fake metrics, floating devices, repeated card grids, and unverified trust claims.
- Work items are explicitly `Konsep` or `Demo internal`; no client, testimonial, award, metric, or business outcome is claimed.
- The revised feature map adds a public Paket page with consultation-only CTAs, a public FAQ page, optional package prefill on the inquiry form, and expanded optional context fields. No private admin route is shipped without secure credentials.
- Space Grotesk handles display type and DM Sans handles body/UI with system fallbacks. Violet is controlled as an accent.
- Motion is limited to short reveal transitions and purposeful interaction feedback, disabled under `prefers-reduced-motion`.
- The inquiry form validates in the browser, includes a honeypot, preserves optional reference/context fields, and refuses to claim success when `/api/leads` is unavailable. A `window.veloraTrack` integration point accepts non-sensitive event names without adding a tracker.

## Deferred by configuration

No database, mail provider, or authentication credentials were supplied. The static site ships the safe public experience, honest form failure state, `.env.example`, revised source documents/assets, and `schema.sql`. A future backend must add server validation, persistence, rate limiting, notification isolation, protected lead/content access, and retention/deletion procedures.
