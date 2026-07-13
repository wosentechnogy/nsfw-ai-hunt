# NSFW AI Hunt completion audit — 2026-07-13

This report supersedes the production-state assumptions in the 2026-07-12 audit.

| Dimension              | Verified current evidence                                                                                                                                                                                                                                                                                                        | Status / estimate                                                                                          |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| P0 release/code        | GitHub `main` and local `main` are `3d59daf`; PR #3 was merged, GitHub Actions release gates are active, and `main` now requires the `verify` check | 90–95%; production redeploy after the current CSP change still needs a live recheck |
| P1 data quality        | Production sitemap exposes 100 tool pages; local 100-tool quality gate and stale-review queue pass; seed data is explicitly retained as the current public source of truth while `public.tools` remains an empty future admin/persistence target | 85–90%; continuous source review remains |
| P2 SEO/indexing        | Production sitemap has 1,155 URLs; metadata/canonical/JSON-LD/noindex helpers are deployed                                                                                                                                                                                                                                       | 80–85%; current GSC/Bing query, indexing, CTR, and canonical evidence is missing                           |
| P3 attribution         | Production has 204 outbound clicks, with 95 attributed rows at the latest attributed-row snapshot; field/index exist; owner report route is deployed and anonymously protected                                                                                                                                                   | 75–85%; live authenticated UI smoke and search-query-to-conversion chain are unproven                      |
| P4 commercial          | Eight approved affiliate routes remain separated from official URLs and `/go` tracking is live                                                                                                                                                                                                                                   | 30–40%; no attributable settleable commission and several program/payout items remain external             |
| P5 compliance/trust    | Current production follows the software-directory boundary; disclosure, coupon, privacy, and URL-separation rules are deployed                                                                                                                                                                                                   | 90–95%; periodic policy/content review evidence remains operational                                        |
| P6 security/operations | All public tables have RLS; source-path column/index exist; Supabase migration history now records `202607120001` as applied; advisors return no warnings/errors; dependency audit is clean; branch protection is active; the current bundle includes CSP | 85–90%; no restore rehearsal/2FA evidence, live CSP confirmation, or authenticated admin smoke |
| P7 growth              | 7/28-day experiment plan exists and production attribution can support it                                                                                                                                                                                                                                                        | 25–35%; no current query export, settled revenue, or two consecutive 28-day cycles                         |

## Remaining work

### Engineering and operations

1. Recheck the latest Vercel production deployment after merged commit `3d59daf`.
2. Keep `data/seed/tools.ts` as the current public source of truth; design a separate reviewed import/admin publication workflow before populating `public.tools`.
3. Verify the new branch protection rule and required status check on the next pull request.
4. Confirm the current production deployment includes the new Content-Security-Policy.
5. Complete an authenticated production `/admin/analytics` smoke test without exposing visitor or payment data.
6. Run and record a provider-managed backup/restore rehearsal and 2FA verification.

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
