import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getPublishedBlogPosts } from "@/data/seed/tools";
import { buildMetadata } from "@/lib/seo/metadata";
import { buildBreadcrumbJsonLd, buildWebPageJsonLd } from "@/lib/seo/schema";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Blog",
    description:
      "Published posts that support NSFW AI Hunt money pages with buyer guides, privacy notes, and pricing explainers.",
    path: "/blog"
  });
}

export default function BlogIndexPage() {
  const posts = getPublishedBlogPosts();
  const jsonLd = [
    buildWebPageJsonLd({
      title: "Blog",
      description:
        "Published posts that support NSFW AI Hunt money pages with buyer guides, privacy notes, and pricing explainers.",
      path: "/blog",
      type: "CollectionPage"
    }),
    buildBreadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" }
    ])
  ];

  return (
    <article className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:py-10">
      <JsonLd data={jsonLd} />

      <section className="border-b pb-8">
        <Badge variant="secondary">Published posts</Badge>
        <h1 className="mt-4 text-3xl font-semibold tracking-normal md:text-5xl">Blog</h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">
          These editorial pages exist to support the buyer-intent routes such as /best/private-adult-ai-chat-apps
          and /best/ai-girlfriend-apps rather than operating as a generic article farm.
        </p>
      </section>

      <section className="grid gap-4 py-8 md:grid-cols-2">
        {posts.map((post) => (
          <section key={post.slug} className="rounded-md border bg-card p-5">
            <p className="text-xs text-muted-foreground">{post.publishedAt}</p>
            <h2 className="mt-3 text-xl font-semibold">{post.title}</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{post.excerpt}</p>
            <div className="mt-5 flex gap-3">
              <Button asChild size="sm">
                <Link href={`/blog/${post.slug}`}>
                  Read post
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild size="sm" variant="outline">
                <Link href="/best/private-adult-ai-chat-apps">Money page</Link>
              </Button>
            </div>
          </section>
        ))}
      </section>
    </article>
  );
}
