# Builder Academy — Security hardening: from standard to verified release

**Track:** Builder · **Level:** Intermediate · **Estimated time:** 20–25 minutes
**Status:** proposed learning material; synthetic lab. No claims of security certification, deployed access restrictions or actual product release.

**Prerequisites:** [From idea to verified release](idea-to-verified-release.md) and [Authentication vs. authorization](authentication-vs-authorization.md).
**Next:** [Securing an account-research import and AI workflow](secure-account-import-research.md). Related existing Academy course: [Better Auth GTM workspace](better-auth-gtm-workspace.md).

## Learning outcomes

You can explain why one reusable security baseline is useful, select a risk tier, identify attack boundaries, map a requirement to a negative test, distinguish green PR checks from protected deployment, and produce a defensible review/rollback decision.

## 1. Standards do not install security

The [Technical Docs shared engineering baseline](https://github.com/heyfunwhoa/technical-docs-platform/blob/main/engineering/baseline-v1.md) sets portable engineering expectations. Its [Tier C verification profile (draft)](https://github.com/heyfunwhoa/technical-docs-platform/blob/docs/tier-c-security-controls-20261011/engineering/tier-c-security-profile.md) turns them into a reusable set of checks. Neither is a runtime security control until the application implements and validates it.

**Framework map:** [NIST SSDF 1.1 final](https://csrc.nist.gov/pubs/sp/800/218/final) organizes secure development from preparation through response; [OWASP ASVS 5.0.0](https://github.com/OWASP/ASVS/releases/tag/v5.0.0) provides verifiable application requirements; the [OWASP GenAI LLM Top 10 2026](https://genai.owasp.org/llm-top-10/) covers security risks in LLM-enabled systems. A top-ten list is not a complete application test plan.

NIST's SSDF 1.2 revision was an **initial public draft** when this lesson was written. Do not treat draft status as final.

## 2. Select the right tier

| Tier | Fictional product | Minimum work |
| --- | --- | --- |
| A — static | A page listing fictional projects, no writes, no secrets | dependency and publishing hygiene, no hidden data |
| B — interactive/API | Contact form plus third-party email API | server input validation, secret management, rate limiting, error handling |
| C — sensitive/background | An account-research desk with persistent books, scraping, AI tools and CRM export | risk boundaries, AuthN/AuthZ, ingestion integrity, source permissions, signed machine routes, backup/recovery and deployment verification |

A site's public visibility alone does not determine the tier. Higher-risk data flow or write capability does.

## 3. Sketch the threats before choosing tools

```text
untrusted browser / CSV ---> app server ---> stored accounts
                                 |  ^
                      research URL  |  source/LLM output
                                 v  |
                       third-party API / model
                                 |
                           reviewed workbook / CRM
machine callback -------> signed API endpoint ------> queued job
```

Ask: what would happen if a valid user requested someone else's account? An attacker swapped the uploaded Owner column? A scraped page included prompt instructions? A webhook token was missing? An authenticated user uploaded a spreadsheet formula? A preview build became public?

**A security control is specific**: verifying the Better Auth session prevents anonymous use, but it does not prove a signed-in user is allowed to read account 002. The account authorization decision must be server-owned and checked on the exact requested object.

## 4. Convert a risk into a negative test

Example control **SEC-03 Object authorization**:

```typescript
// Illustrative pseudocode, never a live production account.
const alex = fakeSession("synthetic-alex");
const result = await readAccount({ session: alex, id: "synthetic-jordan-account" });
expect(result.status).toBe(403);
expect(fakeDatabase.readsOfForeignPrivateData).toBe(0);
expect(fakeInngest.events).toHaveLength(0);
```

A positive test should also show Alex can access their own account. Neither test should depend on user-controlled `?rep=Alex` or a fake admin bypass.

Other controls: **SEC-04** fail webhook/cron requests with no token and zero dispatch, **SEC-05** reject unsafe URLs and quarantine dangerous CSV fields, **SEC-06** reject AI/tool calls beyond the user's permissions and cost budget, **SEC-11** verify protected production and preview aliases with harmless unauthenticated navigation.

## 5. Five independent claims

| Claim | Evidence required |
| --- | --- |
| Documented | A proposed standard, threat model or issue |
| Implemented | Code and configuration exist in an identified commit |
| Tested | Positive/negative tests passed on the exact reviewed commit |
| Merged | Review decision and merge record |
| Deployment-verified | Actual environment, deployment SHA, aliases, auth behavior, time and rollback recorded |

If GitHub says all green but the Vercel alias serves private data anonymously, the release fails. A merge does not equal a deployment.

## Practice lab — 15 minutes

A fictional app called *Northstar Research* has a green PR for owner login, but its `GET /accounts/:id` handler only checks if a user is signed in. Its cron route accepts any token, and an AI tool can read all stored source notes.

1. Draw the data flow and mark each boundary. Classify the app's risk tier and why.
2. Write three threats with asset, attacker ability, current control, missing control and harm.
3. Pick **two** controls (SEC-03 and SEC-04 or SEC-06). Write a denied-path test and a positive test for each; assert no side effects from denials.
4. Draft a PR review sentence including exact SHA/check links, what has not been tested, and whether to merge.
5. Add one rollback action and one follow-up for deployment verification.

**Expected answer outline:** Tier C; valid login without object auth is insufficient; machine authorization and agent/tool permissions require separate checks; keep sensitive production closed until tests and deployment access verification exist. Don't report compliance, a breach or active exploitation without evidence.

## Knowledge check

**Question:** A login PR has passing CI, and the site shows an account list. Another signed-in seller can change the URL to view private research. Is the app ready for a real-data pilot?

A. Yes—green CI and login prove security.
B. No—per-account authorization negative tests and release gates are still required.
C. Yes—hiding the navigation link is sufficient.

**Answer: B.** Authentication identifies a session; authorization binds it to a resource. CI cannot prove a live site's actual deployment protection by itself.

## Sources and further reading

- [NIST Secure Software Development Framework v1.1](https://csrc.nist.gov/pubs/sp/800/218/final)
- [OWASP ASVS 5.0.0](https://github.com/OWASP/ASVS/releases/tag/v5.0.0)
- [OWASP Authorization Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html)
- [OWASP GenAI Top 10 2026](https://genai.owasp.org/llm-top-10/)
- [OWASP Logging Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html)

**Publishing boundary:** All names, account IDs and test outcomes here are fictional. Real app implementation status belongs in the owning repository, not a public course card.
