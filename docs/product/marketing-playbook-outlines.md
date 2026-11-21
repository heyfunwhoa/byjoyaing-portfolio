# Sales and marketing playbook outlines

Owner: portfolio maintainer. Editorial scope: ten sales and eight marketing outlines for Field Notes, prepared November 7, 2026. Status: proposed content for review; no completed campaign, customer outcome or downloadable kit is asserted.

## Reader task and placement

From `/field-notes`, choose a sales or marketing problem, open its outline and identify a useful artifact to build. The page sequence becomes introduction and section links → existing published guides → sales outlines → marketing outlines → complementary framework topics → deeper work and contact paths. Published guides remain first. Home, About, Work, global navigation and existing guide URLs are unchanged.

The page uses the canonical `Exploring` evidence label once per collection. Each entry is an outline, not a case study or a promise of an available download. Sales outlines also name the evidence to advance and when to pause or walk away. The public copy is maintained in [`sales-playbooks.ts`](../../lib/field-notes/sales-playbooks.ts) and [`marketing-playbooks.ts`](../../lib/field-notes/marketing-playbooks.ts); this document owns expansion and editorial handoff, not a second content catalog.

Delivery tier: 1, small isolated editorial addition using existing page patterns. No new Linear issue: this does not implement the larger campaign product or change its requirements. Engineering risk for this change: Tier A, static public content with no new API, storage or integrations. The wider application retains its existing risk boundaries.

## Repository connections and expansion

Every outline has at least one visible connection explaining how the existing work contributes. Source identity is resolved from the existing `connectedSources` in `lib/field-notes.ts`; project titles and routes come from `lib/project-directory.ts`. There is no second repository directory. Private source code stays private: links open an existing public project story. Security Market Map is public and can link to its repository.

| Outline | Primary repository | Public destination / contribution | First artifact |
| --- | --- | --- | --- |
| Territory planning | GTM Revenue OS + Account Signal Engine + Channel Territory Mapping | Account Intelligence research and Partner GTM ownership | Account selection worksheet and territory plan |
| Signal-to-conversation | Account Signal Engine + Security Market Map + GTM Revenue OS | Account Intelligence: source, account hypothesis and outreach relevance | Signal brief and message examples |
| Discovery and qualification | GTM Revenue OS + Security Market Map | GTM Operating Plan: buyer outcomes and qualification evidence | Discovery guide and gap plan |
| Partner co-selling | Channel Territory Mapping + Account Signal Engine + GTM Revenue OS | Partner GTM Engine: matching, access and joint ownership | Joint account plan |
| Champion development | GTM Revenue OS | GTM Operating Plan plus existing stakeholder guide | Champion kit and internal presentation outline |
| Competitive selling | Security Market Map | Public market research and competitive method | Criteria and proof map |
| Stalled-deal recovery | GTM Revenue OS | Revenue Intelligence: stage history and deal review | Stall diagnosis and continue/pause/close record |
| Account expansion | GTM Revenue OS | GTM Operating Plan: customer-intelligence reference | Account review and expansion hypothesis |
| Deal inspection and forecasting | GTM Revenue OS | Revenue Intelligence: pipeline and forecast evidence | Deal review worksheet |
| Sales coaching and onboarding | GTM Revenue OS + Truffle Camp | Sales-process criteria and a security-training practice example | Coaching session and skill rubric |
| Event marketing | GTM Revenue OS | GTM Campaign Lab: preparation, follow-up and learning | Event brief and readout |
| Partner campaigns | Channel Territory Mapping | Partner GTM Engine: campaign cohort and handoffs | Joint campaign brief |
| Account-based campaigns | Account Signal Engine | Account Intelligence: researched account selection | Cohort brief and controlled message test |
| Product launches | GTM Revenue OS | GTM Campaign Lab: content-to-sales foundation | Launch brief and field-readiness checklist |
| Content and distribution | GTM Revenue OS | GTM Campaign Lab: narrative, assets and feedback | Core asset and distribution plan |
| Lifecycle and nurture | GTM Revenue OS | GTM Campaign Lab: lifecycle and response routes | Entry/exit map and sequence |
| Customer advocacy and proof | GTM Revenue OS | GTM Operating Plan: customer-intelligence reference | Fictional story brief and proof card |
| Campaign-to-sales activation | GTM Revenue OS | GTM Campaign Lab: rep kit and accepted follow-up | Rep kickoff kit |

Partner campaigns owns the shared audience and campaign brief; partner co-selling focuses on one account and accepted commercial actions. Signal-to-conversation leads to a buyer-confirmed next step; discovery tests qualification. These are editorial connections and reuse plans, not implemented integrations. A portfolio story is an accessible introduction to the work, not a mirror of a private application's latest UI. Canonical process, evidence and measurement rules remain with the owning repo. Neither Product Release Intelligence nor Customer Feedback Intelligence is presented as a separate GitHub repository: their portfolio stories are related concepts, while the relevant operating references are in GTM Revenue OS.

### Existing material to reuse

The published enterprise evaluation toolkit already covers value hypotheses, technical evaluations, mutual action plans, procurement, negotiation and handoffs. The sales collection links that toolkit; discovery and champion outlines link the existing deal and stakeholder guides. These subjects do not need duplicate guides.

The former topic-only list is reconciled: opportunity qualification feeds discovery; deal inspection and pipeline/forecast cadence feed the review playbook; coaching/onboarding feeds the coaching playbook. Strategic account planning remains a complementary future framework for developing one account in depth. ICP and segmentation remains a complementary framework for defining market/customer fit. Territory planning applies those inputs to allocate effort across a book. These are not duplicate playbooks.

Start sales expansion with **territory planning → signal to conversation → discovery → partner co-selling**. Start marketing expansion with **events → partner campaigns → campaign-to-sales activation**. A shared fictional account can connect the examples while each repo retains ownership of its records and requirements.

### Inspected source references

Repository visibility and the following scoped references were inspected by assistant on November 7, 2026. Paths in private repositories are maintenance pointers, not public links. None of these reads establish deployment, successful campaign performance or source-owner approval of this new content.

| Source | Reference inspected | Supports / limits |
| --- | --- | --- |
| GTM Revenue OS | `README.md`; `docs/product/typical-sales-process.md`; `docs/head-of-sales/pipeline-forecast-and-deal-inspection.md` | Planning and sales-process ownership, stage evidence and forecast review. No live CRM claim. |
| GTM Revenue OS | `docs/product/marketing-content-sales-foundation.md`; `docs/product/customer-intelligence-playbook.md` | Content-to-sales and customer-learning operating references. Documentation is distinct from software execution. |
| GTM Revenue OS event proposal | `docs/product/event-marketing-core.md` on `docs/partner-campaign-foundation-20261107` | Event preparation, delivery and learning core. Proposed branch reference, not an accepted production feature. |
| Account Signal Engine | `README.md`; `docs/account-workshop/OUTBOUND-EXPERIMENT-PLAYBOOK.md` | Account research and the account-level hypothesis/message experiment. No automatic sending or causal-performance claim. |
| Channel Territory Mapping | `README.md`; inspected partner campaign foundation reference from the event work | Account matching and relationship ownership; partner campaign/co-selling expansion is a proposal. |
| Security Market Map | Public `README.md`, research standards section | Category research and competitive-intelligence method. Not a claim that all comparisons are complete. |
| Truffle Camp | `README.md`, learning design and MVP sections | Synthetic security practice with feedback. Example of a learning pattern, not an existing generic sales onboarding product. |
| Portfolio | `lib/project-directory.ts`, `lib/field-notes.ts`, `docs/enterprise-evaluation/README.md` | Existing public destinations and evaluation toolkit. Internal links reveal no private repo URL. |

## Maintenance

- Edit outline wording in its existing data file. Change source identity only in the existing Field Notes source registry, and project titles/routes only in the existing project directory.
- When an owning repo changes a relevant workflow or a public project moves, review its connected outlines. Update source inspection notes and rerun the relationship tests. No scheduled synchronization is enabled.
- Keep each connection's contribution explicit. Do not infer that a project implements the whole playbook or claim an ownership transfer.
- Complete and review examples in the owning repo; publish only approved or fictional public-safe adaptations in the portfolio.

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
| Evidence to advance (sales) | [Buyer-confirmed evidence supporting the next decision] |
| Pause/stop conditions (sales) | [What changes the action to more discovery, pause or closeout] |
| Connected work | [Existing source ID, public project destination and specific contribution] |
| Learning decision | [Repeat, change or stop; why; owner; next review] |
| Evidence and permissions | [Claim sources, approved use, private details removed and review status] |

No arbitrary performance targets are supplied. A blank baseline is unknown. Choose targets and reporting windows for the actual use case. Do not invent pipeline, revenue or causal impact to make the portfolio story feel complete.

## Publication progression

1. **Outline:** useful purpose, steps, starter kit and measurement prompts, labeled Exploring.
2. **Worked example:** add one explicitly fictional scenario, completed artifact and exception path; review source claims and rights.
3. **Published guide:** promote only after content review and the relevant route/template, links and browser checks are complete. Keep illustrative classification unless supported professional evidence justifies another label.
4. **Professional evidence:** separately approved experience may support a Work story linked to the guide. Never convert a fictional example into a real campaign result.

Use the existing Field Notes authoring/publication boundaries. The two-guide Keystatic collection is unchanged. The shared `PlaybookOutlines` renderer keeps sales and marketing cards consistent. No blank routes, disabled download buttons, placeholder links or public forms are added.

## Evidence record

| Field | Record |
| --- | --- |
| Claim IDs | `marketing-outline-events`, `marketing-outline-partner-campaigns`, `marketing-outline-account-based-campaigns`, `marketing-outline-product-launches`, `marketing-outline-content-distribution`, `marketing-outline-lifecycle-nurture`, `marketing-outline-customer-advocacy`, `marketing-outline-sales-activation`; sales claim IDs use `sales-outline-` followed by each stable ID in `sales-playbooks.ts` |
| Claim text/kind | Each named outline proposes a preparation, delivery and learning structure for its stated use case. Original derived editorial advice, not an empirical performance claim or licensed methodology. |
| Source owner/type | Portfolio maintainer's authored content; event structure informed by the existing GTM Revenue OS `docs/product/event-marketing-core.md` proposal. No third-party template, quotation or graphic copied. |
| External source URL / verified at | null / null. No external performance or vendor-capability claim is made. Repository connections have separately inspected internal source references above. |
| What was inspected | Current portfolio guidance plus the scoped repository references listed above, inspected by assistant November 7, 2026. This establishes editorial context and ownership only; original advice remains unvalidated. |
| Confidence / verification | Unassessed effectiveness; proposed and unvalidated as a campaign method. |
| Limitations | No completed artifacts, campaign execution, measured lift, configured integrations, customer permissions or owner publication approval. Measures are selection prompts, not a replacement for canonical lifecycle/Finance definitions. |
| License/rights | Original wording; no third-party material redistributed. Future sourced examples require separate rights review. |
| Owner / review trigger | Portfolio maintainer; review before publication, on source/ownership changes and before upgrading an outline into a full guide. |
| Adoption / evidence | Proposed; owning PR and its checks establish implementation evidence separately. |

## Acceptance and verification

- AC-01: Field Notes contains ten sales and eight marketing outlines after existing published guides, each with purpose, use case, before/during/after, artifacts, measures and next build. Every sales outline also includes advance evidence and pause conditions.
- AC-04: All 18 outlines have a visible contribution and verified public destination resolved from existing registries. Private repos have no exposed source URLs; invalid source/project references fail validation. Existing published guides are linked rather than duplicated.
- AC-02: A reader can reach the section and operate every native disclosure by keyboard; closed and expanded content reflows at 375, 768 and 1280px, with reduced motion and a 200% reflow check.
- AC-03: Existing guide destinations and the Keystatic two-guide contract remain intact; superseded topic-only placeholders are removed while complementary strategic account planning and ICP/segmentation framework topics remain. No fabricated outcomes, new dependencies, CMS schema, integrations or private records.

Check results and limitations are recorded in the owning PR. An automated viewport or CSS zoom check is not a real-device or assistive-technology conformance review. Rollback is a revert of this focused change.

### Focused browser coverage and owner review

`tests/site/field-notes-playbooks.spec.ts` adds five scenarios to the existing production-build browser suite. It checks all 18 disclosures at 375, 768 and 1280px with reduced motion, natural Tab order between connected links and summaries, visible keyboard outlines, Enter/Space activation, control target sizes and closed/expanded horizontal reflow. It also follows each distinct internal project destination and both linked guides, returns to Field Notes, and checks native disclosure use with JavaScript disabled. The external Security Market Map URL is checked without navigating to it.

The suite uses the existing CI/browser configuration. It adds no workflow, dependency, credential, preview bypass or recording. Results belong to the exact PR head and are recorded in PR #289. This is automated behavior evidence, not manual visual, contrast, screen-reader or 200% browser-zoom approval.

For the remaining owner review, open the preview from PR #289 while signed into Vercel:

1. Scan the closed cards on phone and desktop. Confirm the purpose, connected work and outline action are easy to find.
2. Open Territory planning and Event marketing. Decide whether the level of detail represents the intended public portfolio voice.
3. At 200% browser zoom, expand a card and follow its project link. Check readability, clipping and the return journey. Narrow-viewport automation is not a substitute for this check.
4. Review the focus indicator, text contrast and disclosure announcements with the intended browser and assistive technology.
5. Record the reviewed commit, observed issues and content approval in the existing PR. A successful automated run alone does not record owner acceptance.

If these checks reveal a defect, fix it within this PR and rerun the relevant checks. Expansion into worked examples begins with the already named territory, outreach, discovery and event artifacts; the remaining outlines can stay as useful starting points.
