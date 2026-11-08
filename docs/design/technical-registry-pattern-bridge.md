# Technical Registry → Design Lab pattern bridge

**Status:** proposed pattern handoff, not implemented Storybook components. **Reviewed:** 2026-11-08.

## System boundaries

Technical Docs Platform [registry cross-repository contract](https://github.com/heyfunwhoa/technical-docs-platform/blob/feat/technical-registry-ux-plan-20261108/software-catalog/registry-cross-repo-contract.md) owns stable catalog semantics, decision evidence, adoption labels and the read-only reference explorer. Portfolio Design Lab owns examples for reuse. Local apps own route-specific implementations and data permissions. Do not duplicate the canonical technology records inside Portfolio.

## Reuse before new stories

Inspect the existing `docs/design/workbench-reuse.md`, `docs/design/low-cost-pattern-baselines.md`, Storybook stories, component inventory, open PRs (#258, #262, #263) and local primitives before adding another instance. Keep the same design tokens and accessibility rules as the existing Portfolio. No new dependency required for this reference.

## Proposed bounded Storybook demos

| Story family | Scenario | Required states | Reusable behavior |
| --- | --- | --- | --- |
| Registry/Explorer | Search and filter fictional tools | Default, combined filters, no matches, long names, loading/error | Query state, keyboard search, semantic table, clear/reset |
| Registry/ToolDetail | Inspect a synthetic technology | Missing license evidence, stale citation, open/close, small screens | Focus entry, Escape, focus return, evidence links |
| Registry/Comparison | Compare 2–4 synthetic choices | Mixed evidence, N/A vs unknown, narrow viewport | Aligned criterion rows, accessible overflow, no fabricated winner |
| Registry/Adoption | Tool × repository observations | Manifest-only, pilot, verified, unknown | Explicit status semantics with source/date |
| Registry/Decision | Draft adoption proposal | Missing evidence, unapproved, approved-only-after-explicit-review | Review preview, field validation, no real writes |
| Registry/Graph | Visualize capability relationships | Proposed vs evidenced; table fallback | Optional visualization with accessible adjacency list |
| Registry/Operations | Inspect cost and decision history | Cost unknown, superseded decision, review due | Exact-value table and chronological provenance |

## First accepted slice to request

Create **only** Explorer + ToolDetail + Comparison demos after checking existing Storybook coverage; use synthetic fixtures with no production tool catalog duplication. Test at 375/768/1280 pixels and 200% zoom, keyboard, focus trapping and return, screen reader, reduced motion, errors and no-match. Preserve reusable pattern IDs (`registry.explorer.v1`, `registry.detail.v1`, `registry.compare.v1`) in documentation. If an existing story already solves the behavior, link/adapt it instead of creating a duplicate.

## Adoption handoffs

- **Account Signal Engine:** source-review table and detail/provenance UI, no speculative CRM integration.
- **GTM Revenue OS:** defer to its existing `docs/ui/design-lab-adoption-gates.md` and KRU-193/223 reconciliation, then pilot synthetic deal review.
- **Security Market Map:** evidence comparison and relationship table/graph later, after local audit.
- **Academy:** optional teaching demonstration, subject to existing curriculum gates.

Storybook preview != runtime adoption. Do not automatically import Design Lab components into consumer repos, add paid software, change route architecture, or publish private source data. Each consumer owns screenshots, exact-head checks, a local adoption record and rollback.
