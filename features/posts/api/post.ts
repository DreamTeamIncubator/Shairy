import { PostType, type ResponceAllPosts} from './post.types';
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '@/features/auth/lib/base-query-with-access-token';
import { LikesResponseType } from '@/features/comments/api/comments.types';


export const postAPI = createApi({
  reducerPath: 'postAPI',
  tagTypes: ['Post', 'PostLikes','UserPosts'],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getPost: builder.query<PostType, {postId: number}>({
      query: ({postId})=>({
        url: `/posts/id/${postId}`,
        method: 'GET'
      }),
      providesTags: (result, error, {postId}) =>
        result ? [{type: 'Post', id: postId}] : []
    }),
    updatePost: builder.mutation<void, {postId:number, description:string}>({
      query: ({postId, description}) => ({
        url: `/posts/${postId}`,
        method: 'PUT',
        body: {description}
      }),
      invalidatesTags: (result, error, {postId}) => [{type: 'Post', id: postId}]
    }),
    getPostLikes: builder.query<LikesResponseType, {postId: number}>({
      query: ({postId})=> ({
        url: `/posts/${postId}/likes`,
        method: 'GET'
      }),
      providesTags: (result, error, {postId}) =>
        result ? [{type: 'PostLikes', id: postId}] : []
    }),
    updatePostLikeStatus: builder.mutation<void, {postId:number, likeStatus: 'NONE' | 'LIKE'}>({
      query: ({postId, likeStatus}) => ({
        url: `/posts/${postId}/like-status`,
        method: 'PUT',
        body: {likeStatus}
      }), invalidatesTags: (result, error,  {postId}) => [
        {type: 'PostLikes', id: postId },
        {type: 'Post', id: postId}
      ]
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
      getAllUsersPosts: builder.query<ResponceAllPosts,  { pageSize: number, endCursorPostId?: number | null, userId: number }>({
          query: ({ pageSize, endCursorPostId, userId })=>({
              method: 'GET',
              url: `public-posts/user/${userId}/${endCursorPostId || ''}`,
              params: {
                  pageSize,
                  endCursorPostId,
                  sortBy: 'createdAt',
                  sortDirection: 'desc',
              }
          }),
          serializeQueryArgs: ({ endpointName }) => endpointName,
          merge: (currentCache, newPosts) => {
              const existingPostIds = new Set(currentCache.items.map((item) => item.id));
              const uniquePosts = newPosts.items.filter((post) => !existingPostIds.has(post.id));
              currentCache.items.push(...uniquePosts);
          },
          forceRefetch({ currentArg, previousArg }) {
              return currentArg?.endCursorPostId !== previousArg?.endCursorPostId;
          },
          providesTags: res => (res ? res.items.map(({ id }) => ({ type: 'UserPosts', id })) : []),
      }),
      deleteUserPost: builder.mutation<void, number>({
          query: (postId) => ({
              method: 'DELETE',
              url: `posts/${postId}`
          }),
      }),
    }),

  })


export const {
  useGetPostQuery,
  useUpdatePostMutation,
  useGetPostLikesQuery,
  useUpdatePostLikeStatusMutation,
    useUploadImageMutation,
    useCreatePostMutation,
    useDeleteUserPostMutation,
    useGetAllUsersPostsQuery
} = postAPI;
