import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const migrationPath = join(
  process.cwd(),
  "db",
  "migrations",
  "202606140001_initial_schema.sql"
);
const rlsMigrationPath = join(
  process.cwd(),
  "db",
  "migrations",
  "202606240001_enable_rls.sql"
);
const functionHardeningMigrationPath = join(
  process.cwd(),
  "db",
  "migrations",
  "202607100001_harden_public_function_privileges.sql"
);
const outboundClickAttributionMigrationPath = join(
  process.cwd(),
  "db",
  "migrations",
  "202607120001_add_outbound_click_source_path.sql"
);

function readMigration() {
  return readFileSync(migrationPath, "utf8").toLowerCase();
}

function readRlsMigration() {
  return readFileSync(rlsMigrationPath, "utf8").toLowerCase();
}

function readFunctionHardeningMigration() {
  return readFileSync(functionHardeningMigrationPath, "utf8").toLowerCase();
}

function readOutboundClickAttributionMigration() {
  return readFileSync(outboundClickAttributionMigrationPath, "utf8").toLowerCase();
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

  it("enables RLS for production Supabase tables before launch", () => {
    const sql = readRlsMigration();

    for (const table of [
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
    ] as const) {
      expect(sql).toContain(`alter table public.${table} enable row level security`);
    }

    expect(sql).toContain("server-only supabase service role client");
    expect(sql).toContain("validated server-side mutations");
  });

  it("hardens public functions reported by Supabase advisors", () => {
    const sql = readFunctionHardeningMigration();

    expect(sql).toContain("create or replace function public.set_updated_at()");
    expect(sql).toContain("set search_path = ''");
    expect(sql).toContain(
      "revoke execute on all functions in schema public from public, anon, authenticated"
    );
    expect(sql).toContain(
      "revoke execute on functions from public, anon, authenticated"
    );
  });

  it("stores a normalized source path for outbound click attribution", () => {
    const sql = readOutboundClickAttributionMigration();

    expect(sql).toContain("alter table public.outbound_clicks");
    expect(sql).toContain("add column if not exists source_path text");
    expect(sql).toContain("outbound_clicks_source_path_idx");
  });
});
