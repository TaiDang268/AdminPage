import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { IAuthor } from '~/types/interfaces'

interface AuthorState {
  authors: IAuthor[]
}
const initialState: AuthorState = {
  authors: []
}
export const authorSlice = createSlice({
  name: 'authors',
  initialState,
  reducers: {
    setDataAuthor: (state, action: PayloadAction<IAuthor[]>) => {
      state.authors = action.payload
    }
  }
})
export const { setDataAuthor } = authorSlice.actions

export default authorSlice.reducer
