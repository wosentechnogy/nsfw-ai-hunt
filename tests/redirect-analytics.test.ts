import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

describe("redirect and analytics source", () => {
  it("defines tracked outbound redirect route and privacy-friendly analytics script", () => {
    const goSource = readFileSync(join(process.cwd(), "app", "go", "[toolSlug]", "route.ts"), "utf8");
    const analyticsSource = readFileSync(
      join(process.cwd(), "components", "common", "analytics-script.tsx"),
      "utf8"
    );
    const layoutSource = readFileSync(join(process.cwd(), "app", "layout.tsx"), "utf8");

    expect(goSource).toContain("redirect");
    expect(goSource).toContain("outbound_clicks");
    expect(goSource).toContain("affiliateUrl");
    expect(goSource).toContain("websiteUrl");

    expect(analyticsSource).toContain("NEXT_PUBLIC_ANALYTICS_DOMAIN");
    expect(analyticsSource).toContain("defer");
    expect(layoutSource).toContain("AnalyticsScript");
  });
});
