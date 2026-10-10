# Builder Academy — Programming Foundations

**Status:** MVP / educational prototype. First two guided lessons are implemented; remaining lesson roadmap is planned. Explorer and general 3-question check implemented. No persistent progress or code execution.

## Goal
Teach beginners how code works, explain the major language families, and distinguish languages (JavaScript, TypeScript, Python), relational query language (SQL), web markup/styles (HTML/CSS), shell scripting, libraries (React), frameworks (Next.js), runtimes (Node.js), and deployment platforms (Vercel).

## Architecture
- `lib/academy/programming.ts` — typed technology registry, official documentation links, prerequisites and 10 lessons.
- `components/ai-academy/programming-foundations.tsx` — client-side searchable explorer, selected language example, lesson roadmap and knowledge check.
- `app/ai-academy/programming/page.tsx` — Next.js route and metadata.
- `lib/academy/guided-lessons.ts` and `components/ai-academy/guided-programming-lesson.tsx` — guided beginner reading, annotated examples and interactive assessments.
- `lib/academy/guided-lessons.test.ts` — guided content integrity and scoring tests.
- `lib/academy/programming.test.ts` — registry uniqueness, source-link format, valid relations and prerequisite integrity.
- Academy home links to the module. Keep the separate Git Workflow Essentials PR intact; reconcile both homepage links when merging.

## P0 review
1. Confirm lint, tests and production build pass in GitHub Actions.
2. Review references and technical descriptions against the linked primary language documentation.
3. In authenticated Vercel preview, check search, category filters, source links, quiz feedback, keyboard-only navigation and responsive layouts at 375/768/1280px.
4. Avoid claiming browser validation unless it is actually observed.
5. Before release, check that both the Git Workflow Essentials and Programming Foundations entry points are included and that pending PRs do not overwrite each other's homepage edits.

## Next increments (separate PRs)
- Expand the remaining eight lesson outlines into guided lessons with objectives, annotated syntax, guided tasks and multiple-choice assessment.
- A safe editable code runner after threat modeling; browser sandbox isolated from backend/environment secrets, CPU/network limits, and no arbitrary server execution.
- Source version/review dates, evidence-backed comparisons and course prerequisites.
- Proof-of-learning entries tied to exercises, not page views; consented persistence only after account/progress architecture is designed.
- Later topic profiles: Go, Rust, Java, C#, Ruby, and C/C++, with stage-appropriate depth.

## Sources
Language and platform profile entries link to primary sources (MDN, TypeScript, Python, PostgreSQL, GNU Bash, React, Next.js, Node.js and Vercel docs). Treat example application use cases as teaching illustrations, not proof a particular tool is needed.
