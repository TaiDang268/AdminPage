import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { ITopic } from '~/types/interfaces'

interface TopicState {
  topics: ITopic[]
}
const initialState: TopicState = {
  topics: []
}
export const topicSlice = createSlice({
  name: 'topics',
  initialState,
  reducers: {
    setDataTopic: (state, action: PayloadAction<ITopic[]>) => {
      state.topics = action.payload
    }
  }
})
export const { setDataTopic } = topicSlice.actions

export default topicSlice.reducer
