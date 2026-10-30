import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { AcademyBreadcrumb } from "@/components/academy-breadcrumb";
import { MyLearning } from "@/components/academy-account/my-learning";
import { getAcademyRuntime } from "@/lib/academy-account/server";
import { robotsNoindex } from "@/lib/indexing";
export const metadata = {
  title: "My learning",
  robots: robotsNoindex,
};
export const dynamic = "force-dynamic";
export default async function Page() {
  const context = getAcademyRuntime();
  let unavailable = !context;
  let signedIn = false;
  if (context) {
    try {
      signedIn = Boolean(
        (
          await context.auth.api.getSession({
            headers: await headers(),
            query: { disableCookieCache: true },
          })
        )?.user.emailVerified,
      );
    } catch {
      unavailable = true;
    }
    if (!unavailable && !signedIn) redirect("/ai-academy/sign-in");
  }
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="mx-auto w-full max-w-5xl px-5 py-12 sm:px-8"
    >
      <AcademyBreadcrumb title="My learning" />
      <h1 className="mt-6 text-3xl font-semibold">My learning</h1>
      {unavailable ? (
        <p className="mt-4">
          Your learning account is temporarily unavailable.{" "}
          <Link className="text-accent underline" href="/ai-academy">
            Keep exploring the public lessons.
          </Link>
        </p>
      ) : (
        <MyLearning />
      )}
    </main>
  );
}
