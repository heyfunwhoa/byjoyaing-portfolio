# AI Creative Model & Tool Registry

> Status: evaluation backlog; no purchase, API integration, deployment, or production approval implied. Reviewed 2026-11-06. Owner: Portfolio Design Lab. Consumer: GTM Revenue OS.
>
> This is a **private/local design research artifact**, not an instruction to expose the /design-lab production route. Do not include customer data, confidential assets or credentials.

## Separation of responsibilities

- **Design Lab** owns model/tool discovery, capability comparisons, sample assets, design quality, cost/license/risk research, and reusable visual production patterns.
- **GTM Revenue OS** owns business briefs, stage-specific use cases, content production, review, distribution and performance measurement. See [GTM consumer workflow](https://github.com/heyfunwhoa/gtm-revenue-os/blob/main/docs/product/ai-content-production-workflows.md) after its related PR merges.
- Use immutable candidate IDs across both repos; link to the source record, do not create competing registries. A candidate is not an approved vendor.

## Registry fields

Each candidate should record: `id`, `provider`, `product`, `model_or_version` (if any), `type` (foundation-model / application / framework), `modalities`, `outputs`, `best_use_cases`, `limitations`, `security_and_data_terms`, `training_and_retention_terms`, `commercial_usage_rights`, `access_method`, `pricing_unit_and_as_of`, `source_url`, `verified_on`, `evaluation_status` (watchlist / researching / evaluating / approved / rejected / retired), `sample_asset_ids`, `owner`, and `review_due`. Unknown values must be marked unverified, not assumed.

## Initial candidate watchlist (not tested or approved)

| ID | Candidate | Type | Area | Primary fit |
| --- | --- | --- | --- | --- |
| LLM-001 | OpenAI GPT models | foundation-model family | copy / scripts | positioning, briefs, asset variations |
| LLM-002 | Anthropic Claude | foundation-model family | copy / scripts | technical synthesis, editing and review |
| LLM-003 | Google Gemini | foundation-model family | copy / scripts | multimodal planning and review |
| IMG-001 | OpenAI GPT Image | model family | image | illustrations, concepts, image edits |
| IMG-002 | Google Nano Banana | model family | image | reference-aware image generation/editing |
| IMG-003 | Ideogram | model/application | image | typography-sensitive campaign art |
| IMG-004 | Recraft | model/application | image / vector | vector and brand artwork |
| IMG-005 | FLUX | model family | image | visual concepts and edits |
| VID-001 | Runway Gen-4.5 | video model | video | cinematic sequences |
| VID-002 | Google Veo 3.1 | video model | video | video scenes and audio |
| VID-003 | Kling | video model family | video | reference-driven video |
| VID-004 | Seedance | video model family | video | multimodal reference-driven video |
| VID-005 | Wan | video model family | video | video model comparison |
| DEM-001 | Clueso | application | product demos | real product video / tutorials |
| DEM-002 | Arcade | application | product demos | interactive guided walkthroughs |
| DEM-003 | Screen Studio | application | capture | recorded product demos |
| EDT-001 | Descript | application | editing | repurposing interviews, webinars, demos |
| EDT-002 | Adobe Premiere Pro | application | editing | professional review and finishing |
| EDT-003 | CapCut | application | editing | lightweight social variants |
| AVT-001 | HeyGen | application | avatar / localization | personalized or localized video |
| AVT-002 | Synthesia | application | avatar / education | structured training and explainers |
| AUD-001 | ElevenLabs | model/application | audio | approved narration/localization |
| DEV-001 | Remotion | open-source framework | coded video | templated charts, animations and explainers |
| DEV-002 | FFmpeg | open-source framework/tool | processing | transforms and export automation |
| DEV-003 | Lottie / SVG | formats / ecosystem | animation | portable lightweight motion |
| DSG-001 | Canva | application | design | social and campaign templates |
| DSG-002 | Figma | application | design | storyboard and component system |
| DSG-003 | Adobe Firefly | application/model ecosystem | creative | image/video experimentation and editing |

Use provider documentation to validate currently supported models: https://dev.runway.com/models/catalog and https://helpx.adobe.com/creative-cloud/apps/generative-ai/non-adobe-models-in-adobe-products.html. Third-party catalogs are discovery sources, not evidence of independent quality, price or acceptable licensing.

## Standard evaluation process

1. Capture a **specific asset brief**, target audience, placement, aspect ratio, approved source facts and intended CTA.
2. Shortlist 2–3 candidates **within the same task category**, not a random LLM versus editor comparison.
3. Use identical source facts and comparable input materials; record model version, prompt/template revision, generation attempts, time, cost and reviewer.
4. Blind-review where practical on: factual fidelity (mandatory), technical/UI accuracy (mandatory), visual quality, brand adherence, accessibility, editability, reproducibility, turnaround and cost.
5. Check commercial rights, copyright and likeness consent, training and data retention terms, data residency where relevant, vendor security, attribution/watermark requirements and accessibility.
6. Record a decision: research / pilot / approved-for-a-defined-use / rejected. Approval is scoped to asset class and data classification, never blanket.
7. Re-evaluate on material version, pricing, terms or quality changes; otherwise quarterly.

**Hard gates:** never fabricate product UI, customer statements, logos or statistics as factual. Real demonstrations must use controlled demo tenants/synthetic data. No secrets or sensitive customer telemetry. Marketing claims require sources and human sign-off. Generated voice/likeness must be consented and disclosed where required.

## Sample evaluation record

```yaml
id: DEM-001
candidate: Clueso
type: application
use_case: 90-second technical product walkthrough
status: researching
verified_on: null
review_due: null
inputs: synthetic demo tenant and approved script
required_outputs: 16:9 video, caption file, source/editable project
metrics: [technical_accuracy, accessibility, completion_rate, production_minutes, cost_per_approved_asset]
approvals: [product_owner, technical_reviewer, brand_owner]
result: not_tested
```

## First pilots

- **Technical SaaS demo:** Clueso versus screen capture + Descript. Verify UI accuracy and editing/update burden.
- **Brand campaign still:** GPT Image versus Recraft/Ideogram. Verify type fidelity, brand control, licensing and editability.
- **Concept motion:** Runway versus Veo on an abstract infrastructure story. Do not substitute generated UI for a real demo.
- **Code-driven explainer:** Remotion motion templates with accessibility/reduced-motion and source-controlled output.

Do not add live app integrations or keys until an individual pilot has defined ownership, security review, and acceptance tests.

## Editorial-calendar integration contract

The catalog is **not** an editorial calendar, publishing platform, or source of GTM campaign priorities. A GTM content brief supplies required asset type, audience, channel, product-proof constraints, source-data classification, approval boundary and budget. Design Lab returns eligible candidate IDs, scoped evaluated uses, evaluation evidence and production recipe hints. GTM OS retains the calendar slot, campaign, asset, reviewer, distribution decision and outcome data. No direct automated publication or credential/data transfer is implied.

Consumption reference: [GTM OS Editorial Calendar → Marketing and Sales Activation](https://github.com/heyfunwhoa/gtm-revenue-os/blob/main/docs/product/editorial-calendar-gtm-activation.md) after related PR merges. The first Design Lab UI iteration should support an asset-type filter and an export/copy of candidate IDs for use in a GTM content brief, not duplicate the calendar.

## Brand identity → asset governance boundary

The canonical personal brand reference is [joy. brand guidelines](../brand/brand-guidelines.md), with its own mission, values, voice, identity system and proof rules. This is **not** a default brand profile for a fictional or future employer. A B2B GTM brief should name an authorized `company_context_id`, `brand_profile_id`, positioning/message version, output channel, source claims and approval owners before creative production. Personal, sample and company brand contexts must remain visibly distinct, including colors, logo, claims, imagery and customer evidence. Creative candidates are selected *after* the brand and business outcome are established.

The broader cross-functional company-agnostic [Identity-to-Outcome Revenue & Growth OS](https://github.com/heyfunwhoa/gtm-revenue-os/blob/main/docs/product/b2b-revenue-growth-os-architecture.md) is the GTM consumer architecture after its companion PR merges; Design Lab supplies scoped creative patterns rather than overriding mission, company identity or revenue strategy.
