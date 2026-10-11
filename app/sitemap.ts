import { capabilityViews } from "@/lib/capabilities";
import { projects } from "@/lib/portfolio";
import type { MetadataRoute } from "next";

const base = "https://www.byjoyaing.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const projectRoutes = projects.map((project) => ({
    url: `${base}/work/${project.slug}`,
  }));

  return [
    { url: base },
    { url: `${base}/about` },
    { url: `${base}/experience` },
    { url: `${base}/work` },
    { url: `${base}/side-quests` },
    { url: `${base}/builder-guide` },
    { url: `${base}/ai-academy` },
    { url: `${base}/projects` },
    { url: `${base}/capabilities` },
    { url: `${base}/field-notes` },
    { url: `${base}/field-notes/enterprise-deal` },
    { url: `${base}/field-notes/multithreading` },
    { url: `${base}/ai-academy/programming` },
    { url: `${base}/ai-academy/systems` },
    ...capabilityViews.map((view) => ({
      url: `${base}/capabilities/${view.slug}`,
    }))
    { url: `${base}/contact` },
    ...projectRoutes,
  ];
}
