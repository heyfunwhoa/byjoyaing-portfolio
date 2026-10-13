import { completePageMetadata } from "@/lib/page-metadata";
import { VersionControlPlayground } from "@/components/ai-academy/version-control-playground";
import { robotsNoindex } from "@/lib/indexing";
import type { Metadata } from "next";

export const metadata: Metadata = completePageMetadata({
  title: "Git Workflow Essentials",
  description: "Interactive beginner practice for commits, branches, rebasing, pull requests and CI troubleshooting.",
  robots: robotsNoindex,
}, "/ai-academy/version-control");

export default function VersionControlPlaygroundPage() {
  return <VersionControlPlayground />;
}
