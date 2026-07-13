# NSFW AI Hunt historical predeployment audit — 2026-07-12

> Superseded by [2026-07-13-completion-audit.md](./2026-07-13-completion-audit.md). The deployment and 35-tool statements below are retained only as a historical snapshot and must not be used as current project status.

This report distinguishes local evidence from production evidence. A local pass
does not satisfy a production gate until the deployed domain is checked.

| Dimension           | Local evidence                                                                                                               | Production evidence                                                               | Status                                               |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- | ---------------------------------------------------- |
| P0 release/code     | Next 15.5.20; pnpm audit 0; typecheck, lint, 26 test files/86 tests, build, Playwright smoke pass                            | Current production is an older deployment                                         | Local verified; deploy pending                       |
| P1 data             | 100 published records, schema/data-quality tests, stale review helper and protected admin queue                              | Sitemap exposes 35 tools                                                          | Local verified; human deploy required                |
| P2 SEO/indexing     | Metadata/canonical/JSON-LD helpers; low-differentiation comparisons noindex; sitemap uses indexable helpers                  | Production sitemap still 266 URLs / 35 tools; GSC/Bing query health not inspected | Local verified; production metrics missing           |
| P3 attribution      | `/go` stores tool, destination, referrer, normalized same-origin `source_path`; pure helper has boundary tests               | New migration/source persistence not verified                                     | Local verified; migration/deploy required            |
| P4 commercial       | Approved URLs separated from official URLs; disclosure and readiness dashboard; experiment plan                              | No verified attributable settleable commission                                    | Incomplete; human affiliate evidence required        |
| P5 trust/compliance | No explicit media/uploads/comments; conservative policy/privacy/coupon copy; JSON-LD escaping                                | Production content remains old release                                            | Local verified; deploy pending                       |
| P6 security/ops     | RLS/function hardening migrations, Zod admin validation, security headers, dependency audit, release/backup/restore runbooks | New headers and source migration not live                                         | Local verified; production migration/deploy required |
| P7 growth           | 7/28-day experiment plan with kill criteria and measurement fields                                                           | No GSC/Bing exports or 28-day trend yet                                           | Plan ready; evidence pending                         |

## Current blockers

1. Human operator must apply `db/migrations/202607120001_add_outbound_click_source_path.sql` to Supabase project `kkfiefqwzlgwlrcjeixi` under the 985 account context.
2. Human operator must deploy the verified bundle through Vercel project `985064198-2862s-projects/nsfw-ai-hunt`.
3. Release Gate must recheck 100-tool sitemap, security headers, redirects, mobile pages, and `outbound_clicks.source_path` persistence.
4. Authorized operators must provide GSC/Bing query exports, affiliate conversion/settlement evidence, backup/restore rehearsal evidence, and 2FA confirmations.

## Completion rule

Do not declare 100% current operational completion until every status above is
production verified, at least one affiliate commission is attributable and
settleable, and two consecutive 28-day measurement cycles exist.
