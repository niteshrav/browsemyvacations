#!/usr/bin/env bash
# One-shot VPS deploy for Browse My Vacations.
# Run on the server from the repo root (or any path; script cds to repo root):
#   bash scripts/vps-deploy.sh
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

SITE_URL="${BMV_SITE_URL:-https://browsemyvacations.com}"
API_PUBLIC="${BMV_PUBLIC_API_URL:-/api/v1}"

echo "==> Repo: $ROOT"
echo "==> Pull latest"
git fetch origin main
git checkout main
git pull --ff-only origin main

echo "==> Ensure frontend production env (same-origin API — no HTTP/HTTPS mixed content)"
mkdir -p frontend
need_write=0
if [[ ! -f frontend/.env.local ]]; then
  need_write=1
elif grep -Eq 'NEXT_PUBLIC_API_URL=.*https?://' frontend/.env.local 2>/dev/null; then
  # Absolute URL in browser causes mixed content after SSL; force same-origin.
  need_write=1
elif ! grep -q 'NEXT_PUBLIC_API_URL="/api/v1"' frontend/.env.local 2>/dev/null \
  && ! grep -q "NEXT_PUBLIC_API_URL='/api/v1'" frontend/.env.local 2>/dev/null \
  && ! grep -q 'NEXT_PUBLIC_API_URL=/api/v1' frontend/.env.local 2>/dev/null; then
  need_write=1
fi

if [[ "$need_write" -eq 1 ]]; then
  # Keep unrelated keys; rewrite only SITE/API public URLs
  other="$(grep -Ev '^(NEXT_PUBLIC_SITE_URL|NEXT_PUBLIC_API_URL)=' frontend/.env.local 2>/dev/null || true)"
  {
    echo "NEXT_PUBLIC_SITE_URL=\"${SITE_URL}\""
    echo "NEXT_PUBLIC_API_URL=\"${API_PUBLIC}\""
    [[ -n "$other" ]] && echo "$other"
  } > frontend/.env.local
fi
echo "frontend/.env.local:"
grep -E 'NEXT_PUBLIC_(SITE|API)_URL' frontend/.env.local || true

echo "==> Ensure backend allows local image uploads when Cloudinary is unset"
if [[ -f backend/.env ]]; then
  if ! grep -q "https://browsemyvacations.com" backend/.env 2>/dev/null; then
    echo "!! Tip: set CORS_ORIGIN=\"https://browsemyvacations.com,https://www.browsemyvacations.com\" in backend/.env"
  fi
  if ! grep -q '^ALLOW_LOCAL_UPLOADS=' backend/.env 2>/dev/null; then
    echo 'ALLOW_LOCAL_UPLOADS=true' >> backend/.env
  fi
  if ! grep -q '^PUBLIC_API_BASE_URL=.*https://browsemyvacations.com' backend/.env 2>/dev/null; then
    if grep -q '^PUBLIC_API_BASE_URL=' backend/.env 2>/dev/null; then
      sed -i 's|^PUBLIC_API_BASE_URL=.*|PUBLIC_API_BASE_URL="https://browsemyvacations.com"|' backend/.env
    else
      echo 'PUBLIC_API_BASE_URL="https://browsemyvacations.com"' >> backend/.env
    fi
  fi
fi

echo "==> Build backend + frontend"
pnpm hostinger:backend
pnpm hostinger:frontend

echo "==> Verify build does not bake insecure absolute http API host into client bundles"
if grep -R "http://browsemyvacations.com/api" frontend/.next/static 2>/dev/null | head -5; then
  echo "ERROR: built assets still contain http://browsemyvacations.com/api — fix frontend/.env.local and rebuild"
  exit 1
fi
echo "OK: no http://browsemyvacations.com/api in .next/static"

echo "==> Remove duplicate legacy PM2 web apps (prevents ChunkLoadError / 502)"
pm2 delete browsemyvacations 2>/dev/null || true
pm2 delete bmv-frontend 2>/dev/null || true

echo "==> Start/reload PM2 apps from ecosystem.config.cjs"
pm2 startOrReload ecosystem.config.cjs --update-env
pm2 save

echo "==> Health checks"
sleep 2
curl -sf "http://127.0.0.1:3101/api/v1/health" | head -c 200
echo
curl -sf -o /dev/null -w "web_local:%{http_code}\n" "http://127.0.0.1:3100/" || {
  echo "ERROR: frontend not listening on :3100 — nginx will 502"
  pm2 status
  pm2 logs bmv-web --lines 40 --nostream || true
  exit 1
}

echo "==> Done. Public checks:"
echo "  curl -s https://browsemyvacations.com/api/v1/health"
echo "  curl -sI https://browsemyvacations.com | head"
pm2 status
