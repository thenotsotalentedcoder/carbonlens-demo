'use client'

import { Sparkle, ArrowUpRight, ArrowDownRight } from '@phosphor-icons/react'

export function NarrativeSummary() {
  return (
    <div className="border border-border rounded bg-card p-5 mb-6">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-8 h-8 rounded bg-primary/10 flex items-center justify-center mt-0.5">
          <Sparkle className="w-4 h-4 text-primary" weight="fill" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-sm font-semibold text-foreground">AI Footprint Summary</h3>
            <span className="text-[10px] px-1.5 py-0.5 bg-primary/10 text-primary rounded font-medium uppercase tracking-wide">FY2024-25</span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            NovaTech University's total GHG footprint for FY2024-25 stands at <span className="font-semibold text-foreground">23,100 tCO2e</span>, a <span className="inline-flex items-center gap-0.5 font-semibold text-red-600"><ArrowUpRight className="w-3.5 h-3.5" />4.0%</span> increase from last year's 22,208 tCO2e. Scope 3 value chain emissions continue to dominate at 54.1% of total footprint — primarily driven by student commuting (3,060 tCO2e) and purchased goods (3,200 tCO2e).{' '}
            The most significant change year-over-year is in <span className="font-semibold text-foreground">Scope 2</span>, where purchased electricity rose 3.9% to 7,650 tCO2e, linked to expanded laboratory facilities in H1. A refrigerant leakage event at the Engineering Block contributed 85 tCO2e in unplanned Scope 1 fugitive emissions — an anomaly flagged for immediate action. On a positive note, your emissions intensity of <span className="inline-flex items-center gap-0.5 font-semibold text-green-600"><ArrowDownRight className="w-3.5 h-3.5" />1.54 tCO2e/student</span> remains 14% below the regional university benchmark of 1.8 tCO2e.
          </p>
        </div>
      </div>
    </div>
  )
}
