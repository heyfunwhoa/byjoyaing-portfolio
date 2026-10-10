import type { Metadata } from "next";
import { PageMain } from "@/components/page-main";
import { WorkStoryTemplate } from "@/components/work-story-template";
import { BuildStoryTemplate } from "@/components/build-story-template";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Two Ways to Tell the Work — Portfolio Design",
  description: "A demonstration of distinct editorial templates for commercial leadership and independently built software.",
};

export default function StorytellingGuide() {
  return <PageMain><div className="py-12 sm:py-16">
    <p className="editorial-eyebrow text-accent">Portfolio design / Editorial templates</p>
    <h1 className="editorial-title mt-3">Two kinds of work. Two ways to tell the story.</h1>
    <p className="editorial-intro my-6 text-muted">This page demonstrates reusable case-study structures using fictional examples. They are not customer outcomes, employment claims or deployed products.</p>
    <div className="grid gap-8">
      <WorkStoryTemplate story={{
        title:"A complex enterprise decision",
        context:"Illustrative sales and leadership case study. Focus on buyer problems and individual ownership rather than generic methodology.",
        role:"Fictional enterprise seller facilitating an evaluation",
        collaborators:"Fictional security engineering, finance and executive stakeholders",
        challenge:"A buying committee needs to reconcile technical requirements, risk, change management and a commercial timeline.",
        decisions:["Map distinct decision makers and outcomes","Define a transparent technical evaluation","Create an executive-ready decision narrative"],
        evidence:["Illustrative stakeholder map","Synthetic evaluation milestones","Example decision criteria"],
        outcomes:["A clear decision framework, not a claimed closed deal","Reflection on tradeoffs and team alignment"],
        caveat:"Demonstration only; no actual customer information or invented revenue figures.",
      }} />
      <BuildStoryTemplate story={{
        title:"An evidence-backed research prototype",
        stage:"Illustrative concept",
        problem:"How might an analyst connect security detector facts to market categories without treating marketing as verification?",
        architecture:"A public-safe data registry maps source IDs, dates, technical methods and limitations to each concept.",
        sources:["Fictional source metadata","Public standards and repository documentation only"],
        implementation:["A typed model for claims and provenance","A small educational interface"],
        limitations:["No real credential scanning","No automated third-party integration"],
        next:["Test source validation","Review the user experience on mobile"],
      }} />
    </div>
    <Link href="/experience" className="editorial-link mt-8 inline-block text-sm font-semibold text-accent underline">Return to professional work →</Link>
  </div></PageMain>;
}
