# CLAUDE.md

Follow this file when working in this repository with Claude Code or any Claude-based agent. It mirrors `AGENTS.md` but is written as direct execution guidance.

## Read First

Always read these files before implementation:

1. `WORKFLOW.md`
2. `PROJECT_MEMORY.md`
3. `PROJECT_ACCOUNTS.md`
4. `PRD.md`
5. `ARCHITECTURE.md`
6. `TASKS.md`
7. `CLAUDE.md`

## Project Mission

Build an English adult AI tools data and affiliate site. The product is a software comparison and intelligence engine, not a pornography site.

The site should help 18+ users compare adult AI tools by features, price, restrictions, privacy, and use case.

## Hard Boundaries

Never implement:

- Explicit media hosting.
- User uploads.
- Comments or community features.
- Adult image/video galleries.
- Real-person deepfake features.
- Celebrity sexual content.
- Leaked or pirated adult content.
- Minor, teen, school, coercion, incest, or non-consensual sexual framing.
- Chinese-language adult traffic acquisition.

Implement instead:

- Software directory.
- Data tables.
- Comparison pages.
- Alternatives pages.
- Best-of pages.
- Pricing and coupon pages.
- Affiliate redirects.
- Admin CRUD.

## Code Standards

- Use Next.js 15 App Router.
- Use TypeScript.
- Avoid `any`.
- Use Tailwind and shadcn/ui.
- Use lucide-react for icons.
- Use Zod for validation.
- Use Supabase for database and admin auth.
- Use server components by default.
- Keep client components small.
- Keep all SEO metadata centralized.

## SEO Standards

Every public page needs:

- title
- description
- canonical
- Open Graph data
- robots directive

Programmatic pages need:

- useful structured data
- comparison tables
- internal links
- last updated or last checked date
- unique editorial text

Do not create indexable thin pages.

## UI Standards

The site should look like a polished SaaS research product.

Rules:

- No explicit imagery.
- No porn-site visual language.
- No blob/orb decorative backgrounds.
- Stable cards and tables.
- Mobile-first responsive layout.
- Clear CTAs.
- 18+ and affiliate disclosures visible in footer.

## Monetization Standards

- Store affiliate links separately.
- Route outbound clicks through `/go/[toolSlug]`.
- Track outbound clicks.
- Do not fake deals or coupons.
- Label sponsored placements.

## Testing Standards

Before completion:

- Run lint.
- Run typecheck.
- Run relevant Playwright tests.
- Inspect key pages in mobile and desktop.
- Confirm no explicit media was added.

## Workflow

Work from `TASKS.md`.

For each task:

1. Read relevant docs.
2. Inspect existing implementation.
3. Implement only the task scope.
4. Add validation and tests where appropriate.
5. Run verification.
6. Report changed files and risks.

Do not perform unrelated refactors.
