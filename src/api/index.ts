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
export const searchByName = async (endpoint: string, name: string) => {
  const res = await axios.get(`${baseUrl}/${endpoint}?name_like=${name}`)
  const { data } = res
  return data as IPosts[]
}
export const sortAZ = async (endpoint: string) => {
  const res = await axios.get(`${baseUrl}/${endpoint}?_sort=name&_order=asc`)
  const { data } = res
  return data as IPosts[]
}
export const sortZA = async (endpoint: string) => {
  const res = await axios.get(`${baseUrl}/${endpoint}?_sort=name&_order=desc`)
  const { data } = res
  return data as IPosts[]
}
