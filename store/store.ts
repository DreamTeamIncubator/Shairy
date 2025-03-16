import { authAPI } from '@/features/auth/api/auth';
import { commentsAPI } from '@/features/comments/api/comments';
import { postAPI } from '@/features/post/api/post';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import {allPosts, posts} from '@/features/posts/api/posts';
import {profile} from '@/features/profile/api/profile';

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [authAPI.reducerPath]: authAPI.reducer,
<<<<<<< HEAD
    [postAPI.reducerPath]: postAPI.reducer,
    [commentsAPI.reducerPath]: commentsAPI.reducer, 
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authAPI.middleware, 
    postAPI.middleware, 
    commentsAPI.middleware,
  ),
=======
    [posts.reducerPath]: posts.reducer,
    [profile.reducerPath]: profile.reducer,
    [allPosts.reducerPath]: allPosts.reducer
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authAPI.middleware, posts.middleware, profile.middleware, allPosts.middleware),
>>>>>>> 4ce3df458a5c131fad7b9b1e12e1124c7c1e9d90
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

