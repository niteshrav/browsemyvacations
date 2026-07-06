# Browse My Vacations — User Stories

| Field | Value |
|-------|--------|
| **Document version** | 1.0 |
| **Status** | Draft |
| **Parent documents** | [BUSINESS_REQUIREMENTS.md](./BUSINESS_REQUIREMENTS.md) v1.0, [USE_CASE_REQUIREMENTS.md](./USE_CASE_REQUIREMENTS.md) v1.0 |
| **Related** | [TEST_CASES.md](./TEST_CASES.md) v1.0 |
| **Date** | 22 May 2026 |
| **Product** | Browse My Vacations (BMV) |

---

## 1. Purpose

This document expresses BMV MVP requirements as **user stories** with acceptance criteria, ready for backlog grooming, sprint planning, and traceability to use cases (UC-xxx), functional requirements (FR-xxx), and business rules (BUS-xxx).

### 1.1 Story ID convention

| Pattern | Example | Meaning |
|---------|---------|---------|
| `US-DISC-01` | US-DISC-01 | Discover epic, story 01 |
| `US-QUOT-03` | US-QUOT-03 | Quote epic, story 03 |
| `US-ADM-02` | US-ADM-02 | Admin epic, story 02 |

### 1.2 Priority (MoSCoW)

| Label | Meaning |
|-------|---------|
| **Must** | MVP release blocker |
| **Should** | Important for MVP; waiver requires approval |
| **Could** | Desirable; may slip to post-MVP |
| **Won't** | Explicitly out of MVP scope |

### 1.3 Definition of Done (all stories)

- [ ] Acceptance criteria met on staging  
- [ ] Responsive on mobile and desktop (where UI applies)  
- [ ] No P0/P1 defects open for the story  
- [ ] Traceability to UC/FR documented in story  
- [ ] Product owner acceptance  

---

## 2. Personas

| Persona | Role | Goal |
|---------|------|------|
| **Priya** | Vacation planner (Visitor) | Find and understand packages; get a custom quote without complex search |
| **Rahul** | Sales executive | Receive qualified leads and close trips quickly |
| **Anita** | Content admin | Publish destinations and packages without developer help |
| **System** | BMV platform | Notify ops and persist data reliably |

---

## 3. Epic overview

| Epic ID | Epic name | Persona | Stories | MVP |
|---------|-----------|---------|---------|-----|
| EPIC-01 | Discover & browse packages | Priya | 6 | Yes |
| EPIC-02 | Search & quick suggestions | Priya | 4 | Yes |
| EPIC-03 | Understand package details | Priya | 4 | Yes |
| EPIC-04 | Request a custom quote | Priya, System | 6 | Yes |
| EPIC-05 | Plan with Vacation Meter | Priya | 6 | Yes |
| EPIC-06 | Learn about BMV & get in touch | Priya | 5 | Partial |
| EPIC-07 | Manage catalog content | Anita | 6 | Yes |
| EPIC-08 | Manage sales leads | Rahul | 5 | Yes |
| EPIC-09 | Platform quality & trust | All | 5 | Yes |
| | **Total** | | **47** | |

---

## 4. EPIC-01 — Discover & browse packages

**Goal:** Priya lands on BMV, sees brand promise and curated packages by destination.

| Story ID | Priority | Use case | FR |
|----------|----------|----------|-----|
| US-DISC-01 | Must | UC-001, UC-010 | FR-001, FR-002 |
| US-DISC-02 | Must | UC-001 | FR-010 |
| US-DISC-03 | Must | UC-001 | FR-014, FR-015 |
| US-DISC-04 | Must | UC-001 | FR-015, BR-009 |
| US-DISC-05 | Should | UC-011 | FR-003 |
| US-DISC-06 | Must | UC-001 | NFR-002 |

---

### US-DISC-01 — Navigate the site

**As a** vacation planner (Priya)  
**I want** clear navigation to Home, Packages, Vacation Meter, MICE, About Us, and Contact  
**So that** I can reach any section of the site in one click.

**Priority:** Must | **MVP:** Yes  
**Traceability:** UC-010, FR-001

**Acceptance criteria**
- [ ] Global nav appears on all public pages.
- [ ] Each nav item loads the correct page without error.
- [ ] Current section is visually indicated (optional but recommended).
- [ ] Nav works on mobile (hamburger or equivalent).

---

### US-DISC-02 — See brand tagline on home

**As a** vacation planner  
**I want** to see the tagline *"Vacations You'll Love. Memories You'll Keep."* on the home page  
**So that** I understand BMV’s brand promise immediately.

**Priority:** Must | **MVP:** Yes  
**Traceability:** UC-001, FR-010, BR-005

**Acceptance criteria**
- [ ] Tagline text matches exactly (punctuation and capitalization).
- [ ] Tagline is readable on desktop and mobile (contrast, font size).
- [ ] Tagline appears in hero area above or near search.

---

### US-DISC-03 — Browse packages by destination

**As a** vacation planner  
**I want** packages grouped under destination headings (e.g. Udaipur)  
**So that** I can explore trips for places I care about.

**Priority:** Must | **MVP:** Yes  
**Traceability:** UC-001, FR-014, FR-015, AC-002

**Acceptance criteria**
- [ ] Home shows at least one destination section with a clear heading.
- [ ] Only packages linked to that destination appear in the section.
- [ ] Each card shows image, short description, and visible price (BUS-004).
- [ ] Inactive or unpublished packages do not appear.

---

### US-DISC-04 — Choose to view details or request a quote

**As a** vacation planner  
**I want** separate **View Details** and **Customise & Quote** actions on every package card  
**So that** I can either learn more or ask for pricing without confusion.

**Priority:** Must | **MVP:** Yes  
**Traceability:** UC-001, FR-015, BR-009, BUS-005

**Acceptance criteria**
- [ ] Both buttons/links are visible on every package card.
- [ ] **View Details** opens package detail (not the quote form).
- [ ] **Customise & Quote** opens the quote form (not package detail).
- [ ] Actions are usable on touch devices.

---

### US-DISC-05 — Browse full packages catalog

**As a** vacation planner  
**I want** a Packages page listing all available trips  
**So that** I can see the full catalog beyond home highlights.

**Priority:** Should | **MVP:** Yes  
**Traceability:** UC-011, FR-003, OQ-002

**Acceptance criteria**
- [ ] **Packages** nav opens a catalog of all active packages.
- [ ] Cards match home card layout (image, info, price, both CTAs).
- [ ] Inactive packages are excluded.
- [ ] *If OQ-002 resolves to home-only:* story updated to scroll-to-section behavior and AC adjusted.

---

### US-DISC-06 — Use the site on my phone

**As a** vacation planner on mobile  
**I want** the home and package browsing experience to work on a small screen  
**So that** I can plan trips from my phone.

**Priority:** Must | **MVP:** Yes  
**Traceability:** UC-001, NFR-002, AC-008

**Acceptance criteria**
- [ ] No horizontal scroll on home at 390px width.
- [ ] Package cards stack in a readable layout.
- [ ] CTAs have adequate touch targets (~44px minimum).
- [ ] Images scale without breaking layout.

---

## 5. EPIC-02 — Search & quick suggestions

**Goal:** Priya finds packages quickly using simple city search—no dates or passenger counts.

| Story ID | Priority | Use case | FR / BUS |
|----------|----------|----------|----------|
| US-SRCH-01 | Must | UC-002 | FR-012, FR-013, BUS-001–003 |
| US-SRCH-02 | Must | UC-002 | BUS-002 |
| US-SRCH-03 | Should | UC-002 | UC-002 ext |
| US-SRCH-04 | Must | UC-003 | FR-011, OQ-001 |

---

### US-SRCH-01 — Search packages by city

**As a** vacation planner  
**I want** to search by city name (e.g. Udaipur) and see matching packages  
**So that** I find trips that include my chosen destination without filling a long form.

**Priority:** Must | **MVP:** Yes  
**Traceability:** UC-002, FR-012, FR-013, BUS-001, BUS-003, AC-003

**Acceptance criteria**
- [ ] Search bar accepts text input for city or combination keyword.
- [ ] Submitting "Udaipur" returns all packages that include Udaipur in the itinerary (per BUS-003 / OQ-005).
- [ ] Results show package cards with both CTAs.
- [ ] Search completes in &lt; 500ms on staging (NFR-001).

---

### US-SRCH-02 — Simple search without dates or travelers

**As a** vacation planner  
**I want** the search bar to stay simple—no dates or passenger fields  
**So that** I’m not overwhelmed before I’ve chosen a package.

**Priority:** Must | **MVP:** Yes  
**Traceability:** UC-002, BUS-002

**Acceptance criteria**
- [ ] Search UI has no date picker.
- [ ] Search UI has no adult/child/passenger counters.
- [ ] Only destination/combination text search is offered on home.

---

### US-SRCH-03 — Understand when no packages match

**As a** vacation planner  
**I want** a clear message when my search has no results  
**So that** I know to try another destination instead of thinking the site is broken.

**Priority:** Should | **MVP:** Yes  
**Traceability:** UC-002 extension 3a

**Acceptance criteria**
- [ ] Zero results shows friendly empty-state copy.
- [ ] User can revise search or navigate to browse destinations.
- [ ] Empty search or whitespace does not cause server errors.

---

### US-SRCH-04 — Pick a destination from suggestions

**As a** vacation planner  
**I want** quick destination suggestions on the home page  
**So that** I can jump to popular places in one tap.

**Priority:** Must | **MVP:** Yes  
**Traceability:** UC-003, FR-011, OQ-001, AC-009

**Acceptance criteria**
- [ ] Suggestion bar visible on home when configured.
- [ ] Tapping a suggestion shows relevant packages (filter or scroll per OQ-001).
- [ ] At least pilot destination (e.g. Udaipur) appears in suggestions for launch.

---

## 6. EPIC-03 — Understand package details

**Goal:** Priya reads full trip information and a short itinerary on one page.

| Story ID | Priority | Use case | FR / BUS |
|----------|----------|----------|----------|
| US-DETL-01 | Must | UC-004 | FR-020, FR-021 |
| US-DETL-02 | Must | UC-004 | FR-022, BUS-006 |
| US-DETL-03 | Must | UC-004 | FR-023 |
| US-DETL-04 | Should | UC-004 | UC-004 ext |

---

### US-DETL-01 — View package overview

**As a** vacation planner  
**I want** to open a package detail page with title, duration, price, and highlights  
**So that** I can decide if the trip fits my needs.

**Priority:** Must | **MVP:** Yes  
**Traceability:** UC-004, FR-020, FR-021

**Acceptance criteria**
- [ ] **View Details** from any card opens the correct package URL.
- [ ] Page shows title, duration, displayed price, and description/highlights.
- [ ] Inclusions and exclusions shown when configured in admin.
- [ ] Page returns 404 or unavailable for inactive packages.

---

### US-DETL-02 — Read short itinerary on the same page

**As a** vacation planner  
**I want** to see a day-by-day short itinerary below the overview on one page  
**So that** I don’t have to click through multiple tabs to understand the trip.

**Priority:** Must | **MVP:** Yes  
**Traceability:** UC-004, FR-022, BR-010, BUS-006, AC-007

**Acceptance criteria**
- [ ] Day-wise itinerary appears on the same page as overview.
- [ ] No separate itinerary-only URL or tab is required.
- [ ] Each day shows day number, cities/title, and summary.
- [ ] User can scroll from overview to itinerary without navigation.

---

### US-DETL-03 — Request a quote from package detail

**As a** vacation planner  
**I want** to open the quote form from the package detail page  
**So that** I can ask for customization after I’ve read the full trip.

**Priority:** Must | **MVP:** Yes  
**Traceability:** UC-004, FR-023, BUS-005

**Acceptance criteria**
- [ ] **Customise & Quote** is visible on package detail page.
- [ ] Form opens with package context attached for submit.

---

### US-DETL-04 — Share or bookmark package URL

**As a** vacation planner  
**I want** each package to have a stable, readable URL  
**So that** I can return to the trip or share it with family.

**Priority:** Should | **MVP:** Yes  
**Traceability:** FR-020, NFR-003

**Acceptance criteria**
- [ ] Package detail uses SEO-friendly slug (e.g. `/packages/udaipur-gateway-3n`).
- [ ] Direct URL load works without prior navigation from home.
- [ ] Page has unique meta title and description.

---

## 7. EPIC-04 — Request a custom quote

**Goal:** Priya submits trip preferences; BMV ops receives a qualified lead.

| Story ID | Priority | Use case | FR / BUS |
|----------|----------|----------|----------|
| US-QUOT-01 | Must | UC-005 | FR-030, FR-031 |
| US-QUOT-02 | Must | UC-005 | FR-033 |
| US-QUOT-03 | Must | UC-005 | FR-034, FR-036, UC-015 |
| US-QUOT-04 | Should | UC-005 | FR-035 |
| US-QUOT-05 | Should | UC-005 | BUS-007 |
| US-QUOT-06 | Must | UC-015 | FR-034, AC-004 |

---

### US-QUOT-01 — Fill out a customize and quote form

**As a** vacation planner  
**I want** to submit my travel preferences in one form  
**So that** BMV can send me a personalized quote.

**Priority:** Must | **MVP:** Yes  
**Traceability:** UC-005, FR-030, FR-031, FR-032, BR-020

**Acceptance criteria**
- [ ] Form fields: Name, Email, Phone, Date to travel, Start city, End city, Number of persons, Rooms needed, Vehicle preference, Message.
- [ ] Submit button labeled **Get Quote**.
- [ ] Form opens from package card or detail without leaving context unduly (modal/panel acceptable).
- [ ] Same field set from home card and detail page (BUS-007).

---

### US-QUOT-02 — See validation errors before submit

**As a** vacation planner  
**I want** clear errors when I miss required or invalid fields  
**So that** I can fix my request without losing what I typed.

**Priority:** Must | **MVP:** Yes  
**Traceability:** UC-005, FR-033, OQ-008

**Acceptance criteria**
- [ ] Name, Email, Phone required (phone mandatory per OQ-008 unless waived).
- [ ] Invalid email format blocked with inline message.
- [ ] Form not submitted until validation passes.
- [ ] User can cancel without creating a lead.

---

### US-QUOT-03 — Know my quote request was received

**As a** vacation planner  
**I want** confirmation after I submit the form  
**So that** I trust BMV will follow up.

**Priority:** Must | **MVP:** Yes  
**Traceability:** UC-005, FR-035, FR-036, BUS-008, AC-004

**Acceptance criteria**
- [ ] On success, on-screen confirmation message is shown.
- [ ] Lead saved with status **New** and linked package when applicable.
- [ ] Lead visible in admin within 1 minute.
- [ ] Disclaimer that price is indicative until sales confirms (BUS-008).

---

### US-QUOT-04 — Receive optional email acknowledgment

**As a** vacation planner  
**I want** an optional email confirming my quote request  
**So that** I have a record of my inquiry.

**Priority:** Should | **MVP:** Yes  
**Traceability:** FR-035

**Acceptance criteria**
- [ ] If enabled, customer receives acknowledgment email with summary.
- [ ] If disabled for MVP, only on-screen confirmation is required (document decision).

---

### US-QUOT-05 — Submit quote from contact page

**As a** vacation planner  
**I want** to send a general inquiry from the Contact page  
**So that** I can reach BMV even if I haven’t picked a package.

**Priority:** Should | **MVP:** Yes  
**Traceability:** UC-013, FR-005

**Acceptance criteria**
- [ ] Contact page offers simplified form (Name, Email, Phone, Message minimum).
- [ ] Lead saved with `source = contact`.
- [ ] Operations notified same as package quotes.

---

### US-QUOT-06 — Alert sales when a new lead arrives

**As** sales operations (Rahul)  
**I want** to be notified by email when someone submits a quote  
**So that** I can respond within our SLA (24–48 hours).

**Priority:** Must | **MVP:** Yes  
**Traceability:** UC-015, FR-034, AC-004, OQ-007

**Acceptance criteria**
- [ ] Email sent to configured ops distribution within 1 minute of submit.
- [ ] Email includes name, contact, package, source, travel date, message excerpt.
- [ ] Lead remains saved if email fails; failure is logged.

---

## 8. EPIC-05 — Plan with Vacation Meter

**Goal:** Priya estimates trip cost before browsing or quoting; BMV differentiates from competitors.

| Story ID | Priority | Use case | FR / BUS |
|----------|----------|----------|----------|
| US-METER-01 | Must | UC-006, UC-010 | FR-040 |
| US-METER-02 | Must | UC-006 | FR-041, BUS-009 |
| US-METER-03 | Must | UC-006 | FR-042, BUS-010 |
| US-METER-04 | Should | UC-007 | FR-043 |
| US-METER-05 | Must | UC-008 | FR-016, BR-013 |
| US-METER-06 | Should | UC-009 | FR-017, BUS-011 |

---

### US-METER-01 — Open Vacation Meter from navigation

**As a** vacation planner  
**I want** to open Vacation Meter from the main menu  
**So that** I can plan a trip estimate anytime.

**Priority:** Must | **MVP:** Yes  
**Traceability:** UC-006, UC-010, FR-040, AC-005

**Acceptance criteria**
- [ ] **Vacation Meter** nav item loads Meter page.
- [ ] Page is reachable without logging in.

---

### US-METER-02 — Enter trip parameters

**As a** vacation planner  
**I want** to enter destinations, nights, pick-up/drop times, and travel date  
**So that** BMV can estimate my trip.

**Priority:** Must | **MVP:** Yes  
**Traceability:** UC-006, FR-041, BUS-009

**Acceptance criteria**
- [ ] Form includes: destination(s), total night stay, pick-up time, drop-off time, date.
- [ ] Required fields validated before calculation.
- [ ] Unsupported destination shows helpful message.

---

### US-METER-03 — See an indicative trip estimate

**As a** vacation planner  
**I want** to see an estimated price (or range) after I enter my details  
**So that** I can decide if the trip fits my budget before requesting a quote.

**Priority:** Must | **MVP:** Yes  
**Traceability:** UC-006, FR-042, BUS-010, OQ-004, AC-005

**Acceptance criteria**
- [ ] Estimate displayed after valid submit per business formula (OQ-004).
- [ ] Indicative/disclaimer text shown (not a binding booking price).
- [ ] Estimate matches admin-configured rules for known test inputs.

---

### US-METER-04 — Continue to quote from Meter results

**As a** vacation planner  
**I want** to request a custom quote from my Meter result with fields pre-filled  
**So that** I don’t re-enter information I already provided.

**Priority:** Should | **MVP:** Yes  
**Traceability:** UC-007, FR-043

**Acceptance criteria**
- [ ] **Get custom quote** (or equivalent) visible on results.
- [ ] Quote form pre-fills date, cities/destination, and message summary where applicable.
- [ ] Submitted lead has `source = vacation_meter` and Meter snapshot.

---

### US-METER-05 — Discover Meter from home popup

**As a** vacation planner  
**I want** a helpful popup on the home page that introduces Vacation Meter  
**So that** I discover the tool without reading the whole menu.

**Priority:** Must | **MVP:** Yes  
**Traceability:** UC-008, FR-016, BR-013, AC-006

**Acceptance criteria**
- [ ] Bottom-right popup appears on home per display rules (OQ-006).
- [ ] Primary CTA navigates to Vacation Meter page.
- [ ] Popup does not block critical nav or search.

---

### US-METER-06 — Dismiss the Meter popup

**As a** vacation planner  
**I want** to close the popup if I’m not interested  
**So that** I can browse packages without distraction.

**Priority:** Should | **MVP:** Yes  
**Traceability:** UC-009, FR-017, BUS-011

**Acceptance criteria**
- [ ] Close control dismisses popup.
- [ ] Popup stays hidden for session after dismiss (per OQ-006).
- [ ] Home remains fully usable after dismiss.

---

## 9. EPIC-06 — Learn about BMV & get in touch

**Goal:** Priya builds trust and reaches BMV through About, Contact, and MICE.

| Story ID | Priority | Use case | FR |
|----------|----------|----------|-----|
| US-INFO-01 | Should | UC-012 | FR-004 |
| US-INFO-02 | Should | UC-013 | FR-005 |
| US-INFO-03 | Could | UC-014 | FR-006 |
| US-INFO-04 | Should | UC-013 | UC-013 ext |
| US-INFO-05 | Won't | — | Post-MVP |

---

### US-INFO-01 — Read About Us

**As a** vacation planner  
**I want** to read about Browse My Vacations  
**So that** I trust the company before sending a quote request.

**Priority:** Should | **MVP:** Yes  
**Traceability:** UC-012, FR-004

**Acceptance criteria**
- [ ] About Us page accessible from nav.
- [ ] Content includes company story and trust signals (credentials, experience).
- [ ] Link or path to Contact is available.

---

### US-INFO-02 — View contact details

**As a** vacation planner  
**I want** phone, email, and address on the Contact page  
**So that** I can call or email BMV directly.

**Priority:** Should | **MVP:** Yes  
**Traceability:** UC-013, FR-005

**Acceptance criteria**
- [ ] Contact page shows phone, email, and business address/hours.
- [ ] Click-to-call and mailto work on mobile where applicable.

---

### US-INFO-03 — Submit a MICE inquiry

**As a** corporate event planner  
**I want** to inquire about meetings and group travel on a MICE page  
**So that** BMV can propose a corporate package.

**Priority:** Could | **MVP:** Partial  
**Traceability:** UC-014, FR-006, OQ-003

**Acceptance criteria**
- [ ] MICE nav loads landing with overview of corporate offerings.
- [ ] Inquiry form captures company, contact, event type, group size, dates, message (final fields per OQ-003).
- [ ] Lead saved with `type = mice` and ops notified.

---

### US-INFO-04 — Call BMV without submitting a form

**As a** vacation planner  
**I want** to use click-to-call from the Contact page  
**So that** I can speak to someone immediately.

**Priority:** Should | **MVP:** Yes  
**Traceability:** UC-013 extension 3a

**Acceptance criteria**
- [ ] Phone number is tappable on mobile.
- [ ] No lead record required for click-to-call alone.

---

### US-INFO-05 — Compare quotes from multiple agents

**As a** vacation planner  
**I want** …  

**Priority:** Won't | **MVP:** No  
**Traceability:** BRD §5.2 (deferred)

**Note:** Holidify-style marketplace explicitly out of MVP scope.

---

## 10. EPIC-07 — Manage catalog content

**Goal:** Anita publishes destinations and packages without engineering support.

| Story ID | Priority | Use case | FR |
|----------|----------|----------|-----|
| US-ADM-01 | Must | UC-016 | FR-050 |
| US-ADM-02 | Must | UC-017 | FR-050 |
| US-ADM-03 | Must | UC-017 | FR-050 |
| US-ADM-04 | Should | UC-017 | FR-050 |
| US-ADM-05 | Must | UC-018 | FR-052 |
| US-ADM-06 | Must | UC-016, UC-017 | AC-002 |

---

### US-ADM-01 — Manage destinations

**As a** content admin (Anita)  
**I want** to create and edit destinations  
**So that** home sections and search stay up to date.

**Priority:** Must | **MVP:** Yes  
**Traceability:** UC-016, FR-050

**Acceptance criteria**
- [ ] Admin can create destination with name, slug, image, display order, active flag.
- [ ] Duplicate slug rejected with clear error.
- [ ] Deactivating destination hides section on public site.
- [ ] Changes reflect on public site after save (within cache TTL if any).

---

### US-ADM-02 — Create and edit packages

**As a** content admin  
**I want** to manage package content, price, and photos  
**So that** customers see accurate offers.

**Priority:** Must | **MVP:** Yes  
**Traceability:** UC-017, FR-050, BUS-004

**Acceptance criteria**
- [ ] Admin can set title, slug, linked destinations, duration, description, display price, images, highlights, inclusions, exclusions, active flag.
- [ ] Required fields enforced on save.
- [ ] Public cards and detail update after publish.

---

### US-ADM-03 — Manage short itinerary per package

**As a** content admin  
**I want** to add day-by-day itinerary rows to a package  
**So that** customers see the trip plan on the detail page.

**Priority:** Must | **MVP:** Yes  
**Traceability:** UC-017, FR-022

**Acceptance criteria**
- [ ] Admin can add/edit/delete itinerary days: day number, title, cities, summary.
- [ ] Itinerary displays on public detail page in correct order.
- [ ] Same-page itinerary rule preserved (BUS-006).

---

### US-ADM-04 — Upload package images

**As a** content admin  
**I want** to upload photos for packages  
**So that** cards and detail pages look professional.

**Priority:** Should | **MVP:** Yes  
**Traceability:** UC-017 extension 4a

**Acceptance criteria**
- [ ] Admin can upload at least one hero/card image per package.
- [ ] Images display on public card and detail.
- [ ] Reasonable file size/type validation (e.g. JPG/PNG/WebP).

---

### US-ADM-05 — Configure Vacation Meter pricing rules

**As a** content admin  
**I want** to set Meter destinations, rates, and multipliers in admin  
**So that** public estimates stay accurate without code changes.

**Priority:** Must | **MVP:** Yes  
**Traceability:** UC-018, FR-052, BUS-010, OQ-004

**Acceptance criteria**
- [ ] Admin can configure supported destinations and rate tables.
- [ ] Admin can set vehicle tiers and night/season rules as defined in OQ-004.
- [ ] Public Meter uses latest saved configuration.
- [ ] Invalid config rejected on save with errors.

---

### US-ADM-06 — Publish pilot catalog for launch

**As a** content admin  
**I want** at least one destination with five live packages for go-live  
**So that** the site is not empty on launch day.

**Priority:** Must | **MVP:** Yes  
**Traceability:** AC-002, BRD §14

**Acceptance criteria**
- [ ] Udaipur (or agreed pilot) destination active with ≥ 5 packages.
- [ ] Each package has image, price, description, and ≥ 1 itinerary day.
- [ ] All pilot packages pass public smoke tests (US-DISC-03, US-DETL-01).

---

## 11. EPIC-08 — Manage sales leads

**Goal:** Rahul processes leads efficiently from inquiry to won/lost.

| Story ID | Priority | Use case | FR |
|----------|----------|----------|-----|
| US-SALE-01 | Must | UC-019 | FR-051 |
| US-SALE-02 | Must | UC-019 | FR-051 |
| US-SALE-03 | Must | UC-019 | FR-051 |
| US-SALE-04 | Should | UC-020 | FR-051 |
| US-SALE-05 | Should | UC-019 | BUS-008 |

---

### US-SALE-01 — View incoming leads

**As a** sales executive (Rahul)  
**I want** a list of quote requests with filters  
**So that** I can prioritize new inquiries.

**Priority:** Must | **MVP:** Yes  
**Traceability:** UC-019, FR-051, AC-004

**Acceptance criteria**
- [ ] Admin lead list shows contact, package, source, date, status.
- [ ] Filter by status **New** and date range.
- [ ] Meter-sourced leads show Meter snapshot when available.

---

### US-SALE-02 — Update lead status through the pipeline

**As a** sales executive  
**I want** to move leads from New → Contacted → Quoted → Won/Lost  
**So that** the team tracks pipeline accurately.

**Priority:** Must | **MVP:** Yes  
**Traceability:** UC-019, FR-051

**Acceptance criteria**
- [ ] All statuses available: New, Contacted, Quoted, Won, Lost.
- [ ] Status change persists with timestamp.
- [ ] List and detail views reflect current status.

---

### US-SALE-03 — Add internal notes to a lead

**As a** sales executive  
**I want** to add notes on a lead  
**So that** my colleagues see context from prior calls.

**Priority:** Must | **MVP:** Yes  
**Traceability:** UC-019

**Acceptance criteria**
- [ ] Notes can be added and saved on lead detail.
- [ ] Notes visible on subsequent views; not shown to customer.

---

### US-SALE-04 — Export leads to CSV

**As a** sales executive  
**I want** to export filtered leads to CSV  
**So that** I can report or import into CRM.

**Priority:** Should | **MVP:** Yes  
**Traceability:** UC-020, FR-051

**Acceptance criteria**
- [ ] Export respects current filters.
- [ ] CSV includes all lead form fields and status.
- [ ] File downloads successfully in admin.

---

### US-SALE-05 — Send manual quote outside the system

**As a** sales executive  
**I want** to understand that final pricing is sent offline  
**So that** I don’t promise automated prices the system doesn’t generate.

**Priority:** Should | **MVP:** Yes  
**Traceability:** BUS-008

**Acceptance criteria**
- [ ] Admin UI or process docs clarify: submit = lead only, not confirmed booking.
- [ ] Customer confirmation copy does not promise instant final price.

---

## 12. EPIC-09 — Platform quality & trust

**Goal:** Site is fast, secure, findable, and accessible.

| Story ID | Priority | NFR |
|----------|----------|-----|
| US-PLAT-01 | Must | NFR-001 |
| US-PLAT-02 | Must | NFR-005 |
| US-PLAT-03 | Should | NFR-003 |
| US-PLAT-04 | Should | NFR-004 |
| US-PLAT-05 | Should | NFR-007, NFR-008 |

---

### US-PLAT-01 — Fast page loads

**As a** vacation planner on mobile network  
**I want** home and package pages to load quickly  
**So that** I don’t abandon the site.

**Priority:** Must | **MVP:** Yes  
**Traceability:** NFR-001

**Acceptance criteria**
- [ ] Home LCP &lt; 2.5s on 4G (staging measurement).
- [ ] Package detail LCP &lt; 2.5s on 4G.
- [ ] Search response &lt; 500ms.

---

### US-PLAT-02 — Secure connection and data handling

**As a** business owner  
**I want** customer data transmitted and stored securely  
**So that** we meet trust and compliance expectations.

**Priority:** Must | **MVP:** Yes  
**Traceability:** NFR-005

**Acceptance criteria**
- [ ] HTTPS enforced; HTTP redirects to HTTPS.
- [ ] Form inputs sanitized against XSS.
- [ ] PII stored with appropriate protection (encryption at rest per implementation).

---

### US-PLAT-03 — Be found via search engines

**As a** marketing stakeholder  
**I want** package and destination pages indexed with proper metadata  
**So that** organic traffic can discover BMV.

**Priority:** Should | **MVP:** Yes  
**Traceability:** NFR-003

**Acceptance criteria**
- [ ] Unique title and meta description per package and destination.
- [ ] Sitemap.xml includes public package URLs.
- [ ] robots.txt allows indexing of public pages.

---

### US-PLAT-04 — Accessible forms and navigation

**As a** visitor using assistive technology  
**I want** forms and navigation to be keyboard- and screen-reader friendly  
**So that** I can request quotes independently.

**Priority:** Should | **MVP:** Yes  
**Traceability:** NFR-004

**Acceptance criteria**
- [ ] All form fields have associated labels.
- [ ] Main nav operable via keyboard.
- [ ] Focus states visible on interactive elements.

---

### US-PLAT-05 — Privacy policy and analytics

**As a** business owner  
**I want** a privacy policy and basic usage analytics  
**So that** we comply with expectations and measure conversion.

**Priority:** Should | **MVP:** Yes  
**Traceability:** NFR-007, NFR-008

**Acceptance criteria**
- [ ] Privacy policy linked in footer.
- [ ] Analytics tracks search, quote submit, and Meter completion events.
- [ ] Marketing consent captured if required for email follow-up.

---

## 13. Product backlog — suggested sprint grouping

### Sprint 1 — Foundation & browse
US-DISC-01, US-DISC-02, US-DISC-03, US-DISC-04, US-ADM-01, US-ADM-02, US-PLAT-02

### Sprint 2 — Search, detail, admin itinerary
US-SRCH-01, US-SRCH-02, US-SRCH-04, US-DETL-01, US-DETL-02, US-DETL-03, US-ADM-03, US-ADM-04

### Sprint 3 — Quote & leads
US-QUOT-01, US-QUOT-02, US-QUOT-03, US-QUOT-06, US-SALE-01, US-SALE-02, US-SALE-03

### Sprint 4 — Vacation Meter
US-METER-01, US-METER-02, US-METER-03, US-ADM-05, US-METER-05, US-METER-06, US-METER-04

### Sprint 5 — Polish, catalog, info, launch
US-DISC-05, US-DISC-06, US-SRCH-03, US-DETL-04, US-INFO-01, US-INFO-02, US-SALE-04, US-ADM-06, US-PLAT-01, US-PLAT-03, US-PLAT-04, US-PLAT-05

### Backlog / post-MVP
US-INFO-03 (MICE depth), US-INFO-05, advanced filters, payments, accounts, reviews (BRD §5.3)

---

## 14. Traceability matrix (story → use case → FR)

| Story ID | Use case | FR | BUS |
|----------|----------|-----|-----|
| US-DISC-01 | UC-010 | FR-001 | — |
| US-DISC-02 | UC-001 | FR-010 | BR-005 |
| US-DISC-03 | UC-001 | FR-014, FR-015 | BUS-004 |
| US-DISC-04 | UC-001 | FR-015 | BUS-005 |
| US-DISC-05 | UC-011 | FR-003 | — |
| US-DISC-06 | UC-001 | NFR-002 | — |
| US-SRCH-01 | UC-002 | FR-012, FR-013 | BUS-001, BUS-003 |
| US-SRCH-02 | UC-002 | — | BUS-002 |
| US-SRCH-03 | UC-002 | — | — |
| US-SRCH-04 | UC-003 | FR-011 | — |
| US-DETL-01 | UC-004 | FR-020, FR-021 | — |
| US-DETL-02 | UC-004 | FR-022 | BUS-006 |
| US-DETL-03 | UC-004 | FR-023 | BUS-005 |
| US-DETL-04 | UC-004 | NFR-003 | — |
| US-QUOT-01 | UC-005 | FR-030–032 | BUS-007 |
| US-QUOT-02 | UC-005 | FR-033 | — |
| US-QUOT-03 | UC-005 | FR-034, FR-036 | BUS-008 |
| US-QUOT-04 | UC-005 | FR-035 | — |
| US-QUOT-05 | UC-013 | FR-005 | — |
| US-QUOT-06 | UC-015 | FR-034 | BUS-008 |
| US-METER-01 | UC-006 | FR-040 | — |
| US-METER-02 | UC-006 | FR-041 | BUS-009 |
| US-METER-03 | UC-006 | FR-042 | BUS-010 |
| US-METER-04 | UC-007 | FR-043 | — |
| US-METER-05 | UC-008 | FR-016 | BUS-011 |
| US-METER-06 | UC-009 | FR-017 | BUS-011 |
| US-INFO-01 | UC-012 | FR-004 | — |
| US-INFO-02 | UC-013 | FR-005 | — |
| US-INFO-03 | UC-014 | FR-006 | — |
| US-ADM-01 | UC-016 | FR-050 | — |
| US-ADM-02–04 | UC-017 | FR-050 | BUS-004, BUS-006 |
| US-ADM-05 | UC-018 | FR-052 | BUS-010 |
| US-ADM-06 | UC-016, UC-017 | — | AC-002 |
| US-SALE-01–04 | UC-019, UC-020 | FR-051 | BUS-008 |
| US-PLAT-01–05 | — | NFR-001–008 | — |

---

## 15. Open questions affecting stories

| OQ | Stories impacted | Action when resolved |
|----|------------------|----------------------|
| OQ-001 | US-SRCH-04 | Update AC for suggestion click behavior |
| OQ-002 | US-DISC-05 | Confirm catalog page vs home anchor |
| OQ-003 | US-INFO-03 | Finalize MICE form fields |
| OQ-004 | US-METER-03, US-ADM-05 | Document formula and output format |
| OQ-005 | US-SRCH-01 | Confirm city match rule in AC |
| OQ-006 | US-METER-05, US-METER-06 | Define popup frequency rules |
| OQ-007 | US-QUOT-06 | Confirm email vs CRM notification |
| OQ-008 | US-QUOT-02 | Confirm phone required |

---

## 16. Document approval

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Product owner | | | |
| Scrum master / lead | | | |
| Business owner | | | |

---

*Derived from [BUSINESS_REQUIREMENTS.md](./BUSINESS_REQUIREMENTS.md) and [USE_CASE_REQUIREMENTS.md](./USE_CASE_REQUIREMENTS.md). Link stories to [TEST_CASES.md](./TEST_CASES.md) during test planning.*
