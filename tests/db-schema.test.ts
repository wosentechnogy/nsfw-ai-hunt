import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const migrationPath = join(
  process.cwd(),
  "db",
  "migrations",
  "202606140001_initial_schema.sql"
);

function readMigration() {
  return readFileSync(migrationPath, "utf8").toLowerCase();
}

describe("initial database schema migration", () => {
  it("creates the required core tables", () => {
    const sql = readMigration();

    const tables = [
      "tools",
      "categories",
      "tool_categories",
      "comparisons",
      "alternative_pages",
      "affiliate_links",
      "blog_posts",
      "page_metrics",
      "outbound_clicks",
      "admin_audit_logs"
    ] as const;

    for (const table of tables) {
      expect(sql).toContain(`create table if not exists public.${table}`);
      expect(sql).toContain(`create trigger set_${table}_updated_at`);
    }
  });

  it("defines the shared status enums", () => {
    const sql = readMigration();

    expect(sql).toContain("create type public.tool_status");
    expect(sql).toContain("create type public.affiliate_status");
    expect(sql).toContain("create type public.pricing_model");
    expect(sql).toContain("create type public.content_status");
  });

  it("adds unique slug constraints and slug/status indexes", () => {
    const sql = readMigration();

    for (const table of ["tools", "categories", "comparisons", "blog_posts"] as const) {
      expect(sql).toContain(`constraint ${table}_slug_unique unique (slug)`);
      expect(sql).toContain(`create index if not exists ${table}_slug_idx`);
      expect(sql).toContain(`create index if not exists ${table}_status_idx`);
    }
  });

  it("keeps official and affiliate URLs separate", () => {
    const sql = readMigration();

    expect(sql).toContain("website_url text not null");
    expect(sql).toContain("affiliate_url text");
    expect(sql).toContain("create table if not exists public.affiliate_links");
    expect(sql).toContain("url text not null");
  });
});

