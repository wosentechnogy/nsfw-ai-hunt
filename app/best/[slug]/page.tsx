import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  HelpCircle,
  ListChecks,
  Scale,
  ShieldCheck
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  bestPageConfigs,
  getBestItemListJsonLd,
  getBestPageData,
  getMoneyPageReview
} from "@/data/seed/tools";
import { buildMetadata } from "@/lib/seo/metadata";
import { buildBreadcrumbJsonLd } from "@/lib/seo/schema";

type BestPageParams = Promise<Readonly<{ slug: string }>>;

type BestPageProps = Readonly<{
  params: BestPageParams;
}>;

export function generateStaticParams() {
  return bestPageConfigs.map((config) => ({
    slug: config.slug
  }));
}

export async function generateMetadata({ params }: BestPageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = getBestPageData(slug);

  if (!data) {
    return buildMetadata({
      title: "Best page not found",
      description: "Requested best-of page could not be found.",
      path: "/tools",
      index: false
    });
  }

  return buildMetadata({
    title: data.config.seoTitle,
    description: data.config.seoDescription,
    path: `/best/${data.config.slug}`,
    index: data.rankingRows.length >= 3
  });
}

export default async function BestPage({ params }: BestPageProps) {
  const { slug } = await params;
  const data = getBestPageData(slug);

  if (!data) {
    notFound();
  }

  const jsonLd = [
    getBestItemListJsonLd(data),
    buildBreadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: data.config.title, path: `/best/${data.config.slug}` }
    ])
  ];
  const topRow = data.rankingRows[0];
  const topPickHref = topRow ? `/go/${topRow.tool.slug}` : undefined;
  const review = getMoneyPageReview(`/best/${data.config.slug}`);

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

      <section className="grid gap-6 border-b pb-8 lg:grid-cols-[minmax(0,1fr)_380px]">
        <div className="min-w-0">
          <Badge variant="secondary">Best-of ranking</Badge>
          <h1 className="mt-4 text-3xl font-semibold tracking-normal md:text-5xl">
            {data.config.title}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">
            {data.config.description} The table below keeps recommendations tied to visible tool
            records, pricing models, policy notes, privacy signals, and last checked dates.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            {topRow ? (
              <Button asChild size="lg">
                <Link href={topPickHref ?? topRow.ctaHref}>
                  Visit top pick
                  <ExternalLink className="size-4" aria-hidden="true" />
                </Link>
              </Button>
            ) : null}
            <Button asChild variant="outline" size="lg">
              <Link href="/tools">
                Browse all tools
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>

        <aside className="rounded-md border bg-card p-5">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Scale className="size-4 text-accent" aria-hidden="true" />
            Quick recommendation table
          </div>
          <dl className="mt-4 grid gap-3 text-sm">
            <div className="flex items-center justify-between gap-3">
              <dt className="text-muted-foreground">Ranked tools</dt>
              <dd>{data.rankingRows.length}</dd>
            </div>
            <div className="flex items-center justify-between gap-3">
              <dt className="text-muted-foreground">Top pick</dt>
              <dd>{topRow?.tool.name ?? "Not enough data"}</dd>
            </div>
            <div className="flex items-center justify-between gap-3">
              <dt className="text-muted-foreground">Intent</dt>
              <dd>{data.config.useCase}</dd>
            </div>
          </dl>
          <p className="mt-5 rounded-md bg-secondary p-3 text-xs leading-5 text-muted-foreground">
            ItemList schema mirrors visible recommendations. No explicit media or user uploads are
            part of this page.
          </p>
        </aside>
      </section>

      <section className="py-8">
        <div className="flex items-center gap-2 text-xs font-medium uppercase text-muted-foreground">
          <ListChecks className="size-4" aria-hidden="true" />
          Ranked recommendations
        </div>
        <h2 className="mt-2 text-xl font-semibold">Ranked recommendations</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
          Each row shows the reason a tool appears on this list, its pricing model, free option,
          privacy signal, freshness date, and a tracked outbound CTA.
        </p>
        <div className="mt-5 overflow-x-auto rounded-md border">
          <table className="w-full min-w-[900px] border-collapse text-sm">
            <thead className="bg-secondary text-left text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">Rank</th>
                <th className="px-4 py-3 font-medium">Tool</th>
                <th className="px-4 py-3 font-medium">Best for</th>
                <th className="px-4 py-3 font-medium">Pricing</th>
                <th className="px-4 py-3 font-medium">Free option</th>
                <th className="px-4 py-3 font-medium">Privacy signal</th>
                <th className="px-4 py-3 font-medium">Last checked</th>
                <th className="px-4 py-3 font-medium">Score</th>
                <th className="px-4 py-3 font-medium">CTA</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {data.rankingRows.map((row) => (
                <tr key={row.tool.slug} className="bg-card">
                  <td className="px-4 py-4 text-muted-foreground">#{row.position}</td>
                  <td className="px-4 py-4">
                    <Link href={row.toolHref} className="font-medium underline-offset-4 hover:underline">
                      {row.tool.name}
                    </Link>
                    <p className="mt-2 max-w-md text-xs leading-5 text-muted-foreground">
                      {row.recommendation}
                    </p>
                  </td>
                  <td className="px-4 py-4 text-muted-foreground">{row.bestFor}</td>
                  <td className="px-4 py-4 text-muted-foreground">{row.pricing}</td>
                  <td className="px-4 py-4 text-muted-foreground">{row.freeOption}</td>
                  <td className="px-4 py-4 text-muted-foreground">{row.privacySignal}</td>
                  <td className="px-4 py-4 text-muted-foreground">{row.lastChecked}</td>
                  <td className="px-4 py-4 font-semibold">{row.score}</td>
                  <td className="px-4 py-4">
                    <Button asChild size="sm">
                      <Link href={row.ctaHref}>
                        Visit
                        <ExternalLink className="size-4" aria-hidden="true" />
                      </Link>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium uppercase text-muted-foreground">
            <ShieldCheck className="size-4" aria-hidden="true" />
            Methodology
          </div>
          <h2 className="mt-2 text-xl font-semibold">Methodology</h2>
          <div className="mt-5 grid gap-3">
            {data.methodology.map((item) => (
              <div key={item} className="flex gap-3 rounded-md border bg-card p-4">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
                <p className="text-sm leading-6 text-muted-foreground">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <aside className="rounded-md border bg-card p-5">
          <div className="flex items-center gap-2 text-sm font-medium">
            <CheckCircle2 className="size-4 text-accent" aria-hidden="true" />
            Related links
          </div>
          <div className="mt-4 grid gap-4">
            {data.relatedLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="border-b pb-4 text-sm last:border-b-0 last:pb-0 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span className="font-medium">{link.title}</span>
                <span className="mt-2 block leading-5 text-muted-foreground">{link.description}</span>
              </Link>
            ))}
          </div>
        </aside>
      </section>

      {review ? (
        <section className="mt-8 rounded-md border bg-card p-5">
          <h2 className="text-sm font-semibold">Claim check</h2>
          <p className="mt-2 text-xs uppercase tracking-normal text-muted-foreground">
            Reviewed {review.reviewedOn}
          </p>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-muted-foreground">
            {review.claimChecks.map((check) => (
              <li key={check} className="flex gap-2">
                <CheckCircle2 className="mt-1 size-4 shrink-0 text-accent" aria-hidden="true" />
                <span>{check}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="py-8">
        <div className="flex items-center gap-2 text-xs font-medium uppercase text-muted-foreground">
          <HelpCircle className="size-4" aria-hidden="true" />
          FAQ
        </div>
        <h2 className="mt-2 text-xl font-semibold">FAQ</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {data.faq.map((item) => (
            <section key={item.question} className="rounded-md border bg-card p-5">
              <h3 className="font-medium">{item.question}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.answer}</p>
            </section>
          ))}
        </div>
      </section>

      <section className="rounded-md border bg-secondary p-5">
        <h2 className="text-sm font-semibold">Affiliate disclosure</h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">{data.disclosure}</p>
      </section>
    </article>
  );
}
