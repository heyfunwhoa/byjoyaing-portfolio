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


## Homepage design workshop — decision record (2026-10-09)

### Task and hypothesis
**Task:** A founder evaluating a Head of Sales candidate can identify Kristen's commercial leadership focus, find a relevant Work case study, and locate a way to reach out.
**Hypothesis, not observed user research:** The leadership-first layout will outperform an equal-weight split hero for this visitor's first task.

### Primary page order
1. Header — `joy.` signature plus readable `Kristen Aing`; About / Work / Side Quests / Contact.
2. Hero — eyebrow `Cybersecurity & GTM leadership`; h1 `Commercial Leader. Curious Builder.`; 1–2 sentence value proposition; primary CTA `Explore Work`, secondary `Explore Side Quests`.
3. Proof strip — 3 evidence-backed outcomes across revenue, talent development, and GTM systems. All figures require verified source or removal.
4. Selected Work — 2 professional cases, each showing problem / intervention / impact.
5. Side Quests preview — 2 independent projects, each with maturity label and clear separation from employer-owned work.
6. About teaser — origin story and values in 2 sentences; `Read my story` link.
7. Contact — clear CTA and working contact path.

### Low-fidelity mobile wireframe
```text
+--------------------------------+
| joy.  Kristen Aing       [Menu] |
+--------------------------------+
| CYBERSECURITY / GTM LEADERSHIP  |
| Commercial Leader.             |
| Curious Builder.               |
| [One short value proposition]  |
| [ Explore Work              ]  |
| [ Side Quests               ]  |
+--------------------------------+
| PROOF                          |
| Result 1 (verified)            |
| Result 2 (verified)            |
| Result 3 (verified)            |
+--------------------------------+
| SELECTED WORK                  |
| Case 1: challenge -> result    |
| Case 2: challenge -> result    |
+--------------------------------+
| SIDE QUESTS                    |
| Prototype with status + source |
| Experimental build with status |
+--------------------------------+
| ABOUT / CONTACT                |
+--------------------------------+
```

### Desktop wireframe
```text
+-----------------------------------------------------------------+
| joy. Kristen Aing     About   Work   Side Quests   Contact       |
+-----------------------------------------------------------------+
| CYBERSECURITY + GTM LEADERSHIP                                   |
| Commercial Leader.              [Optional understated           |
| Curious Builder.                 system/connection graphic]      |
| Value proposition                [not a competing focal point]   |
| [ Explore Work ] [ Side Quests ]                                 |
+-----------------------------------------------------------------+
| Revenue impact   | People development   | GTM systems           |
+-----------------------------------------------------------------+
| SELECTED WORK                                                    |
| [Leadership case]                      [GTM strategy case]       |
+-----------------------------------------------------------------+
| SIDE QUESTS                                                     |
| [Independent build]                    [Independent build]       |
+-----------------------------------------------------------------+
| Short story + values                              [Contact CTA]  |
+-----------------------------------------------------------------+
```

### Two design variants
- **A / leadership-first:** typographic primary hero, secondary illustration, Work before Side Quests. Advantage: unambiguous professional focus; risk: can feel conventional without strong visual voice.
- **B / dual-narrative:** equal-size cards for leader and builder. Advantage: quick personality and contrast; risk: dilutes leadership credibility and makes competing entry points on mobile.
**Working choice:** A. Validate with real visitor tasks before labeling it a proven preference.

### Visual-design parameters to test (not final tokens)
- Editorial serif display + highly readable sans body; ensure font fallback and no layout shift.
- Warm ivory background, charcoal foreground, restrained copper accent; check actual contrast.
- Fluid content max-width, consistent 4/8px-based spacing scale, clear section rhythm.
- CTA primary has high contrast and clear focus-visible style; secondary stays visibly actionable.
- Reduced motion; no decorative animation required to understand content.

### Usability validation script
Give each participant the homepage without explaining its structure. Observe, don't guide.
1. 'In your own words, what kind of work does this person do?'
2. 'Find an example of how this person helped a team or business succeed.'
3. 'Find an independent technical project, and tell me whether it's live or a prototype.'
4. 'How would you contact this person?'
For each task capture: success (yes/no), confusion points, spontaneous comments, and device width. Ask 'What, if anything, felt unclear?' at end.
Suggested initial sample: 3–5 people across hiring/recruiting and technical contexts; exploratory, not statistical validation.

### Acceptance checklist before code
- [ ] Review copy for accuracy, claims, and employer confidentiality.
- [ ] Wireframe tested at 375px and 1280px plus intermediate widths.
- [ ] Semantic heading and landmark plan exists.
- [ ] Focus states, contrast, and touch targets have explicit criteria.
- [ ] User test findings recorded; separate observation from preference.
- [ ] Existing PR #2 and PR #3 reviewed for reuse/conflicts.
- [ ] First build slice scoped to header + hero only.
