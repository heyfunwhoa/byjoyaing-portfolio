# Relationship and evidence explorer pilot

Status: **interactive synthetic Storybook specimen** in draft PR #318, not a deployed or cross-project-adopted component.

## Evidence model and interaction

The `RelationshipEvidenceExplorer` under `components/design-lab/` composes a relationship list, state filter and evidence detail panel. `relationship-evidence-explorer.stories.tsx` exposes it in Storybook.

- Four fictional relationships for Northstar MDR; no real firmographic or technographic assertion.
- Four evidence assessments: Verified, Inference, Unknown and Stale. These are independent semantics; an old source is not automatically false.
- Select a relationship, inspect its evidence source and observation date, collapse/expand detail, and filter by assessment. Filter changes select a visible result.
- Use text labels and semantic controls rather than visual-only arrows or status colors.
- No external calls, storage, permissions, approval, production route or writes.

## Relationship to existing PRs

- PR #276: evidence-review workflow; this explorer is for *relationship provenance*, not review approvals or workflow stage changes.
- PR #292: technology registry explorer; this is an account-relationship specimen, not a second software registry.
- PR #303: approval/agent activity/advanced workbench; no duplicate approval UI.
- PR #275/#293: shared canonical registry and lesson explorer remain authoritative. This pilot uses Storybook as an isolated specimen before any curriculum lesson integration.
- PR #318: `product-relationship-explorer`, `product-provenance`, and `product-uncertainty` represent candidate patterns, not a production promise.

## Acceptance before readiness

- [ ] `npm run lint`, `npm test`, `npm run build`, and `npm run storybook:build` on **exact current branch head**.
- [ ] Load the Storybook specimen and filter All / Verified / Inference / Unknown / Stale; verify correct count and selected detail in each case.
- [ ] Select relationships by keyboard; check visible focus, reading order and names. Confirm detail panel is understandable to screen reader users.
- [ ] At 375 / 768 / 1280 CSS px and 200% zoom, no page-wide horizontal overflow; controls and long evidence strings wrap.
- [ ] Test evidence toggle, and verify source/observed/assessment language never becomes an invented confidence score.
- [ ] Verify reduced motion does not remove information, and no synthetic CTA invokes a real action.
- [ ] Review whether relationship exploration is actually helpful in Security Market Map or Account Signal Engine before implementing either consumer.

## Next refinements

1. Consider explicit conflicting-evidence cases and a source-date freshness policy tied to each use case.
2. If needed, add an accessible evidence trail showing **original claim → normalized attribute → inferred relationship → review decision**. Never imply a transformation occurred unless modeled.
3. Add a small visual test for keyboard selection/filtering once existing PRs are reconciled.
4. Keep graph libraries deferred until a real graph navigation requirement and validated accessible fallback justify the complexity.
