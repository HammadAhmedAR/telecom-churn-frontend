import { BarChart3, RadioTower, Target, Users } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const navigation = [
  { name: 'Dashboard', to: '/dashboard', icon: BarChart3 },
  { name: 'Customers', to: '/customers', icon: Users },
  { name: 'Retention Actions', to: '/retention-actions', icon: Target },
]

function Sidebar() {
  return (
    <aside className="border-b border-slate-200 bg-slate-950 text-slate-300 lg:sticky lg:top-0 lg:h-screen lg:w-64 lg:shrink-0 lg:border-r lg:border-b-0">
      <div className="flex h-16 items-center gap-3 border-b border-slate-800 px-5">
        <span className="flex size-9 items-center justify-center rounded-lg bg-brand-600 text-white">
          <RadioTower aria-hidden="true" size={20} />
        </span>
        <div>
          <p className="font-semibold tracking-tight text-white">ChurnGuard CRM</p>
          <p className="text-xs text-slate-400">Telecom intelligence</p>
        </div>
      </div>

      <nav aria-label="Primary navigation" className="flex gap-2 overflow-x-auto p-3 lg:block lg:space-y-1 lg:p-4">
        {navigation.map(({ name, to, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex shrink-0 items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-brand-600 text-white'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            <Icon aria-hidden="true" size={19} />
            {name}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
