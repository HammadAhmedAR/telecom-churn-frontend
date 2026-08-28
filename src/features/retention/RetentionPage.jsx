import { ChevronLeft, ChevronRight, ClipboardList, LoaderCircle, Search, TriangleAlert, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import RetentionTable from './components/RetentionTable'
import { useGetRetentionActionsQuery } from './retentionApi'
import { RETENTION_ACTION_TYPES } from './retentionConstants'

const ACTIONS_PER_PAGE = 10
const SEARCH_DEBOUNCE_MS = 350

function RetentionPage() {
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [actionFilter, setActionFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const timeout = window.setTimeout(() => setDebouncedSearch(search.trim()), SEARCH_DEBOUNCE_MS)
    return () => window.clearTimeout(timeout)
  }, [search])

  const queryArgs = {
    page: currentPage,
    limit: ACTIONS_PER_PAGE,
    search: debouncedSearch || undefined,
    actionType: actionFilter === 'all' ? undefined : actionFilter,
  }
  const { data, isLoading, isFetching, isError, refetch } = useGetRetentionActionsQuery(queryArgs)
  const { data: summaryData } = useGetRetentionActionsQuery({ page: 1, limit: ACTIONS_PER_PAGE })

  const actions = data?.data ?? []
  const pagination = data?.pagination
  const total = pagination?.total ?? 0
  const totalPages = Math.max(1, pagination?.totalPages ?? 1)
  const firstShown = total === 0 ? 0 : ((pagination?.page ?? currentPage) - 1) * ACTIONS_PER_PAGE + 1
  const lastShown = total === 0 ? 0 : Math.min(firstShown + actions.length - 1, total)
  const totalActions = summaryData?.pagination?.total
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
    setDebouncedSearch('')
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
        <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-slate-600">Total Actions</p>
              <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
                {totalActions === undefined ? 'N/A' : totalActions.toLocaleString()}
              </p>
            </div>
            <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
              <ClipboardList aria-hidden="true" size={20} />
            </span>
          </div>
        </article>
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
                placeholder="Search by Customer ID..."
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

      {isLoading && (
        <div className="rounded-xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm" role="status">
          <LoaderCircle className="mx-auto animate-spin text-brand-600" aria-hidden="true" size={28} />
          <p className="mt-3 text-sm font-medium text-slate-600">Loading retention actions...</p>
        </div>
      )}

      {isError && (
        <div className="rounded-xl border border-red-200 bg-white px-6 py-10 text-center shadow-sm" role="alert">
          <TriangleAlert className="mx-auto text-red-600" aria-hidden="true" size={30} />
          <p className="mt-3 font-semibold text-slate-900">Unable to load retention actions.</p>
          <p className="mt-1 text-sm text-slate-600">Check the server connection and try again.</p>
          <button type="button" onClick={refetch} className="mt-4 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700">
            Retry
          </button>
        </div>
      )}

      {data && (
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-slate-600">
              Showing <span className="font-semibold text-slate-900">{firstShown}–{lastShown}</span> of{' '}
              <span className="font-semibold text-slate-900">{total.toLocaleString()}</span> actions
            </p>
            {isFetching && (
              <span className="inline-flex items-center gap-1.5 text-xs text-slate-500" role="status">
                <LoaderCircle className="animate-spin" aria-hidden="true" size={13} />
                Updating...
              </span>
            )}
          </div>

          <RetentionTable actions={actions} />

          {totalPages > 1 && (
            <nav aria-label="Retention activity pagination" className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
              <button
                type="button"
                onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                disabled={currentPage === 1 || isFetching}
                className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-slate-300 px-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-45"
              >
                <ChevronLeft aria-hidden="true" size={17} />
                Previous
              </button>
              <span className="text-sm font-medium text-slate-600">Page {pagination.page} of {totalPages}</span>
              <button
                type="button"
                onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                disabled={currentPage >= totalPages || isFetching}
                className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-slate-300 px-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-45"
              >
                Next
                <ChevronRight aria-hidden="true" size={17} />
              </button>
            </nav>
          )}
        </div>
      )}
    </section>
  )
}

export default RetentionPage
