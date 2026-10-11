# Builder Academy — From idea to verified release

**Track:** Builder · **Level:** Beginner · **Time:** 15 minutes  
**Status:** Lesson source for the existing Academy lesson library. The linked Academy page is a public educational prototype; it does not expose private Linear or GitHub repositories.

## What you'll learn

Translate a business idea into a small, verified software change, using a single source of truth for each kind of information. The benefit is less context switching, less duplicate administration, and evidence-based delivery rather than declaring something done because an agent said it finished.

## A simple mental model

- **Strategy & prioritization:** Why do this before other work? Evaluate impact, urgency, dependencies, effort, and risk. Treat scoring as a decision aid; security incidents and hard deadlines override it.
- **Project:** What outcome are we pursuing?
- **Milestone:** Which meaningful checkpoint moves us toward the outcome?
- **PRD (in the product repository):** What user problem, requirements, constraints and acceptance criteria define success?
- **Linear issue:** What small deliverable is next, who owns it, and what blocks it? Keep the issue brief and link to the authoritative PRD.
- **Cursor / engineering environment:** Implement the change on a feature branch with tests.
- **GitHub:** Hold the code and PR review, plus CI/deployment evidence.
- **Verification:** Check acceptance criteria and the relevant user journey before moving the issue to Done.
- **Learning:** Retrospect on the process with a synthetic, publishable example; keep private reflections in a private workspace.

## Follow a fictional revenue-planning product

A founder-facing simulator needs to represent a manager who also sells. Imagine a fully productive seller with an annual quota of $800,000, expected attainment of 70%, and 45% selling allocation. The model gives **$252,000 in expected new ARR** ($800,000 × 0.70 × 0.45). These are entirely fictional classroom assumptions, not measured customer revenue or an investment recommendation.

| Milestone | One representative issue | Acceptance evidence |
| --- | --- | --- |
| M1 — Correct the model | Count a fractional player-coach, without counting the same capacity twice | Tests cover month-by-month totals, ramps and no double-counting; PR reviewed and merged |
| M2 — Support a hiring decision | Compare no hire vs. hiring in month 6 or 12 | Uses M1 capacity; includes hiring cost, cash impact, pipeline constraints and trade-offs |
| M3 — Verify and explain | Review end-to-end behavior and prepare a brief for a fictional founder | Demonstration and test evidence, documented limitations, sanitized learning recap |

A correct model precedes a hiring recommendation. M3 captures not just *what shipped*, but whether the system produces a defensible decision.

## Status ≠ priority ≠ milestone

| Status | Meaning |
| --- | --- |
| Backlog | Worth considering, but not committed as the next deliverable |
| Todo | Selected and ready for upcoming work |
| In Progress | Being actively implemented |
| In Review | Implementation exists; peer review, checks and acceptance verification remain |
| Done | Acceptance criteria are met, changes are merged when applicable, and evidence exists |

A *high-priority* issue may stay in Backlog because it is blocked. One milestone can contain many issues; for a tiny pilot, one issue per milestone can suffice.

## Avoid accidental duplication

| Kind of information | Source of truth | Consumers |
| --- | --- | --- |
| Shared software standards, ownership rules, portable contracts | Technical Docs | All participating repos link to them |
| Product PRD and code | Product GitHub repository | Linear links to requirements; Cursor edits code |
| Delivery status, dependencies and priorities | Linear | Brief references elsewhere, not duplicate status boards |
| PRs, tests and code-level review | GitHub | Linear links to the PR |
| Research and decisions | Appropriate research workspace | Link or cite approved research only |
| Private learning reflections | Private learning workspace | Never published or synced to employer systems |

**Important distinction:** GitHub pull-request linking and GitHub Issues synchronization are separate. You can use Linear as the issue backlog and GitHub for PRs without automatically creating mirror tickets in GitHub Issues. Connect new repositories only when actual delivery work needs them.

## Try it yourself (10 minutes)

1. Invent a small product bug or use this fictional player-coach example.
2. Write a project outcome and three milestone headings.
3. For M1, write one issue with an observed problem, a pass/fail acceptance criterion, one edge case and a test.
4. Put M1 in Todo, M2 and M3 in Backlog; add the dependency. Explain when each status should change.
5. Draft a branch name containing the issue identifier. Explain how a linked GitHub PR and CI results provide evidence.
6. Review the result: Did the test cover the user's problem? Was any claim unverified? Would you mark it Done?
7. Record one improvement for the next iteration. Do not create duplicate GitHub Issues merely to match Linear.

## Practical guardrails

Use one Linear team initially; activate projects only for current deliverables; limit simultaneous work; check dependencies in weekly triage; review outcomes at milestones. Keep personal code, public source material and employer-controlled operational records separated. A personal repository or private AI workspace is not automatically authorized for an employer's CRM data or customer notes.

## References

- [Linear — GitHub integration](https://linear.app/docs/github)
- [GitHub — About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- [GitHub — About status checks](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/collaborating-on-repositories-with-code-quality-features/about-status-checks)
- [Portfolio development workflow](../development-workflow.md)

**Publication rule:** This is a synthetic instructional example, not a live status dashboard. Verify private project state directly in its owning Linear/GitHub workspace. Do not publish actual private work records, company details or private Joy Index reflections.
