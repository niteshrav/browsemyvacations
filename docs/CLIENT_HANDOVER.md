# Browse My Vacations — Client Handover Document

| Field | Detail |
|-------|--------|
| **Product** | Browse My Vacations (BMV) |
| **Brand parent** | Browser Hotels |
| **Document date** | 31 July 2026 |
| **Status** | Live — production handover |
| **Primary site** | https://browsemyvacations.com |
| **Source code** | https://github.com/niteshrav/browsemyvacations |

---

## 1. Executive summary

Browse My Vacations is a **curated vacation packages** website focused on:

- Simple **city / keyword discovery** (no dates or passenger counts required to browse)
- Transparent **package detail** pages with itinerary and pricing cues
- **Custom quote** lead capture (sales fulfills offline)
- **Vacation Feasibility Radar** (Vacation Meter) for route / cost estimates
- **MICE / corporate** inquiry flows
- A full **admin CMS** for catalog, leads, meter rates, content, and WhatsApp

**Business model (MVP):** Operator-led lead generation. There is **no online payment**, **no customer login**, and **no instant booking**. Quote submissions create sales leads only.

---

## 2. Live URLs

| Surface | URL |
|---------|-----|
| Website | https://browsemyvacations.com |
| www (same site) | https://www.browsemyvacations.com |
| Admin | https://browsemyvacations.com/admin |
| API health | https://browsemyvacations.com/api/v1/health |
| Sitemap | https://browsemyvacations.com/sitemap.xml |
| Robots | https://browsemyvacations.com/robots.txt |
| Privacy | https://browsemyvacations.com/privacy |
| Google verification file | https://browsemyvacations.com/google990190344b1517ae.html |

### Public pages

| Page | Path |
|------|------|
| Home | `/` |
| Packages | `/packages` |
| Package detail | `/packages/{slug}` |
| Search | `/search?q=…` |
| Vacation Meter | `/vacation-meter` |
| MICE | `/mice` |
| About | `/about` |
| Contact | `/contact` |
| Privacy Policy | `/privacy` |

---

## 3. What was delivered

### 3.1 Visitor experience

- Home hero with search, suggestion / quick picks, destination-grouped packages
- Packages list (with optional destination filter) and SEO-friendly detail pages
- Search by city or keyword
- Quote / inquiry forms (package detail, contact, meter, MICE)
- Floating **WhatsApp** button (number configurable in admin)
- Vacation Meter popup on home + full meter page with quote CTA
- Responsive layout for desktop and mobile

### 3.2 Admin CMS (`/admin`)

| Module | Purpose |
|--------|---------|
| **Dashboard** | Admin home / shortcuts |
| **Destinations** | Manage destination catalog |
| **Packages** | Create / edit packages, itinerary, gallery, SEO title & description |
| **Quick Picks** | Home suggestion / quick-pick chips |
| **Page Content** | Editable site content blocks (e.g. hero copy) |
| **Leads** | Lead pipeline cards, status updates, notes, CSV export, **delete** |
| **Meter** | Destination nightly rates & vehicle tiers for Vacation Meter |
| **WhatsApp** | Floating button phone number + default message |

Lead statuses: `new` → `contacted` → `quoted` → `won` / `lost`.

### 3.3 SEO (completed July 2026)

- Unique titles, meta descriptions, keywords per public page
- Canonical URLs, Open Graph, and Twitter cards
- Favicon / site icons from brand logo
- `robots.txt` (public allowed; `/admin/` blocked)
- Dynamic `sitemap.xml` (static pages + package URLs)
- Image alt text + lazy loading (heroes load eagerly for performance)
- Package detail JSON-LD (`TouristTrip`)
- Google Search Console: **ownership verified** (HTML file method)
- Sitemap submitted in GSC (status may show “Couldn't fetch” briefly after submit — recheck after deploy; live sitemap returns HTTP 200)

### 3.4 Out of scope (deferred / not in MVP)

- Online payments / Razorpay booking
- Customer accounts / login
- Reviews & ratings marketplace
- Multi-agent marketplace
- Advanced search filters (price, theme, duration)
- Full CRM sync (leads stay in BMV admin + optional email alerts)

---

## 4. Access & credentials

> **Security:** Change the admin password immediately after handover. Do not share production credentials in public chat or email threads longer than necessary.

### 4.1 Admin login

| Item | Value |
|------|--------|
| URL | https://browsemyvacations.com/admin |
| Typical seed email | `admin@browsemyvacations.com` |
| Typical seed password | `changeme123` |
| Production account (as configured at launch) | Confirm in admin DB / with delivery team — may be a client Gmail such as the Browser Hotels ops mailbox |

Override seed credentials locally via `ADMIN_SEED_EMAIL` / `ADMIN_SEED_PASSWORD` in `database/.env`.

**How to sign in:** Open site → **Admin** in header, or go directly to `/admin`.

### 4.2 Source code

| Item | Value |
|------|--------|
| GitHub | https://github.com/niteshrav/browsemyvacations |
| Default branch | `main` |
| Deploy trigger | Manual pull + `scripts/vps-deploy.sh` on VPS |

Ensure the client (or appointed agency) has GitHub collaborator access.

### 4.3 Server (production)

| Item | Value |
|------|--------|
| Hosting style | Contabo / Hostinger-class Linux KVM VPS |
| App path | `/var/www/browsemyvacations` |
| Process manager | PM2 (`bmv-web`, `bmv-api`) |
| Web port | `3100` (nginx proxies HTTPS → this) |
| API port | `3101` |
| Database | PostgreSQL (local on VPS; often mapped as port `5434` in compose-style setups) |
| Reverse proxy | Nginx + Let’s Encrypt (certbot) |

SSH access, panel login, and DNS registrar credentials should be transferred separately by the hosting owner (not stored in this repo).

---

## 5. Day-to-day operations (for the client team)

### 5.1 Sales / leads

1. Open **Admin → Leads**
2. Filter by status (All / new / contacted / quoted / won / lost)
3. Update status from the card dropdown
4. Open details for notes and full inquiry fields
5. Export CSV when needed
6. Delete spam / test leads with **Delete** (confirm dialog)

**Important:** A quote request is **not** a confirmed booking. Final pricing is sent offline (email / phone / WhatsApp).

### 5.2 Publishing packages

1. **Admin → Packages** — create or edit
2. Set destinations, duration, price display, itinerary, inclusions / exclusions
3. Upload gallery images
4. Fill optional **SEO title / description**
5. Keep package **active** to appear on the public site and sitemap

### 5.3 Vacation Meter rates

1. **Admin → Meter**
2. Add / edit / delete destination nightly rates
3. Adjust vehicle tier multipliers as needed  
Changes apply without a code deploy.

### 5.4 WhatsApp floating button

1. **Admin → WhatsApp**
2. Set phone number (India format supported) and default message  
Public FAB reads this from site content settings.

### 5.5 Contact details shown on the site

Defaults in code (`shared` contact info) currently include:

| Field | Default |
|-------|---------|
| Phone / WhatsApp display | +91 141 400 1234 |
| Email | hello@browsemyvacations.com |
| Address | C-Scheme, Jaipur, Rajasthan 302001, India |
| Hours | Monday – Saturday, 10:00 AM – 7:00 PM IST |

Update these in the codebase / content settings if real business numbers differ, then redeploy.

---

## 6. Technology stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 15 (App Router), React, TypeScript |
| Backend | NestJS (REST API under `/api/v1`) |
| Database | PostgreSQL + Prisma (`@bmv/database`) |
| Shared package | `@bmv/shared` (content, validation, CDN helpers) |
| Monorepo | pnpm workspaces |
| Images | Cloudinary (preferred) or local `/uploads` on VPS |
| Email (optional) | Resend (`RESEND_API_KEY`) → ops inbox |
| Analytics (optional) | GA4 via `NEXT_PUBLIC_GA_MEASUREMENT_ID` |
| Process manager | PM2 |
| Web server | Nginx |

---

## 7. Environment variables (production checklist)

### Frontend — `frontend/.env.local`

```env
NEXT_PUBLIC_SITE_URL="https://browsemyvacations.com"
NEXT_PUBLIC_API_URL="/api/v1"
NEXT_PUBLIC_GA_MEASUREMENT_ID=""          # optional — GA4 measurement ID
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=""      # optional if using Cloudinary
```

### Backend — `backend/.env`

```env
PORT=3101
NODE_ENV=production
CORS_ORIGIN="https://browsemyvacations.com,https://www.browsemyvacations.com"
DATABASE_URL="postgresql://…/browsemyvacations?schema=public"
JWT_SECRET="use-a-long-random-secret"
RESEND_API_KEY=""                         # optional lead emails
OPS_EMAIL_TO="sales@browsemyvacations.com"
OPS_EMAIL_FROM="Browse My Vacations <noreply@browsemyvacations.com>"
CLOUDINARY_CLOUD_NAME=""                  # preferred for uploads
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""
ALLOW_LOCAL_UPLOADS=true                  # if not using Cloudinary
PUBLIC_API_BASE_URL="https://browsemyvacations.com"
```

---

## 8. Deploy & maintenance

### 8.1 Standard deploy (after code is on `main`)

```bash
cd /var/www/browsemyvacations
git pull origin main
bash scripts/vps-deploy.sh
```

This script pulls, builds backend + frontend, reloads PM2, and health-checks ports `3100` / `3101`.

Full notes: [`docs/VPS_DEPLOY.md`](./VPS_DEPLOY.md)

### 8.2 Useful PM2 commands

```bash
pm2 status
pm2 logs bmv-api --lines 50 --nostream
pm2 logs bmv-web --lines 50 --nostream
pm2 restart bmv-api bmv-web
```

Keep **only** `bmv-api` and `bmv-web`. Extra PM2 web apps cause 502 / chunk errors after rebuilds.

### 8.3 Smoke checks after deploy

```bash
curl -s https://browsemyvacations.com/api/v1/health
curl -sI https://browsemyvacations.com | head
curl -s https://browsemyvacations.com/sitemap.xml | head
```

### 8.4 Database migrations

```bash
cd /var/www/browsemyvacations/database
pnpm exec prisma migrate deploy
```

---

## 9. SEO & marketing accounts (manual)

| Item | Status / action |
|------|-----------------|
| Google Search Console | Property verified (HTML file). **Do not delete** `google990190344b1517ae.html` |
| Sitemap in GSC | Submitted `/sitemap.xml` — refresh if status shows temporary fetch errors |
| Google Analytics (GA4) | Set `NEXT_PUBLIC_GA_MEASUREMENT_ID` and redeploy when ready |
| Bing Webmaster | Optional — submit same sitemap |
| Social sharing | OG image uses Udaipur Lake Palace asset; test with Facebook / LinkedIn debuggers after content changes |

---

## 10. Support runbook (common issues)

| Symptom | Likely cause | Fix |
|---------|--------------|-----|
| Site 502 / blank | PM2 web down or nginx pointing at wrong port | `pm2 status`; ensure nginx → `:3100` |
| Admin login fails after HTTPS | Stale build / wrong API origin | Redeploy; confirm `NEXT_PUBLIC_API_URL=/api/v1` |
| Image upload 413 | Nginx body size limit | `client_max_body_size 10m;` then reload nginx |
| Upload blocked | No Cloudinary and local uploads disabled | Set `ALLOW_LOCAL_UPLOADS=true` + `PUBLIC_API_BASE_URL` |
| Mixed content / API errors on HTTPS | Frontend calling `http://` API | Must use same-origin `/api/v1` |
| Leads not emailing ops | Resend not configured | Set `RESEND_API_KEY` + `OPS_EMAIL_TO` (leads still save in admin) |
| GSC “Couldn't fetch” sitemap | Transient Google crawl | Confirm live 200; wait / resubmit; ensure VPS deploy is current |

---

## 11. Local development (for developers)

```bash
pnpm install
pnpm docker:up          # Postgres (+ Redis if used)
pnpm db:push && pnpm db:seed
pnpm dev                # API :3101, web :3100
```

Default local admin: `admin@browsemyvacations.com` / `changeme123`.

Quality gates: `pnpm lint`, unit tests, Playwright E2E (see `docs/AUTO_TESTING_MANUAL.md`).

---

## 12. Related project documents

| Document | Purpose |
|----------|---------|
| [BUSINESS_REQUIREMENTS.md](./BUSINESS_REQUIREMENTS.md) | Business requirements |
| [ARCHITECTURE.md](./ARCHITECTURE.md) | Technical architecture |
| [USE_CASE_REQUIREMENTS.md](./USE_CASE_REQUIREMENTS.md) | Use cases |
| [USER_STORIES.md](./USER_STORIES.md) | User stories |
| [TEST_CASES.md](./TEST_CASES.md) | Test cases |
| [VPS_DEPLOY.md](./VPS_DEPLOY.md) | Production deploy guide |
| [AUTO_TESTING_MANUAL.md](./AUTO_TESTING_MANUAL.md) | Automated testing guide |
| Root [README.md](../README.md) | Developer quick start |

---

## 13. Handover checklist

- [x] Production site live on HTTPS
- [x] Admin CMS operational (catalog, leads, meter, WhatsApp, content)
- [x] Lead capture + CSV export + delete
- [x] SEO basics (meta, sitemap, robots, OG/Twitter, canonicals)
- [x] Google Search Console ownership verified
- [x] Sitemap submitted to Search Console
- [ ] Client changes admin password
- [ ] Client confirms real phone / email / WhatsApp on Contact + FAB
- [ ] GA4 ID added (if analytics required)
- [ ] Cloudinary (or confirmed local uploads) for production images
- [ ] Resend (or alternate) for lead email alerts
- [ ] GitHub + VPS SSH access transferred to client / agency
- [ ] DNS / domain registrar access confirmed
- [ ] SSL auto-renewal (certbot) confirmed on VPS

---

## 14. Contacts

| Role | Notes |
|------|--------|
| Product / brand | Browse My Vacations by Browser Hotels |
| Public guest email (site default) | hello@browsemyvacations.com |
| Ops / sales email (env default) | sales@browsemyvacations.com |
| Development repository owner | GitHub: `niteshrav/browsemyvacations` |

For post-handover feature work, open issues or PRs against `main`, or engage the delivery team with a scoped change request.

---

*End of handover document. Keep this file with hosting credentials (stored separately) and update §4 / §13 when passwords, emails, or analytics IDs change.*
