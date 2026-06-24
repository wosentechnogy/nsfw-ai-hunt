type NavItem = Readonly<{
  title: string;
  href: `/${string}`;
}>;

export type SiteConfig = Readonly<{
  name: "NSFW AI Hunt";
  shortName: "AI Hunt";
  url: "https://nsfwaihunt.com";
  description: string;
  ageNotice: string;
  affiliateDisclosure: string;
  mainNav: readonly NavItem[];
  footerNav: readonly NavItem[];
}>;

export const siteConfig = {
  name: "NSFW AI Hunt",
  shortName: "AI Hunt",
  url: "https://nsfwaihunt.com",
  description:
    "Find and compare adult AI tools by features, pricing, privacy, and restrictions.",
  ageNotice:
    "18+ only. This is a software research directory and does not host explicit media.",
  affiliateDisclosure:
    "Some outbound links may be affiliate links. Rankings stay based on product data, safety boundaries, and editorial usefulness.",
  mainNav: [
    { title: "Tools", href: "/tools" },
    { title: "Categories", href: "/category/nsfw-ai-chatbots" },
    { title: "Best Picks", href: "/best/nsfw-ai-chatbots" },
    { title: "Compare", href: "/compare" }
  ],
  footerNav: [
    { title: "About", href: "/about" },
    { title: "Contact", href: "/contact" },
    { title: "Submit a tool", href: "/submit-tool" },
    { title: "Advertise", href: "/advertise" },
    { title: "Privacy", href: "/privacy" },
    { title: "Terms", href: "/terms" },
    { title: "Affiliate disclosure", href: "/affiliate-disclosure" }
  ]
} as const satisfies SiteConfig;
