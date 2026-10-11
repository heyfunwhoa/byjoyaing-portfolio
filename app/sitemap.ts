import { capabilityViews } from "@/lib/capabilities";
import { indexableStaticPaths } from "@/lib/indexing";
import { projects } from "@/lib/portfolio";
import type { MetadataRoute } from "next";

const base = "https://www.byjoyaing.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    ...indexableStaticPaths,
    ...capabilityViews.map((view) => `/capabilities/${view.slug}`),
    ...projects.map((project) => `/work/${project.slug}`),
  ];
  return paths.map((path) => ({
    url: path === "/" ? base : `${base}${path}`,
  }));
}
