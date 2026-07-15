import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarCheck, ExternalLink } from "lucide-react";
import { TrackedOutboundLink } from "@/components/common/tracked-outbound-link";
import { JsonLd } from "@/components/seo/JsonLd";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  getMoneyPageReview,
  getPricingPageData,
  getPricingPageSlugs,
  isPricingPageIndexable
} from "@/data/seed/tools";
import { buildMetadata } from "@/lib/seo/metadata";
import { buildBreadcrumbJsonLd, buildWebPageJsonLd } from "@/lib/seo/schema";

type PricingPageParams = Promise<Readonly<{ slug: string }>>;

type PricingPageProps = Readonly<{
  params: PricingPageParams;
}>;

export function generateStaticParams() {
  return getPricingPageSlugs().map((slug) => ({
    slug
  }));
}

export async function generateMetadata({ params }: PricingPageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = getPricingPageData(slug);

  if (!data) {
    return buildMetadata({
      title: "Pricing page not found",
      description: "Requested pricing page could not be found.",
      path: "/tools",
      index: false
    });
  }

  const title = `${data.tool.name} Pricing`;
  const description = `Pricing summary for ${data.tool.name}, including free path, payment signals, and last checked date.`;

  return buildMetadata({
    title,
    description,
    path: `/pricing/${data.tool.slug}`,
    index: isPricingPageIndexable(data)
  });
}

export default async function PricingPage({ params }: PricingPageProps) {
  const { slug } = await params;
  const data = getPricingPageData(slug);

  if (!data) {
    notFound();
  }

  const title = `${data.tool.name} Pricing`;
  const description = `Pricing summary for ${data.tool.name}, including free path, payment signals, and last checked date.`;
  const jsonLd = [
    buildWebPageJsonLd({
      title,
      description,
      path: `/pricing/${data.tool.slug}`
    }),
    buildBreadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Tools", path: "/tools" },
      { name: title, path: `/pricing/${data.tool.slug}` }
    ])
  ];
  const review = getMoneyPageReview(`/pricing/${data.tool.slug}`);

  return (
    <article className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:py-10">
      <JsonLd data={jsonLd} />

      <div className="mb-6">
        <Button asChild variant="ghost" size="sm">
          <Link href="/tools">
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back to directory
          </Link>
        </Button>
      </div>

      <section className="grid gap-6 border-b pb-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="min-w-0">
          <Badge variant="secondary">Pricing page</Badge>
          <h1 className="mt-4 text-3xl font-semibold tracking-normal md:text-5xl">{title}</h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">
            This page keeps the pricing snapshot tied to structured seed data rather than unverified
            deal claims.
          </p>
          <div className="mt-6">
            <Button asChild size="lg">
              <TrackedOutboundLink href={`/go/${data.tool.slug}`}>
                Visit pricing path
                <ExternalLink className="size-4" aria-hidden="true" />
              </TrackedOutboundLink>
            </Button>
          </div>
        </div>

        <aside className="rounded-md border bg-card p-5">
          <div className="flex items-center gap-2 text-sm font-medium">
            <CalendarCheck className="size-4 text-accent" aria-hidden="true" />
            Last checked
          </div>
          <p className="mt-4 text-sm leading-6 text-muted-foreground">{data.lastChecked}</p>
        </aside>
      </section>

      <section className="py-8">
        <div className="overflow-x-auto rounded-md border">
          <table className="w-full min-w-[640px] border-collapse text-sm">
            <tbody className="divide-y">
              {data.rows.map((row) => (
                <tr key={row.label} className="bg-card">
                  <th className="w-56 px-4 py-4 text-left font-medium">{row.label}</th>
                  <td className="px-4 py-4 text-muted-foreground">{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
                <CalendarCheck className="mt-1 size-4 shrink-0 text-accent" aria-hidden="true" />
                <span>{check}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </article>
  );
}
