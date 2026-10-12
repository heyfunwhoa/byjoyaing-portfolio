/**
 * Public, verified primary-source guidance for synthetic security-review education.
 * Explanations are general authoritative principles, NOT evidence of any vendor's
 * actual certifications, penetration-test results, contractual rights or risk approval.
 * Reviewed on 2026-10-11; review again on meaningful source updates.
 */
export const securityEvidenceSources = {
  "nist-supplier-risk": {
    title: "NIST SP 1305 — Cybersecurity Supply Chain Risk Management",
    publisher: "NIST",
    kind: "Standard / federal guidance",
    url: "https://csrc.nist.gov/pubs/sp/1305/final",
    supports: "Supplier requirements and risk assessment should be defined in the context of the organization's risk-management program.",
    cannotProve: "It does not prescribe a universal questionnaire by buyer headcount or approve a specific vendor.",
  },
  "aicpa-soc2": {
    title: "AICPA — SOC suite and illustrative report resources",
    publisher: "AICPA & CIMA",
    kind: "Professional assurance guidance",
    url: "https://www.aicpa-cima.com/resources/landing/system-and-organization-controls-soc-suite-of-services",
    supports: "SOC 2 is a scoped independent examination of controls; Type I and Type II have distinct reporting and effectiveness purposes.",
    cannotProve: "This public explanation is not the vendor's actual report, opinion, period, scope or exception record.",
  },
  "aicpa-soc2-types": {
    title: "Journal of Accountancy — Type I versus Type II reports",
    publisher: "AICPA / Journal of Accountancy",
    kind: "Professional explanatory guidance",
    url: "https://www.journalofaccountancy.com/issues/2011/jul/20103500/",
    supports: "Type I evaluates a specified point-in-time control design; Type II additionally addresses operating effectiveness over a defined period.",
    cannotProve: "It does not establish that an arbitrary vendor's controls operated effectively or that a separate API was tested.",
  },
  "owasp-pen-test-report": {
    title: "OWASP WSTG v4.2 — Reporting",
    publisher: "OWASP",
    kind: "Security testing practice guide",
    url: "https://wstg.owasp.org/v4.2/5-Reporting/",
    supports: "Pen-test reports should state scope, limitations, executive findings, remediation and technical detail; sensitive reports should be protected.",
    cannotProve: "A testing guide is not evidence of a specific vendor's pen-test completion, remediation or present security.",
  },
  "ico-subprocessors": {
    title: "ICO — Processor and subprocessor obligations",
    publisher: "UK Information Commissioner's Office",
    kind: "Regulator guidance (UK GDPR)",
    url: "https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/controllers-and-processors/controllers-and-processors/what-does-it-mean-if-you-are-a-processor/",
    supports: "When UK GDPR Article 28 applies, subprocessors need authorization, relevant contractual protections and change-notification/objection opportunities.",
    cannotProve: "Whether a specific third party is a subprocessor, or what a signed DPA permits, requires reviewing actual data roles and contracts.",
  },
  "ico-processor-contracts": {
    title: "ICO — Contracts and Article 28",
    publisher: "UK Information Commissioner's Office",
    kind: "Regulator guidance (UK GDPR)",
    url: "https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/accountability-and-governance/guide-to-accountability-and-governance/contracts",
    supports: "Controller-to-processor processing under UK GDPR requires appropriate written contractual provisions, including data handling and audit duties.",
    cannotProve: "The guidance does not determine a hypothetical buyer/vendor's actual legal roles or cross-border transfer arrangement.",
  },
  "hhs-hipaa-cloud": {
    title: "HHS — HIPAA and cloud computing",
    publisher: "U.S. Department of Health & Human Services",
    kind: "Regulator guidance (U.S. HIPAA)",
    url: "https://www.hhs.gov/hipaa/for-professionals/special-topics/health-information-technology/cloud-computing/index.html",
    supports: "Where a cloud provider creates, receives, maintains or transmits ePHI on behalf of a covered entity or business associate, HIPAA business associate obligations and appropriate BAAs apply.",
    cannotProve: "It does not establish that a particular fictional company is subject to HIPAA or that its proposed vendor has a valid BAA.",
  },
  "govuk-nda-types": {
    title: "UK Intellectual Property Office — Non-disclosure agreements",
    publisher: "GOV.UK / Intellectual Property Office",
    kind: "Government legal education (UK)",
    url: "https://www.gov.uk/government/publications/non-disclosure-agreements/non-disclosure-agreements",
    supports: "NDAs can be one-way or mutual; choosing one depends on who actually discloses information and the intended purpose.",
    cannotProve: "A sample NDA does not validate an individual agreement, authorize sensitive data processing or establish U.S. contractual requirements.",
  },
  "csa-caiq": {
    title: "CSA — Cloud Controls Matrix and CAIQ v4.1",
    publisher: "Cloud Security Alliance",
    kind: "Industry assessment framework",
    url: "https://cloudsecurityalliance.org/artifacts/cloud-controls-matrix-v4-1",
    supports: "The cloud controls matrix and CAIQ give a structured set of questions for evaluating cloud security controls.",
    cannotProve: "A completed questionnaire by itself does not equal an independent audit or a customer risk approval.",
  },
} as const;

export type SecurityEvidenceSourceId = keyof typeof securityEvidenceSources;

export function getSecurityEvidenceSources(ids: readonly SecurityEvidenceSourceId[]) {
  return ids.map((id) => ({ id, ...securityEvidenceSources[id] }));
}
