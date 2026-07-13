# NSFW AI Hunt growth experiment plan

This is an execution plan, not a claim that traffic or revenue has already been
proven. The current product serves English-speaking adults researching AI
software, with the primary conversion being a tracked outbound affiliate click.
Production now has the 100-tool release and `source_path` attribution. These
experiments can start, but GSC/Bing query exports and affiliate conversion data
are still needed to connect search demand to settled revenue.

## Executive readout

- Best opportunity: high-intent comparison, pricing, and alternatives pages for
  approved or near-commercial tools.
- Biggest bottleneck: production now exposes 100 tool pages and has 204 outbound
  clicks, but current GSC/Bing query exports and affiliate conversion/settlement
  evidence are not available in the local evidence set.
- First channel: organic search demand capture; it compounds and matches the
  existing SSR page system.
- Do not start yet: paid ads, broad social posting, newsletters, community
  systems, or user accounts. They add cost or compliance surface before the
  production funnel is measurable.

## Channel evaluation

Scores use the repository's channel rubric (maximum 50).

| Channel                                    | Score | First test                                                                       | Conversion path                                               | Main risk                                             |
| ------------------------------------------ | ----: | -------------------------------------------------------------------------------- | ------------------------------------------------------------- | ----------------------------------------------------- |
| High-intent organic comparison/price pages |    43 | Release 3–10 approved-tool pages, then watch impressions, CTR, `/go` clicks      | Query → money page → `/go/[toolSlug]` → affiliate destination | Indexing delay and thin-page risk                     |
| Existing directory/category internal links |    37 | Add two contextual links from each tested money page and compare assisted clicks | Category/tool page → comparison/pricing page → `/go`          | Cannibalization if anchor intent is vague             |
| Search Console/Bing query-led refreshes    |    39 | Reorder titles and tables after a 28-day query sample                            | Query → refreshed page → `/go`                                | Requires human account access and enough impressions  |
| Paid search                                |    21 | No launch until organic funnel has baseline EPC and policy review                | Ad → dedicated money page → `/go`                             | Adult-policy restrictions, CAC, and no proven revenue |
| Broad social/community acquisition         |    18 | Monitor only for compliant software questions                                    | Post → public page → `/go`                                    | Moderation, platform policy, and weak attribution     |

## Funnel diagnosis

| Stage      | Current evidence                                                                                     | Required next action                                                                                 |
| ---------- | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| Discovery  | Production sitemap exposes 1,155 URLs including 100 tool pages                                       | Use current GSC/Bing queries to prioritize pages with impressions                                    |
| Intent     | Comparison, pricing, and alternatives templates expose structured rows and CTAs                      | Use GSC/Bing queries to select the first 3–10 pages                                                  |
| Trust      | Pages show policy, privacy, pricing, last-checked, and affiliate disclosure fields                   | Keep claims conservative and verify approved links monthly                                           |
| Conversion | Production contains 204 outbound clicks and 95 attributed rows at the latest attributed-row snapshot | Separate pre-attribution rows from post-release cohorts and improve same-origin attribution coverage |
| Revenue    | No local evidence of an attributed, settled commission                                               | Human operator must confirm affiliate dashboard status and settlement readiness                      |

## Recommended experiments

| Priority | Bet                                               | Why now                                  | First test                                                       | Success metric                                                              | Owner/input needed                      |
| -------: | ------------------------------------------------- | ---------------------------------------- | ---------------------------------------------------------------- | --------------------------------------------------------------------------- | --------------------------------------- |
|        1 | Publish/refresh 3–10 high-intent comparison pages | Strongest existing page and data fit     | Use approved tools only; verify visible tables and noindex rules | Indexed impressions, CTR, and source-attributed `/go` clicks within 28 days | Data SEO + Release Gate                 |
|        2 | Improve CTA source attribution                    | Needed to connect SEO to revenue         | Deploy `source_path`, then compare source pages by tool          | ≥95% of same-origin clicks have a normalized source path                    | Product Engineering + Supabase operator |
|        3 | Refresh pages using query evidence                | Prevents scaling pages blindly           | Export GSC/Bing queries after a full 28-day period               | CTR or qualified click rate improves versus prior period                    | Human Search Console operator           |
|        4 | Affiliate-link health review                      | Broken or unapproved links waste intent  | Check all approved redirects monthly through proxy               | 100% approved links return expected redirect status                         | Compliance Monetization                 |
|        5 | Revenue attribution review                        | Converts clicks into a business decision | Match dashboard conversions to source page/tool/date             | At least one attributable, settleable commission                            | Human affiliate operator                |

## Measurement plan

Required event fields:

- page path or normalized `source_path`
- tool slug
- destination type (official or affiliate)
- timestamp
- referrer when available
- affiliate network and conversion/settlement status when supplied by the network

Review cadence:

- 7 days: technical errors, redirect health, indexing anomalies, missing source paths.
- 28 days: queries, impressions, CTR, ranking, source-attributed clicks, EPC, and
  affiliate conversions.
- Two consecutive 28-day cycles: only then consider the current experiment
  proven enough to scale.

Kill criteria:

- no qualified impressions after the expected indexing window;
- comparison page has insufficient differentiated data;
- source attribution is missing for a material share of same-origin clicks;
- affiliate destination or policy status cannot be verified;
- no attributable revenue after a reasonable conversion lag.

## Do not do yet

- Do not buy traffic before organic EPC and affiliate settlement are known.
- Do not add broad social/community features or user uploads.
- Do not publish unverified coupons, premium offers, or new affiliate URLs.
- Do not scale all 2,350 generated comparison routes; keep low-differentiation
  pairs noindex and expand from observed demand.

## Missing evidence

- GSC/Bing query exports and 7/28-day trend data.
- Affiliate conversion and settlement evidence.
- Backup/restore rehearsal evidence and provider 2FA confirmations.
