# Portfolio release checks

Owner: Kristen Aing. Scope: byjoyaing-portfolio. Updated: 2026-10-13.

## Implemented in this change

- CI's `Production build + TypeScript` job now starts the actual production build and runs `npm run test:site` in phone/tablet/desktop Chromium. No email provider keys are required.
- Site tests cover Home, About, Work, Contact and Academy rendering, uncaught browser exceptions, horizontal overflow, keyboard navigation, empty/invalid-email contact validation, request-mode disclosure, the legacy About redirect and unknown-route 404.
- Browser tests abort contact/resume API requests. Invalid form cases must issue no request. They do not prove real email delivery. Remote mode is limited to the two public portfolio origins, disables trace/screenshots/video and uses no bypass credentials.
- `Production smoke` is an on-demand post-release browser check against `https://www.byjoyaing.com`. Run from main only. It observes the live domain; it does not prove that its deployed SHA matches the workflow SHA, hold a release, monitor continuously or automatically roll back.
- Visual QA now triggers for changes to app, components, lib and public, plus its existing configuration/dependency paths. Existing Storybook screenshot comparisons stay; site tests check real page layout/interaction, without asserting full-page visual baselines.
- Direct action references are pinned to upstream commit SHAs. TruffleHog's engine is pinned to 3.99.2 rather than latest. Upstream composite actions/tool downloads and mutable scanner databases/rule registries are not made fully immutable by this change.

Local commands:

```bash
npm ci
npm run build
npx playwright install --with-deps chromium
npm run test:site
SMOKE_BASE_URL=https://www.byjoyaing.com npm run test:site
```

The local suite refuses to reuse an existing server, to avoid testing a stale build. The build remains the typecheck; no redundant typecheck script is added.

## GitHub enforcement — owner settings required

Inspection found no repository rulesets. Reading legacy branch protection returned `403 Resource not accessible by integration`; it may already exist. The connector has no administration write capability. No enforcement was changed or verified by this PR.

In repository Settings → Rules → Rulesets, inspect existing main protection first. Create/update an active branch rule targeting main as needed:

- Require pull requests; restrict deletion and force pushes.
- Require passing status checks and branches to be up to date.
- Select the actual emitted check names: `Lint`, `Unit tests`, `Production build + TypeScript`, `Production dependency audit`, `semgrep`, `TruffleHog introduced secrets`, `Trivy dependency and config review`, and the Vercel preview check where a preview is required.
- Choose reviewer requirements that work for this sole-owner repository; requiring another approver without an available reviewer can prevent all merges.
- Do not make the path-filtered Visual QA workflow globally required: GitHub may leave absent path-filtered checks pending. Review its result on applicable UI PRs, or replace path filtering with an always-emitted aggregate check before making it required.
- Test enforcement on a harmless deliberately failing PR; verify merge is blocked, then close it. Do not bypass checks routinely.

## Vercel enforcement — owner settings required

Project: `byjoyaing-portfolio` (`prj_BWgeuBsxiMKOlGzg193H5O4odb2i`), scope `krusty1`. Keep Node 22 aligned with CI and preview authentication enabled.

Project Settings → Deployment Checks → Add Checks → GitHub: select checks emitted on main: `Lint`, `Unit tests`, `Production build + TypeScript`, `Production dependency audit`, `semgrep`, `TruffleHog introduced secrets`, `Trivy dependency and config review`.

After the security-enforcement PR, TruffleHog and Trivy emit checks on main and can be required for production. Do not require path-filtered Visual QA as a production check: it does not reliably emit for every commit. Do not require `Public production browser smoke` before release: it tests the current public domain, so it is a post-release check.

Vercel should build production but hold custom-domain assignment until required checks pass. Verify that behavior on the next authorized release, including matching SHA. If the settings aren't available, retain protected-main checks and reviewed release verification; record the limitation rather than claiming a deployment gate exists.

The available project update connector does not expose Deployment Checks. No Vercel settings were changed. See [the existing recovery runbook](deploy-verify-recover.md) for release/SHA evidence and recovery.

## Monitoring and alerts — separate activation remains

PostHog error instrumentation is on main, but prepared code does not prove ingestion or alerts. Follow [the rollout checklist](../monitoring/posthog-errors.md) to verify production-only flags, cost limits, one synthetic browser/server error, redacted payloads and alert delivery. Do not replace or duplicate the instrumentation with the open analytics PR. Uptime checks, source maps and handled-error coverage remain separate work.

No monitoring credentials or billing settings are changed by this PR. Production monitoring remains unverified until actual delivery and an owner-approved alert destination are tested.

## References

- [Vercel Deployment Checks](https://vercel.com/docs/deployment-checks)
- [GitHub required status checks](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)
- [GitHub secure use of Actions](https://docs.github.com/en/actions/reference/security/secure-use)
- [Playwright web server](https://playwright.dev/docs/test-webserver)

The current shared engineering baseline was read for this change. These local controls are implementation evidence, not a security/compliance certification.

## Responsive pilot coverage

The suite includes 768×1024 touch-enabled Chromium tablet emulation alongside phone and desktop. The case count grows with the suite; CI reports the actual executed count. See the [proposed shared responsive standard](https://github.com/heyfunwhoa/technical-docs-platform/blob/c7ae9a18b8045bdad5f729322722343022b13970/engineering/responsive-apps-v1.md) and [review PR](https://github.com/heyfunwhoa/technical-docs-platform/pull/26). This pilot does not claim actual zoom, screen-reader, real-device/Safari or all-page visual verification.

## Security follow-through

[Security release readiness](../security/release-readiness.md) records the blocking Trivy change, weekly/manual security scans, unchanged check names, current settings-access limits and missing alert destination. These branch changes do not configure GitHub/Vercel settings or prove a failing PR is blocked.
