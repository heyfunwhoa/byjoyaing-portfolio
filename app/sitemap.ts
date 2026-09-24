import { capabilityViews } from "@/lib/capabilities";
import { projects } from "@/lib/portfolio";
import type { MetadataRoute } from "next";

const base = "https://www.byjoyaing.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const projectRoutes = projects.map((project) => ({
    url: `${base}/work/${project.slug}`,
    lastModified: new Date(),
  }));

  return [
    { url: base, lastModified: new Date() },
    { url: `${base}/about`, lastModified: new Date() },
    { url: `${base}/experience`, lastModified: new Date() },
    { url: `${base}/projects`, lastModified: new Date() },
    { url: `${base}/capabilities`, lastModified: new Date() },
    ...capabilityViews.map((view) => ({
      url: `${base}/capabilities/${view.slug}`,
      lastModified: new Date(),
    })),
    { url: `${base}/contact`, lastModified: new Date() },
    ...projectRoutes,
  ];
}
