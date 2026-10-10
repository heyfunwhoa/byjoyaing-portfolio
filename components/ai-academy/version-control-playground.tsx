"use client";

import Link from "next/link";
import { useState } from "react";

import { scenarios, quiz, quizScore, quizComplete, isCorrectScenarioAnswer } from "@/lib/version-control";
import type { CaseId, Strategy } from "@/lib/version-control";

function Dot({ text, shade }: { text: string; shade: "base" | "feature" }) {
  return <span className={`inline-flex min-h-10 items-center rounded-full border px-3 py-2 text-xs font-semibold ${shade === "base" ? "border-border bg-background" : "border-accent bg-card"}`}>{text}</span>;
}

export function VersionControlPlayground() {
  const [strategy, setStrategy] = useState<Strategy>("rebase");
  const [caseId, setCaseId] = useState<CaseId>("lint");
  const [caseAnswer, setCaseAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [steps, setSteps] = useState<string[]>([]);
  const [revealCommands, setRevealCommands] = useState(false);

  const scenario = scenarios[caseId];
  const correctCount = quizScore(answers);
  const allAnswered = quizComplete(answers);
  const practiceTasks = [
    { id: "inspect", label: "Inspect a practice branch and read git status" },
    { id: "update", label: "Fetch the latest remote commits and rebase a disposable branch" },
    { id: "verify", label: "Run lint/build on the exercise branch and inspect the output" },
    { id: "reflect", label: "Write down what changed and why" },
  ];

  return <main id="main-content" className="mx-auto w-full max-w-5xl px-5 pb-24 pt-12 sm:px-8">
    <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted">
      <Link className="underline underline-offset-4 hover:text-foreground" href="/ai-academy">AI Academy</Link>
      <span aria-hidden="true"> / </span> Version Control Playground
    </nav>
    <header className="max-w-3xl">
      <p className="text-xs font-semibold uppercase tracking-widest text-accent">Builder Academy · Beginner · Interactive practice</p>
      <h1 className="font-display mt-3 text-4xl leading-tight sm:text-6xl">Version Control Playground</h1>
      <p className="mt-4 text-lg leading-8 text-muted">Practice Git branching, rebasing, merging, pull requests, and CI troubleshooting. This is a safe simulation: it does not run Git commands, change repositories or send your answers anywhere.</p>
    </header>

    <section aria-labelledby="timeline-title" className="mt-12 rounded-xl border border-border bg-card p-5 sm:p-8">
      <h2 id="timeline-title" className="font-display text-3xl">1. See what changes in Git</h2>
      <p className="mt-2 text-sm leading-6 text-muted">Your feature branch began before main received a form-code fix. Choose a Git operation and compare the resulting history.</p>
      <fieldset className="mt-5">
        <legend className="mb-2 text-sm font-semibold">Choose an operation</legend>
        <div className="flex flex-wrap gap-2">
          {([
            ["rebase", "Rebase"],
            ["merge", "Merge main into branch"],
            ["squash", "Squash and merge PR"],
          ] as const).map(([id, label]) => <label key={id} className={`cursor-pointer rounded-lg border px-4 py-3 text-sm focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-accent ${strategy === id ? "border-accent bg-background" : "border-border"}`}>
            <input type="radio" className="mr-2 accent-accent" name="operation" checked={strategy === id} onChange={() => setStrategy(id)} />{label}
          </label>)}
        </div>
      </fieldset>
      <div className="mt-6 space-y-4" aria-live="polite">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted">Before</p>
          <div className="flex flex-wrap items-center gap-2"><Dot text="A · Base" shade="base"/><span aria-hidden="true">→</span><Dot text="B · Main fix" shade="base"/><span className="text-xs text-muted">main</span></div>
          <div className="ml-4 mt-2 flex flex-wrap items-center gap-2 border-l-2 border-accent pl-4"><Dot text="C · Your change" shade="feature"/><span className="text-xs text-muted">feature, branched at A</span></div>
        </div>
        <div className="border-t border-border pt-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted">After</p>
          {strategy === "rebase" && <><div className="flex flex-wrap items-center gap-2"><Dot text="A" shade="base"/><span>→</span><Dot text="B" shade="base"/><span>→</span><Dot text="C′ · Replayed" shade="feature"/></div><p className="mt-3 text-sm leading-6">Your change is replayed on top of the main fix. C′ is a new commit ID. The feature PR is still unmerged.</p></>}
          {strategy === "merge" && <><div className="flex flex-wrap items-center gap-2"><Dot text="A" shade="base"/><span>→</span><Dot text="B · Main" shade="base"/></div><div className="mt-2 flex flex-wrap items-center gap-2"><Dot text="C · Feature" shade="feature"/><span>↗</span><Dot text="M · Merge commit" shade="feature"/></div><p className="mt-3 text-sm leading-6">Your original commits stay intact. A merge commit combines main&apos;s newer work into your feature branch.</p></>}
          {strategy === "squash" && <><div className="flex flex-wrap items-center gap-2"><Dot text="A" shade="base"/><span>→</span><Dot text="B" shade="base"/><span>→</span><Dot text="S · Feature changes" shade="feature"/></div><p className="mt-3 text-sm leading-6">Once the PR is approved, its net changes are saved as one new commit on main. This operation finishes integration rather than updating your open branch.</p></>}
        </div>
      </div>
    </section>

    <section aria-labelledby="ci-title" className="mt-7 rounded-xl border border-border bg-card p-5 sm:p-8">
      <h2 id="ci-title" className="font-display text-3xl">2. Diagnose a CI failure</h2>
      <label htmlFor="ci-scenario" className="mt-4 block text-sm font-semibold">Pick a simulated CI result</label>
      <select id="ci-scenario" className="mt-2 w-full rounded-lg border border-border bg-background p-3" value={caseId} onChange={e => { setCaseId(e.target.value as CaseId); setCaseAnswer(null); }}>
        {(Object.keys(scenarios) as CaseId[]).map(k => <option value={k} key={k}>{scenarios[k].name}</option>)}
      </select>
      <div className="mt-4 rounded-lg border border-border bg-background p-4 text-sm leading-7" role="note">{scenario.symptom}</div>
      <fieldset className="mt-5 space-y-3">
        <legend className="mb-2 font-semibold">What&apos;s the safest next action?</legend>
        {scenario.choices.map((choice, i) => <label key={choice} className="flex cursor-pointer gap-3 rounded-lg border border-border p-3 text-sm leading-6 focus-within:outline-2 focus-within:outline-accent">
          <input type="radio" name="ci-answer" className="mt-1 accent-accent" checked={caseAnswer === i} onChange={() => setCaseAnswer(i)} />{choice}
        </label>)}
      </fieldset>
      {caseAnswer !== null && <p role="status" className="mt-4 rounded-lg bg-background p-4 text-sm leading-6"><strong>{isCorrectScenarioAnswer(caseId, caseAnswer) ? "Correct." : "Not quite."}</strong> {scenario.explanation}</p>}
    </section>

    <section aria-labelledby="quiz-title" className="mt-7 rounded-xl border border-border bg-card p-5 sm:p-8">
      <h2 id="quiz-title" className="font-display text-3xl">3. Check your understanding</h2>
      <p className="mt-2 text-sm text-muted">These questions evaluate concepts, not your ability to memorize commands.</p>
      <div className="mt-6 space-y-7">{quiz.map((q, index) => <fieldset key={q.question}>
        <legend className="font-semibold">{index + 1}. {q.question}</legend>
        <div className="mt-3 space-y-2">{q.options.map((option, i) => <label key={option} className="flex cursor-pointer gap-3 text-sm leading-6"><input type="radio" name={`quiz-${index}`} className="mt-1 accent-accent" checked={answers[index] === i} onChange={() => setAnswers(s => ({ ...s, [index]: i }))} />{option}</label>)}</div>
        {answers[index] !== undefined && <p className="mt-3 text-sm leading-6 text-muted"><strong>{answers[index] === q.correct ? "Correct. " : "Review: "}</strong>{q.why}</p>}
      </fieldset>)}</div>
      <p aria-live="polite" className="mt-6 rounded-lg bg-background p-4 text-sm font-semibold">{allAnswered ? `Knowledge check: ${correctCount} of ${quiz.length} correct` : `Answered ${Object.keys(answers).length} of ${quiz.length}`}</p>
    </section>

    <section aria-labelledby="practice-title" className="mt-7 rounded-xl border border-border bg-card p-5 sm:p-8">
      <h2 id="practice-title" className="font-display text-3xl">4. Practice in a real repository</h2>
      <p className="mt-2 text-sm leading-6 text-muted">Use a disposable branch. The toggles below are personal session notes, not proof of Git activity or persisted progress.</p>
      <button type="button" className="mt-4 rounded-lg border border-border px-4 py-2 text-sm font-medium hover:border-accent focus-visible:outline-2 focus-visible:outline-accent" onClick={() => setRevealCommands(s => !s)} aria-expanded={revealCommands} aria-controls="git-commands">{revealCommands ? "Hide" : "Show"} safe practice commands</button>
      {revealCommands && <pre id="git-commands" className="mt-4 overflow-x-auto rounded-lg bg-background p-4 text-xs leading-6"><code>{`git status
git fetch origin
git switch main
git pull --ff-only
git switch -c learn/rebase-demo
# Edit a throwaway Markdown file, then:
git add path/to/practice.md
git commit -m "docs: practice Git"
git fetch origin
git rebase origin/main
git log --oneline --graph -8
# If a conflict occurs:
# git status
# edit files; git add <resolved-file>
# git rebase --continue
# or git rebase --abort`}</code></pre>}
      <div className="mt-5 space-y-3">{practiceTasks.map(task => <label key={task.id} className="flex cursor-pointer items-start gap-3 text-sm leading-6"><input className="mt-1 accent-accent" type="checkbox" checked={steps.includes(task.id)} onChange={e => setSteps(s => e.target.checked ? [...s, task.id] : s.filter(x => x !== task.id))} />{task.label}</label>)}</div>
      <p className="mt-4 text-sm text-muted" role="status">{steps.length} of {practiceTasks.length} practice steps checked (session-only; self-reported).</p>
      <div className="mt-6 border-t border-border pt-5">
        <h3 className="font-semibold">Reflection prompt</h3>
        <p className="mt-2 text-sm leading-6 text-muted">What did rebase change in the commit graph? What did CI catch, or skip? What will you do differently on your next PR?</p>
        <p className="mt-3 text-xs text-muted">Never use real credentials, customer data or company-confidential material in a learning exercise.</p>
      </div>
    </section>
    <footer className="mt-8 text-sm text-muted">
      Source references: <a className="text-accent underline" href="https://git-scm.com/docs/git-rebase" target="_blank" rel="noopener noreferrer">Git rebase docs</a> · <a className="text-accent underline" href="https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/incorporating-changes-from-a-pull-request/about-pull-request-merges" target="_blank" rel="noopener noreferrer">GitHub merge options</a> · <a className="text-accent underline" href="https://docs.github.com/en/actions" target="_blank" rel="noopener noreferrer">GitHub Actions</a>
    </footer>
  </main>;
}
