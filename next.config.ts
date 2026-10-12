import { posthogIngestionHost, posthogRewrites } from "@/lib/posthog-browser";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  skipTrailingSlashRedirect: true,
  async redirects() {
    return [{ source: "/approach", destination: "/about", permanent: true }];
  },
  async rewrites() {
    return posthogRewrites(
      posthogIngestionHost(process.env.NEXT_PUBLIC_POSTHOG_HOST),
    );
  },
};

export default nextConfig;
