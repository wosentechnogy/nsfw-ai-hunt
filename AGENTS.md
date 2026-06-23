# AGENTS.md

This project is an English-language adult AI tools data and affiliate site. Agents must follow the product, architecture, safety, and SEO rules in this file.

## 1. Required Reading Order

Before making code changes, read:

1. `WORKFLOW.md`
2. `PROJECT_MEMORY.md`
3. `PROJECT_ACCOUNTS.md`
4. `PRD.md`
5. `ARCHITECTURE.md`
6. `TASKS.md`
7. `AGENTS.md`

If a task conflicts with these files, ask for clarification unless the user explicitly overrides the rule.

## 2. Product Boundary

The site is a software discovery, data, and comparison product. It is not an adult media site.

Never add:

- Explicit images.
- Explicit videos.
- User upload features.
- Comment systems.
- Adult content galleries.
- Deepfake features.
- Celebrity sexual content.
- Leaked content.
- Minor, teen, school, coercion, incest, or non-consensual sexual framing.
- Chinese-language adult user acquisition.

Allowed:

- English adult AI software keywords.
- Non-explicit logos and safe screenshots.
- Tool data, pricing, features, restrictions, privacy notes, and affiliate links.
- 18+ and affiliate disclosures.

## 3. Engineering Rules

- Use TypeScript only.
- Do not use `any` unless there is a documented unavoidable reason.
- Prefer server components.
- Use client components only for interactivity.
- Use shadcn/ui components for common UI.
- Use lucide-react icons.
- Use Zod for all API and form validation.
- Keep database changes in migrations.
- Do not expose service role keys to client code.
- Do not commit secrets.
- Keep code scoped to the current task.

## 4. Design Rules

- The UI must feel like a serious SaaS comparison/research tool.
- Do not make the site look like a porn site.
- Do not use explicit media.
- Do not use decorative orb/blob backgrounds.
- Keep tables readable.
- Ensure mobile layouts do not overflow.
- Tool cards must have stable dimensions.
- Cards should use radius 8px or less.
- Do not nest cards inside cards.

## 5. SEO Rules

- Every public route must have metadata.
- Public pages should be SSR or statically generated.
- Thin pages should be `noindex`.
- Every indexable programmatic page must contain structured data, useful tables, and internal links.
- Use central SEO helpers.
- Add canonical URLs.
- Add sitemap and robots support.
- Add JSON-LD only when the matching content is visible.

## 6. Monetization Rules

- Official URLs and affiliate URLs must be stored separately.
- Use `/go/[toolSlug]` for outbound click tracking.
- Every affiliate page must include disclosure.
- Do not fake coupons.
- Sponsored placements must be labeled.

## 7. Testing Rules

Before marking a feature complete:

- Run typecheck.
- Run lint.
- Run relevant Playwright tests.
- Verify mobile layout for public pages.
- Verify no explicit media was introduced.

## 8. Agent Operating Procedure

For each task:

1. Restate the task in one sentence.
2. Inspect existing files.
3. Make the smallest coherent implementation.
4. Add or update tests when risk justifies it.
5. Run verification.
6. Summarize changed files and remaining risks.

Do not rewrite large unrelated areas.

## 9. Data Quality Rules

Tool records should be specific and sourced where possible.

Required for published tool pages:

- Tool name.
- Slug.
- Official URL.
- Category.
- Pricing model or unknown marker.
- NSFW support marker.
- At least one paragraph of editorial summary.
- Last checked date.

Do not publish tool pages with placeholder descriptions.

## 10. Admin Rules

- Admin routes require authentication.
- Owner-only is acceptable for v1.
- Admin mutations must be validated with Zod.
- Admin changes should write audit logs when practical.

## 11. Completion Standard

A task is complete only when:

- The feature works locally.
- It follows PRD and architecture.
- It passes relevant checks.
- It does not expand adult content risk.
- It has a short implementation summary.
