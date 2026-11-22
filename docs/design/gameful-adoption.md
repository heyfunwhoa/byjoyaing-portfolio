# Game-like interaction adoption

Status: local Design Lab prototypes, not public adoption. Owner: portfolio maintainer. Tracking: KRU-150; learning coordination KRU-174/KRU-77; GTM mission KRU-147.

## Implemented in this branch

| Outcome | Implementation | Meaning of progress |
| --- | --- | --- |
| Prepare a useful opportunity brief | `components/gameful/mission-workspace.tsx` | Four fictional artifacts explicitly self-reviewed; editing invalidates review. No buyer approval or qualification claim. |
| Explore portfolio evidence | `components/design-lab/gameful-workbench.tsx` | Session-only reading checklist over the existing directory, with canonical project statuses retained. |
| Practice along a learning path | Same workbench, existing learningPaths and lessons | Correct practice answers, with explanations and original source links. Not saved Academy progress or certification. |

Entry: local `/design-lab`, which returns 404 in production. Existing public homepage, project directory and Academy navigation are unchanged. The main lesson catalog remains authoritative. Academy #238 can change path membership without requiring a second hardcoded curriculum here.

## Open-source decisions and remaining work

All eight earlier recommendations are accounted for below. A candidate is not an installed package. No upstream source was newly copied by this change.

| Resource | Decision | Destination / next concrete gate |
| --- | --- | --- |
| [Magic UI](https://github.com/magicuidesign/magicui) | Reuse the existing adapted BentoGrid, with its existing provenance and license, for exploration cards | Local workbench only; review reading flow before public adoption. |
| [React Rewards](https://github.com/thedevelobear/react-rewards) | Candidate; a local CSS completion acknowledgment currently meets the task | Only add if a particle effect proves useful; pin version/license, verify React compatibility, motion preference and cleanup before installation. |
| [DiceBear](https://github.com/dicebear/dicebear) | Candidate for fictional personas; no remote avatar requests | Choose an avatar style, inspect that style's license, bundle locally, retain attribution. Preserve the joy. identity portrait. |
| [React Flow](https://github.com/xyflow/xyflow) | Reuse installed @xyflow/react 12.12.0, MIT, without hiding attribution | Optional learning-path map with equivalent native lesson controls. Existing stakeholder map is unchanged. |
| [React Three Fiber](https://github.com/pmndrs/react-three-fiber) | Future isolated experiment, not installed | Define one explorable portfolio scene; establish mobile/static fallback, keyboard path and a measurable load budget before importing. |
| [Phaser React template](https://github.com/phaserjs/template-react) | Future isolated training-game starter, not installed | Scope one fictional secrets-triage exercise; preserve template license, avoid live credentials, test resize/input and React lifecycle cleanup. |
| [boardgame.io](https://github.com/boardgameio/boardgame.io) | Future turn-based simulation, not installed | Start with a single-player fictional budget-allocation or negotiation model; define deterministic rules and reset before considering multiplayer. |
| [Kenney assets](https://kenney.nl/assets) | Asset source candidate, no files downloaded | Select a specific pack for an approved game prototype and record its exact license/file list before importing. |

The three lightweight compositions are usable code. The remaining engine/avatar/asset items are scoped next steps, not completed integrations. Avoid adding multiple game engines to the production portfolio bundle.

## Reuse and behavior

- Reuse local Card, Magic UI-derived BentoGrid, ProjectStatusPill, labProjects, learningPaths, lessons and installed React Flow. Existing notices stay in their files/packages.
- New MissionWorkspace is a domain composition, not a new shared design system. Its portable styles resolve the consuming application's tokens. It has no storage, network adapter, analytics, auth, CRM writes or financial formulas.
- One column on phones; two-column mission/artifact and exploration composition at tablet widths; bounded optional graph at all widths. Native lesson list remains available independently of the graph.
- Controls have visible labels, 44px targets, native checkbox/radio semantics, live feedback, empty-state blocking, reset confirmation for typed notes, and review invalidation. Editing affects only that artifact. Completion has an explicit button, motion is opt-in, and OS reduced motion suppresses it.
- No drag-only action, autoplay, leaderboard, invented business metric or paid dependency. Links open source/evidence in new tabs so the session is not lost accidentally.
- Rollback: remove the GamefulWorkbench import/mount and new gameful files, restore the test command entry and adoption notes. No migration.

## Acceptance evidence

Record exact commands and observed CI in the draft PR. Required: empty review refusal, stale review invalidation, complete/reopen/reset, keyboard practice flow, narrow-screen wrapping and reduced motion. Manual screen reader and physical-device acceptance remain separate. Do not infer public release from the lab or a passing build.

## Additional component pilots (2026-11-06)

User-authorized extension of #258 / KRU-150. This scoped dependency exception applies only to these prototypes; the earlier no-dependency criteria for public page cleanup remain unchanged. Tier B synthetic UI / Delivery Tier 2. No public adoption.

| Library | Version / license | Named task and actual use |
| --- | --- | --- |
| inkjs | 2.4.0 / MIT | Runtime for an authored branching discovery conversation. Compiler runs offline through `npm run practice:compile`; generated TS string avoids importing the compiler into the client. GTM consumer: #116, `/learn/missions`. |
| react-quiz-component | 2.1.1 / MIT | Headless `useQuiz` runs a multi-question attempt, feedback and final score. Existing Academy questions/answers/sources remain canonical; native controls and local tokens replace vendor presentation. |
| Native hex selector | HTML button + CSS clip-path (no added package) | Optional numbered territories select existing Academy paths. Equivalent labeled path buttons remain present; no locked lessons or invented prerequisite graph. |

Retained packages: https://github.com/y-lohse/inkjs and https://github.com/wingkwong/react-quiz-component. Exact versions, transitive dependencies and integrity are in package-lock.json. The evaluated [react-hexgrid](https://github.com/Hellenic/react-hexgrid) alternative was removed because upstream says it is unmaintained and it introduced a deprecated optional native dependency. Keep it as a deferred reference only; the native selector fulfills this local task. See [release dependency review](gameful-dependency-review-2026-11-07.md). Package MIT notices retained by installed distributions; notices also recorded in docs/design/gameful-third-party-notices.txt. No remote assets, calls or paid service. Published peer ranges accept this repo's React 19; type/build/browser verification are separate gates.

Entry: `GamefulWorkbench` offers explicit load buttons. New modules are lazy imports; no public page imports. `DiscoveryPilot` is portable and consumes the same authored story in GTM OS. Existing single-question learning checks and React Flow map are retained for comparison. New quiz progress never writes to those checks or Academy storage.

Phone: the territory selector is three columns of native 5rem buttons; from 768px it is one row of six. Text wraps; the selector does not animate. Those buttons respond to Enter, Space and clicks, and the labeled path list selects the same quiz. Focus returns to conversation and quiz headings on advancement or reset. Sources open separately. Changing paths resets the quiz attempt; restart clears scenario choices or quiz answers and does not clear mission notes. The scenario has 16 terminal paths, including missing-baseline and missing-owner coaching and a recovery from a premature demo. No scoring of real deals.

Earlier pilot record, not the current acceptance head: 218 unit tests passed (including all 16 story endings), focused ESLint passed, and route type generation and TypeScript passed before the final UI checks of that pass. Browser cases covered consequence and restart, territory keyboard use, correct and incorrect feedback, quiz completion, reset, path switch, and 375/768/1280 overflow. Current exact-head evidence belongs in PR #274 and [the dependency review](gameful-dependency-review-2026-11-07.md). Manual VoiceOver, owner 200% zoom, and license acceptance remain open.

Rollback: remove the new mounts, discovery and learning-challenge source, content, compiler and test entries, then remove the two retained package entries (`inkjs` and `react-quiz-component`) with a regenerated lockfile. `react-hexgrid` is already absent. GTM can revert its own InkJS consumer independently. No migrations or saved user state.

## Saved potentials in the Design Lab catalog

The existing searchable component catalog (`lib/component-options.ts`) now holds 24 game-like entries: 3 available local pilots and 21 future candidates. Search **game-like**, optionally filter **Candidate**, or filter by intended app. Availability describes the portfolio only; suggested destinations are not installations.

New future candidates: RPGUI, NES.css, Matter.js, React Three Rapier, Ecctrl and Howler.js. Earlier candidates React Rewards, DiceBear, React Three Fiber, Phaser React template, boardgame.io and Kenney are now visible in the same catalog. Existing Magic UI-derived BentoGrid and React Flow reuse remain documented above. Each entry includes the source, proposed use and adoption prerequisites. Saving a potential does not schedule implementation or approve production use. No additional packages or assets added in this catalog pass.

## Cross-repository register

The [component opportunity register](component-opportunity-register.md) explains local access, repository coverage, priorities, alternatives and maintenance. The searchable catalog includes the additional TS-FSRS, Shiki Magic Move, XState, Twine, PixiJS React, KAPLAY, Excalibur, ROT.js and Trophy UI candidates. No packages were added for these records.


## Prototype chooser follow-up

`GamefulWorkbench` now begins with a task-first menu for its five existing prototypes. Each entry explains the task, output and intended destination without claiming production adoption. Reuses native fragment links and the existing card/token classes; no package, routing or persistence changes. The menu stacks on phones and uses two columns from tablet widths. Focusable fragment targets support keyboard entry without clearing practice state; no motion added. Existing Storybook overview exercises the same component. Added desktop/mobile keyboard coverage for every target and retained notes. Exact-head browser results remain in PR #258; manual zoom, screen-reader and device checks remain separate. Rollback: remove the menu/target wrappers and its scoped browser test.


## Creative asset exploration

The local landing page mounts `CreativeRecipes`, reusing native disclosures and existing brand tokens (one column on phones, two from md). Five recipes connect visual content tasks to candidate IDs owned by the creative registry in draft PR #259. The existing searchable component catalog adds five candidates for Motion Canvas, OBS, FFmpeg, Penpot and Remotion, with scoped license notes. No new runtime dependency, model API, upload, generation, tracking or publication. The fictional security example defines a comparison, not a produced asset or measured outcome. The registry branch link intentionally targets draft content until #259 merges; update to a reviewed immutable revision during adoption. Required rendered/manual checks remain open; exact-head CI is tracked in #258. Rollback: remove CreativeRecipes mount/source, catalog additions and scoped tests.
