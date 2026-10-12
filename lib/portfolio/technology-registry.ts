/** Technology assets are vendored and reviewed, not loaded from third-party CDNs. */
export const technologies = {
  nextjs: { name: "Next.js", logo: "/logos/technology/nextjs.svg", source: "Logoforge", website: "https://nextjs.org" },
  react: { name: "React", logo: "/logos/technology/react.svg", source: "Logoforge", website: "https://react.dev" },
  typescript: { name: "TypeScript", logo: "/logos/technology/typescript.svg", source: "Logoforge", website: "https://www.typescriptlang.org" },
  tailwindcss: { name: "Tailwind CSS", logo: "/logos/technology/tailwindcss.svg", source: "Logoforge", website: "https://tailwindcss.com" },
  github: { name: "GitHub", logo: "/logos/technology/github.svg", source: "Logoforge", website: "https://github.com/heyfunwhoa/byjoyaing-portfolio" },
  vercel: { name: "Vercel", logo: "/logos/technology/vercel.svg", source: "Logoforge", website: "https://vercel.com" },
} as const;

export type TechnologyId = keyof typeof technologies;
