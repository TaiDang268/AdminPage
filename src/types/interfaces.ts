export interface IUser {
  id: string
  email: string
  username: string
  password: string
  role: string
  phone: string
  address: string
  image: string
}
export interface IPosts {
  id: string
  author: string
  image: string
  category: string
  date: string
  title: string
  description: string
  name: string
  short_desc: string
}
export interface ITopic {
  id: string
  name: string
  slug: string
  quantity: string
}
export interface ITag {
  id: string
  name: string
}
export interface IAuthor {
  id: string
  name: string
}
export interface IParams {
  _page?: string
  _limit?: string
}
