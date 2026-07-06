# Browse My Vacations — Test Case Document

| Field | Value |
|-------|--------|
| **Document version** | 1.0 |
| **Status** | Draft |
| **Parent documents** | [USE_CASE_REQUIREMENTS.md](./USE_CASE_REQUIREMENTS.md) v1.0, [BUSINESS_REQUIREMENTS.md](./BUSINESS_REQUIREMENTS.md) v1.0 |
| **Date** | 22 May 2026 |
| **Product** | Browse My Vacations (BMV) |

---

## 1. Purpose and scope

This document defines **manual and automatable test cases** for the BMV MVP, derived from use cases UC-001 through UC-020 and non-functional requirements NFR-001–NFR-008.

### 1.1 In scope

- Public website: home, search, packages, detail, quote, Vacation Meter, static pages, popup  
- Lead notification and admin: destinations, packages, Meter config, leads, export  
- Responsive UI (mobile + desktop)  
- Core negative and validation paths  

### 1.2 Out of scope (MVP test cycle)

- Online payments and booking confirmation  
- Customer login / saved trips  
- Public reviews and ratings  
- Agent marketplace  
- Advanced catalog filters (post-MVP)  
- Native mobile apps  

### 1.3 Test case ID convention

| Pattern | Example | Meaning |
|---------|---------|---------|
| `TC-UC001-01` | TC-UC001-01 | First test for UC-001 |
| `TC-E2E-01` | TC-E2E-01 | End-to-end scenario test |
| `TC-NFR-01` | TC-NFR-01 | Non-functional test |

### 1.4 Priority

| Priority | Definition |
|----------|------------|
| **P0** | MVP release blocker; must pass before go-live |
| **P1** | Important; should pass for MVP |
| **P2** | Nice to have; may defer with documented waiver |

### 1.5 Test types

| Type | Code |
|------|------|
| Functional | FN |
| UI / UX | UI |
| Negative / validation | NV |
| Integration | INT |
| End-to-end | E2E |
| Non-functional | NFR |
| Security | SEC |
| Accessibility | A11Y |

### 1.6 Execution status (during test runs)

`Not Run` | `Pass` | `Fail` | `Blocked` | `Skipped`

---

## 2. Test environment and data

### 2.1 Environments

| Environment | URL (placeholder) | Purpose |
|-------------|-------------------|---------|
| DEV | `https://dev.browsemyvacations.com` | Development verification |
| STAGING | `https://staging.browsemyvacations.com` | QA / UAT |
| PROD | `https://www.browsemyvacations.com` | Smoke post-release only |

### 2.2 Browsers and devices (minimum matrix)

| # | Browser / device | Viewport |
|---|------------------|----------|
| 1 | Chrome (latest desktop) | 1920×1080 |
| 2 | Safari (latest desktop) | 1440×900 |
| 3 | Chrome Android | 390×844 |
| 4 | Safari iOS | 390×844 |

### 2.3 Test data prerequisites

| Data set | Description | Used by |
|----------|-------------|---------|
| **TD-DEST-01** | Active destination: Udaipur (slug `udaipur`) | Search, home section |
| **TD-DEST-02** | Active destination: Singapore (multi-city packages) | Search match rules |
| **TD-PKG-01** | Active package including Udaipur only (e.g. 3N Udaipur Gateway) | UC-001, UC-002, UC-004 |
| **TD-PKG-02** | Active combo package: Singapore + Kuala Lumpur | UC-002 multi-city |
| **TD-PKG-03** | Inactive package (draft/unpublished) | UC-004 negative |
| **TD-METER-01** | Meter config: Udaipur, 3 nights, sedan tier | UC-006, UC-018 |
| **TD-LEAD-01** | Valid quote payload (name, email, phone, all fields) | UC-005 |
| **TD-ADMIN-01** | Content Admin credentials | UC-016–018 |
| **TD-SALES-01** | Sales / Operations credentials | UC-019, UC-020 |
| **TD-OPS-EMAIL** | Operations inbox for lead notifications | UC-015 |

### 2.4 Global preconditions (unless overridden)

1. Application is deployed and reachable.  
2. Test data TD-DEST-01, TD-PKG-01, TD-METER-01 exist and are **active**.  
3. Visitor tests use incognito/private session with cookies cleared.  
4. Admin tests use authenticated session.

---

## 3. Test case summary

| Module | UC | Test cases | P0 count |
|--------|-----|------------|----------|
| Home & browse | UC-001 | 6 | 4 |
| Search | UC-002 | 5 | 4 |
| Suggestion bar | UC-003 | 3 | 2 |
| Package detail | UC-004 | 5 | 4 |
| Quote form | UC-005 | 8 | 6 |
| Vacation Meter | UC-006 | 6 | 5 |
| Meter → quote | UC-007 | 3 | 2 |
| Meter popup | UC-008, UC-009 | 4 | 3 |
| Navigation | UC-010 | 6 | 4 |
| Packages catalog | UC-011 | 2 | 1 |
| About / Contact | UC-012, UC-013 | 4 | 2 |
| MICE | UC-014 | 2 | 0 |
| Lead notification | UC-015 | 3 | 3 |
| Admin destinations | UC-016 | 4 | 3 |
| Admin packages | UC-017 | 5 | 4 |
| Admin Meter config | UC-018 | 3 | 3 |
| Lead management | UC-019 | 4 | 3 |
| Lead export | UC-020 | 2 | 1 |
| End-to-end | E2E | 5 | 5 |
| Non-functional | NFR | 8 | 4 |
| **Total** | | **88** | **63** |

---

## 4. Test cases — Home & browse (UC-001)

| TC ID | Title | Priority | Type | Use case |
|-------|-------|----------|------|----------|
| TC-UC001-01 | Home page loads with required elements | P0 | FN | UC-001 |
| TC-UC001-02 | Tagline displays correct text and styling | P1 | UI | UC-001 |
| TC-UC001-03 | Destination section shows Udaipur packages | P0 | FN | UC-001 |
| TC-UC001-04 | Package card displays required fields | P0 | FN | UC-001 |
| TC-UC001-05 | Package card has separate View Details and Customise & Quote buttons | P0 | FN | UC-001 |
| TC-UC001-06 | Home page layout on mobile viewport | P0 | UI | UC-001 |

### TC-UC001-01: Home page loads with required elements

| Field | Value |
|-------|--------|
| **Preconditions** | TD-DEST-01, TD-PKG-01 active; Visitor on home URL |
| **Steps** | 1. Open home page in browser.<br>2. Observe header, hero, search bar, suggestion bar, destination sections. |
| **Expected results** | 1. Page returns HTTP 200.<br>2. Global nav shows: Home, Packages, Vacation Meter, MICE, About Us, Contact.<br>3. Search bar is visible.<br>4. At least one destination section with package cards is visible. |
| **Traceability** | FR-001, FR-002, FR-012, FR-014; AC-002 |

### TC-UC001-02: Tagline displays correct text and styling

| Field | Value |
|-------|--------|
| **Preconditions** | Home page loaded |
| **Steps** | 1. Locate hero tagline on home page. |
| **Expected results** | 1. Text reads exactly: *Vacations You'll Love. Memories You'll Keep.*<br>2. Tagline is readable (contrast, font size appropriate for desktop and mobile). |
| **Traceability** | FR-010; BR-005 |

### TC-UC001-03: Destination section shows Udaipur packages

| Field | Value |
|-------|--------|
| **Preconditions** | TD-DEST-01 with ≥2 linked active packages |
| **Steps** | 1. Scroll to Udaipur destination section on home. |
| **Expected results** | 1. Section heading includes "Udaipur".<br>2. Only packages linked to Udaipur (or combination including Udaipur) appear.<br>3. Each card shows image, short info, and price. |
| **Traceability** | FR-014, FR-015; AC-002 |

### TC-UC001-04: Package card displays required fields

| Field | Value |
|-------|--------|
| **Preconditions** | TD-PKG-01 visible on home |
| **Steps** | 1. Inspect any package card on home. |
| **Expected results** | 1. Photo/image loads (or placeholder if missing—document defect).<br>2. Brief description/title visible.<br>3. Price displayed (e.g. "From ₹X" or fixed price per BUS-004). |
| **Traceability** | FR-015; BUS-004 |

### TC-UC001-05: Package card has separate View Details and Customise & Quote buttons

| Field | Value |
|-------|--------|
| **Preconditions** | Package card visible |
| **Steps** | 1. Identify CTAs on package card. |
| **Expected results** | 1. Two distinct buttons/links: **View Details** and **Customise & Quote**.<br>2. Both are clickable and trigger different actions (not a single combined CTA). |
| **Traceability** | BR-009; BUS-005 |

### TC-UC001-06: Home page layout on mobile viewport

| Field | Value |
|-------|--------|
| **Preconditions** | Mobile viewport 390×844 |
| **Steps** | 1. Open home on mobile device or emulator.<br>2. Scroll full page; tap nav menu if hamburger present. |
| **Expected results** | 1. No horizontal scroll on main content.<br>2. Cards stack appropriately; CTAs remain tappable (min ~44px touch target).<br>3. Nav accessible on mobile. |
| **Traceability** | NFR-002; AC-008 |

---

## 5. Test cases — Search (UC-002)

| TC ID | Title | Priority | Type |
|-------|-------|----------|------|
| TC-UC002-01 | Search by city returns matching packages | P0 | FN |
| TC-UC002-02 | Search bar does not show date or passenger fields | P0 | FN |
| TC-UC002-03 | Search with no matches shows empty state | P1 | NV |
| TC-UC002-04 | Empty or whitespace search handled gracefully | P1 | NV |
| TC-UC002-05 | Search response time under 500ms (staging) | P1 | NFR |

### TC-UC002-01: Search by city returns matching packages

| Field | Value |
|-------|--------|
| **Preconditions** | TD-PKG-01 includes Udaipur; TD-PKG-02 may exist |
| **Steps** | 1. On home, enter `Udaipur` in search bar.<br>2. Submit search. |
| **Expected results** | 1. Results list displays TD-PKG-01 (and any package with Udaipur in itinerary per BUS-003/OQ-005).<br>2. Packages without Udaipur are excluded.<br>3. Result cards match home card format with both CTAs. |
| **Traceability** | FR-013; BUS-001, BUS-003; AC-003 |

### TC-UC002-02: Search bar does not show date or passenger fields

| Field | Value |
|-------|--------|
| **Preconditions** | Home page loaded |
| **Steps** | 1. Inspect search bar and expanded search UI (if any). |
| **Expected results** | 1. No date picker, no passenger/adult/child counters in search area.<br>2. Only city/combination text input (and submit) present. |
| **Traceability** | BUS-002 |

### TC-UC002-03: Search with no matches shows empty state

| Field | Value |
|-------|--------|
| **Preconditions** | No packages for fictional city |
| **Steps** | 1. Search for `XYZNonexistentCity123`. |
| **Expected results** | 1. No package cards shown.<br>2. User-friendly empty message displayed.<br>3. Option to clear search or browse destinations (if implemented). |
| **Traceability** | UC-002 extension 3a |

### TC-UC002-04: Empty or whitespace search handled gracefully

| Field | Value |
|-------|--------|
| **Preconditions** | Home page loaded |
| **Steps** | 1. Submit search with empty field.<br>2. Submit search with spaces only. |
| **Expected results** | 1. No server error.<br>2. User prompted to enter destination OR remains on home without invalid results. |
| **Traceability** | UC-002 extension 3b |

### TC-UC002-05: Search response time under 500ms (staging)

| Field | Value |
|-------|--------|
| **Preconditions** | Staging environment; network throttling off |
| **Steps** | 1. Perform search for `Udaipur`.<br>2. Measure time to results render (DevTools or APM). |
| **Expected results** | 1. Results visible within **500ms** of submit (per NFR-001) or defect logged with actual timing. |
| **Traceability** | NFR-001 |

---

## 6. Test cases — Suggestion bar (UC-003)

| TC ID | Title | Priority | Type |
|-------|-------|----------|------|
| TC-UC003-01 | Suggestion bar visible on home | P0 | FN |
| TC-UC003-02 | Clicking Udaipur suggestion shows Udaipur packages | P0 | FN |
| TC-UC003-03 | Suggestion bar hidden when no suggestions configured | P2 | NV |

### TC-UC003-01: Suggestion bar visible on home

| Field | Value |
|-------|--------|
| **Preconditions** | Suggestions configured per OQ-001 (minimum: Udaipur) |
| **Steps** | 1. Load home page.<br>2. Locate suggestion bar below tagline/search. |
| **Expected results** | 1. Suggestion bar renders with at least one clickable item. |
| **Traceability** | FR-011 |

### TC-UC003-02: Clicking Udaipur suggestion shows Udaipur packages

| Field | Value |
|-------|--------|
| **Preconditions** | Udaipur in suggestion bar; TD-PKG-01 active |
| **Steps** | 1. Click **Udaipur** (or equivalent) in suggestion bar. |
| **Expected results** | 1. User sees Udaipur packages (filtered list OR scroll to Udaipur section—per OQ-001 decision).<br>2. Behavior documented in test evidence. |
| **Traceability** | UC-003; OQ-001 |

---

## 7. Test cases — Package detail (UC-004)

| TC ID | Title | Priority | Type |
|-------|-------|----------|------|
| TC-UC004-01 | View Details opens correct package page | P0 | FN |
| TC-UC004-02 | Short itinerary on same page as overview | P0 | FN |
| TC-UC004-03 | No separate itinerary tab or URL | P0 | FN |
| TC-UC004-04 | Inactive package URL returns 404 or unavailable | P1 | NV |
| TC-UC004-05 | Customise & Quote available on detail page | P0 | FN |

### TC-UC004-01: View Details opens correct package page

| Field | Value |
|-------|--------|
| **Preconditions** | TD-PKG-01 on home |
| **Steps** | 1. Click **View Details** on TD-PKG-01 card. |
| **Expected results** | 1. Navigates to package detail URL for TD-PKG-01.<br>2. Title, duration, and price match card data.<br>3. Highlights/inclusions shown if configured. |
| **Traceability** | FR-020, FR-021 |

### TC-UC004-02: Short itinerary on same page as overview

| Field | Value |
|-------|--------|
| **Preconditions** | TD-PKG-01 has ≥3 itinerary days in admin |
| **Steps** | 1. Open package detail for TD-PKG-01.<br>2. Scroll page without clicking tabs. |
| **Expected results** | 1. Day-wise short itinerary visible below overview on **same page**.<br>2. Each day shows day number, title/cities, summary. |
| **Traceability** | FR-022; BUS-006; AC-007 |

### TC-UC004-03: No separate itinerary tab or URL

| Field | Value |
|-------|--------|
| **Preconditions** | Package detail open |
| **Steps** | 1. Check for itinerary tab, accordion requiring navigation to new route, or `/itinerary` URL. |
| **Expected results** | 1. Itinerary is inline; no separate page break for itinerary only. |
| **Traceability** | BR-010 |

### TC-UC004-04: Inactive package URL returns 404 or unavailable

| Field | Value |
|-------|--------|
| **Preconditions** | TD-PKG-03 inactive; slug known |
| **Steps** | 1. Navigate directly to inactive package slug URL. |
| **Expected results** | 1. HTTP 404 or friendly "package unavailable" page.<br>2. Link to home or packages catalog. |
| **Traceability** | UC-004 extension 2a |

### TC-UC004-05: Customise & Quote available on detail page

| Field | Value |
|-------|--------|
| **Preconditions** | Package detail open |
| **Steps** | 1. Locate **Customise & Quote** on detail page.<br>2. Click control. |
| **Expected results** | 1. Quote form opens (modal/panel).<br>2. Form associated with current package. |
| **Traceability** | FR-023 |

---

## 8. Test cases — Quote form (UC-005)

| TC ID | Title | Priority | Type |
|-------|-------|----------|------|
| TC-UC005-01 | Quote form opens from package card | P0 | FN |
| TC-UC005-02 | Quote form contains all required fields | P0 | FN |
| TC-UC005-03 | Successful submit with valid data | P0 | FN |
| TC-UC005-04 | Lead associated with source package | P0 | FN |
| TC-UC005-05 | Submit blocked when required fields empty | P0 | NV |
| TC-UC005-06 | Invalid email format rejected | P0 | NV |
| TC-UC005-07 | Confirmation message shown after submit | P1 | FN |
| TC-UC005-08 | Cancel closes form without creating lead | P1 | FN |

### TC-UC005-01: Quote form opens from package card

| Field | Value |
|-------|--------|
| **Preconditions** | Home or catalog with TD-PKG-01 |
| **Steps** | 1. Click **Customise & Quote** on TD-PKG-01 card without visiting detail first. |
| **Expected results** | 1. Quote form opens.<br>2. Package context retained for submit. |
| **Traceability** | FR-030 |

### TC-UC005-02: Quote form contains all required fields

| Field | Value |
|-------|--------|
| **Preconditions** | Quote form open |
| **Steps** | 1. Verify all form fields present. |
| **Expected results** | Fields present: Name, Email, Phone, Date to travel, Start city, End city, Number of persons, Rooms needed, Vehicle preference, Message.<br>Submit button labeled **Get Quote**. |
| **Traceability** | FR-031, FR-032; BR-020 |

### TC-UC005-03: Successful submit with valid data

| Field | Value |
|-------|--------|
| **Preconditions** | TD-LEAD-01 data ready; ops email monitored |
| **Steps** | 1. Fill all fields with valid TD-LEAD-01 values.<br>2. Click **Get Quote**. |
| **Expected results** | 1. No validation errors.<br>2. Success confirmation displayed.<br>3. Lead appears in admin within 1 minute (AC-004).<br>4. UC-015 notification triggered. |
| **Traceability** | FR-033, FR-034, FR-035; AC-004 |

### TC-UC005-04: Lead associated with source package

| Field | Value |
|-------|--------|
| **Preconditions** | TC-UC005-03 executed from TD-PKG-01 |
| **Steps** | 1. Log in as Sales (TD-SALES-01).<br>2. Open newest lead in admin. |
| **Expected results** | 1. `package_id` or package title = TD-PKG-01.<br>2. Source indicates package card or detail page. |
| **Traceability** | FR-036 |

### TC-UC005-05: Submit blocked when required fields empty

| Field | Value |
|-------|--------|
| **Preconditions** | Quote form open |
| **Steps** | 1. Leave Name, Email, Phone empty.<br>2. Click **Get Quote**. |
| **Expected results** | 1. Form not submitted.<br>2. Inline errors on required fields.<br>3. No new lead created. |
| **Traceability** | FR-033 |

### TC-UC005-06: Invalid email format rejected

| Field | Value |
|-------|--------|
| **Preconditions** | Quote form open |
| **Steps** | 1. Enter `not-an-email` in Email.<br>2. Fill other required fields validly.<br>3. Submit. |
| **Expected results** | 1. Validation error on email.<br>2. Lead not created. |
| **Traceability** | FR-033 |

### TC-UC005-07: Confirmation message shown after submit

| Field | Value |
|-------|--------|
| **Preconditions** | Successful submit |
| **Steps** | 1. Observe UI after submit. |
| **Expected results** | 1. Clear success message (e.g. thank you / we will contact you).<br>2. Form closed or reset. |
| **Traceability** | FR-035 |

### TC-UC005-08: Cancel closes form without creating lead

| Field | Value |
|-------|--------|
| **Preconditions** | Quote form open with partial data |
| **Steps** | 1. Click Cancel or close (X).<br>2. Check admin lead count. |
| **Expected results** | 1. Form closes.<br>2. No new lead record for partial entry. |
| **Traceability** | UC-005 extension 1a |

---

## 9. Test cases — Vacation Meter (UC-006, UC-007)

| TC ID | Title | Priority | Type |
|-------|-------|----------|------|
| TC-UC006-01 | Vacation Meter reachable from main nav | P0 | FN |
| TC-UC006-02 | Meter form has all five parameter fields | P0 | FN |
| TC-UC006-03 | Successful calculation shows estimate | P0 | FN |
| TC-UC006-04 | Estimate matches configured rules | P0 | FN |
| TC-UC006-05 | Submit blocked when required Meter fields missing | P1 | NV |
| TC-UC006-06 | Unsupported destination shows appropriate message | P1 | NV |
| TC-UC007-01 | Get custom quote from Meter pre-fills fields | P1 | FN |
| TC-UC007-02 | Lead from Meter has source vacation_meter | P1 | FN |
| TC-UC007-03 | Meter snapshot stored on lead record | P2 | FN |

### TC-UC006-01: Vacation Meter reachable from main nav

| Field | Value |
|-------|--------|
| **Preconditions** | Site available |
| **Steps** | 1. Click **Vacation Meter** in global nav. |
| **Expected results** | 1. Vacation Meter page loads (HTTP 200). |
| **Traceability** | FR-040 |

### TC-UC006-02: Meter form has all five parameter fields

| Field | Value |
|-------|--------|
| **Preconditions** | Meter page open |
| **Steps** | 1. Inspect Meter form. |
| **Expected results** | Fields: Select destination(s), Total night stay, Pick-up time, Drop-off time, Date. |
| **Traceability** | FR-041; BUS-009 |

### TC-UC006-03: Successful calculation shows estimate

| Field | Value |
|-------|--------|
| **Preconditions** | TD-METER-01 configured |
| **Steps** | 1. Select Udaipur, 3 nights, valid pick-up/drop times, future date.<br>2. Submit calculation. |
| **Expected results** | 1. Estimate displayed (single value or range per OQ-004).<br>2. Indicative/disclaimer text if configured. |
| **Traceability** | FR-042; AC-005 |

### TC-UC006-04: Estimate matches configured rules

| Field | Value |
|-------|--------|
| **Preconditions** | Known TD-METER-01: e.g. base ₹X/night + vehicle tier |
| **Steps** | 1. Run calculation with known inputs.<br>2. Compare UI estimate to manual expected value from config. |
| **Expected results** | 1. Displayed estimate matches business-configured formula within rounding rules. |
| **Traceability** | BUS-010; UC-018 |

### TC-UC007-01: Get custom quote from Meter pre-fills fields

| Field | Value |
|-------|--------|
| **Preconditions** | TC-UC006-03 completed |
| **Steps** | 1. Click **Get custom quote** (or equivalent) on results.<br>2. Review quote form. |
| **Expected results** | 1. Date, cities/destination, and/or message pre-filled from Meter inputs where applicable. |
| **Traceability** | FR-043 |

### TC-UC007-02: Lead from Meter has source vacation_meter

| Field | Value |
|-------|--------|
| **Preconditions** | Quote submitted from Meter flow |
| **Steps** | 1. Open lead in admin. |
| **Expected results** | 1. Lead `source` = `vacation_meter` (or equivalent enum). |
| **Traceability** | UC-007 |

---

## 10. Test cases — Meter popup (UC-008, UC-009)

| TC ID | Title | Priority | Type |
|-------|-------|----------|------|
| TC-UC008-01 | Home popup displays on first visit | P0 | FN |
| TC-UC008-02 | Popup primary action opens Vacation Meter page | P0 | FN |
| TC-UC009-01 | Dismiss closes popup | P1 | FN |
| TC-UC009-02 | Popup does not reappear after dismiss (same session) | P1 | FN |

### TC-UC008-01: Home popup displays on first visit

| Field | Value |
|-------|--------|
| **Preconditions** | New incognito session; popup enabled |
| **Steps** | 1. Load home page. |
| **Expected results** | 1. Bottom-right promotional popup visible. |
| **Traceability** | FR-016; AC-006 |

### TC-UC008-02: Popup primary action opens Vacation Meter page

| Field | Value |
|-------|--------|
| **Preconditions** | Popup visible |
| **Steps** | 1. Click primary CTA on popup. |
| **Expected results** | 1. Browser navigates to Vacation Meter page.<br>2. Meter form available (UC-006). |
| **Traceability** | FR-016, FR-040; BR-013; AC-006 |

### TC-UC009-01: Dismiss closes popup

| Field | Value |
|-------|--------|
| **Preconditions** | Popup visible |
| **Steps** | 1. Click close/dismiss on popup. |
| **Expected results** | 1. Popup hidden.<br>2. Home content remains usable. |
| **Traceability** | FR-017; BUS-011 |

### TC-UC009-02: Popup does not reappear after dismiss (same session)

| Field | Value |
|-------|--------|
| **Preconditions** | TC-UC009-01 passed |
| **Steps** | 1. Navigate away and return to home within same session.<br>2. Refresh home page. |
| **Expected results** | 1. Popup remains hidden per session rule (OQ-006). |
| **Traceability** | UC-009 |

---

## 11. Test cases — Navigation & static pages (UC-010–UC-014)

| TC ID | Title | Priority | Type | UC |
|-------|-------|----------|------|-----|
| TC-UC010-01 | Nav Home loads home | P0 | FN | UC-010 |
| TC-UC010-02 | Nav Packages loads catalog | P0 | FN | UC-010 |
| TC-UC010-03 | Nav Vacation Meter loads Meter | P0 | FN | UC-010 |
| TC-UC010-04 | Nav About Us loads about page | P1 | FN | UC-010 |
| TC-UC010-05 | Nav Contact loads contact page | P1 | FN | UC-010 |
| TC-UC010-06 | Nav MICE loads MICE page | P2 | FN | UC-010 |
| TC-UC011-01 | Packages page lists all active packages | P1 | FN | UC-011 |
| TC-UC011-02 | Inactive packages excluded from catalog | P1 | FN | UC-011 |
| TC-UC012-01 | About Us displays company content | P1 | FN | UC-012 |
| TC-UC013-01 | Contact page shows phone and email | P1 | FN | UC-013 |
| TC-UC013-02 | Contact form submit creates lead | P1 | FN | UC-013 |
| TC-UC014-01 | MICE form submit creates mice lead | P2 | FN | UC-014 |

### TC-UC010-02: Nav Packages loads catalog

| Field | Value |
|-------|--------|
| **Preconditions** | ≥3 active packages |
| **Steps** | 1. Click **Packages** in nav. |
| **Expected results** | 1. Catalog page loads with all active packages.<br>2. Card layout consistent with home. |
| **Traceability** | FR-003 |

### TC-UC013-02: Contact form submit creates lead

| Field | Value |
|-------|--------|
| **Preconditions** | Contact form on contact page |
| **Steps** | 1. Submit valid Name, Email, Phone, Message.<br>2. Check admin. |
| **Expected results** | 1. Lead created with `source = contact`.<br>2. UC-015 notification sent. |
| **Traceability** | UC-013 |

---

## 12. Test cases — Lead notification (UC-015)

| TC ID | Title | Priority | Type |
|-------|-------|----------|------|
| TC-UC015-01 | Ops email received within 1 minute of quote submit | P0 | INT |
| TC-UC015-02 | Email contains lead summary fields | P0 | INT |
| TC-UC015-03 | Lead persisted when email delivery fails | P1 | INT |

### TC-UC015-01: Ops email received within 1 minute of quote submit

| Field | Value |
|-------|--------|
| **Preconditions** | TD-OPS-EMAIL monitored; TC-UC005-03 executed |
| **Steps** | 1. Submit quote.<br>2. Check ops inbox within 60 seconds. |
| **Expected results** | 1. New email received within **1 minute**.<br>2. Subject/body identifies new BMV lead. |
| **Traceability** | FR-034; AC-004 |

### TC-UC015-02: Email contains lead summary fields

| Field | Value |
|-------|--------|
| **Preconditions** | Lead email received |
| **Steps** | 1. Open notification email. |
| **Expected results** | Email includes: customer name, email, phone, package name (if any), source, travel date, message excerpt. |
| **Traceability** | UC-015 step 2 |

### TC-UC015-03: Lead persisted when email delivery fails

| Field | Value |
|-------|--------|
| **Preconditions** | Simulate email provider failure (staging mock) |
| **Steps** | 1. Submit valid quote with email service down.<br>2. Check admin leads. |
| **Expected results** | 1. Lead still saved in database.<br>2. Failure logged for admin review.<br>3. Retry policy documented. |
| **Traceability** | UC-015 extension 3a |

---

## 13. Test cases — Admin (UC-016–UC-020)

| TC ID | Title | Priority | Type |
|-------|-------|----------|------|
| TC-UC016-01 | Admin can create destination | P0 | FN |
| TC-UC016-02 | Duplicate destination slug rejected | P1 | NV |
| TC-UC016-03 | Deactivated destination hidden on public home | P1 | FN |
| TC-UC016-04 | New destination section appears when active with packages | P1 | FN |
| TC-UC017-01 | Admin can create package with itinerary | P0 | FN |
| TC-UC017-02 | Package save fails without required fields | P1 | NV |
| TC-UC017-03 | Public site shows updated package title after save | P0 | FN |
| TC-UC017-04 | Itinerary days display on public detail | P0 | FN |
| TC-UC017-05 | Image upload associates with package | P1 | FN |
| TC-UC018-01 | Admin can save Meter configuration | P0 | FN |
| TC-UC018-02 | Public Meter uses updated rates after config change | P0 | FN |
| TC-UC018-03 | Invalid Meter config rejected on save | P1 | NV |
| TC-UC019-01 | Sales can view lead list filtered by New | P0 | FN |
| TC-UC019-02 | Sales can update lead status to Contacted | P0 | FN |
| TC-UC019-03 | Status transitions Won and Lost recorded | P1 | FN |
| TC-UC019-04 | Internal notes saved on lead | P1 | FN |
| TC-UC020-01 | Export CSV matches filtered leads | P1 | FN |
| TC-UC020-02 | Export includes all lead form fields | P1 | FN |

### TC-UC017-01: Admin can create package with itinerary

| Field | Value |
|-------|--------|
| **Preconditions** | TD-ADMIN-01 logged in; TD-DEST-01 exists |
| **Steps** | 1. Create package with title, slug, price, link to Udaipur.<br>2. Add 3 itinerary days.<br>3. Set active; save. |
| **Expected results** | 1. Package saved successfully.<br>2. Visible on public site per TC-UC017-03. |
| **Traceability** | FR-050; AC-002 |

### TC-UC019-02: Sales can update lead status to Contacted

| Field | Value |
|-------|--------|
| **Preconditions** | Lead in **New** status; TD-SALES-01 logged in |
| **Steps** | 1. Open lead.<br>2. Change status to **Contacted**; add note; save. |
| **Expected results** | 1. Status updated in list and detail.<br>2. Timestamp and user recorded. |
| **Traceability** | FR-051 |

### TC-UC020-01: Export CSV matches filtered leads

| Field | Value |
|-------|--------|
| **Preconditions** | Multiple leads with different statuses/dates |
| **Steps** | 1. Filter leads: status=New, last 7 days.<br>2. Export CSV.<br>3. Open file. |
| **Expected results** | 1. Row count matches filter.<br>2. Only matching leads in file. |
| **Traceability** | FR-051 |

---

## 14. End-to-end test scenarios (E2E)

| TC ID | Title | Priority | Steps summary | Expected |
|-------|-------|----------|---------------|----------|
| TC-E2E-01 | Browse → detail → quote → admin | P0 | Home → View Details → Customise & Quote → submit → admin lead + email | Full pipeline in AC-004 |
| TC-E2E-02 | Search → quote | P0 | Search Udaipur → Customise & Quote → submit | Lead linked; email sent |
| TC-E2E-03 | Popup → Meter → quote | P0 | Home popup → Meter → calculate → Get quote → submit | source=vacation_meter; email sent |
| TC-E2E-04 | Admin publish → public visible | P0 | Create destination + package → verify home and detail | AC-002 |
| TC-E2E-05 | Sales lead lifecycle | P1 | Submit lead → New → Contacted → Quoted → Won | Status audit trail |

### TC-E2E-01: Browse → detail → quote → admin (detailed)

| Step | Action | Expected |
|------|--------|----------|
| 1 | Open home | Home loads (TC-UC001-01) |
| 2 | Click View Details on TD-PKG-01 | Detail + itinerary same page |
| 3 | Click Customise & Quote | Form opens |
| 4 | Submit TD-LEAD-01 | Confirmation shown |
| 5 | Verify admin + email within 1 min | Lead New; ops notified |
| 6 | Sales sets Contacted | Status updated |

**Traceability:** BRD §9.2 Journey A; AC-004, AC-007

---

## 15. Non-functional & cross-cutting test cases (NFR)

| TC ID | Title | Priority | Type | Requirement |
|-------|-------|----------|------|-------------|
| TC-NFR-01 | Home LCP under 2.5s on 4G (staging) | P1 | NFR | NFR-001 |
| TC-NFR-02 | Package detail LCP under 2.5s | P1 | NFR | NFR-001 |
| TC-NFR-03 | Site served over HTTPS only | P0 | SEC | NFR-005 |
| TC-NFR-04 | Quote form XSS payload sanitized | P0 | SEC | NFR-005 |
| TC-NFR-05 | Unique meta title per package page | P1 | FN | NFR-003 |
| TC-NFR-06 | Sitemap includes package URLs | P2 | FN | NFR-003 |
| TC-NFR-07 | Keyboard navigation through main nav | P1 | A11Y | NFR-004 |
| TC-NFR-08 | Quote form fields have accessible labels | P1 | A11Y | NFR-004 |

### TC-NFR-03: Site served over HTTPS only

| Field | Value |
|-------|--------|
| **Steps** | 1. Access `http://` site URL.<br>2. Inspect certificate on `https://`. |
| **Expected results** | 1. HTTP redirects to HTTPS.<br>2. Valid TLS certificate on HTTPS. |
| **Traceability** | NFR-005 |

### TC-NFR-04: Quote form XSS payload sanitized

| Field | Value |
|-------|--------|
| **Steps** | 1. Enter `<script>alert(1)</script>` in Name and Message.<br>2. Submit form.<br>3. View lead in admin. |
| **Expected results** | 1. Script does not execute in admin or public views.<br>2. Data stored escaped/sanitized. |
| **Traceability** | NFR-005 |

---

## 16. MVP release test gate (sign-off checklist)

All **P0** tests must pass on **STAGING** before production release.

| Gate | Criteria | Test IDs |
|------|----------|----------|
| G1 | Home & catalog browsable | TC-UC001-*, TC-UC011-01 |
| G2 | Search works for pilot city | TC-UC002-01, TC-UC002-02 |
| G3 | Package detail + same-page itinerary | TC-UC004-02, TC-UC004-03 |
| G4 | Quote pipeline end-to-end | TC-UC005-03, TC-UC015-01, TC-E2E-01 |
| G5 | Vacation Meter functional | TC-UC006-03, TC-UC006-04, TC-UC008-02 |
| G6 | Admin content publishable | TC-UC017-03, TC-E2E-04 |
| G7 | Mobile responsive | TC-UC001-06 |
| G8 | Security baseline | TC-NFR-03, TC-NFR-04 |

**BRD acceptance mapping:** AC-001 through AC-008 covered by gates G1–G8 and related TCs.

---

## 17. Traceability matrix (test → use case → BRD)

| Test case | Use case | FR / AC |
|-----------|----------|---------|
| TC-UC001-* | UC-001 | FR-002, FR-010, FR-014, FR-015; AC-002, AC-008 |
| TC-UC002-* | UC-002 | FR-012, FR-013; AC-003 |
| TC-UC003-* | UC-003 | FR-011; AC-009 |
| TC-UC004-* | UC-004 | FR-020–023; AC-007 |
| TC-UC005-* | UC-005 | FR-030–036; AC-004 |
| TC-UC006-* | UC-006 | FR-040–042; AC-005 |
| TC-UC007-* | UC-007 | FR-043 |
| TC-UC008-*, TC-UC009-* | UC-008, UC-009 | FR-016, FR-017; AC-006 |
| TC-UC010–014 | UC-010–014 | FR-001, FR-003–006 |
| TC-UC015-* | UC-015 | FR-034; AC-004 |
| TC-UC016–020 | UC-016–020 | FR-050–052 |
| TC-E2E-* | Multiple | AC-001–AC-008 |
| TC-NFR-* | — | NFR-001–008 |

---

## 18. Test execution log (template)

| TC ID | Run date | Environment | Tester | Browser/device | Status | Defect ID | Notes |
|-------|----------|-------------|--------|----------------|--------|-----------|-------|
| TC-UC001-01 | | STAGING | | Chrome desktop | Not Run | | |
| TC-UC002-01 | | STAGING | | | Not Run | | |
| … | | | | | | | |

---

## 19. Defect severity guidelines

| Severity | Definition | Example |
|----------|------------|---------|
| **S1 Critical** | Site down, data loss, security breach, no quotes saved | Quote submit fails silently |
| **S2 Major** | Core feature broken, no workaround | Search returns wrong packages |
| **S3 Minor** | Feature partial, workaround exists | Popup shows every page refresh |
| **S4 Cosmetic** | Visual only | Tagline font size off-brand |

---

## 20. Document approval

| Role | Name | Signature | Date |
|------|------|-----------|------|
| QA lead | | | |
| Product owner | | | |
| Development lead | | | |

---

*Derived from [USE_CASE_REQUIREMENTS.md](./USE_CASE_REQUIREMENTS.md) v1.0. Update when use cases or OQ-001–OQ-008 resolutions change expected behavior.*
