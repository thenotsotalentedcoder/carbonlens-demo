'use client'

import { CheckCircle, Warning, XCircle } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

interface CategoryStatus {
  name: string
  scope: 'scope1' | 'scope2' | 'scope3'
  status: 'complete' | 'partial' | 'missing'
  pct: number
}

const categories: CategoryStatus[] = [
  { name: 'Stationary Combustion', scope: 'scope1', status: 'complete', pct: 100 },
  { name: 'Mobile Combustion', scope: 'scope1', status: 'complete', pct: 100 },
  { name: 'Fugitive Emissions', scope: 'scope1', status: 'partial', pct: 75 },
  { name: 'Purchased Electricity', scope: 'scope2', status: 'complete', pct: 100 },
  { name: 'Purchased Cooling', scope: 'scope2', status: 'complete', pct: 100 },
  { name: 'Purchased Goods & Services', scope: 'scope3', status: 'complete', pct: 100 },
  { name: 'Business Travel', scope: 'scope3', status: 'complete', pct: 100 },
  { name: 'Employee Commuting', scope: 'scope3', status: 'complete', pct: 100 },
  { name: 'Student Commuting', scope: 'scope3', status: 'complete', pct: 100 },
  { name: 'Waste Generated', scope: 'scope3', status: 'missing', pct: 0 },
  { name: 'Fuel & Energy Activities', scope: 'scope3', status: 'partial', pct: 67 },
  { name: 'Capital Goods', scope: 'scope3', status: 'complete', pct: 100 },
]

const scopeLabels = {
  scope1: { label: 'S1', color: 'bg-chart-1' },
  scope2: { label: 'S2', color: 'bg-chart-2' },
  scope3: { label: 'S3', color: 'bg-chart-3' },
}

const overallPct = 87

export function CompletenessPanel() {
  const complete = categories.filter(c => c.status === 'complete').length
  const total = categories.length

  return (
    <div className="border border-border rounded bg-card p-5 h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-foreground">Data Completeness</h3>
        <div className="flex items-center gap-1.5">
          <span className="text-2xl font-bold text-foreground">{overallPct}%</span>
          <span className="text-xs text-muted-foreground">coverage</span>
        </div>
      </div>

      {/* Overall progress bar */}
      <div className="mb-4">
        <div className="h-2.5 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all"
            style={{ width: `${overallPct}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-1.5">{complete} of {total} categories have complete data for FY2024-25</p>
      </div>

      {/* Per-category list */}
      <div className="space-y-2">
        {categories.map((cat, i) => {
          const scope = scopeLabels[cat.scope]
          return (
            <div key={i} className="flex items-center gap-2">
              <span className={cn('text-[10px] font-bold text-white px-1 py-0.5 rounded', scope.color)}>{scope.label}</span>
              <span className="flex-1 text-xs text-foreground truncate">{cat.name}</span>
              <div className="w-20 h-1.5 bg-muted rounded-full overflow-hidden flex-shrink-0">
                <div
                  className={cn(
                    'h-full rounded-full',
                    cat.status === 'complete' ? 'bg-green-500' :
                    cat.status === 'partial' ? 'bg-amber-400' :
                    'bg-red-400'
                  )}
                  style={{ width: `${cat.pct}%` }}
                />
              </div>
              {cat.status === 'complete' && <CheckCircle className="w-3.5 h-3.5 text-green-500 flex-shrink-0" weight="fill" />}
              {cat.status === 'partial' && <Warning className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" weight="fill" />}
              {cat.status === 'missing' && <XCircle className="w-3.5 h-3.5 text-red-400 flex-shrink-0" weight="fill" />}
            </div>
          )
        })}
      </div>
    </div>
  )
}
