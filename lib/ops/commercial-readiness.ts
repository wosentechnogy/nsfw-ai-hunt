export type CommercialReadinessStatus = "ready" | "blocked" | "manual";

export type CommercialReadinessItem = Readonly<{
  id: string;
  label: string;
  status: CommercialReadinessStatus;
  owner: string;
  evidence: string;
  nextAction: string;
}>;

export const commercialReadinessItems = [
  {
    id: "production-domain",
    label: "Production domain and hosting",
    status: "ready",
    owner: "985064198@qq.com / Vercel / Cloudflare",
    evidence: "Release Gate verified nsfwaihunt.com and www.nsfwaihunt.com under the 985 Vercel scope; apex redirects to www and core routes return expected responses.",
    nextAction: "Keep GitHub auto-deploy healthy after each production push."
  },
  {
    id: "admin-security",
    label: "Owner admin protection",
    status: "ready",
    owner: "NSFW AI Hunt / 985064198@qq.com",
    evidence: "Admin subroutes are protected by middleware and login remains the only public admin route.",
    nextAction: "Set ADMIN_ALLOWLIST and Supabase env vars in each deployment environment."
  },
  {
    id: "supabase-production",
    label: "Supabase production database",
    status: "ready",
    owner: "985064198@qq.com",
    evidence: "Supabase project kkfiefqwzlgwlrcjeixi was verified under the 985 context; source_path is a nullable text column with outbound_clicks_source_path_idx present in production.",
    nextAction: "Keep migration history and production schema aligned for future database changes."
  },
  {
    id: "outbound-click-persistence",
    label: "Outbound click persistence",
    status: "ready",
    owner: "NSFW AI Hunt",
    evidence: "Production /go/candy-ai accepted an internal source_path and the latest public.outbound_clicks row persisted /compare/candy-ai-vs-nomi-ai after the 985 deployment.",
    nextAction: "Monitor source attribution coverage in the 7-day and 28-day revenue reviews."
  },
  {
    id: "production-reachability",
    label: "Production reachability from current environment",
    status: "ready",
    owner: "Release Gate",
    evidence: "Release Gate verified www /, /sitemap.xml, /robots.txt, /tools/candy-ai, and /go/muah-ai on 2026-07-09.",
    nextAction: "Re-run Release Gate checks after material deploys or DNS changes."
  },
  {
    id: "email-routing",
    label: "Commercial email routing",
    status: "ready",
    owner: "985064198@qq.com",
    evidence: "User confirmed Cloudflare Email Routing destination verification and branded forwarding rules are completed through the official 985 account context.",
    nextAction: "Keep branded routing rules in Cloudflare and route future mailbox changes through the official dashboard."
  },
  {
    id: "search-submission",
    label: "Search console submission",
    status: "ready",
    owner: "985064198@qq.com",
    evidence: "User confirmed Google Search Console and Bing Webmaster sitemap submission are completed through official account flows.",
    nextAction: "Monitor official GSC and Bing Webmaster reports before adding custom traffic automation."
  },
  {
    id: "affiliate-url-approval",
    label: "Affiliate dashboard readiness and approvals",
    status: "manual",
    owner: "985064198@qq.com",
    evidence: "Muah AI, Nomi AI, CrushOn AI, GirlfriendGPT, Candy AI, DreamGF, OurDream AI, and Spicier AI are approved and stored as separate affiliateUrl values; Nomi uses a documented user-authorized account exception, while SoulGen remains an official URL fallback.",
    nextAction: "Confirm Muah and CrakRevenue profile readiness, keep approved tools routed through /go, and add SoulGen tracking only after official approval."
  },
  {
    id: "api-mcp-keys",
    label: "Research API and MCP keys",
    status: "manual",
    owner: "985064198@qq.com",
    evidence: "Firecrawl and Perplexity integrations remain unavailable until their API keys are created and provided through an approved secret store or local environment.",
    nextAction: "Use official Firecrawl and Perplexity account flows under the NSFW AI Hunt account context, then configure keys outside the repository."
  }
] as const satisfies readonly CommercialReadinessItem[];

export function getCommercialReadinessSummary(items = commercialReadinessItems) {
  return items.reduce(
    (summary, item) => ({
      ...summary,
      [item.status]: summary[item.status] + 1
    }),
    {
      ready: 0,
      blocked: 0,
      manual: 0,
      total: items.length
    }
  );
}
