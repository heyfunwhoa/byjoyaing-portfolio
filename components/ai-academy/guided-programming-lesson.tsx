"use client";

import { useState } from "react";
import { getGuidedLesson, scoreGuidedLesson } from "@/lib/academy/guided-lessons";

export function GuidedProgrammingLesson({ slug, onClose }: {slug:string;onClose:()=>void}) {
  const lesson=getGuidedLesson(slug);
  const [answers,setAnswers]=useState<Record<number,number>>({});
  if(!lesson) return null;
  const assessment=[lesson.activity,...lesson.checks];
  const result=scoreGuidedLesson(slug,answers);
  return <section aria-labelledby="guided-lesson-heading" className="mt-6 rounded-xl border-2 border-accent bg-card p-5 sm:p-8">
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div><p className="text-xs font-semibold uppercase tracking-wider text-accent">Guided lesson · {lesson.duration} minutes · Beginner</p><h3 id="guided-lesson-heading" className="font-display mt-2 text-3xl">{slug==="how-code-works"?"How Code Works":"Programming Concepts"}</h3></div>
      <button type="button" onClick={onClose} className="rounded-lg border border-border px-4 py-2 text-sm hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">Close lesson</button>
    </div>
    <h4 className="mt-6 font-semibold">What you will learn</h4><ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-7">{lesson.objectives.map(o=><li key={o}>{o}</li>)}</ul>
    <div className="mt-6 rounded-lg bg-background p-5"><h4 className="font-semibold">Think of it like this</h4><p className="mt-2 text-sm leading-7">{lesson.analogy}</p></div>
    {lesson.sections.map((section,i)=><article className="mt-7 border-t border-border pt-6" key={section.heading}>
      <p className="text-xs uppercase tracking-wider text-muted">Concept {i+1} / {lesson.sections.length}</p><h4 className="mt-2 text-xl font-semibold">{section.heading}</h4>
      <p className="mt-3 leading-7 text-muted">{section.explanation}</p>
      {section.code&&<div className="mt-4 rounded-lg border border-border bg-background p-4"><p className="text-xs text-muted">{section.exampleLabel} · example, not executed</p><pre className="mt-2 overflow-x-auto text-sm leading-6"><code>{section.code}</code></pre></div>}
      <p className="mt-3 text-sm leading-6"><strong>Key takeaway:</strong> {section.takeaway}</p>
    </article>)}
    <div className="mt-8 border-t border-border pt-6">
      <h4 className="text-xl font-semibold">Practice and knowledge check</h4>
      <p className="mt-2 text-sm text-muted">Select an answer to see the explanation. Nothing here runs code, and your answers are not saved.</p>
      <div className="mt-5 space-y-6">{assessment.map((q,i)=><fieldset key={q.question} className="rounded-lg border border-border p-4">
        <legend className="px-2 font-semibold">{i===0?"Practice":`Check ${i}`}</legend><p className="mb-3 leading-6">{q.question}</p>
        <div className="space-y-3">{q.choices.map((choice,j)=><label key={choice} className="flex cursor-pointer items-start gap-3 text-sm leading-6">
          <input className="mt-1 accent-accent" name={`guided-${slug}-${i}`} type="radio" checked={answers[i]===j} onChange={()=>setAnswers(a=>({...a,[i]:j}))}/>{choice}
        </label>)}</div>
        {answers[i]!==undefined&&<p role="status" className="mt-4 rounded-lg bg-background p-3 text-sm leading-6"><strong>{answers[i]===q.correct?"Correct. ":"Review: "}</strong>{q.explanation}</p>}
      </fieldset>)}</div>
      <p role="status" className="mt-5 text-sm font-semibold">{result.answered} of {result.total} answered · {result.score} correct{result.answered===result.total&&result.score===result.total?" · All checks passed in this session":""}</p>
      <h4 className="mt-7 font-semibold">Further reading</h4>
      <ul className="mt-2 space-y-2">{lesson.references.map(r=><li key={r.href}><a href={r.href} target="_blank" rel="noopener noreferrer" className="text-sm text-accent underline underline-offset-4">{r.label} ↗</a></li>)}</ul>
    </div>
  </section>;
}
