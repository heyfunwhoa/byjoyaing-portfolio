import { ConnectionCard } from "@/components/connection-card";
import { completePageMetadata } from "@/lib/page-metadata";
export const metadata = completePageMetadata(
  {
    title: "Let’s connect",
    description:
      "Meet Kristen Aing — Revenue & GTM Leader. Curious Builder. Connect on LinkedIn when you’re ready.",
  },
  "/connect",
);
export default function ConnectPage() {
  return <ConnectionCard />;
}
