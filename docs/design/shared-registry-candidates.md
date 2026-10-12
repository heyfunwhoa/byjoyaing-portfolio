# Portfolio-only components vs a future shared registry

**Status:** Decision record for the featured-carousel polish.  
**Date:** 2026-10-12  
**Brand:** [brand-guidelines.md](../brand/brand-guidelines.md)  
**Related:** [component-inventory.md](component-inventory.md), [component-adoption.md](component-adoption.md)

This site is a personal portfolio. Most components encode Kristen’s positioning, evidence boundaries, or routes. They should not be copied into a shared design-system registry without stripping that content.

## Stay portfolio-only

| Component | Why it stays here |
| --- | --- |
| `CapabilityOrbit` | Pillar copy, employer vs Side Quest split, and links to `/work` anchors. Geometry is static on purpose. |
| `CareerRail` | Maps `roles` in `lib/portfolio.ts`. Other products do not share this chronology. |
| `ProjectConstellation` | Three named projects plus sentences that deny live integrations. |
| `ExperienceTimeline` | Public employment facts and coaching wording. |
| `ProfessionalCaseStudy` / `CaseBandSteps` | The five Work fields and the compact mobile pattern. |
| `FeaturedWorkCarousel` | Curated public stories plus registry kinds. The Embla primitive underneath can be shared; this wrapper cannot. |
| `BrandAvatar`, `CelestialFrame`, `Mark` | Likeness, signature `joy.`, and the homepage portrait orbit. |
| `EditorialBento` | Work-first homepage map. |
| Academy labs and lessons | Teaching content, not a component kit. |

## Candidates for a future shared registry

Only after a reviewed ADR, and only if a second product needs the same primitive.

| Primitive | Already in the repo | Accessibility and dependency tradeoff |
| --- | --- | --- |
| Carousel | `components/ui/carousel.tsx` plus `embla-carousel-react` | Keyboard arrows, previous/next, `aria-roledescription`. Touch swipe is Embla `watchDrag`. Reduced motion must zero duration and disable drag. **Do not enable Autoplay.** Controls must sit in document flow; the default `-left-12` / `-right-12` overflow at 375px. |
| Button | `components/ui/button.tsx` | `min-h-11` already. Public pages should keep using links unless a control is not navigation. |
| Focus ring | `:focus-visible` in `app/globals.css` | Copper `#8A4B2A` on ivory. Warm copper `#E6B59A` on charcoal. Do not replace with a glow. |
| Editorial panel | `.editorial-panel` | Border, radius, hover/focus border color. No motion library. |
| Tabs pattern | Hand-written in `CapabilityOrbit` | Prefer this over `components/ui/tabs` on public pages until a reviewed exception names the page. |

## Motion

CSS only: `.section-enter` (0.6rem rise, never opacity 0), `.nudge-link`, color transitions. `prefers-reduced-motion: reduce` clears animation names and collapses transition duration. Do not add the `motion` package unless an ADR says this CSS is not enough.

## Storybook and visual regression

Storybook is not a dependency. Previews live on `/design-lab` in development (404 in production). Visual checks are recorded in pull requests at 375, 768 and 1280px plus reduced motion. Source tests in `lib/interaction-regression.test.ts` guard the CSS and carousel options; they are not screenshots.

## Public use of `components/ui`

`lib/shadcn-setup.test.ts` still forbids public pages from importing `components/ui`, with two exceptions: `app/layout.tsx` (`TooltipProvider`) and `components/featured-work-carousel.tsx` (Embla carousel). Do not widen that list without naming the page and the primitive.
