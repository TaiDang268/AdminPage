import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { deleteById, post, update } from '~/api'
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
    addAuthor: (state, action: PayloadAction<Omit<IAuthor, 'id'>>) => {
      const data = action.payload
      try {
        post('authors', data)
      } catch (err) {
        console.log(err)
      }
    },
    updateAuthor: (state, action: PayloadAction<IAuthor>) => {
      const data = action.payload
      try {
        update(`authors/${data.id}`, data)
        console.log(`authors/${data.id}`)
      } catch (err) {
        console.log(err)
      }
    },
    deleteAuthor: (state, action: PayloadAction<string>) => {
      const authorIdToDelete = action.payload
      try {
        deleteById('authors', authorIdToDelete)
        state.authors = state.authors.filter((author) => author.id !== authorIdToDelete)
      } catch (err) {
        console.log(err)
      }
    }
  }
})
export const { setDataAuthor, deleteAuthor, addAuthor, updateAuthor } = authorSlice.actions

export default authorSlice.reducer
