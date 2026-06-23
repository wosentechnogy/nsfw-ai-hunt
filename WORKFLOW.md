# WORKFLOW

This project uses an agent handoff workflow. Do not skip phases unless the user explicitly asks.

## 1. Workflow Overview

```text
GPT-5.5
  -> Generate or update PRD.md

Architect Agent
  -> Generate or update ARCHITECTURE.md

Architect Agent
  -> Generate or update TASKS.md

Codex++
  -> Execute tasks one by one

Playwright MCP
  -> Run automated browser tests and screenshots

Reviewer Agent
  -> Review for bugs, regressions, SEO gaps, and missing tests

GitHub MCP
  -> Commit, push, open PR, manage issues
```

## 2. Phase Responsibilities

### Phase 1: GPT-5.5 PRD

Owner: GPT-5.5

Output:

- `PRD.md`

Responsibilities:

- Define user personas.
- Define product scope.
- Define monetization.
- Define route map.
- Define SEO strategy.
- Define data requirements.
- Define safety and compliance boundaries.

Completion gate:

- PRD contains enough detail for architecture and tasks.
- Product boundary is explicit.
- Route map and monetization model are clear.

### Phase 2: Architect Agent Architecture

Owner: Architect Agent

Output:

- `ARCHITECTURE.md`

Responsibilities:

- Select stack.
- Define repository structure.
- Define database approach.
- Define rendering strategy.
- Define SEO architecture.
- Define admin/auth architecture.
- Define deployment path.
- Define testing strategy.

Completion gate:

- Architecture is specific enough to prevent later rewrites.
- Stack choices are explicit.
- Data flow is clear.
- Security and content boundaries are encoded.

### Phase 3: Architect Agent Task Plan

Owner: Architect Agent

Output:

- `TASKS.md`

Responsibilities:

- Break work into sequential tasks.
- Add acceptance criteria for each task.
- Put risky shared systems early.
- Put visual and SEO verification near launch.

Completion gate:

- Tasks are executable one by one.
- Each task has a clear acceptance condition.
- Task order avoids major rewrites.

### Phase 4: Codex++ Execution

Owner: Codex++

Output:

- Code changes.
- Updated docs when needed.
- Tests.
- Implementation summaries.

Rules:

- Read `WORKFLOW.md`, `PRD.md`, `ARCHITECTURE.md`, `TASKS.md`, and `AGENTS.md` before implementation.
- Execute tasks in order.
- Keep edits scoped.
- Prefer existing project conventions.
- Use TypeScript.
- Use shadcn/ui.
- Use Zod for validation.
- Run verification before marking a task complete.

Completion gate:

- Task acceptance criteria are met.
- Lint/typecheck pass when available.
- Relevant tests pass.
- No explicit media or prohibited adult content was introduced.

### Phase 5: Playwright MCP Testing

Owner: Playwright MCP

Output:

- Test results.
- Screenshots where relevant.
- Bug notes.

Required tests:

- Homepage loads.
- Tool directory loads.
- Tool detail page loads.
- Category page loads.
- Comparison page loads.
- Affiliate redirect works.
- Admin route protects anonymous access.
- Mobile layout does not break.

Completion gate:

- Core flows pass.
- Screenshots show nonblank pages.
- No visible layout overlap.

### Phase 6: Reviewer Agent Review

Owner: Reviewer Agent

Output:

- Bug findings.
- Risk findings.
- Missing tests.
- SEO gaps.
- Security concerns.

Review priority:

1. Bugs and broken user flows.
2. Security and secret exposure.
3. Adult content boundary violations.
4. SEO/indexing regressions.
5. Missing tests.
6. Maintainability issues.

Completion gate:

- No unresolved high-severity findings.
- Any residual risks are documented.

### Phase 7: GitHub MCP Submission

Owner: GitHub MCP

Output:

- Commit.
- Branch.
- Pull request.
- Linked issues where useful.

Rules:

- Commit after verified units of work.
- Use clear commit messages.
- Do not include secrets.
- Do not commit generated junk.
- PR description must include scope, tests, and risk notes.

Completion gate:

- PR exists or commit is made as requested.
- CI status is checked when available.

## 3. Task Execution Loop

For every task:

```text
Read docs
  -> inspect existing files
  -> implement smallest coherent change
  -> run local verification
  -> run Playwright when UI changed
  -> review changes
  -> update TASKS.md status if tracking inline
  -> summarize
```

## 4. Stop Conditions

Stop and ask the user only when:

- A required secret is missing.
- A paid API key is required.
- Product scope conflicts with the hard content boundaries.
- A destructive migration or data deletion is required.
- A third-party account login/OAuth is required.

Do not stop just because a task is large. Break it down and proceed.

## 5. Required Reading for Every Agent

All agents must read:

- `WORKFLOW.md`
- `PRD.md`
- `ARCHITECTURE.md`
- `TASKS.md`
- `AGENTS.md` or `CLAUDE.md`, depending on host

## 6. Launch Readiness Checklist

Before launch:

- Public pages render.
- Sitemap works.
- Robots works.
- Metadata exists.
- Affiliate disclosure exists.
- 18+ disclaimer exists.
- No explicit media is hosted.
- Admin is protected.
- Outbound clicks are tracked.
- Playwright smoke tests pass.
- Reviewer Agent has no blocking findings.
- GitHub PR or commit exists.
