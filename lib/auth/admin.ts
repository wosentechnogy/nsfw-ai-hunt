const ADMIN_ALLOWLIST = "ADMIN_ALLOWLIST";
export const ADMIN_ACCESS_TOKEN_COOKIE = "admin-access-token";
export const ADMIN_REFRESH_TOKEN_COOKIE = "admin-refresh-token";

export function parseAdminAllowlist(value: string | undefined) {
  return (value ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function isAllowedAdminUser(userId: string | null | undefined, allowlist: readonly string[]) {
  if (!userId) {
    return false;
  }

  return allowlist.includes(userId);
}

export function getAdminAllowlist(source: Record<string, string | undefined> = process.env) {
  return parseAdminAllowlist(source[ADMIN_ALLOWLIST]);
}
