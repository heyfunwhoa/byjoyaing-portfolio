# Maintain and publish the playbooks

[Track home](README.md)

## Tool ownership

| Tool                             | Authoritative purpose                                        |
| -------------------------------- | ------------------------------------------------------------ |
| Notion                           | Internal context and requests; links to canonical guides     |
| Linear                           | Scope, priority, owner, review deadline and publication work |
| Private company repository       | Company guide source and reviewed revisions                  |
| Company docs platform            | Customer-facing approved publication                         |
| This public portfolio repository | Original fictional teaching material only                    |

This is a proposed workflow, not an installed integration. Do not copy employer content into the portfolio. A company adaptation is a separate review and publication decision.

## Linear project proposal

Name: Customer Evaluation and Buying Playbooks.

Issue flow: Backlog → Drafting → Technical/content review → Ready to publish → Published. A merged PR moves to Ready to publish; it does not itself prove publication or access control.

Each issue: audience; customer problem; deliverable; author; technical reviewer; legal/security reviewer when applicable; acceptance criteria; source PR; published URL; revision; review date; access classification.

Suggested issues:

1. Deployment decision guide and architecture: reviewer confirms placement, flows and product support.
2. POC charter and scorecard: criteria distinguish pass/fail/inconclusive/not tested.
3. Executive brief and mutual action plan: owners, dependencies and buyer agreement explicit.
4. Procurement literacy: document purposes and approval ownership reviewed.
5. Security-review packet: evidence scope, sharing and risk-owner decisions explicit.
6. Executive readout and handoff: limits, decisions and safe closeout covered.
7. Publish and verify: approved revision, correct audience access and working links.

These are templates for issues, not claims that Linear records were created.

## Maintenance

Each guide has a stable ID, owner, audience, source/version, last reviewed date, next review date and published revision. Review conceptual guides at a proposed quarterly checkpoint and sooner when supported options, privacy obligations or internal process changes. Product-specific commands and permissions need their own tighter review triggers.

Keep a single maintained content source. If publishing manually, record source commit and published revision together. Never automatically copy private notes, completed customer worksheets or legal advice into external docs. Verify restricted pages and attachments through the intended customer access path before declaring them published.
