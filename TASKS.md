# TASKS

Use this file as the execution queue. Complete tasks in order unless the user explicitly reprioritizes.

## Phase 0: Project Setup

### Task 1: Initialize Project

Status: Completed on 2026-06-14.

Goal: Create the Next.js 15 TypeScript app.

Steps:

- Initialize Next.js app with App Router.
- Add TypeScript.
- Add Tailwind CSS.
- Add shadcn/ui.
- Add lucide-react.
- Add ESLint and Prettier.
- Add `.env.example`.

Acceptance criteria:

- App runs locally.
- TypeScript is enabled.
- Tailwind works.
- shadcn components can be generated.

### Task 2: Base Project Standards

Status: Completed on 2026-06-14.

Goal: Establish guardrails before feature work.

Steps:

- Add strict TypeScript config.
- Configure path aliases.
- Add base layout.
- Add global styles.
- Add shared constants.
- Add `siteConfig`.

Acceptance criteria:

- No `any` is introduced.
- Project compiles.
- Basic homepage renders.

## Phase 1: Database & Data Layer

### Task 3: Supabase Setup

Status: Completed on 2026-06-14.

Goal: Connect app to Supabase.

Steps:

- Add Supabase client helpers.
- Add server client.
- Add admin/service client only on server.
- Add environment validation.

Acceptance criteria:

- App fails clearly when required env vars are missing.
- Server-only keys are not exposed to client.

### Task 4: Database Schema

Status: Completed on 2026-06-14.

Goal: Create core schema.

Tables:

- `tools`
- `categories`
- `tool_categories`
- `comparisons`
- `alternative_pages`
- `affiliate_links`
- `blog_posts`
- `outbound_clicks`
- `admin_audit_logs`

Acceptance criteria:

- Migration exists.
- Tables have indexes for slug and status.
- Slug fields are unique where needed.
- Timestamps exist.

### Task 5: Zod Schemas

Status: Completed on 2026-06-14.

Goal: Validate all structured data.

Steps:

- Create tool schema.
- Create category schema.
- Create affiliate link schema.
- Create blog post schema.
- Create comparison schema.

Acceptance criteria:

- Import scripts validate data before DB writes.
- Admin forms use shared validation schemas.

## Phase 2: Core Public Pages

### Task 6: Homepage

Status: Completed on 2026-06-14.

Goal: Build the main discovery surface.

Sections:

- Search bar.
- Top categories.
- Featured tools.
- Best use-case links.
- Recently updated tools.

Acceptance criteria:

- Page is useful without scrolling too far.
- No marketing-only hero.
- Mobile layout is clean.

### Task 7: Tool Directory

Status: Completed on 2026-06-14.

Goal: Build `/tools`.

Features:

- Search.
- Filters.
- Sorting.
- Tool cards.

Acceptance criteria:

- User can find tools by category and feature.
- Filters do not break mobile layout.

### Task 8: Tool Detail Page

Status: Completed on 2026-06-14.

Goal: Build `/tools/[slug]`.

Sections:

- Verdict.
- Feature matrix.
- Pricing.
- Policy summary.
- Privacy summary.
- Pros and cons.
- Alternatives.
- CTA.
- FAQ.

Acceptance criteria:

- Page has metadata.
- Page has affiliate CTA.
- Page has structured data.

### Task 9: Category Pages

Status: Completed on 2026-06-14.

Goal: Build `/category/[slug]`.

Acceptance criteria:

- Category pages render ranking tables.
- Include internal links to tools, comparisons, and best pages.
- Include `ItemList` schema.

### Task 10: Best-Of Pages

Status: Completed on 2026-06-22.

Goal: Build `/best/[slug]`.

Acceptance criteria:

- Best pages have ranking methodology.
- Include clear recommendations.
- Include affiliate disclosures.

## Phase 3: Programmatic SEO Pages

### Task 11: Comparison Pages

Status: Completed on 2026-06-22.

Goal: Build `/compare/[slug]`.

Steps:

- Generate slug from two tools.
- Render side-by-side table.
- Show verdict.
- Link to alternatives and tool pages.

Acceptance criteria:

- Comparison pages are indexable only when both tools have enough data.
- Duplicate comparisons are prevented.

### Task 12: Alternatives Pages

Status: Completed on 2026-06-22.

Goal: Build `/alternatives/[slug]`.

Acceptance criteria:

- Page shows ranked alternatives.
- Page explains why users switch.
- Page links to comparison pages.

### Task 13: Pricing & Coupon Pages

Status: Completed on 2026-06-22.

Goal: Build `/pricing/[slug]` and `/coupons/[slug]`.

Acceptance criteria:

- Pricing pages show last checked date.
- Coupon pages do not claim fake coupons.
- If no coupon exists, page says so clearly and offers alternatives.

### Task 14: Blog System

Status: Completed on 2026-06-22.

Goal: Build `/blog` and `/blog/[slug]`.

Acceptance criteria:

- Blog supports published/draft status.
- Blog metadata is generated.
- Blog links back to money pages.

## Phase 4: Admin

### Task 15: Admin Auth

Status: Completed on 2026-06-22.

Goal: Protect admin routes.

Steps:

- Add Supabase Auth.
- Add login page.
- Restrict admin route group.
- Add admin allowlist.

Acceptance criteria:

- Anonymous users cannot access admin.
- Admin user can log in and out.

### Task 16: Tool CRUD

Status: Completed on 2026-06-22.

Goal: Manage tools.

Acceptance criteria:

- Create tool.
- Edit tool.
- Publish/unpublish tool.
- Validate inputs.
- Manage affiliate URL separately from official URL.

### Task 17: Category CRUD

Status: Completed on 2026-06-22.

Goal: Manage categories.

Acceptance criteria:

- Create/edit categories.
- Assign tools to categories.
- Manage SEO fields.

### Task 18: Affiliate Link Management

Status: Completed on 2026-06-22.

Goal: Manage monetization links.

Acceptance criteria:

- Add affiliate links.
- Mark primary link.
- Pause link.
- Track network and commission fields.

## Phase 5: SEO & Analytics

### Task 19: SEO Metadata System

Status: Completed on 2026-06-22.

Goal: Centralize metadata generation.

Acceptance criteria:

- All public pages use shared SEO helpers.
- Canonical URLs work.
- Open Graph tags work.

### Task 20: Sitemap & Robots

Status: Completed on 2026-06-22.

Goal: Make pages discoverable.

Acceptance criteria:

- Dynamic sitemap includes published indexable pages.
- Low-data pages can be noindexed.
- Robots file exists.

### Task 21: Structured Data

Status: Completed on 2026-06-22.

Goal: Add JSON-LD.

Acceptance criteria:

- Tool pages have software schema when appropriate.
- Category and best pages have ItemList schema.
- Breadcrumbs exist.

### Task 22: Outbound Click Tracking

Status: Completed on 2026-06-22.

Goal: Track affiliate intent.

Steps:

- Create `/go/[toolSlug]`.
- Log click.
- Redirect to affiliate URL or official URL.

Acceptance criteria:

- Clicks are stored.
- Redirects are fast.
- Missing tools return 404.

### Task 23: Analytics

Status: Completed on 2026-06-22.

Goal: Add privacy-friendly analytics.

Acceptance criteria:

- Page views are tracked.
- Outbound clicks are tracked.
- No heavy analytics scripts block rendering.

## Phase 6: Content & Data

### Task 24: Seed First 100 Tools

Status: Skipped by user on 2026-06-23. Resume later.

Goal: Launch with useful data.

Acceptance criteria:

- 100 tools exist.
- At least 80 have pricing summary.
- At least 80 have feature fields.
- At least 50 have safe logo.

### Task 25: Generate Initial SEO Pages

Status: Completed for the current preview dataset on 2026-06-23. Full volume targets resume after Task 24.

Goal: Create first page set.

Targets:

- 100 tool pages.
- 10 category pages.
- 30 best pages.
- 100 alternatives pages.
- 200 comparison pages.
- 50 pricing/coupon pages.

Acceptance criteria:

- Pages are generated from data.
- Thin pages are noindexed.
- Sitemap includes only indexable pages.

### Task 26: Manual Review of Money Pages

Status: Completed on 2026-06-23. Added a tracked review set for 30 high-value routes, with claim-check notes rendered on reviewed best/category/tool/comparison/alternatives/pricing pages.

Goal: Improve highest-value pages.

Acceptance criteria:

- Top 30 pages are manually edited.
- Claims are checked.
- Affiliate CTAs are present.

## Phase 7: QA & Launch

### Task 27: Playwright Smoke Tests

Status: Completed on 2026-06-23.

Goal: Verify main flows.

Tests:

- Homepage loads.
- Tool page loads.
- Category page loads.
- Comparison page loads.
- Affiliate redirect works.
- Admin route redirects anonymous users.
- Mobile viewport has no broken layout.

Acceptance criteria:

- Tests pass.

### Task 28: SEO QA

Status: Completed on 2026-06-23.

Goal: Verify indexability.

Acceptance criteria:

- Sitemap returns 200.
- Robots returns 200.
- Metadata exists on key pages.
- No explicit images are present.
- Canonicals are valid.

### Task 29: Production Deploy

Status: In progress on 2026-06-25. GitHub push, Vercel production deploy, Cloudflare DNS, custom domain, Vercel Web Analytics, Supabase production project, production env vars, initial schema migration, RLS migration, and `/go/[toolSlug]` production click tracking are live. Production mobile QA passed after fixing tool-detail overflow. Remaining launch items are Cloudflare Email Routing destination verification and Google/Bing sitemap submission.

Goal: Launch.

Steps:

- Deploy to Vercel.
- Configure Cloudflare DNS.
- Configure production env vars.
- Submit sitemap to Google Search Console and Bing Webmaster.

Acceptance criteria:

- Production site loads.
- Core pages return 200.
- No missing env var errors.

### Task 30: Post-Launch Growth Loop

Goal: Improve based on data.

Weekly actions:

- Check GSC queries.
- Add pages for keywords with impressions.
- Update pricing and policy fields.
- Apply to more affiliate programs.
- Improve CTA placement.

Acceptance criteria:

- Every week ships new pages or updates.
- Pages with impressions are improved first.
