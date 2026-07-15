import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, TicketPercent } from "lucide-react";
import { TrackedOutboundLink } from "@/components/common/tracked-outbound-link";
import { JsonLd } from "@/components/seo/JsonLd";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  getCouponPageData,
  getCouponPageSlugs,
  isCouponPageIndexable
} from "@/data/seed/tools";
import { buildMetadata } from "@/lib/seo/metadata";
import { buildBreadcrumbJsonLd, buildWebPageJsonLd } from "@/lib/seo/schema";

type CouponPageParams = Promise<Readonly<{ slug: string }>>;

type CouponPageProps = Readonly<{
  params: CouponPageParams;
}>;

export function generateStaticParams() {
  return getCouponPageSlugs().map((slug) => ({
    slug
  }));
}

export async function generateMetadata({ params }: CouponPageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = getCouponPageData(slug);

  if (!data) {
    return buildMetadata({
      title: "Coupon page not found",
      description: "Requested coupon page could not be found.",
      path: "/tools",
      index: false
    });
  }

  const title = `${data.tool.name} Coupons`;
  const description = `Coupon and discount status for ${data.tool.name}, with alternatives when no confirmed coupon is available.`;

  return buildMetadata({
    title,
    description,
    path: `/coupons/${data.tool.slug}`,
    index: isCouponPageIndexable(data)
  });
}

export default async function CouponPage({ params }: CouponPageProps) {
  const { slug } = await params;
  const data = getCouponPageData(slug);

  if (!data) {
    notFound();
  }

  const title = `${data.tool.name} Coupons`;
  const description = `Coupon and discount status for ${data.tool.name}, with alternatives when no confirmed coupon is available.`;
  const jsonLd = [
    buildWebPageJsonLd({
      title,
      description,
      path: `/coupons/${data.tool.slug}`
    }),
    buildBreadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Tools", path: "/tools" },
      { name: title, path: `/coupons/${data.tool.slug}` }
    ])
  ];

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
          <Badge variant="secondary">Coupon page</Badge>
          <h1 className="mt-4 text-3xl font-semibold tracking-normal md:text-5xl">{title}</h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">
            No confirmed coupon is shown unless the structured record supports it. This page should
            help users avoid assuming a discount exists.
          </p>
          <div className="mt-6">
            <Button asChild size="lg">
              <TrackedOutboundLink href={`/go/${data.tool.slug}`}>
                Open official deal path
                <ExternalLink className="size-4" aria-hidden="true" />
              </TrackedOutboundLink>
            </Button>
          </div>
        </div>

        <aside className="rounded-md border bg-card p-5">
          <div className="flex items-center gap-2 text-sm font-medium">
            <TicketPercent className="size-4 text-accent" aria-hidden="true" />
            No confirmed coupon
          </div>
          <p className="mt-4 text-sm leading-6 text-muted-foreground">{data.couponStatus}</p>
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

      <section className="py-8">
        <h2 className="text-xl font-semibold">Alternatives</h2>
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
    </article>
  );
}
