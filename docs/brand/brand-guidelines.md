# joy. — Portfolio brand guidelines

> **Status:** Canonical working brand reference (October 2026). Brand foundations are established; homepage layout, information architecture implementation, imagery, and case studies are still under review.
>
> **Scope:** Personal portfolio at https://www.byjoyaing.com/ — not a separate product/company called Joy. The private Joy Index is not part of the public site.

## 1. Brand fundamentals

- **Signature:** `joy.`
- **Name:** Kristen Joy Aing
- **Primary positioning:** **Commercial Leader. Curious Builder.**
- **Guiding philosophy:** **People first. Problem-driven. Systems-minded.**
- **Supporting expression (optional, not competing main positioning):** *Curious by nature. Builder by instinct.*
- **Core domains:** Enterprise cybersecurity, technical sales and GTM strategy, people development, product thinking, AI-assisted research and practical systems.

**Brand promise:** Show how commercial judgment, curiosity, and practical building make complex technical markets easier to understand, and help people and teams grow.

**Three pillars:**
1. **People:** coaching, mentorship, enablement, collaboration and developing talent.
2. **Strategy:** security-market understanding, commercial leadership, customer insights and GTM decisions.
3. **Systems:** repeatable workflows, useful tools, research, product experiments and thoughtful automation.

**Important boundary:** This is a commercial leader who builds, not a software engineer persona with sales appended. Do not claim an unheld Head of Sales title, exaggerate engineering ownership, or obscure individual versus team contributions.

## 2. Audience and tasks

- **Founder / hiring leader:** understand commercial leadership strengths → find a credible Work example → make contact.
- **Recruiter:** identify role and relevant experience → review About and career context → contact.
- **Technical / product collaborator:** understand problem-solving approach → inspect a Side Quest's evidence and limitations → connect.
- **General visitor:** discover the story, values and areas of curiosity.

These paths are **design hypotheses**, not measured visitor behavior. Verify through usability sessions.

## 3. Voice and messaging

Sound confident but not corporate, curious but grounded, warm but concise, credible rather than grandiose. Use plain language and active verbs. Favor concrete decisions and evidence over buzzwords. The professional story comes first; playful touches can follow.

**Message hierarchy:**
1. Who: commercial leader in enterprise cybersecurity.
2. How: people, strategy and systems.
3. Proof: professional outcomes and transparent project artifacts.
4. Personality: joy., thoughtful curiosity and experimentation.
5. Invitation: explore Work or Side Quests, then connect.

**Do:** “I developed onboarding resources to help teammates ramp,” if supported.
**Avoid:** unverified metrics, invented customer use, claiming independent demos are production products, or conflating proprietary employer work with personal projects.

**Hero copy baseline:** Eyebrow: “Cybersecurity & GTM leadership”; headline: “Commercial Leader. Curious Builder.”; body: one or two sentences linking people development, complex commercial problems and the systems built to solve them. CTAs: “Explore Work” and “Explore Side Quests.”

The alternate prototype headline “Curious by nature. Builder by instinct.” is suitable as secondary personality copy; adopting it as the final H1 requires an explicit design decision.

## 4. Visual identity

### Colors (implemented in `app/globals.css` on `main`)

| Token | Hex | Use |
| --- | --- | --- |
| Background / warm ivory | `#F3EFE6` | Main canvas |
| Foreground / charcoal | `#1B211D` | Headlines, body, primary control |
| Muted | `#4A504B` | Secondary text |
| Accent / copper | `#8A4B2A` | Small accents, interactive emphasis |
| Accent foreground | `#FBF8F2` | Text on copper |
| Card | `#FBF8F2` | Inset surfaces |
| Border | `#CFC3B3` | Dividers and outlines |

Colors above describe the **existing implementation**, not guaranteed accessibility in every combination. Validate actual contrast pairs against WCAG 2.2 AA. Avoid broad copper fills, unrelated bright palettes, and decorative color without purpose.

### Typography

- Display: **Instrument Serif** (or existing configured display face), expressive for big editorial headlines.
- Interface and body: **Geist Sans**, readable and restrained.
- Technical labels/metadata: **Geist Mono**, sparingly.
- Preserve accessible font fallbacks, line lengths, logical hierarchy and mobile wrapping. Avoid gratuitous all-caps paragraphs.

### Logo, shapes and imagery

- Use `joy.` as a recognizable **personal signature**, paired with readable “Kristen Joy Aing” where identity clarity matters.
- The current topographic/engraved portrait is an existing visual exploration, **not a mandatory future brand asset**.
- Favor original diagrams, product screenshots, source artifacts, systems maps, and intentional editorial compositions over stock photos or fabricated app mockups.
- Keep shape language simple: measured rounded panels, fine borders, aligned grids and generous whitespace. Avoid decorative clutter, gratuitous shadows and over-animated transitions.
- Motion must aid understanding and honor `prefers-reduced-motion`.

## 5. Information architecture (proposed, not yet deployed)

Primary destinations: **Home / About / Work / Side Quests / Contact**.

- **Home:** professional positioning → credible proof → Selected Work → Side Quests preview → personal story → contact.
- **About:** short origin story including advertising background → values (personal and professional) → leadership philosophy → career timeline → education.
- **Work:** professional outcomes, team development, sales/GTM strategy, enablement, collaboration and relevant impact.
- **Side Quests:** independent builds, software learning, AI workflows and cybersecurity research, with honest stages and linked artifacts.
- **Contact:** straightforward email/social/contact path.

**Routing rule:** Current `/projects` and `/work/[slug]` are live legacy routes. Do not change or redirect them until corresponding destination pages exist; maintain durable old links and metadata. A personal technical project is not “Work” merely because its present URL starts with `/work/`.

**Homepage direction:** Leadership-first arrangement (provisional preferred option), with Work preceding Side Quests. PR #9 holds an exploratory `/prototype` page, not an approved replacement for `/`.

## 6. Case study patterns

### Professional Work
Context → specific problem → your role and collaborators → decision/approach → execution → **verified** outcome/evidence → reflection. Share only public or approved details; redact employer/customer-sensitive information. Separate your own work from team results.

### Side Quests
Motivation → intended user → problem → design and architecture decisions → current implementation → real demonstration/source → known limitations → lessons and next iteration. Label **idea / prototype / in progress / live** based on observable evidence. Clearly distinguish synthetic/demo data from real customer data.

Show what a tool genuinely does **today**, not simply its planned architecture. Distinguish hypotheses from sourced facts and link research sources or footnotes where appropriate.

## 7. UX and accessibility standards

1. Hierarchy: the first screen identifies the person and relevant value before tooling detail.
2. Proximity/alignment: group related problem, approach and outcome consistently.
3. Contrast/clarity: primary and secondary actions are distinct; links unmistakably actionable.
4. Progressive disclosure: summary first, deeper technical explanation on case pages.
5. Responsive first: inspect at **375px, 768px and 1280px**, including 200% zoom.
6. WCAG **2.2 AA target**: semantic heading order, labels, keyboard operation, visible focus, adequate touch targets, contrast and reduced-motion preferences.
7. Evidence: no fake research findings, testimonials, performance numbers or user outcomes.

**Usability tasks (unvalidated until conducted):** “What does this person do?”, “Find a leadership/team-impact example,” “Find a technical project and identify its status,” “Find their career story,” and “How would you contact them?” Record results rather than assuming success.

## 8. Engineering and publishing guardrails

Use the existing Next.js / TypeScript / Tailwind stack and shared design tokens; avoid page-by-page hardcoded visual drift. For each meaningful implementation: feature branch → focused commits → draft PR → TypeScript/lint/tests/build/CI → responsive, keyboard and content review → approved merge.

Follow least-privilege workflows, dependency and secret checks, no credentials or personal/private data in fixtures, and no confidential company content. Maintain accurate SEO metadata and functional routes. Treat drafts as drafts until tested.

**Separate brand decisions from implementation decisions:** This document establishes positioning, editorial principles, current tokens and evidence rules. Homepage layout, specific image assets, nav migration, and case-study drafts remain subject to review. Do not silently merge overlapping PRs.

## 9. Source of truth and change control

- **This file:** canonical cross-page brand foundations and guardrails once its PR is approved.
- **`app/globals.css`:** actual shipped color and font tokens; synchronize intentionally when changed.
- **PR #3:** proposed About story, values and leadership philosophy.
- **PR #8:** proposed research, UX audit, information architecture, wireframes and roadmap.
- **PR #9:** exploratory leadership-first homepage prototype.
- **`main` and deployed site:** actual shipped behavior, not necessarily the latest brand direction.

When a proposed change contradicts this guide, describe the tradeoff in the PR and update this guide in the same reviewed change if the brand decision changes. Avoid forking separate brand definitions across multiple documents.

## 10. Review before launch

- [ ] Hero clearly communicates cybersecurity commercial leadership.
- [ ] `joy.` and full name are legible and consistent.
- [ ] Work and Side Quests are clearly distinct.
- [ ] Two or more professional examples contain supported evidence.
- [ ] Project statuses and source links are accurate.
- [ ] Header/footer, page headings, mobile layout and links are reviewed.
- [ ] Color contrast, keyboard access, reduced motion and zoom are tested.
- [ ] No private Joy Index content or sensitive employer/customer data is published.
- [ ] All relevant checks pass; final design is approved before homepage replacement.
