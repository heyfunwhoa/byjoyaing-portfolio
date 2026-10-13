import { ConnectionCard } from "@/components/connection-card";
import { completePageMetadata } from "@/lib/page-metadata";
export const metadata = completePageMetadata(
  {
    title: "Connect with Kristen at Truffle Security",
    description:
      "Talk with Kristen Aing about TruffleHog and exposed secrets. Choose LinkedIn or Truffle Security’s official contact page.",
  },
  "/connect/truffle",
);
export default function TruffleConnectPage() {
  return <ConnectionCard variant="truffle" />;
}
