import { baseQueryWithAccessToken } from '@/features/auth/lib/base-query-with-access-token'
import { createApi } from '@reduxjs/toolkit/query/react'
import {
  CostPaymentResponse,
  MyPaymentsResponse,
  PaymentRequest,
  PaymentResponse,
  SubscriptionsResponse,
} from './types'

export const subscriptionsAPI = createApi({
  reducerPath: 'subscriptionsAPI',
  baseQuery: baseQueryWithAccessToken,
  tagTypes: ['Subscription'],
  endpoints: (builder) => ({
    paySubscribe: builder.mutation<PaymentResponse, PaymentRequest>({
      query: (body) => ({
        method: 'POST',
        url: `/subscriptions`,
        body,
      }),
      invalidatesTags: ['Subscription'],
    }),
    getCurrentPayment: builder.query<SubscriptionsResponse, void>({
      query: () => ({
        method: 'GET',
        url: `/subscriptions/current-payment-subscriptions`,
      }),
      providesTags: ['Subscription'],
    }),
    getMyPayments: builder.query<MyPaymentsResponse[], void>({
      query: () => ({
        method: 'GET',
        url: `/subscriptions/my-payments`,
      }),
      providesTags: ['Subscription'],
    }),
    cancelAutoRenewal: builder.mutation<void, void>({
      query: () => ({
        url: '/subscriptions/canceled-auto-renewal',
        method: 'POST',
      }),
      invalidatesTags: ['Subscription'],
    }),
    getCostPayment: builder.query<CostPaymentResponse, void>({
      query: () => ({
        method: 'GET',
        url: `/subscriptions/cost-of-payment-subscriptions`,
      }),
      providesTags: ['Subscription'],
    }),
  }),
})

export const {
  usePaySubscribeMutation,
  useGetCurrentPaymentQuery,
  useCancelAutoRenewalMutation,
  useGetCostPaymentQuery,
  useGetMyPaymentsQuery,
} = subscriptionsAPI
