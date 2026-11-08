"use client";

import { useId, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { componentOptions } from "@/lib/component-options";

type Lesson = {
  id: string;
  title: string;
  family: string;
  definition: string;
  when: string;
  avoid: string;
  alternatives: { name: string; tradeoff: string }[];
  projects: { name: string; application: string }[];
  prompt: string;
  source: string;
};
const lessons: Lesson[] = [
  { id:"button", title:"Button", family:"Actions", definition:"A button tells the website to perform an action.", when:"Saving, submitting or opening a panel.", avoid:"Do not use a button just to navigate to another page. Use a link.", alternatives:[{name:"Text link",tradeoff:"Best for navigation, not actions."},{name:"Icon button",tradeoff:"Saves space but needs an accessible name."}],projects:[{name:"GTM Revenue OS",application:"Save a seller's campaign draft."},{name:"Builder Academy",application:"Check an exercise answer."}],prompt:"Can I identify the action and what happens afterward?",source:"https://ui.shadcn.com/docs/components/button"},
  { id:"card", title:"Card", family:"Content", definition:"A card groups related information into one scannable unit.", when:"Showing a project summary, account or learning module.", avoid:"Do not make every piece of content a card; too many borders hurt hierarchy.", alternatives:[{name:"Simple list",tradeoff:"More efficient for dense, similar records."},{name:"Data table",tradeoff:"Better for comparing many structured fields."}],projects:[{name:"Portfolio",application:"Project overview and outcome."},{name:"Account Signal Engine",application:"Account snapshot with dated evidence."}],prompt:"Does the grouping help someone decide what to inspect next?",source:"https://ui.shadcn.com/docs/components/card"},
  { id:"tabs", title:"Tabs", family:"Navigation", definition:"Tabs switch between peer views without leaving the current context.", when:"Switching between equivalent views of one subject.", avoid:"Do not hide critical content in unexplained tabs or use tabs for sequential steps.", alternatives:[{name:"Accordion",tradeoff:"Allows multiple sections to be expanded."},{name:"Separate pages",tradeoff:"Better for large, shareable sections."}],projects:[{name:"Security Market Map",application:"Switch buyer, vendor and evidence views."},{name:"GTM Revenue OS",application:"Review campaign overview, tasks and outcomes."}],prompt:"Are the views peers rather than steps in a process?",source:"https://ui.shadcn.com/docs/components/tabs"},
  { id:"accordion", title:"Accordion", family:"Disclosure", definition:"An accordion expands optional detail without leaving the page.", when:"FAQs, supporting rationale and advanced settings.", avoid:"Do not conceal the main takeaway or required instructions.", alternatives:[{name:"Tabs",tradeoff:"Switches one peer view at a time."},{name:"Always-visible content",tradeoff:"Better for short or essential information."}],projects:[{name:"Builder Academy",application:"Reveal an explanation after a knowledge check."},{name:"Technical Docs Platform",application:"Show implementation details on demand."}],prompt:"Can the reader complete the primary task while this is collapsed?",source:"https://ui.shadcn.com/docs/components/accordion"},
  { id:"search", title:"Search input", family:"Discovery", definition:"A search field lets someone find matching entries using words.", when:"Finding an account, design pattern or lesson in a growing collection.", avoid:"Do not require search when a short, organized list would be easier.", alternatives:[{name:"Filter chips",tradeoff:"Good for a few known categories."},{name:"Combobox",tradeoff:"Better for selecting one known value."}],projects:[{name:"Design Lab",application:"Find component families by name and task."},{name:"Account Signal Engine",application:"Find accounts and evidence."}],prompt:"Are empty results clear and is there a way to recover?",source:"https://ui.shadcn.com/docs/components/input"},
  { id:"feedback", title:"Status feedback", family:"Feedback", definition:"Feedback explains whether an action is pending, succeeded or failed.", when:"A form saves, a job runs or no results match.", avoid:"Do not rely only on a disappearing toast for important errors.", alternatives:[{name:"Inline message",tradeoff:"Persists near the affected field."},{name:"Toast",tradeoff:"Useful for short, noncritical confirmation."}],projects:[{name:"GTM Revenue OS",application:"Show whether campaign edits are saved."},{name:"Builder Academy",application:"Explain a correct or incorrect answer."}],prompt:"Can someone tell what happened without relying on color alone?",source:"https://ui.shadcn.com/docs/components/alert"},
];

function Demo({ type }: {type:string}) {
  const [pressed,setPressed]=useState(false);
  const [active,setActive]=useState("Overview");
  const [expanded,setExpanded]=useState(false);
  const [query,setQuery]=useState("");
  if(type==="button") return <div className="flex flex-wrap items-center gap-3"><Button onClick={()=>setPressed(true)}>Save example</Button><Button variant="outline" onClick={()=>setPressed(false)}>Reset</Button><span role="status" className="text-sm">{pressed?"Example saved locally.":"No changes saved."}</span></div>;
  if(type==="card") return <article className="max-w-xs rounded-xl border border-border bg-card p-4"><p className="text-xs text-muted">Example account</p><h4 className="mt-1 font-semibold">Northstar Security</h4><p className="mt-2 text-sm">Three signals to review before outreach.</p><Button variant="outline" className="mt-3" onClick={()=>setPressed(!pressed)}>{pressed?"Hide details":"Inspect details"}</Button>{pressed&&<p className="mt-2 text-sm" role="status">Evidence is illustrative, not a live account record.</p>}</article>;
  if(type==="tabs") return <div><div role="group" aria-label="Example views" className="flex gap-2">{["Overview","Evidence"].map(name=><button key={name} type="button" aria-pressed={active===name} onClick={()=>setActive(name)} className={"min-h-11 rounded-lg border px-4 text-sm "+(active===name?"bg-foreground text-background":"border-border")}>{name}</button>)}</div><div role="tabpanel" className="mt-3 rounded-lg border border-border p-3 text-sm">{active==="Overview"?"Summary of the example account.":"Dated sources would appear here."}</div></div>;
  if(type==="accordion") return <div className="rounded-lg border border-border p-3"><button className="flex min-h-11 w-full items-center justify-between text-left font-medium" aria-expanded={expanded} onClick={()=>setExpanded(!expanded)}>Why this design? <span aria-hidden="true">{expanded?"−":"+"}</span></button>{expanded&&<p className="mt-2 text-sm">The main answer stays visible. Extra reasoning is optional.</p>}</div>;
  if(type==="search") {const entries=["Card","Accordion","Button","Tabs"];const filtered=entries.filter(x=>x.toLowerCase().includes(query.toLowerCase()));return <div><label className="block text-sm font-medium" htmlFor="component-demo-search">Find a component</label><input id="component-demo-search" className="mt-2 min-h-11 w-full rounded-lg border border-border bg-card px-3" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search examples"/><p className="mt-2 text-xs text-muted" role="status">{filtered.length} matches</p><ul className="mt-2 text-sm">{filtered.map(x=><li key={x} className="py-1">{x}</li>)}</ul>{filtered.length===0&&<Button variant="outline" className="mt-2" onClick={()=>setQuery("")}>Clear search</Button>}</div>;}
  return <div className="flex flex-wrap items-center gap-3"><Button onClick={()=>setPressed(!pressed)}>{pressed?"Reset state":"Simulate save"}</Button><p role="status" className="text-sm">{pressed?"Example changes saved in this demo.":"No save attempted yet."}</p></div>;
}

export function ComponentLearning() {
  const [selected,setSelected]=useState("button");
  const [answer,setAnswer]=useState<"yes"|"no"|null>(null);
  const id=useId();
  const lesson=useMemo(()=>lessons.find(x=>x.id===selected)!,[selected]);
  return <section aria-labelledby={id+"-heading"} className="space-y-5">
    <div><p className="editorial-eyebrow text-accent">Learn by doing · UI/UX foundations</p><h2 id={id+"-heading"} className="mt-2 font-display text-2xl">Component learning explorer</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-muted">Start with six guided examples, then browse the broader existing options catalog below. Demos use fictional data and local-only state; learning examples are not production implementations.</p></div>
    <div className="grid gap-5 lg:grid-cols-[minmax(0,14rem)_minmax(0,1fr)]">
      <nav aria-label="Choose a component lesson" className="flex flex-wrap gap-2 lg:flex-col">{lessons.map(item=><button key={item.id} type="button" aria-current={selected===item.id?"true":undefined} onClick={()=>{setSelected(item.id);setAnswer(null);}} className={"min-h-11 rounded-lg border px-3 py-2 text-left text-sm "+(selected===item.id?"border-foreground bg-foreground text-background":"border-border bg-card")}>{item.title}</button>)}</nav>
      <article className="min-w-0 rounded-xl border border-border bg-card p-5">
        <p className="text-xs font-semibold text-accent">{lesson.family}</p><h3 className="mt-1 font-display text-xl">{lesson.title}</h3><p className="mt-2 text-sm leading-6">{lesson.definition}</p>
        <div className="mt-5 rounded-xl border border-border bg-background p-4"><p className="mb-3 text-xs font-medium text-muted">Try it · interactive example</p><Demo key={lesson.id} type={lesson.id}/></div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2"><div><h4 className="font-semibold">When to use it</h4><p className="mt-1 text-sm leading-6">{lesson.when}</p></div><div><h4 className="font-semibold">When not to</h4><p className="mt-1 text-sm leading-6">{lesson.avoid}</p></div></div>
        <h4 className="mt-5 font-semibold">Alternatives and tradeoffs</h4><ul className="mt-2 space-y-2">{lesson.alternatives.map(a=><li key={a.name} className="text-sm"><strong>{a.name}:</strong> {a.tradeoff}</li>)}</ul>
        <h4 className="mt-5 font-semibold">Where it fits your projects</h4><ul className="mt-2 space-y-2">{lesson.projects.map(p=><li key={p.name} className="text-sm"><strong>{p.name}:</strong> {p.application}</li>)}</ul>
        <div className="mt-5 rounded-xl border border-border p-4"><h4 className="font-semibold">Check your understanding</h4><p className="mt-2 text-sm">{lesson.prompt}</p><div className="mt-3 flex gap-2"><Button variant={answer==="yes"?"default":"outline"} onClick={()=>setAnswer("yes")}>I can explain it</Button><Button variant={answer==="no"?"default":"outline"} onClick={()=>setAnswer("no")}>Review again</Button></div>{answer&&<p role="status" className="mt-3 text-sm">{answer==="yes"?"Good. Try to explain the tradeoff in your own words before moving on.":"Review the example and alternatives. No completion is recorded."}</p>}</div>
        <a href={lesson.source} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex min-h-11 items-center text-sm text-accent underline">Read official component documentation (new tab)</a>
      </article>
    </div>
    <p className="text-xs leading-5 text-muted">The broader catalog currently contains {componentOptions.length} curated options. These six are the first lesson-level examples; other entries remain references until their demonstrations and comparisons are reviewed.</p>
  </section>;
}
