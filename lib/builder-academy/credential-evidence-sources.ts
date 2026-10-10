import type { Finding } from "./credential-risk";

export type InvestigationStage = Finding["category"];
export type EvidenceSource = {
  id: string;
  name: string;
  stage: InvestigationStage;
  category: "code" | "runtime" | "identity" | "provider" | "telemetry" | "workflow";
  method: string;
  establishes: string;
  limitation: string;
  example: string;
  reference: string;
};

export const credentialEvidenceSources: readonly EvidenceSource[] = [
  { id: "git-history", name: "Git repositories and history", stage: "Detect", category: "code", method: "Provider signatures, regex, entropy, structured parsing, diff scanning", establishes: "Candidate credential and exposure location", limitation: "A match does not prove validity or exploitation; history may be incomplete", example: "TruffleHog / git scanning", reference: "https://github.com/trufflesecurity/trufflehog" },
  { id: "build-artifacts", name: "CI logs, artifacts and images", stage: "Detect", category: "runtime", method: "Artifact scanning, contextual and structural matching", establishes: "Potential exposure beyond source code", limitation: "Access permissions and available retention vary", example: "CI artifact or container scan", reference: "https://owasp.org/www-project-top-ten-ci-cd-security-risks/" },
  { id: "secret-context", name: "Provider documentation and surrounding code", stage: "Identify", category: "code", method: "Format attribution, variable names, repository context and dependency inspection", establishes: "Likely credential family/provider and application context", limitation: "Prefixes may overlap; do not guess owner from format alone", example: "Credential family enrichment", reference: "https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html" },
  { id: "identity-inventory", name: "Cloud and service identity inventory", stage: "Identify", category: "identity", method: "Correlate service accounts, workload labels, CODEOWNERS and inventory metadata", establishes: "Potential workload principal and accountable owner", limitation: "Ownership metadata may be missing, stale or inconsistent", example: "Cloud IAM service accounts / service catalog", reference: "https://cloud.google.com/iam/docs/service-account-overview" },
  { id: "provider-validation", name: "Official provider verification", stage: "Verify", category: "provider", method: "Supported non-destructive API verification where explicitly authorized", establishes: "Credential validity at a particular point in time", limitation: "Some tokens cannot be verified safely; never make unapproved requests with leaked secrets", example: "Provider-specific verifier", reference: "https://github.com/trufflesecurity/trufflehog" },
  { id: "credential-inventory", name: "Secrets manager or issuer metadata", stage: "Verify", category: "provider", method: "Check issuer, revocation, expiry and rotation metadata without revealing secret values", establishes: "Administrative evidence of credential lifecycle status", limitation: "Issuer state may not prove all downstream acceptance paths", example: "Vault or provider credential metadata", reference: "https://developer.hashicorp.com/vault/docs" },
  { id: "iam-policy", name: "IAM policies and effective entitlements", stage: "Assess", category: "identity", method: "Analyze inherited roles, trust policies, denied actions and reachable resources", establishes: "Potential permissions and trust-boundary exposure", limitation: "Policy intent may differ from effective permissions, and reachability does not prove access", example: "AWS IAM policy analysis / CIEM", reference: "https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_testing-policies.html" },
  { id: "data-context", name: "Resource graph and data classification", stage: "Assess", category: "identity", method: "Correlate reachable production systems, downstream dependencies and sensitive datasets", establishes: "Potential blast radius and business impact", limitation: "Classification and inventory can be incomplete; not evidence of exfiltration", example: "Cloud resource and data security inventory", reference: "https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final" },
  { id: "audit-logs", name: "Cloud, identity and API audit logs", stage: "Investigate", category: "telemetry", method: "Correlate events, source IP, identity, time window and operations", establishes: "Observed actions or anomalies within available telemetry", limitation: "Logs can be delayed or absent; unusual activity alone does not prove malicious intent", example: "CloudTrail / IdP / service API logs", reference: "https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-user-guide.html" },
  { id: "incident-context", name: "SIEM, source history and incident records", stage: "Investigate", category: "telemetry", method: "Timeline reconstruction and independent signal corroboration", establishes: "Exposure duration and available incident evidence", limitation: "Correlation is not attribution; preserve uncertain findings", example: "SIEM investigation and Git commit history", reference: "https://attack.mitre.org/" },
  { id: "revoke-rotate", name: "Issuer APIs and secrets managers", stage: "Remediate", category: "provider", method: "Revoke, rotate, replace and check service recovery", establishes: "Containment and credential lifecycle changes", limitation: "Rotation alone does not correct excess permissions or erase published exposure", example: "Credential revocation and rotation", reference: "https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html" },
  { id: "access-workflow", name: "IAM, deployment and incident workflows", stage: "Remediate", category: "workflow", method: "Remove privileges, repair pipelines, track owner sign-off and validate follow-up", establishes: "Remediation progress and closure evidence", limitation: "Closed ticket does not prove permissions and all copies have been removed", example: "IAM policy update / remediation ticket", reference: "https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html" },
];

export const evidenceForStage = (stage: InvestigationStage): readonly EvidenceSource[] =>
  credentialEvidenceSources.filter((source) => source.stage === stage);
