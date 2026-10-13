# UI and motion workbench reuse contract

Status: proposed in this PR; effective for this repository when merged.
Scope: portfolio implementation and a portable adoption process. Other repositories are not automatically enrolled.

## Default rule

Before creating or changing UI, check the existing component inventory, Design Lab workbench and component-options catalog. Reuse or adapt a suitable existing component. New components or dependencies need a named user task and a brief explanation of why the existing options do not fit. Reuse is a design decision, not a requirement to add motion.

Read [component-inventory.md](component-inventory.md), [design-lab.md](design-lab.md), [component-adoption.md](component-adoption.md) and the relevant entries in [lib/component-options.ts](../../lib/component-options.ts). Inspect actual source and call sites before claiming availability or adoption. Older dated inventory sections may be superseded by scoped adoption notes; resolve contradictions against code and reviewed decisions, and fix the affected entry.

## Choose and implement

1. Name the audience, task, page and essential information. Keep the primary summary and action discoverable.
2. Check existing page compositions, local components and installed primitives, then the workbench. Prefer extension over a parallel card, status, navigation or motion system.
3. Record the chosen source path, pattern/catalog ID if available, and decision: reuse, adapt, new, or no interactive component needed.
4. Specify mobile, tablet and desktop behavior, keyboard/focus behavior and relevant content states before implementation.
5. Use the destination application's tokens, framework and component family. Do not reinitialize shadcn or replace global styles.
6. Verify the changed interaction and its destination page. Update the existing inventory/adoption record, and add or update a story when useful for exercising reusable behavior.

A lab demonstration, installed dependency, passing build and production adoption are separate facts. A catalog's recommended destination is not evidence that the destination implements it. Preserve scoped public-import allowlists and existing review requirements.

## Pattern selection

| User need | Starting point | Avoid |
| --- | --- | --- |
| Scan workflows then inspect details | Summary cards with a disclosure or selected panel | Hiding the main value proposition |
| Switch mutually exclusive views | Tabs on larger screens; labeled selector where narrow space calls for it | Using tabs for filters or navigation links |
| Compare records | Semantic table, relevant filters and a detail panel | A carousel for information users must compare |
| Browse a small featured collection | Controlled rail/carousel with buttons and a full collection link | Autoplay or drag-only operation |
| Inspect optional supporting evidence | Disclosure, sheet or separate detail page | Removing provenance or access to the original source |
| Complete a multi-step task | Explicit steps and honest progress | Invented progress percentages |

## Motion contract

Use movement to explain a state change, orientation or feedback. Prefer existing CSS and timings; workbench timing choices are demonstrations, not new global tokens. No new motion dependency without the reviewed decision required by component-adoption.md.

- Honor device reduced motion and any explicit motion-off setting, including portals and carousels.
- Keep essential content visible if animation is disabled, interrupted or unavailable.
- No autoplay, continuous decorative movement, scroll hijacking or artificial delay before an action.
- Keep dense tables, numeric meaning and focus stable.
- Verify opening, closing, interrupted transitions and return of focus where relevant.

## Adoption record

Add these fields to the relevant existing adoption entry or PR; this document creates no second component catalog:

- Pattern/source path and pinned source revision for a cross-repo copy.
- Owning repo, destination route/component and responsible maintainer.
- Status: candidate, lab prototype, approved for named use, shipped at named call sites, or deprecated.
- Task solved; reuse/adapt/new decision and reason.
- Dependency/version and license/attribution review where source is imported.
- Token mapping and mobile/tablet/desktop behavior.
- Keyboard, focus, reduced-motion and relevant loading/empty/error/success states.
- Verification evidence, unchecked items, consuming locations and rollback/replacement guidance.

Status changes require evidence. Do not mark shipped from a screenshot or proposed PR alone.

## Review checklist

Use the existing responsive/accessibility checklist and required CI. For changed behavior, check:

- Small phone, tablet and desktop layouts, 200% zoom, long labels and contained overflow. Workbench preview widths do not simulate actual viewport media queries.
- Touch and keyboard operation, visible focus, accessible names, escape/close behavior and focus return for overlays.
- Applicable loading, empty, no-match, error/retry, disabled, success, stale-data and permission-denied states; mark irrelevant states N/A.
- Honest source/status labels; no private data in demos.
- Essential content and actions remain usable without movement.
- New dependencies have a justified cost; lab-only examples are not imported wholesale into production.
- Existing required checks pass; report browser or manual checks not run. Documentation alone is not an automated enforcement gate.

Collapsing content, CSS hiding and noindex do not protect confidential material. Restricted data needs application authorization and must not be included in public HTML, client bundles or fixtures.

## Cross-repository adoption

The portfolio owns its workbench examples and brand. Each consumer owns its implementation, domain logic and permissions. Technical Docs Platform is the intended home for shared engineering policy; this portfolio document does not replace that governance or claim a rollout.

For a consumer repo, first inspect its instructions, stack, current UI and relevant open PRs. Add a local instruction pointing to the reviewed workbench guidance and record its adoption status. Copy only the required, license-reviewed source, retaining provenance and tracking local changes. Share a package only after multiple real uses demonstrate a stable API and maintenance owner. Future changes should identify affected consumers and propose focused PRs, never silently synchronize them.

Suggested consumer instruction (adapt paths after verifying access):

> Before UI work, consult the portfolio Design Lab and component-options catalog, then this repository's local design rules. Prefer suitable existing patterns, preserving this application's tokens, accessibility, responsive behavior and privacy boundaries. Record reuse/adaptation and verification evidence in the PR. If the bank cannot be accessed, report that limitation and use inspected local patterns without claiming bank compliance.

## Remaining work, in order

1. Merge this repo's explicit agent/PR pointer after review.
2. Reconcile dated inventory statements when the relevant component is next touched; current inventory still contains historical lab-only wording alongside later scoped public adoptions.
3. Record real consuming locations and verification evidence for the highest-use patterns. The workbench already covers responsive and reduced-motion examples; complete actual device/browser checks where pending.
4. Add reviewed pointers and adoption records to selected consumer repos and the shared standards home. This PR does not modify those repos.
5. Test one real user task per adopted pattern: can a hiring reader find proof, or a research user find evidence and the next action? Record observations, not assumed UX improvements.
6. Consider shared packaging and automated catalog checks only when repeated use justifies maintenance.
