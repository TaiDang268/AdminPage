import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { IParams, ITopic } from '~/types/interfaces'

import { baseUrl } from './baseUrl'

export const topicApi = createApi({
  reducerPath: 'topicApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  tagTypes: ['Topic'],
  endpoints: (builder) => ({
    getTopic: builder.query<ITopic[], IParams>({
      query: (params) => {
        return {
          url: 'topics',
          params
        }
      },
      providesTags: ['Topic']
    }),
    deleteTopic: builder.mutation<ITopic[], string>({
      query: (id) => {
        return {
          url: `topics/${id}`,
          method: 'DELETE'
        }
      },
      invalidatesTags: ['Topic']
    }),
    addTopic: builder.mutation<ITopic[], Omit<ITopic, 'id'>>({
      query: (data) => {
        return {
          url: 'topics',
          method: 'POST',
          body: data
        }
      },
      invalidatesTags: ['Topic']
    }),
    editTopic: builder.mutation<ITopic[], ITopic>({
      query: (data) => {
        return {
          url: `topics/${data.id}`,
          method: 'PATCH',
          body: data
        }
      }
    })
  })
})
export const { useGetTopicQuery, useAddTopicMutation, useDeleteTopicMutation, useEditTopicMutation } = topicApi
