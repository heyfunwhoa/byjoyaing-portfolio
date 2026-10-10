<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Portfolio brand and editorial guidance

Before changing branding, copy, navigation, homepage, visual components or project descriptions, read [docs/brand/brand-guidelines.md](docs/brand/brand-guidelines.md).

- The site is Kristen Joy Aing's personal portfolio: **Commercial Leader. Curious Builder.** The `joy.` mark is a personal signature, not a company.
- Lead with cybersecurity commercial leadership, people, strategy and systems; differentiate verified professional **Work** from independently built **Side Quests**.
- Don't invent titles, outcomes, live functionality, customer claims or research findings. Do not publish private Joy Index material or employer/customer-sensitive information.
- Use existing tokens in `app/globals.css`, accessible/responsive components, and clear development status labels.
- The new architecture and homepage prototype are proposals, not a live-site mandate. Don't overwrite the homepage or redirect legacy routes without explicit review.
- Make focused changes in feature branches, validate with relevant TypeScript/lint/tests/build and browser checks, and document what actually passed.
- Update the brand guideline in the same reviewed PR whenever approved brand decisions change.

These rules supplement the existing Next.js rules above.
