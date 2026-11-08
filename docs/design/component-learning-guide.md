# UI/UX component learning in Design Lab

## Purpose and ownership

The portfolio Design Lab is the canonical visual explorer. Its curated list remains [`lib/component-options.ts`](../../lib/component-options.ts). Do not create a competing exhaustive registry or duplicate the Technical Docs software catalog. Lessons live in [`lib/component-lessons.ts`](../../lib/component-lessons.ts) and play in [`components/design-lab/component-learning.tsx`](../../components/design-lab/component-learning.tsx).

Technical Docs Platform owns cross-repository UI adoption guidance. Builder Academy owns learning paths and learner review. It may cite these lessons later. It does not get a second foundations curriculum, and it is not added to `componentApps` by this pass.

Tracked as [KRU-275](https://linear.app/krusty/issue/KRU-275/design-lab-teach-visual-foundations-in-the-component-explorer) on draft PR #293. [KRU-235](https://linear.app/krusty/issue/KRU-235) remains the separate pattern-library effort.

## What a lesson contains

Each lesson in `componentLessons` answers:

| Question                                           | Field                                           |
| -------------------------------------------------- | ----------------------------------------------- |
| What is it, in plain English?                      | `definition`                                    |
| Why does it exist?                                 | `why`                                           |
| Where is it commonly used?                         | `useCases`                                      |
| What can someone try?                              | The demo keyed by `id`, described by `variants` |
| Which states or variants does the demo switch?     | `variants`                                      |
| When is it the right choice?                       | `when`                                          |
| When is it the wrong choice?                       | `avoid`                                         |
| What else could be used, and what is the tradeoff? | `alternatives`                                  |
| What has to stay accessible and readable?          | `accessibility`                                 |
| Which official page informed it?                   | `source`                                        |
| Where might it fit a named project?                | `projects`                                      |
| What should the reader do next?                    | `prompt` and `exercise`                         |

`kind` is `concept` or `component`. `level` in this pass is `foundational`. `catalogId` is set only when an existing catalog id is the same idea. Button, checkbox, select, and every foundation concept have no catalog id. Do not add a catalog row to fill that gap.

A project line is a recommendation. It is not evidence that the other repository implements the lesson.

## Learner behavior and evidence

- Example state stays in the page. The yes/no check does not write completion, analytics, credentials, or production data.
- Demonstrations use fictional labels such as Northstar, Horizon, and Lumen.
- Controls need names, visible focus, and a text status where the outcome matters. The preview-width control caps the example. It does not emulate a device or fire a viewport media query.
- An interactive example is not evidence of installation or approval in another repo.
- No upstream component source was copied for this pass. Use the local button primitive and the tokens in `app/globals.css`.

## This pass and what is still next

Shipped in the local lab by this pass:

1. **Foundations:** typography, color and contrast, spacing, alignment, responsive breakpoints, and grid/flex.
2. **Components:** button, card, tabs, accordion, search, status feedback, checkbox, select, and data table.

The feedback lesson now has its own idle, pending, saved, and failed sentences. It no longer falls through to a generic save control.

Still proposed, and not built here:

1. **Website anatomy:** header and navigation, hero, content sections, cards and grids as page sections, sidebars, footer, and calls to action. Teach them from the existing header, homepage, and footer rather than a second chrome system.
2. **Accessibility fundamentals:** semantic HTML, keyboard navigation, focus, accessible names, contrast, responsive readability, and loading, empty, error, and success states. Contrast and status are introduced in the color and feedback lessons so this track does not start as a duplicate.
3. **Later component lessons:** links, menus, combobox, dialogs, multi-step forms, charts, evidence drawers, timelines, sortable lists, diagrams, and code sandboxes.

The dated count in [`component-opportunity-register.md`](component-opportunity-register.md) stays a snapshot. The live catalog length is `componentOptions.length`.

## Reference decisions

These rows record a choice for this portfolio. They are not an install list. License files were retrieved on 2026-11-08. No package was added, and no upstream source was copied. A license file does not approve every example, template, or paid add-on on the same site.

| Option                       | What it does                               | Best use                                                                    | Strength and limit                                                                                                                                                                         | Fit here                                                           | License file retrieved                                                            | Decision                                                                       |
| ---------------------------- | ------------------------------------------ | --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------ | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| shadcn/ui                    | Copy-in components styled for a project    | One primitive a feature needs                                               | Accessible patterns with local ownership. Reinitializing overwrites tokens. The button docs page inspected the same day also warns that a Base UI button forces `role="button"` on a link. | `components.json` is `radix-nova`. Primitives already exist.       | MIT, `shadcn-ui/ui` `LICENSE.md`                                                  | **Reuse.** Do not reinitialize.                                                |
| Radix UI                     | Unstyled accessibility primitives          | Behavior for dialogs, tabs, and menus                                       | Handles focus and keyboard behavior. It does not provide this site's visual design.                                                                                                        | Installed through `radix-ui`.                                      | MIT, `radix-ui/primitives` `LICENSE`                                              | **Reuse** for the installed primitives.                                        |
| Base UI                      | Unstyled primitives from the MUI project   | A new app choosing that family                                              | A second primitive family beside Radix.                                                                                                                                                    | Not selected. See the inventory.                                   | MIT, `mui/base-ui` `LICENSE`                                                      | **Defer.** Do not migrate `radix-nova`.                                        |
| React Aria                   | Adobe's accessibility hooks and components | A different behavior layer                                                  | Strong accessibility model. It would replace, not sit beside, the Radix primitives.                                                                                                        | Only a transitive dependency today. The avatar already uses Radix. | Apache-2.0, `adobe/react-spectrum` `LICENSE`                                      | **Defer.**                                                                     |
| Mantine                      | A full React component and hook kit        | An application that adopts Mantine as its system                            | Complete, with its own theme. It would compete with the tokens and primitives already here.                                                                                                | Not installed.                                                     | MIT, `mantinedev/mantine` `LICENSE`                                               | **Reject** for this portfolio.                                                 |
| Tremor                       | Dashboard components                       | A data-heavy product that needs those compositions                          | Useful reference for summaries. It brings its own dependencies and some MIT-licensed subcomponents under an Apache-2.0 root.                                                               | Not a portfolio page pattern.                                      | Apache-2.0 root, `tremorlabs/tremor` `LICENSE`, plus the MIT notices in that file | **Defer** until a named dashboard task.                                        |
| TanStack Table               | Headless table state                       | Sorting, filtering, pinning, or pagination that a native table cannot carry | Powerful and unstyled. Extra complexity for a two-row lesson.                                                                                                                              | A native review-table baseline already exists.                     | MIT, `TanStack/table` `LICENSE`                                                   | **Evaluate** later for one real dense workflow, such as Account Signal Engine. |
| Recharts                     | React chart components                     | A chart that needs axes, series, or interaction                             | Faster than a custom chart. A chart still needs a text alternative and real data.                                                                                                          | Not installed. CSS and table baselines exist.                      | MIT, `recharts/recharts` `LICENSE`                                                | **Defer.**                                                                     |
| React Flow (`@xyflow/react`) | Node-and-edge canvases                     | A relationship diagram                                                      | Already used by the stakeholder map. A canvas is a poor default for text.                                                                                                                  | Installed for that map only.                                       | MIT, `xyflow/xyflow` `LICENSE`                                                    | **Reuse** only inside that scoped map. Do not expand it from this lesson.      |
| Storybook                    | Isolated component workshop                | Reviewing one component's states                                            | Already a dev dependency. It is not the curriculum and it is not the production site.                                                                                                      | `Design Lab/Component Learning` renders the explorer.              | MIT, Storybook `LICENSE` on the `next` branch                                     | **Reuse** as the workshop tool.                                                |
| Motion                       | Animation library                          | Movement that CSS cannot explain                                            | The core license file is MIT. Some Motion UI examples are paid, and that paid boundary was not rechecked in this pass.                                                                     | Not installed. CSS is the portfolio default.                       | MIT, `motiondivision/motion` `LICENSE.md`                                         | **Reject** until the existing motion decision says CSS is not enough.          |

## Where a foundation could be used

These are recommendations for a later, separate change in the owning repository. Nothing in this pass edits those repositories or claims they use the pattern.

| Concept                | Possible use                                                                     | Owner                                                      |
| ---------------------- | -------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| Typography             | Keep one title and quieter metadata in long writing.                             | Portfolio editorial pages. Technical Docs Platform guides. |
| Color and contrast     | Pair status words with the existing tokens. Do not create a new palette per app. | Portfolio. Detector Coverage Atlas.                        |
| Spacing                | Reuse the page column and section rhythm, and tighten only a dense review list.  | Portfolio. Channel Territory Mapping.                      |
| Alignment              | Give a screen one primary action.                                                | GTM Revenue OS. Security Market Map.                       |
| Responsive breakpoints | Check 375, 768, and 1280, and keep tables inside a named scroll region.          | Account Signal Engine. Builder Academy.                    |
| Grid and Flexbox       | Wrap summary cards, and line them up only when the container has room.           | Portfolio. Security Market Map.                            |

Builder Academy should link here when it needs a visual foundation. It should not restate these six lessons as a second track.

## Brand-reference check

Not applicable. This is internal lab teaching copy. It does not change public positioning, purpose, values, voice, or the visual shorthand in the brand guidelines.

## Pilot review

Open review PR #293. Before merging, validate lint, tests, production build, browser visual QA, keyboard and focus, screen-reader semantics, and manual mobile and zoom usability. Record results separately from proposed criteria. Keep the local-development Design Lab gate unchanged. Do not publish a new Academy track or record learner completion without explicit review.
