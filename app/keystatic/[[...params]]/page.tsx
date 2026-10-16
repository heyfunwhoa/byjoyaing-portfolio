import { notFound } from "next/navigation";
import { keystaticMode } from "@/lib/academy/keystatic-access";

export const metadata = { robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function Page() {
  if (!keystaticMode(process.env)) notFound();
  const { default: Keystatic } = await import("../keystatic");
  return <Keystatic />;
}
