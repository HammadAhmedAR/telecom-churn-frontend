import { AlertCircle, LoaderCircle, UserPlus, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useCreateCustomerMutation } from '../customersApi'

const INTERNET_ADD_ON_FIELDS = [
  'onlineSecurity',
  'onlineBackup',
  'deviceProtection',
  'techSupport',
  'streamingTV',
  'streamingMovies',
]

const initialValues = {
  customerId: '',
  gender: '',
  seniorCitizen: false,
  partner: false,
  dependents: false,
  tenure: '0',
  phoneService: true,
  multipleLines: 'No',
  internetService: '',
  onlineSecurity: 'No',
  onlineBackup: 'No',
  deviceProtection: 'No',
  techSupport: 'No',
  streamingTV: 'No',
  streamingMovies: 'No',
  contract: '',
  paperlessBilling: true,
  paymentMethod: '',
  monthlyCharges: '',
  totalCharges: '',
}

const inputClass = 'h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-800 focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-100 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500'

function Field({ label, htmlFor, hint, children }) {
  return (
    <label className="block" htmlFor={htmlFor}>
      <span className="mb-1.5 block text-sm font-semibold text-slate-800">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-slate-500">{hint}</span>}
    </label>
  )
}

function BooleanField({ id, label, value, onChange }) {
  return (
    <Field label={label} htmlFor={id}>
      <select id={id} value={String(value)} onChange={(event) => onChange(event.target.value === 'true')} className={inputClass}>
        <option value="false">No</option>
        <option value="true">Yes</option>
      </select>
    </Field>
  )
}

function getValidationError(values) {
  const customerId = values.customerId.trim()
  if (!customerId) return 'Customer ID is required.'
  if (customerId.length > 50) return 'Customer ID must not exceed 50 characters.'
  if (!['Male', 'Female'].includes(values.gender)) return 'Select a valid gender.'
  if (!['DSL', 'Fiber optic', 'No'].includes(values.internetService)) return 'Select an internet service.'
  if (!['Month-to-month', 'One year', 'Two year'].includes(values.contract)) return 'Select a contract.'
  if (![
    'Electronic check',
    'Mailed check',
    'Bank transfer (automatic)',
    'Credit card (automatic)',
  ].includes(values.paymentMethod)) return 'Select a payment method.'

  const tenure = Number(values.tenure)
  if (values.tenure === '' || !Number.isSafeInteger(tenure) || tenure < 0) {
    return 'Tenure must be a non-negative integer.'
  }

  const monthlyCharges = Number(values.monthlyCharges)
  if (values.monthlyCharges === '' || !Number.isFinite(monthlyCharges) || monthlyCharges < 0) {
    return 'Monthly charges must be a non-negative number.'
  }

  if (values.totalCharges !== '') {
    const totalCharges = Number(values.totalCharges)
    if (!Number.isFinite(totalCharges) || totalCharges < 0) {
      return 'Total charges must be a non-negative number or left blank.'
    }
  }

  if ((!values.phoneService && values.multipleLines !== 'No phone service')
    || (values.phoneService && !['Yes', 'No'].includes(values.multipleLines))) {
    return 'Multiple Lines must match the Phone Service selection.'
  }

  const expectedAddOn = values.internetService === 'No' ? 'No internet service' : null
  const invalidAddOn = INTERNET_ADD_ON_FIELDS.some((field) => (
    expectedAddOn
      ? values[field] !== expectedAddOn
      : !['Yes', 'No'].includes(values[field])
  ))
  if (invalidAddOn) return 'Internet add-ons must match the Internet Service selection.'

  return ''
}

function buildPayload(values) {
  return {
    customerId: values.customerId.trim(),
    gender: values.gender,
    seniorCitizen: values.seniorCitizen,
    partner: values.partner,
    dependents: values.dependents,
    tenure: Number(values.tenure),
    phoneService: values.phoneService,
    multipleLines: values.multipleLines,
    internetService: values.internetService,
    onlineSecurity: values.onlineSecurity,
    onlineBackup: values.onlineBackup,
    deviceProtection: values.deviceProtection,
    techSupport: values.techSupport,
    streamingTV: values.streamingTV,
    streamingMovies: values.streamingMovies,
    contract: values.contract,
    paperlessBilling: values.paperlessBilling,
    paymentMethod: values.paymentMethod,
    monthlyCharges: Number(values.monthlyCharges),
    totalCharges: values.totalCharges === '' ? null : Number(values.totalCharges),
  }
}

function getCreateErrorMessage(error) {
  if (error?.status === 409) return 'Customer ID already exists.'
  if (error?.status === 503) {
    return 'Prediction service is temporarily unavailable. Customer was not created.'
  }
  if (error?.status === 400) {
    return typeof error.data?.message === 'string' && error.data.message.trim()
      ? error.data.message
      : 'The customer details are not valid. Please review them and try again.'
  }
  return 'Unable to create customer. Please try again.'
}

function CreateCustomerModal({ onClose, onCreated }) {
  const [createCustomer, { isLoading }] = useCreateCustomerMutation()
  const submissionInProgress = useRef(false)
  const [values, setValues] = useState(initialValues)
  const [formError, setFormError] = useState('')

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    function handleKeyDown(event) {
      if (event.key === 'Escape' && !isLoading) onClose()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isLoading, onClose])

  function updateValue(field, value) {
    setValues((current) => ({ ...current, [field]: value }))
    setFormError('')
  }

  function updatePhoneService(phoneService) {
    setValues((current) => ({
      ...current,
      phoneService,
      multipleLines: phoneService
        ? (current.multipleLines === 'No phone service' ? 'No' : current.multipleLines)
        : 'No phone service',
    }))
    setFormError('')
  }

  function updateInternetService(internetService) {
    setValues((current) => {
      const nextValues = { ...current, internetService }
      for (const field of INTERNET_ADD_ON_FIELDS) {
        nextValues[field] = internetService === 'No'
          ? 'No internet service'
          : (current[field] === 'No internet service' ? 'No' : current[field])
      }
      return nextValues
    })
    setFormError('')
  }

  async function handleSubmit(event) {
    event.preventDefault()
    if (isLoading || submissionInProgress.current) return

    const validationError = getValidationError(values)
    if (validationError) {
      setFormError(validationError)
      return
    }

    setFormError('')
    submissionInProgress.current = true
    try {
      const createdCustomer = await createCustomer(buildPayload(values)).unwrap()
      onCreated(createdCustomer)
    } catch (error) {
      setFormError(getCreateErrorMessage(error))
    } finally {
      submissionInProgress.current = false
    }
  }

  const internetAddOnsDisabled = values.internetService === 'No'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 p-3 sm:p-6">
      <section role="dialog" aria-modal="true" aria-labelledby="create-customer-title" className="flex max-h-[calc(100vh-1.5rem)] w-full max-w-5xl flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl sm:max-h-[calc(100vh-3rem)]">
        <header className="flex items-start justify-between gap-4 border-b border-slate-200 px-5 py-4 sm:px-6">
          <div className="flex items-start gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
              <UserPlus aria-hidden="true" size={20} />
            </span>
            <div>
              <h3 id="create-customer-title" className="text-lg font-semibold text-slate-950">Add Customer</h3>
              <p className="mt-1 text-sm text-slate-500">Create a model-compatible profile and calculate its baseline churn risk.</p>
            </div>
          </div>
          <button type="button" onClick={onClose} disabled={isLoading} aria-label="Close add customer form" className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-45">
            <X aria-hidden="true" size={20} />
          </button>
        </header>

        <form id="create-customer-form" onSubmit={handleSubmit} noValidate className="overflow-y-auto px-5 py-5 sm:px-6">
          {formError && (
            <div className="mb-5 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm font-medium text-red-700" role="alert">
              <AlertCircle className="mt-0.5 shrink-0" aria-hidden="true" size={18} />
              <span>{formError}</span>
            </div>
          )}

          <fieldset disabled={isLoading} className="space-y-6">
            <section aria-labelledby="identity-fields-title">
              <h4 id="identity-fields-title" className="text-sm font-semibold uppercase tracking-wide text-slate-500">Customer details</h4>
              <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <Field label="Customer ID" htmlFor="new-customer-id" hint="Required; up to 50 characters.">
                  <input id="new-customer-id" type="text" value={values.customerId} onChange={(event) => updateValue('customerId', event.target.value)} maxLength="50" autoFocus className={inputClass} />
                </Field>
                <Field label="Gender" htmlFor="new-customer-gender">
                  <select id="new-customer-gender" value={values.gender} onChange={(event) => updateValue('gender', event.target.value)} className={inputClass}>
                    <option value="">Select...</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </Field>
                <BooleanField id="new-customer-senior" label="Senior Citizen" value={values.seniorCitizen} onChange={(value) => updateValue('seniorCitizen', value)} />
                <BooleanField id="new-customer-partner" label="Partner" value={values.partner} onChange={(value) => updateValue('partner', value)} />
                <BooleanField id="new-customer-dependents" label="Dependents" value={values.dependents} onChange={(value) => updateValue('dependents', value)} />
                <Field label="Tenure (months)" htmlFor="new-customer-tenure">
                  <input id="new-customer-tenure" type="number" min="0" step="1" value={values.tenure} onChange={(event) => updateValue('tenure', event.target.value)} className={inputClass} />
                </Field>
              </div>
            </section>

            <section aria-labelledby="service-fields-title">
              <h4 id="service-fields-title" className="text-sm font-semibold uppercase tracking-wide text-slate-500">Services</h4>
              <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <BooleanField id="new-customer-phone" label="Phone Service" value={values.phoneService} onChange={updatePhoneService} />
                <Field label="Multiple Lines" htmlFor="new-customer-multiple-lines">
                  <select id="new-customer-multiple-lines" value={values.multipleLines} disabled={!values.phoneService} onChange={(event) => updateValue('multipleLines', event.target.value)} className={inputClass}>
                    {values.phoneService ? <><option value="No">No</option><option value="Yes">Yes</option></> : <option value="No phone service">No phone service</option>}
                  </select>
                </Field>
                <Field label="Internet Service" htmlFor="new-customer-internet">
                  <select id="new-customer-internet" value={values.internetService} onChange={(event) => updateInternetService(event.target.value)} className={inputClass}>
                    <option value="">Select...</option>
                    <option value="DSL">DSL</option>
                    <option value="Fiber optic">Fiber optic</option>
                    <option value="No">No</option>
                  </select>
                </Field>
                {[
                  ['onlineSecurity', 'Online Security'],
                  ['onlineBackup', 'Online Backup'],
                  ['deviceProtection', 'Device Protection'],
                  ['techSupport', 'Tech Support'],
                  ['streamingTV', 'Streaming TV'],
                  ['streamingMovies', 'Streaming Movies'],
                ].map(([field, label]) => (
                  <Field key={field} label={label} htmlFor={`new-customer-${field}`}>
                    <select id={`new-customer-${field}`} value={values[field]} disabled={internetAddOnsDisabled} onChange={(event) => updateValue(field, event.target.value)} className={inputClass}>
                      {internetAddOnsDisabled
                        ? <option value="No internet service">No internet service</option>
                        : <><option value="No">No</option><option value="Yes">Yes</option></>}
                    </select>
                  </Field>
                ))}
              </div>
            </section>

            <section aria-labelledby="billing-fields-title">
              <h4 id="billing-fields-title" className="text-sm font-semibold uppercase tracking-wide text-slate-500">Account & billing</h4>
              <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <Field label="Contract" htmlFor="new-customer-contract">
                  <select id="new-customer-contract" value={values.contract} onChange={(event) => updateValue('contract', event.target.value)} className={inputClass}>
                    <option value="">Select...</option>
                    <option value="Month-to-month">Month-to-month</option>
                    <option value="One year">One year</option>
                    <option value="Two year">Two year</option>
                  </select>
                </Field>
                <BooleanField id="new-customer-paperless" label="Paperless Billing" value={values.paperlessBilling} onChange={(value) => updateValue('paperlessBilling', value)} />
                <Field label="Payment Method" htmlFor="new-customer-payment">
                  <select id="new-customer-payment" value={values.paymentMethod} onChange={(event) => updateValue('paymentMethod', event.target.value)} className={inputClass}>
                    <option value="">Select...</option>
                    <option value="Electronic check">Electronic check</option>
                    <option value="Mailed check">Mailed check</option>
                    <option value="Bank transfer (automatic)">Bank transfer (automatic)</option>
                    <option value="Credit card (automatic)">Credit card (automatic)</option>
                  </select>
                </Field>
                <Field label="Monthly Charges" htmlFor="new-customer-monthly">
                  <input id="new-customer-monthly" type="number" min="0" step="0.01" value={values.monthlyCharges} onChange={(event) => updateValue('monthlyCharges', event.target.value)} placeholder="0.00" className={inputClass} />
                </Field>
                <Field label="Total Charges" htmlFor="new-customer-total" hint="Optional; blank values are sent as null.">
                  <input id="new-customer-total" type="number" min="0" step="0.01" value={values.totalCharges} onChange={(event) => updateValue('totalCharges', event.target.value)} placeholder="Leave blank if unavailable" className={inputClass} />
                </Field>
              </div>
            </section>
          </fieldset>
        </form>

        <footer className="flex flex-wrap justify-end gap-3 border-t border-slate-200 bg-slate-50 px-5 py-4 sm:px-6">
          <button type="button" onClick={onClose} disabled={isLoading} className="inline-flex h-10 items-center justify-center rounded-lg border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-45">
            Cancel
          </button>
          <button type="submit" form="create-customer-form" disabled={isLoading} className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-brand-600 px-4 text-sm font-semibold text-white hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-slate-300">
            {isLoading && <LoaderCircle className="animate-spin" aria-hidden="true" size={17} />}
            {isLoading ? 'Creating customer...' : 'Create Customer'}
          </button>
        </footer>
      </section>
    </div>
  )
}

export default CreateCustomerModal
