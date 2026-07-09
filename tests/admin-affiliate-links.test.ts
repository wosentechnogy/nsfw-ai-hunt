import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

describe("admin affiliate link management source", () => {
  it("defines affiliate link management route with primary-link, network, and commission fields", () => {
    const source = readFileSync(
      join(process.cwd(), "app", "admin", "affiliate-links", "page.tsx"),
      "utf8"
    );

    expect(source).toContain("Affiliate link admin");
    expect(source).toContain("Primary link");
    expect(source).toContain("network");
    expect(source).toContain("commission");
    expect(source).toContain("Pause link");
  });

  it("tracks affiliate applications without storing private affiliate IDs or payout details", () => {
    const pageSource = readFileSync(
      join(process.cwd(), "app", "admin", "affiliate-applications", "page.tsx"),
      "utf8"
    );
    const seedSource = readFileSync(
      join(process.cwd(), "data", "seed", "affiliate-applications.ts"),
      "utf8"
    );

    expect(pageSource).toContain("Affiliate application tracker");
    expect(pageSource).toContain("Owner email");
    expect(pageSource).toContain("Next action");
    expect(seedSource).toContain("985064198@qq.com");
    expect(seedSource).not.toContain("wosenkeji@gmail.com");
    expect(seedSource).toContain("publicPayoutSignal");
    expect(seedSource).not.toContain("password");
    expect(seedSource).not.toContain("affiliateId");
    expect(seedSource).not.toContain("wallet");
  });
});
