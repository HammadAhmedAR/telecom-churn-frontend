import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { logout } from '../features/auth/authSlice'
import { prepareAuthHeaders } from '../features/auth/authHeaders'
import { clearAuthState } from '../features/auth/authStorage'

const rawBaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  prepareHeaders: prepareAuthHeaders,
})

const baseQueryWithAuth = async (args, api, extraOptions) => {
  const result = await rawBaseQuery(args, api, extraOptions)

  if (result.error?.status === 401) {
    const requestUrl = typeof args === 'string' ? args : args.url
    const isLoginRequest = requestUrl === '/auth/login' || requestUrl === 'auth/login'

    api.dispatch(logout())
    clearAuthState()
    if (!isLoginRequest) api.dispatch(baseApi.util.resetApiState())
  }

  return result
}

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithAuth,
  tagTypes: ['Dashboard', 'Customers', 'RetentionActions', 'CustomerRetention'],
  endpoints: () => ({}),
})
