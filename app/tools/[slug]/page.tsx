import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CalendarCheck,
  CheckCircle2,
  ExternalLink,
  HelpCircle,
  ShieldCheck,
  Sparkles,
  TableProperties,
  XCircle
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  directoryTools,
  formatPricingModel,
  getCategoryLabel,
  getMoneyPageReview,
  getRelatedTools,
  getSoftwareApplicationJsonLd,
  getToolBySlug,
  getToolDetailSections,
  type DetailRow
} from "@/data/seed/tools";
import { buildMetadata } from "@/lib/seo/metadata";
import { buildBreadcrumbJsonLd } from "@/lib/seo/schema";
import type { ToolRecord } from "@/lib/validation";

type ToolPageParams = Promise<Readonly<{ slug: string }>>;

type ToolPageProps = Readonly<{
  params: ToolPageParams;
}>;

export function generateStaticParams() {
  return directoryTools.map((tool) => ({
    slug: tool.slug
  }));
}

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    return buildMetadata({
      title: "Tool not found",
      description: "Requested tool profile could not be found.",
      path: "/tools",
      index: false
    });
  }

  const title = `${tool.name} Review, Pricing, Features, and Policy Notes`;
  const description = `${tool.name} profile with verdict, pricing model, feature matrix, NSFW policy summary, privacy notes, alternatives, and last checked date.`;

  return buildMetadata({
    title,
    description,
    path: `/tools/${tool.slug}`,
    type: "article"
  });
}

function DataTable({ rows }: Readonly<{ rows: readonly DetailRow[] }>) {
  return (
    <div className="max-w-full overflow-x-auto rounded-md border">
      <table className="w-full min-w-[560px] border-collapse text-sm">
        <tbody className="divide-y">
          {rows.map((row) => (
            <tr key={row.label} className="bg-card">
              <th className="w-56 px-4 py-3 text-left font-medium text-foreground">{row.label}</th>
              <td className="px-4 py-3 text-muted-foreground">{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  children
}: Readonly<{ eyebrow: React.ReactNode; title: string; children?: React.ReactNode }>) {
  return (
    <div className="border-b pb-4">
      <div className="flex items-center gap-2 text-xs font-medium uppercase text-muted-foreground">
        {eyebrow}
      </div>
      <h2 className="mt-2 text-xl font-semibold tracking-normal">{title}</h2>
      {children ? <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">{children}</p> : null}
    </div>
  );
}

function PolicyPanel({
  title,
  text,
  icon
}: Readonly<{ title: string; text: string; icon: React.ReactNode }>) {
  return (
    <section className="rounded-md border bg-card p-5">
      <div className="flex items-center gap-2 text-sm font-medium">
        {icon}
        {title}
      </div>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">{text}</p>
    </section>
  );
}

function AlternativeCard({ tool }: Readonly<{ tool: ToolRecord }>) {
  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="block rounded-md border bg-card p-4 transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-medium">{tool.name}</h3>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">{tool.tagline}</p>
        </div>
        <span className="shrink-0 rounded-md border bg-background px-2 py-1 text-sm font-semibold">
          {tool.editorScore?.toFixed(1) ?? "N/A"}
        </span>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {tool.categorySlugs.slice(0, 2).map((slug) => (
          <Badge key={slug} variant="secondary">
            {getCategoryLabel(slug)}
          </Badge>
        ))}
      </div>
    </Link>
  );
}

export default async function ToolDetailPage({ params }: ToolPageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  const sections = getToolDetailSections(tool);
  const alternatives = getRelatedTools(tool, 3);
  const jsonLd = [
    getSoftwareApplicationJsonLd(tool),
    buildBreadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Tools", path: "/tools" },
      { name: tool.name, path: `/tools/${tool.slug}` }
    ])
  ];
  const categories = tool.categorySlugs.map((categorySlug) => getCategoryLabel(categorySlug));
  const review = getMoneyPageReview(`/tools/${tool.slug}`);

  return (
    <article className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-10">
      {/* application/ld+json is emitted through the shared JsonLd component. */}
      <JsonLd data={jsonLd} />

      <div className="mb-6">
        <Button asChild variant="ghost" size="sm">
          <Link href="/tools">
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back to tools
          </Link>
        </Button>
      </div>

      <section className="grid gap-6 border-b pb-8 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="min-w-0">
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">18+ software profile</Badge>
            {tool.isFeatured ? <Badge>Featured</Badge> : null}
            <Badge variant="outline">Last checked {tool.lastCheckedAt}</Badge>
          </div>
          <h1 className="mt-4 text-3xl font-semibold tracking-normal md:text-5xl">{tool.name}</h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">{tool.description}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge key={category} variant="secondary">
                {category}
              </Badge>
            ))}
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href={`/go/${tool.slug}`}>
                Visit tool
                <ExternalLink className="size-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href={tool.websiteUrl}>Official site</Link>
            </Button>
          </div>
        </div>

        <aside className="rounded-md border bg-card p-5">
          <div className="flex items-center justify-between border-b pb-4">
            <div>
              <p className="text-sm font-medium">Editor score</p>
              <p className="text-xs text-muted-foreground">Seed profile rating</p>
            </div>
            <span className="rounded-md border bg-background px-3 py-2 text-2xl font-semibold">
              {tool.editorScore?.toFixed(1) ?? "N/A"}
            </span>
          </div>
          <dl className="mt-4 grid gap-3 text-sm">
            <div className="flex items-center justify-between gap-3">
              <dt className="text-muted-foreground">Pricing</dt>
              <dd>{formatPricingModel(tool.pricingModel)}</dd>
            </div>
            <div className="flex items-center justify-between gap-3">
              <dt className="text-muted-foreground">NSFW support</dt>
              <dd>{tool.supportsNsfwChat ? "Supported" : "Policy tracked"}</dd>
            </div>
            <div className="flex items-center justify-between gap-3">
              <dt className="text-muted-foreground">Free option</dt>
              <dd>{tool.hasFreePlan || tool.hasFreeTrial ? "Yes" : "No"}</dd>
            </div>
            <div className="flex items-center justify-between gap-3">
              <dt className="text-muted-foreground">Affiliate status</dt>
              <dd>{tool.affiliateProgramStatus}</dd>
            </div>
          </dl>
          <p className="mt-5 rounded-md bg-secondary p-3 text-xs leading-5 text-muted-foreground">
            Some outbound links may become affiliate links. This profile does not host explicit
            images, video, uploads, comments, or adult galleries.
          </p>
        </aside>
      </section>

      <section className="py-8">
        <SectionHeader eyebrow={<Sparkles className="size-4" aria-hidden="true" />} title="Quick verdict">
          {sections.verdict}
        </SectionHeader>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="min-w-0">
          <SectionHeader
            eyebrow={<TableProperties className="size-4" aria-hidden="true" />}
            title="Feature matrix"
          >
            Visible feature fields used for directory, category, and comparison pages.
          </SectionHeader>
          <div className="mt-5">
            <DataTable rows={sections.featureRows} />
          </div>
        </div>

        <div className="min-w-0">
          <SectionHeader eyebrow={<CalendarCheck className="size-4" aria-hidden="true" />} title="Pricing">
            Pricing and payment signals are separated from affiliate tracking fields.
          </SectionHeader>
          <div className="mt-5">
            <DataTable rows={sections.pricingRows} />
          </div>
        </div>
      </section>

      <section className="grid gap-4 py-8 md:grid-cols-2">
        <PolicyPanel
          title="Policy summary"
          text={tool.nsfwPolicySummary}
          icon={<ShieldCheck className="size-4 text-accent" aria-hidden="true" />}
        />
        <PolicyPanel
          title="Privacy summary"
          text={tool.privacySummary}
          icon={<CheckCircle2 className="size-4 text-accent" aria-hidden="true" />}
        />
      </section>

      {tool.commissionType || tool.commissionRate || tool.cookieDuration || tool.affiliateNetwork ? (
        <section className="py-8">
          <SectionHeader eyebrow={<ExternalLink className="size-4" aria-hidden="true" />} title="Affiliate snapshot">
            Public program notes help the team separate approved affiliate opportunities from simple official-site outbound links.
          </SectionHeader>
          <div className="mt-5">
            <DataTable
              rows={[
                {
                  label: "Program status",
                  value: tool.affiliateProgramStatus
                },
                {
                  label: "Commission type",
                  value: tool.commissionType ?? "No public commission type captured yet."
                },
                {
                  label: "Commission notes",
                  value: tool.commissionRate ?? "No public commission notes captured yet."
                },
                {
                  label: "Cookie notes",
                  value: tool.cookieDuration ?? "No public cookie notes captured yet."
                },
                {
                  label: "Network or platform",
                  value: tool.affiliateNetwork ?? "No public network attribution captured yet."
                }
              ]}
            />
          </div>
        </section>
      ) : null}

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-md border bg-card p-5">
          <h2 className="text-xl font-semibold">Pros and cons</h2>
          <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <div>
              <h3 className="text-sm font-medium">Pros</h3>
              <ul className="mt-3 space-y-3 text-sm leading-6 text-muted-foreground">
                {sections.pros.map((item) => (
                  <li key={item} className="flex gap-2">
                    <CheckCircle2 className="mt-1 size-4 shrink-0 text-accent" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium">Cons</h3>
              <ul className="mt-3 space-y-3 text-sm leading-6 text-muted-foreground">
                {sections.cons.map((item) => (
                  <li key={item} className="flex gap-2">
                    <XCircle className="mt-1 size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div>
          <SectionHeader eyebrow={<Sparkles className="size-4" aria-hidden="true" />} title="Best alternatives">
            Alternatives are selected from overlapping categories in the current seed data.
          </SectionHeader>
          <div className="mt-5 grid gap-3">
            {alternatives.map((alternative) => (
              <AlternativeCard key={alternative.slug} tool={alternative} />
            ))}
          </div>
        </div>
      </section>

      {review ? (
        <section className="py-8">
          <div className="rounded-md border bg-card p-5">
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
          </div>
        </section>
      ) : null}

      <section className="py-8">
        <SectionHeader eyebrow={<HelpCircle className="size-4" aria-hidden="true" />} title="FAQ">
          FAQ schema is not emitted yet; these answers are visible first and can be wired into the
          central structured-data system later.
        </SectionHeader>
        <div className="mt-5 grid gap-3">
          {sections.faq.map((item) => (
            <details key={item.question} className="rounded-md border bg-card p-4">
              <summary className="cursor-pointer text-sm font-medium">{item.question}</summary>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </article>
  );
}
