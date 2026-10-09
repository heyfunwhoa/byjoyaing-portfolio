import { ExperienceTimeline } from "@/components/experience-timeline";
import { Kicker } from "@/components/kicker";
import { PageMain } from "@/components/page-main";
import { Rail } from "@/components/rail";
import { ToolsMap } from "@/components/tools-map";
import { lifecycle, loop, skills } from "@/lib/portfolio";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Kristen Aing — Leadership, GTM Strategy & Curiosity",
  description:
    "The story, values, and work of Kristen Joy Aing: cybersecurity commercial leadership, GTM strategy, people development, and creative building.",
};

const personalValues = [
  { title: "Authenticity", body: "Show up genuinely and build relationships grounded in trust." },
  { title: "Curiosity", body: "Keep asking questions, exploring, and learning." },
  { title: "Inclusion", body: "Value different experiences, perspectives, and ways of thinking." },
  { title: "Connection", body: "Build meaningful relationships and community." },
  { title: "Growth", body: "Stay open to feedback, change, and new possibilities." },
  { title: "Independence", body: "Make room to explore ideas and define success on my own terms." },
];

const professionalValues = [
  { title: "Empowerment", body: "Coach people, share knowledge, and help others take ownership." },
  { title: "Accountability", body: "Follow through, make thoughtful decisions, and own the outcomes." },
  { title: "Resourcefulness", body: "Understand the underlying problem and find practical solutions." },
  { title: "Collaboration", body: "Bring people and perspectives together to make better decisions." },
  { title: "Strategic thinking", body: "Connect what we do today to where the business needs to go." },
  { title: "Continuous improvement", body: "Build systems that remove friction and make what works repeatable." },
];

export default function AboutPage() {
  return (
    <PageMain>
      <section className="grid items-center gap-10 border-b border-border py-16 sm:py-20 lg:grid-cols-[minmax(0,13rem)_minmax(0,1fr)] lg:gap-16">
        <div className="flex aspect-square flex-col justify-between rounded-lg border border-border bg-card p-5" aria-label="Joy personal brand signature">
          <span className="font-mono text-xs uppercase tracking-widest text-muted">By Kristen Joy Aing</span>
          <span className="font-display text-6xl tracking-tight text-foreground">joy<span className="text-accent">.</span></span>
          <span className="text-xs text-muted">People · Strategy · Systems</span>
        </div>
        <div className="flex flex-col gap-5">
          <Kicker>About Kristen Aing</Kicker>
          <h1 className="font-display max-w-2xl text-4xl leading-[1.12] tracking-tight text-foreground sm:text-5xl">
            Commercial leader. Curious builder.
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-foreground">
            People first. Problem-driven. Systems-minded.
          </p>
          <p className="max-w-2xl text-base leading-7 text-muted">
            I develop people, shape go-to-market strategy, and build practical solutions
            that help technical businesses grow. I am drawn to challenges at the
            intersection of people, business, and technology.
          </p>
        </div>
      </section>

      <Rail id="story" label="My story" tick>
        <div className="flex max-w-3xl flex-col gap-4 text-base leading-8 text-muted">
          <p>
            I studied Advertising and Business Foundations at The University of Texas
            at Austin, through the nationally recognized Stan Richards School of
            Advertising &amp; Public Relations. A summer internship at GSD&amp;M on
            the Southwest Airlines account helped me realize the traditional agency
            path wasn&apos;t quite for me.
          </p>
          <p>
            Instead, I found my way into cybersecurity at Websense through a
            three-month sales training program. What started as an unexpected
            opportunity became a career spent learning complex technology,
            connecting with people, and making difficult ideas easier to understand.
          </p>
          <p>
            Since then, I&apos;ve explored different sides of business—from digital
            advertising at Quantcast and channel partnerships at Metadot to
            enterprise cybersecurity at Forcepoint, Rapid7, Darktrace, and Truffle
            Security. Each chapter has shaped how I think about markets, customers,
            teams, and growth.
          </p>
          <p>
            Along the way, I realized what energizes me goes beyond selling.
            <strong className="font-medium text-foreground"> I love developing people,
            shaping strategy, solving recurring problems, and building better ways
            of working.</strong> That same curiosity has led me to explore cloud,
            AI, and software projects alongside my commercial work.
          </p>
          <p>
            I&apos;m still learning, and I hope I always will. My goal is to leave
            people and places a little better than I found them.
          </p>
        </div>
      </Rail>

      <Rail id="values" label="What I value" tick>
        <div className="flex flex-col gap-10">
          <div>
            <h2 className="font-display text-2xl text-foreground">Personally</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
              The principles that guide how I live, learn, and connect with others.
            </p>
            <ul className="mt-6 grid gap-5 sm:grid-cols-2">
              {personalValues.map((value) => (
                <li key={value.title} className="border-t border-border pt-4">
                  <h3 className="font-semibold text-foreground">{value.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-muted">{value.body}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-2xl text-foreground">Professionally</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
              How I approach leadership, decisions, and building with other people.
            </p>
            <ul className="mt-6 grid gap-5 sm:grid-cols-2">
              {professionalValues.map((value) => (
                <li key={value.title} className="border-t border-border pt-4">
                  <h3 className="font-semibold text-foreground">{value.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-muted">{value.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Rail>

      <Rail label="Mission & leadership" tick>
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="flex flex-col gap-3">
            <h2 className="font-display text-2xl text-foreground">What drives me</h2>
            <p className="text-base leading-7 text-muted">
              Personally, I want to keep learning, build meaningful connections,
              create opportunities for others, and live authentically.
              Professionally, I want to develop people, solve meaningful problems,
              and build strategies and systems that help organizations grow.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <h2 className="font-display text-2xl text-foreground">How I lead</h2>
            <p className="text-base leading-7 text-muted">
              I believe strong teams are built on trust, clarity, accountability,
              and different perspectives. Good leadership means listening,
              asking thoughtful questions, making decisions, and giving people
              the support and ownership to do their best work.
            </p>
          </div>
        </div>
      </Rail>

      <Rail label="Skills & approach">
        <div className="flex flex-col gap-6">
          <p className="text-base leading-7 text-foreground">{skills.join(" · ")}</p>
          <p className="text-base leading-7 text-muted">{loop.join(" → ")}</p>
          <p className="text-sm leading-7 text-muted">
            {lifecycle.map((step, index) => (
              <span key={step}>
                {index > 0 ? " → " : null}
                <Link className="text-foreground underline-offset-4 hover:underline" href={`/projects#${step.toLowerCase()}`}>
                  {step}
                </Link>
              </span>
            ))}
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
            <span className="font-medium text-foreground">B.S. Advertising · Business Foundations</span>
            <br />
            The University of Texas at Austin · Stan Richards School of Advertising &amp; Public Relations
          </li>
          <li>
            <span className="font-medium text-foreground">AWS certifications</span>
            <br />
            Cloud Practitioner · AI Practitioner
          </li>
        </ul>
      </Rail>
    </PageMain>
  );
}
