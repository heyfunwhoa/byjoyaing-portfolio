# Public portfolio registry (P0)

The canonical *brand* is [brand guidelines](brand/brand-guidelines.md); private personal-development notes live outside this repository in the Joy Index. This registry is **public-content architecture**, not the private learning system.

## Why this exists

`lib/portfolio.ts` is the existing source for case-study fields and page rendering. `lib/portfolio-registry.ts` **derives** a small typed collection from it instead of copying titles, descriptions or evidence into another database.

- `kind`: `work` for professional field practice, `side-quest` for independent prototypes and designs. A public case study URL beginning with `/work/` does not automatically make the item professional Work.
- `status`: the existing honest project status, not a claim of production deployment.
- `href`: current canonical route; old paths are preserved until approved redirects exist.
- `evidenceReview`: always `requires-review` at this stage. A published evidence note is **not** proof of publication permission or source verification.

## How to maintain

1. Add or edit a case study in the existing `projects` array.
2. Add an explicit `kindBySlug` classification. Err on the side of Side Quests when there is no confirmed professional usage.
3. Run `npm test` for exact mapping coverage, unique slugs, required metadata and valid current destinations. Run lint/build before merging.
4. Before public redesign, review whether work claims, numbers, customer/employer details and external sources may be published. Only a reviewed editorial action should set any future approved evidence state.

## Deferred on purpose

No routes, homepage or nav change. No CRM/Notion/Joy Index synchronization. No duplicated professional Work records. A later PR should add professionally verified Work narratives and migrate the UI onto this adapter without breaking existing deep links.
