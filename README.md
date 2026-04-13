# CarbonLens

AI-powered GHG Protocol-compliant carbon footprinting platform for universities in emerging economies. Built as a Final Year Project demo with fully mock data.

## Overview

CarbonLens helps Pakistani universities track, analyse, and report their institutional greenhouse gas emissions in accordance with the GHG Protocol Corporate Standard. The platform covers Scope 1 (direct), Scope 2 (purchased energy), and Scope 3 (value chain) emissions with IPCC AR6 emission factors and NEPRA 2024 grid factors.

**This is a frontend-only demo — all data is mocked. No backend or database.**

## Features

- **Dashboard** — Total emissions summary, monthly trend, scope breakdown, facility comparison, AI narrative summary, year-over-year comparison, data quality breakdown
- **Emissions** — Per-scope drill-down (Scope 1/2/3) with category details, uncertainty badges, and audit trail
- **Data Entry** — Manual activity data entry with proxy data flow
- **Insights** — AI-generated recommendations with status tracking, chat interface with Urdu/English toggle
- **Reports** — Automated GHG report generation with preview and export
- **Reporting Periods** — Multi-period management (FY2024-25, FY2023-24)
- **Settings** — Organisation profile, user management, emission factor database with version history
- **Methodology** — Public-facing calculation methodology page (no login required)
- **Onboarding** — 6-step setup wizard including department hierarchy and reporting period configuration

## Tech Stack

- **Framework** — Next.js 16 (App Router)
- **Language** — TypeScript
- **Styling** — Tailwind CSS v4
- **UI Components** — shadcn/ui + Radix UI
- **Icons** — Phosphor Icons
- **Charts** — Pure SVG (custom, no library — Turbopack compatible)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

**Demo login:** Use any email and password to enter the platform.

## Project Structure

```
app/
  (auth)/         # Login, Register pages
  (dashboard)/    # Main app — Dashboard, Emissions, Insights, Reports, etc.
  (onboarding)/   # Setup wizard
  methodology/    # Public methodology page (no auth)
components/
  dashboard/      # Dashboard-specific components + SVG charts
  emissions/      # Scope detail, audit log
  layout/         # Sidebar, Header
  shared/         # MetricCard, etc.
  ui/             # shadcn/ui base components
lib/
  data/           # All mock data (emissions, insights, emission factors, etc.)
  types/          # TypeScript interfaces
  utils/          # Formatters, helpers
```

## Deployment

Deployed on Vercel. Push to GitHub and import the repo in Vercel — zero configuration needed.

```bash
# Build locally to verify
npm run build
```

## Demo Data

The demo is pre-loaded with NovaTech University sample data:
- FY2024-25 (active) and FY2023-24 reporting periods
- 23,100 tCO2e total emissions across Scope 1/2/3
- Measured, estimated, and proxy uncertainty tiers
- Full audit trail with emission factor sources

## Academic Context

Final Year Project — GHG Protocol-compliant carbon accounting tool targeting Low and Middle Income Country (LMIC) university contexts, with specific focus on Pakistani higher education institutions.
