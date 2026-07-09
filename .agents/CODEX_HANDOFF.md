# Adult AI Hub Codex Handoff Board

Purpose: pass tasks across the 5 fixed conversations without relying on hidden chat memory.

## Board Rules

- Coordinator creates or splits task cards.
- Coordinator sends each ready task to the target fixed conversation with the Codex app `send_message_to_thread` tool, using `target_thread_id` and `target_host_id`.
- If sending fails, Coordinator changes the task to `blocked` or `needs_human` and records the failure in `notes`.
- A specialist conversation changes one owned item from `ready_*` to `in_progress`.
- After implementation, the specialist writes feedback and changes status to `release_ready`, `needs_human`, `blocked`, or `done`.
- Release Gate verifies only items marked `release_ready`.
- Every completed item must also be summarized in `.agents/CODEX_FEEDBACK.md`.

## Status Legend

| Status | Meaning |
|---|---|
| `intake` | Raw request captured; not routed |
| `split` | Mixed request split into single-domain tasks |
| `ready_data_seo` | Data SEO Agent may execute |
| `ready_engineering` | Product Engineering Agent may execute |
| `ready_compliance_monetization` | Compliance Monetization Agent may execute |
| `in_progress` | Current conversation owns execution |
| `blocked` | Missing input, data, credential, approval, or validation path |
| `needs_human` | Human confirmation or account action required |
| `release_ready` | Ready for Release Gate verification |
| `verified` | Release Gate verified |
| `done` | Finished and feedback written |

## Active Handoffs

```yaml
id: ADULTAIHUB-20260709-01
status: done
source_conversation: Adult AI Hub：今日任务和路线
target_conversation: Adult AI Hub：产品工程
target_host_id: local
target_thread_id: 019f3751-a833-7cd0-84e2-11314dee2ff2
agent: Product Engineering
owner: Adult AI Hub：产品工程
task: Verify and migrate the isolated Supabase project for NSFW AI Hunt.
input:
  - PROJECT_ACCOUNTS.md
  - db/migrations/202606140001_initial_schema.sql
  - db/migrations/202606240001_enable_rls.sql
  - app/go/[toolSlug]/route.ts
output_requirement: Apply or report the required schema/data migration path for Supabase project `kkfiefqwzlgwlrcjeixi`, then verify `/go/muah-ai` can log an outbound click without exposing secrets.
validation:
  - Account identity gate: confirm Supabase target project is `kkfiefqwzlgwlrcjeixi` under the 985 account context before any write.
  - Mature solution gate: prefer Supabase CLI/MCP/SQL editor workflow over custom ad hoc scripts.
  - Verify core tables exist: tools, categories, affiliate_links, outbound_clicks.
  - Verify no service role key is printed, committed, or stored in repo files.
handoff_to: Release Gate
human_confirmation: required_if_destructive
last_update: 2026-07-09T19:48:00+08:00
notes: Supabase MCP was re-authenticated with write access and confirmed target `https://kkfiefqwzlgwlrcjeixi.supabase.co`. Applied remote migrations `initial_schema`, `enable_rls`, and `grant_service_role_public_table_access`; added local migration `db/migrations/202607090001_grant_service_role_public_table_access.sql` for the service_role grants required by Supabase's newer Data API permission model. Verified core public tables exist, RLS is enabled on all 10 core tables, service_role has SELECT/INSERT/UPDATE/DELETE on `outbound_clicks`, `https://www.nsfwaihunt.com/go/muah-ai` returns 307, and `public.outbound_clicks` contains a new `muah-ai` row. No secret values were read or printed.
```

```yaml
id: ADULTAIHUB-20260709-02
status: verified
source_conversation: Adult AI Hub：今日任务和路线
target_conversation: Adult AI Hub：验收和发布检查
target_host_id: local
target_thread_id: 019f3752-30f1-7620-b132-31dbac7f1223
agent: Release Gate
owner: Release Gate
task: Verify the current 985 Vercel production deployment and account separation.
input:
  - PROJECT_ACCOUNTS.md
  - AGENTS.md
  - .agents/conversation-agent-map.md
  - current Vercel deployment `dpl_BeXq1xcFBpnGgS17rsUt26Ur8jK3`
output_requirement: Report pass/fail for production reachability, account identity, env presence, and remaining blockers; do not develop or modify business code.
validation:
  - Account identity gate: Vercel scope must be `985064198-2862s-projects`, GitHub repo must be `wosentechnogy/nsfw-ai-hunt`, Git author must be `985064198@qq.com`.
  - Verify `/`, `/sitemap.xml`, `/robots.txt`, `/tools/candy-ai`, and `/go/muah-ai`.
  - Confirm `SUPABASE_SERVICE_ROLE_KEY` exists in Vercel Production without reading the value.
  - Confirm custom domain blocker status for `nsfwaihunt.com`.
handoff_to: none
human_confirmation: not_required
last_update: 2026-07-09T19:40:00+08:00
notes: Release Gate re-verified account identity and project separation: Vercel CLI user is 985064198-2862, scope 985064198-2862s-projects contains nsfw-ai-hunt, .vercel/project.json points to project prj_Z477JxMNDzyShQBtfF1qJpotooyr and org team_Md4kaFP3ejSkZqiyaI8RHxn0, git origin is wosentechnogy/nsfw-ai-hunt, git user.email and HEAD author email are 985064198@qq.com. Vercel inspect confirms dpl_BeXq1xcFBpnGgS17rsUt26Ur8jK3 is production and Ready. Vercel env ls production confirms SUPABASE_SERVICE_ROLE_KEY exists as Encrypted without reading the value. Vercel domains now shows nsfwaihunt.com under the 985 scope, and domains inspect finds nsfwaihunt.com/www.nsfwaihunt.com under that scope. Route checks now pass: apex redirects 308 to www, www / returns 200, /sitemap.xml returns 200, /robots.txt returns 200, /tools/candy-ai returns 200, and /go/muah-ai returns 307 to the approved Muah AI tracking URL. Vercel still reports nameserver/DNS recommendation because Cloudflare nameservers are active, but production reachability is verified. Supabase migration/click persistence remains tracked under ADULTAIHUB-20260709-01.
```

```yaml
id: ADULTAIHUB-20260708-01
status: release_ready
source_conversation: Adult AI Hub：今日任务和路线
target_conversation: Adult AI Hub：合规和变现
target_host_id: local
target_thread_id: 019f3751-ebae-7980-9555-a1555fd6f182
agent: Compliance Monetization
owner: Adult AI Hub：合规和变现
task: Reconcile commercial launch blockers and monetization readiness for commercial landing.
input:
  - TASKS.md
  - PROJECT_MEMORY.md
  - PROJECT_ACCOUNTS.md
  - COMMERCIAL_LAUNCH_STATUS.md
  - AFFILIATE_PIPELINE.md
  - data/seed/tools.ts
output_requirement: Update blocker/status docs or report exact blockers if human login/approval is required; do not store secrets.
validation:
  - Verify affiliate URLs remain separate from official URLs.
  - Verify approved Muah AI URL is represented only as affiliate data and routed through /go/muah-ai.
  - Identify Cloudflare Email Routing, GSC, Bing, and affiliate approval actions that require human confirmation.
handoff_to: Release Gate
human_confirmation: required
last_update: 2026-07-08T00:00:00+08:00
notes: Commercial blocker docs reconciled. Affiliate URL separation verified in source; Muah approved URL is only affiliateUrl data and /go/muah-ai should select it. Human actions remain Cloudflare Email Routing verification, GSC/Bing sitemap submission, Muah commercial account dashboard check, pending affiliate approvals, and production reachability retest from a normal browser/network.
```

```yaml
id: ADULTAIHUB-20260709-03
status: in_progress
source_conversation: Adult AI Hub：今日任务和路线
target_conversation: Adult AI Hub：数据和SEO
target_host_id: local
target_thread_id: 019f3751-6408-74f1-a421-803626990811
agent: Data SEO
owner: Adult AI Hub：数据和SEO
task: Start Task 24 execution by expanding the safe commercial tool dataset toward 100 tools.
input:
  - TASKS.md
  - AGENTS.md
  - docs/superpowers/plans/2026-07-08-task24-100-tool-dataset.md
  - data/seed/tools.ts
output_requirement: Add the first focused batch of safe, English, non-explicit published tool records or report exact blocker; keep official and affiliate URLs separate.
validation:
  - Account identity gate: no third-party account writes required for data edits.
  - Mature solution gate: reuse existing data schema/tests and existing seed patterns; do not invent a new data format.
  - Run relevant seed/data validation tests.
  - Verify no explicit media, celebrity/deepfake/leaked/minor/teen/coercive/non-consensual framing is introduced.
handoff_to: Release Gate
human_confirmation: not_required
last_update: 2026-07-09T20:10:00+08:00
notes: Adult AI Hub：数据和SEO accepted the task. Existing Data SEO feedback says rawDirectoryTools has 35 records and Task 24 needs 65 additional published tool records. Start with a small high-quality batch rather than filling placeholders.
```

```yaml
id: ADULTAIHUB-20260709-04
status: verified
source_conversation: Adult AI Hub：今日任务和路线
target_conversation: Adult AI Hub：合规和变现
target_host_id: local
target_thread_id: 019f3751-ebae-7980-9555-a1555fd6f182
agent: Compliance Monetization
owner: Release Gate
task: Reconcile post-migration commercial launch blockers and account-action checklist.
input:
  - COMMERCIAL_LAUNCH_STATUS.md
  - AFFILIATE_PIPELINE.md
  - PROJECT_ACCOUNTS.md
  - .agents/CODEX_FEEDBACK.md
output_requirement: Update readiness docs or report a concise human-action checklist for Cloudflare Email Routing, GSC/Bing sitemap submission, Muah dashboard readiness, and pending affiliate approvals.
validation:
  - Account identity gate: all NSFW AI Hunt account actions must use `985064198@qq.com`.
  - Mature solution gate: prefer official Cloudflare/GSC/Bing workflows; do not create custom workarounds for provider verification.
  - Verify Muah affiliate URL remains only in affiliate data and `/go/muah-ai` path.
  - Do not store secrets or payout details.
handoff_to: Release Gate
human_confirmation: required
last_update: 2026-07-09T20:42:00+08:00
notes: Release Gate verified the commercial blocker reconciliation. PROJECT_ACCOUNTS.md, COMMERCIAL_LAUNCH_STATUS.md, AFFILIATE_PIPELINE.md, data/seed/affiliate-applications.ts, and lib/ops/commercial-readiness.ts now route new NSFW AI Hunt account actions through 985064198@qq.com. Supabase, Vercel/domain reachability, and /go/muah-ai click persistence are no longer commercial blockers. Muah official URL and affiliate URL remain separate in data/seed/tools.ts, and app/go/[toolSlug]/route.ts remains the single affiliate redirect/click logging surface. Remaining items are human account actions only: Cloudflare Email Routing destination/rules, GSC/Bing sitemap submission, Muah dashboard readiness, and pending affiliate approvals. Verification passed: CI=true pnpm test tests/commercial-readiness.test.ts tests/admin-affiliate-links.test.ts tests/affiliate-pipeline.test.ts tests/redirect-analytics.test.ts; CI=true pnpm typecheck; CI=true pnpm lint. Secret and adult-content boundary scans found no blocking issue in the verified docs/source set.
```

```yaml
id: ADULTAIHUB-20260709-05
status: ready_engineering
source_conversation: Adult AI Hub：今日任务和路线
target_conversation: Adult AI Hub：产品工程
target_host_id: local
target_thread_id: 019f3751-a833-7cd0-84e2-11314dee2ff2
agent: Product Engineering
owner: unassigned
task: Review Supabase advisor security-hardening follow-ups after the isolated project migration.
input:
  - db/migrations/202606140001_initial_schema.sql
  - db/migrations/202606240001_enable_rls.sql
  - db/migrations/202607090001_grant_service_role_public_table_access.sql
  - .agents/CODEX_FEEDBACK.md
output_requirement: Determine whether public function privileges/search_path warnings require a migration; implement only scoped migration fixes if safe, otherwise report exact residual risk.
validation:
  - Account identity gate: confirm Supabase target is `kkfiefqwzlgwlrcjeixi` under the 985 context before any remote write.
  - Mature solution gate: use the installed Supabase/Postgres best-practices skills and official Supabase advisor guidance.
  - Do not expose or commit service role keys.
  - Run relevant SQL/migration validation where available.
handoff_to: Release Gate
human_confirmation: required_if_destructive
last_update: 2026-07-09T20:00:00+08:00
notes: Feedback reports non-blocking advisor warnings for `public.set_updated_at` search_path and `public.rls_auto_enable` SECURITY DEFINER execute exposure. Treat as hardening, not launch blocker unless confirmed.
```

```yaml
id: ADULTAIHUB-20260709-06
status: verified
source_conversation: Adult AI Hub：今日任务和路线
target_conversation: Adult AI Hub：验收和发布检查
target_host_id: local
target_thread_id: 019f3752-30f1-7620-b132-31dbac7f1223
agent: Release Gate
owner: Release Gate
task: Run final launch-readiness verification after Supabase and domain migration are reported resolved.
input:
  - TASKS.md
  - PROJECT_ACCOUNTS.md
  - COMMERCIAL_LAUNCH_STATUS.md
  - .agents/CODEX_FEEDBACK.md
output_requirement: Produce a current pass/fail release-readiness report and identify only remaining blockers.
validation:
  - Account identity gate: verify GitHub, Vercel, Supabase, and domain all point to the 985 account context.
  - Verify production custom domain routes: `/`, `/sitemap.xml`, `/robots.txt`, `/tools/candy-ai`, `/go/muah-ai`.
  - Verify `/go/muah-ai` persists an outbound click in the new Supabase project without reading secrets.
  - Run or cite latest typecheck/lint/build status; do not modify business code.
handoff_to: none
human_confirmation: not_required
last_update: 2026-07-09T20:34:00+08:00
notes: Final Release Gate verification now passes. Account checks pass for GitHub origin `wosentechnogy/nsfw-ai-hunt`, git user/HEAD author `985064198@qq.com`, Vercel user `985064198-2862`, Vercel scope `985064198-2862s-projects`, project `prj_Z477JxMNDzyShQBtfF1qJpotooyr`, domain `nsfwaihunt.com`, Production `SUPABASE_SERVICE_ROLE_KEY` presence, and Supabase project `https://kkfiefqwzlgwlrcjeixi.supabase.co` verified earlier in the same handoff. Vercel inspect for `https://www.nsfwaihunt.com` returns production deployment `dpl_BeXq1xcFBpnGgS17rsUt26Ur8jK3` Ready; domain is attached under the 985 scope, though Vercel still shows Cloudflare nameserver recommendation. Route checks returned 200 for `/`, `/sitemap.xml`, `/robots.txt`, and `/tools/candy-ai`; `/go/muah-ai` returned 307 to the approved Muah affiliate URL. Earlier same-handoff Supabase MCP verification confirmed migrations/tables/RLS and a new `public.outbound_clicks` row for `muah-ai` after hitting production `/go/muah-ai`; the resumed tool surface no longer exposes Supabase MCP, so no extra SQL query was run after the typecheck fix. `pnpm typecheck`, `pnpm test tests/commercial-readiness.test.ts tests/admin-affiliate-links.test.ts`, `pnpm lint`, and `pnpm build` all pass. No remaining Release Gate blockers for this handoff.
```

```yaml
id: ADULTAIHUB-20260708-03
status: done
source_conversation: Adult AI Hub：今日任务和路线
target_conversation: Adult AI Hub：验收和发布检查
target_host_id: local
target_thread_id: 019f3752-30f1-7620-b132-31dbac7f1223
agent: Release Gate
owner: Release Gate
task: Verify current commercial-launch readiness and diagnose production reachability from available environments.
input:
  - TASKS.md
  - PROJECT_MEMORY.md
  - PROJECT_ACCOUNTS.md
  - COMMERCIAL_LAUNCH_STATUS.md
  - current Coordinator check results
output_requirement: Report pass/fail for local verification and production reachability; do not develop or modify business code.
validation:
  - pnpm typecheck
  - pnpm lint
  - pnpm build
  - Verify production domain, sitemap, robots, and /go redirects if reachable.
  - Verify no explicit media is introduced by current changes.
handoff_to: none
human_confirmation: not_required
last_update: 2026-07-09T20:20:00+08:00
notes: Superseded by `ADULTAIHUB-20260709-02`, which verified the 985 Vercel deployment, custom domain ownership under the 985 scope, and production route reachability on `https://www.nsfwaihunt.com`. This older blocker is closed to keep the active board current.
```

## Completed Handoffs

```yaml
id: ADULTAIHUB-20260708-02
status: done
source_conversation: Adult AI Hub：今日任务和路线
target_conversation: Adult AI Hub：数据和SEO
target_host_id: local
target_thread_id: 019f3751-6408-74f1-a421-803626990811
agent: Data SEO
owner: Adult AI Hub：数据和SEO
task: Resume Task 24 planning for the 100-tool commercial dataset without violating adult-content boundaries.
input:
  - TASKS.md
  - PRD.md
  - ARCHITECTURE.md
  - AGENTS.md
  - data/seed/tools.ts
  - data/seed/categories.ts
output_requirement: Produce a scoped execution plan or first safe data patch for expanding from the current seed set toward 100 tools, with no placeholder descriptions and no explicit media.
validation:
  - Run relevant data validation tests if files are changed.
  - Keep official and affiliate URLs separate.
  - Verify no explicit media, deepfake, celebrity, leaked, minor/teen, coercive, or non-consensual framing is introduced.
handoff_to: none
human_confirmation: not_required
last_update: 2026-07-08T00:00:00+08:00
notes: Created docs/superpowers/plans/2026-07-08-task24-100-tool-dataset.md. No seed data was modified. Actual tool count is 35 records in rawDirectoryTools; data/seed/categories.ts does not exist because categories are embedded in data/seed/tools.ts.
```

## Handoff Entry Template

```yaml
id: ADULTAIHUB-YYYYMMDD-NN
status: ready_data_seo
source_conversation: Adult AI Hub：今日任务和路线
target_conversation: Adult AI Hub：数据和SEO
target_host_id: local
target_thread_id: 019f3751-6408-74f1-a421-803626990811
agent: Data SEO
owner: unassigned
task: one clear task
input:
  - local file, URL, pasted source, dataset, or metric source
output_requirement: expected artifact
validation:
  - command, Playwright check, report path, or human check
handoff_to: Release Gate
human_confirmation: not_required
last_update: YYYY-MM-DDTHH:mm:ss+08:00
notes: concise context only
```
