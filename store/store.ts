import { authAPI } from '@/features/auth/api/auth'
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { publicProfile } from '@/features/profile/api/publicProfile'
import { commentsAPI } from '@/features/comments/api/comments'
import { postAPI } from '@/features/posts/api/post'
import { profileAPI } from '@/features/profile/api/profileApi'
import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { subscriptionsAPI } from '@/features/edit-profile/ui/AccountManagement/api/paymentApi'
import { notificationAPI } from '@/features/notifications/notificationApi'
import { homeAPI } from '@/features/home/api/home'
import { usersAPI } from '@/features/users/api/users'
import { messengerApi } from '@/features/Messenger/api/messenger'

export const store = configureStore({
  reducer: {
    [authAPI.reducerPath]: authAPI.reducer,
    [postAPI.reducerPath]: postAPI.reducer,
    [commentsAPI.reducerPath]: commentsAPI.reducer,
    [publicProfile.reducerPath]: publicProfile.reducer,
    [profileAPI.reducerPath]: profileAPI.reducer,
    [subscriptionsAPI.reducerPath]: subscriptionsAPI.reducer,
    [notificationAPI.reducerPath]: notificationAPI.reducer,
    [homeAPI.reducerPath]: homeAPI.reducer,
    [usersAPI.reducerPath]: usersAPI.reducer,
    [messengerApi.reducerPath]: messengerApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authAPI.middleware,
      postAPI.middleware,
      commentsAPI.middleware,
      publicProfile.middleware,
      profileAPI.middleware,
      subscriptionsAPI.middleware,
      notificationAPI.middleware,
      homeAPI.middleware,
      usersAPI.middleware,
      messengerApi.middleware
    ),
})

setupListeners(store.dispatch)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
