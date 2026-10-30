import Link from "next/link";
import { AcademyBreadcrumb } from "@/components/academy-breadcrumb";
import { robotsNoindex } from "@/lib/indexing";
export const metadata = {
  title: "Learning account privacy",
  robots: robotsNoindex,
};
export default function Page() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="mx-auto w-full max-w-3xl px-5 py-12 sm:px-8"
    >
      <AcademyBreadcrumb title="Account privacy" />
      <h1 className="mt-6 text-3xl font-semibold">
        Your learning, your choice
      </h1>
      <div className="mt-6 space-y-5 leading-7">
        <p>
          Lessons are public. An optional learner account remembers lessons you
          save, reading you mark reviewed and the lesson you choose to continue.
          It does not assess mastery or upload your practice answers.
        </p>
        <h2 className="text-xl font-semibold">What an account stores</h2>
        <p>
          Your email, a generated account identifier, sign-in/session records,
          and your lesson choices. Session records may include your IP address
          and browser information to support sign-in security. Email codes
          expire after five minutes and are stored as hashes. A session lasts up
          to seven days and may renew while you use the account.
        </p>
        <p>
          Better Auth handles identity on this site. The configured PostgreSQL
          database stores account and learning records; Resend processes your
          email address and sign-in code to deliver the requested message. This
          feature does not enroll you in marketing, send practice answers to AI,
          or grant access to private portfolio work.
        </p>
        <h2 className="text-xl font-semibold">Clear or delete</h2>
        <p>
          In My learning, clear bookmarks and reading progress without deleting
          your account, or delete your learner account and its linked learning
          records. Account deletion requires a recent sign-in. Operational
          backups and email-provider records can remain for their configured
          retention periods; deleting here does not erase those copies
          immediately.
        </p>
        <p>
          Contact{" "}
          <Link className="text-accent underline" href="/contact">
            Kristen
          </Link>{" "}
          for help with access or deletion. Never enter employer or
          customer-sensitive information into practice examples.
        </p>
        <Link
          className="inline-flex min-h-11 items-center text-accent underline"
          href="/ai-academy"
        >
          Back to the Academy
        </Link>
      </div>
    </main>
  );
}
