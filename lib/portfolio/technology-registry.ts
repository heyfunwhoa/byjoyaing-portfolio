/** Technology assets are vendored and reviewed, not loaded from third-party CDNs. */
export const technologies = {
  github: { name: "GitHub", logo: "/logos/technology/github.svg", source: "Logoforge" },
  vercel: { name: "Vercel", logo: "/logos/technology/vercel.svg", source: "Logoforge" },
  nextjs: { name: "Next.js", logo: "/logos/technology/nextjs.svg", source: "Logoforge" },
} as const;

export type TechnologyId = keyof typeof technologies;
