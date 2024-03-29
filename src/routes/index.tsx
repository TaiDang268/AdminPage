import { Outlet, useRoutes } from 'react-router-dom'

import images from '~/assets/images'
import ApprovePost from '~/components/ApprovePost'
import CreateAuthor from '~/components/create_update/CreateAuthor'
import CreatePosts from '~/components/create_update/CreatePosts'
import CreateTopic from '~/components/create_update/CreateTopic'
import ReadPost from '~/components/create_update/ReadPost'
import Info from '~/components/Info'
import Register from '~/components/Register'
import Statistic from '~/components/Statistic'
import Users from '~/components/Users'

import PrivateRouter from './PrivateRouter'
import PublicRouter from './PublicRouter'
import Author from '../components/Author'
import Layout from '../components/common/Layout'
import Login from '../components/Login'
import Posts from '../components/Posts'
import Tag from '../components/Tag'
import Topic from '../components/Topic'

const routes = [
  {
    path: '/',
    element: (
      <PrivateRouter>
        <Layout />
      </PrivateRouter>
    ),
    children: [
      {
        index: true,
        element: (
          <div className='w-full h-screen' style={{ backgroundImage: `url(${images.BackgroundLogin})` }}>
            Trang home
          </div>
        )
      },
      {
        path: '/info',
        element: <Info />
      },
      {
        path: '/approve',
        element: <ApprovePost />
      },
      {
        path: '/statistic',
        element: <Statistic />
      },
      {
        path: '/readpost',
        element: <ReadPost />
      },
      {
        path: '/users',
        element: <Users />
      },
      {
        path: '/posts',
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <Posts />
          },
          {
            path: 'create_posts',
            element: <CreatePosts />
          }
        ]
      },
      {
        path: '/topic',
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <Topic />
          },
          {
            path: 'create_topic',
            element: <CreateTopic />
          }
        ]
      },
      {
        path: '/author',
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <Author />
          },
          {
            path: 'create_author',
            element: <CreateAuthor />
          }
        ]
      },
      {
        path: '/tag',
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <Tag />
          },
          {
            path: 'create_tag',
            element: <CreateAuthor />
          }
        ]
      }
    ]
  },
  {
    path: '/login',
    element: <PublicRouter />,
    children: [
      {
        index: true,
        element: <Login />
      }
    ]
  },
  {
    path: '/register',
    element: <PublicRouter />,
    children: [
      {
        index: true,
        element: <Register />
      }
    ]
  }
]

export default function Routers() {
  return useRoutes(routes)
}
