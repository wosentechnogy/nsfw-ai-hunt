import { z } from "zod";

const applicationStatusSchema = z.enum(["todo", "applied", "approved", "rejected", "paused"]);

const affiliateApplicationSchema = z.object({
  toolSlug: z.string().min(2),
  toolName: z.string().min(2),
  priority: z.number().int().min(1).max(20),
  status: applicationStatusSchema,
  programUrl: z.string().url(),
  network: z.string().min(2),
  publicPayoutSignal: z.string().min(10),
  nextAction: z.string().min(10),
  ownerEmail: z.literal("985064198@qq.com"),
  lastCheckedAt: z.string().date()
});

export type AffiliateApplication = z.output<typeof affiliateApplicationSchema>;

const rawAffiliateApplications = [
  {
    toolSlug: "nomi-ai",
    toolName: "Nomi AI",
    priority: 1,
    status: "applied",
    programUrl: "https://nomi.ai/nomi-ai-girlfriend-affiliate-program/",
    network: "Rewardful after approval",
    publicPayoutSignal: "Public page advertises 30% lifetime recurring commissions.",
    nextAction: "Use the official program flow under the 985 account context; after approval, record only the approved tracking URL.",
    ownerEmail: "985064198@qq.com",
    lastCheckedAt: "2026-07-09"
  },
  {
    toolSlug: "muah-ai",
    toolName: "Muah AI",
    priority: 2,
    status: "approved",
    programUrl: "https://muah.ai/affiliate/",
    network: "Direct affiliate dashboard",
    publicPayoutSignal: "Public page advertises 40% commission on total paid amount.",
    nextAction: "Approved tracking URL captured; confirm commercial account readiness in the direct dashboard without storing private finance details.",
    ownerEmail: "985064198@qq.com",
    lastCheckedAt: "2026-07-09"
  },
  {
    toolSlug: "candy-ai",
    toolName: "Candy AI",
    priority: 3,
    status: "applied",
    programUrl: "https://candy.ai/affiliate",
    network: "FirstPromoter or Everflow",
    publicPayoutSignal: "Public terms confirm lifetime revshare plus CPS or PPS offer types.",
    nextAction: "Confirm application status through the official flow under the 985 account context and replace only the affiliate URL after approval.",
    ownerEmail: "985064198@qq.com",
    lastCheckedAt: "2026-07-09"
  },
  {
    toolSlug: "crushon-ai",
    toolName: "CrushOn AI",
    priority: 4,
    status: "applied",
    programUrl: "https://crushonai.tapfiliate.com/",
    network: "Tapfiliate",
    publicPayoutSignal: "Dashboard shows 30% Standard and 50% THE END OF TIME commission structures, but the program is still pending.",
    nextAction: "Wait for Tapfiliate approval; when View is enabled and the Deeplink generator is populated, capture the final tracking link before replacing the official fallback URL.",
    ownerEmail: "985064198@qq.com",
    lastCheckedAt: "2026-07-09"
  },
  {
    toolSlug: "soulgen",
    toolName: "SoulGen",
    priority: 5,
    status: "applied",
    programUrl: "https://www.soulgen.ai/",
    network: "Direct affiliate application",
    publicPayoutSignal: "Official Google Form advertises 20% of revenue from approved traffic.",
    nextAction: "Use the official program flow under the 985 account context; after approval, collect only the affiliate link and non-secret program rules.",
    ownerEmail: "985064198@qq.com",
    lastCheckedAt: "2026-07-09"
  },
  {
    toolSlug: "kindroid",
    toolName: "Kindroid",
    priority: 6,
    status: "paused",
    programUrl: "https://docs.kindroid.ai/referrels/referrals",
    network: "Referral credits only",
    publicPayoutSignal: "Public docs describe referral credits rather than a cash affiliate payout.",
    nextAction: "Do not prioritize unless a separate cash affiliate program becomes available.",
    ownerEmail: "985064198@qq.com",
    lastCheckedAt: "2026-07-09"
  }
] as const;

export const affiliateApplications = rawAffiliateApplications
  .map((application) => affiliateApplicationSchema.parse(application))
  .sort((left, right) => left.priority - right.priority) satisfies readonly AffiliateApplication[];

export function getAffiliateApplicationSummary() {
  return {
    total: affiliateApplications.length,
    todo: affiliateApplications.filter((application) => application.status === "todo").length,
    applied: affiliateApplications.filter((application) => application.status === "applied").length,
    approved: affiliateApplications.filter((application) => application.status === "approved").length,
    paused: affiliateApplications.filter((application) => application.status === "paused").length
  };
}
