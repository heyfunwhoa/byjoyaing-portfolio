# Builder Academy lesson — Authentication vs. Authorization

**Track:** Identity & Access Management · **Level:** Beginner · **Estimated time:** 10–15 minutes  
**Status:** Draft educational content. Not a live application route or proof of deployed portfolio authentication.  
**Prerequisite:** None. Next: [Identity lifecycle lab](identity-lifecycle-lab.md).

## Learning objectives

By the end you can:
- Tell authentication (AuthN) apart from authorization (AuthZ).
- Explain how sessions, MFA, roles and resource permissions relate.
- Predict when a signed-in visitor should still be denied access.
- Identify a broken access-control vulnerability, and name its simplest mitigation.

## 1. In plain language

**Authentication (AuthN): “Who are you?”** A system checks the credentials or authentication factors provided by a person or workload, and establishes an authenticated identity/session when the checks succeed.

Examples: password, passkey, a one-time login link or federated identity-provider sign-in. Authentication proof is only as strong as the method and threat model. Email magic links demonstrate control of an inbox; they do not by themselves prove an employer affiliation or that the user should have access to sensitive files.

**Authorization (AuthZ): “What can you do with this particular resource?”** The application checks policy and the identity's current permissions before allowing an action.

Examples: viewer may open one approved case study; owner may approve requests; an approved viewer may still be forbidden from viewing a different case study.

**Mental model:** At an office reception desk, checking your identity is authentication. Whether your badge opens the server room is authorization.

## 2. Walk through the portfolio example

```text
Visitor requests extended case study access
              |
              v
Email verification / login via Better Auth + Resend
AUTHENTICATION: session identifies the visitor
              |
              v
Look up manual approval and resource-specific grant in Neon
AUTHORIZATION: does this viewer have an active grant for this case study?
              |
       +------+------+
       |             |
      YES            NO
       |             |
Server returns       Deny without leaking
protected bytes      protected content
(cache disabled)
```

**Important:** These are planned architecture choices; the Better Auth integration has not yet been deployed. Authentication and authorization must both be enforced by trusted server-side logic and storage.

- A verified email with a pending request: **deny**.
- An approved request with no active sign-in session: **deny**.
- An approved, authenticated viewer asking for a different document: **deny**.
- An approved, authenticated viewer with an active resource grant: **allow** only that authorized resource.
- A revoked or expired grant, even with an otherwise active session: **deny**.

## 3. How other identity concepts relate

| Concept | Purpose | Not the same as |
| --- | --- | --- |
| Session | Remembers an authenticated identity across requests | Authorization to all resources |
| MFA | Uses multiple independent authentication factors to strengthen identity proof | Permission management |
| SSO | Federated login across multiple applications | Automatic resource entitlement |
| RBAC | Assigns permissions based on roles | Identity verification |
| ABAC | Uses resource/user/context attributes to decide access | Authentication |
| SCIM | Provisions, updates or deactivates accounts and groups | Interactive login or immediate grant revocation |
| IGA | Governs who should get or retain entitlements | Authentication protocol |

## 4. Why software needs both

**Broken authentication** may let an attacker impersonate a valid user or take over a session.

**Broken authorization** may let a correctly signed-in user access somebody else's document or an admin-only endpoint. One common pattern is **IDOR** (Insecure Direct Object Reference): changing a URL from `/documents/123` to `/documents/124` reveals another document because the server checks login but not permission for document 124.

Prevent IDOR by checking authorization on **every** server-side resource request, using trusted session data and the specific resource ID. Hiding the link in the interface does not secure it.

## 5. Minimal pseudocode

```ts
const session = await requireValidSession(request);  // AuthN
if (!session) return deny();

const grant = await getCurrentResourceGrant(session.user.id, resourceId);
if (!grant?.active || grant.expiresAt <= Date.now()) return deny(); // AuthZ

return serveProtectedResource(resourceId, { cache: "no-store" });
```

This is conceptual pseudocode, not a production implementation. The real app must also check resource publication status, request-scoped errors, revocation, CSRF/session integrity, private storage, and server-side caching.

## 6. Knowledge check

1. A visitor uses a valid magic link but has no approval. Do you grant access?
2. An approved visitor tries to download a document they were never granted. Should login alone be sufficient?
3. A former collaborator still has a working session after their grant is revoked. Should the session unlock the content?
4. Is MFA an authorization method?
5. An attacker changes `/reports/10` to `/reports/11` and can read a report belonging to someone else. What failed?

**Answers:** 1. No — AuthN succeeds but AuthZ fails. 2. No — every resource requires its own permission check. 3. No — server-side authorization must reflect revocation. 4. No — MFA strengthens AuthN. 5. Resource-level AuthZ (an IDOR/broken access-control vulnerability).

## 7. Try it yourself

Using the [Identity lifecycle lab](identity-lifecycle-lab.md), test these states in a simulated application:

| Session valid? | Email verified? | Request approved? | Grant active for resource? | Expected |
| --- | --- | --- | --- | --- |
| No | Yes | Yes | Yes | Deny |
| Yes | No | Yes | Yes | Deny |
| Yes | Yes | No | Yes | Deny |
| Yes | Yes | Yes | No | Deny |
| Yes | Yes | Yes | Yes | Allow |
| Yes | Yes | Yes | Revoked | Deny |

**Reflection prompt:** Why is “user is logged in” not enough to protect a document?

## 8. References

- [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
- [OWASP Authorization Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html)
- [OWASP Insecure Direct Object Reference Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Insecure_Direct_Object_Reference_Prevention_Cheat_Sheet.html)
- [NIST Digital Identity Guidelines](https://pages.nist.gov/800-63-4/)

**Cross-project connection:** Builder Academy teaches the concept. Security Market Map explains which product categories and buyers address IAM, IGA, PAM, CIEM, CIAM and identity threat detection. The actual portfolio authorization policy remains part of the separate Selected Work security implementation.
