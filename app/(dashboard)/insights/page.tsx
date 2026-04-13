'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Header } from '@/components/layout/header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { mockInsights, mockRecommendations } from '@/lib/data/mock-insights'
import { formatDate, formatNumber, formatCurrency } from '@/lib/utils/formatters'
import type { Recommendation } from '@/lib/types'
import {
  Warning,
  WarningCircle,
  Info,
  TrendUp,
  ChartBar,
  Lightbulb,
  ChatCircle,
  ArrowRight,
  Check,
  Clock,
  CaretDown,
  CaretUp,
  Leaf,
  Sparkle,
  ArrowUpRight,
  ArrowDownRight,
  SlidersHorizontal,
} from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

const severityConfig = {
  critical: {
    icon: WarningCircle,
    color: 'text-destructive',
    bg: 'bg-destructive/10',
    border: 'border-destructive/30',
  },
  warning: {
    icon: Warning,
    color: 'text-warning',
    bg: 'bg-warning/10',
    border: 'border-warning/30',
  },
  info: {
    icon: Info,
    color: 'text-info',
    bg: 'bg-info/10',
    border: 'border-info/30',
  },
}

const typeConfig = {
  anomaly: { label: 'Anomaly', color: 'bg-destructive/10 text-destructive' },
  recommendation: { label: 'Recommendation', color: 'bg-success/10 text-success' },
  trend: { label: 'Trend', color: 'bg-info/10 text-info' },
  benchmark: { label: 'Benchmark', color: 'bg-primary/10 text-primary' },
}

const difficultyConfig = {
  low: { label: 'Low', color: 'bg-success/10 text-success border-success/20' },
  medium: { label: 'Medium', color: 'bg-warning/10 text-warning border-warning/20' },
  high: { label: 'High', color: 'bg-destructive/10 text-destructive border-destructive/20' },
}

type RecStatus = Recommendation['status']

const statusOptions: { value: RecStatus; label: string }[] = [
  { value: 'pending', label: 'Pending' },
  { value: 'under_consideration', label: 'Under Consideration' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'completed', label: 'Implemented' },
]

const statusStyle: Record<RecStatus, string> = {
  pending: 'bg-muted text-muted-foreground border-border',
  under_consideration: 'bg-blue-100 text-blue-700 border-blue-200',
  in_progress: 'bg-amber-100 text-amber-700 border-amber-200',
  completed: 'bg-green-100 text-green-700 border-green-200',
}

// Hotspot context paragraphs per insight
const insightContext: Record<string, string> = {
  'ins-001': 'January 2025 saw an unusually long grid outage period in Lahore — campus backup generators ran continuously for 3 days, 14–17 January. This accounts for the bulk of the 45% spike. While the immediate cause is external, it highlights dependence on ageing diesel generators. Consider evaluating battery storage alternatives to reduce both emissions and fuel costs during future outages.',
  'ins-002': 'Refrigerant top-up records from the Engineering Block HVAC service logs confirm multiple refills of R-410A between October 2024 and February 2025. R-410A has a GWP of 2,088 — even small leaks contribute disproportionately to the total footprint. The HVAC retrofit recommendation (rec-002) directly addresses this. A leak detection sensor installation is the fastest near-term mitigation.',
  'ins-003': 'Air travel reimbursement records show 47 international conference trips in FY2024-25, up from 40 in FY2023-24. The jump is concentrated in the Computer Science and Engineering departments following two large international grants. The Virtual Conference Policy (rec-006) has been marked as implemented — its impact will be visible in next year\'s data.',
  'ins-004': 'This benchmark position is calculated from NEPRA\'s 2024 annual sustainability report covering 45 Pakistani universities. The comparison is emissions per enrolled student — the most widely used normalisation metric for higher education. NovaTech\'s performance is driven primarily by higher building occupancy rates compared to peer institutions.',
  'ins-005': 'Building management system logs from the Main Campus energy monitoring dashboard show weekend electricity consumption averaging 42 kWh/hr in Sep–Dec 2024, up from 33 kWh/hr in the prior year. The most likely causes are AHU (air handling unit) scheduling not adapting to changed weekend occupancy, and unauthorized 24/7 computing cluster use in two labs.',
}

export default function InsightsPage() {
  const criticalInsights = mockInsights.filter((i) => i.severity === 'critical')
  const unreadCount = mockInsights.filter((i) => !i.isRead).length
  const totalReductionPotential = mockRecommendations.reduce((sum, r) => sum + r.estimatedReduction, 0)

  const [expandedInsights, setExpandedInsights] = useState<Set<string>>(new Set())
  const [recStatuses, setRecStatuses] = useState<Record<string, RecStatus>>(
    () => Object.fromEntries(mockRecommendations.map(r => [r.id, r.status]))
  )
  const [openStatusMenu, setOpenStatusMenu] = useState<string | null>(null)

  function toggleInsight(id: string) {
    setExpandedInsights(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function setStatus(recId: string, status: RecStatus) {
    setRecStatuses(prev => ({ ...prev, [recId]: status }))
    setOpenStatusMenu(null)
  }

  return (
    <div className="min-h-screen">
      <Header
        title="AI Insights"
        description="AI-powered analysis, anomaly detection, and reduction recommendations"
      />

      <div className="p-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="border-border">
            <CardContent className="py-4">
              <div className="flex items-center gap-2">
                <Warning className="w-5 h-5 text-warning" />
                <p className="text-sm text-muted-foreground">Active Alerts</p>
              </div>
              <p className="text-2xl font-semibold text-foreground mt-1">{unreadCount}</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="py-4">
              <div className="flex items-center gap-2">
                <WarningCircle className="w-5 h-5 text-destructive" />
                <p className="text-sm text-muted-foreground">Critical Issues</p>
              </div>
              <p className="text-2xl font-semibold text-destructive mt-1">{criticalInsights.length}</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="py-4">
              <div className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-success" />
                <p className="text-sm text-muted-foreground">Recommendations</p>
              </div>
              <p className="text-2xl font-semibold text-foreground mt-1">{mockRecommendations.length}</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="py-4">
              <div className="flex items-center gap-2">
                <Leaf className="w-5 h-5 text-primary" />
                <p className="text-sm text-muted-foreground">Reduction Potential</p>
              </div>
              <p className="text-2xl font-semibold text-primary mt-1">
                {formatNumber(totalReductionPotential)} tCO2e
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Period Comparison Narrative */}
        <div className="border border-border rounded bg-card p-5 mb-6">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded bg-primary/10 flex items-center justify-center mt-0.5">
              <Sparkle className="w-4 h-4 text-primary" weight="fill" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-sm font-semibold text-foreground">Period Comparison — FY2024-25 vs FY2023-24</h3>
                <span className="text-[10px] px-1.5 py-0.5 bg-primary/10 text-primary rounded font-medium uppercase tracking-wide">AI Narrative</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Total emissions increased by <span className="font-semibold text-red-600 inline-flex items-center gap-0.5"><ArrowUpRight className="w-3.5 h-3.5" />892 tCO2e (4.0%)</span> year-over-year, from 22,208 tCO2e in FY2023-24 to 23,100 tCO2e in FY2024-25. The increase is primarily driven by <span className="font-semibold text-foreground">Scope 2</span> (+312 tCO2e, +3.9%), attributable to expanded laboratory operations in H1 2025, and a <span className="font-semibold text-foreground">Scope 1</span> spike (+100 tCO2e, +4.3%) from the January generator event and confirmed refrigerant leakage at the Engineering Block.{' '}
                Scope 3 grew modestly (+480 tCO2e, +4.0%), consistent with increased student enrollment and higher business travel. One positive development: <span className="font-semibold text-green-700 inline-flex items-center gap-0.5"><ArrowDownRight className="w-3.5 h-3.5" />Mobile Combustion fell 3.1%</span> following the partial fleet electrification in Q2. The Virtual Conference Policy implemented in Q4 FY2023-24 appears to have moderated what would otherwise have been a sharper business travel increase.
              </p>
            </div>
          </div>
        </div>

        {/* Ask AI Banner */}
        <Card className="mb-6 bg-primary text-primary-foreground border-0">
          <CardContent className="py-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-primary-foreground/10">
                  <ChatCircle className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-lg font-medium">Ask AI About Your Emissions</p>
                  <p className="text-sm text-primary-foreground/70">
                    Query your data in natural language. Supports English and Urdu.
                  </p>
                </div>
              </div>
              <Link href="/insights/chat">
                <Button variant="secondary" className="flex items-center gap-2">
                  Start Conversation
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Insights List with expandable detail */}
          <Card className="border-border">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-medium">Recent Insights</CardTitle>
                {unreadCount > 0 && (
                  <Badge variant="secondary">{unreadCount} new</Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {mockInsights.map((insight) => {
                  const severity = severityConfig[insight.severity]
                  const type = typeConfig[insight.type]
                  const Icon = severity.icon
                  const isExpanded = expandedInsights.has(insight.id)

                  return (
                    <div
                      key={insight.id}
                      className={cn(
                        'rounded border transition-colors',
                        !insight.isRead ? severity.border : 'border-border'
                      )}
                    >
                      <button
                        className="w-full p-4 text-left hover:bg-muted/40 transition-colors rounded"
                        onClick={() => toggleInsight(insight.id)}
                      >
                        <div className="flex items-start gap-3">
                          <div className={cn('p-2 rounded flex-shrink-0', severity.bg)}>
                            <Icon className={cn('w-4 h-4', severity.color)} weight="fill" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="text-sm font-medium text-foreground">{insight.title}</p>
                              {!insight.isRead && (
                                <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground line-clamp-2">
                              {insight.description}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge variant="outline" className={cn('text-[10px]', type.color)}>
                                {type.label}
                              </Badge>
                              {insight.affectedScope && (
                                <Badge variant="outline" className="text-[10px]">
                                  {insight.affectedScope.replace('scope', 'Scope ')}
                                </Badge>
                              )}
                              <span className="text-[10px] text-muted-foreground">
                                {formatDate(insight.createdAt, 'relative')}
                              </span>
                            </div>
                          </div>
                          <div className="flex-shrink-0 text-muted-foreground mt-0.5">
                            {isExpanded ? <CaretUp className="w-4 h-4" /> : <CaretDown className="w-4 h-4" />}
                          </div>
                        </div>
                      </button>

                      {isExpanded && insightContext[insight.id] && (
                        <div className="px-4 pb-4 pt-0">
                          <div className="border-t border-border pt-3 mt-0">
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">Context & Analysis</p>
                            <p className="text-sm text-muted-foreground leading-relaxed">{insightContext[insight.id]}</p>
                            {insight.potentialImpact && (
                              <p className="text-xs text-muted-foreground mt-2 font-medium">
                                Estimated impact: <span className="text-foreground">{insight.potentialImpact} tCO2e</span> · Confidence: <span className="text-foreground">{Math.round((insight.confidence ?? 0) * 100)}%</span>
                              </p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Recommendations with status controls */}
          <Card className="border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">Reduction Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockRecommendations.map((rec) => {
                  const difficulty = difficultyConfig[rec.implementationDifficulty]
                  const currentStatus = recStatuses[rec.id] ?? rec.status
                  const isMenuOpen = openStatusMenu === rec.id

                  return (
                    <div
                      key={rec.id}
                      className="p-4 rounded border border-border hover:bg-muted/30 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground mb-1">{rec.title}</p>
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {rec.description}
                          </p>
                          <div className="flex items-center gap-2 mt-2 flex-wrap">
                            <Badge variant="outline" className="text-[10px]">
                              {rec.category}
                            </Badge>
                            <Badge variant="outline" className={cn('text-[10px]', difficulty.color)}>
                              {difficulty.label} effort
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-lg font-semibold text-success">
                            -{formatNumber(rec.estimatedReduction)}
                          </p>
                          <p className="text-xs text-muted-foreground">tCO2e/yr</p>
                        </div>
                      </div>

                      {/* Status control */}
                      <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-border">
                        <div className="relative">
                          <button
                            onClick={() => setOpenStatusMenu(isMenuOpen ? null : rec.id)}
                            className={cn(
                              'flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded border transition-colors',
                              statusStyle[currentStatus]
                            )}
                          >
                            <SlidersHorizontal className="w-3 h-3" />
                            {statusOptions.find(s => s.value === currentStatus)?.label ?? currentStatus}
                            <CaretDown className="w-3 h-3" />
                          </button>
                          {isMenuOpen && (
                            <div className="absolute left-0 top-full mt-1 z-10 bg-card border border-border rounded shadow-md min-w-[180px]">
                              {statusOptions.map(opt => (
                                <button
                                  key={opt.value}
                                  onClick={() => setStatus(rec.id, opt.value)}
                                  className={cn(
                                    'w-full text-left px-3 py-2 text-xs hover:bg-muted transition-colors',
                                    currentStatus === opt.value && 'font-semibold text-primary'
                                  )}
                                >
                                  {opt.label}
                                  {currentStatus === opt.value && <span className="ml-1">✓</span>}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>

                        {rec.estimatedCost && (
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <span>{formatCurrency(rec.estimatedCost)}</span>
                            {rec.paybackPeriod && <span>Payback: {rec.paybackPeriod}</span>}
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
