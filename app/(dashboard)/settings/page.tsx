"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Buildings,
  Users,
  Bell,
  Shield,
  Database,
  Check,
  Plus,
  Trash,
  Envelope,
  PencilSimple,
  Flask,
  ArrowClockwise,
  Warning,
  Info,
  CaretDown,
  CaretUp,
} from "@phosphor-icons/react";
import { mockOrganisation } from "@/lib/data/mock-organisation";
import { emissionFactors } from "@/lib/data/mock-emission-factors";
import { cn } from "@/lib/utils";
import type { EmissionFactor } from "@/lib/types";

type ScopeFilter = 'all' | 'scope1' | 'scope2' | 'scope3';

const scopeForCategory: Record<string, 'scope1' | 'scope2' | 'scope3'> = {
  'cat-s1-01': 'scope1', 'cat-s1-02': 'scope1', 'cat-s1-03': 'scope1',
  'cat-s2-01': 'scope2', 'cat-s2-02': 'scope2',
  'cat-s3-01': 'scope3', 'cat-s3-02': 'scope3', 'cat-s3-03': 'scope3',
  'cat-s3-04': 'scope3', 'cat-s3-05': 'scope3', 'cat-s3-06': 'scope3', 'cat-s3-07': 'scope3',
};

const scopeLabel: Record<string, string> = {
  'cat-s1-01': 'Stationary Combustion', 'cat-s1-02': 'Mobile Combustion', 'cat-s1-03': 'Fugitive Emissions',
  'cat-s2-01': 'Purchased Electricity', 'cat-s2-02': 'Purchased Cooling',
  'cat-s3-01': 'Purchased Goods', 'cat-s3-02': 'Capital Goods', 'cat-s3-03': 'Fuel & Energy',
  'cat-s3-04': 'Waste', 'cat-s3-05': 'Business Travel', 'cat-s3-06': 'Employee Commuting', 'cat-s3-07': 'Student Commuting',
};

function VersionHistory({ factor }: { factor: EmissionFactor }) {
  const [expanded, setExpanded] = useState(false);
  if (!factor.previousValue && !factor.previousVersion) return null;
  return (
    <div className="mt-1">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-1 text-[10px] text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowClockwise className="w-3 h-3" />
        Version history
        {expanded ? <CaretUp className="w-2.5 h-2.5" /> : <CaretDown className="w-2.5 h-2.5" />}
      </button>
      {expanded && (
        <div className="mt-1.5 pl-2 border-l-2 border-border space-y-0.5">
          <p className="text-[10px] text-muted-foreground">
            <span className="font-medium">Current:</span> {factor.version} — {factor.value} {factor.unit} ({factor.sourceYear})
          </p>
          {factor.previousValue && (
            <p className="text-[10px] text-muted-foreground">
              <span className="font-medium">Previous:</span> {factor.previousVersion} — {factor.previousValue} {factor.unit}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    weeklyDigest: true,
    anomalyAlerts: true,
    reportReady: true,
    dataReminders: false,
  });
  const [scopeFilter, setScopeFilter] = useState<ScopeFilter>('all');
  const [efSearch, setEfSearch] = useState('');

  const filteredFactors = emissionFactors.filter(f => {
    const scope = scopeForCategory[f.categoryId ?? ''];
    const matchesScope = scopeFilter === 'all' || scope === scopeFilter;
    const matchesSearch = !efSearch || f.name.toLowerCase().includes(efSearch.toLowerCase()) || f.source.toLowerCase().includes(efSearch.toLowerCase());
    return matchesScope && matchesSearch;
  });

  return (
    <div className="min-h-screen">
      <Header
        title="Settings"
        description="Manage organisation settings, users, emission factors, and preferences"
      />

      <div className="p-6">
        <Tabs defaultValue="organisation" className="space-y-6">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="organisation">Organisation</TabsTrigger>
            <TabsTrigger value="users">Users & Roles</TabsTrigger>
            <TabsTrigger value="emission-factors">Emission Factors</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="data">Data Management</TabsTrigger>
          </TabsList>

          {/* Organisation Tab */}
          <TabsContent value="organisation" className="space-y-6">
            <Card className="border-border">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded bg-primary/10">
                    <Buildings className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="font-serif">Organisation Profile</CardTitle>
                    <CardDescription>Basic information about your institution</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="org-name">Organisation Name</Label>
                    <Input id="org-name" defaultValue={mockOrganisation.name} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="org-type">Organisation Type</Label>
                    <Input id="org-type" defaultValue="Higher Education Institution" disabled />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input id="country" defaultValue={mockOrganisation.country} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" defaultValue={mockOrganisation.city} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fiscal-year">Fiscal Year Start</Label>
                    <Input id="fiscal-year" defaultValue="July" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="base-year">Base Year</Label>
                    <Input id="base-year" defaultValue="2022" />
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium mb-3">Organisational Metrics</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="students">Total Students</Label>
                      <Input id="students" type="number" defaultValue={mockOrganisation.totalStudents} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="staff">Total Staff</Label>
                      <Input id="staff" type="number" defaultValue={mockOrganisation.totalStaff} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="area">Campus Area (m²)</Label>
                      <Input id="area" type="number" defaultValue={mockOrganisation.campusArea} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="buildings">Total Buildings</Label>
                      <Input id="buildings" type="number" defaultValue={mockOrganisation.facilities.length} />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button>Save Changes</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="font-serif">Facilities</CardTitle>
                <CardDescription>Manage campus facilities included in the organisational boundary</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-4">
                  {mockOrganisation.facilities.map((facility) => (
                    <div key={facility.id} className="flex items-center justify-between p-3 border rounded">
                      <div>
                        <p className="font-medium">{facility.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {facility.type} | {facility.areaSqm.toLocaleString()} m²
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <PencilSimple className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Facility
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <Card className="border-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded bg-primary/10">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="font-serif">Team Members</CardTitle>
                      <CardDescription>Manage users and their access levels</CardDescription>
                    </div>
                  </div>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Invite User
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: "Dr. Fatima Khan", email: "fatima.khan@novatech.edu.pk", role: "Admin", status: "Active" },
                    { name: "Ahmad Raza", email: "ahmad.raza@novatech.edu.pk", role: "Analyst", status: "Active" },
                    { name: "Sarah Ahmed", email: "sarah.ahmed@novatech.edu.pk", role: "Viewer", status: "Active" },
                    { name: "Hassan Ali", email: "hassan.ali@novatech.edu.pk", role: "Data Entry", status: "Pending" },
                  ].map((user) => (
                    <div key={user.email} className="flex items-center justify-between p-4 border rounded">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-sm font-medium text-primary">
                            {user.name.split(" ").map(n => n[0]).join("")}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge
                          variant="outline"
                          className={user.role === "Admin" ? "border-primary/30 text-primary bg-primary/10" : ""}
                        >
                          {user.role}
                        </Badge>
                        <Badge
                          variant="outline"
                          className={
                            user.status === "Active"
                              ? "border-green-300 text-green-700 bg-green-50"
                              : "border-amber-300 text-amber-700 bg-amber-50"
                          }
                        >
                          {user.status}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <PencilSimple className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded bg-primary/10">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="font-serif">Role Permissions</CardTitle>
                    <CardDescription>Access levels for different user roles</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 font-medium">Permission</th>
                        <th className="text-center py-3 font-medium">Admin</th>
                        <th className="text-center py-3 font-medium">Analyst</th>
                        <th className="text-center py-3 font-medium">Data Entry</th>
                        <th className="text-center py-3 font-medium">Viewer</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { perm: "View Dashboard", admin: true, analyst: true, entry: true, viewer: true },
                        { perm: "Enter Data", admin: true, analyst: true, entry: true, viewer: false },
                        { perm: "Upload Documents", admin: true, analyst: true, entry: true, viewer: false },
                        { perm: "Generate Reports", admin: true, analyst: true, entry: false, viewer: false },
                        { perm: "Manage Users", admin: true, analyst: false, entry: false, viewer: false },
                        { perm: "Edit Settings", admin: true, analyst: false, entry: false, viewer: false },
                        { perm: "Delete Data", admin: true, analyst: false, entry: false, viewer: false },
                      ].map((row) => (
                        <tr key={row.perm} className="border-b border-border">
                          <td className="py-3">{row.perm}</td>
                          {[row.admin, row.analyst, row.entry, row.viewer].map((val, i) => (
                            <td key={i} className="text-center py-3">
                              {val && <Check className="h-4 w-4 text-primary mx-auto" />}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
                    <Flask className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="font-serif">Emission Factor Database</CardTitle>
                    <CardDescription>
                      All emission factors used in calculations. Read-only — factors are updated when new source versions are published.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Filters */}
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <div className="flex items-center gap-1 bg-muted rounded p-1">
                    {(['all', 'scope1', 'scope2', 'scope3'] as ScopeFilter[]).map(s => (
                      <button
                        key={s}
                        onClick={() => setScopeFilter(s)}
                        className={cn(
                          'px-3 py-1 text-xs rounded font-medium transition-colors capitalize',
                          scopeFilter === s ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                        )}
                      >
                        {s === 'all' ? 'All' : s.replace('scope', 'Scope ')}
                      </button>
                    ))}
                  </div>
                  <Input
                    placeholder="Search factors..."
                    value={efSearch}
                    onChange={e => setEfSearch(e.target.value)}
                    className="w-56 h-8 text-sm"
                  />
                  <span className="text-xs text-muted-foreground ml-auto">{filteredFactors.length} factors</span>
                </div>

                {/* Table */}
                <div className="overflow-x-auto border border-border rounded">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-muted/50 border-b border-border">
                        <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Factor Name</th>
                        <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Category</th>
                        <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">GHG Type</th>
                        <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Value</th>
                        <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Unit</th>
                        <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Source</th>
                        <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Geography</th>
                        <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Uncertainty</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {filteredFactors.map(factor => {
                        const scope = scopeForCategory[factor.categoryId ?? ''];
                        const scopeColors = {
                          scope1: 'bg-chart-1 text-white',
                          scope2: 'bg-chart-2 text-white',
                          scope3: 'bg-chart-3 text-white',
                        };
                        return (
                          <tr key={factor.id} className="hover:bg-muted/30 transition-colors">
                            <td className="px-4 py-3">
                              <div>
                                <p className="font-medium text-foreground text-sm">{factor.name}</p>
                                <VersionHistory factor={factor} />
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex flex-col gap-1">
                                {scope && (
                                  <span className={cn('text-[10px] font-bold px-1.5 py-0.5 rounded w-fit', scopeColors[scope])}>
                                    {scope.replace('scope', 'S')}
                                  </span>
                                )}
                                <span className="text-xs text-muted-foreground">{scopeLabel[factor.categoryId ?? ''] ?? factor.categoryId}</span>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <span className="text-xs bg-muted px-2 py-0.5 rounded border border-border">{factor.ghgType ?? '—'}</span>
                            </td>
                            <td className="px-4 py-3 text-right font-mono text-sm font-semibold text-foreground">
                              {factor.value}
                            </td>
                            <td className="px-4 py-3 text-xs text-muted-foreground">{factor.unit}</td>
                            <td className="px-4 py-3">
                              <div>
                                <p className="text-xs font-medium text-foreground">{factor.source}</p>
                                <p className="text-[10px] text-muted-foreground">{factor.sourceYear}</p>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-xs text-muted-foreground">{factor.geography ?? factor.region ?? '—'}</td>
                            <td className="px-4 py-3 text-right">
                              <span className={cn(
                                'text-xs font-medium',
                                (factor.uncertainty ?? 0) <= 0.05 ? 'text-green-600' :
                                (factor.uncertainty ?? 0) <= 0.15 ? 'text-amber-600' :
                                'text-red-600'
                              )}>
                                ±{((factor.uncertainty ?? 0) * 100).toFixed(0)}%
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <div className="mt-4 p-3 bg-muted/30 border border-border rounded text-xs text-muted-foreground leading-relaxed">
                  <span className="font-semibold text-foreground">Note:</span> All emission factors are sourced from IPCC AR6 (2021), IEA 2024, NEPRA 2024, and DEFRA 2023 — the most current available data for Pakistan. Factors are applied deterministically; no AI model modifies or approximates these values. Contact your CarbonLens administrator to request factor updates.
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <Card className="border-border">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded bg-primary/10">
                    <Bell className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="font-serif">Notification Preferences</CardTitle>
                    <CardDescription>Configure how and when you receive updates</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { key: 'weeklyDigest' as const, icon: Envelope, title: 'Weekly Digest', desc: 'Receive a weekly summary of emissions data and insights' },
                  { key: 'anomalyAlerts' as const, icon: Warning, title: 'Anomaly Alerts', desc: 'Get notified when unusual emission patterns are detected' },
                  { key: 'reportReady' as const, icon: Check, title: 'Report Ready', desc: 'Notification when a report has finished generating' },
                  { key: 'dataReminders' as const, icon: Database, title: 'Data Entry Reminders', desc: 'Monthly reminders to update activity data' },
                ].map(({ key, icon: Icon, title, desc }) => (
                  <div key={key} className="flex items-center justify-between p-4 border rounded">
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{title}</p>
                        <p className="text-sm text-muted-foreground">{desc}</p>
                      </div>
                    </div>
                    <Switch
                      checked={notifications[key]}
                      onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, [key]: checked }))}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Data Management Tab */}
          <TabsContent value="data" className="space-y-6">
            <Card className="border-border">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded bg-primary/10">
                    <Database className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="font-serif">Data Management</CardTitle>
                    <CardDescription>Export, import, and manage your emissions data</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded">
                    <h4 className="font-medium mb-2">Export Data</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Download all your emissions data in CSV or Excel format
                    </p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Export CSV</Button>
                      <Button variant="outline" size="sm">Export Excel</Button>
                    </div>
                  </div>
                  <div className="p-4 border rounded">
                    <h4 className="font-medium mb-2">Import Data</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Bulk import activity data from spreadsheets
                    </p>
                    <Button variant="outline" size="sm">Import from File</Button>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium mb-3 text-red-600">Danger Zone</h4>
                  <div className="p-4 border border-red-200 rounded bg-red-50/50">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-red-800">Delete All Data</p>
                        <p className="text-sm text-red-600">
                          Permanently delete all emissions data. This action cannot be undone.
                        </p>
                      </div>
                      <Button variant="outline" className="border-red-300 text-red-700 hover:bg-red-100">
                        Delete All Data
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
