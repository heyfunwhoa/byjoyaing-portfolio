# UX audit

Audited tree: `main`, plus the docs branch this file is stacked on. Deployed HTML checked on 9 October 2026 at `https://byjoyaing-portfolio.vercel.app`. The branded hosts were checked only with response headers.

This is not a usability study. Observations come from the repository and from that deployment. Assumptions are marked. Items that still need a browser are listed at the end.

Pull requests to leave alone while you read this:

| PR | What it already changes | Why it matters here |
| --- | --- | --- |
| #1 | Sales and GTM redesign. Hero is "Enterprise Sales. GTM Strategy. AI-Powered Systems." Nav adds Experience and Capabilities. Dollar strings are gone from `lib/portfolio.ts` on that branch. | A second homepage written on `main` will be thrown away if #1 merges. |
| #2 | Visual foundation on top of old `main`. CI failing. | Do not merge for its layout. |
| #3 | About story on top of old `main`. CI failing. | The About problem below is real. The patch in #3 is not the fix to merge. |
| #4 | Engineering notes, inquiry-form lint fix, design process. | Quality baseline. Not a redesign. |

## Severity

- **Critical.** A primary visitor cannot load the branded site, cannot tell who the site is for, or is shown figures you already decided not to feature.
- **High.** A primary task is much harder than the content requires.
- **Medium.** The task is possible, with extra reading or incorrect semantics.
- **Low.** Polish, or a preference.

## Critical

### 1. The branded domain does not resolve cleanly

`curl -I` on 9 October 2026: `https://www.byjoyaing.com/` and `https://byjoyaing.com/` each returned `308` with a `Location` of the same URL. That is a redirect loop. `https://byjoyaing-portfolio.vercel.app/` returned `200`, and its homepage title and `h1` match this repository.

`metadataBase` in `app/layout.tsx`, and the sitemap and robots files, use the Vercel host. That host is the one that answered. The name on the business card does not.

**Principle.** A URL is a promise. This is reliability, not taste.

**Needs a browser.** Confirm the loop in a normal window in case an extension or HTTP client is involved. The header evidence is already strong.

### 2. The positioning the brand asks for is not on the site

Deployed `<title>`: "Kristen Joy Aing — Technical GTM & Product". Deployed `h1`: "I turn field friction into systems technical products can run without me in the room." The eyebrow is "Technical GTM systems" (`avatar` in `lib/portfolio.ts`).

Absent from the deployed homepage HTML: "Commercial Leader", "joy.", and the principles People first, Problem-driven, Systems-minded.

Pull request #1 does not match this brief either. Its eyebrow is "Technical seller · Sales leadership · Product narrative" and its `h1` is "Enterprise Sales. GTM Strategy. AI-Powered Systems."

**Principle.** Match between the system and the real world, and hierarchy. The largest line on the page is the line people repeat. Right now that line is a systems sentence, not the positioning.

**Assumption.** Visitors who have only this brief in mind will not map "Technical GTM systems" onto "Commercial Leader. Curious Builder." without help. That has not been tested.

### 3. Quota and attainment figures are still public on this tree

On the deployed About HTML, the first screen of roles includes "$1.4M", "top 2 of 9", and "50%". Those strings are the first bullets of Truffle Security and Darktrace in `lib/portfolio.ts`. Later roles (Rapid7, Forcepoint, Metadot, Websense) keep figures in the same array. They sit behind the "Earlier roles" button, so they were not in the first HTML payload. They are still in the module the page ships.

The Partner GTM Engine record (`slug: partner-gtm-engine`) repeats Metadot growth dollars inside `evidence`.

`docs/rebuild-roadmap.md` already says employment revenue figures stay off the public pages. A search of pull request #1's `lib/portfolio.ts` finds none of those dollar strings.

**Principle.** Honesty is a content rule you already set. Showing the numbers on the deployed site breaks it. This is not an aesthetic finding.

## High

### 4. Employer work and independent projects are one list

Nav: About, Projects, Contact (`components/site-header.tsx`). `/experience` redirects to `/about` (`next.config.ts`). Roles render inside About. All ten case studies render under Projects, grouped by Discover → Decide → Build → Launch → Enable → Distribute → Measure.

The only homepage sentence that says a project is independent is the atlas caption: "Independent research catalog — not an official Truffle product." There is no `kind` field on `Project`. Status is not the same thing as kind. "Field system" means a team ran it. "Prototype" means something runs here. Either can be a job artifact or a side quest. The data does not say which.

**Principle.** Information architecture. People group by proximity and by name. One list named Projects teaches that these are the same kind of thing.

### 5. About does not tell the story the brand asks for

About's `h1` is the same sentence as the homepage. The next paragraph is the long bio. The paragraph after that is a negation: "Not traditional enablement or an AE becoming a PM." The advertising degree appears later, as one cell in Education, beside the in-progress MBA and the AWS credentials.

**Principle.** Hierarchy and recognition. The degree is the start of the commercial-and-creative story in your brief. On this page it is a credential in a row. Defining the work by what it is not asks the reader to hold a category you then discard.

**Preference, separately.** Whether the portrait belongs on About as well as Home is taste. The repeated `h1` is not.

### 6. The homepage asks every section to be equally important

Order in `app/page.tsx`: hero, Strengths (four), Skills (two middot paragraphs), Tools (three columns plus an AI loop on the full map; the home map is `compact`), Proof (three counts), Featured atlas, two more project rows.

The counts say "1 prototype", "1 field system", and "5 designed". The labels explain them. The values still look like performance numbers, because large numerals above a fold are a learned convention from dashboards.

**Principle.** Hierarchy and proximity. The atlas is the only interactive proof, and it sits under four peer sections.

## Medium

### 7. The heading outline is thinner than the page looks

`Kicker` renders a `<p>`, not a heading. Strengths titles are `h2`. The featured atlas title is a `<span>`. A screen-reader user moving by headings hears the `h1` and the strength titles, and does not hear "Tools", "Proof", or the atlas name as headings.

**Principle.** WCAG 1.3.1 (info and relationships) and 2.4.6 (headings and labels). The visual grouping is clearer than the programmatic one.

### 8. Two controls use tab semantics they do not implement

Coverage filters (`components/coverage-explorer.tsx`) and the Message / Resume switch (`app/inquiry-form.tsx`) set `role="tab"` and `aria-selected`. There is no `tabpanel`, and no arrow-key roving tabindex. They are toggles.

The roles control is a real `<button>` and has no `aria-expanded` (`components/experience-timeline.tsx`).

**Principle.** Affordances should match the name the accessibility tree exposes. WCAG 4.1.2 (name, role, value).

### 9. Older roles are easy to miss

The timeline shows two roles, then "Earlier roles (n)". The first two include every bullet. The rest appear only after the click. A recruiter who does not notice a text button under Darktrace never sees Rapid7, Forcepoint, or the earlier companies.

**Principle.** Recognition rather than recall. **Needs a browser** for whether the button looks like a control at a glance. The code already shows it is easy to skip: it is `text-sm` underline styling, not a button shape.

### 10. Skills are a paragraph, not a list

`skills.join(" · ")` is one line of concepts. The lifecycle links on About are the same pattern, and those links do go to `/projects#discover` and the other phase ids. The links work. The scan does not.

**Principle.** Proximity and chunking. A list is a structure. A dotted sentence is a paragraph.

### 11. The header will not survive more labels

Three links sit in a wrapping row. There is no menu button on this tree. Adding Work and Side Quests without a small-screen pattern will crowd the name. That crowding was not screenshotted.

**Needs a browser** at about 390px for the current three links too.

## Low

### 12. Strengths are copied onto Home and About

Same four titles and bodies. Repetition is good when it teaches a pattern. Here it spends the second page restating the first.

### 13. The footer credits the typefaces

"Geist / Instrument Serif · Independent research · 2026" (`app/layout.tsx`). Useful to you as the maker. Not useful to the four visitors in the journey doc. Replacing it with the positioning line is a small content change. The current line is mostly a preference.

### 14. Possible sideways scroll on the atlas band

The band uses `w-screen` inside a padded `main`. `overflow-x: clip` on `body` may already be hiding it. **Needs a browser** at 390, 768, and 1280.

### 15. Portrait uses `<img>`

Alt text is present: "Illustrated portrait of Kristen Joy Aing". ESLint warns about `next/image`. That warning is performance, not a missing text alternative.

### 16. Motion

`.link-rule` animates underline size over 120ms. There is no `prefers-reduced-motion` exception. Low, because the motion is small.

## What is working and should survive

- Status is defined in prose on `/projects`, and badges use words.
- The atlas caption says gray means not evaluated, not a confirmed gap.
- Case studies share one template: problem, evidence, system, and an honest status.
- Contact fields have labels. Errors offer `kristen.aing@gmail.com`. The form says the PDF is not public.
- Focus styles exist in `app/globals.css`.
- The measured text colors clear WCAG AA against the paper and card tokens.
- Primary actions are real links at `h-11` (44px).

## Needs a browser before you treat it as fact

| Check | Why the code is not enough |
| --- | --- |
| Branded domain in a normal browser | Headers show a loop. Confirm what a person sees. |
| Horizontal overflow at 390, 768, 1280 on `/` and `/projects` | `overflow-x: clip` and `w-screen` interact. |
| Header wrapping at 390 | Flex and wrap can collide without failing a build. |
| Hit area of filter chips and "Earlier roles" | Padding is in the class. Rendered pixels were not measured. |
| Keyboard path through the false tabs | Click behavior is in the code. Arrow keys and focus order need a pass. |
| Focus ring against the paper background | The ring color is the accent, which clears as text. A 2px ring still needs eyes. |
| Later role figures after expanding | Source contains them. The click was not exercised in a browser. |

## Recommended order

1. Confirm the domain. No layout work is visible on a looping host.
2. Choose the content parent. Pull request #1, or `main`. Do not edit the hero on both.
3. If the parent still contains quota figures, remove those strings before any new positioning. On #1, that removal is already in the branch.
4. Then the first design slice in [wireframes.md](wireframes.md): hero and document title only.
5. Then the index split (Work, Side Quests), one pull request each, with redirects.
6. Semantics (headings, disclosure, tabs) can ride along with the page they belong to. Do not open a sweep that touches every file for its own sake.

Subjective items that should not outrank the list above: a different brown, a new display font, more portrait crop, shadows, or a gradient.
