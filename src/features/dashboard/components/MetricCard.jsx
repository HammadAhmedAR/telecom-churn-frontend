function MetricCard({ title, value, supportingText, icon: Icon, tone = 'default' }) {
  const isPriority = tone === 'danger'

  return (
    <article
      className={`rounded-xl border bg-white p-5 shadow-sm ${
        isPriority ? 'border-red-200' : 'border-slate-200'
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-600">{title}</p>
          <p className={`mt-2 text-3xl font-semibold tracking-tight ${isPriority ? 'text-red-700' : 'text-slate-950'}`}>
            {value}
          </p>
        </div>
        <span
          className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${
            isPriority ? 'bg-red-50 text-red-700' : 'bg-brand-50 text-brand-700'
          }`}
        >
          <Icon aria-hidden="true" size={20} />
        </span>
      </div>
      {supportingText && <p className="mt-3 text-xs text-slate-500">{supportingText}</p>}
    </article>
  )
}

export default MetricCard
