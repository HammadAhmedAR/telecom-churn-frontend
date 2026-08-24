import { ShieldAlert } from 'lucide-react'
import RiskBadge from '../../../components/ui/RiskBadge'
import { getRiskLevel, getRiskPercentage } from '../../../utils/riskLevel'

const riskMessages = {
  low: 'Continue standard account monitoring for this customer.',
  medium: 'This customer may benefit from proactive account review.',
  high: 'This customer should be prioritized for retention review.',
}

const riskStyles = {
  low: {
    border: 'border-emerald-200',
    icon: 'bg-emerald-50 text-emerald-700',
    value: 'text-emerald-700',
  },
  medium: {
    border: 'border-amber-200',
    icon: 'bg-amber-50 text-amber-800',
    value: 'text-amber-700',
  },
  high: {
    border: 'border-red-200',
    icon: 'bg-red-50 text-red-700',
    value: 'text-red-700',
  },
}

function ChurnRiskCard({ risk }) {
  const level = getRiskLevel(risk)
  const percentage = getRiskPercentage(risk)
  const formattedRisk = Number.isInteger(percentage) ? percentage : percentage.toFixed(1)
  const styles = riskStyles[level]

  return (
    <section aria-labelledby="risk-title" className={`rounded-xl border bg-white p-5 shadow-sm sm:p-6 ${styles.border}`}>
      <div className="flex items-center gap-3">
        <span className={`flex size-10 items-center justify-center rounded-lg ${styles.icon}`}>
          <ShieldAlert aria-hidden="true" size={21} />
        </span>
        <div>
          <h3 id="risk-title" className="text-base font-semibold text-slate-900">Current Churn Risk</h3>
          <p className="text-xs text-slate-500">Temporary customer fixture value</p>
        </div>
      </div>
      <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className={`text-4xl font-semibold tracking-tight ${styles.value}`}>{formattedRisk}%</p>
          <p className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-500">Churn probability</p>
        </div>
        <RiskBadge risk={risk} />
      </div>
      <p className="mt-5 border-t border-slate-100 pt-4 text-sm leading-6 text-slate-600">{riskMessages[level]}</p>
    </section>
  )
}

export default ChurnRiskCard
