import axios from 'axios'

import { IPosts } from '~/types/interfaces'

const baseUrl = 'http://localhost:3006'
export const getAll = async (endpoint: string) => {
  const res = await axios.get(`${baseUrl}/${endpoint}`)
  const { data } = res
  return data as IPosts[]
}
export const deleteById = async (endpoint: string, id: string) => {
  const res = await axios.delete(`${baseUrl}/${endpoint}/${id}`)
  return res
}
