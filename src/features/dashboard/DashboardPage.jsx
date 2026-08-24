import { Activity, ShieldAlert, Target, Users } from 'lucide-react'
import HighRiskCustomersTable from './components/HighRiskCustomersTable'
import MetricCard from './components/MetricCard'
import RiskDistributionChart from './components/RiskDistributionChart'
import { dashboardMetrics, highRiskCustomers, riskDistribution } from './dashboardData'

const metricIcons = {
  'total-customers': Users,
  'high-risk-customers': ShieldAlert,
  'average-churn-risk': Activity,
  'retention-actions': Target,
}

function DashboardPage() {
  return (
    <section aria-labelledby="dashboard-title" className="space-y-6">
      <div>
        <h2 id="dashboard-title" className="text-2xl font-semibold tracking-tight text-slate-950">
          Dashboard
        </h2>
        <p className="mt-1 text-sm leading-6 text-slate-600">
          Monitor customer churn risk and prioritize retention activity.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardMetrics.map((metric) => (
          <MetricCard key={metric.id} {...metric} icon={metricIcons[metric.id]} />
        ))}
      </div>

      <RiskDistributionChart data={riskDistribution} />
      <HighRiskCustomersTable customers={highRiskCustomers} />
    </section>
  )
}

export default DashboardPage
