# Validation and acceptance checklist

Use this when an implementation pull request claims to complete an audit item. The audit itself is documentation. Checking these boxes is not required to merge the audit PR.

## Positioning

- [ ] Homepage h1 remains "Revenue & GTM Leader. Curious Builder."
- [ ] No public production URL uses "Commercial Leader" as an h1.
- [ ] No page implies a Head of Sales title already held.
- [ ] Coaching copy stays distinct from formal management.
- [ ] Phone number is absent from UI, metadata, and JSON-LD.
- [ ] Joy Index content is absent.

## Journeys

- [ ] Journey A can move Home → Work stories → Experience → Contact without a new page.
- [ ] Journey B can open Experience and Contact. `/resume` does not offer a download.
- [ ] Journey C can open a side quest and see the words Side Quest on that page.
- [ ] A side-quest URL highlights Side Quests. The competitive study highlights Work.

## SEO and routes

- [ ] `/approach` still resolves to `/about`.
- [ ] `/experience` and `/projects` still return 200.
- [ ] `/design-lab` returns 404 in production.
- [ ] Every sitemap URL is indexable. Every noindex URL is absent from the sitemap.
- [ ] Unknown routes use a title that is not the homepage title.
- [ ] Canonical host remains `https://www.byjoyaing.com`.

## Accessibility and responsive

- [ ] Keyboard: header, menu, contact links, and one form field.
- [ ] Focus visible on those controls.
- [ ] 320, 375, 768, and 1280 checked for Home, Work, and Contact.
- [ ] 200% zoom checked for Home and one project page.
- [ ] Reduced motion leaves geometry static.
- [ ] Contrast notes recorded for accent-on-ivory and the charcoal hero.

## Engineering

- [ ] `npm test` passes, including any new sitemap or nav test.
- [ ] Lint passes.
- [ ] `npm run build` passes.
- [ ] No new dependency.
- [ ] No new font.
- [ ] No secrets or env files committed.
- [ ] PR #53 was not merged as a side effect.

## Claims

- [ ] No new revenue, quota, customer, or deal figure.
- [ ] Synthetic GTM studies still read as fictional in the same view as their numbers.
- [ ] Security Market Map, if added, matches its public README and invents no rankings.
- [ ] Private repositories were not edited.

## Performance

- [ ] Any quoted LCP, CLS, or INP value cites a tool run and a URL. Otherwise the PR says "not measured."
