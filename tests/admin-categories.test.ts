import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

describe("admin category CRUD source", () => {
  it("defines category admin route and shared validation-aware category form", () => {
    const listSource = readFileSync(
      join(process.cwd(), "app", "admin", "categories", "page.tsx"),
      "utf8"
    );
    const formSource = readFileSync(
      join(process.cwd(), "components", "admin", "category-form.tsx"),
      "utf8"
    );

    expect(listSource).toContain("Category admin");
    expect(listSource).toContain("SEO");
    expect(listSource).toContain("Assign tools");

    expect(formSource).toContain("seoTitle");
    expect(formSource).toContain("seoDescription");
    expect(formSource).toContain("categorySchema");
    expect(formSource).toContain("parentSlug");
  });
});
