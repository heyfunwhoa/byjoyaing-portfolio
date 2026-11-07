/** Local, fictional plan-review data. No provider/network calls. */
export const iacPlans = [
  { id:"private-preview", title:"Plan A: private preview storage", change:"Create one private preview bucket with seven-day retention. Production is unchanged.", decision:"candidate", feedback:"Candidate for authorized review, not approval to apply. Verify the environment, IAM permissions, retention, cost, state and approval." },
  { id:"public-exposure", title:"Plan B: public access", change:"Create public preview storage and change a production network rule to public.", decision:"stop", feedback:"Stop. The proposal exposes resources and changes production networking beyond the requirement. Correct the configuration and review a fresh plan." },
  { id:"database-delete", title:"Plan C: destructive database change", change:"Create private preview storage, but delete the production notes database.", decision:"stop", feedback:"Stop and escalate. This destructive production database change was not authorized. Verify resource identity, state, dependencies and recovery." },
] as const;
export type IacPlanId = (typeof iacPlans)[number]["id"];
export function explainIacChoice(id: string) { return iacPlans.find(p => p.id === id) ?? null; }
