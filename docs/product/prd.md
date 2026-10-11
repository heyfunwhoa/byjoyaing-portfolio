> **Canonical requirements:** [Portfolio Experience 2.0 PRD](portfolio-experience-v2-prd.md) (including the UX/SEO increment in section 31). This document is a historical summary, not a separate competing PRD.

# Portfolio Experience 2.0 — Product Requirements Document

> Draft for review — 2026-10-10. Source: current repository description/README and shared PRD structure from technical-docs-platform. Confirm actual code and existing docs before implementation. 

## Vision and audience
An evidence-led editorial portfolio for an enterprise seller growing into revenue/GTM leadership.

## Problem
Professional evidence and independent systems need clearer separation to establish seller credibility and leadership trajectory.

## Primary user journey
Visitor understands positioning → inspects sales/leadership evidence → explores methods and independent builds → contacts.

## MVP and scope validation
Preserve approved visual system and current fonts; distinct Work / Field Notes / Side Quests / About routes.

## Explicit non-goals and boundaries
Do not overstate managerial titles or employer software adoption; private Joy Index never published.

## Testable functional outcomes
- FR-01: Primary user can complete the proposed journey with clear validation and error states.
- FR-02: Source-derived records and numbers have traceable origin and explicit unknown/assumed labels.
- FR-03: Meaningful changes or decisions can be reviewed before high-impact action or publication.
- FR-04: Data ownership, access controls, and external interfaces are documented; no speculative integration claims.

## Quality requirements and success
Acceptance: audience comprehension tests, transparent evidence, responsive accessible layouts, CI checks and preserved URLs.
No usage baseline is established. Obtain user feedback and evidence before choosing numeric success targets. Apply privacy and security proportional to the repository data, keyboard and responsive checks for web UI, and regression tests for stored data/formulas. Document limitations.

## Delivery backlog
1. **P0 — Audit:** Identify current implementation, existing planning documents, route/data boundaries, tests and unknowns; classify each feature as implemented/partial/proposed.
2. **P0 — Core workflow:** Define the smallest complete user task and its acceptance cases, including failure/empty states.
3. **P1 — Quality and evidence:** Add provenance, UX, accessibility, data-integrity, security and tests appropriate to this product.
4. **P2 — Growth:** Evaluate expansion only after measured feedback and validated reliability.

## Dependencies, decisions and Definition of Done
Keep source-of-truth decisions and product-specific ADRs in this repository; link to shared engineering/documentation standards instead of copying them. Deliver work through small feature branches and PRs. Done means clear evidence, approved requirements, passing actual configured checks, and a verified usable outcome. PR merge does not prove production deployment.
