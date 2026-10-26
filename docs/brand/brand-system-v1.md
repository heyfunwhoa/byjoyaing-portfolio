# joy. Brand System v1

**Status:** Proposed implementation standard for review.  
**Owner:** byjoyaing-portfolio.  
**Scope:** Public personal brand and reusable visual language for the portfolio and independently built products.  
**Does not do:** force every product to share identical UI, replace product-specific UX, publish the private Joy Index, or claim unheld roles.

This document extends the canonical [brand guidelines](brand-guidelines.md). When they conflict, the brand guidelines win until both are updated in one reviewed change.

## 1. Brand architecture

### Parent identity

- **Signature:** `joy.`
- **Name:** Kristen Aing
- **Professional positioning:** **Revenue & GTM Leader · Curious Builder**
- **Brand expression:** *Curious by nature. Builder by instinct.*
- **Guiding philosophy:** **People first. Problem-driven. Systems-minded.**
- **Learning practice:** **Learn → Build → Iterate**

### Three operating modes

These are modes of operating, not separate job titles or sub-brands.

1. **Strategist** — understand markets and buyers, identify patterns, ask better questions.
2. **Leader** — align people, decisions and execution; coach and develop others.
3. **Builder** — turn ideas into useful experiments, tools and repeatable systems.

### Content themes

**People · Strategy · Systems** remain the durable content lenses.

### Product-family model

Use a **branded-house** relationship:

- `joy. / Portfolio`
- `joy. / Builder Academy`
- `joy. / Security Market Map`
- `joy. / Account Signal Engine`
- `joy. / GTM Revenue OS`
- `joy. / Detector Coverage Atlas`
- `joy. / Partner Workspace`

The parent identity supplies recognizable DNA. Each product may retain a domain-specific visual accent when it improves comprehension.

## 2. Shared visual grammar

The primary non-person visual system is abstract connected geometry. Use these motifs consistently:

| Motif | Meaning | Preferred use |
| --- | --- | --- |
| **Node** | person, idea, account, source, evidence or decision | maps, diagrams, navigation accents |
| **Line** | relationship or flow | connections that are also explained in text |
| **Orbit** | exploration and perspective | editorial framing; never continuously spinning |
| **Path** | progress, sequence or choice | journeys, learning, execution |
| **Module** | system or reusable building block | Builder, workflows, architecture |
| **Spark** | discovery or insight | small emphasis only |

Rules:

- Geometry supports meaning; it never substitutes for labels or evidence.
- Favor thin rules, restrained nodes, asymmetric editorial composition and generous negative space.
- Avoid literal planets, star fields, sci-fi interfaces, decorative network clutter, stock SaaS diagrams and gratuitous 3D.
- Copper is an accent, not a canvas.
- A product may alter composition or a secondary accent, but shared motifs should remain recognizable.

## 3. Foundation palette

The portfolio tokens remain canonical brand colors:

| Role | Value |
| --- | --- |
| Warm ivory | `#F3EFE6` |
| Charcoal | `#1B211D` |
| Muted charcoal | `#4A504B` |
| Copper | `#8A4B2A` |
| Card ivory | `#FBF8F2` |
| Border | `#CFC3B3` |
| Sage surface | `#DDE3D7` |
| Mist surface | `#DCE6ED` |
| Clay surface | `#EAD5C7` |

Products do **not** need to copy the palette literally. Product-specific colors are allowed when:

1. they serve a domain or data meaning;
2. they meet contrast requirements;
3. they do not redefine the parent brand;
4. their local tokens remain documented in the product repo.

Do not add another parent-brand color without an explicit brand-guide change.

## 4. Typography

### Parent defaults

- **UI / brand sans:** Geist
- **Technical mono:** Geist Mono
- **Editorial serif:** one deliberate family may be introduced later after review; do not proliferate multiple unrelated serif families before that decision.

### Product rule

A product may use a distinct heading or display face when it materially supports the product character. Record the exception locally.

Until an editorial serif is approved, avoid treating Source Sans, National Park, Iowan/Palatino and other current experiments as shared brand defaults.

## 5. Illustration system

### Preferred hierarchy

1. Real screenshots, diagrams and sourced artifacts when showing actual work.
2. Abstract brand illustrations when explaining concepts.
3. The personal avatar only when a human/personal presence adds value.
4. Real photography when genuinely useful and properly sourced/owned.

### Abstract illustration rules

Use:
- nodes, paths, modules and sparse geometry;
- the foundation palette or a documented product accent;
- flat vector or restrained editorial depth;
- strong negative space;
- one clear idea per composition.

Avoid:
- generic professionals at laptops;
- literal business charts as decoration;
- giant magnifying glasses, mountains, globes or lightbulbs unless the object is actually meaningful;
- fabricated product UI;
- excessive text embedded in generated art.

### Operating-mode concepts

These are conceptual directions, not required literal assets:

- **Strategist:** scattered signals becoming a legible pattern.
- **Leader:** separate nodes becoming aligned around a shared direction.
- **Builder:** modular pieces becoming a coherent reusable system.

## 6. Personal avatar

The avatar remains an optional personal-brand asset, not the primary visual system.

Use it primarily for:
- About;
- selected homepage/editorial moments;
- personal learning or reflection where a human presence helps.

Do not require avatar variants across every product. Existing likeness and accessibility rules remain in [avatar-system.md](avatar-system.md).

## 7. Signature and lockups

Use `joy.` as the personal signature.

Preferred naming patterns:

- **Kristen Aing** — clarity-first contexts, metadata, accessibility and professional documents.
- **joy.** — signature / brand mark.
- **joy. / Product Name** — optional family attribution in product marketing or portfolio presentation.

Do not create independent product logos solely to make every repo feel branded. Product wordmarks may remain typographic until a clear need exists.

## 8. Iconography

Default direction:

- simple line icons;
- consistent visual weight within a surface;
- rounded or neutral joins rather than cartoon styling;
- no decorative icon if text is clearer;
- icons never replace accessible labels.

Lucide or an equivalent existing library may remain the implementation default. Brand distinction should come primarily from composition, tokens and geometry rather than a custom icon library today.

## 9. Motion identity

Motion should feel like **connect → reveal → assemble**, not bounce or spectacle.

Preferred:
- short line draws;
- node reveals;
- gentle directional nudges;
- modules assembling;
- progressive disclosure.

Avoid:
- infinite orbital motion;
- decorative parallax;
- constant pulsing;
- animation that suggests data changes when none occurred.

Always preserve `prefers-reduced-motion`.

## 10. Photography

Use real photography sparingly.

Preferred:
- authentic headshots;
- event/speaking images;
- work/process imagery that the user owns or may publish.

Avoid:
- generic stock office photography;
- AI-generated people presented as real;
- staged “executive at laptop” imagery.

When a concept does not require a person, prefer abstract illustration or a real artifact.

## 11. Data visualization identity

Charts and evidence states are part of the brand because the portfolio increasingly communicates research, GTM planning and technical evidence.

### Semantic states

Do not hard-code these to a single color across every product yet. Preserve the semantics first:

- **Verified / reviewed** — strongest readable state.
- **Vendor-reported / self-described** — visibly distinct from independently verified.
- **Unknown / insufficient evidence** — neutral, never implied negative.
- **Stale** — visible recency warning.
- **Corrected / superseded** — retain provenance and make change history visible.
- **Hypothesis / illustrative model** — clearly labeled and visually separate from observed facts.

Rules:
- Never use color alone to encode state.
- Preserve labels, provenance and original-source links.
- Reserve red/green for actual semantic need; do not use them merely because a chart library defaults to them.
- Each product owns its exact accessible chart palette.

## 12. Voice by context

The shared voice is confident, curious, warm, concise and evidence-first.

| Context | Emphasis |
| --- | --- |
| Homepage | warm, concise, confident |
| Professional case study | specific, commercial, evidence-heavy |
| Builder Academy | explanatory, curious, encouraging |
| Research / market maps | neutral, skeptical, precise |
| GTM tools | operational, direct, decision-oriented |
| LinkedIn / public posts | human, observant, lightly playful |
| Executive / interview material | concise, commercial, decisive |

Do not manufacture executive tone with jargon. Prefer clear decisions, tradeoffs and evidence.

## 13. Cross-product inheritance

### Mandatory parent DNA

Every public product should preserve:

- honest attribution and evidence boundaries;
- accessible interaction;
- restrained motion;
- source/provenance clarity where research is shown;
- editorial whitespace and hierarchy;
- an intentional relationship to the `joy.` family when presented in the portfolio.

### Recommended, not mandatory

- foundation palette;
- Geist;
- connected geometry;
- shared card radius;
- identical navigation;
- identical dark mode.

Product UX wins over cosmetic consistency.

## 14. Asset organization

Canonical brand assets belong in the portfolio repo.

Proposed structure:

```text
public/brand/
  signature/
  avatar/
  motifs/
  illustrations/
  social/
docs/brand/
  brand-guidelines.md
  brand-system-v1.md
  avatar-system.md
```

Only approved assets should enter `public/brand/`. Experiments belong in the design lab or a clearly labeled draft location.

## 15. AI-generation specification

AI image generation is an exploration tool, not the source of truth.

### Base direction

> Modern editorial vector composition for the joy. personal brand. Warm ivory background, charcoal structure, restrained copper accent, optional sage/mist/clay supporting surfaces. Abstract connected geometry using nodes, thin paths, modules and generous negative space. Sophisticated, human, curious and systems-minded. No people unless explicitly requested. No text inside the image. No generic SaaS dashboard, stock business icon collage, 3D corporate render, sci-fi aesthetic, neon, giant lightbulb, globe, mountain, or decorative bar chart. Create one clear visual metaphor only.

### Variation prompts

- **Strategist:** signals converge into a meaningful pattern.
- **Leader:** independent elements align around a shared direction.
- **Builder:** modular elements assemble into a coherent system.

### Review gate

Before publishing a generated asset, verify:
- it belongs to the same visual grammar;
- it is not misleading;
- it does not contain malformed or hidden text;
- contrast/cropping works in the actual UI;
- a simpler SVG/CSS composition would not be better.

## 16. Adoption sequence

1. **Foundation:** approve this document and cross-repo inheritance rules.
2. **Asset pass:** create only the minimum signature/motif/social assets needed.
3. **Portfolio:** use abstract visual grammar where imagery adds meaning; do not redesign pages solely to insert artwork.
4. **Products:** audit one repo at a time. Preserve useful local identity and document intentional deviations.
5. **Data viz:** standardize evidence-state semantics before shared colors.
6. **Figma / reusable assets:** create after the rules stabilize, not before.
7. **Measure:** usability, comprehension and accessibility determine whether visual changes stay.

## 17. Adoption checklist

Before a public brand change:

- [ ] Professional positioning remains accurate.
- [ ] Strategist / Leader / Builder are modes, not inflated titles.
- [ ] People / Strategy / Systems remain content themes.
- [ ] Visuals use the shared grammar or document why not.
- [ ] Product-specific identity serves comprehension rather than novelty.
- [ ] No new parent color or font is introduced silently.
- [ ] Evidence states remain explicit.
- [ ] Keyboard, responsive, contrast and reduced-motion behavior are checked.
- [ ] Generated imagery contains no fabricated claims or misleading UI.
- [ ] Brand-guide and implementation tokens are updated together when fundamentals change.
