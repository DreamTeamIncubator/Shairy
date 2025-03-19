//
// import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
// import { baseQueryWithReauth} from '@/features/auth/lib/base-query-with-access-token'
//
// export const posts = createApi({
//     reducerPath: 'posts',
//     tagTypes: ['Post', 'Posts', 'UserPosts'],
//     baseQuery: baseQueryWithReauth,
//     endpoints: (builder) => ({
//         getpost: builder.query<Responce, number>({
//             query: (postId)=>({
//                 method: 'GET',
//                 url: `posts/id/${postId}`,
//             }),
//             providesTags: ['Post']
//         }),
//         getAllUsersPosts: builder.query<ResponceAllPosts,  { pageSize: number, endCursorPostId?: number | null, userId: number }>({
//             query: ({ pageSize, endCursorPostId, userId })=>({
//                 method: 'GET',
//                 url: `public-posts/user/${userId}/${endCursorPostId || ''}`,
//                 params: {
//                     pageSize,
//                     endCursorPostId,
//                     sortBy: 'createdAt',
//                     sortDirection: 'desc',
//                 }
//             }),
//             serializeQueryArgs: ({ endpointName }) => endpointName,
//             merge: (currentCache, newPosts) => {
//                 const existingPostIds = new Set(currentCache.items.map((item) => item.id));
//                 const uniquePosts = newPosts.items.filter((post) => !existingPostIds.has(post.id));
//                 currentCache.items.push(...uniquePosts);
//             },
//             forceRefetch({ currentArg, previousArg }) {
//                 return currentArg?.endCursorPostId !== previousArg?.endCursorPostId;
//             },
//             providesTags: res => (res ? res.items.map(({ id }) => ({ type: 'UserPosts', id })) : []),
//         }),
//         deleteUserPost: builder.mutation<void, number>({
//             query: (postId) => ({
//                 method: 'DELETE',
//                 url: `posts/${postId}`
//             }),
//             invalidatesTags: (res, err, postId) => [{ type: 'UserPosts', id: postId }],
//         }),
//
//     }),
// })
//
//
// export const {useDeleteUserPostMutation, useGetpostQuery, useGetAllUsersPostsQuery} = posts
//
//
//
// export type Images = {
//   url: string
//   width: number
//   height: number
//   fileSize: number
//   createdAt: string
//   uploadId: string
// }
//
// export type Owner = {
//   firstName: string
//   lastName: string
// }
//
// export type Responce = {
//   id: number
//   userName: string
//   description: string
//   location: string
//   images: Images[]
//   createdAt: string
//   updatedAt: string
//   ownerId: number
//   avatarOwner: string
//   owner: Owner
//   likesCount: number
//   isLiked: boolean
//   avatarWhoLikes: boolean
// }
//
// export type Items = {
//   id: number;
//   userName: string;
//   description: string;
//   location: string;
//   images: Images[];
//   createdAt: string;
//   updatedAt: string;
//   ownerId: number;
//   avatarOwner: string;
//   owner: Owner;
//   likesCount: number;
//   isLiked: boolean;
//   avatarWhoLikes: boolean;
// }
//
// export type ResponceAllPosts =  {
//   totalCount: number;
//   pageSize: number;
//   totalUsers: number;
//   items: Items[];
// }
//
//
// //added for test
// export const allPosts = createApi({
//     reducerPath: 'allPosts',
//     tagTypes: [ 'AllPosts'],
//     baseQuery: baseQueryWithReauth,
// //     baseQuery:   fetchBaseQuery({
// //     baseUrl: 'https://inctagram.work/api/v1',
// // }),
//     endpoints: (builder) => ({
//         getAllPosts: builder.query<ResponceAllPosts,  { pageSize: number, endCursorPostId?: number | null }>({
//             query: ({ pageSize, endCursorPostId })=>({
//                 method: 'GET',
//                 url: `public-posts/all/${endCursorPostId || ''}`,
//                 params: {
//                     pageSize,
//                     endCursorPostId,
//                     sortBy: 'createdAt',
//                     sortDirection: 'desc',
//                 }
//             }),
//             serializeQueryArgs: ({ endpointName }) => endpointName,
//             merge: (currentCache, newPosts) => {
//                 const existingPostIds = new Set(currentCache.items.map((item) => item.id));
//                 const uniquePosts = newPosts.items.filter((post) => !existingPostIds.has(post.id));
//                 currentCache.items.push(...uniquePosts);
//                 // currentCache.items.push(...newPosts.items);
//             },
//             forceRefetch({ currentArg, previousArg }) {
//                 return currentArg?.endCursorPostId !== previousArg?.endCursorPostId;
//             },
//             providesTags: ['AllPosts'],
//         }),
//     }),
// })
//
//
// export const {useGetAllPostsQuery} = allPosts