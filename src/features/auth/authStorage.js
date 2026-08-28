export const AUTH_STORAGE_KEY = 'telecomChurnAuth'

export function normalizeAuthState(authState) {
  if (!authState || typeof authState.token !== 'string' || !authState.token.trim()) return null

  const user = authState.user
  if (
    !user
    || (typeof user.id !== 'number' && typeof user.id !== 'string')
    || typeof user.name !== 'string'
    || typeof user.email !== 'string'
    || typeof user.role !== 'string'
  ) return null

  return {
    token: authState.token,
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
  }
}

export function loadAuthState() {
  if (typeof window === 'undefined') return null

  try {
    const storedValue = window.localStorage.getItem(AUTH_STORAGE_KEY)
    if (!storedValue) return null

    const authState = normalizeAuthState(JSON.parse(storedValue))
    if (!authState) window.localStorage.removeItem(AUTH_STORAGE_KEY)
    return authState
  } catch {
    clearAuthState()
    return null
  }
}

export function saveAuthState(authState) {
  const safeAuthState = normalizeAuthState(authState)
  if (!safeAuthState || typeof window === 'undefined') return false

  try {
    window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(safeAuthState))
    return true
  } catch {
    return false
  }
}

export function clearAuthState() {
  if (typeof window === 'undefined') return

  try {
    window.localStorage.removeItem(AUTH_STORAGE_KEY)
  } catch {
    // Storage can be unavailable in restricted browser contexts; Redux logout still proceeds.
  }
}
