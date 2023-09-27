import axios from 'axios'

import { IPosts, ITopic } from '~/types/interfaces'

const baseUrl = 'http://localhost:3007'

export const getAll = async (endpoint: string) => {
  const res = await axios.get(`${baseUrl}/${endpoint}`)
  const { data } = res
  return data as IPosts[]
}
export const getTotalRecord = async (endpoint: string) => {
  const res = await axios.get(`${baseUrl}/${endpoint}`)
  return res.data.length
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
export const searchByName = async (endpoint: string, name: string, perPage: number) => {
  const res = await axios.get(`${baseUrl}/${endpoint}?name_like=${name}&_limit=${perPage}`)
  const { data } = res
  return data
}
export const sortAZ = async (endpoint: string, perPage: number) => {
  const res = await axios.get(`${baseUrl}/${endpoint}?_sort=name&_order=asc&_limit=${perPage}`)
  const { data } = res
  return data
}
export const sortZA = async (endpoint: string, perPage: number) => {
  const res = await axios.get(`${baseUrl}/${endpoint}?_sort=name&_order=desc&_limit=${perPage}`)
  const { data } = res
  return data
}
export const getNameForSelect = async (endpoint: string) => {
  const res = await axios.get(`${baseUrl}/${endpoint}`)
  return res.data.map((item: any) => item.name)
}
export const deleteById = async (endpoint: string, id: string) => {
  const res = await axios.delete(`${baseUrl}/${endpoint}/${id}`)
  return res
}
// export const postPosts = async (endpoint: string, data: IPosts) => {
//   const res = await axios.post(`${baseUrl}/${endpoint}`, data)
//   return res
// }
// export const post = async (endpoint: string, data: any) => {
//   const res = await axios.post(`${baseUrl}/${endpoint}`, data)
//   return res
// }
// export const update = async (endpoint: string, data: any) => {
//   const res = await axios.patch(`${baseUrl}/${endpoint}`, data)
//   return res
// }
