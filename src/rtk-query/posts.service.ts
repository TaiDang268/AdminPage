import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { IParams, IPosts } from '~/types/interfaces'

import { baseUrl } from './baseUrl'

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  tagTypes: ['Posts'],
  endpoints: (builder) => ({
    getPosts: builder.query<IPosts[], IParams>({
      query: (params) => {
        return {
          url: 'posts',
          params
        }
      },
      providesTags: ['Posts']
    }),
    deletePosts: builder.mutation<IPosts[], string>({
      query: (id) => {
        return {
          url: `posts/${id}`,
          method: 'DELETE'
        }
      },
      invalidatesTags: ['Posts']
    }),
    addPosts: builder.mutation<IPosts[], IPosts>({
      query: (data) => {
        return {
          url: `posts`,
          method: 'POST',
          body: data
        }
      },
      invalidatesTags: ['Posts']
    }),
    editPosts: builder.mutation<IPosts[], any>({
      query: (data) => {
        return {
          url: `posts/${data.id}`,
          method: 'PATCH',
          body: data
        }
      },
      invalidatesTags: ['Posts']
    })
  })
})
export const { useGetPostsQuery, useDeletePostsMutation, useAddPostsMutation, useEditPostsMutation } = postsApi
