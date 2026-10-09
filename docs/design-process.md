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
- **Typography.** The current families are Geist (sans), Geist Mono, and Instrument Serif (`font-display`). Display type for the page title and sans for reading text is the current pattern. Changing the families is a visual-foundation decision, not a side effect of one page.
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
