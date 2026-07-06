# BMV API (NestJS)

REST API at `/api/v1`. Health: `GET /api/v1/health`.

## Local

```bash
cp .env.example .env
pnpm docker:up          # from repo root
pnpm db:push            # from repo root
pnpm dev                # from backend/ or pnpm dev:backend from root
```

## Docker production build

From repository root:

```bash
docker build -f backend/Dockerfile -t bmv-api .
docker run -p 3101:3101 --env-file backend/.env bmv-api
```

## Deploy configs

- `railway.toml` — Railway
- `render.yaml` — Render blueprint
