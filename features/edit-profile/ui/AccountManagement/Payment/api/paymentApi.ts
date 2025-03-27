import { baseQueryWithAccessToken } from '@/features/auth/lib/base-query-with-access-token'
import { createApi } from '@reduxjs/toolkit/query/react'
import { PaymentRequest, PaymentResponse, SubscriptionsRequest } from './types'

export const subscriptionsAPI = createApi({
  reducerPath: 'subscriptionsAPI',
  baseQuery: baseQueryWithAccessToken,
  endpoints: (builder) => ({
    paySubscribe: builder.mutation<PaymentResponse, PaymentRequest>({
      query: (body) => ({
        method: 'POST',
        url: `/subscriptions`,
        body,
      }),
    }),
    getCurrentPayment: builder.query<SubscriptionsRequest, void>({
      query: () => ({
        method: 'GET',
        url: `/subscriptions/current-payment-subscriptions`,
      }),
    }),
  }),
})

export const { usePaySubscribeMutation, useGetCurrentPaymentQuery } = subscriptionsAPI
