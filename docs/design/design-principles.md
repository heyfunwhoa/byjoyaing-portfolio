# Design principles, taught on this site

This is a reading of the portfolio that is on `main` and deployed at `https://byjoyaing-portfolio.vercel.app` as of 9 October 2026. Pull request #1 is a different, unmerged tree. It is named when it matters. Nothing here is a user interview.

Each principle has three parts: what the word means, where the current site already uses it, and one improvement. An improvement is not a license to redesign the page in the same breath. The build order is in [wireframes.md](wireframes.md) and [../rebuild-roadmap.md](../rebuild-roadmap.md).

**Principle** means the interface gets harder to use when you ignore it. **Requirement** means a rule such as WCAG. **Preference** means a look you can change without breaking the task. The warm paper background is a preference. A focus ring is a requirement.

## Visual hierarchy

Hierarchy is the order of importance, shown with size, weight, position, and contrast. If everything is the same size, nothing is first.

**What works.** The homepage has one `h1`, set in Instrument Serif at `text-4xl` and `sm:text-6xl` (`app/page.tsx`). Body copy under it is smaller and muted. Primary and secondary actions sit directly under that sentence. A visitor can tell the title from the paragraph.

**What does not.** After the hero, Strengths, Skills, Tools, Proof, and Featured are the same `Rail` pattern: a small label and then a block (`components/rail.tsx`). They compete. The featured project title is a `span`, not a heading, so the thing the page treats as proof is quieter than the four strengths above it. Home and About also share the same `h1` string (`avatar.line` in `lib/portfolio.ts`), so the second page does not start a new story.

**Improvement.** One idea per band, in this order: who she is, the two places to go (Work, Side Quests), then one piece of proof. Section labels that start a new topic should be headings, so the outline matches the visual order.

## Alignment and grids

Alignment means elements in one region share an edge. A grid is the set of columns that creates those edges.

**What works.** `PageMain` is one column, `max-w-5xl`, with the same horizontal padding as the header (`px-5 sm:px-8`). From the `md` breakpoint, `Rail` uses a fixed label column (`9.5rem`) and a fluid content column. Role rows and project rows use the same idea. The page feels like one system because the edges repeat.

**What does not.** The atlas band breaks that column on purpose: `w-screen` and a centering transform (`app/page.tsx`). That can be a full-bleed moment. It can also push the page sideways by a few pixels. That overflow was not measured in a browser for this audit. The homepage hero becomes two columns only at `lg`. Until then the portrait and the title stack, which is fine, but the portrait is centered while the type is left-aligned. Two alignments in one hero is a small break.

**Improvement.** Keep the shared page column. If a band goes full bleed, test that the document itself does not scroll horizontally at about 390px, 768px, and 1280px. Pick one alignment for the hero once the portrait and the title are in the same view.

## Proximity and whitespace

Proximity means related items sit closer than unrelated items. Whitespace is the gap that creates those groups. It is not empty space to fill.

**What works.** `Rail` uses `py-12` between sections and a smaller gap inside a section (`gap-2` or `gap-6`). Labels sit on their fields in the contact form. Status, title, and summary sit in one project row. You can tell a row is one project.

**What does not.** Skills are one paragraph joined with ` · ` (`app/about/page.tsx` and the homepage). The words are related, but the separator does not group them. Proof puts three counts in a row with a vertical rule. The counts are close to each other, and far from the project they refer to, so "1 prototype" reads as a statistic rather than a caption for the atlas below.

**Improvement.** Turn skill lists into a real list, with a tighter gap inside the list than between sections. Move each proof count next to the project it counts, or rewrite the label so it cannot be read as revenue.

## Typography and readability

Typography is the choice of type, size, line length, and line height. Readability is whether a paragraph can be followed without strain.

**What works.** Reading text is Geist at `text-base` with `leading-7` or `leading-8`, inside `max-w-2xl`. That is a comfortable line length. Display type is reserved for page titles. The pairing is consistent.

**What does not.** Status badges are `text-[11px]`, and the "Next" badge is `text-[10px]` (`components/status-badge.tsx`). Coverage filter labels and table headers are also 11px. Contrast is not the problem (see below). Size is. A status word is how this site tells the truth about a project. It should not be the smallest text on the page. The homepage `h1` is also one long sentence, so the largest type is doing the job of a paragraph.

**Improvement.** Keep the serif for the page title. Shorten the title to the positioning line, and put the explanation in the paragraph. Set status labels at least at `text-xs` (12px) or `text-sm`. The serif-versus-sans choice is a preference. The size of the status word is a usability issue.

## Contrast and color

Contrast is the difference that lets you separate figure from ground. WCAG 2.2 AA asks for 4.5:1 for normal text, 3:1 for large text, and 3:1 for a boundary that carries meaning.

Token pairs in `app/globals.css`, calculated from the hex values, not from a screenshot:

| Pair | Ratio | Against AA 4.5:1 |
| --- | --- | --- |
| `#1b211d` on `#f3efe6` | 14.3:1 | Clears |
| `#4a504b` on `#f3efe6` | 7.2:1 | Clears |
| `#8a4b2a` on `#f3efe6` | 5.9:1 | Clears |
| `#fbf8f2` on `#8a4b2a` | 6.4:1 | Clears |

**What works.** Body, muted, and accent text on the paper background clear AA. Status is also a word, not a color alone. Selected filters change the background and stay labeled.

**What does not.** Nothing in these pairs is a contrast failure. The risk is using the accent as the only cue that a link is a link. `.link-rule` starts with no underline and draws one on hover or when `aria-current="page"`. A resting link in the header is muted text with no underline until hover. Color and position are doing the work. That is weaker than a persistent signifier.

**Improvement.** Keep the palette. It is a preference, and it already meets the contrast requirement. Give text links a resting cue, not only a hover cue. Do not introduce a second palette inside a page pull request.

## Consistency and repetition

Consistency means the same kind of thing looks and behaves the same way. Repetition is how you teach that pattern.

**What works.** Every case study is one `Project` record and one route, `/work/[slug]`. Status words come from one map: Prototype, Field system, Designed, Next. Buttons share height (`h-11`) and radius. The focus ring is global.

**What does not.** The public name for the work is "Projects" in the nav, "Featured" on the home page, and "case study" on the row. Employer roles live under About. The brand direction uses Work and Side Quests, which are not on the site. Pull request #1 uses Home, About, Experience, Projects, Capabilities, Contact. Three naming systems are in play. Strengths are also repeated in full on Home and About.

**Improvement.** Pick one public vocabulary and repeat it in the nav, the page title, and the section label. Work is employment and field impact. Side Quests are independent projects. Use the status words you already have. Do not add a second list of strengths until the two pages have different jobs.

## Affordances and feedback

An affordance is what an object lets you do. A signifier is the cue that shows it. Feedback is the response after you act.

**What works.** "View Projects" and "Skills, tools & experience" are links with a filled or bordered button shape and a 44px height. The atlas search field has a screen-reader label and a placeholder. The contact form changes to "sending", then a confirmation, or an error that offers email. Project rows highlight the title on hover. `:focus-visible` draws a 2px ring.

**What does not.** Coverage filters and the Message / Resume switch use `role="tab"` without a `tabpanel`, and without arrow-key behavior (`components/coverage-explorer.tsx`, `app/inquiry-form.tsx`). They look like toggles and announce themselves as tabs. The "Earlier roles" control is underlined text. It works as a button, and it does not expose `aria-expanded` (`components/experience-timeline.tsx`). The square mark in the header is `aria-hidden` and is not the word "joy."

**Improvement.** Call a toggle a toggle (`aria-pressed` or a radiogroup). Call a disclosure a disclosure (`aria-expanded`). Keep the button shapes you have. A new hover animation is a preference. A control that tells the truth about its state is a requirement.

## Information architecture

Information architecture is which pages exist, what each contains, and how they link. The sitemap and the recommended future map are in [information-architecture.md](information-architecture.md).

**What works.** Four public pages plus case studies is a small map. `/approach` and `/experience` redirect instead of 404ing. Case-study URLs are stable.

**What does not.** `/experience` redirects to `/about`, so a link that sounds like a resume lands in a combined skills-and-jobs page, with older roles behind a button. Independent work and employer work share `/projects`. There is no page whose only job is "hire me for commercial leadership" and no page whose only job is "look at what I built."

**Improvement.** Add Work and Side Quests as indexes. Keep `/work/[slug]`. Redirect the old index. Do not publish The Joy Index.

## User journeys

A journey is the path one person takes to finish one job, including the page they land on from a shared link. Provisional journeys, labeled as scenarios, are in [user-journeys.md](user-journeys.md). They are not research findings.

**What works.** A shared case-study URL renders the project without requiring the index. Contact can be reached in one click. The resume request has a mode and does not pretend a PDF is public.

**What does not.** None of the four visitors in that doc can answer "commercial leader or builder?" from the nav. They have to read the hero sentence and then decide whether Projects or About is the right door.

**Improvement.** Two doors, with honest labels, from the hero and from the nav.

## Responsive design

Responsive design is how the layout changes when the viewport changes. It is not a second, unrelated design.

**What works.** Type steps up at `sm`. Rails become two columns at `md`. Project rows gain columns at `md`. The hero waits until `lg` to sit beside the portrait. Primary buttons stack until `sm`, then sit in a row. `body` uses `overflow-x: clip`.

**What does not.** The header has no disclosure menu. At a narrow width the name and About / Projects / Contact share one row and the links may wrap (`components/site-header.tsx`). Whether they collide is a browser check, not something this audit measured. The full-bleed atlas band is the other check. Pull request #1 already adds a menu button with `aria-expanded`. This tree does not.

**Improvement.** When the nav gains Work and Side Quests, it will not fit beside the name on a phone. Add a disclosure then. Do not add it before the labels exist, or you will build the menu twice.

## Accessibility and WCAG

Accessibility is whether someone can perceive, operate, understand, and rely on the interface. The short name for that set is POUR. WCAG 2.2 is the checklist this site should use. AA is the target. AAA is a bonus, not the bar for this phase.

**What works.** `lang="en"` on `html`. One `main`. The portrait has alt text. Form fields have visible labels. The search field has a screen-reader name. The focus ring is not removed. The color pairs above clear AA. Button-shaped links use a 44px height, which meets the stricter AAA target size (24px is the AA minimum in WCAG 2.2).

**What does not.** Heading outline is thinner than the visual outline, because kickers are paragraphs. Tabs are not tabs. The roles disclosure does not expose expanded state. Resting header links have a weak signifier. `prefers-reduced-motion` is not consulted. The underline animation is 120ms, so this is low severity.

**Improvement.** Fix semantics before restyling. The first accessible corrections are the disclosure state and the false tab roles. They are listed as medium in the audit because the controls still work with a click. They are still real defects.

## Usability heuristics

These ten heuristics are Jakob Nielsen's. They are established guidelines, not opinions about the paper background. A miss is a clue, not an automatic failure.

| Heuristic | On this site |
| --- | --- |
| Visibility of system status | Status badges and the form's sending / sent / error states do this. The roles button does not say whether it is open. |
| Match with the real world | "Field system" and "Next" are defined on the projects page, which is good. "Technical GTM systems" is jargon relative to "Commercial Leader. Curious Builder." |
| User control and freedom | "Show less" exists. There is no skip link past the header. Low severity on a short page. |
| Consistency and standards | One project template. Three competing names for the work, across this tree, pull request #1, and the brand direction. |
| Error prevention | Required name and email. The form warns that a PDF is not public. |
| Recognition rather than recall | Project rows show title, status, and problem. Older jobs are hidden until a click, so a recruiter must remember to open them. |
| Flexibility and efficiency | `#resume` opens the resume mode. There is no cross-project search. That is acceptable at ten projects. |
| Aesthetic and minimalist design | The hero is focused. The equal rails below it are not minimal. That is hierarchy, not a request for more decoration. |
| Recover from errors | Form errors offer the email address. Good. |
| Help and documentation | The projects intro defines every status. Keep that legend when the indexes split. |

## What you should learn

A critique names the principle, the evidence, and the kind of issue. "I would have used a darker brown" is a preference. "The status label is 10px" is a readability problem. "The accent on paper is 5.9:1" is a measurement, and in this case it passes.

Write the principle in the pull request when you change a layout. If you cannot name one, you may be decorating.
