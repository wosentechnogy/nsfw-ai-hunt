import { getCanonicalUrl } from "@/lib/seo/canonical";

type BreadcrumbItem = Readonly<{
  name: string;
  path: `/${string}`;
}>;

type WebPageSchemaInput = Readonly<{
  title: string;
  description: string;
  path: `/${string}`;
  type?: "WebPage" | "CollectionPage";
}>;

type ArticleSchemaInput = Readonly<{
  title: string;
  description: string;
  path: `/${string}`;
  datePublished: string;
  dateModified?: string;
}>;

export function buildBreadcrumbJsonLd(items: readonly BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: getCanonicalUrl(item.path)
    }))
  };
}

export function buildWebPageJsonLd({
  title,
  description,
  path,
  type = "WebPage"
}: WebPageSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": type,
    name: title,
    description,
    url: getCanonicalUrl(path)
  };
}

export function buildArticleJsonLd({
  title,
  description,
  path,
  datePublished,
  dateModified = datePublished
}: ArticleSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: getCanonicalUrl(path),
    mainEntityOfPage: getCanonicalUrl(path),
    datePublished,
    dateModified
  };
}
