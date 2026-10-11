# Implementation roadmap

**Status:** Proposed sequence after review. This audit branch does not implement it.  
**Constraint:** small pull requests onto `main`, each with tests. Do not merge this documentation branch as a site release.

The five buckets from the assignment are reordered by the backlog.

## Release 1 — Foundation

**Intent.** A stranger cannot land on the retired headline, and crawlers receive one index policy.

- AUD-01 `/prototype` production gate or removal. Test beside `lib/design-lab-gate.test.ts`.
- AUD-02 sitemap and robots agreement. Test that every sitemap path is free of `noindex` in its `page.tsx`, or maintain an explicit allow list.
- AUD-11 read `/private-work` and record the access result in the security note. Change code only if the page is ungated and sensitive.
- AUD-12 custom not-found title.
- Re-test the closed mobile menu at 320 and 375. The source already uses `hidden`. File a defect only if the retest shows leftover space.

**Files likely touched:** `app/prototype/page.tsx` or `lib` gate, `app/sitemap.ts`, academy `page.tsx` metadata, `app/not-found.tsx`, `app/private-work/page.tsx` only if AUD-11 requires it, tests.

## Release 2 — Positioning and storytelling

- AUD-03 kind label and nav highlight. Test `isActive` with a side-quest slug and the competitive-intelligence slug.
- AUD-04 copy scan with no new facts.
- AUD-05 homepage trim only where a section duplicates `/work`.
- AUD-06 footer links to existing routes.
- AUD-08 stays a separate decision on PR #53. Do not mix that branch into Release 2 by default.
- AUD-14 brand-guide status sentence, owner-approved, in the same PR as no other visual change.

## Release 3 — Project experience

- Confirm synthetic studies display the fictional label in the same view as any number. Fix the label if the re-read shows a gap. Do not change the numbers.
- AUD-10 market-map summary when copy is approved. `kind: "side-quest"`. Technology logos only for stacks verified the way `verified-stacks.ts` already requires.
- Related links between the competitive study, Field Notes, and Side Quests already exist. Extend them only when a new page exists.

## Release 4 — Technical quality

- AUD-07 title helper.
- AUD-09 browser evidence attached to the PR.
- `npm test`, lint, `npm run build`.
- Performance: run one real trace and paste it. Do not add a score to the PRD in advance.
- Leave CI workflows in place.

## Release 5 — Selective enhancement

- Avatar and motion work only with approved assets and a reduced-motion check.
- New components only if Release 2 could not express kind with existing type styles.
- Design-lab demos stay unmounted.

## Guardrails for every batch

1. List the files.
2. State the user-visible change.
3. Keep the diff to that change.
4. Run the project tests and build.
5. Check the touched route on a narrow and a desktop width.
6. Record the accessibility checks that apply.
7. Look at Home, Work, and Contact if the header or footer changed.
8. Update the canonical doc if a rule changed. Leave this audit folder as the dated record.
9. Summarize remaining risk. Do not deploy until the owner asks.
