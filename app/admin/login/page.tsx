import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { signInAction } from "@/app/admin/actions";

export const metadata: Metadata = {
  title: "Admin login",
  description: "Owner-only login page for the NSFW AI Hunt admin surface.",
  robots: {
    index: false,
    follow: false
  }
};

export default function AdminLoginPage() {
  return (
    <article className="mx-auto max-w-md px-4 py-10 sm:px-6">
      <section className="rounded-md border bg-card p-6">
        <h1 className="text-2xl font-semibold tracking-normal">Admin login</h1>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          Owner-only access for tool, category, affiliate, and content operations.
        </p>

        <form action={signInAction} className="mt-6 grid gap-4">
          <label className="grid gap-2 text-sm">
            <span>Email</span>
            <input
              type="email"
              name="email"
              className="rounded-md border bg-background px-3 py-2 outline-none"
              placeholder="owner@nsfwaihunt.com"
            />
          </label>

          <label className="grid gap-2 text-sm">
            <span>Password</span>
            <input
              type="password"
              name="password"
              className="rounded-md border bg-background px-3 py-2 outline-none"
              placeholder="••••••••"
            />
          </label>

          <Button type="submit">Sign in</Button>
        </form>
      </section>
    </article>
  );
}
