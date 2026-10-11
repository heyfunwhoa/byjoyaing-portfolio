# Portfolio improvement PRD

**Status:** Proposed. Implements nothing by itself.  
**Date:** 2026-10-11  
**Supersedes:** nothing. [Portfolio Experience 2.0](../product/portfolio-experience-v2-prd.md) remains the product spec. This PRD records the 2026-10-11 audit delta.  
**Brand:** [brand guidelines](../brand/brand-guidelines.md).  
**Baseline code:** `a76e5e9`.

Labels: **Verified**, **Proposed**, **Hypothesis**, **Needs approval**.

## 1. Summary

The public site already leads with Revenue & GTM Leader · Curious Builder. The improvement is to stop contradicting that lead: retire the public prototype headline, align what search engines may index, and label side quests that share `/work/[slug]`. Commercial stories stay as they are unless a sentence overclaims. New metrics are out of scope.

## 2. Problem

**Verified.** Three facts from the audit:

1. `/prototype` is a public 200 whose h1 is "Commercial Leader. Curious Builder."
2. The sitemap lists a noindex academy page, and several lab pages are indexable without being listed.
3. Project URLs do not show `kind`, and the header does not highlight Work or Side Quests on those URLs.

**Hypothesis.** A founder who only sees the homepage already understands the offer. A founder who is sent `/prototype` or a simulator URL does not.

## 3. Goals

- Positioning on every public 200 matches the brand guide.
- Work stories remain the commercial evidence, with individual scope separated from team outcomes.
- Side quests stay discoverable and visibly independent.
- Indexable URLs match the sitemap.
- WCAG 2.2 AA has a recorded test, not a library assumption.
- No new dependency, font, or CMS.

## 4. Non-goals

- A visual rebrand, a dark theme, or a new type family.
- Redirecting `/experience` or `/projects`.
- Publishing phone, resume PDF, Joy Index notes, quota, or customer names.
- Merging PR #53 inside the audit branch.
- Mounting Bento Grid or Lifeline on the public design lab.
- Inventing Lighthouse targets.
- Editing other repositories.

## 5. Users and journeys

Same audiences as the brand guide. Journeys A, B, and C in the content audit. Success is structural: each journey has a visible next link. No analytics target is set.

## 6. Requirements

### 6.1 Prototype

**Proposed.** In production, `/prototype` responds as not found, using the same availability check pattern as `designLabAvailable`, or the route is removed and covered by `not-found`.  
**Needs approval** if any stakeholder still uses that URL for review. A preview deployment can keep it.

### 6.2 Index policy

**Proposed.** `app/sitemap.ts` includes only URLs that are allowed to be indexed. Academy exercises, the playground and its children, version-control, and the storytelling guide are `noindex` unless a short editorial note promotes one of them into Field Notes.  
**Verified constraint.** `/ai-academy/programming` cannot remain in both states.

### 6.3 Kind labeling

**Proposed.** Each project detail reads `kindBySlug` and shows "Side Quest" or "Professional field practice". `isActive` highlights Side Quests or Work from that kind. URLs stay `/work/[slug]`.  
**Verified constraint.** ADR 0003.

### 6.4 Stories

**Proposed.** No new facts in `public-stories.ts` without approval. A copy edit may shorten. It may not add revenue.

### 6.5 Experience and contact

**Proposed.** Footer links to Work, Experience, Field Notes, Side Quests, and Contact. `/resume` stays absent. Contact on `main` stays the live page until PR #53 is explicitly chosen.

### 6.6 Private work

**Proposed.** Document and enforce the real access rule for `/private-work`. If the body is already public-safe, say so on the page and drop "private" from the title.

### 6.7 Market map

**Needs approval.** A side-quest summary may quote only the public README's scope: evidence-linked categories, identity as the sourced slice, other domains without invented checkmarks.

### 6.8 Quality bar

**Proposed.** For any UI pull request: `npm test`, lint, and `npm run build`. Accessibility notes from the checklist. No `tsc --noEmit` script added to `package.json`.

## 7. Content model

Unchanged. See [content-model.md](../content-model.md) and [public-project-registry.md](../public-project-registry.md).

## 8. Risks

- Gating `/prototype` removes a review URL. Mitigation: keep it in development only.
- Nav highlight based on kind needs a test so a new slug cannot ship unclassified. The registry already throws on an unclassified slug.
- noindex on academy pages reduces search discovery of learning work. That is acceptable because those pages are not the hiring story.

## 9. Open decisions

1. Gate `/prototype` or delete it.
2. Which academy pages, if any, stay indexable.
3. Whether PR #53 replaces contact.
4. Whether `/private-work` has a server-side gate today.
5. Whether to commission the Security Market Map summary now.
