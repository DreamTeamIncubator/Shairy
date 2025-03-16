import { authAPI } from '@/features/auth/api/auth';
import { commentsAPI } from '@/features/comments/api/comments';
import { postAPI } from '@/features/post/api/post';
import { configureStore } from '@reduxjs/toolkit';
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [authAPI.reducerPath]: authAPI.reducer,
    [postAPI.reducerPath]: postAPI.reducer,
    [commentsAPI.reducerPath]: commentsAPI.reducer, 
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authAPI.middleware, 
    postAPI.middleware, 
    commentsAPI.middleware,
  ),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

