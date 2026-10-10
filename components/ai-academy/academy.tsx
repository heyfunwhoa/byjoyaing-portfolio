"use client";
import { useMemo, useState } from "react";
import { lessons, workflows, type Track } from "@/lib/ai-academy";
const tracks=["All","Foundations","Prompting","Responsible AI","GTM","Builder"] as const;
const button="rounded-lg border border-border px-3 py-2 text-sm transition hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";
export function Academy(){
  const [tab,setTab]=useState<"learn"|"apply"|"skills">("learn");
  const [track,setTrack]=useState<(typeof tracks)[number]>("All");
  const [active,setActive]=useState(lessons[0].slug);
  const [answer,setAnswer]=useState<number|null>(null);
  const [completed,setCompleted]=useState<string[]>([]);
  const [query,setQuery]=useState("");
  const [category,setCategory]=useState("All");
  const [selected,setSelected]=useState(workflows[0].title);
  const lesson=lessons.find(l=>l.slug===active)??lessons[0];
  const filtered=useMemo(()=>lessons.filter(l=>track==="All"||l.track===track),[track]);
  const matches=useMemo(()=>workflows.filter(w=>(category==="All"||w.category===category)&&`${w.title} ${w.summary} ${w.asset}`.toLowerCase().includes(query.toLowerCase())),[category,query]);
  const workflow=workflows.find(w=>w.title===selected)??workflows[0];
  function complete(){setCompleted(s=>s.includes(lesson.slug)?s:[...s,lesson.slug]);}
  async function copy(s:string){await navigator.clipboard.writeText(s);}
  return <main className="mx-auto w-full max-w-6xl px-5 pb-24 pt-12 sm:px-8">
    <div className="mb-10 max-w-3xl">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[.2em] text-accent">AI / Enablement / Field guide</p>
      <h1 className="font-display text-5xl leading-tight sm:text-6xl">Learn the basics. Apply with purpose.</h1>
      <p className="mt-4 text-lg leading-8 text-muted">A practical path from understanding AI to using better prompts, choosing workflows and building reusable skills. Start small. Verify what matters.</p>
    </div>
    <div className="mb-8 grid gap-3 sm:grid-cols-3">
      <div className="rounded-xl border border-border bg-card p-5"><p className="text-xs uppercase tracking-widest text-muted">Curriculum</p><p className="mt-2 text-3xl font-semibold">{lessons.length} lessons</p><p className="mt-1 text-sm text-muted">From fundamentals to building</p></div>
      <div className="rounded-xl border border-border bg-card p-5"><p className="text-xs uppercase tracking-widest text-muted">Your progress</p><p className="mt-2 text-3xl font-semibold">{completed.length} / {lessons.length}</p><p className="mt-1 text-sm text-muted">In this session (not saved)</p></div>
      <div className="rounded-xl border border-border bg-card p-5"><p className="text-xs uppercase tracking-widest text-muted">Practice</p><p className="mt-2 text-3xl font-semibold">{workflows.length} workflows</p><p className="mt-1 text-sm text-muted">Prompts, tasks and skills</p></div>
    </div>
    <nav aria-label="Academy sections" className="mb-7 flex flex-wrap gap-2 border-b border-border pb-4">
      {([["learn","01 / Learn AI"],["apply","02 / Apply AI"],["skills","03 / Build skills"]] as const).map(([id,name])=><button key={id} type="button" aria-current={tab===id?"page":undefined} className={`${button} ${tab===id?"bg-foreground text-background":""}`} onClick={()=>setTab(id)}>{name}</button>)}
    </nav>
    {tab==="learn"&&<div className="grid gap-7 lg:grid-cols-[18rem_minmax(0,1fr)]">
      <aside aria-label="Lessons" className="space-y-3">
        <label className="block text-sm font-semibold" htmlFor="track">Learning track</label>
        <select id="track" value={track} onChange={e=>{const t=e.target.value as typeof track;setTrack(t);const l=lessons.find(x=>t==="All"||x.track===t);if(l){setActive(l.slug);setAnswer(null)}}} className="w-full rounded-lg border border-border bg-card p-3 text-sm">{tracks.map(t=><option key={t}>{t}</option>)}</select>
        <div className="space-y-2">{filtered.map((l,i)=><button type="button" key={l.slug} onClick={()=>{setActive(l.slug);setAnswer(null)}} className={`w-full rounded-lg border p-3 text-left transition focus-visible:outline-2 focus-visible:outline-accent ${active===l.slug?"border-accent bg-card":"border-border hover:bg-card"}`}>
          <span className="text-xs text-muted">{String(i+1).padStart(2,"0")} · {l.track} · {l.minutes} min</span><span className="mt-1 block font-semibold">{l.title} {completed.includes(l.slug)?"✓":""}</span></button>)}</div>
      </aside>
      <article className="rounded-xl border border-border bg-card p-6 sm:p-9">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent">{lesson.level} · {lesson.track} · {lesson.minutes} minutes</p>
        <h2 className="font-display mt-2 text-4xl">{lesson.title}</h2><p className="mt-4 leading-7 text-muted">{lesson.summary}</p>
        <div className="my-7 rounded-lg bg-background p-5"><h3 className="font-semibold">Think of it like this</h3><p className="mt-2 leading-7">{lesson.analogy}</p></div>
        <h3 className="font-semibold">What you should remember</h3><ul className="mt-3 list-disc space-y-2 pl-5">{lesson.takeaways.map(t=><li key={t}>{t}</li>)}</ul>
        <div className="mt-7 border-t border-border pt-6"><h3 className="font-semibold">Try it yourself</h3><p className="mt-2 leading-7">{lesson.exercise}</p></div>
        <fieldset className="mt-7 rounded-lg border border-border p-4"><legend className="px-2 font-semibold">Knowledge check</legend><p className="mb-3">{lesson.check.question}</p>{lesson.check.choices.map((c,i)=><label key={c} className="mb-2 flex cursor-pointer items-start gap-2 text-sm"><input className="mt-1 accent-accent" type="radio" name={lesson.slug} checked={answer===i} onChange={()=>setAnswer(i)}/>{c}</label>)}{answer!==null&&<p role="status" className="mt-3 rounded bg-background p-3 text-sm"><strong>{answer===lesson.check.answer?"Correct.":"Try again."}</strong> {lesson.check.explanation}</p>}</fieldset>
        <div className="mt-6 flex flex-wrap items-center gap-3"><button className="rounded-lg bg-accent px-5 py-3 font-semibold text-accent-foreground disabled:opacity-50" disabled={answer!==lesson.check.answer} onClick={complete}>Mark lesson complete</button><span className="text-xs text-muted">Session-only progress · no account required</span></div>
        <div className="mt-7 border-t border-border pt-5"><p className="text-sm font-semibold">Learn more</p>{lesson.sources.map(s=><a key={s.url} href={s.url} target="_blank" rel="noopener noreferrer" className="mt-2 block text-sm text-accent underline">{s.label} ↗</a>)}</div>
      </article>
    </div>}
    {tab==="apply"&&<section aria-label="Workflow finder">
      <div className="mb-6 max-w-2xl"><h2 className="font-display text-4xl">Start with your task</h2><p className="mt-2 text-muted">Choose the problem first. The tool, prompt and eventual skill come second. These are starting recommendations—not validated winners.</p></div>
      <div className="mb-5 flex flex-wrap gap-3"><input aria-label="Search workflows" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search a task or workflow…" className="min-w-0 flex-1 rounded-lg border border-border bg-card p-3"/><select aria-label="Category" value={category} onChange={e=>setCategory(e.target.value)} className="rounded-lg border border-border bg-card p-3">{["All","GTM","Research","Coding","Productivity"].map(c=><option key={c}>{c}</option>)}</select></div>
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]"><div className="space-y-3">{matches.length===0&&<p role="status" className="rounded-lg border p-5">No matching workflows. Try another search.</p>}{matches.map(w=><button key={w.title} onClick={()=>setSelected(w.title)} className={`block w-full rounded-xl border p-5 text-left hover:border-accent ${selected===w.title?"border-accent bg-card":"border-border"}`}><span className="text-xs text-muted">{w.category} · {w.difficulty}</span><h3 className="mt-1 font-semibold">{w.title}</h3><p className="mt-2 text-sm text-muted">{w.summary}</p></button>)}</div>
      <article className="rounded-xl border border-border bg-card p-6"><p className="text-xs font-semibold uppercase tracking-widest text-accent">Workflow recommendation</p><h3 className="font-display mt-2 text-3xl">{workflow.title}</h3><dl className="mt-6 space-y-3 text-sm"><div><dt className="font-semibold">Start with</dt><dd>{workflow.tool}</dd></div><div><dt className="font-semibold">Reusable asset</dt><dd>{workflow.asset}</dd></div><div><dt className="font-semibold">Why this approach</dt><dd className="text-muted">{workflow.why}</dd></div><div><dt className="font-semibold">Next step</dt><dd className="text-muted">{workflow.next}</dd></div></dl><div className="mt-6 rounded-lg bg-background p-4"><p className="mb-3 font-semibold">Starter prompt</p><p className="whitespace-pre-wrap text-sm leading-6">{workflow.prompt}</p></div><button onClick={()=>copy(workflow.prompt)} className="mt-4 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground">Copy starter prompt</button></article></div>
    </section>}
    {tab==="skills"&&<section className="max-w-4xl"><h2 className="font-display text-4xl">Turn useful work into reusable skills</h2><p className="mt-3 leading-7 text-muted">You don’t need a skill for every prompt. Promote a process once it repeats, needs consistent outputs and can be evaluated.</p><div className="mt-8 grid gap-4 md:grid-cols-3">{[["01","Prompt","One clear assignment with expected output."],["02","Skill","A versioned procedure with inputs, steps and checks."],["03","Agent","A workflow that can use tools within explicit permissions."]].map(([n,title,desc])=><div className="rounded-xl border border-border bg-card p-5" key={n}><p className="text-sm text-accent">{n}</p><h3 className="mt-2 text-xl font-semibold">{title}</h3><p className="mt-3 text-sm leading-6 text-muted">{desc}</p></div>)}</div><div className="mt-7 rounded-xl border border-border bg-card p-6"><h3 className="font-semibold">Where everything belongs</h3><p className="mt-3 leading-7"><strong>Notion</strong> teaches and indexes. <strong>Cursor</strong> develops and tests. <strong>GitHub</strong> stores canonical skill files and version history.</p><div className="mt-5 flex flex-wrap gap-4 text-sm"><a className="text-accent underline" target="_blank" rel="noopener noreferrer" href="https://app.notion.com/p/3f3cdefaec758139a149ef6b77d14f03">Open AI Command Center ↗</a><a className="text-accent underline" target="_blank" rel="noopener noreferrer" href="https://app.notion.com/p/3f3cdefaec758176be84e740fac358f7">Prompting & Skills Handbook ↗</a></div></div></section>}
    <footer className="mt-14 border-t border-border pt-5 text-xs leading-6 text-muted">Educational prototype · No login, model API calls or persistent progress in this version. Review privacy requirements before using internal data. Sourced references are linked in lessons; model-specific comparisons require evaluation.</footer>
  </main>;
}
