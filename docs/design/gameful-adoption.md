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
| react-hexgrid | 2.0.1 / MIT | Optional numbered SVG territories select existing Academy paths. Equivalent labeled HTML buttons remain present; no locked lessons or invented prerequisite graph. |

Upstreams: https://github.com/y-lohse/inkjs ; https://github.com/wingkwong/react-quiz-component ; https://github.com/Hellenic/react-hexgrid . Exact versions and transitive integrity recorded in package-lock.json. Package MIT notices retained by installed distributions; notices also recorded in docs/design/gameful-third-party-notices.txt. No remote assets, calls or paid service. Published peer ranges accept this repo's React 19; type/build/browser verification are separate gates.

Entry: `GamefulWorkbench` offers explicit load buttons. New modules are lazy imports; no public page imports. `DiscoveryPilot` is portable and consumes the same authored story in GTM OS. Existing single-question learning checks and React Flow map are retained for comparison. New quiz progress never writes to those checks or Academy storage.

Phone: stacked controls and responsive 280px-high SVG. Tablet/desktop: two-column path/choice controls. Text wraps; no animation. SVG tiles respond to Enter/Space and clicks, and native path buttons provide equivalent navigation. Focus returns to conversation/quiz headings on advancement/reset. Sources open separately. Quiz path changes reset the attempt; restart clears scenario choices or quiz answers, never mission notes. Scenario has 16 terminal paths, including missing-baseline/owner coaching and a recovery from premature demo. No scoring of real deals.

Verification: 218 unit tests passed (including all 16 story endings), focused ESLint passed, route type generation and TypeScript passed before final UI checks. Browser cases added for consequence/restart, hex keyboard, correct/incorrect feedback, quiz completion/reset/path switch and 375/768/1280 overflow. Local Storybook cannot start: `uv_interface_addresses` environment error. Hosted Visual QA and full CI remain required; manual zoom/screen-reader/contrast acceptance remains open. Exact-head evidence belongs in PR #258.

Rollback: remove new mounts, discovery/learning-challenge source, content/compiler and test entries; remove the three package entries with a regenerated lockfile. GTM can revert its own InkJS consumer independently. No migrations or saved user state.

## Saved potentials in the Design Lab catalog

The existing searchable component catalog (`lib/component-options.ts`) now holds 24 game-like entries: 3 available local pilots and 21 future candidates. Search **game-like**, optionally filter **Candidate**, or filter by intended app. Availability describes the portfolio only; suggested destinations are not installations.

New future candidates: RPGUI, NES.css, Matter.js, React Three Rapier, Ecctrl and Howler.js. Earlier candidates React Rewards, DiceBear, React Three Fiber, Phaser React template, boardgame.io and Kenney are now visible in the same catalog. Existing Magic UI-derived BentoGrid and React Flow reuse remain documented above. Each entry includes the source, proposed use and adoption prerequisites. Saving a potential does not schedule implementation or approve production use. No additional packages or assets added in this catalog pass.

## Cross-repository register

The [component opportunity register](component-opportunity-register.md) explains local access, repository coverage, priorities, alternatives and maintenance. The searchable catalog includes the additional TS-FSRS, Shiki Magic Move, XState, Twine, PixiJS React, KAPLAY, Excalibur, ROT.js and Trophy UI candidates. No packages were added for these records.
