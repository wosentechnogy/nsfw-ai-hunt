import { z } from "zod";

const prohibitedContentPattern =
  /\b(teen|minors?|schoolgirl|schoolboy|incest|coerc(?:ion|ive)?|non[-\s]?consensual|celebrity|deepfake|leaked|pirated)\b/i;

const placeholderPattern = /^(todo|tbd|placeholder|lorem ipsum|unknown)$/i;

const slugSchema = z
  .string()
  .min(2)
  .max(120)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase words separated by hyphens.");

const safeEditorialTextSchema = z
  .string()
  .trim()
  .min(20)
  .max(5000)
  .refine((value) => !placeholderPattern.test(value), "Do not use placeholder copy.")
  .refine(
    (value) => !prohibitedContentPattern.test(value),
    "Text violates the adult software directory content boundary."
  );

const optionalSafeEditorialTextSchema = z
  .string()
  .trim()
  .min(1)
  .max(5000)
  .refine((value) => !placeholderPattern.test(value), "Do not use placeholder copy.")
  .refine(
    (value) => !prohibitedContentPattern.test(value),
    "Text violates the adult software directory content boundary."
  )
  .optional();

const urlSchema = z.string().url();

export const toolStatusSchema = z.enum(["draft", "published", "archived"]);
export const affiliateStatusSchema = z.enum(["none", "applied", "approved", "rejected", "paused"]);
export const pricingModelSchema = z.enum([
  "free",
  "freemium",
  "subscription",
  "credits",
  "one_time",
  "unknown"
]);
export const contentStatusSchema = z.enum(["draft", "review", "published", "noindex"]);

export const toolSchema = z.object({
  slug: slugSchema,
  name: z.string().trim().min(2).max(120),
  tagline: z.string().trim().min(8).max(180),
  description: safeEditorialTextSchema,
  websiteUrl: urlSchema,
  affiliateUrl: urlSchema.optional(),
  logoUrl: urlSchema.optional(),
  safeScreenshotUrl: urlSchema.optional(),
  status: toolStatusSchema.default("draft"),
  editorScore: z.number().min(0).max(10).optional(),
  popularityScore: z.number().int().min(0).default(0),
  isFeatured: z.boolean().default(false),
  isSponsored: z.boolean().default(false),
  categorySlugs: z.array(slugSchema).min(1),
  supportsNsfwChat: z.boolean().default(false),
  supportsImageGeneration: z.boolean().default(false),
  supportsVideoGeneration: z.boolean().default(false),
  supportsVoice: z.boolean().default(false),
  supportsPhoneCall: z.boolean().default(false),
  supportsCharacterCreation: z.boolean().default(false),
  supportsAnimeStyle: z.boolean().default(false),
  supportsRealisticStyle: z.boolean().default(false),
  hasMobileApp: z.boolean().default(false),
  hasWebApp: z.boolean().default(true),
  hasFreePlan: z.boolean().default(false),
  hasFreeTrial: z.boolean().default(false),
  requiresCreditCard: z.boolean().default(false),
  acceptsCrypto: z.boolean().default(false),
  acceptsPaypal: z.boolean().default(false),
  acceptsCard: z.boolean().default(false),
  nsfwPolicySummary: safeEditorialTextSchema.default("Policy details have not been verified yet."),
  privacySummary: safeEditorialTextSchema.default("Privacy details have not been verified yet."),
  dataRetentionSummary: safeEditorialTextSchema.default(
    "Data retention details have not been verified yet."
  ),
  contentRestrictions: safeEditorialTextSchema.default(
    "Content restrictions have not been verified yet."
  ),
  geoRestrictions: safeEditorialTextSchema.default("Geographic restrictions have not been verified yet."),
  ageRequirement: z.string().trim().min(2).max(40).default("18+"),
  pricingModel: pricingModelSchema.default("unknown"),
  startingPrice: z.number().min(0).optional(),
  currency: z.string().trim().length(3).default("USD"),
  affiliateProgramStatus: affiliateStatusSchema.default("none"),
  commissionType: optionalSafeEditorialTextSchema,
  commissionRate: optionalSafeEditorialTextSchema,
  cookieDuration: optionalSafeEditorialTextSchema,
  affiliateNetwork: optionalSafeEditorialTextSchema,
  lastCheckedAt: z.string().date()
});

export const categorySchema = z.object({
  slug: slugSchema,
  name: z.string().trim().min(2).max(120),
  description: safeEditorialTextSchema,
  seoTitle: z.string().trim().min(10).max(70),
  seoDescription: z.string().trim().min(30).max(170),
  parentSlug: slugSchema.optional(),
  sortOrder: z.number().int().min(0).default(0),
  status: contentStatusSchema.default("published")
});

export const affiliateLinkSchema = z.object({
  toolSlug: slugSchema,
  url: urlSchema,
  network: z.string().trim().min(2).max(120).optional(),
  campaign: z.string().trim().min(2).max(120).optional(),
  status: affiliateStatusSchema.default("applied"),
  isPrimary: z.boolean().default(false),
  commissionType: optionalSafeEditorialTextSchema,
  commissionRate: optionalSafeEditorialTextSchema,
  cookieDuration: optionalSafeEditorialTextSchema
});

export const blogPostSchema = z.object({
  slug: slugSchema,
  title: z.string().trim().min(8).max(140),
  excerpt: safeEditorialTextSchema,
  body: safeEditorialTextSchema,
  status: contentStatusSchema.default("draft"),
  author: z.string().trim().min(2).max(120).default("NSFW AI Hunt editorial"),
  publishedAt: z.string().datetime().optional(),
  seoTitle: z.string().trim().min(10).max(70),
  seoDescription: z.string().trim().min(30).max(170)
});

export const comparisonSchema = z
  .object({
    slug: slugSchema,
    toolASlug: slugSchema,
    toolBSlug: slugSchema,
    verdict: safeEditorialTextSchema,
    seoTitle: z.string().trim().min(10).max(70),
    seoDescription: z.string().trim().min(30).max(170),
    status: contentStatusSchema.default("draft")
  })
  .refine((value) => value.toolASlug !== value.toolBSlug, {
    message: "Comparison tools must be different.",
    path: ["toolBSlug"]
  });

export type ToolInput = z.input<typeof toolSchema>;
export type ToolRecord = z.output<typeof toolSchema>;
export type PricingModel = z.output<typeof pricingModelSchema>;
export type CategoryInput = z.input<typeof categorySchema>;
export type CategoryRecord = z.output<typeof categorySchema>;
export type AffiliateLinkInput = z.input<typeof affiliateLinkSchema>;
export type AffiliateLinkRecord = z.output<typeof affiliateLinkSchema>;
export type BlogPostInput = z.input<typeof blogPostSchema>;
export type BlogPostRecord = z.output<typeof blogPostSchema>;
export type ComparisonInput = z.input<typeof comparisonSchema>;
export type ComparisonRecord = z.output<typeof comparisonSchema>;
