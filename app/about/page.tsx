import { BrandAvatar } from "@/components/brand-avatar";
import { ExperienceTimeline } from "@/components/experience-timeline";
import { Kicker } from "@/components/kicker";
import { PageMain } from "@/components/page-main";
import { Rail } from "@/components/rail";
import { ToolsMap } from "@/components/tools-map";
import {
  avatar,
  bio,
  lifecycle,
  loop,
  skills,
  strengths,
  targetRolesPrimary,
} from "@/lib/portfolio";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About — Kristen Joy Aing",
  description:
    "Skills, strengths, and experience: technical GTM systems across enterprise cybersecurity.",
};

export default function AboutPage() {
  return (
    <PageMain>
      <section className="grid items-center gap-10 border-b border-border py-16 sm:py-20 lg:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] lg:gap-16">
        <div className="mx-auto w-full max-w-[14rem] lg:mx-0">
          <BrandAvatar />
        </div>
        <div className="flex flex-col gap-6">
          <Kicker>About</Kicker>
          <h1 className="font-display max-w-2xl text-4xl leading-[1.12] tracking-tight text-foreground sm:text-5xl">
            {avatar.line}
          </h1>
          <p className="max-w-2xl text-base leading-7 text-muted">{bio}</p>
          <p className="max-w-2xl text-base leading-7 text-muted">
            Not traditional enablement or an AE becoming a PM. The work is
            skills: system design, evidence, commercial judgment in technical
            markets, and making knowledge usable.
          </p>
        </div>
      </section>

      <Rail label="Strengths" tick>
        <ul className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
          {strengths.map((item) => (
            <li key={item.title} className="flex flex-col gap-2">
              <h2 className="text-base font-semibold tracking-tight text-foreground">
                {item.title}
              </h2>
              <p className="text-sm leading-6 text-muted">{item.body}</p>
            </li>
          ))}
        </ul>
      </Rail>

      <Rail label="Skills">
        <div className="flex flex-col gap-6">
          <p className="text-base leading-7 text-foreground">{skills.join(" · ")}</p>
          <p className="text-base leading-7 text-foreground">{loop.join(" → ")}</p>
          <p className="text-base leading-7 text-muted">
            {lifecycle.map((step, index) => (
              <span key={step}>
                {index > 0 ? " → " : null}
                <Link
                  className="text-foreground underline-offset-4 hover:underline"
                  href={`/projects#${step.toLowerCase()}`}
                >
                  {step}
                </Link>
              </span>
            ))}
          </p>
          <p className="text-base leading-7 text-foreground">
            {targetRolesPrimary.join(" · ")}
          </p>
        </div>
      </Rail>

      <Rail id="tools" label="Tools" tick>
        <ToolsMap />
      </Rail>

      <Rail label="Experience" tick>
        <ExperienceTimeline />
      </Rail>

      <Rail label="Education" className="border-b-0">
        <ul className="grid gap-6 text-base leading-7 text-muted sm:grid-cols-3">
          <li>
            <span className="font-medium text-foreground">MBA, IT Management</span>
            <br />
            Western Governors University (in progress)
          </li>
          <li>
            <span className="font-medium text-foreground">
              B.S. Advertising, Business Foundations
            </span>
            <br />
            The University of Texas at Austin
          </li>
          <li>
            <span className="font-medium text-foreground">AWS</span>
            <br />
            Cloud Practitioner and AI Practitioner (Foundational)
          </li>
        </ul>
      </Rail>
    </PageMain>
  );
}
