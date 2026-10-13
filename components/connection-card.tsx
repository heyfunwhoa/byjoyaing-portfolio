import Image from "next/image";
import Link from "next/link";
import { BrandAvatar } from "@/components/brand-avatar";
import { PageMain } from "@/components/page-main";
import { socialProfiles } from "@/lib/portfolio/external-links";

// Fixed destination from the existing public-profile registry; never use query input.
const linkedin = socialProfiles.find((profile) => profile.id === "linkedin")!;

export function ConnectionCard({
  variant = "personal",
}: {
  variant?: "personal" | "truffle";
}) {
  const sales = variant === "truffle";
  const path = sales ? "/connect/truffle" : "/connect";
  const qrPath = `${path}/qr.png`;

  return (
    <PageMain>
      <section
        data-connect-page
        data-connect-variant={variant}
        aria-labelledby="connect-heading"
        className="mx-auto flex w-full max-w-md flex-col items-center gap-4 py-8 text-center sm:py-12"
      >
        {sales ? (
          <Image
            src="/brand/truffle/wordmark.svg"
            alt="Truffle Security"
            width={230}
            height={32}
            unoptimized
            className="h-auto w-52"
          />
        ) : null}
        <div className="w-24 sm:w-28">
          <BrandAvatar decorative />
        </div>
        {sales ? null : (
          <p className="font-display text-lg text-accent">joy.</p>
        )}
        <h1
          id="connect-heading"
          className="font-display text-4xl leading-tight tracking-tight"
        >
          Kristen Aing
        </h1>
        <p className="text-base font-medium">
          {sales
            ? "Senior Enterprise Account Executive · Truffle Security"
            : "Revenue & GTM Leader · Curious Builder"}
        </p>
        <p className="text-base leading-7 text-muted">
          {sales
            ? "Let’s talk about exposed secrets and how your team finds and fixes them."
            : "Great meeting you. Let’s keep the conversation going."}
        </p>
        {sales ? (
          <section
            aria-labelledby="truffle-message"
            className="w-full rounded-xl border border-border bg-card p-5 text-left"
          >
            <div className="flex items-center gap-4">
              <Image
                src="/brand/truffle/pixel-pig.svg"
                alt=""
                width={64}
                height={64}
                unoptimized
                className="h-auto w-16 shrink-0"
              />
              <h2
                id="truffle-message"
                className="text-2xl font-semibold tracking-tight"
              >
                Make secrets easier.
              </h2>
            </div>
            <p className="mt-3 text-sm leading-6 text-muted">
              TruffleHog helps security teams find exposed credentials, check
              whether they are active, and prioritize remediation.
            </p>
            <a
              href="https://trufflesecurity.com/"
              rel="noopener noreferrer"
              referrerPolicy="no-referrer"
              className="mt-2 inline-flex min-h-11 items-center text-sm font-medium text-accent underline underline-offset-4"
            >
              Explore Truffle Security ↗
            </a>
          </section>
        ) : null}
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
        {sales ? (
          <div className="w-full">
            <a
              href="https://trufflesecurity.com/contact"
              rel="noopener noreferrer"
              referrerPolicy="no-referrer"
              className="inline-flex min-h-12 w-full items-center justify-center rounded-lg border border-border px-4 py-3 font-medium text-accent"
            >
              Contact the Truffle team ↗
            </a>
            <p className="mt-2 text-xs leading-5 text-muted">
              Opens trufflesecurity.com/contact. For a personal connection with
              me, use LinkedIn above.
            </p>
          </div>
        ) : null}
        <details className="group w-full rounded-xl border border-border bg-card text-left">
          <summary className="min-h-12 cursor-pointer rounded-xl px-5 py-3 text-center font-medium">
            Show my QR code
          </summary>
          <div className="flex flex-col items-center gap-3 px-4 pb-5 text-center">
            <p className="text-sm leading-6 text-muted">
              {sales
                ? "Scan to open my Truffle Security connection card."
                : "Let someone scan this to open my connection page."}
            </p>
            <Image
              src={qrPath}
              alt={`QR code linking to byjoyaing.com${path}`}
              width={740}
              height={740}
              unoptimized
              className="h-auto w-full max-w-72 bg-white"
            />
            <p className="text-sm break-all text-muted">
              {`byjoyaing.com${path}`}
            </p>
            <a
              href={qrPath}
              download={
                sales ? "kristen-aing-truffle-qr.png" : "kristen-aing-qr.png"
              }
              className="inline-flex min-h-11 items-center rounded-md px-3 font-medium text-accent underline underline-offset-4"
            >
              Save QR image
            </a>
          </div>
        </details>
        {sales ? (
          <p className="text-xs leading-5 text-muted">
            Kristen’s professional contact card, hosted on her personal website.
          </p>
        ) : (
          <Link
            href="/work"
            className="inline-flex min-h-11 items-center rounded-md px-3 text-sm text-accent underline underline-offset-4"
          >
            Explore my work{" "}
            <span aria-hidden="true" className="ml-2">
              →
            </span>
          </Link>
        )}
        <p className="text-sm text-muted italic">
          {sales
            ? "Truffle Security · Secrets detection"
            : "Curious by nature. Builder by instinct."}
        </p>
      </section>
    </PageMain>
  );
}
