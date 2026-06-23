"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import {
  ADMIN_ACCESS_TOKEN_COOKIE,
  ADMIN_REFRESH_TOKEN_COOKIE,
  getAdminAllowlist,
  isAllowedAdminUser
} from "@/lib/auth/admin";

export async function signInAction(formData: FormData) {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const supabase = createServerSupabaseClient();

  const result = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (result.error || !result.data.session || !result.data.user) {
    redirect("/admin/login");
  }

  const allowlist = getAdminAllowlist();

  if (!isAllowedAdminUser(result.data.user.id, allowlist)) {
    await supabase.auth.signOut();
    redirect("/admin/login");
  }

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_ACCESS_TOKEN_COOKIE, result.data.session.access_token, {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/"
  });
  cookieStore.set(ADMIN_REFRESH_TOKEN_COOKIE, result.data.session.refresh_token, {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/"
  });

  redirect("/admin");
}

export async function signOutAction() {
  const supabase = createServerSupabaseClient();
  await supabase.auth.signOut();

  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_ACCESS_TOKEN_COOKIE);
  cookieStore.delete(ADMIN_REFRESH_TOKEN_COOKIE);

  redirect("/admin/login");
}
