# How AI agents become engineers — Builder Academy companion

**Status:** Proposed public educational lesson; not released in Academy navigation. **Reviewed:** 2026-10-14. Fictional scenarios only.

## Goal
Explain the difference between a human forward-deployed engineer (FDE), an AI agent that investigates security events, and an AI-based engineer that designs and supervises other agents. Learn why a foundation model, security tools, agent permissions, state, and operational quality checks are distinct system components.

## The analogy
A human FDE is like a technical field architect who works alongside a customer until a complex system solves a real problem. An AI investigator is a specialist handling one well-defined task. An AI FDE is closer to a builder and shift supervisor: it plans, configures specialists, checks the work and asks a person for approval when the risk is high.

## What is inside an agent system?
A **model** interprets instructions and evidence; **tools** fetch information and perform authorized actions; a **runtime** executes and tracks the work; **memory/state** persists facts between sessions; **policy enforcement** restricts tools independently of what the model asks; **evaluation** tests output quality. A vendor's BYOK option means the customer brings supported model credentials—not that every LLM works with every agent architecture.

## Five takeaways
1. Human FDEs deliver customer-specific integrations and production solutions; FDE is a role, not an algorithm.
2. An AI SOC investigator carries out a task; an AI FDE may configure and supervise investigation workflows.
3. A prompt is not a permission boundary. API-scoped authorization and human approvals protect sensitive actions.
4. Deterministic filters may be cheaper and more reliable for simple event handling; use reasoning where it adds value.
5. Total cost includes model inference, hosting/runtime, security platform consumption, engineering review and incident risk.

## Diagram exercise (fictional)
A fictional MSSP protects three customers. It wants to investigate suspicious privileged logins and prepare a response recommendation, with human signoff before disabling an account.

Draw five labeled nodes: **SOC lead → AI FDE planner → rule + worker investigator → security data/tools → human approver**. Mark three trust boundaries: customer-tenant isolation; scoped credentials; permission to execute a disruptive response. Add a separate cost meter for the LLM provider and platform runtime.

## Knowledge check
**Question:** The investigator's prompt says “you may disable accounts.” What must happen before it can actually disable a real account?
- A. Nothing else; the prompt is a sufficient authorization.
- B. Independently enforced tool permissions and any required human approval.
- C. It only needs a larger model.

**Answer:** B. Behavioral instructions cannot replace enforced permissions and approvals.

## Reflection
When would it be better to hire a human FDE, use a scripted workflow, or apply an AI FDE? Identify the tradeoffs in repeatability, customer specificity, security risk and budget.

## Public reading
- [Palantir: Forward Deployed Software Engineer role](https://jobs.lever.co/palantir/96a0ce26-cf84-4fa8-934b-acc4363620b2) — human-role example, availability of posting may change.
- [LimaCharlie: Grid AI FDE](https://docs.limacharlie.io/9-ai-sessions/grid/) — vendor-described product example, not independent validation.
- [LimaCharlie: AI Sessions architecture](https://docs.limacharlie.io/9-ai-sessions/architecture/) — runtime/credential architecture.
- [OWASP: LLM Top 10](https://genai.owasp.org/llm-top-10/) — security risks.
- [NIST AI RMF](https://www.nist.gov/itl/ai-risk-management-framework) — evaluation and governance.

## Publication acceptance gates (not completed)
Editorial review of sources and accessibility; choose existing lesson type and navigation route; assess interaction/progress checks with existing tests; protect private data; verify build/lint/unit/browser checks and published content. The portfolio has open Academy lesson-registry PRs, so do not alter the registry or imply this guide is live until those overlaps are reconciled.
