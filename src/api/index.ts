import axios from 'axios'

import { IPosts, ITopic } from '~/types/interfaces'

const baseUrl = 'http://localhost:3007'
export const getAll = async (endpoint: string) => {
  const res = await axios.get(`${baseUrl}/${endpoint}`)
  const { data } = res
  return data as IPosts[]
}
export const getByParams = async (endpoint: string, params: any) => {
  const res = await axios.get(`${baseUrl}/${endpoint}`, { params: params })
  const { data } = res
  return data as IPosts[]
}
export const getByParamsTopic = async (endpoint: string, params: any) => {
  const res = await axios.get(`${baseUrl}/${endpoint}`, { params: params })
  const { data } = res
  return data as ITopic[]
}
export const deleteById = async (endpoint: string, id: string) => {
  const res = await axios.delete(`${baseUrl}/${endpoint}/${id}`)
  return res
}
export const searchByName = async (endpoint: string, name: string) => {
  const res = await axios.get(`${baseUrl}/${endpoint}?name_like=${name}`)
  const { data } = res
  return data as IPosts[]
}
export const sortAZ = async (endpoint: string) => {
  const res = await axios.get(`${baseUrl}/${endpoint}?_sort=name&_order=asc&_limit=10`)
  const { data } = res
  return data as IPosts[]
}
export const sortZA = async (endpoint: string) => {
  const res = await axios.get(`${baseUrl}/${endpoint}?_sort=name&_order=desc&_limit=10`)
  const { data } = res
  return data as IPosts[]
}
// export const getLastIdPosts = async (endpoint: string) => {
//   const res = await axios.get(`${baseUrl}/${endpoint}`)
//   const length = res.data.length
//   return res.data[length - 1].id as string
// }
export const postPosts = async (endpoint: string, data: IPosts) => {
  const res = await axios.post(`${baseUrl}/${endpoint}`, data)
  return res
}