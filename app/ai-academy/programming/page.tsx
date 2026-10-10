import type { Metadata } from "next";
import { ProgrammingFoundations } from "@/components/ai-academy/programming-foundations";

export const metadata: Metadata = {
  title: "Programming Foundations | Builder Academy",
  description: "Learn JavaScript, TypeScript, Python, SQL, HTML, CSS and the difference between languages, frameworks and runtimes.",
  robots: { index: false, follow: false },
};

export default function ProgrammingPage() {
  return <ProgrammingFoundations />;
}
