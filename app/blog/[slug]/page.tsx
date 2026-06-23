import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/button";
import {
  getBlogPostBySlug,
  getBlogPostSlugs
} from "@/data/seed/tools";
import { buildMetadata } from "@/lib/seo/metadata";
import { buildArticleJsonLd, buildBreadcrumbJsonLd } from "@/lib/seo/schema";

type BlogPostParams = Promise<Readonly<{ slug: string }>>;

type BlogPostPageProps = Readonly<{
  params: BlogPostParams;
}>;

export function generateStaticParams() {
  return getBlogPostSlugs().map((slug) => ({
    slug
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return buildMetadata({
      title: "Blog post not found",
      description: "Requested blog post could not be found.",
      path: "/blog",
      index: false
    });
  }

  return buildMetadata({
    title: post.seoTitle,
    description: post.seoDescription,
    path: `/blog/${post.slug}`,
    type: "article"
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const jsonLd = [
    buildArticleJsonLd({
      title: post.title,
      description: post.excerpt,
      path: `/blog/${post.slug}`,
      datePublished: post.publishedAt
    }),
    buildBreadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
      { name: post.title, path: `/blog/${post.slug}` }
    ])
  ];

  return (
    <article className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:py-10">
      <JsonLd data={jsonLd} />

      <div className="mb-6">
        <Button asChild variant="ghost" size="sm">
          <Link href="/blog">
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back to blog
          </Link>
        </Button>
      </div>

      <header className="border-b pb-8">
        <p className="text-sm text-muted-foreground">{post.publishedAt}</p>
        <h1 className="mt-4 text-3xl font-semibold tracking-normal md:text-5xl">{post.title}</h1>
        <p className="mt-4 text-base leading-7 text-muted-foreground">{post.excerpt}</p>
      </header>

      <section className="prose prose-neutral max-w-none py-8 dark:prose-invert">
        <p>{post.body}</p>
      </section>

      <section className="rounded-md border bg-card p-5">
        <h2 className="text-lg font-semibold">Related routes</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <Button asChild size="sm" variant="outline">
            <Link href="/best/private-adult-ai-chat-apps">/best/private-adult-ai-chat-apps</Link>
          </Button>
          <Button asChild size="sm" variant="outline">
            <Link href="/best/ai-girlfriend-apps">/best/ai-girlfriend-apps</Link>
          </Button>
          <Button asChild size="sm" variant="outline">
            <Link href="/tools/nomi-ai">/tools/nomi-ai</Link>
          </Button>
        </div>
      </section>
    </article>
  );
}
