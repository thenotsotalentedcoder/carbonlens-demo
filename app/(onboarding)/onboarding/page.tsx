"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ArrowRight,
  ArrowLeft,
  Buildings,
  Users,
  MapPin,
  CalendarBlank,
  Check,
  Info,
  CircleNotch,
  Trash,
  Plus,
  TreeStructure,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

type Step = 1 | 2 | 3 | 4 | 5 | 6;

interface Department {
  name: string;
  facility: string;
}

interface OrganisationData {
  name: string;
  country: string;
  city: string;
  type: string;
  baseYear: string;
  fiscalYearStart: string;
  reportingPeriodType: 'annual' | 'quarterly' | 'semester';
  totalStudents: string;
  totalStaff: string;
  campusArea: string;
  facilities: string[];
  departments: Department[];
  scope3Categories: number[];
}

const scope3CategoriesList = [
  { id: 1, name: "Purchased Goods & Services", recommended: true },
  { id: 2, name: "Capital Goods", recommended: false },
  { id: 3, name: "Fuel & Energy Activities", recommended: true },
  { id: 5, name: "Waste Generated", recommended: true },
  { id: 6, name: "Business Travel", recommended: true },
  { id: 7, name: "Employee Commuting", recommended: true },
  { id: 15, name: "Student Commuting", recommended: true },
];

const stepLabels = [
  '1. Organisation',
  '2. Metrics',
  '3. Boundary',
  '4. Scope 3',
  '5. Departments',
  '6. Periods',
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<OrganisationData>({
    name: "",
    country: "Pakistan",
    city: "",
    type: "University",
    baseYear: "2023",
    fiscalYearStart: "July",
    reportingPeriodType: 'annual',
    totalStudents: "",
    totalStaff: "",
    campusArea: "",
    facilities: ["Main Campus"],
    departments: [
      { name: "Faculty of Engineering", facility: "Main Campus" },
      { name: "Faculty of Sciences", facility: "Main Campus" },
      { name: "Administration", facility: "Main Campus" },
      { name: "Research Institute", facility: "Main Campus" },
    ],
    scope3Categories: [1, 3, 5, 6, 7, 15],
  });

  const handleNext = () => { if (step < 6) setStep((step + 1) as Step); };
  const handleBack = () => { if (step > 1) setStep((step - 1) as Step); };

  const handleComplete = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    router.push("/");
  };

  const toggleScope3 = (id: number) => {
    setData(prev => ({
      ...prev,
      scope3Categories: prev.scope3Categories.includes(id)
        ? prev.scope3Categories.filter(x => x !== id)
        : [...prev.scope3Categories, id],
    }));
  };

  const addFacility = () => {
    setData(prev => ({ ...prev, facilities: [...prev.facilities, `Facility ${prev.facilities.length + 1}`] }));
  };
  const updateFacility = (i: number, val: string) => {
    setData(prev => ({ ...prev, facilities: prev.facilities.map((f, idx) => idx === i ? val : f) }));
  };
  const removeFacility = (i: number) => {
    if (data.facilities.length > 1)
      setData(prev => ({ ...prev, facilities: prev.facilities.filter((_, idx) => idx !== i) }));
  };

  const addDepartment = () => {
    setData(prev => ({ ...prev, departments: [...prev.departments, { name: '', facility: prev.facilities[0] ?? 'Main Campus' }] }));
  };
  const updateDept = (i: number, field: keyof Department, val: string) => {
    setData(prev => ({ ...prev, departments: prev.departments.map((d, idx) => idx === i ? { ...d, [field]: val } : d) }));
  };
  const removeDept = (i: number) => {
    setData(prev => ({ ...prev, departments: prev.departments.filter((_, idx) => idx !== i) }));
  };

  const TOTAL_STEPS = 6;

  return (
    <div className="space-y-6">
      {/* Progress indicator */}
      <div className="flex items-center justify-center gap-1 mb-8 flex-wrap">
        {Array.from({ length: TOTAL_STEPS }, (_, i) => i + 1).map((s) => (
          <div key={s} className="flex items-center">
            <div className={cn(
              'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors',
              s < step ? 'bg-primary text-primary-foreground' :
              s === step ? 'bg-primary/10 text-primary border-2 border-primary' :
              'bg-muted text-muted-foreground'
            )}>
              {s < step ? <Check className="h-4 w-4" weight="bold" /> : s}
            </div>
            {s < TOTAL_STEPS && (
              <div className={cn('w-8 h-0.5 mx-0.5', s < step ? 'bg-primary' : 'bg-muted')} />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Organisation Details */}
      {step === 1 && (
        <Card className="border-border">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded bg-primary/10"><Buildings className="h-5 w-5 text-primary" /></div>
              <div>
                <CardTitle className="font-serif">Organisation Details</CardTitle>
                <CardDescription>Tell us about your institution</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="name">Organisation Name</Label>
                <Input id="name" placeholder="e.g., University of Lahore" value={data.name} onChange={e => setData(p => ({ ...p, name: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input id="country" value={data.country} onChange={e => setData(p => ({ ...p, country: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input id="city" placeholder="e.g., Lahore" value={data.city} onChange={e => setData(p => ({ ...p, city: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="baseYear">Base Year</Label>
                <Input id="baseYear" type="number" min="2000" max="2030" value={data.baseYear} onChange={e => setData(p => ({ ...p, baseYear: e.target.value }))} />
                <p className="text-xs text-muted-foreground">Reference year for tracking emission reductions</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="fiscalYear">Fiscal Year Starts</Label>
                <Input id="fiscalYear" placeholder="e.g., July" value={data.fiscalYearStart} onChange={e => setData(p => ({ ...p, fiscalYearStart: e.target.value }))} />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Metrics */}
      {step === 2 && (
        <Card className="border-border">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded bg-primary/10"><Users className="h-5 w-5 text-primary" /></div>
              <div>
                <CardTitle className="font-serif">Organisational Metrics</CardTitle>
                <CardDescription>Data used for intensity calculations</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 bg-primary/5 border border-primary/20 rounded">
              <div className="flex gap-3">
                <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-foreground font-medium">Why we need this</p>
                  <p className="text-sm text-muted-foreground mt-1">These metrics allow us to calculate intensity metrics like tCO2e per student or per square metre, enabling meaningful comparisons with peer institutions.</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="students">Total Students (FTE)</Label>
                <Input id="students" type="number" placeholder="e.g., 15000" value={data.totalStudents} onChange={e => setData(p => ({ ...p, totalStudents: e.target.value }))} />
                <p className="text-xs text-muted-foreground">Full-time equivalent</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="staff">Total Staff (FTE)</Label>
                <Input id="staff" type="number" placeholder="e.g., 2500" value={data.totalStaff} onChange={e => setData(p => ({ ...p, totalStaff: e.target.value }))} />
                <p className="text-xs text-muted-foreground">Academic + administrative</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="area">Campus Area (m²)</Label>
                <Input id="area" type="number" placeholder="e.g., 500000" value={data.campusArea} onChange={e => setData(p => ({ ...p, campusArea: e.target.value }))} />
                <p className="text-xs text-muted-foreground">Total built-up area</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Boundary */}
      {step === 3 && (
        <Card className="border-border">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded bg-primary/10"><MapPin className="h-5 w-5 text-primary" /></div>
              <div>
                <CardTitle className="font-serif">Organisational Boundary</CardTitle>
                <CardDescription>Define which facilities are included in your carbon footprint</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 bg-muted/50 border rounded">
              <p className="text-sm"><strong>Operational Control Approach:</strong> CarbonLens uses the operational control approach. Include all facilities where your organisation has the authority to introduce operating policies.</p>
            </div>
            <div className="space-y-3">
              <Label>Facilities</Label>
              {data.facilities.map((facility, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Input value={facility} onChange={e => updateFacility(i, e.target.value)} placeholder="Facility name" />
                  {data.facilities.length > 1 && (
                    <Button variant="ghost" size="sm" onClick={() => removeFacility(i)} className="text-red-600 hover:text-red-700 hover:bg-red-50">
                      <Trash className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={addFacility}>
                <Plus className="h-4 w-4 mr-1" /> Add Facility
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 4: Scope 3 */}
      {step === 4 && (
        <Card className="border-border">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded bg-primary/10"><CalendarBlank className="h-5 w-5 text-primary" /></div>
              <div>
                <CardTitle className="font-serif">Scope 3 Categories</CardTitle>
                <CardDescription>Select which value chain emissions to track</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 bg-primary/5 border border-primary/20 rounded">
              <div className="flex gap-3">
                <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">University-relevant categories</p>
                  <p className="text-sm text-muted-foreground mt-1">We've pre-selected the Scope 3 categories most relevant for higher education institutions.</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              {scope3CategoriesList.map(cat => (
                <div
                  key={cat.id}
                  className={cn(
                    'flex items-center justify-between p-4 border rounded cursor-pointer transition-colors',
                    data.scope3Categories.includes(cat.id) ? 'border-primary/30 bg-primary/5' : 'hover:bg-muted/50'
                  )}
                  onClick={() => toggleScope3(cat.id)}
                >
                  <div className="flex items-center gap-3">
                    <Checkbox checked={data.scope3Categories.includes(cat.id)} onCheckedChange={() => toggleScope3(cat.id)} />
                    <p className="font-medium">Category {cat.id}: {cat.name}</p>
                  </div>
                  {cat.recommended && <Badge className="bg-primary/10 text-primary border-primary/20">Recommended</Badge>}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 5: Department Hierarchy */}
      {step === 5 && (
        <Card className="border-border">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded bg-primary/10"><TreeStructure className="h-5 w-5 text-primary" /></div>
              <div>
                <CardTitle className="font-serif">Department Hierarchy</CardTitle>
                <CardDescription>Add departments and assign them to campuses/facilities. Used for per-department emission reporting.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-primary/5 border border-primary/20 rounded">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">Optional but recommended:</span> Departments allow you to break down emissions by organisational unit and compare energy efficiency across faculties and offices.
              </p>
            </div>

            <div className="space-y-2">
              <div className="grid grid-cols-[1fr_1fr_auto] gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wide px-1">
                <span>Department Name</span>
                <span>Assigned Facility</span>
                <span />
              </div>
              {data.departments.map((dept, i) => (
                <div key={i} className="grid grid-cols-[1fr_1fr_auto] gap-2 items-center">
                  <Input
                    placeholder="e.g., Faculty of Engineering"
                    value={dept.name}
                    onChange={e => updateDept(i, 'name', e.target.value)}
                  />
                  <select
                    value={dept.facility}
                    onChange={e => updateDept(i, 'facility', e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-input rounded bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    {data.facilities.map(f => <option key={f} value={f}>{f}</option>)}
                  </select>
                  <Button variant="ghost" size="sm" onClick={() => removeDept(i)} className="text-muted-foreground hover:text-red-600">
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            <Button variant="outline" size="sm" onClick={addDepartment}>
              <Plus className="h-4 w-4 mr-1" /> Add Department
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Step 6: Reporting Period Setup */}
      {step === 6 && (
        <Card className="border-border">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded bg-primary/10"><CalendarBlank className="h-5 w-5 text-primary" /></div>
              <div>
                <CardTitle className="font-serif">Reporting Period Configuration</CardTitle>
                <CardDescription>Set your default reporting period type and base year</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label className="text-sm font-medium mb-3 block">Default Period Type</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {([
                  { value: 'annual', label: 'Annual', desc: 'One report per fiscal year. Recommended for GHG Protocol compliance.' },
                  { value: 'quarterly', label: 'Quarterly', desc: 'Four reports per year. Useful for operational monitoring.' },
                  { value: 'semester', label: 'Semester', desc: 'Two reports per year. Common in academic institutions.' },
                ] as const).map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => setData(p => ({ ...p, reportingPeriodType: opt.value }))}
                    className={cn(
                      'text-left p-4 border rounded transition-colors',
                      data.reportingPeriodType === opt.value
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:bg-muted/50'
                    )}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-medium text-sm text-foreground">{opt.label}</p>
                      {data.reportingPeriodType === opt.value && (
                        <Check className="w-4 h-4 text-primary" weight="bold" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{opt.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fiscalStart">Fiscal Year Start Month</Label>
                <select
                  id="fiscalStart"
                  value={data.fiscalYearStart}
                  onChange={e => setData(p => ({ ...p, fiscalYearStart: e.target.value }))}
                  className="w-full px-3 py-2 text-sm border border-input rounded bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  {['January','February','March','April','May','June','July','August','September','October','November','December'].map(m => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="baseYearFinal">Base Year for Reductions</Label>
                <Input
                  id="baseYearFinal"
                  type="number"
                  min="2000"
                  max="2030"
                  value={data.baseYear}
                  onChange={e => setData(p => ({ ...p, baseYear: e.target.value }))}
                />
                <p className="text-xs text-muted-foreground">All year-over-year comparisons will be relative to this year</p>
              </div>
            </div>

            <div className="p-4 border border-primary/20 bg-primary/5 rounded">
              <p className="text-sm font-medium text-foreground mb-1">Your first reporting period</p>
              <p className="text-sm text-muted-foreground">
                Based on your settings, your first active period will be{' '}
                <span className="font-semibold text-foreground">
                  {data.reportingPeriodType === 'annual' ? `Annual FY${data.baseYear}` : data.reportingPeriodType === 'quarterly' ? `Q1 FY${data.baseYear}` : `Semester 1 FY${data.baseYear}`}
                </span>
                {' '}starting in{' '}
                <span className="font-semibold text-foreground">{data.fiscalYearStart}</span>.
                You can manage and create additional periods from the Reporting Periods page.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between pt-4">
        <Button variant="outline" onClick={handleBack} disabled={step === 1}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        {step < 6 ? (
          <Button onClick={handleNext}>
            Continue
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        ) : (
          <Button onClick={handleComplete} disabled={loading}>
            {loading ? (
              <><CircleNotch className="h-4 w-4 mr-2 animate-spin" /> Setting up...</>
            ) : (
              <><Check className="h-4 w-4 mr-2" weight="bold" /> Complete Setup</>
            )}
          </Button>
        )}
      </div>

      {/* Step labels */}
      <div className="flex justify-center gap-4 text-xs text-muted-foreground pt-2 flex-wrap">
        {stepLabels.map((label, i) => (
          <span key={i} className={cn(step === i + 1 && 'text-primary font-medium')}>{label}</span>
        ))}
      </div>
    </div>
  );
}
