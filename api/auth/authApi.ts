// 'use client'
//
// import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
//
// export const authApi = createApi({
//     reducerPath: 'authApi',
//     baseQuery: fetchBaseQuery({baseUrl: 'https://inctagram.work/api/v1'}),
//     endpoints: (builder) => ({
//         signUp: builder.mutation<any, SignUpRequest>({
//             query: (payload) => ({
//                 method: 'POST',
//                 url: `/auth/registration`,
//                 body: payload,
//             }),
//         }),
//     }),
// })
//
// export const {useSignUpMutation} = authApi
//
// type SignUpRequest = {
//     userName: string
//     email: string
//     password: string
//     baseUrl: string
// }
