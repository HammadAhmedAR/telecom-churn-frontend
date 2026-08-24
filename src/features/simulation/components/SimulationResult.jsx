import { AlertCircle, CheckCircle2, FlaskConical, LoaderCircle } from 'lucide-react'
import RiskBadge from '../../../components/ui/RiskBadge'
import { getRiskPercentage } from '../../../utils/riskLevel'
import { formatPercentagePointDifference } from '../simulationUtils'

function formatRisk(risk) {
  const percentage = getRiskPercentage(risk)
  return `${Number.isInteger(percentage) ? percentage : percentage.toFixed(1)}%`
}

function SimulatedState({ hasChanges, preparedPayload, isLoading, result, error }) {
  if (isLoading) {
    return (
      <div className="flex items-start gap-3 text-slate-600" role="status">
        <LoaderCircle className="mt-0.5 shrink-0 animate-spin text-brand-600" aria-hidden="true" size={20} />
        <p className="text-sm">Calculating simulated churn risk...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-start gap-3 text-red-700" role="alert">
        <AlertCircle className="mt-0.5 shrink-0" aria-hidden="true" size={20} />
        <div className="text-sm">
          <p className="font-semibold">Unable to calculate simulated churn risk.</p>
          <p className="mt-1 text-red-600">Please try again.</p>
        </div>
      </div>
    )
  }

  if (result) {
    return (
      <div>
        <p className="text-3xl font-semibold tracking-tight text-slate-950">{formatRisk(result.simulatedRisk)}</p>
        <div className="mt-3"><RiskBadge risk={result.simulatedRisk} /></div>
      </div>
    )
  }

  if (preparedPayload) {
    return (
      <div className="flex items-start gap-3 text-brand-700" role="status">
        <CheckCircle2 className="mt-0.5 shrink-0" aria-hidden="true" size={20} />
        <div className="text-sm">
          <p className="font-semibold">Simulation inputs are ready.</p>
          <p className="mt-1 text-slate-600">Prediction service integration is pending.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-start gap-3 text-slate-600">
      <FlaskConical className="mt-0.5 shrink-0 text-slate-400" aria-hidden="true" size={20} />
      <p className="text-sm">
        {hasChanges
          ? 'Inputs changed. Run the simulation when this scenario is ready.'
          : 'Change one or more values to evaluate a retention scenario.'}
      </p>
    </div>
  )
}

function SimulationResult({ originalRisk, hasChanges, preparedPayload, isLoading = false, result = null, error = null }) {
  return (
    <section aria-labelledby="simulation-result-title" className="rounded-xl border border-slate-200 bg-white p-5">
      <h5 id="simulation-result-title" className="text-sm font-semibold text-slate-900">Simulation Outcome</h5>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg bg-slate-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Current Risk</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">{formatRisk(originalRisk)}</p>
          <div className="mt-3"><RiskBadge risk={originalRisk} /></div>
        </div>
        <div className="rounded-lg border border-dashed border-slate-300 p-4">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Simulated Risk</p>
          <SimulatedState
            hasChanges={hasChanges}
            preparedPayload={preparedPayload}
            isLoading={isLoading}
            result={result}
            error={error}
          />
        </div>
      </div>
      {result && (
        <p className="mt-4 rounded-lg bg-slate-50 px-4 py-3 text-sm text-slate-700">
          Difference: <span className="font-semibold">{formatPercentagePointDifference(result.originalRisk, result.simulatedRisk)}</span>
        </p>
      )}
    </section>
  )
}

export default SimulationResult
