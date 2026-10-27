# Infisical local try-out (plain-language guide)

This guide walks you through trying Infisical on your **laptop** so the portfolio app can read practice secrets while you develop. It explains what we already set up in the repo, what you still do by hand, and what each step means.

You do **not** need to understand servers or DevOps to complete this. You need a web browser, this portfolio project open on your computer, and comfort pasting a few short commands into Terminal (macOS) or your usual command line.

---

## What problem does this solve?

Web apps often need **secrets**: passwords and API keys the public site must never show (email senders, analytics, login providers, CMS tokens, and so on).

Today, the **live** site (what visitors see on the internet) gets those values from **Vercel**, our hosting product. That stays true. Nothing in this try-out moves production keys.

When you run the site **on your own computer** (“local development”), the app still needs some settings. Infisical is an optional helper: you store practice values in Infisical’s cloud dashboard, then a small tool on your laptop hands those values to the app when you start it.

Think of it like this:

| Place | Who holds the keys right now |
| --- | --- |
| Live / preview site on the internet | **Vercel** (unchanged) |
| App running on your laptop (this try-out) | **Infisical Cloud**, if you finish the steps below |

---

## What we already installed in the repository

A merged change ([PR #212](https://github.com/heyfunwhoa/byjoyaing-portfolio/pull/212)) added two things you can use once your laptop is linked:

1. **This guide** — `docs/operations/infisical-local-tryout.md`
2. **A shortcut command** in `package.json` named `dev:infisical`

That shortcut means: “Ask Infisical for Development secrets, then start the usual Next.js dev server.” The exact command behind it is:

```bash
infisical sm run --env=dev -- npm run dev
```

You normally only need the short form:

```bash
npm run dev:infisical
```

We did **not** put real production keys into the repo. We did **not** connect Infisical to Vercel. We did **not** require Docker or a self-hosted Infisical server. This is intentionally a light, optional path.

A short pointer also lives in [docs/development-workflow.md](../development-workflow.md) so the day-to-day Git workflow mentions this option.

---

## Words you will see (quick glossary)

| Term | Plain meaning |
| --- | --- |
| **Secret** | A value the app needs that should not be published (API key, password, token). |
| **Environment** | A labeled bucket of secrets. We only use **Development** for this try-out. |
| **CLI** | “Command-line interface” — a program you run by typing a command, not by clicking a website. Infisical’s CLI is named `infisical`. |
| **OAuth / browser login** | Infisical opens your browser so you can sign in safely; your password is not typed into Terminal. |
| **`.infisical.yaml`** | A small project file that says “this folder belongs to Infisical project X.” It does **not** contain secret values. |
| **`NEXT_PUBLIC_…`** | A naming rule in Next.js: only variables with this prefix are allowed into browser-side code. Practice values meant for the client should use it. |
| **Vercel** | Where the portfolio is hosted online. Still the source of truth for Preview and Production env vars. |

---

## Before you start — safety rules

- Use **practice** secrets only (for example `NEXT_PUBLIC_NAME=Joy`). Do **not** paste real Resend, PostHog, Better Auth, Keystatic, or other production keys into Infisical yet.
- Prefer doing login on your **laptop** (browser opens). Cloud Agent or remote SSH machines are awkward for the “open browser to sign in” step.
- Skip Docker / self-hosting Infisical unless you specifically want to run Postgres, Redis, and Infisical yourself. This guide uses **Infisical Cloud** only.
- Do not commit a `.env.local` file that contains real secrets.

When you are ready to move real keys or sync Infisical → Vercel, that is a **separate, reviewed** change (access control, rotation, rollback)—not part of this try-out.

---

## Step 1 — Create an Infisical Cloud account and practice project

**Why:** Secrets need a home in the cloud before your laptop can fetch them. The free Infisical Cloud account is that home.

1. Open [app.infisical.com](https://app.infisical.com) in your browser.
2. Create a free account. Pick a region (US or EU) when asked—either is fine for a practice project.
3. Create a **project**. A clear name helps later, for example: `byjoyaing-portfolio-dev`.
4. Open the **Development** environment for that project.
5. Add one harmless practice secret, for example:
   - **Key:** `NEXT_PUBLIC_NAME`
   - **Value:** `Joy`

You should see the secret listed in the dashboard. If you can see it there, Infisical is holding it for later.

---

## Step 2 — Install the Infisical CLI on your laptop

**Why:** The website stores secrets; the CLI is the small program on your computer that can log in, link this repo, and inject secrets when the app starts.

### macOS (Homebrew)

If you already use Homebrew:

```bash
brew install infisical/get-cli/infisical
```

### Any OS with Node.js / npm

If you already use Node for this portfolio:

```bash
npm install -g @infisical/cli
```

(`-g` means “install for your user account so the `infisical` command works from any folder.”)

### Confirm it worked

```bash
infisical --version
```

You should see a version number (for example `0.44.x`). If the terminal says the command was not found, the install did not land on your PATH yet—re-open the terminal window and try again, or use the [official install options](https://infisical.com/docs/cli/install).

---

## Step 3 — Log in with the CLI

**Why:** Your laptop must prove it is allowed to read secrets from *your* Infisical org. Login opens a browser so Infisical can authenticate you.

In Terminal:

```bash
infisical login
```

1. Choose **Infisical Cloud** when prompted.
2. Finish signing in in the browser window that opens.
3. Return to the terminal when it says you are logged in.

Optional check:

```bash
infisical login status
```

**Remote / headless tip:** If you are on a machine with no browser UI, use `infisical login -i` (interactive / device-style flow). Prefer the normal laptop path when you can.

---

## Step 4 — Link this portfolio folder to your Infisical project

**Why:** Infisical needs to know which cloud project belongs to *this* code folder.

1. In Terminal, go to the portfolio repository root (the folder that contains `package.json`).
2. Run:

```bash
infisical init
```

3. Select your organization and the practice project you created (for example `byjoyaing-portfolio-dev`).

That creates a file named `.infisical.yaml`. It stores a **project reference only**—an ID pointing at Infisical—not your secret values. Once you are happy with the link, that file is safe to commit so future work points at the same project.

---

## Step 5 — Run the site with Infisical-injected secrets

**Why:** This is the payoff. Instead of starting the app with plain `npm run dev`, you start it through Infisical so Development secrets are available as environment variables.

From the portfolio root (while logged in and after `infisical init`):

```bash
npm run dev:infisical
```

What that does, in order:

1. Calls the Infisical CLI.
2. Asks Infisical Cloud for secrets in the **dev** environment.
3. Starts the usual Next.js development server with those values available to the app.

You should see the familiar local URL (often `http://localhost:3000`). The app still reads `process.env` the same way it always has; Infisical is only the delivery method for local runs.

If something fails:

- Confirm `infisical login status` shows you as logged in.
- Confirm you ran `infisical init` from the portfolio root.
- Confirm the practice secret exists under **Development** in the Infisical dashboard.
- Confirm the CLI is installed (`infisical --version`).

More detail from Infisical: [local development](https://infisical.com/docs/documentation/guides/local-development), [Next.js](https://infisical.com/docs/integrations/frameworks/nextjs).

---

## What success looks like

You are done with this try-out when all of the following are true:

- [ ] Infisical Cloud account + practice project exist
- [ ] At least one practice secret sits in **Development** (not real production keys)
- [ ] `infisical --version` works on your laptop
- [ ] `infisical login` completed in the browser
- [ ] `infisical init` created `.infisical.yaml` in the portfolio root
- [ ] `npm run dev:infisical` starts the site locally

At that point you have exercised the optional local path end to end. Production and Preview on Vercel are unchanged.

---

## Explicitly out of scope (do not do these in this try-out)

- Replacing Vercel Production/Preview env for Resend, auth, PostHog, Keystatic, or similar
- Turning on Infisical → Vercel secret sync
- Running Infisical via Docker / self-hosting in this repo
- Committing `.env.local` or real secrets to git
- Treating Cloud Agent auth as a substitute for laptop login

Treat any production sync as a separate Tier 2 change with access control, rotation, and rollback reviewed before real key migration.

---

## Recap: who did what

| Work | Status |
| --- | --- |
| Docs + `dev:infisical` script in the repo | Done (merged in PR #212; this guide expanded for plain language) |
| Infisical Cloud signup and practice secrets | **You**, on your laptop / browser |
| CLI install, login, `infisical init` | **You**, on your laptop |
| Daily local run via `npm run dev:infisical` | **You**, after the steps above |
| Moving real keys / syncing to Vercel | Not started — separate reviewed project |
