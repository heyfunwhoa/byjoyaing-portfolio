# Builder Academy — First deployment: settings and integrations

**Parent:** [From idea to verified release](idea-to-verified-release.md) · **Level:** Beginner · **Time:** Optional 25-minute practice budget
**Status:** Companion lesson source for review; no standalone lesson ID, automatic publication or progress credit.

**Outcome:** explain a hosting form, choose only what the app needs, and distinguish a successful build from a verified release. This fictional public market explorer ships with a bundled catalog. It has no private records, required database or live research service. Do this as a paper exercise first; deploying a real project requires its owner's approval.

### Repository, website and portfolio link

A repository stores source code. A hosting project builds and serves that code. A portfolio card can link to either one. Finding a GitHub link inside another website does not mean the app is hosted inside that website. Before creating a new hosting project, check existing project names, connected repositories, domains and any configured proxy routes.

### Where these pieces fit in the software development lifecycle

The SDLC is the full path from deciding what to build to operating and improving it. A simple version is:

**Plan → design → write code → review and test → build → deploy → verify → monitor → maintain or recover.**

Each tool handles only part of that path. A repository stores source code; CI checks changes; a hosting platform runs a built app; a database stores durable app data. Those products can connect, but they do not become one product just because they share a name or account.

**Sample release path:**

1. Describe one user need and how to tell the change worked.
2. Make a Git branch and edit files in the repository.
3. Open a pull request. Automated checks build the app and run its tests and security checks.
4. Deploy a preview. If the app needs data, connect it to a separate preview database branch with synthetic data.
5. Review the diff, checks, preview and user journey; fix issues before merge.
6. Merge the approved change to the production branch. Deploy with production settings and the production database.
7. Check the real user path, then monitor errors and usage. Have a tested rollback or recovery route.

A green build means the package built. A Ready deployment means a platform completed its deployment step. Neither proves the app used the intended database, permissions, or user journey.

### The pieces and common choices

These are representative options, not a popularity ranking. Products often overlap; choose the smallest set that covers a real requirement.

#### 1. Version control and code review

**What it is:** Git records changes to source files so people can compare, review, merge and roll back work. A Git hosting service stores the shared repository and adds pull requests, access controls and review workflows.

**Typical parts:** repository; commits; branches; pull requests; reviewers; protected-branch rules; tags or releases.

**Options:** GitHub, GitLab, Bitbucket, or a self-hosted Git server. Git is the version-control system; GitHub/GitLab/Bitbucket are services around Git. Pick based on where the team already works, access controls, review needs, integrations and portability.

#### 2. Continuous integration and delivery

**What it is:** CI automatically checks a proposed code change. CD prepares or deploys a passing build according to the team's release rules.

**Typical parts:** trigger (such as a pull request); runner; workflow; jobs and steps; test/build/security commands; logs; status checks; sometimes a build artifact.

**Options:** GitHub Actions, GitLab CI/CD, Bitbucket Pipelines, CircleCI or Jenkins. Hosting platforms such as Vercel can also build and deploy from Git. Avoid running the same build/deploy step twice unless the responsibilities are clear.

#### 3. Build, hosting and runtime

**What it is:** the build turns source files into an artifact. Hosting makes that artifact available over the web. The runtime is the place and process that executes server-side code.

**Typical parts:** framework adapter; install/build commands; artifact; CDN or web server; domain and TLS; serverless functions, edge workers or containers; deployment environments; logs.

**Options:** Vercel, Netlify, Cloudflare Pages/Workers, AWS Amplify, Render, Fly.io, or cloud platforms such as AWS, Azure and Google Cloud. Static sites, serverless apps, edge workloads and long-running services have different runtime needs. Check framework support, regions, runtime limits, networking, access controls, build behavior and operating effort.

#### 4. Application API and background work

**What it is:** server-side code that validates requests, enforces authorization, applies business rules and calls other services. Background workers handle work that should run later or retry independently.

**Typical parts:** route or handler; input validation; authentication and authorization; business logic; service credentials; timeouts/retries; queue or scheduler; logs.

**Options:** functions bundled with Vercel/Netlify; Cloudflare Workers; AWS Lambda/Azure Functions/Google Cloud Functions; or a container/service on Render, Fly.io, AWS or similar. A static frontend may not need a custom API. Never put a database password or provider secret in browser code.

#### 5. Database and file storage

**What it is:** a database stores structured records that must persist and be queried. Object storage stores files such as images and exports. They solve different jobs.

**Typical database parts:** engine; project/instance; database and schema; tables and constraints; roles/permissions; connection endpoint; migrations; backups; dev/preview/production separation.

**Options:** Neon, Supabase or Railway for managed PostgreSQL; Amazon RDS/Aurora for managed cloud databases; Cloudflare D1 or Turso for SQLite-oriented workloads; other managed MySQL/PostgreSQL providers. PostgreSQL and SQLite are not interchangeable without checking SQL features, concurrency, migrations and data-access patterns.

**Selection questions:** Does the app need PostgreSQL compatibility? How many concurrent connections? Are transactions and relational joins important? Who owns backups and tested recovery? Can preview environments use separate branches or databases? What region, privacy controls, operations and exit path are required?

#### 6. Environment configuration and secrets

**What it is:** configuration tells the app which mode and services to use. An environment variable is a named value supplied to a process. A secret is a sensitive value, such as a password or API key, and needs tighter access and rotation.

**Typical parts:** local/development, preview/staging and production scopes; variable name; value; access policy; update/rotation procedure. A database URL usually includes host, database, user and password; treat the entire value as secret.

**Options:** built-in environment settings in Vercel, Netlify, Cloudflare or AWS; CI-specific secrets such as GitHub Actions secrets; dedicated secret managers such as AWS Secrets Manager, Doppler or 1Password Secrets Automation. Avoid duplicating secrets across tools without an owner and rotation plan.

Keep secret values out of Git, screenshots, logs and chat. Expose a value to browser code only when it is intentionally public. Use separate values for preview and production. The key existing in settings does not prove the running code reads it.

#### 7. Security and access checks

**What it is:** controls that decide who can change code, reach an app, call an API or read data. Authentication checks who someone is; authorization decides what they may do.

**Typical parts:** repository permissions and branch protections; identity provider/session; server-side authorization; database roles; secret access; dependency, static-analysis and secret scans; privacy and data-retention rules.

**Options:** controls included in GitHub/GitLab/Bitbucket; app-level tools such as Better Auth, Clerk, Auth0 or a cloud identity service; scanners such as Semgrep, CodeQL or Snyk. A login screen alone does not protect records; verify authorization at the server and database boundaries.

#### 8. Observability, maintenance and recovery

**What it is:** observability helps answer what the application did and why. Recovery returns service or data to a known-good state after a failed change or incident.

**Typical parts:** structured logs; metrics; traces; alerts with an owner; release/commit identifiers; backups or snapshots; rollback procedure; retention and access limits.

**Options:** hosting-provider logs and metrics; OpenTelemetry for vendor-neutral instrumentation; Sentry, Datadog, Grafana Cloud or cloud-provider monitoring. Choose tools that can answer a named question and route an actionable alert. Monitoring is not a backup; a backup is not a tested restore.

### How a preview connects to a database

The deployed application connects from its server runtime to a database endpoint using environment configuration. The database endpoint belongs to a particular project and branch. A branch name is a label; check the branch identity and endpoint mapping before relying on it.

For a safe preview, use a preview app plus a preview database branch, with synthetic or approved data and preview-scoped credentials. Production uses its own branch/endpoint and production-scoped credentials. When an integration creates preview branches automatically, verify which branch it created and which environment variable points to it.

On Neon, a pooled connection is commonly used for web/serverless app traffic; the direct connection may be needed for migration tools or session-specific operations. Follow the selected driver and database's current guidance. Do not paste a live URL into a terminal transcript or issue. The database branching lesson below covers branch identity and recovery in more depth.

### Choosing an arrangement

| Example need | Reasonable starting shape | Tradeoff to check |
| --- | --- | --- |
| Content-led portfolio or documentation site | Git repo + static hosting/CDN; add server functions only for a real dynamic feature | Forms, preview access, custom redirects and analytics may need separate services |
| Interactive app with accounts and relational data | Git repo + CI + app host/functions + managed PostgreSQL + separate environment values | Authentication, authorization, backups, migrations and region must be designed |
| Existing cloud team with networking/compliance needs | Git repo + CI + cloud-hosted container/functions + managed database | Greater configuration and operations ownership |
| Edge-oriented application with simple SQLite-shaped data | Git repo + edge runtime + D1 or another SQLite-compatible service | Check transaction/concurrency needs and portability before choosing |

Use an existing approved tool when it already meets the requirement. Add another product when you can state the gap it closes, its owner, data flow, permissions, expected cost, verification and exit path.

### Practice: map a fictional research app

Imagine a small research app that has a public landing page and a private saved-search feature. Its code is in GitHub, its web app is hosted on Vercel and it stores saved searches in Neon.

1. Label the repository, CI workflow, Vercel project, preview deployment, runtime, database project, database branch, endpoint and connection variable.
2. Propose one alternative for each of Git hosting, CI, application hosting/runtime and PostgreSQL. State one tradeoff for each; do not assume they can be swapped without code or configuration changes.
3. Draw the preview path and production path. Name which environment gets which database branch and credentials.
4. Name two checks before release and one check after deployment.
5. State what must be tested before calling a snapshot or rollback plan reliable.

**Answer guide:** the repository contains code and migrations; CI runs checks; Vercel builds and serves a deployment; server-side runtime code uses an environment-scoped connection variable; Neon project contains separate database branch identities and endpoints. Alternatives include GitLab or Bitbucket, GitLab CI/CD or CircleCI, Netlify or Cloudflare, and Supabase or RDS for PostgreSQL. Replacing a component can change build settings, runtime APIs, SQL behavior, networking, permissions or migration steps, so compare those interfaces before switching. A preview should not use the production credential or write to production data. Verify the deployed commit, actual user path, database endpoint/branch and errors. A rollback plan is proven only by a safe, authorized rehearsal and a measured recovery result.

### Connect this with existing Academy lessons

- [From idea to verified release](idea-to-verified-release.md) is the parent path for planning, acceptance, review and release evidence.
- [Reading code, files, JSON and YAML](reading-code-and-yaml.md) helps you inspect configuration and workflow files.
- [Databases, branching, backups, and choosing your data platform](databases-branching-recovery-and-selection.md) covers schema, branches, snapshots, endpoint identity and recovery.
- [MCP versus REST APIs](mcp-vs-rest-api.md) is useful when your application needs to call an external service.

### Sources for platform details

Checked 2026-10-24. Product behavior and plans change; use current vendor documentation before configuring a live project. Examples are categories, not endorsements.

- [Git: about version control](https://git-scm.com/book/en/v2/Getting-Started-About-Version-Control)
- [GitHub Actions](https://docs.github.com/en/actions)
- [GitHub Actions: using secrets](https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/use-secrets)
- [GitLab CI/CD](https://docs.gitlab.com/ci/)
- [Vercel: Git deployments](https://vercel.com/docs/git)
- [Vercel: deployment environments](https://vercel.com/docs/deployments/environments)
- [Vercel: environment variables](https://vercel.com/docs/environment-variables)
- [Netlify: deploy overview](https://docs.netlify.com/deploy/deploy-overview/)
- [Cloudflare Pages: Git integration](https://developers.cloudflare.com/pages/configuration/git-integration/)
- [AWS Amplify Hosting](https://docs.aws.amazon.com/amplify/latest/userguide/welcome.html)
- [Neon: database branching](https://neon.com/docs/introduction/branching)
- [Neon: manage computes and pooled connections](https://neon.com/docs/manage/computes)
- [Supabase: database overview](https://supabase.com/docs/guides/database/overview)
- [Amazon RDS for PostgreSQL](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_PostgreSQL.html)
- [Cloudflare D1](https://developers.cloudflare.com/d1/)
- [OWASP Secrets Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html)
- [OpenTelemetry: observability concepts](https://opentelemetry.io/docs/concepts/)

### Read the form before choosing

The example uses Vercel and Next.js; confirm the current repository and provider documentation rather than copying these defaults into every app.

| Setting | Meaning | Fictional example |
| --- | --- | --- |
| Team / scope | Account responsible for access, resources and billing | The owner's existing team |
| Project name | Hosting project's name; separate from repository name and custom domain | sample-market-explorer |
| Git repository | Source code to build | The approved market-explorer repository |
| Production branch | Branch used for production changes | main, after review |
| Framework preset | Platform adapter appropriate to the app | Next.js, confirmed in package.json |
| Root directory | Folder containing this app | ./ only when the app is at the repository root |
| Install command | Installs declared dependencies using the package manager/lockfile | Detected default; investigate mismatches |
| Build command | Assembles the deployable application | npm run build if the repository defines it |
| Output directory | Location of build output used by the hosting adapter | Framework default; do not guess public or out |
| Environment variables | Configuration supplied outside source code | None required for this fictional bundled-catalog app |

Vercel can detect framework build defaults [D1]. The project name is not a promise that a specific hostname is available. A generated deployment address and a custom domain are separate concepts [D3].

### Should I add integrations?

For this exercise, leave optional integrations unselected. A service is useful when implemented behavior needs it; installing it does not create that behavior.

| Capability | Evidence needed before adding a service |
| --- | --- |
| Database | Implemented durable record storage, schema, access rules and recovery plan |
| Web research provider | Implemented collection flow, approved sources, usage limits and review boundaries |
| Background scheduler | Implemented jobs with retry, deduplication and operational ownership |
| AI provider | A defined model-powered task, evaluation and spending limits |
| Authentication | A private/user-specific feature with server-side authorization |
| Analytics / monitoring | A named usage or reliability question, appropriate data handling and actionable ownership |

These are sequencing decisions for a small public example, not a rule to postpone essential security or monitoring in a private or business-critical application. Reuse approved services when possible. Check cost, permissions, data flow and an owner before activating a real integration.

Environment variables are not all secrets. Keep secret values out of Git, screenshots and chat; expose only intentionally public values to browser code. Next.js public-prefixed variables can reach the browser [D2]. Review Production, Preview and Development scope separately. Adding a key does not implement an API integration, and changing configuration does not prove an existing deployment uses it.

### From Deploy to evidence

1. Confirm approved source, branch, configuration and publication scope.
2. Deploy only with owner approval. The platform obtains code, installs dependencies and builds it.
3. If the build fails, read the first actionable error. Fix through the existing PR workflow; do not disable checks or add unrelated services to make it green.
4. If it succeeds, record the deployment URL, environment and Git commit. Confirm the revision contains the intended change.
5. Open the user-facing URL as its intended audience. Check category → vendor → comparison → original source; also check the affected Academy link.
6. Repeat the affected flow with a keyboard and narrow viewport. Check missing information and error states. A hosting dashboard's Ready status alone does not prove this behavior.
7. Record actual results and remaining gaps in the existing issue. Agree on recovery, such as reverting the scoped change and deploying the reviewed revision, before broader use.

A 403 in an assistant's hosting connection means that connection was denied access; it does not by itself establish a website outage. A missing project in one account's list does not prove the app was never hosted elsewhere. Ask for the actual site URL or inspect the correct account rather than creating duplicates.

### Check your understanding

**Scenario:** a portfolio card opens GitHub. The PR is merged, and a hosting form offers database, AI and scheduler integrations. No deployment URL has been established.

- Is the app verified live? **No. A repository link and merge are not deployment evidence.**
- Which integrations should this fictional app use? **None beyond its required hosting/source connection; its catalog is bundled.**
- What evidence closes the release task? **The intended deployed revision plus a passing real user-path check, with limitations recorded.**
- Can an agent mark the issue Done because the build passed? **No. It must satisfy the issue's actual acceptance criteria.**

**Practice output:** a completed settings table with reasons, an integration decision, and a release checklist. Record reviewed after reading; practiced after doing the exercise. Do not claim a real deployment or award a passing result without the required evidence.

### Deployment sources

Checked 2026-10-13; provider interfaces and defaults can change.

- [D1: Vercel — Configuring a build](https://vercel.com/docs/builds/configure-a-build)
- [D2: Vercel — Framework environment variables](https://vercel.com/docs/environment-variables/framework-environment-variables)
- [D3: Vercel — Generated deployment URLs](https://vercel.com/docs/deployments/generated-urls)
- [D4: Vercel — Deployment overview](https://vercel.com/docs/deployments/overview)


## Return to the parent lesson

[Continue the delivery learning path](idea-to-verified-release.md#choose-a-short-learning-path). Your settings explanation and release checklist are the practice artifacts; deploying a real app is optional and requires approval.
