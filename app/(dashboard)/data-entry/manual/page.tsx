'use client'

import { useState } from 'react'
import { Header } from '@/components/layout/header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { emissionCategories } from '@/lib/data/mock-emissions'
import { mockFacilities } from '@/lib/data/mock-organisation'
import { emissionFactors } from '@/lib/data/mock-emission-factors'
import { proxySuggestions, proxyEligibleCategories } from '@/lib/data/mock-proxy'
import type { ProxySuggestion } from '@/lib/types'
import {
  Factory,
  Lightning,
  Truck,
  Calculator,
  Lightbulb,
  Plus,
  Info,
  MagicWand,
  Warning,
  CheckCircle,
  ArrowLeft,
  SealCheck,
  Tag,
} from '@phosphor-icons/react'
import { cn } from '@/lib/utils'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { toast } from 'sonner'

const scopeTabs = [
  { id: 'scope1', name: 'Scope 1', icon: Factory, description: 'Direct emissions' },
  { id: 'scope2', name: 'Scope 2', icon: Lightning, description: 'Purchased energy' },
  { id: 'scope3', name: 'Scope 3', icon: Truck, description: 'Value chain' },
]

const months = [
  'July 2024', 'August 2024', 'September 2024', 'October 2024',
  'November 2024', 'December 2024', 'January 2025', 'February 2025',
  'March 2025', 'April 2025', 'May 2025', 'June 2025',
]

const uncertaintyColors = {
  measured: 'bg-green-100 text-green-700 border-green-200',
  estimated: 'bg-amber-100 text-amber-700 border-amber-200',
  proxy: 'bg-orange-100 text-orange-700 border-orange-200',
}

interface SavedEntry {
  id: string
  category: string
  facility: string
  month: string
  quantity: string
  unit: string
  co2e: string
  source: 'manual' | 'proxy'
  proxyMethod?: string
}

export default function ManualEntryPage() {
  const [selectedScope, setSelectedScope] = useState('scope1')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedFacility, setSelectedFacility] = useState('fac-001')
  const [selectedMonth, setSelectedMonth] = useState('March 2025')
  const [quantity, setQuantity] = useState('')
  const [unit, setUnit] = useState('')
  const [notes, setNotes] = useState('')
  const [showCalculation, setShowCalculation] = useState(false)
  const [showProxyDialog, setShowProxyDialog] = useState(false)
  const [confirmedProxy, setConfirmedProxy] = useState<ProxySuggestion | null>(null)
  const [savedEntries, setSavedEntries] = useState<SavedEntry[]>([])

  const scopeCategories = emissionCategories.filter((c) => c.scope === selectedScope)
  const selectedCategoryData = emissionCategories.find((c) => c.id === selectedCategory)
  const relevantFactors = emissionFactors.filter((f) => f.categoryId === selectedCategory)
  const proxySuggestion = proxySuggestions.find(p => p.categoryId === selectedCategory)
  const isProxyEligible = proxyEligibleCategories.includes(selectedCategory)

  const calculateEmission = () => {
    if (!quantity || !relevantFactors.length) return null
    const factor = relevantFactors[0]
    const emission = parseFloat(quantity) * factor.value / 1000
    return { emission: emission.toFixed(3), factor }
  }
  const calculation = calculateEmission()

  function handleConfirmProxy() {
    if (!proxySuggestion) return
    setConfirmedProxy(proxySuggestion)
    setShowProxyDialog(false)
    toast.success('Proxy data confirmed', { description: `${proxySuggestion.categoryName}: ${proxySuggestion.calculatedCO2e.toLocaleString()} tCO2e applied` })
  }

  function handleAddEntry() {
    const cat = selectedCategoryData?.name ?? 'Unknown'
    const fac = mockFacilities.find(f => f.id === selectedFacility)?.name ?? ''
    if (confirmedProxy) {
      setSavedEntries(prev => [...prev, {
        id: `entry-${Date.now()}`,
        category: cat,
        facility: 'All Facilities',
        month: selectedMonth,
        quantity: confirmedProxy.dataInputs.split('×')[0].trim(),
        unit: confirmedProxy.unit,
        co2e: confirmedProxy.calculatedCO2e.toLocaleString(),
        source: 'proxy',
        proxyMethod: confirmedProxy.method,
      }])
      setConfirmedProxy(null)
      setSelectedCategory('')
      toast.success('Proxy entry saved', { description: 'Uncertainty tier: ' + confirmedProxy.uncertaintyTier })
    } else if (calculation) {
      setSavedEntries(prev => [...prev, {
        id: `entry-${Date.now()}`,
        category: cat,
        facility: fac,
        month: selectedMonth,
        quantity,
        unit,
        co2e: calculation.emission,
        source: 'manual',
      }])
      setQuantity('')
      setNotes('')
      setShowCalculation(false)
      toast.success('Entry added', { description: `${cat}: ${calculation.emission} tCO2e` })
    }
  }

  return (
    <div className="min-h-screen">
      <Header title="Manual Data Entry" description="Enter activity data directly or use proxy estimates for unavailable data" />

      <div className="p-6">
        <Tabs value={selectedScope} onValueChange={(v) => { setSelectedScope(v); setSelectedCategory(''); setConfirmedProxy(null); setShowCalculation(false) }}>
          <TabsList className="grid grid-cols-3 w-full max-w-md mb-6">
            {scopeTabs.map((tab) => (
              <TabsTrigger key={tab.id} value={tab.id} className="flex items-center gap-2">
                <tab.icon className="w-4 h-4" />
                <span>{tab.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {scopeTabs.map((tab) => (
            <TabsContent key={tab.id} value={tab.id}>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Entry Form */}
                <div className="lg:col-span-2 space-y-4">
                  <Card className="border-border">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base font-medium">Activity Data Entry</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">

                      {/* Category */}
                      <div className="space-y-2">
                        <Label>Emission Category</Label>
                        <Select value={selectedCategory} onValueChange={(v) => { setSelectedCategory(v); setConfirmedProxy(null); setShowCalculation(false) }}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent>
                            {scopeCategories.map((category) => (
                              <SelectItem key={category.id} value={category.id}>
                                <div className="flex items-center gap-2">
                                  <span>{category.name}</span>
                                  <Badge variant="outline" className="text-[10px]">{category.ghgCategory}</Badge>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {selectedCategoryData && (
                          <p className="text-xs text-muted-foreground">{selectedCategoryData.description}</p>
                        )}
                      </div>

                      {/* Proxy option — shown for eligible Scope 3 categories */}
                      {isProxyEligible && selectedCategory && !confirmedProxy && (
                        <div className="border border-amber-300 bg-amber-50 rounded p-4">
                          <div className="flex items-start gap-3">
                            <MagicWand className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" weight="fill" />
                            <div className="flex-1">
                              <p className="text-sm font-semibold text-amber-800">Proxy Data Available</p>
                              <p className="text-sm text-amber-700 mt-0.5">
                                If you don't have real activity data for <strong>{selectedCategoryData?.name}</strong>, a proxy estimate can be generated from your organisation's profile.
                              </p>
                              <div className="flex gap-2 mt-3">
                                <button
                                  onClick={() => setShowProxyDialog(true)}
                                  className="px-3 py-1.5 text-xs font-semibold bg-amber-600 text-white rounded hover:bg-amber-700 transition-colors"
                                >
                                  Use Proxy Data →
                                </button>
                                <button className="px-3 py-1.5 text-xs text-amber-700 hover:text-amber-900 transition-colors">
                                  I have real data
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Confirmed proxy display */}
                      {confirmedProxy && (
                        <div className="border border-orange-300 bg-orange-50 rounded p-4">
                          <div className="flex items-start gap-3">
                            <SealCheck className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" weight="fill" />
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <p className="text-sm font-semibold text-orange-800">Proxy Confirmed</p>
                                <span className={cn('text-xs px-2 py-0.5 rounded border font-medium', uncertaintyColors[confirmedProxy.uncertaintyTier])}>
                                  {confirmedProxy.uncertaintyTier} — ±{confirmedProxy.uncertaintyPct}%
                                </span>
                              </div>
                              <p className="text-sm text-orange-700">{confirmedProxy.categoryName}: <strong>{confirmedProxy.calculatedCO2e.toLocaleString()} tCO2e/year</strong></p>
                              <p className="text-xs text-orange-600 mt-1">{confirmedProxy.method}</p>
                              <button
                                onClick={() => setConfirmedProxy(null)}
                                className="flex items-center gap-1 text-xs text-orange-600 hover:text-orange-800 mt-2 transition-colors"
                              >
                                <ArrowLeft className="w-3 h-3" /> Use real data instead
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Manual entry fields — only shown when not using proxy */}
                      {!confirmedProxy && (
                        <>
                          <div className="space-y-2">
                            <Label>Facility</Label>
                            <Select value={selectedFacility} onValueChange={setSelectedFacility}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a facility" />
                              </SelectTrigger>
                              <SelectContent>
                                {mockFacilities.map((facility) => (
                                  <SelectItem key={facility.id} value={facility.id}>{facility.name}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label>Reporting Month</Label>
                            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                              <SelectTrigger><SelectValue /></SelectTrigger>
                              <SelectContent>
                                {months.map((month) => (
                                  <SelectItem key={month} value={month}>{month}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Activity Quantity</Label>
                              <Input
                                type="number"
                                placeholder="Enter quantity"
                                value={quantity}
                                onChange={(e) => { setQuantity(e.target.value); setShowCalculation(true) }}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Unit</Label>
                              <Select value={unit} onValueChange={setUnit}>
                                <SelectTrigger><SelectValue placeholder="Select unit" /></SelectTrigger>
                                <SelectContent>
                                  {tab.id === 'scope1' && (<>
                                    <SelectItem value="litres">Litres</SelectItem>
                                    <SelectItem value="m3">Cubic metres (m³)</SelectItem>
                                    <SelectItem value="kg">Kilograms</SelectItem>
                                  </>)}
                                  {tab.id === 'scope2' && (<>
                                    <SelectItem value="kWh">kWh</SelectItem>
                                    <SelectItem value="MWh">MWh</SelectItem>
                                    <SelectItem value="ton-hr">Ton-hours</SelectItem>
                                  </>)}
                                  {tab.id === 'scope3' && (<>
                                    <SelectItem value="km">Kilometres</SelectItem>
                                    <SelectItem value="PKR">PKR (spend)</SelectItem>
                                    <SelectItem value="kg">Kilograms</SelectItem>
                                    <SelectItem value="passenger-km">Passenger-km</SelectItem>
                                  </>)}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label>Notes / Source Reference <span className="text-muted-foreground font-normal">(optional)</span></Label>
                            <Input
                              placeholder="e.g. LESCO bill Jan 2025, generator log"
                              value={notes}
                              onChange={(e) => setNotes(e.target.value)}
                            />
                          </div>

                          {/* Calculation preview */}
                          {showCalculation && calculation && (
                            <div className="p-4 bg-primary/5 border border-primary/20 rounded">
                              <div className="flex items-start gap-3">
                                <Calculator className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                <div className="flex-1 space-y-1">
                                  <p className="text-sm font-semibold text-foreground">
                                    Calculated: <span className="text-primary">{calculation.emission} tCO2e</span>
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    {quantity} {unit} × {calculation.factor.value} {calculation.factor.unit} = {(parseFloat(quantity) * calculation.factor.value).toFixed(1)} kgCO2e
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    Factor: {calculation.factor.name} — {calculation.factor.source} ({calculation.factor.sourceYear})
                                  </p>
                                  <div className="flex items-center gap-1.5 mt-1">
                                    <span className={cn('text-xs px-2 py-0.5 rounded border font-medium', uncertaintyColors['measured'])}>
                                      Measured — ±{Math.round(calculation.factor.uncertainty * 100)}%
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </>
                      )}

                      {/* Actions */}
                      <div className="flex items-center gap-2 pt-2 border-t border-border">
                        <Button
                          onClick={handleAddEntry}
                          disabled={!selectedCategory || (!confirmedProxy && (!quantity || !unit))}
                          className="flex items-center gap-2"
                        >
                          <Plus className="w-4 h-4" />
                          Add Entry
                        </Button>
                        <Button variant="outline">Save as Draft</Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Saved entries */}
                  {savedEntries.length > 0 && (
                    <Card className="border-border">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base font-medium">Entries This Session</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {savedEntries.map(entry => (
                            <div key={entry.id} className="flex items-center gap-3 p-3 bg-muted/50 rounded border border-border text-sm">
                              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" weight="fill" />
                              <div className="flex-1 min-w-0">
                                <span className="font-medium text-foreground">{entry.category}</span>
                                <span className="text-muted-foreground"> — {entry.facility} — {entry.month}</span>
                              </div>
                              <span className="font-semibold text-foreground text-xs">{entry.co2e} tCO2e</span>
                              <span className={cn('text-xs px-2 py-0.5 rounded border font-medium flex-shrink-0',
                                entry.source === 'proxy'
                                  ? 'bg-orange-100 text-orange-700 border-orange-200'
                                  : 'bg-green-100 text-green-700 border-green-200'
                              )}>
                                {entry.source === 'proxy' ? (
                                  <span className="flex items-center gap-1"><Tag className="w-3 h-3" /> Proxy</span>
                                ) : 'Measured'}
                              </span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>

                {/* Side Panel */}
                <div className="space-y-4">
                  <Card className="border-border">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <Lightbulb className="w-4 h-4 text-warning" weight="fill" />
                        <CardTitle className="text-sm font-medium">Emission Factors</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {relevantFactors.length > 0 ? (
                        <div className="space-y-2">
                          {relevantFactors.slice(0, 3).map((factor) => (
                            <div key={factor.id} className="p-2 bg-muted rounded">
                              <p className="text-xs font-medium text-foreground">{factor.name}</p>
                              <p className="text-sm font-semibold text-foreground">{factor.value} <span className="text-xs font-normal text-muted-foreground">{factor.unit}</span></p>
                              <p className="text-[10px] text-muted-foreground">{factor.source} · {factor.sourceYear} · {factor.region}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-xs text-muted-foreground">Select a category to see emission factors</p>
                      )}
                    </CardContent>
                  </Card>

                  <Card className="border-border">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Data Quality Tiers</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <TooltipProvider>
                        {[
                          { tier: 'Measured', desc: 'Real activity data + standard factor', color: 'bg-green-100 text-green-700 border-green-200', pct: '±5–10%' },
                          { tier: 'Estimated', desc: 'Real data + proxy factor', color: 'bg-amber-100 text-amber-700 border-amber-200', pct: '±10–25%' },
                          { tier: 'Proxy', desc: 'Proxy activity data + proxy factor', color: 'bg-orange-100 text-orange-700 border-orange-200', pct: '±25–50%' },
                        ].map(t => (
                          <Tooltip key={t.tier}>
                            <TooltipTrigger asChild>
                              <div className={cn('flex items-center justify-between px-2 py-1.5 rounded border text-xs font-medium cursor-help', t.color)}>
                                <span>{t.tier}</span>
                                <span className="font-normal opacity-75">{t.pct}</span>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent side="left" className="max-w-52">
                              <p className="text-xs">{t.desc}</p>
                            </TooltipContent>
                          </Tooltip>
                        ))}
                      </TooltipProvider>
                      <p className="text-[10px] text-muted-foreground pt-1">
                        All entries are tagged with a data quality tier. Proxy-based figures are clearly distinguished in reports.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Proxy Suggestion Dialog */}
      <Dialog open={showProxyDialog} onOpenChange={setShowProxyDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-serif text-xl">Proxy Data Suggestion</DialogTitle>
            <DialogDescription>
              Review this proxy estimate carefully before confirming. This figure will be tagged as proxy-tier in all calculations and reports.
            </DialogDescription>
          </DialogHeader>

          {proxySuggestion && (
            <div className="space-y-4 mt-2">
              {/* Category & result */}
              <div className="flex items-center justify-between p-4 bg-primary/5 border border-primary/20 rounded">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">{proxySuggestion.categoryName}</p>
                  <p className="text-2xl font-bold text-foreground mt-0.5">{proxySuggestion.calculatedCO2e.toLocaleString()} tCO2e</p>
                  <p className="text-xs text-muted-foreground">per year</p>
                </div>
                <div className="text-right">
                  <span className={cn('text-sm px-3 py-1 rounded border font-semibold', uncertaintyColors[proxySuggestion.uncertaintyTier])}>
                    {proxySuggestion.uncertaintyTier.charAt(0).toUpperCase() + proxySuggestion.uncertaintyTier.slice(1)} uncertainty — ±{proxySuggestion.uncertaintyPct}%
                  </span>
                </div>
              </div>

              {/* Method */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">Estimation Method</p>
                <p className="text-sm font-medium text-foreground">{proxySuggestion.method}</p>
              </div>

              {/* Assumption */}
              <div className="p-3 bg-muted rounded border border-border">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">Assumption</p>
                <p className="text-sm text-foreground leading-relaxed">{proxySuggestion.assumption}</p>
              </div>

              {/* Calculation trace */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">Calculation</p>
                <p className="text-sm font-mono text-foreground bg-muted px-3 py-2 rounded border border-border">{proxySuggestion.dataInputs}</p>
              </div>

              {/* Factor source */}
              <div className="flex items-start gap-2 p-3 border border-border rounded">
                <Info className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" weight="fill" />
                <div>
                  <p className="text-xs font-semibold text-foreground">Emission Factor</p>
                  <p className="text-xs text-muted-foreground">{proxySuggestion.factorValue}</p>
                  <p className="text-xs text-muted-foreground">Source: {proxySuggestion.factorSource}</p>
                </div>
              </div>

              {/* Warning */}
              <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded">
                <Warning className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" weight="fill" />
                <p className="text-xs text-amber-700">
                  This proxy figure will be flagged with <strong>{proxySuggestion.uncertaintyTier} uncertainty (±{proxySuggestion.uncertaintyPct}%)</strong> in all calculations, dashboards, and PDF reports. To reduce uncertainty, collect real activity data and re-enter.
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2 border-t border-border">
                <Button onClick={handleConfirmProxy} className="flex-1">
                  <SealCheck className="w-4 h-4 mr-2" />
                  Confirm &amp; Use This Proxy
                </Button>
                <Button variant="outline" onClick={() => setShowProxyDialog(false)} className="flex-1">
                  I Have Real Data
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
