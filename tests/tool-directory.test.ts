import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  directoryCategories,
  directoryFeatureFilters,
  directoryPricingFilters,
  directorySortOptions,
  directoryTools,
  getToolDirectoryResults
} from "@/data/seed/tools";

describe("tool directory data and filters", () => {
  it("ships publishable seed records for the directory", () => {
    expect(directoryTools.length).toBeGreaterThanOrEqual(8);
    expect(directoryCategories.length).toBeGreaterThanOrEqual(5);

    for (const tool of directoryTools) {
      expect(tool.status).toBe("published");
      expect(tool.categorySlugs.length).toBeGreaterThan(0);
      expect(tool.description.toLowerCase()).not.toContain("placeholder");
      expect(tool.lastCheckedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });

  it("filters by category, feature, pricing, and search text", () => {
    const privateChatResults = getToolDirectoryResults({
      category: "private-adult-ai-chat",
      feature: "accepts-crypto",
      pricing: "subscription",
      q: "privacy",
      sort: "editor-score"
    });

    expect(privateChatResults.tools.length).toBeGreaterThan(0);
    expect(privateChatResults.tools.every((tool) => tool.categorySlugs.includes("private-adult-ai-chat"))).toBe(
      true
    );
    expect(privateChatResults.tools.every((tool) => tool.acceptsCrypto)).toBe(true);
    expect(privateChatResults.tools.every((tool) => tool.pricingModel === "subscription")).toBe(true);
  });

  it("provides visible filter and sort option labels for the page", () => {
    expect(directoryFeatureFilters.map((filter) => filter.label)).toContain("Voice");
    expect(directoryPricingFilters.map((filter) => filter.label)).toContain("Freemium");
    expect(directorySortOptions.map((option) => option.label)).toContain("Editor score");
  });
});

describe("tool directory page source", () => {
  it("defines the /tools route metadata and responsive directory controls", () => {
    const source = readFileSync(join(process.cwd(), "app", "tools", "page.tsx"), "utf8");

    expect(source).toContain("export const metadata");
    expect(source).toContain('name="q"');
    expect(source).toContain("Feature filters");
    expect(source).toContain("Sort by");
    expect(source).toContain("min-h-64");
  });
});
