"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { frontendVocabulary } from "@/lib/academy/frontend-lesson";

const control =
  "min-h-11 rounded-lg border border-border bg-card px-4 py-3 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

/** One trigger gives the modal a predictable keyboard return point at every step. */
export function FrontendGlossary() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button type="button" className={`${control} mt-4`}>
          Open lesson glossary
        </button>
      </SheetTrigger>
      <SheetContent
        showCloseButton={false}
        className="gap-0 bg-background text-foreground data-[side=right]:w-full data-[side=right]:sm:max-w-md"
      >
        <SheetHeader className="shrink-0 gap-3 border-b border-border p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <SheetTitle className="font-display text-2xl">
              Frontend glossary
            </SheetTitle>
            <SheetClose asChild>
              <button type="button" className={control}>
                Close glossary
              </button>
            </SheetClose>
          </div>
          <SheetDescription className="leading-6 text-muted">
            Five terms for this lesson. Close the glossary to return to your
            place.
          </SheetDescription>
        </SheetHeader>
        <div
          role="region"
          aria-label="Glossary definitions"
          tabIndex={0}
          className="min-h-0 overflow-y-auto p-5 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent"
        >
          <dl className="space-y-6">
            {frontendVocabulary.map((item) => (
              <div key={item.term}>
                <dt className="font-semibold">{item.term}</dt>
                <dd className="mt-1 text-sm leading-6 text-muted">
                  {item.meaning}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </SheetContent>
    </Sheet>
  );
}
