import { describe, expect, it } from "vitest";
import { directoryTools } from "@/data/seed/tools";
import { task24ExpansionTools } from "@/data/seed/task24-tool-expansion";

describe("Task 24 published data quality", () => {
  it("keeps every published record sourceable and editorially usable", () => {
    const publishedTools = directoryTools.filter((tool) => tool.status === "published");

    expect(publishedTools.length).toBeGreaterThanOrEqual(100);
    expect(new Set(publishedTools.map((tool) => tool.slug)).size).toBe(publishedTools.length);

    for (const tool of publishedTools) {
      expect(() => new URL(tool.websiteUrl)).not.toThrow();
      expect(tool.categorySlugs.length).toBeGreaterThan(0);
      expect(tool.description.length).toBeGreaterThanOrEqual(80);
      expect(tool.nsfwPolicySummary.length).toBeGreaterThanOrEqual(20);
      expect(tool.privacySummary.length).toBeGreaterThanOrEqual(20);
      expect(tool.lastCheckedAt).toMatch(/^202\d-\d{2}-\d{2}$/);
      expect(tool.pricingModel).not.toBeUndefined();
    }
  });

  it("keeps the Task 24 expansion free of unapproved affiliate URLs", () => {
    expect(task24ExpansionTools.length).toBeGreaterThanOrEqual(45);
    expect(task24ExpansionTools.every((tool) => tool.affiliateProgramStatus === "none")).toBe(true);
    expect(task24ExpansionTools.every((tool) => !tool.affiliateUrl)).toBe(true);
  });
});
