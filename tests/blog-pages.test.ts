import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  getBlogPostBySlug,
  getBlogPostSlugs,
  getPublishedBlogPosts
} from "@/data/seed/tools";

describe("blog page data helpers", () => {
  it("returns only published posts for the blog index and static params", () => {
    const posts = getPublishedBlogPosts();
    const slugs = getBlogPostSlugs();

    expect(posts.length).toBeGreaterThanOrEqual(2);
    expect(posts.every((post) => post.status === "published")).toBe(true);
    expect(slugs).toEqual(posts.map((post) => post.slug));
  });

  it("finds a published post by slug and preserves internal links back to money pages", () => {
    const post = getBlogPostBySlug("adult-ai-privacy-guide");

    expect(post).toBeDefined();

    if (!post) {
      throw new Error("Expected blog post");
    }

    expect(post.title).toContain("Privacy");
    expect(post.body).toContain("/best/private-adult-ai-chat-apps");
    expect(post.status).toBe("published");
  });
});

describe("blog page source", () => {
  it("defines metadata, static params, published filtering, and internal links to money pages", () => {
    const indexSource = readFileSync(join(process.cwd(), "app", "blog", "page.tsx"), "utf8");
    const postSource = readFileSync(join(process.cwd(), "app", "blog", "[slug]", "page.tsx"), "utf8");

    expect(indexSource).toContain("generateMetadata");
    expect(indexSource).toContain("Published posts");
    expect(indexSource).toContain("/best/");

    expect(postSource).toContain("generateMetadata");
    expect(postSource).toContain("generateStaticParams");
    expect(postSource).toContain("/best/");
    expect(postSource).toContain("/tools/");
  });
});
