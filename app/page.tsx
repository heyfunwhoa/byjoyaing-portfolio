import { BrandAvatar } from "@/components/brand-avatar";
import { EditorialBento } from "@/components/editorial-bento";
import { PageMain } from "@/components/page-main";
import { roles, statusCopy, statusHelp } from "@/lib/portfolio";
import { publicStories } from "@/lib/public-stories";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Kristen Joy Aing — Revenue & GTM Leader · Curious Builder",
  description:
    "Strategic enterprise cybersecurity selling, people development, go-to-market leadership, and curious independent builds.",
};

function roleByCompany(company: string) {
  const role = roles.find((item) => item.company === company);
  if (!role) {
    throw new Error(`Missing role ${company}`);
  }
  return role;
}

function storyById(id: string) {
  const story = publicStories.find((item) => item.id === id);
  if (!story) {
    throw new Error(`Missing story ${id}`);
  }
  return story;
}

/** One existing sentence per earlier role. The rest stays on /experience. */
function supportLine(company: string) {
  const role = roleByCompany(company);
  if (company === "Forcepoint" && role.points[1]) {
    return role.points[1];
  }
  return role.points[0];
}

export default function Home() {
  const current = roleByCompany("Truffle Security");
  const earlier = [roleByCompany("Rapid7"), roleByCompany("Forcepoint")];
  const fieldPractice = storyById("competitive-evidence");

  return (
    <PageMain>
      <section
        aria-labelledby="home-title"
        className="editorial-dark -mx-5 grid min-w-0 items-center gap-8 px-5 py-12 sm:-mx-8 sm:px-8 sm:py-16 lg:grid-cols-[minmax(0,1.45fr)_minmax(13rem,0.55fr)] lg:gap-12 lg:py-20"
      >
        <div className="min-w-0">
          <p className="editorial-eyebrow text-[#DFC1A9]">Enterprise cybersecurity · Revenue & GTM</p>
          <h1 id="home-title" className="editorial-title mt-5 max-w-[15ch]">
            Revenue & GTM Leader.
            <span className="mt-2 block italic text-[#E6B59A]">Curious Builder.</span>
          </h1>
          <p className="mt-5 max-w-[38rem] text-base font-medium leading-7 sm:text-lg sm:leading-8">
            People first. Problem-driven. Systems-minded.
          </p>
          <p className="editorial-subtle mt-3 max-w-[38rem] text-base leading-7">
            I&apos;m Kristen Joy Aing. I sell into complex enterprise security decisions, coach the people around the deal, and build practical systems when the same friction shows up again.
          </p>
          <div className="mt-7 grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 sm:flex sm:flex-wrap">
            <Link
              href="/work"
              className="inline-flex min-h-12 items-center justify-center rounded-lg bg-accent px-5 py-3 text-center text-sm font-semibold text-accent-foreground hover:bg-foreground"
            >
              Explore Work <span aria-hidden="true" className="ml-2">→</span>
            </Link>
            <Link
              href="/about"
              className="inline-flex min-h-12 items-center justify-center rounded-lg border border-[#D4CEC4] px-5 py-3 text-center text-sm font-semibold text-[#F3EFE6] hover:bg-[#4A504B]"
            >
              About Me <span aria-hidden="true" className="ml-2">→</span>
            </Link>
          </div>
        </div>
        <div className="mx-auto w-full max-w-[15rem] sm:max-w-[18rem] lg:max-w-[19rem]">
          <BrandAvatar variant="leader" />
          <p className="editorial-subtle mt-3 text-center text-xs leading-5">Curious by nature. Builder by instinct.</p>
        </div>
      </section>

      <section aria-labelledby="credibility-title" className="border-b border-border py-12 sm:py-16">
        <p className="editorial-eyebrow text-accent">01 / Credibility</p>
        <div className="mt-3 grid min-w-0 gap-8 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:items-start lg:gap-14">
          <h2 id="credibility-title" className="editorial-section-title max-w-[16ch]">
            Enterprise selling, with the people and the motion around it.
          </h2>
          <div className="min-w-0">
            <article className="border-t border-foreground pt-5">
              <p className="editorial-eyebrow text-accent">{current.period}</p>
              <h3 className="mt-2 font-display text-[clamp(2rem,4vw,3.25rem)] leading-tight">{current.company}</h3>
              <p className="mt-2 text-sm leading-6">{current.title}</p>
              <p className="mt-4 max-w-xl text-base leading-7">{current.points.join(" ")}</p>
            </article>
            <ul className="mt-6 divide-y divide-border border-y border-border">
              {earlier.map((role) => (
                <li key={role.company}>
                  <Link href="/experience" className="group grid min-w-0 gap-1 py-4 sm:grid-cols-[9.5rem_minmax(0,1fr)] sm:gap-6">
                    <span className="editorial-eyebrow pt-1 text-accent">{role.company}</span>
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold group-hover:text-accent">{role.title}</span>
                      <span className="mt-1 block text-sm leading-6 text-muted">{supportLine(role.company)}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/experience"
              className="editorial-link mt-5 inline-flex min-h-11 items-center text-sm font-semibold text-accent underline"
            >
              Read the experience timeline <span aria-hidden="true" className="ml-2">→</span>
            </Link>
          </div>
        </div>
      </section>

      <EditorialBento />

      <section aria-labelledby="featured-title" className="border-b border-border py-12 sm:py-16">
        <p className="editorial-eyebrow text-accent">03 / A field practice</p>
        <div className="mt-4 grid min-w-0 gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start lg:gap-14">
          <div className="min-w-0">
            <p className="editorial-eyebrow text-muted">{statusCopy.field}</p>
            <h2 id="featured-title" className="editorial-section-title mt-3 max-w-[18ch]">
              {fieldPractice.title}
            </h2>
          </div>
          <div className="min-w-0">
            <p className="max-w-xl text-base leading-7">{fieldPractice.context}</p>
            <p className="mt-3 max-w-xl text-base leading-7">
              <span className="font-medium">Contribution. </span>
              {fieldPractice.contribution}
            </p>
            <p className="mt-3 max-w-xl text-sm leading-6 text-muted">
              {statusHelp.field} {fieldPractice.evidence}
            </p>
            <Link
              href="/work/competitive-intelligence-engine"
              className="editorial-link mt-5 inline-flex min-h-11 items-center text-sm font-semibold text-accent underline"
            >
              Read the field approach <span aria-hidden="true" className="ml-2">→</span>
            </Link>
          </div>
        </div>
      </section>

      <section aria-labelledby="close-title" className="py-14 sm:py-20">
        <p className="editorial-eyebrow text-accent">04 / A note</p>
        <h2 id="close-title" className="editorial-quotation mt-4 max-w-[24ch]">
          The useful next step is a conversation.
        </h2>
        <p className="mt-5 max-w-xl text-base leading-7 text-muted">
          I like the hard enterprise problem, the teammate getting better at it, and the system that makes the next one easier. If that is the work you are in, I would like to hear about it.
        </p>
        <div className="mt-7 flex flex-col gap-3 min-[420px]:flex-row min-[420px]:items-center">
          <Link
            href="/contact"
            className="inline-flex min-h-12 items-center justify-center rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground hover:bg-foreground"
          >
            Get in touch <span aria-hidden="true" className="ml-2">→</span>
          </Link>
          <Link
            href="/about"
            className="inline-flex min-h-11 items-center px-1 text-sm font-semibold text-accent underline underline-offset-4"
          >
            About Me
          </Link>
        </div>
      </section>
    </PageMain>
  );
}
