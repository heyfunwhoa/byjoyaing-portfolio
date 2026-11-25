# Storybook accessibility checks

Owner: portfolio maintainer. Tracking: KRU-367. Status: implementation under review; publication is separate.

## Open and inspect

1. Run `npm ci`, then `npm run storybook`.
2. Open http://127.0.0.1:6006.
3. Select **Portfolio / Shared interactions** and choose Navigation, Contact Form or Work Disclosures.
4. Open the **Accessibility** panel. Inspect Violations and the highlighted element; review Incomplete results manually.
5. Resize the viewport and exercise the interaction. For navigation, open and close the phone menu. For Work, inspect both collapsed and expanded stories.
6. After a fix, rerun the panel and the automated checks. A passing panel covers the rendered story state, not the entire site.

The stories mount the actual SiteHeader, InquiryForm and WorkExplorer components. Work story bodies are labeled interaction fixtures; they do not invent professional outcomes.

## Run the automated pilot

```sh
npm run test:visual -- tests/visual/accessibility.spec.ts
```

This uses the existing Playwright configuration and Storybook development server. Desktop and mobile Chromium projects exercise navigation, the open phone menu, required form fields, a simulated delivery error, and collapsed/expanded Work disclosures.

The tests run axe with WCAG 2.0/2.1 A/AA, WCAG 2.2 AA and best-practice tags. Any reported violation fails the test and includes its rule, impact and element targets. No rule or element exclusion is configured for this pilot.

Contact-error requests are fulfilled by Playwright with synthetic data; they never call the email provider. Do not use real contact information or remove the route stub to test email delivery.

```sh
npm run storybook:build
npm run test:visual
```

The existing Visual QA job already runs these commands and discovers this test file. The addon provides the interactive panel; the explicit Playwright assertions enforce this pilot in CI. No Vitest installation or separate CI job is needed.

## Boundaries and interpretation

- Automated axe results do not establish WCAG conformance.
- Incomplete findings, reading order, spoken screen-reader output, focus visibility, zoom, touch behavior and physical-device use still need appropriate human review.
- CI assertions cover the named stories and states. The addon panel can analyze other visited stories; production pages are not covered by these assertions.
- These are development/test dependencies. Public application pages do not import the addon or test scanner.
- Known failures should be fixed or recorded with their exact scope. Do not globally suppress meaningful rules to make a check green.

## Sources and dependency review

Inspected 2026-11-25 UTC by the implementation session; repository owner remains responsible for adoption review.

| Source | Specific support | Limits / rights |
| --- | --- | --- |
| [Storybook accessibility documentation](https://storybook.js.org/docs/writing-tests/accessibility-testing) | addon-a11y exposes axe results and distinguishes Violations, Passes and Incomplete; runner integration is separate from panel installation. | Official capability guidance, not evidence that this repository passes. Addon 10.6.8 metadata declares MIT; retain the installed license. |
| [Storybook Next.js Vite documentation](https://storybook.js.org/docs/get-started/frameworks/nextjs-vite) | App Router navigation can be stubbed in stories through the framework parameters. | A story router is not the production application router. |
| [axe Playwright package](https://www.npmjs.com/package/@axe-core/playwright) and installed README | AxeBuilder analyzes a rendered Playwright page and accepts rule tags. Version 4.14.1 selected from current package metadata. | Metadata declares MPL-2.0. Use as a dependency; no third-party source is copied into this repository. |

Confidence: high for the scoped documented API and inspected package metadata; implementation results belong in the PR. Recheck on a Storybook/axe upgrade, changed component state or a reported regression. The Playwright README and MPL-2.0 license and the addon's MIT package declaration were inspected; the installed addon has no standalone license file. Actual test results and remaining acceptance belong in the PR.
