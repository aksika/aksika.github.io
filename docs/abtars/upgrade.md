# Upgrading

Update abtars + abmind to a new version.

## Update via npm (alpha/stable)

The default and recommended path. The bridge, watchdog, and configs are preserved.

```bash
# Update npm packages
npm update -g abtars@alpha abmind@alpha

# Deploy the new version
abtars update --alpha
```

`abtars update`:
1. Pulls the new version from npm
2. Stages it to `~/.abtars-releases/<version>/`
3. Runs `doctor --fix` (permissions, stale locks)
4. Stops the old bridge (watchdog stops)
5. Starts the new bridge (watchdog respawns)
6. Verifies health

**Verify after update**:

```bash
abtars status              # version should match npm tag
abtars doctor              # all green
```

## Channel flags

`abtars update` and `abtars install` accept a channel flag:

| Flag | Source | Use when |
|------|--------|----------|
| `--alpha` (default) | npm `@alpha` tag | Testing latest features |
| `--stable` | npm `latest` tag | Production |
| `--dev [dir]` | Local git checkout | Active development |
| `--source=alpha` | npm `@alpha` tag | (hidden alias for `--alpha`) |
| `--source=local` | Local git checkout | (hidden alias for `--dev`) |

**Default is `--dev`** — pulls source from GitHub. Use `--alpha` or `--stable` explicitly to pull from npm.

## Update from local source (dev iteration)

When developing abtars itself:

```bash
cd ~/workspace/ab/abtars
git pull --ff-only origin dev
npm run build
abtars update --dev .    # deploy from current directory
```

For remote deploys (Linux → Mac):

```bash
# On the dev machine (Linux/WSL)
cd ~/workspace/ab/abtars
git pull --ff-only origin dev
npm run bundle           # esbuild → bundle/
# Bundle is in bundle/ — copy to Mac

# On the target machine (Mac)
cd ~/workspace/ab/abtars
git fetch origin dev
git checkout <commit>
npm run bundle
abtars update --dev .
```

Or use the deploy script:

```bash
# Linux → Mac via SSH
abtars update --from-local  # bundles current dir, pushes to configured remote
```

## Update abmind only

If only abmind changed (no abtars changes):

```bash
cd ~/workspace/ab/abmind
npm run build
abtars update              # abtars picks up the new abmind via npm link or global
```

Or, if abmind is installed globally:

```bash
npm update -g abmind@alpha
abtars stop && abtars start
```

## Rollback

```bash
abtars rollback    # restores previous release from ~/.abtars-releases/rollback/
```

`abtars rollback` keeps the last 3 releases. Use `abtars status` to see available rollbacks:

```
rollback: 3 available
previous: 0.3.4-alpha.4
```

## What gets replaced on update

| Path | Action |
|------|--------|
| `~/.abtars-releases/<new-version>/` | Created (new bundle, scripts) |
| `~/.abtars/app` | Symlink → `releases/<new-version>` (atomic) |
| `~/.abtars-releases/src/` | NOT updated (git checkout for --dev) — see warning below |
| `~/.abtars/config/` | Preserved |
| `~/.abtars/secret/` | Preserved |
| `~/.abtars/memory.db` (etc) | Preserved |
| `~/.abmind/` | Preserved |

**Warning**: the systemd watchdog unit references `~/.abtars-releases/src/abtars/scripts/abtars-watchdog.sh`. For `--dev` deploys, this works (src/ is the git checkout). For `--alpha` deploys, the new script is at `releases/<version>/scripts/`, not `src/`. See [issue #1263](https://github.com/aksika/abproject/issues/1263) for the fix.

**Workaround** until #1263 is fixed:

```bash
# After --alpha deploy, refresh src/ manually
cp ~/.abtars-releases/<new-version>/scripts/abtars-watchdog.sh \
   ~/.abtars-releases/src/abtars/scripts/abtars-watchdog.sh
abtars stop && abtars start
```

## Verify after update

```bash
cat ~/.abtars/manifest.json | python3 -c "import json,sys;print(json.load(sys.stdin).get('version','?'))"
```

Should match the latest git commit short SHA (for --dev) or npm version (for --alpha/--stable).

Also check:
1. All probes pass in `abtars doctor`
2. Telegram/Discord polling started (check logs)
3. No EADDRINUSE errors (old process lingering)
4. Secrets still readable: `head -c 4 ~/.abtars/secret/TELEGRAM_BOT_TOKEN`

## See also

- [Installation](./install) — fresh install procedure
- [Deploy Pipeline](./deploy) — how code gets deployed
- [Quick Start](./quickstart) — minimal steps
