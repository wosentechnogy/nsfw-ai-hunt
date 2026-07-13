# Codex local runtime and storage runbook

Last reviewed: 2026-07-13

## Storage decision

Keep the current split. It is organized by ownership and does not create duplicate project copies:

| Content                     | Location                                                                                  | Decision                                                                                                      |
| --------------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Codex application           | `C:/Program Files/WindowsApps/OpenAI.Codex_*`                                             | Leave managed by Windows                                                                                      |
| Codex bundled runtime/cache | `C:/Users/Administrator/AppData/Local/OpenAI/Codex`                                       | Leave on C; the app owns and updates it                                                                       |
| Codex durable home          | `F:/Codex/home`                                                                           | Keep sessions, SQLite state/logs, worktrees, plugins, MCP servers, wrappers, and encrypted MCP fallbacks here |
| Project source              | `E:/360MoveData/Users/Administrator/Desktop/全部项目管理/Adult AI Tools Intelligence Hub` | Keep as the single real repository and backup source                                                          |
| ASCII project path          | `F:/Codex/home/project-links/nsfw-ai-hunt`                                                | Junction only; points to the E-drive repository and stores no second copy                                     |

Do not move the WindowsApps application or active app runtime by hand. Do not copy an active worktree into `F:/Codex/home/worktrees`; Codex manages those directories.

## Durable Codex locations

- Conversations: `F:/Codex/home/sessions`.
- Log database: `F:/Codex/home/logs_2.sqlite`.
- State/index databases: `F:/Codex/home/state_5.sqlite` and neighboring Codex-owned SQLite files.
- Managed worktrees: `F:/Codex/home/worktrees`.
- Plugin cache: `F:/Codex/home/plugins/cache`.
- MCP servers: `F:/Codex/home/mcp-servers`.
- MCP wrappers: `F:/Codex/home/mcp-wrappers`.
- Encrypted local MCP fallbacks: `F:/Codex/home/secrets/*.dpapi`; never back these up as plaintext.
- Configuration backups: `F:/Codex/home/backups`.

## Dialog timeout diagnosis

Storage was not the cause found in the 2026-07-13 reproduction. The default CC Switch model `cc-deepseek-v3.1` received five consecutive `503 Service Unavailable` responses from `https://rawchat.cn/codex/responses` with `Codex model price is temporarily unavailable`. The same fresh Codex verification completed successfully with `gpt-5.4-mini`, so `F:/Codex/home/config.toml` now uses `gpt-5.4-mini` as the default for new tasks.

Use this order when one task works and another times out:

1. Check the task output for third-party gateway/model 429, 5xx, pricing, or stream-disconnect errors.
2. Check whether the affected MCP transport is an old closed process after a config change; new Codex processes load the current registration.
3. Check `codex mcp list` and run only the affected MCP health check.
4. Inspect SQLite health only if the task cannot load history/state or the logs show SQLite errors. File size alone is not corruption evidence.

## Maintenance rules

1. Back up `F:/Codex/home/config.toml`, MCP wrappers/source, and the project before structural changes.
2. Keep active SQLite files in place while Codex is running; do not vacuum, copy-replace, or delete them from a live app process.
3. Treat plugin cache and old worktrees as reclaimable only after identifying ownership and confirming no active task uses them.
4. Use project branches/PRs for repository changes; do not treat Codex worktrees as backups.
5. After MCP configuration changes, verify through a fresh Codex process because existing tasks may retain an old or closed transport.
