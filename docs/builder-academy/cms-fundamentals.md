# CMS fundamentals

Beginner to intermediate · about 35 minutes · Builder track · Sources checked 2026-10-14

This is the canonical CMS Fundamentals lesson. Chapters 1 and 2 orient a beginner. Chapters 3 through 6 ask for intermediate judgment. Complete [Frontend building blocks](frontend-building-blocks.md) first.

**Status of this portfolio.** A local Keystatic editor can change the public `verification`, `reading-code-and-yaml`, and `mcp-vs-rest-api` lessons, plus the About page, Home cover, and Work narrative sentences, when a developer opts in on loopback. The lesson pilot is [KRU-75](https://linear.app/krusty/issue/KRU-75). The two later lessons are [KRU-77](https://linear.app/krusty/issue/KRU-77). The page records are the [editorial foundation](../content/editorial-foundation.md). Hosted GitHub editing is not configured. Production `/keystatic` stays off. This lesson does not install a CMS. Interactive checks and learner progress stay in application code.

Portfolio-specific adoption choices for other repositories belong in the content model, not in a second curriculum. This guide teaches the concepts. It does not authorize a migration.

The portfolio example below describes that implemented pilot. Harbor Notes and Field Ledger are fictional. Comparison tables include a column of teaching synthesis. That column is not a benchmark.

## What you will learn

- Use CMS terms precisely, including where a CMS overlaps a database, a digital asset manager, or a learning system.
- Describe architectural patterns as overlapping dimensions.
- Sketch a content model with types, fields, references, and a stable identifier.
- Trace draft, preview, publish, delivery, cache, and rollback.
- Separate editor authentication from reader authorization.
- Compare Git-only authoring, Keystatic, TinaCMS, Sanity, Payload, and WordPress, including exit cost.

## How progress is recorded

Reading this guide is **reviewed**. Completing the written exercise or the on-card lab is self-reported **practice**. The existing multiple-choice knowledge check is the only in-app **passed** check, and only for that question. The lab does not write progress and does not award Passed. None of these labels proves a production CMS is safely configured.

## 1. CMS fundamentals and terminology

A content management system gives people a place to create, organize, edit, and publish content. An editor works with fields such as title, summary, and body instead of changing a page component for every wording update. Which workflow features exist depends on the product and the plan.[1]

| Term              | Meaning                                                                                                         |
| ----------------- | --------------------------------------------------------------------------------------------------------------- |
| Schema            | The allowed content types and fields.                                                                           |
| Content record    | One filled-in instance of a type.                                                                               |
| Field             | One piece of that record, such as a title or a date.                                                            |
| Reference         | A link from one record to another, such as an article pointing at an author.                                    |
| Stable identifier | An id that other systems keep using after the title or URL changes.                                             |
| Slug              | A URL-friendly name. It can change; do not use it as the only id if saved progress or links depend on identity. |
| Asset             | A file such as an image, with its own storage, rights, and cache.                                               |
| Draft             | A version that is not the public one.                                                                           |
| Preview           | A view of proposed content before publication.                                                                  |
| Body format       | How the prose is stored: Markdown, MDX, JSON, or structured rich text.                                          |

Markdown is a text format. MDX adds components to Markdown, so it can mix content and presentation. JSON is structured data a program can validate. Structured rich text stores paragraphs, marks, and embeds as data rather than one HTML string, which makes references and reuse easier and migration more specific. A CMS might offer more than one of these.

### What a CMS is not, even when the words overlap

- A **database** stores and queries records. A CMS may use one internally. A database alone does not give editors a publishing workflow.
- A **digital asset manager** specializes in files, rights, renditions, and reuse. A CMS may store images too. Large media operations often still need a DAM.
- A **learning management system** tracks learners, enrollments, and completion. Lesson prose can live in a CMS. Learner progress should not.
- A **product API** serves operational data to software. Editorial content can be delivered by an API as well. Collected evidence, accounts, and calculations are not articles.

## 2. CMS architectural patterns

These words describe dimensions that overlap. They are not exclusive clubs, and vendors do not use them identically.

| Dimension                 | What it emphasizes                                                                                                                                 | What it does not decide                                                                                  |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Traditional or integrated | Editors and the site presentation are commonly managed together.[1]                                                                                | Whether you can also call an API. WordPress documents a REST API, so a separate frontend is possible.[2] |
| Headless                  | Content is managed apart from one website's templates. Tina's docs use "headless" this way.[3]                                                     | Where the bytes are stored.                                                                              |
| Decoupled                 | A content API and a presentation app can change on different schedules. Tina's introduction also says the editor is decoupled from the website.[3] | That there is only one frontend.                                                                         |
| Hybrid                    | Some pages are assembled by the CMS and some are rendered by a separate app.                                                                       | A single product name.                                                                                   |
| Git-backed                | Content is saved as repository files. Keystatic and Tina both do this.[4][3]                                                                       | That every editor has a Git account, or that a pull request is required.                                 |
| API-first                 | Clients read and write structured content through an API. Sanity is built as a hosted content platform with APIs and a separate Studio.[5]         | That files cannot also exist.                                                                            |

**Git-backed versus API-first** is the storage and delivery contrast you will use most often. A Git-backed CMS writes files your review process can diff. An API-first CMS stores records in its own content service and lets many apps query them. A product can be Git-backed and headless at the same time. Tina describes itself as both.[3] A product can be API-first and still be edited in a visual studio. Sanity is that shape.[5]

### Optional sidebar: docs and marketing

An API-first infrastructure or cybersecurity company often keeps product documentation in Git, next to the code that it describes, and uses a separate CMS for marketing pages that change on a campaign calendar. That split follows the audience and the review path. It is not a claim about any one vendor's internal stack.

## 3. Content modeling and schemas

Start from the sentences editors must publish, not from a vendor's field list.

1. Name the content types. For this Academy, a lesson is a type. An author or a source note might be another type.
2. List the fields and which ones are required.
3. Decide which fields are references instead of copied text.
4. Choose a stable identifier. Keep the slug separate if URLs can change.
5. Say which body format you need. Plain Markdown is enough for prose. Structured rich text earns its cost when you embed records or reuse blocks.
6. Leave presentation, scoring, and permissions out of the editorial record unless you have designed those systems on purpose.

**Portfolio example.** The public `verification` lesson is one editorial record: title, summary, analogy, takeaways, exercise, and sources. The slug, the answer key, prerequisites, and progress stay in code. The editor cannot rename that lesson into a different identity. That boundary is the modeling lesson, not a template to copy onto every page.

**Harbor Notes, fictional.** One article type has `id`, `title`, `summary`, `body`, and an `author` reference. The website and the newsletter both read that record and apply their own layouts. A title change does not mint a new id. A second copy of the HTML for each channel would.

**Field Ledger, fictional.** An explainer is editorial content. A collected source row is operational evidence: original URL, observation date, and rights. The explainer may cite a source id. It should not become the only copy of the evidence. A research database and a CMS can sit side by side. Putting both in one system is a choice you should justify, not a default.

## 4. Publishing, delivery, and caching

Publishing is a sequence. Skipping a step is how a "published" badge and the public page disagree.

**Git-backed path, this portfolio.** Edit the verification record in the local editor or in the file. Inspect the diff. Run the applicable checks. Review and merge. The site build publishes the page. Verify the rendered lesson. Hosted preview from Keystatic Cloud is not part of this pilot.

**API-first path, Harbor Notes, fictional.** Edit a draft. Preview the website and the newsletter. Obtain the editorial approval the team requires. Publish the record. The apps refresh their copy through a query, a webhook, a cache revalidation, or a rebuild. Verify each channel. "Published" in the CMS is not evidence that both channels updated.

Delivery has three common shapes. **Static generation** builds pages ahead of time. **Server rendering** builds a response when it is requested. **Revalidation** marks cached work stale so a later request or rebuild can refresh it. Next.js documents caching and on-demand revalidation.[6] This lesson does not claim which of those options the portfolio build enables. A content save still has to get through review and deploy before readers see it.

**Webhooks** tell another system that content changed. They can fail, retry, or arrive before the new record is readable. Treat them as a signal to refresh, then verify the page.

**Assets** have their own cache. Replacing an image file without changing its URL can leave the old image on a CDN. Alt text, rights, and size belong with the asset, not only in the article prose.

**Versioning and rollback.** WordPress stores revisions of a post and can restore one.[7] Git can revert a content commit. A hosted CMS may keep document history on a given plan; confirm that in the product you choose rather than assuming it. After any rollback, check the reader view. Restoring the editorial record does not by itself clear every cache.

Avoid two independently editable copies of the same lesson.

## 5. Security, governance, and operations

Editor authentication answers who may change content. Reader authorization answers who may retrieve it. A login on the editor does not make a public repository, public dataset, or generated page private.

Sanity's Free plan includes public datasets only. Private datasets are a Growth and Enterprise capability.[8] That matters before anyone puts restricted case studies in a hosted CMS.

A private page cannot protect data that is already in a public bundle, asset URL, or preview route. Review the repository, the CMS, APIs, assets, preview, and caches together. Never put write credentials in browser code.

**Governance that has to be operated, not only modeled:**

- Who may draft, who may publish, and who may roll back.
- How a preview is shared, and whether that URL is guessable.
- How long revisions and assets are kept.
- What a backup restore actually returns: content, references, and files.
- Which checks run before a content change reaches production.

On this portfolio, merging reviewed files is the publication decision. An editorial status field is a label. It is not an access-control switch. Use public or synthetic content for exercises. Keep employer and customer material out of a public content pilot.

## 6. CMS selection and build versus buy

Choose from the workflow you have, the number of channels, who edits, what must stay private, and how you would leave. Recheck prices and plan limits on the linked pages before you adopt anything. Figures below were observed on **2026-10-14**.

| Option           | Architectural approach, from the vendor                                                                                                                   | Illustrative fit (teaching synthesis, not a benchmark)                                    | Operational limit to plan for                                                                                                                                                         |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| No CMS, Git only | Authors edit Markdown, MDX, or JSON and review the diff.                                                                                                  | Editors are comfortable in Git and there is one site.                                     | No CMS subscription. Nontechnical editing and preview are weaker. Commits can still trigger builds.                                                                                   |
| Keystatic        | Edits Markdown, JSON, YAML, Markdoc, and MDX in the repo. Storage can be local files, GitHub, or Keystatic Cloud.[4][9][10] The core is MIT licensed.[11] | A form on top of files this repository already reviews.                                   | GitHub mode needs a GitHub App and write access.[9] Cloud's free plan allows up to 3 users per team. Pro starts at $10 per month; further users are $5 per month.[10]                 |
| TinaCMS          | Open-source and Git-backed. Content is Markdown, MDX, and JSON. TinaCloud is an optional hosted data layer and login; self-hosting is documented.[3][12]  | Git content plus a hosted editing login so editors need not all have GitHub accounts.     | The hosted free plan lists 2 users and 2 roles. Editorial workflow is on higher hosted plans.[13] Self-hosting still needs a database, auth, and a Git provider.[12]                  |
| Sanity           | Hosted content platform: schemas, Studio, APIs, and a content database, with the frontend separate.[5]                                                    | The same structured records feed several apps, and editors publish without a site deploy. | Free includes up to 20 seats, 2 roles, and 2 public datasets. Growth starts at $15 per seat per month and allows private datasets.[8] Budget API and asset usage, and plan an export. |
| Payload          | Open-source Next.js framework: admin, database, REST and GraphQL, auth, access control, and uploads. MIT licensed and self-hosted.[14][15]                | You want to own the app and can operate a database and hosting.                           | You run the database, file storage, upgrades, and backups. Hosted enterprise features are a separate commercial offer.[15]                                                            |
| WordPress        | Integrated publishing: drafts, scheduling, revisions, themes, and plugins.[1][7] A REST API can serve a separate frontend.[2]                             | Editors and the site live together, and you accept theme and plugin maintenance.          | You operate hosting, updates, and extensions. A plugin's behavior is not core WordPress.                                                                                              |

### A decision record, not a score

Write this down before you pick:

1. Who edits, and can they use Git?
2. How many real consumers need the same record?
3. What is public, and what must stay access-controlled?
4. What is the rollback, and how will you verify the reader view?
5. What is the exit: files you already have, or an export and a conversion of references and rich text?
6. What did the current pricing page say on the day you decided?

**Build versus buy** here means three kinds of cost. Adopting a hosted CMS buys an editor and operations you do not run, and you accept plan limits and an export project later. Self-hosting Payload or a Tina backend buys control and assigns you the database and upgrades. Staying on Git buys the review process you already have and assigns editors the files. None of these is free of maintenance.

For this Academy, extend a Git-backed editor only when content-only edits are a recurring burden, and only for public editorial text. Consider an API-first CMS when independent publishing or repeated reuse across apps is a concrete requirement. Several sites do not force that choice: shared Git content can also work.

## Exercises

The on-card lab gives immediate feedback for A, B, and C. The written prompts below are self-review. They are not auto-graded or saved. Use public or synthetic details only.

### A. CMS architecture decision

**Objective.** Justify Git-only, a Git-backed editor, or an API-first CMS for one stated workflow.

**Prompt.** A solo author maintains three public lessons, reviews pull requests, and edits wording weekly. There is no second app. A confidential appendix and learner completion records are also proposed.

**Self-review.** Git alone remains valid if editing is easy. A Git-backed editor such as Keystatic is a proportionate next step when the form is the missing piece, with review and builds kept. Sanity needs an additional reason, such as independent publishing or repeated reuse. Keep the confidential appendix out of public storage until an access-controlled design exists. Store learner records in the application system that already owns progress.

**What this verifies.** That you can match a tool to a stated workflow and refuse to put private or learner data in a public content store. It does not verify a live editor.

### B. Content-schema design

**Objective.** List fields, mark the stable ones, and use a reference instead of a copy.

**Prompt.** For a public lesson, list eight fields. Mark which must stay stable if the title changes. Say whether the author is copied text or a reference.

**Self-review.** Example: id, title, summary, prerequisites, body, exercise, sources, availability. Preserve the id and any references. The title and slug can change. Prerequisites are relationships to other ids, not a sentence that drifts. Interactive check behavior stays in code.

**What this verifies.** That you can tell identity from display fields. It does not validate a schema file.

### C. Editorial publishing and rollback

**Objective.** Name each step from draft to the page a reader sees, plus a rollback check.

**Prompt.** A title edit is wrong on the public page after the author says it was published. Write the checks, then the rollback.

**Self-review.** Confirm the saved record, the review or publish action, the build or revalidation, and the page itself. Roll back the content revision or the content commit, then load the page again. If a cache can still serve the old title, say so. Do not delete unrelated operational data to undo one title.

**What this verifies.** That you can tell a publish status from reader delivery. It does not prove a webhook or a backup restore.

### One measurable revisit trigger

Example: revisit the tool choice if a second editor joins, a second app needs the same article, or weekly edits are still hard after a month with the current process. Those are suggested triggers, not universal thresholds.

## Sources

Primary pages checked 2026-10-14. Product pages support capabilities and the prices named above. Scenarios, the decision record, and the exercises are original teaching synthesis.

1. [WordPress features](https://wordpress.org/about/features/), including drafts, scheduling, and revisions as described there. Revision behavior in detail: [WordPress revisions](https://wordpress.org/documentation/article/revisions/).
2. [WordPress REST API handbook](https://developer.wordpress.org/rest-api/).
3. [TinaCMS docs](https://tina.io/docs), including the Git-backed and headless description. Schema fields and references: [content modeling](https://tina.io/docs/schema).
4. [Keystatic introduction](https://keystatic.com/docs/introduction).
5. [Sanity documentation](https://www.sanity.io/docs) and [content modeling](https://www.sanity.io/content-modeling).
6. [Next.js caching](https://nextjs.org/docs/app/getting-started/caching) and [revalidating](https://nextjs.org/docs/app/getting-started/revalidating). Consulted against the Next.js docs shipped with this repository as well as the public guides.
7. [WordPress revisions](https://wordpress.org/documentation/article/revisions/).
8. [Sanity pricing](https://www.sanity.io/pricing). Free: up to 20 seats, 2 roles, 2 public datasets. Growth: $15 per seat per month, private datasets. Observed 2026-10-14.
9. [Keystatic GitHub mode](https://keystatic.com/docs/github-mode) and [local mode](https://keystatic.com/docs/local-mode).
10. [Keystatic Cloud](https://keystatic.com/docs/cloud). Free: up to 3 users per team. Pro from $10 per month; additional users $5 per month. Observed 2026-10-14.
11. [Keystatic repository, MIT license](https://github.com/thinkmill/keystatic).
12. [TinaCMS self-hosting](https://tina.io/docs/self-hosted/overview). The data layer's database is described there as an index over Git files.
13. [TinaCMS pricing](https://tina.io/pricing). Free: 2 users and 2 roles. Observed 2026-10-14. Higher plans and their workflow features change; use the live page.
14. [What is Payload?](https://payloadcms.com/docs/getting-started/what-is-payload)
15. [Payload get started](https://payloadcms.com/get-started), including the MIT license and self-hosting statement.
