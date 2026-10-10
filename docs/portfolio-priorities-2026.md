# Portfolio conversion and project priority policy

**Date:** 2026-10-10. **Status:** editorial plan, not a claim of shipped application features.
**Main decision:** ship byjoyaing.com first. Project development is separately sequenced and only resumes after a public-site release.

## Public story
**Commercial Leader. Curious Builder.** People first. Problem-driven. Systems-minded.
1. Home: commercial identity, evidence, selected Work, Side Quests, contact.
2. Work: actual enterprise selling, coaching, GTM systems and outcomes; avoid implying software experiments were used by employers.
3. Side Quests: personally developed software, exploratory research, honest stage and useful artifacts.
4. About: personal history, values, leadership philosophy and relevant tools.
5. Contact: simple follow-up.

## Repositories and editorial decisions
| Repository | Portfolio placement | Shipping priority | Development priority after website |
|---|---|---|---|
| byjoyaing-portfolio | Main product | P0 | P0 until launched |
| joy-index | **Private only** | Never publish raw content | Personal tool; not a public site dependency |
| account-signal-engine | Featured Side Quest: sales intelligence | Show honest current state | #1 for business relevance |
| detector-coverage-atlas | Featured Side Quest: security analysis | Show current state, cite upstream TruffleHog | #2 for technical depth |
| truffle-camp | Featured Side Quest: education and enablement | Show current state | #3 if learning UX is differentiating |
| security-market-map | Research/market mapping Side Quest (add to typed registry after case-study review) | Add editorial listing only when factual case study prepared | #4 |
| channel-territory-mapping | Supporting Side Quest; partner collaboration case | Optional secondary listing | Later |
| technical-docs-platform | Supporting documentation architecture | Optional roadmap listing | Later |
| gtm-revenue-os | Group related revenue planning ideas under one family | Avoid multiple near-identical featured cards | Later |
| attio-setup | CRM learning/integration experiments | Link from relevant GTM systems case, not standalone featured project | Later |
| trufflehog | Upstream security OSS reference; **not an original app** | Cite upstream as input to Atlas | Fork/modify only when concrete detector contribution planned |
| gtpsrentals | Separate personal domain | Do not lead professional GTM/cyber narrative | No active portfolio priority |

### Naming mismatch to resolve before launch
The current typed portfolio registry has `security-signal-intelligence` and `account-intelligence` but **not** `security-market-map` or `account-signal-engine` by exact repo name. This is a content-mapping gap, not evidence the latter repos are unbuilt. Map repo URLs to reviewed case studies without inventing routes or replacing valid slugs.

### Publishing policy
- Each Work case study: problem, actual role, actions, source/approval, outcome, reflection. Unverified outcomes stay out.
- Each Side Quest: why, user, implemented evidence, architecture, constraints, what is proposed, next experiment, repository link only when confirmed public and appropriate.
- Never interpret a screenshot, fixture or demo as a deployed customer product.
- Upstream TruffleHog attribution must be clear; Atlas is an independent metadata/catalog app, not a fork.
- Don't surface Joy Index data, customer names, private docs or API secrets.
- Use existing statuses rather than making a new marketing-friendly status taxonomy without evidence.

## Release sequence
1. Small PR: Home brand hero, Work/Side Quests route/nav, existing old links preserved, simple catalog.
2. Validate internal links, status text, access/privacy, mobile and keyboard nav; run full CI.
3. Separate PR: align case-study templates with Work vs Side Quests, review claims and links individually.
4. Separate PR: production SEO/social previews, contact success/error, real-device usability and deployment.
5. **Only then**: prioritize Account Signal Engine, Detector Coverage Atlas and Academy based on ability to demonstrate value, not just architecture complexity.

## Definition of done
Site visitor can reach professional Work in one tap, see clearly labeled independent builds, understand the founder/leader story, and contact the owner. Existing shared links still work. No broken status claims, private info, or red CI. No requirement that every side project is completed.
