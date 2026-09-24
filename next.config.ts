import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/approach", destination: "/about", permanent: true },
    ];
  },
};

export default nextConfig;
