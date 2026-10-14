import Link from "next/link";

export function NotFoundContent() {
  return (
    <main
      id="main-content"
      className="mx-auto flex w-full max-w-5xl flex-col px-5 py-16 sm:px-8"
    >
      <h1 className="font-display text-4xl tracking-tight">Page not found</h1>
      <p className="mt-4 max-w-xl text-base leading-7 text-muted">
        That address is not on this site.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex min-h-11 w-fit items-center text-sm font-semibold text-accent underline underline-offset-4"
      >
        Back to home
      </Link>
    </main>
  );
}
