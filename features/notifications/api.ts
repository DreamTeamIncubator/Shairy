import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from '@/features/auth/lib/base-query-with-access-token'
export const notificationAPI = createApi({
  reducerPath: 'notificationAPI',
  tagTypes: ['Notifications'],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getNotifications: builder.query({
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
  }),
})

export const { useGetNotificationsQuery } = notificationAPI
