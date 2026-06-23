import { CategoryForm } from "@/components/admin/category-form";
import { directoryCategories, directoryTools } from "@/data/seed/tools";

export default function AdminCategoriesPage() {
  return (
    <article className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-normal">Category admin</h1>
        <p className="mt-3 text-muted-foreground">
          Manage category copy, SEO fields, and Assign tools relationships.
        </p>
      </div>

      <div className="mt-8 overflow-x-auto rounded-md border">
        <table className="w-full min-w-[760px] border-collapse text-sm">
          <thead className="bg-secondary text-left text-xs uppercase text-muted-foreground">
            <tr>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">SEO</th>
              <th className="px-4 py-3 font-medium">Assign tools</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {directoryCategories.map((category) => (
              <tr key={category.slug} className="bg-card">
                <td className="px-4 py-4 font-medium">{category.label}</td>
                <td className="px-4 py-4 text-muted-foreground">{category.description}</td>
                <td className="px-4 py-4 text-muted-foreground">
                  {
                    directoryTools.filter((tool) => tool.categorySlugs.includes(category.slug)).length
                  }{" "}
                  linked tools
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8">
        <CategoryForm />
      </div>
    </article>
  );
}
