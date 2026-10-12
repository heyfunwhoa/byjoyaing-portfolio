# Builder Academy — Secure a CSV → research → export workflow

**Track:** Builder · **Level:** Intermediate · **Time:** 20–25 minutes · **Status:** proposed fictional learning lab. No live imports, CRM writes or real-data account records.

**Prerequisites:** [Security hardening and release gates](security-hardening-release-gates.md), [Better Auth GTM workspace](better-auth-gtm-workspace.md), and [From idea to verified release](idea-to-verified-release.md).

## Learning outcomes

You can distinguish raw, normalized, sourced and approved data; identify where untrusted CSV and scraped website content cross a trust boundary; name the permissions needed at each stage; and write negative tests for import, research and export.

## 1. What you're building

An enterprise seller gets a messy CSV of fictional target accounts. The app should turn that list into trustworthy research without silently changing ownership or exporting unsafe information.

```text
CSV parse + field mapping
  → STAGING: raw allowed input, status/reason, original values
  → NORMALIZE: types, domain/identity candidates, duplicate/conflict review
  → APPROVED COMMIT: authorized transactional account changes
  → EXTERNAL RESEARCH: allowlisted URLs, bounded paid calls, source URLs
  → FIELD REVIEW: cited observation ≠ approved fact
  → EXCEL/CSV: selected authorized approved fields + evidence
  → OPTIONAL CRM WRITE: dry-run conflict report + human approval
```

## 2. The four versions of a data field

| Version | Example | Trust status |
| --- | --- | --- |
| Original | “Northstar, Inc.” from `Account Name` | Supplied by CSV; not verified |
| Normalized | comparison key “northstar” | Well-formed, not necessarily the same legal entity |
| Research candidate | “Northstar makes API security software”, with source and date | Source-grounded claim, potentially stale or conflicting |
| Approved | Reviewer accepts a specific observation/version and explains why | Authorized current choice, subject to later correction |

An uploaded owner value, like “Alex”, is a **suggestion**, never an account-level permission grant. A domain is a candidate identity key, not proof a parent and subsidiary are identical. A revenue range does not become an exact number just because parsing succeeds.

## 3. Threats tied to the workflow

| Boundary | Failure example | Required defense |
| --- | --- | --- |
| Untrusted CSV → parser | Spreadsheet field contains formula, wrong type, invisible/duplicate headers or huge input | Byte/row/cell caps, validated typed field registry, quarantine, no silent truncation |
| Mapping → canonical database | “Owner = Jordan” changes a record without permission | Server derives user/workspace scope and requires reviewed transactional commit |
| Domain → website fetch | Imported host resolves to private address or redirects to metadata endpoint | URL allowlist/SSRF defense before every fetch and redirect, DNS/private IP policy |
| Website → AI system | Site text asks agent to ignore instructions and reveal account data | Treat content as evidence only, narrow tools, bounded outputs, refuse data exfiltration |
| AI → fact/outreach | Provider suggests unsupported contacts, a false claim, or stale revenue | Source URL/time, typed validation, reviewer decision; unknown stays unknown |
| App → workbook | Export includes another AE's accounts or formula-executable cells | Fresh server-side AuthZ, stable approved snapshot, text-safe spreadsheet writer |
| App → CRM | Repeat request overwrites owner or creates two accounts | Idempotency key, external ID namespace, conflict dry-run and explicit approval |

No generic *sanitize()* function solves all of these. Each field has a different interpretation, normalizer and authority policy.

## 4. Approval and evidence contract

Define a staged row status: **ready**, **existing candidate**, **possible duplicate**, **needs review**, **invalid**, **skipped**. Reconcile all input records; never quietly discard meaningful source columns.

Store enough metadata for the user to answer: Who provided the value? When? How was it transformed? Was it checked? What was rejected? Who approved it? What export contains it? Follow retention and licensing constraints—do not keep unnecessary CSVs forever.

For paid providers, require a **user action** selecting validated accounts and a **server** budget limit. A preview must not trigger provider calls. Replays should not double-charge; avoid claiming source facts are independently verified simply because a URL exists.

## 5. Synthetic negative test examples

```typescript
// Pseudocode for a fictional test-only implementation.
const draft = previewCsv([
  { company: "BluePeak", domain: "bluepeak.test", owner: "Another Seller" },
]);
expect(draft.canonicalWrites).toHaveLength(0);
expect(draft.providerCalls).toHaveLength(0);

const denied = await exportWorkbook({
  actor: testSeller("Alex"),
  accountIds: ["jordan-private-account"],
});
expect(denied.status).toBe(403);
expect(denied.downloadBytes).toBeNull();
expect(fakeStore.writes).toHaveLength(0);
```

Other tests: invalid/reserved-domain rejection; 100–200 staff preserved as a range; conflicting name/domain quarantined; duplicate CSV reupload idempotent; prompt injection not converted into tool instructions; forged rep parameter rejected; source label retained on export.

## Practice lab

1. Invent **eight synthetic account rows**, including one malformed domain, one duplicated domain, one unknown column, a conflicting owner and a potentially dangerous spreadsheet formula. Use `.test` domains only.
2. Map the columns to a typed field registry. Mark each row ready, review, duplicate or invalid. Confirm the counts reconcile.
3. Write two denied-path tests: unauthorized account import/owner change and foreign-account export.
4. Draw one fake Firecrawl/Exa response containing a misleading claim and one prompt-injection sentence. Show how the research stage stores cited observation rather than executing instructions.
5. State which controls must pass before enabling a CRM synchronization button, and which are out of scope for your first synthetic preview.

**Pass criteria:** All rows accounted for, no pre-approval writes/provider calls, no unauthorized ownership changes, untrusted text isn't executed, source citations and review states are preserved, and no CRM send occurs.

## Knowledge check

**Question:** You upload a CSV with a company domain, an owner name and a revenue estimate. The domain normalizes successfully. What is safe to do automatically?

A. Reassign the account to the CSV owner and overwrite approved revenue.
B. Add normalized values to a read-only preview, mark uncertain identity/revenue/ownership for review, and require a server-authorized commit.
C. Send the entire list to every AI provider immediately.

**Answer: B.** Format validation is not authorization, identity proof or factual accuracy.

## Standards and source references

- [OWASP ASVS 5.0.0](https://github.com/OWASP/ASVS/releases/tag/v5.0.0)
- [OWASP CSV Injection](https://owasp.org/www-community/attacks/CSV_Injection)
- [OWASP SSRF Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html)
- [OWASP Authorization Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html)
- [OWASP GenAI LLM Top 10 2026](https://genai.owasp.org/llm-top-10/)
- [NIST SSDF v1.1](https://csrc.nist.gov/pubs/sp/800/218/final)

**Publishing boundary:** Use synthetic fixtures only. A course exercise is not a deployed import pipeline, a penetration test or a CRM-integrated feature.
