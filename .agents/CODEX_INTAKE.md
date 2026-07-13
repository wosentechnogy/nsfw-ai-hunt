# Adult AI Hub Codex Intake

Purpose: capture raw natural-language requests before they are routed to a fixed conversation.

## Rules

- Coordinator writes raw or split requests here before routing.
- Do not execute mixed-domain requests directly.
- Keep each item short enough to move into `CODEX_HANDOFF.md`.

## Historical Intake (already split; do not re-route)

```yaml
id: ADULTAIHUB-20260710-02
received_at: 2026-07-10T00:00:00+08:00
source_conversation: Adult AI Hub：今日任务和路线
raw_request: 用户提供 CrushOn AI approved affiliate/referral link，要求添加进项目。
route_guess: Compliance Monetization
status: split
notes: Public approved referral URL is `https://crushon.ai/?ref=zdbjmta&mist=1`; Tapfiliate login URL is `https://crushonai.tapfiliate.com/login`; public commission note is 30% recurring commission from the first 90 days after the first conversion. Do not store login secrets, payout, tax, or private dashboard data.
```

```yaml
id: ADULTAIHUB-20260710-01
received_at: 2026-07-10T00:00:00+08:00
source_conversation: Adult AI Hub：今日任务和路线
raw_request: 用户确认前两项人工事项已完成，要求先下载所需 skills，然后从第 3 项开始分配给对应 agent 完成。
route_guess: mixed
status: split
notes: Relevant project skills are already present locally; official skill-installer list script is blocked by a local Python launcher/path error, but this does not block routing. Split into Compliance Monetization, Data SEO, Product Engineering, and Release Gate handoffs.
```

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
