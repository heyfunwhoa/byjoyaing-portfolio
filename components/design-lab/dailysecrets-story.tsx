"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  useCarousel,
} from "@/components/ui/carousel";

const panels = [
  {
    title: "A private message",
    story:
      "A developer pastes a payment key into a private message to help a teammate run a test.",
    detail: "The key is now saved in the chat history.",
  },
  {
    title: "The key travels with the ticket",
    story:
      "The teammate shares the message in a team channel. When the test still fails, they open a ticket with a screenshot and a log file that both show the key.",
    detail: "Copies now sit in chat and in two ticket attachments.",
  },
  {
    title: "A setup guide makes another copy",
    story:
      "An engineer writes a wiki guide so the next teammate can run the test. They include the key in the instructions.",
    detail: "The guide is now another place someone can find the key.",
  },
  {
    title: "The guide is edited",
    story:
      "A reviewer removes the key from the current page. The older wiki version, chat messages, and ticket attachments still contain it.",
    detail: "The page looks clean. The old key still works.",
  },
  {
    title: "The owner replaces the key",
    story:
      "The payments team switches the billing app to a replacement key and disables the old one.",
    detail:
      "The earlier copies may still exist. They can no longer authenticate with the old key.",
  },
] as const;

function StoryPanel({ index }: { index: number }) {
  const panel = panels[index];

  return (
    <article className="flex h-full flex-col gap-3 rounded-lg border border-border bg-card p-4 sm:p-6">
      <p className="editorial-eyebrow text-accent">
        Part {index + 1} of {panels.length}
      </p>
      <h3 className="font-display text-xl leading-tight">{panel.title}</h3>
      <p className="text-sm leading-relaxed text-muted">{panel.story}</p>
      <p className="mt-auto border-t border-border pt-3 text-sm font-medium">
        {panel.detail}
      </p>
    </article>
  );
}

function StorySlides() {
  const { api, scrollPrev, scrollNext } = useCarousel();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!api) return;
    const sync = () => setIndex(api.selectedScrollSnap());
    sync();
    api.on("select", sync);
    api.on("reInit", sync);
    return () => {
      api.off("select", sync);
      api.off("reInit", sync);
    };
  }, [api]);

  const atStart = !api || index === 0;
  const atEnd = !api || index === panels.length - 1;

  return (
    <>
      <CarouselContent>
        {panels.map(({ title }, position) => (
          <CarouselItem key={title} aria-hidden={position !== index}>
            <StoryPanel index={position} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <Button
          type="button"
          variant="outline"
          className="min-h-11 aria-disabled:opacity-50"
          aria-disabled={atStart}
          onClick={() => {
            if (!atStart) scrollPrev();
          }}
        >
          Previous
        </Button>
        <Button
          type="button"
          variant="outline"
          className="min-h-11 aria-disabled:opacity-50"
          aria-disabled={atEnd}
          onClick={() => {
            if (!atEnd) scrollNext();
          }}
        >
          Next
        </Button>
        <p role="status" className="text-sm text-muted">
          Part {index + 1} of {panels.length}
        </p>
      </div>
    </>
  );
}

export function DailySecretsStory({
  format,
}: {
  format: "stacked" | "carousel";
}) {
  return (
    <section aria-label="One key, many copies" className="space-y-4">
      <div>
        <p className="editorial-eyebrow text-accent">
          DailySecrets · Fictional scenario
        </p>
        <h2 className="mt-2 font-display text-2xl tracking-tight">
          One key, many copies
        </h2>
        <p className="mt-2 text-sm text-muted">
          Follow a payment key as a team shares it while troubleshooting a test.
        </p>
      </div>
      {format === "stacked" ? (
        <ol className="space-y-3">
          {panels.map(({ title }, index) => (
            <li key={title}>
              <StoryPanel index={index} />
            </li>
          ))}
        </ol>
      ) : (
        <Carousel
          aria-label="Payment key story"
          opts={{
            loop: false,
            breakpoints: {
              "(prefers-reduced-motion: reduce)": { duration: 0 },
            },
          }}
        >
          <StorySlides />
        </Carousel>
      )}
    </section>
  );
}
