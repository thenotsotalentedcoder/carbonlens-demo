'use client'

import { useState } from 'react'
import { Header } from '@/components/layout/header'
import { mockReportingPeriods, incompleteCategories } from '@/lib/data/mock-periods'
import type { ReportingPeriod } from '@/lib/types'
import {
  CalendarBlank,
  CheckCircle,
  Clock,
  PencilSimple,
  Plus,
  Warning,
  XCircle,
  LockKey,
  ArrowCounterClockwise,
} from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

function StatusBadge({ status }: { status: ReportingPeriod['status'] }) {
  const config = {
    in_progress: { label: 'Active', className: 'bg-green-100 text-green-700 border-green-200', icon: <Clock className="w-3 h-3" weight="fill" /> },
    completed: { label: 'Closed', className: 'bg-muted text-muted-foreground border-border', icon: <LockKey className="w-3 h-3" weight="fill" /> },
    verified: { label: 'Verified', className: 'bg-primary/10 text-primary border-primary/20', icon: <CheckCircle className="w-3 h-3" weight="fill" /> },
    draft: { label: 'Draft', className: 'bg-amber-100 text-amber-700 border-amber-200', icon: <PencilSimple className="w-3 h-3" weight="fill" /> },
  }
  const c = config[status]
  return (
    <span className={cn('inline-flex items-center gap-1 px-2 py-0.5 rounded border text-xs font-medium', c.className)}>
      {c.icon} {c.label}
    </span>
  )
}

function TypeBadge({ type }: { type: ReportingPeriod['type'] }) {
  const config: Record<string, string> = {
    annual: 'bg-blue-50 text-blue-700 border-blue-200',
    quarterly: 'bg-purple-50 text-purple-700 border-purple-200',
    semester: 'bg-teal-50 text-teal-700 border-teal-200',
  }
  return (
    <span className={cn('px-2 py-0.5 rounded border text-xs font-medium capitalize', config[type ?? 'annual'])}>
      {type ?? 'Annual'}
    </span>
  )
}

function formatDateRange(start: string, end: string) {
  const fmt = (d: string) => new Date(d).toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' })
  return `${fmt(start)} — ${fmt(end)}`
}

export default function ReportingPeriodsPage() {
  const [periods, setPeriods] = useState<ReportingPeriod[]>(mockReportingPeriods)
  const [activePeriod, setActivePeriod] = useState('rp-2024')
  const [showNewForm, setShowNewForm] = useState(false)
  const [newPeriod, setNewPeriod] = useState({ name: '', startDate: '', endDate: '', type: 'quarterly' as const })

  function handleClose(id: string) {
    setPeriods(prev => prev.map(p => p.id === id ? { ...p, status: 'completed' as const } : p))
  }
  function handleReopen(id: string) {
    setPeriods(prev => prev.map(p => p.id === id ? { ...p, status: 'in_progress' as const } : p))
  }
  function handleCreate() {
    if (!newPeriod.name || !newPeriod.startDate || !newPeriod.endDate) return
    const id = `rp-new-${Date.now()}`
    setPeriods(prev => [{
      id,
      name: newPeriod.name,
      startDate: newPeriod.startDate,
      endDate: newPeriod.endDate,
      fiscalYear: newPeriod.name,
      status: 'draft',
      type: newPeriod.type,
    }, ...prev])
    setNewPeriod({ name: '', startDate: '', endDate: '', type: 'quarterly' })
    setShowNewForm(false)
  }

  const annuals = periods.filter(p => p.type === 'annual')
  const quarters = periods.filter(p => p.type === 'quarterly')

  return (
    <div className="min-h-screen">
      <Header
        title="Reporting Periods"
        description="Manage fiscal year and quarterly reporting periods. All data entry and calculations are scoped to a period."
      />

      <div className="p-6 space-y-6">

        {/* Incomplete data warning */}
        {incompleteCategories.length > 0 && (
          <div className="border border-amber-300 bg-amber-50 rounded p-4">
            <div className="flex items-start gap-3">
              <Warning className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" weight="fill" />
              <div>
                <p className="text-sm font-semibold text-amber-800">Incomplete Data — Active Period</p>
                <p className="text-sm text-amber-700 mt-0.5 mb-3">
                  The following categories have missing data entries for the active period (FY2024-25). Data must be complete before the period can be closed.
                </p>
                <div className="space-y-2">
                  {incompleteCategories.map(cat => (
                    <div key={cat.categoryId} className="flex items-center gap-3 text-sm">
                      <XCircle className="w-4 h-4 text-amber-500 flex-shrink-0" weight="fill" />
                      <span className="font-medium text-amber-800">{cat.name}</span>
                      <span className="text-amber-600">—</span>
                      <span className="text-amber-700">Missing: {cat.missingMonths.join(', ')}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Header row */}
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-foreground">All Periods</h2>
          <button
            onClick={() => setShowNewForm(!showNewForm)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-4 h-4" />
            New Period
          </button>
        </div>

        {/* New period form */}
        {showNewForm && (
          <div className="border border-border rounded p-4 bg-card space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Create New Reporting Period</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">Period Name</label>
                <input
                  type="text"
                  placeholder="e.g. Q4 FY2024-25"
                  value={newPeriod.name}
                  onChange={e => setNewPeriod(p => ({ ...p, name: e.target.value }))}
                  className="w-full px-3 py-2 text-sm border border-input rounded bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">Type</label>
                <select
                  value={newPeriod.type}
                  onChange={e => setNewPeriod(p => ({ ...p, type: e.target.value as any }))}
                  className="w-full px-3 py-2 text-sm border border-input rounded bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="annual">Annual</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="semester">Semester</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">Start Date</label>
                <input
                  type="date"
                  value={newPeriod.startDate}
                  onChange={e => setNewPeriod(p => ({ ...p, startDate: e.target.value }))}
                  className="w-full px-3 py-2 text-sm border border-input rounded bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">End Date</label>
                <input
                  type="date"
                  value={newPeriod.endDate}
                  onChange={e => setNewPeriod(p => ({ ...p, endDate: e.target.value }))}
                  className="w-full px-3 py-2 text-sm border border-input rounded bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>
            <div className="flex gap-2 justify-end">
              <button onClick={() => setShowNewForm(false)} className="px-4 py-2 text-sm border border-border rounded hover:bg-muted transition-colors">Cancel</button>
              <button onClick={handleCreate} className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors font-medium">Create Period</button>
            </div>
          </div>
        )}

        {/* Annual periods */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Annual Periods</h3>
          <div className="border border-border rounded overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50 border-b border-border">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Period</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Date Range</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Type</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Status</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Active</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {annuals.map(period => (
                  <tr key={period.id} className={cn('hover:bg-muted/30 transition-colors', activePeriod === period.id && 'bg-primary/5')}>
                    <td className="px-4 py-3.5 font-medium text-foreground">{period.name}</td>
                    <td className="px-4 py-3.5 text-muted-foreground font-mono text-xs">{formatDateRange(period.startDate, period.endDate)}</td>
                    <td className="px-4 py-3.5"><TypeBadge type={period.type} /></td>
                    <td className="px-4 py-3.5"><StatusBadge status={period.status} /></td>
                    <td className="px-4 py-3.5">
                      {activePeriod === period.id
                        ? <span className="text-xs text-primary font-semibold flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5" weight="fill" /> Current</span>
                        : <button onClick={() => setActivePeriod(period.id)} className="text-xs text-muted-foreground hover:text-primary transition-colors">Set active</button>
                      }
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      <div className="flex items-center gap-2 justify-end">
                        {period.status === 'in_progress' && (
                          <button onClick={() => handleClose(period.id)} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded hover:bg-muted border border-border">
                            <LockKey className="w-3.5 h-3.5" /> Close
                          </button>
                        )}
                        {period.status === 'completed' && (
                          <button onClick={() => handleReopen(period.id)} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded hover:bg-muted border border-border">
                            <ArrowCounterClockwise className="w-3.5 h-3.5" /> Reopen
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quarterly periods */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Quarterly Periods — FY2024-25</h3>
          <div className="border border-border rounded overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50 border-b border-border">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Period</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Date Range</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Type</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Status</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {quarters.map(period => (
                  <tr key={period.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3.5 font-medium text-foreground">{period.name}</td>
                    <td className="px-4 py-3.5 text-muted-foreground font-mono text-xs">{formatDateRange(period.startDate, period.endDate)}</td>
                    <td className="px-4 py-3.5"><TypeBadge type={period.type} /></td>
                    <td className="px-4 py-3.5"><StatusBadge status={period.status} /></td>
                    <td className="px-4 py-3.5 text-right">
                      {period.status === 'in_progress' && (
                        <button onClick={() => handleClose(period.id)} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded hover:bg-muted border border-border ml-auto">
                          <LockKey className="w-3.5 h-3.5" /> Close
                        </button>
                      )}
                      {period.status === 'completed' && (
                        <button onClick={() => handleReopen(period.id)} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded hover:bg-muted border border-border ml-auto">
                          <ArrowCounterClockwise className="w-3.5 h-3.5" /> Reopen
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* GHG Protocol note */}
        <div className="border border-border rounded p-4 bg-muted/30">
          <p className="text-xs text-muted-foreground leading-relaxed">
            <span className="font-semibold text-foreground">GHG Protocol guidance:</span> Reporting periods should align with your institution's fiscal year to enable consistent year-over-year comparisons. All emission calculations, data entries, and reports are scoped to the selected active period. Closed periods are locked — their data and calculations cannot be modified.
          </p>
        </div>
      </div>
    </div>
  )
}
