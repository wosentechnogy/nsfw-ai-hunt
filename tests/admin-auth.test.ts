import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  isAllowedAdminUser,
  parseAdminAllowlist
} from "@/lib/auth/admin";

describe("admin auth helpers", () => {
  it("parses a comma-separated allowlist and matches exact admin user ids", () => {
    expect(parseAdminAllowlist("user-a, user-b ,, user-c")).toEqual([
      "user-a",
      "user-b",
      "user-c"
    ]);

    expect(isAllowedAdminUser("user-b", ["user-a", "user-b"])).toBe(true);
    expect(isAllowedAdminUser("user-z", ["user-a", "user-b"])).toBe(false);
  });
});

describe("admin route source", () => {
  it("defines login and protected admin entry points that redirect anonymous users and support sign-in/out", () => {
    const adminSource = readFileSync(join(process.cwd(), "app", "admin", "page.tsx"), "utf8");
    const loginSource = readFileSync(join(process.cwd(), "app", "admin", "login", "page.tsx"), "utf8");
    const actionsSource = readFileSync(join(process.cwd(), "app", "admin", "actions.ts"), "utf8");
    const authSource = readFileSync(join(process.cwd(), "lib", "auth", "admin.ts"), "utf8");

    expect(adminSource).toContain("redirect");
    expect(adminSource).toContain("/admin/login");
    expect(adminSource).toContain("Owner-only admin");
    expect(adminSource).toContain("Sign out");

    expect(loginSource).toContain("Admin login");
    expect(loginSource).toContain("Email");
    expect(loginSource).toContain("Password");

    expect(actionsSource).toContain("signInWithPassword");
    expect(actionsSource).toContain("signOut");
    expect(actionsSource).toContain("cookies");

    expect(authSource).toContain("ADMIN_ALLOWLIST");
    expect(authSource).toContain("ADMIN_ACCESS_TOKEN_COOKIE");
    expect(authSource).toContain("parseAdminAllowlist");
    expect(authSource).toContain("isAllowedAdminUser");
  });
});
