# Homepage prototype review — implementation handoff

Date: 2026-10-09
Branch: `feature/homepage-prototype-2026`
Preview route: `/prototype`
Status: **Implemented in source, not yet runtime-verified or user-tested**.

## Purpose
A leadership-first, responsive prototype to review hierarchy before editing the published homepage. Current public `/` page is untouched. Shared site header/footer still come from the existing root layout, so global nav remains legacy About/Projects/Contact during the prototype phase.

## UX review (expert assessment of source, not observed behavior)
- **Primary story:** The hero leads with professional positioning and a human value proposition. The three-card illustration reinforces People/Strategy/Systems without implying false achievements.
- **Information hierarchy:** Work comes before Side Quests; leadership philosophy bridges the hero to credible future case studies.
- **Responsive composition:** Single-column on smaller screens and text + system panel in a two-column layout at `lg`; Work cards stack until `md`.
- **Navigation:** Hero anchor CTAs navigate to actual page sections; existing project index lives at `/projects`, not an unimplemented `/side-quests`. No dead new routes introduced.
- **Accessible structure:** One h1, section headings, labeled regions, min 44px link targets for major CTAs, focus-visible styles. Requires real keyboard and contrast inspection.
- **Trust:** Case studies explicitly say evidence must be verified before launch. No invented revenue results.

## Important known gaps before publishing
- Sitewide header still says 'Projects' and lacks 'Work' / 'Side Quests'. This is deliberately NOT changed in the prototype PR.
- The Work case cards are **provisional summaries**, not verified case studies, and have no detail pages.
- The prototype inherits the public site's visual tokens and fonts; this is a structural prototype, not a neutral grayscale mockup.
- Anchor jump must be checked under the sticky site header.
- The proposed footer, navigation, and external links require actual browser review.
- Real users have not tested the page; no claims about task completion or conversion.

## Validation guide
Test at 375px, 768px, 1280px. Try keyboard-only tabbing and browser zoom 200%. Inspect heading order and WCAG color contrast in devtools.
Ask 3–5 participants to:
1. Describe this person's professional focus.
2. Locate an example of leadership or team impact.
3. Find an independent technical project and determine its status.
4. Locate the career story.
5. Find the contact path.
Record device, task success, confusion, and comments, without prompting.

## Engineering steps to run in a local checkout
```bash
git fetch origin
git switch feature/homepage-prototype-2026
npm ci
npx tsc --noEmit
npm run lint
npm run build
npm run dev
```
Then visit `http://localhost:3000/prototype`. Check any CI / Vercel preview results on the PR. None of these commands has been executed by this GitHub-only edit.

## Decision gate
Do not merge into main or redirect the production homepage until design feedback, technical checks, accurate case studies, and navigation IA are reviewed. Separate future implementation PRs:
1. Shared header/navigation + new route structure and redirects.
2. Verified Work case studies and Side Quest listings.
3. Homepage migration once validated.
4. SEO metadata and accessibility QA.

## Learning reflection prompt
Why did Work go before Side Quests? How does content hierarchy reflect visitor intent? What evidence would cause the page order to change? Record real learning in the private Joy Index, not in public project files.
