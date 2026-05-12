# Commands

All commands work on Telegram, Discord, and IRC unless noted otherwise.

## Session

| Command | Description |
|---------|-------------|
| `/new` | Fresh session (keeps current mode) |
| `/reset` | Reload transport config + fresh session |
| `/reset default` | Restore factory transport.json + fresh session |
| `/compact` | Compact context window (summarize + fresh session) |
| `/stop`, `/ctrlc` | Stop current response |
| `/restart` | Restart bridge process |

## Model & Provider

| Command | Description |
|---------|-------------|
| `/models` | Show current model, transport, agent status |
| `/models change` | Interactive 3-step picker (Telegram only) |
| `/models quick <model>` | Instant switch on same provider |
| `/models list [provider]` | List providers or models on a provider |
| `/models restore` | Undo last model/provider switch |
| `/models default` | Factory reset (transport.default.json) |
| `/models health reset` | Reset model health buckets |
| `/models emergency` | 🚨 Activate paid hailMary model |
| `/emergency` | Shortcut for `/models emergency` |

## Status & Diagnostics

| Command | Description |
|---------|-------------|
| `/status` | Bridge status, transport, uptime |
| `/doctor` | Deep probe all subsystems |
| `/doctor fix` | Run safe auto-repairs |
| `/doctor fix-full` | Full repair (+ FTS rebuild, WAL checkpoint) |
| `/heartbeat` | Heartbeat diagnostics (tasks, last tick) |
| `/mcp` | MCP server status |
| `/hooks` | List configured hooks |

## Memory

| Command | Description |
|---------|-------------|
| `/memory` | Memory storage statistics |
| `/facts` | Core knowledge (user profile + agent notes) |
| `/nlm` | Knowledge base (list/create/sources/query) |

## Tasks

| Command | Description |
|---------|-------------|
| `/tasks` | List scheduled tasks |
| `/tasks trigger <id>` | Manually fire a task |
| `/tasks log <id>` | Last 5 runs for a task |

## Skills & Mode

| Command | Description |
|---------|-------------|
| `/skills` | List loaded skills |
| `/coding` | Switch to coding agent |
| `/default` | Switch back to default agent |

## Sleep

| Command | Description |
|---------|-------------|
| `/sleep` | Sleep status |
| `/sleep resume` | Retry failed sleep steps |
| `/sleep now` | Full fresh sleep cycle |
| `/wakeup` | Wake from hardware sleep |

## Telegram-only

| Command | Description |
|---------|-------------|
| `/full` | Raw output, TTS disabled |
| `/short` | Clean responses (default) |
| `/healing` | Toggle self-healer on/off |

## Platform-specific

| Command | Platform | Description |
|---------|----------|-------------|
| `/users` | All | List users, approve/revoke access |
| `/users approve <id>` | All | Approve a new user by platform ID |
| `/users revoke <id>` | All | Revoke user access |
