# AGENTS.md

This project is an English-language adult AI tools data and affiliate site. Agents must follow the product, architecture, safety, and SEO rules in this file.

## 0. Fixed Conversation Startup

For cross-dialog Codex work, use the fixed conversation map in `.agents/conversation-agent-map.md`.

Every fixed conversation must also read:

1. `.agents/conversation-agent-map.md`
2. `.agents/CODEX_INTAKE.md`
3. `.agents/CODEX_HANDOFF.md`
4. `.agents/AGENT_OPERATING_STANDARD.md`

Specialist conversations write completion, blocker, and verification notes to `.agents/CODEX_FEEDBACK.md`.

## 0.5 Required Operating Priorities

These priorities apply before any implementation, deployment, account, API, MCP, database, or automation task.

1. Account identity gate first.
   - Before touching GitHub, Vercel, Supabase, Cloudflare, Google, Bing, affiliate dashboards, MCP config, API keys, or deployment state, verify the active account, team/scope, project, repository, and local Git identity.
   - For `nsfw-ai-hunt` / `nsfwaihunt.com`, the intended account context is `985064198@qq.com` unless the user explicitly overrides it.
   - Do not proceed when account ownership, team membership, project binding, or key provenance is unclear.
2. Mature solution search first.
   - Before building custom code, automation, data pipelines, deployment scripts, or integrations, check whether an official SDK, platform feature, open-source package, existing project pattern, or mature service can solve the task.
   - Prefer official documentation, proven libraries, and existing repository conventions over hand-rolled systems.
3. Cross-conversation routing first.
   - Mixed or multi-domain work must be split by the Coordinator and routed through the fixed conversation map.
   - Use `.agents/CODEX_INTAKE.md`, `.agents/CODEX_HANDOFF.md`, and the Codex cross-thread tools so Data SEO, Product Engineering, Compliance Monetization, and Release Gate agents execute their own scoped work.
   - Do not silently keep specialist work inside the Coordinator conversation when a fixed specialist conversation should own it.

## 0.6 Mandatory Agent Execution Contract

Every fixed conversation must follow `.agents/AGENT_OPERATING_STANDARD.md`.

Before task execution, every specialist agent must create a visible preflight note in its own conversation that includes:

1. Handoff ID and one-sentence task restatement.
2. Account identity gate result.
3. Skills checked, existing repo pattern checked, and official/open-source/mature route checked.
4. File and ownership scope.
5. Verification plan.
6. Escalation trigger.

No agent may continue blind trial-and-error after repeated failures:

- If the same command/path fails twice, stop and report.
- If two different approaches fail without a new diagnosis, stop and report.
- If account, org, team, OAuth, captcha, billing, payout, secret, or permission state is unclear, stop and report.
- If the needed work crosses into another fixed conversation's domain, stop and route.

Completion is not valid unless the executing specialist:

1. Writes `.agents/CODEX_FEEDBACK.md`.
2. Updates the matching `.agents/CODEX_HANDOFF.md` card.
3. Reports back to Coordinator.
4. Sends `release_ready` work to Release Gate, or records why Release Gate is not required.

Release Gate is the only role that may mark a specialist implementation as `verified`.

## 1. Required Reading Order

Before making code changes, read:

1. `WORKFLOW.md`
2. `PROJECT_MEMORY.md`
3. `PROJECT_ACCOUNTS.md`
4. `PRD.md`
5. `ARCHITECTURE.md`
6. `TASKS.md`
7. `AGENTS.md`
8. `.agents/AGENT_OPERATING_STANDARD.md`

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
2. Run the mandatory preflight from `.agents/AGENT_OPERATING_STANDARD.md`.
3. Inspect existing files.
4. Check skills, existing patterns, official docs, and mature open-source references before custom work.
5. Make the smallest coherent implementation.
6. Add or update tests when risk justifies it.
7. Run verification.
8. Write feedback, update handoff status, report Coordinator, and route `release_ready` work to Release Gate.
9. Summarize changed files and remaining risks.

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
