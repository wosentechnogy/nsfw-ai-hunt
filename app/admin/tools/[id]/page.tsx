import { notFound } from "next/navigation";
import { ToolForm } from "@/components/admin/tool-form";
import { getToolBySlug } from "@/data/seed/tools";

type AdminToolEditParams = Promise<Readonly<{ id: string }>>;

type AdminToolEditPageProps = Readonly<{
  params: AdminToolEditParams;
}>;

export default async function AdminToolEditPage({ params }: AdminToolEditPageProps) {
  const { id } = await params;
  const tool = getToolBySlug(id);

  if (!tool) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <ToolForm
        heading="Edit tool"
        submitLabel="Save tool"
        defaultValues={{
          name: tool.name,
          slug: tool.slug,
          websiteUrl: tool.websiteUrl,
          affiliateUrl: tool.affiliateUrl ?? "",
          categorySlugs: [...tool.categorySlugs]
        }}
      />
    </article>
  );
}
