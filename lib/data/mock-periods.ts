import type {
  ReportingPeriod,
  MonthlyEmission,
  FacilityEmission,
  EmissionSummary,
  CategorySummary,
  PeriodComparison,
} from '@/lib/types'

// ─── Reporting Periods ───────────────────────────────────────────────────────

export const mockReportingPeriods: ReportingPeriod[] = [
  {
    id: 'rp-2024',
    name: 'Annual FY2024-25',
    startDate: '2024-07-01',
    endDate: '2025-06-30',
    fiscalYear: 'FY2024-25',
    status: 'in_progress',
    type: 'annual',
  },
  {
    id: 'rp-2023',
    name: 'Annual FY2023-24',
    startDate: '2023-07-01',
    endDate: '2024-06-30',
    fiscalYear: 'FY2023-24',
    status: 'verified',
    type: 'annual',
  },
  {
    id: 'rp-q1-2024',
    name: 'Q1 FY2024-25',
    startDate: '2024-07-01',
    endDate: '2024-09-30',
    fiscalYear: 'FY2024-25',
    status: 'completed',
    type: 'quarterly',
  },
  {
    id: 'rp-q2-2024',
    name: 'Q2 FY2024-25',
    startDate: '2024-10-01',
    endDate: '2024-12-31',
    fiscalYear: 'FY2024-25',
    status: 'completed',
    type: 'quarterly',
  },
  {
    id: 'rp-q3-2024',
    name: 'Q3 FY2024-25',
    startDate: '2025-01-01',
    endDate: '2025-03-31',
    fiscalYear: 'FY2024-25',
    status: 'in_progress',
    type: 'quarterly',
  },
]

export const activePeriodId = 'rp-2024'

// ─── FY2023-24 Emission Data (prior year, ~4.3% less than FY2024-25) ─────────

export const scope1CategoriesPY: CategorySummary[] = [
  {
    categoryId: 'cat-s1-01',
    name: 'Stationary Combustion',
    totalCO2e: 1388,
    percentage: 60.3,
    trend: 0,
    activityCount: 22,
    uncertaintyTier: 'measured',
    uncertaintyPct: 8,
  },
  {
    categoryId: 'cat-s1-02',
    name: 'Mobile Combustion',
    totalCO2e: 702,
    percentage: 30.5,
    trend: 0,
    activityCount: 18,
    uncertaintyTier: 'measured',
    uncertaintyPct: 8,
  },
  {
    categoryId: 'cat-s1-03',
    name: 'Fugitive Emissions',
    totalCO2e: 210,
    percentage: 9.2,
    trend: 0,
    activityCount: 4,
    uncertaintyTier: 'estimated',
    uncertaintyPct: 20,
  },
]

export const scope2CategoriesPY: CategorySummary[] = [
  {
    categoryId: 'cat-s2-01',
    name: 'Purchased Electricity',
    totalCO2e: 7330,
    percentage: 92.9,
    trend: 0,
    activityCount: 60,
    uncertaintyTier: 'measured',
    uncertaintyPct: 5,
  },
  {
    categoryId: 'cat-s2-02',
    name: 'Purchased Cooling',
    totalCO2e: 558,
    percentage: 7.1,
    trend: 0,
    activityCount: 12,
    uncertaintyTier: 'estimated',
    uncertaintyPct: 12,
  },
]

export const scope3CategoriesPY: CategorySummary[] = [
  {
    categoryId: 'cat-s3-01',
    name: 'Purchased Goods & Services',
    totalCO2e: 3053,
    percentage: 25.4,
    trend: 0,
    activityCount: 138,
    uncertaintyTier: 'proxy',
    uncertaintyPct: 40,
  },
  {
    categoryId: 'cat-s3-02',
    name: 'Capital Goods',
    totalCO2e: 2180,
    percentage: 18.1,
    trend: 0,
    activityCount: 24,
    uncertaintyTier: 'proxy',
    uncertaintyPct: 40,
  },
  {
    categoryId: 'cat-s3-03',
    name: 'Fuel & Energy Activities',
    totalCO2e: 958,
    percentage: 8.0,
    trend: 0,
    activityCount: 24,
    uncertaintyTier: 'estimated',
    uncertaintyPct: 15,
  },
  {
    categoryId: 'cat-s3-04',
    name: 'Waste Generated',
    totalCO2e: 460,
    percentage: 3.8,
    trend: 0,
    activityCount: 12,
    uncertaintyTier: 'proxy',
    uncertaintyPct: 50,
  },
  {
    categoryId: 'cat-s3-05',
    name: 'Business Travel',
    totalCO2e: 752,
    percentage: 6.3,
    trend: 0,
    activityCount: 72,
    uncertaintyTier: 'measured',
    uncertaintyPct: 8,
  },
  {
    categoryId: 'cat-s3-06',
    name: 'Employee Commuting',
    totalCO2e: 2068,
    percentage: 17.2,
    trend: 0,
    activityCount: 1,
    uncertaintyTier: 'proxy',
    uncertaintyPct: 30,
  },
  {
    categoryId: 'cat-s3-07',
    name: 'Student Commuting',
    totalCO2e: 2549,
    percentage: 21.2,
    trend: 0,
    activityCount: 1,
    uncertaintyTier: 'proxy',
    uncertaintyPct: 30,
  },
]

export const emissionSummariesPY: EmissionSummary[] = [
  {
    scope: 'scope1',
    totalCO2e: 2300,
    percentage: 10.5,
    categories: scope1CategoriesPY,
  },
  {
    scope: 'scope2',
    totalCO2e: 7888,
    percentage: 36.1,
    categories: scope2CategoriesPY,
  },
  {
    scope: 'scope3',
    totalCO2e: 12020,
    percentage: 53.4,
    categories: scope3CategoriesPY,
  },
]

export const monthlyEmissionsPY: MonthlyEmission[] = [
  { month: 'Jul 2023', scope1: 177, scope2: 690, scope3: 940, total: 1807 },
  { month: 'Aug 2023', scope1: 168, scope2: 652, scope3: 882, total: 1702 },
  { month: 'Sep 2023', scope1: 201, scope2: 720, scope3: 1103, total: 2024 },
  { month: 'Oct 2023', scope1: 216, scope2: 652, scope3: 1036, total: 1904 },
  { month: 'Nov 2023', scope1: 230, scope2: 595, scope3: 978, total: 1803 },
  { month: 'Dec 2023', scope1: 268, scope2: 556, scope3: 910, total: 1734 },
  { month: 'Jan 2024', scope1: 203, scope2: 537, scope3: 1055, total: 1795 },
  { month: 'Feb 2024', scope1: 211, scope2: 613, scope3: 1006, total: 1830 },
  { month: 'Mar 2024', scope1: 187, scope2: 690, scope3: 1132, total: 2009 },
  { month: 'Apr 2024', scope1: 173, scope2: 748, scope3: 1074, total: 1995 },
  { month: 'May 2024', scope1: 179, scope2: 812, scope3: 1140, total: 2131 },
  { month: 'Jun 2024', scope1: 187, scope2: 723, scope3: 964, total: 1874 },
]

export const facilityEmissionsPY: FacilityEmission[] = [
  {
    facilityId: 'fac-001',
    facilityName: 'Main Campus',
    scope1: 1390,
    scope2: 4650,
    scope3: 6900,
    total: 12940,
    areaSqm: 280000,
    intensity: 0.046,
  },
  {
    facilityId: 'fac-002',
    facilityName: 'Engineering Block',
    scope1: 499,
    scope2: 2012,
    scope3: 2970,
    total: 5481,
    areaSqm: 85000,
    intensity: 0.064,
  },
  {
    facilityId: 'fac-003',
    facilityName: 'Research Center',
    scope1: 268,
    scope2: 815,
    scope3: 1390,
    total: 2473,
    areaSqm: 45000,
    intensity: 0.055,
  },
  {
    facilityId: 'fac-004',
    facilityName: 'Student Hostels',
    scope1: 115,
    scope2: 335,
    scope3: 623,
    total: 1073,
    areaSqm: 32000,
    intensity: 0.034,
  },
  {
    facilityId: 'fac-005',
    facilityName: 'Sports Complex',
    scope1: 28,
    scope2: 76,
    scope3: 137,
    total: 241,
    areaSqm: 8000,
    intensity: 0.030,
  },
]

// ─── Period Comparison Summary ────────────────────────────────────────────────

export const periodComparisons: PeriodComparison[] = [
  {
    periodId: 'rp-2024',
    periodName: 'FY2024-25',
    totalCO2e: 23100,
    scope1: 2400,
    scope2: 8200,
    scope3: 12500,
    intensityPerStudent: 1.54,
    intensityPerSqm: 0.051,
  },
  {
    periodId: 'rp-2023',
    periodName: 'FY2023-24',
    totalCO2e: 22208,
    scope1: 2300,
    scope2: 7888,
    scope3: 12020,
    intensityPerStudent: 1.48,
    intensityPerSqm: 0.049,
  },
]

// ─── Incomplete Categories (for period warnings) ───────────────────────────

export const incompleteCategories = [
  {
    categoryId: 'cat-s3-04',
    name: 'Waste Generated',
    scope: 'scope3' as const,
    lastEntry: '2024-12-31',
    missingMonths: ['Jan 2025', 'Feb 2025', 'Mar 2025'],
  },
  {
    categoryId: 'cat-s3-03',
    name: 'Fuel & Energy Activities',
    scope: 'scope3' as const,
    lastEntry: '2025-01-31',
    missingMonths: ['Feb 2025', 'Mar 2025'],
  },
]
