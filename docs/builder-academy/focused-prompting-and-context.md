# Prompting with a clear outcome: bad, okay and best examples

**Track:** Builder Academy → AI-assisted development  
**Level:** Beginner · **Study budget:** 15–20 minutes  
**Status:** Draft companion; this Markdown file does not add a live Academy lesson or scoring UI  
**Owner:** Portfolio maintainer · **Reviewed:** 2026-10-13  
**Classification:** Public-safe, original synthetic examples  
**Prerequisite:** [Cursor workflow basics](cursor-agent-workflows.md)  
**Outcome:** Choose the smallest sufficient prompt and write an assignment with an observable finish.

## 1. What these levels mean

“Bad” means weak for the intended task, not that the person is bad at prompting. An open question can be excellent brainstorming. “Best” means fit for this situation, not longest or universally best.

| Quality | What it gives the assistant | Main risk |
| --- | --- | --- |
| Bad / underspecified | A broad wish with no endpoint | Agent must guess scope or repeatedly investigate |
| Okay / usable | A task and some context | Missing acceptance criteria or boundaries cause follow-ups |
| Best / fit for purpose | Enough context, permissions and evidence to finish | Still needs actual verification; no guarantee |

A prompt is the assignment. Context is what the model receives, including retrieved files and tool results. A token is a unit of model text processing; the words typed by the user are only part of an agent task. This lesson does not diagnose an account's usage or claim exact billing behavior.

## 2. Choose the work level first

These are teaching categories, not product modes or model settings.

| Work level | Use when | Enough to include | Expected result |
| --- | --- | --- | --- |
| Explain | You want to understand one concept | Topic, your context, desired depth | Explanation and one useful example |
| Inspect / decide | You need evidence or a choice | Decision, relevant sources, read-only scope | Findings, unknowns, recommendation |
| Implement | The desired behavior is clear | Owning repo/issue, constraints, done criteria | Change plus verification and PR |
| Coordinate | Several owners or dependencies exist | Work owners, issue/PR links, dependency boundaries | Ready/blocked/next handoffs |

Use a separate planning step when ambiguity warrants it. A typo does not need a PRD. You do not have to complete every level for every task.

## 3. Explicit examples

All requests below are illustrative. Replace bracketed references with real links; none assert current project state.

### A. Learn one concept

**Bad:** “Explain everything about databases.”

**Okay:** “Explain idempotency.”

**Best:** “Explain idempotency using a fictional crawler that retries saving the same page. Give one duplicate-record failure and how we would verify the fix, in about 200 words. No repo inspection needed.”

**Why:** the example and depth are clear. If the question is about the actual implementation, explicitly request the relevant function and tests instead; conceptual teaching is not verification.

### B. Find the next action

**Bad:** “Audit all my projects again and tell me what next.”

**Okay:** “What remains on the research persistence issue?”

**Best:** “Read [issue] and its latest checkpoint. Compare the recorded PR revision with the current head and required checks. Report only changes, blockers and the next action. Expand to other repos only if a concrete dependency requires it. Do not edit code.”

**Why:** freshness is verified without making a local status question a portfolio-wide audit.

### C. Implement a defined behavior

**Bad:** “Finish the research engine.”

**Okay:** “Make crawl retries safe.”

**Best:** “In [repo], implement the remaining retry criterion in [issue]. Read repo instructions and relevant code/tests; check for an overlapping PR. A retry of the same source/version must not create duplicate records, and recovery must preserve original source references. Use synthetic fixtures and existing persistence paths. Run required checks, open or update the PR, and record evidence in the issue. No new collector, paid crawl, merge or deployment.”

**Why:** the agent has a behavior, boundary and finish. The repo's actual requirements govern the implementation; this prompt is a fictional task, not a claim about deployed behavior.

### D. Debug a failure

**Bad:** “CI is broken. Fix everything.”

**Okay:** “Fix the failed visual check on [PR].”

**Best:** “Inspect the failed visual job for the current head of [PR], then the relevant diff. Determine whether it is a regression, intended change or environment failure. Fix the cause or report the blocker. Do not accept new snapshots just to make CI green. Run applicable checks and report the tested revision.”

**Why:** evidence guides the repair. A screenshot update is not automatically the right fix.

### E. Review completed work

**Bad:** “Does this look good?”

**Okay:** “Review [PR] for bugs.”

**Best:** “Read [issue], the latest [PR] diff and required checks. Review acceptance criteria, data integrity and regressions. Return actionable findings with file references and evidence, or state no findings with coverage limits. Read-only; do not redesign adjacent features.”

**Why:** the reviewer assesses actual work against the agreed outcome. No findings is not proof that no bugs exist.

### F. Explore an uncertain idea

**Bad:** “Build a CRM and connect everything.”

**Okay:** “Help me plan a CRM experiment.”

**Best:** “Help define one fictional account-to-opportunity workflow for a solo seller. Compare adapting an existing CRM with building a small prototype. Identify assumptions and up to three questions that would change the decision. Return one recommended pilot and success criteria. Do not implement or connect accounts yet.”

**Why:** exploration is bounded without pretending the requirements are already settled. Current product capabilities or prices require current sources.

### G. Research a company

**Bad:** “Research this company and update all my repos.”

**Okay:** “Summarize its product and buyers.”

**Best:** “Using [two public source URLs], explain the product, stated target buyers and one supported use case. Separate sourced claims, interpretation and unknowns. Cite original sources. Draft a candidate note for [owning repo/path]; do not infer buying intent or propagate unreviewed claims to other repos.”

**Why:** source selection, interpretation and publication are separate decisions. Private interview facts stay outside public artifacts.

### H. Coordinate two workstreams

**Bad:** “Have several agents work on everything.”

**Okay:** “Check the Academy and Market Map work.”

**Best:** “Review checkpoints for [Academy issue/PR] and [Market Map issue/PR]. Other chats own implementation. Identify dependencies, overlapping files and stale evidence. Return a ready/blocked/next queue with one action per owner. Do not edit application files or start duplicate workers.”

**Why:** coordination checks interfaces and ownership. More agents may finish independent work sooner but can repeat context gathering.

## 4. Walk one task through to completion

Synthetic scenario: a learning app's save-error message is unclear.

1. **Choose outcome:** a learner can understand a failed save and retry without losing the draft.
2. **Investigate only if needed:** locate the editor, existing error state and tests. Do not audit every lesson.
3. **Give the build brief:** preserve lesson IDs and storage behavior, improve the message, verify failure/retry and draft retention.
4. **Ask a focused learning question:** “Explain why a friendly message alone doesn't prove retry safety.”
5. **Review the actual change:** inspect diff and relevant checks. Record any missing browser verification.
6. **Handoff:** issue, PR/head, verified criteria, remaining work and next action.
7. **Keep new ideas separate:** an autosave redesign belongs in the backlog unless it is required to fix this task.

This is a proposed practice exercise; no result or savings is claimed.

## 5. A reusable assignment

```text
Outcome:
Owning repo / issue / relevant source:
Current checkpoint, if any:
Scope and non-goals:
Done when:
Permitted actions / approval boundaries:
Deliverable:

Inspect relevant evidence and expand for concrete dependencies.
Complete authorized work and required checks.
Record adjacent ideas separately.
Finish with result, evidence, blockers and next action.
```

For a small question, simply ask the question. For a new chat, provide a compact handoff rather than an entire old transcript. Continue the same chat while it remains the same problem.

## 6. Practice and answer key

Rewrite: “Everything is broken; inspect all my repos and make it better.”

**Possible answer:** “In [repo], the lesson editor loses the draft after a failed save. Inspect [reproduction/issue] and relevant editor tests. Reproduce with synthetic data, fix draft retention, verify retry behavior, and open a PR with evidence. Preserve the storage schema; report if the fix requires changing it.”

**Self-check:** Can you identify the outcome, source, boundary, completion evidence and permission? Did you avoid inventing current state? Can the task end?

A prompt's length or a keyword checklist is not a quality score. The existing prompting journey uses a heuristic completeness check; it does not measure token efficiency, factual accuracy or task success.

## 7. What to do on your next task

Choose one deliverable, provide its evidence links, then let the agent finish within scope. Use focused teaching questions as needed. Ask for a checkpoint when pausing. Measure actual completion and rework; record usage only if available. Do not omit required tests to reduce consumption.

## Sources and limits

OpenAI recommends clear goals, relevant context, constraints and completion criteria, concise reusable repo guidance, and one chat per coherent outcome.[1] The levels, synthetic examples, exercise and workflow above are original instructional recommendations, not a validated model ranking or measured savings study. No fixed model, plan allowance or billing rate is prescribed.

[1]: https://learn.chatgpt.com/guides/best-practices "OpenAI, Best practices; reviewed 2026-10-13, unversioned web guidance"
