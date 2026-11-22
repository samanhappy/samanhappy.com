#!/usr/bin/env bash
set -Eeuo pipefail

image=${1:?Usage: deploy.sh app-image@sha256:digest}
[[ "$image" =~ ^ghcr\.io/[a-z0-9._/-]+@sha256:[a-f0-9]{64}$ ]] || {
  echo 'Invalid image digest' >&2
  exit 1
}

cd "${DEPLOY_DIR:-/opt/samanhappy}"
exec 9>.deploy.lock
flock -n 9 || {
  echo 'Another deployment is running' >&2
  exit 1
}

umask 077
override=$(mktemp)
trap 'rm -f -- "$override"' EXIT
printf 'services:\n  app:\n    image: samanhappy-app:latest\n' > "$override"

compose=(docker compose -f compose.yml -f "$override")
"${compose[@]}" config --quiet
docker pull "$image"

container_id=$("${compose[@]}" ps -q app || true)
rollback=""
if [ -n "$container_id" ]; then
  previous=$(docker inspect --format '{{.Image}}' "$container_id")
  rollback="samanhappy-app:rollback-$(date -u +%Y%m%d%H%M%S)-$$"
  docker tag "$previous" "$rollback"
fi

healthy() {
  local zh_html en_html
  for attempt in {1..20}; do
    if zh_html=$(curl --fail --silent --show-error --max-time 5 http://127.0.0.1:3100/zh 2>/dev/null) &&
       [[ "$zh_html" == *"</html>"* ]] &&
       en_html=$(curl --fail --silent --show-error --max-time 5 http://127.0.0.1:3100/en 2>/dev/null) &&
       [[ "$en_html" == *"</html>"* ]] &&
       curl --fail --silent --show-error --max-time 10 --resolve samanhappy.com:443:127.0.0.1 https://samanhappy.com/zh -o /dev/null 2>/dev/null; then
      return 0
    fi
    sleep 2
  done
  return 1
}

rollback_on_error() {
  trap - ERR HUP INT TERM
  if [ -n "$rollback" ]; then
    echo "Deployment failed; restoring $rollback" >&2
    if docker tag "$rollback" samanhappy-app:latest &&
       "${compose[@]}" up -d --no-build --no-deps app &&
       healthy; then
      echo 'Rollback verified' >&2
    else
      echo "ROLLBACK FAILED: manual recovery required; image $rollback retained" >&2
    fi
  else
    echo 'Deployment failed; no previous image available for rollback' >&2
  fi
  exit 1
}

trap rollback_on_error ERR HUP INT TERM
docker tag "$image" samanhappy-app:latest
"${compose[@]}" up -d --no-build --no-deps app
healthy
trap - ERR HUP INT TERM

# Keep the latest 2 rollback tags and prune older samanhappy digest refs to conserve disk space.
mapfile -t old_rollbacks < <(
  docker images --format '{{.Repository}}:{{.Tag}}' samanhappy-app \
    | grep '^samanhappy-app:rollback-' \
    | sort -r \
    | tail -n +3 || true
)
if [ "${#old_rollbacks[@]}" -gt 0 ]; then
  docker rmi "${old_rollbacks[@]}" >/dev/null 2>&1 || true
fi

mapfile -t old_digests < <(
  docker images --digests --format '{{.Repository}}@{{.Digest}}' ghcr.io/samanhappy/samanhappy.com \
    | grep '@sha256:' \
    | grep -Fxv "$image" || true
)
if [ "${#old_digests[@]}" -gt 0 ]; then
  docker rmi "${old_digests[@]}" >/dev/null 2>&1 || true
fi

printf 'Deployed %s; rollback image: %s\n' "$image" "${rollback:-none}"
