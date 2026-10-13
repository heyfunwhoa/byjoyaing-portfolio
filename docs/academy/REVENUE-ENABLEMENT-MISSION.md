# Revenue enablement program and Trusted Handoff mission

Status: draft for review; design documented, not a deployed feature.
Version: 0.1 · Recorded: 2026-10-13 · Product: existing Builder Academy in byjoyaing-portfolio.
Accountable owner: Kristen Aing (program sponsor); enablement is the intended operating owner. Subject reviewers and technical maintainer: to assign.
Classification: public planning and synthetic teaching only.

## Authority and purpose

This records the October 13 planning conversation as an extension of [PROGRAM.md](PROGRAM.md). It does not create a separate Academy or rename live routes. The [curriculum audit](CURRICULUM-AUDIT.md) remains the existing-content inventory; [LEARNING-DEPTH.md](LEARNING-DEPTH.md) remains the instructional quality contract. This document owns the proposed revenue-enablement mission and operating model. Its checklist is a planning sequence, not a second issue tracker. Link actual issues when created.

Objective: enablement-owned onboarding and continuing education for business/revenue professionals. Teach sales foundations and AI-assisted building as independently accessible tracks, combine them in practical team missions, then allow private employer-specific processes to extend the foundation.

## Decision record

| ID | Direction | Status |
| --- | --- | --- |
| D01 | Use the existing Academy and stable lesson IDs; no competing site or repository | User-aligned direction |
| D02 | Sales foundations/processes/methodologies and builder foundations are distinct views; neither universally requires the other | User-aligned direction |
| D03 | Foundations first, then applied team workflows, then employer SOPs | User-aligned direction |
| D04 | Personas support internal teamwork and external buying journeys across organization sizes | User-aligned direction |
| D05 | Initial data is entirely fictional; no employer records, transcripts, research, or credentials | User requirement |
| D06 | Preserve reviewed, practiced, passed checks, and manager readiness as separate concepts | Design constraint |
| D07 | Keystatic is an editorial pilot, not the LMS, CRM, research database, or learner store | Proposed implementation boundary |
| D08 | First applied campaign is SDR-to-AE research/preparation/handoff; broad lifecycle remains planned | Proposed pilot scope |
| D09 | Employer overlays are separately controlled and versioned; never public CMS collections | User-aligned direction |
| D10 | Badges recognize explicit demonstrations; no professional certification claim | Proposed reward rule |

Earlier ideas retained as backlog, not discarded: meeting-prep page, discovery builder, saved checklist, ROI calculator, resource search, deployment decision guide, broken account lookup, dashboard, permission simulation, release/rollback exercises, founder lunch-and-learn campaign. Webinar registration is a later capstone, not the beginner entry requirement.

## Program structure

1. Sales foundations: buyer needs, prospecting, discovery, qualification, demos, evaluations, business cases, negotiation, and collaboration. Distinguish process (stages/actions), methodology (approach), and SOP (organization-specific execution instructions). Introduce named methodologies with original explanations and attributable public sources; do not reproduce proprietary training.
2. Builder foundations: files, browser/server, repositories, code/config/data, bounded AI requests, reading diffs, testing, errors, APIs, permissions, source control, and deployment. Preserve AI Foundations as an independent entry path; use relevant prerequisites only.
3. Combined missions: practice a business workflow and optionally build or improve its supporting tool.
4. Employer overlay: approved terminology, required fields, stage rules, methodology, templates, stack and approval requirements.
5. Continuing education: changed-process lessons, refreshers, new independent scenarios, coaching and cross-role development.

Hierarchy: Academy → role/skill path → campaign → mission → activity/check. A skill can serve many roles and missions without copying its foundational lesson.

## Persona model and lifecycle map

Keep job role, workflow responsibility, and buying role separate. Titles do not establish authority or buying intent. One person can wear several hats; responsibilities may be shared across committees. Organization size is context, not a deterministic rule.

Pilot roles: SDR/BDR and AE; manager coaching companion.
Planned GTM roles: SE/SA, CS/account management, implementation/professional services, TAM/support, product marketing, demand generation/growth, content/customer marketing, marketing operations, partnerships/channel/alliances, deal desk, RevOps/BizOps, enablement, revenue leadership/founders.
Adjacent organization personas: product/design/research, engineering/data/AI, IT/security, finance/procurement/vendor management, legal/privacy/compliance, HR/recruiting/L&D/workplace operations.
External buying roles: problem owner, end user, champion, evaluator, economic buyer, approver, procurement lead, implementation owner. Unknown assignments remain unknown.

Persona records: stable ID, function, title aliases, responsibilities, goals, decisions, collaborators, skills, linked missions, organizational context, evidence and hypothesis labels. Real stakeholder records remain outside public teaching personas.

Lifecycle campaign placeholders:
- Prospecting/outbound → initial meeting/discovery → demo → POC/technical evaluation.
- Business case/executive alignment; executive summary evolves throughout.
- Security/legal/procurement and negotiation may run in parallel.
- Close/decision → implementation/CS handoff → adoption/renewal/expansion.
- Include nurture, no decision, close lost, return to discovery and no-go outcomes. Good judgment does not always produce a win.

## Mission M-TH-01: The Trusted Handoff

**Promise:** Build a brief your teammate can trust.
**Audience:** business/sales learners; SDR and AE perspectives; beginner builder variant.
**Outcome:** an AE can identify meeting purpose, sourced context, uncertainties, owner and next action, and the builder can explain and verify their app change.
**Fictional setting:** Beacon Labs seller team; Northstar Logistics buyer; one account, two contacts, short research packet and synthetic call transcript. Names are fictional teaching labels, not claims about real organizations.
**Duration:** not measured; estimate only after observation.

### Foundation entry

Before coding: locate an editable file, open its preview, explain a simple record, make one visible change, and undo it. Use existing code-reading, structured-data, verification and delivery resources where suitable. A sales-only learner can complete the workflow without coding. Experienced learners may demonstrate relevant skills rather than repeat all basics.

### Scenario stack

These are proposed roles in a simulated stack, not verified integrations or claims of equivalent vendor features.

| Context | Represented tools | Mission use |
| --- | --- | --- |
| Authoritative shared records | Salesforce | Account/contact identity, ownership, activities, next actions |
| Documentation | Notion | Briefs, playbooks, handoff guidance linked to CRM records |
| Coordination | Slack | Notification, clarification and acknowledgment; not a duplicate facts database |
| Research/enrichment | Clay and LinkedIn | Fictional research/profile evidence; facts versus hypotheses |
| Calling | Nooks | Preparation and simulated outcomes |
| Meeting evidence | Gong or Granola | Synthetic transcript/notes, not actual recordings |
| Scheduling/follow-up | Email and calendar | Simulated meeting purpose, scheduling and follow-up context |

Use neutral panels labeled simulated research, CRM, brief, transcript and team chat. No live messages, calls, enrichment, scraping, recording or CRM updates.

### Three mission chapters

| Chapter | Sales task | Builder task | Evidence |
| --- | --- | --- | --- |
| 1. Build the pre-call brief | Resolve a conflicting research item and identify account/contact correctly | Add source and confirmed/hypothesis/unknown fields using a bounded AI-assisted change | Correct record links and source-aware uncertainty; missing source handled |
| 2. Check what was said | Compare an AI summary to a transcript | Add a review step before accepting proposed updates | Unsupported claim corrected; unreviewed update cannot silently become confirmed |
| 3. Pass the baton | Create a handoff, switch to AE, request and resolve clarification | Produce a handoff view and simulated notification with record links | Purpose, evidence, gaps, owner and next step can be found and explained |

Example discrepancy: transcript says “We’re exploring options, but we haven’t set a budget.” Generated summary says “Budget approved. Ready to evaluate.” Learner corrects the claim and explains its evidence. A transcript is evidence of a speaker's statement, not independent proof that every statement is true.

Game loop: worked example → predict → direct AI → inspect change → test normal/missing-input case → explain → switch roles → independent variant.
Prepared AI outputs are clearly labeled simulated. Selecting a prepared output is not evidence of operating a real coding assistant. Real IDE practice is a distinct follow-on task.
Hints, retries, optional side quests, map/list alternatives and resume are supported design goals. No punitive streaks, speed leaderboard or mandatory competitive ranking.

### Rubric

| Criterion | Pass evidence | Evaluation |
| --- | --- | --- |
| Identity | Correct account and contact linked | Deterministic fixture check |
| Evidence | Claim has a relevant source; contradiction is resolved or explicitly unresolved | Fixture check plus explanation rubric |
| Uncertainty | Budget not invented; hypothesis/unknown preserved | Required fixture check |
| Handoff | Purpose, owner, next action and material open question present and useful | Structured checks plus human rubric |
| Building | Learner explains changed input/output and demonstrates normal and missing-input behavior | Observable execution/manual review, not self-reported reading |
| Transfer | New contact scenario completed without answer exposure | Independent variant and recorded assistance level |

Sales achievement and builder achievement are separate. “Trusted Handoff Builder” requires the builder evidence as well as handoff checks. Human-reviewed evidence must not be labeled automatically passed. Manager-confirmed role readiness is a later, separate decision.

### Proposed acceptance criteria

- AC01: Given sales-only mode, learner can finish sales activities without a code prerequisite.
- AC02: Given the unsupported budget summary, acceptance is blocked or marked unresolved until corrected according to the fixture rubric.
- AC03: Given incomplete source data, UI preserves unknown rather than inventing values.
- AC04: Given a reviewed lesson alone, no practiced/passed badge is awarded.
- AC05: Given a completed check and reload in the same browser, versioned local progress resumes; blocked/malformed storage falls back with a clear message and reset option.
- AC06: Given role switch to AE, the brief exposes purpose, evidence, unknowns, owner and next action; clarification can be resolved in simulation.
- AC07: Given an edited CMS lesson on a branch, preview displays it without changing stable IDs or existing progress.
- AC08: Given keyboard-only or phone access, the main task is available through semantic controls and list navigation; no drag-only interaction.
- AC09: Given any pilot action, no employer data or external system mutation is required.
- AC10: Given an assessment revision, historical completion retains its version; reassessment is explicit, not silently reset.

ACs are proposed tests to implement, not passing results.

## Content and data ownership

| Home | Responsibility |
| --- | --- |
| This Academy repo | Curriculum, public lessons, synthetic fixtures, mission UI and assessment definitions |
| Keystatic, when piloted | Editor over selected versioned lesson/scenario files |
| Notion program index | Inventory, ownership, review queue, feedback and links; not another editable copy of lesson bodies |
| Linear | Execution tasks and acceptance evidence; link IDs here after creation |
| technical-docs-platform | Shared standards/templates; link policies rather than copy private text |
| Learner storage | Attempts/check versions/progress; separate from public content |
| Employer workspace | Restricted SOPs, configuration and records; separate authorization and ownership |

Reuse candidates (not live feeds and not independently audited in this change):
- security-market-map: reviewed category/vendor context and source evidence.
- account-signal-engine: research structures, provenance, identity matching, signal-versus-hypothesis patterns.
- gtm-revenue-os: planning assumptions, capacity, forecasting and leadership cases.
- channel-territory-mapping: routing, partner responsibilities, co-selling examples.
- detector-coverage-atlas: technical coverage evidence for security specialization.
- truffle-camp / secret-safari: reviewed game patterns.
- Private research index: remains private; no runtime dependency, automatic export or public-agent import. Public teaching must use independently reviewed public sources and original synthesis.

For reuse record source ID, owning repo/path, pinned version, original external evidence, rights, review date, consumers and correction trigger. Start with approved links/snapshots; do not create cross-repo synchronization now.

## Authoring and maintenance

Content record fields: stable ID, title, type, skill IDs, role IDs, prerequisites, outcome, body/example, exercise/check IDs, sources, classification, owner/reviewer, version, last reviewed, review due, change triggers, canonical path, publication status.
Mission additionally needs synthetic fixture version, interaction type, criteria, hints, feedback, transfer variant and evidence method.
Employer overlay references a foundation version and specifies local substitutions/requirements, effective date, approver and change impact.

Publication states: idea → draft → review → pilot → published → retired.
Availability (available/planned), evidence status and learner progress are separate fields.
No source review date alone proves factual correctness.

Enablement owns prioritization and curriculum; managers coach; SMEs review subject matter; RevOps validates process/tool mapping; technical maintainer owns runtime; employer process owners approve overlays.
Initially one person can fill several roles, but ownership must be explicit.

Weekly: feedback/defect triage. Monthly: confused learners, stale tool guidance and priorities. Quarterly: skill gaps, duplicate content and retirement. Event-triggered: process/product/source changes.
Minor wording fixes preserve progress. Material changes flag dependent lessons/overlays for review; any reassessment is communicated.
Learners see whether managers can view attempts, evidence or readiness; do not introduce employee monitoring by default.
Budget and support: no live paid AI required in pilot; track authoring/maintenance effort and learner setup failures before adding services.

## Keystatic rollout

First reconcile current schema and overlapping PRs. Select three existing lessons: a short foundation, a long companion guide, and mission-supporting content. Migrate one complete item first; do not duplicate independently editable bodies.
CMS owns editorial text; code owns scoring, progress semantics and interaction. Preserve IDs/URLs and reviewed/practiced/passed distinctions.
Verify installed Next.js compatibility, branch-based review, GitHub authentication, preview, deployment configuration, rollback, build consumption and public/private boundaries before production editor rollout. Editor auth is not reader auth.
CMS adoption is not required to first test mission paper prototypes.

## Delivery backlog and gates

Local EP IDs below are planning IDs, not external tickets.

| ID | Work | Dependency | Done when |
| --- | --- | --- | --- |
| EP01 | Consolidate decisions and link existing program | Current discussion | This document reviewed with authority clear |
| EP02 | Fresh source/runtime/PR inventory; choose three exact lesson IDs | EP01 | Reuse matrix and overlap decisions recorded; current implementation evidence linked |
| EP03 | Skill map, synthetic packet, rubric and four-screen wireframe | EP02 | Sales-only and builder routes can be walked through; evidence and unknowns visible |
| EP04 | Keystatic one-lesson vertical slice | EP02 | Branch edit renders in preview; stable IDs and rollback verified |
| EP05 | Foundation activity + one handoff chapter | EP03 | Learner performs, tests and explains one small change |
| EP06 | Remaining two lessons, chapters, passport and transfer check | EP04/05 | Full pilot ACs pass; local progress and accessibility reviewed |
| EP07 | Observe 3–5 consenting target learners; revise | EP06 | Findings and assistance recorded; blockers addressed |
| EP08 | Release review and operational handoff | EP07 | Required checks, human content/UX review and deployment verification complete |
| EP09 | Expand roles/lifecycle or test integrations | EP08 + evidence of need | Next slice justified by observed learning/maintenance results |

No deadline estimate until EP02/03 establish actual reuse and scope. No migration of all lessons, real employer integration, multi-tenant accounts, multiplayer, live LLM tutor, public credential verification, or separate LMS product in first release.

## Measurement and validation

Initial feature measurement: M0 — no new SDK/events for this pilot. Existing site instrumentation is not changed by this document. Owner: program sponsor. Baseline: not measured. Use consented qualitative task observation and synthetic regression fixtures. No real CRM details, transcripts or sensitive free text collected.
Record numerator/denominator if reporting task success: learners completing the independent task / learners attempting it; record hints separately. With 3–5 participants, findings are diagnostic, not broad efficacy proof.
Measure both learner transfer and author effort: correct independent task, explanation quality, assistance needed, later retention check, minutes to safely edit/correct content. Review instrumentation choice after the pilot or before collecting real learner data.
Suggested expansion gate: no unresolved critical correctness/accessibility/data-boundary defects and clear evidence learners can complete the core task; program owner sets quantitative targets before testing.

Runtime validation later: repository-required lint/type/build/security/tests, progress migration/reset/error cases, fixture/rubric checks, keyboard/focus, phone/tablet/desktop, reduced motion, manual zoom and screen-reader review as applicable. Passing viewport checks alone is not accessibility certification.
Rollback: revert feature/content changes while retaining recoverable versioned progress; test content rollback independently. Private employer design requires separate threat/access review.
This documentation change does not install dependencies, run application tests, merge PRs or deploy.

## Current evidence and limitations

Read 2026-10-13: root AGENTS.md, brand guidelines, PROGRAM.md, LEARNING-DEPTH.md, CURRICULUM-AUDIT.md, docs/ai-academy.md and CMS fundamentals. Existing counts and “hold” language are historical snapshots, not current runtime measurements.
Related PRs found: #131 Follow one click; #134 enterprise evaluation toolkit; #135 code-reading/YAML; #140 CMS fundamentals; #149 local check-results preview; #150 delivery terminology. PR descriptions are supporting context, not confirmation of current merge, CI or live deployment. Recheck in EP02.
Search found no open Keystatic PR and no matching enablement issue in scoped queries; this is not exhaustive proof no related work exists.
The user-provided editorial audit is contextual input, not an independent deployment verification. No private source content or employer data was imported.

## Instructional references

Reviewed during the planning conversation on 2026-10-13. These support instructional principles, not proof this particular game works.

1. [IES: Organizing Instruction and Study to Improve Student Learning](https://ies.ed.gov/ncee/wwc/PracticeGuide/1) — worked examples, retrieval and spacing.
2. [Carnegie Mellon teaching principles](https://www.cmu.edu/teaching/principles/teaching.html) — align objectives, activities and assessment.
3. [Carnegie Mellon learning principles](https://www.cmu.edu/teaching/principles/learning.html) — goal-directed practice and targeted feedback.
4. [CAST UDL Guidelines](https://udlguidelines.cast.org/) — accessible choices and varied engagement.
5. [CIPD learning needs analysis](https://www.cipd.org/uk/knowledge/factsheets/learning-needs-factsheet/) — needs analysis and evaluation.
6. [ATD sales enablement blueprint](https://www.td.org/content/td-magazine/a-sales-enablement-blueprint-for-success) — repeatable program design, manager coaching and reinforcement.
7. [Keystatic Next.js guide](https://keystatic.com/docs/installation-next-js) and [GitHub mode](https://keystatic.com/docs/github-mode) — implementation references to recheck against installed versions.

## Change log

- 0.1 (2026-10-13): consolidated discussion into two-track program, role/buyer framework, Trusted Handoff mission, scenario stack, maintenance model, evidence boundaries, staged CMS pilot and delivery backlog. All future implementation remains explicitly proposed.
