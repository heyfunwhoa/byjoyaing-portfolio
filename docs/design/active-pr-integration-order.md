# Design Lab integration and adoption sequence

**Review date:** 2026-11-07. **Status:** file-level overlap assessment, not a merge authorization. **Owner:** Portfolio Brand/Editorial. Issues: [KRU-150](https://linear.app/krusty/issue/KRU-150), [KRU-219](https://linear.app/krusty/issue/KRU-219), [KRU-225](https://linear.app/krusty/issue/KRU-225) and [KRU-231](https://linear.app/krusty/issue/KRU-231).

## Audited pull requests

| PR | Focus | Main affected files | Recommendation |
| --- | --- | --- | --- |
| [#258](https://github.com/heyfunwhoa/byjoyaing-portfolio/pull/258) | Creative/game interactions | `app/design-lab/page.tsx`, `lib/component-options.ts`, `docs/design/design-lab.md`, Storybook config and dependencies | **Shared-file writer.** Reconcile before #262. Validate game behavior and package/notice changes independently. |
| [#262](https://github.com/heyfunwhoa/byjoyaing-portfolio/pull/262) | Motion candidates | `lib/component-options.ts`, tests, `docs/design/design-lab.md`, workbench CSS/tests | **Overlaps #258.** Rebase against the accepted catalog baseline, then rerun full catalog, Storybook and visual checks. |
| [#263](https://github.com/heyfunwhoa/byjoyaing-portfolio/pull/263) | No-cost forms/table/chart examples | New Storybook examples, separate guide, separate visual spec | Low visible path overlap. Review accessibility/data-label correctness before adoption. |
| [#266](https://github.com/heyfunwhoa/byjoyaing-portfolio/pull/266) | Motion evidence / Knip advisory | New motion example and `knip.json` plus advisory workflow | Low visible path overlap. Keep Knip **advisory**, don't make a broad removal check mandatory prematurely. |
| [#259](https://github.com/heyfunwhoa/byjoyaing-portfolio/pull/259) | Creative AI model catalog docs | One new doc | Independent; model choices must remain candidates until measured. |
| [#260](https://github.com/heyfunwhoa/byjoyaing-portfolio/pull/260) | SDLC learning companions | Academy docs | Independent at file level; editorial dependencies may still matter for lesson sequencing. |
| [#264](https://github.com/heyfunwhoa/byjoyaing-portfolio/pull/264) | Cross-category tool-radar pointer | Source-audit docs plus new reference | Docs only; merge **after** the canonical catalog is approved, update provisional branch links to pinned main revision. |
| [#268](https://github.com/heyfunwhoa/byjoyaing-portfolio/pull/268) | Payload vs Keystatic evaluation scaffold | Three new `experiments/payload-editorial/` files | Independent and optional. Does not install Payload or change the editor. |

The overlap assessment uses the exact GitHub PR changed-filename lists observed on 2026-11-07. It does **not** establish latest checks, mergeability, UX acceptance, licensing approval, or deployed state. Reinspect at merge time.

## Suggested review order

1. **Canonical catalog:** review Technical Docs [#66](https://github.com/heyfunwhoa/technical-docs-platform/pull/66). Its 60-tool register is cross-category, and the Design Lab bank remains UI-only.
2. **Independent examples/docs:** review #263, #266, #259 and #260 by owner, checking current-head CI, source attribution, mobile/keyboard and editorial gates. Merge independently only after applicable acceptance.
3. **Shared component bank:** establish one selected target for #258, then rebase #262 and reconcile catalog IDs, tests and motion guidance. Avoid taking both unchanged `lib/component-options.ts` versions.
4. **Tool radar:** update #264's links to canonical merged source, validate the local-only Design Lab remains private, then consider its docs changes.
5. **Optional Payload:** #268 remains an evidence-scoped experiment; launch a separate local SQLite CMS only once the owner chooses to run and evaluate it.
6. **GTM consumers:** select one synthetic table/qualification use case from GTM Revenue OS before adding dependencies. Do not copy the entire Design Lab app or its brand tokens.

## Component adoption decision rubric

Use **reuse local → adapt source → candidate pilot → defer**. For each destination record current source path, need, synthetic example, exact dependency version/license, accessibility, responsive behavior, semantic loading/empty/error state, data ownership/permissions, measured bundle/time impact, and rollback. The consuming repo's PR owns tests. Shared pattern extraction requires two verified consumers and an API owner; proposal alone isn't a shared package.

### GTM application priorities

- Data tables: first use semantic HTML with stable IDs, labeled sort/filter, mobile summary and synthetic states. Introduce TanStack Table **only** if interaction complexity warrants it.
- Charts: reuse #263's local zero-dependency baselines first. Confirm numeric units, denominator, source/as-of and table equivalent. Add Recharts for genuine interaction needs, not cosmetic dashboards.
- Navigation and qualification: finish GTM OS [KRU-193](https://linear.app/krusty/issue/KRU-193) merge/release queue before restyling tabs. Tie discovery/POC presentation to [KRU-223](https://linear.app/krusty/issue/KRU-223).
- Motion: reuse vetted CSS and existing application interactions, honoring `prefers-reduced-motion`; no autoplay effects in dense deal data.

## Stop gates

No owner acceptance inferred from green CI; no bulk merges, paid dependencies, live CRM writes, new public design-lab route or editor migration. If an open PR is superseded, record the decision and exact migration path rather than silently close or replace it.
