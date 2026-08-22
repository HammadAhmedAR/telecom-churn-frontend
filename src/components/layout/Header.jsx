import { CircleUserRound } from 'lucide-react'
import { useLocation } from 'react-router-dom'

function getPageTitle(pathname) {
  if (pathname.startsWith('/customers/')) return 'Customer Profile'
  if (pathname === '/customers') return 'Customers'
  if (pathname === '/retention-actions') return 'Retention Actions'
  return 'Dashboard'
}

function Header() {
  const { pathname } = useLocation()

  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6 lg:px-8">
      <div>
        <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Churn management</p>
        <h1 className="text-lg font-semibold text-slate-900">{getPageTitle(pathname)}</h1>
      </div>
      <div className="flex items-center gap-3">
        <div className="hidden text-right sm:block">
          <p className="text-sm font-medium text-slate-800">CRM Analyst</p>
          <p className="text-xs text-slate-500">Workspace user</p>
        </div>
        <CircleUserRound className="text-slate-500" aria-label="User profile" size={32} />
      </div>
    </header>
  )
}

export default Header
