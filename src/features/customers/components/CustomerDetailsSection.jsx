function CustomerDetailsSection({ title, description, icon: Icon, items }) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex items-start gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
          <Icon aria-hidden="true" size={18} />
        </span>
        <div>
          <h3 className="text-base font-semibold text-slate-900">{title}</h3>
          {description && <p className="mt-1 text-sm text-slate-500">{description}</p>}
        </div>
      </div>
      <dl className="mt-5 grid gap-x-8 gap-y-4 sm:grid-cols-2">
        {items.map(({ label, value }) => (
          <div key={label} className="border-b border-slate-100 pb-3">
            <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</dt>
            <dd className="mt-1 text-sm font-medium text-slate-900">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

export default CustomerDetailsSection
