import type { Metadata } from "next";

const fallbackTitle = "Kristen Aing — Revenue & GTM Leader · Curious Builder";
const fallbackDescription =
  "Enterprise cybersecurity selling, people development and practical GTM systems.";
const socialImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "Kristen Aing — Revenue & GTM Leader · Curious Builder",
};

/** Complete each route's metadata while preserving its robots and title policy. */
export function completePageMetadata(
  metadata: Metadata,
  pathname: string,
): Metadata {
  const title =
    typeof metadata.title === "string"
      ? metadata.title
      : metadata.title && "absolute" in metadata.title
        ? metadata.title.absolute
        : metadata.title && "default" in metadata.title
          ? metadata.title.default
          : fallbackTitle;
  const description = metadata.description ?? fallbackDescription;
  return {
    ...metadata,
    alternates: { ...metadata.alternates, canonical: pathname },
    openGraph: {
      ...metadata.openGraph,
      title,
      description,
      url: pathname,
      images: [socialImage],
    },
    twitter: {
      ...metadata.twitter,
      card: "summary_large_image",
      title,
      description,
      images: [socialImage],
    },
  };
}
