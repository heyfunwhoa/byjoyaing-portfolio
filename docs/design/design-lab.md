# Portfolio design lab

**Status:** Local prototype. Not a public page.  
**Date:** 2026-10-11  
**Route:** `/design-lab`, rendered only when `NODE_ENV` is not `production`.  
**Brand:** [brand-guidelines.md](../brand/brand-guidelines.md), [component-adoption.md](component-adoption.md)

`npm run build` sets `NODE_ENV` to production, so the route calls `notFound()` before any Suspense boundary and answers 404. `robots` noindex on the source is extra. It is not the access control.

## Audit

Installed UI dependencies are Next.js 16.4.0, React 19.2.8, and React DOM. Resend is the mail dependency. Tailwind CSS 4 is a dev dependency. shadcn/ui, Radix, Motion, and Framer Motion are not installed. Do not add them for the lab.

| Finding | Impact | Complexity | Recommendation |
| --- | --- | --- | --- |
| `ProjectCard` (sales facts) and the card markup inside `ProjectsDirectory` describe the same kind of destination in two shapes. | High. Readers meet a different card on `/projects` than in the use-case browser. | Medium. A shared card has to accept directory facts without dropping the sales card's evidence fields. | Prototype `EditorialProjectCard` in the lab. Leave both live cards in place until a review swaps one call site. |
| `StatusBadge` and `ProjectStatusPill` both print `statusCopy`. | Medium. Two shapes for one word. | Low, but every case study imports the badge. | Keep both. The new card uses the pill. Do not add a third. |
| `ProjectsDirectory` filters in memory only. Kind (work vs side quest) is not one of the controls. | Medium. The URL on `/projects` already carries a category slug, and the lab should not fork that page. | Low for a lab control. Higher if it replaces the directory. | Lab filters use kind plus two existing categories, and write `?collection=` on `/design-lab` only. |
| Case-study pages are long and the header does not show where you are inside the story. | Medium for hiring readers. | Medium. | Propose a breadcrumb. Do not build it in this pass. |
| Mobile menu, focus return, and reduced motion already exist. | Keep. | — | Do not rebuild navigation. |
| Homepage bento is the destination map, not a project gallery. | Keep. | — | `ProjectBento` is for projects. It does not replace `EditorialBento`. |

## Six proposals

| # | Component | What it does | Why | Dependencies | Complexity | Brand fit | This pass |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `EditorialProjectCard` | Title, category, summary, optional figure sentence, technologies, status pill, one destination. Featured variant is charcoal. | One keyboard stop and one status word make a project scannable. | None. Uses `ProjectStatusPill` and current tokens. | Low | Editorial card, ivory or charcoal, copper focus. | Built, lab only |
| 2 | `ProjectBento` | Stacks cards on small screens. From `md`, two columns. From `lg`, the featured card spans four of six columns. Empty results stay as a sentence. | Hierarchy without a new motion language. | None | Low | Same grid idea as the homepage bento, different job. | Built, lab only |
| 3 | `ProjectFilter` | Pressed buttons for All, Professional Work, Side Quests, GTM Systems, and Security research. | Separates field practice from independent work using `kind`, and reuses two directory categories. | None | Low | Selected state is the copper button already used on `/projects`. | Built, lab only |
| 4 | Case-study breadcrumb | Home / Work or Side Quests / title. | After a card click, the reader can see which collection they are in. | None | Low | Text, not a widget. | Next |
| 5 | One status widget | Pick pill or badge for public labels. | Removes the duplicate. | None | Medium, because many pages import the badge. | Either shape is already on-brand. | Later |
| 6 | Evidence contents | A list of in-page links on long case studies. | Lets a reader jump to contribution or limitation. | None | Medium | Use `editorial-eyebrow` and text links. | Later |

There is no separate Research category in the directory. Security research means Technical Systems & AI. GTM Systems means Revenue Strategy & Operations. An unknown query such as `?collection=research` falls back to all projects.

## Motion

Do not install Motion for React. The existing timing is the source of truth:

- Hover changes border or background color.
- `.nudge-link` moves 0.2rem. `prefers-reduced-motion: reduce` collapses that transition.
- `.section-enter` is a 0.6rem rise with no fade to zero opacity.
- Celestial lines do not spin.

New lab components add no keyframes.

## Layers

Primitives already in the repo: links, buttons in the header and filters, `ProjectStatusPill`, `StatusBadge`. Branded pieces: the new card, `EditorialBento`, `GeometricMotif`, `CelestialFrame`, `BrandAvatar`. Page compositions stay the routes in `app/`. The lab does not extract a new folder tree.

## Categories on `/design-lab`

| Section | What the page shows | Dependencies |
| --- | --- | --- |
| Foundations | Token swatches, eyebrow, philosophy line | `app/globals.css` |
| Layouts | Static span diagram for the project gallery | None |
| Navigation | Notes on the live header. No second header. Breadcrumb is not built. | `SiteHeader` from the root layout |
| Cards | `EditorialProjectCard`, `ProjectBento`, `ProjectFilter` | Directory facts |
| Motion | Written rules. The arrow uses `.nudge-link`. | Existing CSS |
| Visual identity | Homepage orbit and Work-tile motif, labeled as those placements | `CelestialFrame`, `BrandAvatar`, `GeometricMotif`, `/avatar.png` |
| Data visualization | Status pills and the experience constellation | `ProjectStatusPill`, `ProjectConstellation` |
| Capability orbit | Static orbit with enterprise selling at the center and three selectable pillars (Strategist, Leader, Builder). Selection reveals evidence and links. Hand-written ARIA tabs with arrow, Home, and End keys. CSS transitions only, collapsed by reduced motion. No Motion package. | `GeometricMotif`, `lib/capability-orbit.ts` |
| Interactions | Filter URL state, plus a native disclosure listing the timeline button and the joy. tooltip | None new |
| Accessibility | Focus, pressed state, empty result, reduced motion | None new |

Lesson: [editorial-project-card.md](../builder-academy/editorial-project-card.md).
