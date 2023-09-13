import { useRoutes } from 'react-router'

import CreateAuthor from '~/components/create/CreateAuthor'
import CreatePosts from '~/components/create/CreatePosts'
import CreateTag from '~/components/create/CreateTag'
import CreateTopic from '~/components/create/CreateTopic'

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
      { index: true, path: '', element: <Tag /> },

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
        children: [
          { index: true, path: '', element: <Topic /> },
          {
            path: 'create_topic',
            element: <CreateTopic />
          }
        ]
      },
      {
        path: routesPath.author,
        children: [
          { index: true, path: '', element: <Author /> },
          {
            path: 'create_author',
            element: <CreateAuthor />
          }
        ]
      },
      {
        path: routesPath.tag,
        children: [
          { index: true, path: '', element: <Tag /> },
          {
            path: 'create_tag',
            element: <CreateTag />
          }
        ]
      }
    ]
  }
]

export default function Routers() {
  const routing = useRoutes(routers)
  return <Layout>{routing}</Layout>
}
