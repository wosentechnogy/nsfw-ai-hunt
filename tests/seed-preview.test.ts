import { describe, expect, it } from "vitest";
import { directoryTools } from "@/data/seed/tools";

function hasStructuredFeatureCoverage(tool: (typeof directoryTools)[number]) {
  return (
    tool.supportsNsfwChat ||
    tool.supportsImageGeneration ||
    tool.supportsVideoGeneration ||
    tool.supportsVoice ||
    tool.supportsPhoneCall ||
    tool.supportsCharacterCreation ||
    tool.supportsAnimeStyle ||
    tool.supportsRealisticStyle ||
    tool.hasMobileApp ||
    tool.hasWebApp ||
    tool.hasFreePlan ||
    tool.hasFreeTrial ||
    tool.acceptsCrypto ||
    tool.acceptsPaypal ||
    tool.acceptsCard
  );
}

describe("Task 24 preview seed coverage", () => {
  it("ships at least 20 publishable preview tool records with pricing, feature, and logo coverage", () => {
    const publishedTools = directoryTools.filter((tool) => tool.status === "published");
    const toolsWithPricingSummary = publishedTools.filter((tool) => tool.pricingModel !== "unknown");
    const toolsWithFeatureCoverage = publishedTools.filter(hasStructuredFeatureCoverage);
    const toolsWithSafeLogo = publishedTools.filter((tool) => Boolean(tool.logoUrl));

    expect(publishedTools.length).toBeGreaterThanOrEqual(20);
    expect(toolsWithPricingSummary.length).toBeGreaterThanOrEqual(20);
    expect(toolsWithFeatureCoverage.length).toBeGreaterThanOrEqual(20);
    expect(toolsWithSafeLogo.length).toBeGreaterThanOrEqual(10);
  });
});
