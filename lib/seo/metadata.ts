import type { Metadata } from "next";
import { siteConfig } from "@/lib/config/site";

type MetadataInput = Readonly<{
  title: string;
  description: string;
  path: `/${string}`;
  type?: "website" | "article";
  index?: boolean;
}>;

export function buildMetadata({
  title,
  description,
  path,
  type = "website",
  index = true
}: MetadataInput): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: path
    },
    openGraph: {
      title,
      description,
      url: path,
      siteName: siteConfig.name,
      type
    },
    robots: index
      ? undefined
      : {
          index: false,
          follow: false
        }
  };
}
