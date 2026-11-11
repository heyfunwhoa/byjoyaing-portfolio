"use client";

import { useState } from "react";
import { ApiLabWalkthrough } from "@/components/ai-academy/api-lab-walkthrough";
import { apiVocabulary, apiStyles, apiImplementations, apiLabQuestions, scoreApiLab, type ApiLabSection } from "@/lib/academy/api-lab";

const stages: { id: ApiLabSection; label: string }[] = [
  { id: "concepts", label: "1. Understand" },
  { id: "styles", label: "2. Compare API types" },
  { id: "build", label: "3. Build three ways" },
  { id: "check", label: "4. Knowledge check" },
];

export function ApiLab() {
  const [section, setSection] = useState<ApiLabSection>("concepts");
  const [implementation, setImplementation] = useState<(typeof apiImplementations)[number]["id"]>("next");
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [visited, setVisited] = useState<ApiLabSection[]>(["concepts"]);
  const result = scoreApiLab(answers);
  const active = apiImplementations.find((item) => item.id === implementation) ?? apiImplementations[0];
  function navigate(next: ApiLabSection) {
    setSection(next);
    setVisited((current) => current.includes(next) ? current : [...current, next]);
  }

  return <main className="mx-auto max-w-5xl px-5 py-12 sm:px-8">
    <a href="/ai-academy/programming" className="text-sm text-accent underline underline-offset-4">← Programming Foundations</a>
    <p className="mt-8 text-xs font-semibold uppercase tracking-widest text-accent">Builder Academy · Guided API practice</p>
    <h1 className="font-display mt-3 text-4xl sm:text-5xl">Build an API three ways</h1>
    <p className="mt-4 max-w-3xl leading-7 text-muted">Learn how APIs work, compare REST and realtime approaches, see where SDKs fit, and practice the same fictional tasks endpoint using Next.js, Express and n8n.</p>
    <p className="mt-3 text-sm text-muted">Preview lesson. Interactive examples and quizzes run only in your browser; they do not deploy services, invoke an AI API, or save progress.</p>
    <div className="mt-8 rounded-xl border border-border bg-card p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <strong className="text-sm">Learning progress (this session)</strong>
        <span className="text-sm text-muted">{visited.length} of {stages.length} sections viewed · {result.answered}/{result.total} questions answered</span>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-background" role="progressbar" aria-label="Sections viewed" aria-valuenow={visited.length} aria-valuemin={0} aria-valuemax={stages.length}>
        <div className="h-full rounded-full bg-accent" style={{ width: `${(visited.length / stages.length) * 100}%` }} />
      </div>
    </div>
    <nav aria-label="API lab sections" className="mt-7 flex flex-wrap gap-2">
      {stages.map((stage) => <button key={stage.id} type="button" onClick={() => navigate(stage.id)} aria-current={section === stage.id ? "step" : undefined}
        className={`rounded-lg border px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${section === stage.id ? "border-accent bg-card font-semibold" : "border-border hover:border-accent"}`}>{stage.label}</button>)}
    </nav>

    {section === "concepts" && <section aria-labelledby="api-concepts" className="mt-8">
      <h2 id="api-concepts" className="font-display text-2xl">What makes an API?</h2>
      <p className="mt-3 leading-7 text-muted">Think of asking a CRM for an account. The request names what you want; the API responds with data or an error. The API is the agreement, not necessarily a separate product or server.</p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">{apiVocabulary.map((term) => <article key={term.name} className="rounded-xl border border-border bg-card p-4">
        <h3 className="font-semibold">{term.name}</h3><p className="mt-2 text-sm leading-6 text-muted">{term.meaning}</p>
      </article>)}</div>
      <div className="mt-6 rounded-xl border border-border bg-background p-5">
        <h3 className="font-semibold">An API versus an SDK</h3>
        <p className="mt-2 text-sm leading-7">An API defines how to ask for tasks. An SDK gives you convenient code that knows how to ask. The SDK may handle authentication, retries and pagination, but it still calls an API.</p>
        <pre className="mt-3 overflow-x-auto text-sm"><code>{`// Direct HTTP
const response = await fetch("/api/tasks");
const data = await response.json();

// Illustrative SDK pseudocode, NOT a real package
const data = await tasksClient.list();`}</code></pre>
      </div>
    </section>}

    {section === "styles" && <section aria-labelledby="api-styles" className="mt-8">
      <h2 id="api-styles" className="font-display text-2xl">Different API styles and patterns</h2>
      <p className="mt-3 leading-7 text-muted">These are not all mutually exclusive. REST is an architectural style; webhooks are event delivery; WebSockets and SSE support different streaming directions. All can coexist in a product.</p>
      <div className="mt-5 grid gap-3 md:grid-cols-2">{apiStyles.map((style) => <article key={style.name} className="rounded-xl border border-border bg-card p-4">
        <h3 className="font-semibold">{style.name}</h3><p className="mt-2 text-sm leading-6">{style.meaning}</p>
        <p className="mt-2 text-sm text-muted"><strong>Example:</strong> {style.example}</p>
        <p className="mt-1 text-sm text-muted"><strong>Useful for:</strong> {style.fit}</p>
      </article>)}</div>
      <p className="mt-5 text-sm text-muted">Also know HTTP methods: GET reads; POST submits or creates; PUT replaces; PATCH partially changes; DELETE removes. Real production APIs need authentication, authorization, validation and error handling.</p>
    </section>}

    {section === "build" && <section aria-labelledby="api-build" className="mt-8">
      <h2 id="api-build" className="font-display text-2xl">One response, three approaches</h2>
      <p className="mt-3 leading-7 text-muted">Choose an implementation. Each returns the same synthetic task list, but the code runs in a different place. These examples are guides, not live endpoints or a production deployment.</p>
      <div role="group" aria-label="Choose an API implementation" className="mt-5 flex flex-wrap gap-2">
        {apiImplementations.map((item) => <button type="button" key={item.id} onClick={() => setImplementation(item.id)} aria-pressed={implementation === item.id}
          className={`rounded-lg border px-4 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${implementation === item.id ? "border-accent bg-card font-semibold" : "border-border"}`}>{item.label}</button>)}
      </div>
      <div className="mt-5 rounded-xl border border-border bg-card p-5">
        <h3 className="font-semibold">{active.label}</h3>
        <p className="mt-2 text-sm leading-6 text-muted">{active.description}</p>
        <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
          <div><dt className="font-semibold">Where</dt><dd className="text-muted">{active.where}</dd></div>
          <div><dt className="font-semibold">File or workflow</dt><dd className="break-all text-muted">{active.path}</dd></div>
          <div><dt className="font-semibold">Try locally</dt><dd className="break-all text-muted">{active.run}</dd></div>
          <div><dt className="font-semibold">Expected URL</dt><dd className="break-all text-muted">{active.url}</dd></div>
        </dl>
        <pre className="mt-5 overflow-x-auto rounded-lg bg-background p-4 text-xs leading-6 sm:text-sm"><code>{active.code}</code></pre>
        <div className="mt-5 rounded-lg border border-border p-4"><p className="text-sm font-semibold">Expected JSON response</p>
          <pre className="mt-2 overflow-x-auto text-xs"><code>{JSON.stringify({ tasks: [{ id: "t1", title: "Learn an API" }, { id: "t2", title: "Compare deployments" }] }, null, 2)}</code></pre>
        </div>
      </div>
      <ApiLabWalkthrough path={implementation} />
      <p className="mt-5 text-sm leading-6 text-muted">Challenge: implement GET /health with a JSON response of {"{ \"status\": \"ok\" }"}. Run it locally, inspect the HTTP status and Content-Type, then test an unknown path. Only deploy after understanding access, costs and security controls.</p>
    </section>}

    {section === "check" && <section aria-labelledby="api-quiz" className="mt-8">
      <h2 id="api-quiz" className="font-display text-2xl">Check your understanding</h2>
      <p className="mt-3 text-muted">Select one answer per question. Explanations appear immediately. This is self-assessment, not a saved qualification.</p>
      <div className="mt-6 space-y-5">{apiLabQuestions.map((item, i) => <fieldset className="rounded-xl border border-border bg-card p-5" key={item.question}>
        <legend className="px-2 font-semibold">Question {i + 1}</legend><p className="mb-4 leading-6">{item.question}</p>
        <div className="space-y-3">{item.choices.map((choice, j) => <label className="flex cursor-pointer items-start gap-3 text-sm leading-6" key={choice}>
          <input type="radio" name={`api-question-${i}`} checked={answers[i] === j} onChange={() => setAnswers((previous) => ({ ...previous, [i]: j }))} className="mt-1 accent-accent" />{choice}
        </label>)}</div>
        {answers[i] !== undefined && <p role="status" className="mt-4 rounded-lg bg-background p-3 text-sm leading-6"><strong>{answers[i] === item.correct ? "Correct. " : "Review: "}</strong>{item.feedback}</p>}
      </fieldset>)}</div>
      <div role="status" className="mt-5 rounded-lg border border-border p-4"><strong>{result.correct}/{result.total} correct</strong> · {result.answered}/{result.total} answered
        {result.answered === result.total && result.correct === result.total ? " · All checks passed in this session" : ""}
      </div>
      <button type="button" onClick={() => setAnswers({})} className="mt-3 rounded-lg border border-border px-4 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">Reset answers</button>
    </section>}

    <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6">
      <p className="text-sm text-muted">Your visited sections and quiz answers reset when the page reloads.</p>
      {section !== "check" && <button type="button" onClick={() => navigate(stages[stages.findIndex((s) => s.id === section) + 1].id)} className="rounded-lg bg-accent px-4 py-2 font-semibold text-accent-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">Next section →</button>}
    </div>
    <section className="mt-10" aria-labelledby="api-references"><h2 id="api-references" className="text-lg font-semibold">Official references</h2>
      <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
        {[["MDN: HTTP", "https://developer.mozilla.org/en-US/docs/Web/HTTP"], ["Next.js: Route Handlers", "https://nextjs.org/docs/app/getting-started/route-handlers"], ["Express", "https://expressjs.com/en/starter/hello-world.html"], ["n8n Webhook", "https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook/"], ["GraphQL", "https://graphql.org/learn/"], ["gRPC", "https://grpc.io/docs/what-is-grpc/introduction/"]].map(([label, href]) => <li key={href}><a className="text-accent underline underline-offset-4" href={href} target="_blank" rel="noopener noreferrer">{label} ↗</a></li>)}
      </ul>
    </section>
  </main>;
}
