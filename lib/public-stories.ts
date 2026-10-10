/**
 * Public editorial relationships, not a personal data warehouse or a deployed knowledge graph.
 * No private Joy Index records or automated cross-repository sync.
 */
export const publicStories = [
  {
    id: "team-enablement",
    title: "Helping teams ramp and share expertise",
    area: "People",
    context: "At Truffle Security, field expertise and onboarding needed to be easier to reuse across roles.",
    contribution: "Coached SDRs and newer sellers, created shared discovery and POC resources, and supported onboarding across sales and customer-facing teams.",
    evidence: "The experience timeline records two SDRs moving into closing roles and seven GTM hires onboarded; independently verify and approve those figures before publishing further detail.",
    takeaway: "Good enablement reduces dependence on one person holding all the context.",
    related: [{label:"Career timeline",href:"/experience"},{label:"Enablement side quest",href:"/work/truffle-camp"}]
  },
  {
    id:"competitive-evidence",
    title:"Turning competitive context into usable field guidance",
    area:"Strategy",
    context:"Enterprise security sellers need defensible comparisons without turning unreviewed research into claims.",
    contribution:"Developed competitive briefs and field playbooks, organized source-backed positioning, and shared that guidance with teammates.",
    evidence:"Professional artifacts are summarized in the competitive-intelligence case study; underlying employer documents aren't reproduced publicly.",
    takeaway:"Useful GTM narratives distinguish confirmed findings from hypotheses.",
    related:[{label:"Field approach",href:"/work/competitive-intelligence-engine"},{label:"Career timeline",href:"/experience"}]
  }
] as const;

export function validatePublicStories() {
 const ids=new Set<string>();
 const errors:string[]=[];
 for(const story of publicStories){
  if(ids.has(story.id))errors.push("Duplicate story: "+story.id);
  ids.add(story.id);
  const requiredFields: readonly string[] = [story.title, story.context, story.contribution, story.evidence, story.takeaway];
  if (requiredFields.some(value => value.trim().length === 0)) errors.push("Incomplete story: " + story.id);
  if(!story.related.length||story.related.some(link=>!link.href.startsWith("/")))errors.push("Invalid internal reference: "+story.id);
 }
 return errors;
}
