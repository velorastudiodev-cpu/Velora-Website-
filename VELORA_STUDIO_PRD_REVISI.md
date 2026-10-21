# VELORA STUDIO --- REVISED PRODUCT REQUIREMENTS DOCUMENT (PRD)

**Document type:** Product + UX + Engineering specification\
**Status:** Revised implementation brief --- feature map aligned to
founder mindmap\
**Product:** Velora Studio website\
**Primary market:** Indonesian UMKM and businesses\
**Business model:** Development services first; proprietary SaaS
products later\
**Operating model:** Founder-led / solo operator\
**Primary language:** Bahasa Indonesia\
**Design reference inputs:** Pinterest references supplied by the
founder and the official Velora logo assets supplied alongside this
document.

------------------------------------------------------------------------

## 0. EXECUTION DIRECTIVE --- READ FIRST

This PRD defines product requirements, feature behavior, constraints,
acceptance criteria, and business intent. It deliberately does **not**
prescribe every visual layout. **Codex working with GPT-6 Astra owns the
creative and technical responsibility for the final UI/UX.** The
implementors must research, explore, evaluate, build, test, and refine
the design rather than merely following a generic template or
reproducing a mockup.

### Required working behavior

1.  Audit the repository, framework, package manager, dependencies, Git
    status, assets, installed skills, and available tools before
    changing files. Preserve existing work and do not reset Git.
2.  Read and actively apply the installed skills relevant to the task,
    including `frontend-design`, `web-design-guidelines`, and
    `react-best-practices` when present. Do not just list the skills in
    the report.
3.  Use available browser, design, reference, and testing tools when
    they materially improve decisions. Inspect the founder-provided
    Pinterest references and use their principles---not their brand
    assets or exact layouts.
4.  Explore plausible visual directions internally, select the strongest
    one for Velora, and document the key design decisions. Do not ask
    the founder to approve every low-risk choice.
5.  Treat this PRD as a product specification, not a hard-coded visual
    recipe. Improve section order, layout, component choice, typography,
    spacing, and interactions when research or visual testing supports a
    better result.
6.  Implement the actual working website and backend flows within the
    available environment. Do not stop after producing a plan,
    wireframe, mockup, or untested source code.
7.  Run the app, inspect actual browser output, test desktop and mobile
    layouts, exercise the core user journeys, and fix issues found
    before reporting completion.
8.  If an installed skill or tool recommends a materially better
    approach, use it when it preserves the product goals, brand,
    security, and required features. Document meaningful deviations.
9.  Continue autonomously for routine implementation choices. Ask the
    founder only when a genuinely blocking decision is required, such as
    missing credentials, paid-service approval, an irreversible change,
    unverified business claims, or official contact/pricing details.
10. If a tool or external service is unavailable, continue with the best
    safe alternative and state the limitation. Do not fabricate tool
    results or claim that a test was run when it was not.

### Creative accountability

Codex + GPT-6 Astra are accountable for the quality of the delivered
UX/UI---not merely code generation. The result must be distinctive,
useful, accessible, responsive, maintainable, and visually verified.
They should be able to explain design choices in terms of users,
content, brand, usability, and observed browser output.

### Feature-map authority

The revised feature map and phase plan in Sections 6, 9, and 16
supersede any conflicting route, feature, or delivery-plan assumptions
elsewhere in this document. Required feature behavior remains mandatory;
visual composition remains open to expert judgment.

## 1. PRODUCT SUMMARY

Velora Studio is an independent digital solutions and software
development studio. It helps businesses translate operational and
commercial needs into useful digital products: business websites,
landing pages, web applications, CMS-backed websites, dashboards, and
custom business systems.

The website is not merely an online brochure. It must: 1. Explain what
Velora does in terms a business owner understands. 2. Demonstrate craft
and credibility through carefully presented work and prototypes. 3.
Convert relevant visitors into qualified project inquiries. 4. Give the
founder a reliable way to receive, review, and manage those inquiries.
5. Establish a reusable technical and design foundation that can later
support Velora-owned SaaS products without prematurely building a SaaS
platform into the marketing site.

### Product positioning

**Velora Studio --- Digital Solutions & Software Development**

Positioning statement: \> Velora helps businesses build better digital
experiences and practical software systems, from professional websites
to custom applications that improve how their business works.

Primary brand promise: \> We turn business needs into useful digital
solutions.

Suggested brand line: \> Build smarter. Operate better. Grow further.

This line is optional copy, not a mandatory slogan. Choose the clearest
final copy for the actual audience and layout.

### Primary conversion

The principal conversion is a qualified project inquiry through the
**Start a Project / Diskusikan Proyek** flow.

Secondary conversions:

- Explore services.

- Review portfolio and case
studies.

- Contact Velora through configured email or WhatsApp. -
Understand the project process.

### Business strategy

Phase 1: earn trust and project revenue through development services.\
Phase 2: standardize repeated delivery work and add appropriate
support/maintenance offers.\
Phase 3: identify recurring problems across real client work and
validate one proprietary SaaS opportunity.

Do not build a public SaaS marketplace, billing platform, customer
subscription dashboard, or multi-tenant SaaS product as part of this
initial website.

------------------------------------------------------------------------

## 2. GOALS, NON-GOALS, AND SUCCESS SIGNALS

### Goals

-   Communicate Velora's positioning within the first screen.
-   Make the services understandable to non-technical business owners.
-   Present work in a way that distinguishes real client work from
    concept/demo work.
-   Deliver a reliable, accessible, responsive website.
-   Persist project inquiries safely in a backend.
-   Notify the founder when a new inquiry arrives, when notification
    credentials are configured.
-   Provide a small, secure internal workflow for reviewing inquiries if
    the repository and deployment environment support it without
    disproportionate complexity.
-   Make portfolio content manageable without unnecessary source-code
    edits, where practical.
-   Keep the implementation maintainable for a solo operator.
-   Establish SEO, analytics readiness, security, and visual QA from the
    start.

### Non-goals for the first release

-   No customer-facing account system or customer portal.
-   No SaaS subscriptions, recurring billing, or payment checkout.
-   No generic drag-and-drop website builder.
-   No complex CMS framework unless the existing project already has one
    and it is appropriate.
-   No microservices, event bus, or premature multi-tenant architecture.
-   No AI chatbot merely for decoration.
-   No fabricated testimonials, client logos, performance metrics,
    awards, years of experience, or claims of serving a particular
    number of customers.
-   No full bilingual UI or language switcher in the MVP. Keep the
    architecture extensible if localization is later needed.
-   No elaborate 3D animation or large video background that harms
    performance.
-   No automatic installation of every available tool or dependency.

### Success signals to instrument

Track, where analytics is configured:

- Project inquiry submissions. -
Primary CTA clicks.

- Contact link clicks.

- Service detail visits. -
Portfolio/case-study visits.

- Form validation errors and submission
failures, without logging sensitive form contents to analytics.

Do not set fabricated baseline values or promise a specific conversion
rate. Establish a baseline after launch.

------------------------------------------------------------------------

## 3. USERS AND JOBS TO BE DONE

### Persona A --- UMKM owner / small-business operator

**Needs:** a credible website, product/service presentation, customer
inquiries, booking/catalogue capabilities, or a more organized
operational process.

**Pain points:** technical jargon, unclear pricing, fear of a project
becoming too complicated, uncertainty about what to prepare.

**Website job:** understand what Velora can deliver, see relevant
examples, understand the process, and submit a project brief without
needing to know technical specifications.

### Persona B --- Established business / operations lead

**Needs:** internal dashboards, workflow tools, inventory/customer/order
management, reporting, integrations, or modernization of a manual
process.

**Pain points:** disconnected spreadsheets, repetitive manual work,
unclear scope, concerns about reliability and support.

**Website job:** see that Velora can understand a workflow and build a
tailored system, not only a visually attractive website.

### Persona C --- Startup founder / product owner

**Needs:** an MVP, prototype-to-production development, or a web
application that can evolve.

**Pain points:** scope uncertainty, premature complexity, difficulty
prioritizing features.

**Website job:** understand Velora's discovery and delivery process and
request a scoped consultation.

### Core user journey

Discover Velora → understand services → inspect relevant work →
understand process → submit project brief → receive confirmation →
founder reviews lead → founder contacts the prospect.

The journey must remain clear on mobile, where a significant portion of
local business traffic may originate.

------------------------------------------------------------------------

## 4. BRAND SOURCE OF TRUTH AND ASSET RULES

### Official logo

The founder will supply the official Velora logo assets alongside this
PRD. Use those supplied assets as the authoritative source of brand
identity.

The mark is a geometric "V": a faceted purple/violet form overlaps a
white outlined V, paired in the wordmark version with uppercase white
"VELORA" lettering.

Rules:

- Preserve the original geometry, proportions, colors, facets,
and wordmark.

- Do not redraw, reinterpret, regenerate, stretch, skew,
or add effects to the logo.

- Do not replace it with a generic V icon,
text-only logo, or unrelated symbol.

- Do not add gradients, glow,
shadows, or outlines to the logo unless already present in the approved
source asset.

- Choose the supplied variant that works with the section
background.

- Keep sufficient clear space and never crop the mark or
wordmark.

- Use a suitable favicon/app icon derived from the supplied
symbol only if it can be prepared faithfully.

- Inspect file formats and
alpha channels before use.

**Asset quality warning:** some supplied logo reference images may have
a checkerboard background baked into the pixels, and another may have a
solid dark background. Never display the checkerboard as if it were
transparency. Do not use a dark-background raster on a light section if
its black rectangle becomes visible. Prefer a clean official transparent
SVG/PNG if one is supplied. If not, safely remove only the neutral
background from a copy, preserving all logo pixels as closely as
possible; compare the result on both light and dark backgrounds. Keep
the original untouched. If faithful isolation is uncertain, use the
appropriate supplied version on a compatible background and document the
limitation rather than inventing a new logo.

### Palette

Use the logo as the ultimate color source. The following values are
initial design tokens, not claims of exact pixel sampling; refine them
after inspecting the actual logo:

-   Royal violet: `#4136C3`
-   Deep indigo: `#3E3183`
-   Cornflower blue: `#7FA3FF`
-   Lavender mist: `#E8D7F8`
-   Near-black: `#111020`
-   Warm off-white: `#FAF9FC`
-   Main text on light backgrounds: a high-contrast near-black such as
    `#191725`
-   Muted text: a contrast-tested neutral, not an excessively pale grey.

Do not use every palette color in every section. Near-black, off-white,
and neutral surfaces should provide most of the structure; violet is the
identifying accent. Cornflower and lavender are supporting colors, not
mandatory decoration.

### Typography

Preferred starting point:

- Headings: Space Grotesk.

- Body/UI: DM Sans.

Verify font availability, licensing, loading strategy, and performance.
Use a reliable sans-serif fallback. Define a coherent type scale with
fluid sizing where useful. Avoid making every heading oversized;
hierarchy must reflect content importance.

### Tone of voice

-   Clear, confident, professional, and human.
-   Explain business outcomes before technical implementation details.
-   Avoid exaggerated claims and empty agency jargon.
-   Use Bahasa Indonesia as the primary language.
-   English may be used for short brand labels or section markers when
    it feels intentional, but the essential message and CTAs must be
    understandable in Indonesian.
-   Avoid copy that promises guaranteed growth, revenue, rankings, or
    operational results.

### Supplied design references

Use the founder's supplied Pinterest images as references for: -
Dark/light section rhythm.

- Strong editorial headlines.

- Asymmetrical
compositions.

- Modular content blocks and varied card layouts. -
Deliberate image cropping and visual storytelling.

- Restrained
blue-violet color direction.

References are inspiration, not source code or assets to reproduce. Do
not copy the finance, real-estate, crowdfunding, or travel content from
the references. Extract layout and composition principles and create an
original Velora design.

------------------------------------------------------------------------

## 5. ANTI-AI-SLOP DESIGN STANDARD

This is a product requirement, not an optional aesthetic preference.

### Avoid these default patterns

-   A giant generic gradient blob behind the hero.
-   Floating, tilted phone/laptop/dashboard mockups used only as
    decoration.
-   Purple glow effects on every section.
-   Repeating the same three-card grid from top to bottom.
-   Every section having a centered heading, a paragraph, and identical
    cards.
-   Decorative statistics that do not come from verified data.
-   Generic AI illustrations unrelated to the actual product.
-   Excessive pills, borders, glassmorphism, blur, and oversized corner
    radii.
-   Unnecessary carousels, autoplay, scroll-jacking, cursor effects, and
    animation for its own sake.
-   Fake customer avatars, logos, reviews, or "trusted by" claims.
-   Placeholder lorem ipsum in production-facing pages.
-   Unnecessary use of 3D effects just to signal "technology".

### Required visual behavior

-   Build an editorial composition with a deliberate grid and clear
    alignment.
-   Use varied section structures: split layouts, one featured project
    plus smaller previews, text-led sections, process layouts, image-led
    case studies, and restrained card groups.
-   Maintain visual rhythm while preserving a coherent design system.
-   Use real project screenshots or deliberately built, coherent demo
    interfaces. Do not present demo concepts as completed client
    projects.
-   If there is no real portfolio yet, label examples as **Konsep**,
    **Eksplorasi**, or **Demo Internal**. Do not fabricate a client or
    results.
-   Use large imagery only when it contributes context or demonstrates
    work.
-   Let typography, spacing, composition, image selection, and content
    quality do most of the design work.
-   Animations must have a purpose, be short and restrained, respect
    `prefers-reduced-motion`, and never block content.
-   Use a consistent spacing scale and container system, but allow
    distinctive sections to break the pattern intentionally.
-   The design must remain visually convincing with animation disabled.

### Design review checklist

Before calling the design complete, ask: 1. Could this page belong to
any generic AI agency after replacing its logo? If yes, strengthen the
unique composition and content. 2. Does each section have a reason to
exist? 3. Are the same cards repeated without a content reason? 4. Are
all visual assets relevant and credible? 5. Are there any fabricated
metrics or implied client relationships? 6. Does the logo feel
integrated rather than pasted into a template? 7. Is the violet palette
controlled and consistent? 8. Does the page still work without gradients
and animations? 9. Are mobile layouts intentionally composed, rather
than merely stacked? 10. Does every interaction have a clear purpose?

------------------------------------------------------------------------

## 6. INFORMATION ARCHITECTURE AND FEATURE MAP

The founder's supplied mindmap is the primary source for the website's
feature hierarchy. Keep its main branches and phase intent. Feature
names may be clarified for users, and small supporting features may be
proposed when necessary, but inferred additions must not be
misrepresented as exact items visible in the screenshot.

### Root: Velora Studio Website

1.  **Galeri Contoh Karya** --- foundation / Phase 1.
2.  **Tentang Velora** --- Phase 2.
3.  **Paket & Harga** --- Phase 2.
4.  **Form Pemesanan / Permintaan Proyek** --- Phase 2.
5.  **Tanya Jawab Langsung / FAQ** --- Phase 3.
6.  **Kelola Konten & Pesanan** --- Phase 4.
7.  **Masuk Pengelola** --- Phase 4.

### 6.1 Galeri Contoh Karya --- Phase 1

Subfeatures from the mindmap: **Daftar Karya**, **Detail Proyek**,
**Filter Kategori**. A featured-work treatment or lightweight search may
be added if the number of entries justifies it.

Requirements:

-   Show published work with title, category, summary, cover image, and
    detail link.
-   A detail page may include challenge, approach, solution, technology,
    and outcome, but outcome claims must be verifiable.
-   Clearly label internal concepts and demo work as `Konsep`, `Demo`,
    or `Eksplorasi`.
-   Never invent clients, testimonials, metrics, awards, or project
    outcomes.
-   Category filters must function and have clear empty/reset states.
-   If there are no real client projects, create only a small number of
    useful demo concepts and label them honestly.

Suggested `Project` fields: `id`, `slug`, `title`, `category`,
`summary`, `coverImage`, optional `galleryImages`, optional `challenge`,
optional `solution`, optional verified `outcome`, optional `stack`,
`isConcept`, `isFeatured`, `isPublished`, `createdAt`, `updatedAt`.

### 6.2 Tentang Velora --- Phase 2

Subfeatures from the mindmap: **Profil Studio**, **Layanan & Keahlian**,
**Alur Kerja Sama**. A concise working-principles section is a proposed
addition if it improves trust and clarity.

Requirements:

-   Explain who Velora helps, which business problems it can address,
    and how engagement works.
-   Be transparent that Velora is currently founder-led/solo-operated.
-   Do not fabricate a team, office, customer count, years of
    experience, credentials, or client history.

- Explain discovery,
    scope agreement, design, development, review, launch, and optional
    ongoing support.

### 6.3 Paket & Harga --- Phase 2

Subfeatures from the mindmap: **Daftar Paket**, **Bandingkan Paket**,
**Solusi Tambahan**. A custom-estimate explanation may be added if
needed.

Requirements:

-   Packages must communicate intended use, included deliverables,
    exclusions or assumptions where known, and the next step.
-   Prices must be configurable. Do not invent final prices; if
    founder-approved pricing is unavailable, show
    `Konsultasikan kebutuhan` or `Minta estimasi` instead.
-   Use IDR if monetary values are shown. Clearly distinguish fixed
    price, starting price, and custom quote.

- Explain that
    domain/hosting, third-party services, maintenance, and out-of-scope
    changes may be separate when applicable.
-   Package comparison must remain readable on mobile; do not force an
    inaccessible wide table.
-   Selecting a package should prefill the project form when feasible.
-   Do not promise scope or timeline before discovery.

Suggested `Package` fields: `id`, `slug`, `name`, `summary`, `priceType`
(`fixed`, `starting_from`, `custom`, `consultation`), nullable
`priceAmount`, `currency`, `features`, optional `exclusions`, optional
`recommended`, `sortOrder`, `isPublished`, `createdAt`, `updatedAt`.

### 6.4 Form Pemesanan / Permintaan Proyek --- Phase 2

Subfeatures from the mindmap: **Pilih Layanan**, **Isi Kebutuhan**,
**Perkiraan Biaya**. A confirmation/reference step is required to
complete the real submission flow.

Prefer public labels such as `Mulai Proyek`, `Diskusikan Proyek`, or
`Permintaan Proyek` if these avoid implying that a submission is an
automatic purchase or guaranteed acceptance.

Required fields: name, email, service category, project brief, privacy
acknowledgement. Optional fields: business name, WhatsApp, budget range
in IDR, target timeframe, reference URL, and additional context.

Behavior:

- Validate in browser and on server; show accessible inline
errors.

- Preserve correctable input, prevent accidental double
submission, and show loading/success/error states.

- Persist the inquiry
to a database. Do not store only in client state or browser storage. -
Never show success if persistence failed. Return a reference ID if
available and provide a retry/contact fallback on failure.

- Apply
appropriate rate limiting and honeypot or equivalent spam mitigation. -
Never send the full project brief to analytics.

- Collect only necessary
personal information; never request passwords or payment-card data.

Suggested `Lead` fields: `id`, `createdAt`, `updatedAt`, `name`,
nullable `businessName`, `email`, nullable `whatsapp`, `serviceType`,
nullable `selectedPackage`, nullable `budgetRange`, nullable
`targetDate`, `brief`, `privacyConsentAt`, `status`, nullable private
`internalNotes`, optional `source`.

Lead statuses: `new`, `reviewed`, `contacted`, `proposal_sent`, `won`,
`lost`, `archived`.

Email notification should be sent to a configured address after
successful persistence when provider credentials exist. Notification
failure must not erase the lead. Keep all credentials server-side and
document missing configuration honestly.

### 6.5 Tanya Jawab Langsung / FAQ --- Phase 3

Subfeatures from the mindmap: **Mulai Percakapan**, **Pertanyaan Umum**,
**Riwayat Percakapan**.

Implementation interpretation: - **Pertanyaan Umum (FAQ)** is the
required Phase 3 feature. It must show accurate answers to common
questions and be maintainable by the admin when Phase 4 is available. -
**Mulai Percakapan** can initially hand off to a real configured channel
such as WhatsApp or email. - **Riwayat Percakapan** is not automatically
a chat-history feature. Implement it only if a genuine messaging system,
authentication, privacy policy, and secure backend are included.
Otherwise document it as future scope rather than displaying a fake
conversation interface.

- Do not build an AI chatbot or live chat solely
to match the label. If live chat is later justified, identify whether
the responder is human or automated, define availability expectations,
protect transcripts, and set retention rules.

Suggested `FAQ` fields: `id`, `question`, `answer`, optional `category`,
`sortOrder`, `isPublished`, `createdAt`, `updatedAt`.

### 6.6 Kelola Konten & Pesanan --- Phase 4

Subfeatures from the mindmap: **Kelola Karya**, **Kelola Paket &
Harga**, **Kotak Masuk Pesanan**. Managing FAQs is a proposed supporting
feature so the FAQ can be maintained without code edits.

Requirements:

-   Admin can create/edit/publish/unpublish and order portfolio items.
-   Admin can create/edit/publish/unpublish and order packages and their
    pricing information.
-   Admin can review incoming inquiries, open details, change status,
    add private notes, search/filter, and archive.
-   Admin can create/edit/publish/unpublish and order FAQ entries.
-   A small CSV export may be added if safe and useful, but it is not a
    priority.
-   Use protected server-side operations. Never expose lead records
    publicly or rely on client-only route hiding.
-   Do not implement an elaborate CMS or multi-role permission system
    unless actual needs justify it.

### 6.7 Masuk Pengelola --- Phase 4

Subfeatures from the mindmap: **Masuk Akun**, **Lupa Kata Sandi**,
**Kelola Akun**.

Requirements:

-   Only explicitly authorized administrators may sign in; no public
    self-registration.
-   Use a maintained authentication provider or the existing stack's
    secure auth implementation.
-   Password reset must use the provider's secure flow. Never store
    plaintext passwords.

- Protect every admin route and mutation on the
    server.
-   Use secure session/cookie settings and rate limiting where
    appropriate.
-   Do not reveal whether an email exists through overly specific
    login/reset errors.
-   Keep roles simple for a solo operator; avoid complex RBAC without a
    real requirement.
-   If credentials are missing, do not deploy an unprotected admin
    route. Finish the safe public features and document the blocker.

### Public routes

-   `/` --- homepage.
-   `/karya` --- gallery/list.
-   `/karya/[slug]` --- project detail.
-   `/layanan` --- service overview.
-   `/tentang` --- studio profile and process.
-   `/paket` --- packages/pricing, once the content is approved.
-   `/mulai-proyek` --- project inquiry form.
-   `/faq` --- common questions.
-   `/privasi` --- privacy notice.
-   `/kontak` --- optional separate contact page if UX benefits from it.

### Private routes

-   `/admin/login`
-   `/admin` --- optional concise overview.
-   `/admin/karya`
-   `/admin/paket`
-   `/admin/faq`
-   `/admin/pesanan`
-   `/admin/akun`
-   `/admin/lupa-kata-sandi`

The existing framework's routing conventions may be used instead. Do not
create empty routes merely to satisfy this list. Keep admin navigation
separate from public navigation and protect all private routes on the
server.

## 7. HOMEPAGE REQUIREMENTS

The homepage should tell a clear story from positioning to proof to
action. Section order may be improved by the design skill, but every
required purpose must remain covered.

### Section 1 --- Header

-   Use the official Velora logo.
-   Keep navigation compact and legible.
-   Provide a clear primary CTA.
-   Ensure correct logo contrast and clear space on the selected
    background.

### Section 2 --- Hero

Purpose: immediately explain the audience and the value Velora provides.

Suggested copy direction:

- Eyebrow:
`VELORA STUDIO / DIGITAL SOLUTIONS`
- Headline:
`Website dan sistem digital untuk bisnis yang ingin bergerak lebih jauh.` -
Supporting copy: explain that Velora builds business websites, web
applications, and tailored systems.

- Primary CTA: `Diskusikan Proyek` -
Secondary CTA: `Lihat Karya`

The final copy may be refined for naturalness and visual fit.

Visual direction:

- Prefer an editorial split composition or a custom
layout inspired by the founder's references.

- The visual area should
show a coherent website/application preview, a real project image, or a
carefully designed product-interface composition.

- Do not default to
floating tilted devices, an oversized decorative crystal, or a generic
analytics dashboard.

- If a dashboard preview is used, it must have a
credible relationship to Velora's service offering and use consistent,
legible UI.

- Avoid placing important copy inside an image.

- CTA
buttons must work.

### Section 3 --- Value proposition / approach strip

Communicate three or four genuine working principles, for example: -
Berangkat dari kebutuhan bisnis.

- Desain yang punya tujuan. -
Development yang terukur.

- Dukungan setelah peluncuran.

These are process commitments, not fabricated achievements. Use
restrained icons or typography; do not turn them into another repetitive
card grid.

### Section 4 --- Selected work

-   Show a deliberate selection of 2--3 projects or demo concepts.
-   Use varied card sizes or a featured project plus smaller previews.
-   Each item should include a title, category, short explanation, and
    link to a detail view when one exists.
-   Distinguish client work from demo work with visible labels.
-   Do not invent client names, project outcomes, or customer
    relationships.
-   If there are no supplied projects, create a small number of original
    demonstration projects only if useful, clearly label them as
    concept/demo work, and do not claim business results.

### Section 5 --- Services

Cover three principal categories: 1. **Website Bisnis** --- company
profiles, landing pages, product/service presentation, and CMS-backed
content where needed. 2. **Aplikasi Web** --- dashboards, internal
portals, and tailored web applications. 3. **Sistem Bisnis** ---
workflow management, booking, inventory, customer/order management,
integrations, and other systems when validated by the client's needs.

Each service must describe who it is for, what problem it addresses, and
the types of deliverables that may be included. Do not promise every
feature as standard in every project.

### Section 6 --- Process

Show a clear four-step process: 1. **Discovery** --- understand business
goals, users, constraints, and workflows. 2. **Design** --- define
information architecture, UX, and interface direction. 3.
**Development** --- implement, test, and review with the client. 4.
**Launch & Support** --- deploy, document, and agree on ongoing support
where applicable.

Keep the descriptions specific and short. Do not promise fixed timelines
without scope discovery.

### Section 7 --- Featured case study or studio approach

Use an editorial layout to explain a project or the way Velora solves a
problem. If no genuine case study exists, present a clearly labeled demo
concept or explain the approach without inventing results.

If metrics are shown, they must be supplied and verifiable. Otherwise,
use qualitative explanation of the challenge, solution, and design
decisions.

### Section 8 --- Final CTA

Headline direction: `Punya kebutuhan digital yang ingin dibereskan?`

Explain what happens after submission. Keep the form or CTA focused and
low-friction.

### Section 9 --- Footer

-   Official logo.
-   Short positioning sentence.
-   Navigation links.
-   Configured contact links only.
-   Privacy notice.
-   Current year generated dynamically.
-   Do not add social icons or social links unless real destinations are
    configured.

------------------------------------------------------------------------

## 8. SERVICES AND CONTENT REQUIREMENTS

### Website development

Explain:

- Business websites and landing pages.

- Responsive layouts. -
Content structure and conversion goals.

- CMS integration when editing
content is required.

- Basic technical SEO and deployment.

- Maintenance
options as a separate scope.

### Web applications

Explain:

- Custom workflows and dashboards.

- User roles and data access
when relevant.

- Integrations and APIs where scoped.

- Testing and
deployment.

- Maintainability and future evolution.

### Business systems

Explain that the system is tailored after understanding the actual
workflow. Potential examples include booking, inventory, customer
records, orders, reports, and internal approvals. Do not imply every
system is already a standardized product.

### Pricing

Do not invent fixed prices or publish an arbitrary price list. If the
founder has not supplied rates, use a CTA to request a scoped estimate.
Optionally explain that budget and scope are discussed during discovery.

### Trust content

Use process clarity, genuine work, technical transparency, and honest
limitations to build trust. No fake testimonials, logos, case-study
metrics, client counts, years of experience, awards, or
"industry-leading" claims.

------------------------------------------------------------------------

## 9. FULL-STACK FUNCTIONAL REQUIREMENTS

This section covers the real functional behavior required by the
mindmap: project inquiry, data persistence, optional notifications,
FAQ/contact handoff, and Phase 4 content/lead management. It is not
sufficient to create visual controls that do not perform their
advertised actions.

### Project inquiry workflow

The public flow is: choose a service/package → describe the need →
optionally provide budget and timeframe → review/consent → submit →
receive honest confirmation. Prefill the selected service/package when
the form is entered from a relevant CTA.

Required: name, valid email, service type, project brief, privacy
acknowledgement. Optional: business name, WhatsApp, budget range, target
timeframe, reference URL, additional context.

The server must validate and persist submissions to a database. Prevent
double submissions and abuse. Show clear loading, success, and error
states. A successful response must only be returned after the record is
persisted. If notification delivery fails after persistence, preserve
the record and report the notification issue to the operator through
server-side diagnostics without exposing internals to the visitor.

### Persistence and data model

Use the `Lead`, `Project`, `Package`, and `FAQ` models described in
Section 6 as the baseline. Adjust field types and constraints to the
selected stack. Use database constraints and safe parameterized access.
Do not store more data than needed.

### Admin notification

If an email provider is configured, notify the configured operator
address after a lead is successfully saved. Store keys and destinations
in server-side environment variables. Provide `.env.example` with
variable names and descriptions only. If credentials are unavailable,
lead persistence must still work where possible and the required setup
must be documented. Never hardcode secrets or pretend a notification was
sent when it was not.

### Admin lead inbox

The protected inbox should support:

-   List inquiries newest first.

- View an inquiry's complete details.
-   Filter by status and search where practical.
-   Change status using the agreed status set.
-   Add/edit private internal notes.
-   Archive a lead.
-   Optional CSV export only if implemented safely.

All read/write operations must verify authorization on the server. No
lead content may be exposed through public routes or public API
responses.

### Content management

The Phase 4 admin area should manage portfolio work, packages/pricing,
and FAQ entries. At minimum, create/edit, publish/unpublish, and
ordering must work. A full visual page builder is out of scope. Use the
simplest maintainable content model compatible with the repository; do
not add a CMS dependency unless it clearly reduces maintenance burden.

### FAQ and conversation handling

FAQ is a real public feature. The initial conversation CTA may open a
configured contact channel. A chat inbox and conversation history are
not required for the first implementation unless a real messaging
backend and secure auth are implemented. Do not display a fake chat
interface or simulated conversation history as if it were functional.

### Authentication

No public self-registration. Use an existing reliable auth solution or a
maintained provider. Implement login, logout, password reset, and basic
account management only as supported by that provider. Every protected
operation must enforce server-side authorization. If safe auth setup
requires unavailable credentials, document the blocker and do not ship a
publicly accessible admin panel.

### Privacy and security

-   Validate untrusted input on the server.
-   Apply appropriate rate limiting and spam protection.
-   Use secure database access.
-   Keep secrets out of client bundles.
-   Do not log full project briefs or unnecessary personal information.
-   Explain data collection and contact purposes in `/privasi`.
-   Establish reasonable inquiry retention/deletion handling.
-   Do not claim legal compliance certification without evidence.

## 10. TECHNICAL ARCHITECTURE

### Repository-first rule

Before choosing architecture: 1. Inspect the current repository, package
manager, framework, dependencies, scripts, and deployment conventions.
2. Preserve the existing stack if it is healthy and suitable. 3. Avoid a
rewrite simply because another stack is fashionable. 4. Review installed
skill guidance and use the browser/testing tools available. 5. Do not
overwrite user work or reset the Git tree.

### Preferred default only if the repository is empty

A reasonable starting point is:

- Next.js App Router.

- TypeScript. -
Tailwind CSS. - shadcn/ui for selected accessible primitives, customized
to the Velora design system.

- A PostgreSQL-backed service for
persistent leads, such as the provider already configured by the
founder.

- A maintained validation approach for server and client form
validation.

- An email provider only when credentials are available. -
Playwright for browser testing and screenshots.

- Motion for React only
when an interaction materially benefits from animation.

This is a fallback, not a requirement to replace a functioning existing
application.

### Component architecture

Separate:

- Global layout and navigation.

- Design tokens and
typography.

- Reusable buttons, fields, labels, and accessible UI
primitives.

- Content-driven service and project components. -
Page-specific editorial sections.

- Server-side form handling and
persistence.

- Protected internal lead management.

Reuse components when behavior and semantics are genuinely shared. Do
not force unique editorial sections into a universal "card" component
that removes their visual character.

### Data and environment

-   Keep secrets server-side.
-   Provide `.env.example` with variable names and descriptions, never
    real credentials.
-   Include migrations/schema and safe seed data where the selected
    stack needs them.
-   Use demo data that is clearly labeled and never resembles a real
    client claim.
-   Document local setup, database setup, tests, and deployment
    requirements in the README.
-   Ensure the project can build without private credentials when a
    documented local/demo mode is feasible.
-   Do not silently fall back to fake success when a database or email
    provider is unavailable.

### Error handling and observability

-   Handle form and database errors predictably.
-   Avoid exposing stack traces or internal details to visitors.
-   Log useful server-side diagnostic context without logging full
    project briefs, secrets, or unnecessary personal data.
-   Include a not-found page and meaningful empty states where
    applicable.
-   Avoid dead links, dead buttons, and placeholder interactions.

------------------------------------------------------------------------

## 11. SECURITY AND PRIVACY

-   Validate and sanitize untrusted input on the server.
-   Use parameterized database access or the ORM/provider's safe query
    mechanism.
-   Apply rate limiting or a comparable abuse control to public
    submission endpoints.
-   Use a spam mitigation strategy that does not unnecessarily block
    legitimate users.
-   Restrict admin access and verify authorization on the server for
    every protected operation.
-   Do not rely only on hiding admin UI in the client.
-   Keep private lead details out of public API responses.
-   Use secure session/cookie settings provided by the selected auth
    stack.
-   Avoid exposing environment variables to client bundles.
-   Configure allowed origins and CSRF protections as appropriate to the
    architecture.
-   Minimize data collection and explain the use of submitted data in
    `/privasi`.
-   Provide a reasonable retention/deletion procedure for inquiries.
-   Do not add trackers that collect personal data without a clear
    purpose.
-   Do not claim legal compliance certification without evidence.

------------------------------------------------------------------------

## 12. SEO, SHARING, AND ANALYTICS

### SEO

-   Unique title and meta description per public route.
-   Canonical URLs where appropriate.
-   Open Graph metadata and a sensible share image.
-   `sitemap.xml` and `robots.txt`.
-   Semantic heading hierarchy and descriptive links.
-   Descriptive alt text for meaningful images; empty alt for purely
    decorative imagery.
-   Structured data only when accurate and appropriate. Use a relevant
    business/service schema only with verified details; do not invent an
    address, phone number, ratings, or opening hours.
-   No accidental indexing of admin routes, internal lead data, or
    development-only pages.

### Analytics

Make analytics integration optional and configurable. If an analytics
provider is already configured, instrument key events without including
form contents or unnecessary personal data. If none is configured,
prepare a clean integration point and document setup rather than adding
a random provider or blocking launch.

------------------------------------------------------------------------

## 13. RESPONSIVENESS, ACCESSIBILITY, AND PERFORMANCE

### Responsive test widths

At minimum inspect: - 360 px mobile. - 390 px mobile. - 768 px tablet. -
1024 px laptop/tablet landscape. - 1440 px desktop.

Use additional sizes if the layout reveals problems.

Requirements:

- No horizontal overflow.

- Navigation remains usable. -
Text wraps naturally and remains readable.

- Buttons and inputs are
comfortably tappable.

- Images preserve their intended crop and aspect
ratio.

- Desktop-only asymmetry adapts intentionally to smaller
screens.

- Form controls and error states remain usable on mobile.

- Do
not merely stack every desktop element in its original order if a
different mobile order improves comprehension.

### Accessibility

Target WCAG 2.2 AA practices where practical:

- Semantic HTML. -
Keyboard access for all controls.

- Visible focus states.

- Sufficient
contrast.

- Labels and instructions for form fields.

- Accessible
validation messages and status announcements.

- Meaningful link names. -
Correct heading order.

- Reduced-motion support.

- No essential
information conveyed only by color or animation.

### Performance

-   Optimize images and serve appropriately sized formats.
-   Avoid shipping large images to small viewports when responsive
    sources are possible.
-   Lazy-load below-the-fold imagery when appropriate.
-   Do not lazy-load the primary hero image if doing so harms perceived
    loading.
-   Avoid unnecessary client-side JavaScript and large animation
    bundles.
-   Reserve image dimensions to reduce layout shift.
-   Use sensible caching and rendering strategies for the chosen stack.
-   Prefer Core Web Vitals goals of LCP ≤ 2.5 s, INP ≤ 200 ms, and CLS ≤
    0.1 where field conditions allow. These are targets, not guaranteed
    outcomes.
-   Aim for strong Lighthouse results, but do not distort the user
    experience to chase a score.
-   Record any performance issues and the practical fix.

------------------------------------------------------------------------

## 14. INTERACTION DESIGN

Only implement interactions that support a real user task.

Required:

- Navigation links route correctly.

- Mobile menu opens and
closes accessibly.

- CTAs lead to the intended service, portfolio, or
inquiry destination.

- Forms validate, submit, persist, and provide
honest feedback.

- Portfolio filters, if implemented, actually filter
content.

- Accordions, dialogs, and menus have correct keyboard and
focus behavior.

- Loading, success, error, and empty states are designed
intentionally.

- Links to email/WhatsApp use configured destinations.

Optional:

- Subtle hover feedback.

- Small scroll reveal effects. -
Lightweight transitions between UI states.

Avoid autoplay carousels, unnecessary parallax, scroll-jacking, custom
cursors, decorative motion, and animation that reduces readability or
performance.

------------------------------------------------------------------------

## 15. TOOL AND SKILL ORCHESTRATION

The installed tools and skills are expected to contribute to decisions,
implementation, and validation. Do not treat them as passive references.

### Before design

-   Inspect the installed skills and read the relevant `SKILL.md` files.
-   Apply the frontend design skill to derive a specific art direction
    from the supplied logo and references.
-   Use web-design guidelines to establish accessibility, responsive,
    and usability review criteria.
-   Use the React best-practices skill when selecting component
    boundaries, data fetching, and rendering patterns.
-   Research relevant reference pages using the available browser,
    Mobbin, Awwwards, or Figma access.
-   Record a concise design decision log: what was taken from the
    references, what was rejected, and why.

### During implementation

-   Use Tailwind tokens and a small coherent design system rather than
    accumulating one-off arbitrary values.
-   Use shadcn/ui selectively for behavior-heavy primitives such as
    dialogs, menus, and form controls; customize their styling to
    Velora.
-   Use Motion only where it adds meaning.
-   Keep project-specific code aligned with the existing framework.
-   If a tool exposes actual browser interaction or screenshot
    capabilities, use it instead of relying solely on code inspection.

### During review

-   Run the web-design-guidelines review against the implemented pages.
-   Apply React best-practice guidance to performance-sensitive code.
-   Run the app and inspect real browser screenshots with Playwright or
    the available equivalent.
-   Compare the rendered page to the reference intent, not merely to the
    source code.
-   Fix issues found by the review before claiming completion.

### Autonomy rule

If a tool or skill suggests a materially better solution than this PRD's
initial assumption, evaluate it and use it when it preserves the product
goals, official brand, security, and scope. Do not use tools just to
demonstrate that they were used. If a tool is unavailable, continue with
the best available method and report the limitation.

------------------------------------------------------------------------

## 16. REVISED DELIVERY PLAN --- ALIGNED TO THE FEATURE MINDMAP

The feature phases below follow the founder's mindmap. The
implementation may prepare shared data models and technical foundations
earlier when doing so reduces rework, but do not present a feature as
live before it works. The goal is a useful, testable increment at each
phase---not a long planning-only exercise.

### Phase 0 --- Repository and asset audit

-   Inspect framework, package manager, dependencies, scripts, Git
    status, assets, installed skills, and available tools.
-   Inspect the official logo files and determine which version can be
    used without a baked-in checkerboard background.
-   Preserve existing changes; do not reset or overwrite user work.
-   Read and apply relevant skill instructions.

### Phase 1 --- Galeri Contoh Karya and public foundation

-   Establish an original design direction and design tokens.
-   Build the global layout, navigation, footer, homepage/positioning,
    service overview, gallery/list, project detail template, and
    category filter.
-   Make project concepts clearly distinguishable from real client work.
-   Include a functioning contact/project CTA even if the full booking
    flow is scheduled for Phase 2.
-   Complete responsive, accessibility, SEO, and browser visual checks
    for the routes built.

### Phase 2 --- Tentang Velora, Paket & Harga, Form Pemesanan

-   Build studio profile, services/skills, and collaboration process.
-   Build configurable package list, comparison, additional solutions,
    and scope/pricing notes.
-   Build the project inquiry flow with client/server validation,
    persistence, honest confirmation/error states, spam protection, and
    privacy consent.
-   Add email notification if credentials are configured.
-   Do not invent prices; use a consultation/estimate CTA until
    founder-approved prices are available.

### Phase 3 --- Tanya Jawab Langsung / FAQ

-   Build and test the FAQ experience.
-   Add a working handoff to a configured contact channel.
-   Define clear expectations around response time only if an actual
    policy exists.
-   Do not build fake chat history. Implement real messaging/history
    only if the scope, backend, authentication, privacy, and operator
    workflow are justified; otherwise mark it as future scope.

### Phase 4 --- Kelola Konten & Pesanan and Masuk Pengelola

-   Implement protected admin authentication and password reset.
-   Build content management for works, packages/pricing, and FAQ.
-   Build the inquiry inbox with status, notes, search/filter, and
    archive.
-   Enforce server-side authorization for every protected route and
    mutation.
-   Test unauthorized access and security-sensitive flows.
-   If required credentials are unavailable, do not weaken security;
    finish safe portions and document the precise blocker.

### Final QA and handover --- applies to every phase

-   Run the application and inspect real rendered pages in a browser.
-   Capture and review desktop/mobile screenshots at 360, 390, 768,
    1024, and 1440 px where tools allow.
-   Test all core interactions and main user journeys.
-   Review accessibility, contrast, keyboard use, reduced motion, SEO,
    performance, console/network errors, and broken links.
-   Run lint, type checks, tests, and production build if available.
-   Fix identified defects before completion.
-   Deliver README, `.env.example`, database schema/migrations if
    relevant, test results, visual QA evidence, and a concise list of
    remaining founder configuration tasks.

Use the installed skills and tools throughout these phases. The final
report must identify which tools were actually used and what they
verified; do not claim usage or testing that did not occur.

## 17. REVISED ACCEPTANCE CRITERIA

The implementation is not complete because files exist. It is complete
only when the relevant routes and workflows run, are tested, and meet
the criteria below.

### Product and content

-   [ ] The feature map follows the seven main branches in the founder's
    mindmap and preserves their intended phase order.
-   [ ] Public visitors can understand Velora's services and how to
    begin a project.
-   [ ] Gallery list, project detail, and category filtering work.
-   [ ] Demo/concept work is labeled clearly; no fabricated clients,
    metrics, testimonials, awards, or outcomes appear.
-   [ ] About, package/pricing, and project inquiry features are
    implemented according to their phase scope.
-   [ ] FAQ works; any live chat/history is either genuinely implemented
    with secure infrastructure or explicitly deferred.
-   [ ] Admin content management and login are protected and work if
    Phase 4 is implemented.
-   [ ] Prices, contact channels, and other business facts are not
    invented.

### Brand and creative quality

-   [ ] Official Velora logo geometry and proportions are preserved.
-   [ ] No baked-in checkerboard appears as a website background.
-   [ ] The palette derives from the logo and remains restrained and
    consistent.
-   [ ] The layout is original and demonstrates deliberate hierarchy,
    whitespace, composition, and image selection.
-   [ ] Sections are not repetitive without a content reason.
-   [ ] The design remains convincing without decorative animation or
    gradient effects.
-   [ ] The UI/UX reflects applied skill guidance and a documented
    design review, not a generic one-pass template.

### Form, data, and security

-   [ ] Inquiry inputs are validated in browser and server.
-   [ ] Successful submissions persist to the database.
-   [ ] The interface never reports success if persistence fails.
-   [ ] Spam/abuse protection is implemented appropriately.
-   [ ] Notification failure does not erase persisted inquiries.
-   [ ] Secrets are not hardcoded or exposed to the client.
-   [ ] Public visitors cannot access leads or admin data.
-   [ ] Every admin read/write operation checks authorization
    server-side.
-   [ ] There is no public self-registration.
-   [ ] Privacy notice accurately describes the data collected and its
    use.

### Responsive UX, accessibility, and performance

-   [ ] The website is inspected at 360, 390, 768, 1024, and 1440 px, or
    equivalent available viewports.
-   [ ] No horizontal overflow or broken image crops appear.
-   [ ] Navigation and forms work on touch and keyboard.
-   [ ] Focus, contrast, labels, error announcements, and reduced-motion
    behavior are checked.
-   [ ] Primary CTA, links, filters, and other visible controls work as
    labeled.
-   [ ] No serious runtime/console errors remain in the main journeys.
-   [ ] Images and JavaScript are reasonably optimized; performance
    issues found in testing are addressed.

### Engineering and verification

-   [ ] All required routes render and have meaningful content.
-   [ ] Lint, type-check, tests, and production build pass when the
    project defines these scripts.
-   [ ] Playwright or an equivalent available browser tool is used to
    inspect actual rendered output.
-   [ ] Desktop and mobile screenshots are reviewed and visual defects
    are corrected.
-   [ ] Relevant installed skills are actually applied and named in the
    handover report.
-   [ ] README and `.env.example` exist; migrations/schema are included
    if needed.
-   [ ] Remaining blockers are documented accurately. No unrun test is
    reported as passed.

## 18. FINAL HANDOVER FORMAT

At the end, report concisely:

1.  What was implemented.
2.  Which routes and workflows are working.
3.  Which installed skills and tools were actually used.
4.  Which browser/viewport tests were run and their results.
5.  Build, lint, type-check, and test status.
6.  Any known limitations or credentials still required.
7.  Where to find the README, environment template, migrations, and
    screenshots.

Do not report success merely because files were written. Success means
the application was run, its main workflows were exercised, visual
output was inspected, and any remaining blockers are explicit.

**Final priority order:** truthful content → usability → distinctive
visual quality → reliability and security → performance →
maintainability → decorative effects.
