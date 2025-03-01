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
  baseUrl: 'https://inctagram.work/api/v1',
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('access-token');
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
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
    console.log('baseQueryWithReauth: NEED REAUTH: ' + args);
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const refreshResult = await baseQueryWithAccessToken(
          {
            url: 'auth/refresh',
            method: 'POST',
            body: {}, // Добавьте refreshToken, если требуется
          },
          api,
          extraOptions
        );

        if (refreshResult.data && typeof refreshResult.data === 'object') {
          const { accessToken } = refreshResult.data as RefreshResponse;
          localStorage.setItem('access-token', accessToken);
          result = await baseQueryWithAccessToken(args, api, extraOptions);
        } else {
          // Здесь можно обработать случай, если refreshToken истек
        }
      } catch (error) {
        console.error(error);
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
