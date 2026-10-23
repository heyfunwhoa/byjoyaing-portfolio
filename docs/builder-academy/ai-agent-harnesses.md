# Builder Academy: AI agent harnesses, from prompts to verified execution

**Track:** Builder Academy → AI-assisted development  
**Level:** Beginner to intermediate  
**Estimated learning time:** 20–30 minutes  
**Status:** Companion reading; not a registered Academy lesson or live publication  
**Primary references checked:** 2026-10-18  
**Prerequisites:** [Cursor workflows](cursor-agent-workflows.md), [From idea to verified release](idea-to-verified-release.md)

## Learning outcomes
By the end, you can (1) distinguish a model, agent, workflow, harness and multi-agent system; (2) draw the parts of a safe execution loop; (3) select appropriate tools, context and approvals; (4) identify evidence that a task actually succeeded; and (5) explain why running a model is not the same as operating a dependable agent.

## 1. The simple mental model

A **model** interprets input and generates candidate outputs. An **agent** combines a model with instructions and tools to decide what to do next. An **agent harness** is the surrounding runtime and operational scaffolding that makes those steps executable, observable, bounded and recoverable. A **workflow** prescribes task steps, often with deterministic code. A **multi-agent system** coordinates more than one agent; it is an optional design choice, not a prerequisite for a harness.

**Analogy:** The model is the person reasoning through a problem; the harness is the workshop, tool checkout, instructions, permissions, checklist, inspection station and job log. A bigger brain does not replace safe machinery or quality control.

Definitions vary by vendor. OpenAI's Agents SDK describes an agent as an LLM with instructions, tools and optional handoffs/guardrails, and its runner manages turns and tools. LangChain explicitly calls Deep Agents an agent harness for planning, context and subagents. Do not assume either framework guarantees safety or correctness merely by being installed. [1][2]

## 2. Anatomy of an execution loop

```text
Human objective and acceptance criteria
                |
       Intake and context loading
                |
       Plan next authorized step
                |
          Model selects action
                |
    Permission check / tool execution
                |
         Observe tool result
                |
     Verify / recover / repeat
                |
    Evidence + human review gate
                |
  Optional approved merge or deployment
```

A capable harness may include:
- **Instructions and context:** task brief, local repository rules, retrieved references, state and context compression.
- **Tool runtime:** typed functions, repository reads, commands, browser operations, external APIs and standardized connectors such as MCP.
- **Planning and orchestration:** decomposition, step limits, delegation and controlled handoffs.
- **Security boundaries:** least-privilege tool access, sandboxing, secrets isolation and approval of high-impact actions.
- **Durable state and recovery:** checkpoints and resumability, without confusing saved context with truth.
- **Observability and evaluation:** tool traces, test output, failures, costs and repeatable evaluation cases.
- **Human review:** explicit approval before actions such as merging, deployment, financial changes or exposing private data.

These are capabilities to design and verify, not guaranteed features of every agent product. OpenAI documents orchestration, state, guardrails, tracing and evaluation. LangChain documents virtual file systems, memory, middleware, subagents and permission models. [1][2][3][4]

## 3. Harness vs prompt engineering vs fine-tuning

| Technique | What it changes | Useful for | Doesn't prove |
| --- | --- | --- | --- |
| Prompt | Instructions in one interaction | Task clarity, format, scope | Tool access, persistence or execution |
| Skill / repo rule | Reusable instructions supplied as context | Repeatable conventions and checks | Automatic enforcement of permissions |
| Harness | Runtime, tools, state, control flow and approvals | Multi-step execution and evidence | The underlying model is always correct |
| Evaluation suite | Repeatable test cases and quality criteria | Regression detection and model/harness comparisons | Reliability on every unseen task |
| Fine-tuning | Model behavior through additional training | Specialized patterns at scale | Safe external actions or verified facts |

**Important:** Context management is not necessarily long-term memory. Likewise, a policy written in Markdown is a directive, not the same as an enforced sandbox or IAM permission boundary.

### Where Kilo, Modal, and local models fit

The agent, model, inference runtime, compute, gateway and deployed app are separate parts:

- **Agent / harness:** Runs the control loop: loads instructions and project context, asks a model what to do, invokes allowed tools, observes results and continues or stops.
- **Model / weights:** Training adjusts learned numerical parameters called weights. During inference, a model uses those weights to generate output tokens from input tokens. A model alone has no project access, tools or permission to act.
- **Provider / API:** A hosted provider runs inference and returns responses through an API. It sets model availability, data terms, usage limits and billing.
- **Open-weight model:** Weights can be downloaded under the model's terms and run by you or a host. “Open-weight” does not guarantee open training data, source code, license or use rights; review each model license.
- **Inference runtime / compute:** Runtime software loads weights and runs inference. CPU/GPU and memory affect which model fits and how quickly it runs. Ollama is a simple local option; vLLM is designed for model serving. Modal and RunPod provide managed cloud compute, including GPUs.
- **Gateway:** An optional proxy between an app and providers. It can normalize APIs, route calls and provide usage controls or logs. It does not train or run the model and does not supply agent tools or permission checks.
- **Application / workflow runtime:** Hosts the user-facing product and server-side work such as APIs, queues and scheduled jobs. An app can call a hosted model API without hosting model weights or a GPU.

| Layer | Options | What changes |
| --- | --- | --- |
| Coding agent | Cursor, Kilo Code, Cline, OpenCode | Editing/review workflow, integrations, control and provider choice |
| Model access | Direct provider API; hosted open-weight model; local model | Provider terms and latency, or responsibility for hardware and operations |
| Gateway | Direct API; OpenRouter, Vercel AI Gateway or Cloudflare AI Gateway; self-hosted LiteLLM | Simple direct access versus centralized routing and usage controls; a gateway adds another service and data-processing relationship |
| Inference runtime | Provider-managed; Ollama; vLLM | Provider-managed serving, local experiments or custom model serving |
| Compute | Your computer; Modal; RunPod | Local resource limits versus managed GPU options and cloud costs |
| App/workflow hosting | Existing app host and workflow service | Where the product and jobs run, separately from model inference |

**Why GPU memory matters:** Model weights and temporary inference data need memory. A model that does not fit may not run, or may need a smaller/quantized version, slower offloading or a different machine. Cloud GPU access adds capacity, setup and usage cost.

Kilo Code, Cline and OpenCode are coding-agent alternatives. Ollama is a local model runtime; vLLM is an inference-serving engine; LiteLLM can act as a self-hosted gateway. OpenRouter, Vercel AI Gateway and Cloudflare AI Gateway are hosted gateway options. Modal and RunPod supply managed compute. These tools solve different problems, and open-source agent software does not make model or compute usage free.

**A simple way to choose:**
1. Start with the current Cursor workflow and an approved hosted model.
2. To compare agents, repeat one synthetic, non-sensitive task in Kilo, Cline or OpenCode. Hold model/provider, prompt, permissions and tests constant.
3. To compare models, hold agent and task constant, then vary one model/provider.
4. Try local inference only when there is a learning goal; start with a supported small model in Ollama on your own computer.
5. Try Modal or RunPod when you need cloud GPU capacity or repeatable hosted inference. Compare observed cost and setup effort with a hosted API.

Record the task, model/provider as shown, agent, permissions, test results, corrections, time and observed cost. If several layers change, call it a **stack comparison** instead of attributing the result to one tool. Do not use production data, credentials or unapproved paid calls.

**Quick check:** Kilo edits a project, a Claude API generates code, LiteLLM routes calls, and Modal hosts a custom GPU inference function. Which is which? **Answer:** Kilo is the agent/harness, Claude is the model/provider, LiteLLM is the gateway and Modal supplies compute. Your app and workflow service are another layer.

Product and technology references checked **2026-10-18**: [Kilo Code](https://kilo.ai/code), [Kilo provider options](https://kilo.ai/docs/ai-providers), [Kilo open-source FAQ](https://kilo.ai/docs/getting-started/faq/general), [Cline](https://cline.bot/), [OpenCode](https://opencode.ai/docs/), [Hugging Face: open models](https://huggingface.co/docs/hub/en/open), [OpenRouter model catalog](https://openrouter.ai/docs/api/api-reference/models/get-models), [Vercel AI Gateway](https://vercel.com/ai-gateway), [Cloudflare AI Gateway](https://developers.cloudflare.com/ai-gateway/), [LiteLLM proxy](https://docs.litellm.ai/docs/), [Ollama](https://ollama.com/), [vLLM docs](https://docs.vllm.ai/en/latest/), [Modal functions and GPUs](https://modal.com/docs/guide/functions), [Modal pricing](https://modal.com/pricing), and [RunPod GPU options](https://www.runpod.io/pricing). These sources support product descriptions, not performance rankings; recheck current capabilities, licenses and prices before adoption.

## 4. Example: a portfolio code change

**Objective:** Improve a fictional Academy mobile navigation component without changing production.

1. **Intake:** Read the repository's `AGENTS.md`, relevant PRD, current code, outstanding issue and existing PRs.
2. **Scope:** Identify affected files and acceptance criteria, including keyboard access and 320px layout.
3. **Execute:** Use a feature branch; allow read, scoped edit, lint and test tools. Do not grant secret access.
4. **Observe:** Read actual tool output; a generated statement saying "tests pass" is not test evidence.
5. **Verify:** Run relevant automated checks and label manual accessibility tests **not tested** if no human performed them.
6. **Review:** Create a PR containing changed files, test commands/results, known gaps and source references.
7. **Stop:** Require human review before merge or deploy. Confirm deployment independently afterward.

This illustrates your existing repository's documented execution contract rather than claiming that all these controls are presently enforced in every tool. [5]

## 5. The failure modes worth recognizing

| Failure | Why it matters | Better control |
| --- | --- | --- |
| Prompt injection in retrieved content | Untrusted documents can attempt to redirect tool use | Treat retrieved text as data; validate allowed actions |
| Excessive tool permissions | A writing task can accidentally mutate production | Least privilege, scoped identities and explicit approvals |
| Context saturation | Important constraints disappear from working context | Summarization, durable task state and retrieval |
| Unverified completion | Agent claims tests ran when they did not | Capture exact commands, output, commits and CI results |
| Unbounded loops | Cost and actions grow without progress | Step/time/budget caps and stop conditions |
| Parallel agent conflicts | Agents edit overlapping branches or assumptions | Isolated worktrees and explicit ownership |
| Sensitive data leakage | Logs or prompts may contain credentials/customer data | Data classification, redaction and restricted tool access |

For example, LangChain warns that giving an agent access to real filesystem paths may also expose readable secrets and recommends restricted or sandboxed backends. [3] Safeguards should be tested, not only described.

## 6. When do you actually need a harness?

Use a simple prompt for a one-time explanation. Use a scripted workflow for predictable data movement or transformations. Use a bounded agent for a task that needs dynamic choices, such as finding a bug. Invest in a fuller harness when the task needs multiple tool calls, retries, authorization boundaries, evaluations, durable state and audit evidence.

Start with **one agent plus a few carefully constrained tools**. Introduce subagents only when tasks are truly separable or isolation materially improves context and responsibility. More agents can add orchestration complexity and cost without better results.

## 7. Practice lab: design an evidence-first research agent

**Scenario:** Research a fictional security vendor and prepare a source-backed brief for an enterprise sales meeting.

Write down:
1. **Inputs:** public vendor documentation and approved public repositories only.
2. **Allowed tools:** search/read webpages, save citations to an isolated draft, run source-quality checks.
3. **Prohibited actions:** send emails, modify CRM, access employer/customer files or publish an unreviewed claim.
4. **Decision rule:** separate verified product capabilities, vendor claims, assumptions and unknowns.
5. **Evidence:** primary URLs, titles, access dates, relevant quotes/short paraphrases, freshness and uncertainty.
6. **Review:** a human approves the brief and any outreach before use.

**Reflection:** Should the agent be allowed to claim that a product supports a capability simply because a competitor comparison blog suggests it? **No.** Seek vendor docs or a reproducible demonstration, otherwise label the claim unverified.

## 8. Knowledge check

**Q1:** Is `AGENTS.md` itself a harness?  
**Answer:** No. It is reusable instruction material that a harness or agent tool may load.

**Q2:** Does successful local lint prove the deployed app works?  
**Answer:** No. CI, review, merge, deployment and real user journeys are separate evidence gates.

**Q3:** Must a harness use multiple agents?  
**Answer:** No. One agent can use a rich harness.

**Q4:** Can a tool permission be enforced by telling the model “please don't”?  
**Answer:** Not reliably. Boundaries must also be enforced by tool authorization, sandboxing or the application's control plane.

**Q5:** What would make an agent evaluation useful?  
**Answer:** A repeatable task set with observed outcomes, failure categories and reproducible evidence, not invented percentages.

## 9. Apply this to the portfolio ecosystem

- **Technical Docs Platform:** keeps the shared operational execution contract, model-selection guidance and review standards. Link to it; don't copy private policy into public educational material.
- **GitHub + CI:** owns change diffs and verifiable test/review evidence.
- **Linear:** owns committed work status and acceptance criteria when tracking is warranted.
- **Academy:** teaches concepts with exercises; it is not itself a production execution harness.
- **Portfolio Operations Board:** can display evidence and readiness but must not invent CI results or deployment status.

**Suggested next exercise:** Compare a static research checklist, a one-agent research workflow and a multi-agent research workflow against the same fictional task. Record accuracy, source coverage, review interventions and cost with actual measurements only.

## Recommended reading sequence

Mastra positions its two agent books as a progression: *Principles of Building AI Agents* covers the fundamentals, and *Patterns of Building AI Agents* builds on it with practical guidance for taking agents from prototype to production. Mastra recommends starting with *Principles* before reading *Patterns*. [6][7]

For this Academy path:

1. **Start with Principles.** Build familiarity with agents, tools, memory, workflows, RAG, MCP, multi-agent systems, evaluations and observability. [6]
2. **Use this guide as the bridge.** Connect those building blocks to a bounded execution loop, permissions, verification, recovery and human review.
3. **Then read Patterns.** Go deeper on agent architecture, context engineering, evaluation workflows and security practices such as sandboxing and access controls. [7]

The bridge placement is this Academy's teaching recommendation; Mastra specifically establishes the order of its two books.

## Authoritative references

1. [OpenAI, Agents SDK overview](https://developers.openai.com/api/docs/guides/agents/sdk) — SDK responsibilities, runtime, tools, human review and evaluations.
2. [LangChain, Deep Agents overview](https://www.langchain.com/deep-agents) — explicitly defined open-source harness and capabilities.
3. [LangChain, filesystem middleware reference](https://reference.langchain.com/python/deepagents/middleware/filesystem) — filesystem permissions, backend choices and security caveats.
4. [OpenAI, Agents documentation](https://openai.github.io/openai-agents-python/agents/) — agent definitions, runners and orchestration boundaries.
5. [Technical Docs Platform, agent execution contract](https://github.com/heyfunwhoa/technical-docs-platform/blob/main/ai/agent-harness/execution-contract.md) — linked operational reference; access and adoption may vary. Do not reproduce private contents publicly.
6. [Mastra, Principles of Building AI Agents](https://mastra.ai/books/principles-of-building-ai-agents) — fundamentals including agents, memory, workflows, RAG, tools, MCP, evaluations and observability; checked 2026-10-17.
7. [Mastra, Patterns of Building AI Agents](https://mastra.ai/books/patterns-of-building-ai-agents) — states that Patterns builds on Principles, recommends reading Principles first, and describes production patterns for architecture, context engineering, evaluation and security; checked 2026-10-17.

**Editorial review triggers:** Changes to SDK semantics, sandbox permissions, agent orchestration defaults, policy gates, or repository publishing architecture. Verify cited reference pages again before promotion into the live Academy catalog.

**Publishing note:** This Markdown companion guide alone does not register a lesson card in `lib/ai-academy.ts` or publish the site. A separate reviewed lesson/UI change is required if an interactive Academy card is desired.
