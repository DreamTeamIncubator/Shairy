import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {baseQueryWithAccessToken} from '@/features/auth/lib/base-query-with-access-token';
import type {Avatars, UploadAvatarResponse} from '@/features/profile/api/profileTypes';

export const profileAPI = createApi({
    reducerPath: 'profileAPI',
    baseQuery: baseQueryWithAccessToken,
    tagTypes: ['profile'],
    endpoints: (builder) => ({
        getProfile: builder.query<Response, void>({
            query: () => ({
                method: 'GET',
                url: `/users/profile`,
            }),
            providesTags: ['profile'],
        }),
        uploadAvatar: builder.mutation<UploadAvatarResponse,  FormData>({
            query: (payload) =>({
                method: 'POST',
                url: `/users/profile/avatar`,
                body: payload,
            }),
            invalidatesTags: ['profile'],
        }),
        deleteAvatar: builder.mutation<void,  void>({
            query: () =>({
                method: 'DELETE',
                url: `/users/profile/avatar`,
            }),
            invalidatesTags: ['profile'],
        }),
    }),
})

type Response = {
    id: number;
    userName: string;
    firstName: string;
    lastName: string;
    city: string;
    country: string;
    region: string;
    dateOfBirth: string;
    aboutMe: string;
    avatars: RootObjectAvatars[];
    createdAt: string;
}
export type RootObjectAvatars = {
    url: string;
    width: number;
    height: number;
    fileSize: number;
    createdAt: string;
}



export const { useGetProfileQuery, useUploadAvatarMutation, useDeleteAvatarMutation } = profileAPI