# Builder Academy — Pull requests, integration risk and reconciliation

**Track:** Builder Academy → Software delivery and release decisions  
**Level:** Beginner → intermediate · **Optional companion:** ~20–30 minutes  
**Status:** Educational source in repository; not a newly deployed lesson or scored UI exercise  
**Prerequisite:** [From idea to verified release](idea-to-verified-release.md), especially saving, checking, merging and deployment.

## Learning outcomes

After this lesson you should be able to:

1. Explain what a branch, commit, pull request (PR), merge, release and deployment each establish.
2. Identify when parallel work creates integration risk even if individual PR tests pass.
3. Triage PRs into merge candidate, update, consolidate, superseded/close or blocked; explain the decision with evidence.
4. Reconcile GitHub PR state with work tracking, UI acceptance and release status without prematurely saying "done".
5. Produce a short release handoff containing exact revision, tested behavior, remaining risk and human owner decision.

## Start here: why lots of work in progress matters

Imagine you're creating a fictional sales app. One PR changes the main navigation, another adds an opportunity review screen, and a third introduces an approval gate. Each developer built against a slightly different version of the application. Even three green CI runs **do not prove that the combined experience works**. The screen could be inaccessible from the current menu, use a different stage name, or save a value the other workflow cannot read.

**Work-in-progress (WIP) complexity** means coordination and verification effort increases as overlapping changes accumulate. It isn't automatically a code-quality problem or an instruction to stop building. The risk is hidden dependencies, stale checks, duplicated solutions and unclear release decisions.

### Vocabulary: understand the stages

| Term | Plain-language meaning | What it does **not** prove |
| --- | --- | --- |
| Branch | A line of development containing commits | That the code is in the default branch |
| Commit | One saved version of source files identified by a SHA | That the app runs or that tests passed |
| Pull request | A proposal to integrate one branch into another | That it is merged |
| Draft PR | Work not yet presented as ready for review | That it can be shipped |
| Open PR | A proposed change still awaiting disposition | That its tests are current or that it is needed |
| Merged PR | Change has been integrated into its target branch | That it is deployed or accepted |
| Superseded PR | Another change makes the original proposal unnecessary | That it's safe to close without comparing coverage |
| CI check | Automated verification run against a particular revision | That every behavior, environment or user workflow was checked |
| Preview | A temporary app environment for inspection | That production was updated |
| Deployment | A revision released to a target environment | That users can complete the intended task |
| Owner acceptance | A responsible human reviews specified criteria/evidence | That the product has no remaining risk |

**A merge conflict** is when Git cannot automatically reconcile edits. **An integration defect** occurs when edits merge but disagree about behavior, contracts, navigation or data. **A stale PR** is based on earlier code or evidence; its old green checks may not apply after the branch changes. A **flaky test** produces inconsistent outcomes and requires diagnosis, not repeated retries until green.

## Common integration risks and repairs

| Risk | Example | Repair |
| --- | --- | --- |
| Parallel UI changes | One PR renames a route, another links to the old route | Identify the canonical navigation and update dependent PRs |
| Conflicting data contracts | Review screen sends `qualified`; stage gate expects `validated` | Define one contract and test producer/consumer together |
| Duplicate implementations | Two PRs introduce different evidence panels | Compare acceptance coverage; keep one canonical implementation |
| Stale verification | Checks passed on an earlier commit | Record exact head SHA; rerun relevant tests on current revision |
| Incomplete release chain | Code merged but preview or production unverified | Separate merged, deployed and owner-accepted states |
| Issue/PR mismatch | Tracker says Done; release gate is open | Reconcile tracker with PR, tests, deployment and acceptance evidence |
| Excessive stacked PRs | PR C depends on B, B on A, and A changes again | Merge in dependency order or retarget/rebase carefully; retest downstream |
| Unclear ownership | No one knows who can approve closing a PR | Assign a decision owner and record next action |

## Reconciliation: a repeatable method

Reconciliation means comparing **what was planned**, **what source actually contains**, and **what has been verified**, then recording one coherent status. It is not automatically merging everything.

1. **Define the user journey.** Write the desired end-to-end behavior and minimum acceptance criteria.
2. **Inventory related changes.** Gather open, draft, merged and closed PRs; owner issues; target branches; known dependencies.
3. **Identify the current baseline.** Read the latest default branch SHA, relevant files, package/dependency state and release environment. Timestamp your findings.
4. **Compare coverage and overlap.** Ask which PR contributes unique behavior, which modifies the same navigation/contracts, and which is already superseded.
5. **Classify each PR.** Choose `merge candidate`, `update against current main`, `consolidate`, `close as superseded` or `blocked pending evidence`. Do not infer a PR's state from its number, title or old screenshot.
6. **Verify at the current revision.** Run the applicable build, tests, security checks and cross-component/browser journey at the exact head SHA. A passing test is evidence only for its stated coverage. Inspect mobile, accessibility, empty/error cases when relevant.
7. **Check release and human acceptance separately.** Verify target environment and explicitly record who accepted or rejected each criterion. Do not silently advance the work item to Done.
8. **Update the tracker and handoff.** Link current SHA, PRs, accepted criteria, blockers, disposition reasons, reviewer and next action. Close obsolete PRs only after confirming needed functionality exists elsewhere.

### Status is not a single checkbox

Keep these questions separate:

- **Source:** Is the change on the correct branch?
- **Automated verification:** Which checks ran on which SHA, and what did they actually test?
- **Integration:** Does the full journey work with other changes?
- **Release:** Was that exact revision deployed to the intended environment?
- **Acceptance:** Did the owner approve the observed outcome?

You can have "merged, CI green, browser integration pending, not deployed, owner acceptance pending." That is a useful truthful status, not a failure.

## Paper lab: the fictional Northstar sales app

All records below are **synthetic training examples**, not live GitHub evidence.

**Goal:** A sales representative can open an opportunity, inspect required evidence, request advancement to the next stage and see an approval decision.

| PR | Proposed change | Known evidence | Dependency |
| --- | --- | --- | --- |
| #40 | New navigation and opportunity menu | Merged to main at revision A | None |
| #41 | Seller journal | Open; tests passed on old revision B | Links to former menu route |
| #42 | Buying-process review | Draft; checks not run after update C | Reads journal stage names |
| #43 | Approval gate | Open; unit tests pass on revision D | Expects new stage names |
| #44 | New consolidated seller journal | Merged to main at revision E | Replaces most of #41 |

**Practice questions:**

1. Should PR #41 be merged because its old CI run is green?
2. What evidence is required before closing PR #41 as superseded?
3. Which PR needs contract reconciliation with the current seller journal and approval gate?
4. Can you say the end-to-end opportunity process is released?
5. Write a five-line owner handoff.

<details>
<summary>Answer key (expand after deciding)</summary>

1. **No.** Its verification is stale and it references an old menu.
2. Compare #41 against the merged #44 and verify every necessary journal behavior; record any missing capability before closing or transferring work.
3. #42 and #43 must agree with the current stage contract and the journal's data model, and the route must match merged navigation.
4. **No.** PRs #42 and #43 are not both verified/integrated, and no deployment or owner acceptance evidence was provided.
5. Example: `Goal: evidence-led stage advancement`; `Baseline: main revision E`; `Disposition: #41 compare/close if fully superseded, #42 update, #43 integration-check`; `Evidence: current-head contract and browser tests pending`; `Owner decision: hold release pending verified journey and approval`.

</details>

## A lightweight reconciliation worksheet

| PR | Current state + SHA | Unique user outcome | Depends on / overlaps | Current checks + browser | Owner/release evidence | Decision + rationale |
| --- | --- | --- | --- | --- | --- | --- |
| Example | Open, SHA pending | New approval gate | Stage contract | Not verified | Pending | Block pending end-to-end tests |

When describing a real project, avoid copying private issues, customer data or credentials into a public lesson. Use fictional examples in the Academy. Keep actual reconciliation records in the owning repository/Linear issue.

## Where this fits in the learning path

- **Before:** [From idea to verified release](idea-to-verified-release.md) introduces Git, CI, checks and deployment. 
- **Now:** This companion teaches multiple-PR coordination and source-to-release reconciliation.
- **After:** [Agent workflows](cursor-agent-workflows.md) explains safely delegating changes and preserving handoff evidence.
- **Advanced practice:** Use a deliberately synthetic multi-branch fixture; never auto-merge, close, or deploy real PRs based solely on an automated recommendation.

## Reference reading

- [GitHub: About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- [GitHub: About merge conflicts](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/addressing-merge-conflicts/about-merge-conflicts)
- [GitHub: About status checks](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/collaborating-on-pull-requests/about-status-checks)
- [GitHub: About deployments](https://docs.github.com/en/actions/concepts/use-cases/deploying-with-github-actions)
