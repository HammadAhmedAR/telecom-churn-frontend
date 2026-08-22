import { Users } from 'lucide-react'
import PagePlaceholder from '../../components/ui/PagePlaceholder'

function CustomersPage() {
  return (
    <PagePlaceholder
      title="Customers"
      description="Customer records and churn risk information will be managed here."
    >
      <div className="flex items-center gap-3 text-slate-500">
        <Users aria-hidden="true" size={22} />
        <p className="text-sm">The customer directory will be added in a later stage.</p>
      </div>
    </PagePlaceholder>
  )
}

export default CustomersPage
