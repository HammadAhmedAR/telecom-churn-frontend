import { Activity, AlertCircle, LoaderCircle, ShieldAlert, Target, Users } from 'lucide-react'
import HighRiskCustomersTable from './components/HighRiskCustomersTable'
import MetricCard from './components/MetricCard'
import RiskDistributionChart from './components/RiskDistributionChart'
import { useGetDashboardSummaryQuery } from './dashboardApi'

const metricIcons = {
  'total-customers': Users,
  'high-risk-customers': ShieldAlert,
  'average-churn-risk': Activity,
  'retention-actions': Target,
}

function formatCount(value) {
  return Number.isFinite(Number(value)) ? Number(value).toLocaleString() : 'N/A'
}

function formatAverageRisk(value) {
  if (value === null || value === undefined || !Number.isFinite(Number(value))) return 'N/A'
  return `${(Number(value) * 100).toFixed(1)}%`
}

function DashboardLoadingState() {
  return (
    <div className="space-y-6" role="status" aria-label="Loading dashboard">
      <p className="text-sm text-slate-600">Loading dashboard...</p>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }, (_, index) => (
          <div key={index} className="h-32 animate-pulse rounded-xl border border-slate-200 bg-white shadow-sm" />
        ))}
      </div>
      <div className="h-96 animate-pulse rounded-xl border border-slate-200 bg-white shadow-sm" />
      <div className="h-72 animate-pulse rounded-xl border border-slate-200 bg-white shadow-sm" />
    </div>
  )
}

function DashboardPage() {
  const { data, isLoading, isFetching, isError, refetch } = useGetDashboardSummaryQuery()

  const dashboardMetrics = data ? [
    {
      id: 'total-customers',
      title: 'Total Customers',
      value: formatCount(data.totalCustomers),
      supportingText: 'Active customer records',
    },
    {
      id: 'high-risk-customers',
      title: 'High Risk Customers',
      value: formatCount(data.highRiskCustomers),
      supportingText: 'Require retention attention',
      tone: 'danger',
    },
    {
      id: 'average-churn-risk',
      title: 'Average Churn Risk',
      value: formatAverageRisk(data.averageChurnRisk),
      supportingText: 'Across the customer base',
    },
    {
      id: 'retention-actions',
      title: 'Retention Actions',
      value: formatCount(data.retentionActions),
      supportingText: 'Recorded retention activity',
    },
  ] : []

  const riskDistribution = [
    { name: 'Low Risk', value: Number(data?.riskDistribution?.low) || 0, level: 'low' },
    { name: 'Medium Risk', value: Number(data?.riskDistribution?.medium) || 0, level: 'medium' },
    { name: 'High Risk', value: Number(data?.riskDistribution?.high) || 0, level: 'high' },
  ]

  return (
    <section aria-labelledby="dashboard-title" className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 id="dashboard-title" className="text-2xl font-semibold tracking-tight text-slate-950">
            Dashboard
          </h2>
          <p className="mt-1 text-sm leading-6 text-slate-600">
            Monitor customer churn risk and prioritize retention activity.
          </p>
        </div>
        {isFetching && !isLoading && (
          <span className="inline-flex items-center gap-1.5 text-xs text-slate-500" role="status">
            <LoaderCircle className="animate-spin" aria-hidden="true" size={14} />
            Refreshing...
          </span>
        )}
      </div>

      {isLoading && <DashboardLoadingState />}

      {isError && !data && (
        <div className="rounded-xl border border-red-200 bg-white p-6 shadow-sm" role="alert">
          <div className="flex items-start gap-3">
            <AlertCircle className="mt-0.5 shrink-0 text-red-600" aria-hidden="true" size={20} />
            <div>
              <h3 className="font-semibold text-slate-900">Unable to load dashboard data.</h3>
              <p className="mt-1 text-sm text-slate-600">Check the server connection and try again.</p>
              <button
                type="button"
                onClick={refetch}
                className="mt-4 rounded-md bg-brand-600 px-3 py-2 text-sm font-semibold text-white hover:bg-brand-700"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      )}

      {data && (
        <>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {dashboardMetrics.map((metric) => (
              <MetricCard key={metric.id} {...metric} icon={metricIcons[metric.id]} />
            ))}
          </div>

          <RiskDistributionChart data={riskDistribution} />
          <HighRiskCustomersTable customers={data.highRiskQueue ?? []} />
        </>
      )}
    </section>
  )
}

export default DashboardPage
