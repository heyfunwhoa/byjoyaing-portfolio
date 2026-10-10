export type DetectionMethod = "signature" | "regex" | "entropy" | "structure" | "context";
export const detectionMethods: Record<DetectionMethod, { label: string; detail: string }> = {
  signature: { label: "Provider signature", detail: "Known provider-specific prefixes or key formats. Strong for recognizable credentials but cannot cover every custom format." },
  regex: { label: "Pattern / regex", detail: "Character patterns and boundaries detect likely secret formats; matches can be false positives." },
  entropy: { label: "Entropy", detail: "High-randomness strings may be secrets, but generated IDs, hashes and test data can look similar." },
  structure: { label: "Structured credential", detail: "Recognize formats such as PEM blocks, credential JSON or token shapes without assuming validity." },
  context: { label: "Context analysis", detail: "Variable names, file paths, surrounding code and usage clues help rank candidates and reduce noise." },
};
export const investigationStages = [
  { category: "Detect", label: "Detect candidate secrets" },
  { category: "Identify", label: "Identify credential and workload" },
  { category: "Verify", label: "Verify credential status safely" },
  { category: "Assess", label: "Assess potential blast radius" },
  { category: "Investigate", label: "Investigate possible use" },
  { category: "Remediate", label: "Remediate and confirm recovery" },
] as const;
export type RiskInput = {
  exposed: boolean;
  detectionMethod: DetectionMethod;
  credentialTypeKnown: boolean;
  identityOwnerKnown: boolean;
  valid: "unknown" | "yes" | "no";
  privilege: "unknown" | "limited" | "broad";
  resourceReach: "unknown" | "development" | "production";
  sensitiveDataReachable: "unknown" | "yes" | "no";
  unusualActivity: "unknown" | "yes" | "no";
  revoked: boolean;
};
export type Finding = { category: typeof investigationStages[number]["category"]; message: string };
export const initialRiskInput: RiskInput = {
  exposed: true, detectionMethod: "signature", credentialTypeKnown: false,
  identityOwnerKnown: false, valid: "unknown", privilege: "unknown",
  resourceReach: "unknown", sensitiveDataReachable: "unknown",
  unusualActivity: "unknown", revoked: false,
};
export function evaluateCredentialRisk(input: RiskInput): {
  status: "contained" | "investigate" | "review";
  findings: Finding[];
  actions: string[];
} {
  const findings: Finding[] = [
    { category: "Detect", message: input.exposed
      ? `A candidate secret was found by ${detectionMethods[input.detectionMethod].label.toLowerCase()}. ${detectionMethods[input.detectionMethod].detail} Detection alone does not establish validity, identity or compromise.`
      : "No exposure is confirmed in this scenario. Lack of a detector finding is not proof that no credential exists." },
    { category: "Identify", message: `${input.credentialTypeKnown ? "Credential type classified." : "Credential type remains unknown; correlate format, context and provider documentation."} ${input.identityOwnerKnown ? "Responsible workload owner identified." : "Workload or service account owner unknown; investigate inventory, code owners and service context."} Identification should precede any verification attempt.` },
    { category: "Verify", message: input.valid === "unknown"
      ? "Validity is unknown. Use only supported, authorized, non-destructive checks; do not send candidates to arbitrary third-party endpoints."
      : input.valid === "yes" ? "The credential is reported valid in this simulation; this alone does not demonstrate misuse."
      : "The credential is reported invalid; check rotation history and whether replacement credentials exist." },
    { category: "Assess", message: `Potential blast radius: ${input.privilege === "broad" ? "broad effective permissions" : input.privilege === "limited" ? "limited known permissions" : "permissions unknown"}; ${input.resourceReach === "production" ? "production systems potentially reachable" : input.resourceReach === "development" ? "development systems reachable" : "reachable environments unknown"}; ${input.sensitiveDataReachable === "yes" ? "sensitive data potentially reachable" : input.sensitiveDataReachable === "no" ? "no sensitive-data path identified in this exercise" : "sensitive-data reachability unknown"}. This is potential impact, not evidence of access or exploitation.` },
    { category: "Investigate", message: input.unusualActivity === "yes"
      ? "Unusual activity is reported; correlate audit logs, timestamps, source and access patterns. Attribution or malicious use is not proven by the signal alone."
      : input.unusualActivity === "no" ? "No unusual activity observed in available logs; incomplete telemetry cannot rule out misuse."
      : "Activity remains unknown. Investigate source history, exposure duration, logs and other authorized evidence." },
    { category: "Remediate", message: input.revoked
      ? "Credential revoked in this simulation. Confirm replacement, workload function, least privilege, removal from exposed surfaces and closure of any incident."
      : "Coordinate rapid revocation or rotation, preserve evidence appropriately, remove exposed material, restrict permissions and verify service recovery." },
  ];
  const actions = [
    "Detect and triage candidate secrets using patterns, provider signatures, entropy, structural checks and context.",
    "Identify credential family, provider, workload identity, owner and exposure location before verifying.",
    "Verify status only by approved, non-destructive means; preserve unknown when checks are not possible.",
    "Map effective privileges, resource reach, production access and data sensitivity to estimate blast radius.",
    "Correlate exposure timeline and authoritative audit logs; do not equate exposure with confirmed compromise.",
    "Revoke or rotate, reduce privilege, eliminate insecure storage, investigate impact and validate service recovery.",
  ];
  return {
    status: input.revoked ? "contained"
      : input.exposed && (input.valid === "yes" || input.privilege === "broad" ||
        input.resourceReach === "production" || input.sensitiveDataReachable === "yes" ||
        input.unusualActivity === "yes") ? "investigate" : "review",
    findings,
    actions,
  };
}
