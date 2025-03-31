import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth} from '@/features/auth/lib/base-query-with-access-token'

export const profile = createApi({
    reducerPath: 'profile',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        getprofile: builder.query<ResponceProfile, number>({
            query: (profileId)=>({
                method: 'GET',
                url: `public-user/profile/${profileId}`
            })
        }),
        updateProfile: builder.mutation<ResponseUpdateProfile, RequestUpdateProfile>({
            query: (body) => ({
                url: '/users/profile',
                method: 'PUT',
                body,
            }),
        })
    }),
})

export const { useGetprofileQuery, useUpdateProfileMutation } = profile

export type Avatars = {
    url: string;
    width: number;
    height: number;
    fileSize: number;
    createdAt: string;
}

export interface UserMetadata {
    following: number;
    followers: number;
    publications: number;
}

export type ResponceProfile  = {
    id: number;
    userName: string;
    aboutMe: string;
    avatars: Avatars[];
    userMetadata: UserMetadata;
    hasPaymentSubscription: boolean;
}

export type RequestUpdateProfile = {
    userName: string
    firstName: string
    lastName: string
    city: string
    country: string
    region: string
    dateOfBirth: string
    aboutMe: string
}

type ResponseUpdateProfile = {
    statusCode: number
    messages: [
        {
            message: string
            field: string
        }
    ]
    error: string
}