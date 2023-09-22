import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { IPosts } from '~/types/interfaces'

export interface PostState {
  posts: IPosts[]
}

const initialState: PostState = {
  posts: []
}

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setDataPost: (state, action: PayloadAction<IPosts[]>) => {
      state.posts = action.payload
    },
    addPost: (state, action: PayloadAction<IPosts>) => {
      state.posts.push(action.payload)
    },
    editPost: (state, action: PayloadAction<IPosts>) => {
      const editedPostIndex = state.posts.findIndex((post) => post.id === action.payload.id)
      if (editedPostIndex !== -1) {
        state.posts[editedPostIndex] = action.payload
      }
    }
  }
})

export const { addPost, editPost, setDataPost } = postSlice.actions

export default postSlice.reducer
