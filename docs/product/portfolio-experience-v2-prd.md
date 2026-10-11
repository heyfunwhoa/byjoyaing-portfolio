# Portfolio Experience 2.0 — Product requirements

**Status:** Canonical product requirements for the next increment.  
**Date:** 2026-10-11  
**Baseline inspected:** `main` at `94495d9` ("Clarify Work and Side Quests editorial segmentation").  
**Site:** https://www.byjoyaing.com/  
**Brand authority:** [brand-guidelines.md](../brand/brand-guidelines.md). This PRD does not replace it.  
**Planning status:** Notion [Portfolio Studio](notion-portfolio-studio.md). GitHub is authoritative for this document.

Labels used below:

- **Verified** — observed in the repository at the baseline commit.
- **Partial** — present, but not the full requirement.
- **Proposed** — required for a later implementation pull request. Not built by this document.
- **Hypothesis** — a belief about visitors. Not a research finding.
- **Future** — explicitly deferred.

## 1. Executive summary

Portfolio Experience 2.0 treats byjoyaing.com as a product. The public site already has an editorial homepage, the approved positioning, six-item navigation, Work and Side Quests indexes, two Field Notes guides, and honest project statuses. The next work is to make the information architecture tell one story in the right order: enterprise sales execution, then revenue-leadership development, then systems thinking and practical building.

This release of the plan does not rebuild the site. It records what is true, what is incomplete, and the sequence of small pull requests that may follow.

Kristen Joy Aing is an experienced enterprise cybersecurity seller developing toward broader revenue and GTM leadership. Independent building demonstrates product thinking and systems design. It is not the primary identity. She has not held a Head of Sales title in the public record used here, and the site must not imply that she has.

## 2. Problem statement

A visitor who needs to evaluate commercial judgment can still miss it.

**Verified:** The homepage leads with revenue and GTM positioning, then credibility, then a Work-led bento, then professional examples, then independent projects. That order is correct.

**Verified gap:** The Work index names Enterprise Sales, People & Leadership, and GTM Strategy, but Enterprise Sales is only two links. The narrative stories render under People & Leadership. The only registry item classified `kind: "work"` is `competitive-intelligence-engine`, and it renders under GTM Strategy. Selling evidence a hiring manager needs is easier to find on Home and `/experience` than inside the collection that claims to hold it.

**Verified gap:** Field Notes names four collections and lists example titles that are not articles.

**Verified gap:** Several older documents still say "Commercial Leader," describe navigation as proposed, or tell a future editor to redirect `/experience` and `/projects`. Those instructions conflict with the code.

**Not a finding:** No usability test and no analytics session supports a claim about bounce, comprehension rate, or time to contact.

## 3. Product vision

A distinctive editorial portfolio. One publication, three connected parts of a career:

1. **Experienced strategic enterprise seller.** Demonstrated: complex cycles, account planning, technical evaluations, multithreading, negotiation, pipeline, competitive positioning, and deal execution. Described without employment revenue figures.
2. **Emerging revenue and GTM leader.** Demonstrated where the public record supports it: coaching, hiring and onboarding support, enablement, field process, and cross-functional collaboration. Aspirational scope stays labeled as direction, not as a held office.
3. **Systems-minded builder.** Independent tools, prototypes, research, and workflows that show how she thinks. They support the commercial story.

**Narrative:** Enterprise sales execution → revenue leadership development → systems thinking and practical building.

## 4. Strategic objectives

1. A first screen that a hiring manager can repeat: Revenue & GTM Leader · Curious Builder, grounded in enterprise cybersecurity.
2. Professional evidence before independent software, on Home and in the Work index.
3. Stable separation of Work, Field Notes, and Side Quests.
4. Every public case study states contribution, evidence limits, and whether a software artifact was an employer deployment.
5. A planning system that does not fork the spec or publish private notes.
6. Accessibility and mobile behavior treated as release criteria, without claiming an audit that has not been done.

## 5. Target audiences

These audiences are **hypotheses**, carried forward from the brand guide. They are not segments from traffic data.

- Founder or revenue-leadership hiring manager.
- Strategic enterprise AE hiring manager.
- Broader GTM leadership hiring manager.
- Recruiter.
- Technical or product collaborator.
- General visitor.

## 6. User personas

| Persona | Needs to believe | Must not be told |
| --- | --- | --- |
| Enterprise AE hiring manager | She still sells: discovery, evaluation, multithreading, negotiation | That software projects are the job |
| Revenue leadership hiring manager | She has coached, supported hiring, and built field process | That she has been Head of Sales |
| Recruiter | Name, trajectory, and a working contact path | A private career journal |
| Technical collaborator | What a project does today, and its status | That a diagram is a production integration |
| General reader | A coherent person, including the advertising origin | Confidential interests or the Joy Index |

## 7. Jobs to be done

- When I am hiring a seller, I want selling evidence first, so I can decide whether to keep reading.
- When I am hiring a revenue leader, I want the difference between personal results, informal coaching, and formal management.
- When I am learning how she operates, I want a method labeled as practice, illustration, or exploration.
- When I am evaluating a build, I want maturity separate from topic.
- When I want to talk, I want a form that works without an account.

## 8. Current-state assessment

Inspected in the repository. The live site was previously confirmed on production for the editorial homepage and Geist fonts; this document's structural claims are from the baseline commit, not from a new production crawl.

### Verified implementation

- Navigation: Home, About, Work (`/work`), Field Notes, Side Quests (`/side-quests`), Contact. Header in `components/site-header.tsx`.
- Positioning on the homepage and in metadata: Revenue & GTM Leader · Curious Builder. Philosophy underneath.
- Fonts: Geist Sans and Geist Mono only. See [ADR 0001](../decisions/0001-preserve-geist-typography.md).
- Palette and editorial surfaces in `app/globals.css`.
- Homepage sequence in `app/page.tsx`: hero with Leader avatar, principles, current role, bento, Rapid7 and Forcepoint rows, illustrative field guides, featured independent projects, personal story, contact.
- Work/Side Quest classification in `lib/portfolio-registry.ts` with tests via `validatePortfolioEntries`.
- Two public narrative stories in `lib/public-stories.ts`.
- Field Notes index plus `/field-notes/enterprise-deal` and `/field-notes/multithreading`, labeled as demonstrations.
- Side Quests selected list with status copy. Maturity is not the same field as kind.
- Contact modes: message and selected-work access. Resume UI is not linked. `/api/request-resume` still exists.
- Avatars: one asset, `/avatar.png`, for leader, explorer, and builder.
- CI: lint, unit tests, production build (the typecheck), production dependency audit. TruffleHog on pull requests. Trivy reports with `exit-code: "0"`.
- No analytics dependency in application code.
- No Joy Index route or import.

### Partial

- Work collections exist as anchors, not as three equally evidenced chapters.
- Field Notes collections exist as cards. Most example titles have no article.
- Side Quest groups exist, with different names than the approved set, and they link to `/projects?category=`.
- Case-study templates exist (`work-story-template.tsx`, `build-story-template.tsx`) and are not used by every story.
- `/work/[slug]` mixes professional and independent items. Kind, not the URL, classifies them.
- About exists. This audit did not rewrite it. Duplication with Home is a later editorial pass.
- Brand guide sections that described the IA as "not yet deployed" were corrected in the planning pull request. Historical design docs remain, with banners.

### Missing

- Enterprise Sales case studies in the Work template, beyond role summaries.
- Article metadata pattern: contents, footnotes, related reading, applied across Field Notes.
- The approved Side Quest collection "Creative Experiments" as an honest empty or populated group.
- Visual regression tests. The typography baseline is documented only.
- A measured success baseline.

### Needs validation

- Contrast pairs on every new combination. Earlier ratios are calculations, not a conformance report.
- Category query parameters on `/projects` before Side Quest labels change.
- Vercel preview behavior. Earlier previews were canceled by an ignored build step. That is an environment setting, not something this PR changes.
- Whether `/work/[slug]` should highlight the Work nav item. **Proposed** to leave it until IA is clearer, because some slugs are Side Quests.

### Deferred

- New avatar artwork.
- Redirects from `/experience` and `/projects`. [ADR 0003](../decisions/0003-retain-experience-and-projects-routes.md).
- Authentication, reviewer portal, and public resume hosting.
- Analytics.
- Draggable or highly animated interactions.
- Any sync with the Joy Index.

### Companion repositories

`heyfunwhoa/joy-index` and `heyfunwhoa/technical-docs-platform` could not be resolved in the planning session. Their contents are not invented. Local engineering practice remains [development-workflow.md](../development-workflow.md), [ENGINEERING-BASELINE.md](../ENGINEERING-BASELINE.md), and the workflows under `.github/workflows/`. Shared standards may be adopted later by link, not by copy, once they can be read.

### Documentation contradictions found

| Location before this planning change | Conflict | Resolution in this change |
| --- | --- | --- |
| `docs/design-process.md` listed Instrument Serif as `font-display` | Code and brand guide use Geist | Corrected. ADR 0001. |
| Brand guide §5 said the IA was not deployed and used "Builds" | Nav is live as Side Quests | §5 and §6 updated to the verified nav |
| `README.md`, product brief, IA wireframes, UX audit, priorities, selected-work access said "Commercial Leader" | Live line is Revenue & GTM Leader | Active files corrected. Historical wireframes bannered. |
| `docs/architecture.md` described `/experience` as a redirect to About and PR #1 as unmerged | `/experience` is a timeline page | Banner. File kept as history. |
| `docs/rebuild-roadmap.md` proposed redirects | Segmentation doc and ADR 0003 keep the routes | Banner. |
| `docs/content-model.md` waited on PR #1 and a resume request | Both are stale relative to `main` | Note added. Field rules kept. |
| `docs/ENGINEERING-BASELINE.md` suggested `tsc --noEmit` | This repo typechecks with `npm run build` | Sentence corrected. |
| `app/prototype/page.tsx` still says "Commercial Leader" | Exploratory page, not the homepage | **Not changed.** Flagged. A later PR may align or noindex it. Out of scope here because it is UI copy. |

## 9. User journeys

Canonical scenarios: [portfolio-user-journeys.md](portfolio-user-journeys.md). They are hypotheses with verified gaps, not test results.

## 10. Information architecture

Preserve the top-level navigation.

| Destination | Job | Verified today | Proposed next |
| --- | --- | --- | --- |
| Home | Why explore | Editorial sequence above | Reduce repeated sentences after Work is clearer. Do not lengthen the page. |
| About | Who I am | Page exists: origin, philosophy, milestones | Editorial pass only. No Joy Index. Public interests only. |
| Work | What I have done | Index plus timeline at `/experience` | Three collections with distinct evidence. Enterprise Sales first. |
| Field Notes | How I think | Index and two guides | Real inventories. Unpublished titles labeled. |
| Side Quests | What I am building | Index plus `/projects` | Four subject groups, maturity still separate. |
| Contact | How to connect | Form and links | Keep the working form. |

**Work collections (proposed structure, existing facts only):**

- Enterprise Sales — role evidence already on Home and `/experience` (Truffle Security, Rapid7, Forcepoint, and the rest of the timeline). No new dollar figures.
- People & Leadership — the enablement story already in `publicStories`. Informal coaching stays informal.
- GTM Strategy — professional practice such as the competitive-intelligence field approach. Independent revenue simulators stay Side Quests even when they teach GTM.

**Field Notes collections (verified names, partial content):** Playbooks, Frameworks, Operating Systems, Lessons Learned.

**Side Quest collections (proposed names):** GTM & Revenue Systems; Security Research & Intelligence; Learning & Developer Tools; Creative Experiments. Maturity stays Prototype / Professional field system / Designed / Concept. A project can sit in one subject and one maturity. Conceptual links between projects are links, not integrations.

**Routes that stay:** `/experience`, `/projects`, `/work/[slug]`, `/capabilities`, `/private-work` (noindex), `/account-signal` (noindex), academy routes, `/prototype`. Changing any of them requires redirects and link tests.

## 11. Content strategy

- One public fact, one public place. Related pages link.
- Professional stories use: context, problem, specific contribution, decision, execution, verified outcome, evidence, reflection. If an outcome is not verified, the section says what is known and stops.
- Individual selling, team contribution, informal coaching, and direct management are different sentences.
- Field Notes use Used in practice, Illustrative model, or Exploring. The two live guides stay illustrative until a source says otherwise.
- Side Quests state what runs today. Detector Coverage Atlas remains a reviewed static comparison, not a pipeline. Account Signal remains the documented local slice. Synthetic GTM Revenue OS studies stay fictional, unfeatured, and labeled.
- Employment revenue figures stay off the site. The planning prohibition includes quota attainment, rankings, and employer growth percentages that were removed in earlier public copy. Do not restore them.
- The Joy Index is not a source that can be pasted. A public paragraph requires a deliberate review of already public material.

## 12. Editorial storytelling principles

One primary story per section. Asymmetric layouts with a DOM order that matches reading order. Whitespace. Restrained copper and surface color. Professional evidence larger than supporting tiles. Less repeated explanation. Not every item is the same card.

Bento grids only where hierarchy needs unequal tiles. The homepage bento is the reference. Combine it with narrative sections, previews, rules, diagrams, and small link lists.

Visuals: real artifacts, diagrams, geometric illustration. No fabricated screenshots.

Interactions: filters, related links, disclosure, accessible tabs, in-page contents. Defer novelty.

Full pattern notes: [editorial-ui-spec.md](../design/editorial-ui-spec.md).

## 13. Design system requirements

- Preserve tokens and fonts. [ADR 0001](../decisions/0001-preserve-geist-typography.md).
- Reuse components in [component-inventory.md](../design/component-inventory.md).
- Spacing stays on Tailwind's scale.
- Breakpoints: review at 375, 768, 1280. Implementation may use `sm` / `md` / `lg`.
- Avatars follow [avatar-system.md](../brand/avatar-system.md).
- No new runtime dependency for layout or motion.

## 14. Functional requirements

| ID | Requirement | State |
| --- | --- | --- |
| FR-1 | Header destinations remain the six public items | Verified |
| FR-2 | Home shows professional evidence before Side Quests | Verified |
| FR-3 | Work presents Enterprise Sales, then People & Leadership, then GTM Strategy, each with its own evidence | Partial. Proposed to complete with existing copy |
| FR-4 | Case studies distinguish contribution and evidence limits | Partial |
| FR-5 | Field Notes collections show real articles or an explicit unpublished state | Partial. Proposed |
| FR-6 | Side Quest subject and maturity are both visible | Partial |
| FR-7 | Contact form continues to submit a message or a selected-work inquiry | Verified. Do not restore resume UI |
| FR-8 | Legacy URLs keep resolving | Verified for current routes. Proposed to keep |
| FR-9 | Private work and account-signal pages stay noindex | Verified. Not re-tested in this change |
| FR-10 | Registry validation keeps rejecting duplicate slugs and unknown statuses | Verified |

## 15. Nonfunctional requirements

- TypeScript strictness stays as enforced by `npm run build`. Do not add `tsc --noEmit`.
- Feature branches and small pull requests. Cloud agent branches use `cursor/<name>-560c`. Repository workflow docs also allow `feature/` names; either is acceptable when the branch is not `main`.
- Secrets stay in the host environment. This plan adds none.
- Content is static data in `lib/` unless a later ADR says otherwise.

## 16. Accessibility requirements

Target WCAG 2.2 AA. Checklist: [responsive-accessibility-checklist.md](../design/responsive-accessibility-checklist.md). Satisfying the checklist on a pull request is evidence for that pull request. It is not a site-wide conformance claim.

## 17. Security and privacy requirements

- No Joy Index content, private repository URLs, credentials, customer records, or phone numbers in the repo, the site, or Notion content rows.
- Contact email remains the existing Resend path. Do not reuse credentials from another project. Do not send real email as a test.
- `/api/request-resume` is unlinked. Removing it is a separate, optional change. Do not expand it.
- Synthetic fixtures stay synthetic.
- TruffleHog must pass. Trivy output is informational until its exit code is changed on purpose.
- No new authentication in this product increment.

## 18. Performance requirements

**Proposed, not budgeted with measurements:** Keep the current font loading (two families, `next/font`). Reserve image space. Do not add client-side animation libraries. A numeric Core Web Vitals budget is **future** and requires a measurement this repository does not have.

## 19. Analytics and measurement strategy

There is no product analytics in the app. Do not invent sessions, referrers, or click rates.

**Proposed later, as its own decision:** a privacy-reviewed, first-party or hosted analytics tool with a written purpose, a data inventory, and an opt-out story. Until that decision, measurement is task review, editorial review, and CI. See [portfolio-success-metrics.md](portfolio-success-metrics.md).

## 20. Success metrics

Defined with methods and empty baselines in [portfolio-success-metrics.md](portfolio-success-metrics.md). Summary of intent:

- Positioning comprehension without a false Head of Sales impression.
- Findable selling evidence and labeled leadership evidence.
- Distinguishable Work, Field Notes, Side Quests, and About.
- Usable responsive UI on changed screens.
- Green required CI checks.
- No unsupported claims.

## 21. Assumptions and hypotheses

**Assumptions (verified or explicit constraints):**

- The fonts on the live site should remain Geist.
- Employment dollar figures are out of bounds.
- `/experience` and `/projects` are still useful.

**Hypotheses (untested):**

- Hiring managers will use Work before Field Notes.
- A leadership reader can accept qualitative coaching evidence without percentages.
- Four Field Notes collections are enough structure. More collections would hurt.

If a hypothesis fails in a real review, change the PRD in the same pull request as the product change.

## 22. Dependencies

- Next.js 16, React 19, Tailwind v4, the existing test script. No new packages for this plan.
- GitHub Actions as they are configured.
- Vercel for production from `main`. Preview builds are not guaranteed.
- Notion for planning status. Optional for implementation. The site does not call Notion.
- Public facts already in `lib/portfolio.ts`, `lib/public-stories.ts`, and `lib/portfolio-registry.ts`.
- Joy Index and the technical-docs platform are **not** dependencies until they are readable and a human reviews any excerpt.

## 23. Risks and mitigations

| Risk | Mitigation |
| --- | --- |
| A later PR restores serif display type from an old doc | ADR 0001 and the brand guide |
| Work copy invents a metric to fill Enterprise Sales | FR-3 allows only existing public facts. Review against the content model |
| Notion and GitHub disagree | ADR 0002. GitHub wins for requirements and checks |
| Private notes leak through a content row | Content pipeline forbids Joy Index import. Evidence status "Do not publish" |
| Stale docs send an agent to the wrong route | Banners and ADR 0003. Active brand files updated |
| Preview deploys do not run | Do not call a UI change previewed unless the deployment exists |
| Trivy findings look like a failed gate | Document the exit code. Do not ignore a real secret finding from TruffleHog |
| `/prototype` still says Commercial Leader | Known. Not this PR |

## 24. Non-goals

- A visual rewrite or a new component library.
- New font families or new character art.
- Publishing the Joy Index or syncing it.
- Claiming Head of Sales, employer deployment of personal software, or unverified revenue.
- Adding authentication, a CMS, or a database for the editorial site.
- Merging or deploying this planning change as part of writing it.
- Closing unrelated open pull requests.

## 25. Release milestones

Milestones are dependency gates, not dates.

| Milestone | Contains | Gate |
| --- | --- | --- |
| M0 Foundation | This PRD, roadmap, journeys, metrics, design constraints, Notion setup | Reviewed documentation PR. No production UI change required |
| M1 Credibility | Work collections tell selling, people, and GTM apart | Existing facts only. Links and tests pass |
| M2 Editorial depth | Field Notes inventories, Side Quest groups, homepage repetition pass | Illustrative labels preserved |
| M3 Quality | Accessibility and preview evidence on the UI PRs that shipped | CI green. Checklist filled. No conformance claim beyond what was tested |

## 26. Epics and user stories

Epics EPIC-01 through EPIC-08 are specified in [portfolio-experience-v2-roadmap.md](portfolio-experience-v2-roadmap.md).

The first implementation stories, not started by this PRD:

- **FEAT-001** Separate the three Work collections (EPIC-04, P0).
- **FEAT-002** Inventory Field Notes collections (EPIC-05, P0).
- **FEAT-003** Align Side Quest collection names (EPIC-06, P1).

## 27. Acceptance criteria

This planning document is accepted when:

- A reader can tell verified behavior from proposals.
- Brand lines match the brand guide.
- Typography preservation is an ADR, not a code change.
- Journeys name their gaps.
- Metrics have methods and no fake baselines.
- Notion is described as it was actually created.
- The next three implementation PRs have scope and rollback.
- No application component was rewritten.

Acceptance criteria for later epics live on those epics.

## 28. Testing strategy

**This change:** internal link check for new docs, diff review for contradictions, no production build required for markdown. `npm run build` remains the typecheck when code changes.

**Later UI changes:** `npm run lint`, `npm test`, `npm run build`, the accessibility checklist on touched pages, and a content review. Add a test when a registry or link invariant changes. Do not add a test framework for its own sake.

## 29. Definition of Done

For any Portfolio Experience 2.0 pull request:

- The problem, user value, and files are named.
- Brand alignment is checked against the brand guide.
- Claims have a source or an illustrative label.
- Required CI jobs are inspected.
- Accessibility checks are recorded or explicitly not applicable.
- Security notes cover secrets and private data.
- Rollback is reverting the change.
- Docs that would otherwise contradict the change are updated.
- The pull request is not merged from the planning task that only describes it.

## 30. Iteration and improvement process

Discover → Define → Prioritize → Design → Build → Validate → Release → Measure → Iterate.

After M0, each loop is one small pull request. Update the roadmap status in Notion when priority changes. Update this PRD when a requirement changes. Do not keep a third copy.

Measure only with the methods in the metrics document. A failed hypothesis becomes an edit to section 21, not a silent layout experiment.

## First three implementation pull requests

Recommended after this planning PR is reviewed. Do not start them inside the planning PR.

### PR A — Work collections (FEAT-001)

- **Problem:** Enterprise Sales is a pair of links.
- **Scope:** `app/work/page.tsx` and, if needed, the order of existing `publicStories` or role summaries. No new metrics. No new routes.
- **Acceptance:** Three headings, three different bodies, selling evidence first, Side Quest software not described as employer deployment.
- **Test:** Existing unit tests, lint, build, 375 and 1280 on `/work`, keyboard pass.
- **Rollback:** Revert the commit. URLs unchanged.

### PR B — Field Notes inventory (FEAT-002)

- **Problem:** Collection cards list titles that are not pages.
- **Scope:** `app/field-notes/page.tsx` only, unless a label needs a shared string. Link the two existing guides. Mark other titles unpublished.
- **Acceptance:** Every visible title is a link or an explicit unpublished label. Illustrative labels remain.
- **Test:** Lint, build, link check, 375px.
- **Rollback:** Revert the commit.

### PR C — Side Quest groups (FEAT-003)

- **Problem:** Group names drift from the approved set.
- **Scope:** Labels and links on `app/side-quests/page.tsx` after confirming `/projects` category queries. Empty Creative Experiments stays empty.
- **Acceptance:** Subject and status are both visible. No new project claims.
- **Test:** Lint, build, click each category link, 375px.
- **Rollback:** Revert the commit.

Homepage deduplication (EPIC-03) waits until PR A shows which sentences Work now carries.
