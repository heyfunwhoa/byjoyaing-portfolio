# Portfolio editorial foundation

**Status:** Adoption record for this repository's Keystatic editor. It does not replace the brand guide, the product requirements, the content model, the route taxonomy, or the URL migration map.  
**Date:** 2026-10-14  
**Issue:** [KRU-109](https://linear.app/krusty/issue/KRU-109) for About. [KRU-111](https://linear.app/krusty/issue/KRU-111) for the Home cover.  
**Baseline:** `main` after merged [PR #155](https://github.com/heyfunwhoa/byjoyaing-portfolio/pull/155) (KRU-75 verification lesson), then reconciled with merged [PR #171](https://github.com/heyfunwhoa/byjoyaing-portfolio/pull/171) (CMS decision guide) and merged [PR #173](https://github.com/heyfunwhoa/byjoyaing-portfolio/pull/173) (CMS Fundamentals module, KRU-110).  
**Editor:** the existing local Keystatic install. Storage remains `{ kind: "local" }`. No second CMS, registry, or cross-repository sync.

Authority that still wins when this note and another file disagree:

- Identity and voice: [brand-guidelines.md](../brand/brand-guidelines.md)
- Product requirements: [portfolio-experience-v2-prd.md](../product/portfolio-experience-v2-prd.md), with Notion Portfolio Experience 2.0 as the planning page that points here
- Field and privacy rules, plus the cross-repository CMS decision guide: [content-model.md](../content-model.md)
- Routes and facets: [content-taxonomy.md](../design/content-taxonomy.md)
- URL moves: [content-migration-map.md](../design/content-migration-map.md)
- Lesson pilot contract: [KEYSTATIC-PILOT.md](../academy/KEYSTATIC-PILOT.md)

## What can be edited today

Local only. Set `KEYSTATIC_LOCAL=true`, run `npm run dev` on loopback, open `/keystatic`, edit, and save. Save writes the worktree. It does not open a pull request, deploy, or change who can read the public site.

| Record | File | What an editor may change | What stays in code |
| --- | --- | --- | --- |
| Home cover | `content/home/page.json` | Cover eyebrow, two-part headline, philosophy line, short body, avatar caption, and the homepage meta description | Bento, celestial frame, role lookup, side-quest choice, links, credibility copy, closing note, document title |
| About page | `content/about/page.json` | Visible About sentences, principles, education lines, interests, values, and the meta description | Portrait, capability orbit, career rail, tools map, link destinations, link labels, section ids, layout |
| Verification lesson | `content/academy/lessons/verification.json` | Title, summary, analogy, takeaways, exercise, sources, track, level, minutes, and editorial metadata | Slug, answer key, prerequisites, practice links, availability, path order, progress |

Each file is read by a build-time adapter. Unknown keys, a changed id, empty required text, and invalid metadata fail the build. There is no second copy to fall back to. React renders the text as text. The Open Graph image reads the Home eyebrow and headline from that same record.

`lib/public-personal.ts` projects the About record's beyond-work fields for the existing interest tests. It is not an independent editable copy.

Production `/keystatic` and `/api/keystatic/*` return 404 even if `KEYSTATIC_LOCAL` is set. That guard is unchanged.

## Home cover slice

The homepage job stays short. This slice moves the cover sentences that were already on `/`. It does not add a paragraph, and it does not move the credibility block, the bento, the side-quest tile, or the closing note.

The headline stays two fields because the page renders "Revenue & GTM Leader." and the italic "Curious Builder." as one heading. The avatar caption stays in the same record so the supporting line is not a second copy. Link labels stay in the page. The document title stays in `app/page.tsx` because `app/layout.tsx` uses a different default title string.

Role dates, titles, and companies still come from `lib/portfolio.ts` `roles`. The side quest is still the `detector-coverage-atlas` lookup.

## About vertical slice

The About job in the product requirements stays: who I am, public interests only, no Joy Index. This slice moves sentences that were already on the page. It does not rewrite them.

`connection` on each interest remains in the record because it was already approved public copy. The page still does not render it.

Career dates, titles, and companies stay in `lib/portfolio.ts` `roles`. The About career paragraph is prose. The rail derives its nodes from `roles`.

## Migration matrix

"CMS" means a future Keystatic singleton or collection in **this** repository, using the same local editor until hosted editing is explicitly approved. "Now" is implemented for About in KRU-109 and for the Home cover in KRU-111. Everything else is a decision, not a build.

| Surface | Shape | CMS-editable when migrated | Application-owned | Private — do not put in the CMS | Decision |
| --- | --- | --- | --- | --- | --- |
| Home | Singleton `content/home/page.json` | Cover eyebrow, two-part headline, philosophy line, short body, avatar caption, and meta description | Bento layout, celestial frame, role lookup, side-quest selection, links, status labels, credibility copy, closing note, document title | Joy Index, compensation, customer names | **Now.** Do not lengthen Home. |
| About | Singleton `content/about/page.json` | Sentences listed above | Orbit, rail, tools map, routes | Same private boundary | **Now** |
| Work narratives | Collection, one entry per existing `publicStories` id | Title, scope, context, contribution, execution, evidence limits, takeaway | `id`, area, related hrefs, kind, page composition | Employer documents, revenue, quota, customer identities | After Home. Validator stays in code. |
| Work and case studies | Collection keyed by existing slug | Public summary and redacted narrative fields that already exist on the case study | `kind`, slug, route `/work/[slug]`, status vocabulary, live/repo URLs only when already true | Unreviewed metrics, private walkthroughs, access grants | One record per slug. Do not copy a project into a second collection. |
| Projects directory | Not a separate collection | Nothing, until a case-study field moves | `lib/project-directory.ts` filters, category query values, lifecycle | Account data inside demos | Leave the directory as code. `/projects` stays. |
| Side Quests | Same records as case studies, `kind: "side-quest"` | Public summary, honest limitation, status sentence | Kind, maturity, subject group, "what runs today" checks | Upstream private repos, detector data, credentials | Edit the case-study record. The index only links. |
| Field Notes | Collection for a published note; index copy can be a singleton later | Title, standfirst, body paragraphs, evidence label, related links that already exist | Routes, illustrative/synthetic labeling rules, the source registry in `lib/field-notes.ts` | Live imports from Account Signal Engine, territory maps, customer records | Two live guides first. Unpublished titles stay labeled unpublished. |
| Academy lessons | One singleton per approved lesson id, as verification already is | Editorial fields in the KRU-75 contract | Check answers, prerequisites, routes, progress keys | Learner progress, employer overlays, answer keys | KRU-77 owns `reading-code-and-yaml` and `mcp-vs-rest-api`. Do not add a second editor. |
| Career history | Do not duplicate `roles` | A later prose field may point at Experience | `lib/portfolio.ts` `roles` is the only title/date/company record. Home excerpts and the rail read it. | Compensation, quota, private performance notes | Keep. A CMS copy of employers would split one fact. |
| Supporting evidence | Not a CMS collection | Public, already approved evidence sentences inside the owning story | Provenance, review state, access policy | Joy Index rows, selected-work tokens, resumes, inboxes | Evidence stays attached to its public story. |

Draft [PR #170](https://github.com/heyfunwhoa/byjoyaing-portfolio/pull/170) is not this matrix. It reimplements the lesson pilot and moves routes. Leave it draft.

## Hosted editing

Checked against [Keystatic GitHub mode](https://keystatic.com/docs/github-mode) and [Keystatic Cloud](https://keystatic.com/docs/cloud) on 2026-10-14, plus this repo's merged local pilot. **Neither mode is enabled.** No GitHub App, Cloud project, or secret was created.

| Requirement | Local mode today | GitHub mode | Keystatic Cloud |
| --- | --- | --- | --- |
| Authentication | Development plus `KEYSTATIC_LOCAL=true`. No login. Loopback same-origin API only. | GitHub login through a custom GitHub App. Collaborators need write access to the repo. | Cloud account. Docs say teammates can edit without their own GitHub account. Team membership grants every project in that team. |
| Repository access | The developer's worktree only. | App installed on `heyfunwhoa/byjoyaing-portfolio`. | A Cloud project connected to that repository. |
| Branches | Save writes the current branch's files. A human then commits and opens a PR. | Branch dropdown. `branchPrefix` can limit which branches the UI lists and creates. | Content still lands in Git. Confirm branch behavior in a future authorized spike. The Cloud docs reviewed here emphasize login and images, not a review policy. |
| Pull request review | Required by this repo's delivery rules. The editor does not open the PR. | A save is not branch protection. `publicationStatus: published` is not a merge. | Same. Cloud is not the review gate. |
| Previews | The local dev server. | A Vercel preview of the pushed branch. Not configured or verified for this mode. | Same preview dependency, plus experimental multiplayer on Pro. |
| Secrets | No editor secret. | `KEYSTATIC_GITHUB_CLIENT_ID`, `KEYSTATIC_GITHUB_CLIENT_SECRET`, `KEYSTATIC_SECRET`, and `NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG`. They belong in the host environment, never in git. | `storage.kind: "cloud"` and `cloud.project`. The Cloud account is the control plane. No image library is needed for this text. |
| Cost | MIT packages already installed. Existing CI. | No Keystatic subscription is listed in the GitHub mode doc. Each pushed save can spend CI minutes. | Free account, up to 3 users per team. Pro starts at $10/month for that team, then $5/month per additional user. Multiplayer and Cloud Images are Pro. Recheck before any purchase. |
| Deployment | Production returns 404 for the editor and its API. | Docs say copy the environment variables to the host and run Node for the API. The same page still says deploying is "Coming soon." Re-verify against Next.js 16.4.0 before enabling. | A config change to Cloud storage. The site must still serve the editor routes. Not verified here. |
| Rollback | Restore the JSON file, or revert the content commit. | Revert the content commit. Uninstalling the App removes editor login. It does not rewrite content. | Disconnect the Cloud project, then revert the content commit the same way. |

**Recommendation:** keep local mode. If a later review approves hosted editing, prefer **GitHub mode** over Cloud. This site already publishes through GitHub review, and the people who may edit it are the people who can open a pull request. Cloud's extra abilities — editors without GitHub accounts, shared image hosting, multiplayer — are not current requirements. Cloud team access is also a wider trust boundary than repository write access.

### Prerequisites before anyone enables hosted editing

This is Tier 3. It needs its own issue after a search for an existing one, plus explicit approval. Do not treat this document as that approval.

1. Prove a save cannot commit to the protected default branch. Set `branchPrefix` and test it.
2. Install a GitHub App on this repository only. Store the four GitHub-mode secrets in the deployment environment, separate from Resend, auth, and PostHog values.
3. Register callback URLs for the exact preview and production hosts.
4. Confirm production editor routes require the GitHub session and that `KEYSTATIC_LOCAL` still cannot turn on filesystem mode.
5. Push one content branch, let the existing checks run, and open the preview. Record the SHA that was read.
6. Reheck the Keystatic deploy notes against the installed Next.js version. The guide consulted for the pilot already lagged Next 16.
7. Drill rollback: revert the content commit and, separately, remove the App credentials.
8. Keep private case studies, the Joy Index, resumes, and learner progress out of the repository first. Editor login does not make public files private.

## Cross-repository adoption

Owning repositories stay authoritative. This portfolio does not sync their content, and they should not import this Keystatic config.

The class labels below are the same labels in the [content model decision guide](../content-model.md). That guide's "Possible later" column is a revisit trigger for the owning repository. It is not a second adoption decision. Notion Portfolio Experience 2.0 keeps About's job as who I am, with public interests only and no Joy Index. This slice does not change that job.

Access rechecked 2026-10-14 after PR #171: `heyfunwhoa/security-market-map` is public and its description was read. `gtm-revenue-os`, `account-signal-engine`, `detector-coverage-atlas`, `joy-index`, and `technical-docs-platform` still did not resolve with the available GitHub credential. Those five recommendations use this repo's content model, prior source register, and Linear scope. They are not fresh code audits. The shared engineering baseline in technical-docs-platform was **not** readable, so it was not treated as consulted.

| Repository | Class | Why |
| --- | --- | --- |
| security-market-map | **Later** | The public catalog is evidence, not marketing copy. A CMS must not become a second vendor inventory. Revisit only if that repo's maintainers split a small public explainer set from the catalog and choose an editor there. |
| gtm-revenue-os | **Do Not Adopt** | Commercial calculations and assumptions stay in the owning system. A future narrative guide would be a new decision in that repo, not this adoption. Portfolio pages already label related studies as synthetic. This session could not read the repo. |
| account-signal-engine | **Do Not Adopt** | Account signals, review history, and exports are application data. The content model forbids publishing those records. Editor auth would not be reader auth. Repo unread here. |
| detector-coverage-atlas | **Do Not Adopt** | Generated snapshots need a known-good publication gate, which is application logic. A CMS would be a parallel catalog. Upstream unread here. The public portfolio case study stays in this repo. |
| joy-index | **Do Not Adopt** | Private. No route, no import, no CMS projection. Unread here, and that absence is not permission to infer its contents. |
| technical-docs-platform | **Do Not Adopt** | Standards belong in reviewed Git documents. A CMS would create a second policy store. Unread here. Local engineering docs remain in force until that repo can be read. |

No repository in this table is **Adopt**.

## Next three implementation tasks

1. **Work narratives.** Move `lib/public-stories.ts` prose into a Keystatic collection. Keep ids, areas, related hrefs, and the evidence validator in code.
2. **KRU-77 lessons.** Migrate `reading-code-and-yaml` and `mcp-vs-rest-api` through the existing adapter. Do not take the route-group rewrite from draft PR #170.
3. **Field Notes bodies.** Move the two published guides' public paragraphs into the existing editor. Leave the source registry and unpublished titles in code.

Hosted editing is not one of the three. Career-prose cleanup comes after these, still without copying `roles`.

## Rollback for the Home cover

- Unsaved edit: reload the editor.
- Saved local experiment: `git restore --source=HEAD -- content/home/page.json`, then reload `/` and the editor.
- After a reviewed content commit: revert that commit and review the rollback PR.
- Remove the slice: revert the implementation commit so the cover literals and the verification-and-About config return together. Do not delete only the JSON while the adapter import remains.

## Rollback for the About slice

- Unsaved edit: reload the editor.
- Saved local experiment: `git restore --source=HEAD -- content/about/page.json`, then reload `/about` and the editor.
- After a reviewed content commit: revert that commit and review the rollback PR.
- Remove the whole slice: revert the implementation commit so the page literals, `lib/public-personal.ts`, and the verification-only config return together. Do not delete only the JSON while the adapter import remains.

No environment variable, credential, or deployment setting changes in this slice.
