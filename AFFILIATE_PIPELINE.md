# Affiliate Pipeline

Last updated: 2026-06-25

This file tracks public, non-secret affiliate or referral opportunities for the current launch dataset. It is an operating checklist, not a source of truth for private approval emails, dashboard logins, payout details, or affiliate IDs.

## Verified Program Signals

| Tool | Current site slug | Program type | Public application or program URL | Public payout signal | Current internal status | Next action |
| --- | --- | --- | --- | --- | --- | --- |
| Candy AI | `candy-ai` | Affiliate | `https://candy.ai/affiliate` and `https://candy.ai/affiliate-terms` | Public terms confirm lifetime revshare plus CPS or PPS offer types, but no public percentage | `applied` | Submit or confirm direct application, then replace official URL fallback with the approved affiliate URL |
| CrushOn AI | `crushon-ai` | Affiliate | `https://crushonai.tapfiliate.com/` | Dashboard shows `30%` Standard and `50%` THE END OF TIME commission structures, but the program card is still `Pending` | `applied` | Wait for Tapfiliate approval; when `View` is enabled and the Deeplink generator is populated, capture the final tracking link before replacing the official fallback URL |
| Nomi AI | `nomi-ai` | Affiliate | `https://nomi.ai/nomi-ai-girlfriend-affiliate-program/` | Public page advertises `30%` lifetime recurring commissions on monthly, quarterly, and yearly plans | `applied` | Application submitted with `wosenkeji@gmail.com`; wait for approval email from `affiliate@nomi.ai`, then create Rewardful account and store the approved tracking URL |
| Muah AI | `muah-ai` | Affiliate | `https://muah.ai/affiliate/` | Public page advertises `40%` commission on total paid amount | `approved` | Approved tracking URL captured: `https://muah.ai/affiliate/track.php?ref=GE9CZKD0WI`; verify payout method and payout threshold in the direct dashboard |
| SoulGen | `soulgen` | Affiliate | `https://www.soulgen.net/` footer affiliate link | Official Google Form advertises `20%` of revenue from approved traffic | `applied` | Application submitted with `wosenkeji@gmail.com`; wait for approval email from `hello@soulgen.ai`, then store the approved tracking URL |
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
- Muah AI: approved tracking URL captured as `https://muah.ai/affiliate/track.php?ref=GE9CZKD0WI`; payout setup still needs dashboard verification.
- Candy AI: `https://candy.ai/affiliate` returned `403` from the current environment. Retry from a normal browser/proxy profile or confirm existing application status by email/dashboard.

## Minimum Data To Capture After Approval

- Tool name and slug
- Official URL
- Approved affiliate URL
- Network or platform name
- Commission type
- Commission rate
- Cookie duration
- Payout threshold
- Payout method
- Approval date
- Notes about restrictions or promo rules

## Launch Rule

Do not overwrite official URLs with affiliate URLs. Store affiliate URLs separately and keep `/go/[toolSlug]` as the single redirect surface.
