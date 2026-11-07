# Marketing playbook outlines

Owner: portfolio maintainer. Editorial scope: eight public-safe outlines for Field Notes, prepared November 7, 2026. Status: proposed content for review; no completed campaign, customer outcome or downloadable kit is asserted.

## Reader task and placement

From `/field-notes`, choose a marketing problem, open its outline and identify a useful artifact to build. The page sequence becomes introduction and section links → existing published guides → marketing outlines → other topic ideas → deeper work and contact paths. Published guides remain first. Home, About, Work, global navigation and existing guide URLs are unchanged.

The page uses the canonical `Exploring` evidence label once at section level. Each entry is an outline, not a case study or a promise of an available download. The public copy is maintained in [`lib/field-notes/marketing-playbooks.ts`](../../lib/field-notes/marketing-playbooks.ts); this document owns expansion and editorial handoff, not a second content catalog.

Delivery tier: 1, small isolated editorial addition using existing page patterns. No new Linear issue: this does not implement the larger campaign product or change its requirements. Engineering risk for this change: Tier A, static public content with no new API, storage or integrations. The wider application retains its existing risk boundaries.

## Planned expansion

| Outline | First artifact to develop | Existing work to reuse when expanded |
| --- | --- | --- |
| Event marketing | Event brief and follow-up/readout example | GTM Revenue OS event marketing core and lifecycle/measurement definitions |
| Partner campaigns | Joint brief and ownership/handoff example | Channel Territory Mapping partner foundation and shared event core |
| Account-based campaigns | Cohort selection and one controlled message experiment | Account Signal Engine account evidence and GTM persona references |
| Product launches | Launch brief and field-readiness checklist | Product/release research and campaign content ownership |
| Content and distribution | One narrative adapted into a small asset package | GTM Revenue OS content-to-sales foundation and editorial planning |
| Lifecycle and nurture | Entry/exit map and response paths | Existing campaign/lifecycle and record-ownership definitions |
| Customer advocacy and proof | Fictional story brief and proof card | Existing customer-intelligence and source-verification guidance |
| Campaign-to-sales activation | Rep kickoff kit and response-to-outcome example | Existing seller enablement and campaign handoff work |

These are conceptual connections. The portfolio does not integrate with or synchronize these systems. Canonical campaign operations and measurement rules remain in their owning repositories. In-person partner events extend the shared event core; a date or commitment from a different initiative is never inherited.

Start expansion with **events → partner campaigns → campaign-to-sales activation**, so one fictional scenario can illustrate preparation, shared ownership and follow-through. Later outlines may reuse that scenario where it fits, without creating duplicate campaign records.

## Shared authoring brief

Use these prompts when developing any outline into a complete playbook. Copy them into the owning content brief, not a new cross-project database.

| Field | Placeholder to complete |
| --- | --- |
| Reader and trigger | [Role, buying situation and the moment this playbook helps] |
| Audience value | [What someone will learn, resolve or be able to do] |
| Business objective | [One primary outcome and the hypothesis behind it] |
| Selection and exclusions | [Audience/cohort, evidence, unknowns and who should not enter] |
| Message and proof | [Promise, supported evidence, limitations and useful next step] |
| Ownership and resources | [Accountable owner, contributors, reviewers, accepted responsibilities, budget and capacity] |
| Before / during / after | [Actions, dependencies, readiness decisions and exception paths] |
| Starter artifact | [One worked, fictional example and a usable blank template] |
| Follow-through | [Recipient, acknowledgment, next action, timing and disposition] |
| Measurement | [Primary measure, unit, source, cohort, numerator/denominator, exclusions, cutoff, maturity, baseline/unknown and learning question] |
| Learning decision | [Repeat, change or stop; why; owner; next review] |
| Evidence and permissions | [Claim sources, approved use, private details removed and review status] |

No arbitrary performance targets are supplied. A blank baseline is unknown. Choose targets and reporting windows for the actual use case. Do not invent pipeline, revenue or causal impact to make the portfolio story feel complete.

## Publication progression

1. **Outline:** useful purpose, steps, starter kit and measurement prompts, labeled Exploring.
2. **Worked example:** add one explicitly fictional scenario, completed artifact and exception path; review source claims and rights.
3. **Published guide:** promote only after content review and the relevant route/template, links and browser checks are complete. Keep illustrative classification unless supported professional evidence justifies another label.
4. **Professional evidence:** separately approved experience may support a Work story linked to the guide. Never convert a fictional example into a real campaign result.

Use the existing Field Notes authoring/publication boundaries. The two-guide Keystatic collection is unchanged. No blank routes, disabled download buttons, placeholder links or public forms are added.

## Evidence record

| Field | Record |
| --- | --- |
| Claim IDs | `marketing-outline-events`, `marketing-outline-partner-campaigns`, `marketing-outline-account-based-campaigns`, `marketing-outline-product-launches`, `marketing-outline-content-distribution`, `marketing-outline-lifecycle-nurture`, `marketing-outline-customer-advocacy`, `marketing-outline-sales-activation` |
| Claim text/kind | Each named outline proposes a preparation, delivery and learning structure for its stated use case. Original derived editorial advice, not an empirical performance claim or licensed methodology. |
| Source owner/type | Portfolio maintainer's authored content; event structure informed by the existing GTM Revenue OS `docs/product/event-marketing-core.md` proposal. No third-party template, quotation or graphic copied. |
| External source URL / verified at | null / null. No external performance or product-capability claim is made. |
| What was inspected | Current portfolio brand guide, Field Notes implementation and GTM event-core draft, inspected by assistant November 7, 2026. This establishes editorial context only. |
| Confidence / verification | Unassessed effectiveness; proposed and unvalidated as a campaign method. |
| Limitations | No completed artifacts, campaign execution, measured lift, configured integrations, customer permissions or owner publication approval. Measures are selection prompts, not a replacement for canonical lifecycle/Finance definitions. |
| License/rights | Original wording; no third-party material redistributed. Future sourced examples require separate rights review. |
| Owner / review trigger | Portfolio maintainer; review before publication, on source/ownership changes and before upgrading an outline into a full guide. |
| Adoption / evidence | Proposed; owning PR and its checks establish implementation evidence separately. |

## Acceptance and verification

- AC-01: Field Notes contains eight identifiable marketing outlines after existing published guides, each with purpose, use case, before/during/after, artifacts, measures and next build.
- AC-02: A reader can reach the section and operate every native disclosure by keyboard; closed and expanded content reflows at 375, 768 and 1280px, with reduced motion and a 200% reflow check.
- AC-03: Existing guide destinations and the Keystatic two-guide contract remain intact. No fabricated outcomes, new dependencies, CMS schema, integrations or private records.

Check results and limitations are recorded in the owning PR. An automated viewport or CSS zoom check is not a real-device or assistive-technology conformance review. Rollback is a revert of this focused change.
