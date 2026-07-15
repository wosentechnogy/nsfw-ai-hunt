import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const outboundLinkComponentPath = join(
  process.cwd(),
  "components",
  "common",
  "tracked-outbound-link.tsx"
);

const outboundCtaFiles = [
  ["app", "tools", "page.tsx", 1],
  ["app", "tools", "[slug]", "page.tsx", 1],
  ["app", "best", "[slug]", "page.tsx", 2],
  ["app", "compare", "[slug]", "page.tsx", 2],
  ["app", "alternatives", "[slug]", "page.tsx", 2],
  ["app", "pricing", "[slug]", "page.tsx", 1],
  ["app", "coupons", "[slug]", "page.tsx", 1]
] as const;

describe("tracked outbound links", () => {
  it("centrally disables Next.js prefetch for every /go CTA", () => {
    const componentSource = readFileSync(outboundLinkComponentPath, "utf8");

    expect(componentSource).toContain('from "next/link"');
    expect(componentSource).toContain("prefetch={false}");

    let usageCount = 0;

    for (const pathParts of outboundCtaFiles) {
      const expectedCount = pathParts.at(-1);
      const source = readFileSync(
        join(process.cwd(), ...pathParts.slice(0, -1).map(String)),
        "utf8"
      );
      const count = source.match(/<TrackedOutboundLink\b/g)?.length ?? 0;

      expect(count).toBe(expectedCount);
      usageCount += count;
    }

    expect(usageCount).toBe(10);
  });
});
