import { directoryCategories } from "@/data/seed/tools";
import { toolSchema } from "@/lib/validation";

type ToolFormProps = Readonly<{
  heading: string;
  submitLabel: string;
  defaultValues?: Partial<{
    name: string;
    slug: string;
    websiteUrl: string;
    affiliateUrl: string;
    categorySlugs: string[];
  }>;
}>;

export function ToolForm({ heading, submitLabel, defaultValues }: ToolFormProps) {
  const schemaShape = toolSchema.shape;

  return (
    <section className="rounded-md border bg-card p-6">
      <h1 className="text-2xl font-semibold tracking-normal">{heading}</h1>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        Shared admin form fields stay aligned with toolSchema validation.
      </p>

      <form className="mt-6 grid gap-4">
        <label className="grid gap-2 text-sm">
          <span>Name</span>
          <input
            name="name"
            defaultValue={defaultValues?.name ?? ""}
            className="rounded-md border bg-background px-3 py-2 outline-none"
          />
        </label>

        <label className="grid gap-2 text-sm">
          <span>Slug</span>
          <input
            name="slug"
            defaultValue={defaultValues?.slug ?? ""}
            className="rounded-md border bg-background px-3 py-2 outline-none"
          />
        </label>

        <label className="grid gap-2 text-sm">
          <span>websiteUrl</span>
          <input
            name="websiteUrl"
            defaultValue={defaultValues?.websiteUrl ?? ""}
            className="rounded-md border bg-background px-3 py-2 outline-none"
          />
        </label>

        <label className="grid gap-2 text-sm">
          <span>affiliateUrl</span>
          <input
            name="affiliateUrl"
            defaultValue={defaultValues?.affiliateUrl ?? ""}
            className="rounded-md border bg-background px-3 py-2 outline-none"
          />
        </label>

        <fieldset className="grid gap-2 text-sm">
          <legend className="font-medium">categorySlugs</legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {directoryCategories.map((category) => (
              <label key={category.slug} className="flex items-center gap-2 rounded-md border p-3">
                <input
                  type="checkbox"
                  name="categorySlugs"
                  value={category.slug}
                  defaultChecked={defaultValues?.categorySlugs?.includes(category.slug)}
                />
                <span>{category.label}</span>
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
          {submitLabel}
        </button>
      </form>
    </section>
  );
}
