"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Scales,
  ChartPie,
  ListChecks,
  Warning,
  ArrowSquareOut,
  Info,
  Leaf,
  ArrowLeft,
} from "@phosphor-icons/react";
import { emissionFactors } from "@/lib/data/mock-emission-factors";

export default function PublicMethodologyPage() {
  // Group emission factors by category name for display
  const grouped = emissionFactors.reduce((acc, ef) => {
    const cat = ef.categoryId ?? 'Other';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(ef);
    return acc;
  }, {} as Record<string, typeof emissionFactors>);

  const catNames: Record<string, string> = {
    'cat-s1-01': 'Scope 1 — Stationary Combustion',
    'cat-s1-02': 'Scope 1 — Mobile Combustion',
    'cat-s1-03': 'Scope 1 — Fugitive Emissions',
    'cat-s2-01': 'Scope 2 — Purchased Electricity',
    'cat-s2-02': 'Scope 2 — Purchased Cooling',
    'cat-s3-05': 'Scope 3 — Business Travel',
    'cat-s3-06': 'Scope 3 — Employee Commuting',
    'cat-s3-07': 'Scope 3 — Student Commuting',
    'cat-s3-04': 'Scope 3 — Waste',
    'cat-s3-01': 'Scope 3 — Purchased Goods',
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Public header */}
      <header className="border-b border-border bg-card px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="p-1.5 rounded bg-primary/10">
            <Leaf className="h-5 w-5 text-primary" weight="fill" />
          </div>
          <span className="font-serif text-lg font-semibold text-foreground">CarbonLens</span>
          <span className="text-muted-foreground mx-2">·</span>
          <span className="text-sm text-muted-foreground">Methodology & Transparency</span>
        </div>
        <Link
          href="/login"
          className="flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Login
        </Link>
      </header>

      <div className="max-w-5xl mx-auto p-6 space-y-6">
        {/* Hero */}
        <div className="py-8 text-center border-b border-border mb-2">
          <h1 className="font-serif text-3xl font-medium text-foreground mb-3">Calculation Methodology</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm leading-relaxed">
            CarbonLens uses the <strong>GHG Protocol Corporate Accounting and Reporting Standard</strong> for all emission calculations.
            This page documents our methodology, emission factors, and data sources — publicly accessible without a login.
          </p>
          <div className="flex items-center justify-center gap-3 mt-4 flex-wrap">
            <Badge variant="outline" className="border-primary/30 text-primary bg-primary/5">GHG Protocol Compliant</Badge>
            <Badge variant="outline" className="border-green-300 text-green-700 bg-green-50">IPCC AR6 GWP Values</Badge>
            <Badge variant="outline" className="border-blue-300 text-blue-700 bg-blue-50">NEPRA 2024 Grid Factor</Badge>
            <Badge variant="outline" className="border-border text-muted-foreground">Deterministic — No AI in Math</Badge>
          </div>
        </div>

        <Tabs defaultValue="ghg-protocol" className="space-y-6">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="ghg-protocol">GHG Protocol</TabsTrigger>
            <TabsTrigger value="emission-factors">Emission Factors</TabsTrigger>
            <TabsTrigger value="calculations">Calculations</TabsTrigger>
            <TabsTrigger value="uncertainty">Uncertainty</TabsTrigger>
          </TabsList>

          {/* GHG Protocol Tab */}
          <TabsContent value="ghg-protocol" className="space-y-6">
            <Card className="border-border">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded bg-primary/10">
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="font-serif">GHG Protocol Corporate Standard</CardTitle>
                    <CardDescription>The foundation of our carbon accounting methodology</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  CarbonLens follows the Greenhouse Gas Protocol Corporate Accounting and Reporting Standard,
                  the most widely used international accounting tool for government and business leaders to
                  understand, quantify, and manage greenhouse gas emissions.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    {
                      scope: 'Scope 1', color: 'border-l-chart-1',
                      desc: 'Direct GHG emissions from sources owned or controlled by the organisation.',
                      items: ['Stationary combustion (generators, boilers)', 'Mobile combustion (owned vehicles)', 'Fugitive emissions (refrigerants, lab gases)'],
                    },
                    {
                      scope: 'Scope 2', color: 'border-l-chart-2',
                      desc: 'Indirect GHG emissions from purchased electricity, steam, heating, and cooling.',
                      items: ['Grid electricity consumption', 'Location-based method (NEPRA 2024)', 'Market-based method (where applicable)'],
                    },
                    {
                      scope: 'Scope 3', color: 'border-l-chart-3',
                      desc: "All other indirect emissions in the organisation's value chain.",
                      items: ['15 categories defined by GHG Protocol', 'Upstream and downstream activities', 'Material for university operations'],
                    },
                  ].map(s => (
                    <div key={s.scope} className={`p-4 border rounded border-l-4 bg-muted/30`}>
                      <h4 className="font-semibold text-foreground mb-2">{s.scope}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{s.desc}</p>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        {s.items.map((item, i) => <li key={i}>— {item}</li>)}
                      </ul>
                    </div>
                  ))}
                </div>

                <div className="p-4 border rounded bg-muted/30">
                  <div className="flex items-start gap-3">
                    <Info className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-foreground">Operational Control Approach</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        CarbonLens uses the operational control approach for defining organisational boundaries.
                        Under this approach, an organisation accounts for 100% of emissions from operations over
                        which it has operational control.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="font-serif">Scope 3 Categories for Universities</CardTitle>
                <CardDescription>Relevant value chain emission categories for higher education institutions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    { cat: 1, name: "Purchased Goods & Services", relevance: "High", desc: "Lab equipment, office supplies, food services" },
                    { cat: 2, name: "Capital Goods", relevance: "Medium", desc: "Buildings, major equipment purchases" },
                    { cat: 3, name: "Fuel & Energy Activities", relevance: "Medium", desc: "T&D losses, well-to-tank emissions" },
                    { cat: 4, name: "Upstream Transportation", relevance: "Low", desc: "Inbound logistics" },
                    { cat: 5, name: "Waste Generated", relevance: "High", desc: "Solid waste, wastewater, lab waste" },
                    { cat: 6, name: "Business Travel", relevance: "High", desc: "Conferences, research collaborations" },
                    { cat: 7, name: "Employee Commuting", relevance: "High", desc: "Staff and faculty commuting" },
                    { cat: 8, name: "Upstream Leased Assets", relevance: "Low", desc: "Leased vehicles, equipment" },
                    { cat: 9, name: "Downstream Transportation", relevance: "N/A", desc: "Not applicable for universities" },
                    { cat: 10, name: "Processing of Sold Products", relevance: "N/A", desc: "Not applicable for universities" },
                    { cat: 11, name: "Use of Sold Products", relevance: "N/A", desc: "Not applicable for universities" },
                    { cat: 12, name: "End-of-Life Treatment", relevance: "N/A", desc: "Not applicable for universities" },
                    { cat: 13, name: "Downstream Leased Assets", relevance: "Low", desc: "Leased facilities to third parties" },
                    { cat: 14, name: "Franchises", relevance: "N/A", desc: "Not applicable for universities" },
                    { cat: 15, name: "Investments / Student Commuting", relevance: "High", desc: "University investments + student travel" },
                  ].map(cat => (
                    <div key={cat.cat} className="flex items-start gap-3 p-3 border rounded">
                      <span className="text-xs font-mono bg-muted px-2 py-1 rounded flex-shrink-0">{cat.cat}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-medium text-sm">{cat.name}</h4>
                          <Badge
                            variant="outline"
                            className={
                              cat.relevance === "High"
                                ? "border-primary/30 text-primary bg-primary/10"
                                : cat.relevance === "Medium"
                                ? "border-amber-300 text-amber-700 bg-amber-50"
                                : cat.relevance === "Low"
                                ? "border-border text-muted-foreground"
                                : "border-red-200 text-red-500 bg-red-50"
                            }
                          >
                            {cat.relevance}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">{cat.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Emission Factors Tab */}
          <TabsContent value="emission-factors" className="space-y-6">
            <Card className="border-border">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded bg-primary/10">
                    <Scales className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="font-serif">Emission Factor Database</CardTitle>
                    <CardDescription>Region-specific and activity-based emission factors used in all calculations</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(grouped).map(([catId, factors]) => (
                    <div key={catId} className="border rounded overflow-hidden">
                      <div className="p-3 bg-muted/40 border-b">
                        <h4 className="font-medium text-sm">{catNames[catId] ?? catId}</h4>
                      </div>
                      <div className="divide-y divide-border">
                        {factors.map(f => (
                          <div key={f.id} className="p-3 flex items-center justify-between gap-4">
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm text-foreground">{f.name}</p>
                              <p className="text-xs text-muted-foreground">{f.geography ?? f.region} · {f.source} ({f.sourceYear})</p>
                              {f.notes && <p className="text-xs text-muted-foreground mt-0.5 italic">{f.notes}</p>}
                            </div>
                            <div className="text-right flex-shrink-0">
                              <p className="font-mono text-sm font-semibold text-foreground">{f.value} <span className="font-normal text-muted-foreground text-xs">{f.unit}</span></p>
                              <p className="text-xs text-muted-foreground">±{((f.uncertainty ?? 0) * 100).toFixed(0)}% · {f.version}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="font-serif">Data Sources</CardTitle>
                <CardDescription>Primary sources for emission factors used in calculations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { name: "IPCC AR6", desc: "Intergovernmental Panel on Climate Change Assessment Report 6 (2021) — GWP100 values" },
                    { name: "DEFRA 2023", desc: "UK Government GHG Conversion Factors for Company Reporting — travel and freight" },
                    { name: "IEA 2024", desc: "International Energy Agency Emission Factors Database — grid and energy" },
                    { name: "NEPRA 2024", desc: "Pakistan National Electric Power Regulatory Authority — national grid emission factor 0.51 kgCO2e/kWh" },
                    { name: "OGRA", desc: "Oil and Gas Regulatory Authority Pakistan — domestic fuel standards and calorific values" },
                    { name: "GHG Protocol", desc: "Corporate Standard (Revised), Scope 2 Guidance, and Scope 3 Standard" },
                  ].map(source => (
                    <div key={source.name} className="flex items-start gap-3 p-4 border rounded hover:bg-muted/30 transition-colors">
                      <ArrowSquareOut className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-sm text-foreground">{source.name}</h4>
                        <p className="text-xs text-muted-foreground mt-0.5">{source.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Calculations Tab */}
          <TabsContent value="calculations" className="space-y-6">
            <Card className="border-border">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded bg-primary/10">
                    <ChartPie className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="font-serif">Calculation Methodology</CardTitle>
                    <CardDescription>How emissions are calculated from activity data — deterministically, with no AI involvement</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 bg-muted/30 rounded border">
                  <h4 className="font-medium mb-3">Basic Emission Equation</h4>
                  <div className="p-4 bg-background rounded border text-center">
                    <p className="font-mono text-lg text-foreground">CO₂e = Activity Data × Emission Factor × GWP</p>
                  </div>
                  <p className="text-sm text-muted-foreground mt-3">
                    Where GWP (Global Warming Potential) converts non-CO₂ gases to CO₂ equivalent using
                    IPCC AR6 100-year values (CO₂=1, CH₄=27.9, N₂O=273).
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { title: 'Scope 1: Stationary Combustion', formula: 'Emissions = Fuel × NCV × EF', desc: 'Fuel consumption (litres/kg) × Net Calorific Value × Emission Factor (IPCC AR6)' },
                    { title: 'Scope 2: Grid Electricity', formula: 'Emissions = kWh × Grid EF', desc: 'Electricity consumption × Location-based grid emission factor (NEPRA 2024: 0.51 kgCO2e/kWh)' },
                    { title: 'Scope 1: Fugitive Emissions', formula: 'Emissions = Refrigerant (kg) × GWP', desc: 'Quantity of refrigerant purchased × Global Warming Potential (R-410A: GWP 2,088)' },
                    { title: 'Scope 3: Employee Commuting', formula: 'Emissions = Distance × Mode EF × Days', desc: 'Average distance × Transport mode emission factor × Working days per year' },
                    { title: 'Scope 3: Business Travel', formula: 'Emissions = Distance × Class EF × RF', desc: 'Distance × Travel class emission factor × Radiative Forcing multiplier (air travel only)' },
                    { title: 'Scope 3: Waste Generated', formula: 'Emissions = Waste (t) × Treatment EF', desc: 'Waste mass × Treatment-specific emission factor (landfill, composting, recycling)' },
                  ].map(item => (
                    <div key={item.title} className="p-4 border rounded">
                      <h4 className="font-medium text-sm mb-2">{item.title}</h4>
                      <div className="p-2.5 bg-muted/50 rounded font-mono text-sm mb-2">{item.formula}</div>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="font-serif">GWP Values (AR6 — 100-year)</CardTitle>
                <CardDescription>Global Warming Potential values from IPCC Sixth Assessment Report (2021)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { gas: "CO₂", gwp: 1, desc: "Carbon Dioxide" },
                    { gas: "CH₄", gwp: 27.9, desc: "Methane (fossil)" },
                    { gas: "N₂O", gwp: 273, desc: "Nitrous Oxide" },
                    { gas: "HFCs", gwp: "4–14,800", desc: "Hydrofluorocarbons (varies)" },
                  ].map(item => (
                    <div key={item.gas} className="p-4 border rounded text-center">
                      <p className="text-2xl font-serif font-semibold text-foreground">{item.gas}</p>
                      <p className="text-lg font-mono text-primary font-semibold">{item.gwp}</p>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Uncertainty Tab */}
          <TabsContent value="uncertainty" className="space-y-6">
            <Card className="border-border">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded bg-amber-100">
                    <Warning className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <CardTitle className="font-serif">Uncertainty Quantification</CardTitle>
                    <CardDescription>Understanding data quality and confidence intervals</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  CarbonLens quantifies uncertainty in emissions estimates using the IPCC approach,
                  combining uncertainty in activity data with uncertainty in emission factors using
                  error propagation methods.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded">
                    <h4 className="font-medium mb-3">Data Quality Tiers</h4>
                    <div className="space-y-2">
                      {[
                        { tier: "Measured", badge: "bg-green-100 text-green-700", desc: "Primary data, metered values, utility bills", uncertainty: "±5–10%" },
                        { tier: "Estimated", badge: "bg-amber-100 text-amber-700", desc: "Secondary data, invoices, standard factors", uncertainty: "±10–25%" },
                        { tier: "Proxy", badge: "bg-orange-100 text-orange-700", desc: "Benchmarks, surveys, spend-based assumptions", uncertainty: "±25–50%" },
                      ].map(t => (
                        <div key={t.tier} className="flex items-center justify-between p-2.5 bg-muted/30 rounded">
                          <div className="flex items-center gap-2">
                            <Badge className={t.badge}>{t.tier}</Badge>
                            <span className="text-sm text-muted-foreground">{t.desc}</span>
                          </div>
                          <span className="font-mono text-sm text-foreground flex-shrink-0">{t.uncertainty}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="p-4 border rounded">
                    <h4 className="font-medium mb-3">Error Propagation</h4>
                    <div className="p-3 bg-muted/30 rounded font-mono text-sm mb-3 text-center">
                      U_combined = √(U_activity² + U_factor²)
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Combined uncertainty is calculated using the root sum of squares method,
                      assuming independent, normally distributed uncertainties in both activity
                      data and emission factors.
                    </p>
                  </div>
                </div>

                <div className="p-4 border rounded bg-muted/30">
                  <div className="flex items-start gap-3">
                    <ListChecks className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium">LMIC Context Considerations</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        In Low and Middle Income Country contexts like Pakistan, data availability may be limited.
                        CarbonLens addresses this through:
                      </p>
                      <ul className="text-sm text-muted-foreground mt-2 space-y-1 ml-4 list-disc">
                        <li>Proxy data suggestions based on regional benchmarks for similar institutions</li>
                        <li>Pakistan-specific emission factors (NEPRA grid, OGRA fuel standards)</li>
                        <li>Clear per-category Measured / Estimated / Proxy badges throughout the UI</li>
                        <li>Conservative uncertainty ranges for all proxy data</li>
                        <li>Explicit improvement suggestions to reduce uncertainty tier for each category</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Footer CTA */}
        <div className="border border-primary/20 rounded bg-primary/5 p-6 text-center">
          <h3 className="font-serif text-lg font-medium text-foreground mb-2">Ready to measure your carbon footprint?</h3>
          <p className="text-sm text-muted-foreground mb-4">CarbonLens is purpose-built for Pakistani universities following the GHG Protocol Corporate Standard.</p>
          <div className="flex items-center justify-center gap-3">
            <Link href="/login">
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded text-sm font-medium hover:bg-primary/90 transition-colors">
                Sign in to Platform
              </button>
            </Link>
            <Link href="/register">
              <button className="px-4 py-2 border border-border rounded text-sm font-medium hover:bg-muted transition-colors">
                Create Account
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
