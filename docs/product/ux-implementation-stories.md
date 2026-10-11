# UX implementation stories

**Status:** Proposed. Do not build from this file until the wireframes are reviewed.  
**Date:** 2026-10-11  
**Specs:** [page-wireframes.md](../design/page-wireframes.md), [content-migration-map.md](../design/content-migration-map.md), [content-audit.md](../design/content-audit.md)  
**Test plan:** [accessibility-test-plan.md](../design/accessibility-test-plan.md)

Priorities: P0 changes what a hiring reader believes. P1 removes repetition and wrong labels. P2 is supporting structure. No dates.

Stories assume the fonts, palette, and avatar asset stay. Each story is one pull request unless the acceptance criteria say otherwise.

## P0

### UX-01 — Enterprise Sales owns the Work lead

**Story.** As an enterprise AE hiring manager, I see selling evidence before leadership essays and software.  
**Pages.** `/work`.  
**Work.** Render existing Truffle, Rapid7, and Forcepoint points in the Enterprise Sales section. Leave People & Leadership on the enablement story. Leave GTM Strategy on competitive intelligence only.  
**Acceptance.** The first collection under the hero contains role evidence. Side-quest slugs are not in that list. No new metric appears. `/experience` still has the full timeline.  
**Test.** Content diff against `roles`. 375 and 1280. Keyboard to each in-page link.

### UX-02 — Unpublished Field Notes are not articles

**Story.** As a reader, I can tell which notes exist.  
**Pages.** `/field-notes`.  
**Work.** Link the two guides. Mark every other collection title "Not yet published."  
**Acceptance.** A title is either an anchor with an href or visibly unpublished. Illustrative and synthetic labels remain on the two guides.  
**Test.** Link check. 375px. No new essay.

### UX-03 — About stops mixing kinds

**Story.** As a recruiter, I do not read a prototype as a job result.  
**Pages.** `/about`.  
**Work.** Split the four "GTM and product work" cards. Competitive evidence stays a Work link. Atlas, the directory, and Truffle Camp are Side Quest links with their status words.  
**Acceptance.** Each card names the destination. Truffle Camp is still "curriculum design, not that training."  
**Test.** Read the four links. 375 and 768.

## P1

### UX-04 — Home points instead of repeating

**Story.** As a returning reader, I do not read the same paragraph twice.  
**Pages.** `/`.  
**Depends on.** UX-01, so Home does not delete the only selling summary before Work has it.  
**Work.** Done as the five-section cover in [homepage-simplification.md](../design/homepage-simplification.md). Rapid7 and Forcepoint are one sentence each. The philosophy list leaves Home. Field guides and the project grid leave Home too. Side Quests stays a bento tile, not a lead feature.  
**Acceptance.** Professional evidence still precedes Side Quests. The advertising paragraph's long form remains on About. The competitive field practice is the only featured story.  
**Test.** Read Home then About. 375 and 1280. Reduced motion unchanged.

### UX-05 — Side Quest subjects match the taxonomy

**Story.** As a technical reader, I can separate topic from maturity.  
**Pages.** `/side-quests`.  
**Work.** Show the four approved subject names. Deep-link a directory category only where [content-taxonomy.md](../design/content-taxonomy.md) says the fit is direct. Creative Experiments states that it is empty.  
**Acceptance.** Every selected project still shows a status pill. No project is moved into Creative Experiments. Existing `?category=` URLs still filter.  
**Test.** Open each subject link. Lint and build.

### UX-06 — Contact sentence matches the positioning

**Story.** As a visitor from Home, the contact page asks for the same kind of conversation.  
**Pages.** `/contact`.  
**Work.** Lead with strategic enterprise selling and revenue leadership. Keep the form modes.  
**Acceptance.** No résumé control returns. Email, LinkedIn, and GitHub stay.  
**Test.** Submit is not required. Keyboard through tabs. 375px form width.

### UX-07 — Experience and directory labels

**Story.** As a visitor, "Work" means `/work`.  
**Pages.** `/experience`, `/projects`.  
**Work.** Experience eyebrow says Experience. Projects H1 defers the introduction to Side Quests. The visible "All work" filter may read "All projects" if the empty query is unchanged.  
**Acceptance.** No redirect. Related-project caveats on the timeline stay.  
**Test.** `/experience` and `/projects` return 200. `/approach` still redirects to `/about`.

## P2

### UX-08 — One status widget

**Story.** As a reader, status language is the same on Home and in the directory.  
**Work.** Pick `project-status-pill` or `status-badge` for public labels. Do not add a third.  
**Acceptance.** The four public words still match `statusCopy`.  
**Test.** Existing registry tests. Visual check on `/side-quests` and `/projects`.

### UX-09 — Article chrome for the two guides

**Story.** As a reader of a long guide, I can see the evidence label before the interaction.  
**Pages.** The two Field Notes guides.  
**Work.** Title row matches the article pattern in the editorial UI spec. No new footnotes unless a claim needs a source that is already public.  
**Acceptance.** The guides stay labeled illustrative or synthetic.  
**Test.** Heading order. 200% zoom on the interactive region.

### UX-10 — Prototype page decision

**Story.** As a visitor who finds `/prototype`, I do not learn a retired positioning line.  
**Work.** Either align the headline with Revenue & GTM Leader · Curious Builder or noindex the page.  
**Acceptance.** The six-destination nav does not link to it either way.  
**Test.** View source for robots if noindex is chosen.

## Out of scope for all of these

New fonts. New avatar files. Redirecting `/experience` or `/projects`. Splitting `/work/[slug]`. Publishing Joy Index material. Adding analytics. Inventing case-study metrics. Merging this specification pull request into a visual release.
