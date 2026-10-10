# Account Signal research slice

One public LimaCharlie documentation page becomes a stored snapshot and a brief. This is not the whole Account Signal Engine.

## What already existed

This portfolio repository had no research ingestion, no database, no language-model call, and no test script. Account Intelligence in `lib/portfolio.ts` is a designed case study. It names a private repository, `account-signal-engine`, and providers such as Sumble, Exa, and Claude. That repository did not resolve from this environment on 10 October 2026. Those providers are not called here.

A different public repository, `security-market-map`, has manual source intake and Firecrawl/Exa adapters. Those adapters throw unless a person configures a key, and nothing calls them at startup. This slice does not copy that code. The market map is a category guide. This slice is an account research record.

## What this slice does

`ingestPublicSnapshot` in `lib/account-signal/pipeline.ts`:

1. Accepts a snapshot: URL, extraction time, body, and a provenance note.
2. Rejects anything that is not `https` on `limacharlie.io`, an empty body, a missing date, a missing provenance note, a null byte, or an unclosed script.
3. Hashes the saved bytes with SHA-256.
4. Stores the first snapshot in a `ResearchStore`.
5. Returns `duplicate` when the same URL and the same hash arrive again.
6. Returns `conflict` when the same URL arrives with a different hash, and leaves the first snapshot in place.
7. Builds a brief whose verified lines are quotations from the snapshot. Hypotheses are labeled. Pricing, customers, funding, and headcount stay in the unavailable list.

The page at `/account-signal` runs that function on the committed fixture. It is marked `noindex`. It is not in the primary navigation.

The fixture is the article, title, and meta description from `https://docs.limacharlie.io/1-getting-started/what-is-limacharlie/`, retrieved 10 October 2026. The full response was about 211KB of documentation chrome. That chrome is not in the fixture. The hash is of the file we saved, not of the full response. A later live fetch would be a new snapshot and would conflict with this one until a person decides which hash stands.

## Decisions

| Decision | Why | Alternative |
| --- | --- | --- |
| Fixture instead of a live HTTP call in tests and in the page | CI must pass without the network, and a saved page can be re-read. | Fetch during `next build`. That fails when the docs site moves and makes the hash unstable. |
| In-memory store interface | This app has no database. Tests need a store. A later Supabase or file adapter can implement the same three methods. | Add a database now. That is a second project. |
| Conflict keeps the first snapshot | Last write wins hides disagreement. Research needs a person to resolve two hashes. | Overwrite. Faster, and wrong for evidence. |
| No language model | A model can phrase a sentence that the page did not say. Quotations cannot. | Send the page to an API. That spends money and mixes inference with facts. |
| Host allowlist | The body is untrusted data. A snapshot of some other site must not enter this LimaCharlie record. | Accept any URL. That is a later, explicit choice. |

## How to verify

```bash
npm test
npm run lint
npm run build
```

Then open `/account-signal`. The content hash should match `npm test` output for the fixture. Quotes on the page should appear in the fixture file.

## What to learn next

- A second page should add a row, not a new pipeline.
- Persistence across deploys needs an adapter. Do not invent production signals before that exists.
- Identity resolution here is "the allowed host and the name both appear." It is not a company graph.
- A Cursor skill worth extracting later: save a public page as a fixture with URL, date, hash, and a note about what was omitted. An academy module worth teaching: evidence, hypothesis, and unknown are three different sentences.
