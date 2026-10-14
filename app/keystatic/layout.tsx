import KeystaticApp from "./keystatic";
import { robotsNoindex } from "@/lib/indexing";
import { keystaticLocalEnabled } from "@/lib/keystatic-local";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Academy editor",
  robots: robotsNoindex,
};

export default function Layout() {
  if (!keystaticLocalEnabled()) notFound();
  return <KeystaticApp />;
}
