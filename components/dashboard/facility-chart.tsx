'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { facilityEmissions } from '@/lib/data/mock-emissions'
import { formatNumber } from '@/lib/utils/formatters'

const COLORS = { scope1: '#06402B', scope2: '#0A5C3E', scope3: '#0E7A52' }

const W = 620
const H = 320
const PAD = { top: 36, right: 16, bottom: 16, left: 120 }
const CW = W - PAD.left - PAD.right
const CH = H - PAD.top - PAD.bottom

const ROW_HEIGHT = CH / facilityEmissions.length
const BAR_HEIGHT = ROW_HEIGHT * 0.55
const MAX_VAL = Math.max(...facilityEmissions.map(d => d.scope1 + d.scope2 + d.scope3))

function scaleX(v: number) { return PAD.left + (v / MAX_VAL) * CW }

const xTicks = [0, 0.25, 0.5, 0.75, 1].map(f => ({ v: f * MAX_VAL, x: scaleX(f * MAX_VAL) }))

export function FacilityChart() {
  return (
    <Card className="border-border">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <span className="text-base font-medium">Emissions by Facility</span>
          <div className="flex gap-3 text-xs">
            {(['scope1', 'scope2', 'scope3'] as const).map((s, i) => (
              <div key={s} className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: COLORS[s] }} />
                <span className="text-muted-foreground">Scope {i + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={H} style={{ display: 'block' }}>
          {/* X axis grid + labels */}
          {xTicks.map(({ v, x }) => (
            <g key={v}>
              <line x1={x} x2={x} y1={PAD.top} y2={H - PAD.bottom} stroke="#E2E8E4" strokeDasharray="3 3" />
              <text x={x} y={PAD.top - 6} textAnchor="middle" fontSize={10} fill="#6B7280">
                {v === 0 ? '0' : `${(v / 1000).toFixed(0)}k`}
              </text>
            </g>
          ))}

          {/* Bars */}
          {facilityEmissions.map((d, i) => {
            const y = PAD.top + i * ROW_HEIGHT + (ROW_HEIGHT - BAR_HEIGHT) / 2
            const w1 = scaleX(d.scope1) - PAD.left
            const w2 = scaleX(d.scope2) - PAD.left
            const w3 = scaleX(d.scope3) - PAD.left
            const totalW = w1 + w2 + w3
            return (
              <g key={d.facilityId}>
                {/* Facility name */}
                <text x={PAD.left - 8} y={y + BAR_HEIGHT / 2 + 4} textAnchor="end" fontSize={11} fill="#374151">
                  {d.facilityName}
                </text>
                {/* Scope 1 */}
                <rect x={PAD.left} y={y} width={w1} height={BAR_HEIGHT} fill={COLORS.scope1} />
                {/* Scope 2 */}
                <rect x={PAD.left + w1} y={y} width={w2} height={BAR_HEIGHT} fill={COLORS.scope2} />
                {/* Scope 3 */}
                <rect x={PAD.left + w1 + w2} y={y} width={w3} height={BAR_HEIGHT} fill={COLORS.scope3} rx={2} />
                {/* Total label */}
                <text x={PAD.left + totalW + 6} y={y + BAR_HEIGHT / 2 + 4} fontSize={10} fill="#6B7280">
                  {formatNumber(d.total)}
                </text>
              </g>
            )
          })}
        </svg>
      </CardContent>
    </Card>
  )
}
