# Identity across channels — Builder Academy

**Status:** Curriculum draft. Start with [Authentication vs Authorization](authentication-vs-authorization.md), then continue to [Identity Lifecycle Lab](identity-lifecycle-lab.md).

## A common model

Across applications, first identify the principal (human or workload), then authentication method, session or token, authorization policy, and the account lifecycle. A valid sign-in or token is not permission for every resource.

## Where the concepts apply

| Channel | Authentication | Authorization | Related concepts |
| --- | --- | --- | --- |
| Website | Password, passkey, email link, SSO, session cookie | Per-page and per-document access checks | MFA, sessions, CSRF, RBAC |
| Mobile application | OIDC login and secure session storage | API permissions on the server | Device unlock is not by itself server authentication |
| Developer CLI | OAuth device/PKCE login, SSH credential, short-lived token | Project and command privileges | Token handling and expiration |
| API integration | OAuth access token, scoped API key, client certificate | Token audience/scopes plus object-level checks | NHI, secrets, least privilege |
| CI/CD | Workload identity federation (OIDC) or deployment credential | Allowed repository, branch, role and environment | NHI and short-lived credentials |
| Cloud service | Workload identity, service account or certificate | Cloud IAM policies and resource permissions | CIEM, NHI and privileged access |
| Enterprise SaaS | SAML/OIDC SSO for humans | Application role and entitlement checks | MFA, IGA, SCIM |
| SaaS provisioning | SCIM connector using machine authentication | Connector's scoped permission to create or deactivate accounts | NHI and credential lifecycle |
| AI agent / tool | Agent or workload identity and possibly delegated end-user token | Tool and resource permissions for both agent and user | NHI, token scope, audit |
| Database | Database role, workload identity, connection credential | Database privileges and application tenant isolation | Secrets management |

## How the identity standards fit

- **MFA:** Stronger authentication for humans using multiple independent factors. It does not grant resource permissions.
- **SSO:** A human authenticates at an identity provider and accesses multiple relying applications.
- **OIDC:** An authentication layer on OAuth 2.0; commonly used for modern web/mobile sign-in.
- **SAML:** Enterprise federation using signed XML assertions.
- **OAuth 2.0:** Delegated authorization; OAuth access tokens are not automatically proof of an end user's identity.
- **SCIM:** Provisioning and deprovisioning accounts/groups via an API, often called by a non-human connector identity.
- **RBAC / ABAC / ReBAC:** Ways to make resource authorization decisions.
- **IAM / IGA / PAM / CIEM:** Broader governance, privileged access, and cloud permission management.

## Trust boundary example: protected portfolio

A recruiter signs in with Better Auth and verifies their email. Neon contains a separate approval and resource grant. Next.js checks both the valid session and that exact grant before delivering a case study. Resend delivers the authentication message but does not authorize access. None of these features is currently deployed as a live restricted-content service.

The Next.js server also needs machine authentication to Neon and Resend. Its database credential and Resend API key are secrets. Their permissions are independent of the recruiter's permissions.

## Knowledge checks

1. An employee uses SSO to enter a CRM. Can they automatically export every customer record? **No**, the CRM still checks authorization.
2. A company deploys SCIM. Does it automatically provide SSO? **No**, provisioning and interactive sign-in are different.
3. Is a standalone email magic link MFA? **Generally no.**
4. Does a mobile biometric unlock automatically prove identity to a cloud API? **No**, the backend needs validated authentication.
5. Does a workload identity need authorization? **Yes**, every machine principal should have scoped privileges.

## Sources

- NIST Digital Identity Guidelines: https://pages.nist.gov/800-63-4/
- OpenID Connect Core: https://openid.net/specs/openid-connect-core-1_0.html
- SCIM Protocol: https://www.rfc-editor.org/rfc/rfc7644
- W3C WebAuthn: https://www.w3.org/TR/webauthn-3/
- OWASP Authorization: https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html
