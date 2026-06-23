# ARCHITECTURE

## 1. Stack

Use this stack unless the user explicitly changes it:

- Framework: Next.js 15 App Router
- Language: TypeScript
- Database: Supabase Postgres
- Auth: Supabase Auth for admin only
- Hosting: Vercel
- Edge/CDN/DNS: Cloudflare
- Styling: Tailwind CSS
- UI components: shadcn/ui
- Validation: Zod
- Forms: React Hook Form + Zod resolver
- Tables: TanStack Table
- Icons: lucide-react
- Testing: Playwright
- Package manager: pnpm
- Analytics: Plausible or PostHog in v1; GA4 optional

## 2. Architecture Principle

This is a data-first SEO application. The core asset is structured tool data. Pages are generated from database records and stable templates.

Avoid building a generic blog CMS first. Build the data model, page templates, SEO system, and admin workflows first.

## 3. Repository Structure

Expected structure:

```text
adult-ai-tools-hub/
  app/
    (public)/
      page.tsx
      tools/
      category/
      best/
      compare/
      alternatives/
      pricing/
      coupons/
      blog/
    admin/
      layout.tsx
      page.tsx
      tools/
      categories/
      affiliate-links/
    api/
      revalidate/
      webhooks/
    sitemap.ts
    robots.ts
  components/
    common/
    layout/
    seo/
    tool/
    compare/
    admin/
    ui/
  data/
    seed/
    templates/
  db/
    migrations/
    schema.sql
    seed.ts
  lib/
    supabase/
    seo/
    schema/
    validation/
    affiliate/
    utils/
  tests/
    e2e/
    fixtures/
  public/
    logos/
    screenshots-safe/
  scripts/
    import-tools.ts
    generate-comparisons.ts
    check-affiliate-links.ts
  PRD.md
  ARCHITECTURE.md
  TASKS.md
  AGENTS.md
  CLAUDE.md
```

## 4. Rendering Strategy

Public SEO pages:

- Prefer static generation with ISR where practical.
- Use SSR only when page depends on request-specific data.
- Use `generateMetadata` for each route.
- Use `generateStaticParams` for high-priority pages.
- Use `revalidate` to refresh data pages.

Admin pages:

- Dynamic rendering.
- Require Supabase Auth.

## 5. Route Map

Public:

- `/`
- `/tools`
- `/tools/[slug]`
- `/category/[slug]`
- `/best/[slug]`
- `/compare/[slug]`
- `/alternatives/[slug]`
- `/pricing/[slug]`
- `/coupons/[slug]`
- `/blog`
- `/blog/[slug]`
- `/submit-tool`
- `/about`
- `/contact`
- `/privacy`
- `/terms`
- `/affiliate-disclosure`

Admin:

- `/admin`
- `/admin/tools`
- `/admin/tools/new`
- `/admin/tools/[id]`
- `/admin/categories`
- `/admin/affiliate-links`
- `/admin/content`

## 6. Database Design

Use Supabase migrations. Do not make schema changes manually in production without a migration.

Core tables:

- `tools`
- `categories`
- `tool_categories`
- `comparisons`
- `alternative_pages`
- `affiliate_links`
- `blog_posts`
- `page_metrics`
- `outbound_clicks`
- `admin_audit_logs`

Recommended enums:

- `tool_status`: `draft`, `published`, `archived`
- `affiliate_status`: `none`, `applied`, `approved`, `rejected`, `paused`
- `pricing_model`: `free`, `freemium`, `subscription`, `credits`, `one_time`, `unknown`
- `content_status`: `draft`, `review`, `published`, `noindex`

## 7. Validation

Every mutation must use Zod.

Rules:

- No API route accepts raw unvalidated input.
- No admin form writes directly to Supabase without schema validation.
- All slugs must be normalized and unique.
- URLs must be validated.
- Affiliate URLs must be stored separately from official URLs.

## 8. SEO System

Create central SEO helpers:

- `lib/seo/metadata.ts`
- `lib/seo/schema.ts`
- `lib/seo/canonical.ts`
- `components/seo/JsonLd.tsx`

Every indexable page must define:

- title
- description
- canonical
- Open Graph title
- Open Graph description
- robots directive

Structured data:

- Tool pages: `SoftwareApplication` when suitable.
- Category/best pages: `ItemList`.
- Comparison pages: `WebPage` + visible comparison table.
- Blog posts: `Article`.
- Breadcrumbs: `BreadcrumbList`.

No FAQ schema unless FAQ is visible on page.

## 9. Compliance System

Global requirements:

- 18+ notice in footer.
- Affiliate disclosure in footer.
- Dedicated affiliate disclosure page.
- No user uploads.
- No comments.
- No explicit images or videos.
- Logos and screenshots must be non-explicit.
- Admin must be able to mark a screenshot as safe.

Content safety rules:

- Reject tools or descriptions involving minors, teen framing, coercion, non-consensual content, celebrity deepfakes, leaked content, or real-person sexual image manipulation.
- Do not use explicit thumbnails.
- Do not deep-link to explicit media pages.

## 10. Affiliate System

Affiliate links must be tracked.

Recommended flow:

- Store official URL and affiliate URL separately.
- Public CTA resolves to `/go/[toolSlug]`.
- `/go/[toolSlug]` logs click and redirects to the primary affiliate URL.
- If no affiliate URL exists, redirect to official URL.

Benefits:

- Track outbound clicks.
- Change affiliate links without editing content.
- Prevent affiliate URLs from being scattered across templates.

## 11. Admin Auth

Use Supabase Auth.

v1 should support only owner/admin access.

Rules:

- Admin routes require authenticated user.
- Admin user IDs can be whitelisted via environment variable or database role table.
- Never expose Supabase service role key to client components.

## 12. Environment Variables

Required:

```text
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

Optional:

```text
NEXT_PUBLIC_ANALYTICS_DOMAIN=
REVALIDATE_SECRET=
AFFILIATE_REDIRECT_SECRET=
```

Rules:

- Never commit `.env.local`.
- Add `.env.example`.
- Server-only keys must not start with `NEXT_PUBLIC_`.

## 13. Component Rules

Use shadcn/ui for:

- Buttons
- Inputs
- Selects
- Dialogs
- Tables where suitable
- Tabs
- Cards
- Tooltips
- Badges

Use lucide-react for icons.

Do not hand-roll generic UI primitives if shadcn provides one.

Cards:

- Keep radius at 8px or less.
- Do not nest cards inside cards.
- Tool cards must have stable dimensions.

## 14. Design Direction

The product should look like a serious software research tool, not an adult entertainment site.

Visual tone:

- Dark-neutral or clean light dashboard style.
- Accent color can be red, pink, cyan, or green, but avoid one-note palettes.
- No explicit imagery.
- No bokeh/orb decorative backgrounds.
- Dense but readable data tables.

Homepage first screen:

- Search and filters.
- Top categories.
- Featured tools.
- No marketing-only hero.

## 15. Testing

Use Playwright for:

- Homepage smoke test.
- Tool detail page.
- Category page.
- Comparison page.
- Affiliate redirect.
- Admin login redirect.
- Sitemap response.
- Mobile viewport layout.

Required before launch:

- No broken navigation.
- No overlapping text.
- CTA buttons visible on mobile.
- Core pages return 200.
- No explicit media in screenshots.

## 16. Deployment

Primary:

- Vercel for Next.js hosting.
- Supabase for DB/Auth.
- Cloudflare for DNS/CDN/WAF.

Deployment rules:

- Production branch: `main`.
- Preview branches allowed.
- Do not deploy with missing required env vars.
- Add security headers.
- Add redirects from deprecated slugs if needed.

## 17. Performance

Targets:

- LCP under 2.5s on key pages.
- Avoid loading heavy third-party scripts.
- Use optimized images.
- Keep tables usable on mobile.
- Use server components by default.
- Use client components only for interactivity.

## 18. Data Import Workflow

Tool data should be importable from CSV/JSON.

Workflow:

1. Research tools.
2. Fill seed file.
3. Validate with Zod.
4. Import into Supabase.
5. Generate missing comparisons and alternatives.
6. Review top money pages manually.

## 19. Agent Workflow

Before coding:

1. Read `PRD.md`.
2. Read `ARCHITECTURE.md`.
3. Read `TASKS.md`.
4. Read `AGENTS.md`.

During coding:

- Complete tasks sequentially.
- Keep scope tight.
- Run tests after meaningful changes.
- Use Playwright for visual checks.

Before completion:

- Run lint.
- Run typecheck.
- Run Playwright smoke tests.
- Verify no explicit media is present.
- Summarize changed files and remaining risks.
