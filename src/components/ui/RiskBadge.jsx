import { getRiskLevel, getRiskPercentage } from '../../utils/riskLevel'

const riskStyles = {
  low: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  medium: 'border-amber-200 bg-amber-50 text-amber-800',
  high: 'border-red-200 bg-red-50 text-red-700',
}

const riskLabels = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
}

function RiskBadge({ risk, level: providedLevel }) {
  const normalizedLevel = typeof providedLevel === 'string' ? providedLevel.toLowerCase() : ''
  const level = riskStyles[normalizedLevel] ? normalizedLevel : getRiskLevel(risk)
  const percentage = getRiskPercentage(risk)
  const formattedRisk = Number.isInteger(percentage) ? percentage : percentage.toFixed(1)

  return (
    <span
      className={`inline-flex min-w-24 items-center justify-center rounded-full border px-2.5 py-1 text-xs font-semibold ${riskStyles[level]}`}
    >
      {riskLabels[level]} {formattedRisk}%
    </span>
  )
}

export default RiskBadge
