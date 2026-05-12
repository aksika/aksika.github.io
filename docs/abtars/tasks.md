# Scheduled Tasks

abTARS runs scheduled tasks via a cron-like system. View and manage with `/tasks`.

## Defining Tasks

Tasks are defined in `~/.abtars/config/tasks.json`:

```json
[
  {
    "id": "daily-report",
    "title": "Daily AI Report",
    "schedule": "0 9 * * *",
    "message": "Generate the daily report",
    "enabled": true
  },
  {
    "id": "backup",
    "title": "Memory Backup",
    "schedule": "0 3 * * *",
    "message": "Run abmind backup",
    "executor": "script",
    "command": "abmind backup"
  }
]
```

## Schedule Format

Standard cron syntax: `minute hour day month weekday`

```
0 9 * * *      → every day at 09:00
0 */4 * * *    → every 4 hours
30 22 * * 1-5  → weekdays at 22:30
```

## Task Types

| Type | How it runs |
|------|-------------|
| `message` (default) | Sends the message text to the agent as a prompt |
| `script` | Executes the `command` directly (no agent involvement) |

## Commands

| Command | Description |
|---------|-------------|
| `/tasks` | List all tasks with today's status |
| `/tasks trigger <id>` | Run a task immediately |
| `/tasks log <id>` | Show last 5 runs |

## Status Indicators

```
✓  ran successfully today
✗  failed today
~  currently running
+  scheduled, not yet run
—  not scheduled for today
```
