import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { deleteById } from '~/api'
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
    },
    deleteTopic: (state, action: PayloadAction<string>) => {
      const topicIdToDelete = action.payload
      try {
        deleteById('topic', topicIdToDelete)
        state.topics = state.topics.filter((post) => post.id !== topicIdToDelete)
      } catch (err) {
        console.log(err)
      }
    }
  }
})
export const { setDataTopic, deleteTopic } = topicSlice.actions

export default topicSlice.reducer
