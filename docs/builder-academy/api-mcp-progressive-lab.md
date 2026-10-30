# Builder Academy companion lab: one capability, four interfaces

**Parent lesson:** [MCP versus REST APIs](mcp-vs-rest-api.md)  
**Track:** Builder Academy / APIs, integrations and agents  
**Level:** Beginner → intermediate · **Time:** 35–50 minutes  
**Status:** Review draft, companion reading only; not a new Academy catalog item or working integration  
**Sources checked:** 2026-10-30

## What you will learn

Explain the difference between a domain function, an HTTP API, an AI function tool, and an MCP tool. Then sketch all four against the **same fictional account brief** without creating four separate research engines. You should be able to say who invokes each interface, how identity is checked, where validation belongs, and what happens when evidence is revoked.

## The analogy

A kitchen makes one meal using one recipe. A cashier, online checkout and voice assistant are different ways to place an order. The kitchen should not prepare a different meal depending on the ordering interface. In Account Workshop, the *kitchen* is the authorized account-brief service. REST, in-process AI tools and MCP are interfaces to it. The **agent harness** coordinates the model, instructions, tool calls, limits, trace, verification and human approvals; MCP alone does not provide all of that.

An **API** is a broad software interface. A REST-style HTTP API uses endpoints and HTTP methods. An **MCP server** exposes tools, resources and prompts through a protocol designed for interoperable AI clients. A **function tool** registers a callable operation with a particular model/agent runtime; it does not have to use MCP. A **webhook** instead delivers an event to a receiver, and is not used in this exercise.

## The shared contract: data and permission first

Every version uses the same logical result, represented here with **synthetic data only**:

```ts
type AccountBrief = {
  accountId: string;
  status: "reviewed" | "needs_review";
  observations: { text: string; sourceUrl: string; version: number }[];
  hypotheses: { text: string; basedOnVersion: number }[];
};

type Actor = { id: string; allowedAccounts: string[] };

function getAccountBrief(actor: Actor, accountId: string): AccountBrief {
  if (!actor.allowedAccounts.includes(accountId)) {
    throw new Error("not_authorized");
  }
  if (accountId !== "synthetic-northwind") {
    throw new Error("not_found");
  }
  return {
    accountId,
    status: "needs_review",
    observations: [{
      text: "Fictional leadership-change example",
      sourceUrl: "https://example.org/fictional-source",
      version: 1
    }],
    hypotheses: [{
      text: "Possible change in operational priorities, unverified",
      basedOnVersion: 1
    }]
  };
}
```

This is a **teaching function, not production-ready code**. In reality, reuse Account Workshop's current evidence graph, source/version rules, identity resolution and server-side account authorization. Never accept the actor's `allowedAccounts` from an untrusted browser or model request. Do not present example.org as an actual verifying source. Revoked source versions must invalidate dependent recommendations and drafts.

## Version 1: call the function in the same application

```ts
const actor = { id: "fixture-owner", allowedAccounts: ["synthetic-northwind"] };
const brief = getAccountBrief(actor, "synthetic-northwind");
```

**What happened?** Your code called a function directly. No AI, HTTP server, MCP, subscription or network connection is required. **Test:** wrong account → `not_authorized`; unknown authorized account → `not_found`.

## Version 2: wrap the function in a REST-style HTTP API

```ts
// Illustrative Next.js handler shape; not a deployable route.
// The server authenticates the request; the browser never chooses actor identity.
export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const actor = await requireServerSessionAndAccountScope(request);
  const { id } = await context.params;
  const brief = getAccountBrief(actor, id);
  return Response.json(brief, {
    headers: { "Cache-Control": "no-store" }
  });
}
```

`requireServerSessionAndAccountScope` is intentionally **undefined** here. Do not copy this snippet into a production route. Use the repository's actual session and authorization services, input validation, error mapping and privacy review.

**What changed?** A different program can send an HTTP request. **What stayed the same?** Account authorization and source interpretation belong to the same domain service. **Test:** anonymous or unassigned requests must fail without returning data. Returning a 200 from an API does not make evidence verified.

## Version 3: register the same service as an AI function tool

```ts
// Pseudocode, independent of any specific SDK version.
const tool = {
  name: "get_account_brief",
  description: "Read an authorized, synthetic account brief",
  inputSchema: { accountId: "string" },
  execute: (args: { accountId: string }, serverActor: Actor) =>
    getAccountBrief(serverActor, args.accountId)
};
```

**What changed?** The model can *propose* a tool call, but the application controls execution and gets actor identity from trusted context, not model arguments. Add allowlists, limits, logging, timeout handling and result validation. **Test:** model-supplied foreign account ID → access denied.

## Version 4: expose a discoverable MCP tool

```ts
// Conceptual MCP handler; use the current official TypeScript SDK
// and approved authentication transport for a real implementation.
registerTool("get_account_brief", {
  description: "Read a synthetic account brief",
  inputSchema: { accountId: "string" }
}, async (args, verifiedSession) =>
  getAccountBrief(verifiedSession.actor, args.accountId)
);
```

**What changed?** Compatible MCP clients can discover a tool name, its description and input schema, then request invocation through an MCP client/server connection. The **MCP tool is an adapter**, not an extra research database. For a remote server, implement and test supported authorization, transport and token verification. A locally hosted MCP server is not automatically safe or authorized to expose private accounts.

**Important:** Do **not** build this MCP endpoint in Account Workshop yet. It is a lab design for after the read-only contract, evidence permissions and real-data release gates are verified.

## Which version should you choose?

| Use case | Smallest sensible interface |
| --- | --- |
| Account Workshop page needs a brief | V1, a local domain function |
| GTM Revenue OS needs an approved read-only snapshot across deployments | V2, versioned authenticated API after contract review |
| A single internal agent needs one brief | V3, scoped function tool |
| Multiple compatible assistants need tool discovery | V4, MCP adapter after security review |
| CRM says an opportunity changed | Signed webhook, a different integration pattern |

**You may not need all four.** Build the minimum interface that has a real authorized consumer.

## Practice: a correction must propagate through every interface

A fictional observation is version 1 and approved. The seller prepares a draft based on it. Later, that source is revoked.

- V1 must return `needs_review` for the dependent account brief.
- V2 must return the same status, not a cached stale success.
- V3 must not describe the draft as current merely because the model previously saw it.
- V4 must communicate the updated status through the same service; protocol discovery cannot override corrections.
- No version may automatically send outreach or promote a hypothesis to fact.

**Suggested tests:** approved evidence; revoked evidence; unknown source; wrong owner; malformed ID; repeated call; tool timeout; malicious instruction embedded in a source excerpt. Record observed results, not invented pass counts.

## Five knowledge checks

1. Is MCP a replacement for your database? **No.** It exposes capabilities.
2. Does every API require HTTP? **No.** API is a broader category; REST-style APIs commonly use HTTP.
3. Is a tool call automatically approved because the model requested it? **No.** The runtime must enforce permissions and approvals.
4. Can both a REST API and MCP call the same TypeScript service? **Yes.**
5. What comes before a production MCP server for Account Workshop? **The tested domain contract, verified authorization, provenance/correction semantics and human-reviewed release gates.**

## Portfolio implementation roadmap (proposal)

1. **Learning:** keep this as a companion to the existing Academy lesson, not a second lesson ID.
2. **Domain:** finish the Account Workshop synthetic outcome/decision journal contract, using existing ownership rules.
3. **Contract:** version a read-only `AccountBrief` output with source versions and `needs_review` behavior; tests first.
4. **Consumer:** integrate one legitimate read-only application consumer, preferably in-process first.
5. **Agent trial:** wrap that service in one bounded function tool and evaluate ten synthetic scenarios.
6. **MCP decision:** only build an MCP adapter if two or more approved AI clients actually benefit from discovery.
7. **Production:** require real AuthN/AuthZ, retention, licensing, budget and deployment verification before private account data.

The canonical Account Workshop PRD and Linear project own implementation decisions. The Academy owns teaching examples only.

## Primary references

- [Model Context Protocol architecture](https://modelcontextprotocol.io/docs/learn/architecture) — protocol components and interaction model.
- [Official MCP Python SDK first steps](https://py.sdk.modelcontextprotocol.io/get-started/first-steps/) — concrete distinctions among tools, resources and prompts.
- [MCP Apps authorization](https://apps.extensions.modelcontextprotocol.io/api/documents/authorization.html) — authentication approaches for protected tools.
- [MDN HTTP request methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods) — HTTP method semantics.
- [OpenAI Agents SDK tools](https://openai.github.io/openai-agents-python/tools/) — function tools and runtime capabilities.
- [Account Workshop architecture](https://github.com/heyfunwhoa/account-signal-engine/blob/main/docs/account-workshop/ARCHITECTURE.md) — project-specific ownership; not evidence of an MCP deployment.

**Source-review trigger:** Official protocol/SDK schema updates, auth behavior changes, or any approved application integration. URLs and illustrative snippets are educational; compile/runtime behavior of snippets has not been tested as production code.
