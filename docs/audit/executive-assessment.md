# Executive audit summary

**Date:** 2026-10-11  
**Site fetched:** https://www.byjoyaing.com/  
**Code inspected:** `a76e5e9` on `main`  
**Scope:** Discovery and recommendations. No visual redesign in this change.

## What is working

The first screen does the job the brand guide assigns it. The live homepage `h1` is "Revenue & GTM Leader. Curious Builder." The eyebrow is enterprise cybersecurity and revenue and GTM. The philosophy line and the short biography name Kristen Joy Aing as someone who sells into complex security decisions, coaches people around the deal, and builds systems when the same friction repeats. Primary action is Explore Work. About is secondary.

Work is a professional index. Its three collections are Enterprise Sales, People & Leadership, and GTM Strategy. The stories in `lib/public-stories.ts` name Rapid7 and Forcepoint selling scope, coaching and onboarding, and competitive field guidance. They withhold customers, contract details, and unsupported metrics. The only software record classified `kind: "work"` is the competitive-intelligence field approach. Independent builds are classified `side-quest` even when the URL is `/work/[slug]`.

Employment titles in `lib/portfolio.ts` stay account-executive and channel titles. The site does not call Kristen Head of Sales. The phone number is absent from TypeScript and TSX. JSON-LD in `app/layout.tsx` publishes name, URL, description, `knowsAbout`, LinkedIn, and GitHub. `/design-lab` returns 404 in production. `/approach` permanently redirects to `/about`. Geist is the only loaded family (ADR 0001).

## Biggest weaknesses

A visitor who opens a project from Side Quests lands on `/work/[slug]`. The header then highlights neither Work nor Side Quests (`lib/site-nav.ts`). The detail template does not read `kind` from the registry before it renders. ADR 0003 accepts the shared URL. The label and the active state still have to carry the distinction.

`/prototype` is a public 200 with `noindex`. Its `h1` is "Commercial Leader. Curious Builder." The page says it is not the published homepage. The headline still contradicts the accepted positioning for anyone who has the URL.

The sitemap and the index flags disagree. `/ai-academy/programming` is in `app/sitemap.ts` and ships `noindex`. Several academy and builder routes return 200 with no robots meta and are absent from the sitemap, including playground children whose parent is `noindex`. `/work/storytelling-guide` is the same pattern: indexable, unlisted.

Title patterns differ because the root title template is `"%s"` only: "About — Kristen Joy Aing" beside "Work | Revenue & GTM Leadership". That is a metadata consistency issue, not a positioning failure.

The footer is the signature, the positioning line, and email. It does not repeat section links. Experience is a real page and is linked from Home and Work. It is not in the header. `/resume` is a 404, which matches the decision to drop the resume request.

## Critical problems

No P0 defect was verified in this pass: no published phone number, no Joy Index paste, no broken primary nav route, and no measured security vulnerability. Two items sit at the top of P1 because they can mislead a careful reader or a crawler:

1. The public prototype headline "Commercial Leader."
2. Sitemap entries that contradict `noindex`, plus indexable lab pages that were never added to the sitemap on purpose.

`/private-work` returns 200 and `noindex`. This audit did not exercise an auth gate. Treat server-side authorization as unconfirmed, not as a passed control.

## Standards conflicts

### C1 — Brand guide status versus shipped hero

The guide's status banner says homepage layout and IA are still under review. Section 3 of the same guide specifies the hero that is live. **Recommendation:** a reviewed one-line status edit in the brand guide after this audit is accepted. Do not reopen the hero copy as part of that edit.

### C2 — Unread shared engineering baseline

`docs/engineering-standards.md` points at `technical-docs-platform` and marks controls "not assessed." ADR 0002 says local standards remain authoritative until that repository can be read. **Recommendation:** keep [docs/development-workflow.md](../development-workflow.md) and CI as the working bar. Do not copy an unread policy into this repo.

### C3 — Historical redirect roadmap

`docs/rebuild-roadmap.md` proposed sending `/experience` to `/work` and `/projects` to `/side-quests`. ADR 0003 rejects those redirects. **Recommendation:** leave the routes. Point readers at ADR 0003 when the roadmap is next touched.

### C4 — Collection name versus URL

Nav labels say Work and Side Quests. Case-study URLs share `/work/[slug]`. ADR 0003 says kind, not the prefix, is the classification, and that a personal project is not Work because of its URL. **Recommendation:** show the registry kind on the detail page and in the breadcrumb. Do not add the redirects.

### C5 — Contact pull request

`main` contact is live: "Let's connect.", email, LinkedIn, GitHub, inquiry form, Keyline icons. Draft PR #53 is open and `CONFLICTING`. **Recommendation:** leave #53 until there is an explicit decision to adopt that layout. This audit does not merge it.

### C6 — Design-lab demo versus shipped lab page

`components/design-lab/demos.tsx` includes Bento Grid, Lifeline, Dialog, and Sheet. The shipped `/design-lab` page is the editorial workshop and is 404 in production. Component docs already say the preview is not mounted. **Recommendation:** keep it unmounted until a reviewed lab change says otherwise.

### C7 — Superseded UX audit

`docs/design/ux-audit.md` (2026-10-09) is marked historical and still contains the old "Commercial Leader" recommendation. **Recommendation:** leave the file as history. Do not implement it.

## Top 10 improvements

Ordered by impact on a founder, a sales hiring manager, or a crawler. Effort is scope, not a calendar estimate.

| Rank | ID | Priority | Improvement | Evidence | Why it matters |
| --- | --- | --- | --- | --- | --- |
| 1 | AUD-01 | P1 | Stop serving "Commercial Leader" on `/prototype`, or require the same production `notFound()` gate the design lab uses. | Live 200, `h1` verified, `app/prototype/page.tsx` | A shared URL contradicts the positioning the homepage gets right. |
| 2 | AUD-02 | P1 | Make sitemap, `noindex`, and academy routes describe one index policy. | `app/sitemap.ts` includes `/ai-academy/programming`, which is `noindex`. Playground children, journeys, builder-academy pages, and `/work/storytelling-guide` are 200 and unlisted. | Search engines get mixed instructions about what this site is. |
| 3 | AUD-03 | P1 | On every `/work/[slug]` page, show Work or Side Quest from `kindBySlug`, and point the header at the matching index without changing the URL. | `isActive` ignores nested `/work/` paths. Detail page does not branch on kind. | Journey C and Journey A currently share a URL that looks like employment work. |
| 4 | AUD-04 | P1 | Keep the three Work stories as the commercial proof, and fill the case-study frame only with already approved sentences. | `public-stories.ts` withholds amounts. Registry evidence is `requires-review`. | Hiring managers need the selling story to stay easier to scan than the simulators. |
| 5 | AUD-05 | P2 | Give the homepage one job: positioning, two proof points, one side quest, contact. Leave the full collections on `/work` and `/side-quests`. | Homepage already leads correctly. It also repeats role lines and a side-quest teaser. | Density is the remaining homepage risk, not the headline. |
| 6 | AUD-06 | P2 | Put `/experience` on the recruiter path from the Work page and About, and keep it out of a resume button. | `/experience` is 200 and absent from `primaryNav`. `/resume` is 404. | Journey B can reach the timeline today via in-page links. The header never names it. |
| 7 | AUD-07 | P2 | One title pattern: `Page — Kristen Joy Aing`, with a specific description on every indexable URL. | Live titles mix em dash, hyphen, and pipe. Root template is `"%s"`. | Sharing cards and browser tabs should read as one site. |
| 8 | AUD-08 | P2 | Resolve contact only by an explicit choice between `main` and PR #53. Keep phone off the page. | PR #53 `mergeable: CONFLICTING`. Live contact has no phone. | Two contact designs exist. Shipping the branch by accident would skip review. |
| 9 | AUD-09 | P2 | Run the accessibility evidence pass the checklist already names: keyboard, focus, contrast pairs, 320–1440, 200% zoom, reduced motion. | Prior mobile-menu fix is in `menuPanelClass` (`hidden` when closed). This audit did not retest it in a browser. | Code comments are not a WCAG 2.2 AA result. |
| 10 | AUD-10 | P2 | Add a Security Market Map case study only after a reviewed public summary. Leave private repos and the CI-to-Slack ops story unpublished. | Public README read. Side Quests already links the GitHub repo. Priorities doc says the registry listing waits on a case study. | The map supports cybersecurity fluency. Publishing it from an unread diff would invent status. |

## Proposed documentation structure

Use this `docs/audit/` set as the dated finding. Keep these existing documents as authority:

- Brand, avatars, editorial voice
- ADR 0001, 0002, 0003
- `docs/product/portfolio-experience-v2-prd.md`
- `docs/design/component-inventory.md` and `component-adoption.md`
- `docs/content-model.md` and `docs/public-project-registry.md`

When a later pull request changes a canonical rule, edit that canonical file in the same pull request. Do not let this audit folder become a second brand guide.

## Implementation sequence

Adjust the five release buckets to the findings above. Do not start them until this audit is reviewed. Do not merge to `main` from the audit branch.

1. **Foundation.** AUD-01 prototype gate. AUD-02 index policy. Confirm `/private-work` authorization or document the gap. Re-test the closed mobile menu at 320 and 375.
2. **Positioning.** AUD-03 kind labels on shared URLs. AUD-04 scan pass on the three Work stories using existing sentences. AUD-05 homepage trim only if a side-by-side read shows duplicated sections. AUD-06 experience links. AUD-08 contact decision, separate from this branch.
3. **Projects.** AUD-10 market-map summary when copy is approved. Keep synthetic Northline studies labeled fictional and unfeatured.
4. **Technical quality.** AUD-07 titles and descriptions. AUD-09 accessibility evidence. Build, lint, and the existing node tests. Measure performance with a real tool before quoting a score.
5. **Selective enhancement.** Avatars, motion, and new components only after 1–4. Leave Bento and Lifeline unmounted.

## Assumptions

- The HTML fetch hit production. `/design-lab` 404 matches the production gate in source, so the user-visible editorial pages match `a76e5e9` for the routes compared.
- HTTP 404 from the GitHub integration means "not visible to this token," including private repositories.
- Coaching figures already published in `public-stories.ts` (two SDRs into closing roles, seven GTM hires) are the approved public wording. This audit does not add new counts.
- No visitor analytics were available, so journey friction is a structural reading.
