# Academy pull request reconciliation

Reviewed: 2026-10-30, America/Chicago. Main moved again on 2026-10-31, America/Chicago.
Branch: `cursor/academy-pr-reconciliation-7469`. The earlier base was main `60a799285f746cc38f9806d4cefb4532fabd8026`. Origin `main` is now `7d4e21588dfe2021d652038544cfc6d866c774e7`, the squash merge of PR #236.
This note records overlap, the tested combination, and a proposed merge order. It does not merge to main or deploy. The original pull request branches were not rewritten.

## Heads compared

| Pull request | Branch | Head | Base relative to main |
| --- | --- | --- | --- |
| [#233](https://github.com/heyfunwhoa/byjoyaing-portfolio/pull/233) | `feat/academy-curriculum-audit-kru-174` | `7b5c22e` | Behind main. Branched at `62d0037`, before the breadcrumb commits in PR #230. GitHub reported it conflicting with main. |
| [#236](https://github.com/heyfunwhoa/byjoyaing-portfolio/pull/236) | `cursor/frontend-lesson-pilot-ec7c` | `5b6acdd` | Squash-merged to main as `7d4e215`. The original branch was not rewritten. |
| [#237](https://github.com/heyfunwhoa/byjoyaing-portfolio/pull/237) | `docs/academy-api-mcp-progressive-lab` | `6e902c3` | Current main. Mergeable on its own. |
| [#234](https://github.com/heyfunwhoa/byjoyaing-portfolio/pull/234) | `feat/academy-learner-accounts` | `51cf817` | Behind main at the same `62d0037` base. Checked only. Not imported. |

Main after `62d0037` adds supporting-page breadcrumbs, directory case navigation, and the Academy keyboard sequence test. Those changes stay.

## Overlap

| File | Who changes it | Resolution on this branch |
| --- | --- | --- |
| `docs/academy/FRONTEND-PILOT.md` | #233 adds the unimplemented brief. #236 adds the measured decision and implementation. | Keep #236. Replace the "not implemented" status. The brief's lesson sequence remains the rendered panel. |
| `docs/design/component-adoption.md` | Main adds breadcrumb notes. #236 adds the Frontend adoption note. #233 adds the path-organization note. | Keep all three. The path note does not cancel the Frontend mount or the breadcrumbs. |
| `tests/site/academy-foundation.spec.ts` | Main adds keyboard next/previous. #233 changes Connected Systems to partly available and adds the recovery-lesson test. | Keep the availability change and both tests. |
| `components/ai-academy/academy.tsx` | Main adds the collection breadcrumb. #236 mounts `FrontendLesson` before the shared knowledge check. #234 would add optional account actions after that check. | Keep the breadcrumb and the Frontend mount. Do not import #234. |
| `lib/ai-academy.ts`, `lib/academy/learning-paths.ts`, `lib/academy/lesson-guidance.ts` | #233 only, among these three pull requests. | Keep the nine paths, catalog sort, recovery lesson, and partial Systems label. |
| `docs/academy/CURRICULUM-AUDIT.md`, `docs/academy/PROGRAM.md` | #233. | Keep the organization. Update the pilot status and add the API/MCP companion under `mcp-vs-rest-api`. |
| Companion and catalog test files | #237 adds the progressive-lab assertions. #233 moves `mcp-vs-rest-api` off the delivery path. | Keep one lesson id, pseudocode labels, and corrected sources. Point the path assertion at systems and security. |
| `package.json` test script | #236 inserts `lib/academy/frontend-lesson.test.ts`. #234 would append two account test files. | Keep the Frontend test file. Do not add the account files in this branch. |

#236 and #237 do not edit the same files. #236 is already on main. #237 still applies on top of that lesson work. #233 is the pull request that conflicts with main and with #236.

## Merge with main after #236 landed

On 2026-10-31, merging origin `main` (`7d4e215`) into this branch conflicted in two files. Both conflicts were simple. They are the same Frontend pilot documents, duplicated because main squash-merged #236 while this branch already contained that lesson plus later reconciliation wording. The lesson components, content module, unit tests, site test, and `package.json` test script were identical and merged without a conflict. No product behavior differs.

| File | Main's side | Kept |
| --- | --- | --- |
| `docs/academy/FRONTEND-PILOT.md` | The older CMS sentence ("leaves that path because it is not one of its lessons") and a coordination paragraph that still says the two copies need reconciling. | This branch's notes. The CMS button still calls `selectLesson` with `keepPath: false`. KRU-174 also lists `cms-fundamentals` on the frontend path. The coordination paragraph records that the unimplemented brief was replaced. |
| `docs/design/component-adoption.md` | Nothing beyond the Frontend rollback bullet. | The KRU-174 path-organization section already on this branch. It does not remove the Frontend mount or the breadcrumb notes. |

No conflict required a product decision, and none was left unresolved.

## Proposed merge order

Use this integration branch as the review vehicle. If the original pull requests are merged separately instead, use this order and these resolutions:

1. #236 is already on main as `7d4e215`. It contains the Frontend lesson, feedback and reset, responsive fixes, tests, and the completed comparison.
2. Merge #237 next. It applies cleanly after #236 and keeps `mcp-vs-rest-api` as the only lesson id.
3. Merge #233 last. Accept its paths, recovery lesson, and guidance tests. Keep main's breadcrumb notes and keyboard test, and keep #236's Frontend pilot note.
4. Leave #234 unmerged until account activation is authorized. A later merge should preserve `CollectionBreadcrumb`, keep `FrontendLesson` before the knowledge-check fieldset, and place `LessonAccountActions` after that fieldset. `accountsEnabled` defaults off, and `academyConfig()` returns null unless `ACADEMY_ACCOUNTS_ENABLED` is `true` and the database, secret, URL, and mail settings are all present. Append `lib/academy-account/account.test.ts` and `lib/academy-account/auth.integration.test.ts` to the test script beside the Frontend test file. Do not turn the flag on as part of combining the lesson work.

## Compatibility with optional accounts

PR #234 was not merged, cherry-picked, or copied. This branch does not add auth routes, migrations, Better Auth, Resend, account pages, or the account environment variables. The Academy page still renders `Academy` without an accounts prop.

The two UI insertions do not occupy the same spot. `FrontendLesson` is mounted immediately before the shared knowledge-check fieldset. #234 inserts `LessonAccountActions` after that fieldset and before "Mark as reviewed", and only when `accountsEnabled` is true. The page on #234 passes that flag from `academyConfig()`, which stays null without the activation environment. Combining them later does not require choosing between the Frontend panel and the account actions.

## What changed, and what was not removed

- The unimplemented Frontend brief status and its desk-only comparison table are not the current pilot note. The measured Fumadocs trial, the defer decision, the lesson panel, the tests, and the responsive fixes remain. The sequence the brief described is the panel in `components/ai-academy/frontend-lesson.tsx`.
- `mcp-vs-rest-api` is no longer a step on the delivery path. KRU-174 places it once on systems and once on security. The catalog id, parent guide, progressive companion, pseudocode labels, and corrected sources remain. `api-mcp-progressive-lab` is not a catalog id.
- `idea-to-verified-release` is no longer a step on the frontend path. The lesson remains on the delivery and security paths. Design Lab (`storybook-visual-regression`) remains on the frontend path, and the pilot's Design Lab button still uses `keepPath: true`.
- The CMS next-step button still uses `keepPath: false`, so it clears the path view. That tested behavior stays. KRU-174 also lists `cms-fundamentals` on the frontend path, so the lesson remains reachable from the path list. The old sentence that said CMS was absent from the path was corrected.
- Main's breadcrumb sections, Academy breadcrumb, and keyboard sequence test remain.
- No account, auth, or secret-bearing files from #234 were added.

The recovery companion link still points at the `main` blob URL, matching the other catalog companions. That file is on this branch and is not on main until a reviewed merge.

## Verification on this branch

Observed 30 Oct 2026, evening, America/Chicago, before any merge to main:

- `npm test`: 215 passed, 0 failed.
- `npm run lint`: passed, with the existing unused `directoryStatus` warning in `components/projects-directory.tsx`.
- `npm run build`: Next.js 16.4.3 completed, 62 routes, TypeScript included. No account routes were generated.
- Production browser tests, 39 passed across desktop 1280×900, tablet 768×1024, and Pixel 7: `tests/site/academy-foundation.spec.ts`, `tests/site/breadcrumbs.spec.ts`, and `tests/site/frontend-lesson.spec.ts`. That covers path organization, the recovery lesson, the keyboard sequence from main, breadcrumb and directory navigation, and the Frontend feedback, reset, and overflow checks.
- Screen reader, a person's browser zoom menu, contrast measurement, and a physical device were not run. The rest of the site suite was not rerun locally. Hosted CI on `fecef98` passed after that push (GitHub Actions run 41157642983). The 2026-10-31 merge of `7d4e215` did not change lesson code. Hosted CI on the new head is the check after the follow-up push.
