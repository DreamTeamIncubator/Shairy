import { baseQueryWithReauth } from '@/features/auth/lib/base-query-with-access-token'
import { createApi } from '@reduxjs/toolkit/query/react'
import { GetDialogsByUserIdRequest, GetDialogsByUserIdResponse } from './messenger.types'

export const messengerApi = createApi({
  reducerPath: 'messengerApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['messenger'],
  endpoints: (builder) => ({
    getDialogsByUserId: builder.query<
      GetDialogsByUserIdResponse,
      Partial<GetDialogsByUserIdRequest>
    >({
      query: (params) => ({
        url: `/messenger/${params.dialoguePartnerId}`,
        method: 'GET',
        params,
      }),
    }),
  }),
})

export const { useGetDialogsByUserIdQuery } = messengerApi
