'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { intensityMetrics } from '@/lib/data/mock-emissions'
import { TrendDown, TrendUp, Info } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

export function IntensityMetrics() {
  return (
    <Card className="border-border">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">Intensity Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {intensityMetrics.map((metric) => {
            const isBelowBenchmark = metric.benchmark && metric.value < metric.benchmark
            const percentOfBenchmark = metric.benchmark
              ? ((metric.value / metric.benchmark) * 100).toFixed(0)
              : null

            return (
              <div key={metric.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div className="flex items-center gap-2">
                  <div>
                    <p className="text-sm font-medium text-foreground">{metric.name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span
                        className={cn(
                          'flex items-center gap-1 text-xs',
                          metric.trend < 0 ? 'text-success' : 'text-destructive'
                        )}
                      >
                        {metric.trend < 0 ? (
                          <TrendDown className="w-3 h-3" weight="bold" />
                        ) : (
                          <TrendUp className="w-3 h-3" weight="bold" />
                        )}
                        {Math.abs(metric.trend).toFixed(1)}%
                      </span>
                      <span className="text-xs text-muted-foreground">{metric.trendPeriod}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-foreground">
                    {metric.value.toFixed(2)}
                  </p>
                  <p className="text-xs text-muted-foreground">{metric.unit}</p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-4 pt-4 border-t border-border">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-2 text-xs text-muted-foreground cursor-help">
                  <Info className="w-3.5 h-3.5" />
                  <span>Benchmarks from AASHE STARS, GHG Protocol Higher Ed, and regional averages</span>
                </div>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p className="text-xs">
                  Intensity metrics help compare emissions across different-sized organisations. 
                  Being below benchmark indicates better-than-average performance.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardContent>
    </Card>
  )
}
