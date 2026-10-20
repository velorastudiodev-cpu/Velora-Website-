# VELORA STUDIO --- PRODUCT REQUIREMENTS DOCUMENT (PRD)

**Document type:** Product + UX + Engineering specification\
**Status:** Initial implementation brief\
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

This PRD defines product intent, constraints, required capabilities, and
acceptance criteria. It is **not a replacement for engineering judgment,
installed Codex skills, browser tools, design tools, or visual
testing**.

Work autonomously and use the available environment intelligently.
Before implementing, inspect the repository, installed skills, available
tools, logo assets, existing code, and current dependencies. Read the
actual `SKILL.md` instructions for relevant installed skills and follow
them. Do not merely mention a skill in the final report: apply its
guidance at the relevant stage.

At minimum, evaluate and use the installed equivalents of: -
`frontend-design` for original art direction and high-quality UI
composition. - `web-design-guidelines` for UX, accessibility, and visual
review. - `react-best-practices` for React architecture and
performance. - Tailwind CSS and shadcn/ui, if compatible with the
project. - Motion for React only where purposeful interaction benefits
from it. - Playwright for browser-based visual and functional
verification.

Also use the available browser/research workflow to inspect the
founder-provided references and, when accessible, relevant patterns from
Mobbin, Awwwards, and Figma. If a tool or website is unavailable, use
the supplied references and continue; record the limitation instead of
blocking the entire project.

**Do not stop after producing another plan.** The expected outcome is a
working, tested website and the necessary project documentation. Use the
PRD as a baseline, not a rigid substitute for expert judgment. If a
better implementation is supported by the repository, installed skills,
or testing, use it as long as the brand, product scope, security, and
business intent remain intact. Document material deviations briefly.

Do not ask the founder to decide low-risk implementation details. Make
sensible decisions and continue. Stop only when an essential credential,
paid service, destructive change, legal/brand ambiguity, or other
genuinely blocking decision requires the founder.

------------------------------------------------------------------------

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

Secondary conversions: - Explore services. - Review portfolio and case
studies. - Contact Velora through configured email or WhatsApp. -
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

Track, where analytics is configured: - Project inquiry submissions. -
Primary CTA clicks. - Contact link clicks. - Service detail visits. -
Portfolio/case-study visits. - Form validation errors and submission
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

Rules: - Preserve the original geometry, proportions, colors, facets,
and wordmark. - Do not redraw, reinterpret, regenerate, stretch, skew,
or add effects to the logo. - Do not replace it with a generic V icon,
text-only logo, or unrelated symbol. - Do not add gradients, glow,
shadows, or outlines to the logo unless already present in the approved
source asset. - Choose the supplied variant that works with the section
background. - Keep sufficient clear space and never crop the mark or
wordmark. - Use a suitable favicon/app icon derived from the supplied
symbol only if it can be prepared faithfully. - Inspect file formats and
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

Preferred starting point: - Headings: Space Grotesk. - Body/UI: DM Sans.

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
Dark/light section rhythm. - Strong editorial headlines. - Asymmetrical
compositions. - Modular content blocks and varied card layouts. -
Deliberate image cropping and visual storytelling. - Restrained
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

## 6. INFORMATION ARCHITECTURE AND ROUTES

Implement only routes appropriate to the existing framework. Use
Indonesian slugs where practical.

### Required public routes

-   `/` --- Home.
-   `/layanan` --- Services overview.
-   `/layanan/website-bisnis` --- Business websites and landing pages.
-   `/layanan/aplikasi-web` --- Custom web applications and dashboards.
-   `/layanan/sistem-bisnis` --- Business systems, workflow tools, and
    integrations.
-   `/karya` --- Work/portfolio index.
-   `/karya/[slug]` --- Individual project/case-study page.
-   `/proses` --- How Velora works.
-   `/tentang` --- About Velora.
-   `/mulai-proyek` --- Project inquiry form.
-   `/privasi` --- Privacy notice covering the information collected
    through inquiry forms.

If building every detail route would delay a coherent launch, prioritize
the home, services overview, work index, process/about content, and
project inquiry flow. Service detail routes can use a reusable template.
Do not create empty routes merely to satisfy a list.

### Navigation

Desktop navigation: - Logo. - Layanan. - Karya. - Proses. - Tentang. -
Primary CTA: **Diskusikan Proyek**.

Mobile navigation: - Accessible menu button with a clear open/closed
state. - Keyboard-accessible menu and focus handling. - Primary CTA
remains discoverable. - No horizontal overflow or tiny tap targets.

Use a sticky header only if it improves navigation and does not consume
excessive viewport space. Avoid oversized floating navigation bars.

------------------------------------------------------------------------

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

Suggested copy direction: - Eyebrow:
`VELORA STUDIO / DIGITAL SOLUTIONS` - Headline:
`Website dan sistem digital untuk bisnis yang ingin bergerak lebih jauh.` -
Supporting copy: explain that Velora builds business websites, web
applications, and tailored systems. - Primary CTA: `Diskusikan Proyek` -
Secondary CTA: `Lihat Karya`

The final copy may be refined for naturalness and visual fit.

Visual direction: - Prefer an editorial split composition or a custom
layout inspired by the founder's references. - The visual area should
show a coherent website/application preview, a real project image, or a
carefully designed product-interface composition. - Do not default to
floating tilted devices, an oversized decorative crystal, or a generic
analytics dashboard. - If a dashboard preview is used, it must have a
credible relationship to Velora's service offering and use consistent,
legible UI. - Avoid placing important copy inside an image. - CTA
buttons must work.

### Section 3 --- Value proposition / approach strip

Communicate three or four genuine working principles, for example: -
Berangkat dari kebutuhan bisnis. - Desain yang punya tujuan. -
Development yang terukur. - Dukungan setelah peluncuran.

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

Explain: - Business websites and landing pages. - Responsive layouts. -
Content structure and conversion goals. - CMS integration when editing
content is required. - Basic technical SEO and deployment. - Maintenance
options as a separate scope.

### Web applications

Explain: - Custom workflows and dashboards. - User roles and data access
when relevant. - Integrations and APIs where scoped. - Testing and
deployment. - Maintainability and future evolution.

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

## 9. PROJECT INQUIRY --- CORE FULL-STACK FEATURE

This is the main functional requirement beyond the public marketing
pages.

### Form fields

Required: - Full name. - Email address. - Project/service category. -
Project brief. - Privacy consent.

Optional: - Business/organization name. - WhatsApp number. - Budget
range in IDR. - Target launch date or timeframe. - Additional context.

Suggested service categories: - Website / landing page. - Web
application. - Business system / automation. - CMS / content platform. -
Maintenance / improvement. - Not sure yet.

Suggested budget ranges should be configurable and framed as guidance,
not a commitment. If included, use sensible IDR bands that the founder
can edit before launch. Do not imply that every budget guarantees a
specific scope.

### Form behavior

-   Validate input in the browser and again on the server.
-   Provide inline, accessible error messages.
-   Preserve entered values when a correctable error occurs.
-   Prevent accidental double submissions.
-   Show a clear loading state.
-   On success, show a confirmation screen/message and a reference ID if
    available.
-   On failure, explain what happened and offer a retry/contact
    fallback.
-   Never report success if persistence failed.
-   Use a honeypot and/or appropriate rate limiting to reduce spam.
-   Do not send the full brief to analytics.
-   Ensure labels are programmatically associated with fields.

### Backend persistence

Store project inquiries in a persistent database, not only in client
state or browser storage.

Suggested `Lead` fields: - `id` - `createdAt` - `updatedAt` - `name` -
`businessName` (nullable) - `email` - `whatsapp` (nullable) -
`serviceType` - `budgetRange` (nullable) - `targetDate` (nullable) -
`brief` - `privacyConsentAt` - `status` - `internalNotes` (nullable,
private) - `source` (e.g. route or campaign source, if available and
appropriate)

Suggested lead statuses: - `new` - `reviewed` - `contacted` -
`proposal_sent` - `won` - `lost` - `archived`

Use database constraints and validation appropriate to the selected
stack. Do not store more personal data than is needed.

### Notifications

-   Send an email notification to a configured address when a lead is
    successfully persisted, if an email provider is configured.
-   Keep email provider keys and destination addresses in environment
    variables.
-   If notifications cannot be configured because credentials are
    missing, ensure lead persistence still works and clearly document
    the required environment variables.
-   Notification failure must not erase a successfully stored lead.
-   Do not hardcode secrets.

### Internal lead console

Implement a minimal protected internal console if it fits the existing
stack without disproportionate infrastructure: - Login restricted to
authorized admin(s); no public self-registration. - List leads with
newest first. - View lead details. - Update status. - Add/edit private
internal notes. - Search or filter by status. - Archive a lead. -
Optional CSV export if safe and useful.

Do not expose the lead list or lead details publicly. Do not create a
custom authentication system if a reliable, compatible auth provider or
existing project authentication is available. If no safe authentication
can be configured because credentials are unavailable, finish the public
lead intake and document the console as blocked by configuration; never
ship an unprotected admin route.

### Portfolio content management

Use a data-driven portfolio model. A full visual CMS is not mandatory
for the first release. Prefer the simplest maintainable option: - Static
content/configuration or seeded database records initially. - A minimal
protected CRUD interface only if the chosen stack already supports the
admin foundation cleanly and it is useful to the founder.

Suggested `Project` fields: - `id` - `slug` - `title` - `category` -
`summary` - `challenge` (optional) - `solution` (optional) - `outcome`
(optional, only verified) - `coverImage` - `galleryImages` (optional) -
`stack` (optional) - `isConcept` - `isFeatured` - `isPublished` -
`createdAt` - `updatedAt`

Never invent outcomes. If `isConcept` is true, display a visible
concept/demo label.

------------------------------------------------------------------------

## 10. TECHNICAL ARCHITECTURE

### Repository-first rule

Before choosing architecture: 1. Inspect the current repository, package
manager, framework, dependencies, scripts, and deployment conventions.
2. Preserve the existing stack if it is healthy and suitable. 3. Avoid a
rewrite simply because another stack is fashionable. 4. Review installed
skill guidance and use the browser/testing tools available. 5. Do not
overwrite user work or reset the Git tree.

### Preferred default only if the repository is empty

A reasonable starting point is: - Next.js App Router. - TypeScript. -
Tailwind CSS. - shadcn/ui for selected accessible primitives, customized
to the Velora design system. - A PostgreSQL-backed service for
persistent leads, such as the provider already configured by the
founder. - A maintained validation approach for server and client form
validation. - An email provider only when credentials are available. -
Playwright for browser testing and screenshots. - Motion for React only
when an interaction materially benefits from animation.

This is a fallback, not a requirement to replace a functioning existing
application.

### Component architecture

Separate: - Global layout and navigation. - Design tokens and
typography. - Reusable buttons, fields, labels, and accessible UI
primitives. - Content-driven service and project components. -
Page-specific editorial sections. - Server-side form handling and
persistence. - Protected internal lead management.

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

Requirements: - No horizontal overflow. - Navigation remains usable. -
Text wraps naturally and remains readable. - Buttons and inputs are
comfortably tappable. - Images preserve their intended crop and aspect
ratio. - Desktop-only asymmetry adapts intentionally to smaller
screens. - Form controls and error states remain usable on mobile. - Do
not merely stack every desktop element in its original order if a
different mobile order improves comprehension.

### Accessibility

Target WCAG 2.2 AA practices where practical: - Semantic HTML. -
Keyboard access for all controls. - Visible focus states. - Sufficient
contrast. - Labels and instructions for form fields. - Accessible
validation messages and status announcements. - Meaningful link names. -
Correct heading order. - Reduced-motion support. - No essential
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

Required: - Navigation links route correctly. - Mobile menu opens and
closes accessibly. - CTAs lead to the intended service, portfolio, or
inquiry destination. - Forms validate, submit, persist, and provide
honest feedback. - Portfolio filters, if implemented, actually filter
content. - Accordions, dialogs, and menus have correct keyboard and
focus behavior. - Loading, success, error, and empty states are designed
intentionally. - Links to email/WhatsApp use configured destinations.

Optional: - Subtle hover feedback. - Small scroll reveal effects. -
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

## 16. DELIVERY PLAN

Execute in these phases. Each phase should produce working progress; do
not spend the entire task writing plans.

### Phase 0 --- Repository and asset audit

Deliver: - Framework and package-manager identification. - Existing code
and Git status review. - Installed skill/tool inventory. - Logo asset
inspection and suitability. - Current risks or blockers.

Do not alter existing user work.

### Phase 1 --- Research and design foundation

Deliver: - Short design decision log. - Design tokens for color, type,
spacing, container widths, radii, borders, and focus states. - Proposed
homepage section order. - Selected real UI/UX patterns from
references. - A clear list of rejected generic patterns.

Use the installed design skills and accessible reference tools. Proceed
to implementation after this foundation is sufficiently clear; do not
wait for a separate approval for routine decisions.

### Phase 2 --- Public website

Implement: - Global layout, navigation, and footer. - Home page. -
Services overview and reusable service detail template. - Work index and
reusable project detail template. - Process/about content. - Project
inquiry page. - Privacy page. - Responsive and accessible states.

### Phase 3 --- Backend inquiry workflow

Implement: - Server-side validation. - Persistent inquiry storage. -
Spam/abuse protection. - Honest success/failure states. - Email
notification when configured. - Minimal protected lead console if safe
and practical. - Environment example and database setup instructions.

### Phase 4 --- Polish and quality assurance

-   Review every route.
-   Test responsive widths.
-   Run browser-based tests and capture screenshots.
-   Fix visual hierarchy, layout, contrast, overflow, and cropping
    issues.
-   Check console and network errors.
-   Run lint, type checks, tests, and production build using available
    scripts.
-   Check accessibility and performance.
-   Confirm there are no fake metrics, dead links, placeholder text, or
    exposed private data.

### Phase 5 --- Handover

Deliver: - Working implementation. - README with setup and deployment
instructions. - `.env.example`. - Database schema/migrations and safe
seed data, if applicable. - Test and build results. - A concise summary
of design decisions and material deviations. - Screenshots or a clear
visual QA report. - A list of configuration tasks that genuinely require
founder credentials.

------------------------------------------------------------------------

## 17. ACCEPTANCE CRITERIA

The release is not complete until all applicable criteria are met.

### Brand and design

-   [ ] Official Velora logo is used faithfully.
-   [ ] No checkerboard background is visible as an unintended logo
    background.
-   [ ] The color system is coherent and derived from the supplied
    brand.
-   [ ] The design uses deliberate editorial composition and varied
    section structures.
-   [ ] The page does not rely on generic gradients, floating devices,
    or repeated card grids.
-   [ ] Demo projects are labeled as concepts.
-   [ ] No unverified statistics, testimonials, clients, awards, or
    business outcomes appear.
-   [ ] All production-facing text is intentional and proofread.

### UX and content

-   [ ] Visitors can understand Velora's services without technical
    expertise.
-   [ ] Primary CTA is obvious and works.
-   [ ] Services, portfolio, process, and contact destinations work.
-   [ ] Mobile navigation is usable with keyboard and touch.
-   [ ] Empty, loading, success, and error states are handled where
    applicable.

### Backend and security

-   [ ] Project inquiries are validated on the server.
-   [ ] Successful submissions persist to the database.
-   [ ] The UI never reports a successful submission if persistence
    fails.
-   [ ] Secrets are not hardcoded or exposed in client bundles.
-   [ ] Public users cannot access lead records.
-   [ ] Every admin operation verifies authorization on the server.
-   [ ] Missing email credentials are documented without breaking lead
    persistence.
-   [ ] Privacy notice matches the data actually collected.

### Quality

-   [ ] All required public routes render.
-   [ ] No horizontal overflow at the specified viewport widths.
-   [ ] No broken images, dead links, or nonfunctional buttons.
-   [ ] No serious console/runtime errors during the main user journeys.
-   [ ] Lint, type checks, tests, and production build pass where
    configured.
-   [ ] Playwright or an equivalent browser tool has been used for
    actual rendered verification.
-   [ ] Relevant installed skills have informed implementation and
    review.
-   [ ] Setup and deployment steps are documented.

If a criterion cannot be met because a credential, provider, or external
service is unavailable, implement the safe portion, document the exact
blocker, and never claim the feature is fully operational.

------------------------------------------------------------------------

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
