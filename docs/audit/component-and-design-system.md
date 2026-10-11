# Component and design-system inventory

Authoritative inventories already exist. This file records the delta at `a76e5e9` and tells the next implementation pass what to reuse.

## Use these first

| Document | What it decides |
| --- | --- |
| [docs/design/component-inventory.md](../design/component-inventory.md) | Installed primitives and what public pages may import |
| [docs/design/component-adoption.md](../design/component-adoption.md) | shadcn adoption rules, including the Bento exception |
| [docs/brand/brand-guidelines.md](../brand/brand-guidelines.md) | Tokens, type, voice |
| [ADR 0001](../decisions/0001-preserve-geist-typography.md) | Geist Sans and Geist Mono only |
| `components.json` | shadcn style `radix-nova`, registries `@keyline`, `@magicui`, `@logoforge` |

## Public building blocks already in use

- `PageMain`, `SiteHeader`, footer in `app/layout.tsx`
- `BrandAvatar` (still `/avatar.png`)
- `CelestialFrame`, `EditorialBento`, `Marginalia`
- `ProfessionalCaseStudy` on `/work`
- `StatusBadge`, `ProjectTechnologyStack`, `RelatedWork`
- Dedicated cases: atlas, competitive intelligence, account intelligence, customer feedback, field asset
- Keyline icons on contact: `Mail`, `ArrowUpRight`
- `InquiryForm`

## Installed and not for public pages

- `components/ui/*` shadcn primitives. Root layout may use `TooltipProvider`. The adoption test scans pages for other imports.
- `components/ui/bento-grid.tsx` and `components/lifeline/*`, previewed only from `components/design-lab/demos.tsx`.
- `/design-lab` is 404 when `NODE_ENV` is production.

## Do not add in the next implementation

- A new font package or `next/font` family
- `tw-animate-css`
- A site-wide dark theme or `ThemeProvider`
- A CMS or database for projects
- Motion libraries for decoration
- Another icon set beside Keyline for contact

## Gap the audit actually needs

One visible classification label fed by `kindBySlug`. It can be a styled paragraph. It does not need a new library.

Technology logos stay on the verified stack list in `lib/portfolio/verified-stacks.ts`. Planned tools stay unnamed as logos.
