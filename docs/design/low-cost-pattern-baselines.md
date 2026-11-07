# Design Lab: low-cost pattern baseline pilots

**Status:** proposed Storybook-only synthetic pilots; not production adoption, a public site feature, or a library installation. **Review date:** 2026-11-06. **Owner:** portfolio Design Lab. **Budget:** no incremental subscription or package in this change; hosted CI and developer time still have cost.

## Why these stories exist

The workbench already has navigation/disclosure, motion, feedback and basic records. Draft [PR #258](https://github.com/heyfunwhoa/byjoyaing-portfolio/pull/258) adds learning/gameful interactions and creative recipes. Draft [PR #262](https://github.com/heyfunwhoa/byjoyaing-portfolio/pull/262) curates three motion sources. Avoid duplicating or merging either through this pilot.

To establish a low-cost baseline before adopting paid or new OSS packages, three task-oriented Storybook stories exercise **semantic HTML, React state, and existing CSS tokens only**:

| Story | User task | Baseline evidence | Library to compare later, only if justified |
| --- | --- | --- | --- |
| `Design Lab/No Cost Baselines/Validated Form` | Review a synthetic account and receive validation/confirmation | Labeled input, native select, inline validation, alert and success status; nothing saved | React Hook Form only for high-complexity form state |
| `Design Lab/No Cost Baselines/Review Table` | Filter and sort synthetic account-evidence rows | Search, sort direction, caption/headers, row state, zero-result and contained overflow | TanStack Table for multi-column sorting/filters, selection, pagination or pinning |
| `Design Lab/No Cost Baselines/Scenario Chart` | Compare three synthetic revenue scenarios | Shared zero-scale CSS bars, numeric labels, accessible exact-value table and explicit synthetic caveat | Recharts or visx for real time series, axes, interactions or scale needs |

All sample names and dollars are fictional. No event collection, CRM write, research fetch, auth, video render, paid API, production import or package.json change.

## Coverage of requested component families

| Family | Current reference and action |
| --- | --- |
| Navigation | Reuse existing tabs, breadcrumb, sidebar and in-context disclosure patterns in [Design Lab](design-lab.md). Do not create another global navigation system. |
| Forms | New Storybook native baseline; adopt only when an app has a specific form task, server validation and permission model. |
| Data tables | New native review-table baseline; retain existing component-options catalog's `data` candidate and evaluate TanStack Table only against a real account or scenario workflow. |
| Charts | New scenario-bars baseline; existing `measurement` and visx candidate entries remain canonical; no new chart package by default. |
| Animations | Existing motion workbench plus [draft motion PR #262](https://github.com/heyfunwhoa/byjoyaing-portfolio/pull/262); CSS first, respect reduced motion, no autoplay. |
| Learning | Existing Builder Academy workbench plus [draft learning PR #258](https://github.com/heyfunwhoa/byjoyaing-portfolio/pull/258); confirm comprehension before adding engines. |
| Accessibility | Stories use semantic markup and keyboard-ready native controls; new Playwright tests cover errors, labels, table access, responsive overflow and reduced-motion context. Manual keyboard/screen-reader review and optional axe scans are still outstanding. |

## Keep specialized tooling selective

- **TanStack Table:** first library worth evaluating for Account Signal Engine research review. It is not a requirement for every native table or the Design Lab catalog UI.
- **Fumadocs:** only for an approved, sustained public documentation experience that outgrows existing Markdown and Next.js pages; **not** a UI primitive to install in each app.
- **Langfuse:** only for a measurable LLM-tracing/evaluation gap in an active AI workflow. Free cloud tier is limited; self-hosting costs infrastructure/operations. No sensitive prompt data without review.
- **Remotion:** use the existing creative tool registry (DEV-001 in [draft PR #259](https://github.com/heyfunwhoa/byjoyaing-portfolio/pull/259)); a single reusable video recipe must pass license and cost checks before adoption. Personal/three-person licensing may differ from a larger company.
- **Motion, AutoAnimate, visx, Recharts, React Hook Form:** record as alternatives, not mandatory dependencies. The component catalog and active draft PRs own the candidate records; this file is a workflow guide, not another catalog.

Portfolio-wide cost and decision rules: [Technical Docs Platform selective tooling guide, draft PR #65](https://github.com/heyfunwhoa/technical-docs-platform/pull/65). Apply [component adoption rules](component-adoption.md) and the [reuse checklist](workbench-reuse.md) to each consumer.

## Verify and decide

Run on the pilot branch, not from a production deployment:

```bash
npm ci
npm run storybook
npm run storybook:build
npm run test:visual
npm run lint
npm test
npm run build
```

The relevant Storybook IDs are `design-lab-no-cost-baselines--validated-form`, `--review-table`, and `--scenario-chart`. The dedicated browser tests are in `tests/visual/no-cost-baselines.spec.ts`. A test file is not proof that CI passed; use exact-head checks and manual review before merging.

**Accessibility:** verify at 375/768/1280px, 200% zoom, real keyboard order, visible focus, error association, clear recovery, and reduced motion. Automated tests do not replace screen-reader/manual testing. If an app needs recurring accessibility scanning, add `@axe-core/playwright` as a dev/test dependency to that app only, after reviewing its current license.

## Consumer rollout only after acceptance

1. Reconcile open PRs touching `lib/component-options.ts`, its tests and the Design Lab workbench before editing shared catalog records. Do not overwrite the broader candidate inventory in PR #258.
2. Pilot the native review-table interaction in **Account Signal Engine**. If the real workflow exceeds the baseline, compare TanStack Table's total size/complexity, accessibility and maintainability against the native implementation.
3. Pilot a scenario table/visualization in **GTM Revenue OS**, preserving deterministic formulas, synthetic data and source/date labels.
4. Use documented UI patterns for Security Market Map, Detector Atlas and Truffle Camp only after inspecting each consumer's local stack and active PRs. Portfolio Ops Runtime remains a lightweight independent app.
5. Do not auto-install anything across the portfolio, create unrequested paid subscriptions, or assume draft Storybook stories are shipped in production.

**Merge gate:** tests pass on the exact PR head, manual accessibility and UX review completed, no unexpected runtime bundle imports, no private data, no incremental subscriptions, and owner acceptance recorded. Rollback: revert the new story, test and this documentation. No data migration.
