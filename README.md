# Browse My Vacations

Curated vacation packages platform — browse, Vacation Meter, and custom quote leads.

## Repository structure

```text
browsemyvacations/
├── docs/                 # Requirements, architecture, tests (project docs)
├── frontend/             # Next.js 15 — Vercel
├── backend/              # NestJS API — Railway / Render (Docker)
├── database/             # Prisma schema & client (@bmv/database)
├── docker-compose.yml    # Local Postgres + Redis
├── package.json          # Monorepo scripts (pnpm)
└── pnpm-workspace.yaml
```

## Prerequisites

- Node.js 20+
- [pnpm](https://pnpm.io) 9+
- Docker (for local Postgres & Redis)

## Quick start (local)

```bash
# 1. Install dependencies
pnpm install

# 2. Start databases (Postgres exposed on host port **5433** if you already use 5432 locally)
pnpm docker:up

# 3. Apply schema and seed (101 Package Bible packages + admin user)
pnpm db:push
pnpm db:seed

# 4. Run full local stack (Docker + API + web)
pnpm dev

# 5. Admin login: admin@browsemyvacations.com / changeme123 (override via ADMIN_SEED_* in database/.env)
```

## Phase 5 — Launch polish (complete)

See **[AUTO_TESTING_MANUAL.md](./docs/AUTO_TESTING_MANUAL.md)** for automated E2E coverage and run commands.

| Feature | Purpose |
|---------|---------|
| `/sitemap.xml` | Public routes + active package URLs for SEO |
| `/robots.txt` | Allow indexing; block `/admin/` |
| `/privacy` | Privacy policy (footer link) |
| `/about` | Company story, trust signals, contact CTA |
| `/contact` | Phone, email, address, hours, quote form |
| `/mice` | Corporate offerings + MICE inquiry form (`source=mice`) |
| Analytics events | `search`, `quote_submit`, `meter_complete` (GA4 when `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set) |
| JSON-LD | `TouristTrip` structured data on package detail |
| Security | XSS sanitization on lead text fields; security headers on API + Next.js |
| `GET /api/v1` | API root metadata (no more bare 404) |
| Marketing consent | Optional checkbox on quote forms; stored on `Lead.marketingConsent` |
| Pilot catalog gate | Seed validates ≥ 5 Udaipur packages with images, prices, and itinerary |
| Admin leads note | Clarifies offline quoting — submission is not a confirmed booking |
| Lead CSV export | Filtered export from admin leads screen |

## Phase 4 — Vacation Meter (implemented)

| API | Purpose |
|-----|---------|
| `GET /api/v1/meter/options` | Destinations + vehicle tiers for the form |
| `POST /api/v1/meter/calculate` | Run calculator (persists `MeterSession`) |
| `GET/PATCH /api/v1/admin/meter-config` | View/update rates & disclaimer |

Home **Vacation Meter popup** (dismissible via sessionStorage), full meter page with quote CTA (`source=vacation_meter` + snapshot).

## Phase 3 — Leads (implemented)

| API | Purpose |
|-----|---------|
| `POST /api/v1/leads` | Submit quote / contact inquiry (rate-limited) |
| `GET /api/v1/admin/leads` | List leads (optional `?status=`) |
| `PATCH /api/v1/admin/leads/:id` | Update lead status |
| `POST /api/v1/admin/leads/:id/notes` | Add internal note |
| `GET /api/v1/admin/leads/export` | Download CSV |

Quote form on package detail, contact page, and admin leads UI. Ops email via BullMQ + Resend when `RESEND_API_KEY` is set.

Seed images use [Unsplash](https://unsplash.com/license) (free for commercial use).

## Phase 2 — Discovery (implemented)

| API | Purpose |
|-----|---------|
| `GET /api/v1/search?q=` | City/keyword package search (no dates/passengers) |
| `GET /api/v1/suggestions` | Home suggestion bar items |
| `POST /api/v1/admin/packages/:id/images` | Upload package image (Cloudinary or local `./uploads` in dev) |

Public routes: `/search?q=…` · Home uses `HeroSearch` + `SuggestionBar` · Package detail ISR (300s).

## Quality gates

```bash
pnpm gate          # lint + unit tests + build (no Docker required)
pnpm gate:full     # gate + Docker + db seed + API e2e tests
```

Environment files (already created for local Docker — **copy `.env.example` for production**):

| Folder | Files |
|--------|--------|
| `database/` | `.env`, `.env.example` — `DATABASE_URL`, `DIRECT_URL` |
| `backend/` | `.env`, `.env.example` — API, Redis, CORS, JWT, Resend |
| `frontend/` | `.env`, `.env.local`, `.env.example` — `NEXT_PUBLIC_*` |

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev:frontend` | Next.js dev server :3100 |
| `pnpm dev:backend` | NestJS watch mode :3101 |
| `pnpm db:generate` | Prisma client generate |
| `pnpm db:push` | Push schema to local DB |
| `pnpm db:migrate` | Create migration (dev) |
| `pnpm db:studio` | Prisma Studio |
| `pnpm build` | Build database + backend + frontend |
| `pnpm docker:up` | Start Postgres & Redis |

## Deployment

### Frontend → Vercel

1. Import repo; set **Root Directory** to `frontend`.
2. Add env vars from `frontend/.env.example` (`NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_SITE_URL`).
3. `vercel.json` uses monorepo install from parent (or configure Install Command: `cd .. && pnpm install && pnpm db:generate`).

### Backend → Railway / Render

1. Deploy using `backend/Dockerfile` (context = repo root).
2. Set env from `backend/.env.example` (`DATABASE_URL`, `CORS_ORIGIN`, `JWT_SECRET`, etc.).
3. Health check: `GET /api/v1/health`

### Database → Neon

1. Create Postgres project; copy pooled + direct URLs into `database/.env` and hosting provider env for API.
2. Run migrations: `pnpm db:migrate` (CI) or `prisma migrate deploy` in pipeline.

## Documentation

See [`docs/`](./docs/):

- [BUSINESS_REQUIREMENTS.md](./docs/BUSINESS_REQUIREMENTS.md)
- [ARCHITECTURE.md](./docs/ARCHITECTURE.md)
- [USER_STORIES.md](./docs/USER_STORIES.md)
- [TEST_CASES.md](./docs/TEST_CASES.md)

## License

Private — Commiters / Browse My Vacations.
