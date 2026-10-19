# Component inventory

**Status:** Audit of `components/` on `main` at `e8880b3`, plus proposed page templates. Templates are not built by this note.  
**Date:** 2026-10-11  
**Wireframes:** [page-wireframes.md](page-wireframes.md)  
**Rule:** Reuse a component in this list before adding one. New components need a product reason and no new dependency by default.

## Page templates

Templates are compositions of the components below. Do not add a template component until two pages need the same structure.

| Template | Used by | Composition | Build note |
| --- | --- | --- | --- |
| T1 Preview | Home | Hero, condensed proof, three-tile `EditorialBento`, one side quest, contact close | Sequence is [homepage-simplification.md](homepage-simplification.md) |
| T2 Collection index | Work, Field Notes, Side Quests | Hero with the matching avatar, in-page collection links, one lead section, shorter following sections | Work's lead is Enterprise Sales |
| T3 Profile | About | Leader portrait, origin, philosophy, orbit, career/education, toolkit, evidence links, interests, contact | Toolkit precedes personal interests |
| T4 Utility | Contact | Headline, links, `InquiryForm` | Work-example requests add a focus select. The general message does not. |
| T5 Article | Field Notes guides | Evidence label, title, body, related links | Optional contents only when the guide is long |
| T6 Case study | `/work/[slug]` | `work-story-template` or `build-story-template` by kind | Do not invent a third template |
| T7 Timeline | `/experience` | Role rows from `roles` | Not a primary nav template |
| T8 Directory | `/projects` | Filters plus `projects-directory` | Supporting. Side Quests is the introduction |

Avatar by template: Home uses `/brand/avatar/home-portrait.webp`. About, Work, Field Notes, Side Quests, and the directory use `/brand/avatar/illustrated-portrait.png`. Leader, Explorer, and Builder remain contextual labels.

This inventory does not prescribe a rebuild. Names in the "Possible later role" column are the shared pieces the product plan may need. If an existing component already does the job, extend it.

## Editorial shell

| Component | What it does now | Possible later role | Action |
| --- | --- | --- | --- |
| `collection-breadcrumb.tsx` | Home / collection / title. Kind, not the `/work/` prefix, picks Work vs Side Quests. | Case-study and Field Notes trail | Implemented on `/work/[slug]` templates and Field Notes guides. |
| `page-main.tsx` | Page width and padding | Keep | Implemented |
| `site-header.tsx` | Six-item nav, mobile menu, Escape restores focus | Keep | Implemented. Closed panel is `hidden`. Open panel hangs from the header with `top-full`. While open, main, footer, and the skip link are `inert`. `/work/[slug]` is not marked active. |
| `mark.tsx` | `joy.` signature | Keep | Implemented |
| `editorial-section.tsx` | Section framing | Editorial section header | Partial. Prefer this over a new header component. |
| `editorial-bento.tsx` | Three links: Work, Field Notes, Side Quests | Editorial bento | Implemented. Work stays the large tile. Do not wrap every section in a bento. |
| `geometric-motif.tsx` | Decorative orbits and three nodes, `aria-hidden` | Geometric decoration | Public use is the Work tile. The About capability card uses it only when the Recraft plate is off. The design lab may preview it. Static. Do not spin it. |
| `orbit-artwork.tsx` | Decorative PNG from `public/brand/orbits`. Empty alt. | Orbit drawing | Transparent file on ivory or charcoal. Charcoal plate on charcoal only. Not a control. |
| `orbit-portrait.tsx` | Transparent orbit around the shared portrait | Portrait framing | Public use is the About hero. The homepage keeps `CelestialFrame`. |
| `marginalia.tsx` | One short aside | Annotation | One per section at most. |
| `crop-frame.tsx` | Crop marks around either portrait | Avatar frame | Marks may ease outward. The shared portrait is `/brand/avatar/illustrated-portrait.png`; Home uses `/brand/avatar/home-portrait.webp`. |
| `kicker.tsx` | Small label | Eyebrow | Exists. Editorial pages often use `.editorial-eyebrow` instead. |
| `rail.tsx` | Supporting rail | Section divider or margin note | Exists. Confirm before a new divider. |

## Story and project presentation

| Component | What it does now | Possible later role | Action |
| --- | --- | --- | --- |
| `work-story-template.tsx` | Professional story: context, contribution, decisions, evidence, outcomes, lessons, caveat | Featured story / case study | Implemented for pages that opt in |
| `build-story-template.tsx` | Independent story: stage, problem, architecture, sources, limits | Project preview body | Implemented |
| `materials-invitation.tsx` | Invitation to related material | Keep | Implemented |
| `related-work.tsx` | Build invitation plus related cards | Related stories | Implemented |
| `project-card.tsx`, `project-row.tsx`, `project-previews.tsx` | Directory and homepage previews | Story card, project preview | Implemented. Do not add a second card system. |
| `project-status-pill.tsx`, `status-badge.tsx` | Status display | Project status, evidence label | Partial. Two status widgets exist. A later PR should pick one for public labels rather than add a third. |
| `projects-directory.tsx`, `projects-systems.tsx` | Filterable directory | Category filter | Implemented on `/projects`. Side Quests links here. |
| `experience-timeline.tsx` | Career timeline, first two roles visible, earlier roles behind a button | Career timeline | Implemented on `/experience`. Visible roles keep every point and their related links. |
| `career-rail.tsx` | All seven roles, oldest to newest, from `roles`. Horizontal from 1024px, a vertical rail below. Line and dots are `aria-hidden`. | Career overview | Implemented on `/about` and above the timeline on `/experience`. Text only, no links. Static. |
| `editorial/case-band-steps.tsx` | The five case-study fields as a horizontal band from 1024px. Below that, each step shows two lines until one "Read the full story" button expands the case. The full text stays in the accessibility tree. | Case-study layout | Implemented inside `ProfessionalCaseStudy` on `/work`. No Outcome step. |
| `editorial-project-card.tsx` | Directory facts, status pill, one destination. Featured variant for the field practice. | Lab preview | On `/design-lab` only. Does not replace `project-card.tsx`. |
| `project-bento.tsx` | Responsive project gallery and empty state | Lab preview | Not the homepage `EditorialBento`. |
| `project-filter.tsx` | Kind and existing-category filters with `aria-pressed` | Lab preview | URL state stays on `/design-lab`. |

## Identity and image

| Component | What it does now | Action |
| --- | --- | --- |
| `brand-avatar.tsx` | Shared portrait is the default; Home passes `/brand/avatar/home-portrait.webp` explicitly. | Keep. Do not point at `/avatar-leader.webp` until that file is approved and committed. |
| `celestial-frame.tsx` | Static orbit and nodes around the homepage portrait | Public use is the homepage hero. The design lab may preview it. `aria-hidden` geometry. No spin, no face motion. |
| `project-constellation.tsx` | Three linked projects plus a sentence for each edge | Public use is `/experience`. The design lab previews the same component. Not a live integration diagram. |
| `capability-orbit.tsx` | Enterprise selling at the center opens a short About panel; Strategist, Leader, and Builder are ARIA tabs with arrow, Home, and End keys. The selling panel offers a same-tab deeper dive to `/work#enterprise-sales`. Pillar panels show evidence tagged employer or independent, plus links. | Public use is `/about`. The charcoal orbit PNG sits behind the same controls. CSS color and reveal transitions only, collapsed by reduced motion. No Motion package. Only Builder may link to Side Quests. |
| `crop-frame.tsx` | Corner crop frame | Keep |
| `tool-mark.tsx` | Small tool mark | Keep where already used |

## Case-specific and learning UI

These are page-local systems, not the editorial design system. Do not generalize them into site chrome.

`account-intelligence-case.tsx`, `account-intelligence-workflow.tsx`, `competitive-intelligence-case.tsx`, `competitive-intelligence-workflow.tsx`, `customer-feedback-case.tsx`, `customer-feedback-workflow.tsx`, `atlas-case.tsx`, `coverage.tsx`, `coverage-explorer.tsx`, `field-asset-case.tsx`, `sample-record.tsx`, `use-case-browser.tsx`, `tools-map.tsx`, `toolkit-logo-grid.tsx`, `field-notes/deal-journey.tsx`, `field-notes/stakeholder-playground.tsx`, `builder-guide.tsx`, `credential-risk-explorer.tsx`, `identity-journey-lab.tsx`, and `ai-academy/*`.

## Not built, and not approved to build yet

| Requested name | Nearest existing piece | Decision for now |
| --- | --- | --- |
| EditorialHero | Homepage hero in `app/page.tsx` | Leave on the page until a second page needs it |
| ArticleLayout | Field note pages are custom | Specify before extracting |
| SourceFootnotes | Not a shared component | Add only with a real note |
| EvidenceLabel | Status pill plus prose caveats | Prefer the existing pill plus a sentence |
| CareerTimeline | `experience-timeline.tsx` | Reuse |

## Dependency rule

Tailwind v4, Next.js, and React are the UI stack. Do not add an animation package for editorial layout. The shadcn carousel primitive depends on `embla-carousel-react`. That package is installed with the primitive and is not used on a page. See the shadcn section below.

## shadcn/ui primitives

**Status:** Installed, not adopted on public pages.  
**Date:** 2026-10-11  
**Config:** `components.json` (`style: radix-nova`, Tailwind v4, CSS variables).  
**Base:** Radix, through the `radix-ui` package. Base UI was not selected.

`npx shadcn@latest init` rewrote `app/globals.css` to a neutral preset, a circular `--font-sans: var(--font-sans)`, a radius scale, and a base layer that painted the body with a flat background. Those edits were reverted. Ivory, charcoal, copper, sage, mist, and clay stay as they were. Geist Sans and Geist Mono stay on `next/font/google`. The radius scale was not adopted, because it would resize every existing `rounded-*` corner. There is no dark theme.

`--muted` remains the secondary text color `#4A504B`. shadcn's muted fill is sage (`bg-surface-sage`) inside the new primitives only. Primary maps to copper. Destructive maps to charcoal, because the brand guide has no error red. Focus stays the existing unlayered copper outline. Button, tab, accordion, dialog, and carousel controls use at least `min-h-11`. Enter and exit fades were removed so a later use does not start at opacity 0. `tw-animate-css` is not a dependency. Accordion height animation remains, and `prefers-reduced-motion` still clears animation names.

`TooltipProvider` wraps the root layout so a tooltip can be added later. It does not change page copy, navigation, or layout.

### Installed

| Primitive | File | Why it is here | Not a replacement for |
| --- | --- | --- | --- |
| Card | `components/ui/card.tsx` | Shared surface for a later composition | `project-card.tsx`, `editorial-bento.tsx` |
| Tabs | `components/ui/tabs.tsx` | Keyboard-selectable sections | In-page collection links |
| Tooltip | `components/ui/tooltip.tsx` | Short label on hover and focus | The CSS brand tooltip in the header |
| Hover Card | `components/ui/hover-card.tsx` | Preview on pointer and keyboard | Case-study pages |
| Avatar | `components/ui/avatar.tsx` | Generic image with a fallback | `brand-avatar.tsx`. The portrait stays `/brand/avatar/illustrated-portrait.png` |
| Sheet | `components/ui/sheet.tsx` | Focus-trapped side panel | The header menu |
| Dialog | `components/ui/dialog.tsx` | Focus-trapped modal | No public modal exists |
| Accordion | `components/ui/accordion.tsx` | Disclosure with a heading button | `experience-timeline.tsx` |
| Carousel | `components/ui/carousel.tsx` | One slide group with previous and next buttons | Editorial layout. Not used |
| Button | `components/ui/button.tsx` | Required by Dialog, Sheet, and Carousel | Page links and the header button |

### Custom components that stay

The editorial shell, story templates, status pills, brand avatar, celestial frame, and case-specific learning UI in the tables above are unchanged. Public pages do not import `components/ui`. Do not point a public page at `components/ui` until a reviewed change names the page and the primitive. The shipped `/design-lab` page is the editorial workshop and does not import these primitives.

### Recommended later, not installed

| Piece | Source | Why it waits |
| --- | --- | --- |
| Case-study breadcrumb | Official shadcn breadcrumb, or a small local component | Home / Work or Side Quests / title, using `kind`. Specify before building. |
| One status widget | Existing `StatusBadge` or `ProjectStatusPill` | Two widgets already exist. Do not add shadcn Badge as a third. |
| Separator | Official shadcn separator | `.editorial-rule` already draws the divider. |
| Community registries | [Directory](https://ui.shadcn.com/docs/directory) | `@keyline` and `@magicui` are both configured. `@magicui` is Bento Grid only. |

### Magic UI and Lifeline

**Status:** Installed for the lab. Public pages do not import them. The primitive preview is not mounted on the shipped `/design-lab` page.
**Date:** 2026-10-11

| Piece | Where it lives | How it was added | Where it renders |
| --- | --- | --- | --- |
| Bento Grid | `components/ui/bento-grid.tsx` | `npx shadcn@latest add @magicui/bento-grid`. The existing button was not overwritten. `@radix-ui/react-icons` is the registry dependency. | `components/design-lab/demos.tsx` only |
| Lifeline | `components/lifeline/` and `lib/lifeline-data.ts` | `npx shadcn@latest add https://evilrabbit.com/r/lifeline.json`. No `app/lifeline/page.tsx`. | `components/design-lab/demos.tsx` only, `mode="embed"` |

`defineLifeline` fills every year from a birth year. The prototype does not call it. Markers come from the published `roles` list. The sticky column reads Co. and Year. `birthYear` is `0` and is not displayed, because every marker sets `age` to a company abbreviation. `experience-timeline.tsx` is unchanged.

`components/lifeline` is the copied registry. ESLint turns off the React hook rules that this upstream code does not satisfy, and only in that folder. The `geist` package was removed after install. The timeline uses `--font-geist-sans` from `next/font/google`. `next-themes` stays because the fireworks provider imports `useTheme`. The lab does not mount `ThemeProvider`, so the document theme is unchanged, and the prototype includes no fireworks effect. Reduced motion sets marker and label opacity to 1 and clears the rail scale, so a cleared animation cannot leave the timeline invisible.

React Bits is not installed. It is not required for this prototype.

### Community registries reviewed

The directory listed 434 registries on 2026-10-11 (350 healthy, 44 degraded, 38 unavailable, 2 observing). `@keyline` stays from main. `@magicui` is configured for Bento Grid only.

| Registry | Directory status | Review | Decision |
| --- | --- | --- | --- |
| `@magicui` | Healthy, 250 items | Orbiting Circles and the Motion-based set stay out. Bento Grid has no `motion` dependency. | Bento Grid only, inside the lab demo component. |
| `@motion-primitives` | Healthy, 33 items | `text-effect` depends on `motion` and includes fade presets. | Do not install. |
| `@aceternity` | Degraded, score 84 | Motion for React, marketing effects. | Do not install. |
| `@animate-ui` | Healthy, 580 items | Animated primitives. A second motion system. | Do not install. |
| `@cult-ui` | Healthy, score 89 | Framer Motion. | Do not install. |
| `@react-bits` | Healthy, 860 items | Animated set. Confirm the Commons Clause rider on the file before any future copy. | Do not install. |
| `@diceui` | Healthy, 246 items | Sample item depends on `@base-ui/react`. This project uses Radix. | Do not install. |
| `@ai-elements` | Degraded, score 94 | Chat and message UI. This site has no assistant surface. | Do not install. |
| `@kibo-ui` | Healthy, 41 items | Composable extras. The index URL returned an error during this review, so the files were not read. | Do not install until a named component is reviewed. |
| `@keyline` | Healthy, MIT icons | Stroke icons shipped on main in #57 and live in `components/icons`. | Keep the registry. Do not add more Keyline components here. |
| `@logoforge` | Healthy | Logo artwork. Trademarks stay with their owners. Registry registration is a separate pull request. | Do not install logo components. |
| `@spectrumui` | Healthy, 315 items | Another visual language, with its own motion. The MCP server is a separate pull request. | Do not install components. |
| Block and theme registries (`@shadcnblocks`, `@shadcn-studio`, and similar) | Mixed, several degraded | Full pages and themes would restyle the editorial site. | Do not install. |

### Scoped stakeholder-map adoption pilot

`/field-notes/multithreading` now proposes Button and Card adoption through `components/stakeholder-map/stakeholder-node.tsx` and `stakeholder-detail.tsx`. The map composition also appears in local Design Lab and Storybook. This is an explicit, reviewed exception to the earlier lab-only inventory, limited to these wrappers. See [stakeholder-map-library.md](stakeholder-map-library.md); other public primitive imports still require their own review.


## About workflow toolkit · PR #112

`components/toolkit-explorer.tsx` is a scoped adoption of existing `ui/tabs`, `ui/button`, and Radix Collapsible from the installed `radix-ui` package. No new dependencies or global UI exemption. The adoption allowlist in `lib/shadcn-setup.test.ts` names this wrapper only.

Five workflow summaries lead into a labeled example, three approach steps, a relevant public evidence/learning destination, and a collapsed supporting-tool grid. Revenue execution opens first. Field experience, independent building and proposed AI learning remain distinct. Existing tools and usage notes are preserved; multi-purpose tools appear under a primary purpose.

Tabs provide arrow-key navigation; disclosures use an explicit button and expanded state. Panel entry (180ms), expansion (220ms), collapse (160ms), and chevron rotation honor reduced motion. Nothing auto-advances. Existing legacy anchors remain available.

Local build/typecheck, lint and unit/content checks are recorded in the PR. Browser responsive, keyboard, screen-reader and motion verification remain outstanding; this note does not claim a live release.


### Mobile adaptation

Below 640px, one labeled native selector replaces the five summary tabs. A visible position indicator and full workflow heading preserve orientation. Short option labels fit narrow screens; the selector uses 16px text and a 48px minimum height. Desktop tabs and mobile selection share state without duplicating the workflow panel. The mobile approach steps use a compact numbered list; tools remain collapsed and open into a readable single-column grid. Main example text and product links use 16px on phones. No autoplay, hover-only details, sticky overlays or sideways page scrolling is introduced by this design.

Implementation checks do not prove rendered usability. Verify 320/375/390/430px, portrait/landscape, 200% zoom, native selection, focus, screen-reader labels and reduced motion before calling mobile QA complete.


### Proposed Work bento adoption — follow-up to PR #120

`components/work-explorer.tsx` consumes the local `BentoGrid` and installed Radix Collapsible on `/work`, replacing the overview carousel and repeated story sections. This supersedes the historical lab-only bento statement for this single destination when merged. `BentoCard` and Lifeline remain under their existing restrictions. See component-adoption.md for references, motion, responsive behavior and pending browser validation.

### Context navigation extension (proposed, 2026-10-13)

`CollectionBreadcrumb` remains the shared public pattern. `AcademyBreadcrumb` composes it for lessons and Playground labs; capability details and the storytelling guide now adopt the same pattern. See the context-navigation record in [component-adoption.md](component-adoption.md). This is branch implementation, not a claim of deployment.

### Guided request mission (draft on merged Academy foundation #130)

`components/academy/mission-layout.tsx` composes local Understand / See / Try / Explain steps with heading focus and unlocked reading. `follow-one-click.tsx` provides the fictional request walkthrough, feedback and activity-scoped resume. Storybook: Academy / Follow one click / Pilot. Mounted at `/ai-academy/journeys/follow-one-click` in this branch, discovered through the shared resource/practice metadata; not yet a deployed-feature claim. Reuses `AcademyBreadcrumb`, native disclosures and existing tokens; adds no dependencies. See [pilot ownership and progress contract](follow-one-click-pilot.md).
