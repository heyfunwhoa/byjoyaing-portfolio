# Academy foundation and mission handoff

The navigation and lesson metadata foundation organizes existing content. Mission work should start from this foundation after its PR merges. New lessons and the mission experience are separate follow-ups.

## Extension points

| File | Contract to extend |
| --- | --- |
| `lib/ai-academy.ts` | Canonical lesson bodies and existing `slug` IDs. Preserve IDs when adding mission references or progress storage. |
| `lib/academy/lesson-guidance.ts` | `LessonId`, `lessonGuidance`, `getLessonGuidance`, prerequisite IDs, preparation/practice/guide links, and availability. `academyResources` describes separate guides, simulations and planned resources; its IDs are not lesson IDs. |
| `lib/academy/learning-paths.ts` | Stable path IDs and ordered lesson slugs. AI starts at `what-is-ai`; frontend and delivery have independent entry points. |
| `components/ai-academy/academy.tsx` | Path chooser, selected-path steps, track/lesson selectors, prerequisites and previous/next navigation. Extend these handlers and focused lesson heading rather than creating a competing catalog. |
| `app/ai-academy/page.tsx` | Server-rendered resource disclosure and availability labels, passed into Academy as a slot. |
| `components/academy-breadcrumb.tsx` | Academy return navigation; reuses the shared collection breadcrumb. Preserve existing route trails in new mission routes. |
| `lib/academy/programming.ts`, `lib/academy/guided-lessons.ts` | Existing programming module IDs and actual guided content. Two tutorials exist; the remaining eight modules are planned. Keep these distinct from short-lesson IDs. |
| `components/ai-academy/programming-foundations.tsx` | Existing programming explorer and guided/planned presentation. |
| `lib/academy/lesson-guidance.test.ts`, `tests/site/academy-foundation.spec.ts` | Metadata coverage, prerequisite integrity, independent entry points, reading/check separation and navigation regression gates. |

## State and availability contracts

- **Reviewed** is a learner's reversible, self-reported reading flag. It currently lasts only while the Academy component is mounted. It does not mean practiced, passed, completed a mission, or demonstrated competence.
- The knowledge-check answer is separate state, cleared when selecting another lesson. A correct answer neither marks reading reviewed nor unlocks navigation. Practice links likewise confer no completion credit.
- Future mission practice attempts and passed checks need distinct evidence/state keyed by stable lesson/mission IDs. Do not migrate `reviewed` into a passed or practice field. This foundation introduces no persistence or mission scoring schema.
- `availability` describes content readiness (`available`, `partial`, `planned`), independently of format (`short-lesson`, guide, simulation, roadmap). It is not learner progress or access authorization.
- Prerequisites are suggested preparation, not gates. AI basics belongs to the AI path; it is not a universal prerequisite. A mission may reference prerequisites without requiring every learner to start with AI.
- Preserve the five existing path IDs (`foundations`, `delivery`, `frontend`, `research`, `verification`). Path order is a suggestion, not a passed-check sequence.
- Planned systems modules remain outlines. Programming explorer examples do not make all programming modules guided lessons. Missions must not advertise these resources as ready exercises.
- Existing lesson companions remain canonical when present; guidance supplies missing companion links and connects existing practice. Avoid duplicate lesson bodies or a second course registry.

## Scope and remaining priorities

This foundation implements the navigation/metadata slice of audit Batch B: entry points, honest availability, prerequisite guidance, links to existing practice and next/previous reading. It preserves the merged breadcrumb work. It adds no lessons, providers, dependencies, authentication or paid model calls.

Use `CURRICULUM-AUDIT.md` for the later instructional queue. The app-understanding sequence and remaining lesson authoring stay deferred. Mission design can now compose the existing IDs and metadata without interpreting reading review as assessed progress. URL-addressable lesson selection and persistent learner state remain future work.
