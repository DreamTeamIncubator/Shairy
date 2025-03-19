import { authAPI } from '@/features/auth/api/auth';
import { configureStore } from '@reduxjs/toolkit';
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query';
import {postsAPI} from '@/features/posts/api/postApi';
import {profileAPI} from '@/features/profile/api/profileApi';

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [authAPI.reducerPath]: authAPI.reducer,
    [postsAPI.reducerPath]: postsAPI.reducer,
    [profileAPI.reducerPath]: profileAPI.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authAPI.middleware, postsAPI.middleware, profileAPI.middleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
