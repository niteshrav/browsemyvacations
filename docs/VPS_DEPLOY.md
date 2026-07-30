# VPS deploy (ResellerClub / Hostinger Linux KVM)

Use this on the server so HTTPS + admin login stay healthy and rebuilds do not leave nginx on a dead/stale Node process.

## One-command deploy

```bash
cd /var/www/browsemyvacations
bash scripts/vps-deploy.sh
```

This will:

1. `git pull` `main`
2. Ensure `frontend/.env.local` uses same-origin API:
   - `NEXT_PUBLIC_SITE_URL=https://browsemyvacations.com`
   - `NEXT_PUBLIC_API_URL=/api/v1`
3. Build backend + frontend (`pnpm hostinger:*`)
4. Fail if the build still contains `http://browsemyvacations.com/api` (mixed content)
5. Remove duplicate PM2 web apps
6. `pm2 startOrReload ecosystem.config.cjs`
7. Health-check `:3101` and `:3100`

## Required env

**`frontend/.env.local`**

```env
NEXT_PUBLIC_SITE_URL="https://browsemyvacations.com"
NEXT_PUBLIC_API_URL="/api/v1"
```

**`backend/.env`**

```env
PORT=3101
CORS_ORIGIN="https://browsemyvacations.com,https://www.browsemyvacations.com"
DATABASE_URL="postgresql://bmv:bmv@localhost:5434/browsemyvacations?schema=public"
JWT_SECRET="long-random-secret"
```

**Database**

```bash
cd /var/www/browsemyvacations/database
pnpm exec prisma migrate deploy
# or first-time sync: pnpm exec prisma db push
pnpm seed   # optional
```

## Nginx

Example config: [`deploy/nginx-browsemyvacations.conf.example`](../deploy/nginx-browsemyvacations.conf.example)

- `/` → `127.0.0.1:3100` (Next / `bmv-web`)
- `/api/` → `127.0.0.1:3101` (Nest / `bmv-api`)

SSL:

```bash
certbot --nginx -d browsemyvacations.com -d www.browsemyvacations.com
```

## PM2 apps (only these two)

| Name | Port | Role |
|------|------|------|
| `bmv-api` | 3101 | NestJS |
| `bmv-web` | 3100 | Next.js |

Do **not** keep a second web process (`browsemyvacations`, etc.) — it causes ChunkLoadError / 502 after rebuilds.

```bash
pm2 status
pm2 logs bmv-api --lines 50 --nostream
pm2 logs bmv-web --lines 50 --nostream
```

## Smoke checks

```bash
curl -s http://127.0.0.1:3101/api/v1/health
curl -sI http://127.0.0.1:3100 | head
curl -s https://browsemyvacations.com/api/v1/health
curl -sI https://browsemyvacations.com | head
```

Admin login after HTTPS: use the email in `admin_users` (not an old HTTP-baked frontend). Hard-refresh or Incognito after each deploy.

## Image uploads

Prefer Cloudinary (`CLOUDINARY_*` in `backend/.env`).

Without Cloudinary on VPS:

```env
ALLOW_LOCAL_UPLOADS=true
PUBLIC_API_BASE_URL="https://browsemyvacations.com"
```

Nginx must proxy `/uploads/` → `:3101` and allow larger bodies:

```nginx
client_max_body_size 10m;
```

`scripts/vps-deploy.sh` sets `ALLOW_LOCAL_UPLOADS` / `PUBLIC_API_BASE_URL` when missing.
