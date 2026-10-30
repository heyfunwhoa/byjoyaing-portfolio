# Component adoption

**Status:** Decision record for the celestial editorial pass.  
**Date:** 2026-10-11  
**Branch base:** `main` at `4a491b6`. The editorial redesign is already merged. This pass does not revive `feat/editorial-portfolio-experience`.  
**Typography:** [ADR 0001](../decisions/0001-preserve-geist-typography.md)

No new runtime dependency. Geist Sans and Geist Mono stay loaded through `next/font/google` in `app/layout.tsx`.

## Standards already in the site

| Concern        | Rule                                                                                                                                                                                         |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Spacing        | Page column is `max-w-5xl` with `px-5` / `sm:px-8`. Section rhythm is `py-12` / `sm:py-16`. Controls that are tapped use `min-h-11` or `min-h-12`.                                           |
| Type           | Geist Sans for display and body. Geist Mono for technical metadata only. Sizes stay on the ADR 0001 table.                                                                                   |
| Focus          | `:focus-visible` is a 2px copper ring with 3px offset (`--ring`). Do not remove it for a custom glow.                                                                                        |
| Motion         | CSS-only and utility-focused. The existing `.section-enter` remains; navigation adds a short mobile menu reveal, active-link underline and sticky-scroll shadow. Nothing moves continuously. |
| Reduced motion | `prefers-reduced-motion: reduce` sets `animation-name: none` and collapses transition duration. New motion has to remain readable when that rule fires.                                      |
| Color          | Ivory, charcoal, copper, sage, mist, clay. Geometry uses the existing sage and warm paper tones.                                                                                             |

## Adopted as ideas, built here

| Source                    | What was taken                                         | What shipped                                                                     |
| ------------------------- | ------------------------------------------------------ | -------------------------------------------------------------------------------- |
| Vercel Geist and v0       | Density, a calm grid, and the font already in the repo | No `@vercel/geist` package and no v0 template. Layout stays the editorial cover. |
| Magic UI Orbiting Circles | Concentric rings and a few nodes as a metaphor         | `CelestialFrame` and `GeometricMotif` are static SVG and CSS. They do not orbit. |
| Existing bento            | Work as the large tile                                 | Same three tiles, same DOM order. A copper rule and three nodes mark Work.       |

## Customized

| Piece                       | Change                                                                                                                                                                                                                                                       |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `site-header.tsx`           | Mobile menu still hangs at `absolute top-full` with backdrop, Escape, focus return, inert background and scroll lock. The closed panel uses `hidden lg:flex` to align links and profile icons on desktop. Motion remains CSS-only and honors reduced motion. |
| `experience-timeline.tsx`   | Used on `/experience`. The first two roles stay open with every evidence point and the existing related links. Earlier roles open from a button.                                                                                                             |
| `project-constellation.tsx` | Three existing projects. Each edge has a visible sentence. Revenue OS studies are not on the diagram.                                                                                                                                                        |

## Rejected

| Source                                                       | License checked                                                                                                           | Why it stays out                                                                                                                                                                                                                                                                        |
| ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Instrument Serif                                             | Font license is not the blocker                                                                                           | [ADR 0001](../decisions/0001-preserve-geist-typography.md) forbids a new family. A prompt that names Instrument Serif does not override that decision.                                                                                                                                  |
| shadcn/ui                                                    | MIT                                                                                                                       | Accessible primitives are useful later. This pass does not need a dialog, form, or Radix dependency. The menu uses `inert` and a button. A later setup installs the primitives without replacing this menu. See the shadcn section of [component-inventory.md](component-inventory.md). |
| Magic UI Orbiting Circles                                    | Free library is MIT. Pro sections are paid.                                                                               | The component animates continuously and pulls in Motion. A spinning ring reads as astronomy and costs paint on every frame. Bento Grid is the later exception: one registry file, no Motion, kept in the lab demo component and not mounted on the shipped design-lab page.             |
| Motion Primitives                                            | MIT (`ibelick/motion-primitives`)                                                                                         | Components depend on the `motion` package. The site already has the one entrance it needs.                                                                                                                                                                                              |
| React Bits                                                   | Do not paste. Public indexes describe an MIT grant plus a Commons Clause rider. Confirm that file before any future copy. | Wholesale import would add a second visual language and a motion dependency.                                                                                                                                                                                                            |
| Aceternity UI                                                | Free components allow end products and forbid redistributing the component itself. Pro has a separate license.            | Effects are marketing-theme motion. Copying them would fight the editorial system.                                                                                                                                                                                                      |
| Continuous orbit, canvas constellations, fade-to-zero scroll | n/a                                                                                                                       | Reduced-motion and offscreen capture both failed when content started at opacity 0. A canvas diagram would hide the text alternative.                                                                                                                                                   |

## If a later pass copies source

Keep the copyright notice the license requires, pin the file in this guide, and do not add the `motion` package unless a reviewed ADR says the entrance CSS is not enough.

## Work overview: grid browsing (2026-10-13, proposed)

- Owner/destination: portfolio maintainer; `/work`.
- Adapt `components/featured-work-carousel.tsx` with a grid mode using the same card markup and public story data. Catalog: `summaries`. Keep carousel mode for the existing Design Lab example.
- Remove the duplicate category navigation cards. Overview links preserve the three category anchors and all existing case destinations.
- Retain `ProfessionalCaseStudy` / `CaseBandSteps` (`disclosure`): contribution and evidence remain visible; execution and reflection expand with native details. Disclosure is presentation, never authorization.
- Grid: one column on phones, two from 768px, three from 1024px. Natural vertical document scrolling, no drag requirement, scroll interception, sticky overlay or new animation. Links retain keyboard focus and 44px action height. Empty data renders an empty list; current curated input is nonempty. Async/error states do not apply.
- No dependency or third-party source added. Revert the Work grid prop and restore category nav to roll back.

### Component references for future depth

| Reader task                     | Existing/reference pattern                                           | Decision                                                               |
| ------------------------------- | -------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| Compare professional examples   | Local summary cards; https://ui.shadcn.com/docs/components/card      | Grid proposed on Work                                                  |
| Read optional approach details  | Local CaseBandSteps; https://ui.shadcn.com/docs/components/accordion | Existing native disclosure retained                                    |
| Switch genuinely distinct views | https://ui.shadcn.com/docs/components/tabs                           | Candidate; category anchors currently suffice                          |
| Inspect supporting evidence     | https://ui.shadcn.com/docs/components/sheet                          | Candidate only; public-safe content and focus-return review required   |
| Animate a filtered grid         | https://motion.dev/docs/react-layout-animations                      | Reference only; no Motion installation without the existing ADR review |

These references guide selective composition rather than replacing the portfolio with a template. Verification is recorded in the PR; browser/device review is pending.


## About orbit discovery and interaction (proposed, 2026-10-13)

- Source: existing CapabilityOrbit, OrbitArtwork and public capability data. No new dependency or claims.
- Primary home: `/about#how-i-work`, openly displayed after the introduction and guiding philosophy. Removes the former collapsed duplicate.
- Homepage: a compact link below the existing CelestialFrame portrait. Work: a link back to the approach. Neither page mounts a second interactive orbit. Individual case-study pillar labels are deferred until their mapping is reviewed; no inferred tags added.
- Interaction: existing keyboard-operated pillar tabs and center overview; evidence and truthful employer/independent labels preserved. Short selected-line trace and panel entrance; focus/hover highlight. Rings and labels stay stationary. Reduced-motion removes new animations and transitions.
- Mobile: smaller node labels/padding to retain room around the diagram; panels stack below. Desktop: diagram and evidence side by side. No hover-only information.
- Design Lab retains its existing orbit variants as the motion/reference home. Rollback: revert this scoped change. Browser, zoom and keyboard visual verification remain pending supported infrastructure; automated checks are recorded in the PR.


## Work bento disclosure revision (2026-10-13, proposed follow-up to PR #120)

Supersedes the plain Work grid proposal above after user review: the difference was too subtle. `/work` now uses `WorkExplorer`: one wide charcoal Enterprise Sales card and two supporting category cards, with one expandable evidence story at a time. The three long repeated story sections are replaced, not duplicated below the overview.

- Reuses local `BentoGrid` (Magic UI-derived, existing license/adoption record) and installed Radix `Collapsible`. Custom category cards are needed because the local `BentoCard` is link-only; no external source is copied and no package is added.
- Reference review: [Magic UI Bento](https://magicui.design/docs/components/bento-grid), [shadcn Accordion](https://ui.shadcn.com/docs/components/radix/accordion), [Radix Collapsible](https://www.radix-ui.com/primitives/docs/components/collapsible), [Embla](https://www.embla-carousel.com/). shadcn's [MIT license](https://github.com/shadcn-ui/ui/blob/main/LICENSE.md) was checked. Carousel remains in the lab: it is not the primary way to find professional evidence.
- Phone: stacked cards with evidence immediately after the selected card. Tablet: wide lead card and two supporting cards. Desktop: 2:1:1 bento proportions, selected evidence below the cards at full width. No fixed content heights or sideways scrolling.
- Button controls expose expanded state; close restores focus to its card. Original category fragments open their corresponding story on load/hash change. Only one story opens at a time; all may close.
- CSS hover lift and icon tilt; 240ms expand / 180ms collapse; explicit reduced-motion disables all new animation. No autoplay, continuous movement, hidden-on-hover summaries or new data claims.
- New composition is a scoped public adoption proposal; `shadcn-setup.test.ts` allows only `work-explorer.tsx` to use the bento source outside the lab. Other restrictions remain.
- Build and focused lint pass. Browser interaction coverage added for expansion, switching, focus return, fragment links and overflow. Execution is pending supported browser infrastructure; do not claim visual sign-off.

## Page flow review (2026-10-13, proposed)

Task: help a hiring reader understand the person, inspect professional evidence and choose a next step without switching repeatedly between professional and personal content.

| Route | Reviewed flow and decision |
| --- | --- |
| `/` | Keep positioning → credibility → Work-led destination bento → labeled independent example → conversation. |
| `/about` | Reorder to introduction → philosophy → capability orbit → career and compact education → workflow toolkit → evidence destinations → personal interests → contact. Rename toolkit heading to “From approach to practice.” Keep interests on About; omit their repeated professional-connection captions here. |
| `/work` | Keep introduction → professional evidence → related field systems and career context → labeled Side Quest demonstrations. Keep account intelligence and detector coverage visibly separate from employer work, then move the About approach link after the evidence explorer so it does not precede the page's main task. |
| `/experience` | Keep introduction and compact career overview; move the role timeline before optional independent systems; retain the materials invitation last. |
| `/side-quests` | Introduction → selected experiments → browse by focus → other explorations → directory close. Preserve `#look-closer`, remove the duplicate “legacy project directory” link. |
| `/field-notes` | Keep published guides first, optional outlined topics second, related work/private access/contact last. |
| `/projects` | Keep directory and filters before optional system connections and roadmap. |
| `/capabilities` and its detail template | Keep overview → capability choices; details already lead with professional evidence before related projects. |
| `/contact` | Keep purpose and direct links alongside the form; it stacks naturally on smaller screens. |
| `/private-work` | Keep access boundaries before requesting material. No access-control changes. |
| Field Note and `/work/[slug]` detail templates | Retain introductory context/status → guided body/evidence → related work. This pass does not reorder individual interactive lessons or project-specific case bodies. |

Reuse: existing page sections, `CapabilityOrbit`, `ToolsMap`, `CareerRail`, `ExperienceTimeline`, `FeaturedSideQuestStrip`, `WorkExplorer`, and `ProjectStatusPill`. Catalog families: summaries and disclosure. No new component, dependency, motion or upstream source. Source is this repository; owner is the portfolio maintainer. The two demonstrations use the existing public directory registry and are labeled as Side Quests after professional evidence. Status: proposed until review/merge.

Responsive composition: the same section DOM order on phone, tablet and desktop; existing inner grids, tabs and disclosures retain their responsive rules. Keyboard and screen-reader traversal follow section order; durable anchors stay in place. Reduced-motion behavior is inherited without new animations. No new loading, error or permission states. No new test is necessary for static section movement; use existing type/build, page smoke and interaction checks. Verification and unrun manual checks are recorded in the PR. Roll back by reverting this focused commit.

## Single contact form (2026-10-13, proposed)

Reuse `InquiryForm` at `/contact` for all inquiries. Remove the message/request mode switch, optional company field and required focus selector. Keep Name, Email, Message and one Send action. Approved project query parameters prefill an editable message; the submitted text is exactly what the visitor can review. Preserve `#write` and `#access` anchors, honeypot, elapsed-time signal, no-autocapture attribute and server validation/rate limits. Keep one compact reviewed-sharing notice. Existing responsive field grid and focus/motion behavior remain. No dependencies or email backend changes.

Verification: scoped lint, TypeScript, navigation/request tests; updated browser coverage mocks the mail endpoint to verify project context without sending email. Hosted browser checks remain required before merge. Personal interests stay on About; a short Contact invitation is a recommendation, not implemented here.

## Conference connection page — proposed, October 2026

Owner: portfolio / Kristen Aing. Destination: `/connect`.
Reuse `PageMain`, `BrandAvatar` (Leader) and the existing public-profile registry;
adapt the site's semantic anchor/action styling. No lab primitive import, new
runtime dependency, animation, carousel or modal is needed for one explicit link.
Phone, tablet and desktop use one centered column, max-width 28rem, wrapping copy
and a minimum 48px main action. Native anchor keyboard behavior and global focus
styles apply. The page is static; loading, form, error and permission states are
not applicable. Private material remains outside this journey.

The QR contains only `https://www.byjoyaing.com/connect`; query parameters cannot
choose the LinkedIn destination. Scanning grants no access and verifies no identity.
The visitor sends a request on LinkedIn; Kristen reviews it there. LinkedIn/app
sign-in behavior remains outside this site's control. No contact download or
connection action happens automatically.

`/connect` suppresses PostHog initialization on direct entry and events after
client navigation. Its response disallows framing, forms, object embeds and
cross-origin script connections; the outbound link suppresses referrer sharing.
This is a scoped CSP, not a complete site-wide script policy. Hosting access logs
may still exist; do not claim anonymous or zero-data hosting. Existing site footer
and navigation remain. No private access/authentication logic is changed.

QR assets: `public/connect/qr.svg`, `qr.png`, `conference-card.png`. Regeneration:
`scripts/qr/generate-connect.py` uses offline ReportLab and Pillow, not a QR SaaS.
Maintain four-module white margin; no logo overlays. Print the visible domain and
inspect physical cards for replacement stickers. Protect domain, GitHub, hosting
and LinkedIn accounts with MFA; account settings were not audited or changed.

Verification: production build, lint/typecheck and unit tests; independent ZXing
QR decode of both PNG assets, plus visual review of the card. Browser installation
returned corrupt archives, so viewport, keyboard, mobile app handoff, real-device
scan and 200% zoom remain manual release checks. Automated browser coverage is in
`tests/site/connect.spec.ts` but must run in a working browser environment. Do not
print/distribute until the route is deployed and a real-phone scan is verified.
Rollback: revert this focused PR and retire any distributed QR assets if needed.

## Context navigation (2026-10-13, proposed)

- Task: orient a reader arriving directly at a nested lesson, lab, case or capability and offer predictable parent links.
- Reuse/adapt `components/collection-breadcrumb.tsx`; add the small `AcademyBreadcrumb` composition. No dependency, URL migration, browser-history button, fetch, animation or new client directive.
- Destinations: all 12 current Academy lesson/lab routes across `/ai-academy` and `/builder-academy`, capability details and the storytelling guide. Existing Work/Side Quest and Field Notes trails retain their collection-aware behavior. The Design Lab Navigation section demonstrates the deeper Academy trail.
- Parent pages: `/ai-academy` is the Academy home; `/ai-academy/playground` is the practice hub. `journeys`, `devops`, `dependencies` and `/builder-academy` have no index page, so do not manufacture links to them. Exercise progress is not page hierarchy; keep step indicators separate. Planned lessons receive no Next links.
- Phone/tablet/desktop: same compact, wrapping list; long labels may wrap, no horizontal rail or sticky overlay. Actual links have a minimum 44px height, with existing focus styles, semantic nav/ordered list, decorative separators and one non-linked current-page label. No motion means reduced-motion remains unchanged. Async/error/loading states are not applicable to static navigation.
- Workbench availability is not deployment evidence. Automated build and browser evidence belongs in the PR; real-device and manual 200% zoom review remain separate. Revert call-site additions and the Academy wrapper to roll back.
- Owner: portfolio maintainer. Future lesson integration should reuse this composition; use explicit known parents, never split a URL into guessed links. Top-level About/Contact pages do not need a redundant breadcrumb. Filter persistence and previous/next lesson sequencing are separate work.


## Academy navigation foundation — 2026-10-13

Reuse the existing Academy card, native disclosure, track selector and lesson selector in `components/ai-academy/academy.tsx`; adapt the existing learning-path buttons into ordered steps and previous/next navigation. Keep `AcademyBreadcrumb` and its shared collection trail unchanged. Resource cards remain server-rendered in `app/ai-academy/page.tsx`. No new dependency, animation or parallel badge system: availability uses plain text because existing project-status badges have different semantics.

The primary task is choosing an appropriate entry point, reading a lesson and reaching its existing practice. Phone/tablet use the existing lesson select; desktop retains the sidebar. Path steps stack on phones and use two columns from the small breakpoint. The lesson heading receives focus on navigation; buttons have accessible names and a minimum 44px height. Native disclosures preserve keyboard behavior. Existing global reduced-motion behavior applies, with no added motion.

Verification: metadata integrity and navigation browser regression tests added for desktop/tablet/mobile, keyboard activation, focused headings, separate reviewed/check state, independent builder entry and planned resources. Local lint, unit tests and production build pass. Browser installation locally is blocked by truncated download archives; PR CI must verify browser behavior before merge. Manual zoom/reflow and real-device checks are not claimed. Mission extension points and remaining scope are recorded in `docs/academy/MISSION-HANDOFF.md`.


## Academy check results — lab prototype (2026-10-13)

- Owner: portfolio maintainer. Destination: local `/design-lab`, `components/design-lab/learning-checks-preview.tsx`. Status: proposed lab prototype; no public Academy adoption.
- Task: inspect unanswered, mixed/retry and passed feedback before integrating a learner-facing result summary.
- Adapt existing `components/academy/follow-one-click.tsx` semantic radio/disclosure patterns; reuse `lib/academy/click-mission.ts` questions, IDs and `recordAnswer` scoring. Catalog families: forms and disclosure. No parallel scoring, credential or course registry.
- Fictional preview attempts remain in component memory. No storage, network, code execution or reading acknowledgment mutation. Correct-check totals remain separate from reading reviewed status.
- Existing card/border/muted/accent tokens. One wrapping column at phone/tablet/desktop sizes; native radio arrow keys and disclosures, unique group name, polite result announcement, 44px labels/actions. No motion; reduced motion unchanged. Empty/unattempted, retry and success are explicit. Loading, denied and server-error states do not apply.
- No imported third-party code, package, version or attribution obligation added. Hirael/Seam remain reference candidates, not installed libraries.
- Verification: isolated TypeScript, esbuild and React/JSDOM interaction checks passed for all three states, keyboard radio movement, reading-state separation and unchanged saved progress. Full repository checks, 375/768/1280px browser review and 200% zoom remain pending; browser installation returned corrupt archives.
- Production Design Lab 404 gate is retained. Roll back by removing the preview import/mount and file. Do not mount it publicly as real learner progress.

## Site-build explanation: proposed adoption, October 29, 2026

Owner: portfolio maintainer. Source/destination: existing components/tools-map.tsx, mounted by About. Adapt the existing native build disclosure and preserve siteHowBuilt and compact mode. Catalog family: disclosure. Four plain-text technology badges and three explanation groups keep the build understandable; no new badge component or status vocabulary. ShieldCN is a grouping reference; Magic UI Pro remains a layout reference only. No third-party source, asset, remote request or dependency added.

Phone/tablet/desktop: existing one/two-column container; badges and links wrap without fixed heights. Native summary and anchors remain keyboard-operable, with global focus styles and 44px summary/link targets. Text stays visible when motion is disabled because no animation is added. Static content has no loading/error/permission state. Public copy claims neither email delivery nor paid-product adoption.

Verification: source reviewed against package.json, toolkit registry and About call site. Full CI and manual viewport/zoom/keyboard checks pending. PR #218 changes parent About layout and PR #223 appends to this adoption document; preserve both at merge. Rollback removes this scoped disclosure expansion and adoption note.

## Systems Engineering illustrations · 2026-10-30

Owner: portfolio maintainer. Status: draft implementation, not merged or deployed.
Destination: /ai-academy/systems, components/academy/systems-illustrations.tsx.

- Task: give readers three concrete visual entry points before the existing planned module outlines. Reuse the page's figure/card conventions, responsive grid and canonical ivory/charcoal/copper/sage tokens. No new interaction or template system.
- References: https://devl.dev/illustrations/webhook-relay, https://devl.dev/illustrations/server-rack and https://devl.dev/illustrations/shield-lock. Their pages identify MIT licensing and Motion dependencies. Webhook registry source was inspected at https://devl.dev/r/webhook-relay.json; downloaded JSON SHA-256 29fd06f44e8266853bf5e242874182345efe07bc3b0dedf438b1b3672875a8ac. The web reader could not retrieve the registry but a subsequent HTTP download succeeded.
- Decision: original, static SVG interpretations of these concepts, not imports or copies of devl code/assets. No Motion, Base UI, registry installation or additional package. No upstream source copied, so no copied-code license notice is introduced.
- Webhook scene explains source/relay/receivers, bounded retries and duplicate-event handling; receipt does not establish downstream completion. Server scene is explicitly a metaphor for API/worker/database roles. Access scene distinguishes authentication from authorization and states that enforcement belongs on the server.
- Illustrations are explicitly examples, not telemetry, security results, a scanner or working infrastructure. Planned modules/labs retain their existing labels and content.
- Phone: all figures stack; SVGs scale to the container. Tablet: webhook image/caption sit side by side. Desktop: webhook spans the row, with infrastructure/access cards below. No fixed text heights or fixed-width SVGs.
- Decorative SVGs are aria-hidden and non-focusable; all meaning is in visible HTML captions. No hover-only information, timers, autoplay, animation, motion package, network request, persistence or controls. Reduced motion therefore shows the same complete content. Loading/error/permission states are N/A.
- Delivery tier 1: isolated illustrative presentation addition, not a new Academy lesson journey. No new Linear issue.
- Verification: isolated strict TypeScript, Vite/Tailwind component build, and static React render check passed (three figures/SVGs and visible explanatory/scope text). Full repository CI and actual route browser review pending, including 375/768/1280px, 200% zoom, contrast and screen-reader reading order.
- Rollback: remove the page import/mount and component. No data migration. Preserve independent append-only adoption notes from other drafts.

## Interactive systems examples · KRU-168 · 2026-10-30

This supersedes the static-only scope above for the two selected examples. Status: implemented in PR #225, not merged. User explicitly approved this narrow extension; the other planned labs remain planned. Delivery tier 2, baseline tier A. Tracking: https://linear.app/krusty/issue/KRU-168

- Existing WebhookScene and access illustration are reused inside the same component. New pure fixture logic lives in lib/academy/systems-demo.ts. No third-party source copied, additional package, real webhook, auth check, model call, timer or persistent state.
- Explicit advance controls teach initial failure, backoff, successful retry and repeated delivery of demo-001. Business actions stay at one across duplicates. Reset restores all counters. The middle receiver changes from a waiting symbol to a check; the illustration remains decorative and the complete state is visible in text.
- Native radio group distinguishes simulated 401, 403 and 200 outcomes. Every explanation states the relevant identity/record-permission scope. No real permissions change. Page reload resets both examples.
- Existing verified routes /ai-academy/journeys/follow-one-click and /ai-academy/programming provide next learning steps. No new catalog or private source publication.
- Buttons and radio-label targets are at least 44px; status regions announce changes. Focus stays on the activated control; radio keys are native. No animation, autoplay, delays or hover-only content. Existing responsive layout retained.
- Verified locally: four node tests for transitions, repeated duplicate suppression, initial fixture immutability and distinct access outcomes; isolated strict TypeScript and Vite/Tailwind component build. Added tests/site/systems-illustrations.spec.ts for real-route keyboard, reset, repeated duplicates, access choices, links and overflow at 375/768/1280px.
- Browser execution remains pending: local Chromium installation failed with a corrupt/empty archive. Prior static head 2bc24ebb5547cc324c27abb182e28e9631dbaa6d passed CI, Security scans, Semgrep and bounded Visual QA; those results do not certify this new interaction.
- Full current-head CI and manual zoom/contrast/screen-reader review required before release. Rollback this interaction commit to retain the prior static figures.


## Explanatory systems graphics · KRU-168 · October 29, 2026

Extends PR #225 after user approval. Adapt the existing systems component, state helper, semantic lists and card tokens; no third-party source, new package or motion. Destination remains /ai-academy/systems. The webhook gains an ordered delivery timeline with explicit Upcoming/Current step/Completed text and aria-current. The access illustration becomes a branching HTML decision diagram reflecting the existing radio choice, with a textual Selected outcome marker. Infrastructure becomes a labeled API → worker → database example, explicitly one possible flow. No new app or simulated production telemetry.

Phone: vertically stacked steps and decision branches. Tablet: access branches may sit side by side; at narrower desktop card widths they stack again. No fixed text heights, canvas or SVG text. Native controls and polite status regions retain keyboard behavior; diagram updates add no live regions or motion. Extend existing route tests to assert timeline and selected branch states at all existing widths. Prior commit dcf39d4 passed full CI (206 browser tests passed, one skipped) and manual interaction review; new-commit checks pending. Manual zoom, contrast and screen-reader review remain separate outstanding checks. Rollback this graphics commit to restore prior illustrations and controls.
