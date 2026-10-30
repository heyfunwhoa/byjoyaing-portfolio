# KRU-176 runnable comparison

Disposable Next.js 16.4.3 / React 19.3.1 app. `/native` and `/fumadocs` render the **same** Frontend lesson source; the second adds Fumadocs 16.17.9 RootProvider, DocsLayout/Page/Body and Steps. These packages are not portfolio runtime dependencies. The adapter imports the existing component directly; no content migration, duplicate CMS record, global portfolio provider or theme change.

From `/workspace/byjoyaing-portfolio`:

```sh
node scripts/frontend-comparison/prepare.mjs /workspace/scratch/frontend-comparison
cd /workspace/scratch/frontend-comparison
npm ci --cache /tmp/portfolio-npm-cache --no-audit --no-fund
npm run build
npm run start
```

In another terminal, from the portfolio root:

```sh
CHROMIUM_PATH=/usr/bin/chromium node scripts/frontend-comparison/inspect.mjs
```

Use an existing disposable directory; do not create a parallel portfolio checkout/worktree. The generator overwrites its own generated app files; use a dedicated output directory. Dependencies, build outputs and browser artifacts stay outside the portfolio checkout. Chromium is a prerequisite; install a supported Playwright Chromium or set `CHROMIUM_PATH` to the available executable. The measured session used system Chromium because the Playwright CDN was denied. Browser work needs permissions to launch subprocesses and listen on loopback.

The shared CSS is copied from the portfolio with the shadcn CLI stylesheet import omitted in **both** variants; there is no shadcn-generated UI in this lesson. No fonts are downloaded in this harness. Fumadocs styling is imported only by its route. Next callbacks are intentionally inert in this content/layout comparison; the real selection callbacks are covered by the integrated site test.

`inspect.mjs` starts fresh contexts at 375/768/1280, checks wrong/correct reasoning, keyboard radio selection and focus retention, reset, rubric disclosure, overflow and page errors. It writes screenshots and raw resource measurements to the disposable app's `evidence/`. `results.json` is the actual recorded summary, not a performance budget or learner effectiveness result. Review screenshots visually; passing assertions do not prove WCAG compliance.

Fumadocs UI 16.17.9 identifies itself as the Radix UI version, so this trial does not introduce a Base UI family. Its package LICENSE was inspected: MIT, copyright 2023 Fuma. Dependencies are pinned in this experiment's separate lockfile (311 resolved entries including platform optional packages; 246 packages installed). Those figures include Next/React/tooling and are not the marginal dependency count over the portfolio. No Fumadocs source or styles are copied into production.

Decision and verification: [Frontend pilot](../../docs/academy/FRONTEND-PILOT.md).
