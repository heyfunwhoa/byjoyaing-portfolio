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

## Page hierarchy adjustments — KRU-150 (proposed)

- Owner: portfolio maintainer. Destinations: `/projects` (`components/projects-directory.tsx`), `/side-quests` (`app/side-quests/page.tsx`), `/ai-academy` (`components/ai-academy/academy.tsx`), `/about` (`app/about/page.tsx`), `/experience` (`app/experience/page.tsx`), and long `/work/*` case-study routes. Status: proposed until review and merge.
- Task: let readers find a project by topic or stage, keep featured independent work ahead of the long tail, and choose a learning path once with enough context to start confidently.
- Reuse existing `ProjectsDirectory` filter controls, public project registry/status labels, learning-path data, tokenized card styles, and native HTML disclosure. Adapt the local filter group to wrap and add a labeled search; keep the six learning paths in an optional disclosure so lesson readers can start directly, and add a jump link to the lesson catalog; put only supporting Side Quest items behind a disclosure. Add one small shared `CaseStudyContents` component because multiple long case pages need the same responsive anchor navigation and disclosure-fragment behavior. No dependency, animation, or imported primitive.
- Use existing brand surface tokens by context: sage groups project controls, mist marks supporting research explorations, and clay appears only inside the expanded personal-interest disclosure. These are existing palette roles, not new brand colors; copper remains for actions and links.
- On `/experience`, remove the expandable `CareerRail` overview because the detailed role-by-role timeline immediately repeats its seven roles. On long case studies, reuse the existing breadcrumb, project kind, status, title, summary, and role/stage facts, then add shared `CaseStudyContents` links to real section IDs. Native disclosure sections already open on fragment navigation; the common contents row wraps on small screens and keeps links keyboard accessible.
- Phone: stacked project selectors/search and one-column path/Side Quest cards. The learning-path disclosure preserves the full descriptions without pushing the lesson catalog below six cards. A keyboard-accessible anchor jumps directly to the lesson tabs. Academy sections use a roving tab stop with Left/Right and Home/End keys, `aria-selected`, and a labeled tab panel. Tablet: existing grid breakpoints; desktop: wrapped filter buttons and three-column learning-path cards. Native inputs, buttons, and `details/summary` preserve keyboard access and visible focus; no motion is added. Search has a polite result count and clear action; the no-match message remains explicit. Loading, network, error, and permission states do not apply to these local collections.
- Verification: `git diff --check` only. Automated tests/build, browser interaction, 375/768/1280px layout, keyboard, and 200% zoom checks remain pending and must be reviewed before merge. Revert the focused page/component changes to roll back.

## Homepage proof-card layout — KRU-150 (proposed)

- Owner: portfolio maintainer. Destination: `/` (`app/page.tsx` and `components/editorial-bento.tsx`). Status: proposed until review/merge.
- Task: help hiring readers scan current and earlier experience, then open the most relevant public evidence directly.
- Adapt the existing Work card/border treatment and `roles` data into three role-proof cards for Truffle Security, Rapid7, and Forcepoint. Link each card to an existing Work section or the Experience timeline. Keep the established three-destination `EditorialBento` and make its descriptions more specific. Remove a third hero link that duplicates the About action. No new component, dependency, animation, or palette is needed.
- Phone uses one stacked column; from 640px it uses two columns with the last card centered at half width; from 1024px it uses three equal columns. Cards use semantic articles/headings, visible 44px links, and the source order Truffle Security, Rapid7, Forcepoint. Cards remain separately clickable only through their explicit links.
- Verification: source review and `git diff --check` only. Local browser, 375/768/1280px viewport, keyboard/focus, and 200% zoom review remain pending. Revert the credibility-grid markup and copy changes to roll back.

## About page section navigation — KRU-150 (proposed)

- Owner: portfolio maintainer. Destination: `/about` (`app/about/page.tsx`). Status: proposed until review/merge.
- Task: help readers jump to the philosophy, working approach, career and education, or tools sections on the long About page.
- Adapt the existing text-link and wrapping-navigation pattern; keep it in normal document flow directly below the orbit hero. Use existing section IDs or add scroll-aware IDs. No sticky behavior, client state, new component, dependency, color, or animation.
- Phone and tablet links wrap; desktop keeps one compact row. Native anchors have descriptive names, 44px minimum height, visible focus, and `scroll-mt-24` destinations. No loading or error states apply.
- Verification: source review and `git diff --check` only. Browser, keyboard, 375/768/1280px viewport, and 200% zoom checks remain pending. Revert the nav and the two section IDs to roll back.

## Case-study and card polish · 2026-10-30

Status: implemented in draft PR #218, not merged. Owner: portfolio maintainer.

- Task: identify a project's destination and personal contribution in /projects, and scan evidence in the shared ProfessionalCaseStudy on /work.
- Reuse/adapt: existing ProjectsDirectory cards and editorial/CaseBandSteps, with the existing sage, ivory and copper tokens. Shadcnblocks case-study/card compositions and Emerald card affordances were references, not source imports. Neither library was installed; no paid block or upstream source copied, no new dependency.
- Cards retain current status, summaries and destinations. The footer names the case study, role has a visible label, hover and keyboard focus both accent the border. Preview/tools stays a native disclosure with a 44px summary target.
- Case-study evidence gets a separate sage surface and long-text wrapping. All five existing fields remain; optional story depth uses the existing native disclosure with a 44px target. No invented outcome, demo destination or screenshot.
- Existing one/two/three-column directory breakpoints retained; evidence spans both columns on wider screens. Reduced motion disables the card transition. No loading or network state added; existing search/no-match recovery retained.
- Delivery tier 1: presentation and accessibility refinement of existing components, not a new template system. No new issue.
- Verification: three isolated React static-render tests passed using synthetic directory data and mocked unrelated components/navigation. They check destination/role, no-match recovery, visible evidence and preservation of all story fields. CaseBandSteps also passed isolated strict TypeScript. These are not browser tests or a full app build. Existing previous-head PR checks do not certify this revision.
- Pending: fresh repository CI and browser review at 375/768/1280px, keyboard native disclosure/focus, contrast, 200% zoom and screen reader.
- Rollback: revert this refinement's two component commits and this record.

## Site-build explanation: proposed adoption, October 29, 2026

Owner: portfolio maintainer. Source/destination: existing components/tools-map.tsx, mounted by About. Adapt the existing native build disclosure and preserve siteHowBuilt and compact mode. Catalog family: disclosure. Four plain-text technology badges and three explanation groups keep the build understandable; no new badge component or status vocabulary. ShieldCN is a grouping reference; Magic UI Pro remains a layout reference only. No third-party source, asset, remote request or dependency added.

Phone/tablet/desktop: existing one/two-column container; badges and links wrap without fixed heights. Native summary and anchors remain keyboard-operable, with global focus styles and 44px summary/link targets. Text stays visible when motion is disabled because no animation is added. Static content has no loading/error/permission state. Public copy claims neither email delivery nor paid-product adoption.

Verification: source reviewed against package.json, toolkit registry and About call site. Full CI and manual viewport/zoom/keyboard checks pending. PR #218 changes parent About layout and PR #223 appends to this adoption document; preserve both at merge. Rollback removes this scoped disclosure expansion and adoption note.
