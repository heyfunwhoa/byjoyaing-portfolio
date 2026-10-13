import { BrandAvatar } from "@/components/brand-avatar";
import { PageMain } from "@/components/page-main";
import { completePageMetadata } from "@/lib/page-metadata";
import { socialProfiles } from "@/lib/portfolio/external-links";

export const metadata = completePageMetadata(
  {
    title: "Let’s connect",
    description:
      "Meet Kristen Aing — Revenue & GTM Leader. Curious Builder. Connect on LinkedIn when you’re ready.",
  },
  "/connect",
);

// Fixed destination from the existing public-profile registry; never use query input.
const linkedin = socialProfiles.find((profile) => profile.id === "linkedin")!;

export default function ConnectPage() {
  return (
    <PageMain>
      <section
        aria-labelledby="connect-heading"
        className="mx-auto flex w-full max-w-md flex-col items-center gap-5 py-10 text-center sm:py-16"
      >
        <div className="w-24 sm:w-28">
          <BrandAvatar decorative />
        </div>
        <p className="font-display text-lg text-accent">joy. · Kristen Aing</p>
        <h1
          id="connect-heading"
          className="font-display text-4xl leading-tight tracking-tight"
        >
          Let&apos;s stay connected.
        </h1>
        <p className="text-base font-medium">
          Revenue &amp; GTM Leader · Curious Builder
        </p>
        <p className="text-base leading-7 text-muted">
          Great meeting you. I work in enterprise cybersecurity and build useful
          systems for people and teams.
        </p>
        <div className="flex w-full flex-col gap-3 pt-2">
          <a
            href={linkedin.href}
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-foreground px-5 py-3 font-medium text-background hover:opacity-90"
            rel="noreferrer noopener"
            referrerPolicy="no-referrer"
            aria-describedby="linkedin-explanation linkedin-destination"
          >
            Continue to LinkedIn <span aria-hidden="true">↗</span>
          </a>
          <p id="linkedin-destination" className="text-sm break-all text-muted">
            linkedin.com/in/kristenaing
          </p>
          <p id="linkedin-explanation" className="text-sm leading-6 text-muted">
            Opens my profile. You choose whether to send a connection request; I
            review requests on LinkedIn. Scanning alone doesn&apos;t connect us.
          </p>
        </div>
        <p className="text-sm text-muted italic">
          Curious by nature. Builder by instinct.
        </p>
      </section>
    </PageMain>
  );
}
