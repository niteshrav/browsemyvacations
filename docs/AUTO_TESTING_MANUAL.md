# Browse My Vacations — Automated Testing Manual

| Field | Value |
|-------|--------|
| **Version** | 1.0 |
| **Date** | June 2026 |
| **Audience** | Solo developer, QA, client demo verification |
| **Related docs** | [TEST_CASES.md](./TEST_CASES.md), [README.md](../README.md) |

---

## 1. Purpose

This manual describes **how automated tests are organised**, **what they cover**, and **how to run them** before demos, releases, or client handoffs.

Goals:

- Catch regressions across **all public screens**, **admin flows**, and **API integrations**
- Provide a repeatable **end-to-end (E2E)** path from search → quote → admin lead
- Enforce **no bypass**: tests fail if seed data, auth, or pages are missing

---

## 2. Test pyramid

| Layer | Location | Tool | When it runs |
|-------|----------|------|--------------|
| **Unit** | `shared/src/**/*.test.ts` | Vitest | Every `pnpm gate` |
| **Unit** | `frontend/src/lib/**/*.test.ts` | Vitest | Every `pnpm gate` |
| **Unit** | `backend/src/**/*.spec.ts` | Jest | Every `pnpm gate` |
| **API E2E** | `backend/test/*.e2e-spec.ts` | Jest + Supertest | `pnpm test:e2e` / `pnpm gate:full` |
| **Browser E2E** | `frontend/e2e/*.spec.ts` | Playwright | `pnpm test:e2e:web` / `pnpm gate:full` |

**Source of truth for routes:** `@bmv/shared` → `testing/e2e-catalog.ts`

---

## 3. Prerequisites

1. Node.js 20+, pnpm 9+
2. Docker running (`pnpm docker:up`)
3. Database seeded (`pnpm db:seed`)
4. Playwright browser (first run only):

```bash
pnpm --filter frontend exec playwright install chromium
```

---

## 4. Commands

| Command | Description |
|---------|-------------|
| `pnpm test:unit` | All Vitest + Jest unit tests |
| `pnpm test:e2e` | API E2E + browser E2E |
| `pnpm test:e2e:web` | Playwright browser tests only |
| `pnpm --filter backend test:e2e` | API integration tests only |
| `pnpm gate` | Lint + unit + production build |
| `pnpm gate:full` | Full release gate: lint, unit, build, docker, seed, API E2E, browser E2E |

### Local browser E2E (reuse running servers)

If frontend (`3100`) and backend (`3102`) are already running:

```bash
pnpm test:e2e:web
```

Playwright starts servers on **3100** (web) and **3102** (API), matching `frontend/.env.local`. The gate script stops anything already bound to those ports before browser tests run.

### Clean run (recommended before demo)

```bash
pnpm gate:full
```

---

## 5. Test data

| ID | Value | Used by |
|----|-------|---------|
| **TD-ADMIN-01** | `admin@browsemyvacations.com` / `changeme123` | Admin browser + API auth E2E |
| **TD-PKG-01** | `udaipur-gateway-3n` | Package detail E2E |
| **TD-DEST-01** | Udaipur | Search + Vacation Meter E2E |
| **TD-LEAD-01** | Generated email `e2e.demo.*@browsemyvacations.test` | Contact form E2E |

Seed command: `pnpm db:seed`

---

## 6. Automated coverage map

### 6.1 Public screens (Playwright)

| Test ID | Route | Assertion |
|---------|-------|-----------|
| TC-E2E-PUB-home | `/` | Hero heading visible |
| TC-E2E-PUB-packages | `/packages` | “Tour Packages” + seeded package |
| TC-E2E-PUB-vacation-meter | `/vacation-meter` | Meter heading visible |
| TC-E2E-PUB-about | `/about` | About heading visible |
| TC-E2E-PUB-contact | `/contact` | Contact heading visible |
| TC-E2E-PUB-mice | `/mice` | MICE Travel heading visible |
| TC-E2E-PUB-privacy | `/privacy` | Privacy Policy heading visible |

### 6.2 SEO routes (Playwright)

| Test ID | Route | Assertion |
|---------|-------|-----------|
| TC-E2E-SEO-sitemap | `/sitemap.xml` | Valid XML urlset |
| TC-E2E-SEO-robots | `/robots.txt` | Contains user-agent rules |

### 6.3 Discovery & packages (Playwright)

| Test ID | Flow | Assertion |
|---------|------|-----------|
| TC-E2E-DISC-01 | Home → search Udaipur | Search results show seeded package |
| TC-E2E-DISC-02 | Quick pick | Navigates to search |
| TC-E2E-PKG-01 | Packages list | Seeded package visible |
| TC-E2E-PKG-02 | Package detail | Title + quote action visible |

### 6.4 Vacation Meter (Playwright)

| Test ID | Flow | Assertion |
|---------|------|-----------|
| TC-E2E-METER-01 | Select Udaipur → calculate | Indicative estimate with ₹ shown |

### 6.5 Lead capture (Playwright)

| Test ID | Flow | Assertion |
|---------|------|-----------|
| TC-E2E-LEAD-01 | Contact form submit | “Request received” confirmation |

### 6.6 Admin (Playwright)

| Test ID | Flow | Assertion |
|---------|------|-----------|
| TC-E2E-ADM-AUTH | `/admin/login` | Login form renders |
| TC-E2E-ADM-01 | Seeded admin login | Redirects to destinations |
| TC-E2E-ADM-02 | Unauthenticated `/admin/packages` | Redirects to login |
| TC-E2E-ADM-03 | Authenticated admin | All protected screens load |

Protected admin screens: Destinations, Packages, Leads, Meter config.

### 6.7 API E2E (Jest + Supertest)

| Suite | Covers |
|-------|--------|
| `auth.e2e-spec.ts` | Seeded admin login, invalid password/email |
| `catalog.e2e-spec.ts` | Destinations, packages CRUD |
| `discovery.e2e-spec.ts` | Search, suggestions, image upload |
| `leads.e2e-spec.ts` | Lead create, validation, admin list/export |
| `meter.e2e-spec.ts` | Meter calculate, admin config |

---

## 7. Demo-day smoke script (5 minutes)

Run before client demo:

```bash
pnpm gate:full
```

Then manually verify in browser:

1. Home → search **Udaipur**
2. Open **3 Nights Udaipur Gateway**
3. **Vacation Meter** → calculate estimate
4. **Contact** → submit test lead
5. **Admin login** → confirm lead appears

---

## 8. Failure triage

| Symptom | Likely cause | Fix |
|---------|--------------|-----|
| `Cannot find module './259.js'` | Stale `.next` after build | `pnpm dev:frontend` (clean restart) |
| Admin login 500 | Corrupt dev cache | `cd frontend && rm -rf .next && pnpm dev:clean` |
| Playwright timeout on API | Docker/Postgres down | `pnpm docker:up && pnpm db:seed` |
| Auth E2E fails | Seed not run | `pnpm db:seed` |
| Package not in search | Missing seed data | `pnpm db:seed` |
| CSS unstyled | CSS 404 in dev | Hard refresh or clean dev restart |

---

## 9. Adding new tests (TDD workflow)

1. Add route/expectation to `shared/src/testing/e2e-catalog.ts`
2. Add Vitest in `e2e-catalog.test.ts` (red → green)
3. Add Playwright spec under `frontend/e2e/`
4. Run `pnpm gate:full`
5. Update this manual and [TEST_CASES.md](./TEST_CASES.md) if user-facing

**Rules:**

- No `if (!data) return` early exits in tests
- No skipped P0 tests without documented waiver
- Browser tests must use `@bmv/shared` catalog constants

---

## 10. Out of scope (current automation)

- Online payments
- Customer accounts / wishlists
- Multi-browser matrix (only Chromium in CI gate)
- Load/performance testing
- Native mobile apps

These remain manual or future phase work.

---

## 11. Reports

After Playwright run, open HTML report:

```bash
pnpm --filter frontend exec playwright show-report
```

Report folder: `frontend/playwright-report/`
