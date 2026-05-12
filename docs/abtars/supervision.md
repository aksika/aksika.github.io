# Process Supervision

How to run abTARS as a persistent service.

## Quick start

```bash
abtars start      # start bridge (foreground)
abtars stop       # stop bridge + watchdog
abtars restart    # restart bridge
```

## macOS (launchd)

abTARS installs a launchd plist for automatic restart:

```bash
abtars install    # sets up launchd plist
```

The watchdog monitors the bridge process and restarts it on crash. Use `abtars stop --force` to stop both watchdog and bridge (prevents auto-restart).

## Linux (systemd)

Create a user service:

```ini
# ~/.config/systemd/user/abtars.service
[Unit]
Description=abTARS Bridge

[Service]
ExecStart=%h/.abtars/bin/abtars start
Restart=on-failure
RestartSec=5

[Install]
WantedBy=default.target
```

```bash
systemctl --user enable abtars
systemctl --user start abtars
```

## Health monitoring

The bridge writes a heartbeat to `~/.abtars/bridge.lock`. The watchdog checks this file — if the heartbeat goes stale, the bridge is restarted.

Check status:
```
/status       → uptime, last heartbeat
/doctor       → full health probe
```
