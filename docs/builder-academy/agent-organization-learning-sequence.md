# From model choice to organized agent work

Status: proposed follow-on curriculum, not a deployed agent system or completed interactive lesson. Sources checked 2026-10-13. Begin with [model selection](evaluate-ai-models.md).

## Learning sequence

| Lesson | Observable outcome | Exercise artifact |
| --- | --- | --- |
| 1. Prompt, skill, workflow or agent? | Choose the simplest suitable approach | Decision for a synthetic research task |
| 2. Give one agent a bounded job | Define inputs, tools, output and stop conditions | One-page task brief |
| 3. Organize multiple workers | Identify independent work and shared dependencies | Ownership table and handoff |
| 4. Evaluate the whole workflow | Find a failure even when each output looks plausible | Trace review against an answer key |
| 5. Choose an implementation framework | Compare persistence, retries, permissions and observability needs | Small proof-of-concept plan with exit criteria |

No SDK is selected yet. An organizational framework is a way to allocate work; a software framework implements mechanics. Choose mechanics only after the task needs are explicit.

## Pattern selection

Anthropic distinguishes predefined workflows from agents that choose their next steps, and recommends adding complexity only when needed [1]. This table applies that guidance to fictional learning cases:

| Pattern | Example | Test before adopting |
| --- | --- | --- |
| One prompt | Rewrite approved copy | Facts and requested voice retained |
| Fixed workflow | Extract → validate → draft | Failure at validation blocks drafting |
| Router | Direct extraction versus comparison requests | Misrouting and unknown task handling |
| Parallel workers | Research separate public vendors | Each returns source evidence; one synthesis owner |
| Single agent loop | Investigate a bug using bounded tools | Reproduction, step limit, stopping behavior |
| Coordinator and workers | Broad research with separable questions | Duplication, omissions, cost and integration failures |

A longer task does not automatically require multiple agents. Anthropic's research-system report describes benefits and substantial token overhead in its own environment [2]; this is an engineering case study, not proof of improvement for every coding or research task.

## Proposed task brief for the practice lab

- **Goal:** Compare three fictional vendors using supplied evidence.
- **Input boundary:** Public-style synthetic passages only; no personal/employer data.
- **Owner:** One coordinator owns scope and final synthesis.
- **Workers:** Each owns one vendor's evidence table; no shared-file edits.
- **Output:** Claim, source passage, date, uncertainty and unresolved questions.
- **Reviewer:** Check against source passages and rubric, not worker confidence.
- **Limits:** Fixed task count and explicit time/token budget where measurable; stop on missing authorization or exhausted budget.
- **Handoff:** Task ID, artifact location/version, checks actually run, failures and next action.
- **Completion:** Human accepts the artifact; no publishing, sending or production mutation in this exercise.

This brief is an instructional recommendation, not a validated organizational standard. Test it against a single-worker baseline. Measure accepted claims, omissions, conflicting edits, elapsed time, total usage and human repair effort. Keep failed runs visible. A reviewer may share the same blind spots as the writer; model agreement is not ground truth.

**Failure exercise:** Two workers edit the same comparison file while a third uses an outdated source. Ask the learner to assign separate ownership, preserve source dates, reconcile conflicting claims and rerun verification on the final artifact. Passing requires identifying both the edit collision and freshness problem; merely adding another reviewer is insufficient.

## Why these methods, and how strong is the evidence?

| Method | Supporting source | Evidence limit |
| --- | --- | --- |
| Start simple; distinguish fixed workflows from adaptive loops | [1], provider engineering guidance | Not a randomized comparison across all tasks |
| Delegate independent research with clear objectives and outputs | [2], provider implementation report | Results depend on task, models, tools and evaluation design |
| Compare the whole system with a simpler baseline | Academy instructional synthesis | Requires actual local measurements before adoption |
| Use one artifact owner and explicit handoffs | Academy instructional synthesis | A practical coordination hypothesis, not a guaranteed performance gain |

1. [Anthropic — Building effective agents](https://www.anthropic.com/engineering/building-effective-agents)
2. [Anthropic — How we built our multi-agent research system](https://www.anthropic.com/engineering/multi-agent-research-system)

Publication follow-up: coordinate with the current Academy editor/schema owner; reuse existing lessons and assessment boundaries. Each later lesson needs its own example, pitfall, practice, answer key and reviewed primary sources. Do not claim these planned exercises are already available in the app.
