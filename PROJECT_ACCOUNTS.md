# PROJECT ACCOUNTS

Last updated: 2026-06-14

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

1. Confirm domain registration for `nsfwaihunt.com`.
2. Add domain to Cloudflare.
3. Create GitHub private repository.
4. Connect Vercel to GitHub.
5. Create Supabase project.
6. Add Google Search Console domain property after DNS is active.
7. Create project email routing, such as `contact@nsfwaihunt.com`.
