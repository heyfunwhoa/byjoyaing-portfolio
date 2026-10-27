# Infisical local try-out

Optional local secret injection for development. **Vercel remains the source of truth for deployed (Preview/Production) environment variables** until a separate, reviewed sync is approved. Do not migrate real Resend, PostHog, Better Auth, or Keystatic secrets into Infisical on first trial.

Use [Infisical Cloud](https://app.infisical.com) plus the CLI. Skip Docker Compose self-hosting unless you specifically want to operate Postgres, Redis, and the Infisical server yourself.

## 1. Cloud signup and practice project

1. Create a free account at [app.infisical.com](https://app.infisical.com) (US or EU region).
2. Create a project (for example `byjoyaing-portfolio-dev`).
3. In the **Development** environment, add only non-sensitive practice secrets (for example `NEXT_PUBLIC_NAME=Joy`). Do not paste production API keys yet.

## 2. Install the CLI (laptop)

Prefer your laptop for login (browser OAuth). Cloud Agent VMs are awkward for interactive auth.

| Platform | Install |
| --- | --- |
| macOS | `brew install infisical/get-cli/infisical` |
| Node (any OS) | `npm install -g @infisical/cli` |

Confirm:

```bash
infisical --version
```

Official install options: [Infisical CLI install](https://infisical.com/docs/cli/install).

## 3. Log in

```bash
infisical login
```

Choose Infisical Cloud, then finish browser auth. On headless SSH / remote shells use `infisical login -i`. Check with `infisical login status`.

## 4. Link this repository

From the portfolio root (after login):

```bash
infisical init
```

Select your org and project. That creates `.infisical.yaml` with a **project reference only** (no secret values). It is safe to commit once you want the team pointed at the same Infisical project.

## 5. Run Next.js with injected secrets

```bash
npm run dev:infisical
```

Equivalent:

```bash
infisical sm run --env=dev -- npm run dev
```

The app still reads `process.env` as usual. Client-exposed values still need the `NEXT_PUBLIC_` prefix. Guides: [local development](https://infisical.com/docs/documentation/guides/local-development), [Next.js](https://infisical.com/docs/integrations/frameworks/nextjs).

## Explicitly deferred (not in this try-out)

- Replacing Vercel Production/Preview env for Resend, auth, PostHog, or Keystatic
- Infisical → Vercel secret sync
- Docker / self-hosted Infisical in this repo
- Committing `.env.local` or real secrets to git

Treat production sync as a separate Tier 2 change with access control, rotation, and rollback reviewed before any real key migration.
