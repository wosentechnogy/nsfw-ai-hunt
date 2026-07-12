import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  directoryTools,
  getComparisonPageData,
  getComparisonPageSlugs,
  getIndexableComparisonPageSlugs,
  getComparisonWebPageJsonLd
} from "@/data/seed/tools";

describe("comparison page data helpers", () => {
  it("generates unique comparison slugs from tool pairs without reverse duplicates", () => {
    const slugs = getComparisonPageSlugs();

    expect(slugs).toContain("candy-ai-vs-nomi-ai");
    expect(slugs).not.toContain("crushon-ai-vs-candy-ai");
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("builds comparison data with verdict, table rows, alternatives, and CTA links", () => {
    const data = getComparisonPageData("candy-ai-vs-crushon-ai");

    expect(data).toBeDefined();

    if (!data) {
      throw new Error("Expected comparison page data");
    }

    expect(data.verdict.toLowerCase()).toContain("candy ai");
    expect(data.featureRows.length).toBeGreaterThanOrEqual(7);
    expect(data.pricingRows.length).toBeGreaterThanOrEqual(5);
    expect(data.bestForRows).toHaveLength(4);
    expect(data.alternativeLinks.length).toBeGreaterThan(0);
    expect(data.toolA.ctaHref).toBe("/go/candy-ai");
    expect(data.toolB.ctaHref).toBe("/go/crushon-ai");
  });

  it("marks low-data comparisons as non-indexable when a page should not publish", () => {
    const lowDataTool = directoryTools.find((tool) => tool.slug === "janitor-ai");
    expect(lowDataTool).toBeDefined();

    const data = getComparisonPageData("janitor-ai-vs-soulgen");
    expect(data).toBeDefined();

    if (!data) {
      throw new Error("Expected low-data comparison result");
    }

    expect(data.indexable).toBe(false);
  });

  it("generates WebPage JSON-LD from the visible comparison page", () => {
    const data = getComparisonPageData("nomi-ai-vs-kindroid");
    expect(data).toBeDefined();

    if (!data) {
      throw new Error("Expected comparison page data");
    }

    const jsonLd = getComparisonWebPageJsonLd(data);

    expect(jsonLd["@type"]).toBe("WebPage");
    expect(jsonLd.name).toContain("Nomi AI vs Kindroid");
    expect(jsonLd.url).toContain("/compare/nomi-ai-vs-kindroid");
  });

  it("exposes only indexable comparison slugs for sitemap indexing", () => {
    const slugs = getIndexableComparisonPageSlugs();

    expect(slugs).toContain("candy-ai-vs-nomi-ai");
    expect(slugs).not.toContain("janitor-ai-vs-soulgen");
  });

  it("keeps low-differentiation comparison pairs out of the indexable set", () => {
    const allSlugs = getComparisonPageSlugs();
    const indexableSlugs = getIndexableComparisonPageSlugs();

    expect(indexableSlugs.length).toBeLessThan(allSlugs.length);
    expect(indexableSlugs.length / allSlugs.length).toBeLessThan(0.9);
  });
});

describe("comparison page source", () => {
  it("defines metadata, static params, verdict, side-by-side tables, alternatives, and CTA links", () => {
    const source = readFileSync(join(process.cwd(), "app", "compare", "[slug]", "page.tsx"), "utf8");

    expect(source).toContain("generateMetadata");
    expect(source).toContain("generateStaticParams");
    expect(source).toContain("application/ld+json");
    expect(source).toContain("Verdict");
    expect(source).toContain("Feature comparison");
    expect(source).toContain("Pricing comparison");
    expect(source).toContain("Best for");
    expect(source).toContain("Alternatives");
    expect(source).toContain("/go/");
  });
});
