import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  getAlternativePageData,
  getAlternativePageSlugs,
  getIndexableAlternativePageSlugs
} from "@/data/seed/tools";

describe("alternative page data helpers", () => {
  it("generates an alternatives page slug for each launch seed tool", () => {
    const slugs = getAlternativePageSlugs();

    expect(slugs).toContain("candy-ai");
    expect(slugs).toContain("janitor-ai");
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("builds alternative-page data with switching reasons, ranked tools, and comparison links", () => {
    const data = getAlternativePageData("candy-ai");

    expect(data).toBeDefined();

    if (!data) {
      throw new Error("Expected alternatives page data");
    }

    expect(data.baseTool.name).toBe("Candy AI");
    expect(data.reasonSummary.toLowerCase()).toContain("candy ai");
    expect(data.rankingRows.length).toBeGreaterThanOrEqual(3);
    expect(data.rankingRows.every((row) => row.tool.slug !== data.baseTool.slug)).toBe(true);
    expect(data.bestFreeAlternative).toBeDefined();
    expect(data.bestPrivateAlternative).toBeDefined();
    expect(data.bestImageAlternative).toBeDefined();
    expect(data.comparisonLinks.some((link) => link.href.startsWith("/compare/"))).toBe(true);
  });

  it("exposes only alternatives pages with enough recommendation data for sitemap indexing", () => {
    const slugs = getIndexableAlternativePageSlugs();

    expect(slugs).toContain("candy-ai");
    expect(slugs.every((slug) => {
      const data = getAlternativePageData(slug);
      return Boolean(data && data.rankingRows.length >= 3 && data.comparisonLinks.length >= 3);
    })).toBe(true);
  });
});

describe("alternative page source", () => {
  it("defines metadata, static params, ranked alternatives, best slices, and comparison links", () => {
    const source = readFileSync(
      join(process.cwd(), "app", "alternatives", "[slug]", "page.tsx"),
      "utf8"
    );

    expect(source).toContain("generateMetadata");
    expect(source).toContain("generateStaticParams");
    expect(source).toContain("Why users switch");
    expect(source).toContain("Recommended alternatives");
    expect(source).toContain("Best free alternative");
    expect(source).toContain("Best private alternative");
    expect(source).toContain("Best image-support alternative");
    expect(source).toContain("/compare/");
    expect(source).toContain("/go/");
  });
});
