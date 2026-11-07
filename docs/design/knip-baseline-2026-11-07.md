# Knip baseline audit: portfolio

**Observed:** 2026-11-07, GitHub Actions [run 42344305380](https://github.com/heyfunwhoa/byjoyaing-portfolio/actions/runs/42344305380) on PR #266 head `e74f8b5b8b9e4fe8050b4fd874653f25f737b178` (PR merge checkout). **Result:** GitHub job successful; Knip returned exit 1 for reported findings, intentionally advisory. Tool invocation: `npx --yes knip@5 --reporter compact`. No fixes or package removals.

## Unfiltered findings

| Reported category | Count | Interpretation |
| --- | ---: | --- |
| Unused files | 36 | Potential graph-unreachable files, not proof of safe deletion |
| Unused direct dependency | 1 | `next-themes` |
| Unused dev dependency | 1 | `@typescript/native` |
| Unlisted dependency | 1 | `postcss` in `postcss.config.mjs` |
| Unlisted CLI binary | 1 | `infisical` in `dev:infisical` npm script |
| Files with unused exports | 20 | Output records files and their exported symbols, not 20 symbols total |
| Files with unused exported types | 29 | Output records files and types, not 29 types total |

## Evidence-based triage (no deletions approved)

| Finding | Follow-up evidence | Disposition |
| --- | --- | --- |
| `scripts/vercel-ignore-build.ts` | Referenced by `vercel.json` `ignoreCommand` using `node --experimental-strip-types ... scripts/vercel-ignore-build.ts`. Knip's graph missed a tool-invoked entrypoint. | **Confirmed false positive**. Keep; configure entrypoint if adopting Knip as a gate. |
| `.release/preview-draft.mjs`, `.release/preview-draft.node-check.mjs` | May be script/CI/release entrypoints; look for direct invocations in workflows and release docs. | **Investigate**, do not delete. |
| `components/lifeline/**` and `lib/lifeline-data.ts` | Knip reports an entire isolated component group. `lifeline-fireworks.tsx` imports `useTheme` from `next-themes`. This explains why a reported unused package may belong to a dormant feature. | **Feature/owner decision required**. Preserve until validated against branches and intended design. |
| `next-themes` | Only found in the current inactive Lifeline cluster, manifest, and reference documentation during focused code search. | **Potential cleanup, conditional** on Lifeline being intentionally retired; do not remove now. |
| `@typescript/native` | Found only in the inspected package manifest by focused code search. Project also has TypeScript npm aliases/overrides, so assess intended compiler experiment before touching. | **Potential cleanup, needs build/typecheck and owner approval**. |
| `postcss` | `postcss.config.mjs` lists `@tailwindcss/postcss` as its plugin rather than a direct `postcss` import. | **Likely configuration/tooling heuristic**; inspect dependency tree and version resolution before declaring a missing dependency. |
| `infisical` | `package.json` defines `dev:infisical` invoking external `infisical`, documented by `docs/operations/infisical-local-tryout.md`. | **Externally provisioned CLI, not necessarily a missing npm dependency**. Preserve optional flow; clarify setup documentation if needed. |
| `components/design-lab/demos.tsx` | Could be prototype not mounted; compare current Storybook/workbench and draft PRs before retirement. | **Investigate**, do not delete. |
| `components/project-card.tsx`, `project-row.tsx`, `use-case-browser.tsx`, `toolkit-logo-grid.tsx` | Older portfolio compositions may no longer be imported by app routes; draft or editorial plans could still refer to them. | **Candidate consolidation only**, verify route usage and user-facing parity first. |
| shadcn/Radix exports in `components/ui/**` | Components intentionally expose a set of primitives for selective future reuse; unused exports do not imply unused entire module. | **Retain by default**, consider only if a named component adoption/cleanup demands it. |
| `lib/release/reliability.ts` exports | Test and release tooling may reference exports through separate scripts or tests; the existing tool graph may not include all entrypoints. | **Review invocation sources** before changes. |
| Other unused exports/types | Can be legitimate public/type API, CMS data model, fixture, or unfinished PR. | **Low priority**; no bulk export edits. |

## Recommended workflow

1. Keep **advisory-only** Knip, not a required PR gate. Run on demand or during quarterly repository maintenance.
2. Save the full job log link above as baseline evidence. Triage the tool-entrypoint false positives and the dormant Lifeline component cluster first.
3. If moving to a dedicated config later, explicitly model package scripts, Vercel ignore hook, Next.js app files, Storybook story files, test configurations, and any external CLI. Compare output counts before and after changes to detect silencing.
4. Do not use broad ignores to force zero findings. Do not use `--fix` on any repository without a separate reviewed PR.
5. If future cleanup is justified, prioritize one small verified change with lint, tests, Storybook, production build and browser checks. Avoid changing files concurrently with PR #258, #262, #263 or #264.
6. Possible follow-up: run the **same pinned Knip major version** on GTM Revenue OS only after resolving baseline false positives here.

## Separate package-health observation

The `npm ci` portion of the audit showed ESLint 10 peer-range warnings in dependencies brought in via `eslint-config-next`, and reported three low-severity npm audit vulnerabilities. These are **not Knip findings** and should be reviewed through the existing dependency/security maintenance process, not auto-fixed with `npm audit fix --force`.

**Outcome:** audit baseline captured; zero deletions or dependency edits approved. Only PR review and a future small evidence-based cleanup should change production dependencies.
