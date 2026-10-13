import Image from "next/image";
import Link from "next/link";
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
        data-connect-page
        aria-labelledby="connect-heading"
        className="mx-auto flex w-full max-w-md flex-col items-center gap-4 py-8 text-center sm:py-12"
      >
        <div className="w-24 sm:w-28">
          <BrandAvatar decorative />
        </div>
        <p className="font-display text-lg text-accent">joy.</p>
        <h1
          id="connect-heading"
          className="font-display text-4xl leading-tight tracking-tight"
        >
          Kristen Aing
        </h1>
        <p className="text-base font-medium">
          Revenue &amp; GTM Leader · Curious Builder
        </p>
        <p className="text-base leading-7 text-muted">
          Great meeting you. Let&apos;s keep the conversation going.
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
            Opens my profile. You decide whether to send a connection request.
          </p>
        </div>
        <details className="group w-full rounded-xl border border-border bg-card text-left">
          <summary className="min-h-12 cursor-pointer rounded-xl px-5 py-3 text-center font-medium">
            Show my QR code
          </summary>
          <div className="flex flex-col items-center gap-3 px-4 pb-5 text-center">
            <p className="text-sm leading-6 text-muted">
              Let someone scan this to open my connection page.
            </p>
            <Image
              src="/connect/qr.png"
              alt="QR code linking to byjoyaing.com/connect"
              width={740}
              height={740}
              unoptimized
              className="h-auto w-full max-w-72 bg-white"
            />
            <p className="text-sm break-all text-muted">
              byjoyaing.com/connect
            </p>
            <a
              href="/connect/qr.png"
              download="kristen-aing-qr.png"
              className="inline-flex min-h-11 items-center rounded-md px-3 font-medium text-accent underline underline-offset-4"
            >
              Save QR image
            </a>
          </div>
        </details>
        <Link
          href="/work"
          className="inline-flex min-h-11 items-center rounded-md px-3 text-sm text-accent underline underline-offset-4"
        >
          Explore my work{" "}
          <span aria-hidden="true" className="ml-2">
            →
          </span>
        </Link>
        <p className="text-sm text-muted italic">
          Curious by nature. Builder by instinct.
        </p>
      </section>
    </PageMain>
  );
}
