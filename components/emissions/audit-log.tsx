'use client'

import { useState } from 'react'
import { CaretDown, CaretUp, FileText, PencilSimple, Warning, Info } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'
import type { AuditRecord, Scope } from '@/lib/types'
import { auditRecords } from '@/lib/data/mock-audit'

interface AuditLogProps {
  scope: Scope
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' })
}

export function AuditLog({ scope }: AuditLogProps) {
  const [open, setOpen] = useState(false)
  const [expandedRow, setExpandedRow] = useState<string | null>(null)

  const records = auditRecords.filter(r => r.scope === scope)

  return (
    <div className="border border-border rounded bg-card">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-muted/30 transition-colors rounded"
      >
        <div className="flex items-center gap-3">
          <Info className="w-4 h-4 text-muted-foreground" />
          <div className="text-left">
            <p className="text-sm font-semibold text-foreground">Calculation Audit Trail</p>
            <p className="text-xs text-muted-foreground">
              {records.length} records · Shows input → emission factor → output for each entry. No AI in the math.
            </p>
          </div>
        </div>
        {open ? (
          <CaretUp className="w-4 h-4 text-muted-foreground flex-shrink-0" />
        ) : (
          <CaretDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
        )}
      </button>

      {open && (
        <div className="border-t border-border">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50 border-b border-border">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Date</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Category</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Activity</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Emission Factor</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Factor Source</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Output (kgCO2e)</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Source</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {records.map(record => (
                  <>
                    <tr
                      key={record.id}
                      className={cn(
                        'hover:bg-muted/30 transition-colors cursor-pointer',
                        expandedRow === record.id && 'bg-muted/20'
                      )}
                      onClick={() => setExpandedRow(expandedRow === record.id ? null : record.id)}
                    >
                      <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">{formatDate(record.calculatedAt)}</td>
                      <td className="px-4 py-3">
                        <span className="text-xs font-medium text-foreground">{record.categoryName}</span>
                        {record.facilityName && (
                          <p className="text-[10px] text-muted-foreground">{record.facilityName}</p>
                        )}
                      </td>
                      <td className="px-4 py-3 font-mono text-xs">
                        {record.activityValue.toLocaleString()} {record.activityUnit}
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-xs text-foreground">{record.emissionFactorValue}</span>
                        <span className="text-[10px] text-muted-foreground ml-1">{record.emissionFactorUnit}</span>
                      </td>
                      <td className="px-4 py-3 text-xs text-muted-foreground">
                        <p>{record.emissionFactorSource}</p>
                        <p className="text-[10px]">{record.emissionFactorYear}</p>
                      </td>
                      <td className="px-4 py-3 text-right font-mono text-sm font-semibold text-foreground">
                        {record.outputKgCO2e.toLocaleString()}
                      </td>
                      <td className="px-4 py-3">
                        <span className={cn(
                          'inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded border',
                          record.dataSource === 'document'
                            ? 'bg-blue-50 text-blue-700 border-blue-200'
                            : 'bg-muted text-muted-foreground border-border'
                        )}>
                          {record.dataSource === 'document'
                            ? <><FileText className="w-3 h-3" /> Doc</>
                            : <><PencilSimple className="w-3 h-3" /> Manual</>
                          }
                        </span>
                      </td>
                    </tr>
                    {expandedRow === record.id && (
                      <tr key={`${record.id}-detail`} className="bg-muted/20">
                        <td colSpan={7} className="px-4 py-3">
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                            <div>
                              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mb-1">Emission Factor</p>
                              <p className="font-medium text-foreground">{record.emissionFactorName}</p>
                              <p className="text-muted-foreground">ID: {record.emissionFactorId}</p>
                            </div>
                            <div>
                              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mb-1">Calculation Method</p>
                              <p className="text-foreground">{record.calculationMethod}</p>
                            </div>
                            <div>
                              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mb-1">GWP Values (AR6)</p>
                              <p className="text-foreground">CO₂: {record.gwpCO2} · CH₄: {record.gwpCH4} · N₂O: {record.gwpN2O}</p>
                            </div>
                            {record.sourceReference && (
                              <div>
                                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mb-1">Source Document</p>
                                <p className="font-medium text-foreground font-mono">{record.sourceReference}</p>
                              </div>
                            )}
                            <div>
                              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mb-1">Formula</p>
                              <p className="font-mono text-foreground">
                                {record.activityValue.toLocaleString()} {record.activityUnit} × {record.emissionFactorValue} {record.emissionFactorUnit} = <strong>{record.outputKgCO2e.toLocaleString()} kgCO2e</strong>
                              </p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-3 border-t border-border bg-muted/20">
            <p className="text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">GHG Protocol compliance:</span> All calculations follow the Corporate Standard. Emission factors are applied deterministically — no AI model performs or modifies these calculations.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
