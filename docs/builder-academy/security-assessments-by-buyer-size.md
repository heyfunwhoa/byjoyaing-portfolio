# Builder Academy — Security assessments in B2B sales: startup to enterprise

**Track:** GTM / Enterprise Sales & Leadership · **Level:** Beginner → Intermediate · **Time:** 30–35 minutes  
**Status:** Public, synthetic educational case study — not an actual vendor assessment or legal/compliance advice · **Reviewed:** 2026-10-11  
**Prerequisites:** [Enterprise contracts, including NDA vs MNDA](enterprise-contracts-sales-cycle.md), [Authentication vs authorization](authentication-vs-authorization.md).  
**Companion:** [MCP vs REST API](mcp-vs-rest-api.md) for vendor integrations, API permissions and data rights.

## Learning outcomes

After this lesson, you should be able to (1) explain a *vendor security assessment*, (2) anticipate how procurement/security/privacy may differ by buyer size **and data risk**, (3) distinguish the evidence types and decision owners, (4) plan a risk-based assessment within a sales cycle, and (5) improve the process as an AE or Head of Sales.

## Evidence-first reading guide

This lesson separates **published security principles** from **illustrative sales-process patterns**. The company-size matrix is a fictional operating example, *not* a sourced study of average procurement processes. Before making a real customer-facing claim, use the [Evidence-backed decisions standard](evidence-backed-sales-and-security-decisions.md) and check the original material.

| Narrow claim in this lesson | Primary evidence | What still needs checking |
| --- | --- | --- |
| Risk-aware supplier requirements matter more than generic checklists | [NIST SP 1305: Supply Chain Risk Management](https://csrc.nist.gov/pubs/sp/1305/final) | Actual buyer risk policy, criticality and access |
| SOC 2 Type I and Type II test different dimensions of assurance | [AICPA SOC resources](https://www.aicpa-cima.com/resources/landing/system-and-organization-controls-soc-suite-of-services), [Journal of Accountancy](https://www.journalofaccountancy.com/issues/2011/jul/20103500/) | Vendor report scope, Type, period, opinion and exceptions |
| Pen-test reporting needs scope, limitations, technical evidence and controlled access | [OWASP WSTG v4.2 Reporting](https://wstg.owasp.org/v4.2/5-Reporting/) | Real report, findings, remediation and rights to share |
| UK GDPR subprocessor requirements involve authorization, contractual safeguards and change notices | [ICO processor/subprocessor guidance](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/controllers-and-processors/controllers-and-processors/what-does-it-mean-if-you-are-a-processor/) | Actual processing roles and signed DPA |
| Certain cloud uses of ePHI require HIPAA business-associate arrangements | [HHS cloud guidance](https://www.hhs.gov/hipaa/for-professionals/special-topics/health-information-technology/cloud-computing/index.html) | Applicability to this buyer/vendor and signed BAA |
| CAIQ is a cloud control questionnaire, not an independent audit | [Cloud Security Alliance CCM/CAIQ v4.1](https://cloudsecurityalliance.org/artifacts/cloud-controls-matrix-v4-1) | Latest submitted answers and supporting vendor evidence |

**Source review:** October 11, 2026. A framework describes *how to assess*; it does not verify any fictional or named vendor's certifications, current control operation, or approval.

## What a security assessment is — plain language

When an organization wants to buy software, it asks **"What could go wrong if we connect this vendor to our data, systems or users — and how well are those risks managed?"** A *third-party/vendor risk assessment* is the buyer's due diligence; it is not the same as a penetration test, vulnerability scan, SOC 2 examination, ISO 27001 certification audit or privacy impact assessment. Those reports may be **inputs** to a broader decision.

Typical flow: **scope usage and data → classify impact → request approved evidence → technical/security/privacy review → document gaps → approve, conditionally approve or reject → monitor and reassess**. The buyer's GRC/security team owns risk acceptance; a seller can facilitate but cannot grant buyer approval.

### The seven questions a buyer is trying to answer

1. **Data:** Will this vendor see employee/customer personal data, source code, telemetry, secrets, production credentials or only synthetic test records? Where is data stored/processed, by which subprocessors, and for how long?
2. **Access and identity:** Does the product support SSO, MFA, RBAC, least-privilege access, service-account controls, provisioning/deprovisioning and audit logs *as actually deployed*?
3. **Security program and evidence:** What independent assurance exists, such as an in-scope SOC 2 report or ISO 27001 certificate? Which controls are tested and what are the limitations or exceptions?
4. **Application and infrastructure:** Secure development, vulnerability management, penetration testing, patch handling, encryption, incident response and business continuity.
5. **Privacy and legal:** Which DPA, BAA, transfer controls and contractual restrictions are relevant to the exact use? A signed NDA/MNDA protects specified confidentiality but never substitutes for these agreements.
6. **Operational resilience:** Availability, backup/restore, disaster recovery, support, subprocessors, fourth parties and offboarding/deletion.
7. **Remaining risk:** Which unmet requirement is a true blocker versus an exception with a compensating control, named owner, expiration and formal acceptance?

## How the review *often* changes with buyer size

**Illustrative sales-process patterns, not regulatory size thresholds.** Company headcount alone does not determine diligence. *Data sensitivity, integration access, criticality, geography, regulated activities and purchasing policy* can matter much more.

| Buyer profile | People and process often involved | Typical evidence / questions | Common commercial friction | Seller response |
| --- | --- | --- | --- | --- |
| **Pre-seed/seed startup** with a small team | CTO, founding engineer, founder, fractional security lead | Security overview; data flow; access control; where secrets/production data go; incident contact; maybe a short questionnaire | No dedicated GRC team; founder handles procurement and security while busy shipping | Make a concise, accurate one-page overview; propose synthetic-data evaluation; verify who can approve risk |
| **Growing startup / scale-up** with specialized IT/Security | Head of Security/IT, Engineering, Legal, Finance; sometimes compliance vendor | SOC 2 status and *scope*; subprocessors; SSO/MFA; pen-test summary; retention; questionnaire and DPA if applicable | Security maturity varies, evaluation and budget owner not always aligned | Prepare scoped evidence pack and review owners early; do not treat SOC 2 as a universal prerequisite |
| **Mid-market** organization with formal vendor onboarding | IT/Security, procurement, Legal, Privacy, business sponsor; sometimes GRC | Standard questionnaire, SOC 2/ISO evidence, IAM/SSO, data residency, vulnerability remediation, security policies | Procurement portal, missing documents, inconsistent security answers and contract negotiation | Maintain an evidence/request tracker and mutually agreed approval sequence |
| **Large enterprise / multinational** | Dedicated third-party risk (TPRM), Security/GRC, AppSec, Privacy/DPO, Legal, Procurement, architecture, budget owner, sometimes regional reviewers | SIG/CAIQ or proprietary questionnaires, current audits, SSO/SCIM, pentest summaries, incident SLAs, cloud regions, DPA/SCCs, subcontractors, ongoing review | Several teams in parallel, exception committees, supplier onboarding and legal cycles | Map decision rights and dependencies in the mutual action plan; use approved trust-center artifacts and escalations |
| **Regulated or critical-use buyer at *any* size** | Relevant compliance and technical authorities in addition to above | Sector- and use-case-specific evidence (for example HIPAA BAA when the provider is a business associate, contractual security addenda, or other mandated controls) | Hard go/no-go controls can override timeline, deal size or customer enthusiasm | Escalate precise requirements to Security/Legal/Privacy; no promises of certifications or data residency without verified capability |

NIST CSF 2.0 is designed to be tailored to organizational mission, threat landscape and requirements rather than applied as a fixed headcount-based checklist. CISA publishes targeted supplier-risk guidance for smaller buyers. Shared Assessments distinguishes **SIG Lite** (higher-level diligence) from **SIG Core** (more in-depth and sensitive relationships). See references below.

### What's *not* a reliable assumption

- "Startup = no security assessment": false if the vendor touches credentials, production data, regulated records or core infrastructure.
- "Enterprise = same giant checklist for every tool": buyers may **tier suppliers by criticality** and avoid unnecessary review for lower-risk purchases.
- "SOC 2 passed = zero risk": reports have scope, dates, criteria, testing and potential exceptions; the buyer evaluates whether the report addresses this use case.
- "Having SSO on a roadmap satisfies the questionnaire": planned is not implemented, enabled or tested.
- "MNDA signed = pilot approved": confidentiality is different from lawful data processing, licensing and an approved production connection.
- "We have a penetration-test PDF, so anyone can forward it": restricted security evidence requires approved distribution and handling.

## Assessment artifacts: what they are and what they're not

| Artifact or framework | What it helps establish | Caveat / how to use it responsibly |
| --- | --- | --- |
| **SOC 2 report** | Independent examination of specified controls relevant to Trust Services Criteria | Check covered entity/product, period, opinion, exceptions, complementary user controls. A report is neither a universal certificate nor proof that all future controls work. |
| **ISO/IEC 27001 certificate** | Certified information security management system against scoped requirements | Verify accredited certification body, validity, site and scope. Does not mean every feature/integration was penetration-tested. |
| **SIG Lite / SIG Core** | Reusable structured third-party-risk questionnaires, with different depths | Licensed questionnaire; use buyer-authorized copy rather than reproducing proprietary contents in public lessons. |
| **CSA Cloud Controls Matrix / CAIQ** | Cloud-specific security control framework and questionnaire | Check current version, applicable controls and publication rights. CSA CCM/CAIQ v4.1 was released January 2026. |
| **NIST CSF 2.0 / supply-chain guidance** | Risk-based governance and due-diligence organization | Framework guidance does not itself constitute a certification or buyer approval. |
| **Penetration-test executive summary** | Scope, test dates, high-level findings and remediation progress | Not a guarantee of security; sanitize findings, share through approved restricted channels. |
| **Trust center / security overview / policies** | Repeatable answers on practices, controls, subprocessor list and incident contacts | Published summary is not equivalent to a current independent audit. Never invent exceptions or claim "compliant" without defined scope. |
| **DPA / SCC / BAA (if applicable)** | Legal requirements for specified personal/health data processing or transfers | Separate from security review; compliance/privacy counsel determines applicability. |

## Deep dive — Penetration-testing reports and vulnerability evidence

**Pen test, in plain language:** an authorized, scoped team actively tries to exploit weaknesses in an application, API, cloud configuration or network to find realistic attack paths. A **vulnerability scan** is generally more automated and broad; a pen test involves human analysis/exploitation within its agreed scope. Neither proves the product is free of vulnerabilities.

| Evidence | Buyer asks | What a good seller should verify | Sharing policy |
| --- | --- | --- | --- |
| Pen-test **attestation or executive summary** | "Was relevant testing done recently, and what was the result?" | Testing firm or qualified team, date, product/environment and API scope, test method, material findings, remediation status and whether retesting occurred | Approved restricted document, normally suitable before requesting full technical findings |
| Full **technical pen-test report** | "Can our AppSec team evaluate technical impact and unresolved issues?" | Scope exclusions, test accounts, attack surface, severity ratings, proof-of-concept impacts, affected assets, findings and remediation plan | Highly sensitive; share through restricted trust center/approved secure channel only after Security and Legal authorization |
| Remediation and **retest letter** | "Were the serious findings actually fixed?" | Finding IDs, fix date, retest coverage, still-open issues, compensating controls and owner | Approved, sanitized evidence with date and known limitations |
| **Vulnerability scan** summary | "Are common weaknesses being routinely detected and patched?" | Scanner scope/frequency, patch SLAs, triage, false positives and outstanding material findings | Aggregate approved metrics, never raw exploitable details by default |
| Secure SDLC / vulnerability policy | "How do fixes happen between assessments?" | Code review, dependency scanning, incident escalation, SLAs, security testing and responsible disclosure | Current policy / controlled trust-center artifact |

**Five questions to ask when reading a pen test:** *What was tested? When? Who tested? What material findings are still unresolved? What changed and was retested?* A pen test of last year's marketing site cannot validate this year's production API or new AI connector. Reports are point-in-time inputs, not ongoing guarantees. See [OWASP WSTG reporting](https://wstg.owasp.org/v4.2/5-Reporting/) and [NIST SP 800-115](https://csrc.nist.gov/pubs/sp/800/115/final).

**AE:** never forward an unredacted exploit chain or full internal finding from your personal email; request the approved executive summary or secure trust-center access. **Head of Sales:** agree on standard disclosure tiers, a current-test calendar, material-issue escalation and a safe answer for "we do not have that artifact yet" with Security. No invented remediation dates.

## Deep dive — SOC 2, ISO 27001 and other assurance artifacts

**SOC 2 is an independent attestation report, not a blanket certification of security.** The scope and criteria can include Security and, depending on the engagement, Availability, Processing Integrity, Confidentiality and Privacy. It examines the controls in a described system.

| Document | What it means | Buyer should check |
| --- | --- | --- |
| **SOC 2 Type I** | An examination of the *design* of controls as of a specified date | Which entity, system, subservices and trust criteria are included; auditor opinion; date and scope. Not evidence of months of operating effectiveness. |
| **SOC 2 Type II** | An examination of control design and *operating effectiveness over a period* | Covered period, auditor opinion, tests, exceptions, system boundary, complementary user entity controls (CUECs) and any carve-outs for subservice organizations. |
| **Bridge letter** | Management's update for a gap after the report period | It is *not an audit*. Review dates, changes and whether the buyer accepts it as supplemental evidence. |
| **SOC 3** | More general-use report based on SOC 2-type controls | Not a substitute for restricted details that a serious risk reviewer may need. |
| **ISO/IEC 27001 certificate** | External certification of the in-scope information security management system (ISMS) | Certification body/accreditation, entity, geography/sites, covered business activities, validity and scope; separate Statement of Applicability or further evidence may be needed. |
| **SIG Lite/Core, CSA CAIQ** | Standardized risk questionnaires that help buyers assess vendors | These are *assessment tools*, not audit opinions; use authorized templates and answer only verified current controls. |

**Buyer question:** "Are you SOC 2 compliant?"  
**Precise answer:** "Our current report is [Type and covered period, if independently verified] and covers [in-scope services]; our Security team can provide the permitted report and explain exceptions and controls." If none exists, say so and offer the approved alternative packet. **Do not claim future audit success or misuse the word certified.**

**Seller caution:** A clean auditor opinion does not cover an unrelated product module or prove an untested API authorization design. A buyer must still inspect data flows and their own required user controls. See [AICPA SOC 2 guidance](https://www.aicpa.com/cpe-learning/publication/soc-2-reporting-on-an-examination-of-controls-at-a-service-organization-relevant-to-security-availability-processing-integrity-confidentiality-or-privacy) and [AICPA illustrative Type II report](https://www.aicpa.com/resources/download/illustrative-soc-2-r-report-with-description-and-assertion).

## Deep dive — Subprocessors, fourth parties and data flow

**Subprocessor:** when a processor hires another organization to process personal data *on its customer's behalf*. Example: fictional Northstar Shield (processor) uses a cloud hosting company or analytics vendor to store/process its customer's data. Whether a specific service is a subprocessor depends on its actual data access and legal role; **not every vendor, SaaS tool or subcontractor is necessarily a subprocessor**.

**Fourth-party risk:** the buyer's vendor relies on its own vendors. This may involve subprocessors, critical infrastructure, support providers or other dependencies. Ask which third parties could affect availability, confidentiality or data control.

### Read a subprocessor list like a buyer

For each relevant subprocessor, request and review:

| Field | Why it matters |
| --- | --- |
| Legal entity and service performed | Distinguishes cloud hosting, email delivery, customer support, analytics or AI processing |
| Data categories and whether the provider can access content | Separates telemetry, account metadata, credentials, personal data, restricted source code and encrypted-only storage |
| Purpose and processing instructions | Confirms which activities are authorized and whether the provider uses data for other purposes |
| Geographic storage and **access/transfer** locations | Data residency and international access/transfers aren't answered by a single "EU region" claim |
| Onward subprocessors and subcontractors | Determines who else can receive or affect the data |
| Security controls and assurance evidence | Encryptions, privileged access, logging, breach notification, audit and certification scope |
| DPA flow-down terms, transfer safeguards and BAA (where applicable) | Ensures obligations travel through the processor chain |
| Retention, deletion and data return | Answers offboarding, backup, support-data and lifecycle questions |
| Change notification, objection right and effective date | Tells customer how they learn of a new subprocessor and how to raise an objection if the contract allows |
| Service or product applicability | Ensures the listed vendor actually serves the product, deployment region and customer plan being sold |

For UK/EU GDPR **controller → processor → subprocessor** arrangements, authorization to engage subprocessors is required (specific or general, as applicable). When general authorization applies, proposed changes must be disclosed and the controller given an opportunity to object; the processor must contractually flow relevant Article 28 protections down to the subprocessor. These are **legal obligations conditioned on the data role and applicable law**, not universal rules for every vendor. See [ICO processor obligations](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/controllers-and-processors/controllers-and-processors/what-does-it-mean-if-you-are-a-processor/) and [ICO Article 28 contract terms](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/accountability-and-governance/contracts-and-liabilities-between-controllers-and-processors-multi/what-needs-to-be-included-in-the-contract/).

For HIPAA-regulated processing, a cloud provider or other subcontractor that creates, receives, maintains or transmits PHI on behalf of a business associate may itself be a business associate and require appropriate downstream BAA obligations. Encryption without the provider holding the key does not automatically remove business-associate status. See [HHS guidance](https://www.hhs.gov/hipaa/for-professionals/privacy/guidance/business-associates/index.html).

### Synthetic negotiation: "Can you promise EU-only data access?"

A large buyer asks the AE to guarantee its data never leaves the EU. The product's primary database is in Frankfurt, but an unverified support provider may access tickets from outside the EU.

**Wrong response:** "The database is in Frankfurt, so we guarantee everything stays in the EU."

**AE response:** "I'll confirm storage and access locations, subprocessors, transfer safeguards and contractual commitments with our Security and Privacy teams, then provide approved language." Track exact requirement and owner.

**Head of Sales response:** standardize a region-specific data-flow answer with Engineering/Privacy/Legal, track approved residency SKUs and exceptions, and prevent future sellers from promising unvalidated residency claims.

### Confidential information handling

Use a layered trust-center packet:

1. **Public:** security overview, broad product/data-flow descriptions, contact point and published subprocessor list when approved.
2. **Gated/restricted:** in-scope SOC 2 Type II report, ISO certificate, approved pen-test attestation/executive summary, selected policies and security questionnaires—per applicable document-sharing controls and agreements.
3. **Highly restricted:** full technical pen-test findings, sensitive architecture diagrams, exploit details and internal remediation trackers; share only if authorized and necessary with a designated reviewer.
4. **Never transfer into personal spaces:** real customer questionnaire answers, restricted reports, secrets, live issue details or employee contact data from an employer's diligence process.

**An NDA/MNDA may be a condition for access to restricted evidence but does not itself grant processing rights, satisfy a DPA, or override subprocessor or transfer requirements.**


## Sales-cycle timeline and decision gates

Security reviews can run **in parallel** with commercial and technical validation; exact timelines differ and should never be promised without the buyer's actual process.

| Sales stage | AE / seller action | Buyer or internal owner | Evidence / exit gate |
| --- | --- | --- | --- |
| Discovery | Ask security and data-sensitivity questions, risk tier, vendor-onboarding path, required certifications and owner | Business sponsor, buyer IT/Security | Document actual data classification, integration scope, security owner and review trigger |
| Qualification / evaluation planning | Plan NDA/MNDA *if nonpublic materials need exchanging*; agree whether synthetic POC avoids regulated/production data | Buyer and seller Legal, Security | Disclosure approval before confidential sharing; approved test scope and evaluation data |
| Technical validation / POC | Coordinate current security packet; log gaps, remediation owners, controls and product availability; no unsupported promises | Seller Security/SE; buyer Security/GRC/Privacy | Verified evidence and explicit pilot/data-access approval |
| Procurement / negotiation | Route MSA, DPA/BAA/SCC if applicable, audit requests, service-level clauses, licensing and purchase order | Legal, Privacy, Procurement, Finance | Approvals or dated blockers from the appropriate owners; distinguish submitted vs approved vs executed |
| Close and onboarding | Confirm security risk approval and contract execution, data-region and deletion commitments, implementation handoff | Buyer security sign-off + authorized procurement and signatory | Written gates satisfied, commitments handed to CS/Implementation |
| Renewal / expansion | Reassess if data use, integration, geography, scope or provider risk materially changes | Customer success, buyer TPRM | Updated evidence and approval where required |

### What an AE needs to own

You **do not personally certify compliance**. Your job is to surface risk early, assign accountable people, obtain approved answers and keep the buying plan honest. Avoid statements such as "we'll definitely have SOC 2 next month" unless the responsible team has approved that exact representation.

A useful request tracker includes **requirement, why it matters, requesting team, owner, evidence link + date, approved disclosure tier, status, gap severity, exception approver, due date and next action**. Store confidential artifacts only in approved company systems.

### What a founding Head of Sales needs to build

At a small cybersecurity startup, the sales leader often designs the *process* before there is a full deal desk:

1. Establish a minimal **approved vendor-security packet** with Security/Engineering: product architecture and data flow, public security overview, restricted evidence under approved controls, incident contact, current subprocessors and an honest control/certification status.
2. Develop a risk-tier discovery checklist based on actual data and integrations, not customer ARR alone; designate who can accept risk versus who coordinates the deal.
3. Define ownership and SLAs for questionnaires, proof-of-concept permissions, engineering response, security exceptions and Legal/Privacy escalations.
4. Capture a shared **security objections/requirements library** with validated reusable answers, owners, update dates and explicit "not available" states. Do not promise roadmap features as if shipped.
5. Monitor metrics with denominators and time windows: review request volume by tier, median completion days, unresolved critical blockers, late-stage security reopens, and wins/losses where security was a stated reason. Avoid claiming that a change *caused* a win without stronger evidence.
6. Build a renewal/expansion policy: major increases in access or regulated-data scope may require reassessment even for existing customers.

**Head of Sales coordinates; the CISO/Security and Legal/Privacy leaders retain their respective approval authorities.** At a founder-led business, agree delegated decision rights rather than assuming the Head of Sales can waive a security requirement.

## Worked cases — vary buyer size and risk

### Case A — Ten-person startup, low-risk POC

A fictional 10-person SaaS company tries Northstar Shield with **synthetic logs**, no production credentials and no customer data. It has a CTO but no dedicated GRC team.

**Defensible path:** short scope/data-flow review, public security overview, demo identity/access model, proof of synthetic-only data, owner sign-off on the limited pilot. A comprehensive enterprise questionnaire might add work without changing the actual decision.

**What could change the review?** Connecting the same vendor to CI/CD production secrets or a privileged service account dramatically raises risk despite the company still having ten employees.

### Case B — Mid-market software company

A 900-person fictional technology company wants to connect a product to repositories and production alert streams. Their Security team requests SOC 2 documentation, SSO, data retention, vulnerability management and a DPA because personal data may be involved.

**AE action:** bring in Security and Privacy; get data flow and read/write scope right; verify SSO availability for the intended plan; send *approved* evidence. Track the difference between "requested", "answered" and "approved".

**Head of Sales action:** categorize recurring questionnaires and improve the validated evidence pack. Create a security-review exit criterion before forecasting the deal as procurement-complete.

### Case C — Large regulated enterprise

A fictional healthcare organization wants production ePHI processed in a new cloud service. Multiple regions, TPRM, Privacy, Legal, Security and Procurement are involved.

**Defensible path:** confirm whether HIPAA business-associate rules apply and, if so, route a BAA with counsel; assess data regions, subprocessors, breach handling, security evidence and architecture; plan parallel but separately approved POC and contract gates. A signed MNDA alone does not cover the processing arrangement.

## Practice lab — choose the right level of review (synthetic)

Read Cases A–C, then for each fill:

| Field | Your answer |
| --- | --- |
| Data handled + classification | |
| Access level and integration scope | |
| Vendor criticality / impact | |
| Buyer decision owner | |
| Appropriate evidence packet | |
| True blocker / compensating control / unknown | |
| NDA/MNDA, DPA, BAA, or other contract trigger | |
| AE next action | |
| Head of Sales operating-process improvement | |

**Edge-case test:** The 10-person startup wants production admin API access rather than synthetic pilot data. Explain why company size alone should **not** keep it in the low-risk assessment category.

### Knowledge check

A 12-person startup wants a vendor to process real patient records, while a 5,000-person company wants a tool to render an isolated synthetic demonstration. Which should get more security/privacy scrutiny?

A. The 5,000-person company, because large companies always have higher requirements.  
B. The startup can require stricter assessment because sensitive data and access risk outweigh company size; both follow their own policies.  
C. Neither needs an assessment if an NDA is signed.

**Answer: B.** A buyer's risk profile, regulations and internal policy determine controls; size is only a rough signal for the *process* you may encounter.

## Sources and review notes (reviewed 2026-10-11)

- [NIST CSF 2.0 Quick-Start Guides](https://www.nist.gov/cyberframework/quick-start-guides) — small business, risk and supplier guidance.
- [NIST Cybersecurity Supply Chain Due Diligence Guide announcement (July 2026)](https://www.nist.gov/news-events/news/2026/07/nist-releases-finalized-c-scrm-due-diligence-assessment-quick-start-guide) — pre-procurement supplier assessment.
- [CISA — SMB vendor/supplier assessment fact sheet](https://www.cisa.gov/resources-tools/resources/assisting-small-and-medium-sized-businesses-assess-vendors-and-suppliers-fact-sheet) — smaller-buyer practices.
- [Shared Assessments — SIG Questionnaire overview](https://sharedassessments.org/about-sig/) — risk-based SIG Lite/Core and licensing limitations.
- [Cloud Security Alliance — CCM/CAIQ v4.1](https://cloudsecurityalliance.org/artifacts/cloud-controls-matrix-v4-1) — 2026 cloud-control questionnaire reference.
- [AICPA — SOC 2 reporting on controls](https://www.aicpa.com/cpe-learning/publication/soc-2-reporting-on-an-examination-of-controls-at-a-service-organization-relevant-to-security-availability-processing-integrity-confidentiality-or-privacy) — independent controls examination.
- [OWASP WSTG — penetration test report structure](https://wstg.owasp.org/v4.2/5-Reporting/) and [NIST SP 800-115](https://csrc.nist.gov/pubs/sp/800/115/final) — testing scope, findings, remediation and limitations.
- [ICO — controller/processor contracts and subprocessors](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/accountability-and-governance/contracts-and-liabilities-between-controllers-and-processors-multi/what-needs-to-be-included-in-the-contract/) and [processor obligations](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/controllers-and-processors/controllers-and-processors/what-does-it-mean-if-you-are-a-processor/) — authorisation, contractual flow-down and change notices.
- [HHS — business associates and downstream subcontractors](https://www.hhs.gov/hipaa/for-professionals/privacy/guidance/business-associates/index.html) — role-specific HIPAA obligations.
- [HHS — HIPAA cloud providers and business associate agreements](https://www.hhs.gov/hipaa/for-professionals/special-topics/health-information-technology/cloud-computing/index.html) — BAA conditions, data-use roles and cloud security.

**Important:** The size-based rows are *illustrative GTM patterns*, not fixed standards, verified deal-duration benchmarks or guaranteed requirements. No actual customer, employer, or restricted vendor documents are used.
