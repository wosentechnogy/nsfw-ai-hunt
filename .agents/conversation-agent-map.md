# Adult AI Tools Intelligence Hub Conversation Agent Map

## Fixed Conversations

Only use these 5 operating conversations for cross-dialog work in this project.

| Conversation                 | Role                          | When To Use                                                                                                   | Reads                                                                                                                                                             | Writes                                                                                                                           |
| ---------------------------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Adult AI Hub：今日任务和路线 | Coordinator                   | Prioritize, split mixed requests, route work, maintain the board, confirm receipt, and follow up until closed | `WORKFLOW.md`, `PROJECT_MEMORY.md`, `PROJECT_ACCOUNTS.md`, `PRD.md`, `ARCHITECTURE.md`, `TASKS.md`, `AGENTS.md`, `.agents/AGENT_OPERATING_STANDARD.md`, this file | `.agents/CODEX_INTAKE.md`, `.agents/CODEX_HANDOFF.md`, `PROJECT_MEMORY.md` when durable context changes                          |
| Adult AI Hub：数据和SEO      | Data SEO Agent                | Tool dataset, categories, programmatic SEO pages, metadata, sitemap, robots, schema, internal links           | Required reading order plus `.agents/AGENT_OPERATING_STANDARD.md` and relevant data files                                                                         | `data/**`, SEO helpers, page templates, `.agents/CODEX_FEEDBACK.md`, `.agents/CODEX_HANDOFF.md` status updates                   |
| Adult AI Hub：产品工程       | Product Engineering Agent     | Next.js implementation, admin, Supabase, redirects, forms, tests, migrations                                  | Required reading order plus `.agents/AGENT_OPERATING_STANDARD.md` and task files                                                                                  | `app/**`, `components/**`, `lib/**`, `db/**`, `tests/**`, `.agents/CODEX_FEEDBACK.md`, `.agents/CODEX_HANDOFF.md` status updates |
| Adult AI Hub：合规和变现     | Compliance Monetization Agent | Adult-content boundary, affiliate URLs, disclosures, outbound tracking, commercial launch blockers            | Required reading order plus `.agents/AGENT_OPERATING_STANDARD.md`, `COMMERCIAL_LAUNCH_STATUS.md`, relevant code/data                                              | Compliance notes, affiliate docs/data, `.agents/CODEX_FEEDBACK.md`, `.agents/CODEX_HANDOFF.md` status updates                    |
| Adult AI Hub：验收和发布检查 | Release Gate                  | Verify only: typecheck, lint, build, Playwright, mobile layout, no explicit media, production readiness       | Required reading order plus `.agents/AGENT_OPERATING_STANDARD.md` and target artifacts                                                                            | Verification reports, `.agents/CODEX_FEEDBACK.md`, `.agents/CODEX_HANDOFF.md`                                                    |

Coordinator and Release Gate are process roles. Data SEO, Product Engineering, and Compliance Monetization are execution agents.

## Fixed Conversation Runtime IDs

Coordinator must use these runtime IDs with the Codex app `send_message_to_thread` tool when routing work to another fixed conversation. If a fixed conversation is recreated, update this table before routing.

| Conversation                 | Host ID | Thread ID                              |
| ---------------------------- | ------- | -------------------------------------- |
| Adult AI Hub：今日任务和路线 | `local` | `019f512d-6b19-79b2-801b-ae33d4890338` |
| Adult AI Hub：数据和SEO      | `local` | `019f3751-6408-74f1-a421-803626990811` |
| Adult AI Hub：产品工程       | `local` | `019f5101-837a-7ca2-a70f-54d354181717` |
| Adult AI Hub：合规和变现     | `local` | `019f3751-ebae-7980-9555-a1555fd6f182` |
| Adult AI Hub：验收和发布检查 | `local` | `019f3752-30f1-7620-b132-31dbac7f1223` |

## Startup Protocol

Every fixed conversation starts by reading:

1. `WORKFLOW.md`
2. `PROJECT_MEMORY.md`
3. `PROJECT_ACCOUNTS.md`
4. `PRD.md`
5. `ARCHITECTURE.md`
6. `TASKS.md`
7. `AGENTS.md`
8. `.agents/conversation-agent-map.md`
9. `.agents/CODEX_INTAKE.md`
10. `.agents/CODEX_HANDOFF.md`
11. `.agents/AGENT_OPERATING_STANDARD.md`

Then read the smallest additional files required for its role and current task.

## Required Operating Priorities

Every fixed conversation must apply these priorities before task execution:

1. Account identity gate first: verify the active account, team/scope, project, repository, API/MCP target, and local Git identity before touching third-party services or deployment state. For `nsfw-ai-hunt` / `nsfwaihunt.com`, the intended account context is `985064198@qq.com` unless explicitly overridden by the user.
2. Mature solution search first: check official docs, platform features, mature open-source packages, and existing repository patterns before building a custom solution.
3. Cross-conversation routing first: mixed or multi-domain work must be split by Coordinator and routed to the fixed specialist conversation via `.agents/CODEX_HANDOFF.md` and Codex cross-thread tools.
4. Preflight first: executing agents must write the mandatory preflight from `.agents/AGENT_OPERATING_STANDARD.md` before implementation or remote actions.
5. No blind loops: after two failed attempts or any account/project uncertainty, agents must stop, write feedback, and ask Coordinator/user for the missing decision or credential.
6. Completion feedback first: no specialist task is complete until `.agents/CODEX_FEEDBACK.md` and `.agents/CODEX_HANDOFF.md` are updated and Coordinator is notified.
7. Release Gate first after implementation: any `release_ready` implementation must be sent to Release Gate automatically by the executing specialist, or the specialist must record why Release Gate is not applicable.

## Handoff Status Values

- `intake`: raw request captured; not routed yet.
- `split`: Coordinator split a mixed request into single-domain tasks.
- `ready_data_seo`: Data SEO Agent may execute.
- `ready_engineering`: Product Engineering Agent may execute.
- `ready_compliance_monetization`: Compliance Monetization Agent may execute.
- `in_progress`: a conversation owns execution.
- `blocked`: missing input, data, credential, approval, or validation path.
- `needs_human`: user action required, usually login, OAuth, Supabase keys, affiliate approval, Cloudflare verification, or paid account action.
- `release_ready`: implementation complete; Release Gate should verify.
- `verified`: Release Gate completed verification.
- `done`: task finished and feedback written.

## Cross-Conversation Rule

No conversation depends on hidden chat memory.

All cross-dialog state must be written to:

- `.agents/CODEX_INTAKE.md`
- `.agents/CODEX_HANDOFF.md`
- `.agents/CODEX_FEEDBACK.md`
- task output files
- `PROJECT_MEMORY.md` when durable project context changes
- `COMMERCIAL_LAUNCH_STATUS.md` when launch status changes

Coordinator routing procedure:

1. Create or update the task card in `.agents/CODEX_HANDOFF.md`.
2. Look up `target_thread_id` and `target_host_id` in the Fixed Conversation Runtime IDs table.
3. Send the task card to the target conversation with `send_message_to_thread`.
4. Include the handoff ID, status, target role, required reading order, `.agents/AGENT_OPERATING_STANDARD.md`, preflight requirement, escalation rule, validation requirement, feedback requirement, Coordinator report requirement, and Release Gate requirement in the prompt.
5. Confirm the target thread received the task with `read_thread`.
6. If `send_message_to_thread` fails, leave the task card in `blocked` with the failure reason and do not assume the target conversation saw the work.
7. If the target conversation does not write feedback after meaningful work, send one follow-up requiring it to close, block, or request human input.

## Task Card Format

```yaml
id: ADULTAIHUB-YYYYMMDD-NN
source_conversation: Adult AI Hub：今日任务和路线
target_conversation: Adult AI Hub：数据和SEO
target_host_id: local
target_thread_id: 019f3751-6408-74f1-a421-803626990811
agent: Data SEO
status: ready_data_seo
task: one clear task
input:
  - local file, URL, pasted source, dataset, or metric source
output_requirement: expected file, patch, report, draft, test, or deployment note
validation:
  - command, Playwright check, report path, or human review path
handoff_to: Product Engineering | Compliance Monetization | Release Gate | none
human_confirmation: required | not_required
preflight_required: true
mature_solution_required: true
escalation_rule: stop_after_two_failed_attempts_or_account_uncertainty
feedback_required: true
release_gate_required: true | false
coordinator_report_required: true
notes: concise context only
```

## Execution Constraints

- One task, one domain, one executing conversation.
- Mixed requests must be split before execution.
- No explicit images, videos, adult media hosting, user uploads, comments, deepfake instructions, celebrity sexual content, leaked content, or minor/teen/coercive/non-consensual framing.
- Secrets must never be printed or committed.
- Supabase keys, affiliate approvals, Cloudflare email verification, GSC/Bing login, and paid/provider account actions require human confirmation.
- Release Gate verifies and reports; it does not develop.
- Executing specialists must not silently finish; they must report Coordinator and, when appropriate, send the task to Release Gate.
- Coordinator must not assume completion from activity alone; only feedback and handoff status close the loop.
