import { RadioTower } from 'lucide-react'

function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
      <section className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-lg bg-brand-600 text-white">
            <RadioTower aria-hidden="true" size={22} />
          </span>
          <div>
            <p className="font-semibold text-slate-900">ChurnGuard CRM</p>
            <p className="text-sm text-slate-500">Telecom churn management</p>
          </div>
        </div>
        <div className="mt-8 border-t border-slate-200 pt-8">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Sign in</h1>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Authentication will be implemented in a later stage.
          </p>
          <div className="mt-6 rounded-lg border border-dashed border-slate-300 bg-slate-50 px-4 py-5 text-center text-sm text-slate-500">
            Login form placeholder
          </div>
        </div>
      </section>
    </main>
  )
}

export default LoginPage
