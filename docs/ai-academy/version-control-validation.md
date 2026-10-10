# Builder Academy Git Workflow Essentials — release validation

**Route:** `/ai-academy/version-control`
**PR:** [#16](https://github.com/heyfunwhoa/byjoyaing-portfolio/pull/16)
**Release status:** Draft. No claim of live interactive browser QA or user-test success.

## Verified from code / CI

- Lab is a client-side simulation only, without executing Git commands or writing repository changes.
- Choices, quiz responses, and self-reported practice checkmarks use in-memory React state; a reload resets progress.
- Educational examples refer to synthetic CI scenarios and the real portfolio lint incident as an analogy, not a replay of GitHub data.
- Route uses `robots: { index: false, follow: false }` during draft testing.
- Automated lint, Node tests, Next.js production build, GitHub security scan and Vercel preview status were successful on the prior PR commit `52ff677`. **Recheck on the new branch head after reconciling main.**
- Current production brand and prototype changes on `main` must not be reverted by this PR.

## Browser acceptance checks (NOT YET PERFORMED)

| Width / mode | Test | Expected behavior |
| --- | --- | --- |
| 375 px | Load direct route and Academy landing page | No horizontal scroll, clipped code or inaccessible controls; lab link discoverable |
| 768 px | Switch all Git strategies | Timeline and description visibly update, without shifting outside panel |
| 1280 px | Complete all three quiz answers | Correct-count summary matches selected answers |
| 200% zoom | Revisit entire lab | Text wraps and important content remains visible |
| Keyboard-only | Tab from breadcrumb through three Git strategies | All radios selectable with keyboard and have visible focus |
| Keyboard-only | Switch CI case after answering | Old CI answer and feedback reset |
| Keyboard-only | Open code reveal and toggle all practice checkboxes | Visible and announced state, no focus trap |
| Screen reader | Read headings, fieldsets, legends and answer feedback | Logical order and understandable names |
| Motion / contrast | Inspect focus and content across theme tokens | WCAG 2.2 AA contrast targets; no essential motion |
| Link integrity | Open breadcrumb and references | Correct targets; external references open safely |

## User task walkthrough

Without coaching, ask a beginner to:
1. Describe what rebasing changes.
2. Explain why a Vercel preview may pass while CI fails.
3. Select the best response to a simulated vulnerability alert.
4. Find the safe commands for trying a disposable branch.
5. Explain whether completing a checkbox updates GitHub (it does not).

Capture device, task success, observed confusion and notes. Do not fabricate test sessions.

The legacy `/ai-academy/git-lab` URL permanently redirects to the new, unambiguous route. Avoid the ambiguous “Git Lab” name because GitLab is an established DevOps product.

## Release gate

- [ ] Current branch CI, tests, security and Vercel checks all pass
- [ ] Narrow-screen and zoom review performed
- [ ] Keyboard and screen-reader review performed
- [ ] Copy and Git-history examples reviewed for accuracy
- [ ] Existing portfolio `main` branding/prototype preserved
- [ ] Owner reviews then marks PR ready; squash-and-merge only after all critical checks

## Recommended later automation

A dedicated Playwright smoke test for this route, with deterministic tests for scenario reset, strategy selection and quiz results, would be useful after browser validation. Add a pinned browser-testing dependency and lockfile in its own small PR. Do not confuse successful unit tests with successful interactive browser tests.

## Follow-up on 2026-10-10

- Confirmed that deployment `dpl_9KxcfX4Zw3SV8FQ3V86F8hy6vjos` was READY and matched commit `52ff677`.
- Attempted direct browser access to its Git Workflow Essentials route. Vercel redirected to **Log in to Vercel**, so actual page interactions, screen-reader behavior and responsive screenshots were **not** verified. Do not treat login-page inspection as application QA or change deployment protection to bypass access controls.
- Extracted scenario/quiz logic to `lib/version-control.ts` and added `lib/version-control.test.ts` for diagnostic answer validation, completeness and scoring. Updated `npm test` to run the existing account-signal tests and new Git Workflow Essentials tests.
- Recheck CI/security/Vercel against the latest PR head. Automated logic tests do **not** substitute for browser testing.

**Browser-access next step:** Open the Vercel preview while authenticated as an authorized project member, complete the checklist above, then record real observed results before merging.
