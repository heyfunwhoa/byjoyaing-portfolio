import { publicSiteOrigin } from "@/lib/site-origin";
import { capabilityViews } from "@/lib/capabilities";
import { indexableStaticPaths } from "@/lib/indexing";
import { projects } from "@/lib/portfolio";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    ...indexableStaticPaths,
    ...capabilityViews.map((view) => `/capabilities/${view.slug}`),
    ...projects.map((project) => `/work/${project.slug}`),
  ];
  return paths.map((path) => ({
    url: new URL(path, publicSiteOrigin).href,
  }));
}
