# PRD: Adult AI Tools Data & Affiliate Hub

## 1. Product Summary

Build an English-language adult AI tools intelligence site focused on software discovery, comparison, pricing, restrictions, and affiliate conversion. The product must behave like a serious SaaS directory and decision engine, not like an adult media site.

The site will not host explicit images, explicit videos, user-generated adult content, pirated content, real-person deepfakes, celebrity sexual content, leaked content, or any content involving minors or ambiguous age. The commercial surface is tool data, software comparison, SEO landing pages, and affiliate traffic.

Primary model:

- Programmatic SEO pages from a structured tools database.
- Affiliate monetization through adult AI, AI companion, and AI chatbot products.
- Future monetization through featured listings, sponsored placements, and paid data exports.

## 2. Goals

### 2.1 Business Goals

- Launch a monetizable site within 30 days.
- Publish 300-500 indexable pages in the first release.
- Apply to at least 10 affiliate programs.
- Generate first organic clicks from long-tail English keywords.
- Build a data asset that can scale beyond simple navigation.

### 2.2 Product Goals

- Help users choose adult AI tools by intent, feature, price, privacy, and restrictions.
- Make comparison pages more useful than generic affiliate blog posts.
- Make every SEO page contain structured data, tables, and specific recommendations.
- Keep the visual style software-focused and non-explicit.

### 2.3 Non-Goals

- Do not host pornography.
- Do not build an adult image/video generator.
- Do not allow user uploads.
- Do not run a community, comments, or chat forum in v1.
- Do not target Chinese-language users.
- Do not build native mobile apps in v1.
- Do not require login in v1 unless needed for admin.

## 3. Target Users

### 3.1 Primary User: Adult AI Explorer

- Age: 18+
- Location: US, UK, Canada, Australia, EU, and other English-speaking markets.
- Intent: Wants to find NSFW AI chatbots, AI girlfriend apps, roleplay companions, image generators, or uncensored character chat tools.
- Pain points:
  - Tool claims are vague.
  - Pricing and limits are hard to compare.
  - Many tools hide NSFW rules.
  - Free trials are confusing.
  - Privacy and payment methods are unclear.
- Desired outcome:
  - Quickly choose a tool that supports their preferred use case.

### 3.2 Secondary User: Privacy-Conscious User

- Wants adult AI chat but cares about account privacy, payment methods, data retention, and app discretion.
- High-value because privacy-related pages can convert well.

### 3.3 Secondary User: Deal Seeker

- Searches for free trials, coupons, discounts, and no-credit-card options.
- High-intent affiliate traffic.

### 3.4 Secondary User: Tool Vendor

- Adult AI product owner or marketer.
- Wants to be listed, corrected, or featured.
- Future revenue source for sponsored placement.

## 4. Positioning

### 4.1 One-Line Positioning

Find, compare, and track the best adult AI tools by features, price, privacy, and restrictions.

### 4.2 Differentiation

- Data-first pages instead of generic reviews.
- Clear restrictions and privacy fields.
- Programmatic alternatives and comparison pages.
- Non-explicit software directory presentation.
- Frequent updates on pricing, free plans, and NSFW policy changes.

## 5. Content & Compliance Boundary

Allowed:

- English text discussing adult AI tools.
- Non-explicit logos and safe screenshots.
- Pricing, feature, policy, and privacy data.
- Affiliate links to official product home, pricing, or signup pages.
- 18+ disclaimers and affiliate disclosures.

Not allowed:

- Explicit videos or images.
- Embedded adult media.
- Direct links to specific porn videos, galleries, or downloads.
- User uploads of any content.
- Real-person deepfake content.
- Celebrity sexual content.
- Leaked or pirated content.
- Any minor, teen, school, incest, coercion, violence, or non-consensual sexual framing.
- Chinese-language adult user acquisition.

## 6. Core Feature Modules

### 6.1 Tool Directory

Purpose: Let users browse all adult AI tools.

Capabilities:

- Search by tool name.
- Filter by category, pricing, free trial, NSFW support, image support, voice support, video support, payment method, privacy score, and platform.
- Sort by editor score, popularity, newest, free trial, and affiliate priority.

Fields shown on cards:

- Tool logo
- Tool name
- One-sentence positioning
- Category tags
- Pricing summary
- Free trial flag
- NSFW support flag
- Editor score
- CTA button

### 6.2 Tool Detail Pages

Route: `/tools/[slug]`

Purpose: Convert users searching for a specific tool.

Sections:

- Hero summary
- Quick verdict
- Feature matrix
- Pricing table
- NSFW policy summary
- Privacy and payment notes
- Pros and cons
- Best alternatives
- Related comparisons
- FAQ
- Affiliate CTA

### 6.3 Category Pages

Route: `/category/[slug]`

Examples:

- `/category/nsfw-ai-chatbots`
- `/category/ai-girlfriend-apps`
- `/category/nsfw-ai-image-generators`
- `/category/character-roleplay-ai`
- `/category/private-adult-ai-chat`

Purpose: Rank for broad and mid-tail category terms.

Sections:

- Category intro
- Filterable ranking table
- Best by use case
- Tool cards
- Comparison links
- FAQ

### 6.4 Best-Of Pages

Route: `/best/[slug]`

Examples:

- `/best/nsfw-ai-chatbots`
- `/best/free-nsfw-ai-chatbots`
- `/best/ai-girlfriend-apps-with-voice`
- `/best/private-adult-ai-chat-apps`
- `/best/nsfw-ai-tools-that-accept-crypto`

Purpose: High-intent affiliate pages.

Sections:

- Quick recommendation table
- Ranked list
- Use-case breakdown
- Methodology
- FAQ
- Disclosure

### 6.5 Comparison Pages

Route: `/compare/[slug]`

Slug format:

- `[tool-a]-vs-[tool-b]`

Examples:

- `/compare/candy-ai-vs-crushon-ai`
- `/compare/nomi-ai-vs-kindroid`

Purpose: Capture high-conversion decision searches.

Sections:

- Verdict
- Side-by-side feature table
- Pricing comparison
- NSFW policy comparison
- Privacy comparison
- Best for chat/images/voice/privacy
- Alternatives
- CTA buttons for both tools

### 6.6 Alternatives Pages

Route: `/alternatives/[slug]`

Examples:

- `/alternatives/janitor-ai`
- `/alternatives/character-ai`
- `/alternatives/candy-ai`

Purpose: Capture dissatisfaction and switching intent.

Sections:

- Why users look for alternatives
- Recommended alternatives table
- Comparison by feature
- Best free alternative
- Best private alternative
- Best image-support alternative

### 6.7 Coupon & Pricing Pages

Routes:

- `/pricing/[slug]`
- `/coupons/[slug]`

Purpose: Capture purchase-intent searches.

Content:

- Current pricing
- Free plan details
- Trial availability
- Coupon or promotion status
- Last checked date
- CTA

### 6.8 Blog / Editorial Pages

Route: `/blog/[slug]`

Purpose: Support topical authority and GEO citations.

Content types:

- Buyer guides
- Privacy guides
- Feature explainers
- Market maps
- Tool policy updates

Blog volume should be lower than data pages. Blog content must support conversion pages.

### 6.9 Admin Dashboard

Route: `/admin`

Purpose: Manage tools, affiliate links, page metadata, and data freshness.

v1 capabilities:

- Login-protected admin.
- CRUD tools.
- CRUD categories.
- Manage affiliate links.
- Mark fields as verified.
- Track last checked date.
- Trigger sitemap regeneration.

### 6.10 Data Freshness System

Purpose: Make the site defensible and useful.

Fields that require freshness:

- Pricing
- Free trial
- Affiliate link
- NSFW support
- Payment methods
- Platform availability
- Privacy notes
- Last checked date

Every page should show `Last updated` or `Last checked` where relevant.

## 7. Page Structure

Required public routes:

- `/`
- `/tools`
- `/tools/[slug]`
- `/category/[slug]`
- `/best/[slug]`
- `/compare/[slug]`
- `/alternatives/[slug]`
- `/pricing/[slug]`
- `/coupons/[slug]`
- `/blog`
- `/blog/[slug]`
- `/about`
- `/contact`
- `/submit-tool`
- `/privacy`
- `/terms`
- `/affiliate-disclosure`

Required admin routes:

- `/admin`
- `/admin/tools`
- `/admin/tools/new`
- `/admin/tools/[id]`
- `/admin/categories`
- `/admin/affiliate-links`
- `/admin/content`

## 8. Data Model

### 8.1 Tool

Core fields:

- `id`
- `slug`
- `name`
- `tagline`
- `description`
- `website_url`
- `affiliate_url`
- `logo_url`
- `safe_screenshot_url`
- `status`
- `editor_score`
- `popularity_score`
- `is_featured`
- `is_sponsored`
- `created_at`
- `updated_at`
- `last_checked_at`

Feature fields:

- `supports_nsfw_chat`
- `supports_image_generation`
- `supports_video_generation`
- `supports_voice`
- `supports_phone_call`
- `supports_character_creation`
- `supports_anime_style`
- `supports_realistic_style`
- `has_mobile_app`
- `has_web_app`
- `has_free_plan`
- `has_free_trial`
- `requires_credit_card`
- `accepts_crypto`
- `accepts_paypal`
- `accepts_card`

Policy fields:

- `nsfw_policy_summary`
- `privacy_summary`
- `data_retention_summary`
- `content_restrictions`
- `geo_restrictions`
- `age_requirement`

Commercial fields:

- `pricing_model`
- `starting_price`
- `currency`
- `affiliate_program_status`
- `commission_type`
- `commission_rate`
- `cookie_duration`
- `affiliate_network`

### 8.2 Category

- `id`
- `slug`
- `name`
- `description`
- `seo_title`
- `seo_description`
- `parent_id`
- `sort_order`

### 8.3 ToolCategory

- `tool_id`
- `category_id`

### 8.4 Comparison

- `id`
- `slug`
- `tool_a_id`
- `tool_b_id`
- `verdict`
- `seo_title`
- `seo_description`
- `created_at`
- `updated_at`

### 8.5 AlternativePage

- `id`
- `base_tool_id`
- `slug`
- `reason_summary`
- `seo_title`
- `seo_description`

### 8.6 AffiliateLink

- `id`
- `tool_id`
- `url`
- `network`
- `campaign`
- `status`
- `is_primary`
- `created_at`
- `updated_at`

### 8.7 BlogPost

- `id`
- `slug`
- `title`
- `excerpt`
- `body`
- `status`
- `author`
- `published_at`
- `updated_at`
- `seo_title`
- `seo_description`

### 8.8 PageMetric

- `id`
- `route`
- `page_type`
- `impressions`
- `clicks`
- `ctr`
- `avg_position`
- `updated_at`

## 9. SEO Strategy

### 9.1 SEO Principle

Do not rely on generic AI-written articles. Every scalable page must contain structured data, comparison tables, editorial verdicts, and clear user intent mapping.

### 9.2 Keyword Clusters

Tool-specific:

- `[tool] review`
- `[tool] pricing`
- `[tool] free trial`
- `[tool] coupon`
- `[tool] alternatives`

Comparison:

- `[tool a] vs [tool b]`
- `[tool a] or [tool b]`

Best-of:

- `best nsfw ai chatbots`
- `best ai girlfriend apps`
- `best adult ai companion apps`
- `best nsfw ai image generators`

Feature:

- `nsfw ai chat with voice`
- `ai girlfriend app that sends pictures`
- `private nsfw ai chatbot`
- `uncensored ai character chat`
- `nsfw ai that accepts crypto`

Price:

- `free nsfw ai chat`
- `free ai girlfriend no sign up`
- `nsfw ai chat no credit card`

Privacy:

- `private adult ai chat`
- `anonymous nsfw ai chatbot`
- `ai girlfriend app privacy`

### 9.3 Programmatic SEO Rules

- Each generated page must have a unique title and meta description.
- Each generated page must include at least one data table.
- Each generated page must include internal links to related pages.
- Generated copy must be edited by templates and data, not pure filler.
- Avoid thin pages with fewer than 600 useful words unless the page is a utility page with strong structured data.
- Use canonical URLs.
- Use noindex for incomplete or low-data pages.

### 9.4 Technical SEO

Required:

- SSR or static generation for public pages.
- Dynamic XML sitemap.
- `robots.txt`.
- Canonical tags.
- Open Graph metadata.
- Breadcrumb schema where relevant.
- SoftwareApplication schema for tool pages where appropriate.
- ItemList schema for best-of/category pages.
- FAQ schema only when FAQ content is truly visible on the page.
- Fast LCP and lightweight pages.

### 9.5 GEO Strategy

Generative answer engines prefer concise, structured, citation-friendly content.

Implement:

- Comparison tables.
- Short verdict boxes.
- "Best for" labels.
- Methodology blocks.
- Last updated dates.
- Clear source links to official pricing/policy pages.
- Dedicated data pages that answer one intent cleanly.

## 10. Monetization

### 10.1 Affiliate Revenue

Primary revenue source in v1.

Priority programs:

- AI girlfriend products.
- NSFW AI chatbots.
- Character roleplay tools.
- Adult AI image generators.
- Adult affiliate networks with AI offers.

Placement rules:

- Primary CTA above the fold.
- CTA after pricing.
- CTA after alternatives.
- Disclosure on every monetized page.
- Affiliate links should point to official home, pricing, or signup pages.

### 10.2 Sponsored Listings

v2 revenue source.

Offer:

- Featured category placement.
- Sponsored comparison placement.
- Newsletter placement.
- Data correction priority.

Must label sponsored placements clearly.

### 10.3 Data Products

v3 revenue source.

Possible products:

- Adult AI tools database CSV.
- Weekly pricing and policy changes report.
- Affiliate program database.
- Private market map.

### 10.4 Newsletter

v2.

Theme:

- Weekly adult AI tools update.
- New tools.
- Price changes.
- Policy changes.
- Best free trials.

## 11. Analytics & KPIs

### 11.1 Traffic KPIs

- Indexed pages.
- GSC impressions.
- GSC clicks.
- CTR.
- Average position.
- Pages with impressions.

### 11.2 Monetization KPIs

- Affiliate outbound clicks.
- CTA click-through rate.
- Affiliate approvals.
- Conversions.
- Revenue per page.
- Revenue per click.

### 11.3 Product KPIs

- Tools listed.
- Tools with verified data.
- Pages with updated data in last 30 days.
- Internal search usage.
- Filter usage.

## 12. MVP Scope

MVP must include:

- Public homepage.
- Tool directory.
- Tool detail pages.
- Category pages.
- Best-of pages.
- Comparison pages.
- Alternatives pages.
- Pricing/coupon pages.
- Blog index and blog post pages.
- Admin tool CRUD.
- Supabase database.
- Affiliate link management.
- SEO metadata system.
- Sitemap.
- Robots.txt.
- 18+ disclaimer.
- Affiliate disclosure.

MVP does not require:

- User accounts.
- Comments.
- Community.
- Payment processing.
- Real-time scraping.
- AI chatbot.
- Adult content hosting.

## 13. Launch Content Targets

Initial data:

- 100 tools.
- 10 categories.
- 30 best-of pages.
- 100 alternatives pages.
- 200 comparison pages.
- 50 pricing/coupon pages.
- 10 editorial blog posts.

Initial affiliate target:

- Apply to 10-20 affiliate programs.
- At least 5 live affiliate links before launch.

## 14. 30-Day Launch Plan

Week 1:

- Finalize project structure.
- Initialize Next.js.
- Build database schema.
- Build data seed format.
- Build core UI.

Week 2:

- Build public page templates.
- Add 100 tools.
- Generate tool/category/best pages.
- Add SEO metadata and schema.

Week 3:

- Add compare/alternatives/pricing pages.
- Build admin.
- Apply to affiliate programs.
- Add analytics.

Week 4:

- QA with Playwright.
- Submit sitemap.
- Fix indexability.
- Improve top money pages.
- Start outreach for listings and affiliate approvals.

## 15. Risks

### 15.1 Legal and Platform Risk

Mitigation:

- No explicit media hosting.
- No user uploads.
- No deepfake or real-person sexual content.
- English-only product.
- Clear 18+ notice and disclosures.

### 15.2 SEO Risk

Mitigation:

- Avoid thin AI pages.
- Use structured data and real fields.
- Add source links.
- Update data regularly.

### 15.3 Affiliate Risk

Mitigation:

- Do not rely on one affiliate program.
- Track direct and network programs.
- Keep non-affiliate outbound links if no program exists.

### 15.4 Operational Risk

Mitigation:

- Use simple data model.
- Keep v1 static/SSR-friendly.
- Avoid complex user systems.
- Use admin only for owner.

## 16. Acceptance Criteria

The MVP is accepted when:

- A user can browse tools by category and filter.
- A user can open any tool detail page and understand pricing, features, and restrictions.
- A user can compare two tools.
- A user can view alternatives for a tool.
- Affiliate CTA clicks are tracked.
- Public pages have SEO metadata.
- Sitemap includes all indexable pages.
- Admin can create and update tools.
- No page hosts explicit media.
- Playwright smoke tests pass.
