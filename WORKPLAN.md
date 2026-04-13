# CarbonLens — Frontend Completion Workplan
**Goal:** A fully demo-able frontend covering every PRD feature, backed by mock data only. No backend, no real AI calls.

---

## Current State Summary

The V0-generated scaffold is a solid base. Core pages exist and are genuinely built (not wireframes). Mock data is high quality and contextually appropriate. The main gaps are: missing whole features (reporting periods, proxy data, notifications page, emission factor DB view), incomplete panels on existing pages (uncertainty indicators, per-period comparison, narrative summary), and design system violations carried over from V0 defaults.

---

## Work Items

Work is ordered by PRD section. Each item has a clear scope — what exactly needs to be built or fixed.

---

### TRACK A — Missing Pages / Whole Features

These are features that have zero or near-zero presence in the current UI.

---

#### A1 — Reporting Period Management
**PRD Section:** 5.2
**Status:** ~10% — no UI exists beyond a hardcoded string in the header

**What to build:**
- Reporting period switcher in the header — dropdown showing all periods (Annual 2023-24, Annual 2024-25, Q1/Q2/Q3 FY2024-25), currently active period highlighted, clicking switches the whole dashboard context
- `/reporting-periods` page (accessible from Settings or sidebar) with:
  - List of all periods with name, date range, status badge (Active / Closed / Draft)
  - Create new period form (name, start date, end date, type)
  - Period status change controls (close, reopen)
  - "Incomplete data" warning panel — list of emission categories that have no data for an active period
- Mock data: add a second full period (Annual 2023-24) with its own emission figures for comparison

**Files to create/modify:**
- `lib/data/mock-periods.ts` — new file with 2 annual + 3 quarterly periods and the prior year emission figures
- `components/layout/header.tsx` — add period switcher dropdown
- `app/(dashboard)/reporting-periods/page.tsx` — new page
- `components/layout/sidebar.tsx` — add Reporting Periods nav link

---

#### A2 — Notifications Page
**PRD Section:** 5.13
**Status:** 0% — page route missing, only a header dropdown exists

**What to build:**
- `/notifications` page with:
  - Full notifications list (all 5 types: missing data alert, anomaly detected, document pending review, low confidence extraction, period approaching close)
  - Filter tabs: All / Unread / Anomalies / Data / Reports
  - Each notification row: icon (type-specific), title, message, timestamp, read/unread indicator, action link button
  - "Mark all as read" button
  - Empty state for each filter
- Add missing notification types to mock data: "document pending review" (doc has been processed, awaiting user confirmation) and "low confidence extraction" (Gemini flagged an extraction)

**Files to create/modify:**
- `lib/data/mock-insights.ts` — add 2 missing notification types
- `app/(dashboard)/notifications/page.tsx` — new page

---

#### A3 — Proxy Data Flow
**PRD Section:** 5.7
**Status:** 0% — no proxy UI anywhere

**What to build:**
- Proxy suggestion panel within the Manual Data Entry page (`/data-entry/manual`):
  - When user selects a Scope 3 category (Waste, Business Travel, Employee Commuting, Student Commuting, Purchased Goods), a "Use Proxy Data" option appears
  - Clicking it opens a panel/dialog showing:
    - The proxy method being used (e.g. "Distance-based estimation using staff count × average commute distance × modal share factor")
    - The assumption being made in plain English (e.g. "Based on your 2,500 staff members and the regional average commute distance of 12km, with 65% private vehicle use…")
    - The pre-calculated proxy figure (tCO2e)
    - Uncertainty tier: Low / Medium / High with explanation
    - Source of the proxy factor
    - Explicit "Confirm and use this proxy" button — cannot be bypassed
    - "I have real data instead" button to dismiss and return to manual entry
  - Once confirmed, the entry is saved with a proxy flag
- Proxy-flagged entries shown with a distinct badge ("Proxy" in amber) in the data entry list
- Mock proxy data: pre-written proxy suggestions for all 5 Scope 3 categories the PRD supports

**Files to create/modify:**
- `lib/data/mock-proxy.ts` — new file with proxy suggestions for each Scope 3 category
- `app/(dashboard)/data-entry/manual/page.tsx` — add proxy panel/dialog
- `components/data-entry/proxy-suggestion-panel.tsx` — new component

---

#### A4 — Emission Factor Database View
**PRD Section:** 5.5 / 5.6
**Status:** ~30% — `mock-emission-factors.ts` exists but is only used in the methodology page as a reference table; no admin view exists

**What to build:**
- Emission factors tab or sub-section within Settings (`/settings`) — "Emission Factors" tab:
  - Full table of all emission factors with columns: Factor Name, Category, GHG Type, Value, Unit, Geography, Source, Source Year, Uncertainty
  - Filter by category (Scope 1 / Scope 2 / Scope 3 / All)
  - Each row has a version history indicator (show versioning — "v2 — updated Jan 2025, previously 0.49")
  - "Last updated" metadata per factor
  - Note: read-only in demo (no editing needed, but the structure must be present)
- This demonstrates that the calculation engine uses a proper factor database, not hardcoded values

**Files to create/modify:**
- `lib/data/mock-emission-factors.ts` — ensure all factors have full metadata (source year, version, uncertainty, geography)
- `app/(dashboard)/settings/page.tsx` — add Emission Factors tab

---

#### A5 — Audit Trail View
**PRD Section:** 5.5
**Status:** 0% — types define `AuditRecord` but no UI shows it

**What to build:**
- Audit log section within each scope detail page (`/emissions/scope-1`, etc.) — collapsible panel at the bottom:
  - Table of calculation audit records: Date, Category, Activity Value, Unit, Emission Factor Used, Factor Value, Factor Source, Output (kgCO2e)
  - Shows the deterministic trail from raw activity data to final CO2e figure
  - Makes the "AI never touches the math" claim visually verifiable
- Also accessible from Data Entry — each uploaded/entered record has a "View calculation" link that opens a modal with its audit record

**Files to create/modify:**
- `lib/data/mock-audit.ts` — new file with ~15 audit records covering key categories
- `components/emissions/audit-log.tsx` — new component (collapsible table)
- `app/(dashboard)/emissions/scope-1/page.tsx`, `scope-2`, `scope-3` — add audit log section

---

### TRACK B — Incomplete Existing Pages

These pages exist but are missing panels or features the PRD requires.

---

#### B1 — Dashboard: Missing Panels
**PRD Section:** 5.8
**Status:** ~70% — 8 metric cards + 3 charts exist, but 3 required panels missing

**What to add:**
1. **Period-over-period comparison panel** — side-by-side or table showing current vs. prior period: total, scope 1/2/3 absolute values, % change per scope, with up/down indicators. Requires prior year mock data from A1.
2. **Data completeness indicator panel** — visual breakdown of which emission categories have data vs. are missing for the current period. Progress-bar style per category, overall completeness % prominently displayed.
3. **Uncertainty panel** — donut or stacked bar showing proportion of total footprint that is: Measured (green), Estimated (amber), Proxy (red/orange). Tooltip explaining what each tier means.
4. **AI Narrative summary** — a bordered text block near the top of the dashboard (below metric cards) with a 3-4 sentence plain-English summary of the current footprint. Pre-written mock narrative, not live AI. Should feel like it was generated from the data (reference specific numbers, categories, changes).

**Files to modify:**
- `app/(dashboard)/page.tsx` — add 4 new sections
- `components/dashboard/period-comparison.tsx` — new component
- `components/dashboard/completeness-panel.tsx` — new component
- `components/dashboard/uncertainty-panel.tsx` — new component
- `components/dashboard/narrative-summary.tsx` — new component

---

#### B2 — Emissions Scope Pages: Per-Figure Uncertainty Badges
**PRD Section:** 5.12
**Status:** ~30% — single uncertainty note at page bottom, no per-row badges

**What to add:**
- Every row in the scope detail table gets a tier badge: `Measured` (solid green), `Estimated` (amber outline), or `Proxy` (amber filled)
- Tooltip on each badge explaining the tier and how to improve it
- Summary line at top of each scope page: "X of Y categories are measured, Z are estimated/proxy"
- Data quality improvement suggestion: a callout box at the bottom — "Collecting metered data for Fugitive Emissions would reduce your Scope 1 uncertainty from Medium to Low"

**Files to modify:**
- `components/emissions/scope-detail.tsx` — add uncertainty badges to table rows, add summary line, add improvement callout
- `lib/data/mock-emissions.ts` — add uncertainty tier field to each CategorySummary

---

#### B3 — Insights Page: Missing Elements
**PRD Section:** 5.9
**Status:** ~70%

**What to add:**
- **Period comparison narrative card** — a dedicated card showing a 4-5 sentence Gemini-style narrative comparing current period to prior. Pre-written mock text referencing actual figures ("Scope 2 emissions increased by 2.1% driven by higher electricity consumption in Q3…"). Requires prior year data from A1.
- **Hotspot narrative** — each insight card in the list should have an expandable section with a short paragraph explaining what the number means in context (currently the cards just show title + one-line description)
- **Recommendation status change** — each recommendation card needs a dropdown or button group to change status: Pending → Under Consideration → In Progress → Implemented. State managed in component with mock persistence.

**Files to modify:**
- `app/(dashboard)/insights/page.tsx` — add period comparison narrative, expandable hotspot detail, status controls
- `components/insights/recommendation-card.tsx` — new component (extracted from page) with status management

---

#### B4 — Chat Page: Language Toggle + Correct Suggested Queries
**PRD Section:** 5.10
**Status:** ~75%

**What to fix:**
- Replace the 4 generic suggested queries with the PRD's exact required queries:
  1. "Which department had the highest emissions this semester?"
  2. "How has our electricity consumption changed compared to last year?"
  3. "What percentage of our footprint is Scope 3?"
  4. "Which buildings are driving our generator fuel use?"
- Add pre-written mock responses for each of these queries in `sampleChatResponses`
- Add a visible EN/UR toggle button in the chat header (non-functional toggle for demo — just switches the label, no actual translation needed as per user's instruction)

**Files to modify:**
- `app/(dashboard)/insights/chat/page.tsx` — replace suggested queries, add language toggle
- `lib/data/mock-insights.ts` — add responses for the 4 PRD queries

---

#### B5 — Reports Page: Report Preview
**PRD Section:** 5.14
**Status:** ~40% — generation button exists, no preview, no download

**What to build:**
- When user clicks "Generate Report" (after the 2s loading simulation), show a **report preview panel** that expands below:
  - Structured preview of report content with actual sections listed: Cover Page info, Executive Summary text (pre-written), Scope 1/2/3 summaries with figures, Intensity Metrics table, Uncertainty Summary, Recommendations Summary, Appendix header
  - Each section shown as a collapsed/expandable row — clicking expands to show the actual content for that section (pre-written, data-accurate mock text)
  - "Download PDF" button (shows a toast: "PDF export requires backend integration — available in production deployment")
- Report History cards should show a preview icon that opens the same preview panel for existing reports

**Files to modify:**
- `app/(dashboard)/reports/page.tsx` — add preview panel logic
- `components/reports/report-preview.tsx` — new component

---

#### B6 — Settings: Reporting Period config in Onboarding
**PRD Section:** 5.1
**Status:** ~80% — 4-step wizard exists, missing 2 required steps

**What to add to the onboarding wizard:**
- Add Step 5 after Scope 3 selection: **Department Hierarchy** — add departments, assign each to a campus/facility. Simple list-builder: department name + assigned facility dropdown. Pre-populated with 4 example departments (Engineering, Sciences, Administration, Research).
- Add Step 6 (or integrate into Step 1): **Reporting Period Setup** — fiscal year start month (dropdown), default period type (Annual / Semester / Quarterly), base year selection.

**Files to modify:**
- `app/(onboarding)/onboarding/page.tsx` — add 2 new steps

---

### TRACK C — Design System Fixes

---

#### C1 — Remove Lucide / Enforce Icon System
**PRD:** Hard avoid — "Not Lucide"
**Status:** `lucide-react` in package.json, likely used in some components

**What to do:**
- Audit all files for `lucide-react` imports
- Replace every Lucide icon with the Phosphor equivalent
- Remove `lucide-react` from package.json

**Files to check:**
- All files in `components/ui/` (most likely to have Lucide from shadcn defaults)
- All page files

---

#### C2 — Remove Dark Mode Infrastructure
**PRD:** Light mode only, dark mode not needed
**Status:** `next-themes` installed, dark variant defined in CSS, `ThemeProvider` in root layout

**What to do:**
- Remove `ThemeProvider` from `app/layout.tsx`
- Remove the dark mode CSS variable block from `globals.css`
- Remove `next-themes` from package.json
- Remove any theme toggle buttons if present

---

#### C3 — Methodology Page: Make Public-Facing
**PRD Section:** 5.15 — "accessible without authentication"
**Status:** Currently inside the `(dashboard)` layout group (requires login)

**What to do:**
- Move `app/(dashboard)/methodology/page.tsx` to `app/methodology/page.tsx` (outside the auth group)
- Or create a separate layout that renders the methodology page without the sidebar/auth wrapper
- Add a "View Methodology" link on the login page

---

#### C4 — Demo Data Label
**PRD Section:** 5.17 — "sample data clearly labelled as demo data throughout the UI"
**Status:** No indicator anywhere

**What to do:**
- Add a persistent banner or badge in the header/sidebar: "Demo Mode — NovaTech University Sample Data"
- Style it as a subtle amber/info banner, not intrusive but always visible

---

### TRACK D — Mock Data Completions

---

#### D1 — Second Reporting Period Data
**Required by:** A1 (period switcher), B1 (period comparison), B3 (period comparison narrative)

Add to `lib/data/mock-emissions.ts` or a new `lib/data/mock-periods.ts`:
- Annual 2023-24 emission figures: scope 1/2/3 totals, monthly breakdown (12 months), facility breakdown
- Figures should show ~4.3% less than FY2024-25 (consistent with existing `yearOverYearChange: 4.3`)
- 2023-24 insights: at least 1 anomaly that is resolved by 2024-25 (to show improvement)

---

#### D2 — Proxy Data Mock Entries
**Required by:** A3

Pre-written proxy suggestions for 5 Scope 3 categories:
- Student Commuting: distance-based, staff survey proxy, Medium uncertainty
- Employee Commuting: distance-based, national average commute proxy, Medium uncertainty
- Business Travel: spend-based proxy from expense records, Low-Medium uncertainty
- Waste Generated: waste generation benchmark proxy (kg/student/year), High uncertainty
- Purchased Goods & Services: spend-based proxy (PKR expenditure × sector average factor), High uncertainty

---

#### D3 — Audit Record Mock Data
**Required by:** A5

~15 records covering:
- 3 electricity records (Scope 2, Jan/Feb/Mar 2025, LESCO bills)
- 3 generator diesel records (Scope 1 Stationary)
- 3 fleet fuel records (Scope 1 Mobile)
- 2 refrigerant records (Scope 1 Fugitive — one normal, one the spike)
- 4 Scope 3 records (one per category)

Each record: input value, unit, emission factor used, factor value + source, output kgCO2e, calculation method, timestamp, data source (document reference or manual entry)

---

## Build Order

Recommended sequence to maintain a working, demeable state at each checkpoint:

**Phase 1 — Data foundations** (no UI impact, just data)
1. D1 — Second period data
2. D2 — Proxy mock data
3. D3 — Audit record data

**Phase 2 — Fix what's broken in the design system**
4. C1 — Remove Lucide
5. C2 — Remove dark mode
6. C4 — Demo data label

**Phase 3 — High-impact missing pages**
7. A2 — Notifications page
8. A1 — Reporting period management + header switcher
9. A3 — Proxy data flow in manual entry

**Phase 4 — Dashboard completions**
10. B1 — Dashboard missing panels (narrative, comparison, completeness, uncertainty)

**Phase 5 — Emissions + insights completions**
11. B2 — Per-figure uncertainty badges on scope pages
12. B3 — Insights page additions
13. B4 — Chat page fixes

**Phase 6 — Remaining features**
14. A4 — Emission factor DB view in settings
15. A5 — Audit trail view on scope pages
16. B5 — Reports preview panel
17. B6 — Onboarding new steps
18. C3 — Methodology public-facing

---

## What Is Explicitly Not Being Built

Per user direction:
- No Urdu language support (toggle button added for demo optics only, non-functional)
- No backend integration (Supabase, Gemini API calls)
- No real PDF generation (toast message explaining it requires backend)
- No real file processing (upload UI simulates extraction)
- No authentication enforcement (mock redirect remains)
- No cross-institutional benchmarking (out of PRD scope for MVP)
