'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { emissionSummaries } from '@/lib/data/mock-emissions'
import { formatNumber, getScopeName } from '@/lib/utils/formatters'

const COLORS = ['#06402B', '#0A5C3E', '#0E7A52']

const data = emissionSummaries.map((summary, index) => ({
  name: getScopeName(summary.scope),
  value: summary.totalCO2e,
  percentage: summary.percentage,
  color: COLORS[index],
}))

const CX = 130
const CY = 120
const INNER = 55
const OUTER = 90

function polarToXY(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = (angleDeg - 90) * (Math.PI / 180)
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

function describeArc(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
  const start = polarToXY(cx, cy, r, startAngle)
  const end = polarToXY(cx, cy, r, endAngle)
  const largeArc = endAngle - startAngle > 180 ? 1 : 0
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 1 ${end.x} ${end.y}`
}

function donutSlice(cx: number, cy: number, inner: number, outer: number, startAngle: number, endAngle: number) {
  const s1 = polarToXY(cx, cy, outer, startAngle)
  const e1 = polarToXY(cx, cy, outer, endAngle)
  const s2 = polarToXY(cx, cy, inner, endAngle)
  const e2 = polarToXY(cx, cy, inner, startAngle)
  const largeArc = endAngle - startAngle > 180 ? 1 : 0
  return `M ${s1.x.toFixed(2)} ${s1.y.toFixed(2)} A ${outer} ${outer} 0 ${largeArc} 1 ${e1.x.toFixed(2)} ${e1.y.toFixed(2)} L ${s2.x.toFixed(2)} ${s2.y.toFixed(2)} A ${inner} ${inner} 0 ${largeArc} 0 ${e2.x.toFixed(2)} ${e2.y.toFixed(2)} Z`
}

const total = data.reduce((s, d) => s + d.value, 0)

export function ScopeBreakdownChart() {
  let currentAngle = 0
  const slices = data.map(d => {
    const sweep = (d.value / total) * 356
    const start = currentAngle + 2
    const end = currentAngle + sweep
    currentAngle = end + 2
    return { ...d, path: donutSlice(CX, CY, INNER, OUTER, start, end) }
  })

  return (
    <Card className="border-border">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">Emissions by Scope</CardTitle>
      </CardHeader>
      <CardContent>
        <svg viewBox="0 0 260 250" width="100%" height={250} style={{ display: 'block' }}>
          {slices.map(s => (
            <path key={s.name} d={s.path} fill={s.color} />
          ))}
          <text x={CX} y={CY - 6} textAnchor="middle" fontSize={18} fontWeight="600" fill="#1a1a1a">
            {formatNumber(total)}
          </text>
          <text x={CX} y={CY + 14} textAnchor="middle" fontSize={10} fill="#6B7280">tCO2e total</text>
          {/* Legend */}
          {data.map((d, i) => (
            <g key={d.name} transform={`translate(0, ${190 + i * 20})`}>
              <rect x={0} y={0} width={12} height={12} rx={2} fill={d.color} />
              <text x={18} y={10} fontSize={11} fill="#374151">{d.name}</text>
              <text x={258} y={10} fontSize={11} fill="#374151" textAnchor="end">{d.percentage.toFixed(1)}%</text>
            </g>
          ))}
        </svg>
        <div className="grid grid-cols-3 gap-2 mt-1">
          {data.map(item => (
            <div key={item.name} className="text-center">
              <div className="text-lg font-semibold text-foreground">{formatNumber(item.value)}</div>
              <div className="text-xs text-muted-foreground">tCO2e</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
