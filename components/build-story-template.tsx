import type { ReactNode } from "react";
import { MaterialsInvitation } from "@/components/materials-invitation";

export type BuildStory = {
  title: string;
  stage: string;
  problem: string;
  motivation: string;
  architecture: string;
  sources: string[];
  implementation: string[];
  limitations: string[];
  next: string[];
};

function StoryList({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export function BuildStoryTemplate({ story, children }: { story: BuildStory; children?: ReactNode }) {
  return (
    <article className="editorial-panel min-w-0 bg-surface-mist px-5 py-8 sm:px-9 sm:py-12">
      <p className="editorial-eyebrow">Independent build / {story.stage}</p>
      <h2 className="editorial-section-title mt-3">{story.title}</h2>
      <p className="editorial-intro mt-4">{story.problem}</p>
      <p className="mt-6 max-w-[68ch] border-l border-accent pl-4 text-base leading-7">
        <span className="editorial-eyebrow mr-2 text-accent">Motivation</span>
        {story.motivation}
      </p>
      <div className="mt-8 grid min-w-0 gap-8 md:grid-cols-2">
        <section>
          <h3 className="font-display text-3xl">Architecture</h3>
          <p className="editorial-prose mt-3">{story.architecture}</p>
        </section>
        <section>
          <h3 className="font-display text-3xl">Sources</h3>
          <StoryList items={story.sources} />
        </section>
        <section>
          <h3 className="font-display text-3xl">Implementation</h3>
          <StoryList items={story.implementation} />
        </section>
        <section>
          <h3 className="font-display text-3xl">Limitations</h3>
          <StoryList items={story.limitations} />
        </section>
      </div>
      {children}
      <div className="mt-8 border-t border-foreground/20 pt-5">
        <h3 className="font-display text-3xl">Next steps</h3>
        <StoryList items={story.next} />
      </div>
      <MaterialsInvitation tone="build" />
    </article>
  );
}
