# Portfolio editorial foundation

**Status:** Adoption record for this repository's Keystatic editor. It does not replace the brand guide, the product requirements, the content model, the route taxonomy, or the URL migration map.  
**Date:** 2026-10-16<br>
**Issue:** [KRU-109](https://linear.app/krusty/issue/KRU-109) for About. [KRU-111](https://linear.app/krusty/issue/KRU-111) for the Home cover. [KRU-112](https://linear.app/krusty/issue/KRU-112) for Work narratives. [KRU-77](https://linear.app/krusty/issue/KRU-77) for the two Academy lesson singletons. [KRU-115](https://linear.app/krusty/issue/KRU-115) for the two published Field Notes guides.  
**Baseline:** `main` after merged [PR #155](https://github.com/heyfunwhoa/byjoyaing-portfolio/pull/155) (KRU-75 verification lesson), then reconciled with merged [PR #171](https://github.com/heyfunwhoa/byjoyaing-portfolio/pull/171) (CMS decision guide) and merged [PR #173](https://github.com/heyfunwhoa/byjoyaing-portfolio/pull/173) (CMS Fundamentals module, KRU-110).  
**Editor:** the existing Keystatic install. Local loopback mode remains available. KRU-124 prepares an optional hosted GitHub mode; it is not enabled until the GitHub App and host environment are configured and the authenticated preview is verified. No second CMS, registry, or cross-repository sync.

Authority that still wins when this note and another file disagree:

- Identity and voice: [brand-guidelines.md](../brand/brand-guidelines.md)
- Product requirements: [portfolio-experience-v2-prd.md](../product/portfolio-experience-v2-prd.md), with Notion Portfolio Experience 2.0 as the planning page that points here
- Field and privacy rules, plus the cross-repository CMS decision guide: [content-model.md](../content-model.md)
- Routes and facets: [content-taxonomy.md](../design/content-taxonomy.md)
- URL moves: [content-migration-map.md](../design/content-migration-map.md)
- Lesson pilot contract: [KEYSTATIC-PILOT.md](../academy/KEYSTATIC-PILOT.md)

## What can be edited today

Local editing remains available. Set `KEYSTATIC_LOCAL=true`, run `npm run dev` on loopback, open `/keystatic`, edit, and save. Save writes the worktree. It does not open a pull request or deploy. Hosted editing is only available after KRU-124's GitHub App and Vercel configuration is complete.

| Record | File | What an editor may change | What stays in code |
| --- | --- | --- | --- |
| Work narratives | `content/work/stories/*.json` | Title, scope, collaboration, decision, context, contribution, execution, evidence, and takeaway | Id, area, related links, explorer composition, anchor map |
| Home cover | `content/home/page.json` | Cover eyebrow, two-part headline, philosophy line, short body, avatar caption, and the homepage meta description | Bento, celestial frame, role lookup, side-quest choice, links, credibility copy, closing note, document title |
| About page | `content/about/page.json` | Visible About sentences, principles, education lines, interests, values, and the meta description | Portrait, capability orbit, career rail, tools map, link destinations, link labels, section ids, layout |
| Verification lesson | `content/academy/lessons/verification.json` | Title, summary, analogy, takeaways, exercise, sources, track, level, minutes, and editorial metadata | Slug, answer key, prerequisites, practice links, availability, path order, progress |
| Reading code and YAML | `content/academy/lessons/reading-code-and-yaml.json` | Same editorial fields as verification | Same code boundary as verification, including the companion guide |
| MCP versus REST | `content/academy/lessons/mcp-vs-rest-api.json` | Same editorial fields as verification | Same code boundary, including Follow one click progress |

Each file is read by a build-time adapter. Unknown keys, a changed id, empty required text, and invalid metadata fail the build. There is no second copy to fall back to. React renders the text as text. The Open Graph image reads the Home eyebrow and headline from that same record.

`lib/public-personal.ts` projects the About record's beyond-work fields for the existing interest tests. It is not an independent editable copy.

Production `/keystatic` and `/api/keystatic/*` return 404 unless GitHub mode is explicitly selected and all required credentials are configured. `KEYSTATIC_LOCAL` cannot enable filesystem mode outside development. API responses use private no-store headers.

## Work narrative slice

The three `publicStories` records stay the Work index stories. This slice moves their sentences into `content/work/stories`. It does not rewrite them, and it does not move case-study pages.

`lib/public-stories.ts` still owns the id order, area, and related links, and `validatePublicStories` still checks those links. `lib/featured-work.ts` still owns the anchor for each id. An extra file, a missing id, or a link stored in the JSON fails closed. Collaboration and decision move with the other sentences so one story is not split across two files.

## Home cover slice

The homepage job stays short. This slice moves the cover sentences that were already on `/`. It does not add a paragraph, and it does not move the credibility block, the bento, the side-quest tile, or the closing note.

The headline stays two fields because the page renders "Revenue & GTM Leader." and the italic "Curious Builder." as one heading. The avatar caption stays in the same record so the supporting line is not a second copy. Link labels stay in the page. The document title stays in `app/page.tsx` because `app/layout.tsx` uses a different default title string.

Role dates, titles, and companies still come from `lib/portfolio.ts` `roles`. The side quest is still the `detector-coverage-atlas` lookup.

## About vertical slice

The About job in the product requirements stays: who I am, public interests only, no Joy Index. This slice moves sentences that were already on the page. It does not rewrite them.

`connection` on each interest remains in the record because it was already approved public copy. The page still does not render it.

Career dates, titles, and companies stay in `lib/portfolio.ts` `roles`. The About career paragraph is prose. The rail derives its nodes from `roles`.

## Migration matrix

"CMS" means a future Keystatic singleton or collection in **this** repository, using the same local editor until hosted editing is explicitly approved. "Now" is implemented for About in KRU-109, the Home cover in KRU-111, Work narratives in KRU-112, the two KRU-77 lesson singletons, and the two published Field Notes guides in KRU-115. Everything else is a decision, not a build.

| Surface | Shape | CMS-editable when migrated | Application-owned | Private — do not put in the CMS | Decision |
| --- | --- | --- | --- | --- | --- |
| Home | Singleton `content/home/page.json` | Cover eyebrow, two-part headline, philosophy line, short body, avatar caption, and meta description | Bento layout, celestial frame, role lookup, side-quest selection, links, status labels, credibility copy, closing note, document title | Joy Index, compensation, customer names | **Now.** Do not lengthen Home. |
| About | Singleton `content/about/page.json` | Sentences listed above | Orbit, rail, tools map, routes | Same private boundary | **Now** |
| Work narratives | Collection, one entry per existing `publicStories` id | Title, scope, collaboration, decision, context, contribution, execution, evidence limits, takeaway | `id`, area, related hrefs, kind, page composition, anchor map | Employer documents, revenue, quota, customer identities | **Now.** Validator stays in code. |
| Work and case studies | Collection keyed by existing slug | Public summary and redacted narrative fields that already exist on the case study | `kind`, slug, route `/work/[slug]`, status vocabulary, live/repo URLs only when already true | Unreviewed metrics, private walkthroughs, access grants | One record per slug. Do not copy a project into a second collection. |
| Projects directory | Not a separate collection | Nothing, until a case-study field moves | `lib/project-directory.ts` filters, category query values, lifecycle | Account data inside demos | Leave the directory as code. `/projects` stays. |
| Side Quests | Same records as case studies, `kind: "side-quest"` | Public summary, honest limitation, status sentence | Kind, maturity, subject group, "what runs today" checks | Upstream private repos, detector data, credentials | Edit the case-study record. The index only links. |
| Field Notes | Collection for a published note; index copy can be a singleton later | Title, standfirst, body paragraphs, evidence label, related links that already exist | Routes, illustrative/synthetic labeling rules, the source registry in `lib/field-notes.ts` | Live imports from Account Signal Engine, territory maps, customer records | **Now** for `/field-notes/enterprise-deal` and `/field-notes/multithreading`. Index copy and unpublished titles stay in code. |
| Academy lessons | One singleton per approved lesson id, as verification already is | Editorial fields in the KRU-75 contract | Check answers, prerequisites, routes, progress keys | Learner progress, employer overlays, answer keys | **Now** for `reading-code-and-yaml` and `mcp-vs-rest-api` on KRU-77. Other lessons stay in code. Do not add a second editor. |
| Career history | Do not duplicate `roles` | A later prose field may point at Experience | `lib/portfolio.ts` `roles` is the only title/date/company record. Home excerpts and the rail read it. | Compensation, quota, private performance notes | Keep. A CMS copy of employers would split one fact. |
| Supporting evidence | Not a CMS collection | Public, already approved evidence sentences inside the owning story | Provenance, review state, access policy | Joy Index rows, selected-work tokens, resumes, inboxes | Evidence stays attached to its public story. |

Draft [PR #170](https://github.com/heyfunwhoa/byjoyaing-portfolio/pull/170) is not this matrix. It reimplements the lesson pilot and moves routes. Leave it draft.

## Hosted editing

Checked against [Keystatic GitHub mode](https://keystatic.com/docs/github-mode) and [Keystatic Cloud](https://keystatic.com/docs/cloud) on 2026-10-14, plus this repo's merged local pilot. GitHub mode is the selected hosted path under KRU-124; Cloud remains out of scope. **Neither mode is enabled yet.** No GitHub App, Cloud project, or secret was created.

| Requirement | Local mode today | GitHub mode | Keystatic Cloud |
| --- | --- | --- | --- |
| Authentication | Development plus `KEYSTATIC_LOCAL=true`. No login. Loopback same-origin API only. | GitHub login through a custom GitHub App. Collaborators need write access to the repo. | Cloud account. Docs say teammates can edit without their own GitHub account. Team membership grants every project in that team. |
| Repository access | The developer's worktree only. | App installed on `heyfunwhoa/byjoyaing-portfolio`. | A Cloud project connected to that repository. |
| Branches | Save writes the current branch's files. A human then commits and opens a PR. | Branch dropdown scoped to `cms/`. `branchPrefix` limits listed/created branches; it is not a GitHub branch-protection rule. GitHub reported `main` unprotected on 2026-10-16, so a required-PR ruleset is a hard enablement prerequisite. | Content still lands in Git. Confirm branch behavior in a future authorized spike. The Cloud docs reviewed here emphasize login and images, not a review policy. |
| Pull request review | Required by this repo's delivery rules. The editor does not open the PR. | A save is not branch protection. `publicationStatus: published` is not a merge. | Same. Cloud is not the review gate. |
| Previews | The local dev server. | A Vercel preview of the pushed branch. Not configured or verified for this mode. | Same preview dependency, plus experimental multiplayer on Pro. |
| Secrets | No editor secret. | `KEYSTATIC_GITHUB_CLIENT_ID`, `KEYSTATIC_GITHUB_CLIENT_SECRET`, `KEYSTATIC_SECRET`, `NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG`, and `NEXT_PUBLIC_KEYSTATIC_STORAGE=github`. They belong in the host environment, never in git. | `storage.kind: "cloud"` and `cloud.project`. The Cloud account is the control plane. No image library is needed for this text. |
| Cost | MIT packages already installed. Existing CI. | No Keystatic subscription is listed in the GitHub mode doc. Each pushed save can spend CI minutes. | Free account, up to 3 users per team. Pro starts at $10/month for that team, then $5/month per additional user. Multiplayer and Cloud Images are Pro. Recheck before any purchase. |
| Deployment | Production returns 404 for the editor and its API. | Docs say copy the environment variables to the host and run Node for the API. The same page still says deploying is "Coming soon." Re-verify against Next.js 16.4.0 before enabling. | A config change to Cloud storage. The site must still serve the editor routes. Not verified here. |
| Rollback | Restore the JSON file, or revert the content commit. | Revert the content commit. Uninstalling the App removes editor login. It does not rewrite content. | Disconnect the Cloud project, then revert the content commit the same way. |

**Decision:** implement optional **GitHub mode** under KRU-124; keep local loopback mode for development. This site already publishes through GitHub review, and the editor uses repository permissions. Cloud's extra abilities — editors without GitHub accounts, shared image hosting, multiplayer — are not current requirements. Cloud team access is also a wider trust boundary than repository write access.

### Prerequisites before anyone enables hosted editing

This is Tier 3. KRU-124 is the dedicated issue, and the user explicitly requested implementation. The implementation PR still stops before merge or deployment. Hosted editing remains disabled until the setup below is completed and verified.

1. Prove a save uses a `cms/` branch. Configure and verify GitHub rules to require a pull request and passing checks for `main`; the repository reported no branch protection on 2026-10-16, and `branchPrefix` alone does not protect it.
2. Install a Keystatic GitHub App on this repository only, granting only required repository metadata read and content write access. Store its client ID, client secret, app slug and a separate 32+ character Keystatic secret in Vercel Preview, separate from Resend, Better Auth, and PostHog values.
3. Register callback URLs for the exact editor hosts being used, including the stable authenticated preview host and production host.
4. Confirm production editor routes require the GitHub session and that `KEYSTATIC_LOCAL` still cannot turn on filesystem mode.
5. Push one content branch, let the existing checks run, and open the preview. Record the SHA that was read.

6. Recheck the Keystatic deploy notes against the installed Next.js version. The guide consulted for the pilot already lagged Next 16.
7. Drill rollback: revert the content commit and, separately, remove the App credentials.
8. Keep private case studies, the Joy Index, resumes, and learner progress out of the repository first. Editor login does not make public files private.

KRU-124 implementation status is separate from deployment readiness. Before enabling: create/install a GitHub App for this repository only, add the generated secrets in Vercel Preview first, verify authenticated edit and anonymous denial on the preview, and then make a separate production enablement decision. Keep Vercel Production unset until that review is complete.

### Hosted editor threat model

- **Protected assets:** GitHub write access to this portfolio repository, GitHub OAuth sessions, and the GitHub App client secret and Keystatic cookie secret.
- **Trust path:** editor browser → Keystatic Next.js routes on Vercel → GitHub OAuth/API → content branch → reviewed pull request → production build.
- **Authorized editors:** GitHub users who already have write access to this repository. The installed App must be limited to this repository. Anyone with write access can affect repository contents through GitHub; the Keystatic schema and `cms/` branch prefix are usability constraints, not a path-level authorization boundary.
- **Anonymous visitors:** may reach the public site and editor login screen, but cannot obtain an editor session without GitHub authorization. Editor/API responses must not be shared-cached.
- **Data classification:** only already-approved public or synthetic portfolio content is editable. Do not add resumes, Joy Index records, employer notes, private case studies, or learner progress.
- **Primary mitigations:** fail closed unless production GitHub mode and all secrets are present; preserve loopback-only local filesystem mode; use GitHub authorization, repository-limited App installation, `cms/` branches, no-store API responses, and a required-PR ruleset on `main`; review and test the same preview SHA before publishing.
- **Residual risk and response:** a compromised GitHub App session or repository writer can alter content/code on an editable branch. Revoke or uninstall the App, remove Vercel editor variables, invalidate the Keystatic secret, and revert the affected commit through a reviewed PR. GitHub `main` branch protection is currently absent and must be fixed before any hosted writes are enabled.

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

## Academy lesson slice

`reading-code-and-yaml` and `mcp-vs-rest-api` use the same singleton contract as verification. The sentences move. The slug, knowledge check, companion link, prerequisites, path order, and Follow one click progress key stay in code. Draft PR #170 is not this slice. The rest of KRU-77, including the guided journey and beginner observation, stays out.

## Field Notes slice

`enterprise-deal` and `multithreading` keep their routes. The public sentences, including the existing link labels, move into `content/field-notes/guides`. The reader rejects a new href. `status="illustrative"` stays in the page. The source registry, deal stages, fictional stakeholders, deal walkthrough, and stakeholder playground stay in code. The index and its unpublished outline titles stay in code. The Academy lesson sentences are a separate slice, above.

## Next three implementation tasks

1. **Case-study summaries.** Move public summary fields that already exist on a case study into one record per slug. Do not create a second collection for the projects directory.
2. **KRU-77 remainder.** The guided journey, badge, and beginner observation. The two lesson sentence files are already in this editor. Do not take the route-group rewrite from draft PR #170.
3. **Field Notes index.** A later singleton for the index introduction. Unpublished titles stay labeled unpublished.

Hosted editing is not one of the three. Career-prose cleanup comes after these, still without copying `roles`.

## Rollback for the Academy lesson slice

- Unsaved edit: reload the editor.
- Saved local experiment: `git restore --source=HEAD -- content/academy/lessons/reading-code-and-yaml.json content/academy/lessons/mcp-vs-rest-api.json`, then reload `/ai-academy` and the editor.
- After a reviewed content commit: revert that commit and review the rollback PR.
- Remove the slice: revert the implementation commit so the lesson literals return to `lib/ai-academy.ts` together with the verification-only config. Do not delete only the JSON files while the adapter imports remain.

## Rollback for the Field Notes guides

- Unsaved edit: reload the editor.
- Saved local experiment: `git restore --source=HEAD -- content/field-notes/guides`, then reload the two guide routes and the editor.
- After a reviewed content commit: revert that commit and review the rollback PR.
- Remove the slice: revert the implementation commit so the guide sentences return to the page files together with the reader. Do not delete only the JSON files while the adapter import remains.

## Rollback for the Work narratives

- Unsaved edit: reload the editor.
- Saved local experiment: `git restore --source=HEAD -- content/work/stories`, then reload `/work` and the editor.
- After a reviewed content commit: revert that commit and review the rollback PR.
- Remove the slice: revert the implementation commit so the story literals return to `lib/public-stories.ts` together with the reader. Do not delete only the JSON files while the adapter import remains.

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
