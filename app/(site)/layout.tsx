import { SiteFrame } from "@/components/site-frame";
import type { ReactNode } from "react";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return <SiteFrame>{children}</SiteFrame>;
}
