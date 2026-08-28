import { CircleUserRound, LogOut } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { baseApi } from '../../api/baseApi'
import { logout, selectCurrentUser } from '../../features/auth/authSlice'
import { clearAuthState } from '../../features/auth/authStorage'

function getPageTitle(pathname) {
  if (pathname.startsWith('/customers/')) return 'Customer Profile'
  if (pathname === '/customers') return 'Customers'
  if (pathname === '/retention-actions') return 'Retention Actions'
  return 'Dashboard'
}

function Header() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const user = useSelector(selectCurrentUser)

  function handleLogout() {
    dispatch(logout())
    clearAuthState()
    dispatch(baseApi.util.resetApiState())
    navigate('/login', { replace: true })
  }

  function formatRole(role) {
    if (!role) return ''
    return role.replaceAll('_', ' ').replace(/\b\w/g, (letter) => letter.toUpperCase())
  }

  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6 lg:px-8">
      <div>
        <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Churn management</p>
        <h1 className="text-lg font-semibold text-slate-900">{getPageTitle(pathname)}</h1>
      </div>
      <div className="flex items-center gap-3">
        <div className="hidden text-right sm:block">
          <p className="text-sm font-medium text-slate-800">{user?.name}</p>
          <p className="text-xs text-slate-500">{formatRole(user?.role)}</p>
        </div>
        <CircleUserRound className="text-slate-500" aria-label="User profile" size={32} />
        <button
          type="button"
          onClick={handleLogout}
          className="inline-flex size-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-800"
          aria-label="Log out"
          title="Log out"
        >
          <LogOut aria-hidden="true" size={18} />
        </button>
      </div>
    </header>
  )
}

export default Header
