# Integration Guide

abmind can be integrated into any AI tool that supports hooks, MCP, or direct Node.js embedding.

## Integration Paths

| Path | Best for | Setup |
|------|----------|-------|
| **install-host** | Claude Code, Gemini CLI | `abmind install-host claude` |
| **MCP server** | Any MCP-compatible client | `abmind mcp` (stdio) |
| **Hooks** | Custom CLI tools | Call `abmind hook-*` commands |
| **Node.js library** | Embedding in your own app | `import { MemoryManager } from "abmind"` |

## Host Integration (Recommended)

One command sets up everything:

```bash
abmind install-host claude    # Claude Code
abmind install-host gemini    # Gemini CLI
```

This configures:
- Lifecycle hooks (session start → recall → store)
- MCP server registration (tools available mid-turn)
- Context file (CLAUDE.md / GEMINI.md) teaching the model about memory

## MCP Tools

When running as MCP server (`abmind mcp`), these tools are available:

| Tool | Description |
|------|-------------|
| `memory_recall` | Search memories by keywords |
| `memory_store` | Store a new memory |
| `memory_edit` | Edit an existing memory |
| `memory_status` | Memory system stats |
| `memory_wakeup` | Get wake-up context |

## Hook Commands

For custom integrations, call these from your tool's hook system:

```bash
# On session start — inject context
abmind hook-wakeup

# Before each prompt — recall relevant memories
abmind hook-recall

# After each response — record the turn
abmind hook-store
```

Each outputs text to stdout that should be injected into the model's context.
