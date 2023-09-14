import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { deleteById, post, update } from '~/api'
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
    addTopic: (state, action: PayloadAction<ITopic>) => {
      const data = action.payload
      try {
        post('topics', data)
        state.topics.push(data)
      } catch (err) {
        console.log(err)
      }
    },
    updateTopic: (state, action: PayloadAction<ITopic>) => {
      const data = action.payload
      try {
        update(`topics/${data.id}`, data)
        console.log(`topics/${data.id}`)
      } catch (err) {
        console.log(err)
      }
    },
    deleteTopic: (state, action: PayloadAction<string>) => {
      const topicIdToDelete = action.payload
      try {
        deleteById('topics', topicIdToDelete)
        state.topics = state.topics.filter((topic) => topic.id !== topicIdToDelete)
      } catch (err) {
        console.log(err)
      }
    }
  }
})
export const { setDataTopic, addTopic, updateTopic, deleteTopic } = topicSlice.actions

export default topicSlice.reducer
