import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

describe("admin tool CRUD source", () => {
  it("defines tool list, create, and edit admin routes with shared validation-aware form fields", () => {
    const listSource = readFileSync(join(process.cwd(), "app", "admin", "tools", "page.tsx"), "utf8");
    const newSource = readFileSync(join(process.cwd(), "app", "admin", "tools", "new", "page.tsx"), "utf8");
    const editSource = readFileSync(
      join(process.cwd(), "app", "admin", "tools", "[id]", "page.tsx"),
      "utf8"
    );
    const formSource = readFileSync(
      join(process.cwd(), "components", "admin", "tool-form.tsx"),
      "utf8"
    );

    expect(listSource).toContain("Tool admin");
    expect(listSource).toContain("/admin/tools/new");
    expect(listSource).toContain("Published");

    expect(newSource).toContain("Create tool");
    expect(editSource).toContain("Edit tool");

    expect(formSource).toContain("websiteUrl");
    expect(formSource).toContain("affiliateUrl");
    expect(formSource).toContain("categorySlugs");
    expect(formSource).toContain("toolSchema");
  });
});
