"use client";

import { useState } from "react";
import Link from "next/link";
import { curriculum, technologies, findTechnology } from "@/lib/academy/programming";
import { GuidedProgrammingLesson } from "@/components/ai-academy/guided-programming-lesson";
import { getGuidedLesson } from "@/lib/academy/guided-lessons";

const kindOptions = ["All","Programming language","Query language","Markup","Stylesheet","Shell","UI library","Framework","Runtime","Platform"] as const;
const questions = [
  {q:"Which one is a runtime rather than a programming language?",choices:["Node.js","Python","TypeScript"],answer:0,why:"Node.js runs JavaScript outside the browser; Python and TypeScript are languages."},
  {q:"Why might TypeScript flag a problem that JavaScript accepts?",choices:["It automatically hosts the app","It checks declared types before execution","It replaces HTML"],answer:1,why:"TypeScript adds static checking to JavaScript. Type annotations don't run in the browser."},
  {q:"Which technology is used to query relational database records?",choices:["CSS","SQL","React"],answer:1,why:"SQL expresses queries for relational data; CSS styles content and React builds interfaces."},
];
export function ProgrammingFoundations(){
  const [selection,setSelection] = useState("javascript");
  const [kind,setKind] = useState<string>("All");
  const [search,setSearch] = useState("");
  const [showLessons,setShowLessons] = useState(true);
  const [activeGuided,setActiveGuided] = useState<string|null>(null);
  const [answers,setAnswers] = useState<Record<number,number>>({});
  const selected = findTechnology(selection) ?? technologies[0];
  const visible = technologies.filter(t=>(kind==="All"||t.kind===kind)&&(`${t.name} ${t.summary} ${t.usage}`).toLowerCase().includes(search.toLowerCase()));
  const score=questions.filter((q,i)=>answers[i]===q.answer).length;
  return <main className="mx-auto w-full max-w-6xl px-5 pb-24 pt-12 sm:px-8">
    <nav aria-label="Breadcrumb" className="text-sm text-muted"><Link href="/ai-academy" className="underline underline-offset-4">AI Academy</Link> <span aria-hidden="true">/</span> Programming Foundations</nav>
    <header className="mt-9 max-w-3xl">
      <p className="text-xs font-semibold uppercase tracking-[.2em] text-accent">Builder Academy / Programming Foundations</p>
      <h1 className="font-display mt-3 text-4xl sm:text-6xl">Learn the languages behind the things you build.</h1>
      <p className="mt-4 text-lg leading-8 text-muted">Start with programming concepts, see what JavaScript, TypeScript, Python, SQL and web technologies actually do, then apply them to your own projects. You don&apos;t need to learn every language at once.</p>
    </header>
    <section aria-labelledby="paths-heading" className="mt-12">
      <div className="flex flex-wrap items-center justify-between gap-3"><h2 id="paths-heading" className="font-display text-3xl">Learning path</h2><button type="button" className="rounded-lg border border-border px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent" aria-expanded={showLessons} aria-controls="curriculum" onClick={()=>setShowLessons(v=>!v)}>{showLessons?"Collapse lessons":"Show lessons"}</button></div>
      <p className="mt-2 text-sm text-muted">The first two lessons are guided tutorials with practice questions. The remaining modules are planned. Examples are illustrative and do not execute code.</p>
      {showLessons&&<ol id="curriculum" className="mt-5 grid gap-3 md:grid-cols-2">{curriculum.map((l,i)=><li key={l.slug} className="rounded-xl border border-border bg-card p-5"><p className="text-xs font-medium text-accent">LESSON {String(i+1).padStart(2,"0")} · {getGuidedLesson(l.slug)?"Guided lesson available":"Planned"}</p><h3 className="mt-2 font-semibold">{l.title}</h3><p className="mt-2 text-sm leading-6 text-muted">{l.objective}</p><p className="mt-3 text-sm"><strong>Practice:</strong> {l.practice}</p><p className="mt-2 text-xs text-muted">Prerequisites: {l.prerequisites.length?l.prerequisites.join(", "):"None"}</p>{getGuidedLesson(l.slug)&&<button type="button" onClick={()=>setActiveGuided(l.slug)} className="mt-4 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent" aria-label={`Open guided lesson: ${l.title}`}>Open guided lesson →</button>}</li>)}</ol>}
      {activeGuided&&<GuidedProgrammingLesson key={activeGuided} slug={activeGuided} onClose={()=>setActiveGuided(null)}/>}
    </section>
    <section aria-labelledby="explorer-heading" className="mt-14">
      <h2 id="explorer-heading" className="font-display text-3xl">Language & technology explorer</h2>
      <p className="mt-2 text-sm text-muted">Languages, frameworks, libraries, runtimes and platforms are different categories. Compare what each does and where it fits.</p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <label className="text-sm font-medium">Search technologies<input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search JavaScript, Python, runtime..." className="mt-2 w-full rounded-lg border border-border bg-card p-3 text-base"/></label>
        <label className="text-sm font-medium">Category<select value={kind} onChange={e=>setKind(e.target.value)} className="mt-2 w-full rounded-lg border border-border bg-card p-3 text-base">{kindOptions.map(k=><option key={k}>{k}</option>)}</select></label>
      </div>
      <div className="mt-5 grid gap-6 lg:grid-cols-[16rem_minmax(0,1fr)]">
        <div aria-label="Technologies" className="flex flex-col gap-2">{visible.map(t=><button type="button" key={t.id} aria-pressed={selected.id===t.id} onClick={()=>setSelection(t.id)} className={`rounded-lg border p-3 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${selected.id===t.id?"border-accent bg-card":"border-border hover:bg-card"}`}><span className="block font-semibold">{t.name}</span><span className="text-xs text-muted">{t.kind}</span></button>)}{visible.length===0&&<p role="status" className="rounded-lg border border-border p-4 text-sm">No results. Try another search or category.</p>}</div>
        <article aria-live="polite" className="min-w-0 rounded-xl border border-border bg-card p-5 sm:p-7">
          <p className="text-xs font-semibold uppercase tracking-wider text-accent">{selected.kind}</p>
          <h3 className="font-display mt-2 text-3xl">{selected.name}</h3>
          <p className="mt-3 leading-7">{selected.summary}</p>
          <h4 className="mt-5 font-semibold">Why it matters</h4><p className="mt-2 text-sm leading-6 text-muted">{selected.why}</p>
          <h4 className="mt-4 font-semibold">Where you might use it</h4><p className="mt-2 text-sm leading-6 text-muted">{selected.usage}</p>
          <div className="mt-5 rounded-lg border border-border bg-background p-4"><p className="mb-2 text-xs text-muted">{selected.filename} · illustrative example, not a live code runner</p><pre className="overflow-x-auto text-sm leading-6"><code>{selected.example}</code></pre></div>
          <p className="mt-4 text-xs text-muted">Related: {selected.related.map(id=>findTechnology(id)?.name??id).join(" · ")||"None"}</p>
          <a className="mt-4 inline-block text-sm font-medium text-accent underline underline-offset-4" href={selected.source} target="_blank" rel="noopener noreferrer">Read official documentation ↗</a>
        </article>
      </div>
    </section>
    <section aria-labelledby="quiz-heading" className="mt-14 rounded-xl border border-border bg-card p-5 sm:p-8">
      <h2 id="quiz-heading" className="font-display text-3xl">Check your understanding</h2>
      <p className="mt-2 text-sm text-muted">Three quick questions. Progress is session-only and isn&apos;t saved.</p>
      <div className="mt-6 space-y-7">{questions.map((q,i)=><fieldset key={q.q}><legend className="font-semibold">{i+1}. {q.q}</legend><div className="mt-3 space-y-2">{q.choices.map((choice,j)=><label key={choice} className="flex cursor-pointer items-start gap-3 text-sm"><input type="radio" className="mt-1 accent-accent" name={`programming-question-${i}`} checked={answers[i]===j} onChange={()=>setAnswers(x=>({...x,[i]:j}))}/>{choice}</label>)}</div>{answers[i]!==undefined&&<p className="mt-3 text-sm leading-6 text-muted" role="status"><strong>{answers[i]===q.answer?"Correct. ":"Review: "}</strong>{q.why}</p>}</fieldset>)}</div>
      <p role="status" className="mt-6 border-t border-border pt-4 text-sm font-semibold">{Object.keys(answers).length} of 3 answered · {score} correct</p>
    </section>
    <p className="mt-8 text-xs text-muted">Educational prototype. Examples are static and do not execute code. No user accounts, saved quiz results or database writes.</p>
  </main>;
}
