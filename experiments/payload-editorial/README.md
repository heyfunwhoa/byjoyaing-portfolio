# Payload CMS editorial comparison (KRU-231)

**Status:** source-only synthetic experiment; **NOT an installed or running Payload CMS**. No live content, database, credentials, website or editor has been changed. This folder deliberately has no package.json and is excluded from app imports.

## Why this experiment

Payload's customizable Next.js admin, drafts, version diffing, structured relationships and access control may be useful for Field Notes, Academy lessons, and GTM assets. But the existing portfolio uses **Keystatic** with local/Git storage and review metadata. The burden of a new authenticated CMS + database must produce a measurable editor benefit to justify adoption.

Official sources checked 2026-11-07:
- [Payload requirements](https://payloadcms.com/docs/getting-started/installation): Node `^22.23.4 || >=24.22.1`, Next.js `16.2.6+`, supported React, SQLite/Postgres/MongoDB.
- [Admin UI](https://payloadcms.com/docs/admin/overview) and [collections](https://payloadcms.com/docs/configuration/collections).
- [SQLite adapter](https://payloadcms.com/docs/database/sqlite), [versions](https://payloadcms.com/docs/versions/overview), [access control](https://payloadcms.com/docs/access-control/overview).
- Current portfolio `package.json` on main at inspection: Next.js `16.4.3`, React `19.3.1`; Keystatic installed. **Compatible Next version alone does not establish full integration compatibility.** The runtime Node version in a future isolated sandbox is not assessed.

## Scope

[fictional-content-models.json](fictional-content-models.json) is an **evaluation schema** (not a Payload `CollectionConfig` and not deployable). It names three candidate collection families, synthetic examples and role boundaries:

1. **Field Notes:** slug, title, source citations, body, approval and versions.
2. **Builder Academy:** stable ID, learning objective, rich content, practice and reviewed sources.
3. **GTM creative assets:** persona, buyer stage, source/provenance, creative brief and approvals.

Validation uses `node experiments/payload-editorial/validate.mjs`, no external dependencies. It proves JSON shape and *intent*, not actual Payload authentication, role enforcement, local storage, UI usability, or content publication.

## Isolated runnable demo, optional next execution gate

When a maintainer explicitly chooses to test the actual interface, create a **separate disposable local directory outside this repository**. Follow the [official Payload initializer](https://payloadcms.com/docs/getting-started/installation), choose an official supported Next.js template, and use the SQLite adapter for local-only storage. Pin versions and lockfile at trial time rather than guessing in this template. Use a *fresh generated secret only in local env*, no production credentials. Bind to localhost; never publish a publicly accessible admin URL, connect a real CMS source or sync customer/account records.

Translate one of the fictional models to actual Payload `CollectionConfig` definitions only after checking upstream API signatures. Configure an admin user and an editor user, with **server-enforced** read/update/publish restrictions. Do not assume a hidden admin UI button enforces permission.

Stop if the trial needs cloud hosting, external service charges, real customer content, permission bypass, incompatible Node/Next versions or migrates existing Keystatic files.

## Evaluation worksheet

| Dimension | Keystatic current baseline | Payload candidate | Evidence to collect |
| --- | --- | --- | --- |
| Edit flow | Existing Git-backed/local editor | Admin collection editing | Steps/time for fictional article edit |
| Schema | Existing typed singletons/collections | Collection config + migration | Fields/relationships successfully modeled |
| Draft/review | Current editorial status metadata and PR process | Drafts, versions and roles | Recorded draft→review→approved state and publish denial |
| Preview | Current app routes | Admin preview and version diff | Screenshot on phone and desktop; no production routing |
| Media | Current assets | Media collection/storage adapters | One tiny fictional image, ownership/retention |
| Privacy | No new DB in baseline | Auth + database + storage | Denied editor publish, unauthenticated read, redacted logs |
| Maintenance | Existing Next/Keystatic deps | Additional Payload/db adapter/runtime upgrades | Actual install size, DB backups, security scan, time |
| Cost | Existing known baseline | Local SQLite or optional hosting | Measured local resource footprint and verified hosted pricing |
| Exit | Keep as-is | Adopt isolated, adapt UI, or defer | Decision and reasons, not popularity |

### Acceptance evidence

- AC-01: **Passed for Next version only** from main manifest and upstream requirements. Node runtime and full compatibility **not tested**.
- AC-02: **Documented** three fictional content models in the checked-in JSON.
- AC-03: **Not run** Payload initialization, server, database, migrations or admin interface.
- AC-04: **Not run** human edit/preview/review flows, keyboard/phone QA or permissions enforcement.
- AC-05: **Pending** hands-on Keystatic vs Payload usability and cost scoring.
- AC-06: **Pending** final CI and owner review of this proposed draft PR.

No deploy, purchase, real data ingestion, current editor migration or merging is authorized. Roll back by deleting this experiments folder and reverting its PR. Always recheck actual upstream terms and installed versions before a runnable trial.
