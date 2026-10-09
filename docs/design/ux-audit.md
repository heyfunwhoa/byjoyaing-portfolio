# UX audit — byjoyaing.com
Date: 2026-10-09
Status: preliminary source-code audit, not a completed browser or user test.

## Purpose and audience
Primary: founder or hiring leader assessing commercial leadership.
Secondary: recruiter seeking evidence; product/technical collaborator assessing judgment and projects.
Goal: understand professional value within ~10 seconds and reach relevant case studies or contact.

## Findings (source-code evidence)
| Priority | Finding | Evidence | Recommendation |
|---|---|---|---|
| P0 | Technical systems dominate professional identity | `app/page.tsx` hero says "I build the systems..." and `lib/portfolio.ts` avatar is Technical GTM systems | Lead with "Commercial Leader. Curious Builder." and show credible people/business outcomes |
| P0 | Professional work and independent builds overlap | `components/site-header.tsx` has About / Projects / Contact; projects link to `/work/[slug]` | Split Work case studies from Side Quests; keep old links via redirects |
| P0 | Current About doesn't yet tell the personal story | `app/about/page.tsx` emphasizes skill lists and frameworks | Adapt reviewed career-story and values copy from existing PR #3 |
| P1 | CTA favors projects over leadership | `app/page.tsx` primary "View Projects" | Feature "Explore my work" and secondary "Explore side quests" |
| P1 | Technical terminology appears early | `app/page.tsx` references catalogs and evidence logic before leadership context | Explain impact before implementation details |
| P1 | Current canonical metadata points to preview domain | `app/layout.tsx` metadataBase points to vercel.app | Verify production domain configuration and update canonical metadata |
| P1 | An internal link appears invalid | `app/page.tsx` links to `/about#ai` but reviewed About has no matching id | Resolve or remove during navigation migration |
| P2 | Starter README remains generic | `README.md` create-next-app boilerplate | Replace with architecture and development guide after decisions |

## What works
- Server-rendered Next.js routes, TypeScript, shared components, responsive Tailwind classes.
- Explicit project maturity language; preserve not-live / evidence caveats.
- Experience timeline, project case-study data, and reusable layouts are valuable assets.

## Not yet verified
Real-browser interactions; keyboard focus; screen reader reading order; contrast values; responsive screenshots; Lighthouse/Web Vitals; live-site deployment; user research; claim accuracy; broken-link crawl.
Do not report these as passed.

## First design exercise
Evaluate the homepage under visual hierarchy, proximity, typography, contrast, consistency, affordance, responsive behavior, and accessibility. Explain each principle with screenshots or code evidence. Sketch two alternative hero layouts before implementation.
