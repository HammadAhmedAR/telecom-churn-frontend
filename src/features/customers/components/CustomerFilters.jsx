import { Search, X } from 'lucide-react'

function CustomerFilters({ search, riskFilter, contractFilter, hasActiveFilters, onSearchChange, onRiskChange, onContractChange, onClear }) {
  return (
    <section aria-label="Customer filters" className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-[minmax(18rem,1fr)_13rem_13rem_auto] xl:items-end">
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">Search</span>
          <span className="relative block">
            <Search className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-slate-400" aria-hidden="true" size={18} />
            <input
              type="search"
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Search by Customer ID..."
              className="h-10 w-full rounded-lg border border-slate-300 bg-white pr-3 pl-10 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-100"
            />
          </span>
        </label>

        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">Risk level</span>
          <select
            value={riskFilter}
            onChange={(event) => onRiskChange(event.target.value)}
            className="h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-700 focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-100"
          >
            <option value="all">All Risk Levels</option>
            <option value="low">Low Risk</option>
            <option value="medium">Medium Risk</option>
            <option value="high">High Risk</option>
          </select>
        </label>

        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">Contract</span>
          <select
            value={contractFilter}
            onChange={(event) => onContractChange(event.target.value)}
            className="h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-700 focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-100"
          >
            <option value="all">All Contracts</option>
            <option value="Month-to-month">Month-to-month</option>
            <option value="One year">One year</option>
            <option value="Two year">Two year</option>
          </select>
        </label>

        <button
          type="button"
          onClick={onClear}
          disabled={!hasActiveFilters}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-slate-300 px-4 text-sm font-semibold whitespace-nowrap text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-45"
        >
          <X aria-hidden="true" size={17} />
          Clear Filters
        </button>
      </div>
    </section>
  )
}

export default CustomerFilters
