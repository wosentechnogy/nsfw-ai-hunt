# ACCOUNT SETUP CHECKLIST

This checklist captures what the founder should prepare before and during implementation.

## 1. Must Prepare First

### Domain

- Primary domain selected: `nsfwaihunt.com`.
- Brand name: `NSFW AI Hunt`.
- Avoid very explicit or overly pornographic wording.
- Avoid competitor trademarks.
- Confirm registration and DNS ownership.

### Cloudflare

- Account email: `985064198@qq.com`.
- Add the domain. Completed for `nsfwaihunt.com`.
- Enable 2FA.
- Use Cloudflare DNS. Completed for apex and `www`.
- Email Routing DNS is enabled; verify `wosenkeji@gmail.com` before creating forwarding rules.
- Later: configure WAF and any advanced redirects.

### GitHub

- Account email: `wosenkeji@gmail.com`.
- Create a private repo for this project. Completed: `wosenkeji-creator/nsfw-ai-hunt`.
- Local `git push` works for `origin/master`; GitHub CLI should be re-authenticated before GitHub MCP or `gh` operations.
- Keep repo clean and avoid committing secrets.

### Vercel

- Account email: `wosenkeji@gmail.com`.
- Connect GitHub. Completed for `nsfw-ai-hunt`.
- Free tier is fine for v1.

### Supabase

- Login method: GitHub account.
- Create one new project for this site.
- Save these later:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`

### Google Search Console

- Account email: `wosenkeji@gmail.com`.
- Add the domain property after Cloudflare is connected.
- Submit sitemap after launch.

### Bing Webmaster Tools

- Create account or sign in with Google.
- Add domain.
- Submit sitemap after launch.

## 2. Prepare During Build

### Project Email

Use Cloudflare Email Routing or an email provider.

Current status:

- Cloudflare Email Routing is enabled for `nsfwaihunt.com`.
- The destination `wosenkeji@gmail.com` is created but still needs verification from the Cloudflare email.
- Create forwarding rules only after verification succeeds.

Suggested addresses:

- `contact@nsfwaihunt.com`
- `admin@nsfwaihunt.com`
- `partners@nsfwaihunt.com`

Use for:

- Affiliate applications.
- Vendor submissions.
- Contact page.
- Abuse/contact page.

### Analytics

Recommended:

- Plausible
- PostHog

Optional:

- GA4

Do not rely on Google AdSense for this site.

### Firecrawl API Key

Needed for:

- Competitor crawling.
- Tool data collection.
- Pricing and policy checks.

Set as Windows User environment variable:

```powershell
[Environment]::SetEnvironmentVariable("FIRECRAWL_API_KEY", "your-key-here", "User")
```

### Perplexity API Key

Needed for:

- Keyword research.
- Competitor research.
- Tool research.

Set as Windows User environment variable:

```powershell
[Environment]::SetEnvironmentVariable("PERPLEXITY_API_KEY", "your-key-here", "User")
```

Restart Codex after setting keys.

## 3. Monetization Setup

### Affiliate Accounts

Prepare a tracking sheet with:

- Tool name.
- Official website.
- Affiliate application URL.
- Network.
- Commission type.
- Commission rate.
- Cookie duration.
- Application status.
- Login email.
- Notes.

Affiliate categories to apply for:

- AI girlfriend apps.
- Adult AI chatbots.
- Character roleplay tools.
- Adult AI image generators.
- Adult affiliate networks with AI offers.

### Payout Methods

Prepare:

- PayPal email.
- Wise receiving details.
- Crypto wallet address.
- Stripe account as backup.

Never commit payout details or secrets into the repo.

## 4. Security Setup

Required:

- Password manager.
- 2FA on Google, GitHub, Cloudflare, Vercel, Supabase, affiliate accounts.
- Recovery codes stored safely.
- Separate project email.

Recommended:

- Separate browser profile for the project.
- Avoid mixing China-facing accounts with adult AI affiliate accounts.

## 5. Content/Data Preparation

Initial target:

- 100 adult AI tools.
- 10 categories.
- 30 best-of page ideas.
- 100 alternatives page ideas.
- 200 comparison pairs.
- 50 pricing/coupon pages.
- 10 editorial blog ideas.

For each tool, collect:

- Name.
- Slug.
- Official URL.
- Logo URL.
- Safe screenshot URL.
- Category.
- NSFW support.
- Image support.
- Voice support.
- Video support.
- Free plan.
- Free trial.
- Starting price.
- Payment methods.
- Privacy notes.
- Restrictions.
- Affiliate program status.
- Last checked date.

## 6. Not Needed for v1

Do not prepare yet:

- Company registration.
- Paid ad accounts.
- App Store account.
- Google Play account.
- Stripe checkout for users.
- Adult media content library.
- Customer support software.
- Forum/community tooling.

## 7. Ready-to-Build Checklist

The project is ready to build when:

- Domain is chosen or a temporary project domain is acceptable.
- GitHub repo exists.
- Vercel account exists.
- Supabase project exists.
- Cloudflare account exists.
- Google account exists.
- The founder confirms whether to start with dummy seed data or real researched tool data.
