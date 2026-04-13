import { Header } from '@/components/layout/header'
import { MetricCard } from '@/components/shared/metric-card'
import { ScopeBreakdownChart } from '@/components/dashboard/scope-breakdown-chart'
import { TrendChart } from '@/components/dashboard/trend-chart'
import { IntensityMetrics } from '@/components/dashboard/intensity-metrics'
import { FacilityChart } from '@/components/dashboard/facility-chart'
import { QuickActions } from '@/components/dashboard/quick-actions'
import { InsightSummary } from '@/components/dashboard/insight-summary'
import { NarrativeSummary } from '@/components/dashboard/narrative-summary'
import { PeriodComparison } from '@/components/dashboard/period-comparison'
import { CompletenessPanel } from '@/components/dashboard/completeness-panel'
import { UncertaintyPanel } from '@/components/dashboard/uncertainty-panel'
import { dashboardStats } from '@/lib/data/mock-emissions'
import { mockOrganisation } from '@/lib/data/mock-organisation'
import { formatEmission } from '@/lib/utils/formatters'
import {
  Leaf,
  Lightning,
  Factory,
  Truck,
  Users,
  Buildings,
} from '@phosphor-icons/react/dist/ssr'

export default function DashboardPage() {
  return (
    <div className="min-h-screen">
      <Header
        title={`Welcome back, Dr. Khan`}
        description={`${mockOrganisation.name} - ${mockOrganisation.reportingPeriod.fiscalYear}`}
      />

      <div className="p-6">
        {/* Top Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <MetricCard
            title="Total Emissions"
            value={formatEmission(dashboardStats.totalEmissions)}
            trend={dashboardStats.yearOverYearChange}
            trendLabel="vs. last year"
            icon={<Leaf className="w-5 h-5 text-primary" weight="fill" />}
            variant="primary"
          />
          <MetricCard
            title="Scope 1"
            value={formatEmission(dashboardStats.scope1Total)}
            subtitle="Direct emissions"
            icon={<Factory className="w-5 h-5 text-chart-1" />}
            variant="scope1"
          />
          <MetricCard
            title="Scope 2"
            value={formatEmission(dashboardStats.scope2Total)}
            subtitle="Purchased energy"
            icon={<Lightning className="w-5 h-5 text-chart-2" />}
            variant="scope2"
          />
          <MetricCard
            title="Scope 3"
            value={formatEmission(dashboardStats.scope3Total)}
            subtitle="Value chain"
            icon={<Truck className="w-5 h-5 text-chart-3" />}
            variant="scope3"
          />
        </div>

        {/* Secondary Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <MetricCard
            title="Per Student"
            value={`${dashboardStats.intensityPerStudent.toFixed(2)}`}
            subtitle="tCO2e/student"
            icon={<Users className="w-5 h-5 text-muted-foreground" />}
          />
          <MetricCard
            title="Per Floor Area"
            value={`${dashboardStats.intensityPerSqm.toFixed(3)}`}
            subtitle="tCO2e/sqm"
            icon={<Buildings className="w-5 h-5 text-muted-foreground" />}
          />
          <MetricCard
            title="Data Completeness"
            value={`${dashboardStats.dataCompleteness}%`}
            subtitle="Activity data coverage"
          />
          <MetricCard
            title="Verified Data"
            value={`${dashboardStats.verifiedPercentage}%`}
            subtitle="Source-verified entries"
          />
        </div>

        {/* AI Narrative Summary */}
        <NarrativeSummary />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <TrendChart />
          </div>
          <div>
            <ScopeBreakdownChart />
          </div>
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <FacilityChart />
          </div>
          <div>
            <IntensityMetrics />
          </div>
        </div>

        {/* Period Comparison + Data Quality Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <PeriodComparison />
          </div>
          <div>
            <UncertaintyPanel />
          </div>
        </div>

        {/* Data Completeness Row */}
        <div className="mb-6">
          <CompletenessPanel />
        </div>

        {/* Actions and Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <QuickActions />
          <InsightSummary />
        </div>
      </div>
    </div>
  )
}
