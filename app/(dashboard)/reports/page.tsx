"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  FilePdf,
  DownloadSimple,
  CalendarBlank,
  Buildings,
  ChartBar,
  FileText,
  Clock,
  CheckCircle,
  CircleNotch,
  Check,
  CaretDown,
  CaretUp,
  Eye,
  Warning,
} from "@phosphor-icons/react";
import { mockReports } from "@/lib/data/mock-reports";
import { mockOrganisation } from "@/lib/data/mock-organisation";
import { formatNumber } from "@/lib/utils/formatters";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type ReportType = "annual" | "quarterly" | "custom";

// Report preview sections with pre-written mock content
const previewSections = [
  {
    id: 'cover',
    title: 'Cover Page',
    content: `GHG Inventory Report — FY2024-25\nNovaTech University, Lahore, Pakistan\nPrepared under the GHG Protocol Corporate Accounting and Reporting Standard (Revised Edition)\nReporting boundary: Operational control approach\nReport generated: April 2025\nPrepared by: Sustainability Office, NovaTech University`,
  },
  {
    id: 'exec',
    title: 'Executive Summary',
    content: `NovaTech University's total greenhouse gas emissions for fiscal year 2024-25 are 23,100 tCO2e — a 4.0% increase from FY2023-24 (22,208 tCO2e). The increase is primarily driven by expanded laboratory operations and a refrigerant leakage event at the Engineering Block.

Scope 1 (Direct): 2,400 tCO2e (10.4%) — stationary combustion, fleet, and fugitive emissions
Scope 2 (Energy): 8,200 tCO2e (35.5%) — purchased electricity at 0.51 kgCO2e/kWh (NEPRA 2024)
Scope 3 (Value Chain): 12,500 tCO2e (54.1%) — commuting, procurement, and business travel

Intensity metrics: 1.54 tCO2e/student and 0.051 tCO2e/m², both below regional university average.
Data completeness: 87% of emission categories have complete activity data for FY2024-25.`,
  },
  {
    id: 'boundary',
    title: 'Organisational Boundary',
    content: `Boundary approach: Operational control\nEntities included: All campuses and facilities under NovaTech University's operational control\n\nFacilities covered (5 total):\n• Main Campus, Lahore — 45,000 m²\n• Engineering Block — 12,000 m²\n• Research Centre — 8,500 m²\n• Sports Complex — 6,000 m²\n• Off-Campus Hostel — 4,200 m²\n\nExclusions: None — full operational boundary applied.\nBase year: FY2021-22 (22,100 tCO2e)`,
  },
  {
    id: 'scope1',
    title: 'Scope 1 Analysis',
    content: `Total Scope 1 emissions: 2,400 tCO2e (10.4% of total)\n\nStationary Combustion: 1,450 tCO2e\n  — Generator diesel: 42,000L × 2.71 kgCO2e/L = 113,820 kgCO2e\n  — Boiler natural gas: 6,800 m³ × 2.02 kgCO2e/m³ = 13,736 kgCO2e\n  — Data quality: Measured (±8%)\n\nMobile Combustion: 680 tCO2e\n  — Fleet diesel: 25,373L × 2.68 kgCO2e/L = 68,000 kgCO2e\n  — Data quality: Measured (±8%)\n\nFugitive Emissions: 270 tCO2e\n  — R-410A refrigerant: 40.8 kg × 2,088 kgCO2e/kg = 85,190 kgCO2e\n  — Data quality: Estimated (±20%)\n  — Note: Anomalous leakage event detected in Q3 — HVAC retrofit recommended`,
  },
  {
    id: 'scope2',
    title: 'Scope 2 Analysis',
    content: `Total Scope 2 emissions: 8,200 tCO2e (35.5% of total)\n\nPurchased Electricity: 7,650 tCO2e\n  — Consumption: 15,000 MWh\n  — Emission factor: 0.51 kgCO2e/kWh (NEPRA 2024, location-based)\n  — Supplier: LESCO (Lahore Electric Supply Company)\n  — Data quality: Measured (±5%)\n\nPurchased Cooling: 550 tCO2e\n  — Method: Estimated from district cooling contract\n  — Data quality: Estimated (±12%)\n\nMethodological note: Location-based method applied per GHG Protocol Scope 2 Guidance.`,
  },
  {
    id: 'scope3',
    title: 'Scope 3 Analysis',
    content: `Total Scope 3 emissions: 12,500 tCO2e (54.1% of total)\n\nTop categories:\n• Purchased Goods & Services: 3,200 tCO2e — spend-based proxy (±40%)\n• Student Commuting: 3,060 tCO2e — distance-based proxy, 15,000 students (±30%)\n• Employee Commuting: 2,100 tCO2e — distance-based proxy, 2,500 staff (±30%)\n• Capital Goods: 1,850 tCO2e — spend-based, major equipment procured (±40%)\n• Business Travel: 890 tCO2e — measured from flight/hotel records (±10%)\n• Fuel & Energy Activities: 980 tCO2e — T&D losses and upstream fuel (±15%)\n• Waste Generated: 420 tCO2e — proxy from student count benchmark (±50%)`,
  },
  {
    id: 'intensity',
    title: 'Intensity Metrics',
    content: `Normalised emission intensities for FY2024-25:\n\nPer enrolled student:\n  FY2024-25: 1.54 tCO2e/student (15,000 students)\n  FY2023-24: 1.48 tCO2e/student (+4.1% YoY)\n  Regional benchmark: 1.80 tCO2e/student — NovaTech is 14% below average\n\nPer floor area:\n  FY2024-25: 0.051 tCO2e/m² (452,000 m²)\n  FY2023-24: 0.049 tCO2e/m²\n  Regional benchmark: 0.065 tCO2e/m²\n\nPer staff member:\n  FY2024-25: 9.24 tCO2e/staff (2,500 staff)\n  FY2023-24: 8.88 tCO2e/staff`,
  },
  {
    id: 'uncertainty',
    title: 'Uncertainty Summary',
    content: `Overall uncertainty: ±15% at 95% confidence interval\n\nBy data quality tier:\n  Measured (48% of footprint): ±5–10% — utility bills, fuel records, flight receipts\n  Estimated (17% of footprint): ±10–25% — invoices + standard factors\n  Proxy (35% of footprint): ±25–50% — benchmarks, surveys, spend-based\n\nBy scope:\n  Scope 1: ±8% (high confidence)\n  Scope 2: ±5% (high confidence)\n  Scope 3: ±25% (medium confidence)\n\nImprovement priority: Reducing proxy percentage from 35% to 20% by conducting direct commute surveys and obtaining waste weight records from LWMC.`,
  },
  {
    id: 'recs',
    title: 'Recommendations Summary',
    content: `Total identified reduction potential: 4,630 tCO2e/year (20.0% of current footprint)\n\nHigh priority:\n  1. Solar PV Installation (2 MW): −2,680 tCO2e/yr · PKR 280M · 4-5yr payback\n  2. Student Shuttle Program: −920 tCO2e/yr · PKR 35M · 3-4yr payback\n  3. HVAC System Retrofit: −420 tCO2e/yr · PKR 45M · 6-7yr payback (addresses refrigerant leakage)\n\nMedium priority:\n  4. EV Fleet Transition (50%): −340 tCO2e/yr · PKR 85M · 8-10yr payback\n  5. Waste Diversion Program: −250 tCO2e/yr · PKR 8M · 2-3yr payback\n\nImplemented:\n  6. Virtual Conference Policy: −220 tCO2e/yr · PKR 0.5M · Immediate payback`,
  },
  {
    id: 'appendix',
    title: 'Appendix',
    content: `A. Emission Factor Reference Table\n   — All factors sourced from IPCC AR6 (2021), IEA 2024, NEPRA 2024, DEFRA 2023\n   — Pakistan grid factor: 0.51 kgCO2e/kWh (NEPRA State of Industry 2024)\n\nB. Calculation Audit Records\n   — 15 detailed audit records available in CarbonLens system\n   — Each record: activity value × emission factor = output, with source documents referenced\n\nC. GHG Protocol Compliance Checklist\n   — Operational control boundary: ✓\n   — All Scope 1 categories reported: ✓\n   — Scope 2 location-based method: ✓\n   — Scope 3 relevance assessment: ✓\n   — Uncertainty quantification: ✓\n   — Base year recalculation policy: ✓`,
  },
];

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState<ReportType>("annual");
  const [generating, setGenerating] = useState<string | null>(null);
  const [generatedId, setGeneratedId] = useState<string | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['exec']));
  const [customStartDate, setCustomStartDate] = useState("");
  const [customEndDate, setCustomEndDate] = useState("");

  const handleGenerateReport = (reportId: string) => {
    setGenerating(reportId);
    setPreviewOpen(false);
    setTimeout(() => {
      setGenerating(null);
      setGeneratedId(reportId);
      setPreviewOpen(true);
    }, 2000);
  };

  const handleDownload = () => {
    toast.info('PDF export requires backend integration — available in production deployment.');
  };

  function toggleSection(id: string) {
    setExpandedSections(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "complete":
        return <Badge className="bg-green-100 text-green-700 border-green-200">Complete</Badge>;
      case "pending":
        return <Badge variant="outline" className="border-amber-300 text-amber-700 bg-amber-50">Pending Review</Badge>;
      case "draft":
        return <Badge variant="outline">Draft</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen">
      <Header
        title="Reports"
        description="Generate, download, and manage carbon footprint reports"
      />

      <div className="p-6 space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { icon: FilePdf, value: mockReports.length, label: 'Total Reports' },
            { icon: CalendarBlank, value: 'FY 2024-25', label: 'Current Period' },
            { icon: ChartBar, value: formatNumber(mockOrganisation.totalEmissions), label: 'tCO2e Total' },
            { icon: Buildings, value: mockOrganisation.facilities.length, label: 'Facilities Covered' },
          ].map(({ icon: Icon, value, label }, i) => (
            <Card key={i} className="border-border">
              <CardContent className="pt-4 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-semibold">{value}</p>
                    <p className="text-xs text-muted-foreground">{label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Report Generation */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="font-serif">Generate New Report</CardTitle>
            <CardDescription>Create GHG Protocol-compliant carbon footprint reports</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as ReportType)}>
              <TabsList className="mb-4 bg-muted/50">
                <TabsTrigger value="annual">Annual Report</TabsTrigger>
                <TabsTrigger value="quarterly">Quarterly Report</TabsTrigger>
                <TabsTrigger value="custom">Custom Period</TabsTrigger>
              </TabsList>

              <TabsContent value="annual" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { id: 'annual-2024', title: 'FY 2024-25 Annual Report', desc: 'Complete annual carbon footprint assessment following GHG Protocol Corporate Standard. Includes all Scope 1, 2, and 3 emissions with uncertainty quantification.', tags: ['Scope 1, 2, 3', 'GHG Protocol', 'Uncertainty Analysis'], primary: true },
                    { id: 'annual-2023', title: 'FY 2023-24 Annual Report', desc: 'Previous year comparison report for year-over-year analysis and trend identification.', tags: ['YoY Comparison', 'Trend Analysis'], primary: false },
                  ].map(report => (
                    <div key={report.id} className="p-4 border rounded bg-muted/30">
                      <h4 className="font-medium mb-2">{report.title}</h4>
                      <p className="text-sm text-muted-foreground mb-4">{report.desc}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {report.tags.map(tag => <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>)}
                      </div>
                      <Button
                        variant={report.primary ? 'default' : 'outline'}
                        onClick={() => handleGenerateReport(report.id)}
                        disabled={generating === report.id}
                      >
                        {generating === report.id ? (
                          <><CircleNotch className="mr-2 h-4 w-4 animate-spin" /> Generating...</>
                        ) : (
                          <><FilePdf className="mr-2 h-4 w-4" /> Generate Report</>
                        )}
                      </Button>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="quarterly" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {[
                    { q: 'Q1', period: 'Jul – Sep 2024' },
                    { q: 'Q2', period: 'Oct – Dec 2024' },
                    { q: 'Q3', period: 'Jan – Mar 2025' },
                    { q: 'Q4', period: 'Apr – Jun 2025' },
                  ].map(({ q, period }) => (
                    <div key={q} className="p-4 border rounded bg-muted/30">
                      <h4 className="font-medium mb-1">{q} FY2024-25</h4>
                      <p className="text-sm text-muted-foreground mb-4">{period}</p>
                      <Button
                        variant="outline" size="sm"
                        onClick={() => handleGenerateReport(`quarterly-${q}`)}
                        disabled={generating === `quarterly-${q}`}
                        className="w-full"
                      >
                        {generating === `quarterly-${q}` ? <CircleNotch className="h-4 w-4 animate-spin" /> : 'Generate'}
                      </Button>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="custom" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="start-date">Start Date</Label>
                    <Input id="start-date" type="date" value={customStartDate} onChange={(e) => setCustomStartDate(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="end-date">End Date</Label>
                    <Input id="end-date" type="date" value={customEndDate} onChange={(e) => setCustomEndDate(e.target.value)} />
                  </div>
                  <div className="flex items-end">
                    <Button
                      onClick={() => handleGenerateReport("custom")}
                      disabled={!customStartDate || !customEndDate || generating === "custom"}
                    >
                      {generating === "custom" ? (
                        <><CircleNotch className="mr-2 h-4 w-4 animate-spin" /> Generating...</>
                      ) : (
                        <><FilePdf className="mr-2 h-4 w-4" /> Generate Custom Report</>
                      )}
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Report Preview Panel */}
        {previewOpen && generatedId && (
          <Card className="border-primary/30 bg-primary/5">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded bg-primary/10">
                    <Eye className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="font-serif text-base">Report Preview</CardTitle>
                    <CardDescription>
                      Annual GHG Inventory FY2024-25 — NovaTech University
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={handleDownload}>
                    <DownloadSimple className="h-4 w-4 mr-1" />
                    Download PDF
                  </Button>
                  <button
                    onClick={() => setPreviewOpen(false)}
                    className="text-muted-foreground hover:text-foreground text-xs px-2 py-1 rounded hover:bg-muted transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-1">
                {previewSections.map(section => (
                  <div key={section.id} className="border border-border rounded bg-card overflow-hidden">
                    <button
                      onClick={() => toggleSection(section.id)}
                      className="w-full flex items-center justify-between px-4 py-3 hover:bg-muted/30 transition-colors text-left"
                    >
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" weight="fill" />
                        <span className="text-sm font-medium text-foreground">{section.title}</span>
                      </div>
                      {expandedSections.has(section.id)
                        ? <CaretUp className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                        : <CaretDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      }
                    </button>
                    {expandedSections.has(section.id) && (
                      <div className="px-4 pb-4 border-t border-border">
                        <pre className="text-xs text-muted-foreground leading-relaxed whitespace-pre-wrap font-sans mt-3">
                          {section.content}
                        </pre>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-3 p-3 bg-muted/30 border border-border rounded">
                <p className="text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground flex items-center gap-1 mb-0.5">
                    <Warning className="w-3.5 h-3.5 text-amber-500" weight="fill" />
                    Demo mode
                  </span>
                  This is a structured preview of the report content. In production, clicking "Download PDF" generates a formatted PDF document including charts, tables, and the organisation's branding.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Report History */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="font-serif">Report History</CardTitle>
            <CardDescription>Previously generated reports and their status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockReports.map((report) => (
                <div
                  key={report.id}
                  className="flex items-center justify-between p-4 border rounded hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded bg-primary/10">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">{report.title}</h4>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <CalendarBlank className="h-3.5 w-3.5" />
                          {report.period}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          Generated {report.generatedAt}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {getStatusBadge(report.status)}
                    <Button
                      variant="outline" size="sm"
                      onClick={() => { setPreviewOpen(true); setGeneratedId('history'); }}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Preview
                    </Button>
                    <Button
                      variant="outline" size="sm"
                      onClick={handleDownload}
                      disabled={report.status !== "complete"}
                    >
                      <DownloadSimple className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
