import { useRoutes } from 'react-router'

import Layout from '~/components/Layout'
import Login from '~/components/Login'
import Posts from '~/components/Posts'
import Topic from '~/components/Topic'

const routers = [
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/posts',
    element: <Posts />
  },
  {
    path: '/topic',
    element: <Topic />
  }
]

export default function Routers() {
  const routing = useRoutes(routers)
  return <Layout>{routing}</Layout>
}
