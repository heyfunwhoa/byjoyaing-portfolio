# Verification lesson: local editorial pilot

**Reconciled 2026-10-14:** Merged to `main` in [PR #155](https://github.com/heyfunwhoa/byjoyaing-portfolio/pull/155). Use current `main` with `KEYSTATIC_LOCAL=true` for the local procedure below. The feature-branch checkout is historical. Hosted GitHub editing is still not configured, so [KRU-75](https://linear.app/krusty/issue/KRU-75) remains In Review in Linear. The portfolio About singleton is separate: [KRU-109](https://linear.app/krusty/issue/KRU-109) and [editorial-foundation.md](../content/editorial-foundation.md).

Issue: [KRU-75](https://linear.app/krusty/issue/KRU-75). Implementation branch at the time: `codex/kru-75-keystatic-verification`.
Baseline: `3096586` on main, including merged Academy PRs #150, #151 and #152.
Status when that branch was opened: implemented for PR review; not yet merged. The 2026-10-14 reconciliation above supersedes the merge claim. Human content approval of later wording changes is still a pull-request review.

## Ownership and reuse

Only `verification` moves. `content/academy/lessons/verification.json` is its single authoritative editorial record. The former inline text is removed from `lib/ai-academy.ts`. `lib/academy/verification-editorial.ts` validates the record and explicitly projects its visible fields into the existing catalog. This is a static JSON reader adapter, not Keystatic's server Reader API: it preserves synchronous catalog consumers and requires no CMS fetch or filesystem access in the learner browser.

Keystatic's fixed singleton path and single-option ID prevent editor rename/create workflows. Direct Git changes still require review; the adapter rejects an identity mismatch, unknown fields, invalid metadata and unsafe source URLs. No silent fallback body is maintained. Missing or invalid content fails the build. Text is rendered by React as text, not arbitrary HTML or executable MDX.

The agreed schema remains in `keystatic.config.ts`: title, summary, analogy, takeaways, exercise, sources, track/level/minutes and editorial ownership/version/review/classification/status. Optional `lastReviewed` is omitted until a human records a review; Keystatic serializes an empty date by omitting the field. A date is not proof of source accuracy. `reviewer` explicitly says review is pending. A long body is unnecessary for this short lesson. Editorial status is descriptive metadata, **not** an access control or automatic publication switch; merging the reviewed file is the publication decision.

Code still owns the slug, answer key, check behavior, prerequisites, practice links, availability, path order and progress. Existing routes remain `/ai-academy` and `/ai-academy/journeys/source-verification`; no new learner lesson route is invented. Academy review remains session-only. The separate Follow one click mission retains `academy:practice:mcp-vs-rest-api:follow-one-click:v1` and its reviewed/practiced/passed distinctions. No progress migration or new learner store is introduced.

Reuse decision: `components/ai-academy/academy.tsx` is reused without changes for phone/tablet/desktop rendering, native controls, focus and navigation. Existing source-verification and Follow one click experiences are reused unchanged. Keystatic supplies the editor because the existing workbench has no repository-backed editorial form/save infrastructure. Its two MIT packages are the only new direct dependencies; no site-wide style, shell, navigation, disclosure or component adoption changes are needed.

## Try the lesson and editor

On current `main`, skip the historical branch checkout below. From the repository root, install dependencies and start the dev server with `KEYSTATIC_LOCAL=true`.

From a clean checkout of the original PR branch (Node 22+):

```sh
git fetch origin
git switch --track origin/codex/kru-75-keystatic-verification
npm ci
KEYSTATIC_LOCAL=true npm run dev -- --hostname 127.0.0.1
```

If the branch already exists locally, use `git switch codex/kru-75-keystatic-verification` instead. Keep this editor on loopback; do not expose or tunnel the development server. Do not run an editing test while another editor is saving the same record.

1. Open `http://127.0.0.1:3000/ai-academy`.
2. Expand **Choose a starting path**. Choose **Start verify an ai output →**. The existing lesson **Grounding and source quality** appears, with its NIST source and practice link.
3. Choose **False** in the knowledge check. **Correct.** appears independently of **Mark as reviewed**. Navigate next/back: reading review survives within the mounted Academy; quiz selection clears as before.
4. Open `http://127.0.0.1:3000/keystatic`. Choose **Verification lesson**. Change **Summary**, then **Save**. This writes your current worktree only; it does not publish or create a PR.
5. Refresh the Academy tab, select the verification path again, and confirm the changed summary. A refresh resets the session-only reading flag as before. The separate saved mission remains intact.
6. Inspect `git diff -- content/academy/lessons/verification.json`. Restore the original summary in Keystatic and save again, or use the content rollback below.

All editorial content is public. Editor authentication would not make lesson data private.

## Edit → review → render

The reproducible editor test changes the summary through the real UI, uses keyboard Save, verifies the resulting file, opens the Academy and checks the rendered change and unchanged quiz, reloads the editor to prove persistence, then restores the original summary through the editor and verifies restored rendering. A `finally` block also restores exact original bytes on failure.

```sh
npx playwright install chromium
npm run test:editor
```

Run this local-only suite in an isolated worktree. It starts its own development server on port 3001 and deliberately refuses an already-running server. It never targets a hosted origin.

For a real editorial change, first make a feature branch, edit/save, inspect the content diff, increment `contentVersion` when appropriate, run checks, commit and push that branch, then open a PR. Review the diff and render from the **same head SHA**. Required repository checks and human review are the publishing gate. Keystatic's branch selection, a Save action, and `publicationStatus: published` do not enforce branch protection. This implementation PR demonstrates the branch/PR boundary; it does not claim a human approval or completed publication.

GitHub mode, GitHub App credentials, hosted editor authentication and hosted preview publication are **not configured or verified**. The local UI requires `KEYSTATIC_LOCAL=true` and development mode. API access also checks loopback Host and same-origin requests. Production UI/API return 404 even if the opt-in variable is set; do not enable unauthenticated local filesystem mode on a host. A separately authorized GitHub App and deployment review is required for hosted editing. No credentials or paid services were enabled.

## Rollback

- Unsaved edit: reload/cancel the editor change.
- Saved, uncommitted content experiment: after inspecting your diff, restore only this record with `git restore --source=HEAD -- content/academy/lessons/verification.json`, then reload the editor and lesson. Do not discard another person's changes.
- Reviewed content commit: create a rollback branch and `git revert <content-commit-sha>`, rerun checks, review a rollback PR.
- Entire pilot after a future merge: create a rollback branch and revert the pilot's squash merge commit (or use `git revert -m 1 <merge-sha>` for an actual merge commit). This restores the original inline lesson and removes the editor/schema/adapter/dependencies together. Run `npm ci`, tests and build; review before merging/releasing. Do not remove just the JSON file while leaving the adapter import.
- No rollback changes learner storage, resets progress, renames a lesson or migrates a check version. Before merge, simply closing this PR leaves main untouched.

## Verification evidence (2026-10-13)

- Initial baseline parity: all **36** catalog records deeply equal main's pre-migration records, including sources and checks. The only editorial text is the moved record; final summary is unchanged.
- Local editor save → persisted file → rendered edit → restored editor/file/render: passed. The acceptance experiment's temporary sentence is not committed.
- `npm test`: 172 passed, including invalid identity/assessment/progress injection, source URL validation and a pre-migration progress fixture; existing malformed-storage tests also pass.
- `npm run lint`, `npx tsc --noEmit`, `npm run build`: passed after route type generation. An initial standalone typecheck before Next generated route types could not resolve the existing `LayoutProps`; build generated the types.
- Production browser acceptance: **24 passed** across 375px / 768px / 1280px using `academy-foundation`, `follow-one-click` and `keystatic-pilot` specs. Coverage includes keyboard activation/heading focus, sources/practice, same-session reviewed state, quiz reset, persisted mission reload/reset, blocked-storage fallback, horizontal overflow and editor GET/POST denial.
- Browser environment: the locked Playwright 1.64.0 Chromium archive could not be unpacked here. Tests used the same Playwright test runner with **Chromium Headless Shell 134 / revision 1161** installed separately via Playwright 1.51.1. No repository dependency downgrade. Local editor config accepts `PLAYWRIGHT_EXECUTABLE_PATH`; production tests used a temporary config inheriting the existing site config and selecting that executable plus a 375px phone width. Reported widths: 375, 768 and 1280, reduced motion enabled. CI uses its configured browser; its result is separate.
- Visual spot-check: production-rendered lesson screenshots inspected at 375px and 1280px; text wraps and the existing lesson composition is retained.
- Manual browser zoom, physical device testing, screen-reader/contrast audit, hosted authenticated editor, human content approval and live deployment verification: not completed. No WCAG conformance or production claim.

Dependency gate: initial `npm audit --omit=dev --audit-level=high` identified Keystatic Next's Chokidar 3 → braces advisory. The scoped `@keystatic/next` override to Chokidar 4.0.3 removes that production chain; audit now reports **0 vulnerabilities**. Chokidar 4 removes glob support; inspection found the legacy Pages-router reader-refresh adapter passes resolved directories, not globs. This pilot uses the App Router route handler, which does not use that watcher. Local edit/render was verified with the override. Reassess/remove it when upstream updates; do not blindly run `npm audit fix --force` or weaken the audit gate.

Storybook compatibility: the initial hosted Visual QA run failed all six Follow One Click cases before rendering (`Unexpected identifier 'assert'`). The installed `vite-plugin-storybook-nextjs` SWC transform sets `emitAssertForImportAttributes: true`. A Storybook-only pre-transform removes the JSON import attribute from the verification adapter before SWC; Vite handles the JSON module. Node tests retain the required `with { type: "json" }` source import, and production code is unchanged. Remove this workaround when the upstream transform supports this import through Vite without emitting assertions. Existing visual tests and screenshot thresholds remain unchanged; hosted Visual QA is the screenshot baseline gate because the local browser differs from CI.

## References

1. [Agreed editorial and migration contract](REVENUE-ENABLEMENT-MISSION.md#pilot-editorial-contract).
2. [Keystatic Next.js integration](https://keystatic.com/docs/installation-next-js), [singletons](https://keystatic.com/docs/singletons), [GitHub mode](https://keystatic.com/docs/github-mode). Consulted for this pilot; the integration guide targets an older Next baseline, so installed Next 16.4.0 docs, types, build and real editing were used to verify compatibility.
3. Installed Next guides: `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/route.md` and `01-app/02-guides/lazy-loading.md`.
4. [braces advisory](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm) and [Chokidar](https://github.com/paulmillr/chokidar), checked 2026-10-13.
