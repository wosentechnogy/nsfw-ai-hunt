import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import { siteConfig } from "@/lib/config/site";

const commercialRoutes = [
  "/about",
  "/contact",
  "/submit-tool",
  "/advertise",
  "/privacy",
  "/terms",
  "/affiliate-disclosure",
  "/compare"
] as const;

describe("commercial static pages", () => {
  it("implements every footer and comparison hub route needed before launch", () => {
    for (const route of commercialRoutes) {
      const pagePath = join(process.cwd(), "app", route.slice(1), "page.tsx");

      expect(existsSync(pagePath), `${route} is missing a page.tsx`).toBe(true);
      expect(readFileSync(pagePath, "utf8")).toContain("buildMetadata");
    }
  });

  it("does not leave footer navigation pointing at missing launch pages", () => {
    for (const item of siteConfig.footerNav) {
      const pagePath = join(process.cwd(), "app", item.href.slice(1), "page.tsx");

      expect(existsSync(pagePath), `${item.href} is missing a page.tsx`).toBe(true);
    }
  });

  it("includes commercial static pages in the sitemap", () => {
    const urls = sitemap().map((entry) => entry.url);

    for (const route of commercialRoutes) {
      expect(urls).toContain(`https://nsfwaihunt.com${route}`);
    }
  });
});
