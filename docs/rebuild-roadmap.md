# Rebuild roadmap

The next version of the site uses the brand system in [content-model.md](content-model.md). This phase does not build that version. It splits the work so each pull request can be reviewed on its own.

Positioning to aim at, when copy changes: Commercial Leader. Curious Builder. The voice stays executive. The proof stays specific. Revenue figures from jobs stay off the public pages unless a later, deliberate edit adds a number you choose to publish.

## Why small pull requests

Pull request #1 already contains the sales-and-GTM redesign, the capability pages, and the revenue-system case studies. Adding the visual system and a new About essay on top of it makes review guesswork. Small pull requests have a diff you can read in one sitting. The alternative, one long-lived branch, is how #1, #2, and #3 ended up editing the same pages from different parents.

## Route plan

Preserve every URL that exists on `main` or on pull request #1.

| Today | After the rebuild | Why |
| --- | --- | --- |
| `/` | `/` | Home. New positioning, same URL |
| `/about` | `/about` | Professional identity and the advertising degree |
| `/experience` (redirects to `/about` on `main`; a real page on #1) | `/work` as the experience index, and `/experience` redirects to `/work` | "Work" is the public name. The old URL still resolves |
| `/work/[slug]` | `/work/[slug]` | Case studies stay. Do not move them in the same change as the new index |
| `/projects` | `/side-quests`, and `/projects` redirects to `/side-quests` | Side Quests is the public name for independent work |
| `/capabilities` and `/capabilities/[slug]` (only on #1) | Keep until a later edit folds a capability into Work or Side Quests. If a URL is removed, redirect it | These links may already be shared |
| `/contact` | `/contact` | Same form |
| `/approach` | Redirects to `/about`, already | Leave the redirect |
| The Joy Index | No URL | Private. No page, no `app/joy-index`, no imported notes |

`/work` and `/work/[slug]` can exist together. In the App Router, `app/work/page.tsx` is the index and `app/work/[slug]/page.tsx` is one case study. Adding the index does not break the case studies.

Do not put Side Quest essays on `/work/[slug]` and also on a second slug. One canonical URL. The other path redirects.

## Suggested pull request sequence

Each row is one review. Do not start the next by stacking commits onto an unmerged branch unless you mean for them to ship together.

1. **This phase.** Docs, the workflow, and the inquiry-form lint fix. No visual change.
2. **Land or explicitly pause #1.** Decide that the sales-and-GTM content is the base. Rebase or close #2 and #3 with a note that their ideas return as rows 6 and 7.
3. **Content records.** One TypeScript type for a public project, with `kind: "work" | "side-quest"`. Move entries onto it without changing how pages look. Test that slugs are unique.
4. **Work index.** Add `/work` for professional experience, using the roles already written. Redirect `/experience` to `/work` if #1 had made `/experience` canonical. Keep `/work/[slug]` as case studies.
5. **Side Quests index.** Add `/side-quests` listing independent projects. Redirect `/projects` to it. Cards link to the existing `/work/[slug]` pages.
6. **About story.** Bring back the intent of #3, edited to the positioning line and the UT Austin advertising degree. One page.
7. **Visual foundation.** Bring back the intent of #2: diagrams and covers, using real project status. No decorative gradient system.
8. **Only then, page-level redesign.** Home first, then Work, then Side Quests. One page per pull request.

## What I should learn from this split

- A URL is a promise. Redirects are how you keep it.
- A type is a promise about data. If two files describe the same project, they will drift.
- CI on red means you do not merge, even when the sentence you wrote is good.
- Private notes do not become "just one example" on a public page.

## Out of scope for every row above

- Publishing The Joy Index, or summarizing it
- New npm dependencies for styling or animation
- Claiming production deployment, customer adoption, or employer revenue
- Replacing the contact form
