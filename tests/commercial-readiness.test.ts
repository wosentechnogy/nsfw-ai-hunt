import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  commercialReadinessItems,
  getCommercialReadinessSummary
} from "@/lib/ops/commercial-readiness";

describe("commercial readiness operations", () => {
  it("tracks the current launch blockers without storing secrets", () => {
    const ids = commercialReadinessItems.map((item) => item.id);
    const summary = getCommercialReadinessSummary();

    expect(ids).toContain("supabase-production");
    expect(ids).toContain("email-routing");
    expect(ids).toContain("search-submission");
    expect(ids).toContain("affiliate-url-approval");
    expect(ids).toContain("production-reachability");
    expect(summary.total).toBe(commercialReadinessItems.length);
    expect(summary.manual).toBeGreaterThanOrEqual(3);
    expect(commercialReadinessItems.find((item) => item.id === "supabase-production")?.status).toBe("ready");
    expect(commercialReadinessItems.find((item) => item.id === "outbound-click-persistence")?.status).toBe("ready");
    expect(commercialReadinessItems.find((item) => item.id === "production-reachability")?.status).toBe("ready");
    const owners: readonly string[] = commercialReadinessItems.map((item) => item.owner);
    expect(owners).not.toContain("wosenkeji@gmail.com");

    for (const item of commercialReadinessItems) {
      expect(item.nextAction).not.toMatch(/password|service role secret|admin_access_token|payout|wallet/i);
      expect(item.evidence).not.toMatch(/password|private affiliate id|wallet/i);
    }
  });

  it("adds an owner-only admin page and homepage link", () => {
    const pageSource = readFileSync(
      join(process.cwd(), "app", "admin", "commercial-readiness", "page.tsx"),
      "utf8"
    );
    const adminSource = readFileSync(join(process.cwd(), "app", "admin", "page.tsx"), "utf8");

    expect(pageSource).toContain("Commercial readiness dashboard");
    expect(pageSource).toContain("revenue-ready affiliate operation");
    expect(pageSource).toContain("commercialReadinessItems");
    expect(adminSource).toContain("/admin/commercial-readiness");
  });
});
