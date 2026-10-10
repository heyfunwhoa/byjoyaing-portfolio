# Builder Academy — Identity & Access Management track

**Status:** Curriculum foundation, not a deployed Academy lesson route. This material can be rendered in the eventual Builder Academy learning UI without changing the existing public site or duplicating brand guidelines.

**Learning goal:** Explain how an identity is created, authenticated, authorized, maintained and revoked across an application and enterprise environment. Connect technical fundamentals to real security buying decisions.

Start here: [Authentication vs. Authorization](authentication-vs-authorization.md) — a beginner-friendly lesson with the portfolio example, authorization failure cases, and a knowledge check.

Related lessons: [Identity Across Channels](identity-across-channels.md) explains MFA/SSO/SCIM across web, mobile, CLI, API, cloud, integrations, and agents. [Secrets, Non-Human Identities & IAM](secrets-non-human-identity.md) connects credential exposure, workload identities, resource permissions, and the Detector Coverage Atlas / Security Market Map.

**Interactive prototype:** [Identity Journey Lab](/builder-academy/identity-journey) explores humans, services, CI/CD workloads and AI agents. It is a fictional demonstration; not an active IAM integration.

## Learning path

| Unit | Topics | Practical outcome |
| --- | --- | --- |
| 01. IAM foundations | identity, principal, directory, IdP, account, session, authentication (AuthN), authorization (AuthZ), least privilege, zero trust | Draw how a recruiter gains access to Selected Work |
| 02. Authentication and MFA | knowledge/possession/inherence factors, OTP/TOTP, push, magic links, WebAuthn/FIDO2 passkeys, phishing resistance, recovery | Compare visitor magic link to admin passkey/MFA |
| 03. Authorization | RBAC, ABAC, ReBAC, entitlement, role, permission, least privilege, deny-by-default, resource grants, policy enforcement | Test an approved viewer with only one resource grant |
| 04. SSO federation | service provider/relying party, identity provider, enterprise domain, SAML 2.0 assertions, OpenID Connect ID tokens, OAuth 2.0 delegated authorization | Annotate OIDC and SAML login sequences |
| 05. Provisioning and SCIM | SCIM 2.0, Users and Groups, CRUD/PATCH, identity correlation, lifecycle events, joiner/mover/leaver, deprovisioning | Simulate hiring, team transfer and termination |
| 06. Governance and privileged access | IGA access reviews, JIT/JEA, PAM, segregation of duties, audit logs, service and non-human identities | Identify stale entitlements and risky admin privileges |
| 07. Threat modeling and operations | account enumeration, session theft, phishing, token replay, orphan accounts, group drift, IdP outages, fallback access | Design and test fail-closed controls |
| 08. Commercial/security ecosystem | workforce IAM vs CIAM, IGA vs PAM, identity threat detection, identity security posture, SCIM deployment realities | Map buyer, problem, workflow and vendor category |

**Teaching format:** definition in plain language → diagram → technical explanation → hands-on simulation → threat scenario → decision/tradeoff → check for understanding → primary-source references.

## Core distinctions in plain language

- **IAM** is the broader system for deciding and administering which identities can access which resources.
- **AuthN:** “Are you who you claim to be?” Better Auth checks this through a valid session created after sign-in.
- **AuthZ:** “Can this identified person read *this* case study?” Your application checks a resource grant after authenticating.
- **MFA:** Proof involving at least two independent factors from categories such as knowledge, possession and inherence. Two emailed links or password+PIN are not necessarily two factors. A magic link alone is normally **not MFA**.
- **SSO:** One identity-provider session can be used to access multiple applications via federation, reducing repeated logins. It does not automatically grant all app permissions.
- **OAuth 2.0:** Framework for delegated authorization, not by itself proof of the user's identity.
- **OIDC:** Authentication/identity layer on OAuth 2.0; clients validate an ID token with issuer, audience, signature, expiry and appropriate flow safeguards.
- **SAML 2.0:** XML-based identity federation commonly used in enterprise workforce SSO; validate assertion signature, issuer, audience, recipient, time, correlation and replay resistance.
- **SCIM 2.0:** HTTP/JSON protocol to provision/update/deactivate users and groups. A user can lose access through a SCIM deprovisioning event even if an existing federated session has not expired—**only when the app actually revokes or checks permissions**.
- **RBAC:** permissions bound to roles (e.g. admin, reviewer, visitor).
- **ABAC:** decisions consider attributes such as resource sensitivity, organization or context.
- **ReBAC:** decisions based on relationships such as “owner of this resource.”
- **IGA:** governance over access requests, reviews, approvals, certifications and lifecycle policy.
- **PAM:** controls and monitors powerful privileged access.
- **CIAM:** customer-facing identity and access, different scale and requirements from workforce IAM.

## Worked example: Selected Work on byjoyaing.com

1. A visitor requests access using their name and email. This is an *application request*, not identity proof.
2. You verify they control the email through Better Auth and Resend. A verified email **does not** establish employment or grant protected content.
3. You manually approve specific work samples and write resource-scoped grants in Neon.
4. Visitor signs in and receives a server-validated session cookie. Every protected response independently rechecks approval, resource, expiration and revocation.
5. A grant expires or is revoked. A live session alone must not continue to unlock documents.
6. For administrative privileges use a separate, stronger authentication policy, ideally phishing-resistant passkey/security-key authentication, plus a verified administrator role and audited high-risk actions.
7. Do **not** add SAML SSO or SCIM endpoints to this personal site unless a real enterprise need emerges. They are learning labs, not phase-one dependencies.

## OIDC / SAML / SCIM comparison

| Question | OIDC | SAML 2.0 | SCIM 2.0 |
| --- | --- | --- | --- |
| Primary job | Federated authentication and identity claims | Federated authentication / SSO | Identity provisioning and lifecycle |
| Typical payload | JSON / JWT ID token | Signed XML assertion | JSON user/group records |
| Main direction | IdP → application login | IdP → service provider login | Identity directory → application account |
| What it does **not** guarantee | Authorization to a specific resource | Authorization to a specific resource | Authentication of the interactive user |
| Common failure | wrong audience/issuer/nonce handling | bad XML signature / replay / audience validation | orphaned or mis-mapped accounts, incomplete deactivation |

## Knowledge checks

1. A recruiter signs in with a magic link but was not approved. Should they see the protected PDF? **No**: AuthN alone doesn't grant AuthZ.
2. An employee has Okta SSO and is removed from a team. Do all permissions vanish instantly? **Not necessarily**: provisioning sync, local grants, sessions and cache behavior must be considered.
3. A system uses password + SMS OTP. Is it equivalent to a passkey for phishing resistance? **No**. OTP codes can be phished; properly implemented FIDO2/WebAuthn authenticators bind authentication to the legitimate origin.
4. Does adding SCIM grant SSO? **No**: SCIM maintains accounts; SAML/OIDC handles federation.
5. Should a small portfolio implement an enterprise IdP just to demonstrate identity knowledge? **No**: use synthetic labs and explain the architectural tradeoffs.

## Product/project placement

- **Builder Academy:** the full course, protocol diagrams, glossary, self-checks and synthetic exercises.
- **Selected Work / Better Auth:** real AuthN, AuthZ, approved resource grants, admin MFA and audit trail; integrate only what is needed.
- **Security Market Map:** IAM ecosystem analysis, vendor capability taxonomy and identity lifecycle use cases, using cited sources.
- **Detector Coverage Atlas:** non-human identities, exposed credentials, service accounts, lifecycle and remediation links (not a full SCIM/IAM feature).
- **Portfolio Builder Guide:** public explanations/lesson discovery. Never surface private Joy Index or protected records in public retrieval.

## Verified reference material

- NIST Digital Identity Guidelines (current landing): https://pages.nist.gov/800-63-4/
- W3C WebAuthn: https://www.w3.org/TR/webauthn-3/
- OpenID Connect Core: https://openid.net/specs/openid-connect-core-1_0.html
- OAuth 2.0 framework: https://www.rfc-editor.org/rfc/rfc6749
- SCIM Core Schema: https://www.rfc-editor.org/rfc/rfc7643
- SCIM Protocol: https://www.rfc-editor.org/rfc/rfc7644
- OASIS SAML 2.0: https://docs.oasis-open.org/security/saml/v2.0/

**Implementation note:** This is education and architecture, not a claim that SSO/SCIM/MFA is configured in the portfolio today. Link to source specs from public lesson pages and review the latest revision before building an interactive lab.
