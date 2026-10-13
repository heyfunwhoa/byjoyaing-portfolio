# Follow one click — guided practice pilot

Status: implemented in the pilot branch on merged Academy foundation #130 (`d4d18fc`). Draft for review; not a deployment claim.

## Ownership and integration contract

This change owns the mission layout, challenge feedback and browser-local resume behavior. The Academy foundation owns lesson identities, prerequisites, resource metadata, paths, available/planned labels and navigation. Do not duplicate that registry or replace the Academy landing page.

Practice activity `follow-one-click` belongs to existing lesson `mcp-vs-rest-api`. The pilot introduces no new Academy lesson ID. Route: `/ai-academy/journeys/follow-one-click`. Parent title and prerequisite names are derived from `lessons` and `getLessonGuidance`; the practice link is added to the existing lesson metadata. The shared `academyResources` entry provides the mission title and availability, rendered using `availabilityLabels`. Retain the foundation's resource status vocabulary. Readiness must not be inferred from an activity file existing.

## Progress contract

| Marker | Meaning | Trigger |
| --- | --- | --- |
| Reviewed | Learner acknowledges reading this activity | Explicit Mark reading as reviewed |
| Practiced | At least one valid challenge answer was submitted | Check answer, correct or incorrect |
| Passed checks | Number of this activity's checks with a correct latest checked answer | Explicit Check answer |

No marker automatically sets another except answering correctly also demonstrates an attempted practice. Navigation, hints, reading a model explanation and replaying the visual flow do not pass a check. A wrong subsequent submission removes that check's passed marker. Saved markers are self-reported/browser-editable practice evidence, not identity, mastery, credentials or an authorization input. The Academy's existing reviewed-in-session marker remains scoped to its own short lesson; this pilot does not silently promote it.

Save version, existing lesson ID, activity ID, last mission step, reviewed/practiced booleans and allowlisted passed-check IDs only. No free text, answers, names, credentials or timestamps. Key: `academy:practice:mcp-vs-rest-api:follow-one-click:v1`. Storage is origin/browser/device-specific and remains until reset or site storage is cleared; no cloud sync. Corrupt/unknown records reset safely. Storage failure leaves a usable session-only experience with an honest notice. Reset clears only this activity's key; report removal failure. This first version uses last write wins across tabs; no multi-user progress system.

## Experience and reuse

- Understand → See → Try → Explain; no quiz gates on reading.
- Reuse AcademyBreadcrumb, PageMain, existing typography/colors, button treatment, native details and radio fieldsets. MissionLayout owns local step navigation, not site breadcrumbs or course paths.
- Request animation is learner-controlled step highlighting, with the equivalent ordered text always readable. No timers, autoplay, remote request, fake latency, paid model, tracking event or new dependency.
- Phone/tablet: two-column step buttons and stacked content. Desktop: step list beside content. No sticky overlap or horizontal content rail. Native keyboard controls and existing focus ring; heading receives focus after step navigation. Color transitions respect reduced motion.
- Mark every request, person, account and outcome fictional. The denied flow does not read/send the account brief. It may still consult permission records, as the explanation states.
- Public references: MDN HTTP/status codes and OWASP Authorization Cheat Sheet. Written lesson source supplied by Technical Docs PR #30 is design input; learner content is self-contained and does not require private repository access.

## Acceptance and verification

- Existing registry/metadata and status labels reused: implemented via `getClickMissionMetadata`, covered by a metadata projection test.
- Four-step lesson, successful/denied simulation, hints, correct/incorrect feedback, teach-back and source links.
- Unit coverage: corrupt/incompatible/oversized storage; scoped persistence; independent progress markers; invalid answers; repeated and corrected checks.
- Browser coverage: reload/resume/reset, wrong then corrected answer, denied/allowed simulation, storage unavailable, keyboard heading focus and viewport overflow.
- Local lint/type/build and CI results belong in the PR. Browser checks require an available browser; source tests do not establish visual conformance. Manual 200% zoom and real-device checks remain separate.

Rollback: remove the practice metadata link and route, then this isolated component/model. The namespaced local record is inert without the pilot; do not clear unrelated browser storage. No backend migration.

## Integrated delivery state

Foundation [PR #130](https://github.com/heyfunwhoa/byjoyaing-portfolio/pull/130) merged before route integration. Reconciled its test command without removing any checks. The public route and Storybook preview now consume the same metadata projection. Discovery uses the existing guides/labs resource list and the parent lesson's practice link; no Academy landing component or navigation rewrite.

Validated locally: 168 unit tests, full lint, TypeScript and production builds (app and Storybook; exact results also recorded in the PR). Tests in `tests/visual/follow-one-click.spec.ts` exercise the mission; `tests/site/follow-one-click.spec.ts` verifies discovery, direct route/reload and breadcrumb return. The local browser download was unavailable; hosted browser evidence remains required. Manual 200% zoom, real-device and screen-reader checks remain pending.
