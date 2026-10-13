# Builder Academy — Cursor: from first prompt to verified pull request

**Track:** Builder Academy → AI-assisted development  
**Level:** Beginner → intermediate · **Estimated time:** 30–45 minutes  
**Status:** Draft lesson; publishing in GitHub does not mean it is available in the Academy UI  
**Product references checked:** 2026-10-11  
**Prerequisites:** [From idea to verified release](idea-to-verified-release.md), [development workflow](../development-workflow.md)  
**Learning outcome:** Given a small software task, choose the appropriate Cursor mode, define repository and permission boundaries, write a testable prompt, recognize a reusable rule, and review implementation evidence.

## 1. The mental model

Think of **Cursor** as a development workshop, a **repository** as one project's files and history, a **workspace** as the folders opened in the workshop, and an **agent** as an AI collaborator that can inspect, explain, and—when authorized—modify code.

A **model** generates the agent's reasoning and text; a **tool** lets it read files, run commands, or edit; a **prompt** is a task-specific instruction; a **rule** is persistent reusable guidance; **context** is the information the agent actually receives. An agent does not automatically know every repository you own.

**Git is not GitHub.** Git tracks local commits and branches; GitHub hosts repositories and pull requests. **Cursor is not the production deployment.** Finishing an agent chat is not proof that a PR merged, checks passed, or a release deployed.

## 2. Start with a good prompt

A useful assignment contains **goal + context + scope + constraints + expected output + verification**.

**Weak:** “Fix the revenue app.”

**Better:** “In a fictional revenue-planning app, inspect the existing ARR calculation, identify whether a fractional player-coach is counted twice, and explain the evidence. Do not edit files yet. Return relevant file paths, a proposed fix, edge cases, and tests needed.”

**Build prompt (after planning):** “Implement the approved fix on an isolated branch. Preserve the existing ARR formula, add tests for zero starting AEs and a 45% player-coach, run available checks, and report the changed files and limitations. Do not merge or deploy.”

Ask for clarification when product behavior is genuinely ambiguous; require the agent to mark facts, assumptions, and unverified claims separately. Longer prompts are not automatically better.

### Prompt, rule, skill, or PRD?

| Artifact | Use it when | Example |
| --- | --- | --- |
| **Prompt** | One assignment or question | “Plan a CAC payback lesson.” |
| **User rule** | A personal preference applies across projects | “Explain unfamiliar technical terms plainly.” |
| **Project rule** | A project invariant must recur | “Do not combine ARR and cash collections.” |
| **Skill** | A repeatable, multi-step workflow needs instructions and checks | “Review educational content with sources, lab and assessment.” |
| **PRD** | Product requirements must survive beyond one chat | “Financial planning goals, users, FRs and acceptance criteria.” |
| **Linear issue** | Track a bounded deliverable, priority, blocker and completion | “Add CAC payback formula tests.” |

Project rules live in `.cursor/rules/*.mdc` and can be scoped to file patterns. User rules live in Cursor settings. `AGENTS.md` is a lightweight alternative for repository instructions. Prefer concise rules referencing the canonical standard to pasting large duplicate policies. Never assume rules alone technically enforce security or quality. [Cursor Rules](https://cursor.com/docs/rules)

**Practice:** Classify these instructions: “Always preserve synthetic-data boundaries”; “Explain our ARR pipeline implementation”; “Create a unit test for the onboarding flow.” Answer: project rule, Ask prompt, Agent task.

## 3. Choosing Cursor's modes

| Mode or workflow | What it does | When to choose it | Important caveat |
| --- | --- | --- | --- |
| **Ask** | Read-only exploration | Learn code, trace a calculation, check what exists | It explains; it does not implement |
| **Plan** | Investigates, proposes a reviewable implementation plan | Multi-file features, ambiguous requirements, architecture | Review the plan before clicking Build |
| **Agent** | Can edit files, run commands and implement | A scoped change with acceptance criteria | Review diffs, commands and test evidence |
| **Debug** | Investigates bugs using hypotheses and runtime evidence | Intermittent failures, race conditions, tricky regressions | Reproduce the bug; remove temporary instrumentation |
| **Multitask** | Runs parallel asynchronous subtasks or agents | Several *independent* tasks | Do not parallelize work with unresolved dependencies |
| **Cloud/background agent** | Runs in a remote isolated environment | Well-specified delegated changes | Validate branch, secrets, environment and PR yourself |
| **Design Mode** | Lets you point to visual UI elements while editing | Targeting layout or component changes | Inspect responsive states and underlying code |

In the Cursor editor, the mode picker or Shift+Tab cycles among available modes. The `/multitask` workflow is available in the Agents Window; **Build in Parallel** can parallelize independent steps from a plan. UI labels and availability depend on the installed Cursor version and setup. [Plan](https://prod.cursor.com/docs/agent/plan-mode) · [Debug](https://prod.cursor.com/docs/agent/debug-mode) · [Multi-agent](https://prod.cursor.com/help/ai-features/multi-agent) · [Design](https://prod.cursor.com/docs/agent/design-mode)

**Decision examples:**
- “Where does this revenue total come from?” → Ask.
- “Should finance planning be a new module?” → Plan.
- “Implement approved finance tests.” → Agent.
- “This total changes on refresh and nobody knows why.” → Debug.
- “Write independent documentation and audit an unrelated UI component.” → Multitask, preferably separate worktrees.
- “Make this specific mobile menu collapse.” → Design Mode or Agent after locating the component.

**Practice:** An ARR number is incorrect only after a rapid sequence of edits. Which mode? **Debug**, because reproducing and observing the timing matters.

## 4. One repo (A) versus several repos (B)

### A. One active repository — default for building

Open only the repo whose files you intend to change. Example: `gtm-revenue-os`. Read its PRD and local rules; create a focused branch. Reference other approved sources through links or explicitly supplied context.

**Benefits:** smaller scope, simpler Git operations, less accidental modification, clearer PR.  
**Trade-off:** the agent may not be able to inspect authoritative documents in other repositories. A URL reference does not automatically grant access.

### B. Multi-root workspace — for cross-repo analysis

Open `gtm-revenue-os`, `joy-index`, and `technical-docs-platform` together **only when access is authorized and genuinely needed**. Declare which is writable and which are read-only:

> Writable: gtm-revenue-os. References only: joy-index, technical-docs-platform. Never copy or publish personal notes. If the source isn't readable, report that; don't invent a replacement standard.

**Benefits:** richer comparisons, no need to copy source material.  
**Trade-offs:** more context, more permission risk, greater chance of modifying the wrong repo. Git status, branches and PRs remain **per repository**, even if Cursor displays them in one workspace.

Multi-root workspaces and isolated worktrees are distinct. A **worktree** is a separate checkout of the *same* repository for parallel branch work; it is not a separate project. [Cursor 3.2 changelog](https://cursor.com/changelog/04-24-26)

**Best practice:** choose A for most Linear issues; use B for standards audits or coordinated interfaces; run separate reviewed PRs per repository when multiple repositories really need changes.

## 5. Rules and reusable project guidance

Put **invariants** in rules: source of truth, security boundaries, testing expectations, naming conventions. Put **one-time outcomes** in prompts: specific formula, exact screen, requested report.

Example project rule content:

```md
---
description: Revenue-model integrity
globs: lib/finance/**,lib/leadership/**
alwaysApply: false
---
- Preserve the canonical ARR bridge and named-seller capacity model.
- Do not double-count seller capacity or confuse ARR, bookings, recognized revenue and cash.
- Use fictional data and deterministic fixtures.
- Add relevant tests and report actual results, not assumed passing checks.
- Reference the canonical product PRD; do not create a second PRD.
```

Review the rule's scope so it applies to the files you expect. Use `/create-rule` or Cursor's Rules UI rather than manually inventing an incompatible rule format. Keep sensitive context outside public or shared rules.

## 6. A safe end-to-end workflow

1. **Discover:** open the owning repo; use Ask to understand the relevant files and current behavior.
2. **Plan:** create a scoped plan for substantial work; identify existing tests, dependencies, security boundaries and what “Done” means.
3. **Choose branch/worktree:** inspect `git status`; protect unfinished work; reuse an existing branch/PR when appropriate.
4. **Implement:** switch to Agent; request one small vertical slice, with tests and source links.
5. **Verify:** inspect the diff; run applicable tests, typecheck, lint, build, and manual user journey checks; record commands that could not run.
6. **Review:** push a branch and inspect one cohesive GitHub PR. Don't confuse successful local tests with passing CI.
7. **Deliver:** merge only when required checks and review gates pass. Confirm deployment independently if relevant.
8. **Close and learn:** attach evidence to the Linear issue; use private JoyIndex for personal reflections.

Never approve destructive commands, credential exposure, production data changes, permissions expansion, or automated merging merely because an agent suggested them. Configure approvals and file-read boundaries deliberately. [Cursor read access controls](https://cursor.com/docs/agent/security/run-modes)

## 7. When to multitask—and when not to

**Good parallel tasks:** independent documentation lesson, isolated accessibility audit, independent test-fixture review. Use separate worktrees/branches and bring changes together through review.

**Bad parallel tasks:** one agent changes a database schema while another assumes the old schema; multiple agents edit the same finance engine; one creates a PRD while another implements unapproved assumptions.

Multitasking increases throughput, not correctness. The parent task still needs dependency sequencing, integration tests, and human review.

## 8. Other Cursor capabilities worth learning next

- **Context selection:** reference specific files, errors, and requirements; inspect what an agent actually read. Avoid dumping unrelated repos or personal notes into one conversation.
- **Terminal:** learn `git status`, `git diff`, `npm test`, `npm run lint`, `npm run build`. Reading command output is a core engineering skill.
- **Checkpoints and revert:** know how to inspect and reverse agent edits without deleting unrelated local work; Git commits remain the durable history.
- **Code review:** read changed lines, check tests and ownership, challenge plausible-looking but wrong AI output.
- **MCP/connectors:** optional tools for Linear, GitHub and docs; grant least-privilege access and verify actual authorization. MCP integration does not make results trustworthy by itself.
- **Cloud versus local:** local agent uses your working environment; cloud agents use their own environment and may require distinct secrets, dependencies and approvals.
- **Cost/context discipline:** fresh conversation for a distinct task, concise scoped instructions, summarize important decisions into docs, keep a stable PRD rather than relying on chat memory.
- **Design and browser review:** inspect mobile layout, focus, keyboard behavior, reduced motion, empty and error states rather than approving a screenshot alone.

## 9. Guided lab — Revenue OS, with synthetic data

**Scenario:** A fictional cybersecurity startup has a Head of Sales who spends 45% of their time selling. The annual fully productive quota is $800,000 and expected attainment is 70%. Expected annual selling capacity is **$252,000** (800,000 × 0.70 × 0.45). This is a capacity exercise, not verified bookings or cash.

**Round 1 — Ask:** “Trace the function that calculates player-coach capacity. Explain inputs, assumptions, and where tests live. Do not change files.”

**Round 2 — Plan:** “Design tests preventing double counting between a named seller roster and aggregate AE headcount. Describe expected results and missing coverage. No code changes yet.”

**Round 3 — Agent:** “Implement the approved test-only slice on a branch. Run relevant checks. Report diff and results. Do not merge.”

**Round 4 — Review:** Explain why a passing unit test alone doesn't establish that an actual customer's revenue forecast is correct.

### Knowledge check

1. You need an explanation without edits: **Ask**.
2. You need to design a cross-module feature: **Plan**.
3. You have a hard-to-reproduce issue needing runtime logs: **Debug**.
4. You want repeated privacy boundaries applied to every relevant assignment: **Project rule**.
5. You have independent tasks that can run in isolated worktrees: **Multitask**.
6. A local agent says “Done” but GitHub Actions is still running: **Not release-verified**.

**Completion evidence:** learner can select the mode for three scenarios, write one bounded prompt, identify one invariant for a project rule, correctly explain A versus B, and identify the test/PR/CI evidence needed before declaring a feature complete.

## 10. Academy placement and maintenance

This is a **new lesson source**, not a new Academy app. Link it from [From idea to verified release](idea-to-verified-release.md) and the existing AI Foundations prompting lesson, then expose it in the current typed Academy lesson registry when UI work is approved. Do not add a second curriculum system.

Suggested follow-up labs: writing a good issue-to-Agent prompt; creating scoped rules; debugging a flaky test; reviewing an AI-generated PR; coordinating two worktrees; multi-root access and privacy; designing a responsive component in Design Mode.

**Source maintenance:** Recheck Cursor feature names, keyboard shortcuts, availability and permission behavior on a scheduled review or major release. Primary sources: [Rules](https://cursor.com/docs/rules), [Plan Mode](https://prod.cursor.com/docs/agent/plan-mode), [Debug Mode](https://prod.cursor.com/docs/agent/debug-mode), [Multi-agent](https://prod.cursor.com/help/ai-features/multi-agent), [Design Mode](https://prod.cursor.com/docs/agent/design-mode), [Agent best practices](https://cursor.com/blog/agent-best-practices), [Cursor multi-root/worktrees release](https://cursor.com/changelog/04-24-26).

## 11. Add agents to the delivery loop

**Optional extension:** 15 minutes. Start with the [SDLC and dependency basics](idea-to-verified-release.md#beginner-layer-dependencies-and-the-whole-delivery-cycle). This worked paper exercise supplements the existing lesson; it is not an implemented autonomous system or new scored assessment.

An agent combines a model with context, tools and an execution loop. The SDLC still needs requirements, version control, tests, review and release evidence. An agent's confident completion message is a claim to inspect.

### Translate the roles

| Plain language | Actual term | Responsibility |
| --- | --- | --- |
| Decide what is useful and acceptable | Product owner / human operator | Set outcome, scope, priorities and approval boundaries |
| Keep tasks in order | Coordinator / orchestrator | Track dependencies and assign ownership |
| Make a bounded change | Implementation agent / worker | Inspect the repository, edit permitted files, run relevant checks |
| Challenge the proposed result | Reviewer / verifier | Inspect actual diff and evidence; identify gaps |
| Execute repeatable checks | CI runner | Run configured jobs for identified revisions |

One person or agent can perform several roles sequentially. The role labels do not grant permissions. A second reviewer can share the writer's blind spots; agreement is not ground truth.

### One worker first; parallelize independent work

In a fictional project, worker A owns lesson editing, and worker B owns a separate vendor-comparison app. They can proceed independently if neither requires the other's unfinished interface. A coordinator reads both PRs and records blockers.

If both need to change the same lesson schema, assign one writer. Agree on the contract first, then let the consumer implement against it. Separate branches or **worktrees** isolate work in progress; they do not guarantee the eventual combined code works.

Provider guidance recommends beginning with simple workflows and adding agent complexity when justified. It distinguishes predetermined workflows from agents that choose their next steps. This is engineering guidance, not proof that multiple agents improve every task: [Anthropic — Building effective agents](https://www.anthropic.com/engineering/building-effective-agents), checked 2026-10-13.

The one-writer and handoff approach here is an instructional recommendation. Compare it with a single-worker baseline before treating it as a proven productivity gain.

### Give the worker a contract

A useful **task brief** states:

- Outcome and intended user.
- Repository, base commit and exact permitted files.
- Dependencies, non-goals and ownership of shared files.
- Acceptance criteria and how to check them.
- Allowed tools, data boundaries and actions requiring approval.
- Time/spend limits and stop conditions.
- Required handoff: PR, full head SHA, changed paths, actual check results, limitations and rollback.

Example: “In a fictional learning app, improve the existing lesson-save error message. Preserve lesson IDs and progress. Own only the named editor component and its relevant test. Stop if the fix requires a schema or permission change. Use synthetic data. Return one PR and evidence for its latest head. Do not merge or deploy.”

A written limit helps communication; technical access controls and measured budgets determine what is actually enforced. Do not assume a prompt alone prevents spending or unauthorized actions.

### Handoffs make work visible across chats

Separate chats may not share current context or unpushed edits. Use durable artifacts: issue for execution state, PR/diff for proposed changes, test runs for evidence, deployment records for what runs.

A coordinator asks:

1. Is this still the agreed task?
2. Which upstream result or permission is missing?
3. Does another worker own any changed file?
4. Do the checks cover the latest head and intended behavior?
5. What remains unverified, and who owns the next step?

**Orchestration** means coordinating these tasks. **Human-in-the-loop** means a person participates at defined decisions. Neither term implies all work is automated or safe.

### Failure exercise: three reports, one decision

Synthetic reports:

- Worker A: “Lesson editor complete. Current head B. Tests passed at A.”
- Worker B: “Comparison complete. Source service inaccessible; missing-source behavior not tested.”
- Reviewer: “Both summaries look good. Merge everything.”

Write a response and assign the next actions.

**Answer key:** A must inspect changes since A and supply relevant evidence for its current head (or any new repair head), including progress behavior if affected. B must preserve the access limitation and test a synthetic missing-source case; it must not claim the unavailable live service was verified. The reviewer must inspect actual diffs and criterion-specific evidence. Keep each issue at its supported state; release only after applicable gates and authorization. Neither more agents nor a larger model supplies missing access.

**Success rubric:** Identify stale evidence, missing coverage, unsupported approval and separate ownership. Produce one actionable handoff per worker. Do not call merely reading this exercise “passed.”

### What the human is doing

You are practicing product ownership and delivery coordination: choosing the problem, making work small enough to review, sequencing dependencies, assigning boundaries, asking for evidence and deciding whether to release. You are also learning technical vocabulary by examining concrete artifacts.

Useful questions: “What changed?” “Which version?” “What proves it?” “What is blocked?” “Is it live?” You do not need to memorize hashes. You need to connect claims to the versions and checks they describe.
