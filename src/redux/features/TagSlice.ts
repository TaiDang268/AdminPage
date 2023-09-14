import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { deleteById, post, update } from '~/api'
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
    addTag: (state, action: PayloadAction<Omit<ITag, 'id'>>) => {
      const data = action.payload
      try {
        post('tags', data)
      } catch (err) {
        console.log(err)
      }
    },
    updateTag: (state, action: PayloadAction<ITag>) => {
      const data = action.payload
      try {
        update(`tags/${data.id}`, data)
        console.log(`tags/${data.id}`)
      } catch (err) {
        console.log(err)
      }
    },
    deleteTag: (state, action: PayloadAction<string>) => {
      const topicIdToDelete = action.payload
      try {
        deleteById('tags', topicIdToDelete)
        state.tags = state.tags.filter((tag) => tag.id !== topicIdToDelete)
      } catch (err) {
        console.log(err)
      }
    }
  }
})
export const { setDataTag, deleteTag, addTag, updateTag } = tagSlice.actions

export default tagSlice.reducer
