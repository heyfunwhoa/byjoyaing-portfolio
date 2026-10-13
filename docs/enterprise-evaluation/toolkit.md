# Evaluation toolkit: Alderworks and Sentinel Orchard

[Track home](README.md) · [Architecture](architecture.md) · [Portfolio case study](case-study.md)

**Every organization, number, milestone and result below is fictional.** Sentinel Orchard is an invented security product; nothing here asserts support or performance for TruffleHog or any real vendor. Copy the blank fields into an approved workspace for actual work. Never store customer findings, credentials, contracts or completed questionnaires in this public repository.

## Scenario brief

Alderworks is evaluating whether a secrets-detection workflow can reduce manual triage and establish clearer remediation ownership before a platform migration. It proposes ten synthetic repositories, two source categories and a 15-working-day evaluation. The migration is six weeks away; its dependency on this purchase has not been confirmed. The evaluation lead is an AppSec manager. Budget authority, signing authority and the production risk approver are unknown. Existing tools, an internal build and delaying the project are alternatives.

All relative days are planning assumptions, not commitments. The invented test results below exist solely to practice a readout.

## 1. Executive evaluation brief

| Field                | Blank template / question                                                       |
| -------------------- | ------------------------------------------------------------------------------- |
| Decision requested   | Approve evaluation, extend a bounded test, select an option, defer, or decline? |
| Current problem      | What happens today, and who experiences the impact?                             |
| Evidence and date    | What observation supports this statement?                                       |
| Business outcome     | What would improve, for whom, and how would we notice?                          |
| Value hypothesis     | What benefit is expected; which inputs remain assumptions?                      |
| Scope and exclusions | Which environments, sources and use cases are included?                         |
| Alternatives         | Existing tools, internal build, competitor, defer, do nothing                   |
| Resources and costs  | Customer time, vendor time, infrastructure, subscription assumptions            |
| Decision owners      | Technical recommendation, funding, risk acceptance, contract signature          |
| Timing               | Customer event, consequence of delay, seller target recorded separately         |
| Risks and unknowns   | What could make the evaluation unsafe or uninformative?                         |
| Next decision        | Owner, checkpoint, required evidence                                            |

**Illustrative opening:** Approve a bounded evaluation of coverage and triage workflow using ten synthetic repositories. We want to determine whether the proposed workflow is useful enough to justify further buying work. Production access is excluded. Funding and security approval remain unresolved. The next decision is whether to proceed after reviewing coverage, triage effort and ownership evidence.

## 2. Discovery and stakeholder worksheet

| Role                  | Person/team placeholder | What matters to them? | Authority/influence evidence  | Confidence | Next question |
| --------------------- | ----------------------- | --------------------- | ----------------------------- | ---------- | ------------- |
| Evaluator             | [Owner]                 | [Outcome]             | [Source/date]                 | Unknown    | [Question]    |
| Champion candidate    | [Owner]                 | [Outcome]             | [Advocacy/influence evidence] | Unknown    | [Question]    |
| Economic buyer        | [Owner]                 | [Outcome]             | [Budget/decision authority]   | Unknown    | [Question]    |
| Security and privacy  | [Owner]                 | [Risk scope]          | [Approval responsibility]     | Unknown    | [Question]    |
| Procurement and legal | [Owners]                | [Process/terms]       | [Process confirmation]        | Unknown    | [Question]    |
| Authorized signer     | [Owner]                 | [Delegated authority] | [Confirmation]                | Unknown    | [Question]    |
| Production owner      | [Owner]                 | [Operation/adoption]  | [Ownership acceptance]        | Unknown    | [Question]    |

Evidence labels: **Confirmed** = directly stated or demonstrated in the stated scope; **Supported** = credible indirect evidence; **Hypothesis** = assumption to test; **Unknown** = no adequate evidence. Record dates: confirmed evidence can become stale. A champion candidate is not confirmed by friendliness alone.

Discovery prompts: What happens today? Where does it break? What is the consequence? What outcome would justify change? What happens if nothing changes? Who must agree? Which uncertainty requires a POC rather than a discussion? What resources are available?

## 3. POC charter and readiness checklist

Charter fields: hypothesis; buyer question; scope; exclusions; sample rationale; baseline; duration; approved resources; costs; stakeholders; success criteria; stop conditions; extension rule; evidence location; final decision owner.

For every checklist item record **owner, status, evidence/reference, blocker and date**. Status options: Not started / In progress / Blocked / Complete / Not applicable with reason.

- [ ] Buyer question and reason for a POC agreed.
- [ ] Success criteria, methods and result rules agreed before testing.
- [ ] Evaluation scope and source inventory approved.
- [ ] Product edition and supported deployment verified against official documentation.
- [ ] Architecture, outbound connections and data handling reviewed.
- [ ] Access approved, permissions minimized and credentials managed securely.
- [ ] Required evaluation agreement and confidentiality process completed.
- [ ] Security/privacy review scope and any prerequisite approval confirmed.
- [ ] Sample, baseline and comparable measurement method prepared.
- [ ] Customer and vendor owners accept their tasks.
- [ ] Checkpoints, final readout and decision participants scheduled.
- [ ] Sensitive-finding response, stop conditions and cleanup agreed.

**Go/no-go rule for this exercise:** Do not start if authorization, safe data handling or accountable technical ownership is unresolved. This is a teaching rule, not a real vendor’s policy.

## 4. Scorecard template and invented result packet

Record criterion, baseline, target, method, sample, evidence, owner, result, limitation and consequence. Result is **Pass / Fail / Inconclusive / Not tested**; it is distinct from checklist completion.

| ID  | Agreed illustrative criterion                               | Method and synthetic result                                       | Result          | Limitation / next action                                     |
| --- | ----------------------------------------------------------- | ----------------------------------------------------------------- | --------------- | ------------------------------------------------------------ |
| C1  | Scan all ten agreed repositories                            | Completion logs show nine of ten; one access error                | Fail            | Resolve access and rerun coverage before claiming full scope |
| C2  | Median triage time at most 8 minutes on comparable cases    | Twenty invented cases: baseline median 12 minutes, trial median 7 | Pass for sample | Small synthetic sample; cannot generalize to production      |
| C3  | Each test finding has an accepted remediation owner         | Eight of ten have an accepted owner                               | Fail            | Identify routing gap; obtain owner acceptance                |
| C4  | Complete the large-source workload within the agreed window | Large source excluded by access blocker                           | Inconclusive    | No valid performance conclusion; bounded retest needed       |
| C5  | Revoke temporary credentials at closeout                    | Closeout has not occurred                                         | Not tested      | Assign customer administrator and verification evidence      |

The data does not demonstrate detection precision, recall, breach reduction or complete production coverage. Do not infer those claims. If a target changes, record who agreed, when, why and how the change affects interpretation; do not retroactively rewrite a failed target to make it pass.

## 5. Kickoff, checkpoint and change log

**Kickoff:** purpose → mutual expectations → scope → architecture/access → success criteria → owners → blockers → checkpoints → closeout.

**Checkpoint:** since last review → evidence collected → result changes → blockers → customer/vendor actions → impact on dates → next decision.

| Change or blocker | Evidence    | Impact                 | Owner  | Proposed action | Buyer agreement | Decision date |
| ----------------- | ----------- | ---------------------- | ------ | --------------- | --------------- | ------------- |
| [Description]     | [Reference] | [Scope/time/cost/risk] | [Role] | [Action]        | Pending         | [Date]        |

Stop and escalate if unapproved sources enter scope, credentials are exposed, unexpected data leaves the agreed boundary or required controls are missing. Do not paste sensitive details into a public issue.

## 6. Mutual action plan

These are proposed milestones. A live MAP requires customer agreement and realistic dates.

| Milestone                                    | Customer owner                | Vendor owner             | Target    | Dependency                            | Completion evidence                  | Status   |
| -------------------------------------------- | ----------------------------- | ------------------------ | --------- | ------------------------------------- | ------------------------------------ | -------- |
| Confirm problem, scope and decision criteria | Sponsor/evaluator             | AE/SA                    | Day 0     | Discovery                             | Joint charter                        | Proposed |
| Confirm evaluation access and data scope     | Technical/security owner      | SA                       | Day 2     | Architecture                          | Approval reference                   | Proposed |
| Begin procurement/legal intake               | Procurement/legal             | AE/legal                 | Day 2     | Proposed purchase scope               | Intake accepted and process mapped   | Proposed |
| Execute test plan                            | Evaluator                     | SA                       | Days 3–10 | Readiness gates                       | Scorecard and evidence               | Proposed |
| Review security/privacy questions            | Risk/privacy owner            | Security owner           | Days 3–12 | Data flow and evidence packet         | Decision or tracked gaps             | Proposed |
| Review business value and budget             | Budget owner                  | AE                       | Day 11    | Measurement and assumptions           | Buyer response                       | Proposed |
| Present results and decide next step         | Decision group                | AE/SA                    | Day 15    | Scorecard                             | Decision record                      | Proposed |
| Complete commercial/legal approvals          | Legal/procurement             | Authorized vendor owners | TBD       | Accepted scope and redlines           | Approved agreement version           | Proposed |
| Complete vendor onboarding                   | Procurement/finance           | Finance                  | TBD       | Required registration                 | Onboarding confirmation              | Proposed |
| Execute agreement and PO if required         | Authorized signer/procurement | Authorized signer        | TBD       | Budget, terms, onboarding as required | Execution and PO evidence            | Proposed |
| Transfer to production or clean up           | Implementation/admin          | CS/SA                    | TBD       | Decision                              | Accepted handoff or cleanup evidence | Proposed |

**Dependency lesson:** Procurement onboarding can start early, but actual ordering sequence varies. Do not treat Day 15 as a promised close date. Technical selection, legal approval, signature, PO, invoicing and revenue recognition are different events.

## 7. Procurement and contracting tracker

| Item                     | Question to resolve                                                 | Accountable role      | State   | Evidence    |
| ------------------------ | ------------------------------------------------------------------- | --------------------- | ------- | ----------- |
| MNDA                     | Is confidential exchange needed, and which approved terms apply?    | Legal                 | Unknown | [Reference] |
| Evaluation authorization | What agreement/access approval permits this POC?                    | Legal/technical owner | Unknown | [Reference] |
| Service terms/MSA        | Whose terms, what version and who handles redlines?                 | Legal                 | Unknown | [Reference] |
| Order form               | Scope, quantity, price, dates and incorporated terms?               | Commercial/legal      | Unknown | [Reference] |
| DPA                      | Does actual processing require privacy terms for this jurisdiction? | Privacy/legal         | Unknown | [Reference] |
| SLA/SOW if applicable    | Service or implementation commitments and exclusions?               | Service owner/legal   | Unknown | [Reference] |
| Budget                   | Who approves funding and from which allocation?                     | Budget owner          | Unknown | [Reference] |
| Vendor onboarding        | Registration, tax/payment forms and lead times?                     | Procurement/finance   | Unknown | [Reference] |
| Signature                | Who has authority and what approval remains?                        | Legal/signer          | Unknown | [Reference] |
| PO/invoicing             | Is a PO required, when, and what billing instructions apply?        | Procurement/AP        | Unknown | [Reference] |

Use Unknown / Not required with reason / Requested / Under review / Approved / Executed where applicable. Keep negotiation notes and privileged legal advice out of customer-shared summaries. This tracker is process education, not legal language to sign.

## 8. Security and privacy review tracker

| Question/control            | Scope                     | Answer state | Evidence/version/date | Evidence owner   | Sharing restriction           | Reviewer decision | Next action                               |
| --------------------------- | ------------------------- | ------------ | --------------------- | ---------------- | ----------------------------- | ----------------- | ----------------------------------------- |
| Data retention and deletion | Evaluation results        | Unknown      | [Pending]             | Product/security | [Confirm]                     | Pending           | Request documented lifecycle              |
| Penetration-test evidence   | In-scope service          | Requested    | [Pending]             | Security         | Approved confidential channel | Pending           | Confirm scope, date and shareable summary |
| Network egress              | Scan workload             | Proposed     | Reference diagram     | SA               | Generic example only          | Pending           | Verify destinations and data              |
| Subprocessors/residency     | Actual personal-data flow | Unknown      | [Pending]             | Privacy/legal    | Approved channel              | Pending           | Determine applicability and current list  |

A questionnaire may be complete while risk approval remains pending. Record exceptions with the designated risk owner, rationale, compensating measures, expiry and reassessment trigger. A seller must not mark a roadmap capability as an implemented control.

## 9. Value worksheet and commercial preparation

**Illustrative capacity model:** 100 comparable reviews/month × (12 − 7) minutes = 500 minutes/month ≈ 8.3 hours/month. This extrapolation is a hypothesis from the synthetic sample. At an assumed $75/hour, capacity value is $625/month, not a guaranteed reduction in cash expense. Do not claim positive ROI without total subscription, implementation, infrastructure, administration and change costs. Avoid counting the same saved time as both productivity and reduced headcount.

Blank fields: baseline source/date; sample size; comparison method; outcome; unit; target; measured result; adoption factor; confidence; sensitivity range; total costs; excluded benefits; buyer validation.

**Internal negotiation preparation:** interests on both sides; real alternative/BATNA; reservation point; target; objective criteria; authorized tradeables; approval limits; questions; genuine deadline; walk-away conditions. Keep internal reservation points private.

**Customer proposal:** scope; deliverables; exclusions; term; synthetic price; payment assumptions; implementation responsibility; support assumptions; dependencies; validity date; next decision. Use illustrative prices only in the exercise, and label them as invented. Do not include binding legal clauses.

## 10. Final executive readout

**Decision requested:** Approve a bounded retest of coverage and ownership, or stop if the missing access cannot be safely resolved. Do not approve production purchase solely from this packet.

**What we learned:** The synthetic trial meets the sample triage-time target. It does not meet the complete-coverage or owner-acceptance targets. Large-source performance remains inconclusive.

**Business implication:** Faster sample triage is promising but the customer cannot yet rely on the workflow covering the agreed sources or routing every finding. Capacity estimates need validation.

**Buying readiness:** Technical criteria partly unmet; security/privacy questions open; funding and legal status unknown. Procurement intake is a proposed milestone, not verified activity.

**Options:** bounded retest; narrower agreed scope with explicit limitations; defer; retain current process. The buyer chooses after reviewing trade-offs.

**Next actions:** technical owner resolves access; AppSec lead confirms routing; SA reruns affected tests; legal/procurement owners confirm buying steps; decision group reconvenes. New dates require agreement.

**30-second version:** The trial suggests faster triage on a small synthetic sample, but coverage and ownership targets remain unmet. We recommend a bounded retest before deciding on production. Security, funding and contracting are still open, so this is not purchase-ready.

## 11. Production handoff or no-go closeout

**Go checklist**

- [ ] Decision and approved production scope recorded.
- [ ] Contractual commitments and exceptions reviewed with accountable owners.
- [ ] Production architecture/access/security review completed for actual scope.
- [ ] Customer implementation owner and vendor support/CS owner accept handoff.
- [ ] Rollout, rollback, monitoring and remediation responsibilities agreed.
- [ ] Adoption milestones and outcome-review dates agreed.
- [ ] Temporary evaluation resources and credentials reconciled.

**No-go/defer checklist**

- [ ] Decision and reason recorded without pressuring the customer.
- [ ] Temporary access revoked and verified by its owner.
- [ ] Evaluation resources removed or transferred with explicit approval.
- [ ] Data retained/deleted according to the applicable agreement; evidence recorded.
- [ ] Outstanding findings handed to the authorized customer owner securely.
- [ ] Follow-up permitted and agreed, or opportunity closed appropriately.

## 12. Portfolio assessment rubric

Score each dimension 0 = missing, 1 = partial, 2 = explicit and supported: problem clarity; stakeholder evidence; test design; deployment boundaries; mutual commitments; buying-process realism; executive recommendation; safe closeout. This is an original practice rubric, not a methodology certification or a forecast score.

A polished packet with invented approvals does not pass review. A thoughtful no-go can demonstrate better judgment than an unsupported go. Record reviewer feedback separately from self-assessment. Keep reviewed, practiced, check passed and professional demonstration distinct.

## Sources

The templates, synthetic scenario and rubric are original teaching synthesis. Framework and procurement/security references appear in the [lesson index](README.md) and each linked lesson. They support definitions and general context, not these invented results or a claim that this exact operating model is validated.
