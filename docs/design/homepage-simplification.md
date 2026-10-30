# Homepage simplification

**Status:** Implementation reference. Current copy and wayfinding refinements are proposed in PR #219.  
**Updated:** 2026-10-30  
**Source:** `app/page.tsx`, `content/home/page.json`, and `components/editorial-bento.tsx`.  
**Brand:** [canonical brand guidelines](../brand/brand-guidelines.md).

The homepage is an editorial cover. It introduces Kristen Aing, shows selected professional credibility, and helps a reader choose Work, About, Field Notes, Side Quests, or Contact. The destination pages provide the depth.

Positioning stays **Revenue & GTM Leader · Curious Builder**. The philosophy is **People first. Problem-driven. Systems-minded.** The signature, Geist typography, existing palette, approved homepage portrait, and six-item primary navigation stay consistent.

## 1. Home and About have different jobs

| Page | Reader question | Content that earns its place | Next step |
| --- | --- | --- | --- |
| Home | Who is Kristen, and which work is relevant to me? | Concise positioning, selected role evidence, clear destination choices, one labeled independent example. | Explore Work first; About for context; relevant collections or Contact when useful. |
| About | What shaped Kristen's approach, and how does she work? | Advertising background and purpose, expanded philosophy, capabilities, career and education, practical methods, writing examples, and a little personal context. | Inspect relevant professional work or writing, then start a conversation. |

Repeat the name, enterprise cybersecurity context, positioning, and philosophy where needed for direct visitors. Home states the philosophy; About explains how it shows up in practice. Keep the expanded education, toolkit, writing excerpts, and personal interests on About. Keep the three selected role cards and large destination bento on Home.

Visuals support these roles: Home uses the dark editorial hero and approved portrait; About uses the quieter orbit-only introduction. They share a visual identity while giving the reader different information.

## 2. Current Home sequence

1. **Hero:** name, professional positioning, one philosophy line, a short description, portrait and caption. Explore Work is the primary action; About Me is secondary.
2. **Professional credibility:** three responsive role cards for Truffle Security, Rapid7, and Forcepoint, each with a short supported contribution and an evidence or timeline link.
3. **Destination bento:** Work, Field Notes, and Side Quests, in that reading order. Work is visually dominant.
4. **One Side Quest:** Detector Coverage Atlas, its observed status, a concise summary, scope information and a link to the sample. Independent ownership stays explicit.
5. **Contact close:** a short invitation, Get in touch, and About Me.

There is no separate competitive field-practice section on Home. That professional evidence belongs in Work. The full career history belongs on Experience, and practical guide detail belongs in Field Notes.

## 3. Entry and destination map

| Entry on Home | Destination and purpose |
| --- | --- |
| Explore Work | `/work`: professional evidence and contributions |
| About Me | `/about`: background, working approach and personal context |
| Role evidence links | Relevant Work section, or `/experience#career-details` |
| Field Notes tile | `/field-notes`: practical guides and frameworks |
| Side Quests tile | `/side-quests`: independent projects and research |
| Detector Coverage Atlas sample | `/work/detector-coverage-atlas`: the existing case-study route, labeled as an independent project |
| Get in touch | `/contact`: the conversation and contact options |

On About, the on-page links follow the section order and include **Work & writing**. The capability and career sections offer professional evidence paths. The writing section links directly to two illustrative guides and the relevant collections. The compact personal section comes near the end, followed by Start a conversation.

Visitors can enter on any page. Preserve clear onward and return paths without requiring everyone to follow the same tour.

## 4. Review pages in context

For every portfolio page review:

1. State the reader question, expected entry point and useful next step.
2. Compare the opening and depth with Home, About and the relevant destination pages.
3. Keep necessary identity and navigation repetition. Add supporting detail that belongs to this page.
4. Check the order of context, professional evidence, optional independent work, supporting tools and personal material.
5. Keep actions tied to the content they help the reader inspect. Check both onward and return links.
6. Review the actual rendered reading order, wrapping, headings, keyboard focus and responsive navigation.
7. Update the documented sequence when an approved flow changes. Record the exact preview and verification limits in the PR.

The canonical brand guide owns positioning and evidence rules. This note explains the Home/About composition and review practice; it does not create a competing brand definition.

## 5. Responsive composition and reuse

Home keeps the same DOM order on phone, tablet and desktop. Hero actions stack below 420px and sit together when space permits. The portrait and text remain within their existing responsive containers.

Credibility cards stack on phones, use two columns from 640px with the final card centered, and use three columns from 1024px. The bento keeps Work before Field Notes and Side Quests. About's on-page links wrap naturally; all destinations remain native links with existing target sizes, focus treatment and scroll offsets.

Reuse `PageMain`, `BrandAvatar`, `CelestialFrame`, `EditorialBento`, `Marginalia`, existing role/project data and site tokens. The page-flow refinement adds no dependency, global navigation item, motion or new interaction system.

Use the existing CI and production-browser checks. Verify actual links and the changed content in preview. Viewport reflow checks do not establish manual browser zoom, real-device or screen-reader coverage; record those separately.

Historical migration decisions remain in Git history. Current source and the reviewed PR establish implementation state; an old branch name or design note does not establish that a change is pending or shipped.

