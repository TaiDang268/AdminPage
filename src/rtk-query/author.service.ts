import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { IAuthor, IParams } from '~/types/interfaces'

import { baseUrl } from './baseUrl'

export const authorApi = createApi({
  reducerPath: 'authorApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  tagTypes: ['Author'],
  endpoints: (builder) => ({
    getAuthor: builder.query<IAuthor[], IParams>({
      query: (params) => {
        return {
          url: 'authors',
          params
        }
      },
      providesTags: ['Author']
    }),
    deleteAuthor: builder.mutation<IAuthor[], string>({
      query: (id) => {
        return {
          url: `authors/${id}`,
          method: 'DELETE'
        }
      },
      invalidatesTags: ['Author']
    }),
    addAuthor: builder.mutation<IAuthor[], Omit<IAuthor, 'id'>>({
      query: (data) => {
        return {
          url: 'authors',
          method: 'POST',
          body: data
        }
      },
      invalidatesTags: ['Author']
    }),
    editAuthor: builder.mutation<IAuthor[], IAuthor>({
      query: (data) => {
        return {
          url: `authors/${data.id}`,
          method: 'PATCH',
          body: data
        }
      }
    })
  })
})
export const { useGetAuthorQuery, useDeleteAuthorMutation, useAddAuthorMutation, useEditAuthorMutation } = authorApi
