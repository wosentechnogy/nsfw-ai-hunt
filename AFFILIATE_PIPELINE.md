# Affiliate Pipeline

Last updated: 2026-07-09

This file tracks public, non-secret affiliate or referral opportunities for the current launch dataset. It is an operating checklist, not a source of truth for private approval emails, dashboard logins, finance details, or affiliate IDs.

All new NSFW AI Hunt affiliate account actions must use the `985064198@qq.com` account context unless the user explicitly overrides it.

## Verified Program Signals

| Tool | Current site slug | Program type | Public application or program URL | Public payout signal | Current internal status | Next action |
| --- | --- | --- | --- | --- | --- | --- |
| Candy AI | `candy-ai` | Affiliate | `https://candy.ai/affiliate` and `https://candy.ai/affiliate-terms` | Public terms confirm lifetime revshare plus CPS or PPS offer types, but no public percentage | `applied` | Submit or confirm direct application, then replace official URL fallback with the approved affiliate URL |
| CrushOn AI | `crushon-ai` | Affiliate | `https://crushonai.tapfiliate.com/` | Dashboard shows `30%` Standard and `50%` THE END OF TIME commission structures, but the program card is still `Pending` | `applied` | Wait for Tapfiliate approval; when `View` is enabled and the Deeplink generator is populated, capture the final tracking link before replacing the official fallback URL |
| Nomi AI | `nomi-ai` | Affiliate | `https://nomi.ai/nomi-ai-girlfriend-affiliate-program/` | Public page advertises `30%` lifetime recurring commissions on monthly, quarterly, and yearly plans | `applied` | Reconfirm or resubmit through the official program flow under `985064198@qq.com`; after approval, store only the approved tracking URL and non-secret network metadata |
| Muah AI | `muah-ai` | Affiliate | `https://muah.ai/affiliate/` | Public page advertises `40%` commission on total paid amount | `approved` | Approved tracking URL captured: `https://muah.ai/affiliate/track.php?ref=GE9CZKD0WI`; confirm dashboard readiness under `985064198@qq.com` without storing private finance details |
| SoulGen | `soulgen` | Affiliate | `https://www.soulgen.net/` footer affiliate link | Official Google Form advertises `20%` of revenue from approved traffic | `applied` | Reconfirm or resubmit through the official program flow under `985064198@qq.com`; after approval, store only the approved tracking URL and non-secret network metadata |
| Kindroid | `kindroid` | Referral only | `https://docs.kindroid.ai/referrels/referrals` | Public docs describe referral credits, not cash commissions | `none` | Do not prioritize as an affiliate revenue source unless a separate cash program appears |

## Priority Order

1. Nomi AI
2. Muah AI
3. Candy AI
4. CrushOn AI
5. SoulGen
6. Kindroid referral only

## 2026-06-25 Application Notes

- Nomi AI: submitted the Google Form application using `wosenkeji@gmail.com`, `https://nsfwaihunt.com`, and the NSFW AI Hunt software-directory positioning. The Rewardful signup subdomain returned `403` from the current environment, so wait for approval instructions by email.
- SoulGen: submitted the Google Form application using `wosenkeji@gmail.com`, `https://nsfwaihunt.com/tools/soulgen`, and the image-generator category page as traffic resources.
- CrushOn AI: Tapfiliate dashboard screenshots show the Friends of CrushonAI program is still `Pending`; `View` is disabled, Sources only has the Default source, and the Deeplink generator/Postbacks do not expose a tracking URL yet.
- Muah AI: approved tracking URL captured as `https://muah.ai/affiliate/track.php?ref=GE9CZKD0WI`; commercial account readiness still needs official dashboard verification.
- Candy AI: `https://candy.ai/affiliate` returned `403` from the current environment. Retry from a normal browser/proxy profile or confirm existing application status by email/dashboard.

## 2026-07-09 Account Context Notes

- NSFW AI Hunt account actions now use `985064198@qq.com` across GitHub, Vercel, Supabase, Cloudflare, Google/Search Console, Bing, and affiliate dashboards where possible.
- Historical affiliate submissions that used another mailbox should be treated as stale operating context unless an official dashboard confirms they are transferable or still valid for the 985 account context.
- Muah AI remains the only approved tracking URL in the current seed data; `/go/muah-ai` has been verified to redirect to it and persist an outbound click.
- Candy AI, CrushOn AI, Nomi AI, and SoulGen should be checked through their official dashboards/forms; do not add new affiliate URLs until approval is confirmed.

## Minimum Data To Capture After Approval

- Tool name and slug
- Official URL
- Approved affiliate URL
- Network or platform name
- Commission type
- Commission rate
- Cookie duration
- Publicly visible account-readiness requirements, if any
- Approval date
- Notes about restrictions or promo rules

## Launch Rule

Do not overwrite official URLs with affiliate URLs. Store affiliate URLs separately and keep `/go/[toolSlug]` as the single redirect surface.
