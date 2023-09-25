import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { IParams, ITag } from '~/types/interfaces'

import { baseUrl } from './baseUrl'

export const tagApi = createApi({
  reducerPath: 'tagApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  tagTypes: ['Tag'],
  endpoints: (builder) => ({
    getTag: builder.query<ITag[], IParams>({
      query: (params) => {
        return {
          url: 'tags',
          params
        }
      },
      providesTags: ['Tag']
    }),
    deleteTag: builder.mutation<ITag[], string>({
      query: (id) => {
        return {
          url: `tags/${id}`,
          method: 'DELETE'
        }
      },
      invalidatesTags: ['Tag']
    }),
    addTag: builder.mutation<ITag[], Omit<ITag, 'id'>>({
      query: (data) => {
        return {
          url: 'tags',
          method: 'POST',
          body: data
        }
      },
      invalidatesTags: ['Tag']
    }),
    editTag: builder.mutation<ITag[], ITag>({
      query: (data) => {
        return {
          url: `tags/${data.id}`,
          method: 'PATCH',
          body: data
        }
      }
    })
  })
})
export const { useGetTagQuery, useDeleteTagMutation, useAddTagMutation, useEditTagMutation } = tagApi
