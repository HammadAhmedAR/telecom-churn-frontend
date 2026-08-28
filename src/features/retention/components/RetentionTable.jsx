import { ArrowUpRight, ClipboardX } from 'lucide-react'
import { Link } from 'react-router-dom'
import { formatDate } from '../../../utils/dateFormat'

function RetentionTable({ actions }) {
  function formatRole(role) {
    if (!role) return ''
    return role.replaceAll('_', ' ').replace(/\b\w/g, (letter) => letter.toUpperCase())
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-5xl text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th scope="col" className="px-6 py-3 font-semibold">Customer ID</th>
              <th scope="col" className="px-6 py-3 font-semibold">Action</th>
              <th scope="col" className="px-6 py-3 font-semibold">Performed By</th>
              <th scope="col" className="px-6 py-3 font-semibold">Date</th>
              <th scope="col" className="px-6 py-3 text-center font-semibold">Status</th>
              <th scope="col" className="px-6 py-3 text-right font-semibold">View</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {actions.length > 0 ? actions.map((action) => (
              <tr key={action.id} className="hover:bg-slate-50/70">
                <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-slate-900">
                  <span className="font-mono text-xs">{action.customerId}</span>
                </th>
                <td className="px-6 py-4 font-medium text-slate-700">{action.actionType}</td>
                <td className="whitespace-nowrap px-6 py-4 text-slate-600">
                  <span className="block font-medium text-slate-700">{action.performedBy.name}</span>
                  {action.performedBy.role && <span className="mt-0.5 block text-xs">{formatRole(action.performedBy.role)}</span>}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-slate-600">{formatDate(action.createdAt)}</td>
                <td className="whitespace-nowrap px-6 py-4 text-center">
                  <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">{action.status}</span>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right">
                  <Link to={`/customers/${action.customerId}`} className="inline-flex items-center gap-1.5 rounded-md px-2 py-1.5 font-semibold text-brand-700 hover:bg-brand-50">
                    View Customer
                    <ArrowUpRight aria-hidden="true" size={15} />
                  </Link>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="6" className="px-6 py-14 text-center">
                  <ClipboardX className="mx-auto text-slate-400" aria-hidden="true" size={32} />
                  <p className="mt-3 font-semibold text-slate-800">No retention actions found.</p>
                  <p className="mt-1 text-sm text-slate-500">Try changing your search or action filter.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default RetentionTable
