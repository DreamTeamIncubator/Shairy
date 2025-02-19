import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithAccessToken, baseQueryWithReauth } from './../base-query-with-access-token';

export const authAPI = createApi({
  reducerPath: 'authAPI',
  tagTypes: ['me'],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    login: builder.mutation<
      { accessToken: string },
      {
        email: string;
        password: string;
      }
    >({
      query: (body) => ({
        url: `/auth/login`,
        method: 'POST',
        body,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const response = await queryFulfilled; // Wait for the mutation to complete
          // alternative option: set token to localAtorage
          sessionStorage.setItem('access-token', response.data.accessToken);
          await dispatch(authAPI.endpoints.getMe.initiate());
        } catch (error) {
          console.error(error);
          throw error;
        }
      },
    }),
    getMe: builder.query<
      { userId: number; userName: string; email: string; isBlocked: boolean },
      void
    >({
      query: () => `/auth/me`,
      providesTags: ['me'],
    }),
    gitHubLogin: builder.mutation<{ accessToken: string; email: string }, { redirect_url: string }>(
      {
        query: ({ redirect_url }) => ({
          url: `/auth/github/login`,
          method: 'GET',
          params: { redirect_url },
        }),
      }
    ),
    googleLogin: builder.mutation<
      { accessToken: string; email: string },
      { redirectUrl: string; code: string }
    >({
      query: (body) => ({
        url: `/auth/google/login`,
        method: 'POST',
        body,
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: `/auth/logout`,
        method: 'DELETE',
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const response = await queryFulfilled;
        sessionStorage.removeItem('access-token');
        //dispatch(authAPI.util.invalidateTags(['me'])); не работает, потому что он инвалидирует кеш.. делает
        // перезапрос, падает 401 ошибка и он возвращает прошлое значение
        // а вот resetApiState именно сбрасывает стейт
        await dispatch(authAPI.util.resetApiState());
      },
    }),
    forgotPassword: builder.mutation<
      void,
      {
        email: string;
        recaptcha: string;
        baseUrl: string;
      }
    >({
      query: (body) => ({
        url: `/auth/password-recovery`,
        method: 'POST',
        body,
      }),
    }),
    newPassword: builder.mutation<
      void,
      {
        newPassword: string;
        recoveryCode: string;
      }
    >({
      query: (body) => ({
        url: `/auth/new-password`,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useGetMeQuery,
  useGitHubLoginMutation,
  useGoogleLoginMutation,
  useLogoutMutation,
  useForgotPasswordMutation,
  useNewPasswordMutation,
} = authAPI;
