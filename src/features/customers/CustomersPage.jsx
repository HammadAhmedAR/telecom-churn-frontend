import { ChevronLeft, ChevronRight, LoaderCircle, TriangleAlert } from 'lucide-react'
import { useEffect, useState } from 'react'
import CustomerFilters from './components/CustomerFilters'
import CustomerTable from './components/CustomerTable'
import { useGetCustomersQuery } from './customersApi'

const CUSTOMERS_PER_PAGE = 10
const SEARCH_DEBOUNCE_MS = 350

function CustomersPage() {
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [riskFilter, setRiskFilter] = useState('all')
  const [contractFilter, setContractFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const timeout = window.setTimeout(() => setDebouncedSearch(search.trim()), SEARCH_DEBOUNCE_MS)
    return () => window.clearTimeout(timeout)
  }, [search])

  const { data, isLoading, isFetching, isError, refetch } = useGetCustomersQuery({
    page: currentPage,
    limit: CUSTOMERS_PER_PAGE,
    search: debouncedSearch || undefined,
    risk: riskFilter === 'all' ? undefined : riskFilter,
    contract: contractFilter === 'all' ? undefined : contractFilter,
  })

  const customers = data?.data ?? []
  const pagination = data?.pagination
  const totalItems = pagination?.totalItems ?? 0
  const totalPages = Math.max(1, pagination?.totalPages ?? 1)
  const firstShown = totalItems === 0 ? 0 : ((pagination?.page ?? currentPage) - 1) * CUSTOMERS_PER_PAGE + 1
  const lastShown = totalItems === 0 ? 0 : Math.min(firstShown + customers.length - 1, totalItems)
  const hasActiveFilters = search !== '' || riskFilter !== 'all' || contractFilter !== 'all'

  function updateFilter(setFilter, value) {
    setFilter(value)
    setCurrentPage(1)
  }

  function clearFilters() {
    setSearch('')
    setDebouncedSearch('')
    setRiskFilter('all')
    setContractFilter('all')
    setCurrentPage(1)
  }

  return (
    <section aria-labelledby="customers-title" className="space-y-6">
      <div>
        <h2 id="customers-title" className="text-2xl font-semibold tracking-tight text-slate-950">Customers</h2>
        <p className="mt-1 text-sm leading-6 text-slate-600">Search customer accounts and review churn risk.</p>
      </div>

      <CustomerFilters
        search={search}
        riskFilter={riskFilter}
        contractFilter={contractFilter}
        hasActiveFilters={hasActiveFilters}
        onSearchChange={(value) => updateFilter(setSearch, value)}
        onRiskChange={(value) => updateFilter(setRiskFilter, value)}
        onContractChange={(value) => updateFilter(setContractFilter, value)}
        onClear={clearFilters}
      />

      {isLoading && (
        <div className="rounded-xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm" role="status">
          <LoaderCircle className="mx-auto animate-spin text-brand-600" aria-hidden="true" size={28} />
          <p className="mt-3 text-sm font-medium text-slate-600">Loading customers...</p>
        </div>
      )}

      {isError && (
        <div className="rounded-xl border border-red-200 bg-white px-6 py-10 text-center shadow-sm" role="alert">
          <TriangleAlert className="mx-auto text-red-600" aria-hidden="true" size={30} />
          <p className="mt-3 font-semibold text-slate-900">Unable to load customers.</p>
          <p className="mt-1 text-sm text-slate-600">Check the server connection and try again.</p>
          <button
            type="button"
            onClick={refetch}
            className="mt-4 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
          >
            Retry
          </button>
        </div>
      )}

      {data && (
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-slate-600">
              Showing <span className="font-semibold text-slate-900">{firstShown}–{lastShown}</span> of{' '}
              <span className="font-semibold text-slate-900">{totalItems.toLocaleString()}</span> customers
            </p>
            <div className="flex items-center gap-3 text-xs text-slate-500">
              {isFetching && (
                <span className="inline-flex items-center gap-1.5" role="status">
                  <LoaderCircle className="animate-spin" aria-hidden="true" size={13} />
                  Updating...
                </span>
              )}
              <span>Risk levels are CRM display categories.</span>
            </div>
          </div>

          <CustomerTable customers={customers} />

          <nav aria-label="Customer list pagination" className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
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
              disabled={currentPage >= totalPages || totalItems === 0 || isFetching}
              className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-slate-300 px-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-45"
            >
              Next
              <ChevronRight aria-hidden="true" size={17} />
            </button>
          </nav>
        </div>
      )}
    </section>
  )
}

export default CustomersPage
