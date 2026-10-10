# Why secrets, non-human identities, and IAM belong together

**Builder Academy · Identity Security track · Draft lesson**

Prerequisites: [Authentication vs Authorization](authentication-vs-authorization.md) and [Identity Across Channels](identity-across-channels.md).

**Try it:** [Identity Journey Lab](/builder-academy/identity-journey) shows how service accounts, deployment workloads and agents differ from a human using a login link.

**Hands-on lab:** [Credential-to-Identity Risk Explorer](/builder-academy/credential-risk) uses provider signatures, regex patterns, entropy, structural and contextual analysis to detect a candidate; then identifies its type and workload, verifies status safely, assesses blast radius, investigates activity and remediates. It links to [Detector Coverage Atlas](https://github.com/heyfunwhoa/detector-coverage-atlas) and [Security Market Map](https://github.com/heyfunwhoa/security-market-map) without ingesting real credentials.

## Start with three different objects

- **Identity / principal:** A human, service account, CI/CD job, cloud workload, device, or agent that performs an action.
- **Credential / secret:** An API key, password, private key, or token used to authenticate. Some workloads use federated identity without long-lived stored secrets.
- **Permission / entitlement:** What the identity is allowed to do after authenticating.

**Secret != identity != permission.** Their relationships matter: a credential might authenticate an application; that application may have overly broad database access. Rotating the credential does not necessarily correct the permissions.

## Why the channels connect

| Scenario | Human / machine | Credential or authentication | Authorization question |
| --- | --- | --- | --- |
| Recruiter viewing portfolio | Human | Better Auth email link + session | Does this person have approval for this particular case study? |
| Next.js contacting Neon | Non-human workload | Database credential or managed identity | What SQL operations can this service perform? |
| Next.js contacting Resend | Non-human integration | Resend API key | Which sender/domain/email operations can it invoke? |
| GitHub Actions deploying an app | CI/CD workload | Prefer short-lived OIDC federation where supported; sometimes deployment token | Which project, branch and environment can it deploy to? |
| SCIM account provisioning | Non-human connector | Scoped connector credential or machine-to-machine authorization | Which users/groups can it create, update or deactivate? |
| AI agent using tools | Agent/workload, possibly acting for a human | Agent identity and delegated token | What can the agent do, and what did the user actually delegate? |

## Controls across the lifecycle

1. **Inventory and ownership:** Know the workload identity and responsible human/team.
2. **Provision:** Issue short-lived identity credentials where possible. Assign least-privilege permissions.
3. **Detect:** Identify candidates using provider-specific signatures, regex patterns, entropy, structured formats and surrounding context. These approaches have different false-positive and coverage limitations.
4. **Identify:** Classify secret type and provider; correlate the credential with a machine identity, workload, owner and exposure location before verification.
5. **Verify:** Establish validity or leave it unknown using supported, authorized, non-destructive methods.
6. **Assess blast radius:** Examine effective permissions, reachable environments, sensitive resources, downstream trust and potential impact, without assuming exploitation.
7. **Investigate:** Analyze the exposure timeline and audit evidence to determine whether misuse occurred; account for telemetry gaps.
8. **Remediate:** Revoke/rotate, reduce privilege, repair insecure workflows, validate service recovery and deprovision unused identities.

## What the different security categories solve

| Category | Main job | Limitations to remember |
| --- | --- | --- |
| Secrets detection | Find credentials exposed in code/artifacts | Does not necessarily establish owner, privilege, validity or compromise |
| Secrets management | Store, issue, distribute and rotate sensitive authentication material | Does not alone discover all identities or enforce least privilege |
| NHI security | Inventory and govern service/workload/agent identities, ownership and rights | Products vary widely; verify actual support |
| IAM / IGA / PAM / CIEM | Control authentication, access governance, privileged access and cloud permissions | Categories overlap and should not be treated as equivalent |
| ITDR / SIEM / cloud detection | Investigate identity activity and suspicious behavior | Detection alerts do not automatically remediate access |
| Workload identity federation | Authenticate machines via trusted short-lived assertions rather than static keys | Still requires correctly scoped trust policies and privileges |

## How this ties into your projects

**Builder Academy:** teach the distinctions, access flows, exercises, and attack/defense scenarios.

**Security Market Map:** connect secrets detection → secrets management → NHI governance → IAM/IGA/PAM/CIEM → identity threat detection. Every vendor capability requires sourced evidence, never inferred feature checkmarks.

**Detector Coverage Atlas:** map detectable secret types, verification limits and remediation context to credential families and potential NHIs, without claiming the scanner provides a complete identity inventory.

**Selected Work / Better Auth:** a real example of human authentication (Better Auth), transactional secret-bearing email integration (Resend), machine-to-database authentication (Neon), and per-resource authorization.

**Builder Guide:** use only approved public descriptions; do not ingest private Joy Index materials or protected samples into public RAG.

## Check yourself

- A secret is exposed. Does it necessarily prove that the associated identity was used maliciously? **No.**
- An API key is rotated. Are its excessive privileges automatically corrected? **No.**
- Does a CI/CD job need MFA? **Not in the same human-interactive sense**; secure workload authentication, short-lived credentials and trusted federation are the relevant controls.
- Does a service account count as an identity? **Yes.**
- Is every NHI represented by a long-lived secret? **No.** Federated and certificate-based workload identity can avoid static keys.

## Sources

- OWASP Secrets Management: https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html
- OWASP Authorization: https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html
- SPIFFE workload identity: https://spiffe.io/docs/latest/spiffe-about/overview/
- NIST Digital Identity Guidelines: https://pages.nist.gov/800-63-4/
