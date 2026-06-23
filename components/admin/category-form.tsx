import { directoryCategories, directoryTools } from "@/data/seed/tools";
import { categorySchema } from "@/lib/validation";

export function CategoryForm() {
  const schemaShape = categorySchema.shape;

  return (
    <section className="rounded-md border bg-card p-6">
      <h1 className="text-2xl font-semibold tracking-normal">Category admin form</h1>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        Shared category editor fields stay aligned with categorySchema validation.
      </p>

      <form className="mt-6 grid gap-4">
        <label className="grid gap-2 text-sm">
          <span>Name</span>
          <input name="name" className="rounded-md border bg-background px-3 py-2 outline-none" />
        </label>

        <label className="grid gap-2 text-sm">
          <span>Slug</span>
          <input name="slug" className="rounded-md border bg-background px-3 py-2 outline-none" />
        </label>

        <label className="grid gap-2 text-sm">
          <span>seoTitle</span>
          <input name="seoTitle" className="rounded-md border bg-background px-3 py-2 outline-none" />
        </label>

        <label className="grid gap-2 text-sm">
          <span>seoDescription</span>
          <textarea
            name="seoDescription"
            className="min-h-24 rounded-md border bg-background px-3 py-2 outline-none"
          />
        </label>

        <label className="grid gap-2 text-sm">
          <span>parentSlug</span>
          <select name="parentSlug" className="rounded-md border bg-background px-3 py-2 outline-none">
            <option value="">None</option>
            {directoryCategories.map((category) => (
              <option key={category.slug} value={category.slug}>
                {category.label}
              </option>
            ))}
          </select>
        </label>

        <fieldset className="grid gap-2 text-sm">
          <legend className="font-medium">Assign tools</legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {directoryTools.map((tool) => (
              <label key={tool.slug} className="flex items-center gap-2 rounded-md border p-3">
                <input type="checkbox" name="toolIds" value={tool.slug} />
                <span>{tool.name}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <p className="text-xs text-muted-foreground">
          Validation shape keys: {Object.keys(schemaShape).join(", ")}
        </p>

        <button
          type="submit"
          className="inline-flex rounded-md border bg-foreground px-4 py-2 text-sm text-background"
        >
          Save category
        </button>
      </form>
    </section>
  );
}
