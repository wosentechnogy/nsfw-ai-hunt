import { z } from "zod";

const publicEnvSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1)
});

const serverEnvSchema = publicEnvSchema.extend({
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1)
});

type EnvSource = Record<string, string | undefined>;

export type PublicEnv = z.infer<typeof publicEnvSchema>;
export type ServerEnv = z.infer<typeof serverEnvSchema>;

function formatEnvError(error: z.ZodError): Error {
  const variables = error.issues
    .map((issue) => issue.path.join("."))
    .filter(Boolean)
    .join(", ");

  return new Error(
    `Invalid environment variables${variables ? `: ${variables}` : ""}. Check .env.local or deployment settings.`
  );
}

export function getClientEnv(source: EnvSource = process.env): PublicEnv {
  const result = publicEnvSchema.safeParse(source);

  if (!result.success) {
    throw formatEnvError(result.error);
  }

  return result.data;
}

export function getServerEnv(source: EnvSource = process.env): ServerEnv {
  const result = serverEnvSchema.safeParse(source);

  if (!result.success) {
    throw formatEnvError(result.error);
  }

  return result.data;
}

