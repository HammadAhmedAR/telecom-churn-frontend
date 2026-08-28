import { createSlice } from '@reduxjs/toolkit'
import { loadAuthState } from './authStorage'

const persistedAuth = loadAuthState()

const authSlice = createSlice({
  name: 'auth',
  initialState: persistedAuth || { token: null, user: null },
  reducers: {
    setCredentials(state, action) {
      state.token = action.payload.token
      state.user = action.payload.user
    },
    logout(state) {
      state.token = null
      state.user = null
    },
  },
})

export const { setCredentials, logout } = authSlice.actions
export const selectAuthToken = (state) => state.auth.token
export const selectCurrentUser = (state) => state.auth.user
export const selectIsAuthenticated = (state) => Boolean(state.auth.token)
export default authSlice.reducer
