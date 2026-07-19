import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { getMoneyPageReview, getMoneyPageReviews } from "@/data/seed/tools";

describe("money page review helpers", () => {
  it("tracks the manually reviewed money pages with checked claims across the highest-value route types", () => {
    const reviews = getMoneyPageReviews();

    expect(reviews).toHaveLength(35);
    expect(new Set(reviews.map((review) => review.route)).size).toBe(35);
    expect(reviews.every((review) => review.reviewedOn === "2026-06-23")).toBe(true);
    expect(reviews.every((review) => review.claimChecks.length >= 2)).toBe(true);
    expect(reviews.some((review) => review.pageType === "best")).toBe(true);
    expect(reviews.some((review) => review.pageType === "category")).toBe(true);
    expect(reviews.some((review) => review.pageType === "tool")).toBe(true);
    expect(reviews.some((review) => review.pageType === "pricing")).toBe(true);
    expect(reviews.some((review) => review.pageType === "alternatives")).toBe(true);
    expect(reviews.some((review) => review.pageType === "comparison")).toBe(true);
  });

  it("stores concrete claim-check notes for reviewed money pages", () => {
    const bestReview = getMoneyPageReview("/best/ai-girlfriend-apps");
    const compareReview = getMoneyPageReview("/compare/candy-ai-vs-crushon-ai");
    const pricingReview = getMoneyPageReview("/pricing/kindroid");

    expect(bestReview?.claimChecks.some((check) => check.toLowerCase().includes("pricing"))).toBe(
      true
    );
    expect(compareReview?.claimChecks.some((check) => check.toLowerCase().includes("verdict"))).toBe(
      true
    );
    expect(pricingReview?.claimChecks.some((check) => check.toLowerCase().includes("discount"))).toBe(
      true
    );
  });
});

describe("money page review source", () => {
  it("wires claim-check panels into the highest-value public page templates", () => {
    const sources = [
      readFileSync(join(process.cwd(), "app", "best", "[slug]", "page.tsx"), "utf8"),
      readFileSync(join(process.cwd(), "app", "category", "[slug]", "page.tsx"), "utf8"),
      readFileSync(join(process.cwd(), "app", "tools", "[slug]", "page.tsx"), "utf8"),
      readFileSync(join(process.cwd(), "app", "compare", "[slug]", "page.tsx"), "utf8"),
      readFileSync(join(process.cwd(), "app", "alternatives", "[slug]", "page.tsx"), "utf8"),
      readFileSync(join(process.cwd(), "app", "pricing", "[slug]", "page.tsx"), "utf8")
    ];

    for (const source of sources) {
      expect(source).toContain("getMoneyPageReview");
      expect(source).toContain("Claim check");
    }
  });
});
