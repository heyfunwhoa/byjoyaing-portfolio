# Builder Academy — From idea to verified release

**Track:** Builder · **Level:** Beginner · **Time:** 25 minutes  
**Status:** Lesson source for the existing Academy lesson library. The linked Academy page is a public educational prototype; it does not expose private Linear or GitHub repositories.

## What you'll learn

Translate a business idea into a small, verified software change, using a single source of truth for each kind of information. The benefit is less context switching, less duplicate administration, and evidence-based delivery rather than declaring something done because an agent said it finished.

## Start here: save it, check it, publish it

Imagine fixing a typo on a practice website. You want to save your work, check that it is right, and let visitors see the correction.

**Three big steps:**
1. **Prepare the change:** edit the text and save a recorded version.
2. **Check and accept it:** review the change and bring it into the main version.
3. **Publish and confirm it:** put that version on the website and check what visitors see.

The technical words below name smaller steps in that same process. You do not need to memorize them all at once.

### One example, from typo to live website

| What you do | What developers call it |
| --- | --- |
| Create a separate place to fix “Welocme” without changing the main version | Create a **branch** |
| Change it to “Welcome” and inspect the difference | **Edit** and check the **diff** |
| Record that correction in the project's history | **Commit** |
| Upload the recorded change so it is available on GitHub | **Push** |
| Open a proposal showing the correction | Open a **pull request**, or **PR** |
| Read the change and inspect the relevant automated results | **Review** and **checks** |
| Accept the correction into the main version | **Merge** |
| Publish the updated version to the website | **Deploy** |
| Open the published website and confirm it says “Welcome” | **Verify live** |

Some tools combine steps for you. For example, a browser editor may create the commit directly on GitHub, and merging may automatically start a deployment. The meanings still stay separate.

### What should I say when the PR is ready?

> Review the PR, fix any issues, and merge once the required checks pass.

If it changes a website, add:

> Then confirm the update is live and works as expected.

**Why not just say “commit”?** A commit records work. A merge accepts the proposed work into the main version. A deployment publishes a version for visitors.

### Two examples where you pause

- **A check fails:** investigate the failure, fix the problem, and check the updated PR again before merging.
- **The PR merged but the typo is still live:** inspect the deployment. The main version may be updated while the website still serves an older version.

### Try explaining it back

Your fictional button-label fix is committed and its PR is open. Someone says, “It is saved, so it must be live.” What would you check?

**Example answer:** “I would check whether the PR was reviewed and merged, whether the updated version deployed, and whether the published button shows the corrected label.”

When that feels familiar, continue below for the more detailed workflow and terminology.

## Add the security layer when you are ready

Continue with [Developer tools and AppSec: follow one change](developer-tooling-appsec-workflow.md). Start with IDEs and AI assistants, then Git history, pre-commit and CI/CD checks. Follow a fictional credential exposure into AppSec controls and specific MITRE ATT&CK techniques. The final layer introduces SSDF, ASVS, SAMM and CWE, with official sources and a practice exercise.

## How the wider project fits together

- **Strategy & prioritization:** Why do this before other work? Evaluate impact, urgency, dependencies, effort, and risk. Treat scoring as a decision aid; security incidents and hard deadlines override it.
- **Project:** What outcome are we pursuing?
- **Milestone:** Which meaningful checkpoint moves us toward the outcome?
- **PRD (in the product repository):** What user problem, requirements, constraints and acceptance criteria define success?
- **Linear issue:** What small deliverable is next, who owns it, and what blocks it? Keep the issue brief and link to the authoritative PRD.
- **Cursor / engineering environment:** Implement the change on a feature branch with tests.
- **GitHub:** Hold the code and PR review, plus CI/deployment evidence.
- **Verification:** Check acceptance criteria and the relevant user journey before moving the issue to Done.
- **Learning:** Retrospect on the process with a synthetic, publishable example; keep private reflections in a private workspace.

## Commit, review, merge and deploy: what to say next

A typical branch workflow is **edit → inspect the diff and run relevant checks → commit → push → open a PR → review and CI → fix issues → merge → deploy when needed → verify the published result**. Review and CI can run in parallel. Repeat commit, push and review when fixes change the PR.

| Term | Plain-language meaning |
| --- | --- |
| Commit | Record a snapshot in Git history; saving a file alone is not a commit. |
| Push | Upload local commits to the remote branch. Web-based tools may commit remotely without a separate local push. |
| Pull request (PR) | Propose integrating a branch and collect discussion, review and check results. |
| Review | Inspect the changes for correctness, scope and evidence. Review can happen before committing and again on the PR. |
| Checks / CI | Automated validation for a particular commit; confirm what ran and what it proves. |
| Merge | Integrate the approved change into the target branch, commonly main. |
| Deploy | Publish a revision to an environment; a preview and production are different destinations. |
| Verify live | Confirm the intended deployed revision and affected user behavior. |

**Useful instruction when a PR already exists:** “Review the PR, fix any issues, and merge once the required checks pass on the latest commit.”

For a deployed application, add: “Then verify the production deployment and affected user journey.” If merge triggers automatic deployment, inspect that deployment rather than starting a duplicate. Preview deployments may happen before merge.

“Review then commit” is appropriate for reviewing uncommitted edits. Once the PR exists, the usual next action is **review then merge**; fixes still require new commits and another check of the updated PR. Green checks do not replace review or authorize bypassing repository rules.

A repository-only Markdown change may be complete after merge and verifying the file on the target branch. Documentation rendered into a website still needs publication/deployment verification. A docs-only commit can also trigger a configured deployment automatically; check the actual workflow.

### Quick practice: identify the next action

1. Your edits are saved locally but absent from Git history. **Inspect the diff, run relevant checks, then commit and push.**
2. A PR is open but a required check failed. **Investigate and fix it; push the fix and review the latest results before merging.**
3. A PR merged but production still shows the old version. **Check deployment status and revision, then verify the affected page after publication.**
4. You read the lesson but did not attempt the exercise. **Record reviewed, not practiced or passed checks.**

Source: [GitHub Docs — GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), checked 2026-10-13. The deployment steps above describe this lesson's delivery convention; each repository determines its own deployment triggers.

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

## Security review before merge (additional 10-minute practice)

**Learning objectives:** explain what each check can find; distinguish authentication from authorization; choose denied-path tests; separate configured, passing and enforced controls; decide when a release still needs verification.

This is a fictional account-research application with synthetic data. It is teaching material, not a live audit or claim about any private project's security.

### What a pull request and CI do

A pull request proposes a change for review. Continuous integration (CI) runs repeatable checks against a particular commit. A check can pass even when an important requirement has no test. The question is: **what did this check actually prove?**

| Check | What it helps find | What it cannot prove |
| --- | --- | --- |
| Lint and TypeScript | Code mistakes, inconsistent types and some risky patterns | That the logged-in user is allowed to access an account |
| Automated tests | Whether the behaviors asserted by those tests work | Untested requirements or actual production setup |
| Production build | Whether the app can be assembled in the tested environment | That it is deployed or protected |
| Secret scanning, such as TruffleHog | Credentials accidentally added to source/history; coverage depends on detector and configuration | That every possible secret was found or exposed credentials were revoked |
| Dependency scanning, such as npm audit or Trivy | Known advisories in included packages | All unknown flaws, actual exploitability or all build-tool risks |
| Static application scanning (SAST), such as Semgrep | Suspicious code patterns matched by enabled rules | Complete business-specific authorization |
| Configuration scanning, such as Trivy | Known risky settings in supported configuration files | The actual live hosting, database or identity settings |
| Human diff review | Whether the change matches intent, boundaries and evidence | An automatic guarantee of correctness |

These tools are examples, not a requirement to install every scanner. Review existing checks first. Overlapping tools can add cost and noise; keep rules relevant to the stack and verify how findings affect job exit status. Dependency review examines changes introduced by a PR [1]. Scanners vary in licensing, coverage and repository availability.

### Authentication asks who; authorization asks what they may do

A session establishes identity. Server-side authorization decides which account or operation that identity may access. An identity SDK does not automatically supply your app's ownership rules.

A machine token identifies an authorized background caller. Cron and webhook credentials should be limited to their intended purpose. Deny requests when required credentials are absent. A logged-in user and a valid machine caller are different trust boundaries.

| Synthetic test | Required evidence |
| --- | --- |
| Logged-out visitor requests an account | Denied; account data is not returned |
| User A requests User B's account | Denied; private fields do not appear |
| User A attempts to modify or export User B's account | Denied before any write or export |
| Cron receives a missing, wrong or webhook-only token | Denied; scheduler is not called |
| Webhook receives an invalid token and malformed JSON | Denied before parsing, ingesting or syncing |

These are **denied-path tests**: intentionally try something that should fail and assert both the response and the absence of side effects. A test that expects “401 Unauthorized” without checking whether work already ran can miss a dangerous ordering mistake. Use synthetic credentials and mocked providers; no live attacks or customer data are needed.

### Match review depth to the change

| Change | Appropriate focus |
| --- | --- |
| Copy, layout or lesson text | Existing source/dependency hygiene, accurate claims, accessibility and normal quality checks |
| APIs, fetching, imports or integrations | Input validation, URL safety, credentials, rate limits, timeouts and paid-provider controls |
| Account permissions, private data or durable automation | Trust boundaries, denied reads/writes/exports, least privilege, data integrity and recovery |

For imports, check malformed files and size/row limits. For exports, check spreadsheet formula injection and excluded private fields. For URL fetching, check unsupported schemes, credentials in URLs, private/local destinations, redirects and DNS behavior relevant to the implementation. A hostname string check alone is not a complete defense against server-side request forgery.

For AI research, treat retrieved text as data: it cannot authorize tool calls, data publication, spending or changes to permissions. Review ingestion and publication boundaries separately.

### Configured, passed, enforced and deployed are different

| State | Evidence |
| --- | --- |
| Documented | A policy says the control should exist |
| Configured | A workflow or test is present |
| Passed | The applicable job succeeded on the reviewed commit |
| Enforced | Verified repository rules prevent merging when that required check fails |
| Released and verified | The intended change is deployed, and the permitted user journey plus access boundaries were checked |

Record the exact reviewed commit. New commits invalidate earlier approval evidence for the changed code. A queued, failed, cancelled or unexpectedly skipped required check is not a pass. GitHub status checks report results; repository protection/rules determine whether results block merging [2].

If platform enforcement is unavailable, explicitly record a **manual maintainer gate**: review the diff, check every applicable result on the latest commit, inspect acceptance evidence and approve deliberately. A manual gate helps discipline but cannot technically stop direct pushes or bypasses. Keep data-bearing repositories private; check current plan capabilities rather than publishing private code to obtain a feature.

### Secure the checks themselves

Use minimal workflow-token permissions, review third-party Actions and pin them to verified immutable commits [3]. A pinned wrapper action may still download a mutable scanner image or ruleset: inspect the full execution chain. Keep updates reviewable through the existing dependency-update process.

PR jobs should use synthetic fixtures and avoid production credentials, real database writes and paid provider calls. Do not execute untrusted PR code in a privileged workflow with production secrets. For production dependency auditing, remember that development dependencies also execute during installs and builds; review that separate exposure.

Do not silently disable a failing scanner or add broad ignore rules. Explain false positives and record narrowly scoped exceptions with owner, rationale, mitigation and review date.

### Practice: would you release this?

A fictional PR adds “Export accounts.” Secret, dependency and static scans pass. A mock-based test confirms the download works for its owner. There is no wrong-owner test. The repository has no verified required-check enforcement.

1. Name the data boundary that changed.
2. Write an acceptance criterion for a denied export.
3. Describe how you will prove no file was generated and no private fields escaped.
4. Identify the merge-control limitation and the interim process.
5. List what must be checked after deployment, separately from CI.

**Knowledge check:** Which action is justified?

- A. Release now because every scanner passed.
- B. Keep the PR in review, add denied-export evidence, inspect the actual diff and latest checks, document the enforcement limitation, then obtain approval and verify the deployment separately.
- C. Install another scanner and assume it supplies account permissions.

**Answer: B.** The scans did not establish wrong-owner isolation. More scanning cannot substitute for a missing business-specific permission test.

### Why this matters to a seller and future sales leader

As a rep, you can explain the evidence precisely: “Our tests verify this boundary,” rather than “CI says we are secure.” As a leader, you can assign an owner, define the release gate and keep CRM/customer information inside approved systems. These are useful operating habits; they are not certification, legal permission or proof of customer-ready security.

Use the existing delivery loop: requirement → scoped change → test evidence → review → approved merge → deployment verification → learning. Technical Docs owns shared policy; the product repository owns implementation and proof; the Academy teaches with publishable examples.

### Security sources

1. [GitHub Docs — Dependency review](https://docs.github.com/en/code-security/concepts/supply-chain-security/dependency-review): explains dependency changes and configurable enforcement, not business-specific permissions.
2. [GitHub Docs — About status checks](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/collaborating-on-repositories-with-code-quality-features/about-status-checks): explains reported results; a successful check alone does not establish branch protection or deployed behavior.
3. [GitHub Docs — Secure use reference](https://docs.github.com/en/actions/reference/security/secure-use): supports least privilege, action pinning and untrusted-input protections; applying the guidance is not certification.

## References

- [Linear — GitHub integration](https://linear.app/docs/github)
- [GitHub — About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- [GitHub — About status checks](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/collaborating-on-repositories-with-code-quality-features/about-status-checks)
- [Portfolio development workflow](../development-workflow.md)

**Publication rule:** This is a synthetic instructional example, not a live status dashboard. Verify private project state directly in its owning Linear/GitHub workspace. Do not publish actual private work records, company details or private Joy Index reflections.
