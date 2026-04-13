'use client'

import dynamic from 'next/dynamic'
import { IntensityMetrics } from './intensity-metrics'

const ScopeBreakdownChart = dynamic(
  () => import('./scope-breakdown-chart').then(m => ({ default: m.ScopeBreakdownChart })),
  { ssr: false }
)
const TrendChart = dynamic(
  () => import('./trend-chart').then(m => ({ default: m.TrendChart })),
  { ssr: false }
)
const FacilityChart = dynamic(
  () => import('./facility-chart').then(m => ({ default: m.FacilityChart })),
  { ssr: false }
)

export function ChartsSection() {
  return (
    <>
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
    </>
  )
}
