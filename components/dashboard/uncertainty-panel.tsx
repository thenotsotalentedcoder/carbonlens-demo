'use client'

import { Info } from '@phosphor-icons/react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

const tiers = [
  {
    label: 'Measured',
    pct: 48,
    color: 'bg-primary',
    textColor: 'text-primary',
    description: 'Activity data from metered readings, utility bills, or direct measurement. Lowest uncertainty (±5–10%).',
  },
  {
    label: 'Estimated',
    pct: 17,
    color: 'bg-amber-400',
    textColor: 'text-amber-600',
    description: 'Calculated from records or invoices using standard emission factors. Medium uncertainty (±10–25%).',
  },
  {
    label: 'Proxy',
    pct: 35,
    color: 'bg-orange-400',
    textColor: 'text-orange-600',
    description: 'Derived from benchmarks, surveys, or spend-based factors. Highest uncertainty (±25–50%). Should be replaced with real data where possible.',
  },
]

export function UncertaintyPanel() {
  const total = 23100

  return (
    <div className="border border-border rounded bg-card p-5 h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-foreground">Data Quality Breakdown</h3>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="text-muted-foreground hover:text-foreground transition-colors">
                <Info className="w-4 h-4" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="left" className="max-w-xs">
              <p className="text-xs">Data quality tiers determine how confident we are in each emission figure. Higher proxy % means more opportunity to improve data quality.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Stacked bar */}
      <div className="h-4 rounded-full overflow-hidden flex mb-4 gap-0.5">
        {tiers.map(tier => (
          <div
            key={tier.label}
            className={`${tier.color} h-full transition-all`}
            style={{ width: `${tier.pct}%` }}
          />
        ))}
      </div>

      {/* Legend */}
      <div className="space-y-3">
        {tiers.map(tier => (
          <div key={tier.label} className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-sm flex-shrink-0 ${tier.color}`} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-0.5">
                <span className="text-xs font-semibold text-foreground">{tier.label}</span>
                <span className={`text-xs font-bold ${tier.textColor}`}>{tier.pct}%</span>
              </div>
              <div className="h-1 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${tier.color}`}
                  style={{ width: `${tier.pct}%` }}
                />
              </div>
              <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">{tier.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-3 border-t border-border">
        <p className="text-xs text-muted-foreground">
          <span className="font-semibold text-foreground">Target:</span> Reduce proxy % below 20% by end of FY2025-26 by collecting direct commute survey data and waste weight records.
        </p>
      </div>
    </div>
  )
}
