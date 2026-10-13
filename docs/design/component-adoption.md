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
| `/work` | Keep introduction → professional evidence → related field systems → career context. Move the About approach link after the evidence explorer so it does not precede the page's main task. |
| `/experience` | Keep introduction and compact career overview; move the role timeline before optional independent systems; retain the materials invitation last. |
| `/side-quests` | Introduction → selected experiments → browse by focus → other explorations → directory close. Preserve `#look-closer`, remove the duplicate “legacy project directory” link. |
| `/field-notes` | Keep published guides first, optional outlined topics second, related work/private access/contact last. |
| `/projects` | Keep directory and filters before optional system connections and roadmap. |
| `/capabilities` and its detail template | Keep overview → capability choices; details already lead with professional evidence before related projects. |
| `/contact` | Keep purpose and direct links alongside the form; it stacks naturally on smaller screens. |
| `/private-work` | Keep access boundaries before requesting material. No access-control changes. |
| Field Note and `/work/[slug]` detail templates | Retain introductory context/status → guided body/evidence → related work. This pass does not reorder individual interactive lessons or project-specific case bodies. |

Reuse: existing page sections, `CapabilityOrbit`, `ToolsMap`, `CareerRail`, `ExperienceTimeline`, `FeaturedSideQuestStrip` and `WorkExplorer`. Catalog families: summaries and disclosure. No new component, dependency, motion or upstream source. Source is this repository; owner is the portfolio maintainer. Status: proposed until review/merge.

Responsive composition: the same section DOM order on phone, tablet and desktop; existing inner grids, tabs and disclosures retain their responsive rules. Keyboard and screen-reader traversal follow section order; durable anchors stay in place. Reduced-motion behavior is inherited without new animations. No new loading, error or permission states. No new test is necessary for static section movement; use existing type/build, page smoke and interaction checks. Verification and unrun manual checks are recorded in the PR. Roll back by reverting this focused commit.

## Context navigation (2026-10-13, proposed)

- Task: orient a reader arriving directly at a nested lesson, lab, case or capability and offer predictable parent links.
- Reuse/adapt `components/collection-breadcrumb.tsx`; add the small `AcademyBreadcrumb` composition. No dependency, URL migration, browser-history button, fetch, animation or new client directive.
- Destinations: all 12 current Academy lesson/lab routes across `/ai-academy` and `/builder-academy`, capability details and the storytelling guide. Existing Work/Side Quest and Field Notes trails retain their collection-aware behavior. The Design Lab Navigation section demonstrates the deeper Academy trail.
- Parent pages: `/ai-academy` is the Academy home; `/ai-academy/playground` is the practice hub. `journeys`, `devops`, `dependencies` and `/builder-academy` have no index page, so do not manufacture links to them. Exercise progress is not page hierarchy; keep step indicators separate. Planned lessons receive no Next links.
- Phone/tablet/desktop: same compact, wrapping list; long labels may wrap, no horizontal rail or sticky overlay. Actual links have a minimum 44px height, with existing focus styles, semantic nav/ordered list, decorative separators and one non-linked current-page label. No motion means reduced-motion remains unchanged. Async/error/loading states are not applicable to static navigation.
- Workbench availability is not deployment evidence. Automated build and browser evidence belongs in the PR; real-device and manual 200% zoom review remain separate. Revert call-site additions and the Academy wrapper to roll back.
- Owner: portfolio maintainer. Future lesson integration should reuse this composition; use explicit known parents, never split a URL into guessed links. Top-level About/Contact pages do not need a redundant breadcrumb. Filter persistence and previous/next lesson sequencing are separate work.
