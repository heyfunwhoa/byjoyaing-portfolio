import type { ReactNode } from "react";
import { MaterialsInvitation } from "@/components/materials-invitation";

export type WorkStory = {
  title: string;
  context: string;
  role: string;
  collaborators: string;
  challenge: string;
  decisions: string[];
  evidence: string[];
  outcomes: string[];
  lessons?: string[];
  caveat: string;
};

function StoryList({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-muted">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export function WorkStoryTemplate({ story, children }: { story: WorkStory; children?: ReactNode }) {
  return (
    <article className="editorial-panel min-w-0 bg-card px-5 py-8 sm:px-9 sm:py-12">
      <p className="editorial-eyebrow text-accent">Professional work</p>
      <h2 className="editorial-section-title mt-3">{story.title}</h2>
      <p className="editorial-intro mt-4 text-muted">{story.context}</p>
      <blockquote className="editorial-quotation mt-8 max-w-[22ch] text-foreground">{story.challenge}</blockquote>
      <dl className="mt-8 grid gap-6 border-y border-border py-6 text-sm sm:grid-cols-2">
        <div>
          <dt className="editorial-eyebrow text-muted">My contribution</dt>
          <dd className="mt-2 leading-6">{story.role}</dd>
        </div>
        <div>
          <dt className="editorial-eyebrow text-muted">Collaborators</dt>
          <dd className="mt-2 leading-6">{story.collaborators}</dd>
        </div>
      </dl>
      <div className="mt-8 grid min-w-0 gap-8 md:grid-cols-2">
        <section>
          <h3 className="font-display text-3xl">Decisions</h3>
          <StoryList items={story.decisions} />
        </section>
        <section>
          <h3 className="font-display text-3xl">Evidence</h3>
          <StoryList items={story.evidence} />
        </section>
        <section>
          <h3 className="font-display text-3xl">Outcomes</h3>
          <StoryList items={story.outcomes} />
        </section>
        {story.lessons && story.lessons.length > 0 ? (
          <section>
            <h3 className="font-display text-3xl">Lessons</h3>
            <StoryList items={story.lessons} />
          </section>
        ) : null}
      </div>
      {children}
      <p className="mt-8 border-t border-border pt-4 text-xs leading-6 text-muted">{story.caveat}</p>
      <MaterialsInvitation tone="work" />
    </article>
  );
}
