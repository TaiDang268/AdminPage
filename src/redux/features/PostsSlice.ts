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
    }
  }
})

export const { setDataPost } = postSlice.actions

export default postSlice.reducer
