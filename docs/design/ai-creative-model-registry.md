# AI Creative Model & Tool Registry

> Status: evaluation backlog; no purchase, API integration, deployment, or production approval implied. Registry updated 2026-11-09; source checks are scoped and dated below. Owner: Portfolio Design Lab. Consumer: GTM Revenue OS.
>
> This is a public-repository research document for a **local-only UI**, not an instruction to expose the /design-lab production route. Do not include customer data, confidential assets or credentials.

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
| VID-006 | Higgsfield | application / model workspace | video / marketing | generated scenes and visual ad concepts |
| DEM-001 | Clueso | application | product demos | real product video / tutorials |
| DEM-002 | Arcade | application | product demos | interactive guided walkthroughs |
| DEM-003 | Screen Studio | application | capture | recorded product demos |
| DEM-004 | Trupeer | application | product demos / training | screen recordings into narrated tutorials |
| DEM-005 | Supademo | application | interactive demos | guided product walkthroughs and reusable step-by-step demos |
| DEM-006 | Storylane | application | interactive demos | captured product tours and buyer-facing demo collections |
| CAP-001 | Riverside | application | recording / editing | interviews, webinars and repurposed clips |
| CAP-002 | Loom | application | recording / sharing | short screen-and-camera messages and follow-ups |
| CAP-003 | Cap | application; license review pending | recording / sharing | local capture or hosted share-link workflows |
| EDT-001 | Descript | application | editing | repurposing interviews, webinars, demos |
| EDT-002 | Adobe Premiere Pro | application | editing | professional review and finishing |
| EDT-003 | CapCut | application | editing | lightweight social variants |
| EDT-004 | DaVinci Resolve | application | editing / finishing | timeline editing, color and audio; free and Studio editions |
| EDT-005 | Shotcut | open-source application | editing | local timeline editing and exports |
| EDT-006 | OpusClip | application | repurposing | long recordings into reviewed short clips |
| HST-001 | Wistia | application | hosting / analytics | website video delivery and engagement measurement |
| HST-002 | Vidyard | application | sales video / hosting | personal video messages and video engagement |
| REV-001 | Frame.io | application | creative review | precise video/asset comments and review workflows |
| AVT-001 | HeyGen | application | avatar / localization | personalized or localized video |
| AVT-002 | Synthesia | application | avatar / education | structured training and explainers |
| AUD-001 | ElevenLabs / ElevenCreative | model/application | audio / video | narration, localization and creative video options; not approved |
| DEV-001 | Remotion | source-available framework | coded video | templated charts, animations and explainers |
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


## Visual production building blocks

These extend the same candidate IDs; the component catalog is a discovery index, not a second model registry. Upstream licenses checked 2026-11-06; exact versions, binaries, dependencies and asset rights still need pilot review.

| ID | Candidate | Classification and source | Proposed use |
| --- | --- | --- | --- |
| DEV-004 | Motion Canvas | OSS, MIT; https://github.com/motion-canvas/motion-canvas and https://motioncanvas.io/docs/ | Editable explanatory vector animation |
| DEV-005 | OBS Studio | OSS, GPL-2.0-or-later; https://github.com/obsproject/obs-studio | Authentic screen capture with fictional data |
| DSG-004 | Penpot | OSS, MPL-2.0; https://github.com/penpot/penpot | Storyboards, layout systems and visual asset templates |

**License correction:** DEV-001 Remotion is source-available with free/company license conditions, not a blanket permissive OSS recommendation. Check https://www.remotion.dev/docs/license/pricing and the exact source license for the intended organization and usage. DEV-002 FFmpeg depends on build configuration: LGPL by default with optional GPL parts; see https://ffmpeg.org/legal.html. Software license checks do not establish ownership of imported fonts, music, footage or generated outputs.

**Model taxonomy:** LLMs support scripts and planning; video generation models produce scenes; capture/editing/compositing tools preserve and package authentic product proof. Commercial services and open-weight model families are not automatically open-source software. Existing model/version names are watchlist snapshots, not assertions of the newest available release. Select and record the exact provider/model at pilot time; current video API discovery: https://dev.runway.com/models/catalog.

## Reusable asset recipe contract

Design Lab UI in PR #258 presents five recipe categories: product demo/tutorial, campaign still, short concept video, animated technical explainer, and interactive asset. The UI references these candidate IDs; it does not connect APIs or generate assets.

Every experiment records:
- Asset ID, audience, message, brand/context version, intended channel/action and approved claim sources.
- Baseline and alternative, identical inputs, prompt/template revision, candidate IDs and exact versions.
- Source/editable project, export, caption/transcript or alt-text/static equivalent, and input rights.
- Actual attempts, production minutes, revision minutes, cost per approved asset, reviewer and observed comprehension.
- Decision (adopt/revise/park), limitations, destination brief/owner and revisit trigger.

First bounded example: a fictional security company has repeated customer setup work. Compare a three-panel still with a 30-second animated explanation using the same script. Ask the reviewer to identify the problem, audience and next action. Record actual answers without assuming conversion or pipeline impact. Start with a designed/static baseline; generate only if the comparison needs it.

After selection, GTM OS owns campaign/calendar placement, distribution and commercial measurement. Lab owns the reusable recipe and evaluation evidence. No purchase, generated asset, commercial quality benchmark or integration is claimed.


## Additional asset families

| ID | Tool | Asset family | Official source |
| --- | --- | --- | --- |
| DSG-005 | Excalidraw | Diagrams / visual frameworks | https://github.com/excalidraw/excalidraw |
| DSG-006 | Inkscape | Vector illustrations / SVG masters | https://github.com/inkscape/inkscape |
| DOC-001 | Marp | Markdown presentation templates | https://github.com/marp-team/marp |
| DOC-002 | Scribus | Reports / print collateral | https://github.com/scribusproject/scribus |
| DAT-001 | Vega-Lite | Data stories / exportable charts | https://github.com/vega/vega-lite |
| LRN-001 | H5P | Portable interactive learning | https://h5p.org/ |
| AUD-002 | Audacity | Audio editing / narration | https://github.com/audacity/audacity |

All are evaluation candidates, not installed integrations. Verify exact version/license and any plugins or hosted-service terms during adoption. The existing Academy controls and existing chart components remain the baseline; candidate presence does not justify replacing them.

Design Lab #258 contains a linked asset-starter/adoption map at docs/design/templates/README.md and an original editable fictional security-workflow SVG. This is a source starter, not a copied third-party template, deployment or generated marketing asset. GTM destinations still require their own approved brief and delivery work.

## Marketing and product video options

**Decision state:** research options only, recorded 2026-11-09. The original five requested options resolve to DEM-001, EDT-001, AUD-001, DEV-001 and new VID-006. Reuse existing IDs for alternatives; five new candidates were added: VID-006, DEM-004, CAP-001, EDT-004 and EDT-005. There is no second creative registry.

The following fits and priorities are **recommendations**, not measured quality rankings. Capability evidence is scoped in the source table below. Existing records for Arcade, Premiere Pro, CapCut, Synthesia and FFmpeg remain available; they have not been freshly evaluated by this update.

| Task | Candidate IDs and options | Why compare them | Current recommendation and trigger |
| --- | --- | --- | --- |
| Product walkthrough or release video | DEM-001 Clueso; DEM-004 Trupeer | Both describe workflows that turn real screen recordings into narrated, edited videos | Assess Clueso first; compare Trupeer if editing, updates or export limits become a specific obstacle |
| Polished screen capture on Mac | DEM-003 Screen Studio; DEV-005 OBS Studio | Screen Studio emphasizes zoom/framing; OBS offers configurable capture and audio mixing | Compare a paid polish workflow with a free capture baseline; check the actual device/OS before selecting |
| Marketing explainers and social clips | EDT-001 Descript; DSG-001 Canva | Descript fits transcript-led edits; Canva fits template-led visual assembly | Assess one primary editor based on whether the source is spoken footage or designed assets |
| Interviews, customer stories and webinars | CAP-001 Riverside; EDT-001 Descript | Remote recording plus editing/repurposing workflows | Revisit Riverside only if existing recording is limiting guest quality or production |
| Narration and localization | AUD-001 ElevenLabs / ElevenCreative; EDT-001 Descript; DEM-001 Clueso | Dedicated voice workflow versus narration already included with an editor | Test the existing editor's narration first; add ElevenLabs when delivery or localization has a demonstrated gap |
| Cinematic or abstract marketing scenes | VID-006 Higgsfield; VID-001 Runway family | Creative video workspaces for generated supporting footage | Watchlist until a brief needs generated scenes; evaluate the exact model and cost per accepted shot |
| Repeatable animations and technical explainers | DEV-001 Remotion; DEV-004 Motion Canvas | React video templates versus TypeScript animation authoring | Reference until a repeated asset format justifies setup; reuse Design Lab visual patterns |
| Timeline editing and finishing | EDT-004 DaVinci Resolve; EDT-005 Shotcut | A free-edition professional editor versus a free open-source editor | Use as a low-subscription-cost baseline; compare learning/revision effort and hardware needs |
| Presenter or translated video | AVT-001 HeyGen; existing AVT-002 Synthesia | Presenter/localization workflow candidates | Defer until a real presenter/localization requirement exists; no need to add an avatar to ordinary demos |

### Three starting workflows

1. **Quick product demo:** synthetic screen recording → Clueso → reviewed captions/transcript and a short teaser. Compare Trupeer only on a defined gap.
2. **Broad marketing production:** existing screen/camera recording → Descript → reviewed social clips. Add ElevenLabs only if its voice workflow improves the result enough to justify another tool.
3. **Low-cost local baseline:** OBS capture + own narration → Shotcut or the free edition of DaVinci Resolve → manual review/export. Local compute, learning and editing time still count as cost.

For a repeatable branded explainer, compare Remotion with Motion Canvas after the baseline works. Canva can provide simple visual assembly. Higgsfield/Runway supply optional concept footage. Use real captures for product behavior and verify any reconstructed UI against the actual product.

**Proposed sample, not an active pilot:** one fictional 60–90 second software walkthrough, plus a 15–30 second teaser. Record hands-on minutes, correction/update minutes, actual credits/spend, UI/text accuracy, caption accuracy, editability and cost per approved asset. Start with one workflow; no automatic subscriptions, generation jobs, publishing or n8n integration.

### Cost and license observations

These are dated observations, not a budget or complete legal review. Check the selected plan, billing commitment, taxes, export/watermark limits, model credits and commercial terms before use.

| Candidate | Observation from inspected official source on 2026-11-09 | Cost or rights gap |
| --- | --- | --- |
| DEM-001 Clueso | Free evaluation lists 10 video-export minutes/month; Solo lists $40/month **billed yearly**, with 3 export hours/year. [Pricing](https://www.clueso.io/pricing) | Annual commitment and annual export quota matter; free export watermark/rights and selected features need confirmation |
| EDT-001 Descript | Pricing comparison lists a Free tier with 60 media minutes/month. [Pricing](https://www.descript.com/pricing) | Media processing allowance is not an unlimited video-generation allowance; confirm resolution, watermark and AI limits |
| AUD-001 ElevenLabs | Regular Starter $6/month, Creator $22/month; Starter lists a commercial license and Image & Video. Introductory offers excluded. [Pricing](https://elevenlabs.io/pricing) | Check model-specific credits, regeneration cost, exact output rights and intended use |
| DEV-001 Remotion | Free eligibility includes individuals/companies up to three people; company Creator option $25/seat/month; Automator option $0.01/render with $100/month minimum. [License/pricing](https://www.remotion.dev/docs/license/pricing) | Source-available, not blanket OSS; verify intended organization, manual versus automated use, exact terms and compute cost |
| EDT-004 DaVinci Resolve | Official product page offers a free edition and a paid Studio edition. [Editions](https://www.blackmagicdesign.com/products/davinciresolve) | Free software price does not imply open source; confirm codecs/features and hardware for the chosen edition |
| EDT-005 Shotcut | Official site describes a free open-source editor; upstream COPYING contains GNU GPL v3. [Product](https://www.shotcut.org/) · [COPYING](https://github.com/mltframework/shotcut/blob/master/COPYING) | Exact release/dependencies and redistribution rights require review; software licensing does not license imported media |
| Other candidates | Exact current prices and plan entitlements **not assessed** in this update | Reuse existing licensed tools where adequate; review seats, export limits, credits, storage, recording hours and operational effort before purchase |

### Scoped source evidence

**Shared record fields for the rows below:** source_type=primary; claim_kind=vendor_claim (published capability, not independent performance); verified_at=2026-11-09; verified_by=Codex, inspected official page sections through web retrieval; confidence=moderate; verification_status=partially_verified; adoption_status=reference; evaluation_status=researching; implementation_result=not_tested; owner=Portfolio Design Lab; evidence_artifact=this versioned registry section. The source owner is the named vendor/project. Recommendations above are author judgments derived from these descriptions, not empirically tested superiority claims.

**Shared limitations:** no account-level entitlement, working integration, production quality, security approval, uptime, model-version availability or ROI was tested. Product homepages support only what the vendor describes. Current model variants, exact release licenses, training/retention/security terms and output/commercial rights remain unverified except the narrow pricing/license observations above. license_rights=unknown_review_required for vendor material and generated/imported assets; rights_url=null unless a rights source is explicitly linked above or in the existing record. Only short paraphrases and source links are stored.

**Review trigger for every row:** before purchase, pilot, external factual publication or use with real data, and when pricing, features, model versions or terms change. review_due=on_trigger; no recurring schedule created.

| Claim ID / candidate | Official source and inspected section | Precisely supported description | Specific limitation |
| --- | --- | --- | --- |
| VIDEO-20261109-01 / DEM-001 | [Clueso](https://www.clueso.io/), “Start however you like” | Vendor describes recording or uploading a product walkthrough and producing script, voiceover and edited video | Automation quality and account access not tested |
| VIDEO-20261109-02 / EDT-001 | [Descript](https://www.descript.com/pricing), Features and plan comparison | Lists screen recording, transcript-based editing, captions, audio cleanup and clip creation | Individual features can depend on tier/credits |
| VIDEO-20261109-03 / AUD-001 | [ElevenCreative](https://elevenlabs.io/creative), Create/edit/localize | Describes voiceovers, video generation, avatars, music and localization in the platform | Do not reduce it to audio only; exact model and paid-plan access still need checking |
| VIDEO-20261109-04 / DEV-001 | [Remotion](https://www.remotion.dev/), programmatic video and parameterization | Describes React-authored videos and reusable parameterized templates | Template engineering, rendering and organization eligibility not tested |
| VIDEO-20261109-05 / VID-006 | [Higgsfield help](https://higgsfield.ai/creator-hub/help-center/tools/which-higgsfield-tool-should-i-use), tool selection | Routes cinematic camera-control work to Cinema Studio and product-ad work to Marketing Studio | Workspace capability is not proof of exact generated product behavior |
| VIDEO-20261109-06 / DEM-003 | [Screen Studio](https://screen.studio/), Focus and zoom | Describes Mac screen capture, automatic/manual zoom and screen/camera layouts | Device compatibility, current price and account license not verified |
| VIDEO-20261109-07 / DEM-004 | [Trupeer Video](https://www.trupeer.ai/video), screen recording and editing | Describes recorded-screen input, script editing, AI voiceover and video/doc exports | Output quality, current plan limits and commercial terms not tested |
| VIDEO-20261109-08 / DEV-005 | [OBS Studio](https://obsproject.com/), Features | Describes screen/window/webcam sources, scene composition and audio mixing | Capture setup requires validation on the actual device |
| VIDEO-20261109-09 / EDT-004 | [DaVinci Resolve](https://www.blackmagicdesign.com/products/davinciresolve), Two Great Versions | Describes editing, color, motion/VFX and audio with separate free/Studio editions | No assertion that Studio-only features are included free |
| VIDEO-20261109-10 / EDT-005 | [Shotcut](https://www.shotcut.org/), format support and timeline/editor sections | Describes a free cross-platform editor with native editing and multi-format timelines | Caption workflow, exact binaries and performance not tested |
| VIDEO-20261109-11 / DEV-004 | [Motion Canvas](https://motioncanvas.io/), Best of Both Worlds | Describes TypeScript-authored animation and a browser editor for syncing audio | No assumption of direct drop-in reuse of Remotion/React components |
| VIDEO-20261109-12 / AVT-001 | [HeyGen](https://www.heygen.com/), avatar and translation sections | Describes avatar-led videos and translation of existing footage | Consent, authenticity, exact language quality and pricing need separate review |
| VIDEO-20261109-13 / VID-001 | [Runway Creative](https://runway.com/), creative-platform description | Describes a cloud workspace for generating/editing video, images and audio | This source check does not revalidate the older Gen-4.5 watchlist label or rank current models |
| VIDEO-20261109-14 / DSG-001 | [Canva Video](https://www.canva.com/video-editor/), templates/features and watermark FAQ | Describes template/timeline video editing, captions and free-versus-paid asset watermark conditions | Asset rights and selected plan features still require review |
| VIDEO-20261109-15 / CAP-001 | [Riverside](https://riverside.com/), product overview | Describes recording, editing and repurposing for interviews, webinars and social clips | Guest experience, exact recording limits, privacy and costs not tested |

### Catalog ownership and discovery

The cross-portfolio technology library should link here by candidate ID. The existing Technical Docs Remotion record and Motion Canvas next-wave reference remain cross-category discovery pointers; creative comparisons stay here. GTM Revenue OS owns production briefs and measurement. This update adds no dependency, provider connection, live workflow, release or competing inventory.

## Adjacent content and sales-video options

**Recorded 2026-11-09. State: research references, not active pilots or adoption decisions.** Eight new IDs extend the same registry, from 43 to 51 candidates. The earlier 15-tool video comparison remains intact. Interactive demos, hosting, review and sales sharing are different jobs from video generation; compare within a job before adding another tool.

### Compare by the problem

The suggestions below are author recommendations, not tested quality or conversion rankings.

| Problem | Options | Reuse or baseline first | Reconsideration trigger and cost questions |
| --- | --- | --- | --- |
| Long recordings rarely become useful clips | EDT-006 OpusClip | Existing EDT-001 Descript or CAP-001 Riverside clip workflow; manual selection | Repeated clip backlog. Compare editing minutes, factual context, caption corrections and cost per accepted clip; verify media-credit limits |
| Buyers need a short personal explanation | CAP-002 Loom; CAP-003 Cap; HST-002 Vidyard | Existing recorder and an authorized share link | Frequent asynchronous demos/follow-ups. Compare capture friction, viewer access, retention, link controls and seats/storage |
| Prospects want to click through a product before a call | Existing DEM-002 Arcade; DEM-005 Supademo; DEM-006 Storylane | A concise real demo video or an existing synthetic product prototype | Repeated requests for self-guided exploration. Compare update effort, accessible fallback, capture fidelity, embeds and plan limits; choose one |
| Website videos need better delivery and engagement data | HST-001 Wistia; HST-002 Vidyard | Existing approved hosting/player and website analytics | A documented playback, organization or measurement gap. Review storage, bandwidth, seats, tracked-viewer behavior and CRM integration tier |
| Creative feedback gets lost across comments and versions | REV-001 Frame.io | Existing editor comments and one review owner | Multiple reviewers or costly version confusion. Compare precise commenting, version handling, external-reviewer access and storage |
| Sellers need an asset for each buyer stage | Existing production tools plus a small asset map | Existing GTM OS briefs and approved content repository | Missing proof for a specific stage/persona. Create the missing asset before adding a sales-enablement platform |

**Suggested order:** finish one useful product demo; derive a small set of accurate clips; assess one clickable demo if buyers need self-guided exploration; add specialist hosting/review only after a demonstrated gap. Software access through an assistant is not evidence of a paid account, usable API entitlement or a configured integration.

### Source evidence for the eight additions

Shared fields: claim_kind=vendor_claim; source_type=primary; verified_at=2026-11-09; verified_by=Codex, inspected the listed official page sections through web retrieval; confidence=moderate; verification_status=partially_verified; evaluation_status=researching; adoption_status=reference; implementation_result=not_tested; owner=Portfolio Design Lab; evidence_artifact=this versioned section. The named vendor/project is source_owner.

Only the published descriptions below were checked. Exact pricing, free-tier/export limits, authenticated availability, maintenance, integration compatibility, security, training/retention terms and commercial/output rights are **unverified**. license_rights=unknown_review_required; rights_url=null pending selected-product/release review. Cap's linked upstream repository could not be fetched during this review, so its precise source/binary/hosted licensing remains unresolved; no blanket open-source/free-commercial classification is assigned.

Review trigger: before purchase, pilot, publication of stronger claims, or use of real data, and on changed terms/features; review_due=on_trigger. No recurring schedule is created.

| Claim ID / candidate | Official source and inspected section | Narrow supported description | Limit or cost driver to verify |
| --- | --- | --- | --- |
| CONTENT-20261109-01 / EDT-006 | [OpusClip](https://www.opus.pro/), clipping/captioning/reframe feature overview | Vendor describes turning longer footage into edited, resized clips with captions | No guarantee of virality or correct clip selection; verify credits, export limits and human correction effort |
| CONTENT-20261109-02 / CAP-002 | [Loom](https://www.loom.com/), screen recording and share/embed sections | Vendor describes screen/camera recording and sharing video messages | Verify recording length, library/storage limits, viewer access and selected-plan controls |
| CONTENT-20261109-03 / CAP-003 | [Cap](https://cap.so/), Instant/Studio modes and sharing | Vendor describes instant hosted links, local capture/editing and shared playback pages | Verify exact OS support, local versus cloud data path, license, commercial use and self-host maintenance |
| CONTENT-20261109-04 / DEM-005 | [Supademo](https://supademo.com/), Guided Interactive Demos | Vendor describes guided HTML or screenshot/video walkthroughs | Not proof of a fully functional product environment; validate update cost and allowed capture data |
| CONTENT-20261109-05 / DEM-006 | [Storylane](https://www.storylane.io/interactive-demos), capture/edit/share | Vendor describes screenshot, video and HTML/CSS capture, editing and sharing of interactive demos | No automatic proof of product behavior, accessibility or conversion uplift |
| CONTENT-20261109-06 / HST-001 | [Wistia](https://wistia.com/), video management/marketing/analytics feature overview | Vendor lists hosting, embedding, player, lead forms and video analytics | Exact analytics semantics, viewer identity, plan entitlements and data handling not tested |
| CONTENT-20261109-07 / HST-002 | [Vidyard](https://www.vidyard.com/), Video Messages and Video Hosting | Vendor describes personal video messages, centralized hosting and viewer-engagement reporting | Views do not establish buying intent; verify identity attribution, integrations and plan costs |
| CONTENT-20261109-08 / REV-001 | [Frame.io](https://frame.io/features/review-and-approval), Precision Feedback and viewing controls | Vendor describes anchored asset comments and frame-accurate video review controls | Application review state does not replace the content owner's approval; check seats, storage and existing subscription entitlement |

### Supporting practices to use before adding more software

- **One content brief:** audience/persona, buyer question, sales stage, message, verified proof, desired action, placement and owner.
- **One asset record in the existing content system:** master/source project, export, transcript/captions, thumbnail, brand version, source claims, reviewer, approved revision and update/retirement trigger. Do not create another database just for this library.
- **A repurposing map:** one approved walkthrough can supply a short clip, written explanation, sales follow-up and training excerpt; adapt each to its audience instead of assuming every clip belongs on every channel.
- **A buyer-stage map:** awareness explains the problem; evaluation demonstrates a real workflow; decision content supplies approved evidence and implementation answers; onboarding teaches the next task.
- **A measurement plan:** track production/revision effort, meaningful completion, CTA responses, qualified meetings or evaluation progress where attributable. A view, completion or asset open is an engagement event, not proof of revenue or intent.
- **A maintenance habit:** verify captions and technical terminology, retain editable masters, and refresh assets when the product or claims change.

Content scheduling, campaign ownership, newsletter distribution and document-sharing operations belong in the existing GTM/technology catalog and GTM Revenue OS, not a second calendar here. Buffer, DocSend and the already-listed Postiz/listmonk are evaluated in that owning catalog.
