export type JourneyKey = "human" | "service" | "pipeline" | "agent";
export type JourneyStage = "identity" | "authentication" | "authorization" | "lifecycle";
export type Journey = {
  label: string;
  channel: string;
  principal: string;
  credential: string;
  permission: string;
  lifecycle: string;
  learning: string;
  project: string;
};

export const identityJourneys: Record<JourneyKey, Journey> = {
  human: {
    label: "Human visitor",
    channel: "Web application",
    principal: "An approved recruiter visiting Selected Work",
    credential: "A magic-link login creates a server-verified session. A magic link alone is not MFA.",
    permission: "The visitor can read only explicitly approved, unexpired case studies.",
    lifecycle: "Expire or revoke access grants and invalidate the session when necessary.",
    learning: "Authentication identifies the visitor; authorization is checked for every document.",
    project: "Selected Work · Better Auth / Resend / Neon (planned)",
  },
  service: {
    label: "Service account",
    channel: "Backend API integration",
    principal: "The Next.js backend calling the Resend API",
    credential: "A server-only API key authenticates the integration; it is a secret, not a person.",
    permission: "The key should only allow the minimum required sender and email operations.",
    lifecycle: "Track ownership, monitor use, rotate/revoke compromised keys, and avoid logs or client bundles.",
    learning: "The application is a non-human principal. Its credential must be handled separately from user sessions.",
    project: "Selected Work · NHI / secrets management",
  },
  pipeline: {
    label: "CI/CD workload",
    channel: "Deployment pipeline",
    principal: "A GitHub Actions workflow deploying an application",
    credential: "Prefer short-lived workload OIDC federation where supported over static cloud API keys.",
    permission: "Trust and deployment roles must limit repository, environment, branch and allowed actions.",
    lifecycle: "Expire short-lived credentials and remove deploy rights when the workload changes.",
    learning: "OIDC can identify a workload as well as a human; OIDC does not remove the need for restricted permissions.",
    project: "Builder Academy · DevOps / Detector Coverage Atlas",
  },
  agent: {
    label: "AI agent",
    channel: "Agent / tool integration",
    principal: "An AI assistant using an API tool on behalf of a visitor",
    credential: "Use a scoped agent or workload identity, with appropriately constrained delegated user authority.",
    permission: "The server checks tool rights and the requesting user's resource grant before any action.",
    lifecycle: "Audit tool requests, expire delegation, revoke access and remove unused tool privileges.",
    learning: "An agent must not inherit all of a backend's privileges merely because it can call a tool.",
    project: "Security Market Map · AI/NHI security",
  },
};

export function evaluateJourneyAccess(input: {
  identityVerified: boolean;
  grantActive: boolean;
  credentialRevoked: boolean;
}): "allow" | "deny" {
  return input.identityVerified && input.grantActive && !input.credentialRevoked
    ? "allow"
    : "deny";
}
