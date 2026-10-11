import { ProgrammingFoundations } from "@/components/ai-academy/programming-foundations";
import { robotsNoindex } from "@/lib/indexing";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Programming Foundations",
  description: "Learn JavaScript, TypeScript, Python, SQL, HTML, CSS and the difference between languages, frameworks and runtimes.",
  robots: robotsNoindex,
};

export default function ProgrammingPage() {
  return <ProgrammingFoundations />;
}
