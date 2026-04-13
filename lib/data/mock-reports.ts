import type { Report, ReportSection, UploadedDocument, ExtractedDataItem } from '@/lib/types'

export const mockReports: Report[] = [
  {
    id: 'rep-001',
    name: 'Annual GHG Inventory FY2023-24',
    type: 'annual',
    reportingPeriodId: 'rp-2023',
    status: 'approved',
    sections: [
      { id: 'sec-001', name: 'Executive Summary', type: 'executive_summary', isIncluded: true, order: 1 },
      { id: 'sec-002', name: 'Scope 1 Emissions', type: 'scope_breakdown', isIncluded: true, order: 2 },
      { id: 'sec-003', name: 'Scope 2 Emissions', type: 'scope_breakdown', isIncluded: true, order: 3 },
      { id: 'sec-004', name: 'Scope 3 Emissions', type: 'scope_breakdown', isIncluded: true, order: 4 },
      { id: 'sec-005', name: 'Methodology', type: 'methodology', isIncluded: true, order: 5 },
      { id: 'sec-006', name: 'Recommendations', type: 'recommendations', isIncluded: true, order: 6 },
      { id: 'sec-007', name: 'Data Appendix', type: 'appendix', isIncluded: true, order: 7 },
    ],
    generatedAt: '2024-08-15T10:00:00Z',
    approvedBy: 'Dr. Ayesha Khan',
    approvedAt: '2024-08-20T14:30:00Z',
  },
  {
    id: 'rep-002',
    name: 'Q1 FY2024-25 Summary',
    type: 'quarterly',
    reportingPeriodId: 'rp-2024',
    status: 'generated',
    sections: [
      { id: 'sec-008', name: 'Executive Summary', type: 'executive_summary', isIncluded: true, order: 1 },
      { id: 'sec-009', name: 'Emissions Overview', type: 'scope_breakdown', isIncluded: true, order: 2 },
      { id: 'sec-010', name: 'Key Insights', type: 'recommendations', isIncluded: true, order: 3 },
    ],
    generatedAt: '2024-10-05T09:15:00Z',
  },
  {
    id: 'rep-003',
    name: 'Q2 FY2024-25 Summary',
    type: 'quarterly',
    reportingPeriodId: 'rp-2024',
    status: 'generated',
    sections: [
      { id: 'sec-011', name: 'Executive Summary', type: 'executive_summary', isIncluded: true, order: 1 },
      { id: 'sec-012', name: 'Emissions Overview', type: 'scope_breakdown', isIncluded: true, order: 2 },
      { id: 'sec-013', name: 'Key Insights', type: 'recommendations', isIncluded: true, order: 3 },
    ],
    generatedAt: '2025-01-08T11:30:00Z',
  },
  {
    id: 'rep-004',
    name: 'Q3 FY2024-25 Summary',
    type: 'quarterly',
    reportingPeriodId: 'rp-2024',
    status: 'draft',
    sections: [
      { id: 'sec-014', name: 'Executive Summary', type: 'executive_summary', isIncluded: true, order: 1 },
      { id: 'sec-015', name: 'Emissions Overview', type: 'scope_breakdown', isIncluded: true, order: 2 },
      { id: 'sec-016', name: 'Key Insights', type: 'recommendations', isIncluded: true, order: 3 },
    ],
  },
]

export const defaultReportSections: ReportSection[] = [
  { id: 'def-001', name: 'Executive Summary', type: 'executive_summary', isIncluded: true, order: 1 },
  { id: 'def-002', name: 'Organisational Boundary', type: 'methodology', isIncluded: true, order: 2 },
  { id: 'def-003', name: 'Scope 1 Emissions', type: 'scope_breakdown', isIncluded: true, order: 3 },
  { id: 'def-004', name: 'Scope 2 Emissions', type: 'scope_breakdown', isIncluded: true, order: 4 },
  { id: 'def-005', name: 'Scope 3 Emissions', type: 'scope_breakdown', isIncluded: true, order: 5 },
  { id: 'def-006', name: 'Intensity Metrics', type: 'scope_breakdown', isIncluded: true, order: 6 },
  { id: 'def-007', name: 'Year-over-Year Comparison', type: 'scope_breakdown', isIncluded: true, order: 7 },
  { id: 'def-008', name: 'Calculation Methodology', type: 'methodology', isIncluded: true, order: 8 },
  { id: 'def-009', name: 'Data Quality Assessment', type: 'methodology', isIncluded: true, order: 9 },
  { id: 'def-010', name: 'Reduction Recommendations', type: 'recommendations', isIncluded: true, order: 10 },
  { id: 'def-011', name: 'Emission Factor Sources', type: 'appendix', isIncluded: false, order: 11 },
  { id: 'def-012', name: 'Raw Activity Data', type: 'appendix', isIncluded: false, order: 12 },
]

export const mockUploadedDocuments: UploadedDocument[] = [
  {
    id: 'doc-001',
    name: 'LESCO_Bill_Jan2025.pdf',
    type: 'pdf',
    size: 245000,
    uploadedAt: '2025-02-05T09:30:00Z',
    status: 'verified',
    extractedData: [
      { id: 'ext-001', field: 'Billing Period', value: 'January 2025', confidence: 0.98, isVerified: true },
      { id: 'ext-002', field: 'Consumption (kWh)', value: '485,200', confidence: 0.95, suggestedCategory: 'Purchased Electricity', isVerified: true },
      { id: 'ext-003', field: 'Amount (PKR)', value: '12,856,300', confidence: 0.97, isVerified: true },
      { id: 'ext-004', field: 'Meter Number', value: 'LHR-2024-8892', confidence: 0.99, isVerified: true },
    ],
  },
  {
    id: 'doc-002',
    name: 'Fleet_Fuel_Log_Q3.xlsx',
    type: 'excel',
    size: 128000,
    uploadedAt: '2025-01-15T14:20:00Z',
    status: 'verified',
    extractedData: [
      { id: 'ext-005', field: 'Total Diesel (L)', value: '8,450', confidence: 0.92, suggestedCategory: 'Mobile Combustion', isVerified: true },
      { id: 'ext-006', field: 'Total Petrol (L)', value: '3,200', confidence: 0.91, suggestedCategory: 'Mobile Combustion', isVerified: true },
      { id: 'ext-007', field: 'Vehicles Count', value: '24', confidence: 0.88, isVerified: true },
    ],
  },
  {
    id: 'doc-003',
    name: 'Generator_Maintenance_Log.pdf',
    type: 'pdf',
    size: 890000,
    uploadedAt: '2025-03-01T11:45:00Z',
    status: 'extracted',
    extractedData: [
      { id: 'ext-008', field: 'Diesel Consumed (L)', value: '12,800', confidence: 0.85, suggestedCategory: 'Stationary Combustion', isVerified: false },
      { id: 'ext-009', field: 'Operating Hours', value: '1,240', confidence: 0.82, isVerified: false },
      { id: 'ext-010', field: 'Generator Units', value: '6', confidence: 0.90, isVerified: false },
    ],
  },
  {
    id: 'doc-004',
    name: 'Waste_Collection_Contract.pdf',
    type: 'pdf',
    size: 1250000,
    uploadedAt: '2025-03-10T16:00:00Z',
    status: 'processing',
  },
  {
    id: 'doc-005',
    name: 'Air_Travel_Reimbursements_Feb.csv',
    type: 'csv',
    size: 45000,
    uploadedAt: '2025-03-08T10:15:00Z',
    status: 'error',
    errorMessage: 'Unable to parse CSV: inconsistent column headers detected. Please use the standard template.',
  },
]

export const sampleExtractedData: ExtractedDataItem[] = [
  { id: 'sample-001', field: 'Document Type', value: 'Utility Bill', confidence: 0.96, isVerified: false },
  { id: 'sample-002', field: 'Provider', value: 'LESCO', confidence: 0.94, isVerified: false },
  { id: 'sample-003', field: 'Billing Period', value: 'March 2025', confidence: 0.97, isVerified: false },
  { id: 'sample-004', field: 'Consumption', value: '512,400 kWh', confidence: 0.89, suggestedCategory: 'Purchased Electricity', isVerified: false },
  { id: 'sample-005', field: 'Peak Demand', value: '1,850 kVA', confidence: 0.85, isVerified: false },
  { id: 'sample-006', field: 'Bill Amount', value: 'PKR 13,245,600', confidence: 0.93, isVerified: false },
]
