# SEO P0: Search engine ownership and indexing verification

Status: **manual verification pending**. Domain ownership in third-party webmaster tools must be completed by the domain owner; repository code cannot prove verification.

## Google Search Console

1. Open https://search.google.com/search-console and add a **Domain** property: `byjoyaing.com` (without `https://` or `www`).
2. Copy the TXT verification value provided by Google and add it at the DNS provider for the root domain. Do not commit the token into the repository.
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
- Private work, prototype/lab routes and intentionally unpublished lessons should not appear in the sitemap, and should have effective noindex controls or return 404 as appropriate. **Noindex is not access control:** protected content also requires server-side authorization.
- Check both `byjoyaing.com` and `www.byjoyaing.com` for a single canonical host and consistent redirects.

## Existing automated checks

- `lib/indexing.test.ts` already verifies sitemap/noindex list separation and presence of noindex directives for excluded routes.
- `lib/page-metadata.test.ts` checks shared metadata rules.
- These run via the existing `npm test` script. Do not add a duplicate scheduled crawl or an additional paid SEO product for P0.

## Completion criteria

- [ ] Google domain property verified
- [ ] Google sitemap submitted; relevant URL inspections recorded
- [ ] Bing property verified or imported, sitemap submitted
- [ ] Live robots, sitemap, canonical host and selected pages verified
- [ ] Existing indexing and metadata tests pass in CI

Note: On October 13, 2026, an external fetch of the homepage, robots.txt and sitemap.xml could not be completed from the available web checker. This is **not proof that the site is down**. Live checks remain open.
