import { z } from "zod";

const sourcePathSchema = z.string().trim().max(500).regex(/^\/(?!\/)/);

type SourcePathInput = Readonly<{
  explicitSource?: string | null;
  referrer?: string | null;
  requestOrigin: string;
}>;

export function normalizeSourcePath({
  explicitSource,
  referrer,
  requestOrigin
}: SourcePathInput) {
  const parsedExplicitSource = explicitSource
    ? sourcePathSchema.safeParse(explicitSource)
    : undefined;

  if (parsedExplicitSource?.success) {
    return parsedExplicitSource.data;
  }

  if (!referrer) {
    return null;
  }

  try {
    const referrerUrl = new URL(referrer);

    if (referrerUrl.origin !== requestOrigin) {
      return null;
    }

    const path = `${referrerUrl.pathname}${referrerUrl.search}`;
    return sourcePathSchema.safeParse(path).success ? path : null;
  } catch {
    return null;
  }
}
