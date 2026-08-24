import { ChevronLeft, ChevronRight, ClipboardList, Search, Trophy, Users, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import RetentionTable from './components/RetentionTable'
import { RETENTION_ACTION_TYPES } from './retentionData'
import { selectRetentionActions } from './retentionSlice'

const ACTIONS_PER_PAGE = 10

function getMostUsedAction(actions) {
  if (actions.length === 0) return 'None'

  const counts = actions.reduce((result, action) => {
    result[action.actionType] = (result[action.actionType] || 0) + 1
    return result
  }, {})

  return Object.entries(counts).reduce((mostUsed, current) => (
    current[1] > mostUsed[1] ? current : mostUsed
  ))[0]
}

function RetentionPage() {
  const actions = useSelector(selectRetentionActions)
  const [search, setSearch] = useState('')
  const [actionFilter, setActionFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)

  const filteredActions = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase()

    return actions.filter((action) => {
      const matchesSearch = !normalizedSearch
        || action.customerId.toLowerCase().includes(normalizedSearch)
        || action.customerName.toLowerCase().includes(normalizedSearch)
        || action.actionType.toLowerCase().includes(normalizedSearch)
      const matchesAction = actionFilter === 'all' || action.actionType === actionFilter

      return matchesSearch && matchesAction
    })
  }, [actions, search, actionFilter])

  const totalPages = Math.max(1, Math.ceil(filteredActions.length / ACTIONS_PER_PAGE))
  const firstResultIndex = (currentPage - 1) * ACTIONS_PER_PAGE
  const paginatedActions = filteredActions.slice(firstResultIndex, firstResultIndex + ACTIONS_PER_PAGE)
  const firstShown = filteredActions.length === 0 ? 0 : firstResultIndex + 1
  const lastShown = Math.min(firstResultIndex + ACTIONS_PER_PAGE, filteredActions.length)
  const summaryCards = [
    { title: 'Total Actions', value: actions.length.toLocaleString(), icon: ClipboardList },
    { title: 'Customers Contacted', value: new Set(actions.map((action) => action.customerId)).size.toLocaleString(), icon: Users },
    { title: 'Most Used Action', value: getMostUsedAction(actions), icon: Trophy },
  ]
  const hasActiveFilters = search !== '' || actionFilter !== 'all'

  function updateSearch(value) {
    setSearch(value)
    setCurrentPage(1)
  }

  function updateActionFilter(value) {
    setActionFilter(value)
    setCurrentPage(1)
  }

  function clearFilters() {
    setSearch('')
    setActionFilter('all')
    setCurrentPage(1)
  }

  return (
    <section aria-labelledby="retention-title" className="space-y-6">
      <div>
        <h2 id="retention-title" className="text-2xl font-semibold tracking-tight text-slate-950">Retention Actions</h2>
        <p className="mt-1 text-sm leading-6 text-slate-600">Review retention interventions recorded for customer accounts.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {summaryCards.map(({ title, value, icon: Icon }) => (
          <article key={title} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-slate-600">{title}</p>
                <p className={`mt-2 font-semibold tracking-tight text-slate-950 ${title === 'Most Used Action' ? 'text-xl' : 'text-3xl'}`}>{value}</p>
              </div>
              <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                <Icon aria-hidden="true" size={20} />
              </span>
            </div>
          </article>
        ))}
      </div>

      <section aria-label="Retention activity filters" className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <div className="grid gap-4 md:grid-cols-[minmax(18rem,1fr)_18rem_auto] md:items-end">
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">Search</span>
            <span className="relative block">
              <Search className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-slate-400" aria-hidden="true" size={18} />
              <input
                type="search"
                value={search}
                onChange={(event) => updateSearch(event.target.value)}
                placeholder="Search customer or action..."
                className="h-10 w-full rounded-lg border border-slate-300 bg-white pr-3 pl-10 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-100"
              />
            </span>
          </label>

          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">Action Type</span>
            <select
              value={actionFilter}
              onChange={(event) => updateActionFilter(event.target.value)}
              className="h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-700 focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-100"
            >
              <option value="all">All Actions</option>
              {RETENTION_ACTION_TYPES.map((action) => <option key={action} value={action}>{action}</option>)}
            </select>
          </label>

          <button
            type="button"
            onClick={clearFilters}
            disabled={!hasActiveFilters}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-slate-300 px-4 text-sm font-semibold whitespace-nowrap text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-45"
          >
            <X aria-hidden="true" size={17} />
            Clear Filters
          </button>
        </div>
      </section>

      <div className="space-y-3">
        <p className="text-sm text-slate-600">
          Showing <span className="font-semibold text-slate-900">{firstShown}–{lastShown}</span> of{' '}
          <span className="font-semibold text-slate-900">{filteredActions.length}</span> actions
        </p>

        <RetentionTable actions={paginatedActions} />

        {totalPages > 1 && (
          <nav aria-label="Retention activity pagination" className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
            <button
              type="button"
              onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
              disabled={currentPage === 1}
              className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-slate-300 px-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-45"
            >
              <ChevronLeft aria-hidden="true" size={17} />
              Previous
            </button>
            <span className="text-sm font-medium text-slate-600">Page {currentPage} of {totalPages}</span>
            <button
              type="button"
              onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
              disabled={currentPage === totalPages}
              className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-slate-300 px-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-45"
            >
              Next
              <ChevronRight aria-hidden="true" size={17} />
            </button>
          </nav>
        )}
      </div>
    </section>
  )
}

export default RetentionPage
