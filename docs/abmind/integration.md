# Integration Guide

abmind integrates with any AI tool that supports hooks, MCP, or direct Node.js embedding.

## Integration Paths

| Path | Best for | Setup |
|------|----------|-------|
| **install-host** | Kiro CLI, Claude Code, Gemini CLI, Codex CLI | `abmind install-host <host>` |
| **OpenClaw plugin** | OpenClaw gateway | Install as ContextEngine plugin |
| **MCP server** | Cursor, Windsurf, Continue, Zed, any MCP client | `abmind mcp` (stdio) |
| **Hooks (standalone)** | Custom CLI tools, scripts | Call `abmind hook-*` commands |
| **Node.js library** | Embedding in your own app | `import { MemoryManager } from "abmind"` |
| **abTARS (in-process)** | Autonomous bridge | Built-in, no setup needed |

---

## Host Integration (`install-host`)

One command sets up lifecycle hooks, MCP server registration, and context files:

```bash
abmind install-host kiro      # Kiro CLI
abmind install-host claude    # Claude Code
abmind install-host gemini    # Gemini CLI
abmind install-host codex     # OpenAI Codex CLI
```

What it configures per host:

| Host | Hooks | MCP | Context file |
|------|-------|-----|-------------|
| Kiro CLI | SessionStart, UserPrompt, Stop | ✅ registered | `.kiro/steering/` |
| Claude Code | SessionStart, UserPromptSubmit, Stop | ✅ via `claude mcp add` | `CLAUDE.md` |
| Gemini CLI | SessionStart, BeforeAgent, AfterAgent | ✅ via extension | `GEMINI.md` |
| Codex CLI | SessionStart, UserPrompt, Stop | ✅ registered | `CODEX.md` |

Safe to re-run (idempotent). Backs up existing config before modifying. Uninstall with `--uninstall`.

---

## OpenClaw Plugin

abmind registers as both a **ContextEngine** (drop-in replacement for lossless-claw) and a **memory-capability** plugin.

```bash
# Install in OpenClaw extensions directory
mkdir -p ~/.openclaw/extensions/abmind
cd ~/.openclaw/extensions/abmind
npm init -y && npm install abmind
echo 'export { register } from "abmind/openclaw-plugin";' > index.js
```

Configure in `~/.openclaw/openclaw.json`:
```json
{
  "plugins": {
    "allow": ["abmind"],
    "slots": { "memory": "abmind" },
    "entries": {
      "abmind": {
        "config": {
          "autoRecall": true,
          "autoCapture": true,
          "autoRecallMaxResults": 3,
          "sleepEnabled": true
        },
        "hooks": { "allowConversationAccess": true }
      }
    }
  },
  "tools": { "allow": ["abmind_recall", "abmind_store"] }
}
```

What registers:
- ContextEngine: ingest, assemble, compact, afterTurn
- Memory-capability: promptBuilder, runtime (MemorySearchManager), publicArtifacts
- Agent tools: `abmind_recall` + `abmind_store`
- Lifecycle hooks: autoRecall (before_agent_start), autoCapture (agent_end)

---

## MCP Server

```bash
abmind mcp    # starts on stdio — connect from any MCP client
```

Works with any tool that supports the Model Context Protocol: Cursor, Windsurf, Continue, Zed, VS Code extensions, custom clients.

### Available tools

| Tool | Description |
|------|-------------|
| `memory_recall` | Search memories by keywords/semantic query |
| `memory_store` | Store a new memory (fact, preference, entity) |
| `memory_edit` | Edit or delete an existing memory |
| `memory_status` | Memory system stats (counts, DB size) |
| `memory_wakeup` | Get current wake-up context |

### Registering manually

If your tool doesn't support `install-host`, register the MCP server directly:

```json
{
  "mcpServers": {
    "abmind": {
      "command": "abmind",
      "args": ["mcp"]
    }
  }
}
```

---

## Hook Commands (Standalone)

For custom integrations, call these from your tool's hook/event system:

| Hook | When to call | What it does |
|------|-------------|--------------|
| `abmind hook-wakeup` | Session start | Outputs wake-up context (recent facts, profile) |
| `abmind hook-recall` | Before each prompt | Outputs relevant memories for the current query |
| `abmind hook-store` | After each response | Records the user+assistant turn |
| `abmind hook-doctor` | On demand | Diagnoses hook config issues |

Each outputs text to stdout — inject into the model's system prompt or context.

---

## Node.js Library (Embedding)

For building your own memory-powered application:

```typescript
import { createMemoryBackend } from "abmind";
import { loadMemoryConfig } from "abmind";

const config = loadMemoryConfig();
const backend = await createMemoryBackend(config);

// Store
backend.recordMessage({ role: "user", content: "I live in Budapest", userId: "user-1", sessionId: "s1", timestamp: Date.now() });

// Recall
const results = await backend.recall({ translated: ["Budapest", "location"], userId: "user-1", limit: 5 });

backend.close();
```

---

## abTARS (In-Process)

When running as part of abTARS, abmind is loaded in-process via `file:../abmind` dependency. No separate setup — `abtars install` handles everything. Memory is available to all agents (professor, dreamy, browsie, coding) and the heartbeat/sleep system.
