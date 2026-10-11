# Portfolio editorial segmentation

## Public navigation and audience
Keep the top-level navigation: Home / About / Work / Field Notes / Side Quests / Contact. Do not publish the private Joy Index.

- **Home — Why explore:** positioning, selected verified professional evidence, one featured Work story, one Field Note, selected independent builds, a small personal introduction, and contact.
- **Work — What I have done:** professional evidence across (1) Enterprise Sales, (2) People & Leadership, and (3) GTM Strategy. Keep individual versus team responsibilities explicit; do not treat independent demonstrations as employer deployments.
- **Field Notes — How I think:** Playbooks (execute), Frameworks (decide), Operating Systems (repeat/scale), Lessons Learned (reflect). Each note identifies evidence, illustrative examples, and limitations.
- **Side Quests — What I build:** independent software, research and learning projects. Browse by supported directory categories and lifecycle/status independently. Related Work or Field Notes should be links, not duplicated content.
- **About — Who I am:** career origin, values, leadership philosophy, career context, and curated personal interests.
- **Contact — How to connect:** a direct, functional contact path.

## Routing constraints
Retain /experience as a supporting career timeline, /projects as the existing filterable directory, and existing /work/[slug] URLs (which include independent builds). Route alone does not define content classification. Before changing routes, add new destinations, redirects, and link tests.

## Editorial and accessibility rules
Preserve the canonical brand guide and existing tokens, typography, avatar system, and editorial bento. Favor one lead story and smaller supporting tiles over equal-weight grids. On mobile, the reading order must match the document order. Use native anchor links, visible focus states, descriptive calls to action, accurate category filters and honest statuses. Never invent performance or usage claims.

## Next implementation passes
1. Review professional evidence by Work segment and add outcome-backed, approved case studies.
2. Add landing anchors and per-collection article inventories to Field Notes.
3. Evolve the portfolio registry with structured topics and related-content IDs while keeping a single source of truth.
4. Consolidate duplicated About/Home passages and check 375px, 768px, 1280px, keyboard, zoom and reduced-motion behavior.
5. Run lint, tests and production build and inspect the deployed preview before merging.
