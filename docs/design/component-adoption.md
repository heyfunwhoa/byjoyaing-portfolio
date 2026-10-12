# Component adoption

**Status:** Decision record for the celestial editorial pass.  
**Date:** 2026-10-11  
**Branch base:** `main` at `4a491b6`. The editorial redesign is already merged. This pass does not revive `feat/editorial-portfolio-experience`.  
**Typography:** [ADR 0001](../decisions/0001-preserve-geist-typography.md)

No new runtime dependency. Geist Sans and Geist Mono stay loaded through `next/font/google` in `app/layout.tsx`.

## Standards already in the site

| Concern | Rule |
| --- | --- |
| Spacing | Page column is `max-w-5xl` with `px-5` / `sm:px-8`. Section rhythm is `py-12` / `sm:py-16`. Controls that are tapped use `min-h-11` or `min-h-12`. |
| Type | Geist Sans for display and body. Geist Mono for technical metadata only. Sizes stay on the ADR 0001 table. |
| Focus | `:focus-visible` is a 2px copper ring with 3px offset (`--ring`). Do not remove it for a custom glow. |
| Motion | One entrance, `.section-enter`, is a 0.6rem rise. It does not fade to zero opacity. Hover transitions are color or a 0.2rem nudge. |
| Reduced motion | `prefers-reduced-motion: reduce` sets `animation-name: none` and collapses transition duration. New motion has to remain readable when that rule fires. |
| Color | Ivory, charcoal, copper, sage, mist, clay. Geometry uses the existing sage and warm paper tones. |

## Adopted as ideas, built here

| Source | What was taken | What shipped |
| --- | --- | --- |
| Vercel Geist and v0 | Density, a calm grid, and the font already in the repo | No `@vercel/geist` package and no v0 template. Layout stays the editorial cover. |
| Magic UI Orbiting Circles | Concentric rings and a few nodes as a metaphor | `CelestialFrame` and `GeometricMotif` are static SVG and CSS. They do not orbit. |
| Existing bento | Work as the large tile | Same three tiles, same DOM order. A copper rule and three nodes mark Work. |

## Customized

| Piece | Change |
| --- | --- |
| `site-header.tsx` | Open menu is `absolute top-full` inside the sticky header. A viewport backdrop sits underneath that stacking context. Closed menu stays `hidden lg:block`. |
| `experience-timeline.tsx` | Used on `/experience`. The first two roles stay open with every evidence point and the existing related links. Earlier roles open from a button. |
| `project-constellation.tsx` | Three existing projects. Each edge has a visible sentence. Revenue OS studies are not on the diagram. |

## Rejected

| Source | License checked | Why it stays out |
| --- | --- | --- |
| Instrument Serif | Font license is not the blocker | [ADR 0001](../decisions/0001-preserve-geist-typography.md) forbids a new family. A prompt that names Instrument Serif does not override that decision. |
| shadcn/ui | MIT | Accessible primitives are useful later. This pass does not need a dialog, form, or Radix dependency. The menu uses `inert` and a button. A later setup installs the primitives without replacing this menu. See the shadcn section of [component-inventory.md](component-inventory.md). |
| Magic UI Orbiting Circles | Free library is MIT. Pro sections are paid. | The component animates continuously and pulls in Motion. A spinning ring reads as astronomy and costs paint on every frame. Bento Grid is the later exception: one registry file, no Motion, kept in the lab demo component and not mounted on the shipped design-lab page. |
| Motion Primitives | MIT (`ibelick/motion-primitives`) | Components depend on the `motion` package. The site already has the one entrance it needs. |
| React Bits | Do not paste. Public indexes describe an MIT grant plus a Commons Clause rider. Confirm that file before any future copy. | Wholesale import would add a second visual language and a motion dependency. |
| Aceternity UI | Free components allow end products and forbid redistributing the component itself. Pro has a separate license. | Effects are marketing-theme motion. Copying them would fight the editorial system. |
| Continuous orbit, canvas constellations, fade-to-zero scroll | n/a | Reduced-motion and offscreen capture both failed when content started at opacity 0. A canvas diagram would hide the text alternative. |

## If a later pass copies source

Keep the copyright notice the license requires, pin the file in this guide, and do not add the `motion` package unless a reviewed ADR says the entrance CSS is not enough.

## Featured carousel (2026-10-12)

`embla-carousel-react` was already installed with the unused shadcn carousel. `/work` now wraps that primitive in `FeaturedWorkCarousel`. Autoplay stays off. Reduced motion zeros duration and disables drag. Previous/next are `static` so 375px does not overflow. Public `components/ui` imports remain forbidden except `app/layout.tsx` and this wrapper. Storybook is not added; `/design-lab` is the preview. See [shared-registry-candidates.md](shared-registry-candidates.md).
