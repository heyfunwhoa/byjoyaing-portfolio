# SEO, content and responsive release verification

**Applies to:** Portfolio Experience 2.0 changes.
**Status:** Checklist and test plan, **not evidence of a completed browser audit**.
**Product requirements:** [canonical PRD](../product/portfolio-experience-v2-prd.md), section 31.

## Automated validation (must actually execute)
- [ ] `npm ci`
- [ ] `npm run lint`
- [ ] `npm test`
- [ ] `npm run build`
- [ ] Security scan / dependency audit configured for the PR's head commit.
- [ ] PR mergeability after latest `main` and no unexpected modified sensitive files.

## On-site technical checks
- [ ] Inspect `/robots.txt` and `/sitemap.xml`: root, About, Work, Field Notes, Side Quests, Academy and published details included; private/request-only material excluded.
- [ ] Inspect the rendered homepage and major page `<head>` for unique title/description, canonical URL, Open Graph tags and social image.
- [ ] Validate JSON-LD script parses as Person, uses public identity links only and no undisclosed address, phone or private attributes.
- [ ] Check older `/experience`, `/projects`, `/work/[slug]` routes resolve intentionally. Audit duplicate-content canonical strategy only after comparing actual rendered content.
- [ ] Validate contact form success, loading, error and rate-limit behavior, no confidential data in logs.

## Responsive + keyboard matrix

| Width / mode | Inspection |
| --- | --- |
| 320px | Long hero words, menu backdrop and scrolling, CTA fit, content overflow |
| 375px and 390px | No sideways page scroll, readable cards/tables, 44px+ interactive targets |
| 768px | Navigation stays usable, grids reflow, tap paths |
| 1280px | Headline hierarchy, column alignment, scan path |
| 200% zoom | Content remains usable without clipped controls or critical text |
| Keyboard only | Skip link, Tab order, Escape menu, focus restoration, interactive labs |
| Screen reader | Landmark structure, single H1, image alt, evidence labels, clear link names |
| Reduced motion | No essential content depends on animation and no surprising movement |

## Core Web Vitals and discovery
- [ ] Run production Lighthouse on representative mobile and desktop settings, recording URL, date and environment; target LCP <= 2.5s, INP <= 200ms and CLS <= 0.1.
- [ ] Record Search Console page indexing and query baseline before proposing SEO KPI improvements.
- [ ] Validate social preview using actual preview services where accessible.
- [ ] If adding analytics, define the purpose and retention, respect consent and do not expose visitors' query strings or private identifiers.

## Content and permission gates
- [ ] Every professional metric/outcome has a reviewable source and an approved public wording.
- [ ] Formal management, informal mentoring and individual deal results are never conflated.
- [ ] Every Field Note is labeled Published versus Planned and practice versus illustrative.
- [ ] Every independent build's screenshot or diagram is marked as live evidence, sample output or proposed design.
- [ ] New portrait/avatar artwork requires approval of likeness and rights.

## Release report template

| Control | Result | Link or screenshot evidence | Reviewer |
| --- | --- | --- | --- |
| CI + Security | Not recorded | — | — |
| SEO output | Not recorded | — | — |
| Mobile/browser QA | Not recorded | — | — |
| Content approval | Not recorded | — | — |
| Vercel production SHA + READY | Not recorded | — | — |

**Do not check boxes in this document based only on code inspection.** A merged PR means code reached `main`, not that production or UX was verified.
