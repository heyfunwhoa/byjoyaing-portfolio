import type { ReactNode } from "react";
import Link from "next/link";

export type WorkStory = {
  title: string;
  context: string;
  role: string;
  collaborators: string;
  challenge: string;
  decisions: string[];
  evidence: string[];
  outcomes: string[];
  caveat: string;
};
export function WorkStoryTemplate({ story, children }: { story: WorkStory; children?: ReactNode }) {
  return (
    <article className="editorial-panel bg-card px-5 py-8 sm:px-9 sm:py-12">
      <p className="editorial-eyebrow text-accent">Selected work / commercial leadership</p>
      <h2 className="editorial-section-title mt-3">{story.title}</h2>
      <p className="editorial-intro mt-4 text-muted">{story.context}</p>
      <dl className="mt-7 grid gap-4 border-y border-border py-5 text-sm sm:grid-cols-2">
        <div><dt className="editorial-eyebrow text-muted">My role</dt><dd className="mt-2">{story.role}</dd></div>
        <div><dt className="editorial-eyebrow text-muted">Collaboration</dt><dd className="mt-2">{story.collaborators}</dd></div>
      </dl>
      <div className="mt-7 grid gap-7 md:grid-cols-2">
        <section><h3 className="font-display text-3xl">The challenge</h3><p className="editorial-prose mt-3 text-muted">{story.challenge}</p></section>
        <section><h3 className="font-display text-3xl">Decisions & tradeoffs</h3><ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-muted">{story.decisions.map(x=><li key={x}>{x}</li>)}</ul></section>
        <section><h3 className="font-display text-3xl">Evidence</h3><ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-muted">{story.evidence.map(x=><li key={x}>{x}</li>)}</ul></section>
        <section><h3 className="font-display text-3xl">Outcomes & learnings</h3><ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-muted">{story.outcomes.map(x=><li key={x}>{x}</li>)}</ul></section>
      </div>
      {children}
      <p className="mt-7 border-t border-border pt-4 text-xs leading-6 text-muted">{story.caveat}</p>
      <Link className="editorial-link mt-5 inline-block text-sm font-semibold text-accent underline" href="/private-work">Explore the extended-work access approach →</Link>
    </article>
  );
}
