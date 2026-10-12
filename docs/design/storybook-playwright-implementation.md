# Storybook + Playwright visual QA pilot

**Status:** dependencies and six baseline images committed; PR checks must pass before merge. Existing /design-lab remains a development-only branded showcase.

## Scope

- Reuse current Button, Avatar, Card and Carousel components; no shared package or copied UI.
- Storybook Next.js/Vite renders isolated examples; Playwright tests Chromium desktop and mobile screenshots, focus and carousel navigation.
- A one-time CI bootstrap resolved npm dependencies and committed the real lockfile and six baseline images; the temporary write-permission workflow was removed.
- Visual tests are manual/workflow-triggered or restricted to changes in the visual QA files; cap execution, concurrency, retention, and browser matrix.
- CI screenshots are generated from synthetic public data only. Do not upload actual browser storage state or private account records.
- Review visual snapshot changes; never blindly approve regenerated baselines.

## Commands

```bash
npm ci
npm run storybook
npm run storybook:build
npx playwright install chromium --with-deps
npm run test:visual
npm run test:visual:update  # only after human visual approval
```

## Completion checklist

- [ ] npm dependency resolution and lockfile automation passed
- [ ] Storybook build passed
- [ ] Playwright desktop/mobile suite and baselines passed
- [ ] Existing lint, unit tests and Next production build passed
- [ ] Budget / CI minutes reviewed
- [ ] Canonical integration registry changed to verified with timestamped evidence

**FinOps:** zero incremental open-source license cost, CI/runner minutes and retained artifacts are metered by provider. No Chromatic subscription or token. Disable/suspend nonessential visual CI if budget is exhausted.
