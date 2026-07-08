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
id: ADULTAIHUB-20260708-03
status: blocked
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
last_update: 2026-07-09T02:05:00+08:00
notes: Coordinator redeployed production under `985064198-2862s-projects/nsfw-ai-hunt` on 2026-07-09. Deployment `dpl_HELeQVUTZsQDtHQsmicB6BgsueP9` is Ready; SSO deployment protection was disabled after it caused 302 redirects to `vercel.com/sso-api`. Verified the 985 Vercel alias returns 200 for `/`, `/sitemap.xml`, `/robots.txt`, and `/tools/candy-ai`, and `/go/muah-ai` returns 307 to the approved Muah AI affiliate URL. Remaining blocker: `nsfwaihunt.com` and `www.nsfwaihunt.com` cannot be added from the 985 Vercel scope because Vercel returns `domain_not_owned` / 403, and the current CLI login cannot access or delete `wosenkeji-creators-projects/nsfw-ai-hunt`. User must authorize/login to the old Vercel account/team or remove the old project/domain binding from the old dashboard before final domain migration and deletion can complete.
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
