import { useRoutes } from 'react-router'

import CreatePosts from '~/components/create/CreatePosts'

import routesPath from './routesPath'
import Author from '../components/Author'
import Layout from '../components/common/Layout'
import Login from '../components/Login'
import Posts from '../components/Posts'
import Tag from '../components/Tag'
import Topic from '../components/Topic'

const routers = [
  {
    path: routesPath.login,
    element: <Login />
  },
  {
    path: routesPath.write,
    children: [
      { index: true, path: '', element: <Posts /> },

      {
        path: routesPath.posts,
        children: [
          { index: true, path: '', element: <Posts /> },
          {
            path: 'create_posts',
            element: <CreatePosts />
          }
        ]
      },
      {
        path: routesPath.topic,

        element: <Topic />
      },
      {
        path: routesPath.author,

        element: <Author />
      },
      {
        path: routesPath.tag,

        element: <Tag />
      }
    ]
  }
]

export default function Routers() {
  const routing = useRoutes(routers)
  return <Layout>{routing}</Layout>
}
