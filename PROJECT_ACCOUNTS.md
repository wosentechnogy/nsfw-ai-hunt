# PROJECT ACCOUNTS

Last updated: 2026-07-09

This file stores non-secret account context only. Do not store passwords, API keys, recovery codes, private keys, seed phrases, or payout details in this repository.

## Domain

- Primary domain: `nsfwaihunt.com`
- Brand name: `NSFW AI Hunt`
- Project identity: `nsfw-ai-hunt` and `nsfwaihunt.com` refer to the same Adult AI project.
- Naming convention:
  - `nsfw-ai-hunt`: repository/project/deployment slug.
  - `nsfwaihunt.com`: production domain and public site identity.

## Accounts

### Project Account Separation

Do not mix account, MCP, API key, or deployment context across project families.

| Project / asset family | Primary account context | Notes |
|---|---|---|
| `nsfw-ai-hunt` / `nsfwaihunt.com` | `985064198@qq.com` | Same Adult AI project under two identifiers: repo/project slug and production domain. Keep GitHub, Supabase, Cloudflare, Vercel, Google/Search Console, and related MCP access isolated here wherever possible. |
| `AgentFlowKits` | `wosenkeji@gmail.com` | Separate non-NSFW asset family. Do not reuse for `nsfw-ai-hunt` secrets or MCP authorization. |
| `rankseen` | `wosenkeji@gmail.com` | Separate non-NSFW asset family. Do not reuse for `nsfw-ai-hunt` secrets or MCP authorization. |

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

- NSFW AI Hunt account context: `985064198@qq.com`
- Repository owner/name: `wosentechnogy/nsfw-ai-hunt`
- CLI status: GitHub CLI authorized as `wosentechnogy` on 2026-07-09 and `main` pushed to `origin/main`.
- Other asset account context: `wosenkeji@gmail.com` for `AgentFlowKits` and `rankseen`.
- Purpose:
  - Source code repository
  - PR workflow
  - GitHub MCP operations

### Vercel

- Vercel account separation follows the same project-family rule as GitHub/Supabase.

| Project / asset family | Vercel account context | Notes |
|---|---|---|
| `nsfw-ai-hunt` / `nsfwaihunt.com` | `985064198@qq.com` | Current Adult AI project account context. Use this account for final production ownership, environment variables, domains, and deploy access. |
| `AgentFlowKits` | `wosenkeji@gmail.com` | Separate non-NSFW Vercel account context. Do not reuse for `nsfw-ai-hunt` deployment secrets. |
| `rankseen` | `wosenkeji@gmail.com` | Separate non-NSFW Vercel account context. Do not reuse for `nsfw-ai-hunt` deployment secrets. |

- Previously recorded project: `wosenkeji-creators-projects/nsfw-ai-hunt` (deleted by user from Vercel dashboard on 2026-07-09)
- Current isolated project: `985064198-2862s-projects/nsfw-ai-hunt`
- Current Vercel project ID: `prj_Z477JxMNDzyShQBtfF1qJpotooyr`
- Current Vercel org/team ID: `team_Md4kaFP3ejSkZqiyaI8RHxn0`
- Current production deployment URL: `https://nsfw-ai-hunt-aab85caio-985064198-2862s-projects.vercel.app`
- Current production alias: `https://nsfw-ai-hunt-985064198-2862s-projects.vercel.app`
- Purpose:
  - Next.js deployment
  - Preview deployments
  - Production hosting
- Status: production has been redeployed under the `985064198@qq.com` Vercel account context on 2026-07-09. Vercel SSO deployment protection was disabled for this project after the initial deployment returned 302 redirects to `vercel.com/sso-api`.
- Verification on 2026-07-09:
  - `https://nsfw-ai-hunt-985064198-2862s-projects.vercel.app/` returned 200.
  - `https://nsfw-ai-hunt-985064198-2862s-projects.vercel.app/sitemap.xml` returned 200.
  - `https://nsfw-ai-hunt-985064198-2862s-projects.vercel.app/robots.txt` returned 200.
  - `https://nsfw-ai-hunt-985064198-2862s-projects.vercel.app/tools/candy-ai` returned 200.
  - `https://nsfw-ai-hunt-985064198-2862s-projects.vercel.app/go/muah-ai` returned 307 to the approved Muah AI affiliate URL.
- Domain migration blocker: the `985064198@qq.com` Vercel scope currently cannot add `nsfwaihunt.com` or `www.nsfwaihunt.com`; Vercel returns `domain_not_owned` / 403. The domain is likely still owned/attached under another Vercel account or requires DNS/domain verification before it can be attached to the 985 project.
- Old project deletion status: deleted by user from the `wosenkeji-creators-projects` Vercel dashboard on 2026-07-09.
- Service key status: a previously supplied Supabase secret key was added briefly to Vercel, then removed from Production, Preview, and Development after the user reported it was the wrong key. Do not redeploy with a server-only Supabase key until the exact `SUPABASE_SERVICE_ROLE_KEY` is confirmed from the intended Supabase project.

### Supabase

- Purpose:
  - Postgres database
  - Admin authentication
  - Storage only if needed for safe non-explicit assets
- MCP rule: keep separate Codex MCP entries per Supabase project/account. Do not overwrite one project with another.

| Project | Account / organization context | Project ref | Project URL | Codex MCP name | MCP status | Notes |
|---|---|---|---|---|---|---|
| NSFW AI Hunt isolated project | `985064198@qq.com` / `wosentechnogy's Org` | `kkfiefqwzlgwlrcjeixi` | `https://kkfiefqwzlgwlrcjeixi.supabase.co` | `supabase` | OAuth logged in on 2026-07-09 | Current Supabase project for `wosentechnogy/nsfw-ai-hunt`. REST endpoint is `https://kkfiefqwzlgwlrcjeixi.supabase.co/rest/v1/`. |
| Wosenkeji legacy Supabase project context | `wosenkeji@gmail.com` account family | `cchmrnjcbowqdpmtcksh` | `https://cchmrnjcbowqdpmtcksh.supabase.co` | `supabase-nsfwaihunt-legacy` | Configured, but OAuth requires an account that is a member of that Supabase organization | Do not treat this as the current `nsfw-ai-hunt` isolated project unless the user explicitly says to reconnect it. The `985064198@qq.com` account cannot authorize this MCP unless it is invited into that organization/project. |

- Supabase publishable keys may be placed in `NEXT_PUBLIC_SUPABASE_ANON_KEY` / Vercel public environment variables when needed.
- Supabase secret/service keys must remain server-only in `SUPABASE_SERVICE_ROLE_KEY` or Vercel server environment variables.
- Do not commit Supabase secret keys, database passwords, JWT secrets, or connection strings with passwords.

### Google

- NSFW AI Hunt account context: `985064198@qq.com`
- Other asset account context: `wosenkeji@gmail.com` for `AgentFlowKits` and `rankseen`.
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

1. Verify the correct `985064198@qq.com` destination/account context for NSFW AI Hunt Cloudflare Email Routing.
2. Create project email routes such as `contact@nsfwaihunt.com`.
3. Add Google Search Console domain property and submit sitemap.
4. Add Bing Webmaster property and submit sitemap.
5. Enable or confirm 2FA on Cloudflare, GitHub, Vercel, Supabase, and Google.
