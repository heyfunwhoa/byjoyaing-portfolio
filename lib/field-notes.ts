/**
 * Public-safe editorial registry. These are design-level references, not runtime
 * integrations with the other repositories. Never expose private source URLs,
 * account records, credentials, or customer names here.
 */
export const connectedSources = [
  {
    name: "Account Signal Engine",
    visibility: "private",
    capability: "Account change signals, sourced company research, seller-ready context",
    stage: "Verified repository architecture; not integrated with this portfolio",
    application: "Surface a relevant trigger, attach its source and date, and suggest a human-reviewed conversation",
  },
  {
    name: "Channel Territory Mapping",
    visibility: "private",
    capability: "Account matching and partner-overlap ownership",
    stage: "Local MVP; not integrated with this portfolio",
    application: "Identify a potential partner introduction and confirm ownership before engagement",
  },
  {
    name: "Security Market Map",
    visibility: "public",
    url: "https://github.com/heyfunwhoa/security-market-map",
    capability: "Evidenced security categories, buyer roles, capabilities, and vendor positioning",
    stage: "Public runnable project with evidence limitations",
    application: "Prepare role-specific discovery and translate technical capabilities into buyer priorities",
  },
] as const;

export const dealStages = [
  {
    name: "Account hypothesis",
    question: "Why this account, and why now?",
    example:
      "A fictional software company asks how its security team could find exposed credentials across development teams. The question is a starting point, not proof of urgency or purchase intent.",
    evidence:
      "Confirm product fit, affected workflows, the current process, and the buyer's reason for exploring now.",
    nextMove:
      "Test one account hypothesis in discovery. Separate what the buyer said from what research suggests.",
    decisionGate:
      "Continue when the buyer confirms fit and a reason to act. If not, keep this as a hypothesis and test it in discovery.",
    leader:
      "Challenge the assumptions behind the opportunity. What evidence makes this worth prioritizing now?",
  },
  {
    name: "Discovery",
    question:
      "Who owns the problem, who feels it, and what changes if nothing happens?",
    example:
      "The security lead describes manual triage across repositories, but the team has not established a baseline for frequency, effort, or business impact.",
    evidence:
      "Buyer-confirmed workflow, affected teams, impact, problem owner, and an agreed next step. No impact is assumed in this example.",
    nextMove:
      "Ask how the current process works and what a better result would change. Record unknowns instead of filling them in.",
    decisionGate:
      "Advance when the buyer agrees the problem matters and identifies an owner. If impact stays unclear, learn more or pause.",
    leader:
      "Coach for depth. Did the buyer describe the impact, or did the seller infer it?",
  },
  {
    name: "Stakeholder alignment",
    question: "Who decides, who influences, and who could block progress?",
    example:
      "A security champion and technical evaluator are engaged. Engineering impact, budget authority, security assurance, and procurement paths are not yet validated.",
    evidence:
      "Validate influence through stakeholder conversations and introductions. Confirm who owns the business outcome, budget, technical review, and approval steps.",
    nextMove:
      "Ask the champion for a relevant introduction and explain why that stakeholder's perspective matters.",
    decisionGate:
      "Move forward when decision roles and a path to each role are validated. A named contact alone is not buying-group coverage.",
    leader:
      "Inspect relationship evidence and decision roles, not contact counts or assumed reporting lines.",
  },
  {
    name: "Technical evaluation",
    question: "What constitutes success for each evaluating group?",
    example:
      "The evaluator asks to review a limited workflow. The sample boundary, success criteria, false-positive handling, and closeout are still undecided.",
    evidence:
      "Agreed scope, criteria, owners, data handling, and a buyer-confirmed review point. A completed evaluation is not represented.",
    nextMove:
      "Write down what the evaluation will answer and what evidence will support a decision before work starts.",
    evaluationPlan: [
      { label: "Scope", detail: "Choose one workflow and agree on the sample boundary." },
      { label: "Success criteria", detail: "Define buyer-approved signal quality and operational fit." },
      { label: "Owners", detail: "Name the technical evaluator and affected stakeholder roles." },
      { label: "Data handling", detail: "Agree on approved inputs, access, retention, and deletion." },
      { label: "Decision review", detail: "Set the review date, participants, and next step for either result." },
    ],
    decisionGate:
      "Start only after the buyer agrees on scope, success criteria, owners, and a review point. If those are missing, align before investing resources.",
    leader:
      "Review technical risk, required resources, and exit criteria. Is the evaluation testing a decision or creating activity?",
  },
  {
    name: "Commercial path",
    question:
      "How do budget, security review, procurement, and legal connect?",
    example:
      "Technical fit remains under evaluation. No budget owner, approval sequence, or contracting timeline has been confirmed.",
    evidence:
      "Buyer-confirmed budget ownership, required reviews, procurement and legal steps, and timing. Dates are unknown until the buyer validates them.",
    nextMove:
      "Map the approval path with the buyer. Keep vendor assumptions separate from customer commitments.",
    approvalPath: [
      { label: "Budget owner", detail: "Who owns the outcome and budget source?", status: "To validate" },
      { label: "Security review", detail: "Which assurance steps and evidence are required?", status: "To validate" },
      { label: "Procurement and legal", detail: "Who owns the process, terms, and lead times?", status: "To validate" },
      { label: "Decision timing", detail: "What date and dependencies does the buyer confirm?", status: "No date confirmed" },
    ],
    decisionGate:
      "Forecast timing only when the buyer confirms an owner, approval steps, and dates. Otherwise keep timing uncertain and name the next validation action.",
    leader:
      "Separate customer-confirmed timing from seller estimates and identify the next unverified dependency.",
  },
  {
    name: "Decision and expansion",
    question: "What decision was made, why, and what happens next?",
    example:
      "The example ends with a decision review. It does not claim a purchase, a win, a loss, an expansion, or a measured outcome.",
    evidence:
      "Record the buyer's decision and reason, which criteria were met or not met, remaining gaps, and any mutually agreed handoff.",
    nextMove:
      "Close the loop with the participants. If no decision is made, record the blocker and agree on the next check-in.",
    decisionRecord: [
      { label: "Buyer decision", detail: "Not recorded; wait for an explicit buyer decision." },
      { label: "Rationale", detail: "Not provided in this example." },
      { label: "Criteria and gaps", detail: "Review with the buyer; do not infer what was met." },
      { label: "Follow-up", detail: "Agree on an owner and next check-in if the decision is still pending." },
    ],
    decisionGate:
      "Record an outcome only after the buyer makes it explicit. If no decision arrives, capture the blocker and agreed follow-up instead of inferring a result.",
    leader:
      "Review forecast quality and learning against evidence. Do not turn a pending decision into an outcome claim.",
  },
] as const;

export type Stakeholder = {
  role: string;
  priority: string;
  access: "engaged" | "developing" | "unknown";
  nextStep: string;
};

export const demoStakeholders: Stakeholder[] = [
  { role: "Security champion", priority: "Reduce exposed-credential risk", access: "engaged", nextStep: "Validate influence, urgency and internal advocacy" },
  { role: "Technical evaluator", priority: "Fit, accuracy and deployment effort", access: "engaged", nextStep: "Agree on success criteria and evidence" },
  { role: "Economic buyer", priority: "Business impact and risk reduction", access: "developing", nextStep: "Request an outcome-focused conversation" },
  { role: "Engineering leader", priority: "Developer workflow and friction", access: "unknown", nextStep: "Map affected teams and introduce relevant peers" },
  { role: "Procurement / legal", priority: "Terms, timeline and contracting", access: "unknown", nextStep: "Confirm process and lead times early" },
  { role: "Security assurance", priority: "Vendor risk and control review", access: "developing", nextStep: "Document required artifacts and review milestones" },
];
