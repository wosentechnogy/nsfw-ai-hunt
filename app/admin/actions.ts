"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import {
  ADMIN_ACCESS_TOKEN_COOKIE,
  ADMIN_REFRESH_TOKEN_COOKIE,
  getAdminAllowlist,
  isAllowedAdminUser
} from "@/lib/auth/admin";

const adminSignInSchema = z.object({
  email: z.string().trim().email().max(320),
  password: z.string().min(8).max(256)
});

export async function signInAction(formData: FormData) {
  const input = adminSignInSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password")
  });

  if (!input.success) {
    redirect("/admin/login");
  }

  const { email, password } = input.data;
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
  const secureCookie = process.env.NODE_ENV === "production";
  cookieStore.set(ADMIN_ACCESS_TOKEN_COOKIE, result.data.session.access_token, {
    httpOnly: true,
    sameSite: "lax",
    secure: secureCookie,
    path: "/"
  });
  cookieStore.set(ADMIN_REFRESH_TOKEN_COOKIE, result.data.session.refresh_token, {
    httpOnly: true,
    sameSite: "lax",
    secure: secureCookie,
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
