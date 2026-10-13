import { notFound } from "next/navigation";
import { localEditorEnabled } from "@/lib/academy/keystatic-access";

export const metadata = { robots: { index: false, follow: false } };

export default async function Page() {
  if (!localEditorEnabled(process.env)) notFound();
  const { default: Keystatic } = await import("../keystatic");
  return <Keystatic />;
}
