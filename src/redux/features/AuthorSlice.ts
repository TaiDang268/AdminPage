import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { deleteById } from '~/api'
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
    },
    deleteAuthor: (state, action: PayloadAction<string>) => {
      const topicIdToDelete = action.payload
      try {
        deleteById('authors', topicIdToDelete)
        state.authors = state.authors.filter((author) => author.id !== topicIdToDelete)
      } catch (err) {
        console.log(err)
      }
    }
  }
})
export const { setDataAuthor, deleteAuthor } = authorSlice.actions

export default authorSlice.reducer
