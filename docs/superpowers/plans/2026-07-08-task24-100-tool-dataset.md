# Task 24 100-Tool Commercial Dataset Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Expand the published seed dataset from 35 adult AI software records to at least 100 publishable records without weakening safety, SEO quality, or affiliate-link separation.

**Architecture:** Public programmatic pages are generated from `data/seed/tools.ts`, where category definitions and tool records currently live in one module. New records should be appended to `rawDirectoryTools`, validated by `toolSchema`, and exercised by the existing data-driven page tests before Task 24 is marked complete.

**Tech Stack:** Next.js 15 App Router, TypeScript, Zod, Vitest, pnpm, seed data in `data/seed/tools.ts`.

---

## Current State

- Current tool records: 35 slugs in `rawDirectoryTools` between `data/seed/tools.ts:481` and `data/seed/tools.ts:1418`.
- Current safe logo records: 27 `logoUrl` values, all using non-explicit favicon URLs.
- Missing to reach Task 24: 65 additional published tool records.
- Missing to reach safe-logo target: at least 23 additional safe logo URLs, assuming existing logo records remain valid.
- `data/seed/categories.ts` does not exist; category data is embedded in `data/seed/tools.ts` as `directoryCategories`.
- Existing full-volume test is gated behind `RUN_TASK24_SEED_VOLUME=1` in `tests/seed-volume.test.ts`.

## Files

- Modify: `data/seed/tools.ts`
- Read only unless validation rules change: `lib/validation/index.ts`
- Validate: `tests/seed-volume.test.ts`
- Validate: `tests/seed-preview.test.ts`
- Validate: `tests/tool-directory.test.ts`
- Validate: `tests/tool-detail.test.ts`
- Validate: `tests/category-pages.test.ts`
- Validate: `tests/best-pages.test.ts`
- Validate: `tests/comparison-pages.test.ts`
- Validate: `tests/alternative-pages.test.ts`
- Validate: `tests/pricing-coupon-pages.test.ts`
- Validate: `tests/sitemap-robots.test.ts`

## Record Acceptance Checklist

Every added published tool record must have:

- Real tool name and slug.
- Official product homepage in `websiteUrl`.
- `affiliateUrl` omitted unless an approved official tracking link exists.
- One or more existing category slugs from `directoryCategories`.
- A non-placeholder editorial description grounded in visible product features.
- A pricing model or the explicit `unknown` marker when official pricing cannot be confirmed.
- At least one concrete feature, platform, or payment boolean.
- Conservative `nsfwPolicySummary` and `privacySummary`.
- `lastCheckedAt` set to the research date.
- `logoUrl` only when a non-explicit favicon/logo source is safe.

Reject a candidate if the product or proposed copy depends on explicit media hosting, user uploads, adult galleries, unsafe identity misuse, celebrity sexual content, leaked/pirated content, age-ambiguous framing, coercive framing, or non-consensual framing.

## Tasks

### Task 1: Establish The Full-Volume Baseline

**Files:**
- Read: `tests/seed-volume.test.ts`
- Read: `data/seed/tools.ts`

- [ ] **Step 1: Run the gated Task 24 volume test**

Run:

```powershell
$env:RUN_TASK24_SEED_VOLUME="1"; pnpm test tests/seed-volume.test.ts
```

Expected: FAIL while the current seed remains below 100 published tools.

- [ ] **Step 2: Confirm the preview gate still passes**

Run:

```powershell
pnpm test tests/seed-preview.test.ts
```

Expected: PASS.

### Task 2: Add 15 Companion And Chat Records

**Files:**
- Modify: `data/seed/tools.ts`
- Test: `tests/validation-schemas.test.ts`
- Test: `tests/tool-directory.test.ts`
- Test: `tests/seed-preview.test.ts`

- [ ] **Step 1: Research official pages**

Use official home, pricing, policy, FAQ, app store, or help pages only. Save each accepted candidate's official URL, pricing model, platform support, feature support, and policy/privacy notes in the new record.

- [ ] **Step 2: Append the records to `rawDirectoryTools`**

For each record, use `ai-girlfriend-apps`, `nsfw-ai-chatbots`, or `private-adult-ai-chat` only when the official product pages support that classification. Keep descriptions software-focused and avoid explicit scenario copy.

- [ ] **Step 3: Run focused validation**

Run:

```powershell
pnpm test tests/validation-schemas.test.ts tests/tool-directory.test.ts tests/seed-preview.test.ts
```

Expected: PASS.

### Task 3: Add 15 Character Roleplay Records

**Files:**
- Modify: `data/seed/tools.ts`
- Test: `tests/comparison-pages.test.ts`
- Test: `tests/alternative-pages.test.ts`

- [ ] **Step 1: Research official roleplay or character-chat products**

Accept only software products or hosted roleplay services. Reject products centered on explicit galleries, unsafe identity misuse, or user-upload adult media.

- [ ] **Step 2: Append roleplay records**

Use `character-roleplay-ai` only for tools with visible character creation, character selection, roleplay, or persona features. Set `supportsCharacterCreation` only when the feature is visible on official pages.

- [ ] **Step 3: Run page generation checks**

Run:

```powershell
pnpm test tests/comparison-pages.test.ts tests/alternative-pages.test.ts
```

Expected: PASS.

### Task 4: Add 10 Privacy-Oriented Or Payment-Flexible Records

**Files:**
- Modify: `data/seed/tools.ts`
- Test: `tests/category-pages.test.ts`
- Test: `tests/best-pages.test.ts`

- [ ] **Step 1: Research tools with visible privacy or payment signals**

Prioritize official pages that clearly expose privacy controls, account requirements, app availability, payment methods, free trials, PayPal support, crypto support, or retention-policy language.

- [ ] **Step 2: Append privacy-fit records**

Use `private-adult-ai-chat` only when there is a concrete signal such as privacy controls, clear retention language, lower-friction account setup, PayPal support, crypto support, or a visible privacy policy that users can inspect before purchase.

- [ ] **Step 3: Run category and best-page checks**

Run:

```powershell
pnpm test tests/category-pages.test.ts tests/best-pages.test.ts
```

Expected: PASS.

### Task 5: Add 15 Image-Capable Software Records

**Files:**
- Modify: `data/seed/tools.ts`
- Test: `tests/tool-detail.test.ts`
- Test: `tests/pricing-coupon-pages.test.ts`

- [ ] **Step 1: Research image-capable AI software products**

Add text-only tool records. Do not host, embed, link to, or describe explicit image examples. Reject products whose primary pitch is unsafe identity misuse or non-consensual media workflows.

- [ ] **Step 2: Append image-capable records**

Use `nsfw-ai-image-generators` and `supportsImageGeneration` only for software-level records where image capability is visible on official product pages. Do not add `safeScreenshotUrl` in this task.

- [ ] **Step 3: Run detail and money-page checks**

Run:

```powershell
pnpm test tests/tool-detail.test.ts tests/pricing-coupon-pages.test.ts
```

Expected: PASS.

### Task 6: Add 10 Adult-Adjacent Alternative Records

**Files:**
- Modify: `data/seed/tools.ts`
- Test: `tests/sitemap-robots.test.ts`

- [ ] **Step 1: Research adult-adjacent companion, writing, or roleplay products**

These records can cover tools users compare against adult AI products, even when adult support is limited. If official policy does not support adult use, set `supportsNsfwChat` to false and explain the boundary in `nsfwPolicySummary`.

- [ ] **Step 2: Append adult-adjacent records**

Do not overstate NSFW support. Use honest category assignments and policy summaries so comparison, alternatives, and pricing pages remain useful without creating unsafe adult-content claims.

- [ ] **Step 3: Run sitemap and robots checks**

Run:

```powershell
pnpm test tests/sitemap-robots.test.ts
```

Expected: PASS.

### Task 7: Run The Full Task 24 Gate

**Files:**
- Validate: `tests/seed-volume.test.ts`
- Validate: `tests/seed-preview.test.ts`
- Validate: `tests/tool-directory.test.ts`

- [ ] **Step 1: Run the full volume gate**

Run:

```powershell
$env:RUN_TASK24_SEED_VOLUME="1"; pnpm test tests/seed-volume.test.ts
```

Expected: PASS with at least 100 published tools, at least 80 pricing summaries, at least 80 feature-covered records, and at least 50 safe-logo records.

- [ ] **Step 2: Run the seed and directory suite**

Run:

```powershell
pnpm test tests/validation-schemas.test.ts tests/seed-preview.test.ts tests/tool-directory.test.ts
```

Expected: PASS.

### Task 8: Run SEO Page Regression Tests

**Files:**
- Validate: generated programmatic pages

- [ ] **Step 1: Run data-driven page tests**

Run:

```powershell
pnpm test tests/tool-detail.test.ts tests/category-pages.test.ts tests/best-pages.test.ts tests/comparison-pages.test.ts tests/alternative-pages.test.ts tests/pricing-coupon-pages.test.ts tests/sitemap-robots.test.ts
```

Expected: PASS.

- [ ] **Step 2: Run project-wide static checks**

Run:

```powershell
pnpm typecheck
pnpm lint
```

Expected: PASS.

## Completion Rules

- Do not mark Task 24 complete in `TASKS.md` until `RUN_TASK24_SEED_VOLUME=1 pnpm test tests/seed-volume.test.ts` passes.
- Do not add affiliate URLs during dataset expansion unless the affiliate program is approved and the tracking URL is official.
- Do not add screenshots during this task unless each screenshot is confirmed non-explicit.
- Do not create `data/seed/categories.ts` as part of this plan; keep the current embedded-category structure unless a separate refactor is routed.
- After the data patch passes, route to Release Gate for typecheck, lint, data tests, sitemap checks, and mobile smoke testing on high-volume generated pages.
