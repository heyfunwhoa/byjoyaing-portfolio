# Content and positioning audit

**Reader simulated:** a founder hiring a first sales leader, an enterprise AE recruiter, and a cybersecurity founder. No usability session was run. Judgments are marked.

## Positioning in 15 seconds

**Verified.** The live homepage h1, eyebrow, and first paragraph state Revenue & GTM Leader, enterprise cybersecurity, complex deals, coaching, and systems. The avatar caption "Curious by nature. Builder by instinct." is secondary, which matches the brand guide.

**Judgment.** A founder can tell this is a seller who builds. A recruiter can tell the current craft is enterprise selling, not a software-engineering job search. The prototype URL can undo that if it is forwarded.

## Does the site show leadership without exaggeration?

**Verified.** Work copy says mentoring, enabling, and onboarding are distinct from formal people-management responsibility (`app/work/page.tsx`). Stories name coaching SDRs, shared discovery resources, and support for seven GTM hires as timeline facts that still ask for care before more detail. Titles in the role list are Senior Enterprise AE, Enterprise AE, Senior AE, and channel roles. None is Head of Sales.

**Judgment.** That boundary is credible. Do not add a "first sales leader" claim as if the title were already held. The audience section of the brand guide already frames leadership as potential a hiring leader can evaluate.

## Are accomplishments visible?

**Verified, and limited on purpose.**

- Enterprise selling: full-cycle strategic sales at Rapid7, including a major 2022 threat-intelligence agreement; Forcepoint new-logo and expansion across a multi-state territory; Forcepoint's largest team web-security agreement in 2021. Amounts and customer names are withheld in the same evidence paragraph.
- People: two SDRs moving into closing roles; seven GTM hires onboarded. The story says to verify before publishing further detail.
- GTM: competitive briefs and field playbooks, with employer documents not reproduced.

**Needs approval** before any new metric, logo, or customer name.

## Commercial work and technical projects

**Verified.** Side quests are a separate index. The homepage features one, the Detector Coverage Atlas. Work's GTM section says a software prototype is not proof of employer deployment.

**Judgment.** The connection is understandable on the Work index. It gets muddy on the detail URL, because a side quest and the competitive study share `/work/`. AUD-03 is the fix.

## Tone

**Judgment, from the hero, Work intro, and contact paragraph.** Warm, specific, and free of quota theater. Academy pages shift into instructor voice ("Learn the languages…", "Why did my deployment get rate-limited?"). That voice fits a learning surface and should stay off the homepage.

## Contact invitation

**Verified.** Hero does not include a contact button. Contact is in the header. The contact page states the kinds of conversations she wants. Footer email is always visible.

**Hypothesis.** Some founders expect a contact action in the hero. Adding one is optional and secondary to Work. Unmeasured.

## Copy to change, using existing words

These are recommended replacements only where the live string contradicts an accepted decision. Everything else waits for a line edit with the owner.

| Location | Current | Replacement | Status |
| --- | --- | --- | --- |
| `/prototype` h1 | Commercial Leader. Curious Builder. | Remove the route in production, the same way `/design-lab` 404s. | Needs approval to delete or gate. Do not "fix" it by shipping the old headline on `/`. |
| Brand guide status banner | Homepage, IA, imagery, and case studies "still under review" | "Hero positioning matches the live site. Case-study evidence remains `requires-review`." | Needs approval. Small canonical edit. |
| Project detail pages | No kind label | "Side Quest" or "Professional field practice" from `kindBySlug` | Safe to implement from existing registry values. |
| Work stories | Current evidence paragraphs | Keep. Do not add revenue figures. | Approved public copy |

## Storytelling coverage

| Capability | Where it shows up | Gap |
| --- | --- | --- |
| Strategic enterprise selling | Enterprise Sales story, `/experience` | Results stay qualitative. That is correct until approved. |
| Complex deal management | Same story plus deal-anatomy field note | Field note must stay an illustration, not a disguised live deal. |
| Multithreading | Field note, linked from the selling story | Present. |
| Forecasting and pipeline | Capability page `/capabilities/revenue-operations` exists | Not in the Work story set. Do not imply a forecasting system was deployed at an employer. |
| Revenue process | GTM story and synthetic simulators | Simulators are models. Keep the fictional label. |
| Enablement and coaching | People & Leadership story | Formal management is correctly disclaimed. |
| Team development | Same, plus Truffle Camp as a side quest | The related link already marks Truffle Camp as a side quest. |
| Technical product fluency | Atlas, account signal, market map link | Business framing on the homepage is one sentence. Detail pages can go deeper. |
| GTM strategy | Third Work section | One software study. Enough. |
| Cross-functional leadership | Onboarding across sales, SA, and CS in the people story | Present as support, not as owning those orgs. |

## Journeys

**Journey A — Founder hiring a Head of Sales.** Home → Work (three stories) → Experience → Contact. The path exists. Friction: Work's software card is easy to mistake for the main proof if the stories are below the fold. Unverified without a scroll test.

**Journey B — Strategic Enterprise AE recruiter.** Home → Experience → Contact. Experience is one click from the homepage role links, and also from Work. `/resume` 404 is correct. A recruiter who guesses `/resume` gets the default site title on a 404, which feels unfinished.

**Journey C — Technical visitor.** Home → Side Quests → `/work/[slug]` → GitHub where a public repo is linked. Friction is the URL and the inactive nav item. Security Market Map is an outbound GitHub link, not a narrative page.

## What not to publish

- Phone number.
- Joy Index notes.
- Employment revenue, quota, or unapproved customer names.
- A CI-to-Slack operations case study before redacted live evidence exists.
- Private repository contents inferred from a 404.

## November 22, 2026 editorial notes from Josh Lowry’s Substack

Lowry writes about how he assesses technical sellers and revenue teams. These are editorial recommendations for Kristen’s portfolio. The articles support the hiring lens. Kristen’s own career record supports the claims about her work.

| Priority and page | What Lowry looks for | Portfolio edit and reader check |
| --- | --- | --- |
| 1. Work, then Experience | In his June recruiting essay, Lowry describes looking for evidence of security expertise, the customer segment a seller served, and the ability to engage executives. | Put one verifiable contribution on each collapsed Work card. Use the Forcepoint web-security sales, Truffle discovery guides and Rapid7 playbooks already recorded in Experience. Can a hiring manager describe what Kristen sold, who used something she built, and one question to ask her? |
| 2. Enterprise Deal Anatomy | In his January technical-selling essay, Lowry argues that a seller’s recommendation should change with the buyer’s role and operating problem. | Use one fictional secrets-detection evaluation. Give the engineering lead a question about who can act on a finding. Give the CISO a question about the evidence needed to expand the pilot. Ask what result would change the recommendation. Keep the example visibly fictional. |
| 3. Account Intelligence | In his May AI hiring essay, Lowry asks candidates to explain workflow inputs, outputs and what they did when an output was wrong. | Walk one synthetic signal through the current demo. Show the original evidence, the draft inference, and the point where a seller can reject it. If a source only shows a hiring announcement, avoid presenting budget as confirmed. A reviewer should be able to identify the unsupported claim and explain what to check next. |

The first two edits are included in this change. The third is a candidate for a follow-up walkthrough. Test it with a reader before expanding the site. Keep employer material, customer names and personal sales figures private.

**Sources inspected November 22, 2026**

- Josh Lowry, *Stop Waiting for Recruiting, Use AI Instead*, June 14, 2026. See the opening description of the candidate profile and the discussion of screening evidence. [Substack](https://joshlowrygtm.substack.com/p/stop-waiting-for-recruiting-use-ai)
- Josh Lowry, *New Technical Bar for Revenue Teams*, January 28, 2026. See the passages on deployment context and adapting a recommendation to the buyer’s level and role. [Substack](https://joshlowrygtm.substack.com/p/new-technical-bar-for-revenue-teams)
- Josh Lowry, *Hiring for AI Fluency*, May 8, 2026. See the examples for practitioners, integrators and builders. [Substack](https://joshlowrygtm.substack.com/p/hiring-for-ai-fluency)

These are first-person accounts of Lowry’s approach. They do not establish a company-wide hiring policy or predict hiring outcomes. The articles are attributed and paraphrased. The example questions and page edits are original. Recheck these references when revising the corresponding case study or if an article changes.

### Owner correction on public examples, November 22, 2026

Kristen wants the public portfolio to show work she actually did. This supersedes the proposed synthetic Account Intelligence coaching example above. Lead with the contribution and the observable result. Attribute employer examples to the public career account. A publisher's product page supports product context only. Independent research should link to the original source and to the artifact a reader can inspect.

The revised case uses Rapid7 playbooks the portfolio team used, Truffle Security discovery and evaluation guides the sales team adopted, and the previously published LimaCharlie research brief. Keep a customer-specific trigger, conversation or outcome out until Kristen confirms what happened and what can be shared. Keep customer identities and deal amounts private.
