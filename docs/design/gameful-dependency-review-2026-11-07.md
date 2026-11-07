# Design Lab dependency and release review — November 7, 2026

**Scope:** [Portfolio PR #274](https://github.com/heyfunwhoa/byjoyaing-portfolio/pull/274), [Linear KRU-245](https://linear.app/krusty/issue/KRU-245). **Status:** engineering source and packaging review; **owner accessibility/content/rights acceptance still pending**. This document does not authorize a merge, deployment or cross-repository package installation.

## Why this review exists

The Design Lab uses a deliberately nonpublic Next.js route (production `/design-lab` returns 404) and Storybook. A demo dependency can still affect `package.json`, lockfile, CI, vulnerabilities and distribution, even though the route is hidden. Therefore local-only does not mean dependency-free or permission-free.

## Dependency decisions

| Package | Selected version | Package license | Named role | Decision / remaining gate |
| --- | --- | --- | --- | --- |
| [inkjs](https://www.npmjs.com/package/inkjs) | 2.4.0 | MIT | Author and compile a fictional branching discovery story offline; runtime reads a generated local TS artifact | Keep for local prototype; verify compiler output, no secret/customer data and notice distribution. No remote compiler service |
| [react-quiz-component](https://www.npmjs.com/package/react-quiz-component) | 2.1.1 | MIT | Headless quiz state for local learning practice; existing lesson content stays authoritative | Keep for local prototype; verify React 19 compatibility, TypeScript/build, browser keyboard flow, transitive licensing and notices |
| [react-hexgrid](https://www.npmjs.com/package/react-hexgrid) | Previously 2.0.1 | MIT | Optional decorative hex learning-territory selector | **Remove from dependencies and lockfile.** The upstream package identifies itself as unmaintained, and its old optional native `fsevents@1.2.13` dependency is deprecated in the lockfile. Native buttons and CSS now provide equivalent semantics without the package |

Source references above are package listings and upstream repos, not independent security certifications. The installed-package versions and checksums for the two retained libraries live in `package-lock.json`; their MIT notices are in [gameful-third-party-notices.txt](gameful-third-party-notices.txt). Confirm the exact bundled distribution license/notice and dependency/asset rights during owner review.

The removed `react-hexgrid` package is still an **upstream reference** only, not an installed component. Its previously exclusive `classnames`, `bindings`, `nan`, `file-uri-to-path` and nested deprecated `fsevents` lock entries were removed. The unrelated top-level `fsevents` required by other tooling remains untouched.

## Native territory behavior

`components/design-lab/learning-challenge.tsx` uses native `button` elements with `aria-label`, `aria-pressed`, a visible CSS `:focus-visible` outline, and no movement or drag action. A full text list remains visible underneath for the same paths; buttons select the same session-only quiz. The hex shape is purely CSS and does not hide a task, create a prerequisite, or certify learning progress. Selected state should be distinguishable without color alone through `aria-pressed`.

The existing visual test selects a numbered territory by role/name, tabs and confirms practice feedback, reset and mobile layout. Its exact-head rerun is required after the dependency reduction; no new manual accessibility pass has been claimed.

## Technical validation and owner acceptance

- [ ] Current parent PR head includes the latest main branch changes without replacing the unrelated main files.
- [ ] `npm ci` succeeds from the updated lockfile; `react-hexgrid`, its nested deprecated native dependency, and its exclusive package artifacts are absent.
- [ ] Unit, lint, production build/TypeScript, Storybook/visual, Trivy, Semgrep, secret and release-policy checks pass on the final exact head.
- [ ] Review the learning exercise end to end as a learner, at 375, 768 and 1280 widths, with mouse and keyboard, including retry, feedback, reset, and next action.
- [ ] Manual screen reader/VoiceOver check verifies territory selection, quiz labels and announcements. Automated Playwright is supporting evidence, not a substitute.
- [ ] Owner reviews all source/asset rights, MIT notice obligations, and the remaining two packages' maintenance and license fit.
- [ ] Owner expressly approves the merge scope, rollback, and the fact that the Design Lab remains development-only.

**Conditional release decision:** if the owner accepts the remaining manual checks and the final exact-head CI is green, merge parent PR #274 first. Only then retarget and reverify PR #275, followed by #276. Neither passing automation nor this note records that approval.

**Rollback:** revert PR #274 with its related package/lock changes. No data migration, customer source, production CMS or paid service needs rollback.
