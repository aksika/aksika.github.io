# Peer-to-Peer (A2A)

Multiple abTARS instances can communicate directly — agent-to-agent. One instance asks another a question or delegates a task, and gets a response.

## How it works

Each abTARS instance exposes an **Agent API** — an authenticated HTTP endpoint on port 3100. Other instances call it using the `peer_ask` tool.

```
┌──────────┐   peer_ask    ┌──────────┐
│    KP    │ ────────────► │  Molty   │
│ (WSL)    │ ◄──────────── │  (Mac)   │
└──────────┘   response    └──────────┘
```

## peer_ask tool

The agent uses `peer_ask` to talk to another instance:

```
peer_ask(peer: "molty", message: "What's your current sleep status?")
→ "I'm awake, last slept 6 hours ago."
```

The remote instance processes the message through its full agent pipeline (model, memory, tools) and returns the response.

## Agent API

The endpoint uses **TLS-PSK** authentication — pre-shared keys, no certificates needed.

- **Port:** 3100
- **Protocol:** HTTP POST (OpenAI-compatible `/v1/chat/completions`)
- **Auth:** Bearer token (PSK from `peers.json`)

## Configuration

`~/.abtars/config/peers.json`:

```json
{
  "self": "kp",
  "peers": [
    {
      "name": "molty",
      "host": "100.82.167.127:3100",
      "psk": "shared-secret-here"
    }
  ]
}
```

| Field | Purpose |
|-------|---------|
| `self` | This instance's name (how others address it) |
| `peers[].name` | Peer's name (used in `peer_ask`) |
| `peers[].host` | Peer's address and port |
| `peers[].psk` | Pre-shared key for authentication |

## Use cases

- **Cross-host delegation:** "Ask Molty to check if Ollama is running"
- **Information sharing:** "What did you tell the user last?"
- **Coordinated tasks:** One instance triggers work on another
- **Health checks:** Verify a peer is alive and responsive

## Enabling the Agent API

Start the bridge with `--agent`:

```bash
abtars start --agent
```

This opens port 3100 for incoming peer requests. Without `--agent`, the instance can call peers but won't accept incoming calls.
