import type { Metadata } from "next";
import { ApiLab } from "@/components/ai-academy/api-lab";
import { completePageMetadata } from "@/lib/page-metadata";
import { robotsNoindex } from "@/lib/indexing";

export const metadata: Metadata = completePageMetadata({
  title: "API Types and SDKs Lab",
  description: "Build an API three ways with Next.js, Express and n8n, and learn REST, GraphQL, webhooks, WebSockets and SDK fundamentals.",
  robots: robotsNoindex,
}, "/ai-academy/programming/api-lab");

export default function ApiLabPage() {
  return <ApiLab />;
}
