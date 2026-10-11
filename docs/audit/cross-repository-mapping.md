# Cross-repository content mapping

**Access note.** The GitHub token in this environment received HTTP 404 for every private repository probed. 404 means not visible, not deleted. READMEs below are either public or already represented inside this portfolio. No other repository was modified.

| Repository | What was read | Status confidence | Audience | Relationship to positioning | Visual on the site today | Recommendation | Confidentiality |
| --- | --- | --- | --- | --- | --- | --- | --- |
| byjoyaing-portfolio | Full local tree at `a76e5e9` | High | Hiring leaders and peers | The site itself | Live | Keep as the only public product | Public |
| security-market-map | Public README | High for the README. Implementation depth not re-audited. | Security sellers and product readers | Shows category fluency and evidence habits | External link on Side Quests and Field Notes sources | **Side Quests, after a reviewed summary.** Do not invent vendor scores. Identity is the evidenced slice; other domains are research candidates. | Public repo. Still do not paste unreviewed claim tables onto the marketing page. |
| detector-coverage-atlas | Portfolio case and tests in this repo. Upstream repo 404. | Medium. Site copy exists. Upstream unread. | Technical buyers and builders | Differentiator: coverage reasoning | `/work/detector-coverage-atlas`, homepage teaser, GitHub logo on the detail | Keep as Side Quest. Label kind. | Do not add private detector data. |
| truffle-camp | Portfolio page. Upstream 404. | Medium | Enablement readers | People development, independent of employer curriculum claims | `/work/truffle-camp`, linked from the people story as a side quest | Keep as Side Quest | Employer materials stay off the page. |
| gtm-revenue-os | Unread (404) | Low | n/a | Synthetic studies on the site already teach planning shape | Three simulator pages | Keep unfeatured and fictional. Do not describe them as employer results. | Until the repo is readable, do not sync numbers from it. |
| account-signal-engine | Unread (404). Portfolio route exists. | Low for the repo. The route is a noindex LimaCharlie brief. | Builders | Research craft | `/account-signal` noindex | Stay unlisted. A public case study needs a reviewed, sourced summary. | No account records. |
| channel-territory-mapping | Unread | None | n/a | Named as a forbidden live import in the content model | Field Notes source list only | Unlisted | No territory or account data. |
| joy-index | Unread | None | Private | Not a public identity | No route | Unlisted | Do not copy. |
| technical-docs-platform | Unread | None | Internal | Standards source when readable | Engineering standards link only | Unlisted on the site | Do not duplicate the unread baseline. |
| trufflehog | Not probed this session beyond earlier public visibility | n/a | n/a | Employer-adjacent open source, not a personal case study | Not a nav item | Leave unlisted unless a reviewed note explains her relationship to it | Do not imply maintainership that is not hers. |

## Content model

The current model is enough:

- Projects and case studies: `lib/portfolio.ts` plus `kindBySlug` in `lib/portfolio-registry.ts`
- Professional stories: `lib/public-stories.ts`
- Field Notes: `lib/field-notes.ts` and the two routes
- Capabilities: `lib/capabilities.ts`
- Stacks: `lib/portfolio/verified-stacks.ts`
- Evidence state: `requires-review` until a person sets an approved state
- Protected content: server-side gate, documented in `docs/security/selected-work-access.md`, not a client flag

A new CMS would duplicate this. Adapters stay in the repo.

## Publication gates already in force

- One curated operations case study only after live, redacted CI-to-Slack evidence. Not in this audit.
- No private ops repository row until that repository exists and is named.
- `evidenceReview` stays `requires-review` for registry entries.
