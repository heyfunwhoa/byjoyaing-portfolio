"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { featuredSourceLabel, type FeaturedSlide } from "@/lib/featured-work";
import Link from "next/link";
import { useEffect, useState } from "react";

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  return reduced;
}

export function FeaturedWorkCarousel({ slides }: { slides: readonly FeaturedSlide[] }) {
  const reduced = useReducedMotion();
  const [api, setApi] = useState<CarouselApi>();
  const [index, setIndex] = useState(0);
  const [count, setCount] = useState(slides.length);

  useEffect(() => {
    if (!api) return;
    const sync = () => {
      setIndex(api.selectedScrollSnap());
      setCount(api.scrollSnapList().length);
    };
    sync();
    api.on("select", sync);
    api.on("reInit", sync);
    return () => {
      api.off("select", sync);
      api.off("reInit", sync);
    };
  }, [api]);

  return (
    <Carousel
      setApi={setApi}
      opts={{ align: "start", loop: false, duration: reduced ? 0 : 20, watchDrag: !reduced }}
      className="mt-6"
      aria-label="Featured work and independent builds"
    >
      <CarouselContent className="-ml-4">
        {slides.map((slide, position) => (
          <CarouselItem key={slide.id} className="basis-full pl-4 md:basis-1/2 lg:basis-1/3">
            <article className="editorial-panel group relative flex h-full min-w-0 flex-col bg-card p-5 transition-[border-color,background-color] hover:border-accent sm:p-6">
              <p className="editorial-eyebrow text-accent">{slide.area}</p>
              <p
                className={`mt-3 inline-flex w-fit rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  slide.source === "independent" ? "bg-surface-sage" : "border border-border"
                }`}
              >
                {featuredSourceLabel[slide.source]}
              </p>
              <h3 className="mt-3 font-display text-xl leading-tight tracking-tight">
                <Link
                  href={slide.href}
                  className="focus-visible:outline-none after:absolute after:inset-0 after:content-['']"
                >
                  <span className="relative">{slide.title}</span>
                  <span className="sr-only">
                    . {position + 1} of {slides.length}. {featuredSourceLabel[slide.source]}.
                  </span>
                </Link>
              </h3>
              <p className="mt-3 text-sm leading-6 text-muted">{slide.summary}</p>
              <p className="editorial-link mt-auto inline-flex min-h-11 items-end pt-5 text-sm font-semibold text-accent underline">
                {slide.collection === "Work" ? "Read the work" : "Read the Side Quest"}
                <span aria-hidden="true" className="nudge-link ml-2 inline-block">
                  →
                </span>
              </p>
            </article>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <CarouselPrevious className="static translate-none" />
        <p aria-live="polite" className="min-w-0 text-sm text-muted">
          Group {index + 1} of {count}
        </p>
        <CarouselNext className="static translate-none" />
      </div>
    </Carousel>
  );
}
