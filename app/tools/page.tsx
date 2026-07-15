import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowUpDown,
  BadgeCheck,
  CalendarCheck,
  CheckCircle2,
  ExternalLink,
  Filter,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  X
} from "lucide-react";
import { TrackedOutboundLink } from "@/components/common/tracked-outbound-link";
import { JsonLd } from "@/components/seo/JsonLd";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  directoryCategories,
  directoryFeatureFilters,
  directoryPricingFilters,
  directorySortOptions,
  formatPricingModel,
  getCategoryLabel,
  getToolDirectoryResults
} from "@/data/seed/tools";
import { buildMetadata } from "@/lib/seo/metadata";
import { buildBreadcrumbJsonLd, buildWebPageJsonLd } from "@/lib/seo/schema";
import type { ToolRecord } from "@/lib/validation";

const toolsPageTitle = "Adult AI Tools Directory";
const toolsPageDescription =
  "Search and filter adult AI tools by category, pricing model, free trial, voice, image support, privacy signals, and last checked date.";

export const metadata = buildMetadata({
  title: toolsPageTitle,
  description: toolsPageDescription,
  path: "/tools"
});

const toolsPageJsonLd = [
  buildWebPageJsonLd({
    title: toolsPageTitle,
    description: toolsPageDescription,
    path: "/tools",
    type: "CollectionPage"
  }),
  buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Tools", path: "/tools" }
  ])
];

type SearchParams = Promise<
  Readonly<{
    q?: string | string[];
    category?: string | string[];
    feature?: string | string[];
    pricing?: string | string[];
    sort?: string | string[];
  }>
>;

type ToolsPageProps = Readonly<{
  searchParams?: SearchParams;
}>;

function getSingleParam(value: string | string[] | undefined) {
  if (Array.isArray(value)) {
    return value[0] ?? "";
  }

  return value ?? "";
}

function createFilterHref(params: {
  q: string;
  category: string;
  feature: string;
  pricing: string;
  sort: string;
  patch: Partial<Record<"q" | "category" | "feature" | "pricing" | "sort", string>>;
}) {
  const searchParams = new URLSearchParams();
  const values = {
    q: params.q,
    category: params.category,
    feature: params.feature,
    pricing: params.pricing,
    sort: params.sort,
    ...params.patch
  };

  for (const [key, value] of Object.entries(values)) {
    if (value) {
      searchParams.set(key, value);
    }
  }

  const queryString = searchParams.toString();
  return queryString ? `/tools?${queryString}` : "/tools";
}

function FeatureLabel({ enabled, children }: Readonly<{ enabled: boolean; children: ReactNode }>) {
  return (
    <span className="inline-flex items-center gap-1 rounded-sm bg-secondary px-2 py-1 text-xs text-muted-foreground">
      {enabled ? (
        <CheckCircle2 className="size-3.5 text-accent" aria-hidden="true" />
      ) : (
        <X className="size-3.5" aria-hidden="true" />
      )}
      {children}
    </span>
  );
}

function ToolCard({ tool }: Readonly<{ tool: ToolRecord }>) {
  const categories = tool.categorySlugs.map((slug) => getCategoryLabel(slug));

  return (
    <article className="flex min-h-64 flex-col rounded-md border bg-card p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-lg font-semibold tracking-normal">{tool.name}</h2>
            {tool.isSponsored ? <Badge variant="outline">Sponsored</Badge> : null}
            {tool.isFeatured ? <Badge>Featured</Badge> : null}
          </div>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">{tool.tagline}</p>
        </div>
        <div className="shrink-0 rounded-md border bg-background px-2.5 py-1.5 text-sm font-semibold">
          {tool.editorScore?.toFixed(1) ?? "N/A"}
        </div>
      </div>

      <p className="mt-4 line-clamp-3 text-sm leading-6 text-muted-foreground">{tool.description}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {categories.map((category) => (
          <Badge key={category} variant="secondary">
            {category}
          </Badge>
        ))}
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        <FeatureLabel enabled={tool.supportsNsfwChat}>NSFW chat</FeatureLabel>
        <FeatureLabel enabled={tool.hasFreePlan || tool.hasFreeTrial}>Free option</FeatureLabel>
        <FeatureLabel enabled={tool.supportsImageGeneration}>Image support</FeatureLabel>
        <FeatureLabel enabled={tool.supportsVoice}>Voice</FeatureLabel>
      </div>

      <div className="mt-5 grid gap-3 border-t pt-4 text-xs text-muted-foreground sm:grid-cols-3">
        <span>
          <span className="block text-foreground">Pricing</span>
          {formatPricingModel(tool.pricingModel)}
        </span>
        <span>
          <span className="block text-foreground">NSFW support</span>
          {tool.supportsNsfwChat ? "Supported" : "Policy tracked"}
        </span>
        <span>
          <span className="block text-foreground">Last checked</span>
          {tool.lastCheckedAt}
        </span>
      </div>

      <div className="mt-auto flex flex-col gap-2 pt-5 sm:flex-row">
        <Button asChild className="w-full sm:w-auto">
          <Link href={`/tools/${tool.slug}`}>View profile</Link>
        </Button>
        <Button asChild variant="outline" className="w-full sm:w-auto">
          <TrackedOutboundLink href={`/go/${tool.slug}`}>
            Visit tool
            <ExternalLink className="size-4" aria-hidden="true" />
          </TrackedOutboundLink>
        </Button>
      </div>
    </article>
  );
}

export default async function ToolsPage({ searchParams }: ToolsPageProps) {
  const params = (await searchParams) ?? {};
  const q = getSingleParam(params.q);
  const category = getSingleParam(params.category);
  const feature = getSingleParam(params.feature);
  const pricing = getSingleParam(params.pricing);
  const sort = getSingleParam(params.sort);
  const results = getToolDirectoryResults({ q, category, feature, pricing, sort });
  const active = results.active;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-10">
      <JsonLd data={toolsPageJsonLd} />

      <section className="border-b pb-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <Badge variant="secondary">18+ software directory</Badge>
            <h1 className="mt-4 text-3xl font-semibold tracking-normal md:text-4xl">
              Adult AI tools directory
            </h1>
            <p className="mt-3 text-sm leading-6 text-muted-foreground md:text-base">
              Search and filter adult AI software by category, pricing, free options, voice, image
              support, payment signals, and visible update freshness.
            </p>
          </div>
          <div className="grid gap-2 rounded-md border bg-card p-4 text-sm sm:grid-cols-3 lg:min-w-[420px]">
            <span>
              <span className="block text-xs text-muted-foreground">Tools</span>
              {results.tools.length} shown
            </span>
            <span>
              <span className="block text-xs text-muted-foreground">Dataset</span>
              v0 seed
            </span>
            <span>
              <span className="block text-xs text-muted-foreground">Media</span>
              No explicit assets
            </span>
          </div>
        </div>
      </section>

      <section className="grid gap-6 py-6 lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="space-y-4">
          <form action="/tools" className="rounded-md border bg-card p-4">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Search className="size-4 text-accent" aria-hidden="true" />
              Search
            </div>
            <label className="mt-3 block text-xs text-muted-foreground" htmlFor="tool-search">
              Tool name, feature, or use case
            </label>
            <input
              id="tool-search"
              name="q"
              defaultValue={active.q}
              className="mt-2 w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
              placeholder="Search tools"
            />
            <input type="hidden" name="category" value={active.category} />
            <input type="hidden" name="feature" value={active.feature} />
            <input type="hidden" name="pricing" value={active.pricing} />
            <input type="hidden" name="sort" value={active.sort} />
            <Button type="submit" className="mt-3 w-full">
              Apply search
            </Button>
          </form>

          <div className="rounded-md border bg-card p-4">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Filter className="size-4 text-accent" aria-hidden="true" />
              Category filters
            </div>
            <div className="mt-3 grid gap-2">
              <Button
                asChild
                variant={active.category ? "ghost" : "secondary"}
                size="sm"
                className="justify-start"
              >
                <Link
                  href={createFilterHref({
                    ...active,
                    patch: { category: "" }
                  })}
                >
                  All categories
                </Link>
              </Button>
              {directoryCategories.map((item) => (
                <Button
                  key={item.slug}
                  asChild
                  variant={active.category === item.slug ? "secondary" : "ghost"}
                  size="sm"
                  className="h-auto justify-start whitespace-normal py-2 text-left"
                >
                  <Link
                    href={createFilterHref({
                      ...active,
                      patch: { category: active.category === item.slug ? "" : item.slug }
                    })}
                  >
                    {item.label}
                  </Link>
                </Button>
              ))}
            </div>
          </div>

          <div className="rounded-md border bg-card p-4">
            <div className="flex items-center gap-2 text-sm font-medium">
              <SlidersHorizontal className="size-4 text-accent" aria-hidden="true" />
              Feature filters
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {directoryFeatureFilters.map((item) => (
                <Link
                  key={item.slug}
                  href={createFilterHref({
                    ...active,
                    patch: { feature: active.feature === item.slug ? "" : item.slug }
                  })}
                  className={
                    active.feature === item.slug
                      ? "rounded-md border border-primary bg-primary px-3 py-2 text-xs font-medium text-primary-foreground"
                      : "rounded-md border bg-background px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary"
                  }
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-md border bg-card p-4">
            <div className="flex items-center gap-2 text-sm font-medium">
              <BadgeCheck className="size-4 text-accent" aria-hidden="true" />
              Pricing model
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {directoryPricingFilters.map((item) => (
                <Link
                  key={item.value}
                  href={createFilterHref({
                    ...active,
                    patch: { pricing: active.pricing === item.value ? "" : item.value }
                  })}
                  className={
                    active.pricing === item.value
                      ? "rounded-md border border-primary bg-primary px-3 py-2 text-xs font-medium text-primary-foreground"
                      : "rounded-md border bg-background px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary"
                  }
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </aside>

        <section className="min-w-0">
          <div className="flex flex-col gap-3 rounded-md border bg-card p-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-medium">{results.tools.length} matching tools</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Filters are URL-based so the directory remains shareable and crawlable.
              </p>
            </div>
            <form action="/tools" className="flex min-w-0 flex-col gap-2 sm:flex-row sm:items-center">
              <input type="hidden" name="q" value={active.q} />
              <input type="hidden" name="category" value={active.category} />
              <input type="hidden" name="feature" value={active.feature} />
              <input type="hidden" name="pricing" value={active.pricing} />
              <label className="inline-flex items-center gap-2 text-xs text-muted-foreground" htmlFor="sort">
                <ArrowUpDown className="size-4" aria-hidden="true" />
                Sort by
              </label>
              <select
                id="sort"
                name="sort"
                defaultValue={active.sort}
                className="min-w-48 rounded-md border bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {directorySortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <Button type="submit" variant="outline">
                Sort
              </Button>
            </form>
          </div>

          {results.tools.length > 0 ? (
            <div className="mt-5 grid gap-4 xl:grid-cols-2">
              {results.tools.map((tool) => (
                <ToolCard key={tool.slug} tool={tool} />
              ))}
            </div>
          ) : (
            <div className="mt-5 rounded-md border bg-card p-8">
              <ShieldCheck className="size-6 text-accent" aria-hidden="true" />
              <h2 className="mt-4 text-lg font-semibold">No tools match these filters</h2>
              <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
                Remove one filter or browse all tools. The first seed set is intentionally small
                until the dedicated 100-tool data task adds the larger sourced catalog.
              </p>
              <Button asChild className="mt-5">
                <Link href="/tools">Clear filters</Link>
              </Button>
            </div>
          )}

          <div className="mt-6 rounded-md border bg-card p-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2 text-foreground">
              <CalendarCheck className="size-4 text-accent" aria-hidden="true" />
              Data freshness note
            </div>
            <p className="mt-2 leading-6">
              This v0 directory uses conservative seed records and visible last-checked dates. Full
              sourced coverage is scheduled for the seed-data task before launch.
            </p>
          </div>
        </section>
      </section>
    </div>
  );
}
