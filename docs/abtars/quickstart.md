# Quick Setup Guide

From zero to a running abTARS agent in 15 minutes.

## 1. Create a dedicated user

Run the agent under its own limited user — no sudo, no access to your personal files.

```bash
# Linux/WSL
sudo useradd -m -s /bin/bash abtars
sudo passwd abtars

# macOS
sudo sysadminctl -addUser abtars -password "<password>" -home /Users/abtars
```

Then switch to that user for all remaining steps:
```bash
su - abtars
```

::: tip Why a separate user?
The agent executes shell commands via its `execute_bash` tool. A dedicated user with no sudo access limits blast radius — it can't `rm -rf /` or modify system configs even if the model hallucinates a dangerous command.
:::

## 2. Install dependencies

```bash
# Node.js 22+ (required)
curl -fsSL https://fnm.vercel.app/install | bash
fnm install 22
fnm use 22

# Ollama (recommended — free local models as fallback)
curl -fsSL https://ollama.com/install.sh | sh
ollama pull nemotron-3-super    # or any model you prefer
```

Optional:
- **Telegram bot token** — from [@BotFather](https://t.me/BotFather)
- **OpenRouter API key** — for paid cloud models (recommended for quality)

## 3. Choose your supervision model

| Platform | Recommended | How |
|----------|-------------|-----|
| **macOS** | launchd (daemon) | Auto-starts on boot, auto-restarts on crash |
| **Linux/WSL** | systemd user service | Same — auto-start + auto-restart |
| **Manual** | Foreground | `abtars start` in a tmux/screen session |

The installer sets up supervision automatically. You choose during `abtars install`.

## 4. Install abmind (memory)

abmind provides persistent memory, recall, and the sleep/dream cycle. Install it first — abTARS depends on it.

```bash
cd ~
git clone https://github.com/aksika/abmind.git
cd abmind
npm install && npm run build
node dist/cli/abmind.js install
abmind update
```

Verify: `abmind status` should show version and memory DB path.

## 5. Install abTARS (bridge)

```bash
cd ~
git clone https://github.com/aksika/abtars.git
cd abtars
npm install && npm run build
node dist/cli/abtars.js install
abtars update
```

Verify: `abtars status` should show the installed version.

## 6. Onboard (configure)

Interactive wizard — sets up platform, model provider, and chat ID:

```bash
abtars onboard
```

It asks for:
- **Platform:** Telegram (recommended) or Discord
- **Bot token:** paste from BotFather
- **Chat ID:** your Telegram user ID (the bot will tell you on first message)
- **Model provider:** ollama (free, local) or OpenRouter (paid, cloud)
- **Model:** pick from available models

For non-interactive setup (CI/scripting):
```bash
abtars onboard --non-interactive \
  --telegram-token "123:ABC..." \
  --telegram-chat-id "7773842843" \
  --transport ollama \
  --model "nemotron-3-super"
```

## 7. Start

```bash
abtars start
```

On macOS/Linux with supervision enabled, the watchdog starts automatically on boot. You don't need to run this manually after the first time.

## 8. Verify

```bash
abtars doctor    # full health check
abtars status    # version + process state
```

Send a message to your bot on Telegram — it should respond.

## Post-install tips

### Secrets management

Store API keys in `~/.abtars/secret/<KEY_NAME>` (one file per key, chmod 600). Reference them in `.env` as:
```
OPENROUTER_API_KEY=<secret>
```
The bridge resolves `<secret>` at boot by reading the file.

### Model configuration

Edit `~/.abtars/config/transport.json` to add providers and assign models to agents:
```json
{
  "agents": {
    "professor": { "model": "nemotron-3-super", "provider": "ollama" }
  },
  "providers": {
    "ollama": { "transport": "api", "endpoint": "http://localhost:11434/v1" }
  }
}
```

Use `/model` in chat to switch models on the fly.

### Skills

The agent comes with 26 core skills (cron, browser, memory search, etc.). It can create its own skills at runtime when it discovers reusable workflows. See `/skill` in chat.

### Updates

```bash
cd ~/abtars && git pull && abtars update
```

This rebuilds, deploys, and restarts in one command. Zero downtime — the watchdog handles the restart.

## Troubleshooting

| Problem | Fix |
|---------|-----|
| `abtars: command not found` | Add `~/.local/bin` to PATH |
| Bridge starts but no Telegram response | Check `TELEGRAM_BOT_TOKEN` and `MAIN_CHAT_ID` in `.env` |
| Ollama models not loading | Run `ollama serve` and `ollama list` to verify |
| Permission denied on secrets | `chmod 600 ~/.abtars/secret/*` |
| Watchdog kills bridge | Check `abtars doctor` — usually a stale heartbeat from a hung model call |

For detailed troubleshooting, see the [full installation reference](https://github.com/aksika/abtars/blob/dev/docs/install.md).
