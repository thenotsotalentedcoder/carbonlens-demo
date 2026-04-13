'use client'

import { useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { monthlyEmissions } from '@/lib/data/mock-emissions'
import { formatNumber } from '@/lib/utils/formatters'

const COLORS = {
  scope1: '#06402B',
  scope2: '#0A5C3E',
  scope3: '#0E7A52',
}

const MONTHS = monthlyEmissions.map(d => d.month.split(' ')[0])
const MAX_VAL = Math.max(...monthlyEmissions.map(d => d.scope1 + d.scope2 + d.scope3))

const W = 620
const H = 280
const PAD = { top: 20, right: 16, bottom: 30, left: 44 }
const CW = W - PAD.left - PAD.right
const CH = H - PAD.top - PAD.bottom

function scaleX(i: number) { return PAD.left + (i / (monthlyEmissions.length - 1)) * CW }
function scaleY(v: number) { return PAD.top + CH - (v / MAX_VAL) * CH }

function stackedArea(key1: 'scope1', key2: 'scope2', key3?: 'scope3') {
  // returns bottom path and top path for a stacked area
  const data = monthlyEmissions
  const tops = data.map((d, i) => {
    const base = key3 ? d[key1] + d[key2] + d[key3] : (key2 ? d[key1] + d[key2] : d[key1])
    return { x: scaleX(i), y: scaleY(base) }
  })
  const bottoms = data.map((d, i) => {
    const base = key3 ? d[key1] + d[key2] : d[key1]
    return { x: scaleX(i), y: scaleY(base) }
  })
  const top = tops.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ')
  const bot = bottoms.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ')
  const botReverse = [...bottoms].reverse().map((p) => `L${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ')
  return `${top} ${botReverse} Z`
}

export function TrendChart() {
  const scope1Path = monthlyEmissions.map((d, i) =>
    `${i === 0 ? 'M' : 'L'}${scaleX(i).toFixed(1)},${scaleY(d.scope1).toFixed(1)}`
  ).join(' ') + ` L${scaleX(monthlyEmissions.length - 1).toFixed(1)},${scaleY(0).toFixed(1)} L${scaleX(0).toFixed(1)},${scaleY(0).toFixed(1)} Z`

  const scope2Path = stackedArea('scope1', 'scope2')
  const scope3Path = stackedArea('scope1', 'scope2', 'scope3')

  const yTicks = [0, MAX_VAL * 0.25, MAX_VAL * 0.5, MAX_VAL * 0.75, MAX_VAL]

  return (
    <Card className="border-border">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">Monthly Emissions Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 mb-3 text-xs">
          {[['Scope 1', COLORS.scope1], ['Scope 2', COLORS.scope2], ['Scope 3', COLORS.scope3]].map(([label, color]) => (
            <div key={label} className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: color }} />
              <span className="text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>
        <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={H} style={{ display: 'block' }}>
          {/* Grid lines */}
          {yTicks.map((v) => (
            <line key={v} x1={PAD.left} x2={W - PAD.right} y1={scaleY(v)} y2={scaleY(v)} stroke="#E2E8E4" strokeDasharray="3 3" />
          ))}
          {/* Areas */}
          <path d={scope3Path} fill={COLORS.scope3} fillOpacity={0.85} />
          <path d={scope2Path} fill={COLORS.scope2} fillOpacity={0.85} />
          <path d={scope1Path} fill={COLORS.scope1} fillOpacity={0.85} />
          {/* X axis labels */}
          {monthlyEmissions.map((d, i) => (
            <text key={i} x={scaleX(i)} y={H - 6} textAnchor="middle" fontSize={10} fill="#6B7280">
              {d.month.split(' ')[0]}
            </text>
          ))}
          {/* Y axis labels */}
          {yTicks.filter(v => v > 0).map((v) => (
            <text key={v} x={PAD.left - 6} y={scaleY(v) + 4} textAnchor="end" fontSize={10} fill="#6B7280">
              {(v / 1000).toFixed(1)}k
            </text>
          ))}
        </svg>
      </CardContent>
    </Card>
  )
}
