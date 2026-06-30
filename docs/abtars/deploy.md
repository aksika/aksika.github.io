# Deploy Pipeline

How code gets from source to a running bridge.

## Quick reference

```bash
# Update to latest alpha from npm
abtars update --alpha

# Update to latest stable
abtars update --stable

# Update from local git checkout (dev iteration)
abtars update --dev .

# Restart without rebuilding
abtars restart

# Cold restart (starts watchdog if dead)
abtars restart --cold
```

## What `abtars update` does

1. **Fetch** — pulls the new version (npm tarball or local checkout)
2. **Stage** — copies artifacts to `~/.abtars-releases/<version>/`
3. **Doctor** — runs `abtars doctor --fix` (permissions, stale locks, missing dirs)
4. **Activate** — atomically swaps the `app` symlink: `~/.abtars/app → ~/.abtars-releases/<new-version>`
5. **Restart** — writes `update:<version>` to `.start-reason`, watchdog exits, systemd/launchd respawns with new code
6. **Verify** — polls for bridge health (timeout 30s)

## What gets deployed

| Source | Target | Contents |
|--------|--------|----------|
| npm tarball or `src/` | `~/.abtars-releases/<version>/` | Bundle + scripts + skills + prompts + install-manifest.json |
| `releases/<version>/bundle/abtars.js` | `~/.abtars/app/bundle/abtars.js` (via symlink) | Bridge entry point |
| `releases/<version>/bundle/abtars-cli.js` | `~/.abtars/app/bundle/abtars-cli.js` (via symlink) | CLI entry point |
| `releases/<version>/templates/` | `~/.abtars/` (reconciled) | Config templates, skills, prompts |
| `releases/<version>/scripts/abtars-watchdog.{sh,service,plist}` | `~/.abtars-releases/src/abtars/scripts/` (for --dev) OR stays in `<version>/scripts/` (for --alpha) | Watchdog script and service definition |

**`src/` is a git checkout**, updated only by `--dev` deploys (via `git pull`). The systemd unit references `src/abtars/scripts/abtars-watchdog.sh` so that `git pull` in `src/` immediately makes new code live without rewriting the unit. This is intentional architecture (#1263 analysis) — `--alpha` deploys target `<version>/scripts/` (different from `src/`) and are a different use case.

## Directory layout after deploy

```
~/.abtars-releases/
├── 0.3.4-alpha.4/           # previous release
├── 0.3.4-alpha.5/           # active release
│   ├── bundle/
│   │   ├── abtars.js        # bridge entry
│   │   ├── abtars-cli.js    # CLI entry
│   │   └── ...              # chunked modules
│   ├── scripts/
│   │   ├── abtars-watchdog.sh
│   │   ├── abtars-watchdog.service
│   │   └── com.abtars.watchdog.plist
│   ├── templates/           # config templates, skills, prompts
│   └── install-manifest.json
├── src/                     # git checkout (for --dev deploys)
│   └── abtars/
│       └── scripts/
│           └── abtars-watchdog.sh  # what systemd runs
└── app.staging/             # transient (during deploy)

~/.abtars/
├── app → ~/.abtars-releases/0.3.4-alpha.5/   # symlink
├── config/                  # preserved across deploys
├── secret/                  # preserved across deploys
├── logs/                    # preserved across deploys
├── state/                   # preserved across deploys
├── kanban/                  # preserved across deploys
└── manifest.json            # updated with new version
```

## Restart modes

| Mode | How | When to use |
|------|-----|-------------|
| Warm | Writes `update:<version>` to `.start-reason` → watchdog reads → `process.exit(0)` → supervisor respawns with new code | Normal `abtars update` |
| Cold | Same as warm if bridge alive. If dead: starts watchdog directly. | After crashes, first boot |
| Force | `abtars stop --force` → kills watchdog first, then bridge. Required on Mac (launchd respawns immediately otherwise). | When `abtars stop` hangs |

## Doctor on every boot

The watchdog runs `abtars doctor --fix` before every bridge spawn:

```
watchdog.sh → abtars doctor --fix → node app/bundle/abtars.js
```

Doctor auto-fixes:
- File permissions (`~/.abtars/secret/`, `~/.abtars/config/`, `~/.abmind/secret/`)
- Stale locks (`deploy.lock`, `.start-reason`, `sleep.lock`, `memory.sock`)
- Missing directories (`logs/`, `workspace/`, `overflow/`, `received/`)
- Orphan processes (kiro-cli, abtars-sleep, duplicate bridges)
- Watchdog systemd unit (copies if missing, enables, starts)

If doctor can't fix something, it warns but doesn't block startup.

## Platform enablement

`~/.abtars/config/.env` is the single source of truth for which components start:

```bash
TELEGRAM_ENABLED=true
DISCORD_ENABLED=true
IRC_ENABLED=false
ENABLE_DASHBOARD=true
ENABLE_AGENT_API=true
SELFHEAL_ENABLED=true
```

Set by `abtars install` based on which secrets are provided. Edit `.env` to enable/disable platforms without re-running install.

## Deploy to remote (Molty)

For cross-machine deploys (Linux dev → Mac target):

```bash
# On the Linux dev machine
cd ~/workspace/ab/abtars
git pull --ff-only origin dev
npm run bundle

# Bundle the release
tar czf abtars-bundle.tgz bundle/ scripts/ templates/ package.json

# Copy to Mac
scp abtars-bundle.tgz molty:~/

# On the Mac
tar xzf abtars-bundle.tgz
abtars update --dev .
```

Or use the bundled `scripts/emergency-deploy.sh` for one-shot remote deploys with rollback.

## Rollback

```bash
abtars rollback    # restores previous release
```

Up to 3 previous releases are kept in `~/.abtars-releases/`. See [Upgrading](./upgrade) for details.

## See also

- [Installation](./install) — fresh install
- [Upgrading](./upgrade) — version updates
- [Architecture](./architecture) — system design
- [Boot Phases](./boot) — startup sequence
- [Health Check](./healthcheck) — doctor probes
