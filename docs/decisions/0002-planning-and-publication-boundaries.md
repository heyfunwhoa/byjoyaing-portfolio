# ADR 0002 — Planning, publication, and private-reflection boundaries

**Status:** Accepted  
**Date:** 2026-10-11

## Context

Portfolio Experience 2.0 needs a place to prioritize work without forking the public specification, and without importing private career notes.

Four systems were in scope:

| System | What it is | Access during this decision |
| --- | --- | --- |
| `heyfunwhoa/byjoyaing-portfolio` | Public site, brand, code | Readable. Authoritative for public product. |
| Notion, page "Portfolio Studio" | Planning workspace requested for this product | Created as a private page on 2026-10-11. |
| `heyfunwhoa/joy-index` | Private knowledge and leadership reflection | Not resolvable in the planning session. Contents were not inferred. |
| `heyfunwhoa/technical-docs-platform` | Shared engineering and editorial standards | Not resolvable in the planning session. Contents were not inferred. Local standards already in this repository remain in force. |

## Decision

- **GitHub owns** code, the canonical PRD, architecture, design specifications, brand guidelines, tests, and approved public content.
- **Notion owns** roadmap priority, planning status, and working notes that point at GitHub. It does not become a second copy of the PRD.
- **The Joy Index owns** private reflection and career development. There is no sync, no public route, and no paste of private notes into GitHub or Notion content rows.
- **Shared standards** stay in their own repository. This portfolio links to them when they can be read, and records local adoption in this repository. It does not duplicate an unread standard.
- If a GitHub Issue later tracks the same backlog item, the issue state is authoritative for engineering execution. The Notion row is updated in the same review, or the row states that GitHub is the execution status.

## Consequences

Public case studies are written only from material already approved for the public site, or from a deliberate review that produces new public-safe copy. Leadership capability levels (Learning, Practicing, Demonstrated, Repeatable) stay unset until that review exists.

## Alternatives rejected

- Automatic sync from the Joy Index. Rejected. Private notes are not public evidence.
- Copying the full PRD into Notion. Rejected. Two full copies will diverge.
