'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrendUp, TrendDown, Minus, Info, LightbulbFilament } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'
import { formatNumber } from '@/lib/utils/formatters'
import type { CategorySummary, Scope, UncertaintyTier } from '@/lib/types'
import {
  Tooltip as TooltipUI,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

const tierConfig: Record<UncertaintyTier, { label: string; badgeClass: string; desc: string }> = {
  measured: {
    label: 'Measured',
    badgeClass: 'bg-green-100 text-green-700 border-green-200',
    desc: 'Activity data from direct measurement, metered readings, or official bills. Lowest uncertainty (±5–10%).',
  },
  estimated: {
    label: 'Estimated',
    badgeClass: 'bg-amber-100 text-amber-700 border-amber-200',
    desc: 'Calculated from records or invoices using standard emission factors. Medium uncertainty (±10–25%).',
  },
  proxy: {
    label: 'Proxy',
    badgeClass: 'bg-orange-100 text-orange-700 border-orange-200',
    desc: 'Derived from benchmarks, surveys, or spend-based factors. Highest uncertainty (±25–50%). Replace with direct data to improve accuracy.',
  },
}

function UncertaintyBadge({ tier, pct }: { tier: UncertaintyTier; pct: number }) {
  const cfg = tierConfig[tier]
  return (
    <TooltipProvider>
      <TooltipUI>
        <TooltipTrigger asChild>
          <span className={cn('inline-flex items-center gap-1 px-2 py-0.5 rounded border text-[11px] font-medium cursor-help', cfg.badgeClass)}>
            {cfg.label}
            <span className="opacity-70">±{pct}%</span>
          </span>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs">
          <p className="text-xs">{cfg.desc}</p>
        </TooltipContent>
      </TooltipUI>
    </TooltipProvider>
  )
}

interface ScopeDetailProps {
  scope: Scope
  scopeName: string
  scopeDescription: string
  totalEmissions: number
  percentage: number
  categories: CategorySummary[]
  color: string
}

const COLORS = ['#06402B', '#0A5C3E', '#0E7A52', '#12996A', '#16b87e', '#1dd694']

function ScopeCategoryBar({ categories, color }: { categories: CategorySummary[]; color: string }) {
  const W = 480, H = 260
  const PAD = { top: 8, right: 60, bottom: 8, left: 130 }
  const CW = W - PAD.left - PAD.right
  const rowH = (H - PAD.top - PAD.bottom) / categories.length
  const barH = rowH * 0.55
  const maxVal = Math.max(...categories.map(c => c.totalCO2e))
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={H} style={{ display: 'block' }}>
      {categories.map((cat, i) => {
        const y = PAD.top + i * rowH + (rowH - barH) / 2
        const bw = (cat.totalCO2e / maxVal) * CW
        return (
          <g key={cat.id}>
            <text x={PAD.left - 8} y={y + barH / 2 + 4} textAnchor="end" fontSize={11} fill="#374151">
              {cat.name.length > 18 ? cat.name.slice(0, 16) + '…' : cat.name}
            </text>
            <rect x={PAD.left} y={y} width={bw} height={barH} fill={color} rx={2} />
            <text x={PAD.left + bw + 5} y={y + barH / 2 + 4} fontSize={10} fill="#6B7280">
              {formatNumber(cat.totalCO2e)}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

function polarXY(cx: number, cy: number, r: number, deg: number) {
  const rad = (deg - 90) * Math.PI / 180
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

function ScopeCategoryPie({ categories }: { categories: CategorySummary[] }) {
  const cx = 130, cy = 120, r = 100
  const total = categories.reduce((s, c) => s + c.totalCO2e, 0)
  let angle = 0
  const slices = categories.map((cat, i) => {
    const sweep = (cat.totalCO2e / total) * 356
    const start = angle + 2
    const end = angle + sweep
    angle = end + 2
    const s = polarXY(cx, cy, r, start)
    const e = polarXY(cx, cy, r, end)
    const large = sweep > 180 ? 1 : 0
    const path = `M ${cx} ${cy} L ${s.x.toFixed(1)} ${s.y.toFixed(1)} A ${r} ${r} 0 ${large} 1 ${e.x.toFixed(1)} ${e.y.toFixed(1)} Z`
    const midAngle = start + sweep / 2
    const lx = polarXY(cx, cy, r * 0.65, midAngle)
    return { ...cat, path, color: COLORS[i % COLORS.length], pct: (cat.totalCO2e / total * 100), lx }
  })
  return (
    <svg viewBox="0 0 340 260" width="100%" height={260} style={{ display: 'block' }}>
      {slices.map(s => <path key={s.id} d={s.path} fill={s.color} />)}
      {slices.filter(s => s.pct > 8).map(s => (
        <text key={s.id + 'l'} x={s.lx.x} y={s.lx.y + 4} textAnchor="middle" fontSize={10} fill="white" fontWeight="600">
          {s.pct.toFixed(0)}%
        </text>
      ))}
      {slices.map((s, i) => (
        <g key={s.id + 'leg'} transform={`translate(270, ${20 + i * 22})`}>
          <rect width={11} height={11} rx={2} fill={s.color} />
          <text x={16} y={10} fontSize={10} fill="#374151">{s.name.length > 14 ? s.name.slice(0, 13) + '…' : s.name}</text>
        </g>
      ))}
    </svg>
  )
}

export function ScopeDetail({
  scope,
  scopeName,
  scopeDescription,
  totalEmissions,
  percentage,
  categories,
  color,
}: ScopeDetailProps) {
  return (
    <div className="space-y-6">
      {/* Summary Banner */}
      <Card className="border-l-4" style={{ borderLeftColor: color }}>
        <CardContent className="py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <p className="text-sm text-muted-foreground uppercase tracking-wide">
                {scopeName} Total
              </p>
              <p className="text-4xl font-serif font-medium text-foreground mt-1">
                {formatNumber(totalEmissions)} tCO2e
              </p>
              <p className="text-sm text-muted-foreground mt-1">{scopeDescription}</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <p className="text-2xl font-semibold text-foreground">{percentage.toFixed(1)}%</p>
                <p className="text-xs text-muted-foreground">of Total Footprint</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-semibold text-foreground">{categories.length}</p>
                <p className="text-xs text-muted-foreground">Categories</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart — pure SVG */}
        <Card className="border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Emissions by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ScopeCategoryBar categories={categories} color={color} />
          </CardContent>
        </Card>

        {/* Pie Chart — pure SVG */}
        <Card className="border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Category Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ScopeCategoryPie categories={categories} />
          </CardContent>
        </Card>
      </div>

      {/* Category Details Table */}
      <Card className="border-border">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-medium">Category Details</CardTitle>
            {/* Data quality summary line */}
            <p className="text-xs text-muted-foreground">
              {categories.filter(c => c.uncertaintyTier === 'measured').length} measured ·{' '}
              {categories.filter(c => c.uncertaintyTier === 'estimated').length} estimated ·{' '}
              {categories.filter(c => c.uncertaintyTier === 'proxy').length} proxy
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Category
                  </th>
                  <th className="text-right py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Emissions (tCO2e)
                  </th>
                  <th className="text-right py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    % of Scope
                  </th>
                  <th className="text-right py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    YoY Trend
                  </th>
                  <th className="text-right py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Data Quality
                  </th>
                  <th className="text-right py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Activities
                  </th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr key={category.categoryId} className="border-b border-border last:border-0 hover:bg-muted/50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: color }}
                        />
                        <span className="text-sm font-medium text-foreground">{category.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right text-sm text-foreground">
                      {formatNumber(category.totalCO2e)}
                    </td>
                    <td className="py-3 px-4 text-right text-sm text-muted-foreground">
                      {category.percentage.toFixed(1)}%
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span
                        className={cn(
                          'inline-flex items-center gap-1 text-sm',
                          category.trend > 0 ? 'text-destructive' : category.trend < 0 ? 'text-success' : 'text-muted-foreground'
                        )}
                      >
                        {category.trend > 0 ? (
                          <TrendUp className="w-3.5 h-3.5" />
                        ) : category.trend < 0 ? (
                          <TrendDown className="w-3.5 h-3.5" />
                        ) : (
                          <Minus className="w-3.5 h-3.5" />
                        )}
                        {category.trend > 0 ? '+' : ''}
                        {category.trend.toFixed(1)}%
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      {category.uncertaintyTier && (
                        <UncertaintyBadge tier={category.uncertaintyTier} pct={category.uncertaintyPct ?? 0} />
                      )}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Badge variant="outline" className="text-xs">
                        {category.activityCount}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-muted/50">
                  <td className="py-3 px-4 font-medium text-sm text-foreground">Total</td>
                  <td className="py-3 px-4 text-right font-medium text-sm text-foreground">
                    {formatNumber(totalEmissions)}
                  </td>
                  <td className="py-3 px-4 text-right text-sm text-muted-foreground">100%</td>
                  <td className="py-3 px-4"></td>
                  <td className="py-3 px-4"></td>
                  <td className="py-3 px-4 text-right">
                    <Badge variant="outline" className="text-xs">
                      {categories.reduce((sum, c) => sum + c.activityCount, 0)}
                    </Badge>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Data quality improvement callout */}
      {categories.some(c => c.improvementSuggestion) && (
        <div className="border border-border rounded bg-muted/30 p-4">
          <div className="flex items-start gap-3">
            <LightbulbFilament className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" weight="fill" />
            <div>
              <p className="text-sm font-semibold text-foreground mb-1">Data Quality Improvement Opportunities</p>
              <ul className="space-y-1.5">
                {categories.filter(c => c.improvementSuggestion).map(c => (
                  <li key={c.categoryId} className="text-sm text-muted-foreground leading-relaxed">
                    <span className="font-medium text-foreground">{c.name}:</span> {c.improvementSuggestion}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
