import { AlertCircle, LockKeyhole, LogIn, Mail, RadioTower } from 'lucide-react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import { useLoginMutation } from './authApi'
import { selectIsAuthenticated, setCredentials } from './authSlice'
import { normalizeAuthState, saveAuthState } from './authStorage'

function LoginPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const [login, { isLoading }] = useLoginMutation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [formError, setFormError] = useState('')

  if (isAuthenticated) return <Navigate to="/dashboard" replace />

  function updateEmail(value) {
    setEmail(value)
    setFormError('')
  }

  function updatePassword(value) {
    setPassword(value)
    setFormError('')
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const normalizedEmail = email.trim()

    if (!normalizedEmail || !password) {
      setFormError('Email and password are required.')
      return
    }

    setFormError('')

    try {
      const response = await login({ email: normalizedEmail, password }).unwrap()
      const authState = normalizeAuthState(response)

      if (!authState) {
        setFormError('Unable to sign in. Please try again.')
        return
      }

      dispatch(setCredentials(authState))
      saveAuthState(authState)
      navigate('/dashboard', { replace: true })
    } catch (error) {
      setFormError(error?.status === 401
        ? 'Invalid email or password'
        : 'Unable to sign in. Please check the server connection and try again.')
    }
  }

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
          <p className="mt-2 text-sm leading-6 text-slate-600">Use your CRM account to access the protected workspace.</p>

          {formError && (
            <div className="mt-5 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700" role="alert">
              <AlertCircle className="mt-0.5 shrink-0" aria-hidden="true" size={17} />
              <span>{formError}</span>
            </div>
          )}

          <form className="mt-6 space-y-4" onSubmit={handleSubmit} noValidate>
            <label className="block">
              <span className="mb-1.5 block text-sm font-semibold text-slate-800">Email</span>
              <span className="relative block">
                <Mail className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-slate-400" aria-hidden="true" size={18} />
                <input
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => updateEmail(event.target.value)}
                  placeholder="name@example.com"
                  className="h-11 w-full rounded-lg border border-slate-300 bg-white pr-3 pl-10 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-100"
                />
              </span>
            </label>

            <label className="block">
              <span className="mb-1.5 block text-sm font-semibold text-slate-800">Password</span>
              <span className="relative block">
                <LockKeyhole className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-slate-400" aria-hidden="true" size={18} />
                <input
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => updatePassword(event.target.value)}
                  placeholder="Enter your password"
                  className="h-11 w-full rounded-lg border border-slate-300 bg-white pr-3 pl-10 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-100"
                />
              </span>
            </label>

            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-brand-600 px-4 text-sm font-semibold text-white hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              <LogIn aria-hidden="true" size={18} />
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
        </div>
      </section>
    </main>
  )
}

export default LoginPage
