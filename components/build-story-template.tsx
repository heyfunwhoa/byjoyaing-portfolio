import type { ReactNode } from "react";
import Link from "next/link";

export type BuildStory = {
  title: string; stage: string; problem: string; architecture: string;
  sources: string[]; implementation: string[]; limitations: string[]; next: string[];
};
export function BuildStoryTemplate({ story, children }: { story: BuildStory; children?: ReactNode }) {
  return <article className="editorial-panel bg-surface-mist px-5 py-8 sm:px-9 sm:py-12">
    <p className="editorial-eyebrow">Side Quest / {story.stage}</p>
    <h2 className="editorial-section-title mt-3">{story.title}</h2>
    <p className="editorial-intro mt-4">{story.problem}</p>
    <div className="mt-8 grid gap-7 md:grid-cols-2">
      <section><h3 className="font-display text-3xl">Architecture</h3><p className="editorial-prose mt-3">{story.architecture}</p></section>
      <section><h3 className="font-display text-3xl">Sources & provenance</h3><ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7">{story.sources.map(x=><li key={x}>{x}</li>)}</ul></section>
      <section><h3 className="font-display text-3xl">What I built</h3><ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7">{story.implementation.map(x=><li key={x}>{x}</li>)}</ul></section>
      <section><h3 className="font-display text-3xl">Limitations</h3><ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7">{story.limitations.map(x=><li key={x}>{x}</li>)}</ul></section>
    </div>
    {children}
    <div className="mt-8 border-t border-foreground/20 pt-5"><h3 className="font-semibold">What's next</h3><ul className="mt-2 list-disc space-y-2 pl-5 text-sm">{story.next.map(x=><li key={x}>{x}</li>)}</ul></div>
    <Link href="/projects" className="editorial-link mt-6 inline-block text-sm font-semibold underline">See more builds →</Link>
  </article>;
}
