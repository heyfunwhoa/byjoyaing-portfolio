# SEO P0: Search engine ownership and indexing verification

Status: **manual verification pending**. Domain ownership in third-party webmaster tools must be completed by the domain owner; repository code cannot prove verification.

## Google Search Console

1. Open https://search.google.com/search-console and add a **Domain** property: `byjoyaing.com` (without `https://` or `www`).
2. Add the verification record provided by Search Console at the DNS provider. Use the TXT or CNAME type and values it provides; do not generate your own value. Do not commit the verification token into the repository.
3. After verification, inspect the exact deployed URLs `https://www.byjoyaing.com/`, `https://www.byjoyaing.com/work`, and `https://www.byjoyaing.com/ai-academy`.
4. Submit `https://www.byjoyaing.com/sitemap.xml` in **Sitemaps**.
5. Record the indexed/not-indexed results and investigate canonical, crawl or noindex warnings. Submission is not a guarantee of indexing.

## Bing Webmaster Tools

1. Open https://www.bing.com/webmasters and use the Google Search Console import if available; otherwise add and verify `byjoyaing.com` by its supported method.
2. Submit `https://www.byjoyaing.com/sitemap.xml`.
3. Check URL Inspection and coverage after Bing has processed the site.

## Public deployment checks

- `https://www.byjoyaing.com/robots.txt` should be reachable, allow crawlers for published pages, and point to the sitemap.
- `https://www.byjoyaing.com/sitemap.xml` should be reachable and contain only indexable, canonical production URLs.
- A published page should return HTTP 200, a useful title and description, and a canonical URL.
- Private work, unselected practice labs and intentionally unpublished lessons should not appear in the sitemap, and should have effective noindex controls or return 404 as appropriate. **Noindex is not access control:** protected content also requires server-side authorization.
- Check both `byjoyaing.com` and `www.byjoyaing.com` for a single canonical host and consistent redirects.

## Existing automated checks

- `lib/indexing.test.ts` already verifies sitemap/noindex list separation and presence of noindex directives for excluded routes.
- `lib/page-metadata.test.ts` checks shared metadata rules.
- These run via the existing `npm test` script. Do not add a duplicate scheduled crawl or an additional paid SEO product for P0.

## Official references (checked October 24, 2026)

- [Google Search Console: Verify your site ownership](https://support.google.com/webmasters/answer/9008080)
- [Google Search Console: URL Inspection tool](https://support.google.com/webmasters/answer/9012289)
- [Google Search Console: Sitemaps report](https://support.google.com/webmasters/answer/7451001)
- [Bing Webmaster Tools: Add and verify a site](https://www.bing.com/webmasters/help/add-and-verify-site-12184f8b)
- [Bing Webmaster Tools: Sitemaps](https://www2.bing.com/webmasters/help/sitemaps-3b5cf6ed)

## Completion criteria

- [ ] Google domain property verified
- [ ] Google sitemap submitted; relevant URL inspections recorded
- [ ] Bing property verified or imported, sitemap submitted
- [ ] Live robots, sitemap, canonical host and selected pages verified
- [ ] Existing indexing and metadata tests pass in CI

Note: On October 24, 2026, the available external web checker could not fetch the homepage, robots.txt, sitemap or selected pages. This is **not proof that the site is down**. Owner-side live checks remain open.

## October 29, 2026 route review

Implementation is proposed in a PR until merged and verified on production. Public explanations and synthetic examples were reviewed on 43 additional live routes. All returned HTTP 200 with a title, description, canonical and one H1. This was not a full interaction, accessibility, performance or search-index coverage test.

| Routes | Decision | Reason and next check |
| --- | --- | --- |
| /builder-academy/identity-journey; /builder-academy/credential-risk | Allow indexing with explicit page metadata and add to sitemap | Existing public explanations and fictional security exercises directly support the portfolio's security and learning focus. Verify effective robots metadata, canonical, sitemap, and exercise behavior on preview before publishing. |
| /ai-academy/systems | Exclude from indexing and sitemap | Thirteen planned modules and seven future lab ideas are a roadmap, not available courses. Reconsider when standalone lessons are delivered. |
| /ai-academy/programming | Keep excluded | Two guided tutorials, with the other eight modules planned. Revisit the broad language-learning description and completion state. |
| /ai-academy/journeys/source-verification; /ai-academy/journeys/prompting; /ai-academy/journeys/follow-one-click | Keep excluded for this release | Strong next candidates. Review every step, feedback, keyboard flow and visible standalone explanation before promotion. Follow-one-click is now explicitly recorded in the exclusion registry. |
| /ai-academy/playground; /ai-academy/playground/skill-builder; /ai-academy/playground/research-pipeline | Keep excluded | Review task completion and useful static explanations before promoting individual tools. |
| /ai-academy/version-control; /ai-academy/devops/build-rate-limits; /ai-academy/dependencies/lockfiles | Keep excluded | Review exercises and current technical instructions before promoting. These are secondary to the security-focused lessons. |
| /private-work | Keep excluded | Existing public access explainer only. No protected content or login is implemented by this change. |

Parent layouts retain their exclusion defaults; only the two selected security pages opt in. No confidential content is added. Future Better Auth work must separately define authentication and resource-level authorization. A public summary can remain discoverable while approved supplementary material is access-controlled; noindex alone never protects that material.

Verification after merge: fetch both promoted pages and the roadmap, confirm effective index/noindex and canonical declarations, inspect the sitemap, then use Search Console URL Inspection. Search eligibility does not guarantee inclusion or AI citations. Roll back by reverting the metadata and indexing registry changes together.
