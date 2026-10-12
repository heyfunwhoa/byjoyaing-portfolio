# Portfolio visual and journey review — 2026-10-11

Status: live baseline reviewed; fixes prepared in PR #88, not released.
Owner: Kristen Aing. Baseline: production main 8efba125.
Scope: 32 mapped public routes plus 5 additional linked routes. Desktop screenshots at 1280px for the mapped routes; phone screenshots at 375px for the eight main destinations. The five additional linked routes received HTML/content checks.

## What the evidence proves

Firecrawl live fetches used maxAge: 0. All 37 inspected URLs returned HTTP 200. Screenshots were visually inspected. Source review confirmed shared rendering and request behavior. This is a layout/content review, not an end-to-end test of every control. No messages were sent, private files accessed, or protected grants created.

Primary pages: /, /about, /work, /field-notes, /side-quests, /contact, /experience, /projects.
Mapped secondary pages: /builder-guide; /ai-academy; /ai-academy/systems; /capabilities and its revenue-strategy, gtm-engineering, revenue-operations, ai-product and sales-enablement pages; both Field Notes articles; all 13 mapped /work/[slug] pages.
Additional linked pages: /private-work, /ai-academy/version-control, /ai-academy/programming, /ai-academy/devops/build-rate-limits, /ai-academy/dependencies/lockfiles.
No claim is made that every possible hidden route, interactive state or external destination was tested.

## Priorities

| Priority | Finding | Evidence and response |
| --- | --- | --- |
| P1 | Technology marks dominate content on nine pages | 85 instances of size-full technology images: Home 4, Side Quests 16, Projects 40, Detector Atlas 5, and 4 each on Truffle Camp, Competitive Intelligence, Customer Feedback, Partner GTM and Account Intelligence. Shared fixed-wrapper/image correction in PR #88 covers all. |
| P1 | Public name should be Kristen Aing | Owner explicitly requested it. PR #88 updates visible identity, metadata, social-preview images, accessibility labels and email signatures/fallback. Header joy. hover/focus remains. Canonical brand guidance updated. |
| P1 | Work needs intentional horizontal motion | Owner requested a carousel. PR #88 replaces the three overview tiles with a scroll-snap preview strip, keeping enterprise selling first and all detailed sections on the page. No autoplay; arrows, keyboard/native scroll and reduced-motion behavior are implemented. Changed-build browser verification remains outstanding. |
| P1 | Contact needs a reason beyond the icons | Keep general contact plus Request work examples. Ask for work focus and evaluation context, describe personal review, and avoid implying automatic access or guaranteed sample availability. Keep existing email endpoint. |
| P1 | Request deep links need a real scroll target and consistent mode | Add id=access on the mode-control group and derive mode directly from the URL hash. Mode buttons update the hash; existing #write remains. Prevent a prior manual Message choice from overriding a later #access request. |
| P2 | About has a long technical toolkit on phones | Screenshot shows many technical groups after the professional story. Consider a concise initial list plus an optional disclosure. This is a proposed usability improvement, not a broken layout or approved implementation. |
| P2 | Projects is a dense secondary directory | Logos account for much of its current excessive height. Reassess after the shared fix; preserve filters and legacy URLs. Avoid another index or a carousel that hides the directory. |
| P2 | Capability pages reuse many of the same project cards | Retain as secondary navigation. A later content pass should show a short concrete professional example before independent builds. Do not invent outcomes or redirect routes in this polish PR. |
| P2 | Some detail-page social metadata inherits the root title/description | Retrieved Competitive Intelligence metadata uses root Open Graph copy even though its browser title is specific. Follow up with page-specific Open Graph titles/descriptions using approved page content. |
| P2 | Field Notes mixes two available guides with planned collections | Keep planned entries clearly labeled; grow only from reviewed publishable material. The guide headings ARE present in screenshots/source. Missing h1 in main-content extraction was an extraction omission, not a confirmed site defect. |
| P2 | Private-work entry is an inquiry, not an approval product | Public /private-work responds 200 and explains selective sharing. Protected auth/storage/admin approval is documented planning, not a live grant workflow. Do not upload confidential artifacts as part of this design pass. |

## Motion policy

Use motion to help navigation, selection and progressive disclosure. Keep the homepage identity treatment and existing entrance/hover cues. The Work carousel is manual, bounded and optional to interact with; all existing anchor destinations remain. No spinning orbit, autoplay or global continuous motion. Honor reduced motion and preserve 44px controls.

## Verification before calling the fixes live

1. Require current lint/tests/build and security checks on the final PR head.
2. Review desktop and phone rendering of the changed build, including all shared-logo consumers.
3. Exercise carousel arrows, keyboard, swipe/native scroll, end spacing and anchor links with reduced motion on/off.
4. Check header joy. hover/focus and Kristen Aing in header/footer/home/social preview.
5. Check Contact direct #access, switching modes, browser back/forward, required focus selection and request confirmation with approved synthetic testing.
6. Confirm production deployment SHA/domain after an approved merge; record actual live behavior separately.

Not run: human screen reader, forced colors, real touch hardware, 200% zoom, Lighthouse measurement, all interactive Academy states, email delivery, form submission, protected downloads, or private approval flows.
Rollback: revert the focused PR commits; no migrations or integration/environment changes.
