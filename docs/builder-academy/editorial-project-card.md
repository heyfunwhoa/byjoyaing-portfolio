# Lesson: Editorial ProjectCard

**Component:** `components/editorial-project-card.tsx`  
**Data:** `lib/design-lab.ts`  
**Preview:** `/design-lab` while `next dev` is running  
**Brand:** [brand-guidelines.md](../brand/brand-guidelines.md)

This lesson explains the lab card. It does not replace `components/project-card.tsx`, which still serves the sales use-case browser.

## 1. Problem

A project card has to answer four questions without a second click: what it is, what kind of work it is, how finished it is, and where the write-up lives. The directory currently builds that layout inside `ProjectsDirectory`. A second layout lives in `ProjectCard` for sales facts. The lab card is a third, smaller shape you can preview before choosing one.

## 2. React concepts

The card is a function that returns JSX. JSX looks like HTML inside JavaScript. React turns it into elements the browser can paint.

`ProjectBento` is a parent. It renders one `EditorialProjectCard` per project. That is composition: the gallery does not know how a title is styled, and the card does not know how the grid is split.

`DesignLabGallery` is a client component because it reads the URL and updates it. The card itself has no `useState`. It only displays the project it is given. Prefer that. State that the card does not need should stay in the parent.

## 3. Props and TypeScript

The prop is one object, `project`, typed as `LabProject` in `lib/design-lab.ts`.

| Field | Job |
| --- | --- |
| `title` | Visible name and the start of the link name |
| `category` | Kind plus the first existing directory category |
| `summary` | The directory summary. Not new marketing copy |
| `href` | `/work/[slug]`, the case study that already exists |
| `status` | `field`, `prototype`, `designed`, or `exploring` |
| `technologies` | The directory's technology sentence |
| `figure` | Optional one-line description of a sample. Omitted when the preview is only a note |
| `featured` | True only for Competitive Intelligence Engine |
| `destinationLabel` | "Read the field approach" or "Read the case study" |

TypeScript checks that a caller passes those fields. If you pass a status that is not one of the four, the project fails typecheck. The tests also check that summaries are the directory text and that only one card is featured.

## 4. Tailwind utilities

Utilities are class names that set one style each.

- `flex h-full min-w-0 flex-col` stacks the contents and lets the card fill the grid cell. `min-w-0` lets long words shrink instead of forcing a horizontal scroll.
- `editorial-panel` is the shared border and radius from `app/globals.css`.
- `bg-card` is the warm inset surface. The featured card uses `bg-foreground`, the charcoal token.
- `p-5 sm:p-6` is 1.25rem of padding, and 1.5rem from 640px up.
- `hover:border-accent` turns the border copper on hover. The featured card changes background instead, because a copper border on charcoal is hard to see.
- `mt-auto` pushes the destination line to the bottom of the card so neighboring cards line up.
- `font-display` is Geist Sans at weight 600. It is not a different font family.

## 5. Responsiveness

The card does not set columns. `ProjectBento` does.

- Below 768px the list is one column. Cards stack in reading order, featured first.
- From `md` (768px) there are two columns. A featured card uses both.
- From `lg` (1024px) the grid has six tracks. The featured card spans four. Other cards span two, so three standard cards fit on a row only when none of them is featured. With a featured card, two standard cards sit beside it only if the span math allows; the usual result is the featured card and one standard card on the first row.

Padding and type do not jump at phone widths. The title on a featured card is `text-3xl`. On a standard card it is `text-xl`.

At 200% zoom the page becomes narrower, so a 1280px window behaves like 640px and stacks the cards. That is the intended mobile layout, not a separate zoom stylesheet.

## 6. State and interactions

The card does not store state. The gallery does.

`useSearchParams` reads `collection`. `parseLabFilter` accepts `all`, `work`, `side-quest`, `gtm`, and `technical`. Anything else, including `research`, becomes `all`. `router.replace` writes the query without scrolling the page back to the top.

Filter buttons call `onChange`. They do not navigate by themselves. The URL is the source of truth, so refresh keeps the filter.

Hover and focus change color. They do not fetch data. The article has the `group` class, so the existing `.nudge-link` rule moves the arrow on hover and when focus is inside the card. Reduced motion collapses that move.

## 7. Accessibility

- The card is an `article`. The title is an `h3` inside a link.
- The link's screen-reader text adds the destination, so the name is "Competitive Intelligence Engine. Read the field approach" rather than the title alone.
- `after:absolute after:inset-0` stretches the link across the card. There is still one tab stop. Do not put a button or a second link inside the card.
- The figure is text, not an image with a meaningless alt.
- The status pill is text, not color alone.
- Filter buttons use `aria-pressed` and `min-h-11`.
- An empty list renders a `role="status"` sentence.
- The article draws the copper focus ring when focus is inside it. The link itself clears its own outline so two rings do not stack.
- Reduced motion is handled globally. This card does not add an animation that would ignore that setting.

## 8. How to test

`lib/design-lab.test.ts` checks the production lock, the featured project, hrefs, and the filters. It does not open a browser.

In `next dev`, open `/design-lab`. Tab to a filter, press Enter, and confirm the query string changes. Tab into a card and confirm the outline appears on the card. At 375px, cards are one column. Request reduced motion in the browser and confirm the arrow does not travel.

`npm run build` must leave `/design-lab` as a 404. The test `designLabAvailable("production")` locks the condition the page uses.

## 9. Common mistakes

- Wrapping the whole card in `<a>` and also putting a `<Link>` on the title. Nested links are invalid.
- Putting `ProjectPreview`'s scrollable table inside the stretched link. That table has its own keyboard stop.
- Inventing a Research category. The directory does not have one.
- Featuring Account Intelligence because its `featuredOrder` is 1. The homepage features the field practice. The lab does the same.
- Installing a card from shadcn or Aceternity. Those defaults are a different product.
- Animating the card in from `opacity: 0`. An unfinished animation hides the content.

## 10. Extending it

To show the card on `/projects`, pass `labProjects()` or a thinner adapter into `ProjectBento`, and delete the inline article in `ProjectsDirectory` in the same change. Do not keep both layouts on that page.

To add a filter, add an id to `labFilters`, a branch in `filterLabProjects`, and a test that names the existing field it reads. Do not add a filter that needs a new tag on the projects.

A breadcrumb on the case study is the next component. It should use the same `kind` value this card already shows.
