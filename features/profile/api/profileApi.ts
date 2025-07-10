import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {baseQueryWithAccessToken} from '@/features/auth/lib/base-query-with-access-token';
import type {Avatars, UpdateProfileRequest, UploadAvatarResponse} from '@/features/profile/api/profileTypes';

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
        uploadAvatar: builder.mutation<UploadAvatarResponse, FormData>({
            query: (payload) => ({
                method: 'POST',
                url: `/users/profile/avatar`,
                body: payload,
            }),
            invalidatesTags: ['profile'],
        }),
        deleteAvatar: builder.mutation<void, void>({
            query: () => ({
                method: 'DELETE',
                url: `/users/profile/avatar`,
            }),
            invalidatesTags: ['profile'],
        }),
        updateProfile: builder.mutation<Response, UpdateProfileRequest>({
            query: (data: UpdateProfileRequest) => {

                let processedData = {...data};
                if (data.dateOfBirth) {
                    const [day, month, year] = data.dateOfBirth.split('/').map(Number);
                    processedData.dateOfBirth = new Date(year, month - 1, day).toISOString();
                }

                return {
                    method: 'PUT',
                    url: '/users/profile',
                    body: processedData,
                };
            },
            async onQueryStarted(data, {dispatch, queryFulfilled}) {
                try {
                    await queryFulfilled;
                    dispatch(
                        profileAPI.util.updateQueryData('getProfile', undefined, (draft) => {
                            Object.assign(draft, data);
                        })
                    );
                } catch (error) {
                    console.error('❌ Ошибка обновления кеша:', error);
                }
            },
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


export const {
    useGetProfileQuery,
    useUploadAvatarMutation,
    useDeleteAvatarMutation,
    useUpdateProfileMutation,
} = profileAPI