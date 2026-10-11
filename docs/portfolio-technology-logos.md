# Portfolio technology-logo system (initial rollout)

## Intent
Differentiate **project identities** (original Joy Aing artwork) from **technology logos** (third-party trademarks identifying tools actually used).
Keep the editorial brand, typography and page layouts intact.

## Current assets
- GitHub, Vercel, Next.js: local SVGs in `public/logos/technology/`, sourced from [Logoforge](https://github.com/terravidhal/logoforge).
- Shared, server-rendered display component: `components/portfolio/technology-stack.tsx`.
- Typed source registry: `lib/portfolio/technology-registry.ts`.

## Usage

```tsx
import { TechnologyStack } from "@/components/portfolio/technology-stack";

<TechnologyStack ids={["nextjs", "github", "vercel"]} />
```

This is an **illustrative** stack, not a claim that any particular project uses all three. Check each project's repository/dependencies before wiring the component into project cards.

## Adding another logo
1. Verify a technology is used by the target project.
2. Look for an official SVG, [Logoforge](https://logoforge.terravidhal.me/), then [SVGL](https://svgl.app/). Check provenance and trademark/asset licensing.
3. Review SVG for scripts, event attributes, foreignObject, remote references and unsafe embedded content before committing it.
4. Save an approved SVG locally in `public/logos/technology/`.
5. Register it in `lib/portfolio/technology-registry.ts`, update attribution here.
6. Check light/dark appearance, 375px mobile width, accessibility and reduced-motion behavior.
7. Run `npm run lint`, `npm test`, and `npm run build`.

## Scope
No homepage edits or brand redesign in this PR. Icons should identify technology only; they do not imply any vendor sponsorship or endorsement. Follow each company's trademark guidelines.

## Asset credit
Logoforge aggregates sources; individual brand artworks remain subject to their own trademarks and provenance. Logoforge credits: https://github.com/terravidhal/logoforge/blob/main/CREDITS.md
