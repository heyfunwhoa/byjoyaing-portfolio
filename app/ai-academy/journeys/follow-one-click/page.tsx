import type { Metadata } from "next";
import { completePageMetadata } from "@/lib/page-metadata";
import { getClickMissionMetadata } from "@/lib/academy/click-mission-metadata";
import { FollowOneClick } from "@/components/academy/follow-one-click";
import { PageMain } from "@/components/page-main";

export const metadata: Metadata = completePageMetadata(
  {
    title: `${getClickMissionMetadata().missionTitle} — guided practice`,
    description:
      "Trace a fictional account request, understand permission checks and practice explaining HTTP responses. Resume progress on this device.",
  },
  "/ai-academy/journeys/follow-one-click",
);

export default function FollowOneClickPage() {
  return (
    <PageMain>
      <div className="py-12 sm:py-16">
        <FollowOneClick {...getClickMissionMetadata()} />
      </div>
    </PageMain>
  );
}
