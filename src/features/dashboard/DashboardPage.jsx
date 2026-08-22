import { LayoutDashboard } from 'lucide-react'
import PagePlaceholder from '../../components/ui/PagePlaceholder'

function DashboardPage() {
  return (
    <PagePlaceholder
      title="Dashboard"
      description="CRM overview and churn analytics will appear here."
    >
      <div className="flex items-center gap-3 text-slate-500">
        <LayoutDashboard aria-hidden="true" size={22} />
        <p className="text-sm">Dashboard modules will be added in a later stage.</p>
      </div>
    </PagePlaceholder>
  )
}

export default DashboardPage
