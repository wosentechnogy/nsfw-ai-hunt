# Commercial Launch Status

Last updated: 2026-07-13

## Live Assets

- Production domain: `https://nsfwaihunt.com`
- WWW domain: `https://www.nsfwaihunt.com`
- Vercel fallback domain: `https://nsfw-ai-hunt-seven.vercel.app`
- GitHub repository: `https://github.com/wosentechnogy/nsfw-ai-hunt`
- Vercel project: `985064198-2862s-projects/nsfw-ai-hunt`
- Supabase project: `kkfiefqwzlgwlrcjeixi`
- Required account context for NSFW AI Hunt actions: `985064198@qq.com`
- Latest verified production deployment: `dpl_9te9BhrWrbrc7iPzWoaDDidFqKnb`

## Completed

- GitHub repository is under the 985 account context at `wosentechnogy/nsfw-ai-hunt`.
- Vercel production is deployed under the 985 scope, and `nsfwaihunt.com` / `www.nsfwaihunt.com` are attached to that scope.
- Custom-domain route checks passed on 2026-07-09: apex redirects to `www`, `www /` returns 200, `/sitemap.xml` returns 200, `/robots.txt` returns 200, `/tools/candy-ai` returns 200, and `/go/muah-ai` returns 307.
- `https://nsfwaihunt.com/tools/nomi-ai` renders the affiliate snapshot on mobile, includes the public `30% lifetime recurring` Nomi program note, has no document-level horizontal overflow at a 390px viewport, and contains no `img` or `video` media tags.
- A labeled commercial partnership page exists at `/advertise` for sponsored placements, affiliate partnerships, and vendor data updates.
- Admin affiliate application tracking exists at `/admin/affiliate-applications` with priority, public payout signals, owner email, and next action fields.
- Admin subroutes are protected by middleware and anonymous users are redirected to `/admin/login`.
- Owner-only commercial readiness tracking exists at `/admin/commercial-readiness` for Supabase, outbound click persistence, email routing, search submission, and affiliate URL approval blockers.
- User confirmed Cloudflare Email Routing destination verification and branded forwarding rules are completed through the official `985064198@qq.com` account context.
- User confirmed Google Search Console and Bing Webmaster sitemap submission are completed through official account flows for `https://www.nsfwaihunt.com/sitemap.xml`.
- Vercel Web Analytics and Speed Insights are enabled at the project level.
- Vercel Analytics and Speed Insights components are installed in the Next.js layout.
- `NEXT_PUBLIC_SITE_URL` is set for Vercel Production and Development.
- Supabase isolated production project `kkfiefqwzlgwlrcjeixi` has the initial schema, RLS migration, and service-role grant migration applied.
- `/go/muah-ai` was verified on `https://www.nsfwaihunt.com/go/muah-ai` to redirect to the approved Muah AI affiliate URL and persist a `muah-ai` row in `outbound_clicks`.
- `/go/[toolSlug]` stores affiliate and official destinations separately in source data and redirects to `affiliateUrl ?? websiteUrl`.
- GitHub `main` is `5e0a4ab`; local `main` and `origin/main` are synchronized to that commit.
- Production sitemap verification returns 1,155 URLs including 100 tool pages.
- Supabase verifies `outbound_clicks.source_path` and `outbound_clicks_source_path_idx`; production currently contains 204 outbound clicks and 95 attributed rows at the latest attributed-row snapshot.
- Production `/admin/analytics` is protected and returns 307 to `/admin/login` for an anonymous request.
- All public Supabase tables have RLS enabled, Supabase advisors report no warning/error findings, and the official-registry production dependency audit reports no known vulnerabilities.
- Muah AI has an approved direct-dashboard tracking URL represented in seed data: `https://muah.ai/affiliate/track.php?ref=VSYIYHIV0N`, stored as `affiliateUrl` for `muah-ai` while `websiteUrl` remains `https://muah.ai`; the account context is `985064198@qq.com`.
- Nomi AI has an approved tracking URL represented in seed data: `https://nomi.ai/?via=ate`, stored as `affiliateUrl` for `nomi-ai` while `websiteUrl` remains `https://nomi.ai`.
- CrushOn AI has an approved tracking URL represented in seed data: `https://crushon.ai/?ref=zdbjmta&mist=1`, stored as `affiliateUrl` for `crushon-ai` while `websiteUrl` remains `https://crushon.ai`.
- CrakRevenue account is approved as an `Active Affiliate` network account based on user-provided dashboard evidence on 2026-07-10. Treat it as an offer aggregator for future approved offer links, not as a direct `affiliateUrl` for any existing tool.
- GirlfriendGPT has an approved CrakRevenue `Girlfriend GPT - PPS` offer represented in seed data, stored as `affiliateUrl` for `girlfriendgpt` while `websiteUrl` remains `https://girlfriendgpt.ai`.
- Candy AI has an approved CrakRevenue `Candy.ai - Revshare Lifetime` offer represented in seed data, stored as `affiliateUrl` for `candy-ai` while `websiteUrl` remains `https://candy.ai`.
- DreamGF has an approved CrakRevenue `Dreamgf.ai - Revshare Lifetime` offer represented in seed data, stored as `affiliateUrl` for `dreamgf` while `websiteUrl` remains `https://dreamgf.ai`.
- OurDream AI has an approved CrakRevenue `ourdream.ai - Revshare` offer represented in seed data, stored as `affiliateUrl` for `ourdream-ai` while `websiteUrl` remains `https://ourdream.ai`; its approved PPS offer remains a documented backup, not the primary site link.
- Spicier AI has an approved CrakRevenue `Spicier - Multi-CPA` offer represented in seed data, stored as `affiliateUrl` for `spicier-ai` while `websiteUrl` remains `https://spicier.ai`.
- CrakRevenue exposes an approved `AI (18+)` Smartlink and approved AI offers such as Girlfriend GPT, Candy AI, DreamGF, OurDream AI, Spicier AI, and Secrets.ai. Use only compliant mapped tool/page placements; do not treat generic network smartlinks as official tool URLs.

## Not Yet Complete

- Muah AI dashboard was checked under `985064198@qq.com` on 2026-07-11: 0 clicks, 0 signups, 0 paying clients, `$0.00` commission, and payout requests require more than `$1`; do not store private finance details.
- CrakRevenue user details/billing profile still needs human completion before payout readiness; do not store payout, tax, bank, billing, password, or private dashboard details.
- SoulGen still needs approval/status checks before any new tracking URL is added.
- CrakRevenue premium offers marked `Required`, including Girlfriend GPT, Candy.ai, and ourdream.ai premium variants, must not be used until additional approval is granted.
- Firecrawl API key is still not configured; use the official provider flow and store any key only in an approved secret store or local environment.
- Perplexity API key is still not configured; use the official provider flow and store any key only in an approved secret store or local environment.
- Nomi AI uses a user-authorized account exception because Rewardful rejected the QQ mailbox and approved `wosenkeji@gmail.com` for this program only. All other new NSFW AI Hunt provider actions still default to `985064198@qq.com`.
- Public production content uses the 100-record seed dataset by explicit decision; the Supabase `tools` table currently contains zero rows and remains a future admin/persistence target. Do not switch public reads to the empty table.
- Supabase migration history now contains five applied entries, including repaired version `202607120001` for the already-existing `source_path` column/index; no SQL was re-executed.
- GitHub Actions release gates are merged and passing; public `main` now requires the `verify` check and disallows force-push/delete operations.
- The current bundle adds a production `Content-Security-Policy` alongside `Referrer-Policy` and `X-Content-Type-Options`; live header confirmation remains pending the next production deployment.
- Backup/restore rehearsal evidence, provider 2FA evidence, current GSC/Bing query exports, affiliate conversion/settlement evidence, and two consecutive 28-day measurement cycles remain missing.
- Most outbound URLs correctly remain official URL fallbacks because approved affiliate tracking URLs are not yet available for most launch tools.

## Required Manual Inputs

Do not commit secret or private values to the repository. Approved tracking URLs and non-secret network metadata may be stored only after approval and only in the affiliate fields.

- Pending approved affiliate URL and non-secret network metadata for SoulGen.
- Affiliate dashboard access/status checks under the `985064198@qq.com` account context.
- Firecrawl and Perplexity API keys, if the user chooses to enable those official integrations.

## Next Commercial Steps

1. In the Muah AI affiliate dashboard, confirm commercial account readiness under the `985064198@qq.com` context without storing private finance details.
2. Check SoulGen through its official dashboard/form under the `985064198@qq.com` context; add its tracking URL only after approval while keeping official URLs separate.
3. Keep Nomi AI routed through `/go/nomi-ai`; do not reuse the `wosenkeji@gmail.com` Rewardful exception for other provider actions without explicit user approval.
4. If Firecrawl or Perplexity MCP/API workflows are needed, create/configure keys through official provider flows and keep all secret values out of the repository.
5. Use the production click report and current GSC/Bing exports to run the first 7/28-day experiment cycle; do not scale pages before query and revenue evidence exists.
6. Reconcile migration history, decide whether the Supabase `tools` table should become the public/admin source of truth, complete the live deployment/CSP check, and complete backup/restore and 2FA evidence.
