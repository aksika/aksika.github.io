# Architecture

```
┌─────────────┐     ┌──────────────┐     ┌─────────────────┐
│  Platforms   │────▶│   Pipeline   │────▶│    Transport    │
│             │     │              │     │                 │
│ • Telegram  │     │ • Commands   │     │ • CLI (ACP/tmux)│
│ • Discord   │◀────│ • Memory     │◀────│ • API (HTTP)    │
│ • IRC       │     │ • Streaming  │     │ • Fallback      │
└─────────────┘     └──────────────┘     └─────────────────┘
                           │
                    ┌──────┴──────┐
                    │   abmind    │
                    │  (memory)   │
                    └─────────────┘
```

**Platforms** receive messages from users and deliver responses back.

**Pipeline** processes each message: runs commands, checks permissions, builds prompts with memory context, manages streaming delivery.

**Transport** communicates with AI models — either by spawning a CLI tool (Kiro, Gemini) or calling an HTTP API (ollama, OpenRouter).

**abmind** provides persistent memory — recall on every turn, store after every response, sleep cycles for maintenance.

## Boot Phases

The bridge starts in ordered phases: config → memory → transport → platforms → capabilities → heartbeat → sleep → dashboard. Each phase is independent — if one fails, the rest continue.

## Capabilities

Optional features that load at boot if their requirements are met:

- **Browser** — web browsing via Playwright
- **Skills** — markdown-defined agent behaviors
- **MCP** — external tool servers via mcporter

## Heartbeat

A periodic tick (configurable interval) that runs scheduled tasks, checks model health, and triggers sleep cycles during quiet hours.
