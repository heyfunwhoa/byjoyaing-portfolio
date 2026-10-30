"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

/** Contextual return is separate from the stable collection hierarchy. */
export function ProjectResultsReturn() {
  const params = useSearchParams();
  if (params?.get("from") !== "projects") return null;
  const filters = new URLSearchParams();
  for (const key of ["category", "stage", "q"]) {
    const value = params.get(key);
    if (value) filters.set(key, value);
  }
  const query = filters.toString();
  // Fixed local destination: query values can never become a redirect target.
  const href = `/projects${query ? `?${query}` : ""}#directory`;
  return (
    <Link
      href={href}
      className="mt-1 inline-flex min-h-11 items-center text-sm font-medium text-accent underline underline-offset-4"
    >
      ← Back to your project results
    </Link>
  );
}
