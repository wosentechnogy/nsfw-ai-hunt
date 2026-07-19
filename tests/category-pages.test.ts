import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  directoryCategories,
  getCategoryBySlug,
  getCategoryItemListJsonLd,
  getCategoryPageData,
  getCategoryTools
} from "@/data/seed/tools";

describe("category page data helpers", () => {
  it("covers the expanded category page matrix with useful tool cohorts", () => {
    expect(directoryCategories.length).toBeGreaterThanOrEqual(10);

    for (const slug of [
      "free-nsfw-ai-chatbots",
      "voice-ai-companions",
      "mobile-ai-companions",
      "ai-tools-with-image-support",
      "character-creation-ai"
    ]) {
      expect(getCategoryTools(slug).length, `${slug} should have a useful cohort`).toBeGreaterThan(2);
    }
  });

  it("finds category metadata by slug", () => {
    const category = getCategoryBySlug("nsfw-ai-chatbots");

    expect(category?.label).toBe("NSFW AI chatbots");
    expect(getCategoryBySlug("missing-category")).toBeUndefined();
  });

  it("returns ranked tools that all belong to the category", () => {
    const tools = getCategoryTools("ai-girlfriend-apps");

    expect(tools.length).toBeGreaterThan(2);
    expect(tools.every((tool) => tool.categorySlugs.includes("ai-girlfriend-apps"))).toBe(true);

    const scores = tools.map((tool) => tool.editorScore ?? 0);
    expect(scores).toEqual([...scores].sort((scoreA, scoreB) => scoreB - scoreA));
  });

  it("builds page data with internal tool, comparison, and best-page links", () => {
    const data = getCategoryPageData("ai-girlfriend-apps");

    expect(data).toBeDefined();

    if (!data) {
      throw new Error("Expected category page data");
    }

    expect(data.rankingRows.length).toBeGreaterThan(2);
    expect(data.rankingRows.every((row) => row.toolHref.startsWith("/tools/"))).toBe(true);
    expect(data.comparisonLinks.length).toBeGreaterThan(0);
    expect(data.comparisonLinks.every((link) => link.href.startsWith("/compare/"))).toBe(true);
    expect(data.bestPageLinks.map((link) => link.href)).toContain("/best/ai-girlfriend-apps");
  });

  it("generates ItemList JSON-LD for visible ranking rows", () => {
    const data = getCategoryPageData("ai-girlfriend-apps");
    expect(data).toBeDefined();

    if (!data) {
      throw new Error("Expected category page data");
    }

    const jsonLd = getCategoryItemListJsonLd(data.category, data.tools);

    expect(jsonLd["@type"]).toBe("ItemList");
    expect(jsonLd.itemListElement.length).toBe(data.tools.length);
    expect(jsonLd.itemListElement[0]?.position).toBe(1);
    expect(jsonLd.itemListElement[0]?.url).toContain("/tools/");
  });
});

describe("category page source", () => {
  it("defines metadata, static params, ranking table, internal links, and ItemList schema", () => {
    const source = readFileSync(join(process.cwd(), "app", "category", "[slug]", "page.tsx"), "utf8");

    expect(source).toContain("generateMetadata");
    expect(source).toContain("generateStaticParams");
    expect(source).toContain("application/ld+json");
    expect(source).toContain("Ranking table");
    expect(source).toContain("Best by use case");
    expect(source).toContain("Related comparisons");
    expect(source).toContain("Best pages");
    expect(source).toContain("/compare/");
  });
});
