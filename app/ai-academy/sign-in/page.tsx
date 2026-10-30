import Link from "next/link";
import { AcademyBreadcrumb } from "@/components/academy-breadcrumb";
import { AcademySignIn } from "@/components/academy-account/sign-in";
import { academyConfig } from "@/lib/academy-account/config";
import { validLesson } from "@/lib/academy-account/policy";
import { robotsNoindex } from "@/lib/indexing";
export const metadata = {
  title: "Sign in to Builder Academy",
  robots: robotsNoindex,
};
export const dynamic = "force-dynamic";
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ lesson?: string }>;
}) {
  const { lesson } = await searchParams;
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="mx-auto w-full max-w-3xl px-5 py-12 sm:px-8"
    >
      <AcademyBreadcrumb title="Sign in" />
      <h1 className="mt-6 text-3xl font-semibold">A place for your learning</h1>
      {academyConfig() ? (
        <AcademySignIn lesson={validLesson(lesson) ? lesson : null} />
      ) : (
        <p className="mt-4 leading-7">
          Learning accounts are not available yet.{" "}
          <Link className="text-accent underline" href="/ai-academy">
            All lessons are still open to explore.
          </Link>
        </p>
      )}
    </main>
  );
}
