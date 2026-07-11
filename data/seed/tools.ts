import { toolSchema, type PricingModel, type ToolInput, type ToolRecord } from "@/lib/validation";

export type DirectoryCategory = Readonly<{
  slug: string;
  label: string;
  description: string;
}>;

export type DirectoryFeatureFilter = Readonly<{
  slug: string;
  label: string;
  predicate: (tool: ToolRecord) => boolean;
}>;

export type DirectoryPricingFilter = Readonly<{
  value: PricingModel;
  label: string;
}>;

export type DirectorySort = "editor-score" | "recently-checked" | "free-plan" | "name";

export type DirectoryQuery = Readonly<{
  q?: string;
  category?: string;
  feature?: string;
  pricing?: string;
  sort?: string;
}>;

export type DetailRow = Readonly<{
  label: string;
  value: string;
}>;

export type ToolDetailSections = Readonly<{
  verdict: string;
  featureRows: readonly DetailRow[];
  pricingRows: readonly DetailRow[];
  pros: readonly string[];
  cons: readonly string[];
  faq: readonly Readonly<{
    question: string;
    answer: string;
  }>[];
}>;

export type SoftwareApplicationJsonLd = Readonly<{
  "@context": "https://schema.org";
  "@type": "SoftwareApplication";
  name: string;
  description: string;
  url: string;
  applicationCategory: "Adult AI software";
  operatingSystem: string;
  offers: Readonly<{
    "@type": "Offer";
    price: string;
    priceCurrency: string;
    availability: "https://schema.org/InStock";
    url: string;
  }>;
  aggregateRating?: Readonly<{
    "@type": "AggregateRating";
    ratingValue: string;
    bestRating: "10";
    ratingCount: number;
  }>;
}>;

export type InternalLink = Readonly<{
  title: string;
  href: string;
  description: string;
}>;

export type CategoryRankingRow = Readonly<{
  position: number;
  tool: ToolRecord;
  toolHref: string;
  pricing: string;
  nsfwSupport: string;
  freeOption: string;
  lastChecked: string;
  score: string;
}>;

export type CategoryPageData = Readonly<{
  category: DirectoryCategory;
  tools: readonly ToolRecord[];
  rankingRows: readonly CategoryRankingRow[];
  comparisonLinks: readonly InternalLink[];
  bestPageLinks: readonly InternalLink[];
}>;

export type CategoryItemListJsonLd = Readonly<{
  "@context": "https://schema.org";
  "@type": "ItemList";
  name: string;
  description: string;
  itemListElement: readonly Readonly<{
    "@type": "ListItem";
    position: number;
    name: string;
    url: string;
  }>[];
}>;

type BestPageSelector = "category" | "free-nsfw-chat" | "voice-companion" | "privacy" | "crypto";

export type BestPageConfig = Readonly<{
  slug: string;
  title: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  selector: BestPageSelector;
  categorySlug?: string;
  useCase: string;
}>;

export type BestPageRankingRow = Readonly<{
  position: number;
  tool: ToolRecord;
  toolHref: string;
  ctaHref: string;
  bestFor: string;
  pricing: string;
  freeOption: string;
  privacySignal: string;
  lastChecked: string;
  score: string;
  recommendation: string;
}>;

export type BestPageFaq = Readonly<{
  question: string;
  answer: string;
}>;

export type BestPageData = Readonly<{
  config: BestPageConfig;
  rankingRows: readonly BestPageRankingRow[];
  methodology: readonly string[];
  faq: readonly BestPageFaq[];
  disclosure: string;
  relatedLinks: readonly InternalLink[];
}>;

export type BestPageItemListJsonLd = Readonly<{
  "@context": "https://schema.org";
  "@type": "ItemList";
  name: string;
  description: string;
  itemListElement: readonly Readonly<{
    "@type": "ListItem";
    position: number;
    name: string;
    url: string;
  }>[];
}>;

export type ComparisonTableRow = Readonly<{
  label: string;
  toolAValue: string;
  toolBValue: string;
}>;

export type ComparisonBestForRow = Readonly<{
  label: string;
  winner: string;
  rationale: string;
}>;

export type ComparisonToolSummary = Readonly<{
  name: string;
  slug: string;
  href: string;
  ctaHref: string;
  tagline: string;
}>;

export type ComparisonPageData = Readonly<{
  slug: string;
  title: string;
  description: string;
  verdict: string;
  toolA: ComparisonToolSummary;
  toolB: ComparisonToolSummary;
  featureRows: readonly ComparisonTableRow[];
  pricingRows: readonly ComparisonTableRow[];
  bestForRows: readonly ComparisonBestForRow[];
  alternativeLinks: readonly InternalLink[];
  indexable: boolean;
}>;

export type ComparisonWebPageJsonLd = Readonly<{
  "@context": "https://schema.org";
  "@type": "WebPage";
  name: string;
  description: string;
  url: string;
}>;

export type AlternativeRankingRow = Readonly<{
  position: number;
  tool: ToolRecord;
  toolHref: string;
  ctaHref: string;
  pricing: string;
  bestFor: string;
  privacySignal: string;
  score: string;
}>;

export type AlternativePageData = Readonly<{
  baseTool: ToolRecord;
  reasonSummary: string;
  rankingRows: readonly AlternativeRankingRow[];
  bestFreeAlternative?: AlternativeRankingRow | undefined;
  bestPrivateAlternative?: AlternativeRankingRow | undefined;
  bestImageAlternative?: AlternativeRankingRow | undefined;
  comparisonLinks: readonly InternalLink[];
}>;

export type PricingCouponRow = Readonly<{
  label: string;
  value: string;
}>;

export type PricingPageData = Readonly<{
  tool: ToolRecord;
  rows: readonly PricingCouponRow[];
  lastChecked: string;
  ctaHref: string;
}>;

export type CouponPageData = Readonly<{
  tool: ToolRecord;
  couponStatus: string;
  rows: readonly PricingCouponRow[];
  alternativeLinks: readonly InternalLink[];
  ctaHref: string;
}>;

export type BlogPostSeed = Readonly<{
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  status: "draft" | "published";
  publishedAt: string;
  seoTitle: string;
  seoDescription: string;
}>;

export type MoneyPageReview = Readonly<{
  route: string;
  pageType: "best" | "category" | "tool" | "pricing" | "alternatives" | "comparison";
  reviewedOn: string;
  claimChecks: readonly string[];
}>;

export const directoryCategories = [
  {
    slug: "nsfw-ai-chatbots",
    label: "NSFW AI chatbots",
    description: "Chat-first adult AI tools with policy, pricing, and privacy fields."
  },
  {
    slug: "ai-girlfriend-apps",
    label: "AI girlfriend apps",
    description: "Companion-style apps tracked by features, plan model, and platform."
  },
  {
    slug: "character-roleplay-ai",
    label: "Character roleplay AI",
    description: "Character creation and roleplay tools with limits and free-plan notes."
  },
  {
    slug: "private-adult-ai-chat",
    label: "Private adult AI chat",
    description: "Tools grouped by payment options, login posture, and privacy notes."
  },
  {
    slug: "nsfw-ai-image-generators",
    label: "Image-capable tools",
    description: "Tools that may include image workflows, tracked without explicit media."
  }
] as const satisfies readonly DirectoryCategory[];

export const directoryFeatureFilters = [
  {
    slug: "free-plan",
    label: "Free plan",
    predicate: (tool) => tool.hasFreePlan
  },
  {
    slug: "free-trial",
    label: "Free trial",
    predicate: (tool) => tool.hasFreeTrial
  },
  {
    slug: "voice",
    label: "Voice",
    predicate: (tool) => tool.supportsVoice
  },
  {
    slug: "image-support",
    label: "Image support",
    predicate: (tool) => tool.supportsImageGeneration
  },
  {
    slug: "mobile-app",
    label: "Mobile app",
    predicate: (tool) => tool.hasMobileApp
  },
  {
    slug: "accepts-crypto",
    label: "Accepts crypto",
    predicate: (tool) => tool.acceptsCrypto
  },
  {
    slug: "paypal",
    label: "PayPal",
    predicate: (tool) => tool.acceptsPaypal
  }
] as const satisfies readonly DirectoryFeatureFilter[];

export const directoryPricingFilters = [
  { value: "free", label: "Free" },
  { value: "freemium", label: "Freemium" },
  { value: "subscription", label: "Subscription" },
  { value: "credits", label: "Credits" },
  { value: "unknown", label: "Unknown" }
] as const satisfies readonly DirectoryPricingFilter[];

export const directorySortOptions = [
  { value: "editor-score", label: "Editor score" },
  { value: "recently-checked", label: "Recently checked" },
  { value: "free-plan", label: "Free plan first" },
  { value: "name", label: "Name" }
] as const satisfies readonly Readonly<{ value: DirectorySort; label: string }>[];

export const bestPageConfigs = [
  {
    slug: "nsfw-ai-chatbots",
    title: "Best NSFW AI Chatbots",
    description:
      "Ranked adult AI chat tools compared by policy support, pricing model, free access, privacy signals, and last checked date.",
    seoTitle: "Best NSFW AI Chatbots Compared",
    seoDescription:
      "Compare the best NSFW AI chatbots by pricing, free access, privacy signals, policy notes, and editor score.",
    selector: "category",
    categorySlug: "nsfw-ai-chatbots",
    useCase: "adult AI chat"
  },
  {
    slug: "ai-girlfriend-apps",
    title: "Best AI Girlfriend Apps",
    description:
      "Companion-style AI apps ranked for chat support, mobile availability, richer interaction features, pricing, and privacy posture.",
    seoTitle: "Best AI Girlfriend Apps Compared",
    seoDescription:
      "Compare AI girlfriend apps by features, pricing model, free trial, voice support, privacy notes, and last checked date.",
    selector: "category",
    categorySlug: "ai-girlfriend-apps",
    useCase: "AI companion apps"
  },
  {
    slug: "character-roleplay-ai",
    title: "Best Character Roleplay AI Tools",
    description:
      "Character roleplay tools ranked by creation support, free access, pricing model, policy clarity, and editorial score.",
    seoTitle: "Best Character Roleplay AI Tools",
    seoDescription:
      "Compare character roleplay AI tools by character creation, pricing, NSFW policy notes, free access, and score.",
    selector: "category",
    categorySlug: "character-roleplay-ai",
    useCase: "character roleplay"
  },
  {
    slug: "nsfw-ai-image-generators",
    title: "Best NSFW AI Image-Capable Tools",
    description:
      "Image-capable adult AI tools ranked with conservative policy notes and no explicit media hosted on this site.",
    seoTitle: "Best NSFW AI Image Tools Compared",
    seoDescription:
      "Compare image-capable adult AI tools by pricing, style support, policy restrictions, safe presentation, and last checked date.",
    selector: "category",
    categorySlug: "nsfw-ai-image-generators",
    useCase: "image-capable adult AI"
  },
  {
    slug: "free-nsfw-ai-chatbots",
    title: "Best Free NSFW AI Chatbots",
    description:
      "Adult AI chat tools with a visible free plan or free trial, ranked by usefulness, policy support, privacy notes, and score.",
    seoTitle: "Best Free NSFW AI Chatbots",
    seoDescription:
      "Find NSFW AI chatbots with free plans or trials, ranked by features, policy support, privacy signals, and score.",
    selector: "free-nsfw-chat",
    useCase: "free adult AI chat evaluation"
  },
  {
    slug: "ai-girlfriend-apps-with-voice",
    title: "Best AI Girlfriend Apps with Voice",
    description:
      "Voice-capable AI companion apps ranked by voice support, mobile availability, pricing model, and privacy posture.",
    seoTitle: "Best AI Girlfriend Apps with Voice",
    seoDescription:
      "Compare voice-capable AI girlfriend apps by pricing, free trial, mobile support, privacy notes, and score.",
    selector: "voice-companion",
    categorySlug: "ai-girlfriend-apps",
    useCase: "voice companion features"
  },
  {
    slug: "private-adult-ai-chat-apps",
    title: "Best Private Adult AI Chat Apps",
    description:
      "Adult AI chat apps ranked for privacy-oriented category fit, payment signals, policy notes, and conservative data freshness.",
    seoTitle: "Best Private Adult AI Chat Apps",
    seoDescription:
      "Compare private adult AI chat apps by privacy notes, payment options, pricing, policy support, and last checked date.",
    selector: "privacy",
    categorySlug: "private-adult-ai-chat",
    useCase: "privacy-conscious adult AI chat"
  },
  {
    slug: "nsfw-ai-tools-that-accept-crypto",
    title: "Best NSFW AI Tools That Accept Crypto",
    description:
      "Adult AI tools with a visible crypto payment signal, ranked by policy support, feature coverage, and update freshness.",
    seoTitle: "Best NSFW AI Tools That Accept Crypto",
    seoDescription:
      "Find adult AI tools that accept crypto, with pricing, policy notes, privacy signals, and last checked dates.",
    selector: "crypto",
    useCase: "crypto payment support"
  }
] as const satisfies readonly BestPageConfig[];

const blogPosts = [
  {
    slug: "adult-ai-privacy-guide",
    title: "Adult AI Privacy Guide for Buyers",
    excerpt:
      "How to compare adult AI tools by account privacy, payment options, retention notes, and lower-visibility buying paths.",
    body:
      "Start with the tools that fit privacy-focused buying intent, then compare payment options, account requirements, and visible policy notes. For the shortest path, review /best/private-adult-ai-chat-apps and then inspect the supporting tool profiles such as /tools/nomi-ai and /tools/kindroid before paying.",
    status: "published",
    publishedAt: "2026-06-14",
    seoTitle: "Adult AI Privacy Guide",
    seoDescription:
      "A buyer-focused privacy guide for comparing adult AI tools by payment options, account requirements, retention notes, and policy clarity."
  },
  {
    slug: "how-to-compare-ai-girlfriend-pricing",
    title: "How to Compare AI Girlfriend Pricing",
    excerpt:
      "A practical checklist for comparing subscriptions, free trials, credits, and no-card evaluation paths across AI companion apps.",
    body:
      "The fastest route is to compare pricing snapshots first, then cross-check free plans, trials, and payment methods on the money pages. Start with /best/ai-girlfriend-apps, then jump to /pricing/candy-ai and /pricing/kindroid before assuming two tools use the same billing model.",
    status: "published",
    publishedAt: "2026-06-14",
    seoTitle: "How to Compare AI Girlfriend Pricing",
    seoDescription:
      "Use a practical pricing checklist to compare subscriptions, free trials, credits, and payment paths across AI companion apps."
  },
  {
    slug: "editorial-market-map-draft",
    title: "Editorial Market Map Draft",
    excerpt: "Internal draft for a larger market map post.",
    body:
      "Draft notes for future editorial work that should not appear on the public blog index until it is complete.",
    status: "draft",
    publishedAt: "2026-06-14",
    seoTitle: "Editorial Market Map Draft",
    seoDescription: "Internal draft."
  }
] as const satisfies readonly BlogPostSeed[];

const rawDirectoryTools = [
  {
    slug: "candy-ai",
    name: "Candy AI",
    tagline: "Companion chat app tracked for pricing, privacy, and policy clarity.",
    description:
      "Candy AI is tracked as an adult AI companion product for buyers comparing chat features, plan structure, privacy signals, and restriction notes before visiting the official site.",
    websiteUrl: "https://candy.ai",
    status: "published",
    editorScore: 9.1,
    popularityScore: 92,
    isFeatured: true,
    categorySlugs: ["ai-girlfriend-apps", "nsfw-ai-chatbots"],
    supportsNsfwChat: true,
    supportsImageGeneration: true,
    supportsVoice: true,
    supportsCharacterCreation: true,
    hasMobileApp: true,
    hasWebApp: true,
    hasFreeTrial: true,
    requiresCreditCard: false,
    acceptsCard: true,
    nsfwPolicySummary:
      "Tracked as a companion chat product where adult-use policy details should be checked before purchase.",
    privacySummary:
      "Privacy review focuses on account requirements, payment options, and visible data policy language.",
    pricingModel: "subscription",
    affiliateUrl: "https://t.vlmai-1.com/418427/7793?aff_sub5=SF_006OG000004lmDN",
    affiliateProgramStatus: "approved",
    commissionType: "revshare",
    commissionRate: "40.00% Revshare Lifetime",
    cookieDuration:
      "CrakRevenue Candy.ai Revshare Lifetime offer ID 9022 is approved; public cookie-window details were not stored.",
    affiliateNetwork: "CrakRevenue",
    lastCheckedAt: "2026-07-10"
  },
  {
    slug: "crushon-ai",
    name: "CrushOn AI",
    tagline: "Character roleplay platform tracked for free-plan and policy limits.",
    description:
      "CrushOn AI is tracked for users comparing character roleplay depth, free-plan availability, model limits, creator features, and policy clarity across adult AI chat tools.",
    websiteUrl: "https://crushon.ai",
    affiliateUrl: "https://crushon.ai/?ref=zdbjmta&mist=1",
    status: "published",
    editorScore: 8.8,
    popularityScore: 90,
    isFeatured: true,
    categorySlugs: ["character-roleplay-ai", "nsfw-ai-chatbots"],
    supportsNsfwChat: true,
    supportsCharacterCreation: true,
    supportsAnimeStyle: true,
    hasWebApp: true,
    hasFreePlan: true,
    hasFreeTrial: true,
    acceptsCard: true,
    nsfwPolicySummary:
      "Tracked for roleplay policy, free-plan limits, and character creation restrictions.",
    privacySummary:
      "Privacy review focuses on account controls, public profile settings, and payment visibility.",
    pricingModel: "freemium",
    affiliateProgramStatus: "approved",
    commissionRate:
      "Friends of CrushonAI offers a 30% recurring commission from the first 90 days after the first conversion.",
    cookieDuration:
      "CrushOn AI's public signup flow does not disclose a cookie duration on the landing page.",
    affiliateNetwork:
      "Friends of CrushonAI is approved through Tapfiliate; the approved referral URL is stored separately from the official URL.",
    lastCheckedAt: "2026-07-10"
  },
  {
    slug: "nomi-ai",
    name: "Nomi AI",
    tagline: "AI companion app tracked for memory, mobile access, and privacy posture.",
    description:
      "Nomi AI is tracked as an AI companion option for users comparing memory features, mobile access, plan structure, privacy notes, and adult-use policy boundaries.",
    websiteUrl: "https://nomi.ai",
    status: "published",
    editorScore: 8.5,
    popularityScore: 82,
    isFeatured: true,
    categorySlugs: ["ai-girlfriend-apps", "private-adult-ai-chat"],
    supportsNsfwChat: true,
    supportsVoice: true,
    supportsCharacterCreation: true,
    hasMobileApp: true,
    hasWebApp: true,
    hasFreePlan: true,
    acceptsCard: true,
    nsfwPolicySummary:
      "Policy support may vary by feature and should be checked against current official rules.",
    privacySummary:
      "Privacy review focuses on account identity, app access, and retention policy visibility.",
    pricingModel: "subscription",
    affiliateUrl: "https://nomi.ai/?via=ate",
    affiliateProgramStatus: "approved",
    commissionType:
      "Nomi runs a recurring revenue-share affiliate program for paid subscriptions.",
    commissionRate:
      "Nomi publicly advertises 30% lifetime recurring commissions on monthly, quarterly, and yearly subscriptions.",
    cookieDuration:
      "Nomi's public affiliate terms describe last-link attribution but do not publish a separate cookie duration field.",
    affiliateNetwork:
      "Nomi accepted affiliates are managed through Rewardful; the approved tracking URL is stored separately from the official URL.",
    lastCheckedAt: "2026-07-10"
  },
  {
    slug: "janitor-ai",
    name: "Janitor AI",
    tagline: "Character chat directory tracked for roleplay setup and external model use.",
    description:
      "Janitor AI is tracked for users comparing character roleplay workflows, free-access posture, setup complexity, and policy notes across adult AI chat directories that may also rely on external model connections.",
    websiteUrl: "https://janitorai.com",
    status: "published",
    editorScore: 8.2,
    popularityScore: 88,
    categorySlugs: ["character-roleplay-ai", "nsfw-ai-chatbots"],
    supportsNsfwChat: true,
    supportsCharacterCreation: true,
    supportsAnimeStyle: true,
    hasWebApp: true,
    hasFreePlan: true,
    nsfwPolicySummary:
      "Tracked for character chat policy, model setup requirements, and usage restrictions.",
    privacySummary:
      "Privacy review focuses on account setup, third-party model connections, and retention notes.",
    pricingModel: "free",
    affiliateProgramStatus: "none",
    lastCheckedAt: "2026-06-14"
  },
  {
    slug: "kindroid",
    name: "Kindroid",
    tagline: "AI companion service tracked for voice, mobile support, and subscription model.",
    description:
      "Kindroid is tracked as a companion AI service for users comparing voice availability, mobile support, memory features, plan structure, and privacy-oriented buying signals.",
    websiteUrl: "https://kindroid.ai",
    status: "published",
    editorScore: 8.4,
    popularityScore: 78,
    categorySlugs: ["ai-girlfriend-apps", "private-adult-ai-chat"],
    supportsNsfwChat: true,
    supportsImageGeneration: true,
    supportsVoice: true,
    supportsCharacterCreation: true,
    hasMobileApp: true,
    hasWebApp: true,
    hasFreeTrial: true,
    acceptsCard: true,
    nsfwPolicySummary:
      "Tracked for companion policy, feature availability, and current subscription limits.",
    privacySummary:
      "Privacy review focuses on account settings, payment channels, and data policy visibility.",
    pricingModel: "subscription",
    affiliateProgramStatus: "none",
    commissionType:
      "Kindroid currently documents referral rewards in product credits rather than a cash affiliate payout.",
    commissionRate:
      "A successful paid referral earns 1 referral credit redeemable for in-product benefits, not a cash commission.",
    cookieDuration:
      "Kindroid attributes the first qualifying referrer before the new user's first paid subscription.",
    affiliateNetwork:
      "Kindroid currently documents a referral-credit program rather than a public cash affiliate network.",
    lastCheckedAt: "2026-06-14"
  },
  {
    slug: "dreamgf",
    name: "DreamGF",
    tagline: "Companion and image-capable tool tracked for pricing and policy notes.",
    description:
      "DreamGF is tracked for users comparing companion chat, image-capable features, trial availability, payment methods, and current restriction language.",
    websiteUrl: "https://dreamgf.ai",
    status: "published",
    editorScore: 8.0,
    popularityScore: 76,
    categorySlugs: ["ai-girlfriend-apps", "nsfw-ai-image-generators"],
    supportsNsfwChat: true,
    supportsImageGeneration: true,
    supportsRealisticStyle: true,
    hasWebApp: true,
    hasFreeTrial: true,
    acceptsCard: true,
    nsfwPolicySummary:
      "Tracked as an image-capable companion service where visual policy rules require current review.",
    privacySummary:
      "Privacy review focuses on account setup, payment visibility, and retention notes.",
    pricingModel: "subscription",
    affiliateUrl: "https://t.vlmai-1.com/418427/6523?aff_sub5=SF_006OG000004lmDN",
    affiliateProgramStatus: "approved",
    commissionType: "revshare",
    commissionRate: "35.00% Revshare Lifetime",
    affiliateNetwork: "CrakRevenue",
    lastCheckedAt: "2026-07-10"
  },
  {
    slug: "muah-ai",
    name: "Muah AI",
    tagline: "Companion chat product tracked for voice, image, and payment options.",
    description:
      "Muah AI is tracked for adult AI buyers comparing companion chat features, voice support, image-capable workflows, payment options, and privacy signals.",
    websiteUrl: "https://muah.ai",
    affiliateUrl: "https://muah.ai/affiliate/track.php?ref=VSYIYHIV0N",
    status: "published",
    editorScore: 7.9,
    popularityScore: 74,
    categorySlugs: ["ai-girlfriend-apps", "private-adult-ai-chat", "nsfw-ai-image-generators"],
    supportsNsfwChat: true,
    supportsImageGeneration: true,
    supportsVoice: true,
    hasMobileApp: true,
    hasWebApp: true,
    hasFreePlan: true,
    acceptsCrypto: true,
    acceptsCard: true,
    nsfwPolicySummary:
      "Tracked for adult-use support, voice and image feature boundaries, and payment availability.",
    privacySummary:
      "Privacy review focuses on account identity, payment methods, and visible data controls.",
    pricingModel: "subscription",
    affiliateProgramStatus: "approved",
    commissionType: "Muah AI uses a direct revenue-share affiliate program.",
    commissionRate: "Muah AI publicly advertises a 40% commission on total paid amount.",
    cookieDuration:
      "Muah AI's public affiliate landing page does not disclose a cookie duration.",
    affiliateNetwork:
      "Muah AI runs a direct affiliate dashboard with live click, signup, paid-amount, and payout reporting.",
    lastCheckedAt: "2026-06-25"
  },
  {
    slug: "soulgen",
    name: "SoulGen",
    tagline: "Image-capable AI tool tracked for plan model and policy restrictions.",
    description:
      "SoulGen is tracked for users comparing image-capable AI tools by pricing model, style support, policy restrictions, safe preview handling, and update freshness.",
    websiteUrl: "https://www.soulgen.net",
    status: "published",
    editorScore: 7.7,
    popularityScore: 72,
    categorySlugs: ["nsfw-ai-image-generators"],
    supportsImageGeneration: true,
    supportsAnimeStyle: true,
    supportsRealisticStyle: true,
    hasWebApp: true,
    hasFreeTrial: true,
    acceptsCard: true,
    nsfwPolicySummary:
      "Tracked for image-generation restrictions and safe, non-explicit directory presentation.",
    privacySummary:
      "Privacy review focuses on account requirements, billing visibility, and content retention notes.",
    pricingModel: "credits",
    affiliateProgramStatus: "applied",
    commissionRate:
      "SoulGen's official site links to an affiliate application, but the public page does not disclose a commission percentage.",
    cookieDuration:
      "SoulGen's official public pages do not disclose a cookie duration for affiliates.",
    affiliateNetwork:
      "SoulGen links to a direct affiliate application from the official site footer.",
    lastCheckedAt: "2026-06-14"
  },
  {
    slug: "pephop-ai",
    name: "PepHop AI",
    tagline: "Character roleplay platform tracked for free access, policy fit, and setup depth.",
    description:
      "PepHop AI is tracked for users comparing adult-oriented character roleplay tools by free access, character breadth, policy clarity, and overall setup friction before choosing a chat platform.",
    websiteUrl: "https://pephop.ai",
    logoUrl: "https://www.google.com/s2/favicons?sz=128&domain_url=https://pephop.ai",
    status: "published",
    editorScore: 7.8,
    popularityScore: 71,
    categorySlugs: ["character-roleplay-ai", "nsfw-ai-chatbots"],
    supportsNsfwChat: true,
    supportsCharacterCreation: true,
    supportsAnimeStyle: true,
    hasWebApp: true,
    hasFreePlan: true,
    acceptsCard: true,
    nsfwPolicySummary:
      "Tracked for roleplay policy boundaries, free-access limits, and creator-facing restrictions.",
    privacySummary:
      "Privacy review focuses on account creation, visibility controls, and payment disclosure on the official site.",
    pricingModel: "freemium",
    affiliateProgramStatus: "none",
    lastCheckedAt: "2026-06-22"
  },
  {
    slug: "ourdream-ai",
    name: "OurDream AI",
    tagline: "Companion and image-capable app tracked for trial access and visual workflow fit.",
    description:
      "OurDream AI is tracked for buyers comparing companion chat, image-capable workflows, plan structure, and current restriction language on a consumer-friendly adult AI product.",
    websiteUrl: "https://ourdream.ai",
    logoUrl: "https://www.google.com/s2/favicons?sz=128&domain_url=https://ourdream.ai",
    status: "published",
    editorScore: 7.8,
    popularityScore: 73,
    categorySlugs: ["ai-girlfriend-apps", "nsfw-ai-image-generators"],
    supportsNsfwChat: true,
    supportsImageGeneration: true,
    supportsRealisticStyle: true,
    hasWebApp: true,
    hasFreeTrial: true,
    acceptsCard: true,
    nsfwPolicySummary:
      "Tracked as an image-capable companion service where current adult-use and generation limits should be reviewed before paying.",
    privacySummary:
      "Privacy review focuses on account requirements, billing visibility, and policy wording around generated content.",
    pricingModel: "subscription",
    affiliateUrl: "https://t.vlmai-1.com/418427/7710?aff_sub5=SF_006OG000004lmDN",
    affiliateProgramStatus: "approved",
    commissionType: "revshare",
    commissionRate: "30.00% Revshare Lifetime",
    affiliateNetwork: "CrakRevenue",
    lastCheckedAt: "2026-07-10"
  },
  {
    slug: "spicier-ai",
    name: "Spicier AI",
    tagline: "Companion chat product tracked for trial access, voice signals, and policy notes.",
    description:
      "Spicier AI is tracked for users comparing adult AI companion tools by trial availability, richer interaction features, pricing posture, and current policy messaging.",
    websiteUrl: "https://spicier.ai",
    logoUrl: "https://www.google.com/s2/favicons?sz=128&domain_url=https://spicier.ai",
    status: "published",
    editorScore: 7.7,
    popularityScore: 69,
    categorySlugs: ["ai-girlfriend-apps", "nsfw-ai-chatbots"],
    supportsNsfwChat: true,
    supportsVoice: true,
    supportsCharacterCreation: true,
    hasWebApp: true,
    hasFreeTrial: true,
    acceptsCard: true,
    nsfwPolicySummary:
      "Tracked for adult chat support, interaction limits, and current policy wording on official pages.",
    privacySummary:
      "Privacy review focuses on account setup, checkout visibility, and stated data controls.",
    pricingModel: "subscription",
    affiliateUrl: "https://t.vlmai-1.com/418427/7942?aff_sub5=SF_006OG000004lmDN",
    affiliateProgramStatus: "approved",
    commissionType: "multi-cpa",
    commissionRate: "Multi-CPA",
    affiliateNetwork: "CrakRevenue",
    lastCheckedAt: "2026-07-11"
  },
  {
    slug: "udesire-ai",
    name: "uDesire AI",
    tagline: "Private-leaning companion app tracked for subscriptions, chat support, and privacy notes.",
    description:
      "uDesire AI is tracked for buyers comparing companion-style adult AI tools by subscription posture, privacy-facing signals, and the breadth of chat-first product features.",
    websiteUrl: "https://udesire.ai",
    logoUrl: "https://www.google.com/s2/favicons?sz=128&domain_url=https://udesire.ai",
    status: "published",
    editorScore: 7.6,
    popularityScore: 68,
    categorySlugs: ["ai-girlfriend-apps", "private-adult-ai-chat"],
    supportsNsfwChat: true,
    supportsCharacterCreation: true,
    hasWebApp: true,
    hasFreeTrial: true,
    acceptsCard: true,
    nsfwPolicySummary:
      "Tracked for adult-use support, companion feature boundaries, and current account-level restrictions.",
    privacySummary:
      "Privacy review focuses on login requirements, payment handling, and visible policy language about user data.",
    pricingModel: "subscription",
    affiliateProgramStatus: "none",
    lastCheckedAt: "2026-06-22"
  },
  {
    slug: "moonmate",
    name: "Moonmate",
    tagline: "Companion app tracked for free access, mobile posture, and relationship-style features.",
    description:
      "Moonmate is tracked for users comparing AI companion products by free-access path, app-style experience, pricing model, and the depth of conversational companion features.",
    websiteUrl: "https://moonmate.ai",
    logoUrl: "https://www.google.com/s2/favicons?sz=128&domain_url=https://moonmate.ai",
    status: "published",
    editorScore: 7.5,
    popularityScore: 66,
    categorySlugs: ["ai-girlfriend-apps", "private-adult-ai-chat"],
    supportsNsfwChat: true,
    supportsVoice: true,
    hasMobileApp: true,
    hasWebApp: true,
    hasFreePlan: true,
    acceptsCard: true,
    nsfwPolicySummary:
      "Tracked for companion-policy fit, feature gating, and current free-plan limitations.",
    privacySummary:
      "Privacy review focuses on app access, account identity, and visibility of payment or billing details.",
    pricingModel: "freemium",
    affiliateProgramStatus: "none",
    lastCheckedAt: "2026-06-22"
  },
  {
    slug: "eternal-ai",
    name: "Eternal AI",
    tagline: "Character and companion product tracked for free plan depth and creator-style workflows.",
    description:
      "Eternal AI is tracked for users comparing companion and character-driven adult AI tools by free-plan access, creator workflows, pricing posture, and policy clarity.",
    websiteUrl: "https://eternalai.org",
    logoUrl: "https://www.google.com/s2/favicons?sz=128&domain_url=https://eternalai.org",
    status: "published",
    editorScore: 7.4,
    popularityScore: 65,
    categorySlugs: ["ai-girlfriend-apps", "character-roleplay-ai"],
    supportsNsfwChat: true,
    supportsCharacterCreation: true,
    hasWebApp: true,
    hasFreePlan: true,
    acceptsCard: true,
    nsfwPolicySummary:
      "Tracked for adult-use policy fit, character creation support, and the current limits of the free path.",
    privacySummary:
      "Privacy review focuses on signup flow, billing visibility, and official policy disclosures.",
    pricingModel: "freemium",
    affiliateProgramStatus: "none",
    lastCheckedAt: "2026-06-22"
  },
  {
    slug: "girlfriendgpt",
    name: "GirlfriendGPT",
    tagline: "Companion platform tracked for chat depth, image support, and plan transparency.",
    description:
      "GirlfriendGPT is tracked for buyers comparing adult AI companion tools by plan model, image support, free access posture, and overall fit for chat-first use cases.",
    websiteUrl: "https://girlfriendgpt.ai",
    affiliateUrl: "https://t.vlmai-1.com/418427/7477?aff_sub5=SF_006OG000004lmDN",
    logoUrl: "https://www.google.com/s2/favicons?sz=128&domain_url=https://girlfriendgpt.ai",
    status: "published",
    editorScore: 7.4,
    popularityScore: 67,
    categorySlugs: ["ai-girlfriend-apps", "nsfw-ai-chatbots"],
    supportsNsfwChat: true,
    supportsImageGeneration: true,
    supportsCharacterCreation: true,
    hasWebApp: true,
    hasFreePlan: true,
    acceptsCard: true,
    nsfwPolicySummary:
      "Tracked for companion-policy fit, feature boundaries, and current free-plan positioning.",
    privacySummary:
      "Privacy review focuses on account setup, payment visibility, and available policy details before signup.",
    pricingModel: "freemium",
    affiliateProgramStatus: "approved",
    commissionType: "pps",
    commissionRate: "$45.00 PPS",
    affiliateNetwork: "CrakRevenue",
    lastCheckedAt: "2026-07-10"
  },
  {
    slug: "kupid-ai",
    name: "Kupid AI",
    tagline: "Companion product tracked for pricing clarity, chat features, and onboarding friction.",
    description:
      "Kupid AI is tracked for users comparing adult AI companion tools by subscription posture, chat-first features, and the ease of evaluating the product before purchase.",
    websiteUrl: "https://kupid.ai",
    logoUrl: "https://www.google.com/s2/favicons?sz=128&domain_url=https://kupid.ai",
    status: "published",
    editorScore: 7.3,
    popularityScore: 64,
    categorySlugs: ["ai-girlfriend-apps", "nsfw-ai-chatbots"],
    supportsNsfwChat: true,
    supportsImageGeneration: true,
    hasWebApp: true,
    hasFreeTrial: true,
    acceptsCard: true,
    nsfwPolicySummary:
      "Tracked for current adult-use support, onboarding limits, and feature gating on the paid path.",
    privacySummary:
      "Privacy review focuses on signup friction, billing visibility, and stated account controls.",
    pricingModel: "subscription",
    affiliateProgramStatus: "none",
    lastCheckedAt: "2026-06-22"
  },
  {
    slug: "herahaven-ai",
    name: "HeraHaven AI",
    tagline: "Companion app tracked for privacy posture, subscriptions, and chat-focused feature fit.",
    description:
      "HeraHaven AI is tracked for buyers comparing adult AI companion apps by privacy posture, subscription structure, and the breadth of conversation-focused product features.",
    websiteUrl: "https://herahaven.ai",
    logoUrl: "https://www.google.com/s2/favicons?sz=128&domain_url=https://herahaven.ai",
    status: "published",
    editorScore: 7.2,
    popularityScore: 63,
    categorySlugs: ["ai-girlfriend-apps", "private-adult-ai-chat"],
    supportsNsfwChat: true,
    supportsCharacterCreation: true,
    hasWebApp: true,
    hasFreeTrial: true,
    acceptsCard: true,
    nsfwPolicySummary:
      "Tracked for adult-use support, account-level restrictions, and the visibility of pricing rules on official pages.",
    privacySummary:
      "Privacy review focuses on login requirements, payment methods, and policy clarity around account handling.",
    pricingModel: "subscription",
    affiliateProgramStatus: "none",
    lastCheckedAt: "2026-06-22"
  },
  {
    slug: "seduced-ai",
    name: "Seduced AI",
    tagline: "Image-capable AI tool tracked for credits, style support, and policy restrictions.",
    description:
      "Seduced AI is tracked for users comparing image-capable adult AI tools by credit-based pricing, style support, policy restrictions, and safe directory presentation.",
    websiteUrl: "https://seduced.ai",
    logoUrl: "https://www.google.com/s2/favicons?sz=128&domain_url=https://seduced.ai",
    status: "published",
    editorScore: 7.1,
    popularityScore: 62,
    categorySlugs: ["nsfw-ai-image-generators"],
    supportsImageGeneration: true,
    supportsRealisticStyle: true,
    hasWebApp: true,
    hasFreeTrial: true,
    acceptsCard: true,
    nsfwPolicySummary:
      "Tracked for image-generation limits and official policy language, with no explicit media hosted here.",
    privacySummary:
      "Privacy review focuses on account requirements, checkout visibility, and data policy wording.",
    pricingModel: "credits",
    affiliateProgramStatus: "none",
    lastCheckedAt: "2026-06-22"
  },
  {
    slug: "aroused-ai",
    name: "Aroused AI",
    tagline: "Image-generation product tracked for plan model, style coverage, and safe presentation.",
    description:
      "Aroused AI is tracked for buyers comparing adult AI image tools by pricing model, realistic and anime-style coverage, and the visibility of current policy restrictions.",
    websiteUrl: "https://aroused.ai",
    logoUrl: "https://www.google.com/s2/favicons?sz=128&domain_url=https://aroused.ai",
    status: "published",
    editorScore: 7.0,
    popularityScore: 61,
    categorySlugs: ["nsfw-ai-image-generators"],
    supportsImageGeneration: true,
    supportsAnimeStyle: true,
    supportsRealisticStyle: true,
    hasWebApp: true,
    acceptsCard: true,
    nsfwPolicySummary:
      "Tracked for image-generation policy boundaries and safe, non-explicit presentation standards on this directory.",
    privacySummary:
      "Privacy review focuses on billing visibility, account requirements, and official policy disclosures.",
    pricingModel: "credits",
    affiliateProgramStatus: "none",
    lastCheckedAt: "2026-06-22"
  },
  {
    slug: "fantasygf",
    name: "FantasyGF",
    tagline: "Companion and image-capable product tracked for subscriptions and visual feature fit.",
    description:
      "FantasyGF is tracked for users comparing adult AI companion products by subscription posture, image-capable features, and the clarity of current product restrictions.",
    websiteUrl: "https://fantasygf.ai",
    logoUrl: "https://www.google.com/s2/favicons?sz=128&domain_url=https://fantasygf.ai",
    status: "published",
    editorScore: 7.0,
    popularityScore: 60,
    categorySlugs: ["ai-girlfriend-apps", "nsfw-ai-image-generators"],
    supportsNsfwChat: true,
    supportsImageGeneration: true,
    supportsRealisticStyle: true,
    hasWebApp: true,
    acceptsCard: true,
    nsfwPolicySummary:
      "Tracked for companion-policy fit, image-feature boundaries, and the visibility of current usage limits.",
    privacySummary:
      "Privacy review focuses on signup requirements, payment visibility, and official policy language before purchase.",
    pricingModel: "subscription",
    affiliateProgramStatus: "none",
    lastCheckedAt: "2026-06-22"
  },
  {
    slug: "spicychat-ai",
    name: "SpicyChat AI",
    tagline: "Character chat platform tracked for roleplay depth, free access, and policy notes.",
    description:
      "SpicyChat AI is tracked for users comparing character chat products by roleplay setup, free evaluation paths, web access, and the visibility of current adult-use policy boundaries.",
    websiteUrl: "https://spicychat.ai",
    logoUrl: "https://www.google.com/s2/favicons?sz=128&domain_url=https://spicychat.ai",
    status: "published",
    editorScore: 7.2,
    popularityScore: 68,
    categorySlugs: ["character-roleplay-ai", "nsfw-ai-chatbots"],
    supportsNsfwChat: true,
    supportsCharacterCreation: true,
    supportsAnimeStyle: true,
    hasWebApp: true,
    hasFreePlan: true,
    acceptsCard: true,
    nsfwPolicySummary:
      "Tracked for character chat policy boundaries, free access limits, and safe directory presentation.",
    privacySummary:
      "Privacy review focuses on account requirements, visible policy language, and checkout posture.",
    pricingModel: "freemium",
    affiliateProgramStatus: "none",
    lastCheckedAt: "2026-06-24"
  },
  {
    slug: "nastia-ai",
    name: "Nastia AI",
    tagline: "AI companion product tracked for chat access, privacy notes, and subscription posture.",
    description:
      "Nastia AI is tracked for buyers comparing AI companion products by chat availability, plan model, account requirements, and policy clarity before visiting the official site.",
    websiteUrl: "https://www.nastia.ai",
    logoUrl: "https://www.google.com/s2/favicons?sz=128&domain_url=https://www.nastia.ai",
    status: "published",
    editorScore: 7.1,
    popularityScore: 64,
    categorySlugs: ["ai-girlfriend-apps", "private-adult-ai-chat"],
    supportsNsfwChat: true,
    supportsCharacterCreation: true,
    hasWebApp: true,
    hasFreePlan: true,
    acceptsCard: true,
    nsfwPolicySummary:
      "Tracked for companion chat policy fit and visible usage boundaries, without hosting explicit media.",
    privacySummary:
      "Privacy review focuses on account setup, data policy visibility, and payment-path clarity.",
    pricingModel: "freemium",
    affiliateProgramStatus: "none",
    lastCheckedAt: "2026-06-24"
  },
  {
    slug: "chub-ai",
    name: "Chub AI",
    tagline: "Character hub tracked for roleplay discovery, setup complexity, and policy fit.",
    description:
      "Chub AI is tracked for users comparing character roleplay hubs by discovery workflow, model setup expectations, free access posture, and current policy signals.",
    websiteUrl: "https://chub.ai",
    logoUrl: "https://www.google.com/s2/favicons?sz=128&domain_url=https://chub.ai",
    status: "published",
    editorScore: 7.1,
    popularityScore: 66,
    categorySlugs: ["character-roleplay-ai", "nsfw-ai-chatbots"],
    supportsNsfwChat: true,
    supportsCharacterCreation: true,
    supportsAnimeStyle: true,
    hasWebApp: true,
    hasFreePlan: true,
    nsfwPolicySummary:
      "Tracked for roleplay policy boundaries and character discovery workflows, with conservative buyer notes.",
    privacySummary:
      "Privacy review focuses on account requirements, public profile posture, and model connection expectations.",
    pricingModel: "freemium",
    affiliateProgramStatus: "none",
    lastCheckedAt: "2026-06-24"
  },
  {
    slug: "botify-ai",
    name: "Botify AI",
    tagline: "AI character app tracked for mobile access, roleplay features, and plan signals.",
    description:
      "Botify AI is tracked as an AI character product for users comparing mobile availability, roleplay features, payment signals, and policy boundaries across companion-style apps.",
    websiteUrl: "https://botify.ai",
    logoUrl: "https://www.google.com/s2/favicons?sz=128&domain_url=https://botify.ai",
    status: "published",
    editorScore: 6.9,
    popularityScore: 63,
    categorySlugs: ["character-roleplay-ai", "ai-girlfriend-apps"],
    supportsCharacterCreation: true,
    hasMobileApp: true,
    hasWebApp: true,
    hasFreePlan: true,
    acceptsCard: true,
    nsfwPolicySummary:
      "Tracked conservatively for character interaction policy boundaries and current product restrictions.",
    privacySummary:
      "Privacy review focuses on mobile account requirements, subscription visibility, and official policy wording.",
    pricingModel: "freemium",
    affiliateProgramStatus: "none",
    lastCheckedAt: "2026-06-24"
  },
  {
    slug: "joyland-ai",
    name: "Joyland AI",
    tagline: "Character roleplay product tracked for chat workflows, free access, and policy notes.",
    description:
      "Joyland AI is tracked for buyers comparing character roleplay tools by web access, character creation workflow, free-plan signals, and current policy clarity.",
    websiteUrl: "https://www.joyland.ai",
    logoUrl: "https://www.google.com/s2/favicons?sz=128&domain_url=https://www.joyland.ai",
    status: "published",
    editorScore: 6.9,
    popularityScore: 62,
    categorySlugs: ["character-roleplay-ai"],
    supportsCharacterCreation: true,
    supportsAnimeStyle: true,
    hasWebApp: true,
    hasFreePlan: true,
    acceptsCard: true,
    nsfwPolicySummary:
      "Tracked for roleplay policy fit and visible restriction language rather than assumed adult-use support.",
    privacySummary:
      "Privacy review focuses on account requirements, public character visibility, and payment posture.",
    pricingModel: "freemium",
    affiliateProgramStatus: "none",
    lastCheckedAt: "2026-06-24"
  },
  {
    slug: "sakura-ai",
    name: "Sakura AI",
    tagline: "Companion chat app tracked for mobile access, character features, and policy posture.",
    description:
      "Sakura AI is tracked for users comparing AI companion and character chat products by app access, interaction features, plan model, and current restriction notes.",
    websiteUrl: "https://www.sakura.fm",
    logoUrl: "https://www.google.com/s2/favicons?sz=128&domain_url=https://www.sakura.fm",
    status: "published",
    editorScore: 6.8,
    popularityScore: 61,
    categorySlugs: ["ai-girlfriend-apps", "character-roleplay-ai"],
    supportsCharacterCreation: true,
    hasMobileApp: true,
    hasWebApp: true,
    hasFreePlan: true,
    acceptsCard: true,
    nsfwPolicySummary:
      "Tracked conservatively for companion chat policy boundaries and official usage restrictions.",
    privacySummary:
      "Privacy review focuses on mobile account requirements, payment visibility, and data policy language.",
    pricingModel: "freemium",
    affiliateProgramStatus: "none",
    lastCheckedAt: "2026-06-24"
  },
  {
    slug: "talkie-ai",
    name: "Talkie AI",
    tagline: "AI character app tracked for mobile-first discovery, roleplay, and pricing signals.",
    description:
      "Talkie AI is tracked for users comparing mobile-first AI character products by character discovery, free access posture, subscription signals, and policy restrictions.",
    websiteUrl: "https://www.talkie-ai.com",
    logoUrl: "https://www.google.com/s2/favicons?sz=128&domain_url=https://www.talkie-ai.com",
    status: "published",
    editorScore: 6.8,
    popularityScore: 65,
    categorySlugs: ["character-roleplay-ai", "ai-girlfriend-apps"],
    supportsCharacterCreation: true,
    hasMobileApp: true,
    hasWebApp: true,
    hasFreePlan: true,
    acceptsCard: true,
    nsfwPolicySummary:
      "Tracked as a character app with policy restrictions that should be checked before adult-use assumptions.",
    privacySummary:
      "Privacy review focuses on app account requirements, subscription visibility, and official policy wording.",
    pricingModel: "freemium",
    affiliateProgramStatus: "none",
    lastCheckedAt: "2026-06-24"
  },
  {
    slug: "replika",
    name: "Replika",
    tagline: "Mainstream AI companion app tracked as a policy-aware comparison baseline.",
    description:
      "Replika is tracked as a mainstream AI companion baseline for users comparing mobile access, subscription posture, privacy policy visibility, and feature restrictions against adult-focused alternatives.",
    websiteUrl: "https://replika.com",
    logoUrl: "https://www.google.com/s2/favicons?sz=128&domain_url=https://replika.com",
    status: "published",
    editorScore: 6.7,
    popularityScore: 72,
    categorySlugs: ["ai-girlfriend-apps", "private-adult-ai-chat"],
    supportsVoice: true,
    hasMobileApp: true,
    hasWebApp: true,
    hasFreePlan: true,
    acceptsCard: true,
    nsfwPolicySummary:
      "Tracked as a mainstream companion benchmark where current policy restrictions should be checked carefully.",
    privacySummary:
      "Privacy review focuses on mobile account requirements, subscription posture, and visible privacy-policy language.",
    pricingModel: "freemium",
    affiliateProgramStatus: "none",
    lastCheckedAt: "2026-06-24"
  },
  {
    slug: "anima-ai",
    name: "Anima AI",
    tagline: "AI companion app tracked for chat access, mobile availability, and pricing clarity.",
    description:
      "Anima AI is tracked for users comparing AI companion apps by chat features, mobile availability, subscription posture, free access signals, and current policy notes.",
    websiteUrl: "https://myanima.ai",
    logoUrl: "https://www.google.com/s2/favicons?sz=128&domain_url=https://myanima.ai",
    status: "published",
    editorScore: 6.6,
    popularityScore: 58,
    categorySlugs: ["ai-girlfriend-apps"],
    supportsCharacterCreation: true,
    hasMobileApp: true,
    hasWebApp: true,
    hasFreePlan: true,
    acceptsCard: true,
    nsfwPolicySummary:
      "Tracked conservatively for companion chat restrictions and official product policy language.",
    privacySummary:
      "Privacy review focuses on account requirements, app access, subscription visibility, and policy disclosures.",
    pricingModel: "freemium",
    affiliateProgramStatus: "none",
    lastCheckedAt: "2026-06-24"
  },
  {
    slug: "hera-haven",
    name: "HeraHaven",
    tagline: "AI companion product tracked for character setup, chat access, and plan clarity.",
    description:
      "HeraHaven is tracked for users comparing AI companion tools by character setup workflow, chat availability, subscription signals, privacy notes, and visible policy boundaries.",
    websiteUrl: "https://herahaven.ai",
    logoUrl: "https://www.google.com/s2/favicons?sz=128&domain_url=https://herahaven.ai",
    status: "published",
    editorScore: 6.8,
    popularityScore: 57,
    categorySlugs: ["ai-girlfriend-apps", "character-roleplay-ai"],
    supportsNsfwChat: true,
    supportsCharacterCreation: true,
    supportsRealisticStyle: true,
    hasWebApp: true,
    hasFreePlan: true,
    acceptsCard: true,
    nsfwPolicySummary:
      "Tracked for companion chat policy fit, account requirements, and visible usage boundaries.",
    privacySummary:
      "Privacy review focuses on account setup, subscription visibility, and official policy language.",
    pricingModel: "freemium",
    affiliateProgramStatus: "none",
    lastCheckedAt: "2026-06-24"
  },
  {
    slug: "couple-me",
    name: "Couple.me",
    tagline: "AI companion product tracked for web access, relationship-style chat, and pricing posture.",
    description:
      "Couple.me is tracked for buyers comparing AI companion tools by web availability, character interaction flow, free access posture, payment signals, and policy visibility.",
    websiteUrl: "https://couple.me",
    logoUrl: "https://www.google.com/s2/favicons?sz=128&domain_url=https://couple.me",
    status: "published",
    editorScore: 6.6,
    popularityScore: 55,
    categorySlugs: ["ai-girlfriend-apps", "private-adult-ai-chat"],
    supportsCharacterCreation: true,
    hasWebApp: true,
    hasFreePlan: true,
    acceptsCard: true,
    nsfwPolicySummary:
      "Tracked conservatively for companion chat restrictions and official usage policy language.",
    privacySummary:
      "Privacy review focuses on account requirements, payment-path visibility, and support-policy signals.",
    pricingModel: "freemium",
    affiliateProgramStatus: "none",
    lastCheckedAt: "2026-06-24"
  },
  {
    slug: "nectar-ai",
    name: "Nectar AI",
    tagline: "AI companion platform tracked for chat, image signals, and subscription clarity.",
    description:
      "Nectar AI is tracked for users comparing companion platforms by chat access, character presentation, image-related feature signals, pricing model, and visible restrictions.",
    websiteUrl: "https://nectar.ai",
    logoUrl: "https://www.google.com/s2/favicons?sz=128&domain_url=https://nectar.ai",
    status: "published",
    editorScore: 7.0,
    popularityScore: 63,
    categorySlugs: ["ai-girlfriend-apps", "nsfw-ai-image-generators"],
    supportsNsfwChat: true,
    supportsImageGeneration: true,
    supportsCharacterCreation: true,
    supportsRealisticStyle: true,
    hasWebApp: true,
    hasFreePlan: true,
    acceptsCard: true,
    nsfwPolicySummary:
      "Tracked for companion and image-feature restrictions, with no explicit media hosted in the directory.",
    privacySummary:
      "Privacy review focuses on account requirements, checkout posture, and accessible policy language.",
    pricingModel: "freemium",
    affiliateProgramStatus: "none",
    lastCheckedAt: "2026-06-24"
  },
  {
    slug: "ai-dungeon",
    name: "AI Dungeon",
    tagline: "Interactive story platform tracked as a roleplay and creative-chat comparison baseline.",
    description:
      "AI Dungeon is tracked as a creative roleplay baseline for users comparing interactive story tools by model access, web and mobile availability, subscription posture, and policy restrictions.",
    websiteUrl: "https://aidungeon.com",
    logoUrl: "https://www.google.com/s2/favicons?sz=128&domain_url=https://aidungeon.com",
    status: "published",
    editorScore: 7.0,
    popularityScore: 70,
    categorySlugs: ["character-roleplay-ai"],
    supportsCharacterCreation: true,
    hasMobileApp: true,
    hasWebApp: true,
    hasFreePlan: true,
    acceptsCard: true,
    nsfwPolicySummary:
      "Tracked as a roleplay baseline where current content policy and model restrictions should be checked.",
    privacySummary:
      "Privacy review focuses on account requirements, subscription posture, and story-data policy visibility.",
    pricingModel: "freemium",
    affiliateProgramStatus: "none",
    lastCheckedAt: "2026-06-24"
  },
  {
    slug: "novelai",
    name: "NovelAI",
    tagline: "Story and image generation product tracked for creative roleplay and privacy posture.",
    description:
      "NovelAI is tracked for users comparing creative writing and image tools by subscription model, generation controls, privacy posture, and policy restrictions across roleplay use cases.",
    websiteUrl: "https://novelai.net",
    logoUrl: "https://www.google.com/s2/favicons?sz=128&domain_url=https://novelai.net",
    status: "published",
    editorScore: 7.2,
    popularityScore: 72,
    categorySlugs: ["character-roleplay-ai", "nsfw-ai-image-generators"],
    supportsImageGeneration: true,
    supportsCharacterCreation: true,
    supportsAnimeStyle: true,
    hasWebApp: true,
    acceptsCard: true,
    nsfwPolicySummary:
      "Tracked for creative-generation restrictions and policy clarity, not as hosted media content.",
    privacySummary:
      "Privacy review focuses on account setup, subscription handling, and visible data-policy commitments.",
    pricingModel: "subscription",
    affiliateProgramStatus: "none",
    lastCheckedAt: "2026-06-24"
  },
  {
    slug: "hammer-ai",
    name: "HammerAI",
    tagline: "AI character chat product tracked for access model, roleplay setup, and privacy notes.",
    description:
      "HammerAI is tracked for users comparing AI character chat tools by access model, roleplay setup, free evaluation path, model expectations, and privacy posture.",
    websiteUrl: "https://www.hammerai.com",
    logoUrl: "https://www.google.com/s2/favicons?sz=128&domain_url=https://www.hammerai.com",
    status: "published",
    editorScore: 6.6,
    popularityScore: 56,
    categorySlugs: ["character-roleplay-ai", "nsfw-ai-chatbots"],
    supportsNsfwChat: true,
    supportsCharacterCreation: true,
    hasWebApp: true,
    hasFreePlan: true,
    nsfwPolicySummary:
      "Tracked for character roleplay policy boundaries and safe buyer-facing notes.",
    privacySummary:
      "Privacy review focuses on account requirements, access model, and visible policy language.",
    pricingModel: "freemium",
    affiliateProgramStatus: "none",
    lastCheckedAt: "2026-06-24"
  }
] as const satisfies readonly ToolInput[];

export const directoryTools = rawDirectoryTools.map((tool) => toolSchema.parse(tool));

const defaultSort: DirectorySort = "editor-score";

function normalizeValue(value: string | undefined) {
  return value?.trim().toLowerCase() ?? "";
}

function hasPricingFilter(value: string): value is PricingModel {
  return directoryPricingFilters.some((filter) => filter.value === value);
}

function hasSortOption(value: string): value is DirectorySort {
  return directorySortOptions.some((option) => option.value === value);
}

function matchesSearch(tool: ToolRecord, query: string) {
  if (!query) {
    return true;
  }

  const haystack = [
    tool.name,
    tool.tagline,
    tool.description,
    tool.pricingModel,
    ...tool.categorySlugs
  ]
    .join(" ")
    .toLowerCase();

  return haystack.includes(query);
}

function sortTools(tools: ToolRecord[], sort: DirectorySort) {
  return [...tools].sort((toolA, toolB) => {
    if (sort === "name") {
      return toolA.name.localeCompare(toolB.name);
    }

    if (sort === "free-plan") {
      return Number(toolB.hasFreePlan) - Number(toolA.hasFreePlan) || toolA.name.localeCompare(toolB.name);
    }

    if (sort === "recently-checked") {
      return toolB.lastCheckedAt.localeCompare(toolA.lastCheckedAt) || toolA.name.localeCompare(toolB.name);
    }

    return (toolB.editorScore ?? 0) - (toolA.editorScore ?? 0) || toolA.name.localeCompare(toolB.name);
  });
}

export function getToolDirectoryResults(query: DirectoryQuery = {}) {
  const search = normalizeValue(query.q);
  const category = normalizeValue(query.category);
  const feature = normalizeValue(query.feature);
  const pricing = normalizeValue(query.pricing);
  const requestedSort = normalizeValue(query.sort);
  const sort = hasSortOption(requestedSort) ? requestedSort : defaultSort;
  const featureFilter = directoryFeatureFilters.find((filter) => filter.slug === feature);

  const filteredTools = directoryTools.filter((tool) => {
    const matchesCategory = !category || tool.categorySlugs.includes(category);
    const matchesFeature = !featureFilter || featureFilter.predicate(tool);
    const matchesPricing = !hasPricingFilter(pricing) || tool.pricingModel === pricing;

    return matchesCategory && matchesFeature && matchesPricing && matchesSearch(tool, search);
  });

  return {
    tools: sortTools(filteredTools, sort),
    active: {
      q: search,
      category,
      feature,
      pricing,
      sort
    }
  };
}

export function getCategoryLabel(slug: string) {
  return directoryCategories.find((category) => category.slug === slug)?.label ?? slug;
}

export function formatPricingModel(model: PricingModel) {
  return directoryPricingFilters.find((filter) => filter.value === model)?.label ?? "Unknown";
}

export function getCategoryBySlug(slug: string) {
  return directoryCategories.find((category) => category.slug === slug);
}

export function getCategoryTools(slug: string) {
  return directoryTools
    .filter((tool) => tool.categorySlugs.includes(slug))
    .sort((toolA, toolB) => (toolB.editorScore ?? 0) - (toolA.editorScore ?? 0) || toolA.name.localeCompare(toolB.name));
}

function formatBoolean(value: boolean) {
  return value ? "Yes" : "No";
}

function formatPolicySupport(tool: ToolRecord) {
  if (tool.supportsNsfwChat) {
    return "Supported, with current policy review recommended";
  }

  if (tool.supportsImageGeneration) {
    return "Image policy tracked; no explicit assets hosted here";
  }

  return "Policy tracked";
}

function formatStartingPrice(tool: ToolRecord) {
  if (typeof tool.startingPrice === "number") {
    return `${tool.currency} ${tool.startingPrice.toFixed(2)}`;
  }

  return "Not published in seed data";
}

function overlapCount(toolA: ToolRecord, toolB: ToolRecord) {
  return toolB.categorySlugs.filter((slug) => toolA.categorySlugs.includes(slug)).length;
}

export function getToolBySlug(slug: string) {
  return directoryTools.find((tool) => tool.slug === slug);
}

export function getRelatedTools(tool: ToolRecord, limit = 3) {
  return directoryTools
    .filter((candidate) => candidate.slug !== tool.slug && overlapCount(tool, candidate) > 0)
    .sort((toolA, toolB) => {
      return (
        overlapCount(tool, toolB) - overlapCount(tool, toolA) ||
        (toolB.editorScore ?? 0) - (toolA.editorScore ?? 0) ||
        toolA.name.localeCompare(toolB.name)
      );
    })
    .slice(0, limit);
}

export function getToolDetailSections(tool: ToolRecord): ToolDetailSections {
  const categories = tool.categorySlugs.map((slug) => getCategoryLabel(slug)).join(", ");
  const pricing = formatPricingModel(tool.pricingModel);

  return {
    verdict: `${tool.name} is best treated as a ${pricing.toLowerCase()} ${categories.toLowerCase()} option. Use this page to compare its visible pricing model, feature coverage, privacy posture, and adult-use policy notes before visiting the official site.`,
    featureRows: [
      { label: "Primary categories", value: categories },
      { label: "NSFW chat support", value: formatBoolean(tool.supportsNsfwChat) },
      { label: "Image generation", value: formatBoolean(tool.supportsImageGeneration) },
      { label: "Video generation", value: formatBoolean(tool.supportsVideoGeneration) },
      { label: "Voice support", value: formatBoolean(tool.supportsVoice) },
      { label: "Phone calls", value: formatBoolean(tool.supportsPhoneCall) },
      { label: "Character creation", value: formatBoolean(tool.supportsCharacterCreation) },
      { label: "Mobile app", value: formatBoolean(tool.hasMobileApp) },
      { label: "Web app", value: formatBoolean(tool.hasWebApp) },
      { label: "Anime style", value: formatBoolean(tool.supportsAnimeStyle) },
      { label: "Realistic style", value: formatBoolean(tool.supportsRealisticStyle) }
    ],
    pricingRows: [
      { label: "Pricing model", value: pricing },
      { label: "Starting price", value: formatStartingPrice(tool) },
      { label: "Free plan", value: formatBoolean(tool.hasFreePlan) },
      { label: "Free trial", value: formatBoolean(tool.hasFreeTrial) },
      { label: "Credit card required", value: formatBoolean(tool.requiresCreditCard) },
      { label: "Accepts card", value: formatBoolean(tool.acceptsCard) },
      { label: "Accepts PayPal", value: formatBoolean(tool.acceptsPaypal) },
      { label: "Accepts crypto", value: formatBoolean(tool.acceptsCrypto) },
      { label: "Affiliate status", value: tool.affiliateProgramStatus }
    ],
    pros: [
      `${tool.name} has a clear seed profile with category, pricing, and freshness fields.`,
      tool.supportsNsfwChat
        ? "NSFW chat support is tracked for comparison pages."
        : "Policy support is tracked conservatively instead of overstated.",
      tool.hasFreePlan || tool.hasFreeTrial
        ? "A free option is visible in the current seed record."
        : "Paid-plan expectations are separated from free-trial claims.",
      tool.supportsVoice || tool.supportsImageGeneration
        ? "Feature coverage includes richer interaction signals such as voice or image support."
        : "The page stays focused on core chat and policy fields."
    ],
    cons: [
      "This v0 profile uses conservative seed data until the larger sourced catalog is imported.",
      "Pricing, policy, and privacy details should be rechecked on the official site before purchase.",
      tool.affiliateProgramStatus === "approved"
        ? "Affiliate details still need ongoing monitoring."
        : "Affiliate approval is not marked as live in the current seed record."
    ],
    faq: [
      {
        question: `What is ${tool.name} best for?`,
        answer: `${tool.name} is listed for users comparing ${categories.toLowerCase()} tools by pricing, features, policy notes, and privacy posture.`
      },
      {
        question: `Does ${tool.name} support NSFW chat?`,
        answer: formatPolicySupport(tool)
      },
      {
        question: `How current is this ${tool.name} profile?`,
        answer: `The current seed profile was last checked on ${tool.lastCheckedAt}. The launch data task will expand this with deeper sourced checks.`
      },
      {
        question: `Does this page host ${tool.name} media?`,
        answer:
          "No. NSFW AI Hunt is a software research directory and does not host explicit images, videos, user uploads, or adult media galleries."
      }
    ]
  };
}

export function getSoftwareApplicationJsonLd(tool: ToolRecord): SoftwareApplicationJsonLd {
  const jsonLd: SoftwareApplicationJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    description: tool.tagline,
    url: tool.websiteUrl,
    applicationCategory: "Adult AI software",
    operatingSystem: tool.hasMobileApp ? "Web, iOS, Android" : "Web",
    offers: {
      "@type": "Offer",
      price: typeof tool.startingPrice === "number" ? tool.startingPrice.toFixed(2) : "0",
      priceCurrency: tool.currency,
      availability: "https://schema.org/InStock",
      url: tool.websiteUrl
    },
    ...(typeof tool.editorScore === "number"
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: tool.editorScore.toFixed(1),
            bestRating: "10",
            ratingCount: Math.max(tool.popularityScore, 1)
          }
        }
      : {})
  };

  return jsonLd;
}

function getComparisonLinksForTools(tools: readonly ToolRecord[]) {
  const [primaryTool, ...otherTools] = tools;

  if (!primaryTool) {
    return [];
  }

  return otherTools.slice(0, 3).map((tool) => ({
    title: `${primaryTool.name} vs ${tool.name}`,
    href: `/compare/${buildComparisonSlug(primaryTool, tool)}`,
    description: `Compare ${primaryTool.name} and ${tool.name} by pricing, feature coverage, policy notes, and privacy signals.`
  }));
}

function getBestPageLinks(category: DirectoryCategory) {
  return [
    {
      title: `Best ${category.label.toLowerCase()}`,
      href: `/best/${category.slug}`,
      description: `Rank ${category.label.toLowerCase()} by editor score, pricing model, policy notes, and last checked date.`
    },
    {
      title: "Best private adult AI chat apps",
      href: "/best/private-adult-ai-chat-apps",
      description: "Compare tools with stronger privacy, payment, and retention signals."
    },
    {
      title: "Best free NSFW AI chatbots",
      href: "/best/free-nsfw-ai-chatbots",
      description: "Find tools with free plans, trials, or no-card evaluation paths."
    }
  ] as const satisfies readonly InternalLink[];
}

function getRankingRows(tools: readonly ToolRecord[]) {
  return tools.map((tool, index) => ({
    position: index + 1,
    tool,
    toolHref: `/tools/${tool.slug}`,
    pricing: formatPricingModel(tool.pricingModel),
    nsfwSupport: tool.supportsNsfwChat ? "Supported" : "Policy tracked",
    freeOption: tool.hasFreePlan || tool.hasFreeTrial ? "Yes" : "No",
    lastChecked: tool.lastCheckedAt,
    score: tool.editorScore?.toFixed(1) ?? "N/A"
  }));
}

export function getCategoryPageData(slug: string): CategoryPageData | undefined {
  const category = getCategoryBySlug(slug);

  if (!category) {
    return undefined;
  }

  const tools = getCategoryTools(category.slug);

  return {
    category,
    tools,
    rankingRows: getRankingRows(tools),
    comparisonLinks: getComparisonLinksForTools(tools),
    bestPageLinks: getBestPageLinks(category)
  };
}

export function getCategoryItemListJsonLd(
  category: DirectoryCategory,
  tools: readonly ToolRecord[]
): CategoryItemListJsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${category.label} rankings`,
    description: category.description,
    itemListElement: tools.map((tool, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: tool.name,
      url: `https://nsfwaihunt.com/tools/${tool.slug}`
    }))
  };
}

function getBestPageConfig(slug: string) {
  return bestPageConfigs.find((config) => config.slug === slug);
}

export function getBestPageSlugs() {
  return bestPageConfigs.map((config) => config.slug);
}

export function getIndexableBestPageSlugs() {
  return bestPageConfigs
    .filter((config) => {
      const data = getBestPageData(config.slug);
      return Boolean(data && data.rankingRows.length >= 3);
    })
    .map((config) => config.slug);
}

function getBestPageCandidateTools(config: BestPageConfig) {
  if (config.selector === "free-nsfw-chat") {
    return directoryTools.filter(
      (tool) => tool.supportsNsfwChat && (tool.hasFreePlan || tool.hasFreeTrial)
    );
  }

  if (config.selector === "voice-companion") {
    return directoryTools.filter(
      (tool) =>
        tool.supportsVoice &&
        (!config.categorySlug || tool.categorySlugs.includes(config.categorySlug))
    );
  }

  if (config.selector === "privacy") {
    return directoryTools.filter(
      (tool) =>
        tool.categorySlugs.includes(config.categorySlug ?? "private-adult-ai-chat") ||
        tool.acceptsCrypto ||
        tool.acceptsPaypal
    );
  }

  if (config.selector === "crypto") {
    return directoryTools.filter((tool) => tool.acceptsCrypto);
  }

  return config.categorySlug ? getCategoryTools(config.categorySlug) : directoryTools;
}

function getBestForLabel(tool: ToolRecord, config: BestPageConfig) {
  if (config.selector === "free-nsfw-chat") {
    return tool.hasFreePlan ? "Free plan evaluation" : "Free trial evaluation";
  }

  if (config.selector === "voice-companion") {
    return tool.hasMobileApp ? "Voice companion with mobile access" : "Voice companion on web";
  }

  if (config.selector === "privacy") {
    if (tool.acceptsCrypto) {
      return "Crypto payment signal";
    }

    if (tool.acceptsPaypal) {
      return "PayPal payment signal";
    }

    return "Privacy category fit";
  }

  if (config.selector === "crypto") {
    return "Crypto payment support";
  }

  if (tool.supportsVoice && tool.supportsImageGeneration) {
    return "Richer feature coverage";
  }

  if (tool.hasFreePlan || tool.hasFreeTrial) {
    return "Lower-friction trial path";
  }

  return config.useCase;
}

function getPrivacySignal(tool: ToolRecord) {
  if (tool.acceptsCrypto && tool.acceptsPaypal) {
    return "Crypto and PayPal tracked";
  }

  if (tool.acceptsCrypto) {
    return "Crypto tracked";
  }

  if (tool.acceptsPaypal) {
    return "PayPal tracked";
  }

  return "Privacy notes tracked";
}

function scoreBestPageTool(tool: ToolRecord, config: BestPageConfig) {
  const baseScore = tool.editorScore ?? 0;
  const freeBonus = tool.hasFreePlan || tool.hasFreeTrial ? 0.3 : 0;
  const privacyBonus = tool.acceptsCrypto || tool.acceptsPaypal ? 0.2 : 0;
  const featureBonus = Number(tool.supportsVoice) * 0.15 + Number(tool.supportsImageGeneration) * 0.15;
  const categoryBonus = config.categorySlug && tool.categorySlugs.includes(config.categorySlug) ? 0.2 : 0;

  return baseScore + freeBonus + privacyBonus + featureBonus + categoryBonus;
}

function getBestPageRows(config: BestPageConfig): readonly BestPageRankingRow[] {
  const tools = getBestPageCandidateTools(config)
    .sort(
      (toolA, toolB) =>
        scoreBestPageTool(toolB, config) - scoreBestPageTool(toolA, config) ||
        toolA.name.localeCompare(toolB.name)
    )
    .slice(0, 8);

  return tools.map((tool, index) => ({
    position: index + 1,
    tool,
    toolHref: `/tools/${tool.slug}`,
    ctaHref: `/go/${tool.slug}`,
    bestFor: getBestForLabel(tool, config),
    pricing: formatPricingModel(tool.pricingModel),
    freeOption: tool.hasFreePlan || tool.hasFreeTrial ? "Yes" : "No",
    privacySignal: getPrivacySignal(tool),
    lastChecked: tool.lastCheckedAt,
    score: tool.editorScore?.toFixed(1) ?? "N/A",
    recommendation: `${tool.name} is a strong ${config.useCase} candidate when you care about ${getBestForLabel(tool, config).toLowerCase()}, ${formatPricingModel(tool.pricingModel).toLowerCase()} pricing, and visible policy notes.`
  }));
}

function getBestMethodology(config: BestPageConfig): readonly string[] {
  return [
    `Only tools matching the ${config.useCase} intent are included in this launch ranking.`,
    "Ranking favors visible editor score, policy support, pricing clarity, and last checked date.",
    "Free-plan, free-trial, privacy, payment, voice, and image signals are used only when present in structured seed data.",
    "NSFW AI Hunt does not host explicit media, user uploads, adult galleries, or unsafe screenshots.",
    "Pricing and policy details should be checked on the official site before purchase because tool rules can change."
  ];
}

function getBestPageFaq(config: BestPageConfig): readonly BestPageFaq[] {
  return [
    {
      question: `How are the ${config.title.toLowerCase()} ranked?`,
      answer:
        "The ranking combines editor score, category fit, free access signals, pricing model, privacy and payment notes, feature coverage, and last checked dates from structured seed data."
    },
    {
      question: "Are these pages based on explicit media?",
      answer:
        "No. NSFW AI Hunt is a software comparison site and does not host explicit images, explicit videos, user uploads, or adult content galleries."
    },
    {
      question: "Do affiliate links affect the ranking?",
      answer:
        "Affiliate status is disclosed and tracked separately from official URLs. Rankings should stay based on visible product data, while CTA links use the tracked outbound route."
    },
    {
      question: "How fresh is the information?",
      answer:
        "Each row shows a last checked date from the current seed record. The launch data task will expand this with more sourced checks."
    }
  ];
}

function getBestRelatedLinks(config: BestPageConfig, rows: readonly BestPageRankingRow[]) {
  const fallbackCategorySlug = config.selector === "free-nsfw-chat" ? "nsfw-ai-chatbots" : undefined;
  const relatedCategorySlug = config.categorySlug ?? fallbackCategorySlug;
  const categoryLinks = relatedCategorySlug
    ? [
        {
          title: getCategoryLabel(relatedCategorySlug),
          href: `/category/${relatedCategorySlug}`,
          description: `Open the category ranking table for ${getCategoryLabel(relatedCategorySlug).toLowerCase()}.`
        }
      ]
    : [];

  const toolLinks = rows.slice(0, 2).map((row) => ({
    title: `${row.tool.name} review`,
    href: row.toolHref,
    description: `Open the ${row.tool.name} profile with pricing, policy, privacy, and alternatives.`
  }));

  return [
    ...categoryLinks,
    {
      title: "All adult AI tools",
      href: "/tools",
      description: "Filter the full software directory by category, pricing, features, and freshness."
    },
    ...toolLinks
  ] as const satisfies readonly InternalLink[];
}

export function getBestPageData(slug: string): BestPageData | undefined {
  const config = getBestPageConfig(slug);

  if (!config) {
    return undefined;
  }

  const rankingRows = getBestPageRows(config);

  return {
    config,
    rankingRows,
    methodology: getBestMethodology(config),
    faq: getBestPageFaq(config),
    disclosure:
      "Affiliate disclosure: NSFW AI Hunt may earn a commission when visitors use tracked outbound links, but official URLs and affiliate URLs are stored separately and rankings should remain data-led.",
    relatedLinks: getBestRelatedLinks(config, rankingRows)
  };
}

export function getBestItemListJsonLd(data: BestPageData): BestPageItemListJsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: data.config.title,
    description: data.config.description,
    itemListElement: data.rankingRows.map((row) => ({
      "@type": "ListItem",
      position: row.position,
      name: row.tool.name,
      url: `https://nsfwaihunt.com${row.toolHref}`
    }))
  };
}

function buildComparisonSlug(toolA: ToolRecord, toolB: ToolRecord) {
  return `${toolA.slug}-vs-${toolB.slug}`;
}

function parseComparisonSlug(slug: string) {
  const separator = "-vs-";
  const index = slug.indexOf(separator);

  if (index === -1) {
    return undefined;
  }

  const toolASlug = slug.slice(0, index);
  const toolBSlug = slug.slice(index + separator.length);

  if (!toolASlug || !toolBSlug || toolASlug === toolBSlug) {
    return undefined;
  }

  return {
    toolASlug,
    toolBSlug
  };
}

function hasComparisonContentGap(tool: ToolRecord) {
  return tool.pricingModel === "unknown" || (!tool.supportsVoice && !tool.supportsImageGeneration);
}

function getSharedCategoryLabels(toolA: ToolRecord, toolB: ToolRecord) {
  return toolA.categorySlugs
    .filter((slug) => toolB.categorySlugs.includes(slug))
    .map((slug) => getCategoryLabel(slug));
}

function getComparisonVerdict(toolA: ToolRecord, toolB: ToolRecord) {
  const scoreA = toolA.editorScore ?? 0;
  const scoreB = toolB.editorScore ?? 0;
  const winner = scoreA >= scoreB ? toolA : toolB;
  const runnerUp = winner.slug === toolA.slug ? toolB : toolA;
  const sharedCategories = getSharedCategoryLabels(toolA, toolB);
  const sharedCategoryText =
    sharedCategories.length > 0 ? sharedCategories.join(" and ").toLowerCase() : "adult AI tools";

  return `${winner.name} currently leads this ${sharedCategoryText} comparison for buyers who prioritize visible pricing clarity, feature coverage, and policy notes, while ${runnerUp.name} remains a viable alternative for a different plan model or interaction style.`;
}

function getComparisonFeatureRows(toolA: ToolRecord, toolB: ToolRecord): readonly ComparisonTableRow[] {
  return [
    { label: "NSFW chat support", toolAValue: formatBoolean(toolA.supportsNsfwChat), toolBValue: formatBoolean(toolB.supportsNsfwChat) },
    { label: "Image generation", toolAValue: formatBoolean(toolA.supportsImageGeneration), toolBValue: formatBoolean(toolB.supportsImageGeneration) },
    { label: "Voice support", toolAValue: formatBoolean(toolA.supportsVoice), toolBValue: formatBoolean(toolB.supportsVoice) },
    { label: "Character creation", toolAValue: formatBoolean(toolA.supportsCharacterCreation), toolBValue: formatBoolean(toolB.supportsCharacterCreation) },
    { label: "Mobile app", toolAValue: formatBoolean(toolA.hasMobileApp), toolBValue: formatBoolean(toolB.hasMobileApp) },
    { label: "Anime style", toolAValue: formatBoolean(toolA.supportsAnimeStyle), toolBValue: formatBoolean(toolB.supportsAnimeStyle) },
    { label: "Realistic style", toolAValue: formatBoolean(toolA.supportsRealisticStyle), toolBValue: formatBoolean(toolB.supportsRealisticStyle) },
    { label: "Privacy signal", toolAValue: getPrivacySignal(toolA), toolBValue: getPrivacySignal(toolB) }
  ];
}

function getComparisonPricingRows(toolA: ToolRecord, toolB: ToolRecord): readonly ComparisonTableRow[] {
  return [
    { label: "Pricing model", toolAValue: formatPricingModel(toolA.pricingModel), toolBValue: formatPricingModel(toolB.pricingModel) },
    { label: "Starting price", toolAValue: formatStartingPrice(toolA), toolBValue: formatStartingPrice(toolB) },
    { label: "Free plan", toolAValue: formatBoolean(toolA.hasFreePlan), toolBValue: formatBoolean(toolB.hasFreePlan) },
    { label: "Free trial", toolAValue: formatBoolean(toolA.hasFreeTrial), toolBValue: formatBoolean(toolB.hasFreeTrial) },
    { label: "Accepts card", toolAValue: formatBoolean(toolA.acceptsCard), toolBValue: formatBoolean(toolB.acceptsCard) },
    { label: "Accepts PayPal", toolAValue: formatBoolean(toolA.acceptsPaypal), toolBValue: formatBoolean(toolB.acceptsPaypal) },
    { label: "Accepts crypto", toolAValue: formatBoolean(toolA.acceptsCrypto), toolBValue: formatBoolean(toolB.acceptsCrypto) }
  ];
}

function getComparisonBestForRows(toolA: ToolRecord, toolB: ToolRecord): readonly ComparisonBestForRow[] {
  return [
    {
      label: "Best for chat",
      winner: (toolA.editorScore ?? 0) >= (toolB.editorScore ?? 0) ? toolA.name : toolB.name,
      rationale: "Uses the stronger visible editor score as the tie-breaker when both tools support NSFW chat."
    },
    {
      label: "Best for images",
      winner:
        toolA.supportsImageGeneration === toolB.supportsImageGeneration
          ? (toolA.editorScore ?? 0) >= (toolB.editorScore ?? 0)
            ? toolA.name
            : toolB.name
          : toolA.supportsImageGeneration
            ? toolA.name
            : toolB.name,
      rationale: "Prefers the tool with visible image-generation support, then falls back to score."
    },
    {
      label: "Best for voice",
      winner:
        toolA.supportsVoice === toolB.supportsVoice
          ? (toolA.editorScore ?? 0) >= (toolB.editorScore ?? 0)
            ? toolA.name
            : toolB.name
          : toolA.supportsVoice
            ? toolA.name
            : toolB.name,
      rationale: "Prefers the tool with voice support, then falls back to score."
    },
    {
      label: "Best for privacy",
      winner:
        (toolA.acceptsCrypto || toolA.acceptsPaypal) === (toolB.acceptsCrypto || toolB.acceptsPaypal)
          ? (toolA.editorScore ?? 0) >= (toolB.editorScore ?? 0)
            ? toolA.name
            : toolB.name
          : toolA.acceptsCrypto || toolA.acceptsPaypal
            ? toolA.name
            : toolB.name,
      rationale: "Prefers visible payment/privacy signals such as crypto or PayPal, then falls back to score."
    }
  ];
}

function getComparisonAlternativeLinks(toolA: ToolRecord, toolB: ToolRecord) {
  const alternatives = [
    ...getRelatedTools(toolA, 2),
    ...getRelatedTools(toolB, 2)
  ].filter(
    (tool, index, allTools) =>
      tool.slug !== toolA.slug &&
      tool.slug !== toolB.slug &&
      allTools.findIndex((candidate) => candidate.slug === tool.slug) === index
  );

  return alternatives.slice(0, 3).map((tool) => ({
    title: `${tool.name} alternative`,
    href: `/tools/${tool.slug}`,
    description: `Review ${tool.name} as another option alongside ${toolA.name} and ${toolB.name}.`
  }));
}

export function getComparisonPageSlugs() {
  const comparisonSlugs = new Set<string>();

  for (let index = 0; index < directoryTools.length; index += 1) {
    const toolA = directoryTools[index];

    if (!toolA) {
      continue;
    }

    for (let innerIndex = index + 1; innerIndex < directoryTools.length; innerIndex += 1) {
      const toolB = directoryTools[innerIndex];

      if (!toolB) {
        continue;
      }

      if (!toolA.categorySlugs.some((slug) => toolB.categorySlugs.includes(slug))) {
        continue;
      }

      comparisonSlugs.add(buildComparisonSlug(toolA, toolB));
    }
  }

  return [...comparisonSlugs];
}

export function getIndexableComparisonPageSlugs() {
  return getComparisonPageSlugs().filter((slug) => getComparisonPageData(slug)?.indexable);
}

export function getComparisonPageData(slug: string): ComparisonPageData | undefined {
  const parsedSlug = parseComparisonSlug(slug);

  if (!parsedSlug) {
    return undefined;
  }

  const toolA = getToolBySlug(parsedSlug.toolASlug);
  const toolB = getToolBySlug(parsedSlug.toolBSlug);

  if (!toolA || !toolB) {
    return undefined;
  }

  const canonicalSlug = buildComparisonSlug(toolA, toolB);
  const title = `${toolA.name} vs ${toolB.name}`;
  const description = `Compare ${toolA.name} and ${toolB.name} by pricing model, feature coverage, privacy signals, policy notes, and last checked date.`;

  return {
    slug: canonicalSlug,
    title,
    description,
    verdict: getComparisonVerdict(toolA, toolB),
    toolA: {
      name: toolA.name,
      slug: toolA.slug,
      href: `/tools/${toolA.slug}`,
      ctaHref: `/go/${toolA.slug}`,
      tagline: toolA.tagline
    },
    toolB: {
      name: toolB.name,
      slug: toolB.slug,
      href: `/tools/${toolB.slug}`,
      ctaHref: `/go/${toolB.slug}`,
      tagline: toolB.tagline
    },
    featureRows: getComparisonFeatureRows(toolA, toolB),
    pricingRows: getComparisonPricingRows(toolA, toolB),
    bestForRows: getComparisonBestForRows(toolA, toolB),
    alternativeLinks: getComparisonAlternativeLinks(toolA, toolB),
    indexable: !hasComparisonContentGap(toolA) && !hasComparisonContentGap(toolB)
  };
}

export function getComparisonWebPageJsonLd(data: ComparisonPageData): ComparisonWebPageJsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: data.title,
    description: data.description,
    url: `https://nsfwaihunt.com/compare/${data.slug}`
  };
}

function getAlternativeBestFor(tool: ToolRecord) {
  if (tool.supportsVoice && tool.supportsImageGeneration) {
    return "Richer feature set";
  }

  if (tool.hasFreePlan || tool.hasFreeTrial) {
    return "Lower-friction evaluation";
  }

  if (tool.acceptsCrypto || tool.acceptsPaypal) {
    return "Privacy or payment flexibility";
  }

  return "Similar category fit";
}

function scoreAlternativeTool(baseTool: ToolRecord, candidate: ToolRecord) {
  return (
    overlapCount(baseTool, candidate) * 2 +
    (candidate.editorScore ?? 0) +
    Number(candidate.hasFreePlan || candidate.hasFreeTrial) * 0.3 +
    Number(candidate.acceptsCrypto || candidate.acceptsPaypal) * 0.2 +
    Number(candidate.supportsImageGeneration) * 0.15
  );
}

function getAlternativeRankingRows(baseTool: ToolRecord): readonly AlternativeRankingRow[] {
  return getRelatedTools(baseTool, 6).map((tool, index) => ({
    position: index + 1,
    tool,
    toolHref: `/tools/${tool.slug}`,
    ctaHref: `/go/${tool.slug}`,
    pricing: formatPricingModel(tool.pricingModel),
    bestFor: getAlternativeBestFor(tool),
    privacySignal: getPrivacySignal(tool),
    score: tool.editorScore?.toFixed(1) ?? "N/A"
  }));
}

function getAlternativeComparisonLinks(
  baseTool: ToolRecord,
  rankingRows: readonly AlternativeRankingRow[]
) {
  return rankingRows.slice(0, 3).map((row) => ({
    title: `${baseTool.name} vs ${row.tool.name}`,
    href: `/compare/${buildComparisonSlug(baseTool, row.tool)}`,
    description: `Compare ${baseTool.name} and ${row.tool.name} by pricing, features, privacy signals, and policy notes.`
  }));
}

export function getAlternativePageSlugs() {
  return directoryTools.map((tool) => tool.slug);
}

export function isAlternativePageIndexable(data: AlternativePageData) {
  return data.rankingRows.length >= 3 && data.comparisonLinks.length >= 3;
}

export function getIndexableAlternativePageSlugs() {
  return getAlternativePageSlugs().filter((slug) => {
    const data = getAlternativePageData(slug);
    return Boolean(data && isAlternativePageIndexable(data));
  });
}

export function getAlternativePageData(slug: string): AlternativePageData | undefined {
  const baseTool = getToolBySlug(slug);

  if (!baseTool) {
    return undefined;
  }

  const rankingRows = [...getAlternativeRankingRows(baseTool)].sort(
    (rowA, rowB) =>
      scoreAlternativeTool(baseTool, rowB.tool) - scoreAlternativeTool(baseTool, rowA.tool) ||
      rowA.tool.name.localeCompare(rowB.tool.name)
  );

  return {
    baseTool,
    reasonSummary: `Users looking for ${baseTool.name} alternatives usually want a different pricing model, stronger privacy or payment signals, richer features like voice or images, or a lower-friction free trial path.`,
    rankingRows,
    bestFreeAlternative: rankingRows.find((row) => row.tool.hasFreePlan || row.tool.hasFreeTrial),
    bestPrivateAlternative: rankingRows.find(
      (row) => row.tool.acceptsCrypto || row.tool.acceptsPaypal || row.tool.categorySlugs.includes("private-adult-ai-chat")
    ),
    bestImageAlternative: rankingRows.find((row) => row.tool.supportsImageGeneration),
    comparisonLinks: getAlternativeComparisonLinks(baseTool, rankingRows)
  };
}

function getPricingRows(tool: ToolRecord): readonly PricingCouponRow[] {
  return [
    { label: "Pricing model", value: formatPricingModel(tool.pricingModel) },
    { label: "Starting price", value: formatStartingPrice(tool) },
    { label: "Free plan", value: formatBoolean(tool.hasFreePlan) },
    { label: "Free trial", value: formatBoolean(tool.hasFreeTrial) },
    { label: "Credit card required", value: formatBoolean(tool.requiresCreditCard) },
    { label: "Accepts card", value: formatBoolean(tool.acceptsCard) },
    { label: "Accepts PayPal", value: formatBoolean(tool.acceptsPaypal) },
    { label: "Accepts crypto", value: formatBoolean(tool.acceptsCrypto) }
  ];
}

function getCouponAlternativeLinks(tool: ToolRecord) {
  return getRelatedTools(tool, 3).map((alternative) => ({
    title: `${alternative.name} alternative`,
    href: `/tools/${alternative.slug}`,
    description: `Review ${alternative.name} if ${tool.name} does not have a confirmed coupon or discount path today.`
  }));
}

export function getPricingPageSlugs() {
  return directoryTools.map((tool) => tool.slug);
}

export function getCouponPageSlugs() {
  return directoryTools.map((tool) => tool.slug);
}

export function isPricingPageIndexable(data: PricingPageData) {
  return data.tool.status === "published" && data.tool.pricingModel !== "unknown";
}

export function getIndexablePricingPageSlugs() {
  return getPricingPageSlugs().filter((slug) => {
    const data = getPricingPageData(slug);
    return Boolean(data && isPricingPageIndexable(data));
  });
}

export function isCouponPageIndexable(data: CouponPageData) {
  const tool = data.tool;

  return (
    tool.status === "published" &&
    data.alternativeLinks.length >= 3 &&
    (tool.hasFreePlan || tool.hasFreeTrial || tool.affiliateProgramStatus !== "none")
  );
}

export function getIndexableCouponPageSlugs() {
  return getCouponPageSlugs().filter((slug) => {
    const data = getCouponPageData(slug);
    return Boolean(data && isCouponPageIndexable(data));
  });
}

export function getPricingPageData(slug: string): PricingPageData | undefined {
  const tool = getToolBySlug(slug);

  if (!tool) {
    return undefined;
  }

  return {
    tool,
    rows: getPricingRows(tool),
    lastChecked: tool.lastCheckedAt,
    ctaHref: `/go/${tool.slug}`
  };
}

export function getCouponPageData(slug: string): CouponPageData | undefined {
  const tool = getToolBySlug(slug);

  if (!tool) {
    return undefined;
  }

  return {
    tool,
    couponStatus:
      "No confirmed coupon is listed in the current seed data. Use the official pricing path and compare alternatives instead of assuming a discount exists.",
    rows: [
      { label: "Pricing model", value: formatPricingModel(tool.pricingModel) },
      { label: "Free path", value: tool.hasFreePlan || tool.hasFreeTrial ? "Available" : "Not visible" },
      { label: "Affiliate status", value: tool.affiliateProgramStatus },
      { label: "Last checked", value: tool.lastCheckedAt }
    ],
    alternativeLinks: getCouponAlternativeLinks(tool),
    ctaHref: `/go/${tool.slug}`
  };
}

const moneyPageReviewedOn = "2026-06-23";

const bestMoneyPageClaimChecks = [
  "Pricing and free-path claims were re-read against the current ranked rows before keeping the page indexable.",
  "Affiliate disclosure and tracked CTA placement were checked so the recommendation block still converts without overstating certainty."
] as const satisfies readonly string[];

const categoryMoneyPageClaimChecks = [
  "Ranking order was checked against the current category seed data so the visible score table still matches the source rows.",
  "Comparison and best-page links were checked against live launch routes instead of placeholder destinations."
] as const satisfies readonly string[];

const toolMoneyPageClaimChecks = [
  "Verdict, policy, and privacy copy were checked so the page stays anchored to visible seed fields instead of unsupported product claims.",
  "Tracked outbound CTA and official-site verification path were both kept visible for buyer research."
] as const satisfies readonly string[];

const pricingMoneyPageClaimChecks = [
  "Pricing snapshot, free path, and payment signals were checked against the current seed record before keeping the page in the money-page set.",
  "Discount language stays conservative and does not imply an unverified coupon or promotion."
] as const satisfies readonly string[];

const alternativesMoneyPageClaimChecks = [
  "Switching reasons and ranked alternatives were checked against overlapping category, pricing, and privacy signals in the current seed data.",
  "Recommended alternative CTAs remain tracked and visible so the page still serves conversion intent."
] as const satisfies readonly string[];

const comparisonMoneyPageClaimChecks = [
  "Verdict language was checked against the visible pricing, feature, and policy rows rather than unsupported winner claims.",
  "Both compared tools keep direct tracked CTAs and profile links for side-by-side buyer review."
] as const satisfies readonly string[];

function buildMoneyPageReview(
  route: string,
  pageType: MoneyPageReview["pageType"],
  claimChecks: readonly string[]
): MoneyPageReview {
  return {
    route,
    pageType,
    reviewedOn: moneyPageReviewedOn,
    claimChecks
  };
}

const moneyPageReviews = [
  ...[
    "/best/nsfw-ai-chatbots",
    "/best/ai-girlfriend-apps",
    "/best/free-nsfw-ai-chatbots",
    "/best/private-adult-ai-chat-apps",
    "/best/ai-girlfriend-apps-with-voice"
  ].map((route) => buildMoneyPageReview(route, "best", bestMoneyPageClaimChecks)),
  ...directoryCategories.map((category) =>
    buildMoneyPageReview(
      `/category/${category.slug}`,
      "category",
      categoryMoneyPageClaimChecks
    )
  ),
  ...[
    "candy-ai",
    "crushon-ai",
    "nomi-ai",
    "kindroid",
    "dreamgf",
    "muah-ai",
    "soulgen",
    "janitor-ai"
  ].map((slug) => buildMoneyPageReview(`/tools/${slug}`, "tool", toolMoneyPageClaimChecks)),
  ...["candy-ai", "kindroid", "nomi-ai", "soulgen"].map((slug) =>
    buildMoneyPageReview(`/pricing/${slug}`, "pricing", pricingMoneyPageClaimChecks)
  ),
  ...["candy-ai", "crushon-ai", "nomi-ai", "janitor-ai"].map((slug) =>
    buildMoneyPageReview(
      `/alternatives/${slug}`,
      "alternatives",
      alternativesMoneyPageClaimChecks
    )
  ),
  ...[
    "candy-ai-vs-crushon-ai",
    "candy-ai-vs-nomi-ai",
    "nomi-ai-vs-kindroid",
    "dreamgf-vs-muah-ai"
  ].map((slug) =>
    buildMoneyPageReview(`/compare/${slug}`, "comparison", comparisonMoneyPageClaimChecks)
  )
] as const satisfies readonly MoneyPageReview[];

export function getMoneyPageReviews() {
  return moneyPageReviews;
}

export function getMoneyPageReview(route: string) {
  return moneyPageReviews.find((review) => review.route === route);
}

export function getPublishedBlogPosts() {
  return blogPosts.filter((post) => post.status === "published");
}

export function getBlogPostSlugs() {
  return getPublishedBlogPosts().map((post) => post.slug);
}

export function getBlogPostBySlug(slug: string) {
  return getPublishedBlogPosts().find((post) => post.slug === slug);
}
