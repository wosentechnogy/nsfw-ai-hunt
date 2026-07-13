# NSFW AI Hunt production release runbook

This runbook is for the `985064198@qq.com` account context and the
`wosentechnogy/nsfw-ai-hunt` repository. It deliberately contains no credentials.

## Preflight

1. Confirm the working directory is the official project root and run `git status --short`.
2. Confirm the Git remote is `wosentechnogy/nsfw-ai-hunt` and the local Git email is `985064198@qq.com`.
3. Do not deploy a dirty tree. Select the intended release files into an isolated commit/PR without staging unrelated user changes.
4. Run `pnpm install --frozen-lockfile` followed by the single release gate command `pnpm release:preflight` (typecheck, lint, test, and build).
5. Confirm the Vercel target is the `985064198-2862s-projects/nsfw-ai-hunt` project and production environment variables are present without printing values.
6. Confirm the Supabase target is project `kkfiefqwzlgwlrcjeixi`; apply migrations through the official dashboard, MCP, or CLI only after reviewing the SQL.

## Deployment

1. Apply the reviewed database migration before deploying code that writes a new column.
2. Deploy the verified commit through the 985 Vercel project.
3. Record the deployment ID and commit SHA, never secret values.
4. Smoke-test `/`, `/sitemap.xml`, `/robots.txt`, one tool page, one comparison page, `/admin` redirect, and one `/go/[toolSlug]` redirect.
5. Confirm the new sitemap tool count and response security headers.
6. Trigger a tracked `/go` request with an internal source path and verify `outbound_clicks.source_path` through the authorized server-side dashboard; do not expose row data containing user-agent or referral details.

## Rollback

1. Stop the release and record the failing route, deployment ID, and timestamp.
2. Reassign the Vercel production alias to the last verified deployment, or use the platform rollback action.
3. Do not drop the new nullable column during an application rollback; it is backward-compatible and can remain until the next reviewed migration.
4. Re-run the production smoke tests and confirm the previous sitemap, redirects, and admin boundary.
5. Open a follow-up issue with evidence and a safe forward-fix plan.

## Human-required actions

Supabase migration execution, Vercel production deployment, 2FA/OAuth, affiliate approval, payout setup, and Search Console/Bing account actions require the account holder. If any of these are unavailable, mark the item `human_required` and continue non-dependent local verification.
