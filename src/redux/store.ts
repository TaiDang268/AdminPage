import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'

import { postsApi } from '~/rtk-query/posts.service'

import { authorSlice } from './features/AuthorSlice'
import { postSlice } from './features/PostsSlice'
import { tagSlice } from './features/TagSlice'
import { topicSlice } from './features/TopicSlice'

export const store = configureStore({
  reducer: {
    posts: postSlice.reducer,
    topic: topicSlice.reducer,
    tag: tagSlice.reducer,
    author: authorSlice.reducer,
    [postsApi.reducerPath]: postsApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(postsApi.middleware)
})
setupListeners(store.dispatch)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
