# Builder Academy lab — identity lifecycle simulator

**Status:** Synthetic classroom scenario. No production API calls, real identities, credentials, or employee records. Pair with [IAM learning track](identity-and-access-management.md).

## Scenario

An invented company, Northstar Security, uses an enterprise IdP for workforce SSO, a SCIM connector to provision accounts in its analytics app, and a local RBAC policy. The employees below are fictional.

| Person | Lifecycle event | IdP state | SCIM target state | Local entitlement | Expected result |
| --- | --- | --- | --- | --- | --- |
| Alex | New hire | Active | User provisioned, active | viewer | Can view approved basic reports after signing in |
| Sam | Promotion to manager | Active | Group membership updated | manager | Can approve reports; no admin rights |
| Riley | Departure | Disabled | User deactivated | grant revoked | All protected reads denied, including existing sessions |
| Casey | Role change | Active | Removed from finance group | finance permission revoked | Finance report denied, other permitted resources work |
| Morgan | Provisioning outage | Disabled | App mistakenly still active | stale access grant | **Must deny** if relying on fresh authoritative revocation; flag drift |

## Exercise 1 — classify the operation

Label each action **AuthN**, **AuthZ**, **SSO**, **SCIM**, **MFA**, **IGA**, or **PAM** (some have more than one label):

1. Alice signs in to three work apps using her organization account.
2. Admin approves a request for a specific protected case study.
3. A directory sends a PATCH request marking an employee inactive.
4. A passkey is required for high-risk admin actions.
5. A quarterly review asks team owners to attest current access.
6. A privileged operator uses a short-lived elevated session.

**Answer key:** 1 SSO/AuthN; 2 AuthZ/IGA workflow; 3 SCIM; 4 MFA (when passkey meets multi-factor requirements); 5 IGA; 6 PAM/AuthZ.

## Exercise 2 — sketch the flows

### Federated login (OIDC conceptual)

```text
Visitor -> App: "Sign in"
App -> IdP: Redirect to authorization endpoint (PKCE/state/nonce)
IdP -> Visitor: Authenticate
IdP -> App: Authorization code through registered redirect
App -> IdP: Exchange code for tokens
App: Validate ID token (signature, iss, aud, exp, nonce)
App -> Policy engine: Is this user granted this resource?
Policy engine -> App: Allow / deny
```

### SCIM lifecycle (conceptual)

```text
HR change -> Identity directory
Directory -> App SCIM API: POST /Users, PATCH /Users/{id}, group updates
App SCIM API -> Database: Update identity lifecycle and membership
App -> Session/resource authorization: Re-evaluate permissions
App -> Audit log: Provision / change / deactivate
```

Note: SCIM operations require authenticated and authorized machine-to-machine requests; do not publish a writable SCIM endpoint without a verified need.

## Exercise 3 — security failure analysis

**Bug:** A terminated employee's SSO login fails, but the app still accepts a local session and keeps access to a restricted report.

Identify:
- Which layer failed? **Local authorization/session revocation.**
- Would adding SCIM alone fix it? **Not necessarily.** SCIM sync latency and failure modes remain; the application must revoke or re-check the grant and sessions.
- What should a protected request enforce? **Authenticated principal + active/approved identity + current resource permission + no revocation + fail-closed when authoritative data is unavailable.**
- Which signals do you monitor? **Deprovisioning failures, stale entitlements, active sessions after disablement, permission-drift and admin grants.**

## Exercise 4 — design a sales discovery conversation

For an IGA/IAM prospect, ask:
1. How do employee and contractor identities enter and leave your systems?
2. Which applications support SSO, SCIM or manual account provisioning?
3. How quickly must access disappear when someone leaves or changes roles?
4. How do you audit and approve entitlements, especially administrator access?
5. What percentage of apps still have local accounts or exceptions?
6. Which incident or audit evidence reveals the most painful gaps?

Write a **hypothesis**, not a claim: “If deprovisioning takes days because apps have manual workflows, the organization may face elevated orphan-account risk and audit effort.” Validate through discovery before presenting as a customer fact.

## Lab completion criteria

- Diagram AuthN and AuthZ as separate checks.
- Explain why SSO and SCIM solve different problems.
- Correctly deny an active but revoked session.
- Identify a stronger admin authentication path and explain recovery.
- Explain one measurable security outcome, one technical tradeoff, and one buyer question.

Sources: [SCIM RFC 7644](https://www.rfc-editor.org/rfc/rfc7644), [OpenID Connect Core](https://openid.net/specs/openid-connect-core-1_0.html), [NIST SP 800-63-4](https://pages.nist.gov/800-63-4/). 
