# Commercial Launch Status

Last updated: 2026-07-09

## Live Assets

- Production domain: `https://nsfwaihunt.com`
- WWW domain: `https://www.nsfwaihunt.com`
- Vercel fallback domain: `https://nsfw-ai-hunt-seven.vercel.app`
- GitHub repository: `https://github.com/wosentechnogy/nsfw-ai-hunt`
- Vercel project: `985064198-2862s-projects/nsfw-ai-hunt`
- Supabase project: `kkfiefqwzlgwlrcjeixi`
- Required account context for NSFW AI Hunt actions: `985064198@qq.com`
- Latest verified production deployment: `dpl_BeXq1xcFBpnGgS17rsUt26Ur8jK3`

## Completed

- GitHub repository is under the 985 account context at `wosentechnogy/nsfw-ai-hunt`.
- Vercel production is deployed under the 985 scope, and `nsfwaihunt.com` / `www.nsfwaihunt.com` are attached to that scope.
- Custom-domain route checks passed on 2026-07-09: apex redirects to `www`, `www /` returns 200, `/sitemap.xml` returns 200, `/robots.txt` returns 200, `/tools/candy-ai` returns 200, and `/go/muah-ai` returns 307.
- `https://nsfwaihunt.com/tools/nomi-ai` renders the affiliate snapshot on mobile, includes the public `30% lifetime recurring` Nomi program note, has no document-level horizontal overflow at a 390px viewport, and contains no `img` or `video` media tags.
- A labeled commercial partnership page exists at `/advertise` for sponsored placements, affiliate partnerships, and vendor data updates.
- Admin affiliate application tracking exists at `/admin/affiliate-applications` with priority, public payout signals, owner email, and next action fields.
- Admin subroutes are protected by middleware and anonymous users are redirected to `/admin/login`.
- Owner-only commercial readiness tracking exists at `/admin/commercial-readiness` for Supabase, outbound click persistence, email routing, search submission, and affiliate URL approval blockers.
- Vercel Web Analytics and Speed Insights are enabled at the project level.
- Vercel Analytics and Speed Insights components are installed in the Next.js layout.
- `NEXT_PUBLIC_SITE_URL` is set for Vercel Production and Development.
- Supabase isolated production project `kkfiefqwzlgwlrcjeixi` has the initial schema, RLS migration, and service-role grant migration applied.
- `/go/muah-ai` was verified on `https://www.nsfwaihunt.com/go/muah-ai` to redirect to the approved Muah AI affiliate URL and persist a `muah-ai` row in `outbound_clicks`.
- `/go/[toolSlug]` stores affiliate and official destinations separately in source data and redirects to `affiliateUrl ?? websiteUrl`.
- Muah AI has the only approved tracking URL currently represented in seed data: `https://muah.ai/affiliate/track.php?ref=GE9CZKD0WI`, stored as `affiliateUrl` for `muah-ai` while `websiteUrl` remains `https://muah.ai`.

## Not Yet Complete

- Cloudflare Email Routing still needs official destination verification and branded routing rules under the `985064198@qq.com` account context.
- Google Search Console and Bing Webmaster sitemap submission still require official login flows under the `985064198@qq.com` account context.
- Muah AI dashboard readiness still needs a human dashboard check under the `985064198@qq.com` commercial account context; do not store private finance details.
- Candy AI, CrushOn AI, Nomi AI, and SoulGen still need approval/status checks before any new tracking URLs are added.
- The dataset is still the preview launch set; Task 24 must resume to reach the 100-tool launch target.
- Most outbound URLs correctly remain official URL fallbacks because approved affiliate tracking URLs are not yet available for most launch tools.
- Public contact/submission pages still use the legacy launch inbox until branded `@nsfwaihunt.com` email forwarding is verified; do not use that legacy mailbox for new provider account actions.

## Required Manual Inputs

Do not commit these values to the repository.

- Cloudflare account access for `985064198@qq.com`.
- Google Search Console access for `985064198@qq.com`.
- Bing Webmaster access for `985064198@qq.com`.
- Approved affiliate URLs and network metadata.
- Affiliate dashboard access/status checks under the `985064198@qq.com` account context.

## Next Commercial Steps

1. In Cloudflare Email Routing, use the official Cloudflare dashboard under `985064198@qq.com` to verify the destination and create `contact@`, `partners@`, and `admin@` forwarding rules.
2. In Google Search Console, use the official `985064198@qq.com` Google account flow to add/verify `nsfwaihunt.com` and submit `https://www.nsfwaihunt.com/sitemap.xml`.
3. In Bing Webmaster Tools, use the official `985064198@qq.com` flow to add/verify the property and submit `https://www.nsfwaihunt.com/sitemap.xml`.
4. In the Muah AI affiliate dashboard, confirm commercial account readiness under the `985064198@qq.com` context without storing private finance details.
5. Check Candy AI, CrushOn AI, Nomi AI, and SoulGen through their official dashboards/forms under the `985064198@qq.com` context; add tracking URLs only after approval while keeping official URLs separate.
6. Resume Task 24 and expand from the current preview dataset to the 100-tool launch dataset.
