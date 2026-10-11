# Page-by-page UX/UI audit

**Date:** 2026-10-11  
**Evidence type:** source at `a76e5e9` plus the HTML fetch in the route inventory.  
**Browser matrix:** not run. Responsive notes below are class-level observations, not screenshots.

The historical audit in `docs/design/ux-audit.md` describes an older homepage. Use this file for the current shell.

## Shared chrome

| Check | Finding | Label |
| --- | --- | --- |
| Header | Six links in `lib/site-nav.ts`. | Verified |
| Active state | Exact match for `/work` and `/side-quests`. Nested project URLs highlight nothing. | Verified. AUD-03 |
| Mobile menu | Closed panel class is `hidden lg:block`. Open panel is `absolute inset-x-0 top-full` with `max-h-[70dvh]`. | Verified in source. Retest at 320 and 375 still required. |
| Footer | Signature, positioning, email. No section list. | Verified |
| Skip link | Present in `app/layout.tsx`. | Verified |
| Breadcrumbs | Not part of the primary shell. | Verified absence |
| Dark theme | Ivory canvas. Charcoal is a hero surface, not a site theme. | Verified by brand guide and homepage classes |
| Motion | `globals.css` includes a reduced-motion rule that sets `transform: none` for the editorial nudge. Lifeline rules exist for the unmounted lab demo. | Verified in CSS. Not exercised with a user preference. |

## Homepage

The hero matches the brand baseline: eyebrow, two-line title, philosophy, one biography sentence, two actions, avatar caption. Editorial dark uses warm copper `#E6B59A` for the italic line. Buttons use `min-h-12`.

**Judgment.** This is the right first screen for a founder. The risk is the page below the hero repeating Work, Experience, and a side quest in full. AUD-05 is a trim, not a rewrite.

**Hypothesis.** A recruiter who never scrolls still gets the positioning. Unmeasured.

## About

h1 "Strategist. Leader. Builder." matches the three pillars. The page should carry background, judgment, collaboration, and the boundary between coaching and formal management. This audit did not quote the full body. A copy edit belongs in a reviewed content pass, using sentences already on the site.

## Work

The index is the commercial page. Three anchor cards, then case studies rendered by `ProfessionalCaseStudy` with context, role, execution, evidence, and reflection. The component's prop names are close to Context → Role → Execution → Evidence → Lesson. Challenge and Results are not separate fields, and Results stay qualitative on purpose.

**Judgment.** The structure is strong enough. Adding numeric results would violate the claim boundary.

The "Related field systems" block correctly limits software marked `kind: "work"` to the competitive-intelligence study.

## Side Quests and project details

Cards link into `/work/[slug]`. Several detail routes swap in a dedicated case component (`AtlasCase`, `CompetitiveIntelligenceCase`, and others). The generic template uses status, sales question, and technology stack. Kind is not a visible label in `app/work/[slug]/page.tsx`.

Synthetic studies (`revenue-planning-simulator`, `revenue-intelligence`, `gtm-operating-plan`) must stay visibly fictional in the same view as any number. This audit did not re-read every number on those pages. **Needs confirmation in the implementation pass before any edit.**

## Field Notes

Two long-form notes support Journey A: deal anatomy and multithreading. They are linked from the enterprise-selling story. Taxonomy labels in the brand guide are broader than the two URLs. Empty collection titles, if still rendered, should be removed or marked as forthcoming. That check is open.

## Experience

The timeline is the recruiter artifact. h1 is specific. It is one extra click from the header because Experience is not a nav item. ADR 0003 says that is allowed. AUD-06 asks for clearer in-page paths, not a new nav item by default.

## Contact

Simple and on-brand on `main`. External links use `rel="noreferrer"` and an arrow icon plus text, so the icon is not the only name. Form behavior, validation errors, and spam controls were not submitted in this audit.

## Labs and prototypes

`/prototype` is the main UX defect: a complete alternate homepage with the retired headline, still styled like a product page, with a banner that many visitors will skip. Production design lab correctly 404s. Account-signal and private-work are noindex and should stay out of nav.

## Academy and builder surfaces

Useful for Journey C and for the builder differentiator. They are a second information architecture living beside the six-item nav. Footer silence makes them hard to leave and easy to land on from search if they stay indexable.

## Responsive and visual hierarchy (unverified in browser)

Source patterns that need a real viewport pass:

- Hero title uses `clamp` and a smaller clamp at `max-width: 375px` (ADR 0001 table).
- Homepage actions become a single column under 420px.
- Work collection cards are one column until `sm`.
- Long h1s such as the atlas headline need a 320px wrap check.
- 200% zoom was not run. Horizontal overflow is unverified.

## Component opportunities that wait

| Idea | Purpose | Reuse | Accessibility | Performance | Mobile | Decision |
| --- | --- | --- | --- | --- | --- | --- |
| Kind badge on project pages | Say Work or Side Quest | One component, every slug | Text, not color alone | None | Stacks with the status badge | Recommended. AUD-03 |
| Footer section links | Recover Home, Work, Experience, Contact | Layout only | Real text links | None | Wrap the existing footer row | Recommended with AUD-06 |
| Career timeline component | Already exists as a page | Do not duplicate on the homepage | Headings already on `/experience` | Avoid a second client bundle | Keep the page | Do not rebuild |
| Bento / Lifeline | Lab exploration | Design lab only | Dialog and sheet need focus traps if mounted | Extra client JS | Unknown until mounted | Leave unmounted |
| New CMS | Structured content | Registry already types projects | n/a | New dependency | n/a | Rejected. Extend `lib/portfolio.ts` |
