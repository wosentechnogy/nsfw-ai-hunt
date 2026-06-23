import { ToolForm } from "@/components/admin/tool-form";

export default function NewAdminToolPage() {
  return (
    <article className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <ToolForm heading="Create tool" submitLabel="Create tool" />
    </article>
  );
}
