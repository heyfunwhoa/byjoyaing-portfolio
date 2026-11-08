# UI/UX component learning in Design Lab

## Purpose and ownership
The portfolio Design Lab is the canonical visual explorer. Its curated list remains `lib/component-options.ts`; do not create a competing exhaustive registry or duplicate the Technology Docs software catalog. `components/design-lab/component-learning.tsx` provides nine guided educational examples. Technical Docs Platform owns cross-repository UI adoption guidance; Builder Academy owns learning paths and learner review after its curriculum reconciliation.

## Entry requirements
A lesson must answer:
1. What is the component in plain English?
2. What user task does it solve, and when is it the wrong choice?
3. What is a safe, operable live demonstration using synthetic data?
4. What alternatives exist, and what are their tradeoffs?
5. Which named repositories might use it and why?
6. What question or practice checks understanding?
7. What official source and accessibility guidance inform it?

## Learner behavior and evidence
- Example interaction state stays local. No learner-completion writes, analytics claims, credentials or production integrations.
- Demonstrations must support keyboard, labels, visible focus, error/empty/success states, reduced motion, and meaningful layouts at 375/768/1280px and 200% zoom.
- An interactive example is not evidence of installation or approval in another repo.
- Any copied source records upstream revision, license, and owner. Use existing local primitives before adding a new package.

## Expansion order
1. **Foundations:** typography, spacing, color, contrast, responsive grid and semantic structure.
2. **Navigation and input:** links, menus, select, combobox, checkboxes, dialogs and multi-step forms.
3. **Working with data:** tables, filters, charts, evidence drawers, loading/error states.
4. **Complex patterns:** guided lessons, timelines, sortable lists, diagrams and code sandboxes.

Each additional lesson should link its existing catalog ID rather than add a disconnected inventory record. Favor actual beginner tasks and controlled pairwise comparisons over decorative component lists.

## Pilot review
Open review PR #293. Before merging, validate lint, tests, production build, browser visual QA, keyboard/focus, screen reader semantics, and manual mobile/zoom usability. Record results separately from proposed criteria. Keep the local-development Design Lab gate unchanged. Do not publish a new Academy track or record learner completion without explicit review.
