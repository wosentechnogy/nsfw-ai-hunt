import {
  affiliateLinkSchema,
  blogPostSchema,
  categorySchema,
  comparisonSchema,
  toolSchema,
  type AffiliateLinkRecord,
  type BlogPostRecord,
  type CategoryRecord,
  type ComparisonRecord,
  type ToolRecord
} from "@/lib/validation";

toolSchema.parse({}) satisfies ToolRecord;
categorySchema.parse({}) satisfies CategoryRecord;
affiliateLinkSchema.parse({}) satisfies AffiliateLinkRecord;
blogPostSchema.parse({}) satisfies BlogPostRecord;
comparisonSchema.parse({}) satisfies ComparisonRecord;

