# @bmv/database

Prisma schema and shared client for **backend** (and optional frontend server usage).

## Setup

```bash
cp .env.example .env   # if .env missing
pnpm install           # from repo root
pnpm db:push           # from repo root
```

## Scripts (from repo root)

- `pnpm db:generate` — `prisma generate`
- `pnpm db:migrate` — `prisma migrate dev`
- `pnpm db:push` — `prisma db push`
- `pnpm db:studio` — Prisma Studio

## Production (Neon)

Set in `database/.env` and mirror on API host:

```env
DATABASE_URL="<pooled-connection-string>"
DIRECT_URL="<direct-connection-string>"
```
