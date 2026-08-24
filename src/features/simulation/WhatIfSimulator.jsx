import { RotateCcw, Send, SlidersHorizontal } from 'lucide-react'
import { useState } from 'react'
import SimulationResult from './components/SimulationResult'
import { buildSimulationPayload, getInitialSimulationValues, hasSimulationChanges } from './simulationUtils'

const contracts = ['Month-to-month', 'One year', 'Two year']
const binaryOptions = ['Yes', 'No']

function FieldFrame({ label, actualValue, children }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4">
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
        <label className="text-sm font-semibold text-slate-900" htmlFor={`simulation-${label.toLowerCase().replaceAll(' ', '-')}`}>
          {label}
        </label>
        <span className="text-xs text-slate-500">Actual: <strong className="font-medium text-slate-700">{actualValue}</strong></span>
      </div>
      {children}
    </div>
  )
}

function WhatIfSimulator({ customer }) {
  const [simulationValues, setSimulationValues] = useState(() => getInitialSimulationValues(customer))
  const [preparedPayload, setPreparedPayload] = useState(null)
  const [simulationResult, setSimulationResult] = useState(null)
  const [predictionError, setPredictionError] = useState(null)
  const hasInternetService = customer.internetService !== 'No'
  const hasChanges = hasSimulationChanges(customer, simulationValues)
  const isLoading = false

  function updateValue(field, value) {
    setSimulationValues((currentValues) => ({ ...currentValues, [field]: value }))
    setPreparedPayload(null)
    setSimulationResult(null)
    setPredictionError(null)
  }

  function resetSimulation() {
    setSimulationValues(getInitialSimulationValues(customer))
    setPreparedPayload(null)
    setSimulationResult(null)
    setPredictionError(null)
  }

  function runSimulation() {
    if (!hasChanges) return

    setPreparedPayload(buildSimulationPayload(simulationValues))
    setSimulationResult(null)
    setPredictionError(null)
    // Future integration: send this payload through an RTK Query mutation to POST /api/customers/:id/simulate.
  }

  return (
    <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
      <div className="flex items-start gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-white text-brand-700 shadow-sm">
          <SlidersHorizontal aria-hidden="true" size={20} />
        </span>
        <div>
          <h4 className="font-semibold text-slate-900">What-If Simulation</h4>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-600">
            Compare the actual account with temporary changes to controllable attributes. No customer data is edited.
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <FieldFrame label="Contract" actualValue={customer.contract}>
          <select
            id="simulation-contract"
            value={simulationValues.contract}
            onChange={(event) => updateValue('contract', event.target.value)}
            className="h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-800 focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-100"
          >
            {contracts.map((contract) => <option key={contract} value={contract}>{contract}</option>)}
          </select>
          <p className="mt-2 text-xs text-brand-700">Simulation: {simulationValues.contract}</p>
        </FieldFrame>

        <FieldFrame label="Monthly Charges" actualValue={`$${customer.monthlyCharges.toFixed(2)}`}>
          <div className="flex items-center gap-4">
            <input
              id="simulation-monthly-charges"
              type="range"
              min="18"
              max="120"
              step="0.05"
              value={simulationValues.monthlyCharges}
              onChange={(event) => updateValue('monthlyCharges', Number(event.target.value))}
              aria-valuetext={`$${simulationValues.monthlyCharges.toFixed(2)}`}
              className="h-2 min-w-0 flex-1 cursor-pointer accent-brand-600"
            />
            <output htmlFor="simulation-monthly-charges" className="min-w-20 text-right text-sm font-semibold text-brand-700">
              ${simulationValues.monthlyCharges.toFixed(2)}
            </output>
          </div>
          <div className="mt-2 flex justify-between text-xs text-slate-400"><span>$18</span><span>$120</span></div>
        </FieldFrame>

        <FieldFrame label="Tech Support" actualValue={customer.techSupport}>
          <select
            id="simulation-tech-support"
            value={simulationValues.techSupport}
            disabled={!hasInternetService}
            onChange={(event) => updateValue('techSupport', event.target.value)}
            className="h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-800 focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-100 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500"
          >
            {hasInternetService
              ? binaryOptions.map((option) => <option key={option} value={option}>{option}</option>)
              : <option value="No internet service">No internet service</option>}
          </select>
          <p className="mt-2 text-xs text-slate-500">
            {hasInternetService ? `Simulation: ${simulationValues.techSupport}` : 'Unavailable because this customer has no internet service.'}
          </p>
        </FieldFrame>

        <FieldFrame label="Online Security" actualValue={customer.onlineSecurity}>
          <select
            id="simulation-online-security"
            value={simulationValues.onlineSecurity}
            disabled={!hasInternetService}
            onChange={(event) => updateValue('onlineSecurity', event.target.value)}
            className="h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-800 focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-100 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500"
          >
            {hasInternetService
              ? binaryOptions.map((option) => <option key={option} value={option}>{option}</option>)
              : <option value="No internet service">No internet service</option>}
          </select>
          <p className="mt-2 text-xs text-slate-500">
            {hasInternetService ? `Simulation: ${simulationValues.onlineSecurity}` : 'Unavailable because this customer has no internet service.'}
          </p>
        </FieldFrame>
      </div>

      <div className="my-5 flex flex-wrap items-center justify-between gap-3 border-y border-slate-200 py-4">
        <p className="text-sm text-slate-600">
          {hasChanges ? 'Temporary scenario differs from the customer profile.' : 'Adjust one or more values to run a churn-risk simulation.'}
        </p>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={resetSimulation}
            disabled={!hasChanges && !preparedPayload && !simulationResult && !predictionError}
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-45"
          >
            <RotateCcw aria-hidden="true" size={17} />
            Reset Simulation
          </button>
          <button
            type="button"
            onClick={runSimulation}
            disabled={!hasChanges || isLoading}
            className="inline-flex h-10 items-center gap-2 rounded-lg bg-brand-600 px-4 text-sm font-semibold text-white hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            <Send aria-hidden="true" size={17} />
            Run Simulation
          </button>
        </div>
      </div>

      <SimulationResult
        originalRisk={customer.churnRisk}
        hasChanges={hasChanges}
        preparedPayload={preparedPayload}
        isLoading={isLoading}
        result={simulationResult}
        error={predictionError}
      />
    </div>
  )
}

export default WhatIfSimulator
