import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { deleteById } from '~/api'
import { ITag } from '~/types/interfaces'

interface TagState {
  tags: ITag[]
}
const initialState: TagState = {
  tags: []
}
export const tagSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    setDataTag: (state, action: PayloadAction<ITag[]>) => {
      state.tags = action.payload
    },
    deleteTag: (state, action: PayloadAction<string>) => {
      const topicIdToDelete = action.payload
      try {
        deleteById('tags', topicIdToDelete)
        state.tags = state.tags.filter((author) => author.id !== topicIdToDelete)
      } catch (err) {
        console.log(err)
      }
    }
  }
})
export const { setDataTag, deleteTag } = tagSlice.actions

export default tagSlice.reducer
