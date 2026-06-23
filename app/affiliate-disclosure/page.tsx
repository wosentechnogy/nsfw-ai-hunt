import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Affiliate Disclosure",
  description:
    "Affiliate disclosure for NSFW AI Hunt, including tracked outbound links, ranking independence, and sponsored placement labeling.",
  path: "/affiliate-disclosure"
});

export default function AffiliateDisclosurePage() {
  return (
    <article className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <Badge variant="secondary">Affiliate disclosure</Badge>
      <h1 className="mt-4 text-3xl font-semibold tracking-normal md:text-5xl">
        Affiliate disclosure
      </h1>
      <p className="mt-5 text-base leading-7 text-muted-foreground">
        NSFW AI Hunt may earn a commission when visitors click tracked outbound links and purchase
        or sign up for a third-party tool. Official URLs and affiliate URLs should be stored
        separately, and outbound links may route through `/go/[toolSlug]` for click tracking.
      </p>

      <section className="mt-8 rounded-md border bg-card p-5">
        <h2 className="text-lg font-semibold">How rankings work</h2>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          Rankings should stay based on visible product data, editorial usefulness, pricing
          clarity, privacy signals, policy notes, and freshness. Sponsored placements must be
          labeled, and coupon claims should not be published unless verified.
        </p>
      </section>

      <section className="mt-5 rounded-md border bg-secondary p-5">
        <h2 className="text-lg font-semibold">Third-party responsibility</h2>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          Third-party tools control their own pricing, policies, content rules, and account terms.
          Users should review official pages before signing up or paying.
        </p>
      </section>

      <div className="mt-8">
        <Button asChild>
          <Link href="/tools">Compare tools</Link>
        </Button>
      </div>
    </article>
  );
}
