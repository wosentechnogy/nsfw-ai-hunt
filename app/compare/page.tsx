import type { Metadata } from "next";
import Link from "next/link";
import { GitCompare } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getIndexableComparisonPageSlugs, getComparisonPageData } from "@/data/seed/tools";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Compare Adult AI Tools",
  description:
    "Browse indexable adult AI tool comparison pages with side-by-side pricing, features, privacy signals, and policy notes.",
  path: "/compare"
});

export default function CompareIndexPage() {
  const comparisons = getIndexableComparisonPageSlugs()
    .map((slug) => getComparisonPageData(slug))
    .filter((data): data is NonNullable<typeof data> => Boolean(data))
    .slice(0, 24);

  return (
    <article className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <Badge variant="secondary">Comparison hub</Badge>
      <h1 className="mt-4 text-3xl font-semibold tracking-normal md:text-5xl">
        Compare adult AI tools
      </h1>
      <p className="mt-5 max-w-3xl text-base leading-7 text-muted-foreground">
        Browse side-by-side pages that compare adult AI software by pricing, feature coverage,
        privacy signals, policy notes, and tracked outbound CTA paths.
      </p>

      <section className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {comparisons.map((comparison) => (
          <Link
            key={comparison.slug}
            href={`/compare/${comparison.slug}`}
            className="rounded-md border bg-card p-5 transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <div className="flex items-center gap-2 text-sm font-medium">
              <GitCompare className="size-4 text-accent" aria-hidden="true" />
              {comparison.title}
            </div>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              {comparison.description}
            </p>
          </Link>
        ))}
      </section>

      <div className="mt-8">
        <Button asChild>
          <Link href="/tools">Find more tools</Link>
        </Button>
      </div>
    </article>
  );
}
