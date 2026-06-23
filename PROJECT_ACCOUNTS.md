# PROJECT ACCOUNTS

Last updated: 2026-06-23

This file stores non-secret account context only. Do not store passwords, API keys, recovery codes, private keys, seed phrases, or payout details in this repository.

## Domain

- Primary domain: `nsfwaihunt.com`
- Brand name: `NSFW AI Hunt`

## Accounts

### Cloudflare

- Account email: `wosenkeji@gmail.com`
- Purpose:
  - DNS
  - CDN
  - WAF
  - Email routing
  - Future Cloudflare Workers/R2/KV if needed

### GitHub

- Account email: `wosenkeji@gmail.com`
- Status: new account planned/created by founder
- Purpose:
  - Source code repository
  - PR workflow
  - GitHub MCP operations

### Vercel

- Account email: `wosenkeji@gmail.com`
- Purpose:
  - Next.js deployment
  - Preview deployments
  - Production hosting

### Supabase

- Login method: GitHub account
- Purpose:
  - Postgres database
  - Admin authentication
  - Storage only if needed for safe non-explicit assets

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

1. Create Supabase project.
2. Add Supabase env vars to Vercel.
3. Verify `wosenkeji@gmail.com` for Cloudflare Email Routing.
4. Create project email routes such as `contact@nsfwaihunt.com`.
5. Add Google Search Console domain property and submit sitemap.
6. Add Bing Webmaster property and submit sitemap.
