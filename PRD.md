# Product Requirements Document (PRD)
## AI-Powered Carbon Footprinting Platform for Universities in LMIC Contexts
### MVP Version

---

## 1. Project Overview

### 1.1 What Is This

An AI-powered web platform that enables universities in lower-middle-income countries (LMICs) to calculate, track, and reduce their institutional carbon footprint. The platform follows the internationally recognised GHG Protocol standard for emissions accounting and uses AI to eliminate the manual friction that makes carbon footprinting impractical in resource-constrained institutional environments.

The MVP is a fully functional, demonstrable system covering every feature area — from document ingestion to GHG-compliant report export — built on React, Supabase, and the Gemini API, deployable on Vercel.

### 1.2 The Problem

Carbon footprinting tools built for high-income country contexts do not translate to LMIC realities. Data is scarce, infrastructure is inconsistent, and existing approaches are either too expensive, too complex, or too generic. The few LMIC-focused methodologies that exist — such as the AKDN carbon management framework — are Excel-based: functional but entirely manual, non-scalable, and incapable of producing intelligent insight.

Universities in Pakistan and similar LMIC contexts currently have no practical, affordable, and comprehensive tool to baseline, track, and reduce their institutional carbon emissions in a way that meets international standards. At the same time, pressure to report on emissions is growing — from international funders, donor bodies, and emerging domestic ESG regulation.

### 1.3 The Solution

A platform that takes a university from zero — no baseline, no structured data — to a complete, GHG Protocol-compliant carbon footprint. AI handles the friction points: extracting data from unstructured documents, intelligently filling data gaps with documented proxy assumptions, generating narrative insights, and answering questions in plain language. The calculation engine itself is deterministic and fully auditable — AI never touches the math.

### 1.4 Target User

The primary user is a university sustainability officer or equivalent — a non-technical professional responsible for environmental reporting, not a developer or data analyst. Secondary users are department heads contributing data for their units, and institutional leadership consuming reports and dashboards.

The platform is designed specifically for Pakistani and broader South Asian university contexts in the MVP, with architecture that supports expansion to other LMIC geographies.

### 1.5 Why This Matters

**Academically** — there is no published, validated framework for AI-augmented carbon footprinting in data-scarce LMIC environments. This platform is the artefact that enables that research contribution.

**Practically** — SEC Pakistan is developing ESG disclosure requirements. International funders including British Council, USAID, and EU development programmes are increasingly requiring carbon reporting from partner institutions. Universities seeking international rankings and accreditations face growing sustainability disclosure expectations.

**Globally** — the LMIC tooling gap is a documented equity issue. High-income countries have sophisticated carbon management SaaS. LMICs have Excel files. This platform directly addresses that gap and contributes open, replicable methodology.

---

## 2. Goals and Success Criteria

### 2.1 MVP Goals

- Deliver a fully working system that demonstrates every feature area end to end
- Enable a complete demo flow: onboarding → document upload → AI extraction → calculation → dashboard → insights → report export
- Validate that Gemini can reliably extract emission-relevant data from real-world Pakistani institutional documents
- Produce a system credible enough to present to a university sustainability officer and have them recognise it as something they could actually use

### 2.2 Success Criteria

- A user can onboard a university, define its organisational boundary, and set up departments and buildings without assistance
- Document upload and AI extraction works on real utility bills, fuel receipts, and procurement invoices
- Scope 1, 2, and selected Scope 3 calculations produce correct GHG Protocol-aligned outputs traceable to their inputs and emission factors
- The dashboard displays meaningful analytics including intensity metrics, hotspot identification, and period comparisons
- The NL query interface answers specific questions about the organisation's footprint data in English and Urdu
- A complete PDF report is generated that documents scope, methodology, assumptions, and results in a format suitable for submission to a funder or regulator
- The system is deployed and accessible on Vercel without a backend server

---

## 3. Scope

### 3.1 In Scope for MVP

- Full onboarding and organisational boundary definition
- Document upload and Gemini-powered data extraction
- Manual data entry as parallel input path
- Scope 1, 2, and selected Scope 3 emission calculations
- Emission factor database (Pakistan and South Asia relevant)
- Proxy data suggestions with documented assumptions
- Reporting period management
- Dashboard with analytics and intensity metrics
- Insights layer with anomaly detection and Gemini-generated narratives
- Natural language query interface in English and Urdu
- Reduction recommendations
- Uncertainty indicators on proxy-based figures
- PDF report export
- Role-based access control (three roles)
- In-app notification and flag system
- Methodology transparency page
- Pre-loaded sample dataset for demo purposes

### 3.2 Out of Scope for MVP

- Cross-institutional benchmarking (requires multiple institutions onboarded)
- Automated improvement tracking over multiple reporting periods (requires longitudinal data)
- IoT or real-time sensor data integration
- Mobile application
- Full Scope 3 coverage (MVP covers a defined subset — see Section 6)
- Third-party integrations (ERP systems, procurement platforms)
- Payments or subscription management

---

## 4. Users and Roles

### 4.1 Platform Admin

Manages institutions on the platform. Has system-level access. Oversees the emission factor database. Not a university staff member — this is the platform operator role.

### 4.2 Institution Admin

The primary user. Typically a sustainability officer or equivalent. Has full access to their institution's data. Responsible for onboarding, boundary definition, report generation, and system configuration. Can invite and manage department users.

### 4.3 Department User

A department head or data entry officer. Can upload documents and enter activity data for their assigned department only. Cannot view other departments' data or generate institution-wide reports.

### 4.4 Viewer

Read-only access to dashboards and reports. Intended for institutional leadership, board members, or external auditors. Cannot enter or modify any data.

---

## 5. Feature Requirements

### 5.1 Onboarding and Organisational Boundary

**Description**
A guided multi-step onboarding flow that a new institution completes once. Establishes the organisational boundary that all subsequent data and calculations are scoped to.

**Requirements**
- Institution profile setup: name, type, city, country, reporting currency, primary contact
- Campus registration: one or more physical campuses with names and addresses
- Building registry: buildings per campus with approximate floor area in square metres
- Department hierarchy: departments mapped to campuses and buildings
- Scope 3 category selection: user selects which Scope 3 categories they will track from the supported list (see Section 6)
- Reporting period configuration: financial year start month, default period type (annual, semester, quarterly)
- All onboarding data stored in Supabase and editable post-onboarding

**Acceptance Criteria**
- A user can complete onboarding in under 15 minutes
- Organisational boundary is clearly displayed and referenceable throughout the platform
- Scope 3 category selection explicitly lists what is and is not being tracked

---

### 5.2 Reporting Period Management

**Description**
The system must maintain a clear concept of reporting periods. All data entry, calculations, dashboards, and reports are scoped to a reporting period.

**Requirements**
- Create, name, and configure reporting periods (e.g. Annual 2024, Semester 1 2025)
- Set period status: active, closed, or draft
- All activity data entries are tagged to a reporting period
- Dashboard and analytics can be filtered by reporting period
- Period-over-period comparison available once two or more periods have data
- System flags incomplete periods — categories with missing data before period close

**Acceptance Criteria**
- User can switch between reporting periods throughout the platform
- Incomplete data warnings are visible before a period is closed
- Comparisons between periods display correctly on the dashboard

---

### 5.3 Document Upload and AI Extraction

**Description**
The centrepiece feature. Users upload documents containing activity data. Gemini processes the document, extracts relevant figures, and pre-fills the data entry form. The user reviews and confirms before anything is saved.

**Requirements**
- Supported formats: PDF, JPEG, PNG, XLSX, CSV
- Documents uploaded to Supabase Storage, linked to the relevant department and reporting period
- On upload, a Supabase edge function sends the document to Gemini with a structured extraction prompt
- Gemini returns: extracted value, unit, emission category, source description, and confidence level
- Extracted data pre-fills the manual entry form — user can edit before confirming
- If Gemini cannot extract with sufficient confidence, document is flagged for manual review — system does not silently produce a low-confidence extraction
- Extraction history maintained per document: original file, extracted values, user edits, confirmation timestamp
- Async processing: upload returns immediately, extraction result arrives via Supabase realtime subscription — UI updates without page reload

**Acceptance Criteria**
- System correctly extracts consumption figure, unit, and category from a standard KESC or SSGC utility bill
- Low-confidence extractions are visibly flagged and routed to manual review
- User cannot accidentally save an unreviewed AI extraction
- Processing status is visible in the UI while extraction is in progress

---

### 5.4 Manual Data Entry

**Description**
Parallel input path for data that does not come from a document. A user who knows their monthly generator fuel consumption can enter it directly without uploading anything.

**Requirements**
- Data entry form available for all supported emission categories
- Fields: activity value, unit, date range, department, building (optional), notes, data source description
- Option to attach a supporting document after manual entry for audit purposes
- Entries marked as manually entered in the audit log, distinct from AI-extracted entries
- Validation on units and value ranges — system warns if a value seems implausible (e.g. 10,000 litres of diesel for a single department in one month)

**Acceptance Criteria**
- A user can enter data for any emission category without uploading a document
- Manually entered data flows through the same calculation engine as extracted data
- Audit log clearly distinguishes manual entries from AI-extracted entries

---

### 5.5 Emission Calculation Engine

**Description**
Deterministic, GHG Protocol-aligned calculation logic. Takes activity data and emission factors and produces kgCO2e figures. AI has no involvement in this layer.

**Requirements**
- Calculation formula: Activity Data × Emission Factor = kgCO2e
- Supports CO2, CH4, N2O with GWP conversion to CO2e per IPCC AR6 values
- Calculations run server-side in Supabase edge functions — not in the browser
- Every calculation produces an immutable audit record containing: input value, input unit, emission factor ID used, factor value, factor source, factor year, GWP values applied, output in kgCO2e, calculation timestamp
- Recalculation triggered automatically if emission factor database is updated for a factor already used in saved calculations — system flags affected records for review
- Scope 1, 2, and supported Scope 3 categories all handled

**Acceptance Criteria**
- Manual verification of any calculated output against GHG Protocol methodology produces the same result
- Audit record exists for every emission figure in the system
- No LLM call is involved in producing any emission figure

---

### 5.6 Emission Factor Database

**Description**
A curated, structured database of emission factors relevant to Pakistan and South Asian LMIC contexts. The backbone of the calculation engine.

**Requirements**
- Stored as a proper Supabase table — not hardcoded in application logic
- Each factor record contains: factor name, activity category, GHG type, value, unit, geography, source (DEFRA / IEA / IPCC / local), source year, version, notes
- Initial dataset covers:
  - Pakistan national grid electricity emission factor (NEPRA published)
  - Diesel and petrol combustion factors (IPCC)
  - Natural gas combustion factors (IPCC)
  - LPG combustion factors (IPCC)
  - Diesel generator factors
  - Petrol and diesel vehicle travel factors
  - Domestic and international air travel factors (short, medium, long haul)
  - Water supply and treatment factors
  - Waste to landfill factors
  - Proxy factors for common procurement categories
- Platform admin can add, update, and version factors
- Factor updates are versioned — historical calculations reference the factor version used at time of calculation

**Acceptance Criteria**
- All factors have complete metadata including source and year
- Calculation engine queries the database dynamically — adding a new factor requires no code change
- Factor history is preserved when values are updated

---

### 5.7 Proxy Data Engine

**Description**
For Scope 3 categories where real activity data is unavailable — which is the normal situation in LMIC contexts — the system suggests the most appropriate proxy with documented assumptions.

**Requirements**
- When a user indicates they cannot provide real data for a category, system presents proxy options
- Gemini suggests the most appropriate proxy based on the organisation's profile and the category in question, with a plain English explanation of the assumption being made
- User selects and confirms the proxy — they cannot be applied silently
- Proxy-based figures are stored with a proxy flag and the assumption text
- Uncertainty level assigned to each proxy: low, medium, or high, based on how removed the proxy is from actual activity data
- All proxy usage surfaced in the final report with full assumption documentation

**Acceptance Criteria**
- Proxy suggestions include a clear explanation a non-technical user can understand
- No proxy is applied without explicit user confirmation
- Report clearly distinguishes measured figures from proxy-based figures

---

### 5.8 Dashboard and Analytics

**Description**
The primary view after data is entered. Shows the complete footprint picture with enough analytical depth to be genuinely useful, not just decorative.

**Requirements**

Overview panel:
- Total footprint in tCO2e for the selected reporting period
- Scope 1 / 2 / 3 breakdown as absolute values and percentages
- Comparison to previous period if available (absolute change and percentage change)
- Data completeness indicator for the current period

Breakdown views:
- By scope
- By department
- By building
- By emission category
- All filterable and cross-filterable

Intensity metrics panel:
- kgCO2e per student (FTE)
- kgCO2e per square metre of building space
- kgCO2e per PKR of operational expenditure (if expenditure data provided)

Trend charts:
- Period over period trend for total footprint and per scope
- Category-level trends

Hotspot panel:
- Top 3 emission sources by category and by department, prominently displayed

Uncertainty panel:
- Proportion of total footprint based on measured vs proxy data
- Visual confidence indicator

**Acceptance Criteria**
- Dashboard loads with sample data and all panels render correctly
- Filtering by department updates all panels consistently
- Intensity metrics calculate correctly against onboarding data (student count, floor area)

---

### 5.9 Insights Layer

**Description**
Proactive intelligence surfaced to the user. The system identifies what matters and explains it — the user does not have to find it themselves.

**Requirements**

Automated anomaly detection:
- Statistical comparison of current period data against previous period baselines
- Flag significant deviations (configurable threshold, default 20%) as anomalies
- Anomalies displayed as in-app notifications and on the dashboard

Gemini-generated narrative summary:
- On dashboard load, a plain English summary of the current footprint is generated
- Summary includes: largest emission source, notable changes from previous period, data quality observations
- Supports English and Urdu output
- Narrative is generated from structured data passed to Gemini — not from raw documents

Hotspot narrative:
- Each identified hotspot includes a one-paragraph Gemini-generated explanation of what the number means and why it matters

Period comparison narrative:
- When comparing two periods, Gemini generates a summary of what changed, what drove the change, and what it implies

**Acceptance Criteria**
- Anomaly detection fires correctly on a dataset with a known spike
- Narrative summaries are specific to the organisation's actual data — not generic
- Urdu output is intelligible and domain-appropriate

---

### 5.10 Natural Language Query Interface

**Description**
A conversational interface where users ask questions about their footprint data and receive specific, data-grounded answers.

**Requirements**
- Chat-style UI accessible from the dashboard
- User's complete footprint dataset for the selected period passed as context to Gemini
- Supports English and Urdu queries and responses
- Answers are specific — system does not give generic responses when data is available to answer precisely
- Query history maintained for the session
- System gracefully handles out-of-scope questions ("I don't have enough data to answer that" rather than hallucinating)
- Example queries the system must handle correctly:
  - "Which department had the highest emissions this semester?"
  - "How has our electricity consumption changed compared to last year?"
  - "What percentage of our footprint is Scope 3?"
  - "Which buildings are driving our generator fuel use?"

**Acceptance Criteria**
- All example queries above return correct, data-specific answers
- Urdu queries return coherent Urdu responses
- System does not hallucinate figures not present in the passed data

---

### 5.11 Reduction Recommendations

**Description**
Prioritised, specific, actionable recommendations generated from the organisation's actual footprint profile.

**Requirements**
- Recommendations generated by Gemini based on the organisation's footprint data, hotspots, and selected Scope 3 categories
- Each recommendation includes: the emission source it targets, estimated reduction potential (range, not a false precision point estimate), implementation complexity (low / medium / high), and a plain English explanation
- Recommendations are specific to the data — not generic sustainability advice
- At least 5 recommendations generated per reporting period
- User can mark recommendations as under consideration, in progress, or implemented
- Implemented recommendations tracked for future impact assessment

**Acceptance Criteria**
- Recommendations reference specific departments, buildings, or categories from the organisation's actual data
- Estimated reduction potentials are clearly labelled as estimates
- Status tracking persists in Supabase

---

### 5.12 Uncertainty Quantification

**Description**
Every footprint figure is accompanied by an explicit uncertainty indicator based on the quality of the underlying data.

**Requirements**
- Three-tier uncertainty classification per emission figure: measured (real activity data, standard factor), estimated (real activity data, proxy factor), or proxy (proxy activity data, proxy factor)
- Aggregate uncertainty score for the total footprint based on the proportion and type of uncertain figures
- Uncertainty indicators displayed on dashboard, in the insights layer, and in the report
- Tooltip on each uncertainty indicator explaining what it means and how to improve it
- Data quality improvement suggestions: "Collecting real data for these 3 categories would reduce your overall uncertainty from high to low"

**Acceptance Criteria**
- Every emission figure in the system has an uncertainty classification
- Aggregate score updates correctly as data quality improves
- Improvement suggestions are specific and actionable

---

### 5.13 Notification and Flag System

**Description**
Proactive in-app alerts so users know when something needs attention without having to actively check.

**Requirements**
- Notification types:
  - Missing data alert: a category selected during onboarding has no data for the current active period and the period end date is approaching
  - Anomaly detected: a significant deviation from baseline has been identified
  - Document pending review: an uploaded document has been processed and is awaiting user confirmation
  - Low confidence extraction: Gemini flagged an extraction for manual review
  - Period approaching close: reminder when an active period is within 2 weeks of its end date
- Notifications displayed in a notification panel accessible from the main navigation
- Unread count badge on the notification icon
- Notifications marked as read individually or all at once
- Critical notifications (pending extractions, anomalies) also surfaced on the dashboard as inline alerts

**Acceptance Criteria**
- Missing data alerts fire correctly based on onboarding scope selections and current period data
- Document pending review notifications appear within seconds of extraction completing
- Notifications persist in Supabase and survive page reload

---

### 5.14 PDF Report Export

**Description**
A complete, professionally formatted carbon footprint report that a university could submit to a funder, regulator, or publish as a sustainability disclosure.

**Requirements**
- Generated client-side using react-pdf or jsPDF
- Report structure:
  - Cover page: institution name, reporting period, report generation date, prepared by
  - Executive summary: total footprint, scope breakdown, key findings, period comparison
  - Methodology section: GHG Protocol version referenced, organisational boundary description, emission factor sources, proxy data approach, uncertainty treatment
  - Scope 1 detail: categories, values, factors used
  - Scope 2 detail: electricity consumption, grid factor applied, location-based and market-based figures if applicable
  - Scope 3 detail: categories tracked, values, proxy assumptions documented
  - Intensity metrics
  - Uncertainty summary: what proportion of the footprint is measured vs estimated vs proxy
  - Recommendations summary
  - Appendix: full audit log of emission factors used with sources and versions
- Report is GHG Protocol compliant in structure and terminology
- Exported as a downloadable PDF
- Report is reproducible — generating it twice for the same period produces the same output

**Acceptance Criteria**
- Generated report clearly distinguishes measured and proxy figures
- Methodology section is specific enough that a third party could reproduce the calculations
- PDF renders correctly and is not corrupted on download

---

### 5.15 Methodology Transparency Page

**Description**
A static but well-structured page explaining how the platform calculates emissions. Required for compliance credibility.

**Requirements**
- Accessible from the main navigation
- Covers: GHG Protocol alignment, scope definitions, organisational boundary approach, emission factor sourcing and update policy, proxy data methodology, uncertainty classification approach, limitations and known data gaps in the LMIC context
- Written in plain English accessible to a non-technical reader
- Links to primary sources: GHG Protocol website, DEFRA, IEA, IPCC

**Acceptance Criteria**
- Page is accessible without authentication (public-facing)
- A sustainability professional reviewing the page can determine the platform's methodology without additional documentation

---

### 5.16 Role-Based Access Control

**Description**
Supabase Row Level Security enforces what each role can see and do. Data isolation between institutions is absolute.

**Requirements**
- Institution admin: full read/write access to their institution's data, can invite users, can generate reports
- Department user: read/write access to their assigned department's data only, cannot see other departments, cannot generate institution-wide reports
- Viewer: read-only access to dashboards and reports, no data entry or modification
- Platform admin: cross-institution access for system management only, no access to institution data beyond what is needed for support
- Institution data is never accessible to users of a different institution under any role
- Invitation flow: institution admin invites users by email, users receive a signup link, role and department assigned on invitation

**Acceptance Criteria**
- Department user attempting to access another department's data receives a 403
- Viewer attempting to submit data receives a 403
- Supabase RLS policies enforce isolation at the database level, not just the application level

---

### 5.17 Sample Dataset

**Description**
A pre-loaded fictional university dataset that makes the platform immediately demonstrable without real data entry.

**Requirements**
- Fictional institution: "NovaTech University" — a mid-sized Pakistani university with 3 campuses, 8 departments, 12,000 students
- Two complete reporting periods loaded: Annual 2023 and Annual 2024
- Data covers all supported Scope 1, 2, and Scope 3 categories
- Mix of measured and proxy-based figures to demonstrate uncertainty indicators
- At least one anomaly present between the two periods to demonstrate anomaly detection
- Sample documents (fictional utility bills, fuel receipts) available for upload demo
- Sample data clearly labelled as demo data throughout the UI — cannot be confused with real institutional data
- Sample data accessible to any user in a demo mode without requiring institution signup

**Acceptance Criteria**
- A complete demo of all platform features is possible using only the sample dataset
- No real institutional data is required to demonstrate any feature

---

## 6. Scope 3 Categories for MVP

The following Scope 3 categories are supported in the MVP. These represent the most data-accessible and highest-impact categories for a Pakistani university context.

**Category 5 — Waste Generated in Operations**
Waste sent to landfill, incineration, and recycling. Data source: waste contractor records or estimated from waste generation benchmarks.

**Category 6 — Business Travel**
Air travel and ground transport for university staff on institutional business. Data source: travel booking records or expense claims.

**Category 7 — Employee Commuting**
Staff commuting to and from university campuses. Data source: staff survey or proxy based on staff count and average commute distance.

**Category 13 — Downstream Leased Assets / Student Commuting (adapted)**
Student commuting adapted for university context. Data source: student survey or proxy based on enrolment and campus location.

**Purchased Goods and Services (partial)**
High-spend procurement categories only — paper, lab supplies, IT equipment — using spend-based proxy factors. Full supply chain Scope 3 is explicitly out of scope for MVP and documented as such.

All other Scope 3 categories are out of scope for MVP and this is explicitly communicated to users during onboarding category selection and in the methodology page.

---

## 7. Technical Stack

### 7.1 Frontend
React with a component library (Shadcn/ui or equivalent). Recharts for data visualisation. react-pdf or jsPDF for report generation. Deployed on Vercel.

### 7.2 Backend
Supabase for database (PostgreSQL), authentication, file storage, row level security, and edge functions. No separate backend server for MVP.

### 7.3 AI
Gemini API called exclusively from Supabase edge functions. Never called directly from the frontend. Used for: document extraction, proxy suggestions, NL querying, narrative generation, reduction recommendations.

### 7.4 Async Processing
Document extraction is async. Upload triggers an edge function, extraction runs, result pushed to frontend via Supabase Realtime subscription. UI updates without polling or page reload.

### 7.5 Deployment
Frontend on Vercel free tier. Supabase free tier for MVP. No infrastructure cost for demo and development purposes.

---

## 8. Non-Functional Requirements

**Accuracy** — emission calculations must produce results consistent with manual GHG Protocol calculations. This is verifiable and must be verified during development.

**Auditability** — every data point, calculation, and AI extraction is logged immutably with enough detail for independent verification.

**Explainability** — AI suggestions include reasoning. The system never produces a recommendation or proxy suggestion without explaining why.

**Reliability** — Gemini extraction failures are handled gracefully. The system never silently produces incorrect data. Failures route to manual review.

**Usability** — designed for a non-technical sustainability officer. No training required beyond onboarding. Plain language throughout.

**Performance** — document processing is async and never blocks the UI. Dashboard loads within 3 seconds on a standard connection.

**Security** — Supabase RLS enforces data isolation at the database level. No institution can access another institution's data under any circumstance.

**Scalability** — database schema designed to support multiple institutions and eventual benchmarking without structural changes.

---

## 9. SDG Alignment

**SDG 13 — Climate Action**
The platform directly enables institutions to measure and reduce emissions in line with Target 13.2, which calls for integrating climate change measures into institutional policies and planning.

**SDG 11 — Sustainable Cities and Institutions**
Target 11.6 addresses reducing the environmental impact of institutions. Universities are anchor institutions in their cities. The platform operationalises this target for Pakistani universities.

**SDG 4 — Quality Education**
A university actively managing its environmental footprint models sustainability practice for its students and embeds climate literacy into institutional culture.

**SDG 17 — Partnerships for the Goals**
The platform directly addresses the documented LMIC tooling gap — the global inequity in access to carbon management infrastructure. By building on open methodology and open emission factor sources, it contributes replicable infrastructure for the global south.

---

## 10. Compliance Alignment

**GHG Protocol** — the internationally recognised standard for emissions accounting, followed by this platform for all Scope 1, 2, and 3 calculations.

**SECP ESG Framework** — SEC Pakistan is developing sustainability reporting requirements for institutions. GHG Protocol-compliant outputs from this platform map directly to those requirements.

**International Donor Requirements** — British Council, USAID, EU development funds, and UN agencies are increasingly requiring carbon reporting from partner institutions. The platform's report output is structured to meet these requirements.

**IPCC AR6 GWP Values** — global warming potential values used for CH4 and N2O conversion to CO2e follow the latest IPCC Sixth Assessment Report values, ensuring alignment with current international standards.

---

## 11. Open Questions and Assumptions

- Student and staff headcount data will be entered manually during onboarding. Integration with university ERP or student information systems is out of scope for MVP.
- Pakistan national grid emission factor will use the most recent NEPRA published value. This will be verified and documented before launch.
- Urdu NL support relies on Gemini's multilingual capability. Quality will be evaluated during development and documented in the research contribution.
- The platform assumes institutional users have basic digital literacy — ability to upload files, navigate a web application, and interpret charts. No training materials are in scope for MVP.
- Currency is PKR for spend-based proxy calculations. Multi-currency support is out of scope for MVP.

---

## 12. Future Roadmap (Post-MVP)

The following are explicitly out of scope for MVP but are architecturally anticipated:

**Cross-Institutional Benchmarking** — anonymised comparison of intensity metrics across institutions on the platform. Requires multiple institutions onboarded. Database schema is designed to support this from day one.

**Automated Improvement Tracking** — closed-loop verification of implemented recommendations. Requires longitudinal data across multiple reporting periods.

**Healthcare Sector Expansion** — extending the platform to hospitals and clinics following the same LMIC-focused methodology. Scope 3 categories and emission factor requirements differ significantly from universities.

**Full Scope 3 Coverage** — expanding beyond the MVP's five Scope 3 categories to the complete GHG Protocol Scope 3 standard.

**FastAPI Backend Migration** — for production deployment with proper async job queuing, Celery workers, and horizontal scaling. The MVP's Supabase edge function architecture is sufficient for demo and early pilots but not for production scale.

---

*Document version: 1.0 — MVP Brainstorming Phase*
*Last updated: April 2026*
