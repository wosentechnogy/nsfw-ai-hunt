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
});
