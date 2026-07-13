# PROJECT MEMORY

## Current execution state — 2026-07-13

The current authoritative production target is the isolated Supabase project
`kkfiefqwzlgwlrcjeixi` and Vercel project `985064198-2862s-projects/nsfw-ai-hunt`
under the `985064198@qq.com` context. GitHub `main` is `3d59daf`; Vercel
deployment `dpl_9te9BhrWrbrc7iPzWoaDDidFqKnb` is READY; production exposes
1,155 sitemap URLs including 100 tool pages. Supabase project
`kkfiefqwzlgwlrcjeixi` is ACTIVE_HEALTHY, `source_path` and its index exist,
all public tables have RLS, advisors report no warnings/errors, and production
contains 204 outbound clicks with 95 attributed rows at the latest attributed-row
snapshot. Supabase migration history now records the applied `source_path`
version `202607120001`; public pages deliberately continue to use the
version-controlled seed dataset while `public.tools` remains empty. Local typecheck, lint,
89/90 tests (one intentionally skipped), build, and official-registry audit
pass. Current gaps are operational evidence and growth outcomes: migration
post-merge production recheck, a live authenticated admin-report smoke check,
GSC/Bing query exports, affiliate conversion/settlement evidence, backup/restore
rehearsal, 2FA evidence, live authenticated admin verification, CSP deployment
confirmation, and two consecutive
28-day measurement cycles.

Last updated: 2026-07-13

This file captures the important context from the planning conversation. Future agents should read this before implementation.

## 1. Founder Profile

The founder is a solo operator in China.

Strengths:

- Very skilled at using AI agents such as Codex and Claude Code.
- Strong automation mindset.
- Good at finding platform arbitrage, information gaps, and resource gaps.
- Interested in GEO/SEO, programmatic SEO, affiliate, and data-driven sites.
- Can use AI agents to code even without being a traditional programmer.
- Can work 10+ hours per day.

Constraints:

- Budget is under $500.
- English is average, but AI-assisted English production is acceptable.
- Does not like sales calls.
- Does not like video meetings.
- Does not want paid ads.
- Does not want real-person appearances.
- Does not want heavy customer support.
- Does not want account-ban-heavy workflows.
- Has no factory and no overseas team.

Existing assets:

- `wosentools.com`: product/display site for concrete/diamond tools.
- `htskit.com`: SEO/tool site with programmatic page structure.
- PayPal, Wise, Stripe, crypto, and affiliate account capability are available.
- HSBC bank card is available.

Important prior observation:

- `htskit.com` has a programmatic SEO structure and a large sitemap. This proves the founder can create structured page matrices with AI/Codex.
- `wosentools.com` is industrial/B2B and should not be mixed with adult AI.
- The adult AI project should use a new domain and a separate brand.

## 2. Selected Business Direction

Primary direction:

Adult AI tools data site / affiliate site.

Positioning:

An English-language NSFW/adult AI tools intelligence hub that compares tools by features, pricing, restrictions, privacy, and use case.

The site should look like:

- G2
- AlternativeTo
- SaaS comparison site
- SEO data directory
- Pricing and feature intelligence tool

The site should not look like:

- Porn site
- Adult media gallery
- Tube site
- Community or upload platform

## 3. Why This Direction Was Chosen

It fits the founder because:

- High information gap.
- High affiliate value.
- Strong AI leverage.
- Strong programmatic SEO potential.
- Can be built by one person.
- Does not require sales calls.
- Does not require video meetings.
- Does not require ads.
- Does not require customer support in v1.
- Can monetize via affiliate links and featured listings.

Rejected or deprioritized directions:

- GEO consulting service: too much sales/meeting work.
- Generic SEO tools site: too competitive and less commercially sharp.
- iGaming affiliate: high value but more regulated and competitive.
- Real adult content hosting: too much legal, payment, hosting, and platform risk.

## 4. Hard Content Boundaries

The project may discuss adult AI tools in English.

Allowed:

- Tool names.
- Tool logos.
- Non-explicit screenshots.
- Pricing, features, policies, privacy notes.
- Keywords such as `NSFW AI`, `AI girlfriend`, `uncensored AI chat`, `adult AI companion`.
- Affiliate links to official home/pricing/signup pages.
- 18+ disclaimer.
- Affiliate disclosure.

Not allowed:

- Hosting explicit images.
- Hosting explicit videos.
- Embedding adult media.
- User uploads.
- Comment system or adult community.
- Deepfake tools or instructions.
- Real-person sexual manipulation.
- Celebrity sexual content.
- Leaked or pirated content.
- Minor, teen, school, incest, coercion, or non-consensual sexual framing.
- Chinese-language adult user acquisition.
- Direct links to specific porn videos, galleries, or downloads.

Strategic principle:

Be aggressive in SEO, data, automation, and affiliate monetization. Do not be aggressive in hosting adult content.

## 5. Site Concept

Working concept:

Adult AI Tools Intelligence Hub

Core user promise:

Find, compare, and track adult AI tools by features, price, privacy, and restrictions.

Core page types:

- `/tools`
- `/tools/[slug]`
- `/category/[slug]`
- `/best/[slug]`
- `/compare/[slug]`
- `/alternatives/[slug]`
- `/pricing/[slug]`
- `/coupons/[slug]`
- `/blog/[slug]`
- `/go/[toolSlug]`

Core modules:

- Tool directory.
- Tool detail pages.
- Category pages.
- Best-of pages.
- Comparison pages.
- Alternatives pages.
- Pricing/coupon pages.
- Affiliate redirect and click tracking.
- Admin dashboard.
- Dynamic sitemap.
- SEO metadata and JSON-LD.

## 6. Technical Decisions

Stack:

- Next.js 15 App Router.
- TypeScript.
- Supabase Postgres.
- Supabase Auth for admin only.
- Vercel.
- Cloudflare DNS/CDN/WAF.
- Tailwind CSS.
- shadcn/ui.
- Zod.
- React Hook Form.
- TanStack Table.
- lucide-react.
- Playwright.
- pnpm.

Rendering:

- Public SEO pages should be SSR or statically generated.
- Admin pages can be dynamic.
- Thin generated pages should be noindexed.

Data:

- Structured database is the core asset.
- Tools should have feature, pricing, privacy, policy, affiliate, and freshness fields.
- Every money page should contain useful tables and last checked dates.

## 7. Agent Workflow

The selected workflow is:

```text
GPT-5.5
  -> PRD.md

Architect Agent
  -> ARCHITECTURE.md

Architect Agent
  -> TASKS.md

Codex++
  -> Execute tasks

Playwright MCP
  -> Automated tests and screenshots

Reviewer Agent
  -> Bug and risk review

GitHub MCP
  -> Commit, push, PR
```

Every implementation agent should read:

1. `WORKFLOW.md`
2. `PRD.md`
3. `ARCHITECTURE.md`
4. `TASKS.md`
5. `AGENTS.md` or `CLAUDE.md`
6. `PROJECT_MEMORY.md`

## 8. Installed Local MCP / Skills Context

Enabled MCP after restart:

- Filesystem MCP.
- GitHub MCP through official `github/github-mcp-server`.
- Playwright MCP.
- Awesome Agent Skills MCP.
- Memory MCP.
- Node REPL MCP.
- Postiz MCP.

Installed but not enabled because keys/OAuth are missing:

- Firecrawl MCP.
- Perplexity MCP.
- Supabase MCP.
- Cloudflare MCP.
- Vercel MCP.

Missing keys at the time of setup:

- `FIRECRAWL_API_KEY`
- `PERPLEXITY_API_KEY`
- `SUPABASE_ACCESS_TOKEN`
- `CLOUDFLARE_API_TOKEN`
- `VERCEL_TOKEN`
- `DATABASE_URL`
- `POSTGRES_URL`

Installed skills:

- Anthropic official useful set: `frontend-design`, `webapp-testing`, `web-artifacts-builder`, `mcp-builder`, `claude-api`.
- Superpowers skills: planning, debugging, TDD, review, worktrees, verification, and related workflow skills.

## 9. Accounts and Assets to Prepare

Chosen domain:

- `nsfwaihunt.com`

Brand name:

- `NSFW AI Hunt`

Known project account email:

- `wosenkeji@gmail.com`

Account plan:

- Cloudflare: `wosenkeji@gmail.com`
- GitHub: account using `wosenkeji@gmail.com`
- Vercel: `wosenkeji@gmail.com`
- Supabase: login with the GitHub account
- Google: `wosenkeji@gmail.com`

Never store account passwords, API keys, recovery codes, private keys, seed phrases, or payout details in this repository.

Prepare immediately:

- New `.com` domain.
- Cloudflare account.
- GitHub repo.
- Vercel account.
- Supabase account/project.
- Google Search Console.
- Bing Webmaster Tools.
- Project email such as `contact@domain.com`.

Prepare soon:

- Firecrawl API key.
- Perplexity API key.
- Analytics account such as Plausible or PostHog.
- Affiliate network/program accounts.
- Password manager with 2FA.

Not needed in v1:

- Company formation.
- Paid ads account.
- App Store / Google Play account.
- Stripe customer payment flow.
- Adult media library.
- Customer support system.

## 10. Immediate Next Step

Start from `TASKS.md`.

Next task:

Task 1: Initialize Project

Goal:

Create the Next.js 15 TypeScript app in this project folder and set up Tailwind, shadcn/ui, lucide-react, linting, formatting, and `.env.example`.

Before coding, read:

- `WORKFLOW.md`
- `PRD.md`
- `ARCHITECTURE.md`
- `TASKS.md`
- `AGENTS.md`
- `PROJECT_MEMORY.md`

## 11. Tone and Product Direction

The site should feel:

- Useful.
- Fast.
- Data-rich.
- Serious.
- Software-focused.
- Commercially direct.

The site should not feel:

- Pornographic.
- Scammy.
- Overdesigned.
- Like a generic AI article farm.
- Like a thin affiliate doorway site.

Primary competitive edge:

Fast, structured, frequently updated adult AI tool data at programmatic SEO scale.

## 12. Implementation Checkpoint: Tasks 1-9

Checkpoint date: 2026-06-14

Current queue state:

- Tasks 1-9 are implemented and marked complete in `TASKS.md`.
- Task 10, Best-Of Pages, is the next incomplete task.
- Task 10 was only started at the documentation-reading stage; no Task 10 code or tests were intentionally implemented before this checkpoint.
- Before continuing Task 10, reread the required files in order: `WORKFLOW.md`, `PROJECT_MEMORY.md`, `PROJECT_ACCOUNTS.md`, `PRD.md`, `ARCHITECTURE.md`, `TASKS.md`, `AGENTS.md`.

Implemented product surface:

- Homepage at `/` with search, featured tools, categories, best-use-case links, and recently updated tools.
- Tool directory at `/tools` with URL-based search, category filters, feature filters, pricing filters, sorting, stable cards, and conservative seed data.
- Tool detail pages at `/tools/[slug]` with metadata, static params, SoftwareApplication JSON-LD, verdict, feature matrix, pricing table, policy/privacy summaries, pros/cons, alternatives, FAQ, and `/go/[slug]` CTA links.
- Category pages at `/category/[slug]` with metadata, static params, ranking table, best-by-use-case blocks, internal links to tool pages, best pages, comparison-route placeholders, and ItemList JSON-LD.

Last verification before this checkpoint:

- `pnpm test` passed: 7 test files, 29 tests.
- `pnpm typecheck` passed.
- `pnpm lint` passed.
- `pnpm build` passed after stopping the dev server first.
- Browser checks passed for `/`, `/tools`, `/tools/candy-ai`, and `/category/ai-girlfriend-apps` on desktop and mobile.
- Dev server was restarted on `http://localhost:3001` and key routes returned 200.

Known pitfalls:

- Stop the Next dev server before running `pnpm build`. Running `next dev` and `next build` concurrently can corrupt or contend over `.next` manifests/cache.
- On Windows, `Start-Process -FilePath 'pnpm'` can fail because it resolves to the PowerShell shim. Use `C:\Users\Administrator\AppData\Roaming\npm\pnpm.cmd` for background dev server starts.
- Browser viewport overrides can persist between checks. Explicitly set desktop and mobile sizes, then verify DOM metrics rather than assuming the current viewport.
- The browser wrapper may reject `networkidle` even if generic docs mention it. Use `load` plus concrete DOM/state checks.
- Grid children need `min-w-0` when text sits inside constrained mobile columns. This fixed the homepage hero text measuring wider than the padded mobile viewport.
- Full-page screenshots can time out in the in-app browser. DOM/layout metrics plus targeted screenshots are more reliable.
- Many routes are intentionally linked before their implementation tasks, such as `/go/[toolSlug]`, `/compare/[slug]`, and `/best/[slug]`; this is acceptable for internal-link scaffolding but those routes must be implemented in their own tasks.

Successful patterns:

- Keep public pages server-rendered or statically generated with GET-query controls where possible. This preserved SEO and reduced client-side complexity.
- Use the existing Zod schemas to validate seed records at import time. This keeps seed data aligned with the database/admin contract.
- Derive homepage, directory, detail, and category content from shared seed data instead of creating unrelated page-local shapes.
- Use TDD-style source/data tests before implementation. The focused tests caught missing helpers, missing route files, and TypeScript narrowing issues early.
- For mobile QA, check both document-level overflow and visible element bounds. Page-level `overflow-x: clip` can hide a real layout problem.
- Keep adult AI copy conservative: describe tools as tracked software records; avoid explicit media, risky claims, live-pricing claims, and unsupported coupon/affiliate claims.
- Put JSON-LD only where matching visible content exists: SoftwareApplication on tool detail pages and ItemList on category ranking pages.

## 13. Launch And Affiliate Checkpoint

Checkpoint date: 2026-06-25

Current production state:

- Production domain is live at `https://nsfwaihunt.com`.
- Vercel project is `wosenkeji-creators-projects/nsfw-ai-hunt`.
- Supabase production project is `cchmrnjcbowqdpmtcksh`.
- Supabase project URL is `https://cchmrnjcbowqdpmtcksh.supabase.co`.
- Production migrations have been applied for the initial schema and RLS.
- Core production tables verified with RLS enabled: `tools`, `categories`, `tool_categories`, `comparisons`, `alternative_pages`, `affiliate_links`, `blog_posts`, `page_metrics`, `outbound_clicks`, and `admin_audit_logs`.

Production verification completed:

- `/go/[toolSlug]` click tracking was fixed to log Supabase insert errors.
- Production redeploy succeeded after the redirect fix.
- `/go/candy-ai` was verified to redirect and insert an `outbound_clicks` row.
- `pnpm typecheck` passed after the latest affiliate-state corrections.

Affiliate program state:

- Muah AI is approved. Use the current direct-dashboard URL `https://muah.ai/affiliate/track.php?ref=VSYIYHIV0N` from the `985064198@qq.com` account. The older `GE9CZKD0WI` ID is historical and not confirmed as a CrakRevenue ID.
- CrushOn AI is approved. Use `https://crushon.ai/?ref=zdbjmta&mist=1` only as `affiliateUrl`; keep `https://crushon.ai` as the official URL.
- Nomi AI is approved. Use `https://nomi.ai/?via=ate` only as `affiliateUrl`; `wosenkeji@gmail.com` is an explicit Rewardful-only account exception and does not replace the default 985 account context.
- SoulGen application was submitted with `wosenkeji@gmail.com`; wait for `hello@soulgen.ai`.
- Candy AI is approved through CrakRevenue and its approved tracking URL is stored separately from the official `https://candy.ai` URL.

Files updated for this checkpoint:

- `AFFILIATE_PIPELINE.md` records current public affiliate application status and next actions.
- `data/seed/affiliate-applications.ts` records non-secret affiliate application state.
- `data/seed/tools.ts` stores approved affiliate URLs separately from official URLs.
- `app/go/[toolSlug]/route.ts` contains the production redirect logging fix.

Important next continuation:

1. Reconcile the applied `source_path` schema change with Supabase migration history.
2. Decide whether the 100-record seed or the currently empty production `public.tools` table is the durable source of truth.
3. Export current GSC/Bing query and page metrics and run the first 7/28-day measurement cycle.
4. Verify the full query-to-settled-commission chain and at least one attributable, settleable affiliate commission.
5. Complete authenticated admin smoke, backup/restore rehearsal, provider 2FA evidence, CI activation, and production CSP coverage.

Security reminder:

- Do not store passwords, API keys, recovery codes, payout details, or service role keys in this repository.
- If an account password was shared in chat, rotate it and move it into a password manager.
