import type { SecurityEvidenceSourceId } from "./security-review-evidence";
// Fictional Builder Academy cases. No real customer records or compliance determinations.
export type SecurityReviewRole = "ae" | "head-of-sales";

export type SecurityDecision = {
  question: string;
  choices: readonly [string, string, string];
  answer: number;
  explanation: string;
  sourceIds: readonly SecurityEvidenceSourceId[];
};

export type SecurityReviewScenario = {
  id: string;
  title: string;
  buyer: string;
  risk: "Limited" | "Elevated" | "High";
  context: string;
  signals: readonly string[];
  evidence: SecurityDecision;
  actions: Record<SecurityReviewRole, SecurityDecision>;
  guidance: readonly string[];
};

export const securityReviewScenarios: readonly SecurityReviewScenario[] = [
  {
    id: "startup-demo",
    title: "Startup — synthetic evaluation",
    buyer: "Fictional 12-person software startup",
    risk: "Limited",
    context: "The buyer is evaluating a security analytics demo with synthetic events only. No production credentials, personal data, or privileged integrations are planned.",
    signals: ["Synthetic-only pilot", "No production connection", "CTO owns risk decision"],
    evidence: {
      question: "Which initial diligence is most proportionate to the actual scope?",
      choices: [
        "Request a full technical penetration-test report and enterprise questionnaire before any demo",
        "Record synthetic-data scope, ask for an approved security overview, access controls and a named buyer sign-off",
        "Skip documenting the pilot because the buyer has fewer than 20 employees",
      ],
      answer: 1,
      explanation: "A limited, documented review matches a synthetic-only trial. Size alone neither removes risk nor justifies an unrestricted technical report.",
      sourceIds: ["nist-supplier-risk"],
    },
    actions: {
      ae: {
        question: "As the AE, what should you do next?",
        choices: [
          "Confirm who approves the synthetic-only scope and record exactly what data and access remain excluded",
          "Promise that any later production integration is already approved",
          "Email the vendor's confidential vulnerability findings to every stakeholder",
        ],
        answer: 0,
        explanation: "An AE coordinates a clear evaluation boundary and a responsible sign-off. Expanding to production requires a new risk review.",
      sourceIds: ["nist-supplier-risk", "govuk-nda-types"],
      },
      "head-of-sales": {
        question: "As Head of Sales, what scalable policy would you introduce?",
        choices: [
          "Waive security assessments for every startup under 50 employees",
          "Require 200 questions and a SOC 2 Type II report for every product demo",
          "Define a limited-risk synthetic-pilot path, with triggers for higher-risk changes and named approval owners",
        ],
        answer: 2,
        explanation: "The policy should reduce unnecessary friction without exempting smaller customers from real high-risk changes.",
      sourceIds: ["nist-supplier-risk"],
      },
    },
    guidance: [
      "Keep data synthetic, document the no-production-access boundary, and use approved public evidence.",
      "An NDA may not be needed when no confidential information is exchanged; ask Legal if scope changes.",
    ],
  },
  {
    id: "midmarket-code",
    title: "Mid-market — repository integration",
    buyer: "Fictional 900-person SaaS company",
    risk: "Elevated",
    context: "The buyer wants read access to private source repositories and an alert feed. Security requests SOC 2 coverage, penetration-test results, SSO details and a list of subprocessors.",
    signals: ["Private repositories", "Potential employee/account metadata", "Security team and procurement involved"],
    evidence: {
      question: "Which evidence package is best for the buyer's Security team?",
      choices: [
        "Current scoped SOC 2 report, approved pen-test executive summary, access/data-flow details, subprocessor list and documented gaps",
        "A logo that says SOC 2 plus a promise that there were no pen-test findings",
        "An unrestricted public link to the full penetration-test technical report",
      ],
      answer: 0,
      explanation: "A scoped SOC 2 report and controlled testing evidence support review; confidentiality, dates, exceptions and remediation still matter.",
      sourceIds: ["aicpa-soc2-types", "owasp-pen-test-report", "ico-subprocessors"],
    },
    actions: {
      ae: {
        question: "As the AE, how should you handle the requested full pen-test report?",
        choices: [
          "Forward all exploit proof-of-concepts from your personal email to save time",
          "Ask your Security owner which approved attestation, summary or restricted full report can be shared and with whom",
          "Tell the buyer a SOC 2 Type II guarantees the API has no weaknesses",
        ],
        answer: 1,
        explanation: "An AE facilitates review with approved evidence and appropriate disclosure controls, without independent compliance promises.",
      sourceIds: ["owasp-pen-test-report"],
      },
      "head-of-sales": {
        question: "As Head of Sales, what process improvement reduces recurring late-stage blockers?",
        choices: [
          "Allow every AE to invent security questionnaire answers",
          "Move the whole security review until contracts are ready for signature",
          "Publish a versioned, Security-approved evidence packet and escalation/exception owners for the sales team",
        ],
        answer: 2,
        explanation: "A repeatable packet and clear approval matrix prevent inconsistent answers and unexpected procurement risk.",
      sourceIds: ["nist-supplier-risk", "csa-caiq"],
      },
    },
    guidance: [
      "Inspect SOC 2 Type I versus Type II, system scope, report period, exceptions, complementary controls and any bridge letter.",
      "For pen tests, confirm application/API scope, test dates, findings, remediation and retesting; do not assume every finding is closed.",
      "For subprocessors, verify legal entities, function, data categories, access locations, onward vendors and notification obligations.",
    ],
  },
  {
    id: "enterprise-regulated",
    title: "Enterprise — regulated production data",
    buyer: "Fictional multinational healthcare organization",
    risk: "High",
    context: "A proposed production deployment would process electronic protected health information (ePHI) and cross-region support access may occur. Procurement, Security, Privacy and Legal are evaluating the supplier.",
    signals: ["Live patient records", "International support access", "Critical security and privacy dependencies"],
    evidence: {
      question: "What is the appropriate starting gate?",
      choices: [
        "Treat an executed MNDA as approval to upload live patient data",
        "Route actual data flows, security review, relevant HIPAA business-associate requirements, privacy and transfer controls to the qualified owners before production access",
        "Publish the complete technical penetration-test findings so every prospect can inspect them",
      ],
      answer: 1,
      explanation: "Confidentiality is not a privacy, HIPAA or production-risk approval. Legal/Privacy/Security must determine actual obligations and authorized scope.",
      sourceIds: ["hhs-hipaa-cloud", "ico-processor-contracts"],
    },
    actions: {
      ae: {
        question: "The buyer asks you to guarantee all data stays in the EU. What do you do?",
        choices: [
          "Promise EU-only access because primary storage is in Frankfurt",
          "Assume encryption eliminates international access or transfer risk",
          "Ask Engineering, Security and Privacy to confirm storage, support access, subprocessors and written terms before responding",
        ],
        answer: 2,
        explanation: "Storage location alone does not prove every processing or support-access location. Give only approved, source-backed commitments.",
      sourceIds: ["eu-crossborder", "ico-subprocessors"],
      },
      "head-of-sales": {
        question: "As Head of Sales, how do you manage this deal responsibly?",
        choices: [
          "Create a mutual action plan with security/privacy/legal gates, owners and a no-production-data-until-approved boundary",
          "Remove the privacy checkpoint from the forecast because the executive buyer is enthusiastic",
          "Authorize the AE to agree to every customer security addendum without Legal review",
        ],
        answer: 0,
        explanation: "A manager makes decision rights and blockers visible without replacing qualified risk acceptance or legal approval.",
      sourceIds: ["hhs-hipaa-cloud", "nist-supplier-risk"],
      },
    },
    guidance: [
      "Determine applicability of DPA, international transfer mechanisms and HIPAA BAA with appropriate counsel.",
      "Review subprocessor lists and downstream subcontractors, processing and support regions, notification/objection and retention.",
      "Constrain restricted SOC 2, pen-test technical details and security reports to approved disclosure channels.",
    ],
  },
  {
    id: "small-high-risk",
    title: "Small buyer — privileged access",
    buyer: "Fictional 15-person startup",
    risk: "High",
    context: "Although the company is small, a vendor would receive a production organization-admin API credential and read live security telemetry. The founder wants to move fast.",
    signals: ["Privileged production credential", "Live security records", "Very small team"],
    evidence: {
      question: "How should this review compare with the synthetic-only startup demo?",
      choices: [
        "It requires more scrutiny because production privilege and data exposure changed materially, despite similar headcount",
        "It requires less scrutiny because the founder can sign an MNDA",
        "It is identical to the synthetic-only pilot, since both buyers are startups",
      ],
      answer: 0,
      explanation: "Data sensitivity, privilege and criticality dominate the assessment. An MNDA does not replace authorization and security controls.",
      sourceIds: ["nist-supplier-risk"],
    },
    actions: {
      ae: {
        question: "As the AE, what is the next defensible step?",
        choices: [
          "Collect the admin credential immediately and ask Security to review it later",
          "Pause production credential exchange until the permitted access scope, controls and owner approvals are verified",
          "Treat an email saying 'looks fine' as a completed production access review",
        ],
        answer: 1,
        explanation: "Document scope and keep privileged access blocked until approved through the proper channels.",
      sourceIds: ["nist-supplier-risk"],
      },
      "head-of-sales": {
        question: "As Head of Sales, what should your team's process do?",
        choices: [
          "Automatically exempt deals under a revenue or employee threshold",
          "Offer reps a bypass flag whenever a startup founder approves",
          "Trigger a higher-tier security workflow when privileged access or regulated/live data appears, regardless of account size",
        ],
        answer: 2,
        explanation: "The operating process should use risk-based gates rather than a simplistic company-size exemption.",
      sourceIds: ["nist-supplier-risk"],
      },
    },
    guidance: [
      "Assess least privilege, scoped credentials, rotation/revocation, audit logs and potential blast radius.",
      "Require controlled handling of credentials and a renewed security review before a production POC.",
    ],
  },
];

export function findSecurityReviewScenario(id: string): SecurityReviewScenario | undefined {
  return securityReviewScenarios.find((scenario) => scenario.id === id);
}

export function evaluateSecurityDecision(
  scenarioId: string,
  role: SecurityReviewRole,
  stage: "evidence" | "action",
  choice: number | null,
): { correct: boolean; explanation: string } | null {
  const scenario = findSecurityReviewScenario(scenarioId);
  if (!scenario || choice === null || !Number.isInteger(choice)) return null;
  const question = stage === "evidence" ? scenario.evidence : scenario.actions[role];
  if (choice < 0 || choice >= question.choices.length) return null;
  return { correct: choice === question.answer, explanation: question.explanation };
}
