# Quick Start

Minimal steps. For detailed explanations, see [Installation](./install).

## 1. Install

```bash
npm install -g abtars@alpha abmind@alpha
```

Requires Node.js 22+.

## 2. Setup

```bash
abtars install --non-interactive --accept-risk \
  --instance-name KP \
  --user-name aksika \
  --telegram-token "123456:ABC..." \
  --telegram-chat-id 7773842843 \
  --default-provider openrouter \
  --api-key "sk-or-v1-..." \
  --passphrase "your-passphrase"

abmind install --non-interactive --force \
  --passphrase "your-passphrase" \
  --username aksika \
  --agent-name KP
```

The passphrase must match between abtars and abmind — both derive their encryption keys from it.

## 3. Start

```bash
abtars start
```

## 4. Verify

```bash
abtars status       # bridge: ● running
abtars doctor       # all green
```

Send a message to your bot — it should respond.

## Cheat sheet

### Update

```bash
npm update -g abtars@alpha abmind@alpha
abtars update --alpha
```

### Stop / restart

```bash
abtars stop
abtars start
```

### Diagnose

```bash
abtars doctor --fix
tail -50 ~/.abtars/logs/watchdog.log
tail -50 ~/.abtars/logs/bridge.log
```

### Where is everything?

```
~/.abtars/
├── config/          .env, transport.json, users.json, peers.json, abtars.key
├── secret/          API keys (plaintext or ENC:base64)
├── logs/            watchdog.log, bridge.log, watchdog-launchd.log
├── releases/        Versioned deployments (via ~/.abtars-releases/)
└── manifest.json    Install manifest

~/.abmind/
├── memory/          core/ (SOUL.md, etc.) + memory.db (SQLite)
├── secret/          abmind.key
└── manifest.json
```

## See also

- [Installation](./install) — detailed procedure, troubleshooting, both platforms
- [Upgrading](./upgrade) — update to a new version
- [Health Check](./healthcheck) — doctor probes
- [Troubleshooting](./troubleshooting) — common issues
