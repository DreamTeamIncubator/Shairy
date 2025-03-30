import { baseQueryWithAccessToken } from '@/features/auth/lib/base-query-with-access-token'
import { createApi } from '@reduxjs/toolkit/query/react'
import {type MyPaymentsResponce, PaymentRequest, PaymentResponse, SubscriptionsRequest} from './types'

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
      invalidatesTags:['Subscription']
    }),
    getCurrentPayment: builder.query<SubscriptionsRequest, void>({
      query: () => ({
        method: 'GET',
        url: `/subscriptions/current-payment-subscriptions`,
      }),
      providesTags:['Subscription']
    }),
    getMyPayments: builder.query<MyPaymentsResponce[], void>({
      query: () => ({
        method: 'GET',
        url: `/subscriptions/my-payments`,
      }),
      providesTags:['Subscription']
    }),
    cancelAutoRenewal: builder.mutation<void, void>({
      query: () => ({
        url: "/subscriptions/canceled-auto-renewal",
        method: "POST",
      }),
      invalidatesTags:['Subscription']
    }), 
  }),
})

export const { usePaySubscribeMutation, useGetCurrentPaymentQuery, useCancelAutoRenewalMutation, useGetMyPaymentsQuery} = subscriptionsAPI
