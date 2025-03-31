// import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
// import {baseQueryWithAccessToken} from '@/features/auth/lib/base-query-with-access-token';
//
// export const profileAPI = createApi({
//     reducerPath: 'profileAPI',
//     baseQuery: baseQueryWithAccessToken,
//     endpoints: (builder) => ({
//         getProfile: builder.query<Response, void>({
//             query: () => ({
//                 method: 'GET',
//                 url: `/users/profile`,
//             }),
//         }),
//     }),
// })
//
// type Response = {
//     id: number;
//     userName: string;
//     firstName: string;
//     lastName: string;
//     city: string;
//     country: string;
//     region: string;
//     dateOfBirth: string;
//     aboutMe: string;
//     avatars: RootObjectAvatars[];
//     createdAt: string;
// }
// export type RootObjectAvatars = {
//     url: string;
//     width: number;
//     height: number;
//     fileSize: number;
//     createdAt: string;
// }
//
//
//
// export const { useGetProfileQuery } = profileAPI

