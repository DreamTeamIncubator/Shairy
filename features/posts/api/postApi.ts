import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { baseQueryWithAccessToken } from '@/features/auth/lib/base-query-with-access-token';

export const postsAPI = createApi({
    reducerPath: 'postsAPI',
    baseQuery: baseQueryWithAccessToken,
    endpoints: (builder) => ({
        getPostById: builder.query<any, any>({
            query: (id) => ({
                method: 'POST',
                url: `/posts/id/${id}`,
                body: id,
            }),
        }),
        uploadImage: builder.mutation<any, any>({
            query: (payload) => ({
                method: 'POST',
                url: `/posts/image`,
                body: payload,
            }),
        }),
        createPost: builder.mutation<any, any>({
            query: (payload) => ({
                method: 'POST',
                url: `/posts`,
                body: payload,
            }),
        }),
    }),
})

export const { useUploadImageMutation, useCreatePostMutation } = postsAPI
