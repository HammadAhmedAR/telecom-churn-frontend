import { ClipboardList } from 'lucide-react'
import { useSelector } from 'react-redux'
import { formatDateTime } from '../../../utils/dateFormat'
import { selectRetentionActions } from '../retentionSlice'

function RetentionHistory({ customerId, limit = 5 }) {
  const actions = useSelector(selectRetentionActions)
  const customerActions = actions.filter((action) => action.customerId === customerId).slice(0, limit)

  return (
    <section className="rounded-xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
      <div className="flex items-center gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-white text-brand-700 shadow-sm">
          <ClipboardList aria-hidden="true" size={20} />
        </span>
        <div>
          <h4 className="font-semibold text-slate-900">Recent Retention Activity</h4>
          <p className="mt-1 text-sm text-slate-600">Latest interventions recorded for this customer.</p>
        </div>
      </div>

      {customerActions.length > 0 ? (
        <ol className="mt-5 space-y-3">
          {customerActions.map((action) => (
            <li key={action.id} className="rounded-lg border border-slate-200 bg-white p-4">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="font-semibold text-slate-900">{action.actionType}</p>
                  <p className="mt-1 text-xs text-slate-500">{formatDateTime(action.createdAt)} · Logged by {action.performedBy}</p>
                </div>
                <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                  {action.status}
                </span>
              </div>
              {action.notes && <p className="mt-3 border-t border-slate-100 pt-3 text-sm leading-6 text-slate-600">{action.notes}</p>}
            </li>
          ))}
        </ol>
      ) : (
        <p className="mt-5 rounded-lg border border-dashed border-slate-300 bg-white px-4 py-8 text-center text-sm text-slate-500">
          No retention actions have been logged for this customer.
        </p>
      )}
    </section>
  )
}

export default RetentionHistory
