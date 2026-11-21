import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The dev server treats its advertised host as localhost. Browsers and
  // Playwright that open 127.0.0.1 are otherwise blocked from dev assets.
  allowedDevOrigins: ["127.0.0.1"],
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      {
        source: "/connect/:path*",
        headers: [
          { key: "Referrer-Policy", value: "no-referrer" },
          { key: "X-Frame-Options", value: "DENY" },
          {
            key: "Content-Security-Policy",
            value:
              "frame-ancestors 'none'; base-uri 'self'; object-src 'none'; form-action 'none'; connect-src 'self'",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [{ source: "/approach", destination: "/about", permanent: true }];
  },
};

export default nextConfig;
