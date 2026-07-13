# NSFW AI Hunt completion audit — 2026-07-13

This report supersedes the production-state assumptions in the 2026-07-12 audit.

| Dimension              | Verified current evidence                                                                                                                                                                                                                                                                                                        | Status / estimate                                                                                          |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| P0 release/code        | GitHub `main` and local `main` are `5e0a4ab`; Vercel production `dpl_9te9BhrWrbrc7iPzWoaDDidFqKnb` is READY; typecheck, lint, 29 test files/90 tests (one file/test intentionally skipped), build with 2,788 pages, diff check, and official-registry audit pass; a release-gates workflow is prepared in the current ops change | 90–95%; dirty documentation tree, CI not active until merged, no branch protection                         |
| P1 data quality        | Production sitemap exposes 100 tool pages; local 100-tool quality gate and stale-review queue pass                                                                                                                                                                                                                               | 85–90%; continuous source review remains, Supabase `tools` table is empty while public pages use seed data |
| P2 SEO/indexing        | Production sitemap has 1,155 URLs; metadata/canonical/JSON-LD/noindex helpers are deployed                                                                                                                                                                                                                                       | 80–85%; current GSC/Bing query, indexing, CTR, and canonical evidence is missing                           |
| P3 attribution         | Production has 204 outbound clicks, with 95 attributed rows at the latest attributed-row snapshot; field/index exist; owner report route is deployed and anonymously protected                                                                                                                                                   | 75–85%; live authenticated UI smoke and search-query-to-conversion chain are unproven                      |
| P4 commercial          | Eight approved affiliate routes remain separated from official URLs and `/go` tracking is live                                                                                                                                                                                                                                   | 30–40%; no attributable settleable commission and several program/payout items remain external             |
| P5 compliance/trust    | Current production follows the software-directory boundary; disclosure, coupon, privacy, and URL-separation rules are deployed                                                                                                                                                                                                   | 90–95%; periodic policy/content review evidence remains operational                                        |
| P6 security/operations | All public tables have RLS; source-path index exists; Supabase advisors return no warnings/errors; dependency audit is clean; security headers and runbooks exist                                                                                                                                                                | 75–80%; migration history drift, no restore rehearsal/2FA evidence, no CI/branch policy, no production CSP |
| P7 growth              | 7/28-day experiment plan exists and production attribution can support it                                                                                                                                                                                                                                                        | 25–35%; no current query export, settled revenue, or two consecutive 28-day cycles                         |

## Remaining work

### Engineering and operations

1. Reconcile Supabase migration history: four timestamped remote migrations are recorded, while the applied `source_path` change has no matching history entry.
2. Decide and implement the data source of truth: public pages use the 100-record seed, while production `public.tools` has zero rows.
3. Merge and verify the prepared GitHub Actions release workflow. Branch protection cannot be enabled on the current private-repository plan unless the plan or visibility changes.
4. Add and verify an appropriate production Content-Security-Policy.
5. Complete an authenticated production `/admin/analytics` smoke test without exposing visitor or payment data.
6. Run and record a provider-managed backup/restore rehearsal and 2FA verification.
7. Review and commit the remaining coordination, account, affiliate, audit, growth, and runbook documents in an isolated PR.

### Data, traffic, and revenue evidence

1. Export current GSC and Bing query/page metrics and establish the first 7-day baseline.
2. Complete the first 28-day experiment cycle, then a second consecutive cycle before scaling.
3. Match query → landing page → CTA → outbound click → affiliate conversion → settlement.
4. Verify at least one attributable, settleable affiliate commission.
5. Continue periodic source, pricing, policy, affiliate-link, and content-boundary review for all published records.

## MCP readiness

- `github-local`: GitHub official MCP Server v1.5.0, checksum verified, authenticated through the existing `gh` account with a DPAPI CurrentUser-encrypted restricted-runtime fallback; Release Gate verified private-repository search and `README.md` reads without exposing a token.
- `supabase-local`: PowerShell credential wrapper plus a local TypeScript stdio MCP locked to `kkfiefqwzlgwlrcjeixi`. The wrapper uses a DPAPI CurrentUser-encrypted credential fallback; CLI calls are serialized and each uses/deletes an isolated temporary `SUPABASE_HOME`. Production count/advisor checks pass without changing the global telemetry file.
- Broken unauthenticated Supabase remote registrations and the legacy-project registration were removed. Duplicate unauthenticated GitHub plugin MCP registrations were disabled; no token is stored in Codex configuration.
