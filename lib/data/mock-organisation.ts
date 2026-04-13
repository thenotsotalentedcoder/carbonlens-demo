import type { Organisation, Facility, ReportingPeriod, User } from '@/lib/types'

export const mockFacilities: Facility[] = [
  {
    id: 'fac-001',
    name: 'Main Campus',
    type: 'main_campus',
    areaSqm: 280000,
    occupancy: 12000,
    address: 'Canal Road, Lahore, Punjab 54000',
    isIncluded: true,
  },
  {
    id: 'fac-002',
    name: 'Engineering Block',
    type: 'satellite',
    areaSqm: 85000,
    occupancy: 4500,
    address: 'GT Road, Lahore, Punjab 54000',
    isIncluded: true,
  },
  {
    id: 'fac-003',
    name: 'Research & Innovation Center',
    type: 'research_center',
    areaSqm: 45000,
    occupancy: 800,
    address: 'DHA Phase 6, Lahore, Punjab 54792',
    isIncluded: true,
  },
  {
    id: 'fac-004',
    name: 'Student Hostels Complex',
    type: 'hostel',
    areaSqm: 32000,
    occupancy: 2200,
    address: 'Canal Road, Lahore, Punjab 54000',
    isIncluded: true,
  },
  {
    id: 'fac-005',
    name: 'Sports Complex',
    type: 'sports_complex',
    areaSqm: 8000,
    occupancy: 500,
    address: 'Canal Road, Lahore, Punjab 54000',
    isIncluded: true,
  },
]

export const mockReportingPeriod: ReportingPeriod = {
  id: 'rp-2024',
  name: 'Fiscal Year 2024-25',
  startDate: '2024-07-01',
  endDate: '2025-06-30',
  fiscalYear: 'FY2024-25',
  status: 'in_progress',
}

export const mockOrganisation: Organisation = {
  id: 'org-novatech',
  name: 'NovaTech University',
  type: 'university',
  country: 'Pakistan',
  city: 'Lahore',
  establishedYear: 1985,
  totalStudents: 15000,
  totalStaff: 2500,
  totalAreaSqm: 450000,
  annualBudgetPKR: 8500000000,
  facilities: mockFacilities,
  boundaryApproach: 'operational',
  reportingPeriod: mockReportingPeriod,
  createdAt: '2024-01-15T10:00:00Z',
  updatedAt: '2025-01-10T14:30:00Z',
}

export const mockUsers: User[] = [
  {
    id: 'user-001',
    email: 'admin@novatech.edu.pk',
    name: 'Dr. Ayesha Khan',
    role: 'admin',
    organisationId: 'org-novatech',
    lastLogin: '2025-04-10T09:15:00Z',
    createdAt: '2024-01-15T10:00:00Z',
  },
  {
    id: 'user-002',
    email: 'sustainability@novatech.edu.pk',
    name: 'Muhammad Farhan',
    role: 'data_manager',
    organisationId: 'org-novatech',
    lastLogin: '2025-04-09T16:45:00Z',
    createdAt: '2024-02-01T11:30:00Z',
  },
  {
    id: 'user-003',
    email: 'provost@novatech.edu.pk',
    name: 'Prof. Imran Malik',
    role: 'viewer',
    organisationId: 'org-novatech',
    lastLogin: '2025-04-05T10:00:00Z',
    createdAt: '2024-03-15T09:00:00Z',
  },
  {
    id: 'user-004',
    email: 'auditor@epapakistan.gov.pk',
    name: 'Sana Rashid',
    role: 'auditor',
    organisationId: 'org-novatech',
    lastLogin: '2025-03-20T11:30:00Z',
    createdAt: '2024-06-01T14:00:00Z',
  },
]

export const currentUser: User = mockUsers[0]
