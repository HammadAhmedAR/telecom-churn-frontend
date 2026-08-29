import { baseApi } from '../../api/baseApi'

function compactParams(params) {
  return Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== ''),
  )
}

export const customersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCustomers: builder.query({
      query: ({ page = 1, limit = 10, search, risk, contract, sortBy, sortOrder } = {}) => ({
        url: '/customers',
        params: compactParams({ page, limit, search, risk, contract, sortBy, sortOrder }),
      }),
      providesTags: [{ type: 'Customers', id: 'LIST' }],
    }),
    getCustomerById: builder.query({
      query: (customerId) => `/customers/${encodeURIComponent(customerId)}`,
      providesTags: (_result, _error, customerId) => [
        { type: 'Customers', id: customerId },
      ],
    }),
    createCustomer: builder.mutation({
      query: (body) => ({
        url: '/customers',
        method: 'POST',
        body,
      }),
      invalidatesTags: (result) => result ? [
        { type: 'Customers', id: 'LIST' },
        { type: 'Dashboard', id: 'SUMMARY' },
      ] : [],
    }),
  }),
})

export const {
  useCreateCustomerMutation,
  useGetCustomersQuery,
  useGetCustomerByIdQuery,
} = customersApi
