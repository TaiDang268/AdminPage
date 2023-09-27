import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface IPagination<T> {
  page: number
  per_page: number
  total: number
  total_pages: number
  data: T[]
}
