# Portfolio success metrics

**Status:** Measurement plan. No baseline has been collected.  
**Date:** 2026-10-11

Do not fill the "Current" column with estimates. A blank current value means it has not been measured.

## How measurement is allowed

| Method | Use | Limit |
| --- | --- | --- |
| Task review with a person | Positioning, findability, contact | Record the protocol and the result. Do not generalize from one friendly reader. |
| Keyboard, zoom, and viewport pass | UX quality | Record viewport and what failed. Automated scans do not prove WCAG 2.2 AA. |
| Repository checks | Technical quality | Count only jobs that exist in `.github/workflows/`. |
| Editorial review | Content integrity | Compare the sentence with the public source. |
| Product analytics | Planned: Vercel Web Analytics first; no tracking SDK installed as of 2026-10-11 | See [Analytics decision and privacy plan](./portfolio-analytics-plan.md) and [implementation issue #74](https://github.com/heyfunwhoa/byjoyaing-portfolio/issues/74). No baseline or live telemetry exists until integration and dashboard verification. |

## Objectives

### Positioning comprehension

**Intent:** A visitor can say that Kristen is an experienced enterprise seller developing toward broader revenue and GTM leadership, and that independent building is supporting evidence.

| Signal | Method | Current | Target |
| --- | --- | --- | --- |
| Unaided description after the first screen | 5 task reviews, write the words they use | Not measured | At least 4 of 5 mention enterprise sales or revenue before software |
| False title check | Ask whether she has been Head of Sales | Not measured | 5 of 5 say no, or "not stated" |

### Professional credibility

| Signal | Method | Current | Target |
| --- | --- | --- | --- |
| Enterprise Sales collection contains at least one public evidence block that is not only a link | Source review of `/work` | Not met. The anchor is two links. | Met, using existing public facts only |
| Each published professional story names contribution and evidence limits | Editorial checklist | Partial. Two `publicStories` do this. | Every story on `/work` |
| No employment revenue figure on a public page | Diff review against the forbidden-figures list in the PRD | Treated as a release check, not a measured rate | Zero new figures |

### Content discoverability

| Signal | Method | Current | Target |
| --- | --- | --- | --- |
| Reviewer can point to Work, Field Notes, Side Quests, and About and state the job of each | Task review | Not measured | 5 of 5 correct |
| Field Notes example titles without URLs are labeled unpublished | Page review | Not met | Met |
| Side Quest subject and maturity are both visible | Page review | Maturity is visible. Subject names differ from the approved set. | Both match the PRD |

### UX quality

| Signal | Method | Current | Target |
| --- | --- | --- | --- |
| No unintended horizontal overflow at 375, 768, 1280 | Manual pass on changed pages | Not re-run for this planning change | Pass on every implementation PR |
| 200% zoom keeps reading order | Manual pass | Not re-run | Pass |
| Keyboard focus visible, menu Escape restores focus | Manual pass | Implemented in the header. Not re-certified here. | Pass on touched pages |
| Reduced motion | `prefers-reduced-motion` in `globals.css` exists | Present in code. Not a compliance claim. | Preserved |

### Technical quality

| Signal | Method | Current | Target |
| --- | --- | --- | --- |
| Lint, unit tests, production build | `.github/workflows/ci.yml` | Jobs exist | Green on the implementation PR |
| Secret scan | `security-scans.yml` TruffleHog | Job exists | Green |
| Dependency and config review | Trivy in the same workflow | `exit-code` is `"0"`, so it reports and does not block | Do not describe it as a merge gate |
| Preview deployment | Vercel | Prior feature branches were canceled by an ignored build step. Not retested here. | Confirm before calling a UI PR previewable |

### Content integrity

| Signal | Method | Current | Target |
| --- | --- | --- | --- |
| Status vocabulary stays inside Prototype, Professional field system, Designed, Concept (code: `prototype`, `field`, `designed`, `exploring`) | `validatePortfolioEntries` | Enforced for registry entries | Kept |
| Synthetic GTM examples stay labeled synthetic and unfeatured | Editorial review | Required by the content model | Kept |
| Joy Index absent from the repo and the site | Search | No route and no imported notes in this audit | Remains absent |

## Release gate for an implementation pull request

An implementation pull request is ready to review when:

1. Its acceptance criteria in the roadmap are checked against the diff.
2. The CI jobs that exist have been looked at, not only assumed.
3. Changed screens have been exercised at 375 and 1280, or the PR says why a docs-only change skips that.
4. New public sentences have a source, or they are labeled illustrative.
5. Rollback is "revert the commit," because these changes ship through Git.

This planning pull request is documentation. It does not move the metrics above.
