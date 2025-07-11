import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { Mutex } from 'async-mutex';

interface RefreshResponse {
  accessToken: string;
}

export const baseQueryWithAccessToken = fetchBaseQuery({
  baseUrl: 'https://shairy.org/api/v1',
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('access-token');
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
  credentials: 'include'
});

const mutex = new Mutex();

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
 
  await mutex.waitForUnlock();
  let result = await baseQueryWithAccessToken(args, api, extraOptions);

  if (
    result.error?.status === 401 ||
    (result.error?.status === 'PARSING_ERROR' && result.error?.originalStatus === 401)
  ) {
 
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const refreshResult = await baseQueryWithAccessToken(
          {
            url: '/auth/update-tokens',
            method: 'POST',
            credentials: 'include',
          },
          api,
          extraOptions
        );

        if (refreshResult.data && typeof refreshResult.data === 'object') {
          const { accessToken } = refreshResult.data as RefreshResponse;
          localStorage.setItem('access-token', accessToken);

          const newHeaders = new Headers();
          newHeaders.set('authorization', `Bearer ${accessToken}`);

          const modifiedArgs =
          typeof args === 'string'
              ? { url: args }
              : { ...args, headers: { ...args.headers, authorization: `Bearer ${accessToken}` } };

          result = await baseQueryWithAccessToken(modifiedArgs, api, extraOptions);
        } 
      } catch (error) {
        console.error('❌ Ошибка при обновлении токена:', error);
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQueryWithAccessToken(args, api, extraOptions);
    }
  }

  return result;
};
