# Installation

Install abtars + abmind from scratch, or repair a broken instance.

## TL;DR (Linux/WSL)

```bash
# 1. Install npm packages
npm install -g abtars@alpha abmind@alpha

# 2. Run abtars install (non-interactive — see flags below)
abtars install --non-interactive --accept-risk \
  --instance-name KP \
  --user-name aksika \
  --telegram-token "123456:ABC..." \
  --telegram-chat-id 7773842843 \
  --default-provider openrouter \
  --api-key "sk-or-v1-..." \
  --passphrase "your-passphrase"

# 3. Run abmind install (same passphrase!)
abmind install --non-interactive --force \
  --passphrase "your-passphrase" \
  --username aksika \
  --agent-name KP

# 4. Start the watchdog
abtars start
```

Done. Send a message to your Telegram bot.

## What gets installed

| Component | Location | Purpose |
|-----------|----------|---------|
| `abtars` CLI | `~/.nvm/versions/node/v22.22.0/bin/abtars` (nvm global) | Bridge management |
| `abmind` CLI | same | Memory engine |
| Runtime home | `~/.abtars/` | Config, secrets, logs, state |
| Memory home | `~/.abmind/` | SQLite memory DB, soul, encryption keys |
| Releases | `~/.abtars-releases/<version>/` | Versioned bundles |
| Service (Linux) | `~/.config/systemd/user/abtars-watchdog.service` | systemd --user watchdog |
| Service (Mac) | `~/Library/LaunchAgents/com.abtars.watchdog.plist` | launchd watchdog |

## Detailed procedure

### 1. Prerequisites

- **Node.js 22+** (nvm recommended)
- **Linux/WSL**: systemd user session (default on modern distros)
- **Mac**: launchd (always available)

Verify:

```bash
node --version    # v22.x or higher
which abtars     # should resolve after npm install
```

### 2. Install npm packages

Stable releases:

```bash
npm install -g abtars abmind
```

Alpha releases (latest features, may have bugs):

```bash
npm install -g abtars@alpha abmind@alpha
```

Specific version:

```bash
npm install -g abtars@0.3.4-alpha.5 abmind@0.3.0-alpha.0
```

abmind is a separate package but required — abtars loads it at runtime for memory. If abmind is missing, the bridge runs without persistent memory (with a warning).

### 3. Run `abtars install`

The install command creates `~/.abtars/` with config, secrets, and the systemd/launchd service. It does NOT install the bridge bundle — that's done by `abtars update` (which runs automatically after install).

#### Interactive mode (recommended for first-time setup)

```bash
abtars install
```

Walks you through:
- Instance name (e.g., KP, Molty)
- User name (e.g., aksika)
- Encryption passphrase (used to derive `abtars.key`)
- Telegram bot token (from [@BotFather](https://t.me/BotFather))
- Telegram chat ID (your user ID)
- Default model provider (openrouter, anthropic, ollama, kiro, gemini, openai)
- API key for the provider

#### Non-interactive mode (for scripts, CI, or re-installs)

```bash
abtars install --non-interactive --accept-risk \
  --instance-name NAME \
  --user-name USER \
  --telegram-token "TOKEN" \
  --telegram-chat-id CHAT_ID \
  --default-provider PROVIDER \
  --api-key "KEY" \
  --passphrase "PASSPHRASE"
```

**Required flags** (validation will fail without them):
- `--instance-name` — e.g., `KP`, `Molty`
- `--user-name` — e.g., `aksika`
- `--telegram-token` — bot token from BotFather
- `--telegram-chat-id` — your Telegram user ID
- `--passphrase` — encryption passphrase (used for `abtars.key`)
- `--accept-risk` — confirms you're bypassing safety prompts (required with `--non-interactive`)

**Optional flags**:
- `--default-provider` — `openrouter` (default), `anthropic`, `ollama`, `kiro`, `gemini`, `openai`
- `--api-key` — API key for the provider (stored in `~/.abtars/secret/`)
- `--default-model` — model name (defaults to a sensible model for the provider)
- `--force` — overwrite existing config

**Channel flag** (where to install from):
- `--alpha` — install latest alpha from npm
- `--stable` — install latest stable from npm
- `--dev [dir]` — install from local git checkout (default; pulls from GitHub)

Default is `--dev` (pulls source from GitHub via `abtars update` after install).

#### What `abtars install` writes

| Path | Contents |
|------|----------|
| `~/.abtars/config/.env` | Environment vars (MAIN_CHAT_ID, defaults, etc.) |
| `~/.abtars/config/transport.json` | Model + provider config |
| `~/.abtars/config/users.json` | User registry (you as master) |
| `~/.abtars/config/peers.json` | Peer-to-peer config (`self.name` = instance name) |
| `~/.abtars/config/abtars.key` | Encryption key (derived from passphrase via scrypt) |
| `~/.abtars/secret/TELEGRAM_BOT_TOKEN` | Bot token (plaintext — bridge auto-encrypts) |
| `~/.abtars/secret/OPENROUTER_API_KEY` | API key (plaintext) |
| `~/.abtars/manifest.json` | Install manifest (version, installMode) |
| `~/.config/systemd/user/abtars-watchdog.service` | systemd unit (Linux) |
| `~/Library/LaunchAgents/com.abtars.watchdog.plist` | launchd plist (Mac) |

Secrets are written as **plaintext files** in `~/.abtars/secret/`. The bridge auto-encrypts them on first read using `abtars.key`. If `abtars.key` is missing (e.g., fresh install with different passphrase), the bridge falls back to plaintext.

### 4. Run `abmind install`

abmind is the memory engine. It needs the same passphrase as abtars (the keys are derived separately but both use scrypt with the same passphrase + username).

```bash
abmind install --non-interactive --force \
  --passphrase "your-passphrase" \
  --username aksika \
  --agent-name KP
```

This creates `~/.abmind/` with the encrypted memory database and `abmind.key`.

If you skip this step, the bridge runs without persistent memory (with a warning). Memory is required for session continuity, recall, and sleep.

### 5. Start the watchdog

```bash
abtars start
```

This loads the systemd user service (Linux) or bootstraps the launchd plist (Mac). The watchdog starts the bridge, monitors heartbeats, and respawns on death.

Verify:

```bash
abtars status     # bridge: ● running
abtars doctor     # all green
```

Send a message to your Telegram bot — it should respond.

## From-scratch reinstall (nuke and rebuild)

To completely reset:

```bash
# 1. Stop everything
abtars stop

# 2. Nuke runtime state (data backed up separately, see /5.5)
rm -rf ~/.abtars ~/.abmind

# 3. Reinstall npm packages
npm install -g abtars@alpha abmind@alpha

# 4. Run install (see above)
abtars install --non-interactive --accept-risk --force ...
abmind install --non-interactive --force ...

# 5. Start
abtars start
```

## Secrets handling

Secrets are stored in `~/.abtars/secret/` as one file per secret:

```bash
ls ~/.abtars/secret/
# OPENROUTER_API_KEY
# TELEGRAM_BOT_TOKEN
```

Format:
- **Plaintext** (default after fresh install): just the secret value
- **Encrypted** (after first bridge read, if `abtars.key` exists): `ENC:base64(...)` with version byte + IV + ciphertext + authTag

The bridge reads secrets on every access, decrypts if needed, and caches the plaintext in memory.

**To rotate secrets**: replace the file content (plaintext or encrypted), then `abtars restart` to clear the cache.

**To add a new secret**: write the file as plaintext, bridge auto-encrypts on next read.

## Encryption keys

Two separate keys, both derived from your passphrase via scrypt:

| Key | Path | Purpose |
|-----|------|---------|
| `abtars.key` | `~/.abtars/config/abtars.key` | Encrypts abtars secrets |
| `abmind.key` | `~/.abmind/abmind.key` | Encrypts abmind memory DB |

**Important**: both keys are derived from the SAME passphrase + username. If you change the passphrase, both keys are re-derived. Existing encrypted data becomes unreadable.

## systemd --user setup (Linux)

abtars uses systemd user services (no root required). The install step copies the unit file to `~/.config/systemd/user/abtars-watchdog.service` and enables it.

To check status:

```bash
systemctl --user status abtars-watchdog.service
```

To view logs:

```bash
tail -f ~/.abtars/logs/bridge.log
tail -f ~/.abtars/logs/watchdog.log
```

If systemd user services don't auto-start on boot, enable lingering:

```bash
sudo loginctl enable-linger $USER
```

## launchd setup (Mac)

abtars uses launchd LaunchAgents. The install step copies the plist to `~/Library/LaunchAgents/com.abtars.watchdog.plist` and bootstraps it.

To check status:

```bash
launchctl list | grep abtars
```

To view logs:

```bash
tail -f ~/.abtars/logs/bridge.log
tail -f ~/.abtars/logs/watchdog-launchd.log
```

## Troubleshooting

### "abtars: command not found" after npm install

Your shell's PATH doesn't include nvm's global bin. Check:

```bash
npm root -g     # should be ~/.nvm/versions/node/v22.22.0/lib/node_modules
which abtars    # should be ~/.nvm/versions/node/v22.22.0/bin/abtars
```

If `which abtars` returns `~/.local/bin/abtars` (a stale wrapper), delete it:

```bash
rm -f ~/.local/bin/abtars
hash -r  # clear shell cache
```

### "abmind not installed" warning

abmind is a separate npm package. Install it:

```bash
npm install -g abmind@alpha
```

The bridge runs without memory (with a warning) but loses session continuity.

### Bridge won't start after install

Check the watchdog log:

```bash
tail -50 ~/.abtars/logs/watchdog.log
```

Common causes:
- Missing `abtars.key` (run `abtars install` again with the same passphrase)
- Stale `.bridge.flock` (delete `~/.abtars/.bridge.flock` and restart)
- Missing `abmind` (install it, see above)

Run doctor for a full diagnosis:

```bash
abtars doctor
abtars doctor --fix   # auto-fix common issues
```

### Telegram bot doesn't respond

1. Check the bot token: `head -c 20 ~/.abtars/secret/TELEGRAM_BOT_TOKEN`
2. Check the chat ID: `grep MAIN_CHAT_ID ~/.abtars/config/.env`
3. Check bridge logs: `tail -20 ~/.abtars/logs/bridge.log`
4. Verify with doctor: `abtars doctor` (should show `platforms — telegram: ok (getMe ok)`)

## See also

- [Quick Start](./quickstart) — minimal steps
- [Upgrading](./upgrade) — update to a new version
- [Deploy Pipeline](./deploy) — how code gets deployed
- [Health Check](./healthcheck) — doctor probes
- [Troubleshooting](./troubleshooting) — common issues
