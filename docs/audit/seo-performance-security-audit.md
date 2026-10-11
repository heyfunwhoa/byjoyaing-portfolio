# SEO, performance, and security audit

**Date:** 2026-10-11  
**Scores:** none. Lighthouse and CrUX were not run. Do not quote a Core Web Vitals number from this document.

## SEO — verified

| Item | Observation |
| --- | --- |
| metadataBase | `https://www.byjoyaing.com` in `app/layout.tsx` |
| Title template | `"%s"` only, so each page must supply a full title |
| Homepage title | Kristen Joy Aing — Revenue & GTM Leader · Curious Builder |
| Description pattern | Pages set their own. Homepage description covers enterprise cybersecurity selling, people development, GTM, and independent builds. |
| Canonical | Homepage and contact set `alternates.canonical` in source. Other routes were not all re-read. |
| Sitemap | 33 URLs, HTTP 200. Generated from `app/sitemap.ts`. |
| Robots | `allow: /` plus sitemap URL. No disallows. |
| Open Graph | Homepage and contact set `openGraph.url`. A dedicated sharing image was not confirmed in this pass. |
| JSON-LD | Person: name, url, description, knowsAbout, sameAs LinkedIn and GitHub. No telephone. |
| H1 | Every sitemap URL had one parsed h1. |
| `/approach` | 301/308-style permanent redirect to `/about` (Next `permanent: true`). Final URL `/about`. |
| `/ai-academy/git-lab` | Permanent redirect to `/ai-academy/version-control`. |

## SEO — defects

1. **AUD-02.** `/ai-academy/programming` is in the sitemap and marked `noindex, nofollow`.
2. **AUD-02.** Indexable 200s missing from the sitemap: `/work/storytelling-guide`, `/builder-academy/identity-journey`, `/builder-academy/credential-risk`, `/ai-academy/playground/skill-builder`, `/ai-academy/playground/research-pipeline`, `/ai-academy/journeys/prompting`, `/ai-academy/journeys/source-verification`, `/ai-academy/devops/build-rate-limits`, `/ai-academy/dependencies/lockfiles`, `/ai-academy/systems` is in the sitemap. The journeys and builder-academy pages are not.
3. Parent `/ai-academy/playground` is noindex while two children are indexable.
4. Title separators are inconsistent (`—`, `|`, and the homepage em dash). AUD-07.
5. 404 documents use the homepage title, so an error looks like the homepage in a tab. There is no `app/not-found.tsx`.
6. `/capabilities/sales-leadership` 404s. Nothing in the five capability slugs uses that path. Dead only if an old link exists. No inbound link was searched beyond the crawl list.

**Recommendation.** Pick an index set that matches the six-item story: Home, About, Experience, Work, project and side-quest studies that are approved, Field Notes, Contact. Noindex the academy labs and the storytelling guide, or add them to the sitemap with unique titles after an editorial pass. Do both on purpose. Remove noindex URLs from the sitemap.

Internal linking from the homepage to Work, About, and Experience is sound. Footer linking is thin.

Keyword stuffing is not a problem. The homepage title already says the positioning once.

## Performance — inspected, not measured

| Topic | What the code shows | Unmeasured |
| --- | --- | --- |
| Fonts | Geist Sans and Geist Mono via `next/font/google` in `app/layout.tsx`. No `geist` npm package in the layout. | Font swap and LCP |
| Images | Avatar path remains `/avatar.png` by brand rule. Technology logos are vendored SVGs. | Byte size and CLS |
| Client JS | Public pages avoid `@/components/ui` except `TooltipProvider` in the root layout (shadcn adoption test). Design-lab demos are unmounted. | Bundle analyzer |
| Rendering | App Router. Project pages are server components with a few dedicated case components. | TTFB, INP |
| Caching / deployment | Production deploys from `main`. This audit did not pull a new Vercel runtime log. | Cache headers |

A later release can run Lighthouse against production and attach the report. Until then, the acceptance line is "no regression in the routes that already return 200," not a score target.

## Security and privacy — verified boundaries

| Check | Result |
| --- | --- |
| Phone number in TS/TSX | Absent |
| Joy Index import | Forbidden by ADR 0002 and the content model. No route. |
| Secrets in the audit | None added |
| Prototype / account-signal / private-work / design-lab | `noindex` where the page exists. Design lab 404 in production. |
| External links on contact | `rel="noreferrer"` on LinkedIn and GitHub |
| Content Security Policy | Not reviewed in `next.config.ts` (file only defines the `/approach` redirect). **Unverified.** |
| Dependency advisories | Not run in this audit. CI includes a security workflow file; job results were not opened. |
| Form spam | `InquiryForm` and `/api` routes were not exercised. |
| `/private-work` authorization | **Unverified.** HTTP 200 plus `noindex` is not an access control. |
| Client-side passwords | Not recommended. Existing security note already says hiding is not authorization. |

**Recommendation.** Before any password-protected case study, use server-side authorization. Do not add a password constant in a client component. Confirm what `/private-work` actually gates, and either enforce it or stop describing it as private.
