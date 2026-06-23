import { describe, expect, it } from "vitest";
import { directoryTools, getToolBySlug } from "@/data/seed/tools";

describe("affiliate pipeline seed coverage", () => {
  it("captures public affiliate or referral notes for the highest-priority launch tools", () => {
    const candy = getToolBySlug("candy-ai");
    const crushon = getToolBySlug("crushon-ai");
    const nomi = getToolBySlug("nomi-ai");
    const kindroid = getToolBySlug("kindroid");
    const muah = getToolBySlug("muah-ai");
    const soulgen = getToolBySlug("soulgen");

    expect(candy?.affiliateProgramStatus).toBe("applied");
    expect(candy?.affiliateNetwork).toContain("FirstPromoter");

    expect(crushon?.affiliateProgramStatus).toBe("applied");
    expect(crushon?.affiliateNetwork).toContain("Tapfiliate");

    expect(nomi?.commissionRate).toContain("30%");
    expect(nomi?.affiliateNetwork).toContain("Rewardful");

    expect(kindroid?.affiliateProgramStatus).toBe("none");
    expect(kindroid?.commissionType).toContain("referral");

    expect(muah?.commissionRate).toContain("40%");
    expect(muah?.affiliateNetwork).toContain("direct affiliate dashboard");

    expect(soulgen?.affiliateProgramStatus).toBe("applied");
    expect(soulgen?.affiliateNetwork).toContain("direct affiliate application");
  });

  it("keeps multiple published tools with non-empty affiliate notes for launch operations", () => {
    const toolsWithAffiliateNotes = directoryTools.filter(
      (tool) => tool.status === "published" && (tool.commissionRate || tool.affiliateNetwork)
    );

    expect(toolsWithAffiliateNotes.length).toBeGreaterThanOrEqual(6);
  });
});
