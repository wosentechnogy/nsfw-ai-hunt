import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  getCouponPageData,
  getCouponPageSlugs,
  getIndexableCouponPageSlugs,
  getIndexablePricingPageSlugs,
  getPricingPageData,
  getPricingPageSlugs
} from "@/data/seed/tools";

describe("pricing and coupon page data helpers", () => {
  it("generates pricing and coupon slugs from the launch tool set", () => {
    expect(getPricingPageSlugs()).toContain("candy-ai");
    expect(getCouponPageSlugs()).toContain("crushon-ai");
  });

  it("builds pricing page data with last checked date, free path, and CTA route", () => {
    const data = getPricingPageData("kindroid");

    expect(data).toBeDefined();

    if (!data) {
      throw new Error("Expected pricing page data");
    }

    expect(data.tool.name).toBe("Kindroid");
    expect(data.lastChecked).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(data.ctaHref).toBe("/go/kindroid");
    expect(data.rows.length).toBeGreaterThanOrEqual(5);
  });

  it("builds coupon page data that does not fake a coupon and offers alternatives", () => {
    const data = getCouponPageData("nomi-ai");

    expect(data).toBeDefined();

    if (!data) {
      throw new Error("Expected coupon page data");
    }

    expect(data.couponStatus.toLowerCase()).toContain("no confirmed coupon");
    expect(data.alternativeLinks.length).toBeGreaterThan(0);
    expect(data.ctaHref).toBe("/go/nomi-ai");
  });

  it("exposes pricing pages with clear pricing data for sitemap indexing", () => {
    const slugs = getIndexablePricingPageSlugs();

    expect(slugs).toContain("candy-ai");
    expect(slugs).toContain("aroused-ai");
  });

  it("exposes coupon pages only when the page has a useful free or affiliate signal", () => {
    const slugs = getIndexableCouponPageSlugs();

    expect(slugs).toContain("candy-ai");
    expect(slugs).toContain("nomi-ai");
    expect(slugs).not.toContain("aroused-ai");
  });
});

describe("pricing and coupon page source", () => {
  it("defines metadata, static params, last checked visibility, no-fake-coupon copy, and CTA links", () => {
    const pricingSource = readFileSync(
      join(process.cwd(), "app", "pricing", "[slug]", "page.tsx"),
      "utf8"
    );
    const couponSource = readFileSync(
      join(process.cwd(), "app", "coupons", "[slug]", "page.tsx"),
      "utf8"
    );

    expect(pricingSource).toContain("generateMetadata");
    expect(pricingSource).toContain("generateStaticParams");
    expect(pricingSource).toContain("Last checked");
    expect(pricingSource).toContain("/go/");

    expect(couponSource).toContain("generateMetadata");
    expect(couponSource).toContain("generateStaticParams");
    expect(couponSource).toContain("No confirmed coupon");
    expect(couponSource).toContain("Alternatives");
    expect(couponSource).toContain("/go/");
  });
});
