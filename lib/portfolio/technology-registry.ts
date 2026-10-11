/** Technology assets are vendored and reviewed, not loaded from third-party CDNs. */
export const technologies = {
  nextjs: { name: "Next.js", logo: "/logos/technology/nextjs.svg", source: "Logoforge" },
  react: { name: "React", logo: "/logos/technology/react.svg", source: "Logoforge" },
  typescript: { name: "TypeScript", logo: "/logos/technology/typescript.svg", source: "Logoforge" },
  tailwindcss: { name: "Tailwind CSS", logo: "/logos/technology/tailwindcss.svg", source: "Logoforge" },
  github: { name: "GitHub", logo: "/logos/technology/github.svg", source: "Logoforge" },
  vercel: { name: "Vercel", logo: "/logos/technology/vercel.svg", source: "Logoforge" },
} as const;

export type TechnologyId = keyof typeof technologies;
