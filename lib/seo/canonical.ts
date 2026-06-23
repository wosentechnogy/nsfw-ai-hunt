import { siteConfig } from "@/lib/config/site";

export function getCanonicalUrl(path: `/${string}`) {
  return `${siteConfig.url}${path}`;
}
