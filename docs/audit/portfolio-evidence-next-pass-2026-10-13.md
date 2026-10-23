# Portfolio evidence and guided examples

This follows the full-site layout remediation. The focus is commercial evidence, clear audience paths and one inspectable example per featured project. It uses existing public experience and portfolio fixtures; it does not add private employer material, new metrics, real account research or integrations.

## Changes

| Area | Result |
| --- | --- |
| Home / About | Direct routes to enterprise selling and coaching evidence; clearer connection between advertising and technical selling. |
| Work | Scope of responsibility, people involved and judgment behind the approach are explicit. Contextual requests stay outside the longer story disclosure. Featured cards do not repeat a case already represented by a professional story. |
| Capabilities | Commercial purpose first, professional experience before related designs, implementation limitations retained beside the examples. |
| Experience | Professional Work links precede related independent projects; introduction distinguishes professional contribution from independent designs. |
| Field Notes | Use cases, a starting task, professional evidence links and contextual deeper requests. Synthetic frameworks remain labeled. |
| Side Quests / Projects | Three featured independent examples; remaining projects stay in the existing directory and Other explorations. The directory does not acquire another featured list. |
| Five case pages | Optional four-step guided examples reuse public references or existing synthetic data. No collection, monitoring, model calls, external writes or messaging. |
| Truffle Camp | One synthetic knowledge check with immediate explanatory feedback; no real credential, certification, saved progress or employer course claim. Current implementation copy updated. |
| Academy | Three starting paths with prerequisites, outcomes and navigation through existing lessons. Progress remains session-only. |
| Contact | Explains review expectations; professional example and deal-guide contexts use an explicit allowlist. A request never grants file access. |

## Evidence boundaries

Professional stories remain aggregate summaries of existing public experience. A flagship customer-specific or anonymized deal case requires its own approved facts, ownership, collaborators and outcome evidence. The new scope statements do not assert direct management or attribute company results to the individual.

The Atlas example explains the existing table’s labels. It does not verify credentials or establish current product coverage. Competitive Intelligence explicitly uses an illustrative sentence pair, not a historical vendor diff or dated monitoring result. Account Intelligence and Customer Feedback use existing fictional records. Truffle Camp demonstrates one independent practice exercise.

## Validation and review

Local production build including TypeScript, ESLint and 156 unit/source-guard tests pass. New tests check fixture provenance, uncertainty boundaries, the Camp answer and valid learning-path references. Browser coverage adds all five capability routes, both Field Notes and Truffle Camp, plus guided-step navigation, answer feedback, contextual requests and Academy paths. Final CI results are recorded in the PR; test source alone is not a passing browser run.

Human review should compare phone/tablet/desktop and 200% zoom, inspect expanded examples, review the professional wording and verify that the employer/independent distinction is clear. The open responsive-reference PR owns tablet configuration; this change avoids modifying its configuration or the separate analytics PR.

## Remaining work, in order

1. Approve two detailed professional cases from appropriate evidence: enterprise execution and coaching/enablement. Do not publish numbers or confidential materials from personal memory.
2. Run usability sessions with hiring leaders and technical collaborators: identify the role, find a relevant contribution, inspect evidence, distinguish a demo from a deployed system and make contact. Do not invent participant feedback or task results.
3. Finish tablet/zoom/contrast review and establish a measured performance baseline on the final production deployment.
4. Verify inbox delivery with an explicitly approved synthetic send/recipient. Code tests use mocks or blocked mail routes.
5. Implement durable distributed rate limiting through an approved configured service. No paid infrastructure is provisioned by this content/UI change.
6. Build real account/competitive monitoring in the appropriate separate application with access and evidence controls. These public walkthroughs do not create that backend or expose private research.


## KRU-65 — first four-hour implementation slice (2026-10-14)

Status: **proposed for review, not published, browser-verified, merged or deployed**. This first slice reuses the existing Work page, WorkExplorer/ProfessionalCaseStudy, and independent project pages. It connects exactly three leadership-relevant stories without adding a fourth case, a new component, an auth system, or a simulator. The existing public Work page has other professional stories; this is a **curated evidence path**, not a claim that those were replaced.

### The three case-study narratives and provenance

| Story | Problem / role | Decision and implementation | Evidence / honest outcome | Limitation and links |
| --- | --- | --- | --- | --- |
| Commercial leadership | Complex technical selling and uneven access to field knowledge; individual enterprise seller who also coached and supported onboarding | Translate recurring discovery/evaluation issues into repeatable field guidance; balance consistency against account-specific judgment; coordinate with sales, solutions architecture and CS | Existing public professional case and experience timeline support described contributions, not a verified quantified team productivity result | Do not claim formal Head of Sales tenure or direct management; no employer POCs, customer identities or internal enablement assets. [/work](/work), [/experience](/experience), [public-stories.ts](../../lib/public-stories.ts) |
| Account Workshop | An account hypothesis can outlive evidence that supports it; independent synthetic workflow design | Version dependencies and invalidate downstream brief/person/draft recommendations when a correction or revocation arrives, instead of silently overwriting | Existing offline fixture demonstrates correction propagation, deterministic replay/conflict behavior and immutability; tests were recorded in the owning repository, **not rerun for this portfolio PR** | Fictional Northwind/Avery records only; not a live research, CRM, person verification or sending product. [synthetic story](https://github.com/heyfunwhoa/account-signal-engine/blob/main/docs/account-workshop/SYNTHETIC-STORY.md), [/work/account-intelligence](/work/account-intelligence) |
| Cybersecurity evidence research | Product comparisons conflate category membership, vendor statements and independently tested support; independent researcher/system designer | Preserve claim-level source links, timestamps and Unknown vs Not supported; favor bounded defensible comparisons over universal coverage or proprietary scoring | KRU-76 verification document reports local build/tests and 375/768/1280/640px browser behavior for the secrets detection comparison in the **owning repo**; those results do **not** verify this portfolio change | Publisher claims are not measured detection performance, snapshot is not a live freshness guarantee, and KRU-76 is pending human review. [KRU-76 evidence](https://github.com/heyfunwhoa/security-market-map/blob/main/docs/verification/kru-76-comparison.md), [comparison source](https://github.com/heyfunwhoa/security-market-map/blob/main/components/comparison-evidence.tsx), [/work/detector-coverage-atlas](/work/detector-coverage-atlas) |

Source paths under /work are existing portfolio routes; confirm they match the intended narrative in a rendered browser before approving publication. Each case still needs owner-approved final editorial copy for **problem, role, decision/tradeoff, implementation, evidence/outcome, limitations** before calling KRU-65 Done.

### Five-minute private interview walkthrough — Revenue OS

Use the **existing** `heyfunwhoa/gtm-revenue-os` leadership scenario and comparison engine; do not embed a live simulator or its target-company-inspired fixture into public portfolio assets. Run the walkthrough in an appropriately private local environment or reviewed private access context. All numbers are editable **illustrative assumptions**, never actual ARR, quota, compensation, conversion, company financials or achievements.

- **0:00–0:45 — Decision and ICP.** “I am testing whether a small technical-security company should prioritize a service-provider wedge or enterprise/platform buyers.” State this as a hypothesis; discuss required customer interviews and stage conversion data.
- **0:45–1:30 — Pipeline assumptions.** Inspect annual new-ARR bridge, average contract size, win rate, pipeline coverage and cycle length. Call out that pipeline creation, pipeline-constrained bookings, contractual ARR, recognized revenue and cash are separate measurements.
- **1:30–2:30 — Capacity.** Show the existing fractional player-coach roster and quota-attainment assumptions. Distinguish theoretical selling capacity from realistic sourcing and pipeline availability. Avoid counting the named roster twice.
- **2:30–3:45 — Hiring economics.** Compare no hire / first AE in month six / first AE in month twelve using `compareRosterFirstHire`. Inspect ramp, loaded hiring/department costs **only where actually implemented and verified**. No automatic best-hire answer.
- **3:45–5:00 — Leadership decision.** Offer a conditional hire/no-hire position, a credible counterargument, source gaps, an outbound or ICP experiment, inspection cadence and the earliest trigger for revisiting the choice.

[Existing Revenue OS scenario code](https://github.com/heyfunwhoa/gtm-revenue-os/blob/main/lib/leadership/scenarios.ts) · [Revenue OS canonical PRD](https://github.com/heyfunwhoa/gtm-revenue-os/blob/main/docs/product/prd.md) · [KRU-36 verification gate](https://linear.app/krusty/issue/KRU-36).

The scenario's current source includes an identifiable company-inspired label. **Do not show that company name, source file contents, private notes or hypothetical figures on the public portfolio.** Before sharing a live private interview, review the environment and anonymize the displayed name, and verify all demonstrated cost functionality on the selected head. The walkthrough is a script, not evidence that a five-minute test was completed.

### Four-hour timebox and gates

| Budget | Work | Status on this first pass |
| --- | --- | --- |
| 0:00–0:45 | Inspect main, local governance, existing work, related issues/PRs and Revenue OS | Partial repository and issue inspection completed |
| 0:45–2:00 | Curate three stories and route to existing examples | Work navigation edit committed; final editorial review pending |
| 2:00–3:00 | Private Revenue OS five-minute guide with source and privacy boundaries | Written here; no private live demo verified |
| 3:00–4:00 | Phone/tablet/desktop, keyboard, reduced-motion, 200% zoom, overflow, contact/evidence navigation and checks | **Not run** in this connector-only session; required before review approval |

**Verify on the PR head:** package unit tests, lint, TypeScript/build, relevant browser tests, hosted CI/security checks, link destinations and privacy string search of rendered HTML/client assets. Manual widths: 320, 375, 768, 1024, 1440; actual 200% zoom; keyboard and focus, reduced motion, touch targets, overflow, evidence/contact. Reconcile the existing tablet browser PR #116 instead of adding overlapping tests. Record command outputs, browser artifacts, reviewer and commit SHA; source code inspection is not test evidence.

**Next three tasks:** (1) Review final wording and permissions for each of three stories, including whether the Atlas route represents the chosen secrets-comparison evidence accurately; (2) run current-head automated/browser/manual checks and record real observations; (3) rehearse the genuinely private Revenue OS five-minute flow with a neutral label, verify financial/ramp math and capture decision memo and limitations. No merge or deployment without human review.
