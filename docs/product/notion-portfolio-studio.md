# Notion — Portfolio Studio

**Status:** Created as a private Notion page on 2026-10-11. Planning layer only.  
**Decision:** [ADR 0002](../decisions/0002-planning-and-publication-boundaries.md)

GitHub remains authoritative for the PRD, code, brand, and public content. This file is the setup record. It is not a second PRD.

## What was created

The connected Notion integration had write access. The following private pages exist. They were not placed in a teamspace because none was named. Move them if a shared location should own them.

| Page | URL |
| --- | --- |
| Portfolio Studio (home) | https://app.notion.com/p/3f6cdefaec7581e98338d882df48050a |
| Portfolio Experience 2.0 | https://app.notion.com/p/3f6cdefaec7581da95dac7cd60e88efe |
| Product Roadmap | https://app.notion.com/p/a3030010912f4ee88c82a5583cc0c038 |
| Feature Backlog | https://app.notion.com/p/8c8c5e4897dc4907be4640714f2a6d7f |
| Content Pipeline | https://app.notion.com/p/705dbb82ef3545a68f8731a363a1aabd |
| Product Decisions | https://app.notion.com/p/7351abb71aff4b80a92283567da16e93 |
| Research and Feedback | https://app.notion.com/p/430e00197eff49dd86d1aae4f213df80 |

Seeded records: EPIC-01 through EPIC-08, FEAT-001 through FEAT-003, DEC-001 through DEC-003, three research rows from this audit, and public content rows CNT-001 through CNT-004 (homepage, one illustrative field note, one qualitative work story, and the About Beyond work passage). No Joy Index text was copied.

The planning pull request is https://github.com/heyfunwhoa/byjoyaing-portfolio/pull/43. It is a draft and is not merged.

## Home

Portfolio Studio states the vision, the active milestone (M0 Foundation), source-of-truth rules, blockers, and links to the databases. It does not embed the PRD body.

## Database schemas

Properties match the planning request, with these implementation choices:

- Select fields are used for priority, status, and phase so the options are explicit.
- Effort is Small / Medium / Large. It is not a calendar estimate.
- Parent epic is text (`EPIC-04`), not a relation, so a row can be read without a join. The epic id is the sync key.
- Research ID is an auto-increment id. Topic is the title, so the database is browsable.
- Review owner is text, not a Notion person property.

### Product Roadmap

Epic ID, Title, Objective, Priority (P0/P1/P2), Status, Phase, Dependencies, Owner, Target milestone (M0–M3), Acceptance criteria, GitHub references, Last reviewed.

### Feature Backlog

Feature ID, Feature title, Parent epic, User story, Problem, Proposed solution, Priority, Effort estimate, Status, Acceptance criteria, GitHub issue or PR, Blockers, Last updated.

### Content Pipeline

Content ID, Title, Content type, Portfolio section, Intended audience, Evidence status, Publication status, Source or reference, Review owner, Public URL, Last reviewed.

Evidence status includes **Do not publish**. Use it as a hold. Do not create rows from private notes in order to mark them.

CNT-004 is the live Beyond work passage on `/about` ([row](https://app.notion.com/p/3f7cdefaec7581eea3eaf30f491b9670)). It records the public interests in `lib/public-personal.ts`. Creative exploration is photography, art, and unfamiliar creative projects. Electronic music keeps “Creativity, energy and connection.” A travel interest is added when an approved public sentence describes travel.

### Product Decisions

Decision ID, Title, Problem, Alternatives considered, Decision, Rationale, Impact, Status, Decision date, Related epic, Canonical ADR link.

An accepted decision that changes brand or architecture also needs an ADR under `docs/decisions/`. The ADR is canonical. The Notion row links to it.

### Research and Feedback

Topic, Research ID, Source, Observation, Evidence type, User segment, Implication, Confidence, Follow-up action, Review date.

Evidence type includes Design inspiration. A v0 bento template recorded there is inspiration. It is not an approved requirement. The approved bento is `components/editorial-bento.tsx`, described in [editorial-experience.md](../brand/editorial-experience.md).

## Synchronization rule

| Question | Owner |
| --- | --- |
| Should we do this next? | Notion roadmap status |
| What must the site do? | GitHub PRD and issues |
| Did the check pass? | GitHub Actions |
| What is the brand? | `docs/brand/brand-guidelines.md` |
| What is private career reflection? | Joy Index, unread by this plan |

When a GitHub Issue exists for a backlog row, engineering status follows the issue. Update the Notion status in that same change, or write on the row that GitHub is the execution record.

## What this setup does not do

- It does not publish anything to byjoyaing.com.
- It does not read or write the Joy Index.
- It does not copy `technical-docs-platform`, which was not readable.
- It does not grant site authentication or a reviewer portal.
