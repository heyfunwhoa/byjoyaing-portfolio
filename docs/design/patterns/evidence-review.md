# Evidence review: summary → source → next question

**Pattern ID:** `evidence-workflow` (existing canonical `lib/component-options.ts` entry)  
**Owner:** Portfolio Design Lab · `components/design-lab/evidence-review-pattern.tsx`  
**Status:** Local prototype in a stacked pull request, not approved or deployed in a consuming app.  
**Data:** Fictional fixtures only, `lib/design-lab/evidence-review.ts`. No external fetch, credentials or database writes.

## Why this pattern exists

Security research and GTM applications frequently need to help a reviewer answer three distinct questions:

1. **What is the summary?** Name the claim or working hypothesis, but visibly separate observations from interpretations.
2. **What is the evidence?** Show source identity, observation and review dates, missing/restricted data, and material limitations without implying that a source URL alone proves the claim.
3. **What happens next?** Show a useful human-review question, while retaining any evidence blockers. This local prototype previews that question; it does **not** approve, save, publish or send anything.

The baseline is a simple card with a summary and an external source link. The prototype adds an accessible source Sheet and a review gate with visible states, rather than adding data fetching or an agent.

## Implementation anatomy

| Layer | This prototype provides | Consuming application must own |
|---|---|---|
| Summary | Title, summary, separately labeled interpretation | Domain-language accuracy and actual records |
| Evidence | Source name, fixture reference, observed/reviewed dates, source observation, caveats | Authentic source URL/page, source access, provenance chain, freshness threshold, rights |
| Review state | Reviewed example, stale, missing, restricted | Review authorization, reviewer identity, time policy, audit history |
| Next action | Session-only preview of a human question | Real write/send permission, approval, action persistence, error/retry/undo |
| Accessibility | Native labeled selector, Radix Sheet, trigger focus return, visible text, keyboard-accessible buttons | Destination browser tests, screen-reader QA, product-specific semantics |
| Responsiveness | Stacked cards on phone; two columns on larger screens | Dense real records, long labels, scroll containment and loading behavior |

## Try the workbench

In the portfolio checkout, after the parent and child branches are available:

```bash
npm ci
npm run dev
# Open http://localhost:3000/design-lab and select "Try evidence review".
```

For isolated Storybook exercises:

```bash
npm run storybook
# Open http://127.0.0.1:6006, Design Lab / Evidence Review / Compare Review States.
```

**Four examples:** `reviewed` is a *fictional reviewed note*, not an actual validated observation; `stale` withholds current-decision readiness; `missing` shows no source; `restricted` never fabricates denied source content. All four can preview a next question without triggering a real workflow. Switching scenarios resets session-only preview state.

## Next potential consuming applications

| Destination | First narrowly scoped use | Boundary |
|---|---|---|
| Account Signal Engine | Existing owner-authorized account evidence detail and review state | Preserve account scoping, existing provider/budget gates, source IDs and write authorization |
| Security Market Map | Comparison claims → supporting source → limitations and review needed | Preserve original published source, evidence freshness and the unknown/not-evaluated distinction |
| Detector Coverage Atlas | Detector/analyzer assertion → source reference → review requirement | Never infer detector effectiveness from a status badge or a synthetic example |
| GTM Revenue OS | Seller hypothesis → cited evidence → an unanswered MEDDPICC question | Keep CRM changes and sales actions behind explicit permissions; copy only the presentation pattern |
| Builder Academy | Teach why source, interpretation, and action are separate | Keep synthetic tasks, accessible learning rubric and static fallback |

These are **possible adaptations**, not claims of installed source in other repositories. Each destination needs its own issue/PR, compatible component version, contract and review. No shared runtime package is proposed.

## Acceptance checks and stop gates

- [ ] Switching among all four states never creates a claim of authorization or verified truth.
- [ ] Sheet can open by keyboard, close with Escape, and return focus to its trigger.
- [ ] Missing/restricted evidence remains explicitly missing, including in the source detail.
- [ ] Preview question is deliberately labeled as a session-only demonstration, not sent or persisted.
- [ ] Phone/tablet/desktop browsing has no horizontal document overflow; motion is never necessary.
- [ ] Source links in the Design Lab component catalog point to exact local code; prototype status stays distinct from adopted/approved.
- [ ] Before reuse, the destination checks source rights, accessible controls, real data state, access control, tests and rollback.

**Do not promote directly to Approved or Adopted** from Storybook or green CI. An app owner must review a named use. A source-level import alone is not release evidence. If the consuming app needs a server-backed action, that implementation and its tests belong in the consuming repo.

**Rollback:** revert the prototype component, fixture, Storybook/visual tests, and the small existing-catalog metadata update. No production migration or external service cleanup is needed.

See [pattern library ownership and lifecycle](../pattern-library.md), [Technical Docs adoption standard](https://github.com/heyfunwhoa/technical-docs-platform/blob/main/engineering/ui-pattern-adoption-v1.md) and the existing [Design Lab source audit](../component-source-audit.md).
