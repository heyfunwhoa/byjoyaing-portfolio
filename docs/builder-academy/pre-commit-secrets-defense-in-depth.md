# Why pre-commit alone cannot stop every secret

**Level:** Beginner → deeper investigation · **Suggested time:** 10-minute overview, then 20-minute tabletop exercise.
**Status:** Educational companion, not an audit of any repository. No security controls installed by publishing this lesson.
Start with [developer tooling and AppSec](developer-tooling-appsec-workflow.md).

## Start simply

A pre-commit check is an early inspection on the machine creating a commit. It can stop that commit when an installed hook finds a problem and returns a failure. It is useful because the developer can fix a mistake before sharing it.

It cannot promise “no secrets will ever leak.” The check might not run, might examine the wrong content, might not recognize the credential, or might report a problem without blocking anything. Another workflow might upload content without using that machine at all.

**Three questions:** Did it run? What did it examine? What happened when it failed?

## One fictional example

A developer installs a secret-scanning hook and catches a supported test fixture. Later, an automation service creates a commit through a remote API. That action does not execute the developer's local hook. If no applicable server protection exists, the commit may reach the remote repository.

A PR scan may detect it later and prevent merging if the check is enforced. But **preventing a merge is different from preventing upload**: the branch may already contain the credential. In a real exposure, revoke/rotate the credential and assess use; do not wait for merge to take the finding seriously.[1–3]

The hook was useful for its path. The complete workflow needed coverage for the other path too.

## Understand the terms before investigating

- **Git pre-commit hook:** a program Git can invoke before completing a commit.
- **pre-commit:** also the name of a framework for installing/running hooks. Installing the framework or adding its YAML configuration is not proof the hook was installed in every clone.[1,4]
- **Detection gap:** inspected content did not produce the expected finding.
- **Coverage gap:** a relevant file, history range, workflow or repository was not inspected.
- **Enforcement gap:** a finding or error did not block the intended action.
- **Remediation gap:** a detected exposure stayed usable or unresolved.

An IDE extension, local hook, server-side push protection and CI scanner are separate installations and control points.

## Deep dive: how secrets can pass through

| Failure mode | Fictional example | Evidence to inspect | Practical response |
| --- | --- | --- | --- |
| Hook absent | New laptop or clone has a config file but no active hook | Installation procedure, hook location and execution evidence | Managed onboarding and a harmless positive fixture; retain shared controls |
| Hook not executable or path differs | Git is looking in another hooks directory | Git hooks configuration and file permissions | Correct setup and verify invocation.[1] |
| Local hook bypassed | An allowed exception or local setting skips the hook | Exception record and local configuration | Audit exceptions; rely on independently enforced shared controls |
| Alternate creation path | Web editor, API, bot or remote agent creates a commit | All contribution paths and their server-side protections | Validate controls on each path; a laptop hook cannot govern remote writes |
| Wrong snapshot | Scanner checks working files while different content is staged | Exact scanner input versus staged snapshot | Use the scanner's documented integration; test partial staging |
| Narrow scope | Excluded directory, large file, binary or historical commit is outside scan scope | Exclusions, file support, size/time limits and commit range | Document limits; add appropriate approved scans, not unsupported coverage claims |
| Detector gap | Custom credential format has no matching rule | Supported patterns, configuration and fixture results | Evaluate custom rules where supported; keep credentials out of source |
| Baseline / allowlist hides risk | Broad suppression dismisses new real material | Baseline and exclusion changes, owner and expiry | Narrow and review exceptions; baselining is not remediation |
| Scanner error treated as success | Wrapper logs an error but returns success | Exit codes, shell wrapper and job outcome | Treat execution errors explicitly; test error behavior |
| Network-dependent validation fails | A scanner cannot reach a provider | Whether detection and live validation are distinct; timeout behavior | Preserve Unknown; do not automatically turn unverified into safe |
| CI is optional | A finding exists but merge still proceeds | Required-check rules, bypass actors and target branches | Verify enforcement for the latest commit and appropriate actors |
| Wrong CI range | Shallow checkout or incorrect merge base omits affected history | Checkout depth and scanned revisions | Match fetch/range to documented scanner requirements |
| Off-repository leak | Credential is in an AI prompt, log, artifact or chat | Data flows and storage destinations | Minimize/redact sensitive output and govern those surfaces separately |

This matrix describes possible failure modes, not universal behavior of every scanner. A scanner can inspect staged content, the working tree, commits or full history depending on its invocation. Verify the actual mode.

## Layer controls around the workflow

| Layer | Job | Remaining limit |
| --- | --- | --- |
| Avoid unnecessary long-lived credentials | Prefer supported short-lived credentials/workload identity and least privilege | Not every target supports them; bootstrap trust still matters |
| Approved secrets storage and delivery | Keep values out of source and distribute them appropriately | Does not remove leaked copies or prevent every log/prompt exposure |
| IDE and local hooks | Give early feedback and stop some local mistakes | Installation, bypass and detector limits |
| Server-side push protection | Reject supported secret content on covered upload paths | Requires correct enablement, pattern support and bypass governance.[2] |
| PR checks and merge rules | Review changes and block integration when required checks fail | Content may already be remote; rules and bypass rights require verification |
| Repository/history discovery | Find existing exposure within configured scan scope | Detection happens after exposure; historical access is unknown |
| Runtime permissions and monitoring | Limit credential power and investigate suspicious use | Does not repair source leakage |
| Response and verification | Revoke/rotate, investigate, clean up and confirm | Deleting code or closing an alert alone does not establish invalidation.[3] |

On regular GitHub.com repositories, do not assume you can install arbitrary server pre-receive hooks. Use the platform's supported protections and validate availability for the actual repository and plan. A policy document, a green job and enforced rules are different evidence.

## Safe practice: test the control, not a real credential

Use a disposable private/local training repository and an explicitly synthetic fixture. A made-up token may not trigger a real detector. Use an approved nonfunctional scanner fixture or a temporary training rule for a clearly fake marker such as TRAINING_SECRET_MARKER; success proves only that configured test.

Do not upload a real token, call a provider to validate credentials, disable production controls or modify shared bypass rights for this exercise. Begin as a tabletop exercise; run a technical drill only in an authorized disposable environment.

| Scenario | Expected observation | What it proves |
| --- | --- | --- |
| Synthetic marker in staged text; training hook installed | Commit refused with expected finding | That rule and local path worked for that fixture |
| Clean staged text | Commit permitted | Negative control behaves as expected, not universal security |
| Hook absent in a separate disposable clone | Local test does not execute | Shared configuration alone did not install it |
| Staged and working versions differ | Record which version was inspected | Snapshot scope is understood |
| Simulated scanner execution error | Explicit failure or documented handling | Error behavior, not detection quality |
| Remote-created change, simulated on paper | Local laptop hook has no execution record | Need for a separate server-side control |
| Synthetic CI failure in an authorized test repository | Merge denied for the tested actor, if rules enforce it | The tested merge gate; not every bypass actor or upload path |

Record: revision, scanner/rule version, fixture, input scope, trigger path, exit status, action blocked, relevant actor, and remaining unknowns. Record a test as passed only after observing its expected result. “Reviewed” and “practiced” remain separate.

### Read this fictional result

“The hook found the marker. CI was green. A bot's commit was not scanned. The repository has no required-check rule.”

What can you claim? The hook detected one fixture on one path. You cannot claim every contributor is covered or merging is enforced. Next, address the bot path and verify shared rules with approved tests.

## If a real secret is found

1. Identify the provider, owner, permissions and likely exposure scope without copying the value into tickets or AI tools.
2. Revoke or rotate promptly through approved provider procedures; coordinate dependent-service recovery.
3. Investigate relevant access/activity and exposed locations with the response owner.
4. Remove unnecessary copies and address history/artifacts as appropriate. History rewriting has collaboration consequences and does not retrieve existing clones.
5. Confirm old credential invalidation, application recovery and alert disposition. Record evidence without storing the secret.[3]

A private repository is access-controlled, but it remains a poor credential distribution mechanism. An unmerged branch can still expose material to authorized readers or compromised identities.

## Connect the lesson to MITRE ATT&CK

If an adversary obtains credentials from accessible configuration/source files, **T1552.001 — Credentials In Files** is relevant. For exposed private keys, consider **T1552.004 — Private Keys**.[5,6] These describe adversary behavior; a scan finding alone does not prove an attacker performed it.

Map precisely: **behavior → exposed material → control location → tested scope → residual risk**. A local scan can reduce relevant exposure; it is not complete detection of either technique. Investigating actual theft/use requires additional evidence.

## Apply the same reasoning elsewhere

| Workflow area | Common mistaken conclusion | Better evidence |
| --- | --- | --- |
| SAST | No findings means no vulnerabilities | Rules, language coverage, scope and application-specific tests |
| Dependencies | Advisory scan passed, so packages are trustworthy | Advisory coverage plus provenance, updates and execution risk |
| Authorization | Login works, so data is isolated | Wrong-user and wrong-tenant tests with no side effects |
| AI coding | The agent says it ran tests | Actual command/job results for the changed revision |
| Deployment | PR merged, so fix is live | Deployed revision and affected user-journey verification |

Use **NIST SSDF** to organize secure-development work and **OWASP ASVS** to choose application verification requirements; frameworks do not prove controls ran.[7,8]

## Sources and further reading

Official sources checked 2026-10-13; examples and failure matrix are educational synthesis. No empirical bypass rates or claims about the user's production controls.
1. [Git hooks reference](https://git-scm.com/docs/githooks) — hook invocation, executable/path requirements and bypass behavior.
2. [GitHub push protection](https://docs.github.com/en/code-security/concepts/secret-security/push-protection) — server-side protection and its scope.
3. [GitHub: remediate a leaked secret](https://docs.github.com/en/code-security/tutorials/remediate-leaked-secrets/remediating-a-leaked-secret) — revocation/rotation and cleanup.
4. [pre-commit framework documentation](https://pre-commit.com/) — hook installation, configuration and execution.
5. [MITRE T1552.001](https://attack.mitre.org/techniques/T1552/001/)
6. [MITRE T1552.004](https://attack.mitre.org/techniques/T1552/004/)
7. [NIST SSDF](https://csrc.nist.gov/Projects/ssdf)
8. [OWASP ASVS](https://owasp.org/projects/asvs)

Continue with [release gates](security-hardening-release-gates.md) and [secrets and non-human identity](secrets-non-human-identity.md).
