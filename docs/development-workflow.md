# Development workflow

This is the loop for changing the portfolio. The goal is a reviewable pull request and a preview you can click, not a perfect commit on the first try.

## Quality checks

Run these before you push:

```bash
npm ci
npm run lint
npm run build
```

`npm run build` is the TypeScript check. Next.js 16 generates route types while it builds, then typechecks the app. A bare `tsc --noEmit` run before that build fails, because those generated types do not exist yet. That is why there is no separate `typecheck` script. Adding one that fails on a clean checkout would teach the wrong habit.

### Results recorded for this phase

Checked on 9 October 2026.

| Command | Tree | Result |
| --- | --- | --- |
| `npm run lint` | This branch, 9 October 2026, Node 22.14.0 | Passes. 0 errors, 1 warning: `components/brand-avatar.tsx` uses `<img>` |
| `npm run build` | This branch, same day | Passes. Next.js 16.3.4. Routes: `/`, `/about`, `/projects`, `/contact`, `/work/[slug]` (10 case studies), `/api/contact`, `/api/request-resume`. TypeScript finished inside the build |
| `npm run lint` | `main` before this phase | Fails. Two errors in `app/inquiry-form.tsx` (`Date.now` during render, `setState` in an effect). Same failure on pull requests #2 and #3 |
| `npm run lint` and `npm run build` | Pull request #1, commit `1644ec1` | Both passed on that larger tree, which also includes `/experience` and `/capabilities` |
| GitHub Actions | `.github/workflows/ci.yml` | On pull requests to `main`: checkout, Node 22, `npm ci`, `npm run lint`, `npm run build` |

## Why these checks, and not a larger suite

Lint catches patterns that run but will break later. The inquiry form is the example: it worked in the browser and still failed the React rules.

The production build catches broken types and missing imports. For this app, that is the highest-value automated check, because most pages are server-rendered content.

A test runner is the next check, not the first. Recommended minimum, in a later pull request:

1. Add Node's built-in test runner only if the test can be written as plain TypeScript that a runner already understands. Otherwise add one dev dependency, not a suite of them. Vitest is the usual choice for a Next app. Jest is the alternative. Vitest is enough.
2. The first test should not render a page. It should protect data: every project slug is unique, every case-study link points at a slug that exists, and no entry claims a public URL that was not supplied.
3. Do not snapshot entire pages. Snapshots fail on copy edits and teach you to ignore failures.

What I am not adding now: Playwright, Cypress, Storybook, or a paid visual-regression service. Those are useful later for a real redesign. They are overhead while the routes are still moving.

## GitHub Actions

`.github/workflows/ci.yml` runs the same lint and build on every pull request to `main`, and on every push to `main`.

Why Actions instead of only running checks on your laptop: the laptop can pass because a file was generated and never committed, or because a dependency was installed globally. `npm ci` installs from the lockfile in a clean environment. If it fails there, the branch is not ready.

The workflow asks for read-only repository permissions and cancels an older run when you push again to the same branch. A cancelled run is not a failure. A red lint step is.

## Branches

`main` is the line Vercel production should follow. Do not commit directly to it.

```bash
git checkout main
git pull origin main
git checkout -b cursor/short-description-560c
```

Branch names in this cloud environment use the `cursor/` prefix and the `-560c` suffix. On your own machine, any short lowercase name is fine (`content/about-story`). Use a name that says what the branch is for.

One branch, one purpose. The open redesign branch already does too much. New work should not be added to it unless it is part of that same redesign.

## Commits

A commit is a checkpoint with a message in the imperative: "Add the architecture notes", not "added some docs".

```bash
git add README.md docs
git commit -m "Document the portfolio architecture and the quality checks."
```

Stage files by name. `git add .` will pick up secrets, build output, and the resume PDF if one is sitting in the folder.

## Pull requests

```bash
git push -u origin cursor/short-description-560c
```

Open the pull request against `main`. The description should say:

- what changed
- what you ran (`npm run lint`, `npm run build`) and whether it passed
- what a reviewer should click

Keep the pull request draft if you are still exploring. Mark it ready when the checks are green and the description matches the diff.

## Vercel previews

Vercel builds a preview for each pull request. The preview URL is on the pull request page, in the Vercel comment or the checks list. Production (`www.byjoyaing.com`) does not change until the pull request is merged into `main` and that deployment succeeds.

Review the preview the way a visitor would: open the pages you touched, on a phone-width window and a desktop window. A green build does not mean the sentence is right.

Do not put `RESEND_API_KEY` or any other secret in the repository or in client-side code. Vercel environment variables are set in the project settings. The contact route reads them on the server.

## Merging safely

1. CI is green.
2. You looked at the preview.
3. The pull request does not contain a file from The Joy Index, a resume you did not mean to publish, or a `.env` file.
4. If `main` moved while you were working, update your branch (`git fetch origin` and `git rebase origin/main`, or merge `origin/main` into the branch). Resolve conflicts in the files git names. Do not pick a side blindly when both sides edited copy.
5. Merge. Delete the branch. Pull `main` before you start the next one.

If two pull requests edit `app/about/page.tsx`, merge one, then rebase the other. The second rebase is where you choose the words. That is expected, not a mistake.
