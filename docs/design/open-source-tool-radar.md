# Open-source tool radar for Design Lab

**Status:** reference-only, proposed. **Reviewed:** 2026-11-06. **Tracking:** [KRU-225](https://linear.app/krusty/issue/KRU-225). No new UI components, dependencies, network access or production changes.

## Where to browse candidates

The authoritative cross-category tool registry is in Technical Docs Platform, [60-entry open-source opportunity register](https://github.com/heyfunwhoa/technical-docs-platform/blob/kru-225-open-source-tool-intake/software-catalog/open-source-opportunities.json) with the [selection and pilot guide](https://github.com/heyfunwhoa/technical-docs-platform/blob/kru-225-open-source-tool-intake/software-catalog/open-source-intake.md), currently proposed in [draft PR #66](https://github.com/heyfunwhoa/technical-docs-platform/pull/66). Replace provisional branch links with a pinned main commit after approval.

This **is not another registry**. This portfolio retains the existing curated [component-options catalog](../../lib/component-options.ts), [Design Lab](design-lab.md), [source audit](component-source-audit.md), [adoption contract](component-adoption.md) and Storybook demos. Do not copy the entire cross-category JSON file into this app or add all candidates to the Design Lab UI.

## How the Design Lab should use the radar

| Domain | Candidate examples | Suggested Design Lab use | Current safer baseline |
| --- | --- | --- | --- |
| UI and motion | TanStack Table, TanStack Query, Motion, Recharts, ECharts, Excalidraw | A narrowly scoped data-grid or animation comparison only when a consumer needs one | Radix, shadcn primitives, Storybook, CSS preview motion |
| Content/CMS | **Payload CMS**, Astro Starlight, Fumadocs | Compare editor and documentation usability, not CMS replacement | Keystatic and current Academy pages |
| Learning | Sandpack, Mermaid, JupyterLite, Phaser | One synthetic editable or visual exercise with static fallback | Existing Academy/Truffle Camp components |
| GTM and email | React Email, Umami, Twenty, Activepieces, Metabase | Reference examples for approved asset/analytics patterns | Existing GTM OS scenarios and PostHog |
| Research, AI and delivery | Crawl4AI, Promptfoo, Langfuse, OpenSSF Scorecard, Syft, Trivy | Link to owning program and evidence, not demo every backend dependency in Design Lab | Existing Research Hub, Vitest, GitHub Actions |

Candidate status means **possible future use**, not approved adoption, free cost, verified integration, compliance or production readiness. Source-available candidates must remain visually distinct from OSI open-source packages in any future catalog UI. The canonical registry has explicit license statuses.

## Payload CMS: higher-interest exploration

The Payload admin UI is worth studying as a design and editorial reference:

1. **Portfolio and Field Notes:** schema-based collections, a more configurable rich-text editing interface, media library, drafts and versions.
2. **Builder Academy:** lesson, path and practice content modeling and editorial review, while preserving existing lesson IDs and progress semantics.
3. **GTM content studio:** structured content briefs, examples, assets and human approval flows before any CRM/publication connections.
4. **Research editorial:** drafts, reviewed state and publication controls, without replacing source provenance and release gates.

**No migration decision:** The current portfolio uses Keystatic. Start by reviewing Payload's [admin UI documentation](https://payloadcms.com/docs/admin/overview) and [official getting-started templates](https://payloadcms.com/get-started). If the attraction is its appearance, first consider whether its interaction/layout patterns can be implemented using your current Design Lab components. Only consider a fresh isolated Payload sandbox with fictional records after confirming Next.js version support, database/storage, auth, deployment and cost implications. Do not touch current editor data, live content or production routes.

## Future implementation contract

Before adding a package to a consumer repository, require a named Linear issue, clear destination/user objective, use-case baseline, current-state alternatives, upstream license/notice review, privacy/credential review, cost estimate, bounded synthetic fixture, accessibility and responsive checks, exact-head CI evidence, owner approval and rollback. See [Technical Docs shared UI adoption standard](https://github.com/heyfunwhoa/technical-docs-platform/blob/main/engineering/ui-pattern-adoption-v1.md).

This document is reference-only and should remain separate from active Design Lab PRs #258 and #262 and Academy PR #260. Those PRs modify catalog and curriculum source; resolve their merge/rebase order before a UI integration.
