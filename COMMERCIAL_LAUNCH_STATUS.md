# Commercial Launch Status

Last updated: 2026-07-08

## Live Assets

- Production domain: `https://nsfwaihunt.com`
- WWW domain: `https://www.nsfwaihunt.com`
- Vercel fallback domain: `https://nsfw-ai-hunt.vercel.app`
- GitHub repository: `https://github.com/wosenkeji-creator/nsfw-ai-hunt`
- Vercel project: `wosenkeji-creators-projects/nsfw-ai-hunt`
- Latest verified production deployment from prior successful check: `dpl_DjMZShT97mBjd66WTHc3MaefoDwS`
- Latest verified Git commit from prior successful check: `5dc6573` (`fix-mobile-tool-detail-overflow`)

## Completed

- GitHub repository is created and pushed from local `master`.
- Vercel production deploy is live and aliased to `nsfwaihunt.com`.
- Cloudflare DNS is active for the apex and `www` hostnames.
- Prior production verification confirmed `https://nsfwaihunt.com`, `https://nsfwaihunt.com/sitemap.xml`, and `https://nsfwaihunt.com/go/candy-ai` returned expected production responses.
- `https://nsfwaihunt.com/tools/nomi-ai` renders the affiliate snapshot on mobile, includes the public `30% lifetime recurring` Nomi program note, has no document-level horizontal overflow at a 390px viewport, and contains no `img` or `video` media tags.
- A labeled commercial partnership page exists at `/advertise` for sponsored placements, affiliate partnerships, and vendor data updates.
- Admin affiliate application tracking exists at `/admin/affiliate-applications` with priority, public payout signals, owner email, and next action fields.
- Admin subroutes are protected by middleware and anonymous users are redirected to `/admin/login`.
- Owner-only commercial readiness tracking exists at `/admin/commercial-readiness` for Supabase, outbound click persistence, email routing, search submission, and affiliate URL approval blockers.
- Vercel Web Analytics and Speed Insights are enabled at the project level.
- Vercel Analytics and Speed Insights components are installed in the Next.js layout.
- `NEXT_PUBLIC_SITE_URL` is set for Vercel Production and Development.
- Supabase production project `cchmrnjcbowqdpmtcksh` is recorded in project memory and account docs.
- Production Supabase env vars, initial schema migration, RLS migration, and `/go/[toolSlug]` click persistence are recorded as live in `PROJECT_MEMORY.md` and `TASKS.md`.
- `/go/[toolSlug]` stores affiliate and official destinations separately in source data and redirects to `affiliateUrl ?? websiteUrl`.
- Muah AI has the only approved tracking URL currently represented in seed data: `https://muah.ai/affiliate/track.php?ref=GE9CZKD0WI`, stored as `affiliateUrl` for `muah-ai` while `websiteUrl` remains `https://muah.ai`.
- Cloudflare Email Routing is enabled with MX, SPF, and DKIM DNS records.
- The destination address `wosenkeji@gmail.com` exists in Cloudflare Email Routing and is awaiting email verification.
- Public contact and submission pages use the reachable launch inbox `wosenkeji@gmail.com` until branded email forwarding is verified.

## Not Yet Complete

- Current local workspace has no `.env.local`, so local Supabase-backed admin or click persistence checks cannot be repeated without human-provided environment variables.
- Current Coordinator environment could not reach `https://nsfwaihunt.com` or the Vercel fallback domain on 2026-07-08 because requests reset or resolved abnormally; Release Gate should re-test from another network/browser before treating production as unreachable globally.
- Google Search Console and Bing Webmaster sitemap submission require account login.
- `contact@nsfwaihunt.com`, `partners@nsfwaihunt.com`, and `admin@nsfwaihunt.com` routing rules cannot be created until `wosenkeji@gmail.com` is verified in Cloudflare Email Routing.
- The dataset is still the preview launch set; Task 24 must resume to reach the 100-tool launch target.
- Most outbound URLs correctly remain official URL fallbacks because approved affiliate tracking URLs are not yet available for most launch tools.
- GitHub CLI authentication for `wosenkeji-creator` is currently invalid, although regular `git push` to `origin/master` works through the existing Git credential path.
- The `/advertise` page uses the launch inbox until branded partner email routing is verified.

## Required Manual Inputs

Do not commit these values to the repository.

- Local `.env.local` values if local Supabase/admin verification is required.
- Google Search Console access for `wosenkeji@gmail.com`.
- Bing Webmaster access.
- Approved affiliate URLs and network metadata.
- Cloudflare Email Routing verification email approval for `wosenkeji@gmail.com`.
- Affiliate dashboard checks for Muah commercial account settings and pending program approvals.
- Independent production reachability check from a normal browser/network if the current environment continues to reset HTTP/HTTPS requests.

## Next Commercial Steps

1. Re-check production reachability from a normal browser/network and verify `/`, `/sitemap.xml`, `/robots.txt`, and `/go/muah-ai`.
2. Submit `https://nsfwaihunt.com/sitemap.xml` in Google Search Console and Bing Webmaster Tools.
3. Verify `wosenkeji@gmail.com` from the Cloudflare Email Routing email, then create `contact@`, `partners@`, and `admin@` forwarding rules.
4. Check the Muah dashboard for commercial account readiness without storing private finance details in the repository.
5. Check pending affiliate approvals for Candy AI, CrushOn AI, Nomi AI, and SoulGen; add tracking URLs only after approval while keeping official URLs separate.
6. Resume Task 24 and expand from the current preview dataset to the 100-tool launch dataset.
