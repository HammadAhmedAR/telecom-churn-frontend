import { useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { getRiskLevel } from '../../utils/riskLevel'
import CustomerFilters from './components/CustomerFilters'
import CustomerTable from './components/CustomerTable'
import { customers } from './customerData'

const CUSTOMERS_PER_PAGE = 10

function CustomersPage() {
  const [search, setSearch] = useState('')
  const [riskFilter, setRiskFilter] = useState('all')
  const [contractFilter, setContractFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)

  const filteredCustomers = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase()

    return customers.filter((customer) => {
      const matchesSearch = !normalizedSearch
        || customer.customerId.toLowerCase().includes(normalizedSearch)
        || customer.name.toLowerCase().includes(normalizedSearch)
      const matchesRisk = riskFilter === 'all' || getRiskLevel(customer.churnRisk) === riskFilter
      const matchesContract = contractFilter === 'all' || customer.contract === contractFilter

      return matchesSearch && matchesRisk && matchesContract
    })
  }, [search, riskFilter, contractFilter])

  const totalPages = Math.max(1, Math.ceil(filteredCustomers.length / CUSTOMERS_PER_PAGE))
  const firstResultIndex = (currentPage - 1) * CUSTOMERS_PER_PAGE
  const paginatedCustomers = filteredCustomers.slice(firstResultIndex, firstResultIndex + CUSTOMERS_PER_PAGE)
  const firstShown = filteredCustomers.length === 0 ? 0 : firstResultIndex + 1
  const lastShown = Math.min(firstResultIndex + CUSTOMERS_PER_PAGE, filteredCustomers.length)
  const hasActiveFilters = search !== '' || riskFilter !== 'all' || contractFilter !== 'all'

  function updateFilter(setFilter, value) {
    setFilter(value)
    setCurrentPage(1)
  }

  function clearFilters() {
    setSearch('')
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

      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-slate-600">
            Showing <span className="font-semibold text-slate-900">{firstShown}–{lastShown}</span> of{' '}
            <span className="font-semibold text-slate-900">{filteredCustomers.length}</span> customers
          </p>
          <p className="text-xs text-slate-500">Risk levels are CRM display categories.</p>
        </div>

        <CustomerTable customers={paginatedCustomers} />

        <nav aria-label="Customer list pagination" className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
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
            disabled={currentPage === totalPages || filteredCustomers.length === 0}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-slate-300 px-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-45"
          >
            Next
            <ChevronRight aria-hidden="true" size={17} />
          </button>
        </nav>
      </div>
    </section>
  )
}

export default CustomersPage
