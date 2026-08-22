function PagePlaceholder({ title, description, children }) {
  return (
    <section aria-labelledby="page-title" className="space-y-6">
      <div>
        <h2 id="page-title" className="text-2xl font-semibold tracking-tight text-slate-900">
          {title}
        </h2>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-600">{description}</p>
      </div>
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        {children}
      </div>
    </section>
  )
}

export default PagePlaceholder
