import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { Mutex } from "async-mutex";

type RefreshResponse = {
    accessToken: string;
}

export const baseQueryWithAccessToken = fetchBaseQuery({
    baseUrl: 'https://inctagram.work/api/v1',
    prepareHeaders: (headers, { getState }) => {
        // вы можете брать accessToken из localStorage/sessionStorage
        const token = sessionStorage.getItem('access-token');

        // Если у нас есть токен в состоянии, передаем его
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }

        return headers;
    },
});


// create a new mutex
const mutex = new Mutex()

export const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    // wait until the mutex is available without locking it
    await mutex.waitForUnlock()
    let result = await baseQueryWithAccessToken(args, api, extraOptions)
    if (result.error?.status === 401 ||
        (result.error?.status === 'PARSING_ERROR' && result.error?.originalStatus === 401)
    ) {
        console.log('baseQueryWithReauth: NEED REAUTH: ' + args)
        // checking whether the mutex is locked
        if (!mutex.isLocked()) {
            const release = await mutex.acquire()
            try {
                const refreshResult = await baseQueryWithAccessToken(
                    {
                        url: 'auth/refresh',
                        method: 'POST',
                        body: {}, // Include the body if needed, e.g., { refreshToken: '...' }
                    },
                    api,
                    extraOptions
                )
                if ((refreshResult.data as RefreshResponse).accessToken) {
                    sessionStorage.setItem('access-token', (refreshResult.data as RefreshResponse).accessToken)
                    result = await baseQueryWithAccessToken(args, api, extraOptions)
                } else {
                    // api.dispatch(loggedOut())
                    // posiible scenario if refresh токен тоже короткоживущий и вкладка долго открыта, то пользователь нажмёт
                    // кнопку, а у него протух и аккссее и рефреш, то в этом случае нужно явно его вылогинить (зачистить auth информацию в стейте)
                }
            } catch (error) {
                console.error(error)
            }
            finally {
                // release must be called once the mutex should be released again.
                release()
            }
        }
        else {
            // wait until the mutex is available without locking it
            await mutex.waitForUnlock()
            result = await baseQueryWithAccessToken(args, api, extraOptions)
        }
    }
    return result
}