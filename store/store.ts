import { authAPI } from '@/features/auth/api/auth';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { profile } from '@/features/profile/api/profile';
import { commentsAPI } from '@/features/comments/api/comments';
import { postAPI } from '@/features/posts/api/post';
import {profileAPI} from '@/features/profile/api/profileApi';
import {type TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [authAPI.reducerPath]: authAPI.reducer,
    [postAPI.reducerPath]: postAPI.reducer,
    [commentsAPI.reducerPath]: commentsAPI.reducer,
    // [posts.reducerPath]: posts.reducer,
    [profile.reducerPath]: profile.reducer,
    // [allPosts.reducerPath]: allPosts.reducer,
    // [postsAPI.reducerPath]: postsAPI.reducer,
    [profileAPI.reducerPath]: profileAPI.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authAPI.middleware,
      postAPI.middleware,
      commentsAPI.middleware,
      profile.middleware,
    ),
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authAPI.middleware, postsAPI.middleware, profileAPI.middleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;