# Portfolio audit remediation

This change applies the full-site audit to the existing portfolio. The design principle is summary first, with optional depth. Professional contributions, project stages, current implementation and limitations remain visible. Existing routes, brand tokens and toolkit workflow tabs are preserved. This is an implementation record, not a claim that the changes are deployed or usability-tested.

## Coverage and acceptance

| Finding | Implementation | Verification / remaining review |
| --- | --- | --- |
| A01 Skip targets | Academy main regions have the shared focusable main target. | Static HTML check; browser suite covers affected routes. |
| A02 Focus visibility | Card focus outlines restored; featured links have explicit outlines. | CSS review; keyboard/contrast review still required. |
| A03 Broken directory fragments | Case links use category queries and the existing directory anchor. | Source review; URL/filter browser test added. |
| A04 Editorial claims | Removed instructions to verify unpublished claims from public Work copy; no new metrics. | Registry tests and content review. |
| A05 About hierarchy | Headline precedes a smaller mobile portrait; career/capability diagrams open optionally; repeated GTM cards become navigation. | Build; manual responsive review pending. |
| A06 Directory duplication | Removed repeated featured list; directory is the primary collection; previews/tools and connections open optionally. | Filter/reload browser test added. |
| A07 Long cases | Three major cases disclose workflows, architecture and design decisions. Generic cases show current implementation and user decision before deeper workflow detail. | Direct/repeat architecture-link browser tests added. Limitations remain visible. |
| A08 Academy hierarchy | Resource promotions follow the introduction and open optionally; phone lesson selection uses a native select. | Build; overflow browser coverage added. |
| A09 Career duplication | Each role has a visible summary and individual detail disclosure; career rail and connected systems are optional. | Build and source review; visual review pending. |
| A10 Professional evidence | Context, contribution and evidence stay visible in a two-column maximum layout. Execution, reflection and connections open in a native disclosure. | Updated source guard; no truncation of evidence. |
| A11 Metadata | Shared helper completes route canonicals and per-page social metadata while preserving noindex. | Two unit tests; 44 generated public HTML pages checked for canonical, share image and one main target. Gated 404s and redirect output excluded. |
| A12 Targets | Compact technology logos are informational images; named website links retain 44px targets. Directory uses 48px phone selects and 44px desktop buttons. | Source review; manual touch review pending. |
| A13 Browsing and motion | Work carousel drag works with reduced motion; Side Quests exposes a scrollbar and a directory link. Existing motion system retained. | Source review; no autoplay or new motion dependency. |
| A14 Filters | Directory focus/stage update the URL, restore on reload and announce result count. Academy keeps selection inside the chosen track and presents an empty workflow result. | Browser test added; build. |
| A15 Mail acceptance | Primary failure prevents confirmation. Confirmation failure preserves accepted primary success without inviting duplicate submission. | Four synthetic unit tests; no real emails sent. Durable distributed rate limiting remains an infrastructure follow-up. |
| A16 Menu focus | Open mobile menu makes page/brand inert, loops focus and restores focus on Escape. | Browser test added; main target fixes cover Academy. |
| A17 Taxonomy | Existing registry/kind labels and legacy URLs preserved. | Existing registry tests; no route migration. |
| A18 Repetition | Removed implementation jargon from featured collections; optional depth reduces repeated previews. | Editorial review. Essential demo/status limitations retained. |
| A19 Repository wording | Stable source/version-history wording replaces “only public repository.” | Existing toolkit tests. |
| A20 Regression coverage | Expanded browser routes and interaction journeys; mail APIs are blocked for all browser tests. | CI must run expanded suite; do not interpret test source as a passing run. |

## Validation

Local production build (including TypeScript), ESLint and 152 unit/source-guard tests pass. Production dependency audit reports zero vulnerabilities. Static generated HTML was inspected; public static routes have their own canonical, a share image and one main target. Dynamic Contact/Projects and interactive behavior require the browser suite.

The managed editing environment does not provide the supported interactive browser workflow, so no local browser run, responsive screenshots, 200% zoom review or measured performance baseline is claimed. CI runs Chromium against the production build and blocks mail submissions. Phone/tablet/desktop visual and content review remains required before merge.

## Operational boundaries

- Existing process-local rate limiting is not a durable distributed limit. Provisioning/configuring a persistent limiter is separate infrastructure work; this PR does not add a paid service or claim multi-instance protection.
- Email provider acceptance does not prove inbox delivery. Live delivery testing would require an approved synthetic recipient/send and provider evidence; none was performed.
- Performance/SEO field scores were not measured. Record a baseline before claiming improvement.
- Minimal response hardening adds nosniff, referrer policy and restrictions on unused device permissions. No broad Content Security Policy or complete security certification is claimed.
- Review overlap with open responsive-reference and analytics work before merge. No merge, deployment, analytics activation or private data publication is part of this change.
