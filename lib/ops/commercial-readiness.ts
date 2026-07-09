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
    evidence: "Supabase project kkfiefqwzlgwlrcjeixi has initial_schema, enable_rls, and grant_service_role_public_table_access applied under the 985 context.",
    nextAction: "Keep local .env.local out of git; provide local env vars only when admin or Supabase-backed checks must be rerun."
  },
  {
    id: "outbound-click-persistence",
    label: "Outbound click persistence",
    status: "ready",
    owner: "NSFW AI Hunt",
    evidence: "Product Engineering verified https://www.nsfwaihunt.com/go/muah-ai returns 307 and inserts a muah-ai row into outbound_clicks.",
    nextAction: "Monitor outbound_clicks during normal affiliate QA without exposing server-only Supabase keys."
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
    status: "manual",
    owner: "985064198@qq.com",
    evidence: "Cloudflare Email Routing still needs official destination verification and branded forwarding rules in the 985 account context.",
    nextAction: "Use the official Cloudflare Email Routing dashboard to verify the destination and create contact@, partners@, and admin@ forwarding rules."
  },
  {
    id: "search-submission",
    label: "Search console submission",
    status: "manual",
    owner: "985064198@qq.com",
    evidence: "Sitemap and robots routes are live, but Google Search Console and Bing Webmaster submission need official account login.",
    nextAction: "Use the official GSC and Bing Webmaster flows under 985064198@qq.com to submit https://www.nsfwaihunt.com/sitemap.xml."
  },
  {
    id: "affiliate-url-approval",
    label: "Approved affiliate URLs",
    status: "manual",
    owner: "985064198@qq.com",
    evidence: "Muah AI is approved and stored as a separate affiliateUrl; other priority tools remain official URL fallbacks until approval.",
    nextAction: "Use official affiliate dashboards/forms under 985064198@qq.com; confirm Muah dashboard readiness and add Candy AI, CrushOn AI, Nomi AI, and SoulGen tracking URLs only after approval."
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
