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
    }),
    getCustomerById: builder.query({
      query: (customerId) => `/customers/${encodeURIComponent(customerId)}`,
    }),
  }),
})

export const { useGetCustomersQuery, useGetCustomerByIdQuery } = customersApi
