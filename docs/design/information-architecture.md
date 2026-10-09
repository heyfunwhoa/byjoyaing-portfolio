# Information architecture and wireframes (low fidelity)

## Sitemap
/ (Home)
/about (story, values, experience)
/work (professional impact case studies)
/work/[slug] (professional impact only)
/side-quests (independent builds and experiments)
/side-quests/[slug] (build case studies)
/contact
Legacy /projects and existing /work/[old-project-slug] need explicit mapping and permanent redirects only once targets exist.

## Homepage wireframe A — leadership first (preferred)
[Header: joy. + Kristen Aing | About | Work | Side Quests | Contact]
[Eyebrow: Cybersecurity & GTM leadership]
[H1: Commercial Leader. Curious Builder.]
[Positioning copy and two CTAs: Explore Work / Explore Side Quests]
[Three credible proof points: people / commercial / systems]
[Selected Work: 2–3 business case-study cards]
[Side Quests preview: 2 projects, status indicators]
[Brief personal note + About link]
[Contact CTA / footer]

## Homepage wireframe B — split narrative
[Header]
[Two-column hero: leadership story | project snapshot]
[Trust & proof strip]
[Work / Side Quests split gateway]
[About / values excerpt]
[Contact]
Tradeoff: visually lively, but competes with primary leadership identity and can feel busier on mobile.

## Page structures
About: introduction → short career story → values (personal/professional) → leadership philosophy → career timeline → education.
Work: short introduction → highlighted quantified outcomes where supportable → professional case studies → relevant experience → contact.
Work detail: context → role & collaborators → challenge → decision / approach → results and evidence → reflection; redact confidential details.
Side Quests: playful but usable intro → filterable or simple grid → honest project status → demos/source.
Side Quest detail: motivation → intended user → problem → design decisions → architecture → current evidence → limitations → lessons → demo/source.
Contact: clear invitation → email/social links → accessible form only if maintenance value warrants it.

## Content migration
- Reuse timeline from `components/experience-timeline.tsx`.
- Separate `lib/portfolio.ts` project records into future Work and Side Quest content types.
- Preserve reviewed About page changes from draft PR #3.
- Review visual components from draft PR #2 rather than duplicate them.
- Do not move any technical project to Work simply because its legacy URL begins /work.
