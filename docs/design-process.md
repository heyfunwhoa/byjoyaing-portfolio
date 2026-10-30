# Design process

Use this before writing code for a significant feature or a page redesign. A typo, a lint fix, a redirect, or a factual copy correction can skip it. If you skip a stage on a redesign, say which stage and why.

The point of the sequence is to decide what the page is for before choosing how it looks. Code is stage 6.

This file does not redesign the site. It also does not report user research. No interviews, analytics, or usability tests have been recorded here. Where a sentence depends on a guess, it is labeled **assumption**.

## Vocabulary that the stages rely on

| Term | Meaning |
| --- | --- |
| User | A person with a goal. On this site the known audiences are people evaluating Kristen for a commercial role, and Kristen editing her own work. That list is a product decision, not a research finding. |
| Need | What must be true for that person to succeed. "See which work was a job and which was independent" is a need. "Use a serif headline" is not. |
| Constraint | A limit you do not get to vote away: existing URLs, the Next.js and Tailwind stack, honest project status, no unpublished Joy Index notes, no invented revenue. |
| Assumption | A belief you are proceeding with, and could be wrong about. Write it down so a later review can challenge it. |
| Information architecture | Which pages exist, what each one contains, and how they link. Structure, not color. |
| User flow | The path someone takes to finish one job, including the back door if they arrived from a shared link. |
| Hierarchy | The order of importance, shown by size, weight, position, and contrast. |
| Wireframe | A layout of regions and labels, without final type, color, or polish. |
| Visual design | Type, color, spacing, and shape applied to that structure. |
| Affordance | What an object allows you to do. A button affords pressing. |
| Signifier | The cue that shows the affordance: a label, an underline, a border that looks clickable. People often say "affordance" when they mean the cue. |
| State | A condition of a control: default, hover, focus, active, disabled, error, empty, loading, success. Design the ones the control can actually be in. |
| Acceptance criteria | Checks a reviewer can pass or fail. "Feels premium" fails this test. "The resume link reaches `/contact#resume` from the header" passes it. |

**Prototype** in a design conversation means a clickable or coded trial. In this portfolio's content model, Prototype is also a project status. Say which one you mean.

## 1. Discover

Name the user, the goal, the constraints, and the assumptions. Separate three kinds of statement:

- **Fact.** Something in the repo or on the live site. Example: `/projects` is the current project index, and `/work/[slug]` is a case study.
- **Decision already made.** Something the brand system or an earlier pull request settled. Example: Side Quests is the public name for independent work.
- **Assumption.** Example: a hiring manager will decide whether to keep reading from the first screen. That may be true. It has not been tested.

Do not fill gaps with invented quotes, sample sizes, or "users prefer." If the evidence is missing, the sentence is an assumption.

What you leave this stage with: a short list, not a persona poster.

## 2. Define

Write one problem statement:

> [Who] needs [capability] so that [outcome], within [constraints].

Then write acceptance criteria. Each one names a visible result, a route, or a check. Include the failure you care about, such as a shared old URL 404ing, or a prototype described as if it shipped at an employer.

A problem statement is done when someone else could disagree with it. If it only says "make the page better," it is not done.

## 3. Structure

Map content hierarchy and the flows that use it.

**Content hierarchy** is the reading order: what is grasped first, what supports it, what is available but secondary. One `h1` per page. The heading outline should match that order. That is an accessibility rule (headings describe structure) and a hierarchy principle (the eye and the screen reader get the same story).

**A flow** is a sequence. For this site, write the arrival, the decision, and the exit. Example shape: land on an index, tell Work from a Side Quest, open one case study, request a resume. Also write the deep link: someone opens `/work/[slug]` with no memory of the index.

Proximity applies here, before any color choice. Items that belong to one idea sit together. Items that are different jobs sit apart. A filter and the list it filters are one group. A footer is not part of that group.

## 4. Explore

Propose at least two approaches that differ in structure or interaction. Two palettes on the same layout do not count. They are a visual preference applied twice.

For each approach, name:

- what it makes easy
- what it makes harder
- which principle it leans on
- what it costs in this codebase (new route, new component, or a redirect)

Pick one, and say why. "I like it" can be part of the reason. It cannot be the only reason. If the choice is taste, label it **preference**. If the choice keeps a public URL working, that is a **constraint**.

## 5. Design

Specify the screen enough that implementation is not a second, silent design pass.

- **Wireframe.** Regions in order, for a narrow viewport and a wide one. Tailwind's defaults are the breakpoints already in use: `sm` 640px, `md` 768px, `lg` 1024px. Check a phone width near 390px, a tablet width near 768px, and a desktop width near 1280px.
- **Spacing.** Use Tailwind's spacing scale (4px steps). Related items use a smaller gap than unrelated sections. That is proximity. Inventing a second spacing system is a new design system, and it belongs in its own pull request.
- **Typography.** The approved families are Geist Sans for display and interface, and Geist Mono for technical metadata only. `--font-display` maps to Geist Sans. Do not add Instrument Serif, Source Serif 4, or any other family. Size, line height, tracking, measure, and hierarchy may change. See [ADR 0001](decisions/0001-preserve-geist-typography.md).
- **Color.** Tokens live in `app/globals.css`: background `#f3efe6`, foreground `#1b211d`, muted `#4a504b`, accent `#8a4b2a`, accent foreground `#fbf8f2`, card `#fbf8f2`, border `#cfc3b3`. Stay inside them unless the pull request is explicitly changing the palette.
- **States.** Default, hover, and `:focus-visible` at minimum for anything clickable. The global focus style is a 2px ring with a 3px offset. Keep it. Add error, empty, and success when the UI can reach them. The contact form can. A static heading cannot.
- **Responsive behavior.** Say what stacks, what scrolls inside itself, and what must not widen the page. A wide table may scroll inside its card. The document should not scroll sideways.

Alignment: elements in one region share an edge. A centered hero and a left-aligned body can both be valid. Mixing them without a reason looks unfinished. The shared edge is the principle. Centered versus left is often a preference once the edge is consistent.

Contrast: text and meaningful UI need to be distinguishable. WCAG 2.2 AA asks for 4.5:1 for normal text, 3:1 for large text, and 3:1 for interface boundaries that convey meaning. The warm paper background is a preference. Failing those ratios is a defect.

## 6. Build

Implement with the existing stack: Next.js App Router, TypeScript, Tailwind. Reuse a component that already does the job. Add one when a second page needs the same behavior.

Accessibility at build time:

- Use a real `<button>` or `<a>`, not a clickable `<div>`.
- Every input has a `<label>`. A placeholder is a hint, not a name.
- Do not communicate status by color alone. Pair it with text. The project status labels exist for this reason.
- Preserve the focus ring.
- If you add motion, respect `prefers-reduced-motion`.

A link needs a signifier (underline, or another cue that survives without color). The current `.link-rule` underline is that cue. A custom cursor or a gradient is a preference.

No new npm dependency for styling or animation in a page pull request.

## 7. Validate

Review the change. Do not report a usability study that did not happen. "I clicked through the preview" is a review. "Users found it clear" is a claim you cannot make from that.

Check:

- The acceptance criteria from stage 2, one by one.
- Keyboard only: reach every control, see focus, activate it, and leave.
- Zoom and a 390px-wide window. Nothing required should sit off-screen.
- Empty, error, and success, if the feature has them.
- `npm run lint` and `npm run build`, as in [development-workflow.md](development-workflow.md).

Hierarchy, alignment, proximity, and consistency are judged by looking. Contrast and keyboard access are judged against the rules above. Taste is judged last, and labeled as taste.

## 8. Reflect

In the pull request, briefly record:

- what you now understand that you did not at stage 1
- which option you picked, and whether the reason was a principle, a constraint, or a preference
- what you would change with more evidence

That note is the learning. It stays short so the next page does not inherit a stale essay.

## Principles and preferences

Established principles describe how people perceive and operate an interface. Preferences describe a look you can swap without breaking the task. Both can be intentional. Only the first group can fail a review on their own.

| Idea | Kind | How it shows up here |
| --- | --- | --- |
| Hierarchy | Principle | One page title, then support, then detail. Size and weight match that order. |
| Alignment | Principle | One edge per region. Which edge is often a preference. |
| Proximity | Principle (Gestalt) | A label sits with its field. A section gap is larger than the gap inside the section. |
| Contrast | Principle and requirement | Difference creates hierarchy. WCAG contrast ratios are the requirement. Warm versus cool is a preference. |
| Consistency | Principle | The same status word, the same button treatment, the same focus ring. |
| Affordance and signifier | Principle | Controls look operable. Links are underlined or otherwise marked. |
| Accessibility (POUR) | Requirement | Perceivable, operable, understandable, robust. Keyboard, labels, text alternatives, and focus are part of this. |
| Serif headlines, paper background, accent brown | Preference | Current visual identity. Keep them until a visual-foundation pull request changes the tokens. |
| Exact radius, shadow, or hover animation | Preference | Allowed when they do not remove a signifier or the focus ring. |

Gestalt is the name for the perception rules behind proximity, similarity, and continuity: people group what is close, what looks alike, and what lines up. You do not need a citation in the pull request. You do need to say which grouping you intended.

## A short design note

Put this in the pull request before the implementation, or in the conversation that approves the build. Six lines is enough.

```text
Problem: …
Criteria: …
Hierarchy and flow: …
Option A / Option B: …
Chosen, and why (principle, constraint, or preference): …
States and viewports: …
```

## Illustration, not a decision

This is how stage 1 and 2 would start for the future Side Quests index. It is a teaching sketch. It is not a chosen layout, and it is not research.

- **Fact.** Independent projects currently live on `/projects`, and each case study is `/work/[slug]`.
- **Decision.** The public name becomes Side Quests. `/projects` keeps working by redirect.
- **Assumption.** A visitor benefits from seeing "independent" separately from employer work. That split is part of the brand system. Whether the split helps a specific reader has not been tested.
- **Problem.** A visitor needs to tell an independent project from employer work so they can judge the work on the right terms, without losing old links.
- **One criterion.** `/projects` resolves, and a card still opens the existing case-study URL.

Stages 3 through 5 for that page happen in the pull request that builds it, with two real layout options. They do not happen in this file.

## ShieldCN reference for project metadata

Added at Kristen's request on October 29, 2026. Reference: [ShieldCN showcase](https://shieldcn.dev/showcase).

Status: design reference only. No ShieldCN package, remote image service, public badge, chart or new page is adopted by this documentation change. This reference supplements the existing workbench and canonical brand guide.

Use the showcase when designing compact technology attribution, project metadata and repository presentation. Its badge groups, charts and README headers are examples to evaluate, not evidence of this portfolio's capabilities.

| Placement | Candidate use | Decision rule |
| --- | --- | --- |
| Side Quest detail | Small “Built with” row after the project explanation | Include only technology verified in that project's current implementation; keep the business problem and outcome first. |
| Project cards | One readable lifecycle label | Reuse existing status components and vocabulary; never imply a prototype is live. |
| Repository README | Restrained stack, license or CI badge group and optional header | Confirm license and source. Dynamic status must identify its repository/workflow and remain accurate; static “passing” claims are not substitutes for live checks. |
| Build/process explanation | Concise technology labels beside plain-language descriptions | Explain what each tool contributes; avoid a wall of logos or implying sponsorship. |
| Project activity | Optional sourced chart | Use only when it answers a reader question, with dates, units, source and a text alternative; never use decorative metrics as proof of impact. |

Implementation approach:
- Check the existing workbench inventory and shared badge/status components first. Prefer native text and local components for public site labels; ShieldCN is a visual reference, not a requirement to embed its service.
- Adapt spacing, fine borders and grouping to the existing warm ivory, charcoal and copper tokens and Geist typography. Do not adopt an unrelated showcase palette or replace the joy. identity.
- Keep badges secondary to Work and project evidence. Avoid adding a technical badge strip to the homepage hero by default.
- Use readable text, wrapping at narrow widths and 200% zoom, adequate contrast, and visible focus for genuine links. A noninteractive badge must not look like a button. Do not convey status through color alone.
- Before copying source/assets or embedding remote images, review the specific license/attribution, privacy, availability and caching implications. Do not place secrets or private repository information in badge URLs.
- A future implementation PR must name its destination, verified labels, source/adaptation decision and actual responsive/accessibility checks. Record adoption in the existing inventory rather than creating a parallel catalog.

First candidate: a small “Built with” section on a named Side Quest detail page, using verified technology and existing local components. Public implementation remains a separate scoped change.

### Filled-out first composition: how this site is made

Proposed content for the existing About/build explanation; not a new route. Reuse the existing `siteHowBuilt` content and toolkit structures in [toolkit-registry.ts](../lib/portfolio/toolkit-registry.ts) during implementation rather than introducing another live data registry.

**Heading:** How this site is made

**Intro:** A personal portfolio built to connect the work, the thinking, and the things I am learning to make. The site uses Next.js, React, TypeScript, and Tailwind CSS, with source on GitHub and hosting on Vercel.

**Primary badge row:** Next.js · React · TypeScript · Tailwind CSS

**Supporting links:** View portfolio source · Explore Side Quests

The source link should point to the existing public portfolio repository. The second link uses `/side-quests`. Preserve the existing About hierarchy and keep this section below the professional story.

| Label | Plain-language explanation | Evidence and display treatment |
| --- | --- | --- |
| Next.js | Organizes the pages and how the site is served. | Declared in package.json; primary badge. |
| React | Builds the reusable interface pieces. | Declared in package.json; primary badge. |
| TypeScript | Helps catch mismatched data and code assumptions while building. | Declared in package.json; primary badge. Do not claim it prevents every bug. |
| Tailwind CSS | Provides the styling utilities for layout and visual consistency. | Declared in package.json; primary badge. |
| Vercel | Hosts the portfolio. | Existing toolkit registry identifies hosting; supporting text/link. |
| GitHub | Holds the source, change history, and pull requests. | Existing toolkit registry and repository; supporting text/link. |
| Keystatic | Provides content-editing tooling. | Packages declared; describe as tooling, not proof hosted editing is configured. |
| Storybook | Provides a workspace for inspecting components. | Declared development tooling and scripts; optional expanded detail. |
| Playwright | Provides browser-testing tooling. | Declared development tooling and scripts; no claim all pages passed. |
| Resend | Provides the email integration used by the contact implementation. | Dependency and contact code exist; omit delivery-success claims until the configuration problem is resolved and delivery is verified. |

These descriptions were checked against the portfolio's package.json and existing toolkit records on October 29, 2026. Installed packages establish tooling availability, not proof of successful runtime behavior.

### Visual and interaction specification

- Use a warm card surface, fine border, charcoal text and restrained copper link emphasis from existing tokens. Badge labels use Geist Sans; technical metadata may use Geist Mono.
- Keep the primary row to the four verified framework/tooling labels above. The existing card logo limit is four in [verified-stacks.ts](../lib/portfolio/verified-stacks.ts); preserve it for project cards.
- On phones, wrap badges into natural rows with no fixed height, clipping, horizontal page scrolling, or forced single-line text. On larger screens, keep the row close to its explanatory copy.
- Plain badges are text, not controls. Put explanations in visible text or an existing accessible disclosure; do not require hover to understand a label.
- Keep hosting/source links separate from badges so the reader knows what is clickable. Use the site's existing focus treatment and link signifiers.
- Use existing reviewed local icons only where available and useful. Decorative icons have no duplicate accessible name; the visible label provides meaning.
- No animation is needed. No charts, follower counts or build-health numbers are needed for this first composition.

### Project-specific adaptation

For a Side Quest, the content order is: purpose → current capability and limitations → evidence/demo → built-with details. Use that project's verified stack, not this portfolio's stack by default.

The current `verifiedTechnologyStacks` implementation contains a shared `portfolioPage` stack. That proves the presentation page's technology only; do not relabel it as the separate project's backend or architecture without inspecting that repository.

Use the existing lifecycle vocabulary: **Idea**, **Prototype**, **In progress**, or **Live**, backed by the project's actual evidence. Keep technology, lifecycle and workflow-check status separate. A live page is not proof of working email, authentication or every integration.

### Proposed README header

**Title:** joy. / Kristen Aing  
**Subtitle:** Revenue & GTM Leader. Curious Builder.  
**Supporting line:** People first. Problem-driven. Systems-minded.

Follow with a compact technology row and links to the site and project documentation. Use the same verified labels as the site. Do not add MIT, coverage percentages, uptime, or a static “Build passing” badge without supporting evidence. ShieldCN remains a design reference until a specific asset or service is reviewed and adopted.

### Implementation acceptance checks

- [ ] Update the existing About/build explanation and existing components rather than adding a competing toolkit.
- [ ] Confirm every rendered label against the current repository and distinguish personal tooling from live integrations.
- [ ] Review at 375px, 768px, 1280px and 200% zoom with long labels.
- [ ] Confirm readable contrast, logical heading order, keyboard focus and source-link destinations.
- [ ] Keep the section secondary to professional evidence; no homepage hero badge strip.
- [ ] Confirm blocked email delivery is not presented as working.
- [ ] Record actual lint/build/tests and preview review in the implementation PR.

This checklist is a proposed implementation brief. No check is marked complete by this documentation edit.

## Magic UI Pro: selective layout reference

Requested October 29, 2026. Sources: [catalog](https://pro.magicui.design/) and [license](https://pro.magicui.design/license).
Pro is a paid offering, separate from the free Magic UI collection. Its license restricts sharing and redistribution of original or modified products. No Pro code/assets were downloaded, copied or purchased for this change. Do not commit Pro source to this public repository without confirming permission for that distribution.

| Reference | Portfolio use to evaluate | Local approach |
| --- | --- | --- |
| Portfolio template | Clear project, skills and contact hierarchy | Preserve current professional-first structure and About toolkit. |
| Feature Cards | Explain a build in small, readable groups | Reuse existing card surfaces and native disclosures. |
| Changelog template | Explain meaningful project updates | Candidate only; requires real dated updates and links. |
| Blog template | Improve long-form Field Notes reading | Keep existing article routes, typography and source labels. |

Keep joy. tokens, static orbital artwork and readable content without animation. No Motion dependency, autoplay, invented testimonials or imported template is proposed.

### First implementation in PR #222

The existing ToolsMap build disclosure now contains four wrapping text badges, three short explanation groups, and source/Side Quests links. Existing siteHowBuilt copy and compact mode are preserved. This is original JSX using current tokens; no ShieldCN embed or Magic UI Pro source. Status: implemented on the feature branch, not merged or deployed. Manual viewport, zoom and keyboard review remain pending.
