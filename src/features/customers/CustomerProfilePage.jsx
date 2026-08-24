import { ArrowLeft, ChevronRight, CircleUserRound, CreditCard, Wifi } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import RiskBadge from '../../components/ui/RiskBadge'
import WhatIfSimulator from '../simulation/WhatIfSimulator'
import ChurnRiskCard from './components/ChurnRiskCard'
import CustomerDetailsSection from './components/CustomerDetailsSection'
import CustomerOverview from './components/CustomerOverview'
import { customers } from './customerData'

const currencyFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

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
  const customer = customers.find((record) => record.customerId.toLowerCase() === id?.toLowerCase())

  if (!customer) return <CustomerNotFound customerId={id} />

  const customerDetails = [
    { label: 'Gender', value: customer.gender },
    { label: 'Senior Citizen', value: customer.seniorCitizen },
    { label: 'Partner', value: customer.partner },
    { label: 'Dependents', value: customer.dependents },
    { label: 'Tenure', value: `${customer.tenure} ${customer.tenure === 1 ? 'month' : 'months'}` },
  ]
  const serviceDetails = [
    { label: 'Phone Service', value: customer.phoneService },
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
    { label: 'Paperless Billing', value: customer.paperlessBilling },
    { label: 'Payment Method', value: customer.paymentMethod },
    { label: 'Monthly Charges', value: currencyFormatter.format(customer.monthlyCharges) },
    { label: 'Total Charges', value: currencyFormatter.format(customer.totalCharges) },
  ]

  return (
    <article className="space-y-6">
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
            <h2 className="text-2xl font-semibold tracking-tight text-slate-950">{customer.name}</h2>
            <p className="mt-1 text-sm text-slate-500">
              Customer ID: <span className="font-mono text-xs font-medium text-slate-700">{customer.customerId}</span>
            </p>
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
    </article>
  )
}

export default CustomerProfilePage
