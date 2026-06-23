import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  GitCompare,
  ListChecks,
  Sparkles
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  directoryCategories,
  getCategoryItemListJsonLd,
  getCategoryPageData,
  getMoneyPageReview
} from "@/data/seed/tools";
import { buildMetadata } from "@/lib/seo/metadata";
import { buildBreadcrumbJsonLd } from "@/lib/seo/schema";

type CategoryPageParams = Promise<Readonly<{ slug: string }>>;

type CategoryPageProps = Readonly<{
  params: CategoryPageParams;
}>;

export function generateStaticParams() {
  return directoryCategories.map((category) => ({
    slug: category.slug
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = getCategoryPageData(slug);

  if (!data) {
    return buildMetadata({
      title: "Category not found",
      description: "Requested category page could not be found.",
      path: "/tools",
      index: false
    });
  }

  const title = `${data.category.label} Rankings and Comparison Table`;
  const description = `${data.category.description} Compare ranked tools, pricing models, NSFW support, related comparisons, and best-page links.`;

  return buildMetadata({
    title,
    description,
    path: `/category/${data.category.slug}`
  });
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const data = getCategoryPageData(slug);

  if (!data) {
    notFound();
  }

  const jsonLd = [
    getCategoryItemListJsonLd(data.category, data.tools),
    buildBreadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Tools", path: "/tools" },
      { name: data.category.label, path: `/category/${data.category.slug}` }
    ])
  ];
  const topTool = data.tools[0];
  const freeTool = data.tools.find((tool) => tool.hasFreePlan || tool.hasFreeTrial);
  const privacyTool = data.tools.find((tool) => tool.acceptsCrypto || tool.acceptsPaypal) ?? topTool;
  const richFeatureTool = data.tools.find((tool) => tool.supportsVoice || tool.supportsImageGeneration) ?? topTool;
  const review = getMoneyPageReview(`/category/${data.category.slug}`);

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

      <section className="grid gap-6 border-b pb-8 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="min-w-0">
          <Badge variant="secondary">Category ranking</Badge>
          <h1 className="mt-4 text-3xl font-semibold tracking-normal md:text-5xl">
            {data.category.label}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">
            {data.category.description} This page ranks visible seed tools by editor score and
            links into tool profiles, comparison pages, and best-of pages.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href={`/best/${data.category.slug}`}>
                Open best page
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href={`/tools?category=${data.category.slug}`}>Filter directory</Link>
            </Button>
          </div>
        </div>

        <aside className="rounded-md border bg-card p-5">
          <div className="flex items-center gap-2 text-sm font-medium">
            <BarChart3 className="size-4 text-accent" aria-hidden="true" />
            Category snapshot
          </div>
          <dl className="mt-4 grid gap-3 text-sm">
            <div className="flex items-center justify-between gap-3">
              <dt className="text-muted-foreground">Ranked tools</dt>
              <dd>{data.tools.length}</dd>
            </div>
            <div className="flex items-center justify-between gap-3">
              <dt className="text-muted-foreground">Top score</dt>
              <dd>{topTool?.editorScore?.toFixed(1) ?? "N/A"}</dd>
            </div>
            <div className="flex items-center justify-between gap-3">
              <dt className="text-muted-foreground">Best-of route</dt>
              <dd>/best/{data.category.slug}</dd>
            </div>
          </dl>
          <p className="mt-5 rounded-md bg-secondary p-3 text-xs leading-5 text-muted-foreground">
            ItemList schema mirrors the visible ranking rows. No explicit media is hosted on this
            category page.
          </p>
        </aside>
      </section>

      <section className="py-8">
        <div className="flex items-center gap-2 text-xs font-medium uppercase text-muted-foreground">
          <ListChecks className="size-4" aria-hidden="true" />
          Ranking table
        </div>
        <h2 className="mt-2 text-xl font-semibold">Ranking table</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
          Ranked tools include internal profile links, pricing model, NSFW support marker, free
          option signal, last checked date, and editor score.
        </p>
        <div className="mt-5 overflow-x-auto rounded-md border">
          <table className="w-full min-w-[780px] border-collapse text-sm">
            <thead className="bg-secondary text-left text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">Rank</th>
                <th className="px-4 py-3 font-medium">Tool</th>
                <th className="px-4 py-3 font-medium">Pricing</th>
                <th className="px-4 py-3 font-medium">NSFW support</th>
                <th className="px-4 py-3 font-medium">Free option</th>
                <th className="px-4 py-3 font-medium">Last checked</th>
                <th className="px-4 py-3 font-medium">Score</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {data.rankingRows.map((row) => (
                <tr key={row.tool.slug} className="bg-card">
                  <td className="px-4 py-4 text-muted-foreground">#{row.position}</td>
                  <td className="px-4 py-4 font-medium">
                    <Link href={row.toolHref} className="underline-offset-4 hover:underline">
                      {row.tool.name}
                    </Link>
                  </td>
                  <td className="px-4 py-4 text-muted-foreground">{row.pricing}</td>
                  <td className="px-4 py-4 text-muted-foreground">{row.nsfwSupport}</td>
                  <td className="px-4 py-4 text-muted-foreground">{row.freeOption}</td>
                  <td className="px-4 py-4 text-muted-foreground">{row.lastChecked}</td>
                  <td className="px-4 py-4 font-semibold">{row.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2 text-xs font-medium uppercase text-muted-foreground">
            <Sparkles className="size-4" aria-hidden="true" />
            Best by use case
          </div>
          <h2 className="mt-2 text-xl font-semibold">Best by use case</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {[
              { label: "Best overall", tool: topTool },
              { label: "Best free option", tool: freeTool },
              { label: "Best privacy signal", tool: privacyTool },
              { label: "Best richer feature set", tool: richFeatureTool }
            ].map((item) =>
              item.tool ? (
                <Link
                  key={item.label}
                  href={`/tools/${item.tool.slug}`}
                  className="rounded-md border bg-card p-4 transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <span className="text-xs text-muted-foreground">{item.label}</span>
                  <h3 className="mt-2 font-medium">{item.tool.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.tool.tagline}</p>
                </Link>
              ) : null
            )}
          </div>
        </div>

        <aside className="rounded-md border bg-card p-5">
          <div className="flex items-center gap-2 text-sm font-medium">
            <CheckCircle2 className="size-4 text-accent" aria-hidden="true" />
            Best pages
          </div>
          <div className="mt-4 grid gap-3">
            {data.bestPageLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md border bg-background p-3 text-sm transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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

      <section className="py-8" data-route-prefix="/compare/">
        <div className="flex items-center gap-2 text-xs font-medium uppercase text-muted-foreground">
          <GitCompare className="size-4" aria-hidden="true" />
          Related comparisons
        </div>
        <h2 className="mt-2 text-xl font-semibold">Related comparisons</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
          These links reserve the comparison routes that will be implemented in the comparison task.
        </p>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {data.comparisonLinks.map((link) => (
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
    </article>
  );
}
