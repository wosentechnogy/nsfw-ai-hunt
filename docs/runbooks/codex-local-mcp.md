# Codex local MCP runbook

Last verified: 2026-07-13

## Account boundary

- GitHub: `wosentechnogy/nsfw-ai-hunt`, account email `985064198@qq.com`.
- Supabase: project `kkfiefqwzlgwlrcjeixi` (`nsfw-ai-hunt`).
- Do not reuse these transports for another project or account without an explicit account-gate check.

## Active registrations

### `github-local`

- Server: `F:/Codex/home/mcp-servers/github-v1.5.0/bin/github-mcp-server.exe`.
- Wrapper: `F:/Codex/home/mcp-wrappers/github-mcp-bridge.ps1`.
- Primary credential source: the authorized `gh` account.
- Restricted-runtime fallback: `F:/Codex/home/secrets/github-mcp-token.dpapi`, encrypted with Windows DPAPI `CurrentUser`. Administrator and SYSTEM have full control; `CodexSandboxUsers` has read-only access to the encrypted blob so restricted MCP processes can decrypt it under the same Windows user.
- The token is not stored in `config.toml`, source code, logs, or this repository.

### `supabase-local`

- Wrapper: `F:/Codex/home/mcp-wrappers/supabase-mcp-bridge.ps1`.
- Bridge: `F:/Codex/home/mcp-servers/supabase-cli-bridge/dist/index.js`.
- Source: `F:/Codex/home/mcp-servers/supabase-cli-bridge/src/index.ts`.
- Restricted-runtime credential: `F:/Codex/home/secrets/supabase-mcp-access-token.dpapi`, encrypted with Windows DPAPI `CurrentUser`. Administrator and SYSTEM have full control; `CodexSandboxUsers` has read-only access to the encrypted blob. The wrapper injects the decrypted value only into the CLI child process.
- ASCII-only project junction for Windows PowerShell 5.1: `F:/Codex/home/project-links/nsfw-ai-hunt`; it points to the existing E-drive repository and is not a second copy.
- Uses the project-pinned Supabase CLI `2.109.1` and refuses a project ref other than `kkfiefqwzlgwlrcjeixi` for migrations.
- Read-only SQL accepts only `SELECT`, `WITH`, `EXPLAIN`, or `SHOW`.
- Every CLI call receives an isolated OS-temp `SUPABASE_HOME`, disables telemetry transmission, and removes the temporary directory after completion. It does not require or update `C:/Users/Administrator/.supabase/telemetry.json`.
- CLI calls are serialized so simultaneous MCP requests do not compete while Supabase initializes temporary login roles.

## Verification record

- `codex mcp list` shows `github-local` and `supabase-local` enabled.
- Release Gate read the private GitHub repository and `README.md` without exposing a token.
- Release Gate confirmed the linked Supabase project, ran a production read-only click-count query, and received no warn-level advisor findings.
- Final verification used a fresh isolated Codex process loading the current registration: all three Supabase MCP calls completed with exit 0 and the global telemetry timestamp stayed unchanged.
- No migration, deployment, or remote write is part of an MCP health check.

## Maintenance rules

1. Keep the GitHub server on an official release and verify its release checksum before replacement.
2. Rebuild the Supabase bridge with `npm run build` in its own directory after source changes.
3. Re-run private-repository read, Supabase project/query/advisor reads, and the global-telemetry unchanged check after bridge changes.
4. Never copy a plaintext GitHub or Supabase token into Codex config, project files, shell history, or audit output.
5. Keep duplicate unauthenticated GitHub plugins and stale Supabase registrations disabled; re-enable only after an account-scoped authentication review.
