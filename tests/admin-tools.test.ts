import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

describe("admin freshness review queue", () => {
  it("renders the stale-record queue and current last-checked values", () => {
    const source = readFileSync(join(process.cwd(), "app", "admin", "tools", "page.tsx"), "utf8");

    expect(source).toContain("getStaleToolRecords");
    expect(source).toContain("Freshness review queue");
    expect(source).toContain("force-dynamic");
    expect(source).toContain("lastCheckedAt");
  });
});
