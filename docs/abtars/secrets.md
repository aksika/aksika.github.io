# Secrets Management

API keys and tokens are stored as individual files — never in `.env` directly, never committed to git.

## How it works

1. Store the key in `~/.abtars/secret/<KEY_NAME>` (one file per key)
2. Reference it in `.env` with the `<secret>` placeholder
3. On boot, abTARS resolves placeholders by reading the corresponding file

## Example

```bash
# Store the key
echo -n "sk-abc123..." > ~/.abtars/secret/OPENROUTER_API_KEY
chmod 600 ~/.abtars/secret/OPENROUTER_API_KEY
```

In `~/.abtars/config/.env`:

```env
OPENROUTER_API_KEY=<secret>
TELEGRAM_BOT_TOKEN=<secret>
```

On boot, abTARS reads `~/.abtars/secret/OPENROUTER_API_KEY` and injects the value. The `.env` file never contains the actual secret.

## Requirements

| Rule | Why |
|------|-----|
| `chmod 600` on every secret file | `abtars doctor` checks this — fails if world-readable |
| One key per file | File name = key name, no parsing needed |
| No trailing newline | Use `echo -n` when writing |
| Never commit secrets to public repos | `.env` with `<secret>` is safe to commit; the actual key files are not |

## Boot errors

If a secret file is missing or empty:

```
[BOOT ERROR] Secret file not found: ~/.abtars/secret/OPENROUTER_API_KEY
```

The bridge will not start until all referenced secrets are present.

## Doctor check

`abtars doctor` verifies:
- All `<secret>` references in `.env` have a corresponding file
- All secret files are `chmod 600`
- No secret files are empty

Use `abtars doctor --fix` to auto-repair permissions.
