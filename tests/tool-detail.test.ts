import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  directoryTools,
  getRelatedTools,
  getSoftwareApplicationJsonLd,
  getToolBySlug,
  getToolDetailSections
} from "@/data/seed/tools";

describe("tool detail data helpers", () => {
  it("finds tools by slug", () => {
    expect(getToolBySlug("candy-ai")?.name).toBe("Candy AI");
    expect(getToolBySlug("missing-tool")).toBeUndefined();
  });

  it("builds visible detail sections for a published tool page", () => {
    const tool = getToolBySlug("candy-ai");
    expect(tool).toBeDefined();

    if (!tool) {
      throw new Error("Expected Candy AI seed tool");
    }

    const sections = getToolDetailSections(tool);

    expect(sections.verdict).toContain(tool.name);
    expect(sections.featureRows.length).toBeGreaterThanOrEqual(8);
    expect(sections.pricingRows.length).toBeGreaterThanOrEqual(4);
    expect(sections.pros.length).toBeGreaterThanOrEqual(3);
    expect(sections.cons.length).toBeGreaterThanOrEqual(2);
    expect(sections.faq.length).toBeGreaterThanOrEqual(3);
  });

  it("selects related alternatives from overlapping categories", () => {
    const tool = getToolBySlug("candy-ai");
    expect(tool).toBeDefined();

    if (!tool) {
      throw new Error("Expected Candy AI seed tool");
    }

    const alternatives = getRelatedTools(tool, 3);

    expect(alternatives).toHaveLength(3);
    expect(alternatives.every((alternative) => alternative.slug !== tool.slug)).toBe(true);
    expect(
      alternatives.every((alternative) =>
        alternative.categorySlugs.some((slug) => tool.categorySlugs.includes(slug))
      )
    ).toBe(true);
  });

  it("generates SoftwareApplication JSON-LD from visible tool data", () => {
    const tool = getToolBySlug("candy-ai");
    expect(tool).toBeDefined();

    if (!tool) {
      throw new Error("Expected Candy AI seed tool");
    }

    const jsonLd = getSoftwareApplicationJsonLd(tool);

    expect(jsonLd["@type"]).toBe("SoftwareApplication");
    expect(jsonLd.name).toBe(tool.name);
    expect(jsonLd.url).toBe(tool.websiteUrl);
    expect(jsonLd.applicationCategory).toBe("Adult AI software");
    expect(jsonLd.offers.priceCurrency).toBe(tool.currency);
  });

  it("has enough published tools to statically generate detail pages", () => {
    expect(directoryTools.map((tool) => tool.slug)).toContain("candy-ai");
  });
});

describe("tool detail page source", () => {
  it("defines metadata, static params, structured data, and affiliate CTA", () => {
    const source = readFileSync(join(process.cwd(), "app", "tools", "[slug]", "page.tsx"), "utf8");

    expect(source).toContain("generateMetadata");
    expect(source).toContain("generateStaticParams");
    expect(source).toContain("application/ld+json");
    expect(source).toContain("Quick verdict");
    expect(source).toContain("Feature matrix");
    expect(source).toContain("Pricing");
    expect(source).toContain("Policy summary");
    expect(source).toContain("Privacy summary");
    expect(source).toContain("Pros and cons");
    expect(source).toContain("Best alternatives");
    expect(source).toContain("FAQ");
    expect(source).toContain("/go/");
  });
});
