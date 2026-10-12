# Storybook + Playwright visual QA pilot

**Status:** implementation PR; installation and generated baselines require CI verification. Existing /design-lab remains a development-only branded showcase.

## Scope

- Reuse current Button, Avatar, Card and Carousel components; no shared package or copied UI.
- Storybook Next.js/Vite renders isolated examples; Playwright tests Chromium desktop and mobile screenshots, focus and carousel navigation.
- The CI setup job resolves npm dependencies and generates a real lockfile and screenshot baselines on the authorized internal branch. Never guess integrity hashes.
- Visual tests are manual/workflow-triggered or restricted to changes in the visual QA files; cap execution, concurrency, retention, and browser matrix.
- CI screenshots are generated from synthetic public data only. Do not upload actual browser storage state or private account records.
- Review visual snapshot changes; never blindly approve regenerated baselines.

## Commands (once dependencies are installed and lockfile generated)

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
