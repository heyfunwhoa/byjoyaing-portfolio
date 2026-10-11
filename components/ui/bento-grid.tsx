import { type ComponentPropsWithoutRef, type ReactNode } from "react"
import { ArrowRightIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

/**
 * Magic UI Bento Grid, from https://magicui.design/r/bento-grid.json.
 * The registry file is kept as the component API. Text uses the site
 * foreground and muted colors, the panel uses the editorial border, and
 * one link stays visible without a hover.
 */

interface BentoGridProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode
  className?: string
}

interface BentoCardProps extends ComponentPropsWithoutRef<"div"> {
  name: string
  className: string
  background: ReactNode
  Icon: React.ElementType
  description: string
  href: string
  cta: string
}

const BentoGrid = ({ children, className, ...props }: BentoGridProps) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[18rem] grid-cols-1 gap-4 md:auto-rows-[22rem] md:grid-cols-3",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
  ...props
}: BentoCardProps) => (
  <div
    key={name}
    className={cn(
      "group relative col-span-1 flex flex-col justify-between overflow-hidden rounded-xl border border-border bg-card",
      className,
    )}
    {...props}
  >
    <div>{background}</div>
    <div className="p-4">
      <div className="z-10 flex flex-col gap-1">
        <Icon className="h-12 w-12 text-foreground" aria-hidden="true" />
        <h3 className="text-xl font-semibold text-foreground">{name}</h3>
        <p className="max-w-lg text-muted">{description}</p>
      </div>

      <div className="mt-4 flex w-full flex-row items-center">
        <Button variant="link" asChild size="sm" className="px-0">
          <a href={href}>
            {cta}
            <ArrowRightIcon className="ms-2 h-4 w-4" aria-hidden="true" />
          </a>
        </Button>
      </div>
    </div>
  </div>
)

export { BentoCard, BentoGrid }
