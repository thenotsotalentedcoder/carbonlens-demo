// Organisation Types
export interface Organisation {
  id: string
  name: string
  type: 'university' | 'college' | 'research_institute'
  country: string
  city: string
  establishedYear: number
  totalStudents: number
  totalStaff: number
  totalAreaSqm: number
  annualBudgetPKR: number
  facilities: Facility[]
  departments?: Department[]
  boundaryApproach: 'operational' | 'equity_share'
  reportingPeriod: ReportingPeriod
  createdAt: string
  updatedAt: string
}

export interface Facility {
  id: string
  name: string
  type: 'main_campus' | 'satellite' | 'research_center' | 'hostel' | 'sports_complex'
  areaSqm: number
  occupancy: number
  address: string
  isIncluded: boolean
}

export interface Department {
  id: string
  name: string
  facilityId: string
  headName?: string
}

export interface ReportingPeriod {
  id: string
  name: string
  startDate: string
  endDate: string
  fiscalYear: string
  status: 'draft' | 'in_progress' | 'completed' | 'verified'
  type?: 'annual' | 'semester' | 'quarterly'
}

// Emissions Types
export type Scope = 'scope1' | 'scope2' | 'scope3'

export type UncertaintyTier = 'measured' | 'estimated' | 'proxy'

export interface EmissionCategory {
  id: string
  scope: Scope
  name: string
  description: string
  ghgCategory: string
}

export interface ActivityData {
  id: string
  categoryId: string
  facilityId: string
  activityType: string
  quantity: number
  unit: string
  source: 'manual' | 'document' | 'proxy'
  sourceDocument?: string
  confidenceScore?: number
  month: string
  year: number
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface EmissionFactor {
  id: string
  categoryId: string
  name: string
  value: number
  unit: string
  source: string
  sourceYear: number
  region: string
  geography: string
  ghgType: string
  version: string
  previousValue?: number
  previousVersion?: string
  validFrom: string
  validTo: string
  uncertainty: number
  notes?: string
}

export interface CalculatedEmission {
  id: string
  activityDataId: string
  categoryId: string
  scope: Scope
  co2e: number
  co2?: number
  ch4?: number
  n2o?: number
  uncertaintyLower: number
  uncertaintyUpper: number
  emissionFactorId: string
  calculationMethod: string
  calculatedAt: string
}

export interface EmissionSummary {
  scope: Scope
  totalCO2e: number
  percentage: number
  categories: CategorySummary[]
}

export interface CategorySummary {
  categoryId: string
  name: string
  totalCO2e: number
  percentage: number
  trend: number
  activityCount: number
  uncertaintyTier?: UncertaintyTier
  uncertaintyPct?: number
  improvementSuggestion?: string
}

// Intensity Metrics
export interface IntensityMetric {
  id: string
  name: string
  value: number
  unit: string
  benchmark?: number
  benchmarkSource?: string
  trend: number
  trendPeriod: string
}

// Insights Types
export interface Insight {
  id: string
  type: 'anomaly' | 'recommendation' | 'trend' | 'benchmark'
  severity: 'info' | 'warning' | 'critical'
  title: string
  description: string
  detail?: string
  affectedScope?: Scope
  affectedCategory?: string
  potentialImpact?: number
  confidence: number
  createdAt: string
  isRead: boolean
  isActioned: boolean
}

export interface Recommendation {
  id: string
  title: string
  description: string
  category: string
  targetCategory?: string
  targetFacility?: string
  estimatedReduction: number
  estimatedReductionMin?: number
  estimatedReductionMax?: number
  estimatedCost?: number
  paybackPeriod?: string
  implementationDifficulty: 'low' | 'medium' | 'high'
  priority: 'low' | 'medium' | 'high'
  status: 'pending' | 'under_consideration' | 'in_progress' | 'implemented' | 'dismissed'
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
  language?: 'en' | 'ur'
}

// Reports Types
export interface Report {
  id: string
  name: string
  type: 'annual' | 'quarterly' | 'custom'
  reportingPeriodId: string
  status: 'draft' | 'generated' | 'approved'
  sections: ReportSection[]
  generatedAt?: string
  approvedBy?: string
  approvedAt?: string
}

export interface ReportSection {
  id: string
  name: string
  type: 'executive_summary' | 'scope_breakdown' | 'methodology' | 'recommendations' | 'appendix'
  isIncluded: boolean
  order: number
  content?: string
}

// User Types
export interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'data_manager' | 'viewer' | 'auditor'
  organisationId: string
  lastLogin?: string
  createdAt: string
}

// Notification Types
export interface Notification {
  id: string
  type: 'data_validation' | 'report_ready' | 'anomaly_detected' | 'deadline_reminder' | 'system' | 'document_pending_review' | 'low_confidence_extraction'
  title: string
  message: string
  isRead: boolean
  createdAt: string
  actionUrl?: string
}

// Document Upload Types
export interface UploadedDocument {
  id: string
  name: string
  type: 'pdf' | 'excel' | 'csv' | 'image'
  size: number
  uploadedAt: string
  status: 'processing' | 'extracted' | 'verified' | 'error'
  extractedData?: ExtractedDataItem[]
  errorMessage?: string
}

export interface ExtractedDataItem {
  id: string
  field: string
  value: string
  confidence: number
  suggestedCategory?: string
  isVerified: boolean
}

// Dashboard Types
export interface DashboardStats {
  totalEmissions: number
  totalEmissionsLastYear: number
  yearOverYearChange: number
  scope1Total: number
  scope2Total: number
  scope3Total: number
  scope1LastYear: number
  scope2LastYear: number
  scope3LastYear: number
  intensityPerStudent: number
  intensityPerSqm: number
  dataCompleteness: number
  verifiedPercentage: number
  measuredPct: number
  estimatedPct: number
  proxyPct: number
}

export interface MonthlyEmission {
  month: string
  scope1: number
  scope2: number
  scope3: number
  total: number
}

export interface FacilityEmission {
  facilityId: string
  facilityName: string
  scope1: number
  scope2: number
  scope3: number
  total: number
  areaSqm: number
  intensity: number
}

// Proxy Data Types
export interface ProxySuggestion {
  id: string
  categoryId: string
  categoryName: string
  method: string
  assumption: string
  calculatedCO2e: number
  unit: string
  uncertaintyTier: UncertaintyTier
  uncertaintyPct: number
  factorSource: string
  factorValue: string
  dataInputs: string
}

// Audit Record Types
export interface AuditRecord {
  id: string
  categoryId: string
  categoryName: string
  scope: Scope
  facilityName: string
  activityValue: number
  activityUnit: string
  emissionFactorId: string
  emissionFactorName: string
  emissionFactorValue: number
  emissionFactorUnit: string
  emissionFactorSource: string
  emissionFactorYear: number
  gwpCO2: number
  gwpCH4: number
  gwpN2O: number
  outputKgCO2e: number
  calculationMethod: string
  dataSource: 'document' | 'manual' | 'proxy'
  sourceReference?: string
  calculatedAt: string
}

// Period Comparison
export interface PeriodComparison {
  periodId: string
  periodName: string
  totalCO2e: number
  scope1: number
  scope2: number
  scope3: number
  intensityPerStudent: number
  intensityPerSqm: number
}
