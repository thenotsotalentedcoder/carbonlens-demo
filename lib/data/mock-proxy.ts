import type { ProxySuggestion } from '@/lib/types'

export const proxySuggestions: ProxySuggestion[] = [
  {
    id: 'proxy-s3-07',
    categoryId: 'cat-s3-07',
    categoryName: 'Student Commuting',
    method: 'Distance-based estimation using student survey proxy',
    assumption:
      'Based on your 15,000 enrolled students and a regional modal share survey (65% private vehicle, 20% public transport, 15% walking/cycling), combined with an average one-way commute distance of 14 km derived from campus location in Lahore and residential density patterns. Private vehicle emission factor: 0.171 kgCO2e/km (IPCC petrol car average). 230 working days assumed.',
    calculatedCO2e: 3060,
    unit: 'tCO2e / year',
    uncertaintyTier: 'proxy',
    uncertaintyPct: 30,
    factorSource: 'IPCC 2021, Chapter 3 — Road Transport',
    factorValue: '0.171 kgCO2e/passenger-km (petrol car)',
    dataInputs: '15,000 students × 65% private vehicle × 14 km × 2 trips × 230 days × 0.171 kgCO2e/km',
  },
  {
    id: 'proxy-s3-06',
    categoryId: 'cat-s3-06',
    categoryName: 'Employee Commuting',
    method: 'Distance-based estimation using national average commute proxy',
    assumption:
      'Based on your 2,500 staff members and Pakistan national average commute data: average one-way distance of 12 km, modal share of 70% private vehicle, 20% public transport, 10% other. Private vehicle emission factor applied for dominant mode. 250 working days assumed for full-time staff.',
    calculatedCO2e: 2100,
    unit: 'tCO2e / year',
    uncertaintyTier: 'proxy',
    uncertaintyPct: 30,
    factorSource: 'IPCC 2021 + Pakistan Bureau of Statistics Urban Mobility Survey 2022',
    factorValue: '0.171 kgCO2e/passenger-km (petrol car)',
    dataInputs: '2,500 staff × 70% private vehicle × 12 km × 2 trips × 250 days × 0.171 kgCO2e/km',
  },
  {
    id: 'proxy-s3-05',
    categoryId: 'cat-s3-05',
    categoryName: 'Business Travel',
    method: 'Spend-based proxy from institutional travel expenditure records',
    assumption:
      'Based on annual travel reimbursement expenditure of PKR 12.4 million. Spend-based emission factor derived from DEFRA 2024 average for domestic/international air travel. Approximately 60% of travel spend attributed to air travel, 40% to ground transport. Exchange rate: 1 USD = 278 PKR applied for factor conversion.',
    calculatedCO2e: 890,
    unit: 'tCO2e / year',
    uncertaintyTier: 'estimated',
    uncertaintyPct: 20,
    factorSource: 'DEFRA 2024 — Business Travel: Air and Ground',
    factorValue: '0.255 kgCO2e/PKR 1,000 spend (blended air/ground)',
    dataInputs: 'PKR 12,400,000 travel spend × 0.255 kgCO2e/PKR 1,000 × spend split adjustment',
  },
  {
    id: 'proxy-s3-04',
    categoryId: 'cat-s3-04',
    categoryName: 'Waste Generated',
    method: 'Waste generation benchmark proxy (kg per student per year)',
    assumption:
      'Based on South Asian university waste generation benchmark of 0.35 kg of solid waste per student per day (UNU/UNEP 2022 LMIC university benchmark). With 15,000 students and 230 academic days, total waste estimated at 1,207 tonnes/year. Assuming 85% landfill disposal based on Lahore municipal waste infrastructure (LWMC data). Landfill emission factor applied.',
    calculatedCO2e: 420,
    unit: 'tCO2e / year',
    uncertaintyTier: 'proxy',
    uncertaintyPct: 50,
    factorSource: 'IPCC 2006 Waste — Solid Waste Disposal, Tier 1 default for South Asia',
    factorValue: '0.348 kgCO2e/kg waste to landfill',
    dataInputs: '15,000 students × 0.35 kg/day × 230 days × 85% landfill × 0.348 kgCO2e/kg',
  },
  {
    id: 'proxy-s3-01',
    categoryId: 'cat-s3-01',
    categoryName: 'Purchased Goods & Services',
    method: 'Spend-based proxy using sector-average emission intensity factors',
    assumption:
      'Based on non-capital procurement expenditure of PKR 850 million. Broken into three major procurement categories: IT equipment (PKR 180M, 30% of spend), laboratory supplies (PKR 340M, 40% of spend), and general goods/services (PKR 330M, 30% of spend). Each assigned a sector-specific spend-based emission factor from DEFRA 2024 average supply chain intensities, converted from GBP to PKR at prevailing rates.',
    calculatedCO2e: 3200,
    unit: 'tCO2e / year',
    uncertaintyTier: 'proxy',
    uncertaintyPct: 40,
    factorSource: 'DEFRA 2024 — Purchased Goods and Services, spend-based method',
    factorValue: 'Blended: 0.38 kgCO2e/PKR 100 spend (IT), 0.41 kgCO2e/PKR 100 (lab), 0.34 kgCO2e/PKR 100 (general)',
    dataInputs: 'PKR 850M total procurement spend × category-weighted emission intensity factors',
  },
]

export function getProxySuggestion(categoryId: string): ProxySuggestion | undefined {
  return proxySuggestions.find(p => p.categoryId === categoryId)
}

export const proxyEligibleCategories = [
  'cat-s3-01',
  'cat-s3-04',
  'cat-s3-05',
  'cat-s3-06',
  'cat-s3-07',
]
