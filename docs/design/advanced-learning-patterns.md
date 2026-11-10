# Advanced Design Lab learning patterns

Five advanced lessons extend the existing `lib/component-lessons.ts` registry and `ComponentLearning` explorer. They do not create a new registry, production route, CMS, or Builder Academy curriculum. The original **Data table** lesson remains a basic semantic comparison, while **Advanced data grid** teaches interaction.

| Lesson | Working specimen | Compare against | Canonical family | Potential consumer |
| --- | --- | --- | --- | --- |
| Advanced data grid | Filter, sort, select, switch table/cards | Native table or card list | `data` | GTM Revenue OS, Channel Territory Mapping |
| Visual workflow builder | Select, enable/skip, switch outline/path, simulate | Checklist or node canvas | No new catalog family | GTM Revenue OS, Portfolio Ops Runtime |
| AI agent activity | Inspect proposed stages and approve/reject a fictional action | Chat transcript or audit timeline | No new catalog family | Account Signal Engine, GTM Revenue OS |
| Visual rule builder | Compose typed criteria with AND/OR | Simple dropdowns or text query | No new catalog family | Channel Territory Mapping, Account Signal Engine |
| Interactive learning playground | Two questions with immediate feedback | Static reading or isolated sandbox | No new catalog family | Builder Academy, Technical Docs Platform |

## Scope and reuse decisions

- All examples use fictional, local state. **No** CRM, n8n, agent, database, network execution, export, permission grant, or learner progress persistence is implemented.
- Continue using the existing site tokens, button components, lesson contract and Storybook explorer story.
- `@xyflow/react` is already installed elsewhere in the repository but is **not** needed for this instructional linear workflow. If real branches or graph editing become necessary, evaluate it in the owning application's repository with a text outline alternative.
- TanStack Table, complex query builders, code runners and AI SDK libraries are comparison references only, **not installed** for these five demos.
- The catalog remains the authoritative opportunity inventory, while consumer repositories own actual adoption, access control, evidence, and integration.
- References and license checks belong in the existing `component-learning-guide.md`; this file is a scoped follow-up. No third-party snippet was copied.

## Quality checklist

- Unit test checks presence of all five lessons, mapping to demo keys, synthetic labels, approval controls, a table region and form semantics.
- Run `npm run lint`, `npm test`, and `npm run build` on the branch. Passing a source check does **not** establish browser or accessibility conformance.
- Test lesson search, switching tracks, related links, and state reset when moving between lessons.
- Manual browser review at 375px, 768px, 1280px and 200% zoom, keyboard-only, screen reader, reduced motion and overflow.
- Test table/cards accessibility, filter/sort/selection summaries, workflow simulation versus execution, approval decision state, AND/OR criteria, and playground feedback.
- Confirm the production Design Lab gate stays closed until an explicit decision to publish it.

## Graduation gates

For adoption in another repository, create a separate task: identify real user, validated problem, data owner, permissions, source and recency, expected loading/error/empty states, event logging and audit requirements, a11y tests, performance envelope and rollback. A local demo is not production approval.
