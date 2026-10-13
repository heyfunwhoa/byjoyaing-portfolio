# Builder Academy — Frontend building blocks: from framework to experience

**Track:** Builder · **Level:** Beginner · **Estimated time:** 25–30 minutes  
**Status:** Source lesson; Academy lesson card is registered in `lib/ai-academy.ts`. The lesson is not considered deployed until its PR is reviewed, merged and a production deployment is verified.  
**Reviewed:** 2026-10-13
**Prerequisites:** [Programming Foundations](../ai-academy/programming-foundations.md) (HTML/CSS, JavaScript and the React/Next.js profiles); [From idea to verified release](idea-to-verified-release.md) for publishing changes.

## The mental model

> **Frontend = Structure + Components + Styling + Behavior + Data + Accessibility + User Experience.**

This is a practical checklist, not a formula for measuring frontend quality. These responsibilities overlap; some tools support more than one. **Frontend** means the experience rendered in a user's browser. Next.js also supports **backend** functionality, which is different from a browser-side interface.

**House analogy:** structure is the floor plan, components are reusable rooms and fixtures, styling is the visual finish, behavior is the interactive machinery, data is the information supplied to the rooms, accessibility means everyone can operate them, and UX is whether the whole house is navigable and useful. This analogy breaks down because accessibility and UX influence every construction decision, not merely the final finishing stage.

| Building block | Plain-language question | Typical tools / concept | Portfolio example |
| --- | --- | --- | --- |
| **Structure** | What is on the page, and how is it organized? | Semantic HTML, Next.js App Router, layouts | `app/work/page.tsx`, headings, navigation and sections |
| **Components** | What pieces can I reuse? | React, shadcn/ui, Embla Carousel | Project cards, site header, capability-orbit controls |
| **Styling** | How should those pieces look at all screen sizes? | CSS, Tailwind, brand design tokens | Ivory/charcoal/copper, spacing, grids and responsive breakpoints |
| **Behavior** | What changes when someone acts? | JavaScript/TypeScript, React state, event handlers, optional animation | Click a category, swipe a carousel, reveal a pillar |
| **Data** | Where does displayed information come from? | Typed local objects, JSON, fetched APIs, React props | Project names and links from a project directory |
| **Accessibility** | Can people use it with keyboard, assistive tech and different needs? | Semantic controls, labels, focus, contrast, reduced motion | Orbit pillar tabs and keyboard-accessible carousel |
| **User Experience (UX)** | Can someone understand and accomplish their goal? | Content hierarchy, task flows, feedback, testing | A recruiter can distinguish professional work from independent builds |

### Do not confuse the layers

- **HTML** is page structure/meaning; **CSS** controls presentation; **JavaScript** provides programmatic behavior. Browsers ultimately use these technologies.
- **TypeScript** is JavaScript with static type-checking; it helps catch mistakes during development.
- **React** is a **UI library** that renders components and manages interactive state.
- **Next.js** is an **application framework** built on React. It provides routes, layouts, rendering, data/server capabilities and build conventions. Next.js is not merely a frontend styling tool.
- **Tailwind CSS** is a **utility-first CSS framework**, not an application framework or component library. It generates CSS from classes used in your source.
- **shadcn/ui** is a collection of customizable **component source code** and registry patterns. **Embla** is a specialized carousel interaction library. **Lucide** provides icons.
- **Motion** or CSS transitions can animate an interaction; neither is required for every feature. Recraft assets / SVGs are media, not app frameworks.
- **GitHub** holds source/version history; **Vercel** builds and hosts deployments; **Cloudflare DNS** helps the domain resolve. These are delivery infrastructure, not frontend UI components.
- **UI** describes visible controls and presentation; **UX** covers the whole journey, comprehension, feedback and ability to finish a task.

## Different kinds of components

Component is a practical umbrella term. A single component may serve multiple roles.

| Kind | Examples | Where it helps |
| --- | --- | --- |
| **Layout** | Header, footer, section, grid, sidebar | Organizes the portfolio and Builder Academy |
| **Display/content** | Project card, badge, article, timeline | Communicates evidence and project descriptions |
| **Interactive/navigation** | Tabs, carousel, menu, accordion, filter | Lets visitors browse work or change views |
| **Forms** | Text field, select, request form, validation errors | Collects input, with server-side validation if submitted |
| **Data display** | Tables, charts, status lists, data cards | Account Intelligence, research and security comparisons |
| **Visualization** | Orbit, architecture diagram, relationship map | Shows how strategies, systems or categories connect |
| **Feedback** | Loading indicators, toasts, error messages, empty states | Tells people what happened and what to do next |

**Reusable** doesn't mean **universal**. Check whether an existing component already solves the task before installing another library or copying from ReUI, Magic UI, React Bits or other registries. Review licenses, cost, accessibility and maintenance. Visual polish must not obscure information.

## Worked example: build one project card

### Step 1 — Structure + components + data

This small React component receives typed information through *props* (values passed to a component). It produces semantic HTML. The project data is a fictional teaching example, not a source of published achievements.

```tsx
type ProjectCardProps = {
  title: string;
  summary: string;
  href: string;
};

export function ProjectCard({ title, summary, href }: ProjectCardProps) {
  return (
    <article className="rounded-xl border p-6">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="mt-2 text-sm">{summary}</p>
      <a className="mt-4 inline-block underline focus-visible:outline-2" href={href}>
        Read the project
      </a>
    </article>
  );
}
```

`article`, `h2` and `a` provide **structure and semantics**; `ProjectCard` provides **reuse**; the prop values are **data**; the `className` utilities provide **styling**; the visible link and focus outline support **accessibility and behavior**.

### Step 2 — Organize it into a Next.js page

`app/work/page.tsx` is the route for `/work` (or imports another component that renders the page). The page can read project entries from an existing typed directory, map them to cards, and include a meaningful title and links.

### Step 3 — Add optional behavior

A filter can use `useState` in a **Client Component** (marked `"use client"`), or a server-rendered route can use query parameters. Don't load an animation library just to toggle a filter. A user-controlled shadcn/Embla carousel is useful when it improves scanning, but it must not make projects unreachable to keyboard users or hide the full list.

### Step 4 — Test accessibility and UX

- Can someone understand what the project does without hovering?
- Do interactive elements work with only a keyboard and show a visible focus indicator?
- Are headings logical, links descriptive, images labeled as appropriate, and text readable?
- Does it work at narrow widths and 200% zoom, without sideways scrolling?
- Does reduced-motion mode remain understandable?
- Can a recruiter find the project, recognize independent vs employer work and open its details without guessing?
- If data is missing or an API fails, does the page explain the state accurately?

## Practice: identify the right layer before installing anything

**Scenario A: Project cards are too large on mobile.** Change Tailwind/CSS responsive styles, not the application framework. Check narrow viewports.

**Scenario B: A pillar switches descriptions when clicked.** Change React state and accessible button/tab behavior. Test keyboard operation.

**Scenario C: Cards show the wrong descriptions.** Trace the data source and props before changing styling.

**Scenario D: A visitor cannot find professional accomplishments.** Revisit information architecture and UX hierarchy, not just animation.

**Scenario E: Visitors need to submit a protected request.** Keep the form usable on the frontend, then validate, authorize and process on the Next.js backend. Never place private API keys in browser code.

### Independent lab

1. In `byjoyaing-portfolio`, identify an existing page (`app/work/page.tsx`), component (`components/ui/carousel.tsx` or a project card), and style rule. **Read only**; no need to change production code.
2. Draw the flow **Next.js route → React card → Tailwind classes → project data → click/focus feedback**. Add the backend only if the task needs it.
3. Write a 5–10 line `ProjectCard` with an `article`, heading, summary and descriptive link. Reuse the current brand's tokens.
4. Define one mobile test, one keyboard test and one real-user task. Explain what each test can and cannot prove.
5. If you implement this in Cursor, use a feature branch, review the diff, run checks actually configured by the repository and open a PR. Do not merge automatically.

## Knowledge checks

**Q1.** A project card has correct content but its mobile text overflows. Which layer should you examine first?  
**Answer:** Styling and responsive layout. Next.js routing does not fix the overflow.

**Q2.** A carousel looks attractive but cannot be reached using a keyboard. Is the frontend finished?  
**Answer:** No. Accessibility and UX are part of the frontend, and the controls need meaningful accessible navigation.

**Q3.** Are React, Tailwind and shadcn/ui all application frameworks?  
**Answer:** No. React is a UI library, Tailwind is a CSS framework, shadcn/ui supplies component code/patterns, and Next.js is the application framework in this stack.

## Tool map: what job does each tool do?

Examples identify responsibilities, not a shopping list. You do not need a product from every row. The first three rows are the browser foundation; content and deployment connect that foundation to publishing.

| Layer | Examples | Question to ask |
| --- | --- | --- |
| Structure, presentation, behavior | HTML, CSS, JavaScript | What does the browser actually render and execute? |
| Development language | JavaScript, TypeScript | What mistakes can static types catch? Types do not validate untrusted runtime data automatically. |
| UI and application structure | React, Next.js | Which component renders this, and which route serves it? |
| Styling | Plain CSS, Tailwind | How does this adapt to a narrow screen? |
| Reusable controls | Radix Primitives, shadcn/ui | What interaction behavior is supplied, and what still needs styling and testing? |
| Content editing | Repository files, Keystatic, Sanity | Who edits the content and where is the authoritative version? |
| Delivery | GitHub, Vercel, Netlify | Where is the source reviewed, and where is a runnable version served? |
| Data access | Local JSON/typed objects, HTTP APIs | Is the value local, fetched or derived? A database typically sits behind server access controls. |
| Interaction and feedback | Forms, filters, loading, empty and error states | What does the user see after acting or when a request fails? |
| Accessibility | Semantic HTML, labels, keyboard and focus behavior | Can the task be completed without a mouse? |
| Inspection and verification | Browser DevTools, Storybook, Playwright | Am I inspecting one component or testing a complete user flow? |

Radix supplies low-level interaction primitives; shadcn/ui supplies customizable component source and supports different primitive families. Do not assume every shadcn example uses Radix: preserve the project's selected family. Neither removes responsibility for accessible composition and testing. See the primary references below.

A CMS provides editorial workflows; a database provides general storage and querying. A CMS can use a database internally. Storybook isolates component states; automated browser tests exercise selected flows. Neither alone proves the whole site works. Authentication establishes identity; authorization decides whether an operation is allowed.

## Follow one Academy card from content to publication

This is a fictional reading exercise using the existing project-card pattern above, not an implemented CMS migration or new interactive lab.

1. **Define the content.** Give a lesson a stable ID, title, summary, prerequisites, sources and availability. A title may change while the ID remains stable so links and progress references survive.
2. **Render the component.** Pass the lesson fields into a React card. Use a heading, summary and descriptive link such as “Read CMS fundamentals.” Choose the heading level from the surrounding page hierarchy.
3. **Style for the task.** Use existing tokens and CSS/Tailwind spacing. Let text wrap and cards stack on a phone. A grid change is a styling decision, not a reason to replace the framework.
4. **Make the action usable.** Use a link for navigation and a button for an action. Check visible keyboard focus, logical reading order and that meaning is available without hovering.
5. **Trace the data.** Today the Academy catalog is in `lib/ai-academy.ts`. In a future pilot, an editor could maintain lesson files or hosted content. Identify the real source; do not maintain independent editable duplicates. Keep learner progress separate from public lesson content.
6. **Inspect and verify.** In DevTools, inspect the rendered heading and link. Use the Network panel only if a request exists; local or server-rendered content need not make a separate browser-side CMS request. Consider loading, empty and failure states when adding asynchronous fetching. Check the card at narrow widths, with keyboard input and at 200% zoom. Storybook can expose component variants; a browser test can verify the actual destination.
7. **Review publication.** Commit on a branch, review the diff and applicable checks, inspect a deployment preview, obtain approval, publish and verify the production page. Record the deployed revision so rollback has a known target.

### Small sidebar: hosting and deployment

**Build** prepares source for execution or delivery. **Hosting** serves the application. **Deployment** makes a particular version available. Vercel and Netlify support deployment workflows with preview and production versions; their platforms also support server-side capabilities, so they are not simply places to upload frontend images. Their exact framework/runtime support and plan limits require checking for the chosen app.[D1][D2]

A **domain** is a human-readable address; **DNS** helps resolve it. An **environment variable** supplies configuration for a particular environment. Anything included in client code can be exposed to visitors, regardless of whether it began as an environment variable. A **rollback** restores an earlier deployed version, but does not automatically reverse external database changes.

GitHub Actions checks and a hosting provider's builds are separate jobs and may have separate budgets. A passing build does not prove a working user journey. Follow the existing [Build Rate Limits & CI/CD guide](https://www.byjoyaing.com/ai-academy/devops/build-rate-limits) for deeper explanation; no new hosting track or provider migration is needed for this lesson.

### Explain your understanding

- The title is wrong: inspect content and props first.
- The title is correct but overflows: inspect CSS and responsive layout.
- A link looks right but opens a missing page: inspect the URL, route and deployed version.
- A preview works but production differs: compare deployed commits, configuration and caching before editing the component.
- A hidden lesson uses public storage: hiding a link does not authorize or protect access.

Write the content source, component, styling rule, expected link destination and one verification step for a fictional card. This is self-reviewed practice, not a saved or automatically graded completion.

## What to learn next

- [CMS fundamentals: Keystatic versus Sanity](cms-fundamentals.md) — content models, editorial workflows, cost and privacy
- [Authentication versus authorization](authentication-vs-authorization.md) — separate identity from access decisions

- [Programming Foundations](../ai-academy/programming-foundations.md) — individual language/framework basics
- [Design Lab and visual regression](storybook-visual-regression.md) — inspect variants and verify browser behavior
- [From idea to verified release](idea-to-verified-release.md) — Git branches, PRs and evidence of delivery
- [Component inventory](../design/component-inventory.md) — see what is already built before adopting more UI libraries

## Primary references

- [MDN: Learn web development](https://developer.mozilla.org/en-US/docs/Learn_web_development)
- [React: Your first component](https://react.dev/learn/your-first-component)
- [Next.js: App Router](https://nextjs.org/docs/app)
- [Tailwind: Styling with utility classes](https://tailwindcss.com/docs/styling-with-utility-classes)
- [W3C WAI: Accessibility fundamentals](https://www.w3.org/WAI/fundamentals/accessibility-intro/)

### Additional primary references

Checked 2026-10-13. Tool responsibilities are sourced; the card walkthrough and diagnostic scenarios are original teaching synthesis.

- [Radix Primitives introduction](https://www.radix-ui.com/primitives/docs/overview/introduction)
- [shadcn/ui introduction](https://ui.shadcn.com/docs)
- [D1: Vercel deployments](https://vercel.com/docs/deployments)
- [D2: Netlify: create deploys](https://docs.netlify.com/deploy/create-deploys/)
- [Playwright introduction](https://playwright.dev/docs/intro)
- CMS sources and dated plan details appear in the linked CMS guide.
