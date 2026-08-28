import { CheckCircle2, ClipboardPlus } from 'lucide-react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { RETENTION_ACTION_TYPES } from '../retentionData'
import { retentionActionLogged } from '../retentionSlice'

const NOTES_LIMIT = 500

function RetentionActionForm({ customer }) {
  const dispatch = useDispatch()
  const [actionType, setActionType] = useState('')
  const [notes, setNotes] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()
    if (!actionType) return

    dispatch(retentionActionLogged({
      customerId: customer.customerId,
      customerName: customer.customerId,
      actionType,
      notes: notes.trim(),
    }))
    setActionType('')
    setNotes('')
    setShowSuccess(true)
  }

  function updateActionType(value) {
    setActionType(value)
    setShowSuccess(false)
  }

  function updateNotes(value) {
    setNotes(value)
    setShowSuccess(false)
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
      <div className="flex items-start gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-white text-brand-700 shadow-sm">
          <ClipboardPlus aria-hidden="true" size={20} />
        </span>
        <div>
          <h4 className="font-semibold text-slate-900">Log an Intervention</h4>
          <p className="mt-1 text-sm text-slate-600">This records an operational decision without changing customer or prediction data.</p>
        </div>
      </div>

      {showSuccess && (
        <div className="mt-4 flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2.5 text-sm font-medium text-emerald-700" role="status">
          <CheckCircle2 aria-hidden="true" size={18} />
          Retention action logged successfully.
        </div>
      )}

      <div className="mt-5 space-y-4">
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-slate-800">Action Type</span>
          <select
            value={actionType}
            onChange={(event) => updateActionType(event.target.value)}
            className="h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-800 focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-100"
          >
            <option value="">Select retention action...</option>
            {RETENTION_ACTION_TYPES.map((action) => <option key={action} value={action}>{action}</option>)}
          </select>
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-slate-800">Notes <span className="font-normal text-slate-500">(optional)</span></span>
          <textarea
            value={notes}
            onChange={(event) => updateNotes(event.target.value)}
            maxLength={NOTES_LIMIT}
            rows="4"
            placeholder="Add notes about this retention decision..."
            className="w-full resize-y rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-100"
          />
          <span className="mt-1 block text-right text-xs text-slate-400">{notes.length}/{NOTES_LIMIT}</span>
        </label>
      </div>

      <button
        type="submit"
        disabled={!actionType}
        className="mt-4 inline-flex h-10 items-center justify-center rounded-lg bg-brand-600 px-4 text-sm font-semibold text-white hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-slate-300"
      >
        Log Retention Action
      </button>
    </form>
  )
}

export default RetentionActionForm
