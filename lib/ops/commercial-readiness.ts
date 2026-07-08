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
    nextAction: "Set ADMIN_ALLOWLIST and Supabase env vars in each deployment environment."
  },
  {
    id: "supabase-production",
    label: "Supabase production database",
    status: "ready",
    owner: "wosenkeji@gmail.com",
    evidence: "Project memory and account docs record production project cchmrnjcbowqdpmtcksh with initial schema, RLS migrations, and production env vars applied.",
    nextAction: "Keep local .env.local out of git; provide local env vars only when admin or Supabase-backed checks must be rerun."
  },
  {
    id: "outbound-click-persistence",
    label: "Outbound click persistence",
    status: "ready",
    owner: "NSFW AI Hunt",
    evidence: "PROJECT_MEMORY.md records /go/candy-ai production redirect verification with an outbound_clicks insert after the redirect logging fix.",
    nextAction: "Re-check /go/muah-ai after production reachability is available from the current network."
  },
  {
    id: "production-reachability",
    label: "Production reachability from current environment",
    status: "blocked",
    owner: "Release Gate",
    evidence: "Coordinator reported HTTP/HTTPS resets for nsfwaihunt.com and abnormal Vercel fallback reachability from the current environment on 2026-07-08.",
    nextAction: "Retest /, /sitemap.xml, /robots.txt, and /go/muah-ai from a normal browser or alternate network."
  },
  {
    id: "email-routing",
    label: "Commercial email routing",
    status: "manual",
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
    evidence: "Muah AI is approved and stored as a separate affiliateUrl; other priority tools remain official URL fallbacks until approval.",
    nextAction: "Verify Muah commercial account readiness in the dashboard, then add Candy AI, CrushOn AI, Nomi AI, and SoulGen tracking URLs only after approval."
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
