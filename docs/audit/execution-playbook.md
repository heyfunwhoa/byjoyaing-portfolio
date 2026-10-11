# How product and engineering execute the top 10

**Status:** First slice started on this branch. Items 1–7 are in code. Items 8 and 10 are decisions with draft copy, not site changes. Item 9 is a test pass, not a redesign.

Each item below is the product decision, then the engineering move, then what this branch did.

## 1. Stop serving `/prototype` in production

**Product.** The live homepage headline is "Revenue & GTM Leader. Curious Builder." `/prototype` is an old layout whose h1 is "Commercial Leader. Curious Builder." `noindex` only asks crawlers to skip it. Anyone with the URL still sees the retired line. The design lab already answers this: in production the route is a 404. Local development can keep the prototype for design review.

**Engineering.** Call the same `designLabAvailable()` check the design lab uses, and `notFound()` before any prototype markup. Keep `robotsNoindex`. Add a source test that `notFound()` appears before the string "Commercial Leader". Do not delete the file, so `npm run dev` can still open it.

**This branch.** `app/prototype/page.tsx` returns 404 when `NODE_ENV` is production.

## 2. One index policy

**Product.** The sitemap and the robots meta tag must describe the same set.

Indexed, because they are the hiring story or an already published essay:

- Home, About, Experience, Work, Side Quests, Field Notes and the two guides, Contact
- Projects, Capabilities and the five capability views, Builder Guide
- `/ai-academy` and `/ai-academy/systems`
- Every portfolio case study at `/work/[slug]`

Not indexed, because they are practice labs, a design demonstration, or a prototype:

- Programming foundations, the AI playground and its children, journeys, version control, devops, lockfiles
- Both Builder Academy labs
- `/work/storytelling-guide`
- `/prototype`, `/private-work`, `/account-signal`, `/design-lab`

`/ai-academy/git-lab` permanently redirects to the noindex version-control page and is not in the sitemap.

**Engineering.** `lib/indexing.ts` holds the static index list, the noindex list, and `robotsNoindex`. `app/sitemap.ts` builds URLs from the static list plus capability views plus `projects`. Lab routes set `robots: robotsNoindex` on the page or on a parent layout. A test fails if a noindex path is also indexed, or if its source file forgets `robotsNoindex`.

**This branch.** `/ai-academy/programming` left the sitemap and stayed noindex. The previously indexable lab pages are noindex.

## 3. Show Work or Side Quest, and highlight that nav item

**Product.** ADR 0003 keeps both kinds at `/work/[slug]`. The label has to come from `kindBySlug`, not from the URL. A side quest highlights Side Quests. The competitive-intelligence study highlights Work. `/work/storytelling-guide` is unclassified, so it highlights neither. The URL does not change.

**Engineering.** The kind map lives in `lib/portfolio-kind.ts` so the header can read it without pulling every case study into the client bundle. `isActive` uses `kindForPathname`. Exact routes set `aria-current="page"`. A collection match sets `aria-current="true"`. `ProjectKindLabel` renders "Side Quest" or "Professional field practice" and links to that index. It is on the shared project template and on each dedicated case component.

**This branch.** Implemented. Registry tests still require every project slug to be classified.

## 4. Keep the three Work stories as the commercial proof

**Product.** Enterprise selling, coaching and onboarding, and competitive field guidance are the proof. Do not add revenue, a customer name, a quota, a phone number, or a Head of Sales title. The existing evidence line already says amounts and customers are intentionally withheld.

**Engineering.** Leave `lib/public-stories.ts` text unchanged. Add a test that there are exactly those three ids, that the serialized stories contain no `$`, no "Head of Sales", and no "281", and that the enterprise evidence still says "intentionally withheld".

**This branch.** Test only. Copy unchanged.

## 5. Leave the homepage hero. Cut duplicated Work copy

**Product.** The hero, the role teaser, the bento (Work / Field Notes / Side Quests), one side quest, and the contact close are the homepage. They are pointers, not copies. The field-practice block was reprinting the competitive story's context, contribution, and evidence, which `/work` already shows in full. Keep the title and one takeaway, and link to the study.

**Engineering.** Delete those three paragraphs in `app/page.tsx`. Keep `fieldPractice.takeaway` ("Useful GTM narratives distinguish confirmed findings from hypotheses."). Do not edit the hero strings.

**This branch.** That cut is the only homepage copy change.

## 6. Link Experience from the footer and About

**Product.** Experience stays out of the six-item header (ADR 0003). Recruiters still need it from the footer and from About. `/resume` stays a 404. No resume button. No phone number.

**Engineering.** Footer nav: About, Work, Experience, Field Notes, Side Quests, Contact, and the existing mailto. Each link is at least 44px tall. About already linked to `/experience`; the link is now an underlined 44px target next to Capabilities.

**This branch.** Done. No `/resume` route was added.

## 7. One title pattern

**Product.** Browser tabs and search results read `Topic — Kristen Joy Aing`. The homepage topic is `Revenue & GTM Leader · Curious Builder`. Article titles drop the extra "Field Notes" or "Builder Academy" suffix. Those words stay in the description.

**Engineering.** Root layout `title.template` is `%s — Kristen Joy Aing`. Each `page.tsx` sets only the topic. `title.default` is the full homepage string, because the template does not apply to the default in the same metadata object. A test fails if a `title:` line in a page file contains the name or a pipe, which would double the suffix or reintroduce mixed separators. Unknown URLs use `app/not-found.tsx` with the topic "Page not found".

**This branch.** Applied across page metadata.

## 8. Contact: keep `main`. Leave PR #53 alone

**Product decision for this slice.** The live contact page already has the three approved methods (email, LinkedIn, GitHub), Keyline icons, the inquiry form, and no phone number. Draft PR #53 is a different layout and is conflicting with `main`. Choosing it is a separate review. This branch does not merge it, rebase it, or copy its layout.

**Engineering.** No contact diff. A later PR can adopt #53 only after the conflict is resolved on purpose and someone confirms the phone number is still absent.

## 9. WCAG 2.2 AA evidence

**Product.** A passing component library is not a conformance claim. The pass has to name what was operated: keyboard, focus, contrast, widths, zoom, and reduced motion.

**Engineering.** Record results against the running app. Fix defects that the new footer, kind label, or menu introduce. Do not treat this playbook as a certificate.

**This branch.** Results go in the pull request after the local server is exercised. The closed menu class remains `hidden`, covered by the existing nav test.

## 10. Security Market Map, after copy approval

**Product.** The public README supports a Side Quest. The Side Quests page already links the GitHub repo and says these repositories are not finished portfolio applications. Publishing a case-study URL now would jump that gate. Approval means accepting the sentences below. Until then, engineering does not add a slug, a logo, or a status.

**Draft, for approval. Not on the site.**

- **Problem.** Security categories are hard to navigate. One product may be described as identity, secrets, cloud, or application security.
- **Why.** Make those relationships easier to explore without treating every vendor as a direct competitor.
- **Audience.** People comparing categories, including enterprise security sellers.
- **What it does.** Identity comparisons are a sourced claim, a conflict, or Unknown. Other domains name the buyer, the budget, and research-candidate vendors. They do not invent feature checkmarks.
- **Status.** Public repository. Vendor lists are illustrative, not an endorsement or an analyst ranking.
- **Logos.** None, until that repo's stack is verified the same way `verified-stacks.ts` verifies this portfolio.

Private repositories and any CI-to-Slack operations story stay unpublished.
