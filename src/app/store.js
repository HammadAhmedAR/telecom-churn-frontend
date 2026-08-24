import { configureStore } from '@reduxjs/toolkit'
import { baseApi } from '../api/baseApi'
import retentionReducer from '../features/retention/retentionSlice'

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    retention: retentionReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
})
