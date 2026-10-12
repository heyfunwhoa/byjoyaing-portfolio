# Builder Academy — Evidence-backed commercial and security decisions

**Status:** Teaching standard for synthetic Builder Academy exercises, reviewed 2026-10-11. **Not** legal advice, a security audit, a signed contract, a calibrated risk score, or proof that any vendor satisfies a control.

## Purpose

Any technical, security or legal lesson should answer these six questions:

1. **Claim:** What exact assertion are we making? Make it narrow and testable.
2. **Source:** Which authoritative document, regulator, standard or company-controlled evidence is relevant? Include title, publisher, URL, applicable section/version and date reviewed.
3. **Type of evidence:** Is this a law/regulatory interpretation, voluntary framework, professional assurance guidance, verified vendor artifact, observed customer requirement, or simply a proposed GTM best practice?
4. **Scope and limitations:** Which geography, product, report period, contractual relationship, system component, or data classification does the source address? What does it *not* prove?
5. **Application and decision rights:** Which action follows, under whose authority? Who must validate any unverified assumption?
6. **Lifecycle:** What would invalidate the claim or trigger review? How would changes be recorded without rewriting the original customer evidence?

**Mandatory labels in case studies:** `Verified source principle` / `Fictional case fact` / `Practical recommendation` / `Unverified vendor-specific claim` / `Pending owner approval`. Do not silently conflate them.

## Evidence hierarchy (fit for purpose, not a universal numeric score)

| Claim category | Start with | Often needed to resolve a real deal | Avoid |
| --- | --- | --- | --- |
| Legal requirement | Binding law/regulation and official regulator guidance in the relevant jurisdiction | Approved company counsel's interpretation and executed agreements | Calling a voluntary framework a law; guessing a legal role from a job title |
| Security framework/control | Current authoritative standard or industry control guide (NIST, OWASP, CSA) | Implementation evidence from product owner and approved security material | Treating a framework as vendor compliance certification |
| SOC 2 / independent assurance | AICPA definitions and professional reporting guidance | Vendor's actual in-scope report, relevant opinion, period, tests, exceptions, review approval | A screenshot of a badge or outdated certification claim |
| Penetration test | OWASP/NIST testing and reporting standards | Approved test summary, scoped technical evidence, remediation and retesting | Reproducing restricted exploit details in a public app |
| Subprocessor/data transfer | Official ICO/HHS privacy guidance where applicable | Current vendor subprocessor list, DPA/BAA/transfer terms, actual data flow and Privacy/Legal approval | Assuming every supplier is a subprocessor |
| Contract confidentiality | Government/WIPO contract guidance | Actual NDA/MNDA and authorized signature review | Thinking an NDA grants unrestricted handling of personal data |
| Sales cycle process | Documented internal policy and actual deal evidence | Buyer procurement owner, current gate, agreed date, signed/approved status | Presenting suggested sales process as a legally required schedule |
| Head of Sales decision | Qualified business hypotheses plus operational measurements | Aggregated, correctly scoped internal data; baseline, sample/denominator, decision owners, exceptions | Claiming causation from one deal or treating forecast as guaranteed |

**Rule:** A reputable public source can support a *general principle*. It cannot verify that a particular buyer requires something, that a vendor actually has a current report, or that a redline was accepted. Vendor-specific claims require vendor-specific evidence in approved systems.

## Applied fictional evidence ledger

| ID | Narrow claim | Source-backed principle | Scenario implication (judgment) | Still unknown in a real deal |
| --- | --- | --- | --- | --- |
| E-01 | Supplier due diligence should reflect risk and requirements | [NIST SP 1305](https://csrc.nist.gov/pubs/sp/1305/final) helps establish and communicate supply-chain risk requirements | Do not automatically waive a privileged-access review because a buyer has 12 employees | Buyer policy, criticality, sign-off |
| E-02 | SOC 2 Type II evaluates operating effectiveness over a defined period | [AICPA SOC resource hub](https://www.aicpa-cima.com/resources/landing/system-and-organization-controls-soc-suite-of-services) and [Journal of Accountancy](https://www.journalofaccountancy.com/issues/2011/jul/20103500/) | Request scope, period, opinion and exceptions before making a vendor claim | Whether this vendor's tested system covers the intended API |
| E-03 | Pen test reports include scope, limitations and technical findings and need secure handling | [OWASP WSTG 4.2 reporting](https://wstg.owasp.org/v4.2/5-Reporting/) | Use Security-approved summary rather than blasting a full report to prospect lists | Test date, unresolved findings, access permission |
| E-04 | UK GDPR subprocessors generally require appropriate controller authorization and contractual safeguards | [ICO processor guidance](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/controllers-and-processors/controllers-and-processors/what-does-it-mean-if-you-are-a-processor/) | Confirm who processes which data and route changes/objections to Legal/Privacy | Applicable legal role, agreed notification window, countries |
| E-05 | In-scope cloud processing of ePHI may establish HIPAA business-associate obligations | [HHS cloud guidance](https://www.hhs.gov/hipaa/for-professionals/special-topics/health-information-technology/cloud-computing/index.html) | Do not put patient records into a pilot until the relevant BAA/risk reviews are complete | Actual coverage and provider role |
| E-06 | NDAs can be unilateral or mutual depending on what is disclosed | [UK Intellectual Property Office](https://www.gov.uk/government/publications/non-disclosure-agreements/non-disclosure-agreements) | If both sides disclose confidential information, ask Legal whether a mutual NDA is appropriate | Jurisdiction, parties, terms, execution |

All case assumptions above are fictional. The primary references were reviewed **October 11, 2026**; their applicability should be rechecked before using the lessons to advise an actual deal.

## Recommended evidence model for future exercises and products

For *public lesson metadata* (not confidential deal storage), model:

```text
Claim { id, text, classification, source_ids[], applicability, caveat, reviewed_at }
Source { id, publisher, title, url, source_type, version_or_section, reviewed_at }
Decision { scenario_id, role, choice, explanation, supporting_claim_ids[] }
```

For an *authorized employer deployment* only, expand with `customer_request_id`, `security_artifact_ref`, `document_classification`, `document_owner`, `access_permission`, `expiration_date`, `approval_status`, `approver`, and `crm_opportunity_id`. Keep restricted reports in approved document systems and store pointers plus entitlement checks, not public content duplicates.

### Specific AE and Head of Sales habits

- **AE:** In discovery, ask what data/access the evaluation actually involves, who owns vendor-risk review, and what evidence is needed. Track `requested → provided → buyer reviewing → approved/conditioned/rejected` separately. Never equate sending a SOC 2 report with receiving sign-off.
- **Head of Sales:** Define a response library approved by Security/Legal/Privacy, with owners and last-reviewed dates. Create a decision-rights matrix and a fast exception path for repeat blockers; measure elapsed time by review type only from real CRM/process records with known sample sizes.
- **Both:** Separate evidence that informs a recommendation from permission to sign, export, process data or override a buyer's risk decision.

## Source-usage controls

- Prefer publisher-controlled documents, regulator material, law and recognized frameworks over unsourced marketing summaries.
- Give source-specific caveats: a US regulator's HIPAA guidance cannot establish EU GDPR controller roles; a UK IPO sample NDA is educational, not a US legal form.
- Avoid copying full restricted audit reports, proprietary questionnaire contents, confidential security findings, personal data or customer contracts into public lessons.
- Revisit changed legal/regulatory guidance and provider documentation; never silently update an existing claim without changing its reviewed date.
- AI-generated content is drafting assistance only: a model-generated citation is not evidence until the linked document is checked and the relevant passage supports the claim.

## Related lessons

- [Security assessments by buyer size and risk](security-assessments-by-buyer-size.md).
- [NDA/MNDA, DPA, MSA and enterprise legal review](enterprise-contracts-sales-cycle.md).
- [MCP, REST API, webhook and SDK](mcp-vs-rest-api.md).
- Interactive lab source registry: `lib/ai-academy/security-review-evidence.ts` — kept small and limited to stable public authoritative sources for question-level feedback.
