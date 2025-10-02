import { type BaseQueryFn, createApi, type FetchArgs, fetchBaseQuery, type FetchBaseQueryError, type QueryReturnValue, retry } from '@reduxjs/toolkit/query/react';
import { Mutex } from 'async-mutex';
import i18n from 'i18next';
import { authLogout, authRefresh, authReplaceAccessToken } from '../../auth/authSlice';
import type { AppRootState } from '../store';
import type { Tokens } from './wildweatherApi';

const baseQueryWithHeaders =
    fetchBaseQuery({
        baseUrl: ' ', // Needs to be a single space (if empty then RTK Query sets it to the frontend's base URL)
        // Set the request headers
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as AppRootState).auth.accessToken;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            headers.set('Accept-Language', i18n.language);
            headers.set('Accept', 'application/json');
            return headers;
        }
    });

// Change the baseUrl of the backend based on config
const baseQueryWithDynamicUrl: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> =
    async (args, api, extraOptions) => {
        const baseUrl = import.meta.env.VITE_API_URL;
        // Gracefully handle scenarios where data to generate the URL is missing
        if (!baseUrl) {
            return {
                error: {
                    status: 400,
                    statusText: 'Bad Request',
                    data: 'No Base URL configured!',
                    meta: undefined
                }
            };
        }
        const urlEnd = typeof args === 'string' ? args : args.url;
        // Construct a dynamically generated portion of the url
        const adjustedUrl = `${baseUrl}${urlEnd}`;
        const adjustedArgs = typeof args === 'string' ? adjustedUrl : { ...args, url: adjustedUrl };
        // Provide the amended url and other params to the raw base query
        return baseQueryWithHeaders(adjustedArgs, api, extraOptions);
    };

// Retry requests
const baseQueryWithRetry =
    retry(
        baseQueryWithDynamicUrl,
        {
            maxRetries: 2
        }
    );

// Re-authenticate using the refresh token when the access token expired (using mutex to prevent multiple concurrent refresh calls)
const mutex = new Mutex();
const baseQueryWithReAuth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> =
    async (args, api, extraOptions) => {
        // Wait until the mutex is available without locking it
        await mutex.waitForUnlock();
        const isRefresh = (args as FetchArgs).url === '/api/v1/users/refresh';
        let result: QueryReturnValue<unknown, FetchBaseQueryError, unknown> | undefined;
        if (!isRefresh) {
            result = await baseQueryWithRetry(args, api, extraOptions);
        }
        if (!result || (result.error && result.error.status === 401)) {
            // Checking whether the mutex is locked
            if (!mutex.isLocked()) {
                const release = await mutex.acquire();
                // Try to get a new token
                try {
                    api.dispatch(authReplaceAccessToken((api.getState() as AppRootState).auth.refreshToken));
                    const refreshResult = await baseQueryWithRetry({ url: '/api/v1/users/refresh', method: 'post' }, api, extraOptions);
                    const tokens = refreshResult.data as Tokens;
                    if (tokens) {
                        // Store the new token
                        api.dispatch(authRefresh({
                            userId: tokens.userId ?? null,
                            accessToken: tokens.accessToken ?? null,
                            refreshToken: tokens.refreshToken ?? null
                        }));
                        // Retry the initial query
                        if (!isRefresh) {
                            return await baseQueryWithRetry(args, api, extraOptions);
                        }
                        else {
                            return refreshResult;
                        }
                    }
                    else {
                        // Logout (clear the tokens)
                        api.dispatch(authLogout());
                    }
                }
                finally {
                    // Release must be called once the mutex should be released again
                    release();
                }
            }
            else {
                // Wait until the mutex is available without locking it
                await mutex.waitForUnlock();
                return await baseQueryWithRetry(args, api, extraOptions);
            }
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return result as any;
    };

/**
 * Create the empty API, to be used as the base for the rtk-query:codegen script 
 * to use in order to generate the relevant API from Swagger.
 * 
 * @param name - The name of the API as defined in the Store.
 * @param cacheDuration - The number of seconds a query cache is valid for.
 */
export const baseApi = (name: string, cacheDuration: number) => {
    const baseSplitApi = createApi({
        // Set the reducer name to match the value from the Store
        reducerPath: `${name}Api`,
        baseQuery: baseQueryWithReAuth,
        endpoints: () => ({}),
        // Set the cache duration
        keepUnusedDataFor: cacheDuration
    });
    return baseSplitApi;
}
