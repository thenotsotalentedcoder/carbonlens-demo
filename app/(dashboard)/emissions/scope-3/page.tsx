import { Header } from '@/components/layout/header'
import { ScopeDetail } from '@/components/emissions/scope-detail'
import { AuditLog } from '@/components/emissions/audit-log'
import { emissionSummaries } from '@/lib/data/mock-emissions'

export default function Scope3Page() {
  const scopeData = emissionSummaries.find((s) => s.scope === 'scope3')!

  return (
    <div className="min-h-screen">
      <Header
        title="Scope 3 Emissions"
        description="Indirect GHG emissions from the value chain"
      />

      <div className="p-6 space-y-6">
        <ScopeDetail
          scope="scope3"
          scopeName="Scope 3"
          scopeDescription="Value chain emissions including purchased goods and services, capital goods, fuel and energy-related activities, waste disposal, business travel, and commuting (staff and students)."
          totalEmissions={scopeData.totalCO2e}
          percentage={scopeData.percentage}
          categories={scopeData.categories}
          color="#0E7A52"
        />
        <AuditLog scope="scope3" />
      </div>
    </div>
  )
}
