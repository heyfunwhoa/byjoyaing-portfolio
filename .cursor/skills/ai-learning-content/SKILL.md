---
name: ai-learning-content
description: Design and review beginner-first AI lessons, task workflows, prompts and skill recommendations for the AI Enablement Academy.
---
# AI Learning Content Skill

## When to use
When adding or improving academy lessons, GTM workflows, model-selection guidance, prompts or skill descriptions in this repository.

## Workflow
1. Read `docs/ai-academy.md` and inspect `lib/ai-academy.ts` before edits. Identify the learner's level and actual task.
2. Define one observable learning outcome. Teach a concept using: definition → analogy → example → pitfall → exercise → knowledge check.
3. Prioritize practical ChatGPT, Claude, Cursor and Notion workflows; offer alternatives when grounded in task needs. Distinguish app, model, prompt, skill and agent.
4. For any factual claims cite primary sources; record last checked date for model availability, pricing, policy or vendor capability claims. Don't invent evidence.
5. Use fictional/public exercise inputs. Never add credentials, customer content or private Truffle information to public files.
6. Keep the content typed in `lib/ai-academy.ts`; maintain accessible controls, empty states and existing design tokens. Avoid unnecessary dependencies.
7. Test normal and edge cases. Run lint/build when possible; review the diff and document any checks not run.
8. Keep edits focused on a feature branch and PR. Update documentation and applicable source links.

## Quality bar
- Beginner can understand with no prior technical background.
- Experienced learner can advance to a practical workflow.
- Recommendation describes why, constraints, trade-offs and a validation step.
- No unsupported claim that a model is best or that tools/agents executed.
- No sensitive information or permission escalation.
- One canonical source per skill; Notion links to GitHub rather than duplicating instructions.

## Notion references
- Command Center: https://app.notion.com/p/3f3cdefaec758139a149ef6b77d14f03
- Prompting Handbook: https://app.notion.com/p/3f3cdefaec758176be84e740fac358f7
