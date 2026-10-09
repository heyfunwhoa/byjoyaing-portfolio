# Architecture

This document describes the repository as it exists, what the open pull requests change, and what should be preserved. It does not change the pages.

## Why a document like this exists

A portfolio is a small application, but it already has three people (or three agents) editing it at once. Writing down the structure keeps the next change from guessing. The alternative was a diagram-only design file. A markdown file in git is easier to review in the same pull request as the code.

## How a Next.js App Router project is shaped

A route is a folder under `app/` with a `page.tsx`. The URL is the folder path. `app/work/[slug]/page.tsx` is one template for many case studies. The part in brackets is a parameter.

Shared chrome (header, footer, fonts, default metadata) lives in `app/layout.tsx`. It wraps every page. A change there shows up everywhere, so it deserves a careful look.

Content that is not a route lives in `lib/`. Today, project case studies are data in `lib/portfolio.ts`, not a separate file per project. That is the right idea: one shape for every project, many entries. The file is now large. A later pull request can split the data without changing the URLs.

Components in `components/` are reusable pieces of UI. If a component is only used once, it can stay next to its page. If two pages need it, it belongs in `components/`.

## Routes on `main`

| URL | Role |
| --- | --- |
| `/` | Home |
| `/about` | About |
| `/projects` | Project index |
| `/contact` | Contact form and resume request |
| `/work/[slug]` | Case study generated from `lib/portfolio.ts` |
| `/approach` | Permanent redirect to `/about` |
| `/experience` | Permanent redirect to `/about` |
| `/api/contact` | Sends a message through Resend |
| `/api/request-resume` | Sends a resume request. Attaches `content/kristen-aing-resume.pdf` only if that file exists on the server |

Case study slugs on `main`:

- detector-coverage-atlas
- product-release-intelligence
- truffle-camp
- competitive-intelligence-engine
- customer-feedback-intelligence
- product-prioritization-simulator
- partner-gtm-engine
- account-intelligence
- gtm-campaign-lab
- security-signal-intelligence

## What pull request #1 already changed

[Pull request #1](https://github.com/heyfunwhoa/byjoyaing-portfolio/pull/1) is a large unmerged redesign. Preserve its content decisions. Do not start a second copy of them.

It adds `/experience` and `/capabilities`, removes the `/experience` → `/about` redirect, and introduces `lib/sales.ts`, `lib/project-directory.ts`, and `lib/capabilities.ts`. It also adds three GTM Revenue OS case studies (revenue-planning-simulator, revenue-intelligence, gtm-operating-plan) that describe a separate repository. Those pages must keep saying the company and the dollar figures are synthetic.

Its CI run on that branch is green. `main` is not the same tree.

## Overlapping pull requests

| PR | Branch | Based on | Overlaps | CI |
| --- | --- | --- | --- | --- |
| #1 | `cursor/sales-use-case-portfolio-560c` | older `main`, then many commits | Home, About, projects, case studies, nav | Passing |
| #2 | `design/portfolio-visual-foundation-2026` | current `main` | `app/page.tsx`, `components/project-row.tsx` | Failing lint |
| #3 | `content/about-brand-values-story-2026` | current `main` | `app/about/page.tsx` | Failing lint |

#2 and #3 fail before their own changes are really tested. ESLint on `main` reports two errors in `app/inquiry-form.tsx`: `Date.now()` during render, and `setState` inside an effect. Pull request #1 already fixed that file. #2 and #3 never received the fix, because they were branched from `main` before it existed there.

This phase copies that form fix onto a branch from `main` so the quality check can pass without taking the visual redesign. After it merges, #2 and #3 still need a rebase. Git will not do that automatically. Expect conflicts in `app/page.tsx` (#2) and `app/about/page.tsx` (#3) against #1.

Recommendation: treat #1 as the content base. Replay the useful ideas from #2 (covers and diagrams) and #3 (about story) as new, small pull requests after #1 merges. Merging #2 or #3 into `main` first, and then #1, creates two About pages and two homepages to untangle.

Alternative considered: close #2 and #3 with no follow-up. Rejected, because the visual system and the About story are real intentions. They should be redone on the surviving base, not discarded unread.

## What to preserve

- The App Router, the layout, and the `/work/[slug]` URLs.
- One project record per case study, with an honest status. Do not mark a design as a production system.
- The contact form, the resume request, and the rule that API keys stay in server environment variables.
- Redirects that already exist. Add new redirects when a URL moves. Do not delete a public URL in the same change that invents its replacement.
- Tailwind v4 tokens in `app/globals.css`. A visual redesign is a later phase, and it follows [design-process.md](design-process.md) before code.

## What needs refactoring later

- `lib/portfolio.ts` is both the type definition and every case study. Split data from types when the Work / Side Quests labels land.
- Pull request #1's `lib/sales.ts` repeats fields that `lib/portfolio.ts` already has. A content model should have one record per project. That merge is a pull request of its own, after #1 lands.
- `components/brand-avatar.tsx` uses a plain `<img>`. ESLint warns. Switching to `next/image` is a small, separate change.
- There is no automated test for the contact API or for project slug integrity.

## Accessibility notes, not yet fixed

- Focus outlines exist globally in `globals.css`. Keep them.
- The mobile nav on the redesign branch has a button and `aria-expanded`. The `main` header is simpler. Whichever header survives needs a keyboard path and a visible focus state.
- Data tables scroll sideways on purpose. The page itself should not.
- Form fields need labels. The inquiry form has them. Do not replace those labels with placeholder-only inputs.

## Technical debt that is acceptable for now

- No component test library. The next section of the workflow doc explains why.
- Prettier is installed and not enforced in CI. Turning it on touches every file. Do that in a pull request that contains no other edits, or do not turn it on yet.
- GitHub Actions warns that `actions/checkout@v4` and `actions/setup-node@v4` are forced onto Node 24. The project still asks for Node 22 inside the job. That warning is upstream. It is not a reason to upgrade the app.
