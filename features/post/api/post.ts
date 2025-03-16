import { CreatePostType, PostType} from './post.types';
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '@/features/auth/lib/base-query-with-access-token';
import { LikesResponseType } from '@/features/comments/api/comments.types';


export const postAPI = createApi({
  reducerPath: 'postAPI',
  tagTypes: ['Post', 'PostLikes'],
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
    })
    })
  })
  

export const {
  useGetPostQuery,
  useUpdatePostMutation, 
  useGetPostLikesQuery,
  useUpdatePostLikeStatusMutation
} = postAPI;
