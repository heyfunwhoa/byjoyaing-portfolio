# Builder Academy — Review release evidence and security boundaries

**Parent:** [From idea to verified release](idea-to-verified-release.md) · **Level:** Beginner extension · **Time:** 10-minute exercise budget, plus optional reference reading
**Status:** Companion lesson source for review; preserves the parent's fictional examples. No standalone lesson ID or automatic progress credit.

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


## Return to the parent lesson

[Return to the delivery learning path](idea-to-verified-release.md#choose-a-short-learning-path). Bring back one release decision, the missing evidence and its owner.
