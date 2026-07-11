import { describe, expect, it } from "vitest";
import { directoryTools, getToolBySlug } from "@/data/seed/tools";

describe("affiliate pipeline seed coverage", () => {
  it("captures public affiliate or referral notes for the highest-priority launch tools", () => {
    const candy = getToolBySlug("candy-ai");
    const crushon = getToolBySlug("crushon-ai");
    const nomi = getToolBySlug("nomi-ai");
    const kindroid = getToolBySlug("kindroid");
    const muah = getToolBySlug("muah-ai");
    const girlfriendgpt = getToolBySlug("girlfriendgpt");
    const dreamgf = getToolBySlug("dreamgf");
    const ourdream = getToolBySlug("ourdream-ai");
    const spicier = getToolBySlug("spicier-ai");
    const soulgen = getToolBySlug("soulgen");

    expect(candy?.websiteUrl).toBe("https://candy.ai");
    expect(candy?.affiliateUrl).toContain("https://t.vlmai-1.com/");
    expect(candy?.affiliateProgramStatus).toBe("approved");
    expect(candy?.commissionRate).toContain("40.00%");
    expect(candy?.affiliateNetwork).toContain("CrakRevenue");

    expect(crushon?.websiteUrl).toBe("https://crushon.ai");
    expect(crushon?.affiliateUrl).toBe("https://crushon.ai/?ref=zdbjmta&mist=1");
    expect(crushon?.affiliateProgramStatus).toBe("approved");
    expect(crushon?.commissionRate).toContain("30%");
    expect(crushon?.affiliateNetwork).toContain("Tapfiliate");

    expect(nomi?.websiteUrl).toBe("https://nomi.ai");
    expect(nomi?.affiliateUrl).toBe("https://nomi.ai/?via=ate");
    expect(nomi?.affiliateProgramStatus).toBe("approved");
    expect(nomi?.commissionRate).toContain("30%");
    expect(nomi?.affiliateNetwork).toContain("Rewardful");

    expect(kindroid?.affiliateProgramStatus).toBe("none");
    expect(kindroid?.commissionType).toContain("referral");

    expect(muah?.websiteUrl).toBe("https://muah.ai");
    expect(muah?.affiliateUrl).toBe(
      "https://muah.ai/affiliate/track.php?ref=VSYIYHIV0N"
    );
    expect(muah?.commissionRate).toContain("40%");
    expect(muah?.affiliateNetwork).toContain("direct affiliate dashboard");

    expect(girlfriendgpt?.websiteUrl).toBe("https://girlfriendgpt.ai");
    expect(girlfriendgpt?.affiliateUrl).toContain("https://t.vlmai-1.com/");
    expect(girlfriendgpt?.affiliateProgramStatus).toBe("approved");
    expect(girlfriendgpt?.commissionRate).toContain("$45.00");
    expect(girlfriendgpt?.affiliateNetwork).toContain("CrakRevenue");

    expect(dreamgf?.websiteUrl).toBe("https://dreamgf.ai");
    expect(dreamgf?.affiliateUrl).toContain("https://t.vlmai-1.com/");
    expect(dreamgf?.affiliateProgramStatus).toBe("approved");
    expect(dreamgf?.commissionRate).toContain("35.00%");
    expect(dreamgf?.affiliateNetwork).toContain("CrakRevenue");

    expect(ourdream?.websiteUrl).toBe("https://ourdream.ai");
    expect(ourdream?.affiliateUrl).toContain("https://t.vlmai-1.com/");
    expect(ourdream?.affiliateProgramStatus).toBe("approved");
    expect(ourdream?.commissionRate).toContain("30.00%");
    expect(ourdream?.affiliateNetwork).toContain("CrakRevenue");

    expect(spicier?.websiteUrl).toBe("https://spicier.ai");
    expect(spicier?.affiliateUrl).toContain("https://t.vlmai-1.com/");
    expect(spicier?.affiliateProgramStatus).toBe("approved");
    expect(spicier?.commissionRate).toContain("Multi-CPA");
    expect(spicier?.affiliateNetwork).toContain("CrakRevenue");

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
