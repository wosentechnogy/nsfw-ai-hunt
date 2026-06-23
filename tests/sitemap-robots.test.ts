import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import { getComparisonPageSlugs } from "@/data/seed/tools";

describe("sitemap and robots source", () => {
  it("defines sitemap and robots routes with published public pages", () => {
    const sitemapSource = readFileSync(join(process.cwd(), "app", "sitemap.ts"), "utf8");
    const robotsSource = readFileSync(join(process.cwd(), "app", "robots.ts"), "utf8");

    expect(sitemapSource).toContain("MetadataRoute.Sitemap");
    expect(sitemapSource).toContain("/tools/");
    expect(sitemapSource).toContain("/best/");
    expect(sitemapSource).toContain("/blog/");

    expect(robotsSource).toContain("MetadataRoute.Robots");
    expect(robotsSource).toContain("sitemap");
    expect(robotsSource).toContain("/admin");
  });

  it("includes indexable public routes in the sitemap and excludes noindex comparison pages", () => {
    const entries = sitemap();
    const urls = entries.map((entry) => entry.url);
    const comparisonUrls = urls.filter((url) => url.includes("/compare/"));

    expect(urls).toContain("https://nsfwaihunt.com/tools/candy-ai");
    expect(urls).toContain("https://nsfwaihunt.com/best/nsfw-ai-chatbots");
    expect(urls).toContain("https://nsfwaihunt.com/compare/candy-ai-vs-nomi-ai");
    expect(urls).toContain("https://nsfwaihunt.com/alternatives/candy-ai");
    expect(urls).toContain("https://nsfwaihunt.com/pricing/aroused-ai");
    expect(urls).toContain("https://nsfwaihunt.com/coupons/candy-ai");
    expect(urls).not.toContain("https://nsfwaihunt.com/best/nsfw-ai-tools-that-accept-crypto");
    expect(urls).not.toContain("https://nsfwaihunt.com/compare/janitor-ai-vs-soulgen");
    expect(urls).not.toContain("https://nsfwaihunt.com/coupons/aroused-ai");
    expect(comparisonUrls.length).toBeLessThan(getComparisonPageSlugs().length);
  });
});
