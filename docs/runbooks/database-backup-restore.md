# NSFW AI Hunt database backup and restore runbook

Use only the isolated production Supabase project `kkfiefqwzlgwlrcjeixi` under
the `985064198@qq.com` account context. Never place database passwords, service
role keys, connection strings, or exported private rows in this repository.

## Backup

1. In the Supabase dashboard, confirm the project ref and organization before opening backup controls.
2. Use the provider-managed backup/export feature; do not copy secrets into a shell history or chat.
3. Record only the backup timestamp, retention window, project ref, and operator—not the export contents.
4. Verify that the backup is readable through the provider's restore validation or documented status page.

## Restore rehearsal

1. Restore into a non-production project or provider restore rehearsal when available.
2. Apply migrations in filename order and verify RLS, service-role access, admin authentication, and outbound click inserts.
3. Run the application's schema and smoke tests against the rehearsal target without changing the production environment variables.
4. Record pass/fail evidence and the rollback point.

## Production recovery

1. Declare the incident and freeze application writes that depend on the damaged schema.
2. Confirm the target project and backup timestamp with a human operator.
3. Restore using the official Supabase procedure, then re-run migrations and smoke tests.
4. Rotate affected credentials through the provider if exposure is suspected; never paste the old or new values into project files.
5. Record the recovery timestamp, deployment SHA, and remaining data-integrity risks.
