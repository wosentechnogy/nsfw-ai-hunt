import { z } from "zod";

const applicationStatusSchema = z.enum(["todo", "applied", "approved", "rejected", "paused"]);
const applicationOwnerEmailSchema = z.union([
  z.literal("985064198@qq.com"),
  z.literal("wosenkeji@gmail.com")
]);

const affiliateApplicationSchema = z
  .object({
    toolSlug: z.string().min(2),
    toolName: z.string().min(2),
    priority: z.number().int().min(1).max(20),
    status: applicationStatusSchema,
    programUrl: z.string().url(),
    network: z.string().min(2),
    publicPayoutSignal: z.string().min(10),
    nextAction: z.string().min(10),
    ownerEmail: applicationOwnerEmailSchema,
    accountContextNote: z.string().min(10).optional(),
    lastCheckedAt: z.string().date()
  })
  .superRefine((application, context) => {
    if (application.ownerEmail === "985064198@qq.com") {
      return;
    }

    if (application.toolSlug !== "nomi-ai" || !application.accountContextNote) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Only the documented Nomi AI account exception may use a non-985 owner email.",
        path: ["ownerEmail"]
      });
    }
  });

export type AffiliateApplication = z.output<typeof affiliateApplicationSchema>;

const rawAffiliateApplications = [
  {
    toolSlug: "nomi-ai",
    toolName: "Nomi AI",
    priority: 1,
    status: "approved",
    programUrl: "https://nomi.ai/nomi-ai-girlfriend-affiliate-program/",
    network: "Rewardful",
    publicPayoutSignal: "Public page advertises 30% lifetime recurring commissions.",
    nextAction: "Approved tracking URL captured; keep the official URL separate and route outbound clicks through /go/nomi-ai.",
    ownerEmail: "wosenkeji@gmail.com",
    accountContextNote:
      "Nomi-only authorized exception: Rewardful rejected the QQ mailbox, and the user authorized wosenkeji@gmail.com for this program only.",
    lastCheckedAt: "2026-07-10"
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
    status: "approved",
    programUrl: "https://affiliates.crakrevenue.com/offers/9022",
    network: "CrakRevenue",
    publicPayoutSignal: "CrakRevenue Candy.ai Revshare Lifetime offer is approved at 40.00% Revshare Lifetime.",
    nextAction: "Use the approved CrakRevenue tracking URL through /go/candy-ai; keep direct Candy AI application paths as optional backup only.",
    ownerEmail: "985064198@qq.com",
    lastCheckedAt: "2026-07-10"
  },
  {
    toolSlug: "crushon-ai",
    toolName: "CrushOn AI",
    priority: 4,
    status: "approved",
    programUrl: "https://crushonai.tapfiliate.com/login",
    network: "Tapfiliate",
    publicPayoutSignal: "Friends of CrushonAI approved with 30% recurring commission from the first 90 days after the first conversion.",
    nextAction: "Approved referral URL captured; keep the official URL separate and route outbound clicks through /go/crushon-ai.",
    ownerEmail: "985064198@qq.com",
    lastCheckedAt: "2026-07-10"
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
  },
  {
    toolSlug: "kupid-ai",
    toolName: "Kupid AI",
    priority: 7,
    status: "applied",
    programUrl: "https://www.kupid.ai/become-an-ai-girlfriend-affiliate",
    network: "Direct affiliate application",
    publicPayoutSignal: "Public page advertises 45% lifetime recurring commissions.",
    nextAction: "Application submitted through the official site; wait for review response before adding an affiliate URL.",
    ownerEmail: "985064198@qq.com",
    lastCheckedAt: "2026-07-10"
  },
  {
    toolSlug: "pephop-ai",
    toolName: "PepHop AI",
    priority: 8,
    status: "todo",
    programUrl: "https://pephop.ai/affiliate",
    network: "Email application",
    publicPayoutSignal: "Public page advertises up to 40% commission.",
    nextAction: "Official page requires emailing affiliate@pephop.ai; send manually from the 985 account context.",
    ownerEmail: "985064198@qq.com",
    lastCheckedAt: "2026-07-10"
  },
  {
    toolSlug: "spicychat-ai",
    toolName: "SpicyChat AI",
    priority: 9,
    status: "todo",
    programUrl: "https://promote.spicychat.ai/",
    network: "Tapfiliate",
    publicPayoutSignal: "Public signup page advertises 30% Standard, Initial Purchase, and Renewal commissions.",
    nextAction: "Manual CAPTCHA or Google OAuth is required; do not add an affiliate URL until approval exposes a tracking link.",
    ownerEmail: "985064198@qq.com",
    lastCheckedAt: "2026-07-10"
  },
  {
    toolSlug: "girlfriendgpt",
    toolName: "GirlfriendGPT",
    priority: 10,
    status: "approved",
    programUrl: "https://affiliates.crakrevenue.com/offers/10046",
    network: "CrakRevenue",
    publicPayoutSignal: "CrakRevenue Girlfriend GPT - PPS offer is approved at $45.00 PPS.",
    nextAction: "Use the approved CrakRevenue tracking URL through /go/girlfriendgpt; keep the Tapfiliate signup as an optional backup path only.",
    ownerEmail: "985064198@qq.com",
    lastCheckedAt: "2026-07-10"
  },
  {
    toolSlug: "dreamgf",
    toolName: "DreamGF",
    priority: 11,
    status: "approved",
    programUrl: "https://affiliates.crakrevenue.com/offers/9057",
    network: "CrakRevenue",
    publicPayoutSignal: "CrakRevenue Dreamgf.ai Revshare Lifetime offer is approved at 35.00% Revshare Lifetime.",
    nextAction: "Use the approved CrakRevenue tracking URL through /go/dreamgf; keep the direct reCAPTCHA request path as optional backup only.",
    ownerEmail: "985064198@qq.com",
    lastCheckedAt: "2026-07-10"
  },
  {
    toolSlug: "ourdream-ai",
    toolName: "OurDream AI",
    priority: 12,
    status: "approved",
    programUrl: "https://affiliates.crakrevenue.com/offers/10139",
    network: "CrakRevenue",
    publicPayoutSignal: "CrakRevenue ourdream.ai Revshare offer is approved at 30.00% Revshare Lifetime; PPS offer ID 10138 is also approved at $32.40 PPS as a backup.",
    nextAction: "Use the approved CrakRevenue revshare tracking URL through /go/ourdream-ai; do not store Everflow private billing details.",
    ownerEmail: "985064198@qq.com",
    lastCheckedAt: "2026-07-10"
  },
  {
    toolSlug: "spicier-ai",
    toolName: "Spicier AI",
    priority: 13,
    status: "approved",
    programUrl: "https://affiliates.crakrevenue.com/offers/10257",
    network: "CrakRevenue",
    publicPayoutSignal: "CrakRevenue Spicier - Multi-CPA offer is approved with a Multi-CPA payout structure.",
    nextAction: "Use the approved CrakRevenue tracking URL through /go/spicier-ai; keep the official URL separate.",
    ownerEmail: "985064198@qq.com",
    lastCheckedAt: "2026-07-11"
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
