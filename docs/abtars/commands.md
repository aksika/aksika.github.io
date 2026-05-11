# Commands

## Session

| Command | Description |
|---------|-------------|
| `/new` | Fresh session (keeps current mode) |
| `/reset` | Reload transport config + fresh session |
| `/reset default` | Restore factory transport.json + fresh session |
| `/compact` | Compact context window |
| `/stop`, `/ctrlc` | Stop current response |
| `/restart` | Restart bridge process |

## Model & Provider

| Command | Description |
|---------|-------------|
| `/model` | Show current model, transport, agent status |
| `/model change` | Interactive model/provider picker (Telegram) |
| `/model quick <model>` | Instant switch on current provider |
| `/model list [provider]` | List providers or models on a provider |
| `/model restore` | Undo last model/provider switch |
| `/model default` | Factory reset transport config |
| `/model health reset` | Reset model health buckets |
| `/model emergency` | Activate paid hailMary model |

## Status & Diagnostics

| Command | Description |
|---------|-------------|
| `/status` | Bridge status, transport, uptime |
| `/doctor` | Deep probe all subsystems |
| `/doctor fix` | Run safe auto-repairs |
| `/heartbeat` | Heartbeat diagnostics |
| `/mcp` | MCP server status |
| `/hooks` | List configured hooks |

## Memory

| Command | Description |
|---------|-------------|
| `/memory` | Memory storage statistics |
| `/facts` | Core knowledge (user profile + agent notes) |

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
| `/nlm` | Knowledge base operations |

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
