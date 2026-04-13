import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { emissionSummaries, dashboardStats } from '@/lib/data/mock-emissions'
import { formatNumber, formatEmission, getScopeName, getScopeDescription } from '@/lib/utils/formatters'
import {
  Factory,
  Lightning,
  Truck,
  ArrowRight,
  TrendUp,
  TrendDown,
} from '@phosphor-icons/react/dist/ssr'
import { cn } from '@/lib/utils'

const scopeConfig = {
  scope1: {
    icon: Factory,
    color: 'text-chart-1',
    bg: 'bg-chart-1/10',
    border: 'border-chart-1',
    href: '/emissions/scope-1',
  },
  scope2: {
    icon: Lightning,
    color: 'text-chart-2',
    bg: 'bg-chart-2/10',
    border: 'border-chart-2',
    href: '/emissions/scope-2',
  },
  scope3: {
    icon: Truck,
    color: 'text-chart-3',
    bg: 'bg-chart-3/10',
    border: 'border-chart-3',
    href: '/emissions/scope-3',
  },
}

export default function EmissionsOverviewPage() {
  return (
    <div className="min-h-screen">
      <Header
        title="Emissions Overview"
        description="GHG Protocol-compliant inventory breakdown by scope"
      />

      <div className="p-6">
        {/* Total Emissions Banner */}
        <Card className="mb-6 bg-primary text-primary-foreground border-0">
          <CardContent className="py-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <p className="text-sm text-primary-foreground/70 uppercase tracking-wide">
                  Total GHG Emissions
                </p>
                <p className="text-4xl font-serif font-medium mt-1">
                  {formatNumber(dashboardStats.totalEmissions)} tCO2e
                </p>
                <p className="text-sm text-primary-foreground/70 mt-1">
                  Reporting Period: FY2024-25 (Jul 2024 - Jun 2025)
                </p>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <p className="text-2xl font-semibold">{dashboardStats.dataCompleteness}%</p>
                  <p className="text-xs text-primary-foreground/70">Data Completeness</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-semibold">{dashboardStats.verifiedPercentage}%</p>
                  <p className="text-xs text-primary-foreground/70">Verified</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    {dashboardStats.yearOverYearChange > 0 ? (
                      <TrendUp className="w-5 h-5" />
                    ) : (
                      <TrendDown className="w-5 h-5" />
                    )}
                    <span className="text-2xl font-semibold">
                      {Math.abs(dashboardStats.yearOverYearChange).toFixed(1)}%
                    </span>
                  </div>
                  <p className="text-xs text-primary-foreground/70">vs. Last Year</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Scope Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {emissionSummaries.map((summary) => {
            const config = scopeConfig[summary.scope]
            const Icon = config.icon

            return (
              <Link key={summary.scope} href={config.href}>
                <Card className={cn('border-l-4 hover:shadow-md transition-shadow cursor-pointer', config.border)}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={cn('p-2 rounded', config.bg)}>
                          <Icon className={cn('w-5 h-5', config.color)} weight="fill" />
                        </div>
                        <div>
                          <CardTitle className="text-lg font-medium">
                            {getScopeName(summary.scope)}
                          </CardTitle>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {getScopeDescription(summary.scope)}
                          </p>
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-muted-foreground" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-end justify-between mb-4">
                      <div>
                        <p className="text-3xl font-semibold text-foreground">
                          {formatNumber(summary.totalCO2e)}
                        </p>
                        <p className="text-sm text-muted-foreground">tCO2e</p>
                      </div>
                      <Badge variant="secondary" className="text-sm">
                        {summary.percentage.toFixed(1)}% of total
                      </Badge>
                    </div>

                    {/* Progress Bar */}
                    <div className="h-2 bg-muted rounded-full overflow-hidden mb-4">
                      <div
                        className={cn('h-full rounded-full', config.bg.replace('/10', ''))}
                        style={{ width: `${summary.percentage}%` }}
                      />
                    </div>

                    {/* Categories Preview */}
                    <div className="space-y-2">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                        Top Categories
                      </p>
                      {summary.categories.slice(0, 3).map((category) => (
                        <div key={category.categoryId} className="flex items-center justify-between text-sm">
                          <span className="text-foreground truncate">{category.name}</span>
                          <span className="text-muted-foreground ml-2">
                            {formatNumber(category.totalCO2e)} tCO2e
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>

        {/* Methodology Note */}
        <Card className="bg-muted/50 border-border">
          <CardContent className="py-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded bg-primary/10">
                <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">GHG Protocol Compliance</p>
                <p className="text-xs text-muted-foreground mt-1">
                  This inventory follows the GHG Protocol Corporate Standard using the operational control 
                  consolidation approach. Scope 2 emissions are reported using the location-based method. 
                  All emission factors are from IPCC AR6, IEA 2024, and regional sources.{' '}
                  <Link href="/dashboard/methodology" className="text-primary hover:underline">
                    View full methodology
                  </Link>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
