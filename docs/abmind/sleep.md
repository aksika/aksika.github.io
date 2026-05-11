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
