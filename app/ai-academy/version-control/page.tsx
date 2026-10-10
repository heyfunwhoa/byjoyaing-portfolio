import type { Metadata } from "next";
import { VersionControlPlayground } from "@/components/ai-academy/version-control-playground";

export const metadata: Metadata = {
  title: "Version Control Playground | Builder Academy",
  description: "Interactive beginner practice for commits, branches, rebasing, pull requests and CI troubleshooting.",
  robots: { index: false, follow: false },
};

export default function VersionControlPlaygroundPage() {
  return <VersionControlPlayground />;
}
