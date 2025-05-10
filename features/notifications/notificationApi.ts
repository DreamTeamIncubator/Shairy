import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from '@/features/auth/lib/base-query-with-access-token'
import { GetNotificationResponse, NotificationsResponse } from './types'
export const notificationAPI = createApi({
  reducerPath: 'notificationAPI',
  tagTypes: ['Notifications'],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getNotifications: builder.query<
      NotificationsResponse,
      { cursor?: number; isRead?: boolean; pageSize?: number; sortDirection?: 'asc' | 'desc' }
    >({
      query: (
        params: {
          cursor?: number
          isRead?: boolean
          pageSize?: number
          sortDirection?: 'asc' | 'desc'
        } = {}
      ) => {
        const { cursor, isRead, pageSize, sortDirection = 'desc' } = params

        return {
          method: 'GET',
          url: `/notifications${cursor ? `/${cursor}` : ''}`,
          params: {
            sortBy: 'notifyAt', // сервер всегда сортирует по notifyAt
            isRead,
            pageSize,
            sortDirection,
          },
        }
      },
      providesTags: ['Notifications'],
    }),

    markAsReadOnServer: builder.mutation<GetNotificationResponse, number[]>({
      query: (ids: number[]) => ({
        method: 'PUT',
        url: `/notifications/mark-as-read`,
        body: { ids },
      }),
      invalidatesTags: ['Notifications'], //
    }),
  }),
})
export const { useGetNotificationsQuery, useMarkAsReadOnServerMutation } = notificationAPI
