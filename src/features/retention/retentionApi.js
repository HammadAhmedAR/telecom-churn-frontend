import { baseApi } from '../../api/baseApi'

function compactParams(params) {
  return Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== ''),
  )
}

export const retentionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createRetentionAction: builder.mutation({
      query: ({ customerId, actionType, notes }) => ({
        url: `/customers/${encodeURIComponent(customerId)}/retention-actions`,
        method: 'POST',
        body: { actionType, notes },
      }),
      invalidatesTags: (result, _error, { customerId }) => result ? [
        { type: 'CustomerRetention', id: customerId },
        { type: 'RetentionActions', id: 'LIST' },
        { type: 'Dashboard', id: 'SUMMARY' },
      ] : [],
    }),
    getCustomerRetentionActions: builder.query({
      query: ({ customerId, page = 1, limit = 5 }) => ({
        url: `/customers/${encodeURIComponent(customerId)}/retention-actions`,
        params: { page, limit },
      }),
      providesTags: (_result, _error, { customerId }) => [
        { type: 'CustomerRetention', id: customerId },
      ],
    }),
    getRetentionActions: builder.query({
      query: ({ page = 1, limit = 10, search, actionType, status } = {}) => ({
        url: '/retention-actions',
        params: compactParams({ page, limit, search, actionType, status }),
      }),
      providesTags: [{ type: 'RetentionActions', id: 'LIST' }],
    }),
  }),
})

export const {
  useCreateRetentionActionMutation,
  useGetCustomerRetentionActionsQuery,
  useGetRetentionActionsQuery,
} = retentionApi
