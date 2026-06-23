import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

function readHomepage() {
  return [
    readFileSync(join(process.cwd(), "app", "page.tsx"), "utf8"),
    readFileSync(join(process.cwd(), "data", "seed", "homepage.ts"), "utf8")
  ].join("\n");
}

describe("homepage discovery surface", () => {
  it("contains the required Task 6 discovery sections", () => {
    const source = readHomepage();

    expect(source).toContain("Search tools, features, or use cases");
    expect(source).toContain("Top categories");
    expect(source).toContain("Featured tools");
    expect(source).toContain("Best use-case pages");
    expect(source).toContain("Recently updated tools");
    expect(source).toContain("Candy AI");
    expect(source).toContain("Last checked");
  });

  it("keeps the hero copy shrinkable inside the mobile grid column", () => {
    const source = readHomepage();

    expect(source).toContain('className="min-w-0 max-w-3xl"');
  });
});
