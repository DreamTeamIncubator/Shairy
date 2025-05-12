import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth} from '@/features/auth/lib/base-query-with-access-token'
import type {ResponceProfile} from '@/features/profile/api/profileTypes';

export const publicProfile = createApi({
    reducerPath: 'profile',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['profile', 'PublicProfile'],
    endpoints: (builder) => ({
        getPublicProfile: builder.query<ResponceProfile, number>({
            query: (profileId) => ({
              method: 'GET',
              url: `public-user/profile/${profileId}`,
            }),
            providesTags: (result, error, id) => [{ type: 'PublicProfile', id }],
          })          
    }),
})

export const { useGetPublicProfileQuery} = publicProfile

