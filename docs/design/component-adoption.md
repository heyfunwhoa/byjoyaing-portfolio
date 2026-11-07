Warning: truncated output (original token count: 18224)
Total output lines: 454

# Component adoption

## Marketing and sales outlines in Field Notes (November 2026, proposed)

- Owner: portfolio maintainer. Destinations: `/field-notes#marketing-playbooks` and `/field-notes#sales-playbooks`.
- Reuse: the existing Field Notes card grid and native `details`/`summary` pattern, catalog `disclosure`. Keep purpose visible; expand only supporting outline fields. The existing markup is extracted into `components/field-notes/playbook-outlines.tsx` for both collections; no new component family, dependency, animation or third-party source. Sales adds optional advance/pause fields and project links using the same tokens.
- Composition: one column below 768px, two above; expanded cards keep natural document height and source order. Existing tokens and `min-h-11` controls remain. Each summary has a distinct accessible name and explicit focus outline. Project links have 44px minimum height, visible focus and natural wrapping; private repositories use public portfolio overviews.
- Keyboard: native Enter/Space activation and Tab order. No dialog, focus trap or escape/return-focus contract. No new motion; disclosures also work without client JavaScript. Loading/error/permission states are not applicable to authored public content.
- Status: implemented on the proposed branch, pending publication review. Browser/build evidence and manual-review limits belong in the PR. See [editorial scope and acceptance](../product/marketing-playbook-outlines.md).
- Rollback: remove the sections, shared presentation and their data imports. Existing guides and routes remain independent.

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
- Parent page…6224 tokens truncated…cts builder portrait with the existing orbit-study-01.svg through OrbitStudyIllustration. Add a projects variant to that shared component; retain the existing 8rem mobile / 12rem desktop container and Builder / Side Quests caption. This is decorative supporting artwork, not a visualization of live data. Empty alt and aria-hidden, intrinsic square sizing, no focus target or animation. No new asset, dependency, interaction or content claim. Tier 1 isolated presentation change; no new tracking issue. CI and preview review are recorded in the PR. Rollback restores the BrandAvatar import and mount on /projects.


## Distinct collection header illustrations · 2026-10-30

Supersedes the Projects orbit selection above after owner review. Projects uses three connected nodes for systems; Field Notes uses stacked geometric planes for accumulated ideas; Side Quests uses a branching path for exploration. Original repository-native SVGs in public/brand/page-art, using existing charcoal/copper/sage/clay tokens, transparent backgrounds and a shared 1024-square canvas. No third-party art, new dependency, animation, diagram semantics or live-data claim. The joy. site mark and About orbit are unchanged.

Adapt the existing OrbitStudyIllustration wrapper and retain its exported name for compatibility. Existing page containers handle phone/tablet/desktop scaling. Decorative empty alt, aria-hidden and no focus target. Update existing SVG safety checks for the new sources. Tier 1 static presentation refinement to PR #227; no new interaction or tracking issue. Preview and CI evidence in the PR. Rollback restores the wrapper's prior artwork sources.


## Remaining page artwork review · October 29, 2026

Source review covered non-home page routes and the relevant Academy, connection-card and case-study wrappers. Main page excluded. Experience and Builder Academy were the remaining general headers repeating BrandAvatar: replace those mounts with milestone-path and open-book variants of the existing decorative wrapper. Original static SVGs; existing palette, intrinsic dimensions, responsive containers and captions retained. No data claim: the path is a career metaphor, not dates or performance; the book is learning decoration. Empty alt, aria-hidden, no focus target, motion, dependency or network integration. Tier 1 presentation refinement, no new tracking issue.

Keep About's orbit, text-first Work/Contact/Capabilities/Private Work, personal connection-card portraits, and explanatory diagrams in Academy lessons and case studies. Do not add competing decorative visuals to task-focused pages. This was a source audit, not a full visual/accessibility audit of every route. Updated inventory to reflect current treatments; extended existing SVG safety coverage. Built Experience/Academy preview and CI evidence are recorded in the PR; manual device/zoom checks remain separate. Rollback restores the two BrandAvatar mounts and removes the two source mappings.

## Supporting-page breadcrumbs (2026-10-30)

Tier 1 completion of the existing context-navigation pattern; no new routes, hierarchy subsystem or dependency. Reuse CollectionBreadcrumb on Projects (Side Quests), Experience and Capabilities (Work), Builder Academy (Side Quests), the public research brief (Side Quests), Builder Guide (Home), and the private-work information page (Field Notes, matching its prior return link). Extend Academy and capability detail trails with the same collection parents. Existing case/Field Note trails remain. Primary navigation destinations and standalone connection cards do not need duplicate trails; redirects, editor, prototype and gated Design Lab are excluded.

Same wrapping ordered list at phone/tablet/desktop, native keyboard links with 44px targets, existing focus/token styles, one non-linked current-page label and decorative separators. No motion, loading logic or authorization change. Research failure view retains a way out. Added browser coverage for direct entries, filtered Projects, parent keyboard navigation and no duplicate trails. CI and preview checks pending. Rollback: revert these call-site additions and parent extensions. Owner: portfolio maintainer.

## Directory return context and lesson sequence verification

Extend PR #230 with a bounded navigation refinement: ProjectsDirectory includes only category, stage and search in case-study links. WorkCaseBreadcrumb composes a separate contextual return link under Suspense. The real collection hierarchy remains stable. A reload or new tab retains the context; direct case entry shows no stale return. The target is always /projects#directory with encoded filter values, never a supplied redirect URL. No storage, network service or dependency.

The Academy already provides Previous/Next within its learning-path sequence and moves focus to the selected lesson heading. Retain it; add a keyboard round-trip check instead of inventing a sequence across unrelated standalone labs. Keep wrapping breadcrumbs on small screens because all parents remain usable without opening a menu. Existing subtle link nudge respects reduced motion.

Verification: new production-browser cases cover return after reload, encoded search, fixed local destination, no stale direct-entry context and lesson keyboard navigation. Fresh CI pending. Phone/tablet/desktop use the same native link, 44px target and global focus styles. Rollback removes the new return component and directory query context. Tier 1 refinement of existing navigation; no new tracking issue.

## Simplified case navigation (supersedes separate return link above)
Adapt the shared breadcrumb into Home / Projects / title for directory cases. Projects is the single top-level return action, preserving encoded category, stage and search only when from=projects. Direct entry returns to the full directory. Remove the duplicate contextual back link. Retain collection trails for non-directory cases.

Reuse the existing related-work footer for Previous/Next in directory result order. Share the exact directory matching function; preserve filters in both directions and reloads. Hide the sequence for direct entry, one/no matching result, an unmatched current case and absent endpoints. No wraparound. Phone links stack; tablet/desktop use two columns with wrapping labels, native keyboard links, 44px targets and existing focus styles. No extra motion or dependency. Academy retains its existing sequence.

This is a bounded refinement in PR #230. Browser coverage checks contextual breadcrumb reload/return, direct-entry/local destinations and filtered previous/next keyboard round trips across desktop/tablet/mobile. Manual zoom and screen-reader checks remain unclaimed. Rollback restores the previous return component and removes sequence/filter helper changes.

## Frontend lesson pilot — adapt existing components (KRU-176 / KRU-177)

- Pattern/source: `components/ai-academy/guided-programming-lesson.tsx`, `components/ai-academy/cms-lab.tsx`, and the native controls in `components/ai-academy/academy.tsx`. Catalog entry remains `frontend-building-blocks` in `lib/ai-academy.ts`.
- Destination: one call site in `components/ai-academy/academy.tsx` for that slug, rendered by `components/ai-academy/frontend-lesson.tsx`. Content lives in `lib/academy/frontend-lesson.ts`. No Keystatic record added.
- Decision: adapt. A pinned Fumadocs UI 16.17.9 trial was built on an uncommitted route and then removed. `Steps` only supplies `fd-steps` markup. Choice feedback, reset, local notes and lesson selection stayed native. Measured evidence is in [the frontend pilot note](../academy/FRONTEND-PILOT.md).
- Dependency: none added. The trial's lockfile entries were not kept.
- Tokens: existing border, card, accent and focus styles. No motion.
- Phone, tablet and desktop: one reading column inside the existing lesson panel. The catalog sidebar remains from `lg`. Section links wrap, including their labels. The example source scrolls inside its box. Choices stack. Targets use at least 44px.
- Keyboard and states: in-page links, buttons, labeled radios, visible focus, polite feedback, explicit reset, optional rubric disclosure. No loading or network state. Correct choices do not mark the lesson reviewed.
- Status: implemented for this lesson, pending review. Not a general renderer and not shipped.
- Rollback: remove the conditional mount and the two new lesson files. The catalog record stays.

## visx visualization candidates · October 29, 2026

Status: proposed catalog and brand guidance only. Owner: portfolio maintainer. No chart component, runtime package, public route or consuming-repo code is added.

- Source: https://visx.airbnb.tech/gallery and https://github.com/airbnb/visx/tree/master/packages/visx-demo/src/pages. Official source inventory confirms horizontal bars/stacks, heatmaps, trees, brush and XY chart examples. Upstream is MIT; no upstream code or assets copied in this change.
- Destination: existing lib/component-options.ts catalog and section 11 of docs/brand/brand-system-v1.md. Reuse existing catalog filtering/card/table rendering; add four Candidate entries, not another component registry.
- Decision: adapt the structures as recommendations. Existing local primitives and semantic tables remain first choice. No visx dependency or shared package is introduced.
- Read portfolio brand guide, workbench reuse contract, inventory, lab and adoption records. Consumer README audit: Atlas extracts pinned source facts and does not run live credential checks; Market Map is evidence-linked and permits unknowns; Account Signal is a seller desk; Revenue OS is a deterministic synthetic planner. These README observations are not verification of every consumer UI.
- Portfolio PR #223 already proposes feedback theme bars. Reuse/review that work before any new bar implementation. Other existing portfolio UX drafts are not modified.
- Candidate IDs: visx-comparison, visx-coverage, visx-trend and visx-hierarchy. Destination mapping and data prerequisites are in the catalog and brand guide. No consumer rollout is claimed or committed by this note.
- Responsive, keyboard, reduced-motion and data-state requirements are specified in the brand guide. Existing lab controls are unchanged. New chart browser/contrast/screen-reader testing is not applicable until implementation; this does not certify the current lab.
- Delivery tier 1: bounded catalog/editorial addition without new interaction, integration, architecture or brand fundamentals. No new Linear issue. Actual consumer implementations must inspect local instructions, current source and open work and apply their delivery governance.
- Verification: targeted catalog tests run locally; full app build, complete test suite and browser review not run. CI must be reviewed on the PR. Rollback removes the four candidate records and these guidance additions, preserving independent adoption notes.

## External UI pattern candidates · 2026-10-30

- Caliper Scene Story is a reference for chapter-based learning and onboarding. Rebuild the pattern with native scroll, clear chapter navigation, complete text without illustrations, and responsive stacking. Do not copy the Pro source.
- Prestige’s illustration examples are a reference for labeled workflow stages and decision paths. Use project-authored SVG/CSS and keep explanations readable in the page. The Academy Systems page already uses original illustrations and synthetic, local interactions.
- Candidate entries are tracked in the existing workbench catalog, not installed components. Cross-project suggestions are starting points only; each repo needs a local source and open-work review before implementation.

## About work and writing emphasis (proposed, 2026-10-30)

- Destination and owner: `/about`, portfolio maintainer. Approved copy connects content marketing to buyer insight, clear messaging, practical resources, and enterprise selling. Existing professional and independent evidence labels remain in place.
- Reuse: the current About section flow, `CapabilityOrbit`, `ToolsMap`, native disclosures, and text-link rows. Two compact illustrative guide links reuse titles and use-when copy from `fieldNoteBodies`; no new content schema, component library, dependency, or animation is added. Professional Work remains before the independent experiments destination.
- Presentation: existing site-build technology chips and explanatory cards move inside the existing Build notes disclosure. The shorter summary stays visible. Orbit-only hero art and compact personal interests with Lucide symbols are preserved.
- Responsive and access behavior: guide rows wrap in one column; the three broader destinations stack on phones and use three columns from 640px. Native links and summaries retain visible focus and at least 44px action height. Document and keyboard order match; reduced-motion behavior is inherited. These static, validated records have no new loading, error, or permission states.
- Verification: retain the About viewport, motion, and keyboard matrix from PR #231, updating its closing-link expectation for the approved CTA. Current CI and preview evidence belong in PR #219. Manual browser zoom, assistive-technology, and real-device review must be recorded separately. Status remains proposed pending human review; rollback is the scoped About copy and presentation diff.

## About brand alignment and school marks (proposed, 2026-10-30)

- Owner/destination: portfolio maintainer, `/about` education. Reuse the existing semantic education list and the local SVG/`next/image` approach from `ToolkitLogoGrid`; adapt the presentation for complete university wordmarks, without its tool states or external links. No new component, schema, library, motion, or integration.
- Assets: complete official UT Austin and current WGU university marks. Local source files and provenance are in `public/logos/education/`. Original colors and proportions remain within the marks; they do not become joy. palette tokens. The visible institution, degree, and in-progress wording remain unchanged. Name matching uses the institution text, not editable list position; unmatched learning entries remain text only.
- Composition: two school columns from 640px, stacked on phones; unmatched credentials span the row. After owner review, use compact 128px UT and 104px WGU widths in 48px-high wrappers, with 4px below each mark and 12px between rows. Retain horizontal clear space, intrinsic proportions, and readable credential text. Empty alt and an aria-hidden wrapper prevent repeated school announcements. No new keyboard targets, motion, loading interaction, or authorization state.
- Brand sync: both brand documents now use the same Strategist definition as the capability data; the canonical guide locates content marketing within revenue/GTM practice and records the current About flow. The avatar guide and implementation reference agree with the orbit-only About and current collection artwork.
- Verification: inspect actual rendered logo loading, proportions, readable adjacent text, and the existing About viewport/motion matrix. Exact commit CI and preview evidence are recorded in PR #219; actual zoom, real devices, and screen readers remain separate reviews. Proposed pending human review. Rollback removes the two marks and restores the existing text-only education list.

## Home and About as connected pages (proposed, 2026-10-30)

- Reader task: Home establishes identity and professional credibility, then routes to relevant evidence. About explains background, values, working approach and learning, with optional personal context near the end. Shared identity/philosophy is intentional; the deeper supporting content differs.
- Keep the established section order and visual distinction: Home's dark hero/portrait and concise proof cards; About's quieter orbit, expanded approach, education, tools, writing and personal disclosure. Shorten Home's body to its existing opening sentence and replace the cryptic independent-project aside with plain scope language.
- Reuse About's existing on-page link pattern for Work & writing and give the section a durable anchor, named heading and scroll offset. Flex wrapping, native links and existing focus styles apply at all widths; no new motion, route, component or interaction dependency.
- Synchronize the current five-part Home sequence in the canonical guide and homepage design note. AGENTS and the PR template now require reviewing page purpose, entry/next destinations, appropriate repetition, reading order and calls to action together.
- Verification: compare the rendered Home/About openings and click Home → About → writing evidence, plus the primary Home → Work path. Exact commit CI/preview evidence belongs in PR #219. Real-device, screen-reader and actual zoom review remain separate. Rollback restores the small copy/anchor changes; preserve the page-flow review rule unless the user changes that preference.

## AWS practitioner certification badges (proposed, 2026-10-30)

- Owner/destination: portfolio maintainer, `/about` education. Extend the existing name-matched local-image pattern for AWS Certified Cloud Practitioner and AWS Certified AI Practitioner. Split the existing combined credential line into two editable education entries; keep the current string-array schema and school sizing.
- Assets: original official 600px RGBA PNGs from AWS-issued Credly badge pages, replacing the opaque marketing exports at the owner's request. True alpha transparency lets the page surface show around each badge; source bytes are unchanged, without cropping, recoloring, redrawing, or CSS blending. Source links, checksums, AWS mark ownership, and display boundaries are in `public/badges/README.md`. No new package, account integration, personal verification URL, issue/expiry date, or Early Adopter designation.
- Composition: each 80px image sits beside readable 14px credential text beneath the schools. The existing grid gives the badges two columns from 640px and stacked rows on phones. Preserve source transparency and clear space. The certifications remain identified as Foundational.
- Accessibility/state: empty alt text and an aria-hidden image wrapper avoid repeated announcements; the visible credential names carry the meaning. No new links, focus targets, motion, or asynchronous interaction. Other learning entries retain their text fallback.
- Verification: downloaded source files have RGBA mode, alpha range 0–255, and transparent outer corners. Existing About editorial validation plus current-head CI and the About viewport/motion matrix cover the page. Inspect actual badge loading, transparent edges against the page surface, dimensions, adjacent text, and overflow in the preview. Manual device/zoom/screen-reader checks remain separate. Tier 1 scoped presentation refinement; no new tracking issue. Rollback removes the two badge mappings/assets and restores the prior combined credential line.


## Competitive Intelligence case: mobile workflow stage selector (2026-11-03)

- **Owner / destination:** `byjoyaing-portfolio`, `/work/competitive-intelligence-engine#workflow`, existing `components/competitive-intelligence-workflow.tsx`.
- **Task:** Five horizontal stage tabs become truncated on iPhone; the third tab is cut off, hiding later stages. The nested competitive brief has the same narrow-screen risk.
- **Reuse:** Adapt the repository's existing native-selector-on-mobile pattern (Projects filters) without adding a new dependency or changing the simulated workflow data.
- **Phone (< 1024px):** One full-width labeled select shows the numbered current workflow step and permits direct access to all five steps. The desktop tablist is hidden at these widths. For brief subsections, use the same labeled select below 1024px. Preserve stage state, panels and privacy boundaries.
- **Desktop:** Keep the existing vertical tab navigation and keyboard Arrow/Home/End behavior at 1024px and above. Brief tabs stay horizontal from 1024px.
- **Accessibility / status:** Native selects provide keyboard, screen-reader and touch semantics with minimum 48px height. Existing tabpanel relationship and all source/evidence labels remain. No new motion, data persistence or network actions.
- **Verification:** `tests/site/competitive-workflow-mobile.spec.ts` covers 320/375/640px stage selection, nested brief selection and page-width overflow, plus desktop keyboard navigation. Exact-head CI, real-device observation, 200% zoom and screen-reader checks must be recorded before merge.
- **Rollback:** Revert this PR's workflow and test change. No database or public route changes.

### Architecture expansion follow-up (same case-study review)

The owner also reported that expanding Architecture looked cramped on desktop. The previous responsive composition put four dense stage cards in one horizontal row from the `lg` breakpoint, plus redundant arrow graphics. This gave the stages insufficient width to read.

- **Decision:** Reuse semantic ordered-list and card patterns already in the portfolio. Keep the existing four stages, all nodes, their status badges, descriptions, and planned-vs-built distinction. Replace the arrows with visible `01–04` stage numbers.
- **Phone/tablet/standard laptop:** One readable column. **Wide desktop (1280px and up):** Two-column, two-row layout with source order preserved, not four narrow columns.
- **Accessibility:** Logical DOM order, semantic `ol`, visible headings, non-interactive cards, no hidden essential content or motion. The parent Architecture disclosure keeps native keyboard operation.
- **Verification:** The browser spec checks 320, 375, 768 and 1280px, ordered headings, responsive placement and page overflow. Manual 200% zoom, real-device readability and screen-reader checks remain release gates.
- **Rollback:** Revert the architecture component along with this draft PR. No route, data or dependency changes.

## Page jobs (2026-11-07)

- **Owner / destination:** portfolio maintainer. Home, Work, Field Notes, Side Quests, `/ai-academy`, and project pages at `/work/[slug]` plus `FieldAssetCase`.
- **Task:** Each area does one job. Side Quests introduces independent projects and the way into Builder Academy. Project pages explain the problem, the contribution, and one example before status.
- **Reuse:** Existing `PageMain`, bento tiles, collection links, `SampleRecordView`, and `CaseStudyContents`. `ProjectStoryLead` groups three existing fields. No new dependency, motion, or navigation item.
- **Phone / tablet / desktop:** Sections stack in source order. The Academy link and contents links keep a 44px target and the existing underline focus style. Side Quests stays current in the header on `/ai-academy` and `/builder-academy`.
- **States:** A project without a saved sample uses the existing field note or smallest-version sentence. Academy lessons stay on their current routes.
- **Verification:** `lib/page-jobs.test.ts` and the Side Quests active-state assertions in `lib/site-nav.test.ts`. Browser checks belong with the pull request. Manual zoom, real devices, and screen readers remain separate.
- **Rollback:** Remove the Academy section, restore the previous openers, and stop rendering `ProjectStoryLead`.

## Game-like workflow prototypes (November 6, 2026)

Local Design Lab only: reuse BentoGrid/Card/ProjectStatusPill and catalog data for exploration, installed React Flow 12.12.0 for an optional learning-path graph, and native controls for practice checks. New MissionWorkspace models four fictional self-reviewed deliverables; editing clears review. No package changes, public mounts or changed canonical lesson records. See [gameful-adoption.md](gameful-adoption.md) for source decisions, responsive/motion behavior, verification requirements and rollback. KRU-150 owns portfolio adoption; KRU-147 owns the GTM consumer. Status: implemented prototype, pending acceptance.
