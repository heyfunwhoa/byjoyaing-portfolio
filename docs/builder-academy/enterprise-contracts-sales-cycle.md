# Builder Academy — Enterprise sales contracts: NDA/MNDA, ToS, DPA, MSA and security review

**Track:** GTM / Enterprise Sales & Leadership · **Level:** Beginner → Intermediate · **Time:** 25–30 minutes  
**Status:** Public synthetic learning lesson, **not legal advice** · **Reviewed:** 2026-10-11  
**Prerequisite:** [MCP vs REST API](mcp-vs-rest-api.md) for the difference between technical integration and actual data-use permission.

## What you will learn

Explain the main documents that appear in a B2B SaaS/security sale, recognize which issue belongs to Legal, Security, Privacy, Finance/Procurement or Sales, and map a deal path without claiming every document is required in every opportunity. Then approach the same deal as an AE and as a Head of Sales.

## Simple analogy

Buying a secure cloud service resembles leasing a managed office:

- **Order Form:** the exact space, price, duration and purchased features.
- **ToS (Terms of Service):** general rules for using the building, including restrictions. The click-through ToS might remain relevant even when an enterprise contract is negotiated.
- **MSA (Master Services Agreement):** overarching commercial relationship: responsibilities, warranties, liability, indemnities, term, termination, disputes and precedence.
- **NDA / MNDA (Mutual NDA):** a promise about how confidential information shared during discussions may be used and protected; *mutual* means both sides exchange protected information. Not every deal requires a separately signed NDA.
- **DPA (Data Processing Agreement):** privacy obligations when an organization processes personal data *on another organization's behalf*; controller/processor roles, instructions, sub-processors, security, assistance, deletion/return and audit rights.
- **SCCs (Standard Contractual Clauses):** standardized terms that may support certain international personal-data transfers. A DPA is not automatically a valid transfer mechanism; which module/instrument applies depends on roles and geography.
- **DPIA (Data Protection Impact Assessment):** a privacy *risk assessment*, not a contract and not a synonym for DPA.
- **Security review:** evidence and risk assessment involving vendor questionnaire, SOC 2 or ISO evidence, incident management, penetration testing summaries, access controls, SSO/SCIM, retention, sub-processors and relevant architecture.
- **SOW (Statement of Work):** sometimes used for implementation/professional services, specifying scope, deliverables and acceptance.

No single paper automatically gives permission to scrape a provider's data, resell a dataset, or copy licensed contact records across organizations.

## What each review actually asks

| Document / process | Central question | Usual decision owner | Seller responsibility |
| --- | --- | --- | --- |
| NDA / MNDA | Can both parties share necessary nonpublic information safely? | Legal or delegated signatory | Decide what must be shared, initiate early and confirm execution before exchange |
| ToS / API/data license | What uses, storage, API endpoints, export, redistribution and restrictions were purchased? | Vendor legal/product + customer legal/procurement | Do not infer entitlements from a pricing page or API response |
| MSA | What are the commercial and legal rules if the relationship continues? | Legal + Finance/procurement + authorized executive | Capture deal blockers, route redlines, track turnaround |
| Order form | Exactly what is being bought, when and for how much? | Sales + Finance/procurement + signer | Verify pricing, SKUs, scope, start date, billing and signatures |
| DPA | Who determines data purpose and who processes it on whose behalf? Under which controls? | Privacy/DPO + Legal + Security | Identify actual processing flows and trigger review; do not decide legal roles solo |
| SCCs / transfer review | Is a lawful data transfer mechanism required and correctly documented? | Privacy/Legal | Surface regions, data flows and sub-processors before late-stage contracting |
| Security review | Can the buyer accept this vendor and deployment architecture? | Buyer Security/GRC + vendor Security/Engineering | Provide current approved evidence and owners; do not promise nonexistent controls |
| DPIA, when needed | Is proposed high-risk processing justified and adequately mitigated? | Data controller's privacy team/DPO | Supply accurate processing information; don't call a DPA a DPIA |
| SOW | What implementation services and acceptance milestones are in scope? | Services / Delivery + Legal / Procurement | Align delivery capacity and customer expectations |

**Precision matters:** a customer can be a controller for one processing purpose and processor for another. Under GDPR Article 28, a written controller–processor contract is required where that relationship exists. Other arrangements can call for different terms; consult qualified counsel.

## How it fits in a sales cycle (illustrative, not rigid)

1. **Discovery / qualification:** Confirm business need, economic buyer and procurement route. Ask if there will be regulated personal data, confidential architecture, a pilot with live records, or cross-border transfers.
2. **Mutual evaluation:** Establish NDA/MNDA *when needed* before sharing nonpublic information. Share approved security documents and public ToS. Agree on evaluation scope, who provides data, and when a privacy/security review is triggered.
3. **Technical validation / pilot:** Security and Privacy review data flow, access, logging, support and subprocessors. Use synthetic data when possible. A signed NDA **does not** authorize unrestricted personal-data processing.
4. **Commercial and legal review:** Confirm product/usage and API licensing, order form, MSA (or negotiated terms), DPA if applicable, SCCs if needed, security addenda and business terms. Review can run in parallel with technical validation.
5. **Approval and close:** Verify signer authority, completed procurement/security/privacy/legal approvals, start date, implementation obligations and a mutual action plan. Do not describe a legal draft as fully executed.
6. **Post-sale handoff:** Capture exactly what was promised—scope, data regions, subprocessor notifications, security commitments, deliverables, service levels, renewal and expansion limitations.

## AE versus Head of Sales

| Responsibility | AE | Head of Sales |
| --- | --- | --- |
| Spot issues | Ask about personal data, pilot data, legal steps, vendor standards, security timeline | Publish discovery triggers and stage evidence standards |
| Coordinate | Keep buyer and internal Legal/Security/Privacy/Deal Desk connected with clear owner and next date | Create routing/approval matrices, escalation playbooks and a repeatable deal desk |
| Negotiate | Explain business needs, never independently rewrite or approve legal clauses outside delegated authority | Agree commercial guardrails with Legal/Finance; decide when an exception needs executive approval |
| Forecast | Surface procurement dependencies and signature risk; distinguish verbal agreement from execution | Review stage aging, legal/security bottleneck trends and risk-adjusted forecast posture |
| Design GTM | Identify friction and report recurring customer requests | Improve standard contract packet, procurement readiness and vendor strategy with cross-functional owners |
| Buy enrichment tools | Ask whether a provider can supply usable contact data | Commission license/privacy review before connecting or retaining supplier data across the sales team |

A Head of Sales **does not become Legal, Privacy or the DPO.** Their job is to design the process and decision rights so the team knows when specialists must weigh in, while preventing surprises late in deals.

## Worked case A — Selling a fictional security SaaS product

A UK enterprise wants to evaluate Northstar Shield. They want real employee identifiers in a POC, an EU data residency commitment, and an assurance that subprocessors cannot change without notice.

**Good AE actions:** ask for a named buyer privacy/security owner; route the data-flow diagram and vendor's approved subprocessor list; use synthetic POC data until authorized; surface DPA, cross-border-transfer questions and retention timing; put approval dependencies into a mutual action plan. Do not promise EU-only processing unless verified.

**Good Head of Sales actions:** establish a standard POC privacy gate, validated security packet, customer-specific exception register, legal escalation SLA and shared reporting on deal cycle delays. Build trust without bypassing Privacy review for an important account.

## Worked case B — Buying your own lead enrichment provider

A startup sales leader wants a tool that returns work emails via an API and MCP. Its marketing page advertises an API and generous credits, but the ToS restricts bulk export, persistent storage or onward redistribution.

**Right conclusion:** technical accessibility and a paid license are not proof of unrestricted data rights. Evaluate authorized purposes, personal-data law, processing roles, storage/retention, CRM synchronization and the employer contracting entity before building ingestion. A personal subscription is not automatically portable to a future employer.

## Practice lab — inspect a stalled fictional deal

A $90k fictional opportunity is verbally approved. Four business days before quarter-end:

- The customer sent an MNDA 20 days ago but it is still unsigned.
- Security asks for the subprocessor list and last penetration-test executive summary.
- Legal is redlining liability under the MSA.
- Procurement has not confirmed purchase order requirements.
- The buyer says the API's contact data must be stored indefinitely, but the provider's ToS has not been reviewed.

**AE exercise:** create a tracker with *issue / customer owner / internal owner / decision needed / blocker vs informational / target date / evidence / next action*. Draft a clear customer update that avoids making unapproved promises.

**Head of Sales exercise:** identify which risks could have been discovered in discovery/POC, select a deal-desk escalation, distinguish a one-off exception from repeated friction, and define two process metrics (for example median security-review days, late-stage redline reopen rate—with time window and denominator).

### Knowledge check

**A buyer and seller sign an MNDA before a pilot. Does that by itself authorize uploading customer employee data to any vendor's API and retaining it indefinitely?**

A. Yes; confidential data is protected by the MNDA.  
B. No; evaluate actual data flows, contract permissions, applicable privacy obligations, access/security, the DPA where applicable, and provider retention/licensing terms.  
C. Yes, if the salesperson used a paid Pro subscription.

**Answer:** B. Confidentiality, privacy/processing rights, data licensing and security are related but distinct obligations.

## Review packet: what to gather, never assume

- Current ToS, MSA or paper, order form, product/API data license, DPA, subprocessor list, SCCs or other transfer mechanism if relevant.
- Scope, data classification, controller/processor roles, geographic transfers, retention/deletion, breach process, subprocessors, audit evidence, usage rights.
- Approved security documentation with review date, feature entitlement, implementation commitments.
- Owner, blocker category, approval authority, version and signature/acceptance evidence; avoid copying confidential redlines to personal/public workspaces.

## Primary references (checked 2026-10-11)

- [European Commission — Controller and processor roles](https://commission.europa.eu/law/law-topic/data-protection/information-business-and-organisations/application-gdpr_en).
- [UK ICO — controller/processor contracts, minimum terms and liabilities](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/accountability-and-governance/contracts-and-liabilities-between-controllers-and-processors-multi/what-needs-to-be-included-in-the-contract/).
- [European Commission — SCCs and international transfers](https://commission.europa.eu/law/law-topic/data-protection/international-dimension-data-protection/standard-contractual-clauses-scc_sw).
- [NIST glossary — Non-disclosure agreement](https://csrc.nist.gov/glossary/term/non_disclosure_agreement).
- [NIST SP 800-47 — Managing Security of Information Exchanges](https://www.nist.gov/publications/managing-security-information-exchanges).

**Educational limitation:** legal obligations vary by geography, agreement and processing role. This lesson teaches issue spotting and sales coordination, not contract interpretation or legal advice. Obtain qualified legal/privacy counsel for actual deals.
