import { CalendarDays, CreditCard, FileText, Wifi } from 'lucide-react'

const overviewItems = [
  { key: 'tenure', label: 'Tenure', icon: CalendarDays, format: (value) => `${value} ${value === 1 ? 'month' : 'months'}` },
  { key: 'contract', label: 'Contract', icon: FileText },
  { key: 'monthlyCharges', label: 'Monthly charges', icon: CreditCard, format: (value) => `$${value.toFixed(2)}` },
  { key: 'internetService', label: 'Internet service', icon: Wifi },
]

function CustomerOverview({ customer }) {
  return (
    <section aria-labelledby="overview-title" className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <h3 id="overview-title" className="text-base font-semibold text-slate-900">Customer Overview</h3>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {overviewItems.map(({ key, label, icon: Icon, format }) => (
          <div key={key} className="flex items-start gap-3 rounded-lg bg-slate-50 p-4">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white text-brand-700 shadow-sm">
              <Icon aria-hidden="true" size={18} />
            </span>
            <div className="min-w-0">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</p>
              <p className="mt-1 truncate text-sm font-semibold text-slate-900">
                {format ? format(customer[key]) : customer[key]}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default CustomerOverview
