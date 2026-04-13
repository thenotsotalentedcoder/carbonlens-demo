import { Header } from '@/components/layout/header'
import { ScopeDetail } from '@/components/emissions/scope-detail'
import { AuditLog } from '@/components/emissions/audit-log'
import { emissionSummaries } from '@/lib/data/mock-emissions'

export default function Scope1Page() {
  const scopeData = emissionSummaries.find((s) => s.scope === 'scope1')!

  return (
    <div className="min-h-screen">
      <Header
        title="Scope 1 Emissions"
        description="Direct GHG emissions from owned or controlled sources"
      />

      <div className="p-6 space-y-6">
        <ScopeDetail
          scope="scope1"
          scopeName="Scope 1"
          scopeDescription="Direct emissions from stationary combustion (generators, boilers), mobile combustion (owned vehicles), and fugitive emissions (refrigerant leakage, lab gases)"
          totalEmissions={scopeData.totalCO2e}
          percentage={scopeData.percentage}
          categories={scopeData.categories}
          color="#06402B"
        />
        <AuditLog scope="scope1" />
      </div>
    </div>
  )
}
