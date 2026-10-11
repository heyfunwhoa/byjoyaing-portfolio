# Component inventory

**Status:** Audit of `components/` on `main` at `e8880b3`, plus proposed page templates. Templates are not built by this note.  
**Date:** 2026-10-11  
**Wireframes:** [page-wireframes.md](page-wireframes.md)  
**Rule:** Reuse a component in this list before adding one. New components need a product reason and no new dependency by default.

## Page templates

Templates are compositions of the components below. Do not add a template component until two pages need the same structure.

| Template | Used by | Composition | Build note |
| --- | --- | --- | --- |
| T1 Preview | Home | Hero, condensed proof, three-tile `EditorialBento`, one field practice, contact close | Sequence is [homepage-simplification.md](homepage-simplification.md) |
| T2 Collection index | Work, Field Notes, Side Quests | Hero with the matching avatar, in-page collection links, one lead section, shorter following sections | Work's lead is Enterprise Sales |
| T3 Profile | About | Leader portrait, origin, philosophy, arc link, interests | Toolkit stays last |
| T4 Utility | Contact | Headline, links, `InquiryForm` | No new fields |
| T5 Article | Field Notes guides | Evidence label, title, body, related links | Optional contents only when the guide is long |
| T6 Case study | `/work/[slug]` | `work-story-template` or `build-story-template` by kind | Do not invent a third template |
| T7 Timeline | `/experience` | Role rows from `roles` | Not a primary nav template |
| T8 Directory | `/projects` | Filters plus `projects-directory` | Supporting. Side Quests is the introduction |

Avatar by template: T1, T3, and Work use Leader. Field Notes uses Explorer. Side Quests and the directory use Builder. All of them render `/avatar.png`.

This inventory does not prescribe a rebuild. Names in the "Possible later role" column are the shared pieces the product plan may need. If an existing component already does the job, extend it.

## Editorial shell

| Component | What it does now | Possible later role | Action |
| --- | --- | --- | --- |
| `page-main.tsx` | Page width and padding | Keep | Implemented |
| `site-header.tsx` | Six-item nav, mobile menu, Escape restores focus | Keep | Implemented. Closed panel is `hidden`. Open panel hangs from the header with `top-full`. While open, main, footer, and the skip link are `inert`. `/work/[slug]` is not marked active. |
| `mark.tsx` | `joy.` signature | Keep | Implemented |
| `editorial-section.tsx` | Section framing | Editorial section header | Partial. Prefer this over a new header component. |
| `editorial-bento.tsx` | Three links: Work, Field Notes, Side Quests | Editorial bento | Implemented. Work stays the large tile. Do not wrap every section in a bento. |
| `geometric-motif.tsx` | Decorative orbits and three nodes, `aria-hidden` | Geometric decoration | Public use is the Work tile. The design lab may preview it. Static. Do not spin it. |
| `marginalia.tsx` | One short aside | Annotation | One per section at most. |
| `crop-frame.tsx` | Crop marks around the portrait | Avatar frame | Marks may ease outward. The portrait file stays `/avatar.png`. |
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
| `editorial-project-card.tsx` | Directory facts, status pill, one destination. Featured variant for the field practice. | Lab preview | On `/design-lab` only. Does not replace `project-card.tsx`. |
| `project-bento.tsx` | Responsive project gallery and empty state | Lab preview | Not the homepage `EditorialBento`. |
| `project-filter.tsx` | Kind and existing-category filters with `aria-pressed` | Lab preview | URL state stays on `/design-lab`. |

## Identity and image

| Component | What it does now | Action |
| --- | --- | --- |
| `brand-avatar.tsx` | `leader`, `explorer`, `builder`. All render `/avatar.png`. | Keep. Do not point at `/avatar-leader.webp` until that file is approved and committed. |
| `celestial-frame.tsx` | Static orbit and nodes around the homepage portrait | Public use is the homepage hero. The design lab may preview it. `aria-hidden` geometry. No spin, no face motion. |
| `project-constellation.tsx` | Three linked projects plus a sentence for each edge | Public use is `/experience`. The design lab previews the same component. Not a live integration diagram. |
| `crop-frame.tsx` | Corner crop frame | Keep |
| `tool-mark.tsx` | Small tool mark | Keep where already used |

## Case-specific and learning UI

These are page-local systems, not the editorial design system. Do not generalize them into site chrome.

`account-intelligence-case.tsx`, `account-intelligence-workflow.tsx`, `competitive-intelligence-case.tsx`, `competitive-intelligence-workflow.tsx`, `customer-feedback-case.tsx`, `customer-feedback-workflow.tsx`, `atlas-case.tsx`, `coverage.tsx`, `coverage-explorer.tsx`, `field-asset-case.tsx`, `sample-record.tsx`, `use-case-browser.tsx`, `tools-map.tsx`, `field-notes/deal-journey.tsx`, `field-notes/stakeholder-playground.tsx`, `builder-guide.tsx`, `credential-risk-explorer.tsx`, `identity-journey-lab.tsx`, and `ai-academy/*`.

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
| Avatar | `components/ui/avatar.tsx` | Generic image with a fallback | `brand-avatar.tsx`. The portrait stays `/avatar.png` |
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
