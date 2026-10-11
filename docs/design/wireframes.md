# Wireframes and two homepage directions

These are low-fidelity wireframes. Boxes are regions, not a visual design. Type, color, and spacing stay the current tokens until a later visual-foundation pull request. No page is implemented here.

The comparison uses the principles in [design-principles.md](design-principles.md) and the scenarios in [user-journeys.md](user-journeys.md). It does not claim that either direction has been shown to a visitor.

## Shared chrome

Both directions use the same header and the same footer job.

```text
Narrow (phone)
+----------------------------------+
| joy.   Kristen Joy Aing     Menu |
+----------------------------------+
| Home                             |
| About                            |
| Work                             |
| Side Quests                      |
| Contact                          |
+----------------------------------+

Wide
+------------------------------------------------------------------+
| joy.  Kristen Joy Aing     About   Work   Side Quests   Contact  |
+------------------------------------------------------------------+
```

`joy.` is the mark, beside the name, not a second homepage title. The menu is a disclosure below `md`, with `aria-expanded`. Do not build that menu until these labels are the ones you are keeping. Pull request #1 already has a menu for a different label set.

Footer, both directions: name, positioning line, email. Not the font credits.

## Home — Direction A, two doors

Commercial frame first. The builder is on the same page, second.

```text
Narrow
+----------------------------------+
| Kristen Joy Aing                 |
|                                  |
| Commercial Leader.               |
| Curious Builder.                 |
|                                  |
| People first. Problem-driven.    |
| Systems-minded.                  |
|                                  |
| [ Work ]                         |
| [ Side Quests ]                  |
+----------------------------------+
| Work                             |
| Title, company, dates            |
| Title, company, dates            |
| All roles -> /work               |
+----------------------------------+
| Side Quests                      |
| Atlas                            |
| Prototype · independent          |
| [ short filterable sample ]      |
| All side quests ->               |
+----------------------------------+
| Contact                          |
| One line + link                  |
+----------------------------------+

Wide
+----------------------------------+-------------------------------+
| Kristen Joy Aing                 |                               |
| Commercial Leader.               |   portrait                    |
| Curious Builder.                 |                               |
| Principles, one line             |                               |
| [ Work ]  [ Side Quests ]        |                               |
+----------------------------------+-------------------------------+
| Work (half)                      | Side Quests (half)            |
| two roles, no figures            | atlas, status visible         |
+----------------------------------+-------------------------------+
```

**Makes easy.** Founder and recruiter scenarios see the commercial claim and a path to roles without opening About. The independent project is still on the first page, so the builder is not a buried link.

**Makes harder.** The technical visitor scrolls past the positioning to touch the atlas. The hero is quieter than the current atlas demo.

**Principles.** Hierarchy (positioning is the `h1`). Proximity (each proof sits under its door). Consistency (nav labels match the bands).

**Constraint.** Atlas copy must still say it is independent and that gray means not evaluated. Roles must not regain quota figures.

**Preference.** Portrait on the right is the current hero pattern. It can move. The two doors should not.

## Home — Direction B, proof first

The running system is the first evidence. The commercial line supports it.

```text
Narrow and wide, same order
+----------------------------------+
| Curious Builder                  |
|                                  |
| A catalog you can inspect.       |
| Independent. Not an employer     |
| product. Gray is not evaluated.  |
|                                  |
| [ atlas filters and table ]      |
|                                  |
| Commercial Leader.               |
| Roles, titles, dates -> /work    |
|                                  |
| [ Side Quests ]  [ Work ]        |
+----------------------------------+
```

**Makes easy.** The technical visitor and the independent-software visitor get the only working prototype immediately. Honesty about status stays attached to the thing it describes.

**Makes harder.** The founder scenario has to infer commercial leadership from a security catalog plus a band below it. The current site already leads with a systems story and still fails to say Commercial Leader. Direction B repeats that risk unless the caption does a lot of work.

**Principles.** Recognition (the artifact is on screen). Hierarchy is inverted relative to the brand line you asked to be repeatable. The largest thing in the viewport is the tool, not the positioning.

**Constraint.** Same status language. Do not let the table's width widen the page. The table scrolls inside itself.

## Comparison

| Question | Direction A | Direction B |
| --- | --- | --- |
| What is the `h1`? | Commercial Leader. Curious Builder. | The inspectable catalog |
| Founder scenario | Door is labeled Work | Must connect the catalog to leadership |
| Recruiter scenario | Roles preview on the home page | Roles are a lower band |
| Technical scenario | Atlas is on the page, not first | Atlas is first |
| Independent-project scenario | Side Quests is a peer door | Strong, if the caption says independent |
| Main risk | Looks like a résumé if the atlas is cut | Looks like a tool demo if the role is cut |
| What you give up | Immediate interactivity | A repeatable positioning line in the `h1` |

**Recommendation, as a design judgment.** Start with Direction A. Keep the atlas in the Side Quests band so Direction B's evidence is still on the homepage. This judgment follows the brand line you asked people to remember, and the four scenarios. It is not a test result. If you later decide the site's job is to demonstrate software to technical leaders first, choose B and say so.

Do not blend them into a third hero that is both a dashboard and a manifesto. Two ideas in one `h1` is how the current sentence got long.

## About

```text
+----------------------------------+
| About                            |
| A story title, not the home h1   |
|                                  |
| Short narrative                  |
| UT Austin advertising is part    |
| of the story, not only a cell    |
+----------------------------------+
| Principles                       |
| People first                     |
| Problem-driven                   |
| Systems-minded                   |
+----------------------------------+
| Education and credentials        |
| Tools                            |
+----------------------------------+
```

Roles are not on this page once `/work` exists. Until then, do not hide the current timeline. Removing it before the new index exists would strand the recruiter scenario.

The negation sentence ("Not traditional enablement…") does not have a region. Say what the work is.

## Work

```text
+----------------------------------+
| Work                             |
| Commercial leadership, in roles  |
|                                  |
| Period | Title                   |
|        | Company · scope         |
|        | qualitative bullets     |
| (every role visible)             |
+----------------------------------+
| Field systems tied to this work  |
| status + link to /work/[slug]    |
+----------------------------------+
```

No quota, attainment, rank, or revenue numerals unless a later edit publishes one on purpose.

## Side Quests

```text
+----------------------------------+
| Side Quests                      |
| Independent work. Status first.  |
|                                  |
| [ Prototype ] [ Field system ]   |
| [ Designed ] [ Next ]            |
|                                  |
| row: status, title, problem      |
|      -> existing /work/[slug]    |
+----------------------------------+
```

Lifecycle phase can be a secondary label on the row. It should not be the only way to browse, because Measure is empty and the phases are an internal model.

## Accessibility requirements for these wireframes

These apply to whichever direction you build.

- One `h1`. The next regions are `h2`. Kickers that name regions should be those headings.
- Nav links have a resting signifier, not only hover.
- The phone menu is a button with `aria-expanded` and a named region.
- Work and Side Quests buttons are real links, at least 24px, preferably the current 44px (`h-11`).
- Status is text. Color may reinforce it.
- The atlas table keeps its caption. Filters are toggles, not tabs, unless you implement tab panels and arrow keys.
- Focus uses the existing ring.
- If you add motion beyond the current 120ms underline, respect `prefers-reduced-motion`.
- Contrast stays inside the current tokens, which already clear WCAG AA for the pairs measured in [design-principles.md](design-principles.md).

## First implementation slice

Do not build these wireframes in one pull request.

**Parent.** If pull request #1 is the content base, branch from that branch and replace its hero. If it is not, branch from `main` after the engineering notes merge. Do not change both heroes.

**Scope.** Direction A's hero only, plus the document title and meta description.

- Eyebrow or name: Kristen Joy Aing
- `h1`: Commercial Leader. Curious Builder.
- One sentence for the three principles, in the affirmative
- Primary link labeled Work. Until `/work` exists, it may go to the current experience section, and the pull request must say that the destination is temporary
- Secondary link labeled Side Quests, pointing at `/projects` until `/side-quests` exists, with the same honesty
- Leave strengths, tools, proof, and the atlas where they are

**Acceptance.**

- The deployed-style `h1` is the positioning line, not the systems sentence
- The title tag includes Kristen Joy Aing and does not say only "Technical GTM & Product"
- No quota figure is introduced
- No new dependency, no token change, no Joy Index content
- `npm run lint` and `npm run build` pass
- You looked at 390px and a desktop width, because this slice changes the largest text on the page

**Out of scope for that pull request.** The Work index, the Side Quests index, the About rewrite, the domain redirect, and the false tab roles.

## What you should learn

A wireframe decides order and priority. If the wireframe only looks good in a monospace box and you cannot name the `h1`, it is a sketch of taste. Direction A and Direction B differ in hierarchy, which is why they qualify as two approaches. Two serif treatments of the same order would not.
