# Adult AI Hub Agent Operating Standard

Last updated: 2026-07-11

Purpose: prevent fixed conversations from working in isolated trial-and-error loops, losing status, or finishing without verification and cross-conversation feedback.

This standard applies to every fixed conversation:

- Adult AI Hub：今日任务和路线
- Adult AI Hub：数据和SEO
- Adult AI Hub：产品工程
- Adult AI Hub：合规和变现
- Adult AI Hub：验收和发布检查

## Research Basis

This project follows these lessons from current agent orchestration practice:

- Codex and the broader AGENTS.md ecosystem use repo-level `AGENTS.md` as the predictable shared instruction surface for coding agents.
- Multi-agent orchestrators such as Agent Orchestrator and ORCH emphasize narrow task scope, isolated execution, visible task state, branch/workspace separation, and explicit feedback loops.
- GitHub Agent HQ-style workflows route different agents to different stages, then rely on review/PR/CI feedback rather than silent handoff.
- Recent AGENTS.md research and probe-and-refine work indicates repository guidance helps agents reach the correct files and use step budgets more productively when the guidance records known failure modes.

## Mandatory Preflight

Before any implementation, deployment, remote write, account action, MCP/API action, database operation, browser automation, data import, or affiliate update, every executing agent must produce a short preflight note in its own conversation and use it to guide the work.

The preflight must include:

1. Handoff ID and one-sentence task restatement.
2. Account identity gate result.
3. Skills and mature-solution check:
   - Local/project skills checked.
   - Existing repo pattern checked.
   - Official docs or mature open-source route checked when building or debugging integrations.
4. Owner and file scope.
5. Verification plan.
6. Escalation trigger.

An agent must not start trial-and-error implementation without this preflight.

## Mature Solution First

Agents must use this order:

1. Existing project implementation or tests.
2. Installed project/global skills.
3. Official platform docs, SDKs, CLIs, dashboard flows, or MCP tools.
4. Mature open-source reference or package.
5. Custom implementation only after documenting why the above do not solve it.

For redirects, affiliate links, Supabase, Vercel, Cloudflare, GitHub, GSC/Bing, Firecrawl, Perplexity, and browser automation, the agent must name the official or mature route it chose.

## Trial-And-Error Limit

An agent may not keep trying opaque commands or ad hoc fixes indefinitely.

Escalate to the Coordinator or user when any of these occur:

- The same command or path fails twice.
- Two different attempted approaches fail without changing the diagnosis.
- A remote provider returns auth, permission, captcha, organization, team, billing, or account-scope errors.
- The needed secret/API key/OAuth/session is missing.
- The agent cannot verify which account/project is active.
- The fix requires private finance, tax, billing, payout, or password details.
- The task requires cross-domain work outside the agent role.

Escalation means:

1. Stop changing business code.
2. Update `.agents/CODEX_HANDOFF.md` to `blocked` or `needs_human`.
3. Write `.agents/CODEX_FEEDBACK.md` with exact failed attempts and required input.
4. Notify the Coordinator thread.

## Completion Handoff Is Mandatory

No executing specialist may finish silently.

When Data SEO, Product Engineering, or Compliance Monetization completes an implementation or status update, it must:

1. Write `.agents/CODEX_FEEDBACK.md`.
2. Update the relevant `.agents/CODEX_HANDOFF.md` card.
3. Set status to one of:
   - `release_ready`
   - `blocked`
   - `needs_human`
   - `done`
4. Send a message to Coordinator with the handoff ID, status, changed files, verification run, and residual risks.
5. If status is `release_ready`, send a message to Release Gate with the verification request and exact scope.

If a specialist cannot use cross-thread tools from its current environment, it must record that inability in `.agents/CODEX_FEEDBACK.md` and leave the handoff card explicit enough for Coordinator to route.

## Release Gate Rule

Release Gate is the only role that marks a specialist implementation as `verified`.

Release Gate must verify:

- Account/project scope where relevant.
- Tests/typecheck/lint/build as appropriate.
- Production routes when deployment or remote state is involved.
- No secret exposure.
- No adult-content boundary regression.
- No official/affiliate URL separation regression.

Release Gate does not develop or patch business code. If verification fails, it writes a blocker and routes back to the owning specialist.

## Coordinator Follow-Up Rule

Coordinator must not assume a task is complete because it was sent.

After sending a handoff, Coordinator must:

1. Confirm the target thread received the task.
2. Track handoff status until it becomes `release_ready`, `verified`, `done`, `blocked`, or `needs_human`.
3. If no feedback appears after meaningful work, send one follow-up asking the specialist to close or block the task.
4. Do not dispatch Release Gate until the owner has written feedback or the Coordinator has enough direct verification to create a verification-only task.

## Required Feedback Format

Every `.agents/CODEX_FEEDBACK.md` entry must include:

```yaml
id: ADULTAIHUB-YYYYMMDD-NN
agent: Data SEO | Product Engineering | Compliance Monetization | Release Gate
status: release_ready | verified | blocked | needs_human | done
summary:
  - concise result
changed_files:
  - path or none
verification:
  - command/result or not_run with reason
account_gate:
  - account/project/scope checked or not_applicable
mature_solution_gate:
  - existing pattern/docs/skill/source checked
release_gate:
  - sent | not_applicable | blocked_with_reason
coordinator_report:
  - sent | unable_with_reason
residual_risks:
  - concise risk or none
```

## Handoff Card Requirements

Every new or updated handoff card must include:

- `preflight_required: true`
- `mature_solution_required: true`
- `escalation_rule: stop_after_two_failed_attempts_or_account_uncertainty`
- `feedback_required: true`
- `release_gate_required: true | false`
- `coordinator_report_required: true`

Older handoff cards without these fields still inherit this standard.
