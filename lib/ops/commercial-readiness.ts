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
    owner: "Vercel / Cloudflare",
    evidence: "nsfwaihunt.com is connected to Vercel production through Cloudflare DNS.",
    nextAction: "Keep GitHub auto-deploy healthy after each production push."
  },
  {
    id: "admin-security",
    label: "Owner admin protection",
    status: "ready",
    owner: "NSFW AI Hunt",
    evidence: "Admin subroutes are protected by middleware and login remains the only public admin route.",
    nextAction: "Set ADMIN_ALLOWLIST and ADMIN_ACCESS_TOKEN in each deployment environment."
  },
  {
    id: "supabase-production",
    label: "Supabase production database",
    status: "blocked",
    owner: "wosenkeji@gmail.com",
    evidence: "Production Supabase URL, anon key, and service role key are not configured yet.",
    nextAction: "Create the Supabase project, apply the initial migration, then add env vars to Vercel."
  },
  {
    id: "outbound-click-persistence",
    label: "Outbound click persistence",
    status: "blocked",
    owner: "NSFW AI Hunt",
    evidence: "The /go/[toolSlug] route is implemented, but inserts require Supabase production env vars.",
    nextAction: "After Supabase env setup, verify rows are written to outbound_clicks."
  },
  {
    id: "email-routing",
    label: "Commercial email routing",
    status: "blocked",
    owner: "wosenkeji@gmail.com",
    evidence: "Cloudflare Email Routing destination exists but still requires mailbox verification.",
    nextAction: "Verify the Cloudflare email, then create contact@, partners@, and admin@ forwarding rules."
  },
  {
    id: "search-submission",
    label: "Search console submission",
    status: "manual",
    owner: "wosenkeji@gmail.com",
    evidence: "Sitemap and robots routes exist, but Google Search Console and Bing submission need account login.",
    nextAction: "Submit https://nsfwaihunt.com/sitemap.xml in Google Search Console and Bing Webmaster Tools."
  },
  {
    id: "affiliate-url-approval",
    label: "Approved affiliate URLs",
    status: "manual",
    owner: "wosenkeji@gmail.com",
    evidence: "Priority applications are tracked, while approved affiliate URLs are not yet available for all launch tools.",
    nextAction: "Replace official fallback URLs with approved affiliate URLs only after each program approval."
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
