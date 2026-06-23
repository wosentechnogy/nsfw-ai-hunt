import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ExternalLink,
  GitCompare,
  ImageIcon,
  LockKeyhole,
  Sparkles
} from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  getAlternativePageData,
  getAlternativePageSlugs,
  getMoneyPageReview,
  isAlternativePageIndexable
} from "@/data/seed/tools";
import { buildMetadata } from "@/lib/seo/metadata";
import { buildBreadcrumbJsonLd, buildWebPageJsonLd } from "@/lib/seo/schema";

type AlternativePageParams = Promise<Readonly<{ slug: string }>>;

type AlternativePageProps = Readonly<{
  params: AlternativePageParams;
}>;

export function generateStaticParams() {
  return getAlternativePageSlugs().map((slug) => ({
    slug
  }));
}

export async function generateMetadata({ params }: AlternativePageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = getAlternativePageData(slug);

  if (!data) {
    return buildMetadata({
      title: "Alternatives page not found",
      description: "Requested alternatives page could not be found.",
      path: "/tools",
      index: false
    });
  }

  const title = `${data.baseTool.name} Alternatives`;
  const description = `Compare alternatives to ${data.baseTool.name} by pricing, privacy signals, feature coverage, and compare-route links.`;

  return buildMetadata({
    title,
    description,
    path: `/alternatives/${data.baseTool.slug}`,
    index: isAlternativePageIndexable(data)
  });
}

export default async function AlternativePage({ params }: AlternativePageProps) {
  const { slug } = await params;
  const data = getAlternativePageData(slug);

  if (!data) {
    notFound();
  }

  const bestSlices = [
    { title: "Best free alternative", row: data.bestFreeAlternative, icon: Sparkles },
    { title: "Best private alternative", row: data.bestPrivateAlternative, icon: LockKeyhole },
    { title: "Best image-support alternative", row: data.bestImageAlternative, icon: ImageIcon }
  ];
  const title = `${data.baseTool.name} Alternatives`;
  const description = `Compare alternatives to ${data.baseTool.name} by pricing, privacy signals, feature coverage, and compare-route links.`;
  const jsonLd = [
    buildWebPageJsonLd({
      title,
      description,
      path: `/alternatives/${data.baseTool.slug}`
    }),
    buildBreadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Tools", path: "/tools" },
      { name: title, path: `/alternatives/${data.baseTool.slug}` }
    ])
  ];
  const review = getMoneyPageReview(`/alternatives/${data.baseTool.slug}`);

  return (
    <article className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-10">
      <JsonLd data={jsonLd} />

      <div className="mb-6">
        <Button asChild variant="ghost" size="sm">
          <Link href="/tools">
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back to directory
          </Link>
        </Button>
      </div>

      <section className="grid gap-6 border-b pb-8 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="min-w-0">
          <Badge variant="secondary">Alternatives page</Badge>
          <h1 className="mt-4 text-3xl font-semibold tracking-normal md:text-5xl">{title}</h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">
            {data.reasonSummary}
          </p>
        </div>

        <aside className="rounded-md border bg-card p-5">
          <h2 className="text-sm font-medium">Why users switch</h2>
          <p className="mt-4 text-sm leading-6 text-muted-foreground">
            Buyers often switch when they want another plan model, a different free path, stronger
            payment/privacy signals, or a richer voice/image feature mix.
          </p>
        </aside>
      </section>

      <section className="py-8">
        <h2 className="text-xl font-semibold">Recommended alternatives</h2>
        <div className="mt-5 overflow-x-auto rounded-md border">
          <table className="w-full min-w-[860px] border-collapse text-sm">
            <thead className="bg-secondary text-left text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">Rank</th>
                <th className="px-4 py-3 font-medium">Tool</th>
                <th className="px-4 py-3 font-medium">Best for</th>
                <th className="px-4 py-3 font-medium">Pricing</th>
                <th className="px-4 py-3 font-medium">Privacy signal</th>
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
                    <p className="mt-2 text-xs leading-5 text-muted-foreground">{row.tool.tagline}</p>
                  </td>
                  <td className="px-4 py-4 text-muted-foreground">{row.bestFor}</td>
                  <td className="px-4 py-4 text-muted-foreground">{row.pricing}</td>
                  <td className="px-4 py-4 text-muted-foreground">{row.privacySignal}</td>
                  <td className="px-4 py-4 font-semibold">{row.score}</td>
                  <td className="px-4 py-4">
                    <Button asChild size="sm">
                      <Link href={`/go/${row.tool.slug}`}>
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

      <section className="grid gap-4 py-8 md:grid-cols-3">
        {bestSlices.map((slice) =>
          slice.row ? (
            <section key={slice.title} className="rounded-md border bg-card p-5">
              <div className="flex items-center gap-2 text-sm font-medium">
                <slice.icon className="size-4 text-accent" aria-hidden="true" />
                {slice.title}
              </div>
              <h3 className="mt-4 text-lg font-semibold">{slice.row.tool.name}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{slice.row.tool.tagline}</p>
              <div className="mt-4 flex gap-3">
                <Button asChild size="sm">
                  <Link href={`/go/${slice.row.tool.slug}`}>Visit</Link>
                </Button>
                <Button asChild size="sm" variant="outline">
                  <Link href={slice.row.toolHref}>Profile</Link>
                </Button>
              </div>
            </section>
          ) : null
        )}
      </section>

      <section className="py-8">
        <div className="flex items-center gap-2 text-xs font-medium uppercase text-muted-foreground">
          <GitCompare className="size-4" aria-hidden="true" />
          Comparison links
        </div>
        <h2 className="mt-2 text-xl font-semibold">Comparison links</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {data.comparisonLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href.startsWith("/compare/") ? link.href : `/compare/${link.href}`}
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
                <Sparkles className="mt-1 size-4 shrink-0 text-accent" aria-hidden="true" />
                <span>{check}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </article>
  );
}
