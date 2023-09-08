import { configureStore } from '@reduxjs/toolkit'
import { postsApi } from '../api/postsApi'
import { authApi } from '../api/authApi'
import { imageApi } from '../api/imageApi'
import { tagsApi } from '../api/tagsApi'

import postsSlice from './slices/posts'
import authSlice from './slices/auth'
import commentsSlice from './slices/comments'
import { commentsApi } from '../api/commentsApi'


const store = configureStore({
    reducer: {
        postsSlice,
        authSlice,
        commentsSlice,
        [postsApi.reducerPath]: postsApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [imageApi.reducerPath]: imageApi.reducer,
        [tagsApi.reducerPath]: tagsApi.reducer,
        [commentsApi.reducerPath]: commentsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
        postsApi.middleware,
        authApi.middleware,
        imageApi.middleware,
        tagsApi.middleware,
        commentsApi.middleware,
    ]),
})

export type RootState = ReturnType<typeof store.getState>

export default store