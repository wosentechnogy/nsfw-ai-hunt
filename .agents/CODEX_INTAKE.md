# Adult AI Hub Codex Intake

Purpose: capture raw natural-language requests before they are routed to a fixed conversation.

## Rules

- Coordinator writes raw or split requests here before routing.
- Do not execute mixed-domain requests directly.
- Keep each item short enough to move into `CODEX_HANDOFF.md`.

## Active Intake

```yaml
id: ADULTAIHUB-20260708-00
received_at: 2026-07-08T00:00:00+08:00
source_conversation: Adult AI Hub：今日任务和路线
raw_request: 用户询问商业化落地能否直接完成，以及还剩哪些阻塞点。
route_guess: mixed
status: split
notes: Split into release verification, compliance/monetization blockers, and Data SEO dataset expansion tasks.
```

## Intake Template

```yaml
id: ADULTAIHUB-YYYYMMDD-NN
received_at: YYYY-MM-DDTHH:mm:ss+08:00
source_conversation: Adult AI Hub：今日任务和路线
raw_request: pasted user request
route_guess: Data SEO | Product Engineering | Compliance Monetization | Release Gate | mixed | unclear
status: intake
notes: concise context only
```
