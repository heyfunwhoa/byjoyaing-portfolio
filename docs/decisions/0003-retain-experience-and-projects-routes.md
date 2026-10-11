# ADR 0003 — Retain `/experience` and `/projects`

**Status:** Accepted  
**Date:** 2026-10-11

## Context

`docs/rebuild-roadmap.md` proposed redirecting `/experience` to `/work` and `/projects` to `/side-quests`. `docs/portfolio-segmentation.md`, which matches the code on `main` at `94495d9`, says to keep both routes.

Verified behavior:

- Header links: `/`, `/about`, `/work`, `/field-notes`, `/side-quests`, `/contact`.
- `/experience` renders the career timeline. The Work index and homepage link to it.
- `/projects` renders the filterable directory. Side Quests links into it with category query parameters.
- `/work/[slug]` still serves both professional field systems and independent builds. Classification is `kind` in `lib/portfolio-registry.ts`, not the URL prefix.

## Decision

Do not add those redirects in the foundation milestone.

- `/work` is the professional index.
- `/side-quests` is the independent-project index.
- `/experience` stays the timeline.
- `/projects` stays the directory until a later pull request replaces its job and tests every inbound link.
- A personal project is not Work because its URL starts with `/work/`.

A future redirect is allowed only in a pull request that lists every internal link, adds a permanent redirect, and includes a link test. That pull request is not part of EPIC-01.

## Consequences

Navigation labels and page responsibilities can improve without a URL break. Documentation that still instructs a redirect is historical and points here.
