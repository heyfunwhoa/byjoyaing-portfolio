/**
 * Public editorial relationships, not a personal data warehouse or a deployed knowledge graph.
 * No private Joy Index records or automated cross-repository sync.
 */
export const publicStories = [
  {
    id: "enterprise-selling",
    title: "Navigating complex enterprise cybersecurity sales",
    area: "Enterprise Sales",
    context: "Strategic cybersecurity purchases bring together technical evaluation, business priorities and multiple decision makers.",
    contribution: "Led full-cycle strategic sales at Rapid7, including opportunities across large enterprise accounts. At Forcepoint, owned new-logo and expansion work across a multi-state enterprise territory.",
    execution: "Built account strategy around discovery and technical stakeholder requirements, coordinated commercial conversations and translated technical value for different buyers.",
    evidence: "Public experience timeline describes strategic sales through Fortune 100 accounts, a major 2022 threat-intelligence agreement at Rapid7, and Forcepoint\u2019s largest team web-security agreement in 2021. Specific deal amounts, customers and contractual details are intentionally withheld; company-level figures and personal attribution require independent approval before expansion.",
    takeaway: "Enterprise execution depends on aligning technical validity, the business case and stakeholder decisions without assuming a uniform procurement sequence.",
    related: [{label:"Experience and career history",href:"/experience"},{label:"Deal anatomy illustration",href:"/field-notes/enterprise-deal"}]
  },
  {
    id: "team-enablement",
    title: "Helping teams ramp and share expertise",
    area: "People & Leadership",
    context: "At Truffle Security, field expertise and onboarding needed to be easier to reuse across roles.",
    contribution: "Coached SDRs and newer sellers, created shared discovery and POC resources, and supported onboarding across sales and customer-facing teams.",
    execution: "Converted recurring discovery and evaluation questions into shared resources, and supported cross-functional onboarding across sales, solutions architecture and customer success.",
    evidence: "The experience timeline records two SDRs moving into closing roles and seven GTM hires onboarded; independently verify and approve those figures before publishing further detail.",
    takeaway: "Good enablement reduces dependence on one person holding all the context.",
    related: [{label:"Career timeline",href:"/experience"},{label:"Enablement side quest",href:"/work/truffle-camp"}]
  },
  {
    id:"competitive-evidence",
    title:"Turning competitive context into usable field guidance",
    area:"GTM Strategy",
    context:"Enterprise security sellers need defensible comparisons without turning unreviewed research into claims.",
    contribution:"Developed competitive briefs and field playbooks, organized source-backed positioning, and shared that guidance with teammates.",
    execution:"Collected relevant evidence, separated validated observations from assumptions, and packaged comparisons into repeatable guidance for sellers.",
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
  const requiredFields: readonly string[] = [story.title, story.context, story.contribution, story.execution, story.evidence, story.takeaway];
  if (requiredFields.some(value => value.trim().length === 0)) errors.push("Incomplete story: " + story.id);
  if(!story.related.length||story.related.some(link=>!link.href.startsWith("/")))errors.push("Invalid internal reference: "+story.id);
 }
 return errors;
}
