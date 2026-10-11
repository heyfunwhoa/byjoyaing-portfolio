# Portfolio Experience 2.0 — Roadmap

**Status:** Planning priority for implementation. Notion holds live status. This file holds scope.  
**Date:** 2026-10-11  
**Requirements:** [portfolio-experience-v2-prd.md](portfolio-experience-v2-prd.md)  
**Baseline:** `main` at `94495d9`

Priorities are P0, P1, and P2. There are no calendar dates. A later epic can start only when its dependencies are accepted, not when a week elapses.

## Sequence

```text
EPIC-01  P0  Foundation          (this documentation)
   |
   +-- EPIC-02  P0  Design system constraints (mostly documented; code only if a token drifts)
   |
   +-- EPIC-04  P0  Work collections          -- PR A
   |      |
   |      +-- EPIC-03  P1  Homepage repetition
   |
   +-- EPIC-05  P0  Field Notes inventory     -- PR B
   |
   +-- EPIC-06  P1  Side Quest groups         -- PR C
          |
          +-- EPIC-07  P2  Art direction and interaction

EPIC-08  P0  Quality gate on every implementation PR, not a final batch
```

## EPIC-01 — Product strategy and foundation

- **Priority:** P0. **Phase:** Define. **Milestone:** M0.
- **Objective:** Audit the site and write the requirements, journeys, metrics, and planning schema.
- **User value:** Later changes follow one story and do not undo the brand.
- **Existing implementation:** Editorial site, brand guide, segmentation doc, registry, CI. No product PRD before this change.
- **Scope:** The files in this pull request. Notion Portfolio Studio. Contradiction fixes in active docs.
- **Out of scope:** UI components, routes, font files, merges, deploys.
- **Dependencies:** None.
- **Stories:** The planning artifacts themselves.
- **Acceptance:** PRD sections 1–30 exist. Verified and proposed work are labeled. No application code change.
- **Risks:** Stale docs elsewhere. Mitigated with banners, not a rewrite of every historical note.
- **PR boundary:** One documentation pull request.
- **Validation:** Link check and diff review.
- **Done:** The pull request is open for review and describes rollback as revert.

## EPIC-02 — Design system

- **Priority:** P0. **Phase:** Design. **Milestone:** M0.
- **Objective:** Freeze typography and point implementers at existing components.
- **User value:** The publication stays recognizable.
- **Existing implementation:** Geist, tokens, bento, avatars, story templates. Inventory and UI spec written in EPIC-01.
- **Scope:** Documentation already added. A follow-up code PR only if a token and the brand guide disagree in code.
- **Out of scope:** New fonts, new packages, visual regression software, new avatar files.
- **Dependencies:** EPIC-01.
- **Stories:** Typography baseline (done in ADR 0001). Component reuse (done as inventory).
- **Acceptance:** A UI PR that introduces a font family fails review.
- **Risks:** `app/prototype/page.tsx` still says Commercial Leader. Tracked, not fixed here.
- **PR boundary:** No separate PR unless code drifts.
- **Validation:** Diff against ADR 0001.
- **Done:** The constraint is in git and in the brand guide.

## EPIC-03 — Homepage

- **Priority:** P1. **Phase:** Design. **Milestone:** M1.
- **Objective:** Remove repeated explanation once Work carries the selling story.
- **User value:** A shorter page with the same credibility.
- **Existing implementation:** Five-section cover in [homepage-simplification.md](../design/homepage-simplification.md): hero, condensed credibility, three-tile bento, one field practice, short close. Full role text stays on `/experience` so this page does not depend on the unmerged Work-index branch.
- **Scope:** Copy and composition in `app/page.tsx` and `components/editorial-bento.tsx`. Header menu is out of scope (PR #45).
- **Out of scope:** New sections, new fonts, moving Side Quests above Work.
- **Dependencies:** EPIC-01, and EPIC-04 so the page does not delete the only selling summary.
- **Stories:** As a returning reader, I do not read the same paragraph on Home and Work.
- **Acceptance:** Professional evidence still precedes independent projects. 375 and 1280 checked. No new claims.
- **Risks:** Cutting a sentence that is the only evidence for a role. Diff the role text before deleting it.
- **PR boundary:** One homepage PR.
- **Validation:** Checklist in [responsive-accessibility-checklist.md](../design/responsive-accessibility-checklist.md). Lint, test, build.
- **Done:** The PR records viewports and rollback.

## EPIC-04 — Professional work

- **Priority:** P0. **Phase:** Build. **Milestone:** M1.
- **Objective:** Give Enterprise Sales, People & Leadership, and GTM Strategy different evidence.
- **User value:** J1 and J2 in the journeys doc become possible.
- **Existing implementation:** Anchors and two stories. Timeline at `/experience`. One `kind: "work"` project.
- **Scope:** FEAT-001. Existing public facts only.
- **Out of scope:** New metrics, new employers, redirects, moving Side Quest slugs off `/work/[slug]`.
- **Dependencies:** EPIC-01.
- **Stories:** FEAT-001. As an AE hiring manager, I find selling evidence before leadership essays and software.
- **Acceptance:** Three sections, three bodies, selling first, evidence limits visible, tests and build pass.
- **Risks:** Over-claiming coaching as management. Keep the public-stories wording.
- **PR boundary:** PR A in the PRD.
- **Validation:** Content review plus CI plus `/work` at 375 and 1280.
- **Done:** Definition of Done in the PRD.

## EPIC-05 — Field Notes and About

- **Priority:** P1 for the inventory, which is scheduled as the second implementation PR because it is small and unblocks reading. **Milestone:** M2. The About essay is P1 and can follow.
- **Objective:** Make collections truthful. Refine About without private notes.
- **User value:** J3 and J6.
- **Existing implementation:** Four collection cards, two guides, About page, Explorer avatar on Field Notes.
- **Scope:** FEAT-002 first. About duplication later, separate PR.
- **Out of scope:** New essays, footnotes system, Joy Index.
- **Dependencies:** EPIC-01.
- **Stories:** FEAT-002. As a reader, I know which notes exist.
- **Acceptance:** No dead title presented as an article. Illustrative labels remain.
- **Risks:** Writing a lesson to fill a card. Do not.
- **PR boundary:** PR B, then an optional About PR.
- **Validation:** Link check, lint, build, 375px.
- **Done:** Unpublished state is visible in the UI.

## EPIC-06 — Side Quests

- **Priority:** P1. **Milestone:** M2.
- **Objective:** Align subject names and keep maturity separate.
- **User value:** J4.
- **Existing implementation:** Selected projects, status pills, links to `/projects?category=`, public GitHub links labeled as not finished apps.
- **Scope:** FEAT-003.
- **Out of scope:** New projects, live cross-repo integrations, claiming Creative Experiments has members if it does not.
- **Dependencies:** EPIC-01. Confirm category query values before relabeling.
- **Stories:** FEAT-003.
- **Acceptance:** Approved names or an explicit gap. Status still on each card.
- **Risks:** A category link 404s or shows the wrong set. Click them.
- **PR boundary:** PR C.
- **Validation:** Each filter URL, lint, build.
- **Done:** Subject and maturity can be named independently.

## EPIC-07 — Art direction and interaction

- **Priority:** P2. **Milestone:** M2.
- **Objective:** Diagrams and motion that explain a story already on the page.
- **User value:** Faster understanding of a system, not decoration.
- **Existing implementation:** Bento, crop frame, avatar, reduced motion, case diagrams inside project pages.
- **Scope:** Only a named story that is hard to follow in prose.
- **Out of scope:** New character art, sliders, dashboard styling, sci-fi chrome.
- **Dependencies:** EPIC-02. Prefer after EPIC-04 so art is not covering a copy problem.
- **Stories:** As a reader of a case study, I can see the flow without a fabricated screenshot.
- **Acceptance:** Image has alt or is decorative. Motion respects the media query. No new dependency.
- **Risks:** Decorative work shipped as product. Require the user problem in the PR.
- **PR boundary:** One visual change per PR.
- **Validation:** Checklist, including reduced motion.
- **Done:** The PR names the story the image explains.

## EPIC-08 — Quality and release

- **Priority:** P0 on every implementation PR. **Milestone:** M3 as the ongoing gate.
- **Objective:** Ship only checked changes.
- **User value:** The site keeps working.
- **Existing implementation:** CI workflow and security workflow as documented in the PRD. Prettier is not a CI job. Trivy does not fail the build.
- **Scope:** Run and read the jobs. Fill the accessibility checklist for UI. Update docs if behavior changes.
- **Out of scope:** New scanners, coverage quotas, and a claim of WCAG conformance for the whole site.
- **Dependencies:** The PR it gates.
- **Stories:** As a reviewer, I can see what ran.
- **Acceptance:** Required checks green or the exception is written. Secrets scan reviewed.
- **Risks:** Ignored Vercel preview. Say so.
- **PR boundary:** Quality work rides with the feature PR unless the change is CI itself.
- **Validation:** The workflows.
- **Done:** Rollback is documented and the PR is not merged from a planning-only task.

## Suggested pull-request order

1. This planning PR (EPIC-01).
2. PR A, Work collections (EPIC-04, P0).
3. PR B, Field Notes inventory (EPIC-05, P0 inventory).
4. PR C, Side Quest groups (EPIC-06, P1).
5. Homepage repetition (EPIC-03, P1), after A.
6. Art direction only when a specific story needs it (EPIC-07, P2).

EPIC-08 applies to items 2 through 6.


## 2026-10-10 audit-driven next increment
The existing epics above remain historical sequencing. **New ordered work** (see canonical PRD section 31):
- **A / P0 — SEO and reusable reading foundation:** sitemap/canonicals/social preview/Person metadata, article/evidence/case-study components. PR can be merged after automated checks but requires browser evidence for release.
- **B / P0 — Professional proof:** 2–3 anonymized, employer-safe case studies supported by documented personal contribution and authentic corroboration. No claimed results inferred from sample projects.
- **C / P1 — Field Notes publication and Side Quest visuals:** publish source-linked entries with status and reading paths; diagrams must say illustration when not live.
- **D / P1 — Responsive/accessibility QA:** 320, 375, 390, 768, 1280 and 200% zoom; keyboard and menu; no overflow, working contact flows. Record issues and re-test.
- **E / P2 — Design and measurement:** approved character artwork, respectful analytics and Search Console / Core Web Vitals baseline.

Status conventions: proposed / implemented in branch / automated checks passing / browser verified / deployed. No invented launch metrics.

## Professional proof increment — Work stories

**Status:** Implemented in branch; publication and claim review still required.

- Three editorial stories appear in /work ordered Enterprise Selling → People & Leadership → GTM Strategy, and reuse `ProfessionalCaseStudy`.
- Data authority: `lib/public-stories.ts` and existing public `lib/portfolio.ts` career descriptions. No private customer notes, account names or new deal metrics added.
- **Evidence gate:** Review personal versus team contribution and exact wording of notable historic agreements before using figures or names in external promotion. Public role points are not a substitute for a primary deal record.
- **Design acceptance:** Sections must remain clearly distinct on mobile, no accidental jump-link duplication, related destinations should work and links should be keyboard-accessible.
- **Release acceptance:** CI/security passing, content signoff, and a production deployment matching the merge commit. A passing build alone does not verify small-screen visuals.
- **Next:** Gather original, publishable artifacts for more detailed sales and leadership stories; add screenshots/diagrams only with provenance and consent.


## Editorial navigation and project connections

**Status:** Implemented on feature branch; browser verification pending.

- Connect each public Work story to the relevant experience, illustrated Field Note, or independent build using explicit categories stored in `lib/public-stories.ts`.
- Reuse `ProfessionalCaseStudy` to show multiple relevant links with keyboard-friendly targets rather than only one first link.
- Add a Field Notes pathway back to the corresponding /work anchor so reading an illustrated method doesn't masquerade as an employer outcome.
- Preserve existing `/work/[slug]` routes for legacy Side Quests and label their relationship explicitly in UI; route location alone does not determine content status.
- Unit test category labels, uniqueness and representative links.

**Next implementation phase:** Genuine project evidence (real screenshots and source-controlled architecture views, with provenance/alt) and a published-versus-planned Field Notes taxonomy. This increment does not introduce new integrations or claim live project data flows.

**Acceptance:** CI tests/lint/build/security passing; keyboard, mobile (320/375/768/1280) and zoom navigation checked; production merge commit READY.
