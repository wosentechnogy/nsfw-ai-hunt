import { describe, expect, it } from "vitest";
import { normalizeSourcePath } from "@/lib/analytics/source-path";

const requestOrigin = "https://www.nsfwaihunt.com";

describe("normalizeSourcePath", () => {
  it("prefers a valid explicit internal source path", () => {
    expect(
      normalizeSourcePath({
        explicitSource: "/compare/candy-ai-vs-nomi-ai",
        referrer: `${requestOrigin}/tools/candy-ai`,
        requestOrigin
      })
    ).toBe("/compare/candy-ai-vs-nomi-ai");
  });

  it("extracts a same-origin referrer path when no explicit source is supplied", () => {
    expect(
      normalizeSourcePath({
        explicitSource: null,
        referrer: `${requestOrigin}/pricing/candy-ai?tab=annual`,
        requestOrigin
      })
    ).toBe("/pricing/candy-ai?tab=annual");
  });

  it("drops external, malformed, and protocol-relative sources", () => {
    expect(
      normalizeSourcePath({
        explicitSource: "https://evil.example/steal",
        referrer: "https://evil.example/landing",
        requestOrigin
      })
    ).toBeNull();
    expect(
      normalizeSourcePath({
        explicitSource: "//evil.example/steal",
        referrer: "not a URL",
        requestOrigin
      })
    ).toBeNull();
  });
});
