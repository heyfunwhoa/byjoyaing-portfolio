# Builder Academy: Data Foundations pathway

**Status:** proposed curriculum pathway / curriculum mapping only. **Audience:** complete beginners learning what data is before JSON, contracts, APIs or databases. **Owning learning platform:** existing Builder Academy, currently served under `/ai-academy`. **No new app, lesson registration, runtime, new package, progress tracking or publication is included in this curriculum-only update.**

## Why add this path

The existing Builder Academy program introduces files, reading code and JSON/YAML, SQL, API/MCP and systems engineering. It does not yet offer one coherent no-prerequisites sequence from **what data is** to **how it is structured, validated, modeled, stored, exchanged and changed**. Fill that gap without cloning existing lessons.

**North-star learning outcome:** A beginner can take a fictional vendor-tool request, explain the raw facts and context, organize records, decide which data should live where, model business-unit/role/workflow relationships, inspect a simple JSON definition, identify a schema or contract violation, and explain how an app/version change differs from a workflow change.

## Prerequisite graph and lesson map

| ID | Proposed lesson and key concepts | Prior knowledge | Status / content decision | Demonstrable learner outcome |
| --- | --- | --- | --- | --- |
| DF-01 | **What is data?** Facts, observations, values, context, information vs evidence, provenance, metadata | None | **New foundational guided lesson to author** | Annotate a fictional tool request as data, context, source and unverifiable assumption |
| DF-02 | **How computers represent data** Bits/bytes at a conceptual level; text encodings, numbers, Booleans, files, types | DF-01 | **New bridge lesson**; reuse existing programming foundations for types | Explain why `5000`, `"5000"` and `true` are not interchangeable |
| DF-03 | **Fields, records, collections and relationships** Keys, values, tables, identifiers, one-to-many and many-to-many | DF-01; DF-02 recommended | **New bridge with SQL cross-link** | Turn a vendor request into fields/records; link a request to a requesting function |
| DF-04 | **Structured, semi-structured and unstructured data** Tables, CSV, JSON, YAML, text, documents and images; examples and limitations | DF-03 | **Short new comparison**, reuse reading-code/YAML guide | Choose sensible representations for a questionnaire, contract PDF and risk findings |
| DF-05 | **Read and write structured data** JSON/YAML syntax, nesting, arrays, parser errors vs semantic errors | DF-03, DF-04 | **Reuse existing reading-code-and-yaml lesson**; add explicit data path entry and cross-links | Spot a malformed JSON value and explain valid syntax vs valid business meaning |
| DF-06 | **Data modeling** Entities, attributes, unique IDs, cardinality, normalization basics, time/history and system of record | DF-03, DF-05 | **New guided exercise**, reuse SQL and CMS content-modeling references | Draw a function → role → workflow relationship without duplicating people records |
| DF-07 | **Schemas, validation and data contracts** Schema vs example, required fields, referential rules, meaning, ownership, acceptance, compatibility | DF-05, DF-06 | **New guided lesson and deterministic validation lab planned**; cross-link Systems Engineering | Explain why a schema can reject missing owner but cannot authorize human approval |
| DF-08 | **Databases and SQL** Persistence, relational tables, SQL, querying, constraints vs file storage | DF-06 | **Reuse existing SQL Programming Foundations and database guides** | Query fictional requests; distinguish definitions from operational instances |
| DF-09 | **APIs and data exchange** HTTP request/response, JSON payload, REST/webhooks/MCP/SDK boundaries | DF-05, DF-07; DF-08 helpful | **Reuse existing API/MCP resources** after basic HTTP prerequisite | Trace a fictional request between a UI, API and store; explain schema vs authorization |
| DF-10 | **Versions, migrations and governance** Workflow-definition version vs schema version vs app release; backward compatibility, provenance, PII, changes | DF-07, DF-08 | **New integrating capstone**, reuse Git/CI and systems roadmap | Evaluate an additive field, breaking rename and controlled rollout/migration |

**Teaching rule:** do not block reading foundational material on learning a programming language. The SQL and API lessons are optional deeper branches until the learner reaches their respective lesson in the path.

## Reuse existing Academy materials, do not duplicate

- [Unified Academy program](../academy/PROGRAM.md) remains the overarching pathway and ownership decision.
- [Curriculum audit](../academy/CURRICULUM-AUDIT.md) tracks lesson status and staged expansion; registration != full lesson != deployed experience.
- [Programming Foundations](../ai-academy/programming-foundations.md) gives types, objects, arrays and SQL; ten topic modules are not automatically full guided lessons.
- [Existing code/files/JSON/YAML lesson](../academy/CURRICULUM-AUDIT.md) is the foundation for DF-05. Verify exact live lesson slug and availability before adding links or progress prerequisites.
- [Systems Engineering roadmap](../academy/SYSTEMS-ENGINEERING-ROADMAP.md) owns the later data engineering, migration, contract/provenance and integration depth.
- [Databases, branching and recovery](../builder-academy/databases-branching-recovery-and-selection.md) and [API/MCP companion](../builder-academy/api-mcp-progressive-lab.md) provide optional deeper reading.
- The [Operating Model Workbench PR #74](https://github.com/heyfunwhoa/technical-docs-platform/pull/74) provides a **fictional application case study**. It is not an approved customer workflow or deployed backend, and may evolve independently.

## One continuous fictional case

**Scenario:** Marketing wants to procure an analytics tool. Initially the learner sees an unstructured message: "We need analytics software, budget about 5000, needed next month." No real customer or employer data.

1. **DF-01:** separate observed words from assumptions; ask 5000 what currency, what period, who supplied the request, and when.
2. **DF-02–03:** encode a `requested_amount` number, `currency` string, `requires_review` boolean and a stable `request_id`; distinguish the request from the business-unit reference.
3. **DF-04–05:** present a JSON request, CSV export, narrative email, and NDA PDF; distinguish structured values from documents and links.
4. **DF-06:** connect `business_unit_id`, `request_id`, `process_id`, `step_id` and `reviewer_role_id`; keep actual people external to public fixtures.
5. **DF-07:** validate required IDs and referenced function keys; do not infer a human's approval from matching fields.
6. **DF-08–09:** contrast static JSON files, stored request instances, SQL queries and API request/response boundaries.
7. **DF-10:** add optional privacy-review applicability in a later definition, compare workflow and schema versions, and explain when old instances need migration or revalidation.

**Final capstone:** With a fictional input and schema, draw a mini data model, validate two deliberately invalid records, choose file versus database, identify who could approve the process in a real system, and propose a non-breaking versioned change. Provide a visible answer key and deterministic feedback when developed.

## Proposed lesson shape and release requirements

Each guided lesson should include: no-jargon definition, one analogy, worked example, common misconception, small learner interaction, feedback with correct/incorrect/unknown explanations, role/context use cases, source references where applicable, and a link to the next lesson. Aim for short foundations and optional deeper explanations rather than making ten mandatory large labs.

Progress indicators must distinguish: **planned** (outline only), **registered** (catalog entry), **guided** (worked content and exercise), **practiced** (learner completed exercise), **verified** (validated assessment evidence), and **deployed** (independently confirmed route/release). The first three describe content; the last three require distinct evidence and should not be conflated.

**Pilot acceptance:** DF-01 has no prerequisites; DF-05 reuses existing source; no duplicate lesson IDs or broken paths; all examples are fictional; students can explain the differences between data, a schema, a contract, a workflow definition, an actual workflow instance and human approval. Add no backend, account storage, cost-generating APIs or orchestration just for this path.

## Implementation order, after curriculum review

1. Register a clear Data Foundations path in Academy navigation using existing lesson IDs where possible; do not declare completion of outline lessons.
2. Author DF-01 and DF-02 as short guided beginner lessons, then DF-03/04/06/07 where current gaps remain.
3. Build one deterministic validation exercise: valid JSON syntax vs schema validity vs business authorization.
4. Connect existing DF-05/08/09 lessons with visible prerequisites and resume/next steps.
5. Use the Operating Model Workbench as an optional applied capstone after the foundations, not an entry prerequisite.
6. Run content integrity, prerequisite graph, typecheck, unit tests and browser/mobile/keyboard review before owner acceptance and merge.

**Non-goals for this PR:** writing/registering all ten lessons, changing runtime routes, changing current catalog counts, implementing the workbench schema, creating a new Academy or declaring live release.
