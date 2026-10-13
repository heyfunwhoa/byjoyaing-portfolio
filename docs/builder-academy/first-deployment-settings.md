# Builder Academy — First deployment: settings and integrations

**Parent:** [From idea to verified release](idea-to-verified-release.md) · **Level:** Beginner · **Time:** Optional 15-minute practice budget
**Status:** Companion lesson source for review; no standalone lesson ID, automatic publication or progress credit.

**Outcome:** explain a hosting form, choose only what the app needs, and distinguish a successful build from a verified release. This fictional public market explorer ships with a bundled catalog. It has no private records, required database or live research service. Do this as a paper exercise first; deploying a real project requires its owner's approval.

### Repository, website and portfolio link

A repository stores source code. A hosting project builds and serves that code. A portfolio card can link to either one. Finding a GitHub link inside another website does not mean the app is hosted inside that website. Before creating a new hosting project, check existing project names, connected repositories, domains and any configured proxy routes.

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
