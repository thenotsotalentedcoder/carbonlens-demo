import { Header } from '@/components/layout/header'
import { ScopeDetail } from '@/components/emissions/scope-detail'
import { AuditLog } from '@/components/emissions/audit-log'
import { emissionSummaries } from '@/lib/data/mock-emissions'

export default function Scope2Page() {
  const scopeData = emissionSummaries.find((s) => s.scope === 'scope2')!

  return (
    <div className="min-h-screen">
      <Header
        title="Scope 2 Emissions"
        description="Indirect GHG emissions from purchased energy"
      />

      <div className="p-6 space-y-6">
        <ScopeDetail
          scope="scope2"
          scopeName="Scope 2"
          scopeDescription="Indirect emissions from purchased electricity (grid power) and purchased cooling (district cooling systems). Reported using location-based method with Pakistan grid emission factor of 0.51 kgCO2e/kWh."
          totalEmissions={scopeData.totalCO2e}
          percentage={scopeData.percentage}
          categories={scopeData.categories}
          color="#0A5C3E"
        />
        <AuditLog scope="scope2" />
      </div>
    </div>
  )
}
