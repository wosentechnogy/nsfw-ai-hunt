import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

describe("SEO infrastructure source", () => {
  it("defines shared metadata, canonical, schema helpers, and JsonLd component usage", () => {
    const metadataSource = readFileSync(
      join(process.cwd(), "lib", "seo", "metadata.ts"),
      "utf8"
    );
    const canonicalSource = readFileSync(
      join(process.cwd(), "lib", "seo", "canonical.ts"),
      "utf8"
    );
    const schemaSource = readFileSync(
      join(process.cwd(), "lib", "seo", "schema.ts"),
      "utf8"
    );
    const jsonLdSource = readFileSync(
      join(process.cwd(), "components", "seo", "JsonLd.tsx"),
      "utf8"
    );

    expect(metadataSource).toContain("buildMetadata");
    expect(canonicalSource).toContain("getCanonicalUrl");
    expect(schemaSource).toContain("buildBreadcrumbJsonLd");
    expect(jsonLdSource).toContain("application/ld+json");
    expect(jsonLdSource).toContain('replace(/</g, "\\\\u003c")');
    expect(jsonLdSource).toContain('replace(/>/g, "\\\\u003e")');
    expect(jsonLdSource).toContain('replace(/&/g, "\\\\u0026")');
  });

  it("uses the shared metadata helper in public route files", () => {
    const files = [
      join(process.cwd(), "app", "tools", "page.tsx"),
      join(process.cwd(), "app", "tools", "[slug]", "page.tsx"),
      join(process.cwd(), "app", "category", "[slug]", "page.tsx"),
      join(process.cwd(), "app", "best", "[slug]", "page.tsx"),
      join(process.cwd(), "app", "compare", "[slug]", "page.tsx"),
      join(process.cwd(), "app", "alternatives", "[slug]", "page.tsx"),
      join(process.cwd(), "app", "pricing", "[slug]", "page.tsx"),
      join(process.cwd(), "app", "coupons", "[slug]", "page.tsx"),
      join(process.cwd(), "app", "blog", "page.tsx"),
      join(process.cwd(), "app", "blog", "[slug]", "page.tsx")
    ];

    for (const file of files) {
      const source = readFileSync(file, "utf8");
      expect(source).toContain("buildMetadata");
      expect(source).toContain("JsonLd");
    }
  });

  it("adds matching structured data to the homepage", () => {
    const source = readFileSync(join(process.cwd(), "app", "page.tsx"), "utf8");

    expect(source).toContain("buildWebPageJsonLd");
    expect(source).toContain("CollectionPage");
    expect(source).toContain("JsonLd");
  });

  it("defines baseline response security headers", () => {
    const source = readFileSync(join(process.cwd(), "next.config.ts"), "utf8");

    expect(source).toContain("X-Content-Type-Options");
    expect(source).toContain("X-Frame-Options");
    expect(source).toContain("Referrer-Policy");
    expect(source).toContain("Permissions-Policy");
  });
});
