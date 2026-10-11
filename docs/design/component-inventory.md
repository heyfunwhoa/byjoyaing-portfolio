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
| `geometric-motif.tsx` | Decorative orbits and three nodes, `aria-hidden` | Geometric decoration | Use on the Work tile only. Static. Do not spin it. |
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

## Identity and image

| Component | What it does now | Action |
| --- | --- | --- |
| `brand-avatar.tsx` | `leader`, `explorer`, `builder`. All render `/avatar.png`. | Keep. Do not point at `/avatar-leader.webp` until that file is approved and committed. |
| `celestial-frame.tsx` | Static orbit and nodes around the homepage portrait | Homepage hero only. `aria-hidden` geometry. No spin, no face motion. |
| `project-constellation.tsx` | Three linked projects plus a sentence for each edge | `/experience` only. Not a live integration diagram. |
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

Tailwind v4, Next.js, and React are the UI stack. Do not add an animation, slider, or carousel package for editorial layout.
