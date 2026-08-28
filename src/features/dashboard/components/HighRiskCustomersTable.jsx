import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import RiskBadge from '../../../components/ui/RiskBadge'

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

function formatCurrency(value) {
  return Number.isFinite(Number(value)) ? currencyFormatter.format(Number(value)) : 'N/A'
}

function HighRiskCustomersTable({ customers }) {
  return (
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-col gap-1 border-b border-slate-200 px-5 py-5 sm:px-6">
        <h3 className="text-base font-semibold text-slate-900">High Risk Customers</h3>
        <p className="text-sm text-slate-500">Prioritized customers with a displayed churn risk of 70% or higher.</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-4xl text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th scope="col" className="px-6 py-3 font-semibold">Customer ID</th>
              <th scope="col" className="px-6 py-3 font-semibold">Contract</th>
              <th scope="col" className="px-6 py-3 font-semibold">Internet Service</th>
              <th scope="col" className="px-6 py-3 text-right font-semibold">Tenure</th>
              <th scope="col" className="px-6 py-3 text-right font-semibold">Monthly Charges</th>
              <th scope="col" className="px-6 py-3 text-center font-semibold">Churn Risk</th>
              <th scope="col" className="px-6 py-3 text-right font-semibold">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {customers.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-10 text-center text-slate-500">
                  No high-risk customers available.
                </td>
              </tr>
            ) : customers.map((customer) => (
              <tr key={customer.customerId} className="hover:bg-slate-50/70">
                <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-slate-900">
                  <span className="font-mono text-xs">{customer.customerId}</span>
                </th>
                <td className="whitespace-nowrap px-6 py-4 text-slate-600">{customer.contract}</td>
                <td className="whitespace-nowrap px-6 py-4 text-slate-600">{customer.internetService}</td>
                <td className="whitespace-nowrap px-6 py-4 text-right text-slate-600">
                  {Number.isFinite(Number(customer.tenure)) ? `${Number(customer.tenure)} months` : 'N/A'}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right font-medium text-slate-700">
                  {formatCurrency(customer.monthlyCharges)}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-center">
                  <RiskBadge risk={customer.churnRisk} />
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right">
                  <Link
                    to={`/customers/${customer.customerId}`}
                    className="inline-flex items-center gap-1.5 rounded-md px-2 py-1.5 font-semibold text-brand-700 hover:bg-brand-50"
                  >
                    View Profile
                    <ArrowUpRight aria-hidden="true" size={15} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default HighRiskCustomersTable
