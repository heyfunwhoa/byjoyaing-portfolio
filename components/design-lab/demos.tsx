"use client"

import { Lifeline } from "@/components/lifeline"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { roles } from "@/lib/portfolio"
import type { LifelineMarker } from "@/components/lifeline/types"
import { BookOpen, Briefcase, Compass } from "lucide-react"

const surfaces = [
  {
    name: "Work",
    href: "/work",
    cta: "Open Work",
    description:
      "Enterprise cybersecurity sales, coaching, and GTM operations.",
    Icon: Briefcase,
    wash: "bg-surface-sage",
  },
  {
    name: "Field Notes",
    href: "/field-notes",
    cta: "Open Field Notes",
    description: "Playbooks, frameworks, operating systems, and lessons learned.",
    Icon: BookOpen,
    wash: "bg-surface-mist",
  },
  {
    name: "Side Quests",
    href: "/side-quests",
    cta: "Open Side Quests",
    description:
      "Independent research systems and software experiments, with their build stage visible.",
    Icon: Compass,
    wash: "bg-surface-clay",
  },
] as const

function careerMarkers(): LifelineMarker[] {
  return [...roles].reverse().map((role) => {
    const year = Number(role.period.match(/\d{4}/)?.[0])
    return {
      id: role.company.toLowerCase().replace(/\s+/g, "-"),
      year,
      age: role.company.slice(0, 3),
      label: role.period.split("–")[0]?.trim() ?? String(year),
      companies: [
        {
          id: role.company.toLowerCase().replace(/\s+/g, "-"),
          name: role.company,
        },
      ],
      events: [`${role.title}, ${role.company}`, role.points[0]],
    }
  })
}

export function DesignLabDemos() {
  const markers = careerMarkers()

  return (
    <div className="flex flex-col gap-16 py-12">
      <section aria-labelledby="lab-primitives">
        <h2 id="lab-primitives" className="editorial-section-title">
          shadcn/ui
        </h2>
        <p className="mt-3 max-w-2xl text-muted">
          Card, tabs, tooltip, hover card, avatar, sheet, dialog, accordion,
          carousel, and button. The public portrait stays on BrandAvatar.
        </p>
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Card</CardTitle>
              <CardDescription>
                A quiet surface. Project cards and the editorial bento stay
                as they are.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap items-center gap-4">
              <Avatar size="lg">
                <AvatarImage src="/avatar.png" alt="" />
                <AvatarFallback>KA</AvatarFallback>
              </Avatar>
              <p className="text-sm text-muted">
                Avatar preview only. BrandAvatar remains the public portrait.
              </p>
            </CardContent>
          </Card>

          <Tabs defaultValue="people">
            <TabsList aria-label="Brand themes">
              <TabsTrigger value="people">People</TabsTrigger>
              <TabsTrigger value="strategy">Strategy</TabsTrigger>
              <TabsTrigger value="systems">Systems</TabsTrigger>
            </TabsList>
            <TabsContent value="people" className="pt-3 text-sm text-muted">
              Coaching, hiring support, and enablement already published on
              the site.
            </TabsContent>
            <TabsContent value="strategy" className="pt-3 text-sm text-muted">
              Enterprise sales, account strategy, and GTM judgment.
            </TabsContent>
            <TabsContent value="systems" className="pt-3 text-sm text-muted">
              Shared resources other people can run.
            </TabsContent>
          </Tabs>

          <div className="flex flex-wrap gap-3">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button type="button" variant="outline">
                  Tooltip
                </Button>
              </TooltipTrigger>
              <TooltipContent>Short label on hover and focus</TooltipContent>
            </Tooltip>

            <HoverCard>
              <HoverCardTrigger asChild>
                <Button type="button" variant="outline">
                  Hover card
                </Button>
              </HoverCardTrigger>
              <HoverCardContent>
                A preview on pointer and keyboard. It does not replace a
                case-study page.
              </HoverCardContent>
            </HoverCard>

            <Dialog>
              <DialogTrigger asChild>
                <Button type="button" variant="outline">
                  Dialog
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Dialog</DialogTitle>
                  <DialogDescription>
                    Focus stays inside this panel until it closes.
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>

            <Sheet>
              <SheetTrigger asChild>
                <Button type="button" variant="outline">
                  Sheet
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Sheet</SheetTitle>
                  <SheetDescription>
                    A side panel. The header menu is unchanged.
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>

          <Accordion type="single" collapsible>
            <AccordionItem value="installed">
              <AccordionTrigger>What is installed</AccordionTrigger>
              <AccordionContent>
                These primitives live in components/ui. Public pages do not
                import them.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="left-alone">
              <AccordionTrigger>What stays custom</AccordionTrigger>
              <AccordionContent>
                The editorial bento, project cards, experience timeline, and
                brand avatar stay in place.
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Carousel
            aria-label="Design lab slides"
            className="mx-auto w-full max-w-md"
          >
            <CarouselContent>
              {["People", "Strategy", "Systems"].map((slide) => (
                <CarouselItem key={slide}>
                  <div className="flex min-h-28 items-center justify-center rounded-xl border border-border bg-card px-6 text-lg font-medium">
                    {slide}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
        </div>
      </section>

      <section aria-labelledby="lab-bento">
        <h2 id="lab-bento" className="editorial-section-title">
          Magic UI bento grid
        </h2>
        <p className="mt-3 max-w-2xl text-muted">
          One registry component. The public Work, Field Notes, and Side
          Quests tiles stay on the editorial bento.
        </p>
        <BentoGrid className="mt-8">
          {surfaces.map((surface) => (
            <BentoCard
              key={surface.href}
              name={surface.name}
              className="col-span-1"
              Icon={surface.Icon}
              description={surface.description}
              href={surface.href}
              cta={surface.cta}
              background={
                <div
                  aria-hidden="true"
                  className={`absolute inset-x-0 top-0 h-16 ${surface.wash}`}
                />
              }
            />
          ))}
        </BentoGrid>
      </section>

      <section aria-labelledby="lab-lifeline">
        <h2 id="lab-lifeline" className="editorial-section-title">
          Career timeline prototype
        </h2>
        <p className="mt-3 max-w-2xl text-muted">
          Lifeline, embedded. Markers use the published roles. The column
          marked Co. is a company abbreviation, not an age. The experience
          page keeps its own timeline.
        </p>
        <p className="mt-3 text-sm">
          <a href="/experience" className="text-accent underline">
            View the public experience timeline
          </a>
        </p>
        <div className="design-lab-lifeline mt-6 h-[32rem] min-h-0 overflow-hidden rounded-xl border border-border bg-background">
          <Lifeline
            markers={markers}
            birthYear={0}
            mode="embed"
            title="Career timeline prototype"
          />
        </div>
      </section>
    </div>
  )
}
