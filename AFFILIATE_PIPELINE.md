# Affiliate Pipeline

Last updated: 2026-06-23

This file tracks public, non-secret affiliate or referral opportunities for the current launch dataset. It is an operating checklist, not a source of truth for private approval emails, dashboard logins, payout details, or affiliate IDs.

## Verified Program Signals

| Tool | Current site slug | Program type | Public application or program URL | Public payout signal | Current internal status | Next action |
| --- | --- | --- | --- | --- | --- | --- |
| Candy AI | `candy-ai` | Affiliate | `https://candy.ai/affiliate` and `https://candy.ai/affiliate-terms` | Public terms confirm lifetime revshare plus CPS or PPS offer types, but no public percentage | `applied` | Submit or confirm direct application, then replace official URL fallback with the approved affiliate URL |
| CrushOn AI | `crushon-ai` | Affiliate | `https://crushonai.tapfiliate.com/` | Public signup page is live, but no public commission percentage is shown | `applied` | Confirm whether application is already submitted and capture the resulting dashboard link or rejection reason |
| Nomi AI | `nomi-ai` | Affiliate | `https://nomi.ai/nomi-ai-girlfriend-affiliate-program/` | Public page advertises `30%` lifetime recurring commissions on monthly, quarterly, and yearly plans | `none` | Apply through the public form, then store the approved tracking URL and payout threshold notes |
| Muah AI | `muah-ai` | Affiliate | `https://muah.ai/affiliate/` | Public page advertises `40%` commission on total paid amount | `none` | Open a direct account, verify payout method, and store the approved affiliate link |
| SoulGen | `soulgen` | Affiliate | `https://www.soulgen.ai/` footer affiliate link | Official site exposes an affiliate application route, but no public percentage is shown | `applied` | Confirm whether an application was actually submitted and collect program terms after approval |
| Kindroid | `kindroid` | Referral only | `https://docs.kindroid.ai/referrels/referrals` | Public docs describe referral credits, not cash commissions | `none` | Do not prioritize as an affiliate revenue source unless a separate cash program appears |

## Priority Order

1. Nomi AI
2. Muah AI
3. Candy AI
4. CrushOn AI
5. SoulGen
6. Kindroid referral only

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
