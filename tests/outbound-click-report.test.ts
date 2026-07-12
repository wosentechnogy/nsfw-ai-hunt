import { describe, expect, it } from "vitest";
import { buildOutboundClickReport } from "@/lib/analytics/outbound-click-report";

describe("outbound click report", () => {
  it("validates rows and summarizes attribution windows", () => {
    const report = buildOutboundClickReport(
      [
        {
          tool_slug: "candy-ai",
          source_path: "/compare/candy-ai-vs-nomi-ai",
          destination_url: "https://example.com/affiliate",
          created_at: "2026-07-13T00:00:00.000Z"
        },
        {
          tool_slug: "candy-ai",
          source_path: null,
          destination_url: "https://example.com/affiliate",
          created_at: "2026-07-01T00:00:00.000Z"
        },
        { tool_slug: "bad", source_path: "/bad", destination_url: "not-a-url", created_at: "bad" }
      ],
      new Date("2026-07-13T12:00:00.000Z")
    );

    expect(report.total).toBe(2);
    expect(report.attributed).toBe(1);
    expect(report.unattributed).toBe(1);
    expect(report.last7Days).toBe(1);
    expect(report.last28Days).toBe(2);
    expect(report.topSources).toEqual([
      { toolSlug: "candy-ai", sourcePath: "/compare/candy-ai-vs-nomi-ai", clicks: 1 }
    ]);
  });
});
