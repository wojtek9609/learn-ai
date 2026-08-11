#!/usr/bin/env bash
# ==========================================================================
# Learn AI - dev channel over Tailscale.
#
#   ./scripts/dev-tailscale.sh          start  (python3 http.server + tailscale serve)
#   ./scripts/dev-tailscale.sh --stop   stop   (kill server + tailscale serve reset)
#
# HTTPS is required for service workers / PWA install, and `tailscale serve`
# terminates TLS for us with a real cert on the tailnet.
# The dev origin differs from the GitHub Pages origin, so the phone installs
# it as a SEPARATE app instance - the released install is untouched.
# ==========================================================================

set -euo pipefail

REPO_DIR="/Users/wojciechwlodarczyk/learn-ai"
PORT=8080
TS_URL="https://macbook-pro.tail4be69a.ts.net"
PID_FILE="${TMPDIR:-/tmp}/learn-ai-dev-server.pid"
LOG_FILE="${TMPDIR:-/tmp}/learn-ai-dev-server.log"

stop() {
  if [[ -f "$PID_FILE" ]]; then
    PID="$(cat "$PID_FILE")"
    if kill -0 "$PID" 2>/dev/null; then
      kill "$PID" 2>/dev/null || true
      echo "Stopped http.server (pid $PID)."
    fi
    rm -f "$PID_FILE"
  fi

  # Belt and braces: anything else still holding the port.
  if command -v lsof >/dev/null 2>&1; then
    PIDS="$(lsof -ti tcp:"$PORT" || true)"
    if [[ -n "$PIDS" ]]; then
      echo "$PIDS" | xargs kill 2>/dev/null || true
      echo "Freed port $PORT."
    fi
  fi

  tailscale serve reset || true
  echo "tailscale serve reset."
}

start() {
  if command -v lsof >/dev/null 2>&1 && lsof -ti tcp:"$PORT" >/dev/null 2>&1; then
    echo "Port $PORT is already in use - reusing it."
  else
    nohup python3 -m http.server "$PORT" --directory "$REPO_DIR" \
      >"$LOG_FILE" 2>&1 &
    echo $! >"$PID_FILE"
    echo "Started http.server on :$PORT (pid $(cat "$PID_FILE")), log: $LOG_FILE"
  fi

  tailscale serve --bg --https=443 "http://localhost:$PORT"

  echo
  echo "Dev channel is live. Open this on the phone (same tailnet):"
  echo
  echo "    $TS_URL"
  echo
  echo "Chrome menu -> Install app / Add to Home screen installs it as"
  echo "a separate PWA from the released one."
  echo "Stop with: $0 --stop"
}

case "${1:-}" in
  --stop|stop)
    stop
    ;;
  ""|--start|start)
    start
    ;;
  *)
    echo "Usage: $0 [--stop]" >&2
    exit 1
    ;;
esac
