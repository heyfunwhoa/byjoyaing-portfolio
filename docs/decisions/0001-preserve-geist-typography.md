# ADR 0001 — Preserve Geist Sans and Geist Mono

**Status:** Accepted  
**Date:** 2026-10-11  
**Deciders:** Product owner instruction, confirmed against the shipped site and `main` at `94495d9`

## Context

The live site at https://www.byjoyaing.com/ and `app/layout.tsx` load two families from `next/font/google`: Geist Sans (`--font-geist-sans`) and Geist Mono (`--font-geist-mono`). In `app/globals.css`, `--font-sans` and `--font-display` both point at Geist Sans. Geist Mono is for technical metadata.

Earlier drafts specified Instrument Serif for display, and one intermediate change tried Source Serif 4. Those families are not loaded on `main`. An explicit product instruction then approved the fonts currently displayed and forbade new families.

`docs/design-process.md` previously still listed Instrument Serif as `font-display`. That sentence contradicted the code and the brand guide. This decision records the approved constraint so later implementation does not "restore" a retired face.

## Decision

- Display, interface, navigation, body, chapter labels, and pull quotes use **Geist Sans**.
- **Geist Mono** is limited to technical metadata such as hashes.
- Do not add Instrument Serif, Source Serif 4, or any other font family.
- Allowed later refinements: responsive size, line height, letter spacing, measure, alignment, hierarchy, spacing, and accessibility. Those are not family changes.
- The canonical brand guide and `app/globals.css` must stay in agreement. A family change requires a new ADR and a reviewed brand-guide edit in the same pull request.

## Typography baseline for later visual regression

Recorded from `app/globals.css` on `94495d9`. This is the contract a future test should pin. No visual-regression tool is added by this decision.

| Role | Family | Size | Line height | Tracking | Weight |
| --- | --- | --- | --- | --- | --- |
| Eyebrow (`.editorial-eyebrow`) | Geist Sans | `0.8125rem` | `1.5` | `0.01em` | 600 |
| Title (`.editorial-title`) | Geist Sans | `clamp(2.15rem, 4.8vw, 3.6rem)` | `1.08` | `-0.035em` | 600 |
| Title at `max-width: 375px` | Geist Sans | `clamp(2.05rem, 9vw, 2.7rem)` | `1.08` | `-0.035em` | 600 |
| Section title (`.editorial-section-title`) | Geist Sans | `clamp(1.7rem, 3vw, 2.5rem)` | `1.15` | `-0.03em` | 600 |
| Quotation (`.editorial-quotation`) | Geist Sans | `clamp(1.45rem, 2.6vw, 2.1rem)` | `1.3` | `-0.02em` | 500 italic |
| `.font-display` | Geist Sans | inherited | inherited | `-0.03em` | 600 |

Fallbacks: `ui-sans-serif, system-ui, sans-serif`.

## Consequences

Implementation pull requests that touch type must diff against this table. A change to a clamp or a weight is in scope when the pull request says so. A new `@import` or `next/font` family is out of scope.

## Alternatives rejected

- Revert display type to Instrument Serif. Rejected because the approved live fonts are Geist.
- Reintroduce Source Serif 4. Rejected for the same reason.
