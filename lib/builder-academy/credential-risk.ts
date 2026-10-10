export type RiskInput = {
  exposed: boolean;
  valid: "unknown" | "yes" | "no";
  privilege: "unknown" | "limited" | "broad";
  identityOwnerKnown: boolean;
  unusualActivity: "unknown" | "yes" | "no";
  revoked: boolean;
};
export type Finding = { category: "Exposure" | "Validity" | "Identity" | "Permissions" | "Activity" | "Remediation"; message: string };
export const initialRiskInput: RiskInput = {
  exposed: true, valid: "unknown", privilege: "unknown",
  identityOwnerKnown: false, unusualActivity: "unknown", revoked: false,
};
export function evaluateCredentialRisk(input: RiskInput): {
  status: "contained" | "investigate" | "review";
  findings: Finding[];
  actions: string[];
} {
  const findings: Finding[] = [];
  if (input.exposed) findings.push({ category: "Exposure", message: "A credential appears in an unintended location. Exposure alone does not prove misuse." });
  else findings.push({ category: "Exposure", message: "No exposure in this fictional scenario; absence of a finding does not prove safety." });
  findings.push({ category: "Validity", message: input.valid === "unknown" ? "Validity is unknown; do not assume the token works or attempt unauthorized verification." : input.valid === "yes" ? "Credential is reported valid in the simulation." : "Credential is reported invalid; confirm its lifecycle and remove leaked material." });
  findings.push({ category: "Identity", message: input.identityOwnerKnown ? "A service owner is identified." : "Identity owner is unknown; correlate to service inventory and workload context." });
  findings.push({ category: "Permissions", message: input.privilege === "broad" ? "Broad permissions can increase the impact if abused." : input.privilege === "unknown" ? "Permission scope is unknown; investigate effective privileges." : "Permissions are limited, but exposure still requires review." });
  findings.push({ category: "Activity", message: input.unusualActivity === "yes" ? "Unusual activity is reported; escalate investigation without assuming attribution." : input.unusualActivity === "no" ? "No unusual activity observed; logging may be incomplete." : "Activity is unknown; inspect authoritative audit sources." });
  if (input.revoked) findings.push({ category: "Remediation", message: "Credential is revoked. Also address exposure, ownership, permissions and replacement credentials." });
  const actions = [
    "Locate the exposed material and preserve appropriate incident evidence without copying the secret into logs.",
    "Identify the workload owner and validate exposure/credential status using approved procedures.",
    "Review effective permissions and relevant activity logs; distinguish risk from confirmed abuse.",
    "Revoke or rotate affected credentials using a coordinated service recovery plan.",
    "Reduce privilege, fix credential distribution and storage, and confirm workload recovery.",
  ];
  return {
    status: input.revoked ? "contained" : input.exposed && (input.valid === "yes" || input.privilege === "broad" || input.unusualActivity === "yes") ? "investigate" : "review",
    findings,
    actions,
  };
}
