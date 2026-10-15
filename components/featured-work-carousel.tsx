"use client";

import { ArrowLeft } from "@/components/icons/arrow-left";
import { ArrowRight } from "@/components/icons/arrow-right";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  useCarousel,
  type CarouselApi,
} from "@/components/ui/carousel";
import { featuredSourceLabel, type FeaturedSlide } from "@/lib/featured-source";
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

export function FeaturedWorkCarousel({
  slides,
  layout = "carousel",
}: {
  slides: readonly FeaturedSlide[];
  layout?: "carousel" | "grid";
}) {
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

  if (layout === "grid") {
    return (
      <ul
        aria-label="Featured professional work"
        className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3"
      >
        {slides.map((slide, position) => (
          <li key={slide.id} className="min-w-0">
            <FeaturedWorkCard
              slide={slide}
              position={position}
              count={slides.length}
            />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <Carousel
      setApi={setApi}
      opts={{
        align: "start",
        loop: false,
        duration: reduced ? 0 : 20,
        watchDrag: true,
      }}
      className="mt-6"
      aria-label="Featured professional work"
    >
      <CarouselContent className="-ml-4">
        {slides.map((slide, position) => (
          <CarouselItem
            key={slide.id}
            className="basis-full pl-4 md:basis-1/2 lg:basis-1/3"
          >
            <FeaturedWorkCard
              slide={slide}
              position={position}
              count={slides.length}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <FeaturedCarouselControls index={index} count={count} />
    </Carousel>
  );
}

function FeaturedCarouselControls({
  index,
  count,
}: {
  index: number;
  count: number;
}) {
  const { scrollPrev, scrollNext, canScrollPrev, canScrollNext } =
    useCarousel();
  const control =
    "inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-card px-4 text-sm font-semibold text-foreground hover:border-accent disabled:pointer-events-none disabled:opacity-40";

  return (
    <div className="mt-4 flex flex-wrap items-center gap-3">
      <button
        type="button"
        data-slot="carousel-previous"
        className={control}
        disabled={!canScrollPrev}
        onClick={scrollPrev}
      >
        <ArrowLeft size={16} className="size-4" />
        Previous
      </button>
      <p aria-live="polite" className="min-w-0 text-sm text-muted">
        Group {index + 1} of {count}
      </p>
      <button
        type="button"
        data-slot="carousel-next"
        className={control}
        disabled={!canScrollNext}
        onClick={scrollNext}
      >
        Next
        <ArrowRight size={16} className="size-4" />
      </button>
    </div>
  );
}

function FeaturedWorkCard({
  slide,
  position,
  count,
}: {
  slide: FeaturedSlide;
  position: number;
  count: number;
}) {
  return (
    <article className="editorial-panel group relative flex h-full min-w-0 flex-col bg-card p-5 transition-[border-color,background-color] hover:border-accent sm:p-6">
      <p className="editorial-eyebrow text-accent">{slide.area}</p>
      <p
        className={`mt-3 inline-flex w-fit rounded-full px-2.5 py-0.5 text-xs font-medium ${
          slide.source === "independent"
            ? "bg-surface-sage"
            : "border border-border"
        }`}
      >
        {featuredSourceLabel[slide.source]}
      </p>
      <h3 className="mt-3 font-display text-xl leading-tight tracking-tight">
        <Link
          href={slide.href}
          className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          <span className="relative">{slide.title}</span>
          <span className="sr-only">
            . {position + 1} of {count}. {featuredSourceLabel[slide.source]}.
          </span>
        </Link>
      </h3>
      <p className="mt-3 text-sm leading-6 text-muted">{slide.summary}</p>
      <p className="editorial-link mt-auto inline-flex min-h-11 items-end pt-5 text-sm font-semibold text-accent underline">
        {slide.collection === "Work" ? "Read the work" : "Read the Side Quest"}
        <ArrowRight size={16} className="nudge-link ml-2 inline-block size-4" />
      </p>
    </article>
  );
}
