import type { MetadataRoute } from "next";
import {
  directoryCategories,
  directoryTools,
  getIndexableBestPageSlugs,
  getIndexableComparisonPageSlugs,
  getBlogPostSlugs,
  getIndexableAlternativePageSlugs,
  getIndexableCouponPageSlugs,
  getIndexablePricingPageSlugs
} from "@/data/seed/tools";
import { siteConfig } from "@/lib/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "/",
    "/tools",
    "/compare",
    "/blog",
    "/about",
    "/contact",
    "/submit-tool",
    "/privacy",
    "/terms",
    "/affiliate-disclosure"
  ] as const;

  const dynamicRoutes = [
    ...directoryTools.map((tool) => `/tools/${tool.slug}`),
    ...directoryCategories.map((category) => `/category/${category.slug}`),
    ...getIndexableBestPageSlugs().map((slug) => `/best/${slug}`),
    ...getIndexableComparisonPageSlugs().map((slug) => `/compare/${slug}`),
    ...getIndexableAlternativePageSlugs().map((slug) => `/alternatives/${slug}`),
    ...getIndexablePricingPageSlugs().map((slug) => `/pricing/${slug}`),
    ...getIndexableCouponPageSlugs().map((slug) => `/coupons/${slug}`),
    ...getBlogPostSlugs().map((slug) => `/blog/${slug}`)
  ];

  return [...staticRoutes, ...dynamicRoutes].map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date("2026-06-22")
  }));
}
