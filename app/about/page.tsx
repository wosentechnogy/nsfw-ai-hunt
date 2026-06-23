import type { Metadata } from "next";
import Link from "next/link";
import { BarChart3, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description:
    "Learn how NSFW AI Hunt compares adult AI tools as a software research directory, not an adult media site.",
  path: "/about"
});

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <Badge variant="secondary">Software research directory</Badge>
      <h1 className="mt-4 text-3xl font-semibold tracking-normal md:text-5xl">
        About NSFW AI Hunt
      </h1>
      <p className="mt-5 text-base leading-7 text-muted-foreground">
        NSFW AI Hunt helps adults compare AI companion, roleplay, chat, and image-capable tools by
        visible product data: features, pricing model, privacy signals, payment options, content
        restrictions, and last checked dates.
      </p>

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="rounded-md border bg-card p-5">
          <BarChart3 className="size-5 text-accent" aria-hidden="true" />
          <h2 className="mt-4 text-lg font-semibold">Data-first comparisons</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Rankings are built from structured seed fields and conservative editorial notes rather
            than explicit media, user uploads, or promotional claims.
          </p>
        </div>
        <div className="rounded-md border bg-card p-5">
          <ShieldCheck className="size-5 text-accent" aria-hidden="true" />
          <h2 className="mt-4 text-lg font-semibold">Clear safety boundary</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            This site is for adults 18+ and does not host explicit images, videos, comments,
            galleries, user uploads, deepfake workflows, or illegal content.
          </p>
        </div>
      </section>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button asChild>
          <Link href="/tools">Browse tools</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/affiliate-disclosure">Read disclosure</Link>
        </Button>
      </div>
    </article>
  );
}
