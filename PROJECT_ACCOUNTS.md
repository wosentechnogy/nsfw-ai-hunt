# PROJECT ACCOUNTS

Last updated: 2026-06-25

This file stores non-secret account context only. Do not store passwords, API keys, recovery codes, private keys, seed phrases, or payout details in this repository.

## Domain

- Primary domain: `nsfwaihunt.com`
- Brand name: `NSFW AI Hunt`

## Accounts

### Cloudflare

- Account email: `985064198@qq.com`
- Purpose:
  - DNS
  - CDN
  - WAF
  - Email routing
  - Future Cloudflare Workers/R2/KV if needed
- Note: All 6 portfolio domains are managed under this single Cloudflare account (confirmed 2026-06-23)

### GitHub

- Account email: `wosenkeji@gmail.com`
- Status: production repository connected to Vercel
- Purpose:
  - Source code repository
  - PR workflow
  - GitHub MCP operations

### Vercel

- Account email: `wosenkeji@gmail.com`
- Project: `wosenkeji-creators-projects/nsfw-ai-hunt`
- Purpose:
  - Next.js deployment
  - Preview deployments
  - Production hosting
- Status: production deploy is live for `https://nsfwaihunt.com`

### Supabase

- Login method: GitHub account
- Project ref: `cchmrnjcbowqdpmtcksh`
- Project URL: `https://cchmrnjcbowqdpmtcksh.supabase.co`
- Purpose:
  - Postgres database
  - Admin authentication
  - Storage only if needed for safe non-explicit assets
- Status: production project created; initial schema and RLS migrations applied

### Google

- Account email: `wosenkeji@gmail.com`
- Purpose:
  - Google Search Console
  - Google account identity
  - Optional GA4

## Security Rules

- Passwords must not be stored in this repository.
- API keys must not be stored in this repository.
- Recovery codes must not be stored in this repository.
- Use a password manager.
- Enable 2FA on Cloudflare, GitHub, Vercel, Supabase, and Google.
- If a password was ever shared in chat, rotate it immediately.

## Next Account Tasks

1. Verify `wosenkeji@gmail.com` for Cloudflare Email Routing.
2. Create project email routes such as `contact@nsfwaihunt.com`.
3. Add Google Search Console domain property and submit sitemap.
4. Add Bing Webmaster property and submit sitemap.
5. Enable or confirm 2FA on Cloudflare, GitHub, Vercel, Supabase, and Google.
