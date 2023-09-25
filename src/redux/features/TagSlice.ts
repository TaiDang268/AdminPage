import { PayloadAction, createSlice } from '@reduxjs/toolkit'

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
    }
  }
})
export const { setDataTag } = tagSlice.actions

export default tagSlice.reducer
