import { baseApi } from '../../api/baseApi'

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardSummary: builder.query({
      query: () => '/dashboard/summary',
      providesTags: [{ type: 'Dashboard', id: 'SUMMARY' }],
    }),
  }),
})

export const { useGetDashboardSummaryQuery } = dashboardApi
