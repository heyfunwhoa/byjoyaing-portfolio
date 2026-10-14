import { NotFoundContent } from "@/components/not-found-content";
import { robotsNoindex } from "@/lib/indexing";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found",
  robots: robotsNoindex,
};

export default function NotFound() {
  return <NotFoundContent />;
}
