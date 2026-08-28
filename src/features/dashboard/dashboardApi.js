import { baseApi } from '../../api/baseApi'

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardSummary: builder.query({
      query: () => '/dashboard/summary',
    }),
  }),
})

export const { useGetDashboardSummaryQuery } = dashboardApi
