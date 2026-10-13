# Developer tools and AppSec: follow one change

Beginner extension to [From idea to verified release](idea-to-verified-release.md). Read the typo-fix example there first. This guide adds security one layer at a time. Sources checked 2026-10-13; examples are fictional and tool mappings are illustrative, not tested vendor coverage.

## 1. Start with four jobs

**Developer tools help you build. Git remembers changes. Automation repeats checks. AppSec helps find and reduce application risk.**

An editor, an AI assistant, a repository and a security scanner can work together, but each does a different job. A tool can serve more than one job.

| Tool or concept | Everyday explanation | Example |
| --- | --- | --- |
| Editor / IDE | Your workspace for reading, editing, running and debugging code. IDE means integrated development environment. | An editor with terminal, debugger and Git integration; VS Code calls itself an editor with developer tooling.[A] |
| AI coding assistant | Helps explain, suggest or modify code, depending on its permissions. | Suggest a button fix or test. The output still needs review.[B] |
| Git | Tracks recorded versions and supports branches and merging. | Record the button fix as a commit. |
| Repository / repo | The project's version-controlled files and history. | Source code, tests, documentation and workflow configuration. |
| GitHub | A service that hosts Git repositories and adds collaboration and automation. | Open a PR and inspect checks.[C] |
| CI runner | A machine that executes automated jobs. | Install dependencies, run tests and produce a build.[D] |
| AppSec tool | Helps examine a specific kind of application risk. | Flag a credential in source code or a known vulnerable dependency. |

AI is developer tooling when it helps produce software. An application that calls an AI model is a separate topic: AI inside the product. An AI code reviewer may assist AppSec, but its suggestions do not establish a security guarantee. Extensions, packages and agents can execute code or access files: inspect permissions and avoid giving them unnecessary secrets.

## 2. Why Git and repositories exist

Before modern version control, keeping copies such as “final-v2-really-final” made it difficult to see who changed what, combine parallel work and recover older versions. Version-control systems organize those tasks.

Git was created in 2005 by Linus Torvalds and the Linux development community after their relationship with BitKeeper changed. It was designed for goals including speed, distributed development and branching.[E] Git did not invent repositories or version control.

**Distributed** means an ordinary full clone has its own repository history; it can record local commits without a constant server connection. Shallow or partial clones are exceptions to the full-copy description. GitHub is a hosting/collaboration service, not another name for Git.

A repository is not automatically a deployed website, a backup of the live database, or a secure place for credentials. Removing a secret from the latest file does not remove it from earlier commits.

## 3. Where checks fit

Start with this progression: **while editing → before recording → on the shared PR → before publication → after publication**.

| Point in the workflow | What can happen | What it does not prove |
| --- | --- | --- |
| IDE / editor | Feedback from language tools, tests, security extensions and AI suggestions | That everyone used the same rules or accepted the suggestions |
| Pre-commit | A local Git hook runs fast checks before a commit completes | Central enforcement; local hooks can be absent or bypassed.[F] |
| Pre-push / server push protection | Local pre-push checks or separately configured server-side rejection | These are different controls; neither is automatically enabled everywhere |
| PR / CI | Shared runners execute configured tests and scans for a commit | A passing job is a required merge gate only if applicable rules enforce it |
| Build / delivery | Assemble an artifact, inspect dependencies/images/configuration, and prepare a release | That production has received that artifact |
| Deployment and runtime | Publish, verify behavior and permissions, monitor and respond | That earlier tests cover every live configuration or attack |

**CI: continuous integration** runs repeatable validation as changes are integrated.
**Continuous delivery** keeps changes ready for release, potentially with a manual production decision.
**Continuous deployment** automatically publishes changes that satisfy the configured pipeline.
“CD” can mean either; ask which one a team uses.

A workflow contains jobs; jobs run on runners and contain steps.[D] A check is a result, not necessarily a security scan. Formatting, compilation and security validation answer different questions.

## 4. Add AppSec tools by the question they answer

| Tool category | Beginner question | Typical place | Limitation |
| --- | --- | --- | --- |
| Secret scanning | Did a credential end up somewhere it should not be? | Editor, hooks, push protection, PR, repository/history scans | Source/detector coverage varies; finding a secret does not revoke it |
| SAST: static application security testing | Does the code contain a suspicious pattern? | Editor or CI; Semgrep is an example | Rule matches do not establish every business permission |
| SCA: software composition analysis | Do our dependencies have known risks? | Dependency updates and CI; npm audit is a limited advisory-check example | Known-vulnerability checks do not prove a package is free of malicious behavior |
| Infrastructure/configuration and image scanning | Are deployment settings or packaged components risky? | PR and build; Trivy is an example | Repository configuration can differ from deployed configuration |
| DAST: dynamic application security testing | How does a running app respond to test requests? | Authorized test environment | Coverage depends on reachable paths and test accounts |
| Authorization tests | Can one user access another user's data? | Unit/integration tests and approved end-to-end checks | A login test alone does not test ownership rules |
| ASPM: application security posture management | How do we prioritize findings across applications and tools? | Findings aggregation and remediation workflows | Aggregation is not proof of native scanner coverage or remediation |

This is a teaching map, not a shopping list or a claim that these examples are installed. Existing [security-review guidance](idea-to-verified-release.md#what-a-pull-request-and-ci-do) explains scanner limitations; choose controls from the actual application and risk.

### Worked example: a credential in a configuration file

A fictional developer adds a credential to a local configuration file. For this lesson, use only a placeholder; do not create or test a real credential.

1. **During editing:** an appropriate rule may flag it; AI may suggest a fix, which needs review.
2. **Before committing:** a configured secret-scanning hook may catch it locally.
3. **At push or PR:** server-side protection or CI may identify it, depending on coverage.
4. **If a real credential was exposed:** use the provider's approved revocation/rotation procedure, assess use and remove exposed copies. Deleting a line alone does not invalidate the credential.
5. **Future use:** keep secrets out of source and use an approved delivery/identity approach. A secrets manager does not erase copies already leaked.
6. **Verification:** demonstrate the relevant control with approved synthetic fixtures. An arbitrary placeholder may not match a detector; a clean scan is not proof of coverage.

## 5. Frameworks: learn the question before the acronym

A framework helps organize decisions. It does not replace tests or certify a product.

| Reference | Question it helps answer | When to learn it |
| --- | --- | --- |
| NIST SSDF — Secure Software Development Framework | What secure-development practices should our organization establish? | Plan and improve the development lifecycle.[G] |
| OWASP ASVS — Application Security Verification Standard | Which application-security requirements should we verify? | Turn security needs into acceptance criteria.[H] |
| OWASP SAMM — Software Assurance Maturity Model | How mature is our software-security program, and what should improve next? | Program assessment and prioritization.[I] |
| MITRE CWE — Common Weakness Enumeration | What kind of software or hardware weakness are we discussing? | Describe and classify a finding.[J] |
| MITRE ATT&CK | What behavior might an adversary use? | Explain an attack scenario and related defensive evidence.[K–N] |

Start with ASVS for application requirements and SSDF for the workflow. Add CWE to explain weaknesses and ATT&CK to connect them to attacker behavior. SAMM becomes useful when evaluating a broader program.

## 6. MITRE ATT&CK: connect behavior to evidence

An ATT&CK **tactic** describes the adversary's goal; a **technique** describes a way to pursue it; a **sub-technique** is more specific. A mapping explains relevance. It is not evidence that a vendor prevents or detects the complete technique.

| Fictional behavior | Relevant technique | Where AppSec can help | What else is needed |
| --- | --- | --- | --- |
| Attacker searches accessible configuration/source files for credentials | **T1552.001 — Credentials In Files**[K] | Secret scanning can reduce exposed credential material | Access restrictions, remediation and evidence of credential/file access |
| Attacker obtains an exposed private key | **T1552.004 — Private Keys**[L] | Key-pattern detection and appropriate storage controls | Revoke/replace affected material and investigate access; a private key is not the same as a harmless public certificate |
| Attacker steals an application's access token | **T1528 — Steal Application Access Token**[M] | Secret handling and application controls may reduce relevant exposure | Token scope/lifetime, revocation and application/identity telemetry; source scanning covers only some paths |
| Attacker compromises a dependency or development tool | **T1195.001 — Compromise Software Dependencies and Development Tools**[N] | Dependency review, provenance/integrity checks and controlled build/tool execution | Investigate package behavior and the execution environment; advisory scanning alone may miss malicious packages |

These are conditional educational mappings. Do not label every software bug an ATT&CK technique, every API key an application access token, or all of a technique “covered” because one scanner produces a finding. CWE describes weaknesses; ATT&CK describes adversary behavior. AppSec and SOC/runtime detection can contribute different evidence to the same scenario.

### Practice: build one defensible mapping

Given a synthetic private-key exposure:
1. Choose the relevant ATT&CK row and explain the behavior.
2. Pick one early check and one shared CI/server control.
3. State the file/history scope and detector assumptions.
4. Explain remediation separately from detection.
5. Name one thing a passing check cannot establish.

Example answer: “T1552.004 is relevant if an attacker obtains the private key. A configured local hook and shared scan may identify key material within their scope. Revocation/replacement and access investigation are separate. A clean scan does not prove no copy exists elsewhere.”

Reading this page is **reviewed**. Trying the exercise is **practiced**. Record **passed checks** only for a specific evaluated exercise or test with its evidence; none of these labels imply production security.

## Sources

Official documentation, checked 2026-10-13. Tool placement and examples above are educational synthesis, not tested coverage.
- [A] [VS Code: editor and developer tooling](https://code.visualstudio.com/docs/editor/whyvscode)
- [B] [GitHub: responsible use of Copilot inline suggestions](https://docs.github.com/en/copilot/responsible-use/inline-suggestions)
- [C] [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow)
- [D] [Understanding GitHub Actions](https://docs.github.com/en/actions/get-started/understand-github-actions)
- [E] [Pro Git: a short history of Git](https://git-scm.com/book/en/v2/Getting-Started-A-Short-History-of-Git)
- [F] [Pro Git: Git hooks](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks)
- [G] [NIST SSDF](https://csrc.nist.gov/Projects/ssdf)
- [H] [OWASP ASVS](https://owasp.org/projects/asvs)
- [I] [OWASP SAMM](https://owasp.org/projects/samm)
- [J] [MITRE CWE](https://cwe.mitre.org/about/index.html)
- [K] [ATT&CK T1552.001](https://attack.mitre.org/techniques/T1552/001/)
- [L] [ATT&CK T1552.004](https://attack.mitre.org/techniques/T1552/004/)
- [M] [ATT&CK T1528](https://attack.mitre.org/techniques/T1528/)
- [N] [ATT&CK T1195.001](https://attack.mitre.org/techniques/T1195/001/)

Continue with the existing [code and YAML primer](reading-code-and-yaml.md), [Cursor workflows](cursor-agent-workflows.md) and [security release gates](security-hardening-release-gates.md).
