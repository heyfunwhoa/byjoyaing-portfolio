# Portfolio rebuild roadmap — current priorities

> **Status (October 2026):** This is the forward-looking plan, not a record of which GitHub PRs are currently open. Verify the latest state in GitHub before acting. Earlier PR history below is retained for context; do not treat it as a current instruction to merge old branches.

**Canonical sources of truth:** [Brand fundamentals](brand/brand-guidelines.md) govern identity, messaging and Work/Side Quests hierarchy; [content model](content-model.md) governs content field definitions and privacy; [development workflow](development-workflow.md) and [AGENTS.md](../AGENTS.md) govern development; the PR checklist governs review. GitHub Actions and the repository workflows define actual automated checks; documentation alone does not enforce them.

**Joy Index relationship:** The Joy Index is the private planning, reflection, learning-progress and prioritization companion to this public portfolio. It can inform what to work on and what to learn next, including Builder Academy lessons, but no private Joy Index records, exports, URLs, unpublished personal notes or credentials belong in this repository. Public case studies must be independently reviewed and approved for publication. Coordination is a workflow boundary, **not an implemented data sync or integration**.

**P0 now:**
1. Consolidate documentation/links and treat older PR snapshots as historical (this PR).
2. Introduce a single, typed Work/Side Quests project registry and tests for slug uniqueness, required fields and route/link integrity, without redesigning production pages.
3. Broaden automated tests beyond the Account Signal pipeline. Add focused tests for public content/links and critical API behavior, with mocks and synthetic fixtures; confirm checks run in CI.

**P1 after P0:** Build and validate a leadership-first Home → Work → Side Quests → Contact journey, retaining old URLs and correct redirects. Add automated and manual accessibility checks before releasing the new site.

**P2 later:** Visual regression and performance budgets, reusable case-study patterns and architecture-decision records. Do not add paid tooling or duplicate standards merely to check a box.

**Engineering/security baseline already present:** AGENTS instructions, feature-branch/PR workflow, a PR template, lint/test/build CI, TruffleHog on PRs and Trivy on PRs/main. Trivy currently reports rather than blocks (`exit-code: "0"`); do not describe informational findings as a security gate. CI improvements in PR #13 must be reviewed separately and are not presumed merged.

## Why small pull requests

Pull request #1 already contains the sales-and-GTM redesign, the capability pages, and the revenue-system case studies. Adding the visual system and a new About essay on top of it makes review guesswork. Small pull requests have a diff you can read in one sitting. The alternative, one long-lived branch, is how #1, #2, and #3 ended up editing the same pages from different parents.

## Route plan

Preserve every URL that exists on `main` or on pull request #1.

| Today | After the rebuild | Why |
| --- | --- | --- |
| `/` | `/` | Home. New positioning, same URL |
| `/about` | `/about` | Professional identity and the advertising degree |
| `/experience` (verify live behavior before altering) | `/work` as the experience index, and `/experience` redirects to `/work` | "Work" is the public name. The old URL still resolves |
| `/work/[slug]` | `/work/[slug]` | Case studies stay. Do not move them in the same change as the new index |
| `/projects` | `/side-quests`, and `/projects` redirects to `/side-quests` | Side Quests is the public name for independent work |
| `/capabilities` and `/capabilities/[slug]` (verify current routes) | Keep until a later edit folds a capability into Work or Side Quests. If a URL is removed, redirect it | These links may already be shared |
| `/contact` | `/contact` | Same form |
| `/approach` | Redirects to `/about`, already | Leave the redirect |
| The Joy Index | No URL | Private. No page, no `app/joy-index`, no imported notes |

`/work` and `/work/[slug]` can exist together. In the App Router, `app/work/page.tsx` is the index and `app/work/[slug]/page.tsx` is one case study. Adding the index does not break the case studies.

Do not put Side Quest essays on `/work/[slug]` and also on a second slug. One canonical URL. The other path redirects.

## Historical implementation sequence (superseded by P0/P1/P2 above)

The original plan below explained route-by-route delivery but contains references to PRs that may already have merged. Keep it as background only; **do not follow its old merge order**. The next active PR should be the content registry, followed by broader tests and the validated public navigation journey. Distinct features still get separate reviews.

## What I should learn from this split

- A URL is a promise. Redirects are how you keep it.
- A type is a promise about data. If two files describe the same project, they will drift.
- CI on red means you do not merge, even when the sentence you wrote is good.
- Private notes do not become "just one example" on a public page.

## Out of scope for every row above

- Publishing The Joy Index, or summarizing it
- New npm dependencies for styling or animation
- Claiming production deployment, customer adoption, or employer revenue
- Replacing the contact form
