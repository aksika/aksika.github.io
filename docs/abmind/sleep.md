# Sleep & Dreams

Sleep is abmind's background maintenance cycle — it processes raw conversations into structured knowledge, consolidates old memories, and detects contradictions.

## When It Runs

Configured via `BED_TIME` and `WAKE_TIME` in `.env.memory`. The bridge triggers sleep automatically during quiet hours. Can also be triggered manually:

```bash
abmind sleep --level normal    # CLI
/sleep now                     # from chat
```

## Sleep Levels

| Level | Steps | LLM Calls | Duration |
|-------|-------|-----------|----------|
| `budget` | Extract + consolidate only | ~5 | 2-5 min |
| `normal` | Full cycle (extract, consolidate, contradictions, aging) | ~15 | 5-15 min |
| `ultimate` | Deep analysis + skill review + retrospective | ~30 | 15-30 min |

## Sleep Support by Product

| Product | Max Level | Trigger | Notes |
|---------|-----------|---------|-------|
| **abTARS** | `ultimate` | Automatic (BED_TIME + quiet ticks) | Full sleep with subagent (Dreamy). Hardware sleep after cycle. Dream report to user. |
| **OpenClaw** | `normal` | Cron (`0 3 * * *`) or manual | Plugin registers sleep cron on gateway start. No hardware sleep. |
| **Hermes-Agent** | `budget` | Auto-registered cron (gateway) or manual | Plugin triggers budget sleep on session end if >24h stale. Full sleep via `abmind sleep --level normal` in system cron. |
| **Kiro CLI / Claude / Gemini** | `normal` | System cron only | No daemon — add `0 3 * * * abmind sleep --level normal` to crontab. |
| **MCP (standalone)** | `normal` | System cron only | Same as above — MCP server doesn't manage lifecycle. |

**Why the difference:** abTARS has a dedicated sleep subagent (Dreamy) with its own transport and session. Other products call `abmind sleep` as a CLI subprocess — works for all levels but lacks the multi-turn conversational extraction that Dreamy provides at `ultimate` level.

## What Sleep Does

1. **Extract** — pull facts, preferences, entities from unprocessed messages
2. **Consolidate** — merge daily notes into weekly, weekly into quarterly
3. **Contradiction check** — detect conflicting facts, mark older one as superseded
4. **Aging** — reduce relevance scores on stale memories
5. **Skill review** (ultimate only) — identify recurring patterns worth automating
6. **Retrospective** (ultimate only) — generate a "dream report" summarizing the day

## Status

```
/sleep
```

Shows:
- 🧠 Sleep cycle running (step, %) — active
- 😴 Asleep (idle) — bedtime, nothing happening
- 👋 Awake — normal operation

## Manual Control

| Command | Effect |
|---------|--------|
| `/sleep now` | Start a fresh cycle on next heartbeat tick |
| `/sleep resume` | Retry failed steps from last cycle |
| `/wakeup` | Cancel hardware sleep, resume normal operation |
