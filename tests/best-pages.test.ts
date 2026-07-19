import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  bestPageConfigs,
  getIndexableBestPageSlugs,
  getBestItemListJsonLd,
  getBestPageData
} from "@/data/seed/tools";

describe("best-of page data helpers", () => {
  it("defines launch best-page configs for category, free, privacy, voice, and crypto intents", () => {
    expect(bestPageConfigs.map((config) => config.slug)).toEqual(
      expect.arrayContaining([
        "nsfw-ai-chatbots",
        "free-nsfw-ai-chatbots",
        "ai-girlfriend-apps-with-voice",
        "private-adult-ai-chat-apps",
        "nsfw-ai-tools-that-accept-crypto"
      ])
    );
  });

  it("builds ranked best-page data with methodology, disclosure, FAQ, and internal links", () => {
    const data = getBestPageData("free-nsfw-ai-chatbots");

    expect(data).toBeDefined();

    if (!data) {
      throw new Error("Expected best-page data");
    }

    expect(data.rankingRows.length).toBeGreaterThan(2);
    expect(data.methodology.length).toBeGreaterThanOrEqual(4);
    expect(data.faq.length).toBeGreaterThanOrEqual(3);
    expect(data.disclosure).toContain("affiliate");
    expect(data.rankingRows.every((row) => row.toolHref.startsWith("/tools/"))).toBe(true);
    expect(data.rankingRows.some((row) => row.ctaHref.startsWith("/go/"))).toBe(true);
    expect(data.relatedLinks.some((link) => link.href.startsWith("/category/"))).toBe(true);
  });

  it("generates ItemList JSON-LD from visible best-page ranking rows", () => {
    const data = getBestPageData("private-adult-ai-chat-apps");
    expect(data).toBeDefined();

    if (!data) {
      throw new Error("Expected best-page data");
    }

    const jsonLd = getBestItemListJsonLd(data);

    expect(jsonLd["@type"]).toBe("ItemList");
    expect(jsonLd.itemListElement.length).toBe(data.rankingRows.length);
    expect(jsonLd.itemListElement[0]?.position).toBe(1);
    expect(jsonLd.itemListElement[0]?.url).toContain("/tools/");
  });

  it("exposes only sufficiently populated best-page slugs for sitemap indexing", () => {
    const slugs = getIndexableBestPageSlugs();

    expect(slugs).toContain("nsfw-ai-chatbots");
    expect(slugs).not.toContain("nsfw-ai-tools-that-accept-crypto");
    expect(slugs).toEqual(
      expect.arrayContaining([
        "free-nsfw-ai-girlfriend-apps",
        "mobile-ai-companions",
        "ai-tools-with-image-support",
        "character-creation-ai-tools",
        "adult-ai-tools-with-free-access"
      ])
    );

    for (const slug of [
      "voice-ai-chat-tools",
      "adult-ai-tools-with-free-access",
      "private-ai-roleplay-tools",
      "image-and-chat-ai-tools"
    ]) {
      expect(getBestPageData(slug)?.rankingRows.length, `${slug} should have a useful ranking`).toBeGreaterThan(2);
    }
    expect(slugs.length).toBeGreaterThanOrEqual(30);
  });
});

describe("best-of page source", () => {
  it("defines metadata, static params, methodology, recommendations, FAQ, disclosure, and ItemList schema", () => {
    const source = readFileSync(join(process.cwd(), "app", "best", "[slug]", "page.tsx"), "utf8");

    expect(source).toContain("generateMetadata");
    expect(source).toContain("generateStaticParams");
    expect(source).toContain("application/ld+json");
    expect(source).toContain("Quick recommendation table");
    expect(source).toContain("Ranked recommendations");
    expect(source).toContain("Methodology");
    expect(source).toContain("FAQ");
    expect(source).toContain("Affiliate disclosure");
    expect(source).toContain("/go/");
  });
});
