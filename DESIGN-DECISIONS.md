# Velora Studio design decisions

- The supplied dark-background logo is opaque. A copy removes only near-neutral dark pixels; the original remains untouched in `dist/assets/velora-symbol-original.png`.
- The design uses editorial dark/light rhythm, asymmetry, deliberate whitespace, and varied structures. It avoids generic gradient blobs, fake metrics, floating devices, repeated card grids, and unverified trust claims.
- Work items are explicitly `Konsep` or `Demo internal`; no client, testimonial, award, metric, or business outcome is claimed.
- Space Grotesk handles display type and DM Sans handles body/UI with system fallbacks. Violet is controlled as an accent.
- Motion is limited to short reveal transitions and hover feedback, disabled under `prefers-reduced-motion`.
- The inquiry form validates in the browser, includes a honeypot, and refuses to claim success when `/api/leads` is unavailable.

## Deferred by configuration

No database, mail provider, or authentication credentials were supplied. The static site ships the safe public experience, honest form failure state, `.env.example`, and `schema.sql`. A future backend must add server validation, persistence, rate limiting, notification isolation, protected lead access, and retention/deletion procedures.
