import { baseApi } from '../../api/baseApi'

export const simulationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    simulateCustomer: builder.mutation({
      query: ({ customerId, overrides }) => ({
        url: `/customers/${encodeURIComponent(customerId)}/simulate`,
        method: 'POST',
        body: overrides,
      }),
    }),
  }),
})

export const { useSimulateCustomerMutation } = simulationApi
