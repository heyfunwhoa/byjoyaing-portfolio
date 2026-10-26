# Creative AI toolkit — brand ecosystem exploration

**Status:** Proposed research inventory, not approved tooling or a purchase plan  
**Owner:** joy. portfolio brand / Design Lab  
**Reviewed:** 2026-10-13 (recheck features, pricing, licensing and provider terms before adoption)

## Purpose
Evaluate creative AI tools for visual identity, UX prototypes, educational content and future projects while preserving the canonical [brand guidelines](brand-guidelines.md) and [avatar direction](avatar-system.md). This inventory is complementary to the separate AI model-evaluation standard in Technical Docs. It does not change brand copy, style tokens, deployment, subscriptions or production architecture.

## Explore first
| Capability | Candidate tools/models | Intended experiment | Guardrail |
| --- | --- | --- | --- |
| Vector brand assets | Recraft | Create consistent editable vector icon and avatar variations | Follow avatar-system.md: approved likeness, editable vector master when available, safe raster fallbacks, canonical palette and human review |
| UI/UX prototyping | Figma Make; Google Stitch; Vercel v0 | Compare dashboard and Design Lab screen concepts | Treat prototypes as proposals; require reusable, accessible source code |
| Source-grounded learning | Google's NotebookLM / Notebook-style tools | Turn approved public source packs into an Academy lesson outline | Verify original sources; never paste private Joy Index or confidential data |

## Explore later, only if there is a concrete deliverable
| Capability | Candidates | Brand ecosystem use |
| --- | --- | --- |
| Editorial concepts | Midjourney | Moodboards and exploratory hero visuals, not final brand source files |
| Typography-led campaigns | Ideogram | Draft promotional/announcement graphics; check typography manually |
| Photorealism or image APIs | FLUX / Black Forest Labs | Synthetic project imagery and reproducible model tests |
| Creative finishing | Adobe Firefly | Edit and prepare approved visual assets |
| Cinematic video | Runway, Google Veo, Kling, Luma | Short case-study trailers or motion experiments |
| Narration | ElevenLabs | Optional narrated Academy walkthroughs and demos |
| Avatar presenters | HeyGen | Optional enablement presentations; consent and authenticity checks |
| Music / sound | Suno, Udio, AIVA, Stable Audio | Optional media soundtracks; verify commercial usage rights |
| Spatial assets | Meshy, Tripo, Spline | Optional 3D experimentation and accessible performance checks |

## Future creative model access (not implementation)
- **fal.ai:** Candidate API marketplace/inference layer for creative image, video, audio and 3D experimentation.
- **Vercel AI Gateway:** Candidate for general language-model access in Next.js applications.
- **OpenRouter:** Candidate for broader LLM comparison.
- **LiteLLM:** Candidate if self-operated proxy and policy controls become justified.

These products are not interchangeable; **a gateway does not by itself establish model quality or safe provider approval**. No automated routing, provider gateway, fallback policy, paid subscriptions or API integration is authorized by this inventory.

## Candidate status and adoption gate
All listed products are **unevaluated candidates** unless separately documented with evidence. An experiment result is not subscription approval, a deployment decision, or permission to send restricted data to a provider. Any proposed adoption requires an explicit use case, source/rights/privacy review, documented tradeoffs, cost approval, accessibility validation and a separate implementation PR where applicable.

## Manual pilot scorecard
Compare only against a defined task and licensed, approved materials. Record: deliverable, tool and exact model/version if exposed, prompt/input revision, editability/vector export, consistency with the approved brand, accessibility, output fidelity, provenance, human rework, latency, actual cost, commercial rights, privacy/data retention, and decision (try / adopt for use case / reject / defer). Record unknown instead of inventing results.

## Suggested first three experiments
1. **Recraft:** Produce three synthetic non-person editorial vector motifs using the canonical ivory, charcoal and copper tokens; test SVG editability and small-screen legibility. Do not introduce green/sage without a separate brand and contrast review.
2. **Figma Make or Stitch:** Design a single responsive portfolio project-card concept; validate keyboard behavior and brand tokens in implementation.
3. **NotebookLM-style research notebook:** Use approved public references to outline one Builder Academy lesson; manually verify cited claims.

## Ownership and boundaries
- **Brand guidance and aesthetic approvals:** `docs/brand/brand-guidelines.md`; this file is an exploratory tool inventory, not a replacement.
- **Design Lab and implementation:** existing portfolio UI, components and review workflow.
- **Reusable AI evaluation methodology:** [Technical Docs model evaluation standard](https://github.com/heyfunwhoa/technical-docs-platform/blob/main/ai/model-evaluation-standard.md), subject to repository access.
- **Planning and implementation tasks:** existing project planning and Linear; no duplicate roadmap here.
- Use synthetic/approved public data only; do not publish employer or customer content, private personal notes, secrets, or generated outputs without licensing and disclosure review.

## Official starting points (features and terms may change)
[Recraft](https://www.recraft.ai/) · [Figma](https://www.figma.com/) · [Stitch](https://stitch.withgoogle.com/) · [v0](https://v0.app/) · [NotebookLM](https://notebooklm.google.com/) · [Midjourney](https://www.midjourney.com/) · [Ideogram](https://ideogram.ai/) · [FLUX](https://bfl.ai/) · [Firefly](https://firefly.adobe.com/) · [Runway](https://runwayml.com/) · [Google Flow](https://flow.google/) · [Kling](https://klingai.com/) · [Luma](https://lumalabs.ai/) · [ElevenLabs](https://elevenlabs.io/) · [HeyGen](https://heygen.com/) · [Suno](https://suno.com/) · [Udio](https://www.udio.com/) · [AIVA](https://www.aiva.ai/) · [Stable Audio](https://www.stableaudio.com/) · [Meshy](https://www.meshy.ai/) · [Tripo](https://www.tripo3d.ai/) · [Spline](https://spline.design/) · [fal.ai](https://fal.ai/) · [Vercel AI Gateway](https://vercel.com/ai-gateway) · [OpenRouter](https://openrouter.ai/) · [LiteLLM](https://docs.litellm.ai/)
