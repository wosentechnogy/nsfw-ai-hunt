import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

describe("Playwright smoke coverage", () => {
  it("covers the current money routes, mobile detail page, console errors, and generic HTTPS redirects", () => {
    const source = readFileSync(join(process.cwd(), "scripts", "playwright-smoke.js"), "utf8");

    for (const route of ["/best/ai-girlfriend-apps", "/alternatives/candy-ai", "/pricing/candy-ai", "/coupons/candy-ai"]) {
      expect(source).toContain(route);
    }

    expect(source).toContain("Tool detail mobile");
    expect(source).toContain("consoleErrors");
    expect(source).toContain("pageErrors");
    expect(source).toContain("Browser console errors detected");
    expect(source).toContain("Browser page errors detected");
    expect(source).toContain('parsedRedirectUrl.protocol !== "https:"');
    expect(source).not.toContain('startsWith("https://candy.ai")');
  });
});
