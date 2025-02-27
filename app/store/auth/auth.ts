'use client'

type RegistrationRequest = {
    userName: string
    email: string
    password: string
    baseUrl: string

}

type RegistrationConfirmationRequest = {
    confirmationCode: string
}

type RegistrationEmailResend = {
    email: string
    baseUrl: string
}

export type ResponseError = {
    statusCode: number;
    messages: { message: string; field: string }[];
    error: string;
}

import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQueryWithReauth} from './../base-query-with-access-token';


export const authAPI = createApi({
    reducerPath: 'authAPI',
    tagTypes: ['me'],
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        registration: builder.mutation<void, RegistrationRequest>({
            query: (payload) => ({
                method: 'POST',
                url: `/auth/registration`,
                body: payload,
            }),
        }),
        registrationConfirmation: builder.mutation<void, RegistrationConfirmationRequest>({
            query: ({confirmationCode}) => ({
                method: 'POST',
                url: `/auth/registration-confirmation`,
                body: {confirmationCode},
            }),
        }),
        registrationEmailResend: builder.mutation<void, RegistrationEmailResend>({
            query: (payload) => ({
                method: 'POST',
                url: `/auth/registration-email-resending`,
                body: payload,
            }),
        }),
        login: builder.mutation<{ accessToken: string }, {
            email: string,
            password: string
        }>({
            query: (body) => ({
                url: `/auth/login`,
                method: 'POST',
                body
            }),
            async onQueryStarted(arg, {dispatch, queryFulfilled}) {
                try {
                    const response = await queryFulfilled; // Wait for the mutation to complete
                    // alternative option: set token to localAtorage
                    sessionStorage.setItem('access-token', response.data.accessToken)
                    await dispatch(authAPI.endpoints.getMe.initiate());
                } catch (error) {
                    console.error(error)
                    throw error
                }
            },
        }),
        getMe: builder.query<{ userId: number, userName: string, email: string; isBlocked: boolean }, void>({
            query: () => `/auth/me`,
            providesTags: ['me']
        }),
        gitHubLogin: builder.mutation<{ accessToken: string, email: string }, { redirect_url: string }>({
            query: ({redirect_url}) => ({
                url: `/auth/github/login`,
                method: 'GET',
                params: {redirect_url},
            })
        }),
        googleLogin: builder.mutation<{ accessToken: string, email: string }, { redirectUrl: string, code: string }>({
            query: (body) => ({
                url: `/auth/google/login`,
                method: 'POST',
                body
            })
        }),
        logout: builder.mutation<void, void>({
            query: () => ({
                url: `/auth/logout`,
                method: 'DELETE'
            }),
            async onQueryStarted(arg, {dispatch, queryFulfilled}) {
                const response = await queryFulfilled;
                sessionStorage.removeItem('access-token');
                //dispatch(authAPI.util.invalidateTags(['me'])); не работает, потому что он инвалидирует кеш.. делает
                // перезапрос, падает 401 ошибка и он возвращает прошлое значение
                // а вот resetApiState именно сбрасывает стейт
                await dispatch(authAPI.util.resetApiState());
            }
        }),
    }),
})

export const {
    useLoginMutation,
    useGetMeQuery,
    useGitHubLoginMutation,
    useGoogleLoginMutation,
    useLogoutMutation,
    useRegistrationMutation,
    useRegistrationConfirmationMutation,
    useRegistrationEmailResendMutation,
} = authAPI;