# Prioritized product backlog

**Date:** 2026-10-11  
**Baseline:** `a76e5e9` and the live fetch the same day.  
**Effort** describes the change size. It is not a schedule.

Severity: **P0** broken behavior, serious accessibility barriers, exposure of sensitive data, or a confirmed vulnerability. **P1** positioning, navigation, mobile, missing commercial proof, or material SEO. **P2** consistency and storytelling. **P3** polish.

No P0 item was confirmed. `/private-work` stays P1 until authorization is either demonstrated or the page stops claiming privacy.

| ID | Page or component | Category | Description | Evidence | Impact | Severity | Solution | Effort | Dependencies | Acceptance | Source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| AUD-01 | `/prototype` | Positioning | Public page uses the retired headline | Live h1; `app/prototype/page.tsx` | High for anyone with the URL | P1 | Production `notFound()`, matching the design lab, or delete the route | One page and a test that production cannot render the old h1 | None | GET `/prototype` is 404 in production. Homepage h1 unchanged | Brand guide §3; C7 |
| AUD-02 | Sitemap and academy routes | SEO | Index flags and sitemap disagree | Route inventory | High for search | P1 | Remove noindex URLs from `app/sitemap.ts`. Noindex lab children or list them on purpose | `app/sitemap.ts`, metadata on the lab pages, one test | Editorial choice on which academy pages are public essays | Sitemap URLs and robots meta match. Programming is not both listed and noindex | `app/sitemap.ts`, `app/robots.ts` |
| AUD-03 | `/work/[slug]`, header | IA | Shared URL hides kind. Nav highlights nothing | `kindBySlug`, `isActive`, detail page | High for Work vs Side Quests | P1 | Render kind from the registry. Set active nav from kind, not from the `/work` prefix | Detail template plus `isActive` and a test | ADR 0003 stays. No redirects | Side quest detail shows Side Quest and highlights Side Quests. Competitive study shows professional practice and highlights Work | ADR 0003 |
| AUD-04 | `/work` | Content | Case studies are the commercial proof and must stay qualitative | `public-stories.ts` | High if a later edit invents numbers | P1 | Scan pass only. Keep approved sentences. Separate individual role from team outcome where the copy already does | Copy review, small edits if a sentence overclaims | Owner approval for any new fact | No new revenue, customer, or title. Coaching still distinct from formal management | Content model; brand guide |
| AUD-11 | `/private-work` | Security | noindex 200 is not an access test | Live fetch | High if the body is sensitive and ungated | P1 | Read the page implementation. Enforce server-side auth or make the public body obviously non-sensitive | Depends on what the page contains | Security note | Unauthenticated response matches the documented policy | `docs/security/selected-work-access.md` |
| AUD-05 | Homepage | Content density | Hero is right. Lower page may repeat other indexes | `app/page.tsx` | Medium | P2 | Compare sections to `/work` and cut duplicates only | Homepage sections | AUD-04 | Hero copy unchanged. One side quest remains | Brand guide hero baseline |
| AUD-06 | Experience, footer | IA | Timeline is real and unnamed in the header and footer | Live `/experience`; layout footer | Medium for recruiters | P2 | Add text links from About, Work, and the footer. Do not add a resume button | Layout footer, maybe About | ADR 0003 | `/experience` reachable from footer. `/resume` still 404 | ADR 0003 |
| AUD-07 | Metadata | SEO | Title separators differ | Live titles; layout template `"%s"` | Medium | P2 | Helper or convention: `Topic — Kristen Joy Aing` and a unique description | Layout and page metadata | AUD-02 | Sample of indexable routes shares the pattern | Layout metadata |
| AUD-08 | Contact | Decision | PR #53 conflicts with the live page | `gh pr view 53` | Medium if merged blindly | P2 | Explicit keep-main or adopt-branch decision. Phone stays off | Separate branch | Owner | Live contact still has email, LinkedIn, GitHub, and no phone | `app/contact/page.tsx` |
| AUD-09 | Sitewide | Accessibility | Checklist not executed in a browser | This audit | Medium until measured | P2 | Keyboard, focus, contrast, 320–1440, 200% zoom, reduced motion | Test notes in the PR | After AUD-01 if the prototype is removed | Results written down. Failures fixed or waived with a reason | Accessibility audit |
| AUD-10 | Security Market Map | Content | Public repo has no case-study page | README; Side Quests outbound link | Medium | P2 | Write a short Side Quest from the README's own claims | New or existing slug, registry kind `side-quest` | Owner copy approval | No vendor rankings. Identity slice described as sourced. Other domains described as incomplete | `docs/portfolio-priorities-2026.md` |
| AUD-12 | 404 | UX | Default title and h1 "404" | Live unknown route | Low | P2 | `app/not-found.tsx` with "Page not found", a link home, and a specific title | One file | None | Unknown URL title is not the homepage title | Route inventory |
| AUD-13 | Field Notes index | Content | Four collections may exceed two articles | v2 PRD at older SHA. Not re-counted this pass | Medium if empty titles remain | P2 | Read the index and delete or label unpublished titles | `app/field-notes/page.tsx` | Confirm against source | Every title on the index resolves | Content audit |
| AUD-14 | Brand guide banner | Docs | Status line lags the shipped hero | Brand guide lines 3 and 54–58 | Low, causes future rework | P3 | One sentence in the canonical guide | Docs only | Owner | Banner agrees with §3 | C1 |
| AUD-15 | Design lab demo | UI | Bento, Lifeline, Dialog unmounted | Component docs; live 404 | Low | P3 | Leave unmounted | None | A later lab review | `/design-lab` still 404 in production | C6 |
| AUD-16 | Avatars and motion | Polish | Optional | Brand avatar doc | Low | P3 | After AUD-09 | Separate PR | Approved assets only | Still `/avatar.png` until a new asset is approved | Avatar system |

## Suggested order

AUD-11 and AUD-01 first, because they change what a stranger can open. AUD-02 and AUD-03 next. AUD-04 beside them as a review, not a rewrite. AUD-08 only with an explicit contact decision. AUD-10 after copy exists. AUD-09 wraps the release that touches UI.
