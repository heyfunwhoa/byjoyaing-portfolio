# CMS fundamentals: when content needs an editor

Beginner · 20 minutes · Builder track · Sources checked 2026-10-13

Status: educational content, plus a local Keystatic pilot for three public Academy lesson cards. Complete Frontend building blocks first. The scenario and decision criteria below are original teaching synthesis, not a vendor benchmark.

## What you will learn

Explain a CMS, distinguish content from presentation and application data, compare storage and publishing models, and justify a small pilot using workflow, privacy and total cost.

## What is a CMS?

A content management system provides a place to create, organize, edit and publish content. An editor works with fields such as title, summary, body and image instead of changing a page component for every wording update. Features and approval workflows differ by product and plan. WordPress illustrates an integrated publishing system; Sanity illustrates structured content with a separate frontend.[1][2]

A **schema** defines the allowed fields and types. A **content record** fills them in. A **reference** links one record to another. A **slug** is a URL-friendly name; keep a stable ID separately if other lessons or saved progress depend on it. **Assets** are files such as images. **Preview** shows proposed content before publication. These concepts help separate editorial changes from interface changes.

For a lesson, fields might include stable ID, title, summary, prerequisites, body, exercise, sources, source-review date and availability. The website's components decide how to render them. Review dates support maintenance; they do not prove a claim is correct.

## The main approaches

These are overlapping dimensions, not exclusive product categories. Headless describes separation from presentation; Git-based describes storage; hosted versus self-managed describes operations.

| Approach | What happens | Example | Tradeoff |
| --- | --- | --- | --- |
| Files without a CMS | Authors edit Markdown, MDX or structured data directly and review changes in Git | Existing repository workflow | Few additional services; less comfortable for nontechnical editors |
| Integrated CMS | Content editing and site presentation are commonly managed together | WordPress with themes | Convenient publishing; maintenance and extensions still need ownership [1] |
| Git-based CMS | An editor saves content as repository files | Keystatic | Fits version control; builds and review policies still matter [3] |
| Hosted headless CMS | An editor manages structured records; a separate app retrieves them | Sanity | Content can serve separate frontends; requires integration and quota management [2] |
| Self-managed headless CMS | You operate the CMS and its infrastructure | Payload | Control and customization with operational responsibility [4] |

A CMS may use a database internally. A database alone does not provide an editorial interface. A CMS also does not automatically replace an LMS, CRM, authentication service, research collection pipeline or learner-progress store.

## Trace a publishing change

For a Git-based implementation: edit a lesson → save files to a branch → review the diff → run applicable checks → merge → build/deploy → verify the published page. The integration must be configured to preserve review; an editor does not automatically enforce a PR policy.

For a hosted implementation: edit a draft → preview → obtain required editorial approval → publish the record → refresh the website's content → verify the page. Depending on the app, that refresh may use an API request, cache revalidation or a rebuild. Publishing in a CMS does not guarantee every cached page immediately changes.

Both paths need a rollback plan. Reverting a Git commit or restoring a content revision still requires checking the resulting reader experience. Avoid two independently editable copies of the same lesson.

## Keystatic or Sanity?

| Decision | Keystatic | Sanity |
| --- | --- | --- |
| Content location | Local or GitHub files [3] | Hosted structured content database [2] |
| Illustrative fit | One Academy with repository review | Shared editorial content across several frontends |
| Starting economics | Open-source core; operating costs remain [5] | Free hosted plan within quotas [6] |
| What to evaluate | File formats, editor access, branch/review flow and build triggers | Content model, access roles, API usage, preview and cache behavior |
| Exit planning | Retain files and document how they render | Plan exports and conversion of structured records, references and rich text |

This Academy runs a **three-lesson Keystatic pilot** for `cms-fundamentals`, `reading-code-and-yaml`, and `frontend-building-blocks`. Start it with `KEYSTATIC_LOCAL=true npm run dev` and open `/keystatic`. The editor writes JSON files under `content/academy/lessons/`. The slug is the filename and stays stable. Publish by committing those files and passing the existing pull-request checks. `/keystatic` responds with 404 unless `KEYSTATIC_LOCAL=true`, and that variable stays off on Vercel. Interactive challenge behavior and learner progress stay in application code.

Consider Sanity when independent editorial publishing or recurring content reuse across apps becomes a concrete requirement. Multiple sites alone do not force that choice: shared Git content can also work, and both approaches require integration.

For a research hub, one possible architecture keeps collected evidence, entity relationships and change history in its research database, with curated explainers in a CMS. This is a design recommendation, not a restriction on what a CMS can store. Do not automatically publish collected material without source and rights review.

## Free options and real costs

Pricing snapshot, checked 2026-10-13; recheck linked plans before adoption:

- **No CMS:** no new CMS subscription; existing hosting and build costs remain.
- **Keystatic:** MIT-licensed core. Optional cloud services have their own plan limits.[5][7]
- **TinaCMS:** its hosted free plan lists two users and two roles; editorial workflow features are on higher plans.[8]
- **Sanity:** Free lists up to 20 seats and two public datasets. Growth starts at $15 per seat per month and supports private datasets. Quotas and additional usage affect cost.[6]
- **Payload:** open-source and self-hostable; budget for infrastructure and maintenance.[4]

Total cost includes subscription, editor seats, hosting, database/storage, API traffic, image delivery, builds, backups, updates and migration effort. A free CMS does not fix a GitHub Actions budget problem: file commits may trigger existing workflows. Preserve required checks when evaluating build efficiency.

## Privacy and access

Editor authentication answers who can edit. Reader authorization answers who can retrieve content. A private page cannot protect data already exposed through a public dataset, repository, asset URL or generated bundle. Sanity's public-only Free datasets are relevant when considering restricted case studies.[6]

Use only public or synthetic content for the pilot. Before handling restricted material, review the repository, CMS, APIs, assets, preview routes and caching together. Never place write credentials in browser code. Keep employer and customer material outside a personal public-content pilot.

## Practice: a fictional Academy

A solo author maintains three public lessons, uses PR review, updates wording weekly and has no cross-app publishing requirement. A confidential customer appendix and learner completion records are also proposed.

1. List eight lesson fields and identify which should remain stable.
2. Choose Git alone, Keystatic or Sanity and justify it using the stated workflow.
3. Trace a title edit from draft to verified publication. Name a rollback step.
4. Decide where the confidential appendix and learner records belong.
5. Write one measurable trigger for revisiting your choice.

### Self-review answer key

1. Example: ID, title, summary, prerequisites, body, exercise, sources and availability. Preserve IDs and reference relationships; a title can change without changing identity.
2. Git alone remains valid if editing is easy. Keystatic is a proportionate pilot if editor friction is real. Sanity needs an additional justification such as independent publishing or repeated reuse; it is not inherently wrong.
3. Edit a branch, review the diff, run checks, merge, deploy and inspect the actual page. Roll back the content revision and verify the reader sees the intended version.
4. Keep the confidential appendix out of public storage pending an access-controlled design. Store learner records in an appropriately protected application system, not public lesson files.
5. Example: revisit after four weeks if editing remains burdensome, a second editor joins, or another app needs the same content. These are suggested review triggers, not universal thresholds.

Reading is reviewed content; completing the written exercise is self-reported practice; the in-app multiple-choice result is a narrow knowledge check. None proves a production CMS is securely configured. Written answers are not automatically graded or saved by this guide.

## Sources

Primary references checked 2026-10-13. Product documentation supports the capabilities above; the pilot recommendation and exercises are original synthesis.

1. [WordPress features](https://wordpress.org/about/features/)
2. [Sanity documentation: content platform, schemas and Studio](https://www.sanity.io/docs)
3. [Keystatic introduction](https://keystatic.com/docs/introduction) and [GitHub mode](https://keystatic.com/docs/github-mode)
4. [Payload: self-hosting/get started](https://payloadcms.com/get-started)
5. [Keystatic repository and MIT license](https://github.com/thinkmill/keystatic)
6. [Sanity pricing and dataset availability](https://www.sanity.io/pricing)
7. [Keystatic Cloud](https://keystatic.com/docs/cloud)
8. [TinaCMS pricing](https://tina.io/pricing)
