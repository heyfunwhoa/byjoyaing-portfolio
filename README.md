# byjoyaing.com

Personal portfolio for Kristen Aing. The public site is a Next.js app. This repository is the place where the site, its content, and its quality checks live.

The brand has three public layers and one private boundary:

| Name | What it is | Where it lives |
| --- | --- | --- |
| joy. | Personal brand mark | Visual system, later |
| Kristen Aing | Professional identity | Already on public pages |
| Revenue & GTM Leader · Curious Builder | Positioning line | Live homepage headline |
| Work | Professional experience and business impact | `/work`, with `/experience` as the career timeline |
| Side Quests | Independent software and creative projects | `/side-quests`, with `/projects` as the filterable directory |
| The Joy Index | Private workspace | Never this repository |

Nothing from The Joy Index belongs in git, in a page, or in a commit message.

## What is true today

`main` is the deployed baseline. Public navigation is Home, About, Work, Field Notes, Side Quests, and Contact. Case studies remain at `/work/[slug]`. `/experience` is the career timeline. `/projects` is the filterable project directory. `/approach` redirects to `/about`. The Portfolio Experience 2.0 plan is in [docs/product/portfolio-experience-v2-prd.md](docs/product/portfolio-experience-v2-prd.md).

The [canonical brand guide](docs/brand/brand-guidelines.md) defines messaging. The [rebuild roadmap](docs/rebuild-roadmap.md) is the forward-looking sequence; [architecture](docs/architecture.md) is a dated historical snapshot and may describe earlier PR states. GitHub is the authority for current PR/CI status. Do not use old PR notes as merge instructions.

## Commands

```bash
npm ci          # install the exact versions in package-lock.json
npm run dev     # local site at http://localhost:3000
npm run lint    # ESLint
npm run build   # production build
npm test        # Node.js unit and repository-contract tests
npm run start   # serve the production build
```

`npm test` uses the built-in Node.js test runner with TypeScript stripping and the explicit file list in `package.json`. Coverage includes Account Signal, portfolio data and navigation, Builder Academy, identity and credential exercises, privacy, email, metadata, and repository contracts. Academy coverage includes `lib/ai-academy-labs.test.ts`, `lib/ai-academy-advanced-labs.test.ts`, and `lib/ai-prompt-journey.test.ts`. New test files must be added to the command to run in this suite.

The `Unit tests` job in `.github/workflows/ci.yml` runs `npm test` on Node.js 22 for pull requests targeting `main` and pushes to `main`. Browser checks are separate: `npm run test:site` tests the production build, `npm run test:visual` runs the Playwright visual suite, and `npm run test:editor` tests the Keystatic editor. Passing unit tests does not establish coverage of every page or endpoint.

## Read next

- [docs/architecture.md](docs/architecture.md) — architecture and historical observations (not live PR status)
- [docs/development-workflow.md](docs/development-workflow.md) — branches, commits, pull requests, Vercel, merging
- [docs/content-model.md](docs/content-model.md) — where words live, and what must stay unpublished
- [docs/product/portfolio-experience-v2-prd.md](docs/product/portfolio-experience-v2-prd.md) — current product requirements
- [docs/product/portfolio-experience-v2-roadmap.md](docs/product/portfolio-experience-v2-roadmap.md) — epic sequence
- [docs/rebuild-roadmap.md](docs/rebuild-roadmap.md) — historical route notes, not the active plan
- [docs/design-process.md](docs/design-process.md) — how a page redesign is decided before it is coded

## Stack

Next.js 16 (App Router) and React 19 power the app, with TypeScript and Tailwind CSS 4 as development/build tooling. Runtime dependencies declared in `package.json` also include Keystatic (`@keystatic/core`, `@keystatic/next`), Radix (`radix-ui`, `@radix-ui/react-icons`), Lucide (`lucide-react`), Embla (`embla-carousel-react`), `next-themes`, `class-variance-authority`, `cn`, PostHog (`posthog-js`, `posthog-node`), and Resend. `package.json` is the dependency inventory; `package-lock.json` pins the installed versions. ESLint, Prettier, Storybook, Playwright, and the shadcn CLI are development tooling.

The public contact form no longer offers a resume request. `/api/request-resume` remains in the codebase and is not linked from the interface. Do not add a package for something the standard library or the framework already does.

## Canonical portfolio brand and changes

The source of truth for messaging, voice and design boundaries is [docs/brand/brand-guidelines.md](docs/brand/brand-guidelines.md). **Revenue & GTM Leader · Curious Builder** is the primary positioning, and **joy.** is the personal signature. The philosophy is **People first. Problem-driven. Systems-minded.** Design experiments must not silently override these decisions.

Coding agents should follow [AGENTS.md](AGENTS.md). All proposed portfolio changes should use the [PR review checklist](.github/pull_request_template.md), including verified claims, accessibility, security and CI evidence. Brand identity is specific to this portfolio; risk-based software engineering standards are reusable across other projects.

## Reusable intelligence learning plan

[Builder Academy plan](docs/builder-academy/security-gtm-intelligence-plan.md) scopes one synthetic exercise after validated topic pilots; no new UI is claimed by this plan.
