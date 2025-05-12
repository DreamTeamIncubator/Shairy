import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQueryWithAccessToken} from '@/features/auth/lib/base-query-with-access-token';
import { UserByName, UsersQueryParams, UsersResponse } from './users.types';

export const usersAPI = createApi({
    reducerPath: 'usersAPI',
    baseQuery: baseQueryWithAccessToken,
    tagTypes: ['users'],
    endpoints: (builder) => ({
      getUsers: builder.query<UsersResponse, UsersQueryParams>({
        query: (params) => ({
          method: 'GET',
          url: '/users',
          params,
        }),
        providesTags: ['users'],
      }),
      getUsersByUserName: builder.query<UserByName, { userName: string }>({
        query: ({ userName }) => ({
          method: 'GET',
          url: `/users/${userName}`,
        }),
        providesTags: ['users'],
      }),      
      followUser: builder.mutation<void, { selectedUserId: number }>({
        query: ({ selectedUserId }) => ({
          method: 'POST',
          url: `/users/following`,
          body: { selectedUserId },
        }),
        invalidatesTags: ['users']
      }), 
      unfollowUser: builder.mutation<void, { userId: number }>({
        query: ({ userId }) => ({
          method: 'DELETE',
          url: `/users/follower/${userId}`,
        }),
        invalidatesTags: ['users']
      }),
    })
  });
  

  export const {
    useGetUsersQuery,
    useGetUsersByUserNameQuery,
    useFollowUserMutation,
    useUnfollowUserMutation,
  } = usersAPI;
  