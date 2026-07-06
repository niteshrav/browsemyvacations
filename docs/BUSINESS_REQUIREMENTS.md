# Browse My Vacations — Business Requirements Document (BRD)

| Field | Value |
|-------|--------|
| **Document version** | 1.0 |
| **Status** | Draft — validated against source wireframe |
| **Source** | `Browse My Vacations - Draft .pdf` (5 pages) |
| **Date** | 22 May 2026 |
| **Product** | Browse My Vacations (BMV) |
| **References** | [Thrillophilia](https://www.thrillophilia.com/), [Veena World](https://www.veenaworld.com/), [Tripoto](https://www.tripoto.com/), [Holidify](https://www.holidify.com/) |

---

## 1. Executive summary

Browse My Vacations is a **curated vacation packages** web platform focused on **simple discovery** (city/combination search without dates or passenger fields), **transparent package browsing**, and **lead conversion** via custom quote requests. A signature feature, **Vacation Meter**, lets users estimate trip parameters before requesting a quote.

The business model implied by the wireframe is **operator-led** (BMV sells or fulfills curated packages), not a multi-agent marketplace like Holidify. Payments and instant booking are **out of scope** for the initial release defined by the source document.

---

## 2. Validation summary (source document review)

Requirements below are traced to the draft PDF. Each item is marked:

| Status | Meaning |
|--------|---------|
| **CONFIRMED** | Explicitly stated in draft PDF text |
| **IMPLIED** | Logical extension of confirmed items; not written in PDF |
| **GAP** | Referenced in nav or layout but not specified in extractable text |
| **DEFERRED** | Recommended for later phase; not in draft |

### 2.1 Validation matrix

| ID | Requirement (summary) | Source | Status | Notes |
|----|------------------------|--------|--------|-------|
| BR-001 | Global nav: Home, Packages, Vacation Meter, MICE, About Us, Contact | Page 1 | CONFIRMED | MICE/Packages/About/Contact lack page-level detail in PDF |
| BR-002 | Search: cities/package combinations only; no date/passenger | Page 1 | CONFIRMED | Core differentiator vs reference sites |
| BR-003 | Search example: "Udaipur" → all packages including Udaipur | Page 1 | CONFIRMED | Match rule for multi-city packages needs business rule (see §6) |
| BR-004 | Reference UX from major package sites | Page 1 | CONFIRMED | Inspiration only; not feature parity |
| BR-005 | Tagline: "Vacations You'll Love. Memories You'll Keep." | Page 2 | CONFIRMED | Styling: suitable color, font, size |
| BR-006 | Suggestion bar on home page | Page 2 | GAP | Present in wireframe; labels/behavior not in text |
| BR-007 | Destination sections with headings (e.g. Udaipur) | Page 2 | CONFIRMED | Group packages by destination/combination |
| BR-008 | Package cards: square, photo, brief info, price | Page 2 | CONFIRMED | |
| BR-009 | Card CTAs: "View Details" and "Customise & Quote" | Page 2 | CONFIRMED | Two distinct user intents |
| BR-010 | View Details: detail + short itinerary on **same page** | Page 3 | CONFIRMED | No separate itinerary page/tab |
| BR-011 | Quote form fields (see BR-020) | Page 4 | CONFIRMED | Same form on every package card |
| BR-012 | Home: bottom-right popup | Page 4 | CONFIRMED | Visual design in PDF image only |
| BR-013 | Popup click → Vacation Meter page | Page 4 | CONFIRMED | |
| BR-014 | Vacation Meter inputs: destinations, nights, pick-up/drop time, date | Page 5 | CONFIRMED | Calculation output/rules not in PDF |
| BR-015 | Payments / online booking | — | DEFERRED | Not in draft |
| BR-016 | User accounts / login | — | DEFERRED | Not in draft |
| BR-017 | Reviews / ratings | — | DEFERRED | Not in draft; common on reference sites |
| BR-018 | Agent marketplace | — | DEFERRED | Not in draft |
| BR-019 | Filters (price, theme, duration) on search | — | DEFERRED | Draft stresses simple search |
| BR-020 | Quote form: Name, Email, Phone, travel date, start/end city, persons, rooms, vehicle preference, message | Page 4 | CONFIRMED | "Massage" in PDF = **Message** (typo) |

### 2.2 Validation outcome

- **16 requirements CONFIRMED** from draft text.
- **1 requirement GAP** (Suggestion bar) — must be defined before build.
- **5 nav items GAP** for page content (Packages, MICE, About Us, Contact) — structure confirmed, detail missing.
- **1 critical GAP**: Vacation Meter **calculation rules** and **output format** — must be defined by business.
- **5 capability areas DEFERRED** — appropriate for post-MVP unless stakeholder overrides.

**Conclusion:** The draft is a valid **MVP UI and lead-gen specification**. It is not a complete BRD for operations, pricing logic, or secondary pages. This document closes those gaps with explicit assumptions and open questions.

---

## 3. Business objectives

| Objective | Success indicator (MVP) |
|-----------|-------------------------|
| Increase qualified trip inquiries | Quote form submissions per month |
| Reduce friction in package discovery | Time to find a relevant package from home &lt; 60 seconds |
| Differentiate from aggregators | Vacation Meter usage and Meter → quote conversion rate |
| Establish brand trust | Bounce rate on package detail; contact/inquiry volume |
| Support curated inventory model | Packages live per destination; admin can publish without developer |

---

## 4. Stakeholders

| Role | Responsibility |
|------|----------------|
| **Business owner** | Destinations, pricing, packages, Meter rules, quote SLA |
| **Operations / sales** | Respond to quotes; customize itineraries; CRM follow-up |
| **Content / travel ops** | Package copy, photos, itineraries, inclusions/exclusions |
| **Development** | Web platform, admin, integrations |
| **End customer** | Browse packages, use Meter, submit quote requests |

---

## 5. Scope

### 5.1 In scope (MVP — aligned to draft PDF)

1. Public marketing and browse experience (home, package detail, vacation meter, about, contact).
2. City/combination search without dates or passengers.
3. Destination-grouped package listings with card layout and dual CTAs.
4. Package detail page with short itinerary on the same page.
5. Customise & Get Quote inquiry form (global pattern per package).
6. Vacation Meter calculator page with defined input parameters.
7. Home page promotional popup linking to Vacation Meter.
8. Internal administration to manage destinations, packages, and leads (IMPLIED — required to operate; not in PDF).

### 5.2 Out of scope (MVP)

| Item | Rationale |
|------|-----------|
| Online payment / booking confirmation | Not in draft |
| Customer login and order history | Not in draft |
| Multi-agent quote comparison | Holidify model; not in draft |
| Public reviews and ratings | Not in draft |
| Advanced search filters on home search bar | Explicitly excluded in draft |
| Native mobile apps | Web-first per wireframe |
| Full MICE event management | Nav only; detail GAP |

### 5.3 Future scope (post-MVP)

- Packages catalog page with filters (price, duration, theme).
- MICE corporate landing and proposal requests.
- Razorpay deposits; user accounts; saved trips.
- Reviews; WhatsApp integration; SEO destination guides.
- Multi-language and multi-currency.

---

## 6. Business rules

| Rule ID | Rule | Source |
|---------|------|--------|
| BUS-001 | Home search accepts **destination city name** or **package combination keyword** only. | BR-002 |
| BUS-002 | Home search must **not** collect travel date, passenger count, or budget in the search bar. | BR-002 |
| BUS-003 | Searching "Udaipur" returns all packages where Udaipur is included in the itinerary (ASSUMPTION until confirmed: match any leg, not only start city). | BR-003 |
| BUS-004 | Every package card displays **starting price** (or fixed price) visible before quote. | BR-008 |
| BUS-005 | "View Details" and "Customise & Quote" are separate actions; neither replaces the other. | BR-009 |
| BUS-006 | Package itinerary on detail view is **short form**, on the **same URL/page** as overview content. | BR-010 |
| BUS-007 | Quote form is **identical field set** whether opened from home card or package detail. | BR-011 |
| BUS-008 | Quote submissions create a **sales lead** for manual follow-up; no automated final price guarantee on submit. | IMPLIED |
| BUS-009 | Vacation Meter collects: destination(s), total nights, pick-up time, drop-off time, travel date. | BR-014 |
| BUS-010 | Vacation Meter output format and pricing formula are **defined by business** in admin configuration (GAP closure). | BR-014 |
| BUS-011 | Bottom-right home popup is dismissible and routes user to Vacation Meter on primary action. | BR-012, BR-013 |

---

## 7. Functional requirements

### 7.1 Navigation and site structure

| Req ID | Requirement | Priority | Status |
|--------|-------------|----------|--------|
| FR-001 | System shall provide top-level navigation: Home, Packages, Vacation Meter, MICE, About Us, Contact. | Must | CONFIRMED |
| FR-002 | Home shall be the default landing experience with search, tagline, suggestion bar, destination sections, and package cards. | Must | CONFIRMED |
| FR-003 | Packages nav shall expose the full package catalog (ASSUMPTION: dedicated listing page; wireframe shows home sections only). | Should | GAP |
| FR-004 | About Us shall present company story, trust signals, and contact pathways. | Should | GAP |
| FR-005 | Contact shall provide business contact details and optional inquiry form. | Should | GAP |
| FR-006 | MICE shall provide corporate/group travel entry point (ASSUMPTION: static landing + lead form until detailed). | Could | GAP |

### 7.2 Home page

| Req ID | Requirement | Priority | Status |
|--------|-------------|----------|--------|
| FR-010 | Home shall display tagline: *"Vacations You'll Love. Memories You'll Keep."* with brand-appropriate typography and color. | Must | CONFIRMED |
| FR-011 | Home shall include a **suggestion bar** for quick destination/package picks (exact content TBD). | Must | GAP |
| FR-012 | Home shall include a **search bar** for package combinations or cities per BUS-001–002. | Must | CONFIRMED |
| FR-013 | Search shall return matching packages (e.g. all Udaipur-inclusive packages for query "Udaipur"). | Must | CONFIRMED |
| FR-014 | Home shall show **destination sections** with a heading (e.g. "Udaipur") and related package combinations. | Must | CONFIRMED |
| FR-015 | Each package card shall show: image, short description, price, "View Details", "Customise & Quote". | Must | CONFIRMED |
| FR-016 | Home shall show a **bottom-right popup** promoting Vacation Meter; click opens Vacation Meter page. | Must | CONFIRMED |
| FR-017 | Popup shall be dismissible without losing site usability. | Should | IMPLIED |

### 7.3 Package detail ("View Details")

| Req ID | Requirement | Priority | Status |
|--------|-------------|----------|--------|
| FR-020 | Selecting "View Details" shall open package detail for that package. | Must | CONFIRMED |
| FR-021 | Detail page shall include package overview (title, duration, price, highlights, inclusions/exclusions as available). | Must | IMPLIED |
| FR-022 | Detail page shall include **short itinerary** (day-wise summary) **below overview on the same page** without separate itinerary route. | Must | CONFIRMED |
| FR-023 | Detail page shall offer "Customise & Quote" consistent with home cards. | Must | CONFIRMED |

### 7.4 Customise & Get Quote

| Req ID | Requirement | Priority | Status |
|--------|-------------|----------|--------|
| FR-030 | "Customise & Quote" shall open an inquiry form (modal or dedicated panel). | Must | CONFIRMED |
| FR-031 | Form shall collect: Full name, Email, Phone, Date to travel, Start city, End city, Number of persons, Rooms needed, Vehicle preference, Message. | Must | CONFIRMED |
| FR-032 | Form shall include submit action labeled **Get Quote**. | Must | CONFIRMED |
| FR-033 | System shall validate required fields (name, email, phone minimum). | Must | IMPLIED |
| FR-034 | On submit, system shall persist lead and notify operations (email and/or dashboard). | Must | IMPLIED |
| FR-035 | User shall receive submission confirmation (on-screen message; email optional). | Should | IMPLIED |
| FR-036 | Lead shall associate with source package when submitted from a card or detail page. | Must | IMPLIED |

### 7.5 Vacation Meter

| Req ID | Requirement | Priority | Status |
|--------|-------------|----------|--------|
| FR-040 | Vacation Meter shall be reachable from main nav and from home popup. | Must | CONFIRMED |
| FR-041 | Meter shall accept: one or more destinations, total night stay, pick-up time, drop-off time, date. | Must | CONFIRMED |
| FR-042 | Meter shall produce a **trip estimate** based on business-configured rules (formula TBD). | Must | GAP |
| FR-043 | Meter results shall allow user to proceed to quote request (ASSUMPTION: CTA "Get custom quote" pre-filling known fields). | Should | IMPLIED |
| FR-044 | Business users shall configure Meter parameters and rates without code deploy (ASSUMPTION). | Should | IMPLIED |

### 7.6 Administration (IMPLIED — operational necessity)

| Req ID | Requirement | Priority | Status |
|--------|-------------|----------|--------|
| FR-050 | Admin shall CRUD destinations and packages (content, price, media, itinerary). | Must | IMPLIED |
| FR-051 | Admin shall view and export quote leads with status (New, Contacted, Quoted, Won, Lost). | Must | IMPLIED |
| FR-052 | Admin shall configure Vacation Meter calculation inputs and rates. | Must | IMPLIED |

---

## 8. Non-functional requirements

| Req ID | Category | Requirement |
|--------|----------|-------------|
| NFR-001 | Performance | Home and package pages LCP &lt; 2.5s on 4G; search response &lt; 500ms |
| NFR-002 | Mobile | Fully responsive; primary traffic expected mobile |
| NFR-003 | SEO | Unique title/meta per package and destination; sitemap |
| NFR-004 | Accessibility | WCAG 2.1 Level AA target for forms and navigation |
| NFR-005 | Security | HTTPS; sanitize inputs; PII stored encrypted at rest |
| NFR-006 | Availability | 99.5% uptime target for MVP |
| NFR-007 | Privacy | Privacy policy; consent for marketing contact; India DPDP awareness |
| NFR-008 | Analytics | Track search queries, card clicks, quote submits, Meter completions |

---

## 9. User roles and journeys

### 9.1 Roles

| Role | Description |
|------|-------------|
| **Visitor** | Unauthenticated browser |
| **Lead** | Visitor who submitted quote or Meter follow-up |
| **Admin** | Internal staff managing content and leads |

### 9.2 Primary journeys

**Journey A — Browse and quote (core)**  
1. Land on home → read tagline.  
2. Search "Udaipur" OR tap suggestion / scroll destination section.  
3. Review package cards → View Details OR Customise & Quote.  
4. If Details: read itinerary on same page → Customise & Quote.  
5. Submit form → receive confirmation → sales follows up.

**Journey B — Vacation Meter**  
1. See home popup OR nav → Vacation Meter.  
2. Enter destinations, nights, pick-up/drop times, date.  
3. View estimate → optional Get Quote with pre-filled context.

**Journey C — Operations**  
1. Receive lead notification.  
2. Customize itinerary and pricing offline.  
3. Send quote to customer via email/phone/WhatsApp.  
4. Update lead status in admin.

---

## 10. Data requirements (conceptual)

| Entity | Key attributes |
|--------|----------------|
| **Destination** | name, slug, image, display order, active |
| **Package** | title, slug, destinations[], duration nights/days, short description, price display, images, highlights, inclusions, exclusions, active |
| **ItineraryDay** | package_id, day_number, title, cities[], summary |
| **Lead** | contact fields (FR-031), package_id optional, source page, status, created_at |
| **MeterConfig** | destination rates, vehicle tiers, night multipliers, seasonal rules (TBD) |
| **MeterSession** | inputs, estimated output, optional link to lead |

---

## 11. Integrations (recommended)

| Integration | Purpose | MVP? |
|-------------|---------|------|
| Email (e.g. Resend) | Lead alerts to sales | Yes |
| WhatsApp Business | Quote follow-up (India market) | Should |
| CRM (Zoho/HubSpot) | Lead pipeline | Could |
| Analytics (PostHog/GA4) | Funnel measurement | Yes |
| CDN / image hosting | Package photography | Yes |

---

## 12. Assumptions and dependencies

### 12.1 Assumptions

1. BMV owns or partners for fulfillment of listed packages (operator model).
2. Prices on cards are indicative ("Starting from ₹X") unless stated fixed.
3. Quote response SLA is **24–48 business hours** unless otherwise defined.
4. Launch geography starts with **1–3 destinations** (Udaipur explicitly in draft).
5. "Suggestion bar" shows popular destinations or packages (to be confirmed).
6. MICE MVP is informational + contact form, not event booking engine.

### 12.2 Dependencies

- Package inventory and photography ready before public launch.
- Vacation Meter pricing tables provided by business/finance.
- Legal: terms of service, privacy policy, quote disclaimer.
- Domain, hosting, and business email configured.

---

## 13. Open questions (must resolve before development)

| # | Question | Owner | Impact |
|---|----------|-------|--------|
| OQ-001 | What items appear in the **Suggestion bar**? | Business | FR-011 |
| OQ-002 | **Packages** nav: separate filtered catalog or anchor to home sections? | Business | FR-003 |
| OQ-003 | **MICE** page: content, form fields, same lead pipeline as leisure? | Business | FR-006 |
| OQ-004 | **Vacation Meter** formula and output (range vs single price)? | Business / Finance | FR-042 |
| OQ-005 | Search match: any itinerary city vs start city only? | Business | BUS-003 |
| OQ-006 | Popup copy, creative, frequency (once per session?) | Marketing | FR-016 |
| OQ-007 | Quote notification channel: email only vs WhatsApp vs CRM? | Operations | FR-034 |
| OQ-008 | Is phone number mandatory for India leads? | Business | FR-033 |

---

## 14. MVP release criteria (acceptance)

| # | Criterion |
|---|-----------|
| AC-001 | All CONFIRMED FR items in §7.2–7.5 implemented and testable |
| AC-002 | At least one destination section with ≥ 5 live packages with real content |
| AC-003 | Search returns correct packages for pilot city (e.g. Udaipur) |
| AC-004 | Quote form submits and appears in admin within 1 minute |
| AC-005 | Vacation Meter accepts all BR-014 inputs and shows configured estimate |
| AC-006 | Home popup navigates to Vacation Meter |
| AC-007 | Package detail shows short itinerary on same page without extra navigation |
| AC-008 | Site responsive on mobile and desktop |
| AC-009 | Open questions OQ-001, OQ-004, OQ-005 resolved and documented |

---

## 15. Traceability to source draft

| PDF page | Content | BRD sections |
|----------|---------|--------------|
| 1 | Nav, search rules, references | §5, §7.1–7.2, BUS-001–003 |
| 2 | Tagline, suggestion bar, destination cards | §7.2 FR-010–015 |
| 3 | View Details + same-page itinerary | §7.3 |
| 4 | Quote form, home popup → Meter | §7.4, §7.2 FR-016, §7.5 |
| 5 | Vacation Meter parameters | §7.5, BUS-009–010 |

---

## 16. Document approval

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Business owner | | | |
| Product / project lead | | | |
| Technical lead | | | |

---

*This BRD validates the wireframe draft and extends it with standard business, implied operational, and gap items required for implementation. Changes to CONFIRMED items require stakeholder approval and version increment.*
