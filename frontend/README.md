# BMV Frontend (Next.js)

Public site + future admin UI. Deploy to **Vercel** with root directory `frontend`.

## Local

```bash
cp .env.example .env.local
pnpm dev                # http://localhost:3100
```

Requires API at `NEXT_PUBLIC_API_URL` (default `http://localhost:3101/api/v1`).

## Vercel env

Copy from `.env.example`:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_API_URL`
