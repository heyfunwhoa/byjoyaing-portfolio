# Builder Guide — phased implementation

**Status:** Phase 1 draft for review. This is a portfolio navigation experience, not an AI chatbot or private memory assistant.

## Brand contract

- Canonical: [brand guidelines](brand/brand-guidelines.md). Public hierarchy: **Revenue & GTM Leader. Curious Builder.** and **People first. Problem-driven. Systems-minded.**
- Lead with commercial credibility and verified outcomes; the character supports orientation, never replaces real identity or proof.
- Use existing CSS tokens and typography; warm, grounded, concise copy. Preserve legacy routes while the IA migration is pending.
- The Joy Index is private. Never ingest its records or notes, directly or indirectly. No employee/customer-confidential material.
- The original illustrated portrait is an exploration, not final or required artwork. Do not introduce a random mascot as a production asset. Approve a consistent mini-you character and accessible alt text first.

## Phases and acceptance checks

### Phase 1 — Curated guide (this PR)
- Dedicated /builder-guide route; no homepage changes or new dependencies.
- Four paths: People, Strategy, Systems, and Story. Typed-ish local constant content, each with curated public links.
- Works without an LLM, API keys, database, analytics, image assets, or tracking.
- Keyboard-operable real buttons, clear pressed state, focus visibility and meaningful links.
- Review factual wording and link destinations before publication.

### Phase 2 — Optional conversational assistant (separate PR)
- Only after content quality and user demand justify it.
- Server-side API endpoint, strict input/output limits, rate limiting, timeout/cost controls, transparent AI disclosure.
- Server-side retrieval from allowlisted published pages; grounded citations and explicit uncertainty.
- Test prompt injection, hallucinated outcomes, sensitive-information requests, abuse and accessibility.

### Phase 3 — Curated retrieval index (separate PR)
- Build an allowlisted public-content manifest, content freshness/versioning and deletion handling.
- Add semantic search/pgvector only when keyword or curated search is demonstrably inadequate.
- Prevent unpublished docs, private Joy Index, credentials or employer-sensitive content from reaching ingestion.

### Phase 4 — Approved character system (separate PR)
- Approved master mini-you, a professional About portrait if desired, and at most a few consistent expressive poses.
- Optimized images with dimensions, stable visual identity, reduced-motion support. Avoid distracting homepage motion.
- Do not use a placeholder image as a final branded asset.

## Review measures

Ask a founder/recruiter to identify commercial background, a proof example, a project status and contact route. Check 375/768/1280px, 200% zoom, keyboard focus, contrast, and reduced motion. Later measure usefulness only with a documented privacy-respecting plan. Keep manual test outcomes separate from assumptions.
