import { describe, expect, it } from "vitest";
import { getClientEnv, getServerEnv } from "@/lib/env";

const validPublicEnv = {
  NEXT_PUBLIC_SITE_URL: "https://nsfwaihunt.com",
  NEXT_PUBLIC_SUPABASE_URL: "https://example.supabase.co",
  NEXT_PUBLIC_SUPABASE_ANON_KEY: "anon-key"
};

describe("environment validation", () => {
  it("returns only public keys for browser-safe env", () => {
    const env = getClientEnv({
      ...validPublicEnv,
      SUPABASE_SERVICE_ROLE_KEY: "server-secret"
    });

    expect(env).toEqual(validPublicEnv);
    expect("SUPABASE_SERVICE_ROLE_KEY" in env).toBe(false);
  });

  it("throws a clear error when required public Supabase env vars are missing", () => {
    expect(() =>
      getClientEnv({
        NEXT_PUBLIC_SITE_URL: "https://nsfwaihunt.com",
        NEXT_PUBLIC_SUPABASE_URL: "",
        NEXT_PUBLIC_SUPABASE_ANON_KEY: ""
      })
    ).toThrow("Invalid environment variables");
  });

  it("validates the server-only service role key separately", () => {
    const env = getServerEnv({
      ...validPublicEnv,
      SUPABASE_SERVICE_ROLE_KEY: "service-role-secret"
    });

    expect(env.SUPABASE_SERVICE_ROLE_KEY).toBe("service-role-secret");
  });
});

