# Visual directions: orbits, rails, and connected nodes

**Status:** Proposal for review. Nothing here is built. Production pages and components are unchanged.  
**Date:** 2026-10-11  
**Baseline:** `main` at `daf1647`  
**Brand:** [brand-guidelines.md](../brand/brand-guidelines.md) (canonical), [avatar-system.md](../brand/avatar-system.md)  
**Constraints:** [editorial-ui-spec.md](editorial-ui-spec.md), [component-inventory.md](component-inventory.md), [component-adoption.md](component-adoption.md), [homepage-simplification.md](homepage-simplification.md), [portfolio-experience-v2-prd.md](../product/portfolio-experience-v2-prd.md)

Positioning stays **Revenue & GTM Leader. Curious Builder.** The story order stays enterprise selling, then leadership development, then systems and building. Geometry supports that order. It does not lead it.

## 1. Current-state audit

### Pieces that already exist

| Piece | Where it renders | What it does | What it can carry next |
| --- | --- | --- | --- |
| `CelestialFrame` | Home hero, design lab | Static SVG rings and three nodes around `/avatar.png`. `aria-hidden`. Ivory stroke on charcoal. | Identity framing only. It should stay the one portrait orbit. |
| `GeometricMotif` | Home bento Work tile, design lab | Two CSS rings and three dots, `aria-hidden`, absolutely positioned. | A corner accent on a charcoal panel. Not a diagram. |
| `ProjectConstellation` | `/experience`, design lab | Three linked project cards plus one visible sentence per edge. Says it is not an integration. Locked by `lib/constellation.test.ts`. | The pattern to copy: dots are decoration, the list is the diagram. |
| `ExperienceTimeline` | `/experience` | Vertical role list from `roles`. First two open, earlier roles behind an `aria-expanded` button. | The detail view. A horizontal overview should sit above it, not replace it. |
| `EditorialBento` | Home | Work, Field Notes, Side Quests. Work is the large tile. | Unchanged. Do not add tiles. |
| `ProfessionalCaseStudy` | `/work` | Context, contribution, execution, evidence and limits, learning, related links. Two-column `dl`. | A horizontal "band" layout of the same fields. Same props, same order. |
| `rail.tsx`, `marginalia.tsx`, `kicker.tsx`, `crop-frame.tsx` | Various | Divider, aside, eyebrow, portrait marks | Reuse for labels and dividers in new compositions. |
| `Lifeline` (registry copy) | Design lab demo only | Year-by-year timeline built around a birth year | Not for public pages. Its model is age-based, and the lab sets `birthYear` to 0 to avoid showing it. |
| shadcn primitives | Lab only | Tabs, accordion, carousel, and others | Not needed. None of these directions require them. |

### Data the compositions may use

- `roles` in `lib/portfolio.ts`: seven public roles with company, title, period, category, and points. No dollar figures.
- `publicStories` in `lib/public-stories.ts`: three stories (Enterprise Sales, People & Leadership, GTM Strategy) with context, contribution, execution, evidence, takeaway, and related links.
- `constellationSlugs` and `constellationNotes` in `lib/constellation.ts`.

Nothing else. A diagram that needs a fact not in these files needs a content review first.

### Gaps today

- Identity geometry appears only on Home. About, which already says "Strategist. Leader. Builder.", shows the three pillars as text only.
- About's "Career progression" shows four of seven roles as a plain list.
- `/experience` has no overview. A reader scrolls the vertical list to see the arc.
- Work's three stories use the same two-column card. Problem, contribution, and evidence do not read as a sequence.
- Field Notes lists the three pillars, but no field-tested operating loop.

### Boundaries every direction must keep

- Rings do not spin. Nodes do not encode data. Every drawn relationship has a visible sentence and a keyboard link that say the same thing.
- One portrait file, `/avatar.png`. Leader on Home, About, and Work. Explorer on Field Notes. Builder on Side Quests. Geometry never changes the face.
- Geist Sans and Geist Mono only. Ivory, charcoal, copper, border, and the existing sage, mist, and clay surfaces. Warm copper `#E6B59A` only for lines on charcoal.
- No new runtime dependency. No carousel. No continuous animation. The only motion is the existing `.section-enter` rise and `.nudge-link`, both collapsed by `prefers-reduced-motion`.
- Work stays separate from Side Quests. Independent builds are never drawn as employer deployments.
- Coaching figures stay as published on `/experience`. `publicStories` asks for re-verification before those figures get more emphasis, so diagrams link to them rather than enlarge them.
- No Head of Sales title. No employment revenue. No Joy Index content.

## 2. Three visual directions

### Direction A — Orbit and rail

Circular identity, horizontal chronology.

- About gets a static pillar orbit. Enterprise selling sits at the center. Strategist, Leader, and Builder sit on one ring.
- About and `/experience` get a horizontal career rail of all seven roles.
- Work keeps the current case-study cards.

| Strength | Cost |
| --- | --- |
| Closest to the existing celestial language. Gives About a visual signature to match Home. | Two circular systems (Home orbit, About orbit) may start to read as a theme. |
| The rail answers "what is the arc?" at a glance. | Work, the page hiring managers use most, gains nothing. |
| Small build. Data already exists. | The orbit is the most "concept-art" of the options. It needs strong labels to avoid a sci-fi read. |

### Direction B — Connected ledger (preferred)

Horizontal sequence and fine connector lines. Circles are reserved for identity.

- Work's case studies become horizontal bands: Context, My contribution, Execution and decisions, Evidence and limits, What I learned. Steps are joined by a hairline with small nodes, and the bands stack on mobile.
- `/experience` and About get the career rail, drawn as the same hairline with nodes.
- About gets one static pillar orbit, the only new circle on the site.
- Field Notes gets the operating loop, labeled Illustrative model.

| Strength | Cost |
| --- | --- |
| Puts the richest composition on Work, where selling evidence lives. | More surfaces to review than A. The case-study band touches the most-read page. |
| One visual grammar (line plus node) ties career, case study, and loop together without new colors or motion. | Horizontal bands need careful stacking below `lg` so text never shrinks to fit. |
| Circles stay rare, which keeps it editorial. | The loop diagram must stay clearly labeled to avoid reading as a measured process. |

### Direction C — Field system

One systems diagram as the main motif. A learning and coaching loop appears on Work, About, and Field Notes, with the pillar orbit as its hub.

| Strength | Cost |
| --- | --- |
| Strongest expression of "Systems-minded" and of coaching. | A framework becomes the most prominent visual. The brand guide says a framework must not replace deal-execution proof. |
| Distinctive. | Repeating one diagram on three pages duplicates content against "one public fact, one public place." |
| Reuses the constellation's text-equivalent pattern. | Highest risk of reading as an operating model presented as measured practice. |

## 3. Page-by-page recommendations (Direction B)

DOM order is reading order on every page. Every new figure is a list or a description list first. Geometry is `aria-hidden` decoration on top.

### Home — no change

Keep the editorial cover exactly as in [homepage-simplification.md](homepage-simplification.md): hero with `CelestialFrame`, credibility, three-tile bento with `GeometricMotif` on Work, one field practice, one Side Quest, close. Revisit Home only after the other pages ship and a review shows a gap.

### About

```
[Leader portrait] | About · Leader
                  | Strategist. Leader. Builder.        (unchanged hero)
------------------------------------------------------------------------
Guiding philosophy (unchanged)
------------------------------------------------------------------------
Career progression
  2014 ──●── 2015 ──●── 2016 ──●── 2018 ──●── 2021 ──●── 2023 ──●── 2024 ─ Present
     Websense  Quantcast  Metadot   Forcepoint  Rapid7   Darktrace  Truffle Security
  [Read the experience timeline]  [See capabilities]
  ← NEW: CareerRail replaces the four-row list. All seven roles. Company and years only.
------------------------------------------------------------------------
Enterprise selling and the leadership around it
  ┌ text column ───────────────┐   ┌ orbit (aria-hidden) ─────┐
  │ existing paragraph          │   │      ○ Strategist        │
  │ ol: Enterprise selling →    │   │  ○ Leader ● Selling      │
  │     Strategist → Leader →   │   │      ○ Builder           │
  │     Builder (links)         │   └──────────────────────────┘
  └─────────────────────────────┘
  ← NEW: PillarOrbit. Center is the largest node. The list is the content.
------------------------------------------------------------------------
GTM and product work, Beyond work, Toolkit, Education, Contact (unchanged)
```

- **Rail placement.** It replaces the four-role list because it shows all seven roles in less height. Companies run left to right, oldest to newest, so the current role ends the line. Each rail item is text, not a link. The existing "Read the experience timeline" link remains the way in.
- **Orbit placement.** It goes in the section that already argues "selling first, leadership around it." The hero already has the portrait, and a second circular figure there would compete with it.
- **Orbit links.**
  - Center, Enterprise selling: `/work#enterprise-sales`
  - Strategist: `/work#gtm-strategy`
  - Leader: `/work#people-leadership`
  - Builder: `/experience`, where the shared resources the team adopted are described
  - A visible line under the list reads "Independent builds live in Side Quests" and links to `/side-quests`. The Builder node never points at Side Quests, so it cannot imply employer software.

### Work

```
People. Strategy. Systems.        (unchanged hero and three anchor cards)
------------------------------------------------------------------------
01 / Selling — Enterprise deal execution
  Navigating complex enterprise cybersecurity sales
  ●──────────●──────────●──────────●──────────●
  Context    My         Execution  Evidence   What I
             contribution          and limits  learned
  (each step: heading + existing text; lg: 5 columns; below lg: vertical
   stack with a left hairline and nodes)
  Connect the story: (existing related links)
------------------------------------------------------------------------
02 / People — same band
03 / Systems — same band, then Related field systems (unchanged)
```

- This is a `layout="band"` option on `ProfessionalCaseStudy`. It is not a new component. The props, headings, and order are unchanged.
- The last step is "What I learned," not "Outcome." A step labeled "Outcome" appears only when a story's evidence field states one. No story invents a result to fill the slot.
- The five columns apply only from `lg` (1024px). Below that the steps stack, so body text never drops below the current `text-sm`.
- Section eyebrows stay `01 / Selling`, `02 / People`, `03 / Systems`. Enterprise Sales stays first.

### Experience

```
A decade selling technical security, and teaching the story.   (unchanged)
------------------------------------------------------------------------
NEW: Career at a glance — the same CareerRail as About
------------------------------------------------------------------------
How the work connects (unchanged list + ProjectConstellation)
------------------------------------------------------------------------
ExperienceTimeline (unchanged, vertical, detail)
```

- The rail is the overview, and the timeline stays the detail.
- In a later step, each rail item can become an in-page link to its role. That needs `id`s on timeline rows, and earlier roles must open when a link targets them. This is a production change to `ExperienceTimeline`, kept out of the lab step.
- `ProjectConstellation` stays as is. It is the existing connected-node figure, and its tests stay.

### Field Notes

```
Thinking out loud. Building in practice.   (unchanged, Explorer portrait)
Start with the work / From practice to method   (unchanged)
------------------------------------------------------------------------
A way of working, not a set of job titles
  Strategist / Leader / Builder list (unchanged)
  NEW: The field loop — Illustrative model
     ● Sell in the field ──▶ ● Capture what works
            ▲                         │
            │                         ▼
     ● Carry feedback upstream ◀── ● Coach and onboard
  ol (the content): each step = one sentence + "From: <Company>" link to /experience
------------------------------------------------------------------------
Browse the collections (unchanged)
```

Each loop step uses wording already in `roles` and names its source role:

| Step | Supported by (public `roles` text) |
| --- | --- |
| Sell in the field | Truffle Security: full-cycle enterprise sales across security, engineering, and executive buyers |
| Capture what works | Truffle Security: shared discovery, ICP, competitive, and POC resources the team adopted. Rapid7: threat-intelligence playbooks the portfolio team used |
| Coach and onboard | Truffle Security: coaching SDRs and newer sellers, onboarding GTM hires. Darktrace: training and onboarding resources. Websense: ramp resources |
| Carry feedback upstream | Truffle Security: carried field feedback into product and marketing |

The loop is labeled **Illustrative model**. Its steps are evidenced individually, but the cycle is a way of describing them, not a measured process. The coaching step carries no numbers. It links to Experience, where the published wording lives.

### Side Quests — no change

`/side-quests` keeps the Builder avatar and its groups. No orbit or loop. Independent builds are not drawn into Work diagrams.

## 4. Preferred direction and why

Direction B, the connected ledger, with one pillar orbit on About.

| Objective | How B meets it |
| --- | --- |
| Enterprise selling stays primary | The largest new composition is the Work case-study band, led by Enterprise Sales. The orbit centers on selling. |
| Leadership shown without overclaiming | The People band and the loop reuse published wording. Coaching figures stay where they are published. |
| Builder supports, not leads | Builder is one node on the orbit and one step in the loop. Side Quests get no new figure. |
| Editorial, not sci-fi | One new circle on the site. Everything else is hairline and node, closer to a publication's rules than a star map. |
| Homepage stays a cover | No homepage change. |
| Reuse before new | The band is a layout option on `ProfessionalCaseStudy`. The orbit and rail follow the `ProjectConstellation` pattern. The loop reuses that pattern too. |
| Accessible by construction | Every figure is a list first. Geometry is `aria-hidden`. No motion beyond existing rules. |

A's orbit is borrowed for About. C's loop is kept to one page with a label.

## 5. Design Lab plan (one small pull request)

**Goal.** Preview the three new figures in the existing local `/design-lab` with real public data. The lab answers 404 in production, and the public navigation does not link to it.

**Files.**

| File | Change |
| --- | --- |
| `lib/design-lab-compositions.ts` | Pure data mappers. `careerRailNodes(roles)` returns company, start year, end label, and title, oldest first. `pillarOrbitNodes` returns center and three pillars, each with label, sentence, and href. `caseBandSteps(story)` returns the five existing story fields as steps. No new facts. |
| `lib/design-lab-compositions.test.ts` | Tests listed below. Added to the `package.json` test list. |
| `components/design-lab/career-rail.tsx` | Server component. `ol`, horizontal from `lg`, vertical below. Hairline and nodes are CSS borders. No links in the lab version. |
| `components/design-lab/pillar-orbit.tsx` | Server component. Static inline SVG (`aria-hidden`, no `animate`, no transform transition) beside an `ol` of four links. Hidden below `sm`, where the list alone carries it. |
| `components/design-lab/case-band.tsx` | Server component. Renders one `publicStories` entry as a five-step band. Hairline on `lg`, left rule on mobile. |
| `app/design-lab/page.tsx` | One new section, "Connected compositions," after Data visualization. It renders the three prototypes with a sentence saying where each would go and that none is public. |
| `docs/design/design-lab.md` | One row for the new section. |

**Not touched.** `app/page.tsx`, `app/about`, `app/work`, `app/experience`, `app/field-notes`, `app/side-quests`, `ProfessionalCaseStudy`, `ExperienceTimeline`, `ProjectConstellation`, `CelestialFrame`, `GeometricMotif`, `EditorialBento`, `app/globals.css`, `package.json` dependencies. The field loop waits until the orbit, rail, and band are reviewed, so this pull request stays small.

**Unit tests (data and source guards, not UI proof).**

- Rail nodes equal `roles` in reverse order, seven entries. Start years parse from `period`. No title is added or changed.
- Orbit has exactly one center (Enterprise selling) and the three pillars Strategist, Leader, Builder. Every node has a non-empty sentence and an href. No href points at `/side-quests`.
- Band steps for each `publicStories` entry are the five existing fields, in order. None is labeled "Outcome."
- No mapper output contains `$`, "Head of Sales", "Joy Index", or a phone number.
- Source guard: no file under `app/` other than `app/design-lab/page.tsx` imports the three lab components, and the three component files contain no `animate-`, `@keyframes`, or `motion` import.

**Rendered checks, run in a browser on `npm run dev` (the lab is not in a production build).**

- 375, 768, 1280, and 200% zoom. Rail and band switch layout at `lg` with no horizontal page scroll.
- Keyboard: Tab reaches the four orbit links in DOM order with the copper focus ring. Rail and band have no extra tab stops.
- Accessibility tree: orbit SVG absent from the tree. Each figure exposes a list with the expected item count.
- Reduced motion: no animation or transition on the new section.
- Contrast: hairlines are decorative. Every text pair is sampled and recorded.

**Rollback.** Revert the commit. No public route changes.

## 6. Validation checklist and acceptance criteria

### Direction review (before any code)

- [ ] Owner picks a direction, or asks for changes, in this pull request.
- [ ] Owner confirms About is the right home for the orbit, and Field Notes for the loop.
- [ ] Owner confirms the rail may show all seven roles, including Quantcast's advertising sale, on About.

### Lab pull request acceptance

- Three prototypes render on `/design-lab` in development and the route still returns 404 in a production build.
- Every visible fact traces to `roles` or `publicStories`. No new metric, title, customer, or date.
- Enterprise selling is the largest node in the orbit, and Enterprise Sales is the first band shown.
- No public page, shared component, token, font, or dependency changes.
- `npm test`, `npm run lint`, and `npm run build` pass. GitHub CI passes.
- Browser evidence for widths, zoom, keyboard, focus, accessibility tree, reduced motion, and contrast is recorded in the pull request with reproducible steps. Checks not run are listed.

### Before any figure moves to a public page

- [ ] Separate pull request per page, in this order: Experience rail, Work band, About orbit and rail, Field Notes loop.
- [ ] Work band reviewed against the brand guide's dual-audience rule: individual selling stays visible, and coaching is not described as management.
- [ ] Field Notes loop carries the Illustrative model label, and the owner approves each step's source sentence.
- [ ] Coaching figures re-verified before any figure displays them directly.
- [ ] Vercel preview or production check recorded. Local build alone does not count as deployed behavior.
- [ ] Usability task "Find a leadership/team-impact example" rerun after the Work band ships, with results recorded rather than assumed.
