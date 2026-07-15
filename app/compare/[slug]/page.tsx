import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ExternalLink,
  GitCompare,
  ListChecks,
  Scale,
  ShieldCheck
} from "lucide-react";
import { TrackedOutboundLink } from "@/components/common/tracked-outbound-link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  getComparisonPageData,
  getComparisonPageSlugs,
  getMoneyPageReview,
  getComparisonWebPageJsonLd,
  type ComparisonTableRow
} from "@/data/seed/tools";
import { buildMetadata } from "@/lib/seo/metadata";
import { buildBreadcrumbJsonLd } from "@/lib/seo/schema";

type ComparisonPageParams = Promise<Readonly<{ slug: string }>>;

type ComparisonPageProps = Readonly<{
  params: ComparisonPageParams;
}>;

function ComparisonTable({
  title,
  rows
}: Readonly<{
  title: string;
  rows: readonly ComparisonTableRow[];
}>) {
  return (
    <section className="rounded-md border bg-card p-5">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="mt-4 overflow-x-auto rounded-md border">
        <table className="w-full min-w-[720px] border-collapse text-sm">
          <thead className="bg-secondary text-left text-xs uppercase text-muted-foreground">
            <tr>
              <th className="px-4 py-3 font-medium">Signal</th>
              <th className="px-4 py-3 font-medium">Tool A</th>
              <th className="px-4 py-3 font-medium">Tool B</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {rows.map((row) => (
              <tr key={row.label} className="bg-card">
                <th className="px-4 py-4 text-left font-medium">{row.label}</th>
                <td className="px-4 py-4 text-muted-foreground">{row.toolAValue}</td>
                <td className="px-4 py-4 text-muted-foreground">{row.toolBValue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export function generateStaticParams() {
  return getComparisonPageSlugs().map((slug) => ({
    slug
  }));
}

export async function generateMetadata({ params }: ComparisonPageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = getComparisonPageData(slug);

  if (!data) {
    return buildMetadata({
      title: "Comparison not found",
      description: "Requested comparison page could not be found.",
      path: "/tools",
      index: false
    });
  }

  return buildMetadata({
    title: `${data.title} Comparison`,
    description: data.description,
    path: `/compare/${data.slug}`,
    index: data.indexable
  });
}

export default async function ComparisonPage({ params }: ComparisonPageProps) {
  const { slug } = await params;
  const data = getComparisonPageData(slug);

  if (!data) {
    notFound();
  }

  const jsonLd = [
    getComparisonWebPageJsonLd(data),
    buildBreadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: data.title, path: `/compare/${data.slug}` }
    ])
  ];
  const toolACTAHref = `/go/${data.toolA.slug}`;
  const toolBCTAHref = `/go/${data.toolB.slug}`;
  const review = getMoneyPageReview(`/compare/${data.slug}`);

  return (
    <article className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-10">
      {/* application/ld+json is emitted through the shared JsonLd component. */}
      <JsonLd data={jsonLd} />

      <div className="mb-6">
        <Button asChild variant="ghost" size="sm">
          <Link href="/tools">
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back to directory
          </Link>
        </Button>
      </div>

      <section className="grid gap-6 border-b pb-8 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="min-w-0">
          <Badge variant="secondary">Comparison page</Badge>
          <h1 className="mt-4 text-3xl font-semibold tracking-normal md:text-5xl">{data.title}</h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">
            {data.description}
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <TrackedOutboundLink href={toolACTAHref}>
                Visit {data.toolA.name}
                <ExternalLink className="size-4" aria-hidden="true" />
              </TrackedOutboundLink>
            </Button>
            <Button asChild variant="outline" size="lg">
              <TrackedOutboundLink href={toolBCTAHref}>
                Visit {data.toolB.name}
                <ExternalLink className="size-4" aria-hidden="true" />
              </TrackedOutboundLink>
            </Button>
          </div>
        </div>

        <aside className="rounded-md border bg-card p-5">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Scale className="size-4 text-accent" aria-hidden="true" />
            Verdict
          </div>
          <p className="mt-4 text-sm leading-6 text-muted-foreground">{data.verdict}</p>
          {!data.indexable ? (
            <p className="mt-4 rounded-md bg-secondary p-3 text-xs leading-5 text-muted-foreground">
              This comparison stays noindex until both tools have stronger pricing and feature data.
            </p>
          ) : null}
        </aside>
      </section>

      <section className="grid gap-6 py-8 lg:grid-cols-2">
        {[data.toolA, data.toolB].map((tool) => (
          <section key={tool.slug} className="rounded-md border bg-card p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold">{tool.name}</h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{tool.tagline}</p>
              </div>
              <Button asChild size="sm" variant="outline">
                <Link href={tool.href}>Profile</Link>
              </Button>
            </div>
          </section>
        ))}
      </section>

      <section className="grid gap-6">
        <ComparisonTable title="Feature comparison" rows={data.featureRows} />
        <ComparisonTable title="Pricing comparison" rows={data.pricingRows} />
      </section>

      <section className="py-8">
        <div className="flex items-center gap-2 text-xs font-medium uppercase text-muted-foreground">
          <ShieldCheck className="size-4" aria-hidden="true" />
          Best for
        </div>
        <h2 className="mt-2 text-xl font-semibold">Best for</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {data.bestForRows.map((row) => (
            <section key={row.label} className="rounded-md border bg-card p-5">
              <h3 className="font-medium">{row.label}</h3>
              <p className="mt-3 text-lg font-semibold">{row.winner}</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{row.rationale}</p>
            </section>
          ))}
        </div>
      </section>

      <section className="py-8">
        <div className="flex items-center gap-2 text-xs font-medium uppercase text-muted-foreground">
          <ListChecks className="size-4" aria-hidden="true" />
          Alternatives
        </div>
        <h2 className="mt-2 text-xl font-semibold">Alternatives</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {data.alternativeLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md border bg-card p-4 transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span className="font-medium">{link.title}</span>
              <span className="mt-2 block text-sm leading-6 text-muted-foreground">
                {link.description}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {review ? (
        <section className="rounded-md border bg-card p-5">
          <h2 className="text-sm font-semibold">Claim check</h2>
          <p className="mt-2 text-xs uppercase tracking-normal text-muted-foreground">
            Reviewed {review.reviewedOn}
          </p>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-muted-foreground">
            {review.claimChecks.map((check) => (
              <li key={check} className="flex gap-2">
                <ShieldCheck className="mt-1 size-4 shrink-0 text-accent" aria-hidden="true" />
                <span>{check}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="rounded-md border bg-secondary p-5">
        <div className="flex items-center gap-2 text-sm font-medium">
          <GitCompare className="size-4 text-accent" aria-hidden="true" />
          Comparison intent
        </div>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          This route is designed for tool-vs-tool decision searches. It stays focused on visible
          product data and does not host explicit media.
        </p>
      </section>
    </article>
  );
}
