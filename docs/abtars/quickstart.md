# Quick Setup Guide

Steps only. For detailed explanations, see [Installation Reference](/abtars/install).

## 1. Create a dedicated user

```bash
# Linux/WSL
sudo useradd -m -s /bin/bash abtars && sudo passwd abtars
su - abtars

# macOS
sudo sysadminctl -addUser abtars -password "<password>" -home /Users/abtars
su - abtars
```

No sudo access for this user. The agent runs shell commands — limit the blast radius.

## 2. Install dependencies

```bash
# Node.js 22+
curl -fsSL https://fnm.vercel.app/install | bash && fnm install 22 && fnm use 22

# Ollama (local models)
curl -fsSL https://ollama.com/install.sh | sh
ollama pull nemotron-3-super    # recommended cloud-capable model
```

## 3. Choose supervision model

| Platform | Recommended |
|----------|-------------|
| macOS | launchd (auto-start + auto-restart) |
| Linux/WSL | systemd user service |
| Manual | `abtars start` in tmux |

The installer configures this automatically.

## 4. Install abmind (memory)

```bash
git clone https://github.com/aksika/abmind.git && cd abmind
npm install && npm run build
node dist/cli/abmind.js install && abmind update
```

## 5. Install abTARS (bridge)

```bash
cd ~ && git clone https://github.com/aksika/abtars.git && cd abtars
npm install && npm run build
node dist/cli/abtars.js install && abtars update
```

## 6. Get a Telegram bot

1. Open [@BotFather](https://t.me/BotFather) on Telegram
2. `/newbot` → pick a name → copy the **bot token**
3. Send any message to your new bot, then visit `https://api.telegram.org/bot<TOKEN>/getUpdates` to find your **chat ID**

## 7. Get model provider credentials

Ollama runs locally (no key needed), but for better results use a paid provider:

| Provider | Get key at | What you get |
|----------|-----------|--------------|
| OpenRouter | [openrouter.ai/keys](https://openrouter.ai/keys) | Access to Claude, GPT, Gemini, open models |
| OpenAI (Codex) | [platform.openai.com/api-keys](https://platform.openai.com/api-keys) | GPT-5.4-mini, GPT-5.5 |
| Google (Gemini) | [aistudio.google.com/apikey](https://aistudio.google.com/apikey) | Gemini 2.5 Flash/Pro |
| Kiro CLI | Install via `npm i -g @anthropic-ai/kiro-cli` | Claude models via CLI |

Pick at least one. Store keys in `~/.abtars/secret/<KEY_NAME>` (chmod 600) after install.

## 8. Onboard

```bash
abtars onboard
```

The wizard asks for: platform (Telegram), bot token, chat ID, provider, model.

## 9. Start

```bash
abtars start
```

## 10. Verify

```bash
abtars doctor
```

Send a message to your bot on Telegram — it should respond.
