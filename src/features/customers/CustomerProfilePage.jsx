import { ArrowLeft, CheckCircle2, ChevronRight, CircleUserRound, CreditCard, LoaderCircle, TriangleAlert, Wifi } from 'lucide-react'
import { Link, useLocation, useParams } from 'react-router-dom'
import RiskBadge from '../../components/ui/RiskBadge'
import RetentionActionForm from '../retention/components/RetentionActionForm'
import RetentionHistory from '../retention/components/RetentionHistory'
import WhatIfSimulator from '../simulation/WhatIfSimulator'
import ChurnRiskCard from './components/ChurnRiskCard'
import CustomerDetailsSection from './components/CustomerDetailsSection'
import CustomerOverview from './components/CustomerOverview'
import { useGetCustomerByIdQuery } from './customersApi'

const currencyFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

function formatBoolean(value) {
  if (value === true) return 'Yes'
  if (value === false) return 'No'
  return 'N/A'
}

function formatCurrency(value) {
  return value === null || value === undefined || !Number.isFinite(Number(value))
    ? 'N/A'
    : currencyFormatter.format(Number(value))
}

function CustomerNotFound({ customerId }) {
  return (
    <section className="mx-auto max-w-xl rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-10">
      <CircleUserRound className="mx-auto text-slate-400" aria-hidden="true" size={42} />
      <h2 className="mt-4 text-xl font-semibold text-slate-900">Customer not found</h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">
        The customer record for <span className="font-mono font-medium text-slate-700">{customerId}</span> could not be found.
      </p>
      <Link to="/customers" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-700">
        <ArrowLeft aria-hidden="true" size={17} />
        Back to Customers
      </Link>
    </section>
  )
}

function CustomerProfilePage() {
  const { id } = useParams()
  const location = useLocation()
  const { data: customer, isLoading, isError, error, refetch } = useGetCustomerByIdQuery(id, { skip: !id })

  if (isLoading) {
    return (
      <section className="rounded-xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm" role="status">
        <LoaderCircle className="mx-auto animate-spin text-brand-600" aria-hidden="true" size={28} />
        <p className="mt-3 text-sm font-medium text-slate-600">Loading customer...</p>
      </section>
    )
  }

  if (isError && error?.status === 404) return <CustomerNotFound customerId={id} />

  if (isError || !customer) {
    return (
      <section className="mx-auto max-w-xl rounded-xl border border-red-200 bg-white p-8 text-center shadow-sm" role="alert">
        <TriangleAlert className="mx-auto text-red-600" aria-hidden="true" size={34} />
        <h2 className="mt-4 text-xl font-semibold text-slate-900">Unable to load customer.</h2>
        <p className="mt-2 text-sm text-slate-600">Check the server connection and try again.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button type="button" onClick={refetch} className="rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-700">
            Retry
          </button>
          <Link to="/customers" className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            Back to Customers
          </Link>
        </div>
      </section>
    )
  }

  const customerDetails = [
    { label: 'Gender', value: customer.gender },
    { label: 'Senior Citizen', value: formatBoolean(customer.seniorCitizen) },
    { label: 'Partner', value: formatBoolean(customer.partner) },
    { label: 'Dependents', value: formatBoolean(customer.dependents) },
    { label: 'Tenure', value: `${customer.tenure} ${customer.tenure === 1 ? 'month' : 'months'}` },
  ]
  const serviceDetails = [
    { label: 'Phone Service', value: formatBoolean(customer.phoneService) },
    { label: 'Multiple Lines', value: customer.multipleLines },
    { label: 'Internet Service', value: customer.internetService },
    { label: 'Online Security', value: customer.onlineSecurity },
    { label: 'Online Backup', value: customer.onlineBackup },
    { label: 'Device Protection', value: customer.deviceProtection },
    { label: 'Tech Support', value: customer.techSupport },
    { label: 'Streaming TV', value: customer.streamingTV },
    { label: 'Streaming Movies', value: customer.streamingMovies },
  ]
  const billingDetails = [
    { label: 'Contract', value: customer.contract },
    { label: 'Paperless Billing', value: formatBoolean(customer.paperlessBilling) },
    { label: 'Payment Method', value: customer.paymentMethod },
    { label: 'Monthly Charges', value: formatCurrency(customer.monthlyCharges) },
    { label: 'Total Charges', value: formatCurrency(customer.totalCharges) },
  ]

  return (
    <article className="space-y-6">
      {location.state?.customerCreated && (
        <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700" role="status">
          <CheckCircle2 aria-hidden="true" size={19} />
          Customer created successfully with a model-generated churn risk.
        </div>
      )}

      <div className="flex flex-wrap items-center gap-1.5 text-sm text-slate-500">
        <Link to="/customers" className="rounded text-brand-700 hover:text-brand-800 hover:underline">Customers</Link>
        <ChevronRight aria-hidden="true" size={15} />
        <span className="font-mono text-xs text-slate-600">{customer.customerId}</span>
      </div>

      <header className="flex flex-col gap-5 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="flex items-center gap-4">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
            <CircleUserRound aria-hidden="true" size={27} />
          </span>
          <div>
            <h2 className="font-mono text-2xl font-semibold tracking-tight text-slate-950">{customer.customerId}</h2>
            <p className="mt-1 text-sm text-slate-500">Telecom customer account</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <RiskBadge risk={customer.churnRisk} />
          <Link to="/customers" className="inline-flex h-10 items-center gap-2 rounded-lg border border-slate-300 px-4 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            <ArrowLeft aria-hidden="true" size={17} />
            Back to Customers
          </Link>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.45fr)_minmax(18rem,0.75fr)]">
        <CustomerOverview customer={customer} />
        <ChurnRiskCard risk={customer.churnRisk} />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <CustomerDetailsSection title="Customer Details" icon={CircleUserRound} items={customerDetails} />
        <CustomerDetailsSection title="Account & Billing" icon={CreditCard} items={billingDetails} />
      </div>

      <CustomerDetailsSection title="Services" description="Current telecom and add-on service subscriptions." icon={Wifi} items={serviceDetails} />

      <section aria-labelledby="retention-support-title" className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <h3 id="retention-support-title" className="text-base font-semibold text-slate-900">Retention Decision Support</h3>
        <p className="mt-1 text-sm text-slate-500">Explore temporary account scenarios without changing the customer record.</p>
        <WhatIfSimulator key={customer.customerId} customer={customer} />
      </section>

      <section aria-labelledby="retention-action-title" className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <h3 id="retention-action-title" className="text-base font-semibold text-slate-900">Retention Action</h3>
        <p className="mt-1 text-sm text-slate-500">Record the retention intervention selected for this customer.</p>
        <div className="mt-4 grid gap-5 xl:grid-cols-2">
          <RetentionActionForm key={customer.customerId} customer={customer} />
          <RetentionHistory customerId={customer.customerId} />
        </div>
      </section>
    </article>
  )
}

export default CustomerProfilePage
