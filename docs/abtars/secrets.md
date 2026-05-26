# Secrets Management

API keys and tokens are stored as encrypted files — never in `.env` directly, never committed to git.

## How it works

1. Secrets live in `~/.abtars/secret/<KEY_NAME>` (one file per key, encrypted)
2. `.env` references them with `<secret>` placeholder
3. On boot, abTARS decrypts the file and injects the value

All secret files are encrypted with AES-256-GCM using a key derived from your passphrase (via abmind's master key). See [abmind Security](/abmind/security) for the full key hierarchy.

## Setup

During `abtars install`, you set a passphrase. This derives the encryption key. Secrets written after that are automatically encrypted.

For existing installs, run `abtars passwd` to migrate from the legacy random key to passphrase-based encryption.

## Example

```bash
# Secrets are written via the migration or onboarding — not manually.
# The file content looks like:
cat ~/.abtars/secret/OPENROUTER_API_KEY
# ENC:AXj2k8...base64blob...
```

In `~/.abtars/config/.env`:

```env
OPENROUTER_API_KEY=<secret>
TELEGRAM_BOT_TOKEN=<secret>
```

On boot, abTARS reads the file, decrypts it, and injects the plaintext value into the runtime. The `.env` file never contains the actual secret.

## Passphrase for daemon mode

The bridge needs the passphrase to decrypt secrets at boot. Options:

1. `ABMIND_PASSPHRASE` environment variable (systemd unit, shell profile)
2. macOS Keychain (works under launchd — set during `abtars passwd`)
3. Interactive prompt (only if TTY available)

## Requirements

| Rule | Why |
|------|-----|
| `chmod 600` on every secret file | `abtars doctor` checks this |
| One key per file | File name = env var name |
| Never commit secrets to public repos | `.env` with `<secret>` is safe; actual files are encrypted blobs |

## Portability

Same passphrase + same username on any machine = same encryption key. You can copy `~/.abtars/secret/` to a new machine, enter your passphrase, and everything decrypts.

## Commands

| Command | Purpose |
|---------|---------|
| `abtars passwd` | Set or change passphrase, re-encrypts all secrets |
| `abtars doctor` | Verifies secret files exist, permissions correct |

## Doctor check

`abtars doctor` verifies:
- All `<secret>` references in `.env` have a corresponding file
- All secret files are `chmod 600`
- No secret files are empty

Use `abtars doctor --fix` to auto-repair permissions.
