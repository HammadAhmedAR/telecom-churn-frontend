import { ClipboardList, LoaderCircle, TriangleAlert } from 'lucide-react'
import { formatDateTime } from '../../../utils/dateFormat'
import { useGetCustomerRetentionActionsQuery } from '../retentionApi'

function formatRole(role) {
  if (!role) return ''
  return role.replaceAll('_', ' ').replace(/\b\w/g, (letter) => letter.toUpperCase())
}

function RetentionHistory({ customerId, limit = 5 }) {
  const { data, isLoading, isError, refetch } = useGetCustomerRetentionActionsQuery({
    customerId,
    page: 1,
    limit,
  })
  const customerActions = data?.data ?? []

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

      {isLoading && (
        <div className="mt-5 flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-8 text-sm text-slate-500" role="status">
          <LoaderCircle className="animate-spin" aria-hidden="true" size={17} />
          Loading retention history...
        </div>
      )}

      {isError && (
        <div className="mt-5 rounded-lg border border-red-200 bg-white px-4 py-6 text-center" role="alert">
          <TriangleAlert className="mx-auto text-red-600" aria-hidden="true" size={24} />
          <p className="mt-2 text-sm font-medium text-slate-800">Unable to load retention history.</p>
          <button type="button" onClick={refetch} className="mt-3 text-sm font-semibold text-brand-700 hover:underline">Retry</button>
        </div>
      )}

      {data && customerActions.length > 0 ? (
        <ol className="mt-5 space-y-3">
          {customerActions.map((action) => (
            <li key={action.id} className="rounded-lg border border-slate-200 bg-white p-4">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="font-semibold text-slate-900">{action.actionType}</p>
                  <p className="mt-1 text-xs text-slate-500">
                    {formatDateTime(action.createdAt)} · Logged by {action.performedBy.name}
                    {action.performedBy.role && ` (${formatRole(action.performedBy.role)})`}
                  </p>
                </div>
                <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                  {action.status}
                </span>
              </div>
              {action.notes && <p className="mt-3 border-t border-slate-100 pt-3 text-sm leading-6 text-slate-600">{action.notes}</p>}
            </li>
          ))}
        </ol>
      ) : data && (
        <p className="mt-5 rounded-lg border border-dashed border-slate-300 bg-white px-4 py-8 text-center text-sm text-slate-500">
          No retention actions have been logged for this customer.
        </p>
      )}
    </section>
  )
}

export default RetentionHistory
