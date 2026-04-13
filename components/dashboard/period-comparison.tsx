'use client'

import { ArrowUpRight, ArrowDownRight, Minus } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

interface ComparisonRow {
  label: string
  current: number
  prior: number
}

function pctChange(current: number, prior: number) {
  return ((current - prior) / prior) * 100
}

function ChangeIndicator({ current, prior }: { current: number; prior: number }) {
  const pct = pctChange(current, prior)
  const abs = Math.abs(pct)
  const isUp = pct > 0
  const isFlat = abs < 0.1

  if (isFlat) {
    return (
      <span className="inline-flex items-center gap-0.5 text-xs font-medium text-muted-foreground">
        <Minus className="w-3 h-3" /> 0%
      </span>
    )
  }
  return (
    <span className={cn('inline-flex items-center gap-0.5 text-xs font-semibold', isUp ? 'text-red-600' : 'text-green-600')}>
      {isUp ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
      {abs.toFixed(1)}%
    </span>
  )
}

const rows: ComparisonRow[] = [
  { label: 'Total Emissions', current: 23100, prior: 22208 },
  { label: 'Scope 1 — Direct', current: 2400, prior: 2300 },
  { label: 'Scope 2 — Energy', current: 8200, prior: 7888 },
  { label: 'Scope 3 — Value Chain', current: 12500, prior: 12020 },
]

export function PeriodComparison() {
  return (
    <div className="border border-border rounded bg-card p-5 h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-foreground">Year-over-Year Comparison</h3>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-primary inline-block" />
            FY2024-25
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-border inline-block" />
            FY2023-24
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {rows.map((row, i) => {
          const maxVal = Math.max(row.current, row.prior)
          return (
            <div key={i} className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-foreground">{row.label}</span>
                <ChangeIndicator current={row.current} prior={row.prior} />
              </div>
              <div className="flex items-center gap-2">
                {/* Current year bar */}
                <div className="flex-1 space-y-1">
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${(row.current / maxVal) * 100}%` }}
                    />
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-border rounded-full transition-all"
                      style={{ width: `${(row.prior / maxVal) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1 min-w-[90px]">
                  <span className="text-xs font-semibold text-foreground leading-none">{row.current.toLocaleString()} t</span>
                  <span className="text-xs text-muted-foreground leading-none">{row.prior.toLocaleString()} t</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
        <span>All figures in tCO2e · GHG Protocol Corporate Standard</span>
        <span className="text-primary font-medium cursor-pointer hover:underline">Full comparison →</span>
      </div>
    </div>
  )
}
