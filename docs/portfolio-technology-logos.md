# Portfolio technology-logo system

## Intent
Differentiate **project identities** (original Joy Aing artwork, evidence previews, and status marks) from **technology logos** (third-party trademarks for tools a repository actually uses).
Keep the editorial brand, typography, and page layouts intact.

## Current assets
Local SVGs in `public/logos/technology/`, sourced from [Logoforge](https://github.com/terravidhal/logoforge):

| Id | Name | Wired |
| --- | --- | --- |
| `nextjs` | Next.js | Yes, for pages implemented in this repository |
| `react` | React | Yes |
| `typescript` | TypeScript | Yes |
| `tailwindcss` | Tailwind CSS | Yes |
| `github` | GitHub | Detector Coverage Atlas detail only. That project publishes `heyfunwhoa/byjoyaing-portfolio` |
| `vercel` | Vercel | Registered, not shown. This repo has no Vercel config or dependency |

Shared display: `components/portfolio/technology-stack.tsx`.
Typed registry: `lib/portfolio/technology-registry.ts`.
Per-project ids: `lib/portfolio/verified-stacks.ts`.

## What is verified
`package.json` in this repository depends on Next.js, React, TypeScript, and Tailwind CSS. These pages are that app:

- Detector Coverage Atlas
- Account Intelligence
- Competitive Intelligence Engine
- Customer Feedback Intelligence
- Truffle Camp
- Partner GTM Engine

Side Quest cards and the project directory show at most four compact 24px marks, with the name in screen-reader text. Detail pages show 28px chips with visible labels. Atlas also shows GitHub on the detail page. The About GTM toolkit uses 32px chips in a wrapping row, not a full-width grid.

These studies do **not** get logos. Their copy names tools that are planned, absent, or living in a repository that is not public (`gtm-revenue-os` returned 404):

- Product Release Intelligence, Product Prioritization, GTM Campaign Lab, Security Signal Intelligence
- Revenue Planning Simulator, Revenue Intelligence, GTM Operating Plan

Supabase, Exa, Sumble, Claude, Salesforce, Slack, Postgres, Drizzle, and Octokit are not installed here and are not in the project registry.

The About page has a separate **GTM systems toolkit** (`lib/portfolio/toolkit-registry.ts`, `public/logos/toolkit/`). Those marks identify field tools. They do not join `verified-stacks` or imply a running integration. Hover or focus a mark for the product name; the link is the official site.

## Usage

```tsx
import { ProjectTechnologyStack } from "@/components/portfolio/technology-stack";

<ProjectTechnologyStack slug="detector-coverage-atlas" />
<ProjectTechnologyStack slug="detector-coverage-atlas" presentation="compact" />
```

`ProjectTechnologyStack` renders nothing when a project has no verified ids. Do not pass a hand-written id list from a case study.

## Adding another logo
1. Verify the technology in the implementing repository (`package.json`, lockfile, or source imports). Documentation that says "planned" or "next" is not verification.
2. Look for an official SVG, [Logoforge](https://logoforge.terravidhal.me/), then [SVGL](https://svgl.app/). Check provenance and trademark guidance.
3. Review the SVG for scripts, event attributes, `foreignObject`, and remote references before committing it.
4. Save it in `public/logos/technology/`.
5. Register it in `lib/portfolio/technology-registry.ts` and add the id only to verified project stacks. Update this file.
6. Keep the white chip so dark marks stay visible on ivory and on charcoal sections. Compact chips are 24px, detail chips 28px, About toolkit chips 32px. The link hit area stays at least 44px. Check 375px width. Names stay visible or in `sr-only` text.
7. Run `npm run lint`, `npm test`, and `npm run build`.

## Scope
No homepage redesign and no new animation or dependencies. Logos identify a technology. They do not imply vendor sponsorship. Custom project icons stay separate from these marks.

## Asset credit
Logoforge aggregates sources; individual brand artworks remain subject to their own trademarks. Credits: https://github.com/terravidhal/logoforge/blob/main/CREDITS.md

About toolkit marks also use Simple Icons (CC0 presentation of brand marks), SVGL, and official product artwork from Salesforce, Attio, Outreach, Gong, Nooks, Clay, Common Room, Firecrawl, and Exa. Trademarks stay with their owners. Logos identify a product. They do not imply sponsorship.
