# Builder Academy companion: one account brief, four interfaces

**Parent lesson:** [API, REST API, webhook and MCP](mcp-vs-rest-api.md)  
**Lesson id:** `mcp-vs-rest-api` — this file does not add a catalog id, card, or route  
**Level:** Beginner, after the parent lesson · **Time:** about 30 minutes on paper  
**Status:** Review draft. Companion reading only.  
**Sources checked:** 2026-10-30

You can finish this lab with a pencil. You do not need an API key, a repository, a model, or a running server.

## Why this matters

Teams sometimes build a new research store for each way a program can ask for the same account brief. A page, an HTTP client, a model, and an assistant then disagree after a source is corrected. This lab keeps one fictional brief behind four interfaces.

## What you will be able to do

By the end, you can:

1. Define API, REST-style HTTP API, function tool, MCP, and agent harness in one sentence each.
2. Point all four interfaces at one domain function.
3. Tell illustrative pseudocode from a program you could run.
4. Say what each interface must do when a source is revoked.
5. Choose the smallest interface that has a real, authorized caller.

## Five definitions

Use these meanings in this lab. Each one links to a primary source checked on 2026-10-30.

| Term | Meaning in this lab | Where the analogy breaks |
| --- | --- | --- |
| **API** | A set of features and rules that let software interact with a program, rather than a person clicking a screen. An in-process function can be an API. An API does not have to use HTTP. [MDN glossary: API](https://developer.mozilla.org/en-US/docs/Glossary/API) | "API" is not a permission, a database, or a promise that the data is true. |
| **REST-style HTTP API** | REST is a set of architecture constraints for scalable distributed systems. In everyday speech, people also call many HTTP APIs "REST" even when those APIs do not meet every constraint. This lab means the practical kind: a resource URL, an HTTP method such as GET, and a representation such as JSON. [MDN glossary: REST](https://developer.mozilla.org/en-US/docs/Glossary/REST) · [MDN: HTTP methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods) | A JSON response with HTTP 200 is not proof of full REST, and it is not proof the brief is verified. |
| **Function tool** | A named operation, with a description and an input schema, registered with one model runtime. The model may request the call. The application's runtime validates the arguments and runs the function. In the OpenAI Agents SDK this is a different category from a hosted MCP tool. [OpenAI Agents SDK: tools](https://openai.github.io/openai-agents-python/tools/) | The SDK page shows Python. Those samples are not this lab. A function tool does not require MCP, and a model request is not approval. |
| **MCP** | Model Context Protocol. A host application uses a client to talk to a server. The server can expose tools, resources, and prompts over JSON-RPC. Local servers often use stdio. Remote servers use Streamable HTTP. MCP is a protocol for exchanging context. It does not decide how the host uses a model. [MCP architecture](https://modelcontextprotocol.io/docs/learn/architecture) | Discovery of a tool is not permission to run it. A local server is not automatically safe. The Python SDK's "resource is like GET, tool is like POST" line is an intuition on [that SDK page](https://py.sdk.modelcontextprotocol.io/get-started/first-steps/), not an identity between MCP and HTTP. |
| **Agent harness** | The runtime around a model: instructions, which tools may run, limits, traces, checks, and human approval. The Academy's [harness companion](ai-agent-harnesses.md) uses this meaning. On 2026-10-30, LangChain's Deep Agents page still calls that product an open-source agent harness, and OpenAI's Python Agents guide still describes an agent as an LLM with instructions, tools, and optional guardrails, with a runner for turns. OpenAI's SDK overview also names a managed Agents API harness. That name is a separate hosted service. This lab does not require it. MCP can be one connector inside a harness. | Installing a harness, or connecting MCP, does not make the model correct or the data licensed. |

A **webhook** is a different pattern. The source system calls you when something changes. The parent lesson covers it. This lab does not turn a webhook into a fifth copy of the brief.

On the Python SDK page, the model chooses a tool, the application chooses a resource, and the user chooses a prompt. That "who decides" split is the part to remember. Do not copy the Python server from that page.

## One service, four doors

The domain service in this story is one function, `getAccountBrief`. It checks the trusted actor, reads the fictional account, and returns the brief. Versions 1 through 4 are doors to that same function.

```text
V1  your application calls the function
V2  an HTTP handler calls the function
V3  a function-tool runtime calls the function
V4  an MCP adapter calls the function
        \        |        |        /
         --------+--------+--------
                 getAccountBrief
                 (the only brief)
```

The fictional company is **Northwind Example**, account id `synthetic-northwind`. The parent lesson uses another invented name, Northstar Example, for the same kind of classroom story. Neither name is a customer.

The actor is the trusted identity the server already knows. A browser, a model, or a tool argument must not be allowed to invent `allowedAccounts`.

## How to read every code block

**Illustrative pseudocode.** Each block below is a sketch for reading. It is not a file in this portfolio, it was not compiled, and it was not executed. Names such as `requireTrustedServerActor` are placeholders. They are not functions you can import.

There is no runnable example in this companion. The paper exercise is the practice.

## The shared brief

Trace this sketch with a finger before you read the four versions. The authorized actor may read only `synthetic-northwind`. Any other id stops at `not_authorized` and returns no brief. An allowed actor who asks for an id the service does not know gets `not_found`.

```ts
// Illustrative pseudocode. Not a source file. Not compiled. Not tested.
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
      version: 1,
    }],
    hypotheses: [{
      text: "Possible change in operational priorities, unverified",
      basedOnVersion: 1,
    }],
  };
}
```

`https://example.org/fictional-source` is a placeholder, not a document that verifies the story. A real service would use a typed error, keep the account list out of the error text, and reuse the application's evidence and authorization code. This sketch does not do those things.

Hand trace for the allowed actor `{ id: "fixture-owner", allowedAccounts: ["synthetic-northwind"] }`:

- `getAccountBrief(actor, "synthetic-northwind")` returns `status: "needs_review"` and hypothesis text marked unverified.
- `getAccountBrief(actor, "other-account")` stops with `not_authorized`.
- An actor whose list contains `missing-account`, asking for `missing-account`, stops with `not_found`.

That trace is a reading of the sketch. It is not a test run.

## Version 1 — call the function in the same application

Your code calls `getAccountBrief` directly. No HTTP server, model, MCP connection, or network call is required for the sketch.

```ts
// Illustrative pseudocode. Not a source file. Not compiled. Not tested.
const actor = { id: "fixture-owner", allowedAccounts: ["synthetic-northwind"] };
const brief = getAccountBrief(actor, "synthetic-northwind");
```

**Who starts?** The application. **What stays the same?** Authorization and the brief live in `getAccountBrief`.

## Version 2 — offer the same function over HTTP

A different program can send a GET request. The handler's only new job is to authenticate the caller, then call the same function. The handler in this sketch is incomplete on purpose.

```ts
// Illustrative pseudocode. Not a route in this repository.
// requireTrustedServerActor is a placeholder, not an import.
async function readBrief(request: Request, accountId: string) {
  const actor = await requireTrustedServerActor(request);
  const brief = getAccountBrief(actor, accountId);
  return new Response(JSON.stringify(brief), {
    status: 200,
    headers: { "content-type": "application/json", "cache-control": "no-store" },
  });
}
```

`cache-control: no-store` means a browser or shared cache should not keep yesterday's brief. A real handler must also map `not_authorized` and `not_found` to HTTP errors and must not return the brief on those paths. This sketch does not show that mapping. Copying it into `app/api` would not create a safe route.

**Who starts?** An HTTP client. **What stays the same?** `getAccountBrief` still decides the account and the status. HTTP 200 means the response was produced. It does not mean the hypothesis is a fact. The parent lesson's 401, 403, and 429 table is the failure vocabulary for real HTTP calls.

## Version 3 — register the same function as a tool

The model may propose a tool call. The runtime must execute it with the actor from the server session. The model does not get to pass `allowedAccounts`.

```ts
// Illustrative pseudocode. Not tied to one SDK version. Not compiled.
const tool = {
  name: "get_account_brief",
  description: "Read an authorized fictional account brief",
  inputSchema: { accountId: "string" },
  execute(args: { accountId: string }, serverActor: Actor) {
    return getAccountBrief(serverActor, args.accountId);
  },
};
```

**Who starts?** The model proposes the call. The runtime runs it. **What stays the same?** `execute` calls `getAccountBrief`. If the model asks for `other-account`, the sketch stops with `not_authorized`.

The OpenAI Agents SDK documents this shape as a function tool and documents hosted MCP as another tool category. Other products use other names. This block is the classroom shape, not that SDK's Python decorator.

## Version 4 — let an MCP client discover the same tool

An MCP host creates a client. The client can discover the tool name, description, and input schema, then request a call. The server-side adapter still calls `getAccountBrief`.

```ts
// Illustrative pseudocode. Not an MCP server. Not compiled. Not deployed.
registerTool("get_account_brief", {
  description: "Read a fictional account brief",
  inputSchema: { accountId: "string" },
}, async (args, verifiedSession) =>
  getAccountBrief(verifiedSession.actor, args.accountId)
);
```

**Who starts?** A compatible MCP client, after a person or host allows the call. **What stays the same?** The adapter is not a second research database. Protocol discovery cannot keep a revoked brief current.

For a remote server, the MCP authorization tutorial describes OAuth 2.1 for protected resources. A local stdio server can use credentials available on that machine, which is a different setup, and local does not mean the account is authorized. This lab does not implement either setup. [MCP authorization](https://modelcontextprotocol.io/docs/tutorials/security/authorization)

The agent harness is the loop that loads instructions, asks the model, applies limits, records the trace, and stops for a person. Version 4 does not include that loop. MCP architecture says the protocol does not dictate how the application uses a model.

## When a source is revoked

Start from the sketch. Observation version 1 is the fictional leadership-change sentence. A seller drafts a note from the unverified hypothesis. Later, version 1 is revoked.

The domain function must then return `needs_review`, keep the old version visible, and stop presenting the hypothesis as current. Because every door calls that function:

- Version 1 returns `needs_review` on the next call.
- Version 2 returns that same status and must not replay a cached success.
- Version 3 must not treat the model's earlier draft as still current.
- Version 4 returns the updated status through the same function. Listing the tool does not freeze the old brief.

No version sends outreach or turns the hypothesis into a fact. Those actions are outside this lab.

## Which door is enough?

Build the smallest door that a real, authorized caller needs.

| Caller you actually have | Smallest door | Wait, if this is true |
| --- | --- | --- |
| The same application already holds the brief | V1, the domain function | You were about to add a server only so the page can read its own data |
| Another deployment needs an approved read-only copy | V2, after a reviewed contract and server-side authorization | Nobody has agreed the fields, the actor, or the correction behavior |
| One internal runtime needs the model to request the brief | V3, a scoped function tool | The runtime would take the actor from the model instead of the session |
| Two or more approved assistants need the same discovery contract | V4, an MCP adapter after a security review | You have one assistant, or the authorization story is still a sketch |
| A CRM should tell you that an opportunity changed | A signed webhook, taught in the parent lesson | You were about to poll or wrap `getAccountBrief` for an event |

This table is a design choice for the classroom. It does not authorize a new HTTP API, a function-tool runtime, or an MCP server in Account Workshop or GTM Revenue OS.

## Paper exercise

Stay on fictional Northwind Example. Write short answers. Suggested time: 15 minutes.

1. Copy the four-door diagram. Label who starts V1, V2, V3, and V4.
2. The model requests account id `other-account`. Using the shared sketch, what does each door return, and which function makes that decision?
3. Observation version 1 is revoked. What `status` must the next call return, and what must happen to a draft that quoted the old hypothesis?
4. Someone proposes an MCP server that stores its own copy of the brief. What will go wrong on the day the source is revoked?
5. Name the one door you would build first for a page inside the same application, and the door you would not build yet.

## Check your sketch

1. The application starts V1. An HTTP client starts V2. The model proposes V3 and the runtime executes it. An MCP client starts V4 after discovery. All four arrows enter `getAccountBrief`.
2. Each door returns `not_authorized` and no brief. `getAccountBrief` makes that decision because `other-account` is not in the trusted actor's list. The HTTP status, the tool error, and the MCP error are wrappers around that result.
3. The next call returns `needs_review`. The old version stays visible. The draft is stale until a person reviews it. The lab does not send the draft.
4. The MCP copy can keep serving the revoked brief after the domain service has changed. Discovery cannot repair a second store.
5. Build V1 first. Leave V4 until a second approved client needs discovery and a reviewed authorization design exists.

## Knowledge checks

Try each question before you read the feedback.

### Check 1

A signed-in seller may read Northwind Example. The model calls `get_account_brief` with a different account id and a sentence that says "the seller approved this." What is the accurate result?

A. Allow it, because the model requested the tool and explained why.  
B. Refuse it in `getAccountBrief`, using the actor from the server session.  
C. Allow it only when the call arrives through MCP.

**Feedback:** B. The runtime ignores the model's permission sentence and passes the server's actor into the same function. A explains a failure mode: treating a tool request as approval. C mixes up the door with the decision. V3 and V4 both have to refuse.

### Check 2

A page, an HTTP API, and an MCP tool each contain a copy of the brief logic. A reviewer revokes the source behind the page. The assistant still describes the old hypothesis as current. What failed?

A. HTTP GET is the wrong method, so the assistant cannot see the revocation.  
B. The copies are no longer one service, so a correction in one place does not reach the others.  
C. MCP replaces the database, so the assistant is supposed to keep the first answer.

**Feedback:** B. The lab's rule is one function, then thin doors. A may be a separate HTTP bug, and it does not explain a stale assistant. C reverses the definition of MCP: the protocol exposes a capability, and the architecture overview says it does not manage the model's use of that context.

### Short answers

1. Does every API use HTTP? **No.** An API is the broader contract. A REST-style API in this lab uses HTTP. [MDN: API](https://developer.mozilla.org/en-US/docs/Glossary/API)
2. Is a function tool the same thing as MCP? **No.** A function tool is registered with one runtime. MCP is a discovery and call protocol between a client and a server. One SDK can offer both as different tool categories. [OpenAI Agents SDK: tools](https://openai.github.io/openai-agents-python/tools/)
3. Does the harness come free with MCP? **No.** The harness is the application's control loop. MCP is one way that loop can reach a tool. [MCP architecture](https://modelcontextprotocol.io/docs/learn/architecture) · [Harness companion](ai-agent-harnesses.md)

## What is actually built

This section separates the classroom sketch from implementation evidence. Dates are 2026-10-30.

| Claim | Evidence this review could check | What it does not prove |
| --- | --- | --- |
| The portfolio lesson id is `mcp-vs-rest-api` | The id is the parent lesson in `lib/ai-academy.ts` and `content/academy/lessons/mcp-vs-rest-api.json`. This file is not a second id. Draft curriculum inventory pull request 233 lists that same id once. | A merged catalog change. This companion is still a draft pull request. Pull request 233's inventory file is not edited here. |
| The code blocks are illustrative | They live only in this Markdown file. They are labeled pseudocode. | Compiler output, test output, or a safe production handler. |
| Account Signal Engine pull request 155 is the linked draft | [Pull request 155](https://github.com/heyfunwhoa/account-signal-engine/pull/155). A same-day consumer note described it as an unmerged projection draft related to the existing correction work. | A test log. This portfolio credential received HTTP 404 for that private repository on 2026-10-30, so this lesson does not name its files, commands, or results. |
| An earlier Account Signal Engine draft discussed the synthetic story | Linear KRU-66 comments on 2026-10-26 describe draft pull request 129, not pull request 155. | That 129's tests pass today, or that 155 contains the same files. |

If you can open pull request 155, read the test command printed there and write down the exit code you observe. Do not paste tokens, customer records, or a copied production handler into this lab. Do not start a second brief implementation from these sketches.

The Account Workshop architecture document remains the implementation owner's map: [architecture](https://github.com/heyfunwhoa/account-signal-engine/blob/main/docs/account-workshop/ARCHITECTURE.md). This review could not read that private file on 2026-10-30. The link is a pointer, not a finding.

## Sources

Checked 2026-10-30 unless a row says otherwise.

- [MDN glossary: API](https://developer.mozilla.org/en-US/docs/Glossary/API) — an API lets software interact with a program; HTTP is one web example, not the whole definition.
- [MDN glossary: REST](https://developer.mozilla.org/en-US/docs/Glossary/REST) — REST is an architecture style; many HTTP APIs are called REST without meeting every constraint.
- [MDN: HTTP methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods) — GET retrieves a representation and is not itself a verification verdict.
- [MCP architecture](https://modelcontextprotocol.io/docs/learn/architecture) — host, client, server, tools, resources, prompts, stdio, Streamable HTTP, and the limit that MCP does not dictate model use.
- [MCP authorization tutorial](https://modelcontextprotocol.io/docs/tutorials/security/authorization) — remote protection is described with OAuth 2.1; local stdio credentials are a different case. This lab implements neither.
- [MCP Python SDK: first steps](https://py.sdk.modelcontextprotocol.io/get-started/first-steps/) — who controls tools, resources, and prompts. Python samples stay on that page.
- [OpenAI Agents SDK: tools](https://openai.github.io/openai-agents-python/tools/) — function tools and hosted MCP tools are different categories in that SDK.
- [Academy harness companion](ai-agent-harnesses.md) — harness, model, and tool definitions. On 2026-10-30 this lab re-checked the OpenAI Python agent page, the OpenAI SDK overview, and the LangChain Deep Agents page. The companion's other product and pricing links remain dated 2026-10-18 and were not re-fetched.

## Where this file sits in the catalog

Lesson id `mcp-vs-rest-api` stays one id. Draft pull request 233 inventories that id once: the card, the parent guide, and Follow one click. Its 2026-10-30 inventory does not list this file, because this file is on another branch. This pull request does not edit that inventory, the learning paths, or `lib/ai-academy.ts`. Pull request 233 also says the card still needs a second independent reasoning check before the lesson meets the full instructional contract. The paper checks above are extra practice. They do not replace the card's one question, and they do not complete that contract.

**Review again when** the MCP architecture or authorization pages change, the OpenAI tool categories change, or an authorized caller is actually approved to use one of these doors. Until then, keep this file as reading for `mcp-vs-rest-api`.
