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
  { name: "Account hypothesis", question: "Why this account, and why now?", evidence: "ICP fit, public trigger, likely business issue", leader: "Challenge assumptions and territory priority" },
  { name: "Discovery", question: "Who owns the problem, who feels it, and what changes if nothing happens?", evidence: "Buyer-confirmed pain, impact, owners, next steps", leader: "Coach depth and quality of discovery" },
  { name: "Stakeholder alignment", question: "Who decides, who influences, and who could block progress?", evidence: "Coverage by role, champion validation, executive engagement", leader: "Inspect relationship gaps, not contact counts" },
  { name: "Technical evaluation", question: "What constitutes success for each evaluating group?", evidence: "Joint evaluation criteria, proof, mutual commitments", leader: "Review resources, technical risks and exit criteria" },
  { name: "Commercial path", question: "How do budget, security review, procurement and legal connect?", evidence: "Budget owner, paper process, approval path, dates", leader: "Identify slippage and forecast uncertainty" },
  { name: "Decision and expansion", question: "What decision was made, why, and what happens next?", evidence: "Signed outcome or recorded loss reason; agreed success handoff", leader: "Review forecast quality and share lessons without leaking details" },
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
