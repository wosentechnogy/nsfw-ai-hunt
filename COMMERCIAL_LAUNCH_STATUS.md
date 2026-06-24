# Commercial Launch Status

Last updated: 2026-06-24

## Live Assets

- Production domain: `https://nsfwaihunt.com`
- WWW domain: `https://www.nsfwaihunt.com`
- Vercel fallback domain: `https://nsfw-ai-hunt.vercel.app`
- GitHub repository: `https://github.com/wosenkeji-creator/nsfw-ai-hunt`
- Vercel project: `wosenkeji-creators-projects/nsfw-ai-hunt`
- Latest verified production deployment: `dpl_DjMZShT97mBjd66WTHc3MaefoDwS`
- Latest verified Git commit: `5dc6573` (`fix-mobile-tool-detail-overflow`)

## Completed

- GitHub repository is created and pushed from local `master`.
- Vercel production deploy is live and aliased to `nsfwaihunt.com`.
- Cloudflare DNS is active for the apex and `www` hostnames.
- `https://nsfwaihunt.com`, `https://nsfwaihunt.com/sitemap.xml`, and `https://nsfwaihunt.com/go/candy-ai` return expected production responses.
- `https://nsfwaihunt.com/tools/nomi-ai` renders the affiliate snapshot on mobile, includes the public `30% lifetime recurring` Nomi program note, has no document-level horizontal overflow at a 390px viewport, and contains no `img` or `video` media tags.
- A labeled commercial partnership page exists at `/advertise` for sponsored placements, affiliate partnerships, and vendor data updates.
- Admin affiliate application tracking exists at `/admin/affiliate-applications` with priority, public payout signals, owner email, and next action fields.
- Vercel Web Analytics and Speed Insights are enabled at the project level.
- Vercel Analytics and Speed Insights components are installed in the Next.js layout.
- `NEXT_PUBLIC_SITE_URL` is set for Vercel Production and Development.
- Cloudflare Email Routing is enabled with MX, SPF, and DKIM DNS records.
- The destination address `wosenkeji@gmail.com` exists in Cloudflare Email Routing and is awaiting email verification.
- Public contact and submission pages use the reachable launch inbox `wosenkeji@gmail.com` until branded email forwarding is verified.

## Not Yet Complete

- Supabase production project and keys are not available in the local environment.
- Vercel does not yet have `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, or `SUPABASE_SERVICE_ROLE_KEY`.
- The database migration in `db/migrations/202606140001_initial_schema.sql` has not been applied to a production Supabase project.
- Outbound redirects work, but click rows are not persisted until Supabase env vars and schema are configured.
- Google Search Console and Bing Webmaster sitemap submission require account login.
- `contact@nsfwaihunt.com`, `partners@nsfwaihunt.com`, and `admin@nsfwaihunt.com` routing rules cannot be created until `wosenkeji@gmail.com` is verified in Cloudflare Email Routing.
- The dataset is still the preview launch set; Task 24 must resume to reach the 100-tool launch target.
- Most outbound URLs are official URLs rather than approved affiliate tracking URLs.
- GitHub CLI authentication for `wosenkeji-creator` is currently invalid, although regular `git push` to `origin/master` works through the existing Git credential path.
- The `/advertise` page uses the launch inbox until branded partner email routing is verified.

## Required Manual Inputs

Do not commit these values to the repository.

- Supabase project URL.
- Supabase anon key.
- Supabase service role key.
- Google Search Console access for `wosenkeji@gmail.com`.
- Bing Webmaster access.
- Approved affiliate URLs and network metadata.
- Cloudflare Email Routing verification email approval for `wosenkeji@gmail.com`.

## Next Commercial Steps

1. Create or confirm the Supabase project for `NSFW AI Hunt`.
2. Apply `db/migrations/202606140001_initial_schema.sql` to Supabase.
3. Add Supabase env vars to Vercel Production, Preview, and Development.
4. Redeploy production after env vars are added.
5. Submit `https://nsfwaihunt.com/sitemap.xml` in Google Search Console and Bing Webmaster Tools.
6. Verify `wosenkeji@gmail.com` from the Cloudflare Email Routing email, then create `contact@`, `partners@`, and `admin@` forwarding rules.
7. Replace priority official URLs with approved affiliate URLs while keeping official URLs separate.
8. Resume Task 24 and expand from 20 tools to the 100-tool launch dataset.
