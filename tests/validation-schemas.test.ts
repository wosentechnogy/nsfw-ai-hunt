import { describe, expect, it } from "vitest";
import {
  affiliateLinkSchema,
  blogPostSchema,
  categorySchema,
  comparisonSchema,
  toolSchema
} from "@/lib/validation";

const validTool = {
  slug: "candy-ai",
  name: "Candy AI",
  tagline: "AI companion chat with paid plans",
  description:
    "Candy AI is tracked as an adult AI companion product with pricing, privacy, feature, and restriction fields for comparison pages.",
  websiteUrl: "https://example.com",
  affiliateUrl: "https://example.com/affiliate",
  categorySlugs: ["ai-girlfriend-apps"],
  pricingModel: "subscription",
  supportsNsfwChat: true,
  lastCheckedAt: "2026-06-14"
} as const;

describe("shared validation schemas", () => {
  it("validates a publishable tool record", () => {
    expect(toolSchema.parse(validTool).slug).toBe("candy-ai");
  });

  it("rejects invalid slugs and placeholder descriptions", () => {
    expect(() =>
      toolSchema.parse({
        ...validTool,
        slug: "Candy AI",
        description: "TODO"
      })
    ).toThrow();
  });

  it("rejects prohibited content boundary terms in editorial fields", () => {
    expect(() =>
      toolSchema.parse({
        ...validTool,
        description: "A celebrity deepfake generator for leaked media."
      })
    ).toThrow();
  });

  it("validates categories, affiliate links, blog posts, and comparisons", () => {
    expect(
      categorySchema.parse({
        slug: "private-adult-ai-chat",
        name: "Private adult AI chat",
        description: "Tools grouped by privacy posture, login requirements, and payment options.",
        seoTitle: "Private Adult AI Chat Tools",
        seoDescription: "Compare private adult AI chat tools by policy, pricing, and privacy."
      }).slug
    ).toBe("private-adult-ai-chat");

    expect(
      affiliateLinkSchema.parse({
        toolSlug: "candy-ai",
        url: "https://example.com/signup",
        network: "direct",
        status: "approved",
        isPrimary: true
      }).isPrimary
    ).toBe(true);

    expect(
      blogPostSchema.parse({
        slug: "adult-ai-privacy-guide",
        title: "Adult AI Privacy Guide",
        excerpt: "How to compare adult AI tools by privacy, payment, and retention signals.",
        body: "This guide explains how to evaluate adult AI tools using visible privacy policies, payment options, and retention notes.",
        status: "published",
        author: "NSFW AI Hunt editorial",
        seoTitle: "Adult AI Privacy Guide",
        seoDescription: "Learn how to compare adult AI tools by privacy and payment posture."
      }).status
    ).toBe("published");

    expect(
      comparisonSchema.parse({
        slug: "candy-ai-vs-crushon-ai",
        toolASlug: "candy-ai",
        toolBSlug: "crushon-ai",
        verdict: "Candy AI is stronger for companion-style chat, while CrushOn AI is better for character roleplay discovery.",
        seoTitle: "Candy AI vs CrushOn AI",
        seoDescription: "Compare Candy AI and CrushOn AI by pricing, NSFW policy, privacy, and core features."
      }).slug
    ).toBe("candy-ai-vs-crushon-ai");
  });

  it("rejects duplicate-tool comparisons", () => {
    expect(() =>
      comparisonSchema.parse({
        slug: "candy-ai-vs-candy-ai",
        toolASlug: "candy-ai",
        toolBSlug: "candy-ai",
        verdict: "A duplicate comparison should not be publishable.",
        seoTitle: "Candy AI vs Candy AI",
        seoDescription: "Duplicate comparison."
      })
    ).toThrow();
  });
});

