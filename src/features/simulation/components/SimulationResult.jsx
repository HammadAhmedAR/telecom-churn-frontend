import { AlertCircle, FlaskConical, LoaderCircle } from 'lucide-react'
import RiskBadge from '../../../components/ui/RiskBadge'
import { getRiskPercentage } from '../../../utils/riskLevel'

function formatRisk(risk) {
  const percentage = getRiskPercentage(risk)
  return `${Number.isInteger(percentage) ? percentage : percentage.toFixed(1)}%`
}

function formatRiskChange(riskChange) {
  const percentagePoints = Number(riskChange) * 100
  const rounded = Number(percentagePoints.toFixed(1))
  const sign = rounded > 0 ? '+' : ''
  const unit = Math.abs(rounded) === 1 ? 'percentage point' : 'percentage points'
  return `${sign}${rounded} ${unit}`
}

function getRiskDirection(riskChange) {
  const percentagePoints = Number(riskChange) * 100
  const magnitude = Math.abs(percentagePoints).toFixed(1)

  if (percentagePoints < -0.05) return `Risk decreased by ${magnitude} percentage points in this hypothetical model comparison.`
  if (percentagePoints > 0.05) return `Risk increased by ${magnitude} percentage points in this hypothetical model comparison.`
  return 'No meaningful risk change in this hypothetical model comparison.'
}

function SimulatedState({ hasChanges, isLoading, result, error }) {
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
        <p className="text-sm font-medium">{error}</p>
      </div>
    )
  }

  if (result) {
    return (
      <div>
        <p className="text-3xl font-semibold tracking-tight text-slate-950">{formatRisk(result.simulation.churnRisk)}</p>
        <div className="mt-3">
          <RiskBadge risk={result.simulation.churnRisk} level={result.simulation.riskLevel} />
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

function SimulationResult({ originalRisk, hasChanges, isLoading = false, result = null, error = '' }) {
  const baselineRisk = result?.baseline.churnRisk ?? originalRisk

  return (
    <section aria-labelledby="simulation-result-title" className="rounded-xl border border-slate-200 bg-white p-5">
      <h5 id="simulation-result-title" className="text-sm font-semibold text-slate-900">Simulation Outcome</h5>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg bg-slate-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Current Risk</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">{formatRisk(baselineRisk)}</p>
          <div className="mt-3">
            <RiskBadge risk={baselineRisk} level={result?.baseline.riskLevel} />
          </div>
        </div>
        <div className="rounded-lg border border-dashed border-slate-300 p-4">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Simulated Risk</p>
          <SimulatedState hasChanges={hasChanges} isLoading={isLoading} result={result} error={error} />
        </div>
      </div>
      {result && (
        <div className="mt-4 rounded-lg bg-slate-50 px-4 py-3 text-sm text-slate-700">
          <p>Risk change: <span className="font-semibold">{formatRiskChange(result.riskChange)}</span></p>
          <p className="mt-1 text-xs text-slate-500">{getRiskDirection(result.riskChange)}</p>
          {result.model && <p className="mt-2 text-xs text-slate-400">Model: {result.model}</p>}
        </div>
      )}
    </section>
  )
}

export default SimulationResult
