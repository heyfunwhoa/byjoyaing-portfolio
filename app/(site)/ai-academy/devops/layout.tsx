import { robotsNoindex } from "@/lib/indexing";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = { robots: robotsNoindex };

export default function DevopsLayout({ children }: { children: ReactNode }) {
  return children;
}
