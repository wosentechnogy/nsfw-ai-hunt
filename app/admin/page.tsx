import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { signOutAction } from "@/app/admin/actions";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import {
  ADMIN_ACCESS_TOKEN_COOKIE,
  getAdminAllowlist,
  isAllowedAdminUser
} from "@/lib/auth/admin";

export default async function AdminPage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ADMIN_ACCESS_TOKEN_COOKIE)?.value;
  const allowlist = getAdminAllowlist();

  if (!accessToken || allowlist.length === 0) {
    redirect("/admin/login");
  }

  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase.auth.getUser(accessToken);

  if (error || !isAllowedAdminUser(data.user?.id, allowlist)) {
    redirect("/admin/login");
  }

  return (
    <article className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-normal">Owner-only admin</h1>
      <p className="mt-4 text-muted-foreground">
        This route is reserved for authenticated admin users in the configured allowlist.
      </p>
      <div className="mt-6 flex gap-3">
        <Button asChild>
          <Link href="/admin/tools">Tool workspace</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/admin/commercial-readiness">Commercial readiness</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/admin/affiliate-applications">Affiliate applications</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/admin/analytics">Click report</Link>
        </Button>
        <form action={signOutAction}>
          <Button type="submit" variant="outline">
            Sign out
          </Button>
        </form>
      </div>
    </article>
  );
}
