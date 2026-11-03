# Builder Academy — API, REST API, webhook and MCP: what is different?

**Track:** Builder / APIs & Integrations · **Level:** Beginner → Intermediate · **Time:** 20–25 minutes  
**Status:** Public educational lesson with fictional account examples, not a connected vendor integration  
**Reviewed:** 2026-10-11 · **Companion linked and architecture page re-checked:** 2026-10-30 · **Prerequisites:** [HTTP/API basics](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview), [From idea to verified release](idea-to-verified-release.md).

## Learning goals

Explain what an API is, where REST fits, why MCP is a different integration interface, when to use a webhook, and why none of these technologies automatically grants access to data. Identify a safe approach for an AI-assisted account research task.

## Plain-language analogy: restaurant ordering

- **API:** The general set of rules by which a customer orders from the kitchen. API is the broad category.
- **REST-style HTTP API:** A predictable order form with resource URLs, methods and responses. A script can request a company, update an approved field, and read structured JSON.
- **MCP (Model Context Protocol):** A discoverable menu of tools and information intended for AI assistants. The assistant can discover `research_company` and ask the connected tool to perform it.
- **Webhook:** The kitchen calls you when the order is ready instead of making you ask repeatedly.
- **SDK:** A convenient programming-language wrapper around an API, not a separate source of permission.
- **MCP server versus source system:** The MCP tool should call the same approved service the application already uses. That service may be an in-process function or an existing HTTP API. MCP is not a second database, and it does not replace the vendor's licensing agreement or access controls. The [progressive companion](api-mcp-progressive-lab.md) traces one fictional brief through four doors.

## Comparison

| Question | REST-style API | MCP server | Webhook |
| --- | --- | --- | --- |
| Who starts? | A deterministic app, script, or job makes an HTTP request | A compatible AI host/client discovers a tool and invokes it | The source sends an event when something happens |
| Shape | HTTP methods such as GET/POST/PATCH on resource URLs, typically JSON | JSON-RPC messages; tools/resources/prompts; stdio locally or Streamable HTTP remotely | HTTP POST sent to a registered callback URL |
| Good use | Fetch CRM ownership, run bounded enrichment, approved writeback | Help an agent retrieve context or request a bounded research action | Notify a system that a CRM status changed |
| Weakness | Each integration needs mapping, error and credential handling | Model-initiated tools need strong approval boundaries, tool descriptions and untrusted-input handling | Delivery may repeat, arrive late, or fail |
| Security | Credential scope, server-side tenant checks, rate limits, audit and provider contract | The same underlying permissions **plus** agent tool approval, prompt-injection resistance and tool-call tracing | Authenticate sender/signature, replay protection, idempotency, authz |

**Neither REST nor MCP implies read-only access.** Both can expose consequential actions. A discovered MCP tool is not automatically safe to execute. Both require the right subscription, consent/authorization where applicable, vendor-granted data rights, and secure identity.

## Worked example — fictional Account Workshop

A seller researches the invented company **Northstar Example (northstar.example)**.

1. The Account Workshop app looks up the local normalized company row in its authorized Postgres environment.
2. Its server makes a *hypothetical* CRM REST request such as `GET /companies?domain=northstar.example` to check existing ownership. The vendor's actual endpoint and schema may differ.
3. An optional AI assistant calls a mock MCP tool `research_company`. The tool can call the same approved server-side research function; it cannot skip tenant checks or expand the provider's rights.
4. When approved research completes, a scheduled job records an evidence-linked observation. A webhook *could* notify the app of a CRM change; no external event is required in this classroom scenario.
5. The seller reviews a draft. Creating a CRM contact, revealing a paid work email or sending outreach remains disabled until licensing, privacy, owner matching and authorization checks pass.

**Design lesson:** keep the domain logic in one reusable service. Give deterministic applications REST/typed-function access and AI assistants a carefully scoped MCP facade *only if they need one*. Do not create a second database just to support MCP.

## Failure exercise (synthetic, no credentials)

For each event, decide whether the problem is transport, permissions, data rights or data quality.

| Scenario | Correct investigation |
| --- | --- |
| REST returns HTTP 401 | Missing/invalid authentication; check the token privately, never log it |
| REST returns 403 | Identity may be known but the operation or account is not authorized |
| REST returns 429 | Rate/credit limit; apply documented backoff and a budget gate |
| An MCP tool appears in an assistant | Discovery is not a grant of permission; inspect exact tool scope, data access, and approval |
| Webhook arrives twice | Validate authenticity and deduplicate by stable event ID |
| Provider exposes a person email | Technical access is not proof you can retain or copy it into another CRM |

### Hands-on lab (10 minutes)

Using fictional account records and **mock responses only**:

1. Draw `App → REST API → CRM`, `AI host → MCP server → approved backend/API`, and `CRM → signed webhook → App`.
2. Choose one read-only tool: `get_company_summary(domain)`. Define inputs, output schema, owner/tenant permission check, source freshness and an explicit `not_available` result.
3. Write a test that denies an unassigned account even if the AI assistant supplies a valid-looking account ID.
4. Write a failure test for a repeated webhook, then explain how an idempotency key stops duplicate *state changes*.
5. State which interface you would choose for: a nightly enrichment job (REST/SDK), an assistant research request (optional MCP), and a CRM ownership change notification (webhook).

## Quick knowledge check

**Which statement is accurate?**

A. MCP replaces REST APIs, so the agent no longer needs provider permissions.  
B. REST and MCP can coexist: MCP makes tools discoverable to AI clients and may call the same approved service or an existing HTTP API, with the same underlying access and licensing restrictions.  
C. A webhook is a database and automatically preserves all history.

**Answer:** B. The assistant's user-facing prompt never supersedes tenant authorization, provider subscription, retention rules or human approval.

## Continue with one service and four doors

Read [One account brief, four interfaces](api-mcp-progressive-lab.md) after this comparison. It defines API, REST-style HTTP, function tool, MCP, and agent harness, then sketches the same fictional brief behind each door. Every code block there is illustrative pseudocode. The companion does not add a lesson id, an API key, a live integration, or an MCP server.

The paper exercise in that file is the next practice. Come back to the failure table above when an HTTP call returns 401, 403, or 429.

## What this means in enterprise sales and leadership

- **AE / solution evaluation:** Ask which operations are REST, MCP or webhook-enabled and which have actual entitlement. Avoid promising that the buyer can bulk export or persist data just because the interface exists.
- **Head of Sales:** Evaluate repeatable CRM/provider integration economics, supportability, compliance, tool auditability and ownership before standardizing the GTM stack. Prefer replaceable adapters instead of coupling your methodology to one vendor.

## Sources

Reviewed 2026-10-11. The architecture page and the Microsoft Learn page were opened again on 2026-10-30. The architecture re-check is the source for "Streamable HTTP" and for the statement that MCP exchanges context and does not dictate how the host uses a model. The Microsoft Learn re-check is the source for the Azure API Management sentence below. The two MDN links were not re-fetched on 2026-10-30.

- [Model Context Protocol — architecture overview](https://modelcontextprotocol.io/docs/learn/architecture) — hosts, clients, servers, tools/resources/prompts, JSON-RPC, stdio, and Streamable HTTP. Re-checked 2026-10-30.
- [MDN — HTTP methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods) — GET/POST/PATCH semantics and method properties.
- [MDN — Overview of HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview) — client/server requests and responses.
- [Microsoft Learn — MCP servers in API Management](https://learn.microsoft.com/en-us/azure/api-management/mcp-server-overview) — Azure API Management can expose a managed REST API's operations as MCP tools, or place an existing MCP server behind the gateway. Re-checked 2026-10-30. That page also says this Azure feature currently exposes tools and does not support MCP resources or prompts. That limit belongs to the product, not to the protocol.

**Publication boundary:** Source examples are educational. Do not upload real customer records, API tokens, personal contact lists, or licensed vendor exports to a public tutorial.
