import { configureStore } from '@reduxjs/toolkit'

import { authorSlice } from './features/AuthorSlice'
import { postSlice } from './features/PostsSlice'
import { tagSlice } from './features/TagSlice'
import { topicSlice } from './features/TopicSlice'

export const store = configureStore({
  reducer: {
    posts: postSlice.reducer,
    topic: topicSlice.reducer,
    tag: tagSlice.reducer,
    author: authorSlice.reducer
  }
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
