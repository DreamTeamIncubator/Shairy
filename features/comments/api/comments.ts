import { baseQueryWithReauth } from '@/features/auth/lib/base-query-with-access-token'
import { createApi } from '@reduxjs/toolkit/query/react'
import {
  CommentItem,
  CommentsAnswerResponseType,
  CommentsResponseType,
  LikesResponseType,
} from './comments.types'
import { ApiErrorResponse } from './error.types'

export const commentsAPI = createApi({
  reducerPath: 'commentsAPI',
  tagTypes: ['Post', 'Comment', 'Answer', 'Like'],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getComments: builder.query<CommentsResponseType, { postId: number }>({
      query: ({ postId }) => ({
        url: `/posts/${postId}/comments`,
        method: 'GET',
      }),
      providesTags: (result, error, { postId }) => [{ type: 'Post', id: postId }],
    }),
    getCommentAnswers: builder.query<
      CommentsAnswerResponseType,
      { postId: number; commentId: number }
    >({
      query: ({ postId, commentId }) => ({
        url: `/posts/${postId}/comments/${commentId}/answers`,
        method: 'GET',
      }),
      providesTags: (result, error, { postId, commentId }) => [
        { type: 'Post', id: postId },
        { type: 'Comment', id: commentId },
      ],
    }),
    getCommentsAnswersLikes: builder.query<
      LikesResponseType,
      { postId: number; commentId: number; answerId: number }
    >({
      query: ({ postId, commentId, answerId }) => ({
        url: `/posts/${postId}/comments/${commentId}/answers/${answerId}/likes`,
        method: 'GET',
      }),
      providesTags: (result, error, { postId, commentId, answerId }) => [
        { type: 'Post', id: postId },
        { type: 'Comment', id: commentId },
        { type: 'Answer', id: answerId },
        { type: 'Like', id: answerId },
      ],
    }),
    getCommentsLike: builder.query<LikesResponseType, { postId: number; commentId: number }>({
      query: ({ postId, commentId }) => ({
        url: `/posts/${postId}/comments/${commentId}/likes`,
        method: 'GET',
      }),
      providesTags: (result, error, { postId, commentId }) => [
        { type: 'Post', id: postId },
        { type: 'Comment', id: commentId },
        { type: 'Like', id: commentId },
      ],
    }),
    updateCommentLikeStatus: builder.mutation<
      void,
      { postId: number; commentId: number; likeStatus: 'NONE' | 'LIKE' }
    >({
      query: ({ postId, commentId, likeStatus }) => ({
        url: `/posts/${postId}/comments/${commentId}/like-status`,
        method: 'PUT',
        body: { likeStatus },
      }),
      invalidatesTags: (result, error, { postId, commentId }) => [
        { type: 'Post', id: postId },
        { type: 'Comment', id: commentId },
        { type: 'Like', id: commentId },
      ],
    }),
    addComment: builder.mutation<CommentItem, { postId: number; content: string }>({
      query: ({ postId, content }) => ({
        url: `/posts/${postId}/comments`,
        method: 'POST',
        body: { content },
      }),
      invalidatesTags: ['Post', 'Comment'],
      transformErrorResponse: (response: { status: number; data: ApiErrorResponse }) => {
        return response.data
      },
    }),
    addCommentAnswer: builder.mutation<
      CommentItem,
      { postId: number; commentId: number; content: string }
    >({
      query: ({ postId, commentId, content }) => ({
        url: `/posts/${postId}/comments/${commentId}/answers`,
        method: 'POST',
        body: { content },
      }),
      invalidatesTags: (result, error, { postId, commentId }) => [
        { type: 'Post', id: postId },
        { type: 'Comment', id: commentId },
      ],
      transformErrorResponse: (response: { status: number; data: ApiErrorResponse }) => {
        return response.data
      },
    }),
  }),
})

export const {
  useGetCommentsQuery,
  useGetCommentAnswersQuery,
  useGetCommentsAnswersLikesQuery,
  useGetCommentsLikeQuery,
  useUpdateCommentLikeStatusMutation,
  useAddCommentMutation,
  useAddCommentAnswerMutation,
} = commentsAPI
