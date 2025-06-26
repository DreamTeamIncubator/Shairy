import { baseQueryWithReauth } from '@/features/auth/lib/base-query-with-access-token'
import { HomeRequest, HomeResponse } from './types'
import { createApi } from '@reduxjs/toolkit/query/react'

export const homeAPI = createApi({
  reducerPath: 'homeAPI',
  tagTypes: [],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getPostsFollowers: builder.query<HomeResponse, HomeRequest>({
      query: (params) => ({
        url: '/home/publications-followers',
        method: 'GET',
        params,
      }),
    }),
    followingOfUser: builder.mutation<void, { selectedUserId: number }>({
      query: (body) => ({
        url: '/users/following',
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const {
  useGetPostsFollowersQuery,
  useFollowingOfUserMutation,
  useLazyGetPostsFollowersQuery,
} = homeAPI
