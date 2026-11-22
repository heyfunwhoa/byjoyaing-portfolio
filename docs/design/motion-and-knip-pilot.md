# Selective Design Lab motion and read-only dependency audit

**Status:** proposed draft implementation, 2026-11-07. No new runtime packages, CMS/LLM infrastructure, production routes or automatic cleanup.

## Design Lab pilot

Storybook source: `components/design-lab/evidence-motion-pilot.stories.tsx`. Inspect via `npm run storybook` and open **Design Lab / Selective Motion / Evidence Disclosure**.

- Reuses native `<details>` and CSS instead of installing Motion Primitives or Magic UI. The only movement is a short chevron state cue, disabled through `prefers-reduced-motion`.
- Demonstrates a synthetic Account Signal Engine style research card: a known public-style signal, explicit unknowns, and a reviewer next step. No source fetch, persisted state or actual business approval.
- Manual acceptance still needed: mouse, Enter/Space toggle, focus visibility, zoom at 200%, reduced-motion setting and 375/768/1280 layouts; verify exact Storybook UI and build on branch.
- Component selection gate: try native CSS and the preexisting workbench before external motion. PR #262 already catalogs motion candidates; PR #263 builds form/table/chart Storybook baselines. This story deliberately avoids duplicating those changes. TanStack Table remains a candidate for one real data-table requirement only.

## Knip inventory

Optional workflow: `.github/workflows/knip-inventory.yml`. It uses Node 22, `npm ci` and ephemeral `npx --yes knip@5 --reporter compact`. Reports stdout and a short GitHub job summary. Dependency versions in the repository lockfile are not changed by this workflow; Knip itself is not added to `package.json`. Pull-request triggering is limited to the pilot's files, and the workflow is also available for manual dispatch once GitHub recognizes it.

**Boundaries:** read-only diagnostic, advisory status; the workflow returns success even when Knip finds unused exports or dependencies. It does not apply `--fix`, remove files, modify packages, or turn findings into a new required check. Running the workflow uses a GitHub Actions runner and ephemeral npm download/cache, so it is not literally zero-resource.

### Triage a Knip result

1. Save the exact path, import/export/dependency, and tool version from the run log.
2. Check Next.js app router conventions, `app/**/page.tsx`, layout, route handlers, dynamic imports, Storybook stories and hidden build/test entrypoints before deciding an item is unused.
3. Verify against current `main` and the active draft PRs. False positives are expected when features exist on other branches.
4. Categorize `confirmed removable`, `framework/entrypoint required`, `used in draft PR`, or `needs inspection`. Do not remove anything in this pilot.
5. If a confirmed improvement matters, create a separate small cleanup PR with tests, security checks, rollback, and exact-head evidence.

## Release decision

The code exists as a draft proposal, not a shipped or validated Design Lab component. Run existing Storybook build, lint, tests and affected browser checks. Do not merge until owner review and a completed evidence record. The Payload CMS and Langfuse/OpenLIT/Opik evaluations remain deferred.
